# draw.io Desktop Release Process

**Document ID:** REL-PROC-DESKTOP-001  
**Version:** 1.3  
**Last Updated:** 2026-09-23
**Owner:** Engineering Team

---

## 1. Purpose

This document defines the release process for draw.io Desktop. Automated controls via GitHub Actions handle repeatable tasks, while manual steps focus on verification and approval.

**Repository:** https://github.com/jgraph/drawio-desktop  
**Submodule:** drawio (core editor)  
**CI/CD:** GitHub Actions

---

## 2. Controlled Tooling

Tooling versions are pinned in the GitHub Actions workflows to ensure reproducible builds.

| Tool | Version | Controlled In |
|------|---------|---------------|
| Node.js | 24.x (LTS) | `.github/workflows/*.yml` |
| npm | (bundled with Node) | — |

> **Note:** npm is bundled with Node.js, ensuring consistent versions across environments.

When updating tooling versions:
1. Update the version in all workflow files
2. Test locally with matching versions
3. Document the change in the PR

---

## 3. Roles

| Role | Responsibility |
|------|----------------|
| **Release Lead** | Triggers workflow, verifies output, approves release |
| **Reviewer** | Reviews changes, provides approval before publish |

> **Small Team Note:** Release Lead and Reviewer should be different people when possible. For solo releases, rely on automated checks and document the reason.

---

## 4. Release Procedure

### 4.1 Automated Preparation (GitHub Actions)

The `prepare-release` workflow automates:
- Updating version in package.json
- Updating the drawio submodule to `drawio_ref`, when one is given
- Regenerating package-lock.json from scratch (see **Dependency lock** below)
- Generating draft release notes
- Running `npm audit` and failing on critical/high vulnerabilities in runtime dependencies
- Running `npm outdated` for review
- Uploading audit evidence as artifacts
- Committing to a new branch `releases/vX.Y.Z` and opening a pull request "Release vX.Y.Z" into dev

It does not create the version tag, so no build starts when it completes. The tag is created by hand after the pull request is merged (Section 4.3).

**To trigger:**

1. Go to Actions → "Prepare Release"
2. Click "Run workflow" on the dev branch
3. Enter:
   - **version:** The release version, which is the `VERSION` on drawio-dev's `release` branch (e.g., `31.4.5`, see Section 4.2)
   - **previous_version:** (Optional) The previous release, used in the ChangeLog line of the draft release notes (e.g., `31.4.4`). Leave empty to use the newest tag reachable from dev.
   - **drawio_ref:** (Optional) Tag or commit to move the public `drawio` submodule to. Leave empty: the submodule is moved to the tip of jgraph/drawio's dev branch in its own commit before the workflow runs (Section 4.2).
   - **dry_run:** Check to validate without creating the branch or pull request
   - **override_audit:** Check only to proceed despite critical/high vulnerabilities in runtime dependencies that have been reviewed and accepted. The override is recorded in the pull request.

**What happens:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Workflow: prepare-release                                      │
├─────────────────────────────────────────────────────────────────┤
│  1. Validate version format (X.Y.Z)                             │
│  2. Checkout with submodules (recursive), full history          │
│  3. Setup Node.js 24.x                                          │
│  4. Update drawio submodule → drawio_ref (only if supplied)     │
│  5. Update package.json version                                 │
│  6. rm -rf node_modules package-lock.json, then npm install     │
│  7. Generate draft release notes                                │
│  8. npm audit (all dependencies reported, runtime ones gated)   │
│  9. npm outdated → report only                                  │
│ 10. Upload evidence artifacts                                   │
│ 11. FAIL if critical/high vulns in runtime dependencies         │
│     └── unless override_audit is set                            │
│ 12. Commit to new branch releases/vX.Y.Z + push                 │
│ 13. Open PR "Release vX.Y.Z" into dev                           │
│     (12 and 13 are skipped on a dry run; nothing is tagged)     │
└─────────────────────────────────────────────────────────────────┘
```

**Dependency lock:** Step 6 deletes `node_modules` and `package-lock.json` and runs `npm install` rather than `npm ci`. This is deliberate: a lock written from scratch has a resolved URL and integrity hash on every entry, which offline builds such as Flatpak need ([#2301](https://github.com/jgraph/drawio-desktop/issues/2301)). As a result every caret range in package.json floats to its newest match at release time. Only an exact version pin in package.json holds a dependency back.

**Evidence produced:**
- Workflow run log (retained by GitHub)
- `release-evidence-vX.Y.Z` artifact, uploaded before the audit gate so it is also kept when the gate fails, containing:
  - `audit-results.json` (all dependencies)
  - `audit-prod.json` (runtime dependencies, the ones the gate checks)
  - `audit-report.txt`
  - `outdated-report.txt`
  - `release-notes.md`
- Job summary with version details and audit results
- The release pull request, whose body holds the npm audit result and the draft release notes

### 4.2 Pre-Release Verification

Before triggering the workflow:

| ✓ | Item |
|---|------|
| ☐ | Release scope documented (what's included) |
| ☐ | All feature changes merged to dev branch |
| ☐ | Release version read from `VERSION` on drawio-dev's `release` branch |
| ☐ | `jgraph/drawio` dev branch carries `VERSION` X.Y.Z |
| ☐ | drawio submodule moved to the tip of that branch in its own commit on dev, "Updates to draw.io X.Y.Z" |

The version is not a free choice. The CI build workflows copy `VERSION` from drawio-dev's `release` branch into the submodule tree and `npm run sync` stamps it into package.json, so the desktop version always equals that branch's `VERSION`. A tag that does not match makes the builds publish a draft release for the other version.

drawio-dev's "Deploy to Public GitHub" workflow pushes the release to jgraph/drawio's dev branch together with the tag `vX.Y.Z`, which the ChangeLog link in the draft release notes needs. The submodule follows the tip of dev, the branch `.gitmodules` tracks, not the tag: dev can be ahead of the tag (after 31.5.2 it gained a settings commit). Once dev carries `VERSION` X.Y.Z, move the submodule on an up-to-date dev checkout:

```bash
git submodule update --remote drawio
cat drawio/VERSION
git add drawio
git commit -m "Updates to draw.io X.Y.Z"
git push origin dev
```

`cat drawio/VERSION` must print X.Y.Z. An older version means the public deploy has not run yet.

The CI builds copy only the minified editor (`js/*.min.js`) and `VERSION` from drawio-dev. Every other web app file the app loads, such as `index.html`, `bootstrap.js`, `ElectronApp.js`, the resources and the styles, ships from the submodule pin.

### 4.3 Merge, Tag and Monitor Build

After the prepare-release workflow completes:

1. Review the pull request "Release vX.Y.Z". Its single commit, "Prepare release vX.Y.Z", should change only the version in package.json and the regenerated package-lock.json. The lock diff shows which dependencies moved (Section 4.1).
2. Merge it into dev. dev requires one approving review.
3. Create an annotated tag on the head of `releases/vX.Y.Z` (the "Prepare release vX.Y.Z" commit) and push it:

   ```bash
   git fetch origin
   git tag -a vX.Y.Z -m "Release vX.Y.Z" origin/releases/vX.Y.Z
   git push origin vX.Y.Z
   ```

   The pull request body suggests tagging the head of dev after the merge instead. That is the same tree unless other commits reached dev in between, and the branch head is the commit that was reviewed.
4. The tag push starts `electron-builder.yml` (macOS and Linux) and `electron-builder-win.yml` (Windows, then the `microsoft-store` job). Monitor them in the Actions tab. All platform builds must succeed before proceeding.
5. The builds create a draft release named X.Y.Z on tag vX.Y.Z with 28 assets (29 once the release is published and hash-gen adds `Files-SHA256-Hashes.txt`). The `.appx` is not among them; the `microsoft-store` job submits it to the Store (Section 4.5). A draft named after another version means the tag did not match drawio-dev's `VERSION` (Section 4.2).

**Evidence:** Link to successful build run: `_______________`

### 4.4 Publish Release

After all build workflows complete successfully:

1. Go to GitHub Releases - a draft release will have been created with all artifacts
2. Verify all platform builds are present (Windows and macOS builds are signed automatically in CI — see Section 11)
3. Add release notes (Section 8)
4. **Obtain Reviewer approval** (Section 5)
5. Click "Publish release"

The `.appx` is not among the release assets. It is built by the same Windows
workflow but published straight to Partner Center by its `microsoft-store` job —
see Section 4.5.

### 4.5 Microsoft Store Submission

The `microsoft-store` job in `electron-builder-win.yml` submits the `.appx` to
Partner Center automatically once the Windows build succeeds. `msstore publish`
clones the last published submission, swaps in the new package and commits it, so
the release goes into Store certification without any manual upload.

1. Check the `microsoft-store` job succeeded in the Actions tab
2. Confirm the new submission is in certification in [Partner Center](https://partner.microsoft.com/dashboard)
3. Certification typically completes within a few hours; the Store listing updates
   after it passes

If the job fails, re-run it on its own ("Re-run failed jobs") — the release assets
are already published by then and are not affected. The package is also kept as
the `appx-package` workflow artifact for 30 days, so a submission can be redone by
hand from Partner Center without rebuilding.

Do not edit an API-created submission in Partner Center while it is pending: doing
so blocks further API changes to it, and the next release's job will fail.

**Credentials:** the job authenticates with an Entra ID app registration that is
added under Partner Center > Account settings > User management > Microsoft Entra
applications with the **Manager** role. It is held in the repository secrets
`MS_STORE_TENANT_ID`, `MS_STORE_SELLER_ID`, `MS_STORE_CLIENT_ID` and
`MS_STORE_CLIENT_SECRET`. The client secret expires (24 months maximum) and has to
be rotated in Entra and re-added here before it lapses.

Run the **Check Microsoft Store Credentials** workflow (manual, read-only) to
confirm all four still work — after setting them up, after a rotation, or to tell
a credential failure apart from a submission one.

---

## 5. Approval

Before publishing, the Reviewer verifies:

| ✓ | Check |
|---|-------|
| ☐ | Workflow completed successfully |
| ☐ | npm audit shows no critical/high vulnerabilities |
| ☐ | Build workflows passed for all platforms |
| ☐ | Test cases passed (Section 6) |

| | Name | Date |
|---|------|------|
| **Release Lead** | | |
| **Reviewer** | | |

> **Solo Release:** Document reason, ensure all automated checks pass, perform extended testing.

---

## 6. Test Cases

Run against the built application before publishing.

### Critical (Must Pass)

| ID | Test | Expected | Pass |
|----|------|----------|------|
| T01 | Launch application | Main window displays | ☐ |
| T02 | Create new diagram | Blank canvas opens | ☐ |
| T03 | Add shapes | Shapes render, move, resize | ☐ |
| T04 | Save file | Saves without error | ☐ |
| T05 | Open file | Displays correctly | ☐ |
| T06 | Help > About | Shows correct version | ☐ |

### Standard

| ID | Test | Expected | Pass |
|----|------|----------|------|
| T07 | Export PNG/PDF/SVG | Valid output | ☐ |
| T08 | Undo/Redo | Actions reverse | ☐ |

### Security

| ID | Check | Method | Pass |
|----|-------|--------|------|
| S01 | No external scripts | DevTools Network tab | ☐ |
| S02 | No data exfiltration | Monitor during save | ☐ |

**Tested by:** _______________  **Date:** _______________

---

## 7. Rollback

### When to Rollback

- Critical functionality broken
- Security vulnerability discovered
- Data loss or corruption

### Steps

1. Convert GitHub release to draft
2. Ensure previous version is "Latest"
3. Notify team
4. Document incident below

### Incident Report

**Version:** _______________  
**Issue:** _______________________________________________  
**Root Cause:** _______________________________________________  
**Corrective Action:** _______________________________________________  
**Completed by:** _______________  **Date:** _______________

---

## 8. Release Notes Template

```markdown
## v[VERSION] - [DATE]

### Changes
- [Change 1]
- [Change 2]

### Fixes
- [Fix 1]

### Security
- Dependencies updated

### Known Issues
- [If any]
```

---

## 9. Evidence Retention

Evidence is automatically retained:

| Evidence | Location | Retention |
|----------|----------|-----------|
| Workflow logs | GitHub Actions | 90 days (GitHub default) |
| Audit artifacts | Actions → Artifacts | 365 days (configured) |
| Release assets | GitHub Releases | Permanent |
| Git tags/commits | Repository | Permanent |

For audits requiring longer retention, download artifacts to secure storage.

---

## 10. Handling Failures

### npm audit fails (critical/high vulnerabilities)

1. Review `audit-report.txt` in workflow artifacts
2. Options:
   - Run `npm audit fix` locally, commit, re-run workflow
   - If unfixable, assess risk and document exception
   - Delay release until fix available

### Build fails

1. Check workflow logs for error
2. For a transient failure (runner, network, notarisation), use "Re-run failed jobs". A re-run reads drawio-dev's `release` branch again, so first check that its `VERSION` still matches the tag.
3. For a failure that needs a commit, including a fix to a workflow file (tag builds use the workflow files at the tagged commit):
   1. Fix it on dev
   2. Delete the draft release and the tag: `git push --delete origin vX.Y.Z` and `git tag -d vX.Y.Z`
   3. Create the tag again on the commit on dev that has the fix and push it (Section 4.3)

There is no need to re-run prepare-release: the merged release pull request has already set the version on dev.

### Submodule ref not found

1. Verify the drawio tag/ref exists in the public drawio repository
2. Use `drawio_ref` input to specify the correct ref, or leave it empty to keep the current submodule pin. Releases leave it empty and move the submodule beforehand (Section 4.2)

---

## 11. Code Signing

Windows and macOS builds are signed during CI. Linux artifacts are unsigned (beyond distribution-level signatures applied by the snap store etc.).

### 11.1 Windows — Azure Trusted Signing

Windows binaries (NSIS installer, MSI, portable, inner `.exe`) are signed via Microsoft Azure Trusted Signing. Microsoft has rebranded this service to "Artifact Signing" — same product, the resource provider is still `Microsoft.CodeSigning`. The integration uses our own electron-builder sign hook at [`build/sign-trusted.mjs`](../build/sign-trusted.mjs), invoked from `win.signtoolOptions.sign` in [`electron-builder-win.json`](../electron-builder-win.json) and [`electron-builder-win-arm64.json`](../electron-builder-win-arm64.json).

**Azure resources** (region: West Europe):

| Resource | Name |
|---|---|
| Resource group | `rg-drawio-signing` |
| Artifact Signing account | `drawio-signing` |
| Certificate profile | `drawio-codesign` |
| Endpoint | `https://weu.codesigning.azure.net` |
| Service principal (CI) | `drawio-ci-signing` |
| Role assigned to SP | `Artifact Signing Certificate Profile Signer` (scope: account) |
| Identity validation subject | `draw.io Ltd` (UK organisation) |

**GitHub secrets** (repository-level on `jgraph/drawio-desktop`):

| Secret | Source |
|---|---|
| `AZURE_TENANT_ID` | `tenant` from `az ad sp create-for-rbac` |
| `AZURE_CLIENT_ID` | `appId` (the service principal application id) |
| `AZURE_CLIENT_SECRET` | `password` (rotate via `az ad sp credential reset --id $APP_ID`) |

**Workflow step.** [`.github/workflows/electron-builder-win.yml`](../.github/workflows/electron-builder-win.yml) → `Set up signing dependencies (Azure Trusted Signing)` downloads the `Microsoft.ArtifactSigning.Client` NuGet package (pinned, currently 1.0.128), extracts the dlib at `bin/x64/Azure.CodeSigning.Dlib.dll`, locates `signtool.exe` from the Windows SDK (filtering out the unsupported `10.0.20348` SDK version), and exports both as env vars consumed by `sign-trusted.mjs`.

**Cert lifecycle.** Microsoft auto-rotates the leaf certificate every three days. Signatures remain valid beyond that thanks to RFC 3161 timestamping at `http://timestamp.acs.microsoft.com`. There is no manual renewal of the certificate itself — only the Azure account, certificate profile, and identity validation need maintenance, and none of those expire under normal usage.

**Publisher transition.** The current cert subject is `CN=draw.io Ltd, O=draw.io Ltd, ...`. Releases up to v29.x were signed `JGraph Ltd` via SSL.com. Auto-update bridges both publishers via `win.signtoolOptions.publisherName: ["JGraph Ltd", "draw.io Ltd"]` in each Windows config. Drop `JGraph Ltd` once v30.x is well-distributed (a few release cycles).

**Verifying a signed build.** Right-click any signed `.exe` → Properties → Digital Signatures and confirm:

- Signer: `draw.io Ltd`
- Timestamp present
- Chain terminates at a Microsoft root certificate

### 11.2 macOS — Apple Developer ID

macOS `.app`, `.dmg`, and the `.appex` Quick Look extension are signed with the Apple Developer ID Application certificate, then notarised by Apple. Implementation is in [`build/notarize.mjs`](../build/notarize.mjs) (the electron-builder `afterSign` hook).

**GitHub secrets** (organisation-level on jgraph):

| Secret | Purpose |
|---|---|
| `CSC_LINK` | Apple Developer ID Application `.p12`, base64-encoded |
| `CSC_KEY_PASSWORD` | `.p12` password |
| `APPLEID` | Apple ID for notarisation submission |
| `APPLEIDPASS` | App-specific password for notarisation |
| `APPLE_TEAM_ID` | Apple Developer team identifier |

These are organisation-level (not repository-level) because they're shared with other Apple-signed jgraph projects. The Apple Developer ID Application certificate has a multi-year validity; renewal is a manual annual operation through the Apple Developer portal.

### 11.3 Linux — unsigned

Linux artifacts (`.deb`, `.rpm`, `.AppImage`, `.snap`) are unsigned by us. The snap store re-signs `.snap` packages on upload via `SNAP_TOKEN`; other formats rely on transport-level (HTTPS) trust and the user's distribution package manager.

### 11.4 Handling signing failures

| Symptom | Likely cause | Action |
|---|---|---|
| Windows: `SignTool Error: No certificates were found that met all the given criteria.` | Azure auth failure (expired SP secret, RBAC not propagated) | Reset SP credential; verify `AZURE_*` repo secrets match latest values |
| Windows: `Trusted Signing dlib not found at ...` | NuGet package layout changed or version unavailable | Confirm `Microsoft.ArtifactSigning.Client` version still resolves; bump pinned version |
| Windows: 403 Forbidden during signing | Region/endpoint mismatch | Confirm endpoint URL matches the account's region (`weu` for West Europe) |
| macOS: notarisation rejected | Apple ID password expired, or app-specific password revoked | Generate a new app-specific password at appleid.apple.com; update `APPLEIDPASS` secret |
| macOS: `errSecInternalComponent` | `.p12` corrupted or wrong password | Re-export `.p12` from Keychain Access; update `CSC_LINK` and `CSC_KEY_PASSWORD` |

---

## Revision History

| Version | Date       | Author      | Changes |
|---------|------------|-------------|---------|
| 1.0     | 2026.01.02 | D Benson    | Initial release |
| 1.1     | 2026.05.09 | D Benson    | Added §11 Code Signing (Windows via Azure Trusted Signing, macOS via Apple Developer ID); fixed stale `CSC_LINK` reference in §4.4 (it's the macOS secret, not Windows) |
| 1.2     | 2026.09.23 | D Benson    | Corrected §4.1-4.3 and §10 for the PR-based prepare-release flow: the workflow opens a release PR and never tags; the submodule bump, merge and tag on the `releases/vX.Y.Z` head are manual |
| 1.3     | 2026.09.23 | D Benson    | §4.1-4.2: the submodule bump moves to the tip of jgraph/drawio's dev branch once it carries `VERSION` X.Y.Z, not to the `vX.Y.Z` tag, which dev can be ahead of |
