// Copyright (c) 2006-2020, JGraph Ltd
/**
 */
RemoteFile = function(ui, data, title)
{
	DrawioFile.call(this, ui, data);
	
	this.title = title;
	this.mode = null;
};

//Extends mxEventSource
mxUtils.extend(RemoteFile, DrawioFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
RemoteFile.prototype.isAutosave = function()
{
	return false;
};

/**
 * 
 */
RemoteFile.prototype.getMode = function()
{
	return this.mode;
};

/**
 * 
 */
RemoteFile.prototype.getTitle = function()
{
	return this.title;
};

/**
 * 
 */
RemoteFile.prototype.isRenamable = function()
{
	return false;
};

/**
 */
RemoteFile.prototype.open = function()
{
	this.ui.setFileData(this.getData());
	this.installListeners();
};
