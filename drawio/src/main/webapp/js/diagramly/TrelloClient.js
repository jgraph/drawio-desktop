/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
TrelloClient = function(editorUi)
{
	DrawioClient.call(this, editorUi, 'tauth');
	Trello.setKey(this.key);
};

// Extends DrawioClient
mxUtils.extend(TrelloClient, DrawioClient);

TrelloClient.prototype.key = (window.location.hostname == 'test.draw.io') ?
	'e89d109082298ce91f6576f82f458551' : 'e89d109082298ce91f6576f82f458551';

TrelloClient.prototype.baseUrl = 'https://api.trello.com/1/';

TrelloClient.prototype.SEPARATOR = '|$|';

/**
 * Maximum attachment size of Trello.
 */
TrelloClient.prototype.maxFileSize = 10000000 /*10MB*/;

/**
 * Default extension for new files.
 */
TrelloClient.prototype.extension = '.xml'; //TODO export to png

/**
 * Authorizes the client, used with methods that can be called without a user click and popup blockers will interfere
 * Show the AuthDialog to work around the popup blockers if the file is opened directly
 */
TrelloClient.prototype.authenticate = function(fn, error, force)
{
	if (force)
	{
		this.logout();
	}
	
	var callback = mxUtils.bind(this, function(remember, success)
	{
		Trello.authorize(
		{
			type: 'popup',
			name: 'draw.io',
			scope:
			{
				read: 'true',
			    write: 'true'
			},
			expiration: remember ? 'never' : '1hour',
			success: function()
			{
				// backup from the token since viewer removes it for some reason
				localStorage.setItem('drawio_trello_token', localStorage['trello_token']);

				if (success != null)
				{
					success();
				}
				
				fn();
			},
			error: function()
			{
				if (success != null)
				{
					success();
				}
				
				if (error != null)
				{
					error(mxResources.get('loggedOut'));
				}
			}
		});
	});
	
	if (this.isAuthorized()) 
	{
		callback(true);
	}
	else
	{
		this.ui.showAuthDialog(this, true, callback);
	}
}

/**
 * 
 */
TrelloClient.prototype.getLibrary = function(id, success, error)
{
	this.getFile(id, success, error, false, true);
};

/**
 * 
 */
TrelloClient.prototype.getFile = function(id, success, error, denyConvert, asLibrary)
{
	//In getFile only, we 
	asLibrary = (asLibrary != null) ? asLibrary : false;

	var callback = mxUtils.bind(this, function()
	{
		var ids = id.split(this.SEPARATOR);
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, retry: callback})
		}), this.ui.timeout);
		
		Trello.cards.get(ids[0] + '/attachments/' + ids[1], mxUtils.bind(this, function(meta) 
		{ 
			window.clearTimeout(timeoutThread);
	    	
		    if (acceptResponse)
		    {
				var binary = /\.png$/i.test(meta.name);
				var headers = {
					Authorization: 'OAuth oauth_consumer_key="' + Trello.key() + '", oauth_token="' + Trello.token() + '"'
				};
				
				// TODO Trello doesn't allow CORS requests to load attachments. Confirm that
				// and make sure that only a proxy technique can work!
				// Handles .vsdx, Gliffy and PNG+XML files by creating a temporary file
				if (/\.v(dx|sdx?)$/i.test(meta.name) || /\.gliffy$/i.test(meta.name) ||
					(!this.ui.useCanvasForExport && binary))
				{
					this.ui.convertFile(PROXY_URL + '?url=' + encodeURIComponent(meta.url), meta.name, meta.mimeType,
						this.extension, success, error, null, headers);
				}
				else
				{
					acceptResponse = true;
					
					timeoutThread = window.setTimeout(mxUtils.bind(this, function()
					{
						acceptResponse = false;
						error({code: App.ERROR_TIMEOUT})
					}), this.ui.timeout);
					
					this.ui.editor.loadUrl(PROXY_URL + '?url=' + encodeURIComponent(meta.url), mxUtils.bind(this, function(data)
					{
						window.clearTimeout(timeoutThread);
				    	
					    if (acceptResponse)
					   	{
					    	//keep our id which includes the cardId
					    	meta.compoundId = id;
					    		
							var index = (binary) ? data.lastIndexOf(',') : -1;
	
							if (index > 0)
							{
								var xml = this.ui.extractGraphModelFromPng(data);
								
								if (xml != null && xml.length > 0)
								{
									data = xml;
								}
								else
								{
									// TODO: Import PNG
								}
							}
				    		
							if (asLibrary)
							{
								success(new TrelloLibrary(this.ui, data, meta));
							}
							else
							{
								success(new TrelloFile(this.ui, data, meta));
							}
					    }
			    	}), mxUtils.bind(this, function(err, req)
					{
						window.clearTimeout(timeoutThread);
					    	
				    	if (acceptResponse)
				    	{
				    		if (req.status == 401)
				    		{
				    			this.authenticate(callback, error, true);
				    		}
				    		else
				    		{
				    			error();
				    		}
				    	}
					}), binary || (meta.mimeType != null &&
						meta.mimeType.substring(0, 6) == 'image/'), null, null, null, headers);
				}
		    }
		}), mxUtils.bind(this, function(err)
		{
			window.clearTimeout(timeoutThread);
	    	
		    	if (acceptResponse)
		    	{
		    		if (err != null && err.status == 401)
		    		{
		    			this.authenticate(callback, error, true);
		    		}
		    		else
		    		{
		    			error();
		    		}
		    	}
		}));
	});
	
	this.authenticate(callback, error);
};

/**
 * 
 */
TrelloClient.prototype.insertLibrary = function(filename, data, success, error, cardId)
{
	this.insertFile(filename, data, success, error, true, cardId);
};

/**
 * 
 */
TrelloClient.prototype.insertFile = function(filename, data, success, error, asLibrary, cardId)
{
	asLibrary = (asLibrary != null) ? asLibrary : false;
	
	var callback = mxUtils.bind(this, function()
	{
		var fn = mxUtils.bind(this, function(fileData)
		{
			this.writeFile(filename, fileData, cardId, mxUtils.bind(this, function(meta)
			{
				if (asLibrary)
				{
					success(new TrelloLibrary(this.ui, data, meta));
				}
				else
				{
					success(new TrelloFile(this.ui, data, meta));
				}
			}), error);
		});
						
		if (this.ui.useCanvasForExport && /(\.png)$/i.test(filename))
		{
			this.ui.getEmbeddedPng(mxUtils.bind(this, function(pngData)
			{
				fn(this.ui.base64ToBlob(pngData, 'image/png'));
			}), error, data);
		}
		else
		{
			fn(data);
		}
	});
	
	this.authenticate(callback, error);
};

/**
 * 
 */
TrelloClient.prototype.saveFile = function(file, success, error)
{
	// write the file first (with the same name), then delete the old file
	// so that nothing is lost if something goes wrong with deleting
	var ids = file.meta.compoundId.split(this.SEPARATOR);

	var fn = mxUtils.bind(this, function(data)
	{
		this.writeFile(file.meta.name, data, ids[0], function(meta)
		{
			Trello.del('cards/' + ids[0] + '/attachments/' + ids[1], mxUtils.bind(this, function()
			{
				success(meta);
			}), mxUtils.bind(this, function(err)
			{
				if (err != null && err.status == 401)
	    		{
					// KNOWN: Does not wait for popup to close for callback
	    			this.authenticate(callback, error, true);
	    		}
	    		else
	    		{
	    			error();
	    		}
			}));
		}, error);
	});
	
	var callback = mxUtils.bind(this, function()
	{
		if (this.ui.useCanvasForExport && /(\.png)$/i.test(file.meta.name))
		{
			this.ui.getEmbeddedPng(mxUtils.bind(this, function(data)
			{
				fn(this.ui.base64ToBlob(data, 'image/png'));
			}), error, (this.ui.getCurrentFile() != file) ? file.getData() : null);
		}
		else
		{
			fn(file.getData());
		}
	});
	
	this.authenticate(callback, error);
};

/**
 * 
 */
TrelloClient.prototype.writeFile = function(filename, data, cardId, success, error)
{
	if (filename != null && data != null)
	{
		if (data.length >= this.maxFileSize)
		{
			error({message: mxResources.get('drawingTooLarge') + ' (' +
				this.ui.formatFileSize(data.length) + ' / 10 MB)'});
			
			return;
		}
		
		var fn = mxUtils.bind(this, function()
		{
		  var acceptResponse = true;
			
		  var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		  {
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, retry: fn});
		  }), this.ui.timeout);
			
		  var formData = new FormData();
		  formData.append('key', Trello.key());
		  formData.append('token', Trello.token());
		  formData.append('file', typeof data === 'string' ? new Blob([data]) : data, filename);
		  formData.append('name', filename);

		  var request = new XMLHttpRequest();
		  request.responseType = 'json';
		  
		  request.onreadystatechange = mxUtils.bind(this, function() 
		  {
		    if (request.readyState === 4)
		    {
		    	window.clearTimeout(timeoutThread);
		    	
		    	if (acceptResponse)
	    		{
		    		if (request.status == 200)
	    			{
		    			var fileMeta = request.response;
		    			fileMeta.compoundId = cardId + this.SEPARATOR + fileMeta.id
		    			success(fileMeta);
	    			}
		    		else if (request.status == 401)
		    		{
		    			this.authenticate(fn, error, true);
		    		}
	    			else
    				{
		    			error();
    				}
	    		}
		    }
		  });
		  
		  request.open('POST', this.baseUrl + 'cards/' + cardId + '/attachments');
		  request.send(formData);
		});
		
		this.authenticate(fn, error);
	}
	else
	{
		error({message: mxResources.get('unknownError')});
	}
};

/**
 * Checks if the client is authorized and calls the next step.
 */
TrelloClient.prototype.pickLibrary = function(fn)
{
	this.pickFile(fn);
};

/**
 * 
 */
TrelloClient.prototype.pickFolder = function(fn)
{
	this.authenticate(mxUtils.bind(this, function()
	{
	  	// show file select
		this.showTrelloDialog(false, fn);
	}), mxUtils.bind(this, function(e)
	{
		this.ui.showError(mxResources.get('error'), e);
	}));
};

/**
 * Checks if the client is authorized and calls the next step.
 */
TrelloClient.prototype.pickFile = function(fn, returnObject)
{
	fn = (fn != null) ? fn : mxUtils.bind(this, function(id)
	{
		this.ui.loadFile('T' + encodeURIComponent(id));
	});

	this.authenticate(mxUtils.bind(this, function()
	{
	  	// show file select
		this.showTrelloDialog(true, fn);
	}), mxUtils.bind(this, function(e)
	{
		this.ui.showError(mxResources.get('error'), e, mxResources.get('ok'));
	}));
};


/**
 * 
 */
TrelloClient.prototype.showTrelloDialog = function(showFiles, fn)
{
	var cardId = null;
	var filter = '@me';
	var linkCounter = 0;
	
	var content = document.createElement('div');
	content.style.whiteSpace = 'nowrap';
	content.style.overflow = 'hidden';
	content.style.height = '224px';

	var hd = document.createElement('h3');
	mxUtils.write(hd, showFiles? mxResources.get('selectFile') : mxResources.get('selectCard'));
	hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
	content.appendChild(hd);

	var div = document.createElement('div');
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = 'auto';
	div.style.height = '194px';
	content.appendChild(div);

	var dlg = new CustomDialog(this.ui, content);
	this.ui.showDialog(dlg.container, 340, 290, true, true);
	
	dlg.okButton.parentNode.removeChild(dlg.okButton);
	
	var createLink = mxUtils.bind(this, function(label, fn, preview)
	{
		linkCounter++;
		var div = document.createElement('div');
		div.style = 'width:100%;text-overflow:ellipsis;overflow:hidden;vertical-align:middle;' +
			'padding:2px 0 2px 0;background:' + (linkCounter % 2 == 0?
			((Editor.isDarkMode()) ? '#000' : '#eee') :
			((Editor.isDarkMode()) ? '' : '#fff'));
		var link = document.createElement('a');
		link.style.cursor = 'pointer';
		
		if (preview != null)
		{
			var img = document.createElement('img');
			img.src = preview.url;
			img.width = preview.width;
			img.height= preview.height;
			img.style= "border: 1px solid black;margin:5px;vertical-align:middle"
			link.appendChild(img);
		}
		
		mxUtils.write(link,  label);
		mxEvent.addListener(link, 'click', fn);
		
		div.appendChild(link);
		
		return div;
	});
	
	var error = mxUtils.bind(this, function(err)
	{
		this.ui.handleError(err, null, mxUtils.bind(this, function()
		{
			this.ui.spinner.stop();
			this.ui.hideDialog();
		}));
	});

	var selectAtt = mxUtils.bind(this, function()
	{
		linkCounter = 0;
		div.innerText = '';
		this.ui.spinner.spin(div, mxResources.get('loading'));
		
		var callback = mxUtils.bind(this, function()
		{
			Trello.cards.get(cardId + '/attachments', {fields: 'id,name,previews'}, mxUtils.bind(this, function(data)
			{
				this.ui.spinner.stop();
				var files = data;
				div.appendChild(createLink('../ [Up]', mxUtils.bind(this, function()
				{
					selectCard();
				})));
				mxUtils.br(div);
	
				if (files == null || files.length == 0)
				{
					mxUtils.write(div, mxResources.get('noFiles'));
				}
				else
				{
					var listFiles = mxUtils.bind(this, function()
					{
						for (var i = 0; i < files.length; i++)
						{
							(mxUtils.bind(this, function(file)
							{
								div.appendChild(createLink(file.name, mxUtils.bind(this, function()
								{
									this.ui.hideDialog();
									fn(cardId + this.SEPARATOR + file.id);
								}), file.previews != null? file.previews[0] : null));
							}))(files[i]);
						}
					});
					
					listFiles();
				}
			}),
			mxUtils.bind(this, function(req)
			{
	    		if (req.status == 401)
	    		{
	    			this.authenticate(callback, error, true);
	    		}
	    		else if (error != null)
	    		{
	    			error(req);
	    		}	
			}));
		});
		
		callback();
	});
	
	// Adds paging for cards (files limited to 1000 by API)
	var pageSize = 100;
	var nextPageDiv = null;
	var scrollFn = null;

	var selectCard = mxUtils.bind(this, function(page)
	{
		if (page == null)
		{
			linkCounter = 0;
			div.innerText = '';
			page = 1;
		}
		
		this.ui.spinner.spin(div, mxResources.get('loading'));
		
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
			mxEvent.removeListener(div, 'scroll', scrollFn);
			selectCard(page + 1);
		});
		
		mxEvent.addListener(nextPageDiv, 'click', nextPage);
		
		var callback = mxUtils.bind(this, function()
		{
			Trello.get('search', {
				'query': (mxUtils.trim(filter) == '') ? 'is:open' : filter,
				'cards_limit': pageSize,
				'cards_page': page-1
			},
			mxUtils.bind(this, function(data)
			{
				this.ui.spinner.stop();
				var cards = (data != null) ? data.cards : null;
				
				if (cards == null || cards.length == 0)
				{
					mxUtils.write(div, mxResources.get('noFiles'));
				}
				else
				{
					if (page == 1)
					{
						div.appendChild(createLink(mxResources.get('filterCards') + '...', mxUtils.bind(this, function()
						{
							var dlg = new FilenameDialog(this.ui, filter, mxResources.get('ok'), mxUtils.bind(this, function(value)
							{
								if (value != null)
								{
									filter = value;
									selectCard();
								}
							}), mxResources.get('filterCards'), null, null, 'http://help.trello.com/article/808-searching-for-cards-all-boards');
							this.ui.showDialog(dlg.container, 300, 80, true, false);
							dlg.init();
						})));
						
						mxUtils.br(div);
					}
					
					for (var i = 0; i < cards.length; i++)
					{
						(mxUtils.bind(this, function(card)
						{
							div.appendChild(createLink(card.name, mxUtils.bind(this, function()
							{
								if (showFiles)
								{
									cardId = card.id;
									selectAtt();
								}
								else
								{
									this.ui.hideDialog();
									fn(card.id);
								}
							})));
						}))(cards[i]);
					}
	
					if (cards.length == pageSize)
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
			}),
			mxUtils.bind(this, function(req)
			{
	    		if (req.status == 401)
	    		{
	    			this.authenticate(callback, error, true);
	    		}
	    		else if (error != null)
	    		{
	    			error({message: req.responseText});
	    		}	
			}));
		});
		
		callback();
	});
	
	selectCard();
};

/**
 * Checks if the client is authorized
 */
TrelloClient.prototype.isAuthorized = function()
{
	//TODO this may break if Trello client.js is changed
	try
	{
		var token = localStorage['trello_token']; //Trello.authorized(); doesn't work unless authorize is called first

		if (token == null)
		{
			token = localStorage['drawio_trello_token'];

			// Restores token from backup
			if (token != null)
			{
				localStorage.setItem('trello_token', token);
			}
			
		}

		return token != null;
	}
	catch (e)
	{
		// ignores access denied
	}
	
	return false;
};


/**
 * Logout and deauthorize the user. 
 */
TrelloClient.prototype.logout = function()
{
	localStorage.removeItem('drawio_trello_token');
	Trello.deauthorize();
};
