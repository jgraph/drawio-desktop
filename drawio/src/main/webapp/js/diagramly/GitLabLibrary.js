/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
GitLabLibrary = function(ui, data, meta)
{
	GitLabFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(GitLabLibrary, GitLabFile);

/**
 * Overridden to avoid updating data with current file.
 */
GitLabLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
GitLabLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
