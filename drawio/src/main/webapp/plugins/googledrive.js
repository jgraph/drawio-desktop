/**
 * Google Drive plugin limits supported storage to Google Drive, browser and device.
 */
Draw.loadPlugin(function(ui)
{
	ui.oneDrive = null;
	ui.dropbox = null;
	ui.gitLab = null;
	ui.gitHub = null;
	ui.trello = null;

	window.OneDriveClient = null;
	window.DropboxClient = null;
	window.TrelloClient = null;
	
	isLocalStorage = false;
});
