(function()
{
	Sidebar.prototype.addNetworkPalette = function()
	{
		var w = 50;
		var h = 50;
		var sb = this;
		var s0 = 'fontColor=#0066CC;verticalAlign=top;verticalLabelPosition=bottom;labelPosition=center;align=center;';
		var s = 'html=1;outlineConnect=0;fillColor=#CCCCCC;strokeColor=#6881B3;gradientColor=none;gradientDirection=north;strokeWidth=2;shape=mxgraph.networks.';
		var s1 = 'fontColor=#0066CC;';
		var gn = 'mxgraph.networks';
		var dt = 'computer network ';
		this.setCurrentSearchEntryLibrary('network');
		
		this.addPaletteFunctions('network', 'Network', false,
		[
			this.addDataEntry(dt + 'ring bus', 100, 100, 'Ring Bus',
				'7VfJboMwEP0arpWBkNJjgTanSpF66NmKJ2DVYDQ429/XYIclKi2Nkp5AQrLfrLzHsDh+nB9XSMvsTTIQjv/i+DFKqcwqP8YghOMRzhw/cTyP6NPxXkesbmMlJUUo1JQAzwTsqdiBQQxQqZOwQKZy3VbiOn605ULEUkhsLH7cHBqvFMpP6FmWYehGfm3JaFnn0VV5WelVVALyHBRgh647KEqRMq6bPycrZAE9OOEIG8Vl0ZhQZXVXsnPXtbfN0Xb1wVntlXgasRcLqOA4SlgDWbZWIHVjeNIuNsALTMRpuD3YKnoXGMZJBjzN1BCjldmnbd5OG72w8nwvlf+7VOM6AEvh3TpaSlHuCgZ1clI7FOwZUR46O6NV1pp7N8EYrXWJAamKYgpqcJ9N4BlBUMX3w1Tf8WZD15LrjK0+l0xXcocbsE4XZLdVJ/G/mPmfwH8YPAwnxF2cgdtLEsySTJDEJWSgyP1GZDnrcc2IdMDtJXmcJfnDW+P8zCJ3G5Fw1mPKI2vxjyPyNEvykyR3f2u4ZBbgmpm44ZeV3nb/nMa9/0v6BQ=='),
			this.addDataEntry(dt + 'bus backbone', 260, 140, 'Bus',
				'7ZdNj4IwEIZ/DVcD1HXd4wK7njYx8bDnKiM0FmqGori/fltaBb8Ws5EbJCb0nel0fF4yBIeEWTVDuk2/RAzcIR8OCVEIae6yKgTOHd9lsUMix/dd9XP8zztRr466W4qQy0c2+GbDjvISjGKEQh64FVKZqbYizyHBmnEeCi6wjpCwvpReSBQbaEUm06kXEBVJkMZM9XKM5SKHlhwxhJVkIq9DKNNTsW8W61XkayWlW91MViUa1CgHuRe4KUbLsvjfGWvRpKt21/Wl9C0gy0CC1pd0tVmqUvNGC47agv3ohhRcEliCgBKquy7UkrVgBkLVw4NKOZjoxJjk7u2f1sYctRRYktoq1kyXFmadnCo1Fqsb6/Jtx0m34/fthDiBhU20mFGUeQy6uIYBefyOKPZNvPX4XDtrjtZVz8hJignIsyf0AZgInEq2Oy91C5XdOhdMVfRd69r4Am4hSlyBTbrgezr1IeTjAflt5J7bG/OXgfkd5pPemE8G5reZXw3u5zF/HZj/Pc7tK9brb7xPBws6xnv/HrwNHnSM+/498NzBhI75/3QT1LL5WDTp7W/JXw=='),
			this.createVertexTemplateEntry(s + 'bus;gradientColor=none;gradientDirection=north;fontColor=#ffffff;perimeter=backbonePerimeter;backboneSize=20;', 200, 20, '', 'Bus', null, null, this.getTagsForStencil(gn, 'bus backbone', dt).join(' ')),
		    this.createEdgeTemplateEntry(s + 'comm_link_edge;html=1;', 100, 100, '', 'Comm Link', null, this.getTagsForStencil(gn, 'comm_link_edge', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'biometric_reader;', 60, 100, '', 'Biometric Reader', null, null, this.getTagsForStencil(gn, 'biometric_reader', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'business_center;', 90, 100, '', 'Business Center', null, null, this.getTagsForStencil(gn, 'business_center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;fontColor=#ffffff;', 90, 50, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'community;', 95, 100, '', 'Community', null, null, this.getTagsForStencil(gn, 'community', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'comm_link;', 30, 100, '', 'Comm Link (Icon)', null, null, this.getTagsForStencil(gn, 'comm_link', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'copier;', 100, 100, '', 'Copier', null, null, this.getTagsForStencil(gn, 'copier', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'pc;', 100, 70, '', 'PC', null, null, this.getTagsForStencil(gn, 'pc', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'desktop_pc;', 30, 60, '', 'Desktop PC', null, null, this.getTagsForStencil(gn, 'desktop_pc', dt + '').join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'external_storage;', 90, 100, '', 'External Storage', null, null, this.getTagsForStencil(gn, 'external_storage', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'firewall;', 100, 100, '', 'Firewall', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'gamepad;', 100, 70, '', 'Gamepad', null, null, this.getTagsForStencil(gn, 'gamepad', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'hub;', 100, 30, '', 'Hub', null, null, this.getTagsForStencil(gn, 'hub', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'laptop;', 100, 55, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'load_balancer;', 100, 30, '', 'Load Balancer', null, null, this.getTagsForStencil(gn, 'load_balancer', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'mail_server;', 105, 105, '', 'Mail Server', null, null, this.getTagsForStencil(gn, 'mail_server', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'mainframe;', 80, 100, '', 'Mainframe', null, null, this.getTagsForStencil(gn, 'mainframe', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'mobile;', 50, 100, '', 'Mobile', null, null, this.getTagsForStencil(gn, 'mobile', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'modem;', 100, 30, '', 'Modem', null, null, this.getTagsForStencil(gn, 'modem', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'monitor;', 80, 65, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'nas_filer;', 100, 35, '', 'NAS Filer', null, null, this.getTagsForStencil(gn, 'NAS Filer', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'patch_panel;', 100, 35, '', 'Patch Panel', null, null, this.getTagsForStencil(gn, 'patch_panel', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'pc;', 100, 70, '', 'PC', null, null, this.getTagsForStencil(gn, 'pc', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'phone_1;', 100, 70, '', 'Phone', null, null, this.getTagsForStencil(gn, 'phone_1', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'phone_2;', 100, 90, '', 'Phone', null, null, this.getTagsForStencil(gn, 'phone_2', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'printer;', 100, 100, '', 'Printer', null, null, this.getTagsForStencil(gn, 'printer', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'proxy_server;', 105, 105, '', 'Proxy Server', null, null, this.getTagsForStencil(gn, 'proxy_server', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'rack;', 50, 100, '', 'Rack', null, null, this.getTagsForStencil(gn, 'rack', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'radio_tower;', 55, 100, '', 'Radio Tower', null, null, this.getTagsForStencil(gn, 'radio_tower', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'router;', 100, 30, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'satellite;', 100, 100, '', 'Satellite', null, null, this.getTagsForStencil(gn, 'satellite', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'satellite_dish;', 90, 100, '', 'Satellite Dish', null, null, this.getTagsForStencil(gn, 'satellite_dish', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'scanner;', 100, 75, '', 'Scanner', null, null, this.getTagsForStencil(gn, 'scanner', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'secured;', 80, 100, '', 'Secured', null, null, this.getTagsForStencil(gn, 'secured', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'security_camera;', 100, 75, '', 'Security Camera', null, null, this.getTagsForStencil(gn, 'security_camera', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'server;', 90, 100, '', 'Server', null, null, this.getTagsForStencil(gn, 'server', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'server_storage;', 105, 105, '', 'Server Storage', null, null, this.getTagsForStencil(gn, 'server_storage', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'storage;', 100, 100, '', 'Storage', null, null, this.getTagsForStencil(gn, 'storage', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'supercomputer;', 100, 100, '', 'Supercomputer', null, null, this.getTagsForStencil(gn, 'supercomputer', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'switch;', 100, 30, '', 'Switch', null, null, this.getTagsForStencil(gn, 'switch', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'tablet;', 100, 70, '', 'Tablet', null, null, this.getTagsForStencil(gn, 'tablet', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'tape_storage;', 105, 105, '', 'Tape Storage', null, null, this.getTagsForStencil(gn, 'tape_storage', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'terminal;', 80, 65, '', 'Terminal', null, null, this.getTagsForStencil(gn, 'terminal', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'unsecure;', 80, 100, '', 'Unsecure', null, null, this.getTagsForStencil(gn, 'unsecure', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'ups_enterprise;', 100, 100, '', 'UPS Enterprise', null, null, this.getTagsForStencil(gn, 'ups_enterprise', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'ups_small;', 70, 100, '', 'UPS Small', null, null, this.getTagsForStencil(gn, 'ups_small', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'usb_stick;', 45, 100, '', 'USB Stick', null, null, this.getTagsForStencil(gn, 'usb_stick', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'users;', 90, 100, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'user_female;', 40, 100, '', 'User Female', null, null, this.getTagsForStencil(gn, 'user_female', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'user_male;', 40, 100, '', 'User Male', null, null, this.getTagsForStencil(gn, 'user_male', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'video_projector;', 100, 35, '', 'Video Projector', null, null, this.getTagsForStencil(gn, 'video_projector', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'video_projector_screen;', 80, 100, '', 'Video Projector Screen', null, null, this.getTagsForStencil(gn, 'video_projector_screen', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'virtual_pc;', 115, 85, '', 'Virtual PC', null, null, this.getTagsForStencil(gn, 'virtual_pc', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'virtual_server;', 110, 120, '', 'Virtual Server', null, null, this.getTagsForStencil(gn, 'virtual_server', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'virus;', 100, 90, '', 'Virus', null, null, this.getTagsForStencil(gn, 'virus', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'web_server;', 105, 105, '', 'Web Server', null, null, this.getTagsForStencil(gn, 'web_server', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'wireless_hub;', 100, 85, '', 'Wireless Hub', null, null, this.getTagsForStencil(gn, 'wireless_hub', dt).join(' ')),
			this.createVertexTemplateEntry(s0 + s + 'wireless_modem;', 100, 85, '', 'Wireless Modem', null, null, this.getTagsForStencil(gn, 'wireless_modem', dt).join(' '))
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
})();
