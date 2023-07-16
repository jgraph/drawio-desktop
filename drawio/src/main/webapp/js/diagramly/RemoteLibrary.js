// Copyright (c) 2006-2020, JGraph Ltd
/**
 */
RemoteLibrary = function(ui, data, libObj)
{
	RemoteFile.call(this, ui, data, libObj.title);
	this.libObj = libObj;
};

//Extends mxEventSource
mxUtils.extend(RemoteLibrary, LocalFile);

/**
 * 
 */
RemoteLibrary.prototype.getHash = function()
{
	return 'R' + encodeURIComponent(JSON.stringify([this.libObj.id, this.libObj.title, this.libObj.downloadUrl])); //Using an array to get the same order in all platforms
};

/**
 * 
 */
RemoteLibrary.prototype.isEditable = function()
{
	return false;
};
/**
 * 
 */
RemoteLibrary.prototype.isRenamable = function()
{
	return false;
};

/**
 * 
 */
RemoteLibrary.prototype.isAutosave = function()
{
	return false;
};

/**
 * 
 */
RemoteLibrary.prototype.save = function(revision, success, error)
{
	// Do nothing
};

/**
 * 
 */
RemoteLibrary.prototype.saveAs = function(title, success, error)
{
	// Do nothing
};

/**
 * 
 */
RemoteLibrary.prototype.updateFileData = function()
{
	// Do nothing
};

/**
 */
RemoteLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
