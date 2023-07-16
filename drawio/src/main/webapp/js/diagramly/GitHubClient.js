/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
//Add a closure to hide the class private variables without changing the code a lot
(function ()
{

var _token = null;

window.GitHubClient = function(editorUi, authName)
{
	DrawioClient.call(this, editorUi, authName || 'ghauth');
};

// Extends DrawioClient
mxUtils.extend(GitHubClient, DrawioClient);

/**
 * Specifies if thumbnails should be enabled. Default is true.
 * LATER: If thumbnails are disabled, make sure to replace the
 * existing thumbnail with the placeholder only once.
 */
GitHubClient.prototype.clientId = (window.location.hostname == 'test.draw.io') ? 'Iv1.1218f5567fbc258a' : window.DRAWIO_GITHUB_ID;

/**
 * Default extension for new files.
 */
GitHubClient.prototype.extension = '.drawio';

/**
 * Base URL for API calls.
 */
GitHubClient.prototype.baseUrl = DRAWIO_GITHUB_API_URL;

GitHubClient.prototype.baseHostUrl = DRAWIO_GITHUB_URL;

GitHubClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/github2';

/**
 * Maximum file size of the GitHub REST API.
 */
GitHubClient.prototype.maxFileSize = 50000000 /*50MB*/;

/**
 * Name for the auth token header.
 */
GitHubClient.prototype.authToken = 'token';

GitHubClient.prototype.setToken = function(token)
{
	_token = token;	
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitHubClient.prototype.updateUser = function(success, error, failOnAuth)
{
	var acceptResponse = true;
	
	var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
	{
		acceptResponse = false;
		error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
	}), this.ui.timeout);
	
	var userReq = new mxXmlRequest(this.baseUrl + '/user', null, 'GET');
	var temp = this.authToken + ' ' +  _token;
	
	userReq.setRequestHeaders = function(request, params)
	{
		request.setRequestHeader('Authorization', temp);
	};
	
	userReq.send(mxUtils.bind(this, function()
	{
		window.clearTimeout(timeoutThread);
		
		if (acceptResponse)
		{
			if (userReq.getStatus() === 401)
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
					error({code: userReq.getStatus(), message:
						this.getErrorMessage(userReq,
						mxResources.get('accessDenied'))});
				}
			}
			else if (userReq.getStatus() < 200 || userReq.getStatus() >= 300)
			{
				error({message: mxResources.get('accessDenied')});
			}
			else
			{
				this.setUser(this.createUser(JSON.parse(userReq.getText())));
				success();
			}
		}
	}), error);
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitHubClient.prototype.createUser = function(userInfo)
{
	return new DrawioUser(userInfo.id, userInfo.email, userInfo.name);
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitHubClient.prototype.authenticate = function(success, error)
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

GitHubClient.prototype.authenticateStep2 = function(state, success, error)
{
	if (window.onGitHubCallback == null)
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
						this.setUser(null);
						success();
					}
					else 
					{
						this.clearPersistentToken();
						this.setUser(null);
						_token = null;

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
					var win = window.open(this.baseHostUrl + '/login/oauth/authorize?client_id=' +
						this.clientId +  
						'&state=' + encodeURIComponent('cId=' + this.clientId + //To identify which app/domain is used
							'&domain=' + window.location.host + '&token=' + state), 'ghauth');
					
					if (win != null)
					{
						window.onGitHubCallback = mxUtils.bind(this, function(newAuthInfo, authWindow)
						{
							if (acceptAuthResponse)
							{
								window.onGitHubCallback = null;
								acceptAuthResponse = false;
								
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
									this.setUser(null);
									
									if (remember)
									{
										this.setPersistentToken('remembered');
									}
									
									success();
									
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
						window.onGitHubCallback = null;
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
GitHubClient.prototype.getErrorMessage = function(req, defaultText)
{
	try
	{
		var temp = JSON.parse(req.getText());
		
		if (temp != null && temp.message != null)
		{
			defaultText = temp.message;
		}
	}
	catch (e)
	{
		// ignore
	}
	
	return defaultText;
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitHubClient.prototype.showAuthorizeDialog = function(retryFn, cancelFn)
{
	this.ui.showError(mxResources.get('accessDenied'), mxResources.get('authorizationRequired'),
		mxResources.get('help'), mxUtils.bind(this, function()
		{
			this.ui.openLink('https://www.drawio.com/blog/single-repository-diagrams');
		}), retryFn, mxResources.get('authorize'), mxUtils.bind(this, function()
		{
			this.ui.openLink((window.location.hostname == 'test.draw.io') ?
				'https://github.com/apps/diagrams-net-app-test' :
				'https://github.com/apps/draw-io-app');
		}), mxResources.get('cancel'), cancelFn, 480, null, false);
};

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitHubClient.prototype.executeRequest = function(req, success, error, ignoreNotFound, returnNotFound)
{
	var doExecute = mxUtils.bind(this, function(failOnAuth)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, retry: fn});
		}), this.ui.timeout);
		
		var temp = this.authToken + ' ' + _token;
		
		req.setRequestHeaders = function(request, params)
		{
			request.setRequestHeader('Authorization', temp);
		};
		
		req.send(mxUtils.bind(this, function()
		{
			window.clearTimeout(timeoutThread);

			var authorizeApp = mxUtils.bind(this, function()
			{
				// Pauses spinner while showing dialog
				var resume = this.ui.spinner.pause();

				this.showAuthorizeDialog(mxUtils.bind(this, function()
				{
					resume();
					fn();
				}), mxUtils.bind(this, function()
				{
					this.ui.hideDialog();
					error({name: 'AbortError'});
				}));
			});
			
			if (acceptResponse)
			{
				if ((req.getStatus() >= 200 && req.getStatus() <= 299) ||
					(ignoreNotFound && req.getStatus() == 404))
				{
					success(req);
				}
				else if (req.getStatus() === 401)
				{
					if (!failOnAuth)
					{
						this.authenticate(function()
						{
							doExecute(true);
						}, error);
					}
					else
					{
						error({code: req.getStatus(), message: mxResources.get('accessDenied'), retry: mxUtils.bind(this, function()
						{
							this.authenticate(function()
							{
								fn(true);
							}, error);
						})});
					}
				}
				else if (req.getStatus() === 403)
				{
					var tooLarge = false;
					
					try
					{
						var temp = JSON.parse(req.getText());

						if (temp != null && temp.message == 'Resource not accessible by integration')
						{
							authorizeApp();
						}
						else
						{
							if (temp != null && temp.errors != null && temp.errors.length > 0)
							{
								tooLarge = temp.errors[0].code == 'too_large';
							}

							error({message: mxResources.get((tooLarge) ? 'drawingTooLarge' : 'forbidden')});
						}
					}
					catch (e)
					{
						error({message: mxResources.get((tooLarge) ? 'drawingTooLarge' : 'forbidden')});
					}
				}
				else if (req.getStatus() === 404)
				{
					if (returnNotFound)
					{
						error({code: req.getStatus(), message: this.getErrorMessage(req, mxResources.get('fileNotFound'))});
					}
					else
					{
						authorizeApp();
					}
				}
				else if (req.getStatus() === 409)
				{
					// Special case: flag to the caller that there was a conflict
					error({code: req.getStatus(), status: 409});
				}
				else
				{
					error({code: req.getStatus(), message: this.getErrorMessage(req, mxResources.get('error') + ' ' + req.getStatus())});
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
GitHubClient.prototype.getLibrary = function(path, success, error)
{
	this.getFile(path, success, error, true);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.getSha = function(org, repo, path, ref, success, error, returnNotFound)
{
	// Adds random parameter to bypass cache
	var rnd = '&t=' + new Date().getTime();
	var req = new mxXmlRequest(this.baseUrl + '/repos/' + org + '/' + repo +
		'/contents/' + path + '?ref=' + ref + rnd, null, 'HEAD');
	
	this.executeRequest(req, mxUtils.bind(this, function(req)
	{
		try
		{
			success(req.request.getResponseHeader('Etag').match(/"([^"]+)"/)[1]);
		}
		catch (e)
		{
			error(e);
		}
	}), error, null, returnNotFound);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.getFile = function(path, success, error, asLibrary, checkExists)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;
	
	var tokens = path.split('/');
	var org = tokens[0];
	var repo = tokens[1];
	var ref = tokens[2];
	path = tokens.slice(3, tokens.length).join('/');
	var binary = /\.png$/i.test(path);
	
	// Handles .vsdx, Gliffy and PNG+XML files by creating a temporary file
	if (!checkExists && (/\.v(dx|sdx?)$/i.test(path) || /\.gliffy$/i.test(path) ||
		/\.pdf$/i.test(path) || (!this.ui.useCanvasForExport && binary)))
	{
		// Should never be null
		if (_token != null)
		{
			var url = this.baseUrl + '/repos/' + org + '/' + repo +
				'/contents/' + path + '?ref=' + ref;
			var headers = {'Authorization': 'token ' + _token};
			tokens = path.split('/');
			var name = (tokens.length > 0) ? tokens[tokens.length - 1] : path;
			this.ui.convertFile(url, name, null, this.extension, success, error, null, headers);
		}
		else
		{
			error({message: mxResources.get('accessDenied')});
		}
	}
	else
	{
		// Adds random parameter to bypass cache
		var rnd = '&t=' + new Date().getTime();
		var req = new mxXmlRequest(this.baseUrl + '/repos/' + org + '/' + repo +
			'/contents/' + path + '?ref=' + ref + rnd, null, 'GET');
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			try
			{
				success(this.createGitHubFile(org, repo, ref, JSON.parse(req.getText()), asLibrary));
			}
			catch (e)
			{
				error(e);
			}
		}), error);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitHubClient.prototype.createGitHubFile = function(org, repo, ref, data, asLibrary)
{
	var meta = {'org': org, 'repo': repo, 'ref': ref, 'name': data.name,
		'path': data.path, 'sha': data.sha, 'html_url': data.html_url,
		'download_url': data.download_url};
	var content = data.content;
	
	if (data.encoding === 'base64')
	{
		if (/\.jpe?g$/i.test(data.name))
		{
			content = 'data:image/jpeg;base64,' + content;
		}
		else if (/\.gif$/i.test(data.name))
		{
			content = 'data:image/gif;base64,' + content;
		}
		else
		{
			if (/\.png$/i.test(data.name))
			{
				var xml = this.ui.extractGraphModelFromPng(content);
				
				if (xml != null && xml.length > 0)
				{
					content = xml;
				}
				else
				{
					content = 'data:image/png;base64,' + content;
				}
			}
			else
			{
				content = Base64.decode(content);
			}
		}
	}
	
	return (asLibrary) ? new GitHubLibrary(this.ui, content, meta) : new GitHubFile(this.ui, content, meta);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitHubClient.prototype.insertLibrary = function(filename, data, success, error, folderId)
{
	this.insertFile(filename, data, success, error, true, folderId, false);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitHubClient.prototype.insertFile = function(filename, data, success, error, asLibrary, folderId, base64Encoded)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;

	var tokens = folderId.split('/');
	var org = tokens[0];
	var repo = tokens[1];
	var ref = tokens[2];
	var path = tokens.slice(3, tokens.length).join('/');

	if (path.length > 0)
	{
		path = path + '/';
	}
	
	path = path + filename;

	this.checkExists(org + '/' + repo + '/' + ref + '/' + path, true, mxUtils.bind(this, function(checked, sha)
	{
		if (checked)
		{
			// Does not insert file here as there is another writeFile implicit via fileCreated
			if (!asLibrary)
			{
				success(new GitHubFile(this.ui, data, {'org': org, 'repo': repo, 'ref': ref,
					'name': filename, 'path': path, 'sha': sha, isNew: true}));
			}
			else
			{
				if (!base64Encoded)
				{
					data = Base64.encode(data);
				}
				
				this.showCommitDialog(filename, true, mxUtils.bind(this, function(message)
				{
					this.writeFile(org, repo, ref, path, message, data, sha, mxUtils.bind(this, function(req)
					{
						try
						{
							var msg = JSON.parse(req.getText());
							success(this.createGitHubFile(org, repo, ref, msg.content, asLibrary));
						}
						catch (e)
						{
							error(e);
						}
					}), error);
				}), error);
			}
		}
		else
		{
			error();
		}
	}))
};

/**
 * 
 */
GitHubClient.prototype.showCommitDialog = function(filename, isNew, success, cancel)
{
	// Pauses spinner while commit message dialog is shown
	var resume = this.ui.spinner.pause();
	
	var dlg = new FilenameDialog(this.ui, mxResources.get((isNew) ? 'addedFile' : 'updateFile',
		[filename]), mxResources.get('ok'), mxUtils.bind(this, function(message)
	{
		resume();
		success(message);
	}), mxResources.get('commitMessage'), null, null, null, null, mxUtils.bind(this, function()
	{
		cancel();
	}), null, 280);

	this.ui.showDialog(dlg.container, 400, 80, true, false);
	dlg.init();
};

/**
 * 
 */
GitHubClient.prototype.writeFile = function(org, repo, ref, path, message, data, sha, success, error)
{
	if (data.length >= this.maxFileSize)
	{
		error({message: mxResources.get('drawingTooLarge') + ' (' +
			this.ui.formatFileSize(data.length) + ' / 1 MB)'});
	}
	else
	{
		var entity =
		{
			path: path,
			branch: decodeURIComponent(ref),
			message: message,
			content: data
		};
		
		if (sha != null)
		{
			entity.sha = sha;
		}
		
		var req = new mxXmlRequest(this.baseUrl + '/repos/' + org + '/' + repo +
			'/contents/' + path, JSON.stringify(entity), 'PUT');
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			success(req);
		}), mxUtils.bind(this, function(err)
		{
			if (err.code == 404)
			{
				err.helpLink = this.baseHostUrl + '/settings/connections/applications/' + this.clientId;
				err.code = null;
			}
			
			error(err);
		}));
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitHubClient.prototype.checkExists = function(path, askReplace, fn)
{
	var tokens = path.split('/');
	var org = tokens[0];
	var repo = tokens[1];
	var ref = tokens[2];
	path = tokens.slice(3, tokens.length).join('/');
	
	this.getSha(org, repo, path, ref, mxUtils.bind(this, function(sha)
	{
		if (askReplace)
		{
			var resume = this.ui.spinner.pause();
			
			this.ui.confirm(mxResources.get('replaceIt', [path]), function()
			{
				resume();
				fn(true, sha);
			}, function()
			{
				resume();
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
	}), mxUtils.bind(this, function(err)
	{
		fn(true);
	}), true);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitHubClient.prototype.saveFile = function(file, success, error, overwrite, message)
{
	var org = file.meta.org;
	var repo = file.meta.repo;
	var ref = file.meta.ref;
	var path = file.meta.path;
	
	var fn = mxUtils.bind(this, function(sha, data)
	{
		this.writeFile(org, repo, ref, path, message, data, sha,
			mxUtils.bind(this, function(req)
		{
			delete file.meta.isNew;
			success(JSON.parse(req.getText()).content.sha);
		}), mxUtils.bind(this, function(err)
		{
			error(err);
		}));
	});
	
	var fn2 = mxUtils.bind(this, function()
	{
		if (this.ui.useCanvasForExport && /(\.png)$/i.test(path))
		{
			var p = this.ui.getPngFileProperties(this.ui.fileNode);
			
			this.ui.getEmbeddedPng(mxUtils.bind(this, function(data)
			{
				fn(file.meta.sha, data);
			}), error, (this.ui.getCurrentFile() != file) ?
				file.getData() : null, p.scale, p.border);
		}
		else
		{
			fn(file.meta.sha, Base64.encode(file.getData()));
		}
	});
	
	if (overwrite)
	{
		this.getSha(org, repo, path, ref, mxUtils.bind(this, function(sha)
		{
			file.meta.sha = sha;
			fn2();
		}), error);
	}
	else
	{
		fn2();
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.pickLibrary = function(fn)
{
	this.pickFile(fn);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.pickFolder = function(fn)
{
	this.showGitHubDialog(false, fn, true);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.pickFile = function(fn)
{
	fn = (fn != null) ? fn : mxUtils.bind(this, function(path)
	{
		this.ui.loadFile('H' + encodeURIComponent(path));
	});
	
	this.showGitHubDialog(true, fn);
};

/**
 * 
 */
GitHubClient.prototype.showGitHubDialog = function(showFiles, fn, hideNoFilesError)
{
	var org = null;
	var repo = null;
	var ref = null;
	var path = null;
	
	var content = document.createElement('div');
	content.style.whiteSpace = 'nowrap';
	content.style.overflow = 'hidden';
	content.style.height = '320px';

	var hd = document.createElement('h3');
	mxUtils.write(hd, mxResources.get((showFiles) ? 'selectFile' : 'selectFolder'));
	hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
	content.appendChild(hd);

	var btn = this.ui.createToolbarButton(Editor.refreshImage,
		mxResources.get('refresh'), mxUtils.bind(this, function()
		{
			selectRepo();
		}));

	btn.style.position = 'absolute';
	btn.style.right = '40px';
	btn.style.top = '26px';
	content.appendChild(btn);

	var div = document.createElement('div');
	div.style.whiteSpace = 'nowrap';
	div.style.border = '1px solid lightgray';
	div.style.boxSizing = 'border-box';
	div.style.padding = '4px';
	div.style.overflow = 'auto';
	div.style.lineHeight = '1.2em';
	div.style.height = '290px';
	content.appendChild(div);
	
	var listItem = document.createElement('div');
	listItem.style.textOverflow = 'ellipsis';
	listItem.style.boxSizing = 'border-box';
	listItem.style.overflow = 'hidden';
	listItem.style.padding = '4px';
	listItem.style.width = '100%';
	
	var dlg = new CustomDialog(this.ui, content, mxUtils.bind(this, function()
		{
			fn(org + '/' + repo + '/' + encodeURIComponent(ref) + '/' + path);
		}), null, null, 'https://www.drawio.com/blog/single-repository-diagrams', null, null, null, null,
		[[mxResources.get('authorize'), mxUtils.bind(this, function()
		{
			this.ui.openLink((window.location.hostname == 'test.draw.io') ?
				'https://github.com/apps/diagrams-net-app-test' :
				'https://github.com/apps/draw-io-app');
		})]], '16px');
	this.ui.showDialog(dlg.container, 420, 370, true, true);

	if (showFiles)
	{
		dlg.okButton.parentNode.removeChild(dlg.okButton);
	}
	
	var createLink = mxUtils.bind(this, function(label, exec, padding, underline)
	{
		var link = document.createElement('a');
		link.setAttribute('title', label);
		link.style.cursor = 'pointer';
		mxUtils.write(link,  label);
		mxEvent.addListener(link, 'click', exec);
		
		if (underline)
		{
			link.style.textDecoration = 'underline';
		}
		
		if (padding != null)
		{
			var temp = listItem.cloneNode();
			temp.style.padding = padding;
			temp.appendChild(link);
			
			link = temp;
		}
		
		return link;
	});
	
	var updatePathInfo = mxUtils.bind(this, function(hideRef)
	{
		var pathInfo = document.createElement('div');
		pathInfo.style.marginBottom = '8px';
		
		pathInfo.appendChild(createLink(org + '/' + repo, mxUtils.bind(this, function()
		{
			path = null;
			selectRepo();
		}), null, true));
		
		if (!hideRef)
		{
			mxUtils.write(pathInfo, ' / ');
			pathInfo.appendChild(createLink(decodeURIComponent(ref), mxUtils.bind(this, function()
			{
				path = null;
				selectRef();
			}), null, true));
		}
		
		if (path != null && path.length > 0)
		{
			var tokens = path.split('/');
			
			for (var i = 0; i < tokens.length; i++)
			{
				(function(index)
				{
					mxUtils.write(pathInfo, ' / ');
					pathInfo.appendChild(createLink(tokens[index], mxUtils.bind(this, function()
					{
						path = tokens.slice(0, index + 1).join('/');
						selectFile();
					}), null, true));
				})(i);
			}
		}
		
		div.appendChild(pathInfo);
	});
	
	var error = mxUtils.bind(this, function(err)
	{
		// Pass a dummy notFoundMessage to bypass special handling 
		this.ui.handleError(err, null, mxUtils.bind(this, function()
		{
			this.ui.spinner.stop();
			
			if (this.getUser() != null)
			{
				org = null;
				repo = null;
				ref = null;
				path = null;
				
				selectRepo();
			}
			else
			{
				this.ui.hideDialog();
			}
		}), null, {});
	});
	
	// Adds paging for repos, branches and files (files limited to 1000 by API)
	var nextPageDiv = null;
	var scrollFn = null;
	var pageSize = 100;

	var selectFile = mxUtils.bind(this, function(page)
	{
		if (page == null)
		{
			div.innerText = '';
			page = 1;
		}
		
		var req = new mxXmlRequest(this.baseUrl + '/repos/' + org + '/' + repo +
				'/contents/' + path + '?ref=' + encodeURIComponent(ref) +
				'&per_page=' + pageSize + '&page=' + page, null, 'GET');
		this.ui.spinner.spin(div, mxResources.get('loading'));
		dlg.okButton.removeAttribute('disabled');
		
		if (scrollFn != null)
		{
			mxEvent.removeListener(div, 'scroll', scrollFn);
			scrollFn = null;
		}
		
		if (nextPageDiv != null && nextPageDiv.parentNode != null)
		{
			nextPageDiv.parentNode.removeChild(nextPageDiv);
		}
		
		nextPageDiv = document.createElement('a');
		nextPageDiv.style.display = 'block';
		nextPageDiv.style.cursor = 'pointer';
		mxUtils.write(nextPageDiv, mxResources.get('more') + '...');
		
		var nextPage = mxUtils.bind(this, function()
		{
			selectFile(page + 1);
		});
		
		mxEvent.addListener(nextPageDiv, 'click', nextPage);
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			this.ui.tryAndHandle(mxUtils.bind(this, function()
			{
				this.ui.spinner.stop();
				
				if (page == 1)
				{
					updatePathInfo();
					
					div.appendChild(createLink('../ [Up]', mxUtils.bind(this, function()
					{
						if (path == '')
						{
							path = null;
							selectRepo();
						}
						else
						{
							var tokens = path.split('/');
							path = tokens.slice(0, tokens.length - 1).join('/');
							selectFile();
						}
					}), '4px'));
				}

				var files = JSON.parse(req.getText());
				
				if (files == null || files.length == 0)
				{
					if (!hideNoFilesError)
					{
						mxUtils.br(div);
						mxUtils.write(div, mxResources.get('noFiles'));
					}
				}
				else
				{
					var gray = true;
					var count = 0;
					
					var listFiles = mxUtils.bind(this, function(showFolders)
					{
						for (var i = 0; i < files.length; i++)
						{
							(mxUtils.bind(this, function(file, idx)
							{
								if (showFolders == (file.type == 'dir'))
								{
									var temp = listItem.cloneNode();
									temp.style.backgroundColor = (gray) ?
										((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
									gray = !gray;

									var typeImg = document.createElement('img');
									typeImg.src = IMAGE_PATH + '/' + (file.type == 'dir'? 'folder.png' : 'file.png');
									typeImg.setAttribute('align', 'absmiddle');
									typeImg.style.marginRight = '4px';
									typeImg.style.marginTop = '-4px';
									typeImg.width = 20;
									temp.appendChild(typeImg);
									
									temp.appendChild(createLink(file.name + ((file.type == 'dir') ? '/' : ''), mxUtils.bind(this, function()
									{
										if (file.type == 'dir')
										{
											path = file.path;
											selectFile();
										}
										else if (showFiles && file.type == 'file')
										{
											this.ui.hideDialog();
											fn(org + '/' + repo + '/' + encodeURIComponent(ref) + '/' + file.path);
										}
									})));
									
									div.appendChild(temp);
									count++;
								}
							}))(files[i], i);
						}
					});
					
					listFiles(true);
					
					if (showFiles)
					{
						listFiles(false);
					}
					
					// LATER: Paging not supported for contents in GitHub
					// if (count == pageSize)
					// {
					// 	div.appendChild(nextPageDiv);
						
					// 	scrollFn = function()
					// 	{
					// 		if (div.scrollTop >= div.scrollHeight - div.offsetHeight)
					// 		{
					// 			nextPage();
					// 		}
					// 	};
						
					// 	mxEvent.addListener(div, 'scroll', scrollFn);
					// }
				}
			}));
		}), error, true);
	});

	var selectRef = mxUtils.bind(this, function(page, auto)
	{
		if (page == null)
		{
			div.innerText = '';
			page = 1;
		}
		
		var req = new mxXmlRequest(this.baseUrl + '/repos/' + org + '/' + repo +
			'/branches?per_page=' + pageSize + '&page=' + page, null, 'GET');
		dlg.okButton.setAttribute('disabled', 'disabled');
		this.ui.spinner.spin(div, mxResources.get('loading'));
		
		if (scrollFn != null)
		{
			mxEvent.removeListener(div, 'scroll', scrollFn);
			scrollFn = null;
		}
		
		if (nextPageDiv != null && nextPageDiv.parentNode != null)
		{
			nextPageDiv.parentNode.removeChild(nextPageDiv);
		}
		
		nextPageDiv = document.createElement('a');
		nextPageDiv.style.display = 'block';
		nextPageDiv.style.cursor = 'pointer';
		mxUtils.write(nextPageDiv, mxResources.get('more') + '...');
		
		var nextPage = mxUtils.bind(this, function()
		{
			selectRef(page + 1);
		});
		
		mxEvent.addListener(nextPageDiv, 'click', nextPage);
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			this.ui.tryAndHandle(mxUtils.bind(this, function()
			{
				this.ui.spinner.stop();
				
				if (page == 1)
				{
					updatePathInfo(true);
					
					div.appendChild(createLink('../ [Up]', mxUtils.bind(this, function()
					{
						path = null;
						selectRepo();
					}), '4px'));
				}

				var branches = JSON.parse(req.getText());
				
				if (branches == null || branches.length == 0)
				{
					mxUtils.br(div);
					mxUtils.write(div, mxResources.get('repositoryNotFound'));
				}
				else if (branches.length == 1 && auto)
				{
					ref = branches[0].name;
					path = '';
					selectFile();
				}
				else
				{
					for (var i = 0; i < branches.length; i++)
					{
						(mxUtils.bind(this, function(branch, idx)
						{
							var temp = listItem.cloneNode();
							temp.style.backgroundColor = (idx % 2 == 0) ?
								((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
							
							temp.appendChild(createLink(branch.name, mxUtils.bind(this, function()
							{
								ref = branch.name;
								path = '';
								selectFile();
							})));
							
							div.appendChild(temp);
						}))(branches[i], i);
					}
					
					if (branches.length == pageSize)
					{
						div.appendChild(nextPageDiv);
						
						scrollFn = function()
						{
							if (div.scrollTop >= div.scrollHeight - div.offsetHeight)
							{
								nextPage();
							}
						};
						
						mxEvent.addListener(div, 'scroll', scrollFn);
					}
				}
			}));
		}), error);
	});

	var selectRepo = mxUtils.bind(this, function(page)
	{
		if (page == null)
		{
			div.innerText = '';
			page = 1;
		}
		
		var req = new mxXmlRequest(this.baseUrl + '/user/repos?per_page=' +
			pageSize + '&page=' + page, null, 'GET');
		dlg.okButton.setAttribute('disabled', 'disabled');
		this.ui.spinner.spin(div, mxResources.get('loading'));
		
		if (scrollFn != null)
		{
			mxEvent.removeListener(div, 'scroll', scrollFn);
		}
		
		if (nextPageDiv != null && nextPageDiv.parentNode != null)
		{
			nextPageDiv.parentNode.removeChild(nextPageDiv);
		}
		
		nextPageDiv = document.createElement('a');
		nextPageDiv.style.display = 'block';
		nextPageDiv.style.cursor = 'pointer';
		mxUtils.write(nextPageDiv, mxResources.get('more') + '...');
		
		var nextPage = mxUtils.bind(this, function()
		{
			selectRepo(page + 1);
		});
		
		mxEvent.addListener(nextPageDiv, 'click', nextPage);
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			this.ui.tryAndHandle(mxUtils.bind(this, function()
			{
				this.ui.spinner.stop();
				var repos = JSON.parse(req.getText());
				
				if (repos == null || repos.length == 0)
				{
					mxUtils.br(div);
					mxUtils.write(div, mxResources.get('repositoryNotFound'));
				}
				else
				{
					if (page == 1)
					{
						div.appendChild(createLink(mxResources.get('enterValue') + '...', mxUtils.bind(this, function()
						{
							var dlg = new FilenameDialog(this.ui, 'org/repo/ref', mxResources.get('ok'), mxUtils.bind(this, function(value)
							{
								if (value != null)
								{
									var tokens = value.split('/');
									
									if (tokens.length > 1)
									{
										var tmpOrg = tokens[0];
										var tmpRepo = tokens[1];
		
										if (tokens.length < 3)
										{
											org = tmpOrg;
											repo = tmpRepo;
											ref = null;
											path = null;
											
											selectRef();
										}
										else if (this.ui.spinner.spin(div, mxResources.get('loading')))
										{
											var tmpRef = encodeURIComponent(tokens.slice(2, tokens.length).join('/'));
											
											this.getFile(tmpOrg + '/' + tmpRepo + '/' + tmpRef, mxUtils.bind(this, function(file)
											{
												this.ui.spinner.stop();
												org = file.meta.org;
												repo = file.meta.repo;
												ref = decodeURIComponent(file.meta.ref);
												path = '';
												
												selectFile();
											}), mxUtils.bind(this, function(err)
											{
												this.ui.spinner.stop();
												this.ui.handleError({message: mxResources.get('fileNotFound')});
											}));
										}
									}
									else
									{
										this.ui.spinner.stop();
										this.ui.handleError({message: mxResources.get('invalidName')});
									}
								}
							}), mxResources.get('enterValue'));
							this.ui.showDialog(dlg.container, 300, 80, true, false);
							dlg.init();
						})));
						
						mxUtils.br(div);
						mxUtils.br(div);
					}
					
					for (var i = 0; i < repos.length; i++)
					{
						(mxUtils.bind(this, function(repository, idx)
						{
							var temp = listItem.cloneNode();
							temp.style.backgroundColor = (idx % 2 == 0) ?
								((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
							
							temp.appendChild(createLink(repository.full_name, mxUtils.bind(this, function()
							{
								org = repository.owner.login;
								repo = repository.name;
								path = '';
		
								selectRef(null, true);
							})));
							
							div.appendChild(temp);
						}))(repos[i], i);
					}
				}

				if (repos.length == pageSize)
				{
					div.appendChild(nextPageDiv);
					
					scrollFn = function()
					{
						if (div.scrollTop >= div.scrollHeight - div.offsetHeight)
						{
							nextPage();
						}
					};
					
					mxEvent.addListener(div, 'scroll', scrollFn);
				}
			}));
		}), error);
	});
	
	selectRepo();
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitHubClient.prototype.logout = function()
{
	//NOTE: GitHub doesn't provide a refresh token, so no need to clear the token cookie
	//this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host));
	this.clearPersistentToken();
	this.setUser(null);
	_token = null;
};

})();