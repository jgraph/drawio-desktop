/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */
//Add a closure to hide the class private variables without changing the code a lot
(function()
{

var _token = null;

window.GitLabClient = function(editorUi)
{
	GitHubClient.call(this, editorUi, 'gitlabauth');
};

// Extends DrawioClient
mxUtils.extend(GitLabClient, GitHubClient);

/**
 * Gitlab Client ID, see https://gitlab.com/oauth/applications/135239
 */
GitLabClient.prototype.clientId = DRAWIO_GITLAB_ID;

/**
 * OAuth scope.
 */
GitLabClient.prototype.scope = 'api%20read_repository%20write_repository';

/**
 * Base URL for API calls.
 */
GitLabClient.prototype.baseUrl = DRAWIO_GITLAB_URL + '/api/v4';

/**
 * Maximum file size of the GitLab REST API.
 */
GitLabClient.prototype.maxFileSize = 10000000 /*10MB*/;

/**
 * Name for the auth token header.
 */
GitLabClient.prototype.authToken = 'Bearer';

GitLabClient.prototype.redirectUri = window.location.protocol + '//' + window.location.host + '/gitlab';

/**
 * Authorizes the client, gets the userId and calls <open>.
 */
GitLabClient.prototype.authenticate = function(success, error)
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

GitLabClient.prototype.authenticateStep2 = function(state, success, error)
{
	if (window.onGitLabCallback == null)
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
						this.setToken(_token);
						this.setUser(null);
						success();
					}
					else 
					{
						this.clearPersistentToken();
						this.setUser(null);
						_token = null;
						this.setToken(null);

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
					var win = window.open(DRAWIO_GITLAB_URL + '/oauth/authorize?client_id=' +
						this.clientId + '&scope=' + this.scope + 
						'&redirect_uri=' + encodeURIComponent(this.redirectUri) +
						'&response_type=code&state=' + encodeURIComponent('cId=' + this.clientId + //To identify which app/domain is used
							'&domain=' + window.location.host + '&token=' + state) , 'gitlabauth'); 
					
					if (win != null)
					{
						window.onGitLabCallback = mxUtils.bind(this, function(newAuthInfo, authWindow)
						{
							if (acceptAuthResponse)
							{
								window.onGitLabCallback = null;
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
									this.setToken(_token);
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
						window.onGitLabCallback = null;
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
GitLabClient.prototype.executeRequest = function(req, success, error, ignoreNotFound)
{
	var doExecute = mxUtils.bind(this, function(failOnAuth)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
		}), this.ui.timeout);
		
		var temp = this.authToken + ' ' + _token;
		
		req.setRequestHeaders = function(request, params)
		{
			request.setRequestHeader('Authorization', temp);
			request.setRequestHeader('PRIVATE_TOKEN', temp);
			request.setRequestHeader('Content-Type', 'application/json');
		};
		
		req.send(mxUtils.bind(this, function()
		{
			window.clearTimeout(timeoutThread);
			
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
						error({message: mxResources.get('accessDenied'), retry: mxUtils.bind(this, function()
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
						
						if (temp != null && temp.errors != null && temp.errors.length > 0)
						{
							tooLarge = temp.errors[0].code == 'too_large';
						}
					}
					catch (e)
					{
						// ignore
					}
					
					error({message: mxResources.get((tooLarge) ? 'drawingTooLarge' : 'forbidden')});
				}
				else if (req.getStatus() === 404)
				{
					error({message: this.getErrorMessage(req, mxResources.get('fileNotFound'))});
				}
				else
				{
					error({status: req.getStatus(), message: this.getErrorMessage(req,
						mxResources.get('error') + ' ' + req.getStatus())});
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
 * Finds index of ref in given token list. This is required to support groups and subgroups.
 */
GitLabClient.prototype.getRefIndex = function(tokens, isFolder, success, error, knownRefPos, checkRepo)
{
	if (knownRefPos != null)
	{
		success(tokens, knownRefPos);
	}
	else
	{
		var refPos = tokens.length - 2;
		
		// Finds ref in token list by checking which URL works
		var checkUrl = mxUtils.bind(this, function()
		{
			if (refPos < 2)
			{
				error({message: mxResources.get('fileNotFound')});
			}
			else
			{
				var repoPos = Math.max(refPos - 1, 0);
				var org = tokens.slice(0, repoPos).join('/');
				var repo = tokens[repoPos];
				var ref = tokens[refPos];
				var path = tokens.slice(refPos + 1, tokens.length).join('/');
				var url = this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) + '/repository/' +
					(!isFolder ? 'files/' + encodeURIComponent(path) + '?ref=' + ref : (checkRepo ?
					'branches?per_page=1&page=1&ref=' + ref : 'tree?path=' + path + '&ref=' + ref));
				
				var req = new mxXmlRequest(url, null, 'HEAD');
				
				this.executeRequest(req, mxUtils.bind(this, function()
				{
					if (req.getStatus() == 200)
					{
						success(tokens, refPos);
					}
					else
					{
						error({message: mxResources.get('fileNotFound')});
					}
				}), mxUtils.bind(this, function()
				{
					if (req.getStatus() == 404)
					{
						refPos--;
						checkUrl();
					}
					else
					{
						error({message: mxResources.get('fileNotFound')});
					}
				}));
			}
		});
		
		checkUrl();
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitLabClient.prototype.getFile = function(path, success, error, asLibrary, checkExists, knownRefPos)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;

	this.getRefIndex(path.split('/'), false, mxUtils.bind(this, function(tokens, refPos)
	{
		var repoPos = Math.max(refPos - 1, 0);
		var org = tokens.slice(0, repoPos).join('/');
		var repo = tokens[repoPos];
		var ref = tokens[refPos];
		path = tokens.slice(refPos + 1, tokens.length).join('/');
		var binary = /\.png$/i.test(path);
		
		// Handles .vsdx, Gliffy and PNG+XML files by creating a temporary file
		if (!checkExists && (/\.v(dx|sdx?)$/i.test(path) || /\.gliffy$/i.test(path) ||
			/\.pdf$/i.test(path) || (!this.ui.useCanvasForExport && binary)))
		{
			// Should never be null
			if (_token != null)
			{
				// Adds random parameter to bypass cache
				var rnd = '&t=' + new Date().getTime();
				var url = this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) +
					'/repository/files/' + encodeURIComponent(path) + '?ref=' + ref;
				var tokens = path.split('/');
				var name = (tokens.length > 0) ? tokens[tokens.length - 1] : path;
				
				this.ui.convertFile(url + rnd, name, null, this.extension, success, error, mxUtils.bind(this, function(url, cb, err)
				{
					var req = new mxXmlRequest(url, null, 'GET');
					
					this.executeRequest(req, mxUtils.bind(this, function(req)
					{
						try
						{
							cb(this.getFileContent(JSON.parse(req.getText())));
						}
						catch (e)
						{
							err(e);
						}
					}), err);
				}));
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
			url = this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) +
				'/repository/files/' + encodeURIComponent(path) + '?ref=' + ref;
			var req = new mxXmlRequest(url + rnd, null, 'GET');
			
			this.executeRequest(req, mxUtils.bind(this, function(req)
			{
				try
				{
					success(this.createGitLabFile(org, repo, ref, JSON.parse(req.getText()), asLibrary, refPos));
				}
				catch (e)
				{
					error(e);
				}
			}), error);
		}
	}), error, knownRefPos);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitLabClient.prototype.getFileContent = function(data)
{
	var fileName = data.file_name;
	var content = data.content;
	
	if (data.encoding === 'base64')
	{
		if (/\.jpe?g$/i.test(fileName))
		{
			content = 'data:image/jpeg;base64,' + content;
		}
		else if (/\.gif$/i.test(fileName))
		{
			content = 'data:image/gif;base64,' + content;
		}
		else if (/\.pdf$/i.test(fileName))
		{
			content = 'data:application/pdf;base64,' + content;
		}
		else
		{
			if (/\.png$/i.test(fileName))
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
	
	return content;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitLabClient.prototype.createGitLabFile = function(org, repo, ref, data, asLibrary, refPos)
{
	var gitLabUrl = DRAWIO_GITLAB_URL + '/';
	var htmlUrl = gitLabUrl + org + '/' + repo + '/blob/' + ref + '/' + data.file_path;
	var downloadUrl = gitLabUrl + org + '/' + repo + '/raw/' + ref + '/' + data.file_path + '?inline=false';
	var fileName = data.file_name;

	var meta = {'org': org, 'repo': repo, 'ref': ref, 'name': fileName,
		'path': data.file_path, 'html_url': htmlUrl, 'download_url': downloadUrl,
		'last_commit_id': data.last_commit_id, 'refPos': refPos};
	var content = this.getFileContent(data);
	
	return (asLibrary) ? new GitLabLibrary(this.ui, content, meta) : new GitLabFile(this.ui, content, meta);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitLabClient.prototype.insertFile = function(filename, data, success, error, asLibrary, folderId, base64Encoded)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;
	var tok = folderId.split('/');
	
	this.getRefIndex(tok, true, mxUtils.bind(this, function(tokens, refPos)
	{
		var repoPos = Math.max(refPos - 1, 0);
		var org = tokens.slice(0, repoPos).join('/');
		var repo = tokens[repoPos];
		var ref = tokens[refPos];
		path = tokens.slice(refPos + 1, tokens.length).join('/');
	
		if (path.length > 0)
		{
			path = path + '/';
		}
		
		path = path + filename;
	
		this.checkExists(org + '/' + repo + '/' + ref + '/' + path, true, mxUtils.bind(this, function(checked, last_commit_id)
		{
			if (checked)
			{
				// Does not insert file here as there is another writeFile implicit via fileCreated
				if (!asLibrary)
				{
					var gitLabUrl = DRAWIO_GITLAB_URL + '/';
					var htmlUrl = gitLabUrl + org + '/' + repo + '/blob/' + ref + '/' + path;
					var downloadUrl = gitLabUrl + org + '/' + repo + '/raw/' + ref + '/' + path + '?inline=false';
					
					success(new GitLabFile(this.ui, data, {'org': org, 'repo': repo, 'ref': ref, 'name': filename,
						'path': path, 'html_url': htmlUrl, 'download_url': downloadUrl, 'refPos': refPos,
						'last_commit_id': last_commit_id, isNew: true}));
				}
				else
				{
					if (!base64Encoded)
					{
						data = Base64.encode(data);
					}
					
					this.showCommitDialog(filename, true, mxUtils.bind(this, function(message)
					{
						this.writeFile(org, repo, ref, path, message, data, last_commit_id, mxUtils.bind(this, function(req)
						{
							try
							{
								var msg = JSON.parse(req.getText());

								success(this.createGitLabFile(org, repo, ref,
									(msg.content != null) ? msg.content : msg,
									asLibrary, refPos));
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
				// create if it does not exists
				error();
			}
		}))
	}), error, null, tok.length <= 4);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitLabClient.prototype.checkExists = function(path, askReplace, fn)
{
	this.getFile(path, mxUtils.bind(this, function(file)
	{
		if (askReplace)
		{
			var resume = this.ui.spinner.pause();
			
			this.ui.confirm(mxResources.get('replaceIt', [path]), function()
			{
				resume();
				fn(true, file.getCurrentEtag());
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
	}), null, true);
};

/**
 * 
 */
GitLabClient.prototype.writeFile = function(org, repo, ref, path, message, data, last_commit_id, success, error)
{
	if (data.length >= this.maxFileSize)
	{
		error({message: mxResources.get('drawingTooLarge') + ' (' +
			this.ui.formatFileSize(data.length) + ' / 10 MB)'});
	}
	else
	{
		var method = 'POST';
		
		var entity = {
			path: encodeURIComponent(path),
			branch: decodeURIComponent(ref),
			commit_message: message,
			content: data,
			encoding: 'base64'
		};
		
		if (last_commit_id != null)
		{
			entity.last_commit_id = last_commit_id;
			method = 'PUT';
		}
		
		// See https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository
		var url = this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) + '/repository/files/' + encodeURIComponent(path);
		var req = new mxXmlRequest(url, JSON.stringify(entity), method);
		
		this.executeRequest(req, mxUtils.bind(this, function(req)
		{
			success(req);
		}), error);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
GitLabClient.prototype.saveFile = function(file, success, error, overwrite, message)
{
	var org = file.meta.org;
	var repo = file.meta.repo;
	var ref = file.meta.ref;
	var path = file.meta.path;

	var fn = mxUtils.bind(this, function(last_commit_id, data)
	{
		this.writeFile(org, repo, ref, path, message, data, last_commit_id, mxUtils.bind(this, function(req)
		{
			delete file.meta.isNew;
			
			// Response does not return last_commit_id so we have to get the file
			// to to update last_commit_id and compare data to avoid lost commit
			this.getFile(org + '/' + repo + '/' + ref + '/' + path, mxUtils.bind(this, function(tempFile)
			{
				if (tempFile.getData() == file.getData())
				{
					success(tempFile.getCurrentEtag());
				}
				else
				{
					success({content: file.getCurrentEtag()});
				}
			}), error, null, null, file.meta.refPos);
		}), error);
	});
	
	var fn2 = mxUtils.bind(this, function()
	{
		if (this.ui.useCanvasForExport && /(\.png)$/i.test(path))
		{
			var p = this.ui.getPngFileProperties(this.ui.fileNode);
			
			this.ui.getEmbeddedPng(mxUtils.bind(this, function(data)
			{
				fn(file.meta.last_commit_id, data);
			}), error, (this.ui.getCurrentFile() != file) ?
				file.getData() : null, p.scale, p.border);
		}
		else
		{
			fn(file.meta.last_commit_id, Base64.encode(file.getData()));
		}
	});
	
	// LATER: Get last_commit_id is currently not possible since HEAD does
	// not have Access-Control-Expose-Headers for X-Gitlab-Last-Commit-Id
	if (overwrite)
	{
		this.getFile(org + '/' + repo + '/' + ref + '/' + path, mxUtils.bind(this, function(tempFile)
		{
			file.meta.last_commit_id = tempFile.meta.last_commit_id;
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
GitLabClient.prototype.pickFolder = function(fn)
{
	this.showGitLabDialog(false, fn, true);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitLabClient.prototype.pickFile = function(fn)
{
	fn = (fn != null) ? fn : mxUtils.bind(this, function(path)
	{
		this.ui.loadFile('A' + encodeURIComponent(path));
	});
	
	this.showGitLabDialog(true, fn);
};

/**
 * LATER: Refactor to use common code with GitHubClient
 */
GitLabClient.prototype.showGitLabDialog = function(showFiles, fn, hideNoFilesError)
{
	var org = null;
	var repo = null;
	var ref = null;
	var path = null;
	
	var content = document.createElement('div');
	content.style.whiteSpace = 'nowrap';
	content.style.overflow = 'hidden';
	content.style.height = '304px';

	var hd = document.createElement('h3');
	mxUtils.write(hd, mxResources.get((showFiles) ? 'selectFile' : 'selectFolder'));
	hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
	content.appendChild(hd);

	var div = document.createElement('div');
	div.style.whiteSpace = 'nowrap';
	div.style.border = '1px solid lightgray';
	div.style.boxSizing = 'border-box';
	div.style.padding = '4px';
	div.style.overflow = 'auto';
	div.style.lineHeight = '1.2em';
	div.style.height = '274px';
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
	}));
	this.ui.showDialog(dlg.container, 420, 370, true, true);
	
	if (showFiles)
	{
		dlg.okButton.parentNode.removeChild(dlg.okButton);
	}
	
	var createLink = mxUtils.bind(this, function(label, fn, padding, underline)
	{
		var link = document.createElement('a');
		link.setAttribute('title', label);
		link.style.cursor = 'pointer';
		mxUtils.write(link,  label);
		mxEvent.addListener(link, 'click', fn);

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
		}));
	});
	
	// Adds paging for repos, branches and files
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
		
		var req = new mxXmlRequest(this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) +
			'/repository/tree?path=' + path + '&ref=' + ref + '&per_page=' + pageSize + '&page=' + page, null, 'GET');
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
					updatePathInfo(!ref);
					
					div.appendChild(createLink('../ [Up]', mxUtils.bind(this, function()
					{
						if (path == '' || path == null)
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
							(mxUtils.bind(this, function(file)
							{
								if (showFolders == (file.type == 'tree'))
								{
									var temp = listItem.cloneNode();
									temp.style.backgroundColor = (gray) ?
										((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
									gray = !gray;

									var typeImg = document.createElement('img');
									typeImg.src = IMAGE_PATH + '/' + (file.type == 'tree'? 'folder.png' : 'file.png');
									typeImg.setAttribute('align', 'absmiddle');
									typeImg.style.marginRight = '4px';
									typeImg.style.marginTop = '-4px';
									typeImg.width = 20;
									temp.appendChild(typeImg);
									
									temp.appendChild(createLink(file.name + ((file.type == 'tree') ? '/' : ''), mxUtils.bind(this, function()
									{
										if (file.type == 'tree')
										{
											path = file.path;
											selectFile();
										}
										else if (showFiles && file.type == 'blob')
										{
											this.ui.hideDialog();
											fn(org + '/' + repo + '/' + ref + '/' + file.path);
										}
									})));
									
									div.appendChild(temp);
									count++;
								}
							}))(files[i]);
						}
					});
					
					listFiles(true);
					
					if (showFiles)
					{
						listFiles(false);
					}
					
					if (count == pageSize)
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
		}), error, true);
	});

	var selectRef = mxUtils.bind(this, function(page, auto)
	{
		if (page == null)
		{
			div.innerText = '';
			page = 1;
		}
		
		var req = new mxXmlRequest(this.baseUrl + '/projects/' + encodeURIComponent(org + '/' + repo) +
			'/repository/branches?per_page=' + pageSize + '&page=' + page, null, 'GET');
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
								ref = encodeURIComponent(branch.name);
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

	dlg.okButton.setAttribute('disabled', 'disabled');
	this.ui.spinner.spin(div, mxResources.get('loading'));
	
	var selectRepo = mxUtils.bind(this, function(page)
	{
		var spinner = this.ui.spinner;
		var inFlightRequests = 0;
		this.ui.spinner.stop();
		
		var spinnerRequestStarted = function()
		{
			spinner.spin(div, mxResources.get('loading'));
			inFlightRequests += 1;
		}

		var spinnerRequestFinished = function()
		{
			inFlightRequests -= 1;
			
			if (inFlightRequests === 0)
			{
				spinner.stop();
			}
		}
		
		if (page == null)
		{
			div.innerText = '';
			page = 1;
		}
		
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
			if (inFlightRequests === 0)
			{
				selectRepo(page + 1);
			}
		});
		
		mxEvent.addListener(nextPageDiv, 'click', nextPage);

		var listGroups = mxUtils.bind(this, function(callback)
		{
			spinnerRequestStarted();
			var req = new mxXmlRequest(this.baseUrl + '/groups?per_page=100', null, 'GET');
			
			this.executeRequest(req, mxUtils.bind(this, function(req)
			{
				this.ui.tryAndHandle(mxUtils.bind(this, function()
				{
					callback(JSON.parse(req.getText()));
					spinnerRequestFinished();
				}));
			}), error);
		});

		var listProjects = mxUtils.bind(this, function(group, callback)
		{
			spinnerRequestStarted();
			var req = new mxXmlRequest(this.baseUrl + '/groups/' + group.id + '/projects?per_page=100', null, 'GET');
			
			this.executeRequest(req, mxUtils.bind(this, function(req)
			{
				this.ui.tryAndHandle(mxUtils.bind(this, function()
				{
					callback(group, JSON.parse(req.getText()));
					spinnerRequestFinished();
				}));
			}), error);
		});
		
		listGroups(mxUtils.bind(this, function(groups)
		{
			if (this.user == null)
			{
				mxUtils.write(div, mxResources.get('loggedOut'));
			}
			else
			{
				spinnerRequestStarted();
				var req = new mxXmlRequest(this.baseUrl + '/users/' + this.user.id + '/projects?per_page=' +
					pageSize + '&page=' + page, null, 'GET');
				
				this.executeRequest(req, mxUtils.bind(this, function(req)
				{
					var repos = JSON.parse(req.getText());

					if ((repos == null || repos.length == 0) && (groups == null || groups.length == 0))
					{
						spinnerRequestFinished();
						mxUtils.br(div);
						mxUtils.write(div, mxResources.get('repositoryNotFound'));
					}
					else
					{
						if (page == 1)
						{
							div.appendChild(createLink(mxResources.get('enterValue') + '...', mxUtils.bind(this, function()
							{
								if (inFlightRequests === 0)
								{
									var dlg = new FilenameDialog(this.ui, 'org/repo/ref', mxResources.get('ok'), mxUtils.bind(this, function(value)
									{
										if (value != null)
										{
											var tokens = value.split('/');
											
											if (tokens.length > 1)
											{
												org = tokens[0];
												repo = tokens[1];
												path = null;
												ref = null;
												
												if (tokens.length > 2)
												{
													ref = encodeURIComponent(tokens.slice(2, tokens.length).join('/'));
													selectFile();
												}
												else
												{
													selectRef(null, true);
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
								}
							})));
							
							mxUtils.br(div);
							mxUtils.br(div);
						}
						
						var gray = true;
						
						for (var i = 0; i < repos.length; i++)
						{
							(mxUtils.bind(this, function(repository)
							{
								var temp = listItem.cloneNode();
								temp.style.backgroundColor = (gray) ?
									((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
								gray = !gray;
								
								temp.appendChild(createLink(repository.name_with_namespace, mxUtils.bind(this, function()
								{
									if (inFlightRequests === 0)
									{
										org = repository.owner.username;
										repo = repository.path;
										path = '';
										
										selectRef(null, true);
									}
								})));
								
								div.appendChild(temp);
							}))(repos[i]);
						}

						for (var i = 0; i < groups.length; i++)
						{
							spinnerRequestStarted();
							
							listProjects(groups[i], (mxUtils.bind(this, function(group, projects)
							{
								spinnerRequestFinished();
								
								for (var j = 0; j < projects.length; j++)
								{
									var temp = listItem.cloneNode();
									temp.style.backgroundColor = (gray) ?
										((Editor.isDarkMode()) ? '#000000' : '#eeeeee') : '';
									gray = !gray;
									
									(mxUtils.bind(this, function(project)
									{
										temp.appendChild(createLink(project.name_with_namespace, mxUtils.bind(this, function()
										{
											if (inFlightRequests === 0)
											{
												org = group.full_path;
												repo = project.path;
												path = '';
			
												selectRef(null, true);
											}
										})));
		
										div.appendChild(temp);
									}))(projects[j]);
								}
							})));
						}
						
						spinnerRequestFinished();
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
				}), error);
			}
		}));
	});

	if (!_token)
	{
		this.authenticate(mxUtils.bind(this, function()
		{
			this.updateUser(function()
			{
				selectRepo();
			}, error, true);
		}), error);
	}
	else if (!this.user)
	{
		this.updateUser(function()
		{
			selectRepo();
		}, error, true);
	}
	else
	{
		selectRepo();
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
GitLabClient.prototype.logout = function()
{
	//Send to server to clear refresh token cookie
	this.ui.editor.loadUrl(this.redirectUri + '?doLogout=1&state=' + encodeURIComponent('cId=' + this.clientId + '&domain=' + window.location.host));
	this.clearPersistentToken();
	this.setUser(null);
	_token = null;
	this.setToken(null);
};

})();