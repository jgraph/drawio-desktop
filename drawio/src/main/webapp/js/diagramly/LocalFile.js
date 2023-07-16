// $Id = LocalFile.js,v 1.12 2010-01-02 09 =45 =14 gaudenz Exp $
// Copyright (c) 2006-2014, JGraph Ltd
/**
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 * @constructor
 * @class Implements a basic 2D point. Known subclassers = {@link mxRectangle}.
 * @param {number} x X-coordinate of the point.
 * @param {number} y Y-coordinate of the point.
 */
LocalFile = function(ui, data, title, temp, fileHandle, desc)
{
	DrawioFile.call(this, ui, data);
	
	this.title = title;
	this.mode = (temp) ? null : App.MODE_DEVICE;
	this.fileHandle = fileHandle;
	this.desc = desc;
};

//Extends mxEventSource
mxUtils.extend(LocalFile, DrawioFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.isAutosave = function()
{
	return this.fileHandle != null && !this.invalidFileHandle && DrawioFile.prototype.isAutosave.apply(this, arguments);
};

/**
 * Specifies if the autosave checkbox should be shown in the document
 * properties dialog. Default is false.
 */
LocalFile.prototype.isAutosaveOptional = function()
{
	return this.fileHandle != null;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.getMode = function()
{
	return this.mode;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.getTitle = function()
{
	return this.title;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.isRenamable = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.save = function(revision, success, error)
{
	this.saveAs(this.title, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.saveAs = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.saveAs = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Adds all listeners.
 */
LocalFile.prototype.getDescriptor = function()
{
	return this.desc;
};

/**
* Updates the descriptor of this file with the one from the given file.
*/
LocalFile.prototype.setDescriptor = function(desc)
{
	this.desc = desc;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.getLatestVersion = function(success, error)
{
	if (this.fileHandle == null)
	{
		if (error != null)
		{
			error({message: mxResources.get('cannotOpenFile')});
		}
	}
	else
	{
		this.ui.loadFileSystemEntry(this.fileHandle, success, error);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.saveFile = function(title, revision, success, error, useCurrentData)
{
	if (title != this.title)
	{
		this.fileHandle = null;
		this.desc = null;
	}
	
	this.title = title;

	// Updates data after changing file name
	if (!useCurrentData)
	{
		this.updateFileData();
	}
	
	var binary = this.ui.useCanvasForExport && /(\.png)$/i.test(this.getTitle());
	this.setShadowModified(false);
	var savedData = this.getData();
	
	var done = mxUtils.bind(this, function()
	{
		this.setModified(this.getShadowModified());
		this.contentChanged();
		
		if (success != null)
		{
			success();
		}
	});
	
	var doSave = mxUtils.bind(this, function(data)
	{
		if (this.fileHandle != null)
		{
			// Sets shadow modified state during save
			if (!this.savingFile)
			{
				this.savingFileTime = new Date();
				this.savingFile = true;
				
				var errorWrapper = mxUtils.bind(this, function(e)
				{
					this.savingFile = false;
					
					if (error != null)
					{
						// Wraps error object to offer save status option
						error({error: e});
					}
				});
				
				// Saves a copy as a draft while saving
				this.saveDraft();
				
				this.fileHandle.createWritable().then(mxUtils.bind(this, function(writable)
				{
					this.fileHandle.getFile().then(mxUtils.bind(this, function(newDesc)
					{
						this.invalidFileHandle = null;

						EditorUi.debug('LocalFile.saveFile', [this],
							'desc', [this.desc], 'newDesc', [newDesc],
							'conflict', this.desc.lastModified !=
								newDesc.lastModified);
						
						if (this.desc.lastModified == newDesc.lastModified)
						{
							writable.write((binary) ? this.ui.base64ToBlob(data, 'image/png') : data).then(mxUtils.bind(this, function()
							{
								writable.close().then(mxUtils.bind(this, function()
								{
									this.fileHandle.getFile().then(mxUtils.bind(this, function(desc)
									{
										try
										{
											var lastDesc = this.desc;
											this.savingFile = false;
											this.desc = desc;
											this.fileSaved(savedData, lastDesc, done, errorWrapper);
											
											// Deletes draft after saving
											this.removeDraft();
										}
										catch (e)
										{
											errorWrapper(e);
										}
									}), errorWrapper);
								}), errorWrapper);
							}), errorWrapper);
						}
						else
						{
							this.inConflictState = true;
							errorWrapper();
						}
					}), mxUtils.bind(this, function(e)
					{
						this.invalidFileHandle = true;
						errorWrapper(e);
					}));
				}), errorWrapper);
			}
		}
		else
		{
			if (this.ui.isOfflineApp() || this.ui.isLocalFileSave())
			{
				this.ui.doSaveLocalFile(data, title, (binary) ?
					'image/png' : 'text/xml', binary);
			}
			else
			{
				if (data.length < MAX_REQUEST_SIZE)
				{
					var dot = title.lastIndexOf('.');
					var format = (dot > 0) ? title.substring(dot + 1) : 'xml';
	
					// Do not update modified flag
					new mxXmlRequest(SAVE_URL, 'format=' + format +
						'&xml=' + encodeURIComponent(data) +
						'&filename=' + encodeURIComponent(title) +
						((binary) ? '&binary=1' : '')).
						simulate(document, '_blank');
				}
				else
				{
					this.ui.handleError({message: mxResources.get('drawingTooLarge')}, mxResources.get('error'), mxUtils.bind(this, function()
					{
						mxUtils.popup(data);
					}));
				}
			}
			
			done();
		}
	});
	
	if (binary)
	{
		var p = this.ui.getPngFileProperties(this.ui.fileNode);

		this.ui.getEmbeddedPng(mxUtils.bind(this, function(imageData)
		{
			doSave(imageData);
		}), error, (this.ui.getCurrentFile() != this) ?
			savedData : null, p.scale, p.border);
	}
	else
	{
		doSave(savedData);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
LocalFile.prototype.rename = function(title, success, error)
{
	this.title = title;
	this.descriptorChanged();
	
	if (success != null)
	{
		success();
	}
};
