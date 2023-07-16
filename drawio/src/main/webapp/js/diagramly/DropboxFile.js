/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
DropboxFile = function(ui, data, stat)
{
	DrawioFile.call(this, ui, data);
	
	this.stat = stat;
};

//Extends mxEventSource
mxUtils.extend(DropboxFile, DrawioFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.getId = function()
{
	return this.stat.path_display.substring(1);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.getHash = function()
{
	return 'D' + encodeURIComponent(this.getId());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.getMode = function()
{
	return App.MODE_DROPBOX;
};

/**
 * Overridden to enable the autosave option in the document properties dialog.
 */
DropboxFile.prototype.isAutosaveOptional = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.getTitle = function()
{
	return this.stat.name;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.isRenamable = function()
{
	return true;
};

/**
 * Specifies if notify events should be ignored.
 */
DropboxFile.prototype.getSize = function()
{
	return this.stat.size;
};

/**
 * Hook for subclassers.
 */
DropboxFile.prototype.isRevisionHistorySupported = function()
{
	return true;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DropboxFile.prototype.getFileUrl = function()
{
	return 'https://www.dropbox.com/home/Apps' + this.ui.dropbox.appPath + this.stat.path_display;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DropboxFile.prototype.getFolderUrl = function()
{
	var url = this.getFileUrl();
				
	return url.substring(0, url.lastIndexOf('/'));
};

/**
 * Hook for subclassers.
 */
DropboxFile.prototype.getRevisions = function(success, error)
{
	var promise = this.ui.dropbox.client.filesListRevisions({path: this.stat.path_lower, limit: 100});
	
	promise.then(mxUtils.bind(this, function(resp)
	{
		try
		{
			var revs = [];
			
			for (var i = resp.entries.length - 1; i >= 0; i--)
			{
				(mxUtils.bind(this, function(stat)
				{
					revs.push({modifiedDate: stat.client_modified, fileSize: stat.size,
						getXml: mxUtils.bind(this, function(itemSuccess, itemError)
					{
						this.ui.dropbox.readFile({path: this.stat.path_lower, rev: stat.rev},
							itemSuccess, itemError);
					}), getUrl: mxUtils.bind(this, function(page)
					{
						return this.ui.getUrl(window.location.pathname + '?rev=' +
							stat.rev + '&chrome=0&nav=1&layers=1&edit=_blank' + ((page != null) ?
							'&page=' + page : '')) + window.location.hash;
					})});
				}))(resp.entries[i]);
			}
			
			success(revs);
		}
		catch (e)
		{
			error(e);
		}
	}));
	
	// Workaround for IE8/9 support with catch function
	promise['catch'](function(err)
	{
		error(err);
	});
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DropboxFile.prototype.getLatestVersion = function(success, error)
{
	this.ui.dropbox.getFile(this.getId(), success, error);
};

/**
* Updates the descriptor of this file with the one from the given file.
*/
DropboxFile.prototype.updateDescriptor = function(newFile)
{
	this.stat = newFile.stat;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.save = function(revision, success, error, unloading, overwrite)
{
	this.doSave(this.getTitle(), revision, success, error, unloading, overwrite);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.saveAs = function(title, success, error)
{
	this.doSave(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.doSave = function(title, revision, success, error, unloading, overwrite)
{
	// Forces update of data for new extensions
	var prev = this.stat.name;
	this.stat.name = title;
	
	DrawioFile.prototype.save.apply(this, [null, mxUtils.bind(this, function()
	{
		this.stat.name = prev;
		this.saveFile(title, revision, success, error, unloading, overwrite);
	}), error, unloading, overwrite]);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.saveFile = function(title, revision, success, error)
{
	if (!this.isEditable())
	{
		if (success != null)
		{
			success();
		}
	}
	else if (!this.savingFile)
	{
		var fn = mxUtils.bind(this, function(checked)
		{
			if (checked)
			{
				try
				{
					// Sets shadow modified state during save
					this.savingFileTime = new Date();
					this.setShadowModified(false);
					this.savingFile = true;
					
					var doSave = mxUtils.bind(this, function(data)
					{
						var index = this.stat.path_display.lastIndexOf('/');
						var folder = (index > 1) ? this.stat.path_display.substring(1, index + 1) : null;
						
						this.ui.dropbox.saveFile(title, data, mxUtils.bind(this, function(stat)
						{
							// Checks for changes during save
							this.setModified(this.getShadowModified());
							this.savingFile = false;
							this.stat = stat;
							this.contentChanged();
							
							if (success != null)
							{
								success();
							}
						}), mxUtils.bind(this, function(err)
						{
							this.savingFile = false;

							if (error != null)
							{
								error(err);
							}
						}), folder);
					});
					
					if (this.ui.useCanvasForExport && /(\.png)$/i.test(this.getTitle()))
					{
						var p = this.ui.getPngFileProperties(this.ui.fileNode);
						
						this.ui.getEmbeddedPng(mxUtils.bind(this, function(data)
						{
							doSave(this.ui.base64ToBlob(data, 'image/png'));
						}), error, (this.ui.getCurrentFile() != this) ?
							this.getData() : null, p.scale, p.border);
					}
					else
					{
						doSave(this.getData());
					}
				}
				catch (e)
				{
					this.savingFile = false;

					if (error != null)
					{
						error(e);
					}
					else
					{
						throw e;
					}
				}
			}
			else if (error != null)
			{
				error();
			}
		});
		
		if (this.getTitle() == title)
		{
			fn(true);
		}
		else
		{
			this.ui.dropbox.checkExists(title, fn);
		}
	}
	else if (error != null)
	{
		error({code: App.ERROR_BUSY});
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxFile.prototype.rename = function(title, success, error)
{
	this.ui.dropbox.renameFile(this, title, mxUtils.bind(this, function(stat)
	{
		if (!this.hasSameExtension(title, this.getTitle()))
		{
			this.stat = stat;
			// Required in this case to update hash tag in page
			// before saving so that the edit link is correct
			this.descriptorChanged();
			this.save(true, success, error);
		}
		else
		{
			this.stat = stat;
			this.descriptorChanged();
			
			if (success != null)
			{
				success();
			}
		}
	}), error);
};
