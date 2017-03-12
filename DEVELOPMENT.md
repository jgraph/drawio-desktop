## Setup

Installers repo is: https://github.com/mediaslav/drawiodesktop

	build/ - resources for installer, don't change file names names there
	electron-builder.json - main build config
	sync.js - fetches version from ./draw.io/VERSION for build, and installs draw.io/war/package.json "dependencies"
	.travis.yml - CI config
	appveyor.yml - CI config 
	draw.io/ - draw.io repo as submodule

Currently CI build are activated from pushing to this repo, not from draw.io.

## High level workflow

1) You push to repo

2) git hook activates CI, and CI performs build (builder will use version from ./draw.io/VERSION, ignoring version in draw.io/war/package.json)

3) After successful build CI drafts new release in github and uploads installers, mac and linux from Travis and windows one from AppVeyor 
( you'll see new draft here: https://github.com/mediaslav/drawiodesktop/releases )

4) You wait till all installers get into draft and press "Publish release"

Need to open corresponding draft in: https://github.com/mediaslav/drawiodesktop/releases   
Press "Edit" near relevant draft, make sure you see all needed installers uploaded by CI, and press "Publish release" below
   
So manual work is push commit, have lunch, coffee and press "Publish" button.
Travis OSX builds can spend hour(s) in queue.

## Configuring CI

You must provide certain environment variables for github publishing and code signing

	GH_TOKEN = github token, for publishing    
	CSC_LINK = Certificate converted to base64-encoded string, or url to cert (*.p12 or *.pfx file) 
	CSC_KEY_PASSWORD = The password to decrypt the certificate given in CSC_LINK

#### Travis CI - builds OSX and Linux installers
Define vars at: relevant repo page / "More options" / "Settings" 

#### AppVeyor CI - Windows NSIS installer
Define vars at: SETTINGS / Environment / Environment variables, Add variable

## Code signing

### Windows

To sign an app on Windows, there are two types of certificates: **EV Code Signing Certificate** and 
**Code Signing Certificate**. Both certificates work with auto-update. The regular (and often cheaper) 
Code Signing Certificate shows a warning during installation that goes away once enough users installed your application
and you've built up trust. 

For CI you can use only regular **Code Signing Certificate**, because EV Certificate is bound to a physical USB dongle.

SSL certificate used for website is not suitable for signing apps.  

See [Get a code signing certificate](https://msdn.microsoft.com/windows/hardware/drivers/dashboard/get-a-code-signing-certificate) for Windows.
And this may be useful: https://cheapsslsecurity.com/#ProtectYourCode

### MacOS

Mac build requires Apple-issued Developer ID certificate, you must be member of https://developer.apple.com/programs/whats-included/
to receive one. 

#### How to Export Certificate on macOS

1. Open Keychain.
2. Select `login` keychain, and `My Certificates` category.
3. Select all required certificates (hint: use cmd-click to select several):
	* `Developer ID Application:` to sign app for macOS.
	* `3rd Party Mac Developer Application:` and `3rd Party Mac Developer Installer:` to sign app for MAS (Mac App Store).
	* `Developer ID Application:` and `Developer ID Installer` to sign app and installer for distribution outside of the Mac App Store.
	
	Please note – you can select as many certificates, as need. No restrictions on electron-builder side.
	All selected certificates will be imported into temporary keychain on CI server.
4. Open context menu and `Export`.

To encode file to base64 (macOS/linux): `base64 -i yourFile.p12 -o envValue.txt`

## WARNING

draw.io/war/package.json "dependencies" will get into installer, so please put irrelevant ones into "devDependencies", which is ignored by builder.
Currently it looks like:

	"devDependencies": {
		"electron": "^1.6.3" <- we obviously don't need to pack electron inside electron as dependency 
	}
