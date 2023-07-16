/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */

//Add a closure to hide the class private variables without changing the code a lot
(function ()
{

var _token = null;

window.OneDriveClient = function(editorUi, isExtAuth, inlinePicker, noLogout)
{
	if (isExtAuth == null && window.urlParams != null && window.urlParams['extAuth'] == '1')
	{
		isExtAuth = true;
	}
	
	if (inlinePicker == null) //Use inline picker as default
	{
		inlinePicker = window.Editor != null? Editor.oneDriveInlinePicker : true;
	}
	
	if (noLogout == null && window.urlParams != null && window.urlParams['noLogoutOD'] == '1')
	{
		noLogout = true;
	}
	
	DrawioClient.call(this, editorUi, isExtAuth? 'oneDriveExtAuthInfo' : 'oneDriveAuthInfo');
	
	this.isExtAuth = isExtAuth;
	this.inlinePicker = inlinePicker;
	this.noLogout = noLogout;
	var authInfo = JSON.parse(this.token);
	
	if (authInfo != null)
	{
		this.endpointHint = authInfo.endpointHint != null ? authInfo.endpointHint.replace('/Documents', '/_layouts/15/onedrive.aspx') : authInfo.endpointHint;
	}
};

// Extends DrawioClient
mxUtils.extend(OneDriveClient, DrawioClient);

/**
 * Specifies if thumbnails should be enabled. Default is true.
 * LATER: If thumbnails are disabled, make sure to replace the
 * existing thumbnail with the placeholder only once.
 */
OneDriveClient.prototype.clientId = window.DRAWIO_MSGRAPH_CLIENT_ID || ((window.location.hostname == 'test.draw.io') ?
		'95e4b4ed-ed5c-4a05-935b-b411b4562ef2' : '24b129a6-117b-4394-bdc8-3b9955e5cdef');

OneDriveClient.prototype.clientId = window.location.hostname == 'app.diagrams.net' ?
		'b5ff67d6-3155-4fca-965a-59a3655c4476' : OneDriveClient.prototype.clientId;

OneDriveClient.prototype.clientId = window.location.hostname == 'viewer.diagrams.net' ?
		'417a451a-a343-4788-b6c1-901e63182565' : OneDriveClient.prototype.clientId;
/**
 * OAuth 2.0 scopes for installing Drive Apps.
 */
OneDriveClient.prototype.scopes = 'user.read files.readwrite.all sites.read.all';

/**
 * OAuth 2.0 scopes for installing Drive Apps.
 */
OneDriveClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/microsoft';
OneDriveClient.prototype.pickerRedirectUri = window.location.protocol + '//' + window.location.host + '/onedrive3.html';

/**
 * This is the default endpoint for personal accounts
 */
OneDriveClient.prototype.defEndpointHint = 'api.onedrive.com'; 
OneDriveClient.prototype.endpointHint = OneDriveClient.prototype.defEndpointHint;

/**
 * Value for the root folder.
 */
OneDriveClient.prototype.rootId = {id: 'root', name: 'root', parentReference: {driveId: 'me'}};

/**
 * Executes the first step for connecting to Google Drive.
 */
OneDriveClient.prototype.extension = '.drawio';

/**
 * Executes the first step for connecting to Google Drive.
 */
OneDriveClient.prototype.baseUrl = 'https://graph.microsoft.com/v1.0';

OneDriveClient.prototype.authUrl = 'https://login.microsoftonline.com/' + (window.DRAWIO_MSGRAPH_TENANT_ID || 'common');
/**
 * Empty function used when no callback is needed
 */
OneDriveClient.prototype.emptyFn = function(){};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.invalidFilenameRegExs = [
	/[~"#%\*:<>\?\/\\{\|}]/,
	/^\.lock$/i,
	/^CON$/i,
	/^PRN$/i,
	/^AUX$/i,
	/^NUL$/i,
	/^COM\d$/i,
	/^LPT\d$/i,
	/^desktop\.ini$/i,
	/_vti_/i
];

/**
 * Check if the file/folder name is valid
 */
OneDriveClient.prototype.isValidFilename = function(filename)
{
	if (filename == null || filename === '') return false;
	
	for (var i = 0; i < this.invalidFilenameRegExs.length; i++)
	{
		if (this.invalidFilenameRegExs[i].test(filename)) return false;
	}
	
	return true;
};


/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.get = function(url, onload, onerror)
{
	var req = new mxXmlRequest(url, null, 'GET');
	
	req.setRequestHeaders = mxUtils.bind(this, function(request, params)
	{
		request.setRequestHeader('Authorization', 'Bearer ' + _token);
	});
	
	req.send(onload, onerror);
	
	return req;
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.updateUser = function(success, error, failOnAuth)
{
	var acceptResponse = true;
	
	var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
	{
		acceptResponse = false;
		error({code: App.ERROR_TIMEOUT});
	}), this.ui.timeout);
	
	this.get(this.baseUrl + '/me', mxUtils.bind(this, function(req)
	{
		window.clearTimeout(timeoutThread);
		
		if (acceptResponse)
		{
			if (req.getStatus() < 200 || req.getStatus() >= 300)
			{
				if (!failOnAuth)
				{
					this.logout();
					
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
			else
			{
				var data = JSON.parse(req.getText());
				this.setUser(new DrawioUser(data.id, data.mail, data.displayName));
				success();
			}
		}
	}), mxUtils.bind(this, function(err)
	{
		window.clearTimeout(timeoutThread);
			    	
		if (acceptResponse)
		{
			error(err);
		}
	}));
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.resetTokenRefresh = function(expires_in)
{
	if (this.tokenRefreshThread != null)
	{
		window.clearTimeout(this.tokenRefreshThread);
		this.tokenRefreshThread = null;
	}

	// Starts timer to refresh token before it expires
	if (expires_in > 0)
	{
		this.tokenRefreshInterval = expires_in * 1000;
		
		this.tokenRefreshThread = window.setTimeout(mxUtils.bind(this, function()
		{
			//Get a new fresh accessToken
			this.authenticate(this.emptyFn, this.emptyFn, true);
		}), expires_in * 900);
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.authenticate = function(success, error, failOnAuth)
{
	if (this.isExtAuth)
	{
		window.parent.oneDriveAuth(mxUtils.bind(this, function(newAuthInfo)
		{
			this.updateAuthInfo(newAuthInfo, true, this.endpointHint == null, success, error);
		}), error, window.urlParams != null && urlParams['odAuthCancellable'] == '1');
		return;
	}
	
	var req = new mxXmlRequest(this.redirectUri + '?getState=1', null, 'GET');
	
	req.send(mxUtils.bind(this, function(req)
	{
		if (req.getStatus() >= 200 && req.getStatus() <= 299)
		{
			this.authenticateStep2(req.getText(), success, error, failOnAuth);
		}
		else if (error != null)
		{
			error(req);
		}
	}), error);
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.updateAuthInfo = function(newAuthInfo, remember, forceUserUpdate, success, error)
{
	if (forceUserUpdate)
	{
		this.setUser(null);
	}
	
	_token = newAuthInfo.access_token;
	delete newAuthInfo.access_token; //Don't store access token
	newAuthInfo.expiresOn = Date.now() + newAuthInfo.expires_in * 1000;
	this.tokenExpiresOn = newAuthInfo.expiresOn;

	newAuthInfo.remember = remember;
	this.setPersistentToken(JSON.stringify(newAuthInfo), !remember);
	this.resetTokenRefresh(newAuthInfo.expires_in);

	if (forceUserUpdate)
	{
		//Find out the type of the account + endpoint
		this.getAccountTypeAndEndpoint(mxUtils.bind(this, function()
		{
			success();
		}), error);	
	}
	else
	{
		success();
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.authenticateStep2 = function(state, success, error, failOnAuth)
{
	if (window.onOneDriveCallback == null)
	{
		var auth = mxUtils.bind(this, function()
		{
			var acceptAuthResponse = true;
			
			//Retry request with refreshed token
			var authInfo = JSON.parse(this.getPersistentToken(true));
			
			if (authInfo != null)
			{
				var req = new mxXmlRequest(this.redirectUri + '?state=' + encodeURIComponent('cId=' + this.clientId +
					'&domain=' + window.location.host + '&token=' + state), null, 'GET'); // To identify which app/domain is used
				
				req.send(mxUtils.bind(this, function(req)
				{
					if (req.getStatus() >= 200 && req.getStatus() <= 299)
					{
						this.updateAuthInfo(JSON.parse(req.getText()), authInfo.remember, false, success, error);
					}
					else 
					{
						this.clearPersistentToken();
						this.setUser(null);
						_token = null;

 						// (Unauthorized) [e.g, invalid refresh token] or bad request
						if ((req.getStatus() == 401 || req.getStatus() == 400) && !failOnAuth)
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
					var url = this.authUrl + '/oauth2/v2.0/authorize' +
						'?client_id=' + this.clientId + '&response_type=code' +
						'&redirect_uri=' + encodeURIComponent(this.redirectUri) +
						'&scope=' + encodeURIComponent(this.scopes + (remember? ' offline_access' : '')) +
						'&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host + '&token=' + state); //To identify which app/domain is used
	
					var width = 525,
						height = 525,
						screenX = window.screenX,
						screenY = window.screenY,
						outerWidth = window.outerWidth,
						outerHeight = window.outerHeight;
					
					var left = screenX + Math.max(outerWidth - width, 0) / 2;
					var top = screenY + Math.max(outerHeight - height, 0) / 2;
					
					var features = ['width=' + width, 'height=' + height,
					                'top=' + top, 'left=' + left,
					                'status=no', 'resizable=yes',
					                'toolbar=no', 'menubar=no',
					                'scrollbars=yes'];
					var popup = window.open(url, 'odauth', features.join(','));
					
					if (popup != null)
					{
						window.onOneDriveCallback = mxUtils.bind(this, function(authInfo, authWindow)
						{
							if (acceptAuthResponse)
							{
								window.onOneDriveCallback = null;
								acceptAuthResponse = false;
								
								try
								{
									if (authInfo == null)
									{
										error({message: mxResources.get('accessDenied'), retry: auth});
									}
									else
									{
										if (authSuccess != null)
										{
											authSuccess();
										}
										
										this.updateAuthInfo(authInfo, remember, true, success, error);
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
					
						popup.focus();
					}
				}), mxUtils.bind(this, function()
				{
					if (acceptAuthResponse)
					{
						window.onOneDriveCallback = null;
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
OneDriveClient.prototype.getAccountTypeAndEndpoint = function(success, error)
{
	this.get(this.baseUrl + '/me/drive/root', mxUtils.bind(this, function(req)
	{
		try
		{
			if (req.getStatus() >= 200 && req.getStatus() <= 299)
			{
				var resp = JSON.parse(req.getText());
				
				if (resp.webUrl.indexOf('.sharepoint.com') > 0) 
			 	{
					//TODO Confirm this works with all sharepoint sites
					this.endpointHint = resp.webUrl.replace('/Documents', '/_layouts/15/onedrive.aspx');
				}
				else
				{
					this.endpointHint = this.defEndpointHint;
				}
				
			 	//Update authInfo with endpointHint
			 	var authInfo = JSON.parse(this.getPersistentToken(true));
			 	
			 	if (authInfo != null)
		 		{
				 	authInfo.endpointHint = this.endpointHint;
				 	this.setPersistentToken(JSON.stringify(authInfo), !authInfo.remember);
		 		}
			 	
				success();
				return;
			}
		}
		catch(e) {}
		//It is expected to work as this call immediately follows getting a fresh access token
		error({message: mxResources.get('unknownError') + ' (Code: ' + req.getStatus() + ')'});
		
	}), error);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.executeRequest = function(url, success, error)
{
	var doExecute = mxUtils.bind(this, function(failOnAuth)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, retry: doExecute});
		}), this.ui.timeout);

		this.get(url, mxUtils.bind(this, function(req)
		{
			window.clearTimeout(timeoutThread);
			
			if (acceptResponse)
			{
				// 404 (file not found) is a valid response for checkExists
				if ((req.getStatus() >= 200 && req.getStatus() <= 299) || req.getStatus() == 404)
				{
					if (this.user == null)
					{
						this.updateUser(this.emptyFn, this.emptyFn, true);
					}
					
					success(req);
				}
				// 400 is returns if wrong user for this file
				else if (!failOnAuth && (req.getStatus() === 401 || req.getStatus() === 400))
				{
					//Authorize again using the refresh token
					this.authenticate(function()
					{
						doExecute(true);
					}, error, failOnAuth);
				}
				else
				{
					error(this.parseRequestText(req));
				}
			}
		}), mxUtils.bind(this, function(err)
		{
			window.clearTimeout(timeoutThread);
				    	
			if (acceptResponse)
			{
				error(err);
			}
		}));
	});
	
	if (_token == null || this.tokenExpiresOn - Date.now() < 60000) //60 sec tolerance window
	{
		this.authenticate(function()
		{
			doExecute(true);
		}, error);
	}
	else
	{
		doExecute(false);
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.checkToken = function(fn, error)
{
	if (_token == null || this.tokenRefreshThread == null || this.tokenExpiresOn - Date.now() < 60000)
	{
		this.authenticate(fn, (error != null) ? error : this.emptyFn);
	}
	else
	{
		fn();
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.getItemRef = function(id)
{
	var idParts = id.split('/');
	
	if (idParts.length > 1)
	{
		return {driveId: idParts[0], id: idParts[1]};
	}
	else
	{
		return {id: id};
	}
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
OneDriveClient.prototype.getItemURL = function(id, relative)
{
	var idParts = id.split('/');
	
	if (idParts.length > 1)
	{
		var driveId = idParts[0];
		var itemId = idParts[1];
		return (relative? '' : this.baseUrl) + '/drives/' + driveId + (itemId == 'root' ? '/root' : '/items/' + itemId);
	}
	else
	{
		return (relative? '' : this.baseUrl) + '/me/drive/items/' + id;
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.getLibrary = function(id, success, error)
{
	this.getFile(id, success, error, false, true);
};

/**
 * Workaround for added content to HTML files in Sharepoint.
 */
OneDriveClient.prototype.removeExtraHtmlContent = function(data)
{
	var idx = data.lastIndexOf('<html><head><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"><meta name="Robots" ');

	if (idx > 0)
	{
		data = data.substring(0, idx);
	}
	
	return data;
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.getFile = function(id, success, error, denyConvert, asLibrary)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;

	this.executeRequest(this.getItemURL(id), mxUtils.bind(this, function(req)
	{
		if (req.getStatus() >= 200 && req.getStatus() <= 299)
		{
			var meta = JSON.parse(req.getText());
			var binary = /\.png$/i.test(meta.name);
			
			// Handles .vsdx, Gliffy and PNG+XML files by creating a temporary file
			if (/\.v(dx|sdx?)$/i.test(meta.name) || /\.gliffy$/i.test(meta.name) ||
				/\.pdf$/i.test(meta.name) || (!this.ui.useCanvasForExport && binary))
			{
				var mimeType = (meta.file != null) ? meta.file.mimeType : null;
				this.ui.convertFile(meta['@microsoft.graph.downloadUrl'], meta.name, mimeType,
					this.extension, success, error);
			}
			else
			{
				var acceptResponse = true;
				
				var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
				{
					acceptResponse = false;
					error({code: App.ERROR_TIMEOUT})
				}), this.ui.timeout);
				
				this.ui.editor.loadUrl(meta['@microsoft.graph.downloadUrl'], mxUtils.bind(this, function(data)
				{
					try
					{
						window.clearTimeout(timeoutThread);
			    	
				    	if (acceptResponse)
				    	{
				    		if (/\.html$/i.test(meta.name))
				    		{
				    			data = this.removeExtraHtmlContent(data);
				    		}
				    		
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
									file = new LocalFile(this.ui, data, meta.name, true);
								}
							}
							// Checks for base64 encoded mxfile
							else if (data.substring(0, 32) == 'data:image/png;base64,PG14ZmlsZS')
							{
								var temp = data.substring(22);
								data = (window.atob && !mxClient.IS_SF) ? atob(temp) : Base64.decode(temp);
							}
							
							if (Graph.fileSupport && new XMLHttpRequest().upload && this.ui.isRemoteFileFormat(data, meta['@microsoft.graph.downloadUrl']))
							{
								this.ui.parseFileData(data, mxUtils.bind(this, function(xhr)
								{
									try
									{
										if (xhr.readyState == 4)
										{
											if (xhr.status >= 200 && xhr.status <= 299)
											{
												success(new LocalFile(this.ui, xhr.responseText, meta.name + this.extension, true));
											}
											else if (error != null)
											{
												error({message: mxResources.get('errorLoadingFile')});
											}
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
								}), meta.name);
							}
							else
							{
								if (file != null)
								{
									success(file);
								}
								else if (asLibrary)
								{
									success(new OneDriveLibrary(this.ui, data, meta));
								}
								else
								{
									success(new OneDriveFile(this.ui, data, meta));
								}
							}
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
    			}), mxUtils.bind(this, function(req)
				{
					window.clearTimeout(timeoutThread);
			    	
			    	if (acceptResponse)
			    	{
			    		error(this.parseRequestText(req));
			    	}
				}), binary || (meta.file != null && meta.file.mimeType != null &&
					((meta.file.mimeType.substring(0, 6) == 'image/' &&
					meta.file.mimeType.substring(0, 9) != 'image/svg') ||
					meta.file.mimeType == 'application/pdf')));
			}
		}
		else
		{
			if (this.isExtAuth)
			{
				error({message: mxResources.get('fileNotFoundOrDenied'),
						ownerEmail: window.urlParams != null? urlParams['ownerEml'] : null});
			}
			else
			{
				error(this.parseRequestText(req));				
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
OneDriveClient.prototype.renameFile = function(file, filename, success, error)
{
	if (file != null && filename != null)
	{
		if (!this.isValidFilename(filename))
		{
			error({message: this.invalidFilenameRegExs[0].test(filename) ?
					mxResources.get('oneDriveCharsNotAllowed') : mxResources.get('oneDriveInvalidDeviceName')});
			return;
		}
		
		// TODO: How to force overwrite file with same name?
		this.checkExists(file.getParentId(), filename, false, mxUtils.bind(this, function(checked)
		{
			if (checked)
			{
				this.writeFile(this.getItemURL(file.getId()), JSON.stringify({name: filename}), 'PATCH', 'application/json', success, error);
			}
			else
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
OneDriveClient.prototype.moveFile = function(id, folderId, success, error)
{
	//check that the source and destination are on the same drive
	var folderInfo = this.getItemRef(folderId);
	var fileInfo = this.getItemRef(id);
	
	if (folderInfo.driveId != fileInfo.driveId)
	{
		error({message: mxResources.get('cannotMoveOneDrive', null, 'Moving a file between accounts is not supported yet.')});
	}
	else 
	{
		this.writeFile(this.getItemURL(id), JSON.stringify({parentReference: folderInfo}), 'PATCH', 'application/json', success, error);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveClient.prototype.insertLibrary = function(filename, data, success, error, folderId)
{
	this.insertFile(filename, data, success, error, true, folderId);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveClient.prototype.insertFile = function(filename, data, success, error, asLibrary, folderId)
{
	if (!this.isValidFilename(filename))
	{
		error({message: this.invalidFilenameRegExs[0].test(filename) ?
				mxResources.get('oneDriveCharsNotAllowed') : mxResources.get('oneDriveInvalidDeviceName')});
		return;
	}

	asLibrary = (asLibrary != null) ? asLibrary : false;
	
	this.checkExists(folderId, filename, true, mxUtils.bind(this, function(checked)
	{
		if (checked)
		{
			var folder = '/me/drive/root';
			
			if (folderId != null)
			{
				folder = this.getItemURL(folderId, true);
			}
			
			var insertSuccess = mxUtils.bind(this, function(meta)
			{
				if (asLibrary)
				{
					success(new OneDriveLibrary(this.ui, data, meta));
				}
				else
				{
					success(new OneDriveFile(this.ui, data, meta));
				}
			});

			var url = this.baseUrl + folder + '/children/' + encodeURIComponent(filename) + '/content';
			
			//OneDrive has a limit on PUT API of 4MB, larger files needs to use the upload session method
			if (data.length >= 4000000 /*4MB*/)
			{
				//Create empty file first then upload. TODO Can we get an upload session for non-existing files?
				this.writeFile(url, '', 'PUT', null, mxUtils.bind(this, function(meta)
				{
					this.writeLargeFile(this.getItemURL(meta.id), data, insertSuccess, error);
				}), error);
			}
			else
			{
				this.writeFile(url, data, 'PUT', null, insertSuccess, error);
			}
		}
		else
		{
			error();
		}
	}))
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveClient.prototype.checkExists = function(parentId, filename, askReplace, fn)
{
	var folder = '/me/drive/root';
	
	if (parentId != null) 
	{
		folder = this.getItemURL(parentId, true);
	}
	
	this.executeRequest(this.baseUrl + folder + '/children/' + encodeURIComponent(filename), mxUtils.bind(this, function(req)
	{
		if (req.getStatus() == 404)
		{
			fn(true);
		}
		else
		{
			if (askReplace)
			{
				this.ui.spinner.stop();
				
				this.ui.confirm(mxResources.get('replaceIt', [filename]), function()
				{
					fn(true);
				}, function()
				{
					fn(false);
				});
			}
			else
			{
				this.ui.spinner.stop();
				
				this.ui.showError(mxResources.get('error'), mxResources.get('fileExists'), mxResources.get('ok'), function()
				{
					fn(false);						
				});
			}
		}
	}), function(req)
	{
		fn(false);
	}, true);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveClient.prototype.saveFile = function(file, success, error, etag)
{
	try
	{
		var savedData = file.getData();
		
		var fn = mxUtils.bind(this, function(data)
		{
			var saveSuccess = mxUtils.bind(this, function(resp)
			{
				success(resp, savedData);
			});

			var url = this.getItemURL(file.getId());
			
			//OneDrive has a limit on PUT API of 4MB, larger files needs to use the upload session method
			if (data.length >= 4000000 /*4MB*/)
			{
				this.writeLargeFile(url, data, saveSuccess, error, etag);
			}
			else
			{
				this.writeFile(url + '/content/', data, 'PUT', null, saveSuccess, error, etag);
			}
		});
		
		if (this.ui.useCanvasForExport && /(\.png)$/i.test(file.meta.name))
		{
			var p = this.ui.getPngFileProperties(this.ui.fileNode);
			
			this.ui.getEmbeddedPng(mxUtils.bind(this, function(data)
			{
				fn(this.ui.base64ToBlob(data, 'image/png'));
			}), error, (this.ui.getCurrentFile() != file) ?
				savedData : null, p.scale, p.border);
		}
		else
		{
			fn(savedData);
		}
	}
	catch (e)
	{
		error(e);
	}
};

OneDriveClient.prototype.writeLargeFile = function(url, data, success, error, etag)
{
	try
	{
		var chunkSize = 4 * 1024 * 1024; //4MB chunk;
		
		if (data != null)
		{
			var dataByteLength = (new TextEncoder().encode(data)).length;

			var uploadPart = mxUtils.bind(this, function(uploadUrl, index, byteIndex, retryCount)
			{
				try
				{
					retryCount = retryCount || 0;
					var acceptResponse = true;
					var timeoutThread = null;
						
					timeoutThread = window.setTimeout(mxUtils.bind(this, function()
					{
						acceptResponse = false;
						error({code: App.ERROR_TIMEOUT});
					}), this.ui.timeout);
	
					var part = data.substr(index, chunkSize);
					var partByteLength = (new TextEncoder().encode(part)).length;
					var req = new mxXmlRequest(uploadUrl, part, 'PUT');

					req.setRequestHeaders = mxUtils.bind(this, function(request, params)
					{
						request.setRequestHeader('Content-Range', 'bytes ' + byteIndex + '-' + 
							(byteIndex + partByteLength - 1) + '/' + dataByteLength);
					});

					req.send(mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
							var status = req.getStatus();
					    	if (status >= 200 && status <= 299)
							{
								var nextByte = index + part.length;
								
								if (nextByte == data.length)
								{
									success(JSON.parse(req.getText()));
								}
								else
								{
									uploadPart(uploadUrl, nextByte, byteIndex + partByteLength, retryCount);
								}
							}
							else if (status >= 500 && status <= 599 && retryCount < 2) //Retry on server errors
							{
								retryCount++;
								uploadPart(uploadUrl, index, byteIndex, retryCount);
							}
							else
							{
								error(this.parseRequestText(req), req);
							}
				    	}
					}), mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
							error(this.parseRequestText(req));
				    	}
					}));
				}
				catch (e)
				{
					error(e);
				}
			});
			
			var doExecute = mxUtils.bind(this, function(failOnAuth)
			{
				try
				{
					var acceptResponse = true;
					var timeoutThread = null;
					
					try
					{
						timeoutThread = window.setTimeout(mxUtils.bind(this, function()
						{
							acceptResponse = false;
							error({code: App.ERROR_TIMEOUT});
						}), this.ui.timeout);
					}
					catch (e)
					{
						// Ignore window closed
					}
					
					var req = new mxXmlRequest(url + '/createUploadSession', '{}', 'POST');
					
					req.setRequestHeaders = mxUtils.bind(this, function(request, params)
					{
						request.setRequestHeader('Content-Type', 'application/json');
						request.setRequestHeader('Authorization', 'Bearer ' + _token);
						
						if (etag != null)
						{
							request.setRequestHeader('If-Match', etag);
						}
					});
					
					req.send(mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
					    	if (req.getStatus() >= 200 && req.getStatus() <= 299)
							{
								var resp = JSON.parse(req.getText());
					    		uploadPart(resp.uploadUrl, 0, 0);
							}
							else if (!failOnAuth && req.getStatus() === 401)
							{
								this.authenticate(function()
								{
									doExecute(true);
								}, error, failOnAuth);
							}
							else
							{
								error(this.parseRequestText(req), req);
							}
				    	}
					}), mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
							error(this.parseRequestText(req));
				    	}
					}));
				}
				catch (e)
				{
					error(e);
				}
			});
			
			if (_token == null || this.tokenExpiresOn - Date.now() < 60000) //60 sec tolerance window
			{
				this.authenticate(function()
				{
					doExecute(true);
				}, error);
			}
			else
			{
				doExecute(false);
			}
		}
		else
		{
			error({message: mxResources.get('unknownError')});
		}
	}
	catch (e)
	{
		error(e);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
OneDriveClient.prototype.writeFile = function(url, data, method, contentType, success, error, etag)
{
	try
	{
		if (url != null && data != null)
		{
			var doExecute = mxUtils.bind(this, function(failOnAuth)
			{
				try
				{
					var acceptResponse = true;
					var timeoutThread = null;
					
					try
					{
						timeoutThread = window.setTimeout(mxUtils.bind(this, function()
						{
							acceptResponse = false;
							error({code: App.ERROR_TIMEOUT});
						}), this.ui.timeout);
					}
					catch (e)
					{
						// Ignore window closed
					}
					
					var req = new mxXmlRequest(url, data, method);
					
					req.setRequestHeaders = mxUtils.bind(this, function(request, params)
					{
						// Space deletes content type header. Specification says "text/plain"
						// should work but returns an 415 Unsupported Media Type error
						request.setRequestHeader('Content-Type', contentType || ' ');
						//TODO This header is needed for moving a file between two different drives. 
						//		Note: the response is empty when this header is used, also the server may take some time to really execute the request (i.e. async) 
						//request.setRequestHeader('Prefer', 'respond-async');
						request.setRequestHeader('Authorization', 'Bearer ' + _token);
						
						if (etag != null)
						{
							request.setRequestHeader('If-Match', etag);
						}
					});
					
					req.send(mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
					    	if (req.getStatus() >= 200 && req.getStatus() <= 299)
							{
					    		if (this.user == null)
								{
									this.updateUser(this.emptyFn, this.emptyFn, true);
								}
					    		
								success(JSON.parse(req.getText()));
							}
							else if (!failOnAuth && req.getStatus() === 401)
							{
								this.authenticate(function()
								{
									doExecute(true);
								}, error, failOnAuth);
							}
							else
							{
								error(this.parseRequestText(req), req);
							}
				    	}
					}), mxUtils.bind(this, function(req)
					{
				    	window.clearTimeout(timeoutThread);
				    	
				    	if (acceptResponse)
				    	{
							error(this.parseRequestText(req));
				    	}
					}));
				}
				catch (e)
				{
					error(e);
				}
			});
			
			if (_token == null || this.tokenExpiresOn - Date.now() < 60000) //60 sec tolerance window
			{
				this.authenticate(function()
				{
					doExecute(true);
				}, error);
			}
			else
			{
				doExecute(false);
			}
		}
		else
		{
			error({message: mxResources.get('unknownError')});
		}
	}
	catch (e)
	{
		error(e);
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.parseRequestText = function(req)
{
	var result = {message: mxResources.get('unknownError')};
	
	try
	{
		result = JSON.parse(req.getText());
		result.status = req.getStatus();
		
		if (result.error)
		{
			result.error.status = result.status;
			result.error.code = result.status;
		}
	}
	catch (e)
	{
		// ignore
	}
	
	return result;
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.pickLibrary = function(fn)
{
	this.pickFile(function(id)
	{
		// Ignores second argument
		fn(id);
	});
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.createInlinePicker = function(fn, foldersOnly, acceptAllFiles)
{
	return mxUtils.bind(this, function()
	{
		var odPicker = null;
		var div = document.createElement('div');
		div.style.position = 'relative';
		
		var dlg = new CustomDialog(this.ui, div, mxUtils.bind(this, function()
		{
			var item = odPicker.getSelectedItem();
			
			if (item != null)
			{
				if (foldersOnly && typeof item.folder == 'object')
				{
					fn({value: [item]});
				}
				else if (!item.folder && this.ui.spinner.spin(document.body, mxResources.get('loading')))
				{
					var id = OneDriveFile.prototype.getIdOf(item);

					this.executeRequest(this.getItemURL(id), mxUtils.bind(this, function(req)
					{
						this.ui.spinner.stop();

						if (req.getStatus() >= 200 && req.getStatus() <= 299)
						{
							var meta = JSON.parse(req.getText());
							fn(id, {value: [meta]});
						}
						else
						{
							this.ui.handleError({code: req.getStatus()});
						}
					}), mxUtils.bind(this, function(req)
					{
						this.ui.spinner.stop();
						this.ui.handleError(req);
					}));
				}

				return;
			}
			
			return mxResources.get('invalidSel', null, 'Invalid selection');
		}), null, mxResources.get(foldersOnly? 'select' :'open'), null, null, null, null, true);
		
		this.ui.showDialog(dlg.container, 550, 500, true, true);
		//Set width/height of the picker container
		div.style.width = dlg.container.parentNode.style.width;
		div.style.height = (parseInt(dlg.container.parentNode.style.height) - 60) + 'px';
		
		odPicker = new mxODPicker(div, null, mxUtils.bind(this, function(url, success, error, isAbsUrl)
		{
			this.executeRequest(isAbsUrl? url : this.baseUrl + url, function(req)
			{
				success(JSON.parse(req.getText()));
			}, error);
		}), mxUtils.bind(this, function(id, driveId, success, error)
		{
			this.executeRequest(this.baseUrl + '/drives/' + driveId + '/items/' + id, function(req)
			{
				success(JSON.parse(req.getText()));
			}, error);
		}), null, null, function(item)
		{
			if (foldersOnly) //Currently this is not called when in foldersOnly mode
			{
				fn({
					value: [item]
				});
			}
			else
			{
				fn(OneDriveFile.prototype.getIdOf(item));
			}
		},
		mxUtils.bind(this, function(err)
		{
			this.ui.showError(mxResources.get('error'), err);
		}), foldersOnly, null, null, null, null, acceptAllFiles); 
	});
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.pickFolder = function(fn, direct)
{
	var errorFn = mxUtils.bind(this, function(e)
	{
		this.ui.showError(mxResources.get('error'), e && e.message? e.message : e);
	});
	
	var odSaveDlg = mxUtils.bind(this, function(direct)
	{
		var openSaveDlg = this.inlinePicker ?
			this.createInlinePicker(fn, true) :
			mxUtils.bind(this, function()
		{
			OneDrive.save(
			{
				clientId: this.clientId,
				action: 'query',
				openInNewWindow: true,
				advanced:
				{
					'endpointHint': mxClient.IS_IE11? null : this.endpointHint, //IE11 doen't work with our modified version, so, setting endpointHint disable using our token BUT will force relogin!
					'redirectUri': this.pickerRedirectUri,
					'queryParameters': 'select=id,name,parentReference',
					'accessToken': _token,
					isConsumerAccount: false
				},
				success: mxUtils.bind(this, function(files)
				{
					fn(files);
					
					//Update the token in case a login with a different user
					if (mxClient.IS_IE11)
					{
						_token = files.accessToken;
					}
				}),
				cancel: mxUtils.bind(this, function()
				{
					// do nothing
				}),
				error: errorFn
			});
		});
		
		if (direct)
		{
			openSaveDlg();
		}
		else
		{
			this.ui.confirm(mxResources.get('useRootFolder'), mxUtils.bind(this, function()
			{
				fn({value: [this.rootId]});
				
			}), openSaveDlg, mxResources.get('yes'), mxResources.get('noPickFolder') + '...', true);
		}
		
		if (this.user == null)
		{
			this.updateUser(this.emptyFn, this.emptyFn, true);
		}
	});
	
	if (_token == null || this.tokenExpiresOn - Date.now() < 60000) //60 sec tolerance window
	{
		this.authenticate(mxUtils.bind(this, function()
		{
			// Direct only possible within user event
			odSaveDlg(this.inlinePicker && direct);
		}), errorFn);
	}
	else
	{
		odSaveDlg(direct);
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.pickFile = function(fn, acceptAllFiles)
{
	fn = (fn != null) ? fn : mxUtils.bind(this, function(id)
	{
		this.ui.loadFile('W' + encodeURIComponent(id));
	});
	
	var errorFn = mxUtils.bind(this, function(e)
	{
		this.ui.showError(mxResources.get('error'), e && e.message? e.message : e);
	});
	
	var odOpenDlg = this.inlinePicker? this.createInlinePicker(fn, null, acceptAllFiles) :
							mxUtils.bind(this, function()
	{
		OneDrive.open(
		{
			clientId: this.clientId,
			action: 'query',
			multiSelect: false,
			advanced:
			{
				'endpointHint': mxClient.IS_IE11? null : this.endpointHint, //IE11 doen't work with our modified version, so, setting endpointHint disable using our token BUT will force relogin!
				'redirectUri': this.pickerRedirectUri,
				'queryParameters': 'select=id,name,parentReference,webUrl', //We can also get @microsoft.graph.downloadUrl within this request but it will break the normal process
				'accessToken': _token,
				isConsumerAccount: false
			},
			success: mxUtils.bind(this, function(files)
			{
				if (files != null && files.value != null && files.value.length > 0)
				{
					//Update the token in case a login with a different user
					if (mxClient.IS_IE11)
					{
						_token = files.accessToken;
					}
					
					fn(OneDriveFile.prototype.getIdOf(files.value[0]), files);
				}
			}),
			cancel: mxUtils.bind(this, function()
			{
				// do nothing
			}),
			error: errorFn
		});
		
		if (this.user == null)
		{
			this.updateUser(this.emptyFn, this.emptyFn, true);
		}
	});
	
	if (_token == null || this.tokenExpiresOn - Date.now() < 60000) //60 sec tolerance window
	{
		this.authenticate(mxUtils.bind(this, function()
		{
			if (this.inlinePicker)
			{
				odOpenDlg();
			}
			else
			{
				this.ui.showDialog(new BtnDialog(this.ui, this, mxResources.get('open'), mxUtils.bind(this, function()
				{
					this.ui.hideDialog();
					odOpenDlg();							
				})).container, 300, 140, true, true);
			}
		}), errorFn);
	}
	else
	{
		odOpenDlg();
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
OneDriveClient.prototype.logout = function()
{
	if (isLocalStorage)
	{
		var check = localStorage.getItem('odpickerv7cache');
		
		if (check != null && check.substring(0, 19) == '{"odsdkLoginHint":{')
		{
			localStorage.removeItem('odpickerv7cache');	
		}
	}

	window.open(this.authUrl + '/oauth2/v2.0/logout', 'logout', 'width=525,height=525,status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes');
	//Send to server to clear refresh token cookie
	this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host));
	this.clearPersistentToken();
	this.setUser(null);
	_token = null;
};

})();