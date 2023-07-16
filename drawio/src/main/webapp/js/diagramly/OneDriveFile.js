/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
OneDriveFile = function(ui, data, meta)
{
	DrawioFile.call(this, ui, data);
	
	this.meta = meta;
};

//Extends mxEventSource
mxUtils.extend(OneDriveFile, DrawioFile);

/**
 * Shorter autosave delay for optimistic sync.
 */
OneDriveFile.prototype.autosaveDelay = 500;

/**
 * Hook for subclassers.
 */
OneDriveFile.prototype.isRealtimeSupported = function()
{
	return true;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
OneDriveFile.prototype.getFileUrl = function()
{
	var url = this.meta.webUrl;
	url = url.substring(0, url.lastIndexOf('/'));
	
	if (this.meta.parentReference != null)
	{
		try
		{
			// Best effort guessing of the web interface URL for the file
			if (this.meta.parentReference.driveType == 'personal')
			{
				url = 'https://onedrive.live.com/?cid=' + encodeURIComponent(this.meta.parentReference.driveId) +
					'&id=' + encodeURIComponent(this.meta.id);
			}
			else if (this.meta.parentReference.driveType == 'documentLibrary')
			{
				var path = this.meta.parentReference.path;
				path = path.substring(path.indexOf('/root:') + 6);
				
				var id = this.meta.webUrl;
				var url = id.substring(0, id.length - path.length - encodeURIComponent(this.meta.name).length - 1); 
				id = id.substring(id.indexOf('/', 8));
				
				url = url + '/Forms/AllItems.aspx?id=' + id + '&parent=' + id.substring(0, id.lastIndexOf('/'));
			}
			else if (this.meta.parentReference.driveType == 'business')
			{
				var url = this.meta['@microsoft.graph.downloadUrl'];
				var idx = url.indexOf('/_layouts/15/download.aspx?');
			
				// Strips protocol
				var id = this.meta.webUrl;
				var parent = id;
				
				id = id.substring(8);
			
				// Gets path and parent path
				id = id.substring(id.indexOf('/'));
				parent = parent.substring(0, parent.lastIndexOf('/'));
				parent = parent.substring(parent.indexOf('/', 8))
				
				url = url.substring(0, idx) + '/_layouts/15/onedrive.aspx?id=' + id + '&parent=' + parent;
			}
		}
		catch (e)
		{
			// ignore
		}
	}

	return url;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
OneDriveFile.prototype.getFolderUrl = function()
{
	var url = this.meta.webUrl;
	var name = encodeURIComponent(this.meta.name);
	
	if (url.substring(url.length - name.length, url.length) == name)
	{
		url = url.substring(0, url.length - name.length);
	}

	return url;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.share = function()
{
	this.ui.openLink(this.getFileUrl());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getId = function()
{
	return this.getIdOf(this.meta);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getParentId = function()
{
	return this.getIdOf(this.meta, true);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getIdOf = function(itemObj, parent)
{
	//TODO driveId is most probably always there. No need to check if it exists. Also, after some time, the code that check the old id format won't be needed 
	return ((itemObj.parentReference != null && itemObj.parentReference.driveId != null) ? itemObj.parentReference.driveId + '/' : '') +
		((parent != null) ? itemObj.parentReference.id : (itemObj.id + (itemObj.folder && itemObj.folder.isRoot? '/root' : '')));
};

/**
 * Gets the channel ID for sync messages.
 */
OneDriveFile.prototype.getChannelId = function()
{
	return 'W-' + DrawioFile.prototype.getChannelId.apply(this, arguments);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getHash = function()
{
	return 'W' + encodeURIComponent(this.getId());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getMode = function()
{
	return App.MODE_ONEDRIVE;
};

/**
 * Overridden to enable the autosave option in the document properties dialog.
 */
OneDriveFile.prototype.isAutosaveOptional = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.getTitle = function()
{
	return this.meta.name;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.isRenamable = function()
{
	return true;
};

/**
 * Returns true if the notification to update should be sent
 * together with the save request.
 */
OneDriveFile.prototype.isOptimisticSync = function()
{
	return true;
};

/**
 * Hook for subclassers.
 */
OneDriveFile.prototype.isSyncSupported = function()
{
	return true;
};

/**
 * Specifies if notify events should be ignored.
 */
OneDriveFile.prototype.getSize = function()
{
	return this.meta.size;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
OneDriveFile.prototype.isConflict = function(req)
{
	return req != null && (req.getStatus() == 412 || req.getStatus() == 409);
};

/**
 * Returns the current etag.
 */
OneDriveFile.prototype.getCurrentUser = function()
{
	return (this.ui.oneDrive != null) ? this.ui.oneDrive.user : null;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
OneDriveFile.prototype.loadDescriptor = function(success, error)
{
	this.ui.oneDrive.executeRequest(this.ui.oneDrive.getItemURL(this.getId()), mxUtils.bind(this, function(req)
	{
		if (req.getStatus() >= 200 && req.getStatus() <= 299)
		{
			success(JSON.parse(req.getText()));
		}
		else if (error != null)
		{
			error();
		}
	}), error);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
OneDriveFile.prototype.getLatestVersion = function(success, error)
{
	this.ui.oneDrive.getFile(this.getId(), success, error);
};

/**
 * Hook for subclassers to update the descriptor from given file
 */
OneDriveFile.prototype.getDescriptor = function()
{
	return this.meta;
};

/**
 * Hook for subclassers to update the descriptor from given file
 */
OneDriveFile.prototype.setDescriptor = function(desc)
{
	this.meta = desc;
};

/**
 * Adds all listeners.
 */
OneDriveFile.prototype.getDescriptorEtag = function(desc)
{
	return desc.eTag;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
OneDriveFile.prototype.setDescriptorEtag = function(desc, etag)
{
	desc.eTag = etag;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
OneDriveFile.prototype.loadPatchDescriptor = function(success, error)
{
	var url = this.ui.oneDrive.getItemURL(this.getId());

	this.ui.oneDrive.executeRequest(url + '?select=etag,file' , mxUtils.bind(this, function(req)
	{
		if (req.getStatus() >= 200 && req.getStatus() <= 299)
		{
			success(JSON.parse(req.getText()));
		}
		else
		{
			error(this.ui.oneDrive.parseRequestText(req));
		}
	}), error)
};

/**
 * Using MD5 of create timestamp and user ID as crypto key.
 */
OneDriveFile.prototype.getChannelKey = function()
{
	if (typeof CryptoJS !== 'undefined')
	{
		return CryptoJS.MD5(this.meta.createdDateTime +
			((this.meta.createdBy != null &&
			this.meta.createdBy.user != null) ?
			this.meta.createdBy.user.id : '')).toString();
	}
	
	return null;
};

/**
 * Adds all listeners.
 */
OneDriveFile.prototype.getLastModifiedDate = function()
{
	return new Date(this.meta.lastModifiedDateTime);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.save = function(revision, success, error, unloading, overwrite)
{
	this.doSave(this.getTitle(), revision, success, error, unloading, overwrite);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.saveAs = function(title, success, error)
{
	this.doSave(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.doSave = function(title, revision, success, error, unloading, overwrite)
{
	// Forces update of data for new extensions
	var prev = this.meta.name;
	this.meta.name = title;
	
	DrawioFile.prototype.save.apply(this, [null, mxUtils.bind(this, function()
	{
		this.meta.name = prev;
		this.saveFile(title, revision, success, error, unloading, overwrite);
	}), error, unloading, overwrite]);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.saveFile = function(title, revision, success, error, unloading, overwrite)
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
		if (this.getTitle() == title)
		{
			var doSave = mxUtils.bind(this, function()
			{
				try
				{
					// Sets shadow modified state during save
					this.savingFileTime = new Date();
					this.setShadowModified(false);
					this.savingFile = true;
					
					var etag = (!overwrite && this.constructor == OneDriveFile &&
						(DrawioFile.SYNC == 'manual' || DrawioFile.SYNC == 'auto')) ?
						this.getCurrentEtag() : null;
					var lastDesc = this.meta;

					if (this.sync != null)
					{
						this.sync.fileSaving();
					}

					this.ui.oneDrive.saveFile(this, mxUtils.bind(this, function(meta, savedData)
					{
						// Checks for changes during save
						this.setModified(this.getShadowModified());
						this.savingFile = false;
						this.meta = meta;
	
						this.fileSaved(savedData, lastDesc, mxUtils.bind(this, function()
						{
							this.contentChanged();
							
							if (success != null)
							{
								success();
							}
						}), error);
					}), mxUtils.bind(this, function(err, req)
					{
						try
						{
							this.savingFile = false;
							
							if (this.isConflict(req))
					    	{
								this.inConflictState = true;
		
								if (this.sync != null)
								{	
									this.savingFile = true;
									
									this.sync.fileConflict(null, mxUtils.bind(this, function()
									{
										// Adds random cool-off
										window.setTimeout(mxUtils.bind(this, function()
										{
											this.updateFileData();
											doSave();
										}), 100 + Math.random() * 500);
									}), mxUtils.bind(this, function()
									{
										this.savingFile = false;
							
										if (error != null)
										{
											error();
										}
									}));
								}
								else if (error != null)
								{
									error();
								}
							}
							else if (error != null)
							{
								error(err);
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
					}), etag);
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
			});
			
			doSave();
		}
		else
		{
			// Sets shadow modified state during save
			this.savingFileTime = new Date();
			this.setShadowModified(false);
			this.savingFile = true;
		
			this.ui.oneDrive.insertFile(title, this.getData(), mxUtils.bind(this, function(file)
			{
				// Checks for changes during save
				this.setModified(this.getShadowModified());
				this.savingFile = false;
				
				if (success != null)
				{
					success();
				}
				
				this.ui.fileLoaded(file);
			}), mxUtils.bind(this, function()
			{
				this.savingFile = false;
				
				if (error != null)
				{
					error();
				}
			}));
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.rename = function(title, success, error)
{
	var rev = this.getCurrentRevisionId();
	
	this.ui.oneDrive.renameFile(this, title, mxUtils.bind(this, function(meta)
	{
		if (!this.hasSameExtension(title, this.getTitle()))
		{
			this.meta = meta;
			
			if (this.sync != null)
			{
				this.sync.descriptorChanged(rev);
			}
			
			this.save(true, success, error);
		}
		else
		{
			this.meta = meta;
			this.descriptorChanged();

			if (this.sync != null)
			{
				this.sync.descriptorChanged(rev);
			}
			
			if (success != null)
			{
				success(meta);
			}
		}
	}), error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveFile.prototype.move = function(folderId, success, error)
{
	this.ui.oneDrive.moveFile(this.getId(), folderId, mxUtils.bind(this, function(meta)
	{
		this.meta = meta;
		this.descriptorChanged();
		
		if (success != null)
		{
			success(meta);
		}
	}), error);
};
