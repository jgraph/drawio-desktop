/**
 * Plugin for embed mode in Nextcloud
 */
Draw.loadPlugin(function(ui)
{
    var loadDescriptor = null;
    var ncUser = null;
    
    mxEvent.addListener(window, 'message', mxUtils.bind(this, function(evt)
    {
        var data = evt.data;

        try
        {
            data = JSON.parse(data);
            
            if (data.action == 'load')
            {
                if (data.desc != null)
                {
                    loadDescriptor = data.desc;
                }

                if (data.disableAutoSave)
                {
                    ui.editor.setAutosave(false);
                }
            }
        }
        catch (e)
        {
            // Ignore
        }
    }));

    ui.getCurrentUser = function()
	{
		if (ncUser == null)
		{
			ui.remoteInvoke('getCurrentUser', null, null, function(user)
			{
				ncUser = user == null? new DrawioUser(Date.now(), null, 'Anonymous')
                                : new DrawioUser(user.uid, null, user.displayName);
			}, function()
			{
				//ignore such that next call we retry
			});
			
			//Return a dummy user until we have the actual user in order for UI to be populated
			return new DrawioUser(Date.now(), null, 'Anonymous');
		}
		
		return ncUser;
	};

    //======================== Revisions ========================
	
	ui.isRevisionHistoryEnabled = function()
	{
        var file = ui.getCurrentFile();
		return file && file.desc && (!file.desc.ver || file.desc.versionsEnabled);
	};
	
	ui.isRevisionHistorySupported = function()
	{
		return ui.isRevisionHistoryEnabled();
	};

	/**
	 * Get revisions of current file
	 */
	ui.getRevisions = function(success, error)
	{
        var desc = ui.getCurrentFile().desc;
        var id = desc.ver > 1? desc.id : desc.path;

		function getXml(success, error)
		{
			ui.remoteInvoke('loadFileVersion', [id, this.revId], null, success, error);
		};
		
		function restoreFn(xml)
		{
			if (ui.spinner.spin(document.body, mxResources.get('restoring')))
			{
                ui.tryAndHandle(function()
				{
                    ui.replaceFileData(xml);
                    ui.spinner.stop();
                    ui.hideDialog();
                });
			}
		};
		
		ui.remoteInvoke('getFileRevisions', [id], null, function(revisions)
		{
            revisions.sort(function(a, b)
            {
                return a.timestamp - b.timestamp;
            });

			//convert to editor format and add getXml function
			var revs = [];
			
			for (var i = 0; i < revisions.length; i++)
			{
				var rev = revisions[i];
                rev.modifiedDate = rev.timestamp * 1000;
				rev.getXml = mxUtils.bind(rev, getXml);
				revs.push(rev);
			}
			
			success(revs, restoreFn);
		}, error);
	};
	
    //============= Embed File with real-time collab support =================
    // Use optimistic sync since we cannot save file properties/metadata so far
    
    /**
     * Shorter autosave delay for optimistic sync.
     */
    EmbedFile.prototype.autosaveDelay = 500;

    /**
     * Delay for last save in ms.
     */
    EmbedFile.prototype.saveDelay = 0;
    
    /**
     * 
     */
    EmbedFile.prototype.isConflict = function(err)
    {
        return err != null && err.status == 409;
    };

    /**
     * Returns the current user.
     */
    EmbedFile.prototype.getCurrentUser = function()
    {
        return ui.getCurrentUser();
    };

    EmbedFile.prototype.isRealtimeSupported = function()
    {
        return true;
    };
    
    /**
     * 
     */
    EmbedFile.prototype.save = function(revision, success, error, unloading, overwrite)
    {
        this.saveStarted = true;
        
        DrawioFile.prototype.save.apply(this, [revision, mxUtils.bind(this, function()
        {
            this.saveFile(null, revision, success, error, unloading, overwrite);
            this.saveStarted = false;
        }), error, unloading, overwrite]);
    };

    /**
     * 
     */
    EmbedFile.prototype.setModified = function(value)
    {
        DrawioFile.prototype.setModified.apply(this, arguments);
        
        //Set editor modified also to prevent accidental closure or exiting without saving  
        ui.editor.modified = value;
    };
    
    /**
     * 
     */
    EmbedFile.prototype.saveFile = function(title, revision, success, error, unloading, overwrite)
    {
        EditorUi.debug('EmbedFile.saveFile', [this], 'saving', this.savingFile);

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


                var doSave = mxUtils.bind(this, function()
                {
                    try
                    {
                        var lastDesc = this.desc;
                        var savedData = this.getData();
                        var etag = this.getCurrentEtag();
                        
                        if (this.sync != null)
                        {
                            this.sync.fileSaving();
                        }

                        ui.remoteInvoke('saveFile', this.desc.ver > 1? [this.desc.id, this.desc.shareToken, savedData, etag] :
                                    [this.desc.path, savedData, etag], null, mxUtils.bind(this, function(resp)
                        {
                            try
                            {
                                // Checks for changes during save
                                this.setModified(this.getShadowModified());
                                this.savingFile = false;
                                this.desc = Object.assign({}, this.desc); // Clone the object
                                Object.assign(this.desc, resp); // Assign the new values
            
                                this.fileSaved(savedData, lastDesc, mxUtils.bind(this, function()
                                {
                                    this.contentChanged();
                                    
                                    if (success != null)
                                    {
                                        success();
                                    }
                                }), error);
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
                        }),
                        mxUtils.bind(this, function(err)
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
                                        
                                        this.sync.fileConflict(null, mxUtils.bind(this, function()
                                        {
                                            // Adds random cool-off
                                            var delay = 100 + Math.random() * 500;
                                            window.setTimeout(mxUtils.bind(this, function()
                                            {
                                                this.updateFileData();
                                                doSave();
                                            }), delay);

                                            EditorUi.debug('EmbedFile.saveFile.conflict',
                                                [this], 'err', err, 'delay', delay);
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
                        }));
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
     * 
     */
    EmbedFile.prototype.getTitle = function()
    {
        return this.desc.name;
    };

    /**
     * 
     */
    EmbedFile.prototype.getHash = function()
    {
        return 'E' + this.getId();
    };

    /**
     * Overridden to enable the autosave option in the document properties dialog.
     */
    EmbedFile.prototype.isAutosaveOptional = function()
    {
        return true;
    };

    /**
     * 
     */
    EmbedFile.prototype.getId = function()
    {
        return this.desc.instanceId + '$$' + this.desc.id;
    };

    /**
     * 
     */
    EmbedFile.prototype.isSyncSupported = function()
	{
		return this.desc != null && this.desc.id != null && this.desc.instanceId != null;
	};

    /**
     * 
     */
    EmbedFile.prototype.isRevisionHistorySupported = function()
    {
        return true;
    };

    EmbedFile.prototype.isOptimisticSync = function()
    {
        return true;
    };
    EmbedFile.prototype.getSize = function()
    {
        return this.desc.size;
    };

    EmbedFile.prototype.isEditable = function()
	{
		return this.desc != null && this.desc.writeable;
	};

    /**
     * 
     */
    EmbedFile.prototype.getLatestVersion = function(success, error)
    {
        ui.remoteInvoke('loadFile', this.desc.ver > 1? [this.desc.id, this.desc.shareToken] : [this.desc.path],
                    null, mxUtils.bind(this, function(data)
        {
            var xml = data.xml;
            delete data.xml;
            success(new EmbedFile(ui, xml, data));
        }), error);
    };

    /**
     * Gets the channel ID from the given descriptor.
     */
    EmbedFile.prototype.getChannelId = function()
    {
        return 'C-' + DrawioFile.prototype.getChannelId.apply(this, arguments);
    };

    EmbedFile.prototype.getHash = function()
    {
        return 'C' + encodeURIComponent(this.getId());
    };

    /**
     * Using MD5 of create timestamp and user ID as crypto key.
     */
    EmbedFile.prototype.getChannelKey = function()
    {
        if (typeof CryptoJS !== 'undefined')
        {
            return CryptoJS.MD5(this.desc.instanceId + this.desc.id).toString();
        }
        
        return null;
    };

    /**
     * 
     */
    EmbedFile.prototype.getLastModifiedDate = function()
    {
        return new Date(this.desc.mtime * 1000);
    };

    /**
     * 
     */
    EmbedFile.prototype.getDescriptor = function()
    {
        return this.desc;
    };

    /**
     * Updates the descriptor of this file with the one from the given file.
     */
    EmbedFile.prototype.setDescriptor = function(desc)
    {
        this.desc = desc;
    };

    /**
     * 
     */
    EmbedFile.prototype.getDescriptorEtag = function(desc)
    {
        return desc.etag;
    };

    /**
     *
     */
    EmbedFile.prototype.setDescriptorEtag = function(desc, etag)
    {
        desc.etag = etag;
    };

    /**
     * 
     */
    EmbedFile.prototype.loadDescriptor = function(success, error)
    {
        ui.remoteInvoke('getFileInfo', this.desc.ver > 1? [this.desc.id, this.desc.shareToken] : [this.desc.path], null, success, error);
    };
    
    var allowAutoSave = true;
    
    EmbedFile.prototype.isAutosaveNow = function(success, error)
    {
        return allowAutoSave;
    };
    
    //Ensure saving is via the file
    ui.actions.get('save').funct = function(exit)
    {
        if (ui.editor.graph.isEditing())
        {
            ui.editor.graph.stopEditing();
        }

        var curFile = ui.getCurrentFile();
        
        if (exit)
        {
            allowAutoSave = false;
        }

        function doActions()
        {
            if (exit)
            {
                ui.actions.get('exit').funct();
            }
        };
        
        function doSave()
        {
            if (curFile.saveStarted || curFile.savingFile)
            {
                setTimeout(doSave, 100);
                return;
            }
            
            if (curFile.isModified())
            {
                ui.saveFile(null, doActions);
            }
            else
            {
                doActions();
            }
        };
        
        doSave();
    };

    //Add file opening here (or it should be for all in EditorUi?)
    var origInstallMessageHandler =  ui.installMessageHandler;
    
    ui.installMessageHandler = function(callback)
    {
        origInstallMessageHandler.call(this, function()
        {
            callback.apply(this, arguments);
            
            var file = ui.getCurrentFile();
            loadDescriptor = loadDescriptor || {};
            
            // New files call this twice, so we need to check if the file is loaded
            if (!loadDescriptor.isLoaded)
            {
                file.setDescriptor(loadDescriptor);
                ui.fileLoaded(file, true);
            }

            loadDescriptor.isLoaded = true;
        });
    }
    
    ui.editor.setModified = function()
    {
        //Cancel set modified of the editor and use the file's one
    };

    //Prefetch current user 
	ui.getCurrentUser();
});
