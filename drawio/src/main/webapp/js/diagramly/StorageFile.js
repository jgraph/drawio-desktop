/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
/**
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 * @constructor
 * @class Implements a basic 2D point. Known subclassers = {@link mxRectangle}.
 * @param {number} x X-coordinate of the point.
 * @param {number} y Y-coordinate of the point.
 */
StorageFile = function(ui, data, title)
{
	DrawioFile.call(this, ui, data);
	
	this.title = title;
};

//Extends mxEventSource
mxUtils.extend(StorageFile, DrawioFile);

/**
 * Sets the delay for autosave in milliseconds. Default is 2000.
 */
StorageFile.prototype.autosaveDelay = 2000;

/**
 * Sets the delay for autosave in milliseconds. Default is 20000.
 */
StorageFile.prototype.maxAutosaveDelay = 20000;

/**
 * A differentiator of the stored object type (file or lib)
 */
StorageFile.prototype.type = 'F';

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.getMode = function()
{
	return App.MODE_BROWSER;
};

/**
 * Overridden to enable the autosave option in the document properties dialog.
 */
StorageFile.prototype.isAutosaveOptional = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.getHash = function()
{
	return 'L' + encodeURIComponent(this.getTitle());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.getTitle = function()
{
	return this.title;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.isRenamable = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.save = function(revision, success, error)
{
	this.saveAs(this.getTitle(), success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.saveAs = function(title, success, error)
{
	DrawioFile.prototype.save.apply(this, arguments);
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.insertFile = function(ui, title, data, success, error)
{
	var createStorageFile = mxUtils.bind(this, function(exists)
	{
		var fn = function()
		{
			var file = new StorageFile(ui, data, title);
			
			// Inserts data into local storage
			file.saveFile(title, false, function()
			{
				success(file);
			}, error);
		};

		if (exists)
		{
			ui.confirm(mxResources.get('replaceIt', [title]), fn, error);
		}
		else
		{
			fn();
		}
	});
	
	StorageFile.getFileContent(ui, title, function(data)
	{
		createStorageFile(data != null);
	}, function()
	{
		createStorageFile(false);
	});
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.getFileContent = function(ui, title, success, error)
{
	ui.getDatabaseItem(title, function(obj)
	{
		success(obj != null? obj.data : null);
	}, 
	mxUtils.bind(this, function()
	{
		if (ui.database == null) //fallback to localstorage
		{
			ui.getLocalData(title, success);
		}
		else if (error != null)
		{
			error();
		}
	}), 'files');
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.getFileInfo = function(ui, title, success, error)
{
	ui.getDatabaseItem(title, function(obj)
	{
		success(obj);
	}, 
	mxUtils.bind(this, function()
	{
		if (ui.database == null) //fallback to localstorage
		{
			ui.getLocalData(title, function(data)
			{
				success(data != null? {title: title} : null);
			});
		}
		else if (error != null)
		{
			error();
		}
	}), 'filesInfo');
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.saveFile = function(title, revision, success, error)
{
	if (!this.isEditable())
	{
		if (success != null)
		{
			success();
		}
	}
	else
	{
		var fn = mxUtils.bind(this, function()
		{
			if (this.isRenamable())
			{
				this.title = title;
			}
			
			try
			{
				var saveDone = mxUtils.bind(this, function()
				{
					this.setModified(this.getShadowModified());
					this.contentChanged();
					
					if (success != null)
					{
						success();
					}
		        });
				
				this.setShadowModified(false);
				var data = this.getData();
				
				this.ui.setDatabaseItem(null, [{
						title: this.title,
						size: data.length,
						lastModified: Date.now(),
						type: this.type
					}, {
						title: this.title,
						data: data
					}], saveDone, mxUtils.bind(this, function()
					{
						if (this.ui.database == null) //fallback to localstorage
						{
							try
							{
								this.ui.setLocalData(this.title, data, saveDone);
							}
							catch (e)
							{
								if (error != null)
								{
									error(e);
								}
							}
						}
						else if (error != null)
						{
							error();
						}
					}), ['filesInfo', 'files']);
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		});
		
		// Checks for trailing dots
		if (this.isRenamable() && title.charAt(0) == '.' && error != null)
		{
			error({message: mxResources.get('invalidName')});
		}
		else
		{
			StorageFile.getFileInfo(this.ui, title, mxUtils.bind(this, function(data)
			{
				if (!this.isRenamable() || this.getTitle() == title || data == null)
				{
					fn();
				}
				else
				{
					this.ui.confirm(mxResources.get('replaceIt', [title]), fn, error);
				}
			}), error);
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.prototype.rename = function(title, success, error)
{
	var oldTitle = this.getTitle();

	if (oldTitle != title)
	{
		StorageFile.getFileInfo(this.ui, title, mxUtils.bind(this, function(data)
		{
			var fn = mxUtils.bind(this, function()
			{
				this.title = title;
				
				// Updates the data if the extension has changed
				if (!this.hasSameExtension(oldTitle, title))
				{
					this.setData(this.ui.getFileData());
				}
				
				this.saveFile(title, false, mxUtils.bind(this, function()
				{
					this.ui.removeLocalData(oldTitle, success);
				}), error);
			});
			
			if (data != null)
			{
				this.ui.confirm(mxResources.get('replaceIt', [title]), fn, error);
			}
			else
			{
				fn();
			}
		}), error);
	}
	else
	{
		success();
	}
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
StorageFile.prototype.open = function()
{
	DrawioFile.prototype.open.apply(this, arguments);

	// Immediately creates the storage entry
	this.saveFile(this.getTitle());
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
StorageFile.prototype.getLatestVersion = function(success, error)
{
	StorageFile.getFileContent(this.ui, this.title, mxUtils.bind(this, function(data)
	{
		success(new StorageFile(this.ui, data, this.title));
	}), error);
};

/**
 * Stops any pending autosaves and removes all listeners.
 */
StorageFile.prototype.destroy = function()
{
	DrawioFile.prototype.destroy.apply(this, arguments);
	
	if (this.storageListener != null)
	{
		mxEvent.removeListener(window, 'storage', this.storageListener);
		this.storageListener = null;
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.listLocalStorageFiles = function(type)
{
	var filesInfo = [];
	
	for (var i = 0; i < localStorage.length; i++)
	{
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		
		if (key.length > 0 && key.charAt(0) != '.' && value.length > 0)
		{
			var isFile = (type == null || type == 'F') && (value.substring(0, 8) === '<mxfile ' ||
						value.substring(0, 5) === '<?xml' || value.substring(0, 12) === '<!--[if IE]>');
			var isLib = (type == null || type == 'L') && (value.substring(0, 11) === '<mxlibrary>');

			if (isFile || isLib)
			{
				filesInfo.push({
					title: key,
					type: isFile? 'F' : 'L',
					size: value.length,
					lastModified: Date.now()
				});
			}	
		}
	}
	
	return filesInfo;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.migrate = function(db) 
{
	var lsFilesInfo = StorageFile.listLocalStorageFiles();
	lsFilesInfo.push({title: '.scratchpad', type: 'L'}); //Adding scratchpad also since it is a library (storage file)
	var tx = db.transaction(['files', 'filesInfo'], 'readwrite');
	var files = tx.objectStore('files');
	var filesInfo = tx.objectStore('filesInfo');
	
	for (var i = 0; i < lsFilesInfo.length; i++)
	{
		var lsFileInfo = lsFilesInfo[i];
		var data = localStorage.getItem(lsFileInfo.title);
		files.add({
			title: lsFileInfo.title,
			data: data
		});
		filesInfo.add(lsFileInfo);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.listFiles = function(ui, type, success, error)
{
	ui.getDatabaseItems(function(filesInfo)
	{
		var files = [];
		
		if (filesInfo != null)
		{
			for (var i = 0; i < filesInfo.length; i++)
			{
				if (filesInfo[i].title.charAt(0) != '.' && (type == null || filesInfo[i].type == type))
				{
					files.push(filesInfo[i]);
				}
			}
		}
		
		success(files);
	}, function()
	{
		if (ui.database == null) //fallback to localstorage
		{
			success(StorageFile.listLocalStorageFiles(type));
		}
		else if (error != null)
		{
			error();
		}
	}, 'filesInfo');
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
StorageFile.deleteFile = function(ui, title, success, error)
{
	ui.removeDatabaseItem([title, title], success, function()
	{
		if (ui.database == null) //fallback to localstorage
		{
			localStorage.removeItem(title)
			success();
		}
		else if (error != null)
		{
			error();
		}
	}, ['files', 'filesInfo']);
};