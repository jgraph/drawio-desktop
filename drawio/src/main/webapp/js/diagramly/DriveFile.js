/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
DriveFile = function(ui, data, desc)
{
	DrawioFile.call(this, ui, data);
	
	this.desc = desc;
};

//Extends mxEventSource
mxUtils.extend(DriveFile, DrawioFile);

/**
 * Delay for last save in ms.
 */
DriveFile.prototype.saveDelay = 0;

/**
 * Delay for last save in ms.
 */
DriveFile.prototype.allChangesSavedKey = 'allChangesSavedInDrive';

/**
 * Specifies if notify events should be ignored.
 */
DriveFile.prototype.getSize = function()
{
	return this.desc.fileSize;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DriveFile.prototype.isRestricted = function()
{
	return DrawioFile.RESTRICT_EXPORT || (this.desc.userPermission != null && this.desc.labels != null &&
		this.desc.userPermission.role == 'reader' && this.desc.labels.restricted);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.isConflict = function(err)
{
	return err != null && err.error != null && err.error.code == 412;
};

/**
 * Returns the current etag.
 */
DriveFile.prototype.getCurrentUser = function()
{
	return (this.ui.drive != null) ? this.ui.drive.user : null;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.getMode = function()
{
	return App.MODE_GOOGLE;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DriveFile.prototype.getFileUrl = function()
{
	return 'https://drive.google.com/open?authuser=0&id=' + this.getId();
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DriveFile.prototype.getFolderUrl = function()
{
	if (this.desc.labels != null && this.desc.labels.trashed)
	{
		return 'https://drive.google.com/drive/trash';
	}
	else
	{
		return (this.desc.parents != null && this.desc.parents.length > 0) ?
			'https://drive.google.com/drive/folders/' +
			this.desc.parents[0].id : null;
	}
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DriveFile.prototype.getPublicUrl = function(fn)
{
	this.ui.drive.executeRequest({
		url: '/files/' + this.desc.id + '/permissions?supportsAllDrives=true'
	}, 
	mxUtils.bind(this, function(resp)
	{
		if (resp != null && resp.items != null)
		{
			for (var i = 0; i < resp.items.length; i++)
			{
				if (resp.items[i].id === 'anyoneWithLink' ||
					resp.items[i].id === 'anyone')
				{
					fn(this.desc.webContentLink);
					
					return;
				}
			}
		}
		
		fn(null);
	}), mxUtils.bind(this, function()
	{
		fn(null)
	}));
};

/**
 * Overridden to enable the autosave option in the document properties dialog
 * if realtime is not used.
 */
DriveFile.prototype.isAutosaveOptional = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.isRenamable = function()
{
	return this.isEditable() && DrawioFile.prototype.isEditable.apply(this, arguments);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.isMovable = function()
{
	return this.isEditable();
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.isTrashed = function()
{
	return this.desc.labels.trashed;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.save = function(revision, success, error, unloading, overwrite)
{
	DrawioFile.prototype.save.apply(this, [revision, mxUtils.bind(this, function()
	{
		this.saveFile(null, revision, success, error, unloading, overwrite);
	}), error, unloading, overwrite]);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.saveFile = function(title, revision, success, error, unloading, overwrite)
{
	try
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
			// Sets shadow modified state during save
			this.savingFileTime = new Date();
			this.setShadowModified(false);
			this.savingFile = true;

			this.createSecret(mxUtils.bind(this, function(secret, token)
			{
				var doSave = mxUtils.bind(this, function(realOverwrite, realRevision)
				{
					try
					{
						var lastDesc = this.desc;
						
						if (this.sync != null)
						{
							this.sync.fileSaving();
						}
	
						this.ui.drive.saveFile(this, realRevision, mxUtils.bind(this, function(resp, savedData, pages, checksum)
						{
							try
							{
								this.savingFile = false;
								
								// Handles special case where resp is false eg
								// if the old file was converted to realtime
								if (resp != false)
								{
									// Checks for changes during save
									this.setModified(this.getShadowModified());
									
									if (revision)
									{
										this.lastAutosaveRevision = new Date().getTime();
									}
				
									// Adaptive autosave delay
									this.autosaveDelay = Math.round(Math.min(10000,
										Math.max(DriveFile.prototype.autosaveDelay,
											this.saveDelay)));
									this.desc = resp;
									
									// Shows possible errors but keeps the modified flag as the
									// file was saved but the cache entry could not be written
									if (token != null || !Editor.enableRealtimeCache)
									{
										this.fileSaved(savedData, lastDesc, mxUtils.bind(this, function()
										{
											this.contentChanged();
											
											if (success != null)
											{
												success(resp);
											}
										}), error, token, pages, checksum);
									}
									else if (success != null)
									{
										// TODO: Fix possible saving state never being reset
										success(resp);
									}
								}
								else if (error != null)
								{
									error(resp);
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
						}), mxUtils.bind(this, function(err, desc)
						{
							try
							{
								this.savingFile = false;
								
								if (this.isConflict(err))
								{
									this.inConflictState = true;
									
									if (this.sync != null)
									{
										this.savingFile = true;
										
										this.sync.fileConflict(desc, mxUtils.bind(this, function()
										{
											// Adds random cool-off
											window.setTimeout(mxUtils.bind(this, function()
											{
												this.updateFileData();
												this.setShadowModified(false);
												doSave(realOverwrite, true);
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
						}), unloading, unloading, realOverwrite, null, secret);
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
				
				doSave(overwrite, revision);				
			}));
		}
	}
	catch (e)
	{
		if (error != null)
		{
			error(e);
		}
		else
		{
			throw e;
		}
	}
};

/**
 * Shows a conflict dialog to the user.
 */
DriveFile.prototype.copyFile = function(success, error)
{
	if (!this.isRestricted())
	{
		this.makeCopy(mxUtils.bind(this, function()
		{
			if (this.ui.spinner.spin(document.body, mxResources.get('saving')))
			{
				try
				{
					this.save(true, success, error)
				}
				catch (e)
				{
					error(e);
				}
			}
		}), error, true);
	}
	else
	{
		DrawioFile.prototype.copyFile.apply(this, arguments);
	}	
};

/**
 * Shows a conflict dialog to the user.
 */
DriveFile.prototype.makeCopy = function(success, error, timestamp)
{
	if (this.ui.spinner.spin(document.body, mxResources.get('saving')))
	{
		// Uses copyFile internally which is a remote REST call with the advantage of keeping
		// the parents of the file in-place, but copies the remote file contents so needs to
		// be updated as soon as we have the ID.
		this.saveAs(this.ui.getCopyFilename(this, timestamp), mxUtils.bind(this, function(resp)
		{
			this.desc = resp;
			this.ui.spinner.stop();
			this.setModified(false);
			
			this.backupPatch = null;
			this.invalidChecksum = false;
			this.inConflictState = false;
			
			this.descriptorChanged();
			success();
		}), mxUtils.bind(this, function()
		{
			this.ui.spinner.stop();
			
			if (error != null)
			{
				error();
			}
		}));
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.saveAs = function(filename, success, error)
{
	this.ui.drive.copyFile(this.getId(), filename, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.rename = function(title, success, error)
{
	var rev = this.getCurrentRevisionId();
	
	this.ui.drive.renameFile(this.getId(), title, mxUtils.bind(this, function(desc)
	{
		if (!this.hasSameExtension(title, this.getTitle()))
		{
			this.desc = desc;

			if (this.sync != null)
			{
				this.sync.descriptorChanged(rev);
			}
			
			this.save(true, success, error);
		}
		else
		{
			this.desc = desc;
			this.descriptorChanged();
			
			if (this.sync != null)
			{
				this.sync.descriptorChanged(rev);
			}
			
			if (success != null)
			{
				success(desc);
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
DriveFile.prototype.move = function(folderId, success, error)
{
	this.ui.drive.moveFile(this.getId(), folderId, mxUtils.bind(this, function(resp)
	{
		this.desc = resp;
		this.descriptorChanged();
		
		if (success != null)
		{
			success(resp);
		}
	}), error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.share = function()
{
	this.ui.drive.showPermissions(this.getId());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.getTitle = function()
{
	return this.desc.title;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.getHash = function()
{
	return 'G' + this.getId();
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.getId = function()
{
	return this.desc.id;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DriveFile.prototype.isEditable = function()
{
	return DrawioFile.prototype.isEditable.apply(this, arguments) &&
		this.desc.editable;
};

/**
 * Hook for subclassers.
 */
DriveFile.prototype.isSyncSupported = function()
{
	return true;
};

/**
 * Hook for subclassers.
 */
DriveFile.prototype.isRealtimeSupported = function()
{
	return true;
};

/**
 * Returns true if all changes should be sent out immediately.
 */
DriveFile.prototype.isRealtimeOptional = function()
{
	return this.sync != null && this.sync.isConnected();
};

/**
 * Returns true if all changes should be sent out immediately.
 */
DriveFile.prototype.setRealtimeEnabled = function(value, success, error)
{
	if (this.sync != null)
	{
		this.ui.drive.executeRequest({
			'url': '/files/' + this.getId() + '/properties?alt=json&supportsAllDrives=true',
			'method': 'POST',
			'contentType': 'application/json; charset=UTF-8',
			'params': {
				'key': 'collaboration',
				'value': (value) ? 'enabled' :
					((urlParams['fast-sync'] != '0') ?
						'disabled' : '')
			}
		}, mxUtils.bind(this, function()
		{
			this.loadDescriptor(mxUtils.bind(this, function(desc)
			{
				if (desc != null)
				{
					this.sync.descriptorChanged(this.getCurrentEtag());
					this.sync.updateDescriptor(desc);
					success();
				}
				else
				{
					error();
				}
			}), error);
		}), error);
	}
	else
	{
		error();
	}
};

/**
 * Returns true if all changes should be sent out immediately.
 */
DriveFile.prototype.isRealtimeEnabled = function()
{
	var collab = this.ui.drive.getCustomProperty(this.desc, 'collaboration');

	return (DrawioFile.prototype.isRealtimeEnabled.apply(this, arguments) &&
		collab != 'disabled') || (Editor.enableRealtime && collab == 'enabled');
};

/**
 * Hook for subclassers.
 */
DriveFile.prototype.isRevisionHistorySupported = function()
{
	return true;
};

/**
 * Hook for subclassers.
 */
DriveFile.prototype.getRevisions = function(success, error)
{
	this.ui.drive.executeRequest(
	{
		url: '/files/' + this.getId() + '/revisions'
	},
	mxUtils.bind(this, function(resp)
	{
		for (var i = 0; i < resp.items.length; i++)
		{
			(mxUtils.bind(this, function(item)
			{
				// Redirects title to originalFilename to
				// match expected descriptor interface
				item.title = item.originalFilename;
				
				item.getXml = mxUtils.bind(this, function(itemSuccess, itemError)
				{
					this.ui.drive.getXmlFile(item, mxUtils.bind(this, function(file)
		   			{
						itemSuccess(file.getData());
		   			}), itemError);
				});
				
				item.getUrl = mxUtils.bind(this, function(page)
				{
					return this.ui.getUrl(window.location.pathname + '?rev=' + item.id +
						'&chrome=0&nav=1&layers=1&edit=_blank' + ((page != null) ?
						'&page=' + page : '')) + window.location.hash;
				});
			}))(resp.items[i]);
		}
		
		success(resp.items);
	}), error);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.getLatestVersion = function(success, error)
{
	this.ui.drive.getFile(this.getId(), success, error, true);
};

/**
 * Adds all listeners.
 */
DriveFile.prototype.getChannelId = function()
{
	var chan = this.ui.drive.getCustomProperty(this.desc, 'channel');
	
	if (chan != null)
	{
		chan = 'G-' + this.getId() + '.' + chan;
	}
	
	return chan;
};

/**
 * Gets the channel ID from the given descriptor.
 */
DriveFile.prototype.getChannelKey = function()
{
	return this.ui.drive.getCustomProperty(this.desc, 'key');
};

/**
 * Adds all listeners.
 */
DriveFile.prototype.getLastModifiedDate = function()
{
	return new Date(this.desc.modifiedDate);
};

/**
 * Adds all listeners.
 */
DriveFile.prototype.getDescriptor = function()
{
	return this.desc;
};

/**
* Updates the descriptor of this file with the one from the given file.
*/
DriveFile.prototype.setDescriptor = function(desc)
{
	this.desc = desc;
};

/**
 * Returns the checksum from the given descriptor.
 */
DriveFile.prototype.getDescriptorChecksum = function(desc)
{
	var value = this.ui.drive.getCustomProperty(desc, 'checksum');
	var secret = this.getDescriptorSecret(desc);
	var result = null;

	if (value != null && secret != null)
	{
		tokens = value.split(':');

		// Checks if checksum matches current secret
		if (tokens.length == 2 && tokens[0] == secret)
		{
			result = tokens[1];
		}
	}

	return result;
};

/**
 * Returns the secret from the given descriptor.
 */
DriveFile.prototype.getDescriptorSecret = function(desc)
{
	return this.ui.drive.getCustomProperty(desc, 'secret');
};

/**
 * Updates the revision ID on the given descriptor.
 */
DriveFile.prototype.setDescriptorRevisionId = function(desc, id)
{
	desc.headRevisionId = id;
};

/**
 * Returns the revision ID from the given descriptor.
 */
DriveFile.prototype.getDescriptorRevisionId = function(desc)
{
	return desc.headRevisionId;
};

/**
 * Adds all listeners.
 */
DriveFile.prototype.getDescriptorEtag = function(desc)
{
	return desc.etag;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.setDescriptorEtag = function(desc, etag)
{
	desc.etag = etag;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.loadPatchDescriptor = function(success, error)
{
	this.ui.drive.executeRequest(
	{	
		url: '/files/' + this.getId() + '?supportsAllDrives=true&fields=' + this.ui.drive.catchupFields
	},
	mxUtils.bind(this, function(desc)
	{
		success(desc);
	}), error);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.patchDescriptor = function(desc, patch)
{
	desc.headRevisionId = patch.headRevisionId;
	desc.modifiedDate = patch.modifiedDate;
	
	DrawioFile.prototype.patchDescriptor.apply(this, arguments);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DriveFile.prototype.loadDescriptor = function(success, error)
{
	this.ui.drive.loadDescriptor(this.getId(), success, error);
};

/**
 * Are comments supported
 */
DriveFile.prototype.commentsSupported = function()
{
	return true;
};

/**
 * Get comments of the file
 */
DriveFile.prototype.getComments = function(success, error)
{
	var currentUser = this.ui.getCurrentUser();
	
	function driveCommentToDrawio(file, gComment, pCommentId)
	{
		if (gComment.deleted) return null; //skip deleted comments
		
		var comment = new DriveComment(file, gComment.commentId || gComment.replyId, gComment.content, 
				gComment.modifiedDate, gComment.createdDate, gComment.status == 'resolved',
				gComment.author.isAuthenticatedUser? currentUser :
				new DrawioUser(gComment.author.permissionId, gComment.author.emailAddress,
						gComment.author.displayName, gComment.author.picture.url), pCommentId);
		
		for (var i = 0; gComment.replies != null && i < gComment.replies.length; i++)
		{
			comment.addReplyDirect(driveCommentToDrawio(file, gComment.replies[i], gComment.commentId));
		}
		
		return comment;
	};
	
	this.ui.drive.executeRequest(
	{
		url: '/files/' + this.getId() + '/comments'
	},
	mxUtils.bind(this, function(resp)
	{
		var comments = [];
		
		for (var i = 0; i < resp.items.length; i++)
		{
			var comment = driveCommentToDrawio(this, resp.items[i]);
			
			if (comment != null) comments.push(comment);
		}
		
		success(comments);
	}), error);
};

/**
 * Add a comment to the file
 */
DriveFile.prototype.addComment = function(comment, success, error)
{
	var body = {'content': comment.content};
	
	this.ui.drive.executeRequest(
	{
		url: '/files/' + this.getId() + '/comments',
		method: 'POST',
		params: body
	},
	mxUtils.bind(this, function(resp)
	{
		success(resp.commentId); //pass comment id
	}), error);
};

/**
 * Can add a reply to a reply
 */
DriveFile.prototype.canReplyToReplies = function()
{
	return false;
};

/**
 * Can add comments (The permission to comment to this file)
 */
DriveFile.prototype.canComment = function()
{
	return this.desc.canComment;
};

/**
 * Get a new comment object
 */
DriveFile.prototype.newComment = function(content, user)
{
	return new DriveComment(this, null, content, Date.now(), Date.now(), false, user);
};
