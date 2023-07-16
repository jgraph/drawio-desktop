function mxODPicker(container, previewFn, getODFilesList, getODFileInfo, getRecentList, addToRecent, pickedFileCallback,
	errorFn, foldersOnly, backFn, withSubmitBtn, withThumbnail, initFolderPath, acceptAllFiles)
{
	var previewHtml = '';
	
	if (previewFn == null)
	{
		previewFn = renderFile;
		previewHtml = '<div style="text-align: center;" class="odPreview"></div>';
	}
	
	if (getRecentList == null)
	{
		getRecentList = function()
		{
			var list = null;
			
			try
			{
				list = JSON.parse(localStorage.getItem('mxODPickerRecentList'));	
			}
			catch(e){}
			
			return list;
		}
	}
	
	if (addToRecent == null)
	{
		addToRecent = function(file)
		{
			if (file == null)
			{
				return;
			}
			
			var recentList = getRecentList() || {};
    	
    		delete file['@microsoft.graph.downloadUrl'];
    		recentList[file.id] = file;
			localStorage.setItem('mxODPickerRecentList', JSON.stringify(recentList));
		}
	}
	
	function _$(selector, elem)
	{
		elem = elem || document;
		return elem.querySelector(selector);
	};
	
	function _$$(selector, elem)
	{
		elem = elem || document;
		return elem.querySelectorAll(selector);
	};
	
	var html = 
			'<div class="odCatsList">' +
				'<div class="odCatsListLbl">OneDrive</div>' + 
				'<div id="odFiles" class="odCatListTitle odCatSelected">' + mxUtils.htmlEntities(mxResources.get('files')) + '</div>' +
				'<div id="odRecent" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('recent')) + '</div>' +
				'<div id="odShared" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('shared')) + '</div>' +
				'<div id="odSharepoint" class="odCatListTitle">' + mxUtils.htmlEntities(mxResources.get('sharepoint')) + '</div>' +
			'</div>' +
			'<div class="odFilesSec">' +
				'<div class="searchBar" style="display:none"><input type="search" id="odSearchBox" placeholder="' + mxUtils.htmlEntities(mxResources.get('search')) + '"></div>' +
				'<div class="odFilesBreadcrumb"></div>' +
				'<div id="refreshOD" class="odRefreshButton">' +
					'<img class="geAdaptiveAsset" src="/images/update32.png" width="16" height="16" title="' + mxUtils.htmlEntities(mxResources.get('refresh')) + 'Refresh" border="0"/>' +
				'</div>' +
				'<div class="odFilesList"></div>' +
			'</div>' +
			previewHtml +
			(backFn? '<div id="odBackBtn" class="odLinkBtn">&lt; ' + mxUtils.htmlEntities(mxResources.get('back')) + '</div>' : '') +
			(withSubmitBtn? '<button id="odSubmitBtn" class="odSubmitBtn">' + mxUtils.htmlEntities(mxResources.get(foldersOnly? 'select' : 'open')) + '</button>' : '');
	
	var isDarkMode = window.Editor != null && Editor.isDarkMode != null && Editor.isDarkMode();
	
	var css = 
		'.odCatsList *, .odFilesSec * { user-select: none; }' +
		'.odCatsList {' +
		'	box-sizing: border-box;' + 
		'	position:absolute;' + 
		'	top:0px;' + 
		'	bottom:50%;' + 
		'	width:30%;' + 
		'	border: 1px solid #CCCCCC;' + 
		'	border-bottom:none;' + 
		'	display: inline-block;' + 
		'	overflow-x: hidden;' + 
		'	overflow-y: auto;' + 
		'}' + 
		'.odCatsListLbl {' + 
		'	height: 17px;' + 
		'	color: #6D6D6D;' + 
		'	font-size: 14px;' + 
		'	font-weight: bold;' + 
		'	line-height: 17px;' + 
		'	margin: 10px 0 3px 5px;' + 
		'}' + 
		'.odFilesSec {' + 
		'	box-sizing: border-box;' + 
		'	position:absolute;' + 
		'	left:30%;' + 
		'	top:0px;' + 
		'	bottom:50%;' + 
		'	width: 70%;' + 
		'	border: 1px solid #CCCCCC;' + 
		'	border-left:none;' + 
		'	border-bottom:none;' + 
		'	display: inline-block;' + 
		'	overflow: hidden;' + 
		'}' + 
		'.odFilesBreadcrumb {' + 
		'	box-sizing: border-box;' + 
		'	position:absolute;' + 
		'	min-height: 32px;' + 
		'	left:0px;' + 
		'	right:20px;' + 
		'	text-overflow:ellipsis;' + 
		'	overflow:hidden;' + 
		'	font-size: 13px;' + 
		'	color: #6D6D6D;' + 
		'	padding: 5px;' + 
		'}' + 
		'.odRefreshButton {' + 
		'	box-sizing: border-box;' + 
		'	position:absolute;' + 
		'	right:0px;' + 
		'	top:0px;' + 
		'	padding: 4px;' + 
		'	margin: 1px;' + 
		'	height:24px;' + 
		'	cursor:default;' + 
		'}' + 
		'.odRefreshButton>img {' + 
		'	opacity:0.5;' + 
		'}' + 
		'.odRefreshButton:hover {' + 
		'	background-color:#ddd;' + 
		'	border-radius:50%;' + 
		'}' + 
		// '.odRefreshButton:hover {' + 
		// '	background-color:#ddd;' + 
		// '	border-radius:50%;' + 
		// '}' + 
		'.odRefreshButton:active {' + 
		'	opacity:0.7;' + 
		'}' + 
		'.odFilesList {' + 
		'	box-sizing: border-box;' + 
		'	position:absolute;' + 
		'	top:32px;' + 
		'	bottom:0px;' + 
		'	width: 100%;' + 
		'	overflow-x: hidden;' + 
		'	overflow-y: auto;' + 
		'}' + 
		'.odFileImg {' + 
		'	width: 24px;' + 
		'	padding-left: 5px;' + 
		'	padding-right: 5px;' + 
		'}' + 
		'.odFileTitle {' + 
		'	cursor: default;' + 
		'	font-weight: normal;' + 
		'	color: #666666 !important;' +
		'	width: calc(100% - 20px);' +
	    '	white-space: nowrap;' +
	    '	overflow: hidden;' +
    	'	text-overflow: ellipsis;' +
		'}' + 
		'.odFileListGrid {' + 
		'	width: 100%;' + 
		'	white-space: nowrap;' + 
		'	font-size: 13px;' + 
		'    box-sizing: border-box;' + 
		'    border-spacing: 0;' + 
		'}' + 
		'.odOddRow {' + 
		(isDarkMode ? '' : '	background-color: #eeeeee;') + 
		'}' + 
		'.odEvenRow {' + 
		(isDarkMode ? '' : '	background-color: #FFFFFF;') + 
		'}' + 
		'.odRowSelected {' + 
		'	background-color: #cadfff;' + 
		'}' + 
		'.odCatListTitle {' + 
		'	box-sizing: border-box;' + 
		'	height: 17px;' + 
		'	cursor: default;' + 
		'	color: #666666;' + 
		'	font-size: 14px;' + 
		'	line-height: 17px;' + 
		'	margin: 5px 0 5px 0px;' + 
		'    padding-left: 10px;' + 
		'}' + 
		'.odCatSelected {' + 
		'	font-weight: bold;' + 
		'	background-color: #cadfff;' + 
		'}' + 
		'.odEmptyFolder {' + 
		'	height: 17px;' + 
		'	color: #6D6D6D;' + 
		'	font-size: 14px;' + 
		'	font-weight: bold;' + 
		'	line-height: 17px;' + 
		'	margin: 10px 0 3px 5px;' + 
		'	width: 100%;' + 
		'    text-align: center;' + 
		'}' + 
		'.odBCFolder {' + 
		'	cursor: pointer;' + 
		'	color: #0432ff;' + 
		'}' +
		'.odPreviewStatus {' + 
		'	position:absolute;' + 
		'	text-align:center;' + 
		'	width:100%;' + 
		'	top:50%;' + 
		'	transform: translateY(-50%);' + 
		'	font-size:13px;' + 
		'	opacity:0.5;' + 
		'}' + 
		'.odPreview {' + 
		'    position:absolute;' + 
		'	 overflow:hidden;' + 
		'	 border: 1px solid #CCCCCC;' + 
		'    bottom:0px;' + 
		'    top: 50%;' + 
		'    left:0px;' + 
		'    right:0px;' + 
		'}' +
		'.odLinkBtn {' +
		'   position: absolute;' +
		'	font-size: 12px;' +
		'	cursor: pointer;' +
		'	color: #6D6D6D;' +
		'	left: 5px;' +
		'	bottom: 3px;' +
		'}' +
		'.odSubmitBtn {' +
		'   position: absolute;' +
		'	color: #333;' +
		'	right: 5px;' +
		'	bottom: 5px;' +
		'}';

	var opts =
	{
		left: '50%',
		lines: 12, // The number of lines to draw
		length: 8, // The length of each line
		width: 3, // The line thickness
		radius: 5, // The radius of the inner circle
		rotate: 0, // The rotation offset
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9 // The z-index (defaults to 2000000000)
	};

	var spinner = new Spinner(opts);
	var editor = new Editor();
	var curViewer = null;
	var selectedFile = null;
	var selectedDriveId = null;
	var selectedSiteId = null;
	var requestInProgress = false;
	var breadcrumb = [];
    var lastFolderArgs = null;
	var loadingPreviewFile = null;
    
	function getDrawioFileDoc(file, success, error)
	{
		if (file['@microsoft.graph.downloadUrl'] == null)
		{
			if (file.parentReference == null)
			{
				error();
			}
			else
			{
				getODFileInfo(file.id, file.parentReference.driveId, function(completeFile)
				{
					getDrawioFileDoc(completeFile, success, error);
				}, error);
				
				return;
			}
		}
		
		var req = new XMLHttpRequest();
		//TODO find another way to disable caching (adding a parameter breaks the url)
		req.open('GET', file['@microsoft.graph.downloadUrl']);
		var isPng = file.file? (file.file.mimeType == 'image/png') : false;
		
		req.onreadystatechange = function()
		{
			if (this.readyState == 4)
			{
				if (this.status >= 200 && this.status <= 299)
				{
					try 
					{
						var cnt = req.responseText;
						
						if (isPng)
						{
							cnt = 'data:image/png;base64,' + Editor.base64Encode(cnt);
							cnt = Editor.extractGraphModelFromPng(cnt);
						}
						
						var doc = mxUtils.parseXml(cnt);

						var node = (doc.documentElement.nodeName == 'mxlibrary') ?
							doc.documentElement : Editor.extractGraphModel(doc.documentElement);

						if (node != null)
						{
							success(node.ownerDocument);
							
							return;
						}
					}
					catch(e) {} //on error and if the doc is null, the following line will call the error
				}
				
				error();
			}
		};
		
		if (isPng && req.overrideMimeType)
		{
			req.overrideMimeType('text/plain; charset=x-user-defined');
		}
		
		req.send();
	};

	function doSubmit()
	{
		function submit(img)
		{
			pickedFileCallback(selectedFile, img);	
			addToRecent(selectedFile);
		}
		
		if (withThumbnail && curViewer != null)
		{
			editor.exportToCanvas(function(canvas)
			{
				submit(EditorUi.prototype.createImageDataUri(canvas, null, 'png')); 
			}, 400, null, null, function(err)
			{
				//TODO handle errors
				console.log(err);
			}, 600, null, null, null, null, null, curViewer);
		}
		else
		{
			submit();
		}
	};
	
	function renderFile(file)
	{
		if (prevDiv == null)
		{
			return;	
		}
		
		prevDiv.style.background = 'transparent';
		prevDiv.innerText = '';
		
		function showRenderMsg(msg)
		{
			prevDiv.style.background = 'transparent';
			prevDiv.innerText = '';	

			var status = document.createElement('div');
			status.className = 'odPreviewStatus';
			mxUtils.write(status, msg);
			prevDiv.appendChild(status);
			spinner.stop();
		};
		
		if (file == null || file.folder || /\.drawiolib$/.test(file.name)) 
		{
			showRenderMsg(mxResources.get('noPreview'));
			return;
		}
		
		try
		{
			// Workaround for parentReference access
			if (file.remoteItem != null)
			{
				file = file.remoteItem;
			}

			loadingPreviewFile = file;
			spinner.spin(prevDiv);
		
			getDrawioFileDoc(file, function(doc)
			{
				spinner.stop();

				if (loadingPreviewFile != file)
				{
					return;
				}
				else if (doc.documentElement.nodeName == 'mxlibrary')
				{
					showRenderMsg(mxResources.get('noPreview'));
				}
				else
				{
					var diagrams = doc.getElementsByTagName('diagram');
					curViewer = AspectDialog.prototype.createViewer(prevDiv,
							diagrams.length == 0? doc.documentElement : diagrams[0],
							null, 'transparent');
				}
			}, 
			function() //If the file is not a draw.io diagram
			{
				selectedFile = null;
				showRenderMsg(mxResources.get('notADiagramFile'));
			});
		}
		catch (e)
		{
			selectedFile = null;
			showRenderMsg(mxResources.get('notADiagramFile'));
		}
	};

	
	function renderBreadcrumb() 
	{
		var bcDiv = _$('.odFilesBreadcrumb');
		
		if (bcDiv == null) return;
		
		bcDiv.innerText = '';
		
		for (var i = 0; i < breadcrumb.length - 1; i++)
		{
			var folder = document.createElement('span');
			folder.className = 'odBCFolder';
			folder.innerHTML = mxUtils.htmlEntities(breadcrumb[i].name || mxResources.get('home'));
			bcDiv.appendChild(folder);
			
			(function(bcItem, index)
			{
				folder.addEventListener('click', function()
				{
					previewFn(null);
					breadcrumb = breadcrumb.slice(0, index);
					fillFolderFiles(bcItem.driveId, bcItem.folderId, bcItem.siteId, bcItem.name);
				});
			})(breadcrumb[i], i);
			
			var sep = document.createElement('span');
			sep.innerHTML = ' &gt; ';
			bcDiv.appendChild(sep);
		}
		
		if (breadcrumb[breadcrumb.length - 1] != null)
		{
			var curr = document.createElement('span');
			curr.innerHTML = mxUtils.htmlEntities((breadcrumb.length == 1) ?
					mxResources.get(foldersOnly ? 'selectFolder' : 'officeSelDiag') :
						(breadcrumb[breadcrumb.length - 1].name || mxResources.get('home')));
			bcDiv.appendChild(curr);
		}
	};
	
	function openFile()
	{
		if (selectedFile == null || requestInProgress) return;
		
		if (selectedDriveId == 'sharepoint')
		{
			fillFolderFiles('site', null, selectedFile.id, selectedFile.displayName);
		}
		else if (selectedDriveId == 'site')
		{
			fillFolderFiles('subsite', null, selectedFile.id, selectedFile.name);
		}
		else
		{
			var isFolder = selectedFile.folder;
			selectedFile = selectedFile.remoteItem? selectedFile.remoteItem : selectedFile; //handle remote items which is accessed indirectly
			var folderDI = (selectedFile.parentReference? selectedFile.parentReference.driveId : null) || selectedDriveId;
			var id = selectedFile.id;
			
			if (isFolder) 
			{
				fillFolderFiles(folderDI, id, null, selectedFile.name);
			}
			else
			{
				doSubmit();				
			}
		}
	};
	
	function fillFolderFiles(driveId, folderId, siteId, folderName, searchTxt)
	{
		if (requestInProgress) return;
		
        _$('.odCatsList').style.display = 'block';
        _$('.odFilesSec').style.display = 'block';
       // _$('#signOutLnk').style.display = '';

		if (prevDiv != null)
		{
			prevDiv.innerText = '';
			prevDiv.style.top = '50%';
		}

		requestInProgress = true;
		var acceptRequest = true;
		var isSharepointSites = 0;
		lastFolderArgs = arguments;
	
		function renderList(potentialDrawioFiles)
		{
			spinner.stop();
			
			var grid = document.createElement('table');
			grid.className = 'odFileListGrid';
			var currentItem = null;
			var count = 0;
			
			//TODO support paging
			for (var i = 0; potentialDrawioFiles!= null && i < potentialDrawioFiles.length; i++)
			{
				var item = potentialDrawioFiles[i];
				
				if (isSharepointSites == 1 && item.webUrl && !(item.webUrl.indexOf('sharepoint.com/sites/') > 0 || item.webUrl.indexOf('sharepoint.com/') < 0))
				{
					continue;
				}
				
				var title = item.displayName || item.name;
				var tooltip = mxUtils.htmlEntities(item.description || title);
						
				if (isSharepointSites)
				{
					item.folder = isSharepointSites == 2? {isRoot: true} : true;
				}
				
				var isFolder = item.folder !=  null;
				
				if (foldersOnly && !isFolder)
				{
					continue;
				}
				
				var row = document.createElement('tr');
				row.className = (count++) % 2? 'odOddRow' : 'odEvenRow';
				var td = document.createElement('td');
				td.style.width = '36px';
				var typeImg = document.createElement('img');
				typeImg.src = '/images/'  + (isFolder? 'folder.png' : 'file.png');
				typeImg.className = 'odFileImg';
				td.appendChild(typeImg);
				
				row.appendChild(td);
				td = document.createElement('td');
				var titleDiv = document.createElement('div');
				titleDiv.className = "odFileTitle";
				titleDiv.innerHTML = mxUtils.htmlEntities(title);
				titleDiv.setAttribute('title', tooltip);
				td.appendChild(titleDiv);
				row.appendChild(td);
				grid.appendChild(row);
				
				if (currentItem == null)
				{
					currentItem = row;
					currentItem.className += ' odRowSelected';
					selectedFile = item;
					selectedDriveId = driveId;
					
					if (!acceptAllFiles)
					{
						previewFn(selectedFile);
					}
				}
				
				(function(item2, row2)
				{
					row.addEventListener('dblclick', openFile);
					
					row.addEventListener('click', function()
					{
						if (currentItem != row2)
						{
							currentItem.className = currentItem.className.replace('odRowSelected', '');
							currentItem = row2;
							currentItem.className += ' odRowSelected';
							selectedFile = item2;
							selectedDriveId = driveId;
							
							if (!acceptAllFiles)
							{
								previewFn(selectedFile);
							}
						}
					});
				})(item, row);
			}
			
			if (count == 0)
			{
				var emptyMsg = document.createElement('div');
				emptyMsg.className = 'odEmptyFolder';
				emptyMsg.innerHTML = mxUtils.htmlEntities(mxResources.get('folderEmpty', null, 'Folder is empty!'));
				filesList.appendChild(emptyMsg);
			}
			else
			{
				filesList.appendChild(grid);
			}

			renderBreadcrumb();
			requestInProgress = false;
		};
		
		var timeoutThread = setTimeout(function()
		{
			acceptRequest = false;
			requestInProgress = false;
			spinner.stop();
			errorFn(mxResources.get('timeout'));
		}, 20000); //20 sec timeout
		
		var filesList = _$('.odFilesList');
        filesList.innerText = '';
        spinner.spin(filesList);
        
        var url;
        
        switch(driveId)
        {
        	case 'recent':
        		breadcrumb = [{name: mxResources.get('recent', null, 'Recent'), driveId: driveId}];
        		var recentList = getRecentList() || {};
        		var list = [];
        		
        		for (var id in recentList)
    			{
        			list.push(recentList[id]);
    			}
        		
        		clearTimeout(timeoutThread);
        		renderList(list);
        		return;
        	case 'shared':
        		url = '/me/drive/sharedWithMe';
        		breadcrumb = [{name: mxResources.get('sharedWithMe', null, 'Shared With Me'), driveId: driveId}];
        		break;
        	case 'sharepoint':
        		url = '/sites?search=';
        		breadcrumb = [{name: mxResources.get('sharepointSites', null, 'Sharepoint Sites'), driveId: driveId}];
        		isSharepointSites = 1;
        		break;
        	case 'site':
        		breadcrumb.push({name: folderName, driveId: driveId, folderId: folderId, siteId: siteId});
        		url = '/sites/' + siteId + '/drives';
        		isSharepointSites = 2;
        		break;
        	case 'subsite':
        		breadcrumb.push({name: folderName, driveId: driveId, folderId: folderId, siteId: siteId});
        		url = '/drives/' + siteId + (folderId? '/items/' + folderId : '/root') + '/children';
        		break;
        	case 'search': //TODO search doesn't return any results, find out why then remove display: none from the searchBox
        		driveId = selectedDriveId;
        		breadcrumb = [{driveId: driveId, name: mxResources.get('back', null, 'Back')}];
        		searchTxt = encodeURIComponent(searchTxt.replace(/\'/g, '\\\''));
        		url = selectedSiteId? '/sites/' + selectedSiteId + '/drive/root/search(q=\'' + searchTxt + '\')' : (driveId? '/drives/' + driveId + '/root/search(q=\'' + searchTxt + '\')' : '/me/drive/root/search(q=\'' + searchTxt + '\')');
        		break;
        	default:
        		if (folderId == null)
    			{
        			breadcrumb = [{driveId: driveId}];
    			}
        		else
        		{
        			breadcrumb.push({name: folderName, driveId: driveId, folderId: folderId});
        		}
        		
        		url = (driveId?  '/drives/' + driveId : '/me/drive') + (folderId? '/items/' + folderId : '/root') + '/children';
        }
        
        if (!isSharepointSites)
        {
        	url += (url.indexOf('?') > 0 ? '&' : '?') + 'select=id,name,description,parentReference,file,createdBy,lastModifiedBy,lastModifiedDateTime,size,folder,remoteItem,@microsoft.graph.downloadUrl';
        }
        
		var potentialDrawioFiles = [];

		function getChunk(nextUrl)
		{
			getODFilesList(nextUrl? nextUrl : url, function(resp) 
			{
				if (!acceptRequest) return;
				
				var list = resp.value || [];

				if (acceptAllFiles || isSharepointSites)
				{
					Array.prototype.push.apply(potentialDrawioFiles, list);
				}
				else
				{
					for (var i = 0; i < list.length; i++)
					{
						var file = list[i];
						var mimeType = file.file? file.file.mimeType : null;
						
						if (file.folder || mimeType == 'text/html' || mimeType == 'text/xml' || mimeType == 'application/xml' || mimeType == 'image/png' 
							|| /\.svg$/.test(file.name) || /\.html$/.test(file.name) || /\.xml$/.test(file.name) || /\.png$/.test(file.name)
							|| /\.drawio$/.test(file.name) || /\.drawiolib$/.test(file.name))
						{
							potentialDrawioFiles.push(file);
						}
					}
				}

				if (resp['@odata.nextLink'] && potentialDrawioFiles.length < 1000) // TODO Support dynamic paging instead of 1000 limit
				{
					getChunk(resp['@odata.nextLink']);
				}
				else
				{
					clearTimeout(timeoutThread);
					renderList(potentialDrawioFiles);
				}
			}, 
			function(err)
			{
				if (!acceptRequest) return;
				clearTimeout(timeoutThread);
				
				var errMsg = null;
				
				try
				{
					errMsg = JSON.parse(err.responseText).error.message;
				}
				catch(e){} //ignore errors
				
				errorFn(mxResources.get('errorFetchingFolder', null, 'Error fetching folder items') +
					(errMsg != null? ' (' + errMsg + ')' : ''));

				requestInProgress = false;
				spinner.stop();
			}, nextUrl != null);
		};

		getChunk();
	};
	
	this.getSelectedItem = function()
	{
		if (selectedFile != null)
		{
			addToRecent(selectedFile);	
		}
		
		return selectedFile;
	}
	
	//Code execution starts here
	if (_$('#mxODPickerCss') == null)
	{
		var head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	
		head.appendChild(style);
		style.type = 'text/css';
		style.id = 'mxODPickerCss';
		style.appendChild(document.createTextNode(css));
	}
	
	container.innerHTML = html;

	var prevDiv = _$('.odPreview');
	var selectedCat = _$('#odFiles');
	
	var cats = _$$('.odCatListTitle');

	function setSelectedCat(cat)
	{
		selectedCat.className = selectedCat.className.replace('odCatSelected', '');
		selectedCat = cat;
		selectedCat.className += ' odCatSelected';
	};
	
	for (var i = 0; i < cats.length; i++)
	{
		cats[i].addEventListener('click', function()
		{
			loadingPreviewFile = null;
			selectedFile = null;

			if (requestInProgress) return;
			
			setSelectedCat(this);
			
			switch(this.id)
			{
				case 'odFiles':
					fillFolderFiles();
				break;
				case 'odRecent':
					fillFolderFiles('recent');
				break;
				case 'odShared':
					fillFolderFiles('shared');
				break;
				case 'odSharepoint':
					fillFolderFiles('sharepoint');
				break;
			}
		});
	}
	
	//Search (Currently API doesn't work)
	var delayTimer = null;
	
	function doSearch(searchStr)
	{
		if (requestInProgress) return;
		delayTimer = null;
		fillFolderFiles('search', null, null, null, searchStr)
	};
	
	//Use keyup to detect delete and backspace
	_$('#odSearchBox').addEventListener('keyup', function(evt)
	{
		var searchInput = this;
		
		if (delayTimer != null)
		{
			clearTimeout(delayTimer);
		}
		
		if (evt.keyCode == 13)
		{
			doSearch(searchInput.value);
		}
		else
		{
			delayTimer = setTimeout(function()
			{
				doSearch(searchInput.value);	
			}, 500);
		}
	});
	
	function refreshFolder()
	{
		if (lastFolderArgs != null)
		{
			previewFn(null);
			fillFolderFiles.apply(this, lastFolderArgs);
		}
	};
	
	_$('#refreshOD').addEventListener('click', refreshFolder);
	
	if (backFn)
	{
		_$('#odBackBtn').addEventListener('click', backFn);
	}
	
	if (withSubmitBtn)
	{
		_$('#odSubmitBtn').addEventListener('click', doSubmit);
	}
	
	if (initFolderPath != null)
	{
		var folderInfo = initFolderPath.pop();
		
		if (initFolderPath[0].driveId == 'sharepoint')
		{
			setSelectedCat(_$('#odSharepoint'));
		}
		
		breadcrumb = initFolderPath;
		fillFolderFiles(folderInfo.driveId, folderInfo.folderId, folderInfo.siteId, folderInfo.name);
	}
	else
	{
		fillFolderFiles();		
	}
};
