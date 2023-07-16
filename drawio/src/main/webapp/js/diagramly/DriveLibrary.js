/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
DriveLibrary = function(ui, data, desc)
{
	DriveFile.call(this, ui, data, desc);
};

//Extends mxEventSource
mxUtils.extend(DriveLibrary, DriveFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveLibrary.prototype.save = function(revision, success, error)
{
	this.ui.drive.saveFile(this, revision, mxUtils.bind(this, function(resp)
	{
		this.desc = resp;
		
		if (success != null)
		{
			success(resp);
		}
	}), error);
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
DriveLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
