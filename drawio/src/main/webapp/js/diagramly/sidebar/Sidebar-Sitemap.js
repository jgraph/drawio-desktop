(function()
{
	// Adds Sitemap shapes
	Sidebar.prototype.addSitemapPalette = function()
	{
		var s = 'html=1;whiteSpace=wrap;strokeColor=none;fillColor=#0079D6;labelPosition=center;verticalLabelPosition=middle;verticalAlign=top;align=center;fontSize=12;outlineConnect=0;spacingTop=-6;fontColor=#FFFFFF;sketch=0;shape=mxgraph.sitemap.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.sitemap';
		var dt = '';
		
		var scale = 0.2;
		var w = 600 * scale;
		var h = 350 * scale;
		this.setCurrentSearchEntryLibrary('sitemap');
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'page;',
					w, h, 'Page', 'Page', null, null, this.getTagsForStencil(gn, 'page', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'about_us;',
					w, h, 'About us', 'About us', null, null, this.getTagsForStencil(gn, 'about', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'audio;',
					w, h, 'Audio', 'Audio', null, null, this.getTagsForStencil(gn, 'audio', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'biography;',
					w, h, 'Biography', 'Biography', null, null, this.getTagsForStencil(gn, 'biography', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'blog;',
					w, h, 'Blog', 'Blog', null, null, this.getTagsForStencil(gn, 'blog', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'calendar;',
					w, h, 'Calendar', 'Calendar', null, null, this.getTagsForStencil(gn, 'calendar', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'chart;',
					w, h, 'Chart', 'Chart', null, null, this.getTagsForStencil(gn, 'chart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'chat;',
					w, h, 'Chat', 'Chat', null, null, this.getTagsForStencil(gn, 'chat', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;',
					w, h, 'Cloud', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'contact;',
					w, h, 'Contact', 'Contact', null, null, this.getTagsForStencil(gn, 'contact', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'contact_us;',
					w, h, 'Contact us', 'Contact us', null, null, this.getTagsForStencil(gn, 'contact', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document;',
					w, h, 'Document', 'Document', null, null, this.getTagsForStencil(gn, 'document', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'download;',
					w, h, 'Download', 'Download', null, null, this.getTagsForStencil(gn, 'download', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'error;',
					w, h, 'Error', 'Error', null, null, this.getTagsForStencil(gn, 'error', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'faq;',
					w, h, 'FAQ', 'FAQ', null, null, this.getTagsForStencil(gn, 'faq frequently asked questions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'form;',
					w, h, 'Form', 'Form', null, null, this.getTagsForStencil(gn, 'form', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'gallery;',
					w, h, 'Gallery', 'Gallery', null, null, this.getTagsForStencil(gn, 'gallery', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'game;',
					w, h, 'Game', 'Game', null, null, this.getTagsForStencil(gn, 'game', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'home;',
					w, h, 'Home', 'Home', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'info;',
					w, h, 'Info', 'Info', null, null, this.getTagsForStencil(gn, 'info', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'jobs;',
					w, h, 'Jobs', 'Jobs', null, null, this.getTagsForStencil(gn, 'jobs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'log;',
					w, h, 'Log', 'Log', null, null, this.getTagsForStencil(gn, 'log', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'login;',
					w, h, 'Login', 'Login', null, null, this.getTagsForStencil(gn, 'login', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mail;',
					w, h, 'Mail', 'Mail', null, null, this.getTagsForStencil(gn, 'mail', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'map;',
					w, h, 'Map', 'Map', null, null, this.getTagsForStencil(gn, 'map', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'news;',
					w, h, 'News', 'News', null, null, this.getTagsForStencil(gn, 'news', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'payment;',
					w, h, 'Payment', 'Payment', null, null, this.getTagsForStencil(gn, 'payment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'photo;',
					w, h, 'Photo', 'Photo', null, null, this.getTagsForStencil(gn, 'photo', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'portfolio;',
					w, h, 'Portfolio', 'Portfolio', null, null, this.getTagsForStencil(gn, 'portfolio', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'post;',
					w, h, 'Post', 'Post', null, null, this.getTagsForStencil(gn, 'post', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'pricing;',
					w, h, 'Pricing', 'Pricing', null, null, this.getTagsForStencil(gn, 'pricing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'print;',
					w, h, 'Print', 'Print', null, null, this.getTagsForStencil(gn, 'print', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'products;',
					w, h, 'Products', 'Products', null, null, this.getTagsForStencil(gn, 'products', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'profile;',
					w, h, 'Profile', 'Profile', null, null, this.getTagsForStencil(gn, 'profile', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'references;',
					w, h, 'References', 'References', null, null, this.getTagsForStencil(gn, 'references', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'script;',
					w, h, 'Script', 'Script', null, null, this.getTagsForStencil(gn, 'script', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'search;',
					w, h, 'Search', 'Search', null, null, this.getTagsForStencil(gn, 'search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'security;',
					w, h, 'Security', 'Security', null, null, this.getTagsForStencil(gn, 'security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'services;',
					w, h, 'Services', 'Services', null, null, this.getTagsForStencil(gn, 'services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'settings;',
					w, h, 'Settings', 'Settings', null, null, this.getTagsForStencil(gn, 'settings', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'shopping;',
					w, h, 'Shopping', 'Shopping', null, null, this.getTagsForStencil(gn, 'shopping', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sitemap;',
					w, h, 'Sitemap', 'Sitemap', null, null, this.getTagsForStencil(gn, 'sitemap', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'slideshow;',
					w, h, 'Slideshow', 'Slideshow', null, null, this.getTagsForStencil(gn, 'slideshow', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sports;',
					w, h, 'Sports', 'Sports', null, null, this.getTagsForStencil(gn, 'sports', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'success;',
					w, h, 'Success', 'Success', null, null, this.getTagsForStencil(gn, 'success', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'text;',
					w, h, 'Text', 'Text', null, null, this.getTagsForStencil(gn, 'text', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upload;',
					w, h, 'Upload', 'Upload', null, null, this.getTagsForStencil(gn, 'upload', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user;',
					w, h, 'User', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video;',
					w, h, 'Video', 'Video', null, null, this.getTagsForStencil(gn, 'video', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'warning;',
					w, h, 'Warning', 'Warning', null, null, this.getTagsForStencil(gn, 'warning', dt).join(' '))
		];
			
		this.addPalette('sitemap', 'Sitemap', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
		
		this.setCurrentSearchEntryLibrary();
	};
})();
