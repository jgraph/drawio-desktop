/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
//Add a closure to hide the class private variables without changing the code a lot
(function()
{

var _token = null;

window.DropboxClient = function(editorUi)
{
	DrawioClient.call(this, editorUi, 'dbauth');
	
	this.client = new Dropbox({clientId: this.clientId});
};

// Extends DrawioClient
mxUtils.extend(DropboxClient, DrawioClient);

/**
 * FIXME: How to find name of app folder for current user. The Apps part of the
 * name is internationalized so this hardcoded check does not work everywhere.
 */
DropboxClient.prototype.appPath = '/drawio-diagrams/';

/**
 * Executes the first step for connecting to Google Drive.
 */
DropboxClient.prototype.extension = '.drawio';

/**
 * Executes the first step for connecting to Google Drive.
 */
DropboxClient.prototype.writingFile = false;

/**
 * Executes the first step for connecting to Google Drive.
 */
DropboxClient.prototype.maxRetries = 4;

DropboxClient.prototype.clientId = window.DRAWIO_DROPBOX_ID;

DropboxClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/dropbox';

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DropboxClient.prototype.logout = function()
{
	//Send to server to clear refresh token cookie
	this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host));
	this.clearPersistentToken();
	this.setUser(null);
	_token = null;
	
	this.client.authTokenRevoke().then(mxUtils.bind(this, function()
	{
		this.client.setAccessToken(null);
	}));
};

/**
 * Checks if the client is authorized and calls the next step.
 */
DropboxClient.prototype.updateUser = function(success, error, failOnAuth)
{
	var acceptResponse = true;
	
	var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
	{
		acceptResponse = false;
		error({code: App.ERROR_TIMEOUT});
	}), this.ui.timeout);
	
	var promise = this.client.usersGetCurrentAccount();
	promise.then(mxUtils.bind(this, function(response)
	{
	    	window.clearTimeout(timeoutThread);
	    	
	    	if (acceptResponse)
	    	{
			this.setUser(new DrawioUser(response.account_id,
				response.email, response.name.display_name));
			success();
	    	}
	}));
	// Workaround for IE8/9 support with catch function
	promise['catch'](mxUtils.bind(this, function(err)
	{
	    	window.clearTimeout(timeoutThread);
	    	
	    	if (acceptResponse)
	    	{
			if (err != null && err.status === 401 && !failOnAuth)
			{
				this.setUser(null);
				this.client.setAccessToken(null);
				_token = null;
				
				this.authenticate(mxUtils.bind(this, function()
				{
					this.updateUser(success, error, true);
				}), error);
			}
			else
			{
				error({message: mxResources.get('accessDenied')});
			}
	    	}
	}));
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DropboxClient.prototype.authenticate = function(success, error)
{
	var req = new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET');
	
	req.send(mxUtils.bind(this, function(req)
	{
		if (req.getStatus() >= 200 && req.getStatus() <= 299)
		{
			this.authenticateStep2(req.getText(), success, error);
		}
		else if (error != null)
		{
			error(req);
		}
	}), error);
};

DropboxClient.prototype.authenticateStep2 = function(state, success, error)
{
	if (window.onDropboxCallback == null)
	{
		var auth = mxUtils.bind(this, function()
		{
			var acceptAuthResponse = true;

			var authRemembered = this.getPersistentToken(true);
			
			if (authRemembered != null)
			{
				var req = new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host + '&token=' + state), null, 'GET'); //To identify which app/domain is used
				
				req.send(mxUtils.bind(this, function(req)
				{
					if (req.getStatus() >= 200 && req.getStatus() <= 299)
					{
						_token = JSON.parse(req.getText()).access_token;
						this.client.setAccessToken(_token);
						this.setUser(null);
						success();
					}
					else 
					{
						this.clearPersistentToken();
						this.setUser(null);
						_token = null;
						this.client.setAccessToken(null);

						if (req.getStatus() == 401) // (Unauthorized) [e.g, invalid refresh token]
						{
							auth();
						}
						else
						{
							error({message: mxResources.get('accessDenied'), retry: auth});
						}
					}
				}), error);
			}
			else
			{
				this.ui.showAuthDialog(this, true, mxUtils.bind(this, function(remember, authSuccess)
				{
					var win = window.open('https://www.dropbox.com/oauth2/authorize?client_id=' +
						this.clientId + (remember? '&token_access_type=offline' : '') +
						'&redirect_uri=' + encodeURIComponent(this.redirectUri) +
						'&response_type=code&state=' + encodeURIComponent('cId=' + this.clientId + //To identify which app/domain is used
							'&domain=' + window.location.host + '&token=' + state), 'dbauth');
					
					if (win != null)
					{
						window.onDropboxCallback = mxUtils.bind(this, function(newAuthInfo, authWindow)
						{
							if (acceptAuthResponse)
							{
								window.onDropboxCallback = null;
								acceptAuthResponse = false;
								
								try
								{
									if (newAuthInfo == null)
									{
										error({message: mxResources.get('accessDenied'), retry: auth});
									}
									else
									{
										if (authSuccess != null)
										{
											authSuccess();
										}
										
										_token = newAuthInfo.access_token;
										this.client.setAccessToken(_token);
										this.setUser(null);
										
										if (remember)
										{
											this.setPersistentToken('remembered');
										}
										
										success();
									}
								}
								catch (e)
								{
									error(e);
								}
								finally
								{
									if (authWindow != null)
									{
										authWindow.close();
									}
								}
							}
							else if (authWindow != null)
							{
								authWindow.close();
							}
						});
					}
					else
					{
						error({message: mxResources.get('serviceUnavailableOrBlocked'), retry: auth});
					}
				}), mxUtils.bind(this, function()
				{
					if (acceptAuthResponse)
					{
						window.onDropboxCallback = null;
						acceptAuthResponse = false;
						error({message: mxResources.get('accessDenied'), retry: auth});
					}
				}));
			}
		});
		
		auth();
	}
	else
	{
		error({code: App.ERROR_BUSY});
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
DropboxClient.prototype.executePromise = function(promiseFn, success, error)
{
	var doExecute = mxUtils.bind(this, function(failOnAuth)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, retry: fn});
		}), this.ui.timeout);
		
		//Dropbox client start executing the promise once created so auth fails, so we send a function instead to delay promise creation
		var promise = promiseFn();
		
		promise.then(mxUtils.bind(this, function(response)
		{
		    	window.clearTimeout(timeoutThread);
		    	
		    	if (acceptResponse && success != null)
			{
				success(response);
			}
		}));
		// Workaround for IE8/9 support with catch function
		promise['catch'](mxUtils.bind(this, function(err)
		{
		    	window.clearTimeout(timeoutThread);
		    	
		    	if (acceptResponse)
		    	{
		    		if (err != null && (err.status == 500 || err.status == 400 ||
		    			err.status == 401))
			    	{
					this.setUser(null);
					this.client.setAccessToken(null);
					_token = null;
					
					if (!failOnAuth)
					{
						this.authenticate(function()
						{
							doExecute(true);
						}, error);
					}
					else
					{
						error({message: mxResources.get('accessDenied'), retry: mxUtils.bind(this, function()
						{
							this.authenticate(function()
							{
								fn(true);
							}, error);
						})});
					}
			    	}
		    		else
		    		{
		    			error({message: mxResources.get('error') + ' ' + err.status});
		    		}
		    	}
		}));
	});
	
	var fn = mxUtils.bind(this, function(failOnAuth)
	{
		if (this.user == null)
		{
			this.updateUser(function()
			{
				fn(true);
			}, error, failOnAuth);
		}
		else
		{
			doExecute(failOnAuth);
		}
	});

	if (_token == null)
	{
		this.authenticate(function()
		{
			fn(true);
		}, error);
	}
	else
	{
		fn(false);
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
DropboxClient.prototype.getLibrary = function(path, success, error)
{
	this.getFile(path, success, error, true);
};

/**
 * DenyConvert is ignored in this client, just added for API compatibility.
 */
DropboxClient.prototype.getFile = function(path, success, error, asLibrary)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;
	var binary = /\.png$/i.test(path);

	if (/^https:\/\//i.test(path) || /\.v(dx|sdx?)$/i.test(path) || /\.gliffy$/i.test(path) ||
		 /\.pdf$/i.test(path) || (!this.ui.useCanvasForExport && binary))
	{
		var fn = mxUtils.bind(this, function()
		{
			var tokens = path.split('/');
			var name = (tokens.length > 0) ? tokens[tokens.length - 1] : path;
	
			this.ui.convertFile(path, name, null, this.extension, success, error);
		});
		
		if (_token != null)
		{
			fn();
		}
		else
		{
			this.authenticate(fn, error);
		}
	}
	else
	{
		var arg = {path: '/' + path};
		
		if (urlParams['rev'] != null)
		{
			arg.rev = urlParams['rev'];
		}

		this.readFile(arg, mxUtils.bind(this, function(data, response)
		{
			var index = (binary) ? data.lastIndexOf(',') : -1;
			var file = null;
			
			if (index > 0)
			{
				var xml = this.ui.extractGraphModelFromPng(data);
				
				if (xml != null && xml.length > 0)
				{
					data = xml;
				}
				else
				{
					// Imports as PNG image
					file = new LocalFile(this, data, path, true);
				}
			}
			
			success((file != null) ? file :
				((asLibrary) ? new DropboxLibrary(this.ui, data, response) :
	    			new DropboxFile(this.ui, data, response)));
		}), error, binary);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.readFile = function(arg, success, error, binary)
{
	var doExecute = mxUtils.bind(this, function(failOnAuth)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT});
		}), this.ui.timeout);
		
		// Workaround for Uncaught DOMException in filesDownload is to
		// get the metadata to handle the file not found case
		var checkPromise = this.client.filesGetMetadata({path: '/' + arg.path.substring(1), include_deleted: false});
		
		checkPromise.then(mxUtils.bind(this, function(response)
		{
	    		// ignore
		}));
		
		// Workaround for IE8/9 support with catch function
		checkPromise['catch'](function(err)
		{
		    	window.clearTimeout(timeoutThread);
			    
		    	if (acceptResponse && err != null && err.status == 409)
		    	{
		    		acceptResponse = false;
		    		error({message: mxResources.get('fileNotFound')});
		    	}
		});

		// Download file in parallel
		// LATER: Report Uncaught DOMException with path/not_found in filesDownload
		var promise = this.client.filesDownload(arg);
		
		promise.then(mxUtils.bind(this, function(response)
		{
		    	window.clearTimeout(timeoutThread);
			    
		    	if (acceptResponse)
		    	{
		    		acceptResponse = false;
		    		
				try
				{
					var reader = new FileReader();
					
					reader.onload = mxUtils.bind(this, function(event)
					{
						success(reader.result, response);
					});
					
					if (binary)
					{
						reader.readAsDataURL(response.fileBlob);
					}
					else
					{
						reader.readAsText(response.fileBlob);
					}
				}
				catch (e)
				{
					error(e);
				}
		    	}
		}));
		// Workaround for IE8/9 support with catch function
		promise['catch'](mxUtils.bind(this, function(err)
		{
		    	window.clearTimeout(timeoutThread);
			    
		    	if (acceptResponse)
		    	{
		    		acceptResponse = false;
	
		    		if (err != null && (err.status == 500 || err.status == 400 ||
		    			err.status == 401))
			    	{
					this.client.setAccessToken(null);
					this.setUser(null);
					_token = null;
					
					if (!failOnAuth)
					{
						this.authenticate(function()
						{
							doExecute(true);
						}, error);
					}
					else
					{
						error({message: mxResources.get('accessDenied'), retry: mxUtils.bind(this, function()
						{
							this.authenticate(function()
							{
								fn(true);
							}, error);
						})});
					}
			    	}
		    		else
		    		{
		    			error({message: mxResources.get('error') + ' ' + err.status});
		    		}
		    	}
		}));
	});
	
	var fn = mxUtils.bind(this, function(failOnAuth)
	{
		if (this.user == null)
		{
			this.updateUser(function()
			{
				fn(true);
			}, error, failOnAuth);
		}
		else
		{
			doExecute(failOnAuth);
		}
	});

	if (_token == null)
	{
		this.authenticate(function()
		{
			fn(true);
		}, error);
	}
	else
	{
		fn(false);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.checkExists = function(filename, fn, noConfirm)
{
	var promiseFn = mxUtils.bind(this, function()
	{
		return this.client.filesGetMetadata({path: '/' + filename.toLowerCase(), include_deleted: false});
	});
	
	this.executePromise(promiseFn, mxUtils.bind(this, function(response)
	{
		if (noConfirm)
		{
			fn(false, true, response);
		}
		else
		{
			this.ui.confirm(mxResources.get('replaceIt', [filename]), function()
			{
				fn(true, true, response);
			}, function()
			{
				fn(false, true, response);
			});
		}
	}), function(err)
	{
		fn(true, false);
	});
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.renameFile = function(file, filename, success, error)
{
	if (/[\\\/:\?\*"\|]/.test(filename))
	{
		error({message: mxResources.get('dropboxCharsNotAllowed')});
	}
	else
	{
		// Appends working directory of source file
		if (file != null && filename != null)
		{
			var path = file.stat.path_display.substring(1);
			var idx = path.lastIndexOf('/');
			
			if (idx > 0)
			{
				filename = path.substring(0, idx + 1) + filename;
			}
		}
		
		if (file != null && filename != null && file.stat.path_lower.substring(1) !== filename.toLowerCase())
		{
			// Checks if file exists
			this.checkExists(filename, mxUtils.bind(this, function(checked, exists, response)
			{
				if (checked)
				{
					var thenHandler = mxUtils.bind(this, function(deleteResponse)
					{
						var move = mxUtils.bind(this, function()
						{
							return this.client.filesMove({from_path: file.stat.path_display, to_path: '/' +
								filename, autorename: false});	
						});
						
						this.executePromise(move, success, error);
					});
					
					// API fails on same name with different upper-/lowercase
					if (!exists || response.path_lower.substring(1) === filename.toLowerCase())
					{
						thenHandler();
					}
					else
					{
						// Deletes file first to avoid conflict in filesMove (non-atomic)
						var promiseFn = mxUtils.bind(this, function()
						{
							return this.client.filesDelete({path: '/' + filename.toLowerCase()});
						});
						
						this.executePromise(promiseFn, thenHandler, error);
					}
				}
				else
				{
					error();
				}
			}));
		}
		else
		{
			// Same name with different upper-/lowercase not supported by Dropbox API
			error({message: mxResources.get('invalidName')});
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.insertLibrary = function(filename, data, success, error)
{
	this.insertFile(filename, data, success, error, true);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.insertFile = function(filename, data, success, error, asLibrary)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;
	
	this.checkExists(filename, mxUtils.bind(this, function(checked)
	{
		if (checked)
		{
			this.saveFile(filename, data, mxUtils.bind(this, function(stat)
			{
				if (asLibrary)
				{
					success(new DropboxLibrary(this.ui, data, stat));
				}
				else
				{
					success(new DropboxFile(this.ui, data, stat));
				}
			}), error);
		}
		else
		{
			error();
		}
	}));
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.saveFile = function(filename, data, success, error, folder)
{
	if (/[\\\/:\?\*"\|]/.test(filename))
	{
		error({message: mxResources.get('dropboxCharsNotAllowed')});
	}
	else if (data.length >= 150000000 /*150MB*/)
	{
		error({message: mxResources.get('drawingTooLarge') + ' (' +
			this.ui.formatFileSize(data.length) + ' / 150 MB)'});
	}
	else
	{
		folder = (folder != null) ? folder : '';
		
		// Mute switch is ignored
		var promiseFn = mxUtils.bind(this, function()
		{
			return this.client.filesUpload({path: '/' + folder + filename,
				mode: {'.tag': 'overwrite'}, mute: true,
				contents: new Blob([data], {type: 'text/plain'})});
		});
		
		this.executePromise(promiseFn, success, error);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.pickLibrary = function(fn)
{
	// Authentication will be carried out on open to make sure the
	// autosave does not show an auth dialog. Showing it here will
	// block the second dialog (the file picker) so it's too early.
	Dropbox.choose(
	{
		linkType : 'direct',
		cancel: mxUtils.bind(this, function()
		{
			// do nothing
        }),
		success : mxUtils.bind(this, function(files)
		{
			if (this.ui.spinner.spin(document.body, mxResources.get('loading')))
			{
				var error = mxUtils.bind(this, function(e)
				{
					this.ui.spinner.stop();
					this.ui.handleError(e);
				});
				
				var tmp = files[0].link.indexOf(this.appPath);
	
				if (tmp > 0)
				{
					// Checks if file is in app folder by loading file from there and comparing the ID
					var rel = decodeURIComponent(files[0].link.substring(tmp + this.appPath.length - 1));
					
					this.readFile({path: rel}, mxUtils.bind(this, function(data, stat)
					{
						if (stat != null && stat.id == files[0].id)
						{
							// No need to load file a second time
							try
							{
								this.ui.spinner.stop();
								fn(rel.substring(1), new DropboxLibrary(this.ui, data, stat));
							}
							catch (e)
							{
								this.ui.handleError(e);
							}
						}
						else
						{
							this.createLibrary(files[0], fn, error);
						}
					}), error);
				}
				else
				{
					this.createLibrary(files[0], fn, error);
				}
			}
		})
	});
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.createLibrary = function(file, success, error)
{
	this.ui.confirm(mxResources.get('note') + ': ' + mxResources.get('fileWillBeSavedInAppFolder',
		[file.name]), mxUtils.bind(this, function()
	{
		this.ui.editor.loadUrl(file.link, mxUtils.bind(this, function(data)
	    {
		    	this.insertFile(file.name, data, mxUtils.bind(this, function(newFile)
		    	{
		    		try
		    		{
		    			this.ui.spinner.stop();
			    		success(newFile.getHash().substring(1), newFile);
				}
				catch (e)
				{
					error(e);
				}
		    	}), error, true);
	    }), error);
	}), mxUtils.bind(this, function()
	{
		this.ui.spinner.stop();
	}));
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.pickFile = function(fn, readOnly)
{
	if (Dropbox.choose != null)
	{
		fn = (fn != null) ? fn : mxUtils.bind(this, function(path, file)
		{
			this.ui.loadFile((path != null) ? 'D' + encodeURIComponent(path) : file.getHash(), null, file);
		});
		
		// Authentication will be carried out on open to make sure the
		// autosave does not show an auth dialog. Showing it here will
		// block the second dialog (the file picker) so it's too early.
		Dropbox.choose(
		{
			linkType : 'direct',
			cancel: mxUtils.bind(this, function()
			{
				// do nothing
	        }),
			success : mxUtils.bind(this, function(files)
			{
				if (this.ui.spinner.spin(document.body, mxResources.get('loading')))
				{
					// File used for read-only
					if (readOnly)
					{
						this.ui.spinner.stop();
						fn(files[0].link);
					}
					else
					{
						var error = mxUtils.bind(this, function(e)
						{
							this.ui.spinner.stop();
							this.ui.handleError(e);
						});
						
						var success = mxUtils.bind(this, function(path, file)
						{
							this.ui.spinner.stop();
							fn(path, file);
						});
						
						var binary = /\.png$/i.test(files[0].name);
						
						if (/\.vsdx$/i.test(files[0].name) || /\.gliffy$/i.test(files[0].name) ||
							(!this.ui.useCanvasForExport && binary))
						{
							success(files[0].link);
						}
						else
						{
							var tmp = files[0].link.indexOf(this.appPath);

							if (tmp > 0)
							{
								// Checks if file is in app folder by loading file from there and comparing the ID
								var rel = decodeURIComponent(files[0].link.substring(tmp + this.appPath.length - 1));
								
								this.readFile({path: rel}, mxUtils.bind(this, function(data, stat)
								{
									if (stat != null && stat.id == files[0].id)
									{
										var index = (binary) ? data.lastIndexOf(',') : -1;
										this.ui.spinner.stop();
										var file = null;
										
										if (index > 0)
										{
											var xml = this.ui.extractGraphModelFromPng(data);
											
											if (xml != null && xml.length > 0)
											{
												data = xml;
											}
											else
											{
												// Imports as PNG image
												file = new LocalFile(this, data, rel, true);
											}
										}
										
										// No need to load file a second time
										fn(rel.substring(1), (file != null) ? file : new DropboxFile(this.ui, data, stat));
									}
									else
									{
										this.createFile(files[0], success, error);
									}
								}), error, binary);
							}
							else
							{
								this.createFile(files[0], success, error);
							}
						}
					}
				}
			})
		});
	}
	else
	{
		this.ui.handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DropboxClient.prototype.createFile = function(file, success, error)
{
	var binary = /(\.png)$/i.test(file.name);
	
	this.ui.editor.loadUrl(file.link, mxUtils.bind(this, function(data)
    {
		if (data != null && data.length > 0)
		{
			this.ui.confirm(mxResources.get('note') + ': ' + mxResources.get('fileWillBeSavedInAppFolder', [file.name]), mxUtils.bind(this, function()
			{
				var index = (binary) ? data.lastIndexOf(',') : -1;
				
				if (index > 0)
				{
					var xml = this.ui.extractGraphModelFromPng(data.substring(index + 1));
					
					if (xml != null && xml.length > 0)
					{
						data = xml;
					}
				}
				
				this.insertFile(file.name, data, mxUtils.bind(this, function(newFile)
			    {
					success(file.name, newFile);
			    }), error);
			}), mxUtils.bind(this, function()
			{
	    			this.ui.spinner.stop();
			}));
		}
		else
		{
			this.ui.spinner.stop();
			error({message: mxResources.get('errorLoadingFile')});
		}
    }), error, binary);
};

})();