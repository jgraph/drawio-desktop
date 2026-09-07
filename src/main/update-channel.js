// electron-builder names the Windows update manifest ${channel}.yml with no
// architecture suffix (Linux gets -arm64, macOS lists both arches in one file),
// so the x64 and arm64 builds would both publish latest.yml and the last upload
// would win. The arm64 build publishes its manifest under its own channel
// (publish.channel in electron-builder-win-arm64.json) and asks for that one here.
// Must stay in sync with that config [jgraph/drawio-desktop#2197]
export function getUpdateChannel(platform, arch)
{
	return platform === 'win32' && arch === 'arm64' ? 'latest-arm64' : null;
}
