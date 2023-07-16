/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
TrelloLibrary = function(ui, data, meta)
{
	TrelloFile.call(this, ui, data, meta);
};

//Extends mxEventSource
mxUtils.extend(TrelloLibrary, TrelloFile);

/**
 * Overridden to avoid updating data with current file.
 */
TrelloLibrary.prototype.doSave = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
TrelloLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
