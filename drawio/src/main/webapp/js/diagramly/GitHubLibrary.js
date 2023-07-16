/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
GitHubLibrary = function(ui, data, meta)
{
	GitHubFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(GitHubLibrary, GitHubFile);

/**
 * Overridden to avoid updating data with current file.
 */
GitHubLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
GitHubLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
