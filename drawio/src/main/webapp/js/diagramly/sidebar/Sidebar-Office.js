(function()
{
	// Adds mockup shapes
	Sidebar.prototype.addOfficePalette = function()
	{
		this.setCurrentSearchEntryLibrary('office', 'officeClouds');
		this.addOfficeCloudsPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeCommunications');
		this.addOfficeCommunicationsPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeConcepts');
		this.addOfficeConceptsPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeDatabases');
		this.addOfficeDatabasesPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeDevices');
		this.addOfficeDevicesPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeSecurity');
		this.addOfficeSecurityPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeServers');
		this.addOfficeServersPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeServices');
		this.addOfficeServicesPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeSites');
		this.addOfficeSitesPalette();
		this.setCurrentSearchEntryLibrary('office', 'officeUsers');
		this.addOfficeUsersPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addOfficeCloudsPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;outlineConnect=0;verticalAlign=top;align=center;shape=mxgraph.office.clouds.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;outlineConnect=0;verticalAlign=top;align=center;shape=mxgraph.office.clouds.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.clouds';
		var dt = 'office cloud ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'azure;',
					w * 103, h * 66, '', 'Azure', null, null, this.getTagsForStencil(gn, 'azure', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;',
					w * 94, h * 55, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_disaster;',
					w * 94, h * 74, '', 'Cloud Disaster', null, null, this.getTagsForStencil(gn, 'cloud disaster', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cloud_disaster;fillColor=#ff0000;',
					w * 94, h * 74, '', 'Cloud Disaster (Red)', null, null, this.getTagsForStencil(gn, 'cloud disaster', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_exchange_online;',
					w * 100, h * 61, '', 'Cloud Exchange Online', null, null, this.getTagsForStencil(gn, 'cloud exchange online', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_service_request;',
					w * 102, h * 80, '', 'Cloud Service Request', null, null, this.getTagsForStencil(gn, 'cloud service request', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_sharepoint;',
					w * 101, h * 61, '', 'Cloud SharePoint', null, null, this.getTagsForStencil(gn, 'cloud sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'office_365;',
					w * 101, h * 61, '', 'Office 365', null, null, this.getTagsForStencil(gn, 'office 365', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'online_backup;',
					w * 94, h * 101, '', 'Online Backup', null, null, this.getTagsForStencil(gn, 'online backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'online_user;',
					w * 93, h * 74, '', 'Online User', null, null, this.getTagsForStencil(gn, 'online user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'private_cloud;',
					w * 94, h * 55, '', 'Private Cloud', null, null, this.getTagsForStencil(gn, 'private cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'public_cloud;',
					w * 101, h * 81, '', 'Public Cloud', null, null, this.getTagsForStencil(gn, 'public cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'public_im_cloud_service;',
					w * 102, h * 99, '', 'Public IM Cloud Service', null, null, this.getTagsForStencil(gn, 'public im instant message cloud service', dt).join(' '))
		];
			
		this.addPalette('officeClouds', 'Office / Clouds', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addOfficeCommunicationsPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.communications.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.communications';
		var dt = 'office communication ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + '3rd_party_call_center_solution;',
					w * 98, h * 101, '', '3rd Party Call Center Solution', null, null, this.getTagsForStencil(gn, '3rd party call center solution', dt).join(' ')),
			this.createVertexTemplateEntry(s + '3rd_party_integration;',
					w * 54, h * 55, '', '3rd Party Integration', null, null, this.getTagsForStencil(gn, '3rd party integration', dt).join(' ')),
			this.createVertexTemplateEntry(s + '3rd_party_service;',
					w * 53, h * 54, '', '3rd Party Service', null, null, this.getTagsForStencil(gn, '3rd party service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_sharing_workload;',
					w * 57, h * 49, '', 'Application Sharing Workload', null, null, this.getTagsForStencil(gn, 'application sharing workload', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'audio_conferencing_application;',
					w * 59, h * 46, '', 'Audio Conferencing Application', null, null, this.getTagsForStencil(gn, 'audio_conferencing_application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'central_management_service;',
					w * 52, h * 55, '', 'Central Management Service', null, null, this.getTagsForStencil(gn, 'central management service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'chat_room;',
					w * 46, h * 48, '', 'Chat Room', null, null, this.getTagsForStencil(gn, 'chat room', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'conference_announcement_service;',
					w * 60, h * 60, '', 'Conference Announcement Service', null, null, this.getTagsForStencil(gn, 'conference announcement service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'disconnected_mailbox;',
					w * 60, h * 55, '', 'Disconnected Mailbox', null, null, this.getTagsForStencil(gn, 'disconnected mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'discovery_search_mailbox;',
					w * 55, h * 49, '', 'Discovery Search Mailbox', null, null, this.getTagsForStencil(gn, 'discovery search mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dynamic_distribution_group;',
					w * 58, h * 59, '', 'Dynamic Distribution Group', null, null, this.getTagsForStencil(gn, 'dynamic distribution group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'edge_subscription;',
					w * 57, h * 59, '', 'Edge Subscription', null, null, this.getTagsForStencil(gn, 'edge subscription', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_workloaad;',
					w * 57, h * 47, '', 'Email Workloaad', null, null, this.getTagsForStencil(gn, 'email workloaad', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'equipment_mailbox;',
					w * 59, h * 59, '', 'Equipment Mailbox', null, null, this.getTagsForStencil(gn, 'equipment mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_active_sync;',
					w * 49, h * 49, '', 'Exchange Active Sync', null, null, this.getTagsForStencil(gn, 'exchange_active_sync', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_active_sync;fillColor=#2072B8;',
					w * 49, h * 49, '', 'Exchange Active Sync - Blue', null, null, this.getTagsForStencil(gn, 'exchange_active_sync', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'fax_partner;',
					w * 45, h * 56, '', 'Fax Partner', null, null, this.getTagsForStencil(gn, 'fax partner', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'global_address_list;',
					w * 59, h * 53, '', 'Global Address List', null, null, this.getTagsForStencil(gn, 'global address list', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hybrid_voip_gateway;',
					w * 59, h * 38, '', 'Hybrid VOIP Gateway', null, null, this.getTagsForStencil(gn, 'hybrid voip gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'im_workload;',
					w * 56, h * 54, '', 'IM Workload', null, null, this.getTagsForStencil(gn, 'im workload instant message', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'journaling_rule;',
					w * 52, h * 58, '', 'Journaling Rule', null, null, this.getTagsForStencil(gn, 'journaling rule', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'local_move_request;',
					w * 57, h * 57, '', 'Local Move Request', null, null, this.getTagsForStencil(gn, 'local move request', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_control_panel;',
					w * 69, h * 58, '', 'Lync Control Panel', null, null, this.getTagsForStencil(gn, 'lync control panel', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_phone_edition;',
					w * 80, h * 45, '', 'Lync Phone Edition', null, null, this.getTagsForStencil(gn, 'lync phone edition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_room_system;',
					w * 80, h * 42, '', 'Lync Room System', null, null, this.getTagsForStencil(gn, 'lync room system', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_server_management_tool;',
					w * 75, h * 47, '', 'Lync Server Management Tool', null, null, this.getTagsForStencil(gn, 'lync server management tool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_storage_service;',
					w * 66, h * 59, '', 'Lync Storage Service', null, null, this.getTagsForStencil(gn, 'lync storage service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_web_app_client;',
					w * 83, h * 50, '', 'Lync Web App Client', null, null, this.getTagsForStencil(gn, 'lync web app client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mail_enabled_public_folder;',
					w * 58, h * 52, '', 'Mail-Enabled Public Folder', null, null, this.getTagsForStencil(gn, 'mail enabled public folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox_assistant;',
					w * 59, h * 57, '', 'Mailbox Assistant', null, null, this.getTagsForStencil(gn, 'mailbox assistant', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'messages_queued;',
					w * 59, h * 57, '', 'Messages Queued', null, null, this.getTagsForStencil(gn, 'messages queued', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'offline_address_book;',
					w * 59, h * 53, '', 'Offline Address Book', null, null, this.getTagsForStencil(gn, 'offline address book', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'personal_archive_mailbox;',
					w * 59, h * 58, '', 'Personal Archive Mailbox', null, null, this.getTagsForStencil(gn, 'personal archive mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'public_im_cloud_service;',
					w * 60, h * 58, '', 'Public IM Cloud Service', null, null, this.getTagsForStencil(gn, 'public im cloud service instant message', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'push_notification_service;',
					w * 50, h * 58, '', 'Push Notification Service', null, null, this.getTagsForStencil(gn, 'push notification service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'queue_viewer;',
					w * 59, h * 57, '', 'Queue Viewer', null, null, this.getTagsForStencil(gn, 'queue viewer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'remote_mailbox;',
					w * 59, h * 57, '', 'Remote Mailbox', null, null, this.getTagsForStencil(gn, 'remote mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'remote_move_request;',
					w * 60, h * 57, '', 'Remote Move Request', null, null, this.getTagsForStencil(gn, 'remote move request', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'response_group;',
					w * 58, h * 54, '', 'Response Group', null, null, this.getTagsForStencil(gn, 'response group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'room_mailbox;',
					w * 60, h * 57, '', 'Room Mailbox', null, null, this.getTagsForStencil(gn, 'room mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'shared_mailbox;',
					w * 60, h * 55, '', 'Shared Mailbox', null, null, this.getTagsForStencil(gn, 'shared mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sip_uri_um_dial_plan;',
					w * 55, h * 56, '', 'SIP URI UM Dial Plan', null, null, this.getTagsForStencil(gn, 'sip uri um dial plan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'site_mailbox;',
					w * 59, h * 54, '', 'Site Mailbox', null, null, this.getTagsForStencil(gn, 'site mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_control_panel;',
					w * 65, h * 59, '', 'Skype for Business Control Panel', null, null, this.getTagsForStencil(gn, 'skype for business control panel', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_phone_edition;',
					w * 76, h * 45, '', 'Skype for Business Phone Edition', null, null, this.getTagsForStencil(gn, 'skype for business phone edition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_room_system;',
					w * 74, h * 41, '', 'Skype for Business Room System', null, null, this.getTagsForStencil(gn, 'skype for business room system', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_server_management_tool;',
					w * 72, h * 48, '', 'Skype for Business Server Management Tool', null, null, this.getTagsForStencil(gn, 'skype for business server management tool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_storage_service;',
					w * 62, h * 58, '', 'Skype for Business Storage Service', null, null, this.getTagsForStencil(gn, 'skype for business storage service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_web_app_client;',
					w * 80, h * 51, '', 'Skype for Business Web App Client', null, null, this.getTagsForStencil(gn, 'skype for business web app client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sms_gateway;',
					w * 59, h * 37, '', 'SMS Gateway', null, null, this.getTagsForStencil(gn, 'sms gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'smtp_connector;',
					w * 47, h * 49, '', 'SMTP Connector', null, null, this.getTagsForStencil(gn, 'smtp connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'system_mailbox;',
					w * 58, h * 55, '', 'System Mailbox', null, null, this.getTagsForStencil(gn, 'system mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tdm_pbx;',
					w * 59, h * 46, '', 'TDM PBX', null, null, this.getTagsForStencil(gn, 'tdm pbx', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'telephone_extension_dial_plan;',
					w * 55, h * 56, '', 'Telephone Extension Dial Plan', null, null, this.getTagsForStencil(gn, 'telephone extension dial plan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'transport_rule;',
					w * 56, h * 57, '', 'Transport Rule', null, null, this.getTagsForStencil(gn, 'transport rule', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ucma_application;',
					w * 53, h * 40, '', 'UCMA Application', null, null, this.getTagsForStencil(gn, 'ucma application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ucwa_application;',
					w * 53, h * 40, '', 'UCWA Application', null, null, this.getTagsForStencil(gn, 'ucwa application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_auto_attendant;',
					w * 57, h * 57, '', 'UM Auto Attendant', null, null, this.getTagsForStencil(gn, 'um auto attendant', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_dial_plan_e164;',
					w * 55, h * 56, '', 'UM Dial Plan E164', null, null, this.getTagsForStencil(gn, 'um dial plan e164', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_dial_plan_secondary;',
					w * 55, h * 56, '', 'UM Dial Plan Secondary', null, null, this.getTagsForStencil(gn, 'um dial plan secondary', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_enabled_mailbox;',
					w * 59, h * 57, '', 'UM Enabled Mailbox', null, null, this.getTagsForStencil(gn, 'um enabled mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_hunt_group;',
					w * 59, h * 48, '', 'UM Hunt Group', null, null, this.getTagsForStencil(gn, 'um hunt group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_ip_gateway;',
					w * 59, h * 38, '', 'UM IP Gateway', null, null, this.getTagsForStencil(gn, 'um ip gateway internet protocol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_mailbox;',
					w * 59, h * 55, '', 'User Mailbox', null, null, this.getTagsForStencil(gn, 'user mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_workload;',
					w * 57, h * 50, '', 'Video Workload', null, null, this.getTagsForStencil(gn, 'video workload', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'voice_mail_preview;',
					w * 46, h * 56, '', 'Voice Mail Preview', null, null, this.getTagsForStencil(gn, 'voice mail preview', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'voice_workload;',
					w * 58, h * 51, '', 'Voice Workload', null, null, this.getTagsForStencil(gn, 'voice workload', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'voip_gateway;',
					w * 51, h * 15, '', 'VoIP Gateway', null, null, this.getTagsForStencil(gn, 'voip gateway voice over ip internet protocol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'watcher_node;',
					w * 52, h * 56, '', 'Watcher Node', null, null, this.getTagsForStencil(gn, 'watcher node', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'xmpp_service;',
					w * 58, h * 52, '', 'XMPP Service', null, null, this.getTagsForStencil(gn, 'xmpp service', dt).join(' '))
		];
			
		this.addPalette('officeCommunications', 'Office / Communications', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addOfficeConceptsPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.concepts.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.concepts.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.concepts';
		var dt = 'office concept ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'address_book;',
					w * 55, h * 44, '', 'Address Book', null, null, this.getTagsForStencil(gn, 'address book', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'address_book;',
					w * 40, h * 31, '', 'Address Book (small)', null, null, this.getTagsForStencil(gn, 'address book small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'anti_spam;',
					w * 55, h * 47, '', 'Anti-Spam', null, null, this.getTagsForStencil(gn, 'anti spam', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_android;',
					w * 60, h * 51, '', 'Application Android', null, null, this.getTagsForStencil(gn, 'application android', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_generic;',
					w * 53, h * 40, '', 'Application Generic', null, null, this.getTagsForStencil(gn, 'application generic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_generic;',
					w * 40, h * 30, '', 'Application Generic (small)', null, null, this.getTagsForStencil(gn, 'application generic small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_hybrid;',
					w * 59, h * 44, '', 'Application Hybrid', null, null, this.getTagsForStencil(gn, 'application hybrid', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_ios;',
					w * 59, h * 49, '', 'Application iOS', null, null, this.getTagsForStencil(gn, 'application ios', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_web;',
					w * 56, h * 49, '', 'Application Web', null, null, this.getTagsForStencil(gn, 'application web', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_windows;',
					w * 59, h * 47, '', 'Application Windows', null, null, this.getTagsForStencil(gn, 'application windows', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'app_for_office;',
					w * 53, h * 40, '', 'App for Office', null, null, this.getTagsForStencil(gn, 'app for office', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'app_for_sharepoint;',
					w * 53, h * 40, '', 'App For SharePoint', null, null, this.getTagsForStencil(gn, 'app for sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'app_part;',
					w * 46, h * 45, '', 'App Part', null, null, this.getTagsForStencil(gn, 'app part', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'archive;',
					w * 35, h * 55, '', 'Archive', null, null, this.getTagsForStencil(gn, 'archive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'attachment;',
					w * 22, h * 44, '', 'Attachment', null, null, this.getTagsForStencil(gn, 'attachment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'backup_local;',
					w * 48, h * 44, '', 'Backup Local', null, null, this.getTagsForStencil(gn, 'backup local', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'backup_online;',
					w * 55, h * 60, '', 'Backup Online', null, null, this.getTagsForStencil(gn, 'backup online', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'bandwidth;',
					w * 45, h * 45, '', 'Bandwidth', null, null, this.getTagsForStencil(gn, 'bandwidth', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'bandwidth_calculator;',
					w * 49, h * 53, '', 'Bandwidth Calculator', null, null, this.getTagsForStencil(gn, 'bandwidth calculator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'best_practices;',
					w * 53, h * 53, '', 'Best Practices', null, null, this.getTagsForStencil(gn, 'best practices', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'book_journal;',
					w * 41, h * 49, '', 'Book, Journal', null, null, this.getTagsForStencil(gn, 'book journal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'calculator;',
					w * 32, h * 46, '', 'Calculator', null, null, this.getTagsForStencil(gn, 'calculator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'calendar;',
					w * 53, h * 49, '', 'Calendar', null, null, this.getTagsForStencil(gn, 'calendar', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'clipboard;',
					w * 40, h * 52, '', 'Clipboard', null, null, this.getTagsForStencil(gn, 'clipboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'clipboard;',
					w * 30, h * 39, '', 'Clipboard (small)', null, null, this.getTagsForStencil(gn, 'clipboard small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'clock;',
					w * 45, h * 45, '', 'Clock', null, null, this.getTagsForStencil(gn, 'clock', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'clock;',
					w * 35, h * 35, '', 'Clock (small)', null, null, this.getTagsForStencil(gn, 'clock small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'column;',
					w * 52, h * 43, '', 'Column', null, null, this.getTagsForStencil(gn, 'column', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'connector;',
					w * 44, h * 32, '', 'Connector', null, null, this.getTagsForStencil(gn, 'connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'connector;',
					w * 33, h * 24, '', 'Connector (small)', null, null, this.getTagsForStencil(gn, 'connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'contacts;',
					w * 53, h * 39, '', 'Contacts', null, null, this.getTagsForStencil(gn, 'contacts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'content_type;',
					w * 53, h * 40, '', 'Content Type', null, null, this.getTagsForStencil(gn, 'content type', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'credit_card;',
					w * 55, h * 36, '', 'Credit Card', null, null, this.getTagsForStencil(gn, 'credit card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document;',
					w * 40, h * 47, '', 'Document', null, null, this.getTagsForStencil(gn, 'document', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document;',
					w * 30, h * 35, '', 'Document (small)', null, null, this.getTagsForStencil(gn, 'document', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'documents;',
					w * 46, h * 54, '', 'Documents', null, null, this.getTagsForStencil(gn, 'documents', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'documents_shared;',
					w * 58, h * 59, '', 'Documents Shared', null, null, this.getTagsForStencil(gn, 'documents shared', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document_blank;',
					w * 40, h * 47, '', 'Document Blank', null, null, this.getTagsForStencil(gn, 'document blank', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document_blank;',
					w * 30, h * 35, '', 'Document Blank (small)', null, null, this.getTagsForStencil(gn, 'document blank', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'document_shared;',
					w * 52, h * 53, '', 'Document Shared', null, null, this.getTagsForStencil(gn, 'document shared', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'download;',
					w * 48, h * 56, '', 'Download', null, null, this.getTagsForStencil(gn, 'download', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email;',
					w * 47, h * 36, '', 'Email', null, null, this.getTagsForStencil(gn, 'email', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email;',
					w * 31, h * 24, '', 'Email (small)', null, null, this.getTagsForStencil(gn, 'email', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_approved;',
					w * 56, h * 46, '', 'Email Approved', null, null, this.getTagsForStencil(gn, 'email approved', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_expired;',
					w * 56, h * 46, '', 'Email Expired', null, null, this.getTagsForStencil(gn, 'email expired', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_rejected;',
					w * 55, h * 45, '', 'Email Rejected', null, null, this.getTagsForStencil(gn, 'email rejected', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file_key;',
					w * 48, h * 53, '', 'File Key', null, null, this.getTagsForStencil(gn, 'file key', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'firewall;',
					w * 47, h * 43, '', 'Firewall', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firewall;fillColor=#2072B8;',
					w * 47, h * 43, '', 'Firewall (blue)', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firewall;fillColor=#DA4026;',
					w * 47, h * 43, '', 'Firewall (orange)', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firewall;fillColor=#7FBA42;',
					w * 47, h * 43, '', 'Firewall (green)', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firewall;fillColor=#CCCBCB;',
					w * 47, h * 43, '', 'Firewall (ghosted)', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder;',
					w * 50, h * 45, '', 'Folder', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'folder;fillColor=#2072B8;',
					w * 50, h * 45, '', 'Folder (blue)', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'folder;fillColor=#DA4026;',
					w * 50, h * 45, '', 'Folder (orange)', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'folder;fillColor=#7FBA42;',
					w * 50, h * 45, '', 'Folder (green)', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'folder;fillColor=#CCCBCB;',
					w * 50, h * 45, '', 'Folder (ghosted)', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder;',
					w * 33, h * 30, '', 'Folder (small)', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folders;',
					w * 57, h * 53, '', 'Folders', null, null, this.getTagsForStencil(gn, 'folders', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder_open;',
					w * 56, h * 43, '', 'Folder, Open', null, null, this.getTagsForStencil(gn, 'folder open', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder_public;',
					w * 58, h * 52, '', 'Folder, Public', null, null, this.getTagsForStencil(gn, 'folder public', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder_shared;',
					w * 54, h * 52, '', 'Folder, Shared', null, null, this.getTagsForStencil(gn, 'folder shared', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'form;',
					w * 56, h * 49, '', 'Form', null, null, this.getTagsForStencil(gn, 'form', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'get_started;',
					w * 42, h * 52, '', 'Get Started', null, null, this.getTagsForStencil(gn, 'get started', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'globe_internet;',
					w * 49, h * 49, '', 'Globe, Internet', null, null, this.getTagsForStencil(gn, 'globe internet', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'help;',
					w * 49, h * 49, '', 'Help', null, null, this.getTagsForStencil(gn, 'help', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'help;',
					w * 38, h * 38, '', 'Help (small)', null, null, this.getTagsForStencil(gn, 'help', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'home;',
					w * 51, h * 50, '', 'Home', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home;fillColor=#2072B8;',
					w * 51, h * 50, '', 'Home (blue)', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home;fillColor=#DA4026;',
					w * 51, h * 50, '', 'Home (orange)', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home;fillColor=#7FBA42;',
					w * 51, h * 50, '', 'Home (green)', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home;fillColor=#CCCBCB;',
					w * 51, h * 50, '', 'Home (ghosted)', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'home;',
					w * 39, h * 38, '', 'Home (small)', null, null, this.getTagsForStencil(gn, 'home', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'home_page;',
					w * 53, h * 43, '', 'Home Page', null, null, this.getTagsForStencil(gn, 'home page', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home_page;fillColor=#2072B8;',
					w * 53, h * 43, '', 'Home Page (blue)', null, null, this.getTagsForStencil(gn, 'home page', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home_page;fillColor=#DA4026;',
					w * 53, h * 43, '', 'Home Page (orange)', null, null, this.getTagsForStencil(gn, 'home page', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home_page;fillColor=#7FBA42;',
					w * 53, h * 43, '', 'Home Page (green)', null, null, this.getTagsForStencil(gn, 'home page', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'home_page;fillColor=#CCCBCB;',
					w * 53, h * 43, '', 'Home Page (ghosted)', null, null, this.getTagsForStencil(gn, 'home page', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hybrid;',
					w * 58, h * 52, '', 'Hybrid', null, null, this.getTagsForStencil(gn, 'hybrid', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'input_output_filter;',
					w * 46, h * 46, '', 'Input Output Filter', null, null, this.getTagsForStencil(gn, 'input output filter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'install;',
					w * 45, h * 52, '', 'Install', null, null, this.getTagsForStencil(gn, 'install', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'integration;',
					w * 44, h * 43, '', 'Integration', null, null, this.getTagsForStencil(gn, 'integration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lab;',
					w * 47, h * 50, '', 'Lab', null, null, this.getTagsForStencil(gn, 'lab', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'learn;',
					w * 56, h * 57, '', 'Learn', null, null, this.getTagsForStencil(gn, 'learn', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'license;',
					w * 45, h * 52, '', 'License', null, null, this.getTagsForStencil(gn, 'license', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'link;',
					w * 61, h * 21, '', 'Link', null, null, this.getTagsForStencil(gn, 'link', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'list_library;',
					w * 52, h * 48, '', 'List Library', null, null, this.getTagsForStencil(gn, 'list library', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox;',
					w * 53, h * 49, '', 'Mailbox', null, null, this.getTagsForStencil(gn, 'mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox;',
					w * 40, h * 38, '', 'Mailbox (small)', null, null, this.getTagsForStencil(gn, 'mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox2;',
					w * 53, h * 49, '', 'Mailbox', null, null, this.getTagsForStencil(gn, 'mailbox2', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox2;',
					w * 40, h * 38, '', 'Mailbox (small)', null, null, this.getTagsForStencil(gn, 'mailbox2', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'maintenance;',
					w * 39, h * 56, '', 'Maintenance', null, null, this.getTagsForStencil(gn, 'maintenance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'marketplace_shopping_bag;',
					w * 36, h * 46, '', 'Marketplace, Shopping Bag', null, null, this.getTagsForStencil(gn, 'marketplace shopping bag', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'meets_requirements;',
					w * 56, h * 53, '', 'Meets Requirements', null, null, this.getTagsForStencil(gn, 'meets requirements', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'migration;',
					w * 59, h * 34, '', 'Migration', null, null, this.getTagsForStencil(gn, 'migration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'moes;',
					w * 40, h * 47, '', 'MOEs', null, null, this.getTagsForStencil(gn, 'moes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'navigation;',
					w * 53, h * 40, '', 'Navigation', null, null, this.getTagsForStencil(gn, 'navigation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'node_generic;',
					w * 46, h * 52, '', 'Node, Generic', null, null, this.getTagsForStencil(gn, 'node generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'node_generic;fillColor=#2072B8;',
					w * 46, h * 52, '', 'Node, Generic (blue)', null, null, this.getTagsForStencil(gn, 'node generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'node_generic;fillColor=#DA4026;',
					w * 46, h * 52, '', 'Node, Generic (orange)', null, null, this.getTagsForStencil(gn, 'node generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'node_generic;fillColor=#7FBA42;',
					w * 46, h * 52, '', 'Node, Generic (green)', null, null, this.getTagsForStencil(gn, 'node generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'node_generic;fillColor=#CCCBCB;',
					w * 46, h * 52, '', 'Node, Generic (ghosted)', null, null, this.getTagsForStencil(gn, 'node generic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'office_installed;',
					w * 58, h * 48, '', 'Office Installed', null, null, this.getTagsForStencil(gn, 'office installed', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'on_premises;',
					w * 34, h * 55, '', 'On Premises', null, null, this.getTagsForStencil(gn, 'on premises', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'on_premises_directory;',
					w * 50, h * 59, '', 'On Premises Directory', null, null, this.getTagsForStencil(gn, 'on premises directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'phishing;',
					w * 59, h * 47, '', 'Phishing', null, null, this.getTagsForStencil(gn, 'phishing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'pin;',
					w * 24, h * 44, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'platform_options;',
					w * 58, h * 52, '', 'Platform Options', null, null, this.getTagsForStencil(gn, 'platform options', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'powershell;',
					w * 45, h * 45, '', 'PowerShell', null, null, this.getTagsForStencil(gn, 'powershell', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'properties;',
					w * 50, h * 49, '', 'Properties', null, null, this.getTagsForStencil(gn, 'properties', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'publish;',
					w * 57, h * 48, '', 'Publish', null, null, this.getTagsForStencil(gn, 'publish', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'remote_access;',
					w * 59, h * 41, '', 'Remote Access', null, null, this.getTagsForStencil(gn, 'remote access', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'script;',
					w * 53, h * 49, '', 'Script', null, null, this.getTagsForStencil(gn, 'script', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'search;',
					w * 49, h * 49, '', 'Search', null, null, this.getTagsForStencil(gn, 'search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'search;',
					w * 35, h * 35, '', 'Search (small)', null, null, this.getTagsForStencil(gn, 'search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'service_application;',
					w * 59, h * 48, '', 'Service Application', null, null, this.getTagsForStencil(gn, 'service application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'settings;',
					w * 48, h * 48, '', 'Settings', null, null, this.getTagsForStencil(gn, 'settings', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'settings_office_365;',
					w * 48, h * 48, '', 'Settings, Office 365', null, null, this.getTagsForStencil(gn, 'settings office 365', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'settings_office_365;',
					w * 31, h * 31, '', 'Settings, Office 365 (small)', null, null, this.getTagsForStencil(gn, 'settings office 365', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sign_up;',
					w * 51, h * 47, '', 'Sign Up', null, null, this.getTagsForStencil(gn, 'sign up', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sound_file;',
					w * 40, h * 50, '', 'Sound File', null, null, this.getTagsForStencil(gn, 'sound file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tasks;',
					w * 40, h * 52, '', 'Tasks', null, null, this.getTagsForStencil(gn, 'tasks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'technical_diagram;',
					w * 50, h * 56, '', 'Technical Diagram', null, null, this.getTagsForStencil(gn, 'technical diagram', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upgrade_application;',
					w * 58, h * 42, '', 'Upgrade Application', null, null, this.getTagsForStencil(gn, 'upgrade application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upgrade_server;',
					w * 39, h * 52, '', 'Upgrade Server', null, null, this.getTagsForStencil(gn, 'upgrade server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upgrade_site;',
					w * 59, h * 48, '', 'Upgrade Site', null, null, this.getTagsForStencil(gn, 'upgrade site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upload;',
					w * 48, h * 55, '', 'Upload', null, null, this.getTagsForStencil(gn, 'upload', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_form;',
					w * 58, h * 49, '', 'Video Form', null, null, this.getTagsForStencil(gn, 'video form', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_play;',
					w * 50, h * 40, '', 'Video Play', null, null, this.getTagsForStencil(gn, 'video play', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'voicemail;',
					w * 53, h * 34, '', 'Voicemail', null, null, this.getTagsForStencil(gn, 'voicemail', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'voicemail_preview;',
					w * 57, h * 52, '', 'Voicemail Preview', null, null, this.getTagsForStencil(gn, 'voicemail preview', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'walkthrough;',
					w * 41, h * 58, '', 'Walkthrough', null, null, this.getTagsForStencil(gn, 'walkthrough', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'website;',
					w * 59, h * 49, '', 'Website', null, null, this.getTagsForStencil(gn, 'website', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_conferencing;',
					w * 60, h * 56, '', 'Web Conferencing', null, null, this.getTagsForStencil(gn, 'web conferencing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_page;',
					w * 50, h * 54, '', 'Web Page', null, null, this.getTagsForStencil(gn, 'web page', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_part;',
					w * 45, h * 52, '', 'Web Part', null, null, this.getTagsForStencil(gn, 'web part', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_services;',
					w * 60, h * 56, '', 'Web Services', null, null, this.getTagsForStencil(gn, 'web services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'whats_new;',
					w * 55, h * 38, '', 'Whats New', null, null, this.getTagsForStencil(gn, 'whats new', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'writing_pen;',
					w * 54, h * 54, '', 'Writing, Pen', null, null, this.getTagsForStencil(gn, 'writing pen', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'writing_pencil;',
					w * 50, h * 50, '', 'Writing, Pencil', null, null, this.getTagsForStencil(gn, 'writing pencil', dt).join(' '))
		];
			
		this.addPalette('officeConcepts', 'Office / Concepts', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addOfficeDatabasesPalette = function()
	{
		var s = 'sketch=0;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.databases.';
		var s2 = 'sketch=0;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.databases.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.databases';
		var dt = 'office database db ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'address_book_store;',
					w * 50, h * 54, '', 'Address Book Store', null, null, this.getTagsForStencil(gn, 'address_book_store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_store;',
					w * 49, h * 53, '', 'Application Store', null, null, this.getTagsForStencil(gn, 'application store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database;',
					w * 35, h * 49, '', 'Database', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database;fillColor=#2072B8;',
					w * 35, h * 49, '', 'Database (blue)', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database;fillColor=#DA4026;',
					w * 35, h * 49, '', 'Database (orange)', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database;fillColor=#7FBA42;',
					w * 35, h * 49, '', 'Database (green)', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database;fillColor=#CCCBCB;',
					w * 35, h * 49, '', 'Database (ghosted)', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database;',
					w * 28, h * 38, '', 'Database (small)', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_availability_group;',
					w * 59, h * 59, '', 'Database Availability Group', null, null, this.getTagsForStencil(gn, 'availability group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_cube;',
					w * 47, h * 52, '', 'Database Cube', null, null, this.getTagsForStencil(gn, 'cube', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_cube;fillColor=#2072B8;',
					w * 47, h * 52, '', 'Database Cube (blue)', null, null, this.getTagsForStencil(gn, 'cube', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_cube;fillColor=#DA4026;',
					w * 47, h * 52, '', 'Database Cube (orange)', null, null, this.getTagsForStencil(gn, 'cube', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_cube;fillColor=#7FBA42;',
					w * 47, h * 52, '', 'Database Cube (green)', null, null, this.getTagsForStencil(gn, 'cube', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_cube;fillColor=#CCCBCB;',
					w * 47, h * 52, '', 'Database Cube (ghosted)', null, null, this.getTagsForStencil(gn, 'cube', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_mini_1;',
					w * 35, h * 27, '', 'Database, Mini', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_1;fillColor=#2072B8;',
					w * 35, h * 27, '', 'Database, Mini (blue)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_1;fillColor=#DA4026;',
					w * 35, h * 27, '', 'Database, Mini (orange)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_1;fillColor=#7FBA42;',
					w * 35, h * 27, '', 'Database, Mini (green)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_1;fillColor=#CCCBCB;',
					w * 35, h * 27, '', 'Database, Mini (ghosted)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_mini_2;',
					w * 35, h * 42, '', 'Database, Mini', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_2;fillColor=#2072B8;',
					w * 35, h * 42, '', 'Database, Mini (blue)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_2;fillColor=#DA4026;',
					w * 35, h * 42, '', 'Database, Mini (orange)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_2;fillColor=#7FBA42;',
					w * 35, h * 42, '', 'Database, Mini (green)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_2;fillColor=#CCCBCB;',
					w * 35, h * 42, '', 'Database, Mini (ghosted)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_mini_3;',
					w * 35, h * 57, '', 'Database, Mini', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_3;fillColor=#2072B8;',
					w * 35, h * 57, '', 'Database, Mini (blue)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_3;fillColor=#DA4026;',
					w * 35, h * 57, '', 'Database, Mini (orange)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_3;fillColor=#7FBA42;',
					w * 35, h * 57, '', 'Database, Mini (green)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database_mini_3;fillColor=#CCCBCB;',
					w * 35, h * 57, '', 'Database, Mini (ghosted)', null, null, this.getTagsForStencil(gn, 'Mini', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_mirror;',
					w * 60, h * 59, '', 'Database Mirror', null, null, this.getTagsForStencil(gn, 'mirror', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_mirror_witness_node;',
					w * 60, h * 59, '', 'Database Mirror Witness Node', null, null, this.getTagsForStencil(gn, 'mirror witness node', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_partition_2;',
					w * 57, h * 59, '', 'Database Partition', null, null, this.getTagsForStencil(gn, 'partition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_partition_3;',
					w * 57, h * 59, '', 'Database Partition', null, null, this.getTagsForStencil(gn, 'partition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_partition_4;',
					w * 57, h * 59, '', 'Database Partition', null, null, this.getTagsForStencil(gn, 'partition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_partition_5;',
					w * 57, h * 59, '', 'Database Partition', null, null, this.getTagsForStencil(gn, 'partition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_public_folder;',
					w * 53, h * 54, '', 'Database Public Folder', null, null, this.getTagsForStencil(gn, 'public folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server;',
					w * 43, h * 57, '', 'Database Server', null, null, this.getTagsForStencil(gn, 'server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_blue;',
					w * 43, h * 57, '', 'Database Server (blue)', null, null, this.getTagsForStencil(gn, 'server blue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_orange;',
					w * 43, h * 57, '', 'Database Server (orange)', null, null, this.getTagsForStencil(gn, 'server blue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_green;',
					w * 43, h * 57, '', 'Database Server (green)', null, null, this.getTagsForStencil(gn, 'server blue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_ghosted;',
					w * 43, h * 57, '', 'Database Server (ghosted)', null, null, this.getTagsForStencil(gn, 'server blue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mailbox_database;',
					w * 53, h * 55, '', 'Mailbox Database', null, null, this.getTagsForStencil(gn, 'mailbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'monitoring_store;',
					w * 58, h * 58, '', 'Monitoring Store', null, null, this.getTagsForStencil(gn, 'monitoring store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'unified_contact_store;',
					w * 54, h * 55, '', 'Unified Contact Store', null, null, this.getTagsForStencil(gn, 'unified contact store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_store;',
					w * 50, h * 54, '', 'Web Store', null, null, this.getTagsForStencil(gn, 'web store', dt).join(' '))
		];
			
		this.addPalette('officeDatabases', 'Office / Databases', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeDevicesPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.devices.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.devices';
		var dt = 'office device ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'bluetooth;',
					w * 56, h * 57, '', 'Bluetooth', null, null, this.getTagsForStencil(gn, 'bluetooth', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cd_dvd;',
					w * 49, h * 49, '', 'CD, DVD', null, null, this.getTagsForStencil(gn, 'cd dvd compact disc digital video drive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_android_proportional;',
					w * 17, h * 31, '', 'Cell Phone, Android, Proportional', null, null, this.getTagsForStencil(gn, 'cell phone android proportional', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_android_standalone;',
					w * 24, h * 44, '', 'Cell Phone, Android, Standalone', null, null, this.getTagsForStencil(gn, 'cell phone android standalone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_generic;',
					w * 26, h * 47, '', 'Cell Phone, Generic', null, null, this.getTagsForStencil(gn, 'cell phone generic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_generic;',
					w * 21, h * 37, '', 'Cell Phone, Generic (small)', null, null, this.getTagsForStencil(gn, 'cell phone generic small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_iphone_proportional;',
					w * 17, h * 29, '', 'Cell Phone, iPhone, Proportional', null, null, this.getTagsForStencil(gn, 'cell phone iphone proportional', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_iphone_standalone;',
					w * 25, h * 42, '', 'Cell Phone, iPhone, Standalone', null, null, this.getTagsForStencil(gn, 'cell phone iphone standalone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_windows_phone_proportional;',
					w * 16, h * 29, '', 'Cell Phone, Windows Phone, Proportional', null, null, this.getTagsForStencil(gn, 'cell phone windows phone proportional', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone_windows_phone_standalone;',
					w * 24, h * 42, '', 'Cell Phone, Windows Phone, Standalone', null, null, this.getTagsForStencil(gn, 'cell phone windows standalone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_jack;',
					w * 47, h * 47, '', 'Data Jack', null, null, this.getTagsForStencil(gn, 'data jack', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_update_service;',
					w * 50, h * 54, '', 'Device Update Service', null, null, this.getTagsForStencil(gn, 'device update service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'fax;',
					w * 57, h * 47, '', 'Fax', null, null, this.getTagsForStencil(gn, 'fax', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hard_disk;',
					w * 40, h * 54, '', 'Hard Disk', null, null, this.getTagsForStencil(gn, 'hard disk hdd drive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'headset;',
					w * 36, h * 48, '', 'Headset', null, null, this.getTagsForStencil(gn, 'headset', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ipad_mini;',
					w * 33, h * 47, '', 'iPad, Mini', null, null, this.getTagsForStencil(gn, 'ipad mini', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ip_gateway;',
					w * 59, h * 40, '', 'IP Gateway', null, null, this.getTagsForStencil(gn, 'ip gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ip_pbx;',
					w * 59, h * 39, '', 'IP PBX', null, null, this.getTagsForStencil(gn, 'ip pbx', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'laptop;',
					w * 58, h * 34, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lcd_monitor;',
					w * 58, h * 48, '', 'LCD Monitor', null, null, this.getTagsForStencil(gn, 'lcd monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lcd_monitor;',
					w * 39, h * 32, '', 'LCD Monitor (small)', null, null, this.getTagsForStencil(gn, 'lcd monitor small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'load_balancer;',
					w * 59, h * 39, '', 'Load Balancer', null, null, this.getTagsForStencil(gn, 'load balancer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mac_client;',
					w * 58, h * 48, '', 'Mac Client', null, null, this.getTagsForStencil(gn, 'mac client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'management_console;',
					w * 58, h * 48, '', 'Management Console', null, null, this.getTagsForStencil(gn, 'management console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'microphone;',
					w * 53, h * 37, '', 'Microphone', null, null, this.getTagsForStencil(gn, 'microphone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'modem;',
					w * 54, h * 34, '', 'Modem', null, null, this.getTagsForStencil(gn, 'modem', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'nic;',
					w * 57, h * 38, '', 'NIC', null, null, this.getTagsForStencil(gn, 'nic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'phone_digital;',
					w * 49, h * 42, '', 'Phone, Digital', null, null, this.getTagsForStencil(gn, 'phone digital', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'phone_traditional;',
					w * 48, h * 40, '', 'Phone, Traditional', null, null, this.getTagsForStencil(gn, 'phone traditional', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'phone_usb;',
					w * 58, h * 51, '', 'Phone, USB', null, null, this.getTagsForStencil(gn, 'phone usb', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'phone_voip;',
					w * 57, h * 51, '', 'Phone, VoIP', null, null, this.getTagsForStencil(gn, 'phone voip voice over internet protocol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'printer;',
					w * 56, h * 47, '', 'Printer', null, null, this.getTagsForStencil(gn, 'printer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'roundtable;',
					w * 50, h * 58, '', 'Roundtable', null, null, this.getTagsForStencil(gn, 'roundtable', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'router;',
					w * 55, h * 56, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'session_border_controller;',
					w * 59, h * 52, '', 'Session Border Controller', null, null, this.getTagsForStencil(gn, 'session border controller', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'shadowed_router;',
					w * 59, h * 59, '', 'Shadowed Router', null, null, this.getTagsForStencil(gn, 'shadowed router', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'stylus;',
					w * 57, h * 57, '', 'Stylus', null, null, this.getTagsForStencil(gn, 'stylus', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'switch;',
					w * 55, h * 18, '', 'Switch', null, null, this.getTagsForStencil(gn, 'switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tablet_android;',
					w * 56, h * 37, '', 'Tablet, Android', null, null, this.getTagsForStencil(gn, 'tablet android', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tablet_ipad;',
					w * 39, h * 52, '', 'Tablet, iPad', null, null, this.getTagsForStencil(gn, 'tablet ipad', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tablet_windows_7inch;',
					w * 34, h * 47, '', 'Tablet, Windows, 7inch', null, null, this.getTagsForStencil(gn, 'tablet windows seven inch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tablet_windows_8;',
					w * 56, h * 35, '', 'Tablet, Windows 8', null, null, this.getTagsForStencil(gn, 'tablet windows eight', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tv;',
					w * 59, h * 45, '', 'TV', null, null, this.getTagsForStencil(gn, 'tv television', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_camera;',
					w * 52, h * 25, '', 'Video Camera', null, null, this.getTagsForStencil(gn, 'video camera', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_gateway;',
					w * 59, h * 41, '', 'Video Gateway', null, null, this.getTagsForStencil(gn, 'video gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'webcam;',
					w * 40, h * 50, '', 'Webcam', null, null, this.getTagsForStencil(gn, 'webcam', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'webcam_hd;',
					w * 56, h * 59, '', 'Webcam, HD', null, null, this.getTagsForStencil(gn, 'webcam hd high definition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workstation;',
					w * 53, h * 56, '', 'Workstation', null, null, this.getTagsForStencil(gn, 'workstation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workstation_pc;',
					w * 53, h * 59, '', 'Workstation, PC', null, null, this.getTagsForStencil(gn, 'workstation pc personal computer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workstation_visual_studio;',
					w * 53, h * 59, '', 'Workstation, Visual Studio', null, null, this.getTagsForStencil(gn, 'workstation visual studio', dt).join(' '))
		];
			
		this.addPalette('officeDevices', 'Office / Devices', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeSecurityPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.security.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.security.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.security';
		var dt = 'office security ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'active_directory;',
					w * 53, h * 46, '', 'Active Directory', null, null, this.getTagsForStencil(gn, 'active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'address_book_policies;',
					w * 55, h * 53, '', 'Address Book Policies', null, null, this.getTagsForStencil(gn, 'address book policies', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'certificate;',
					w * 58, h * 50, '', 'Certificate', null, null, this.getTagsForStencil(gn, 'certificate', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'certificate;',
					w * 39, h * 33, '', 'Certificate (small)', null, null, this.getTagsForStencil(gn, 'certificate small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'credentials;',
					w * 56, h * 58, '', 'Credentials', null, null, this.getTagsForStencil(gn, 'credentials', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'domain;',
					w * 53, h * 46, '', 'Domain', null, null, this.getTagsForStencil(gn, 'domain', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'domain;',
					w * 41, h * 36, '', 'Domain (small)', null, null, this.getTagsForStencil(gn, 'domain', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_address_policy;',
					w * 55, h * 53, '', 'Email Address Policy', null, null, this.getTagsForStencil(gn, 'email address policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'federation_service;',
					w * 58, h * 59, '', 'Federation Service', null, null, this.getTagsForStencil(gn, 'federation service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'federation_trust;',
					w * 58, h * 59, '', 'Federation Trust', null, null, this.getTagsForStencil(gn, 'federation trust', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'irm_protected_message;',
					w * 56, h * 50, '', 'IRM-Protected Message', null, null, this.getTagsForStencil(gn, 'irm protected message', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'key_permissions;',
					w * 25, h * 53, '', 'Key, Permissions', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'key_permissions;fillColor=#2072B8;',
					w * 25, h * 53, '', 'Key, Permissions (blue)', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'key_permissions;fillColor=#DA4026;',
					w * 25, h * 53, '', 'Key, Permissions (orange)', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'key_permissions;fillColor=#7FBA42;',
					w * 25, h * 53, '', 'Key, Permissions (green)', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'key_permissions;fillColor=#CCCBCB;',
					w * 25, h * 53, '', 'Key, Permissions (ghosted)', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'key_permissions;',
					w * 19, h * 40, '', 'Key, Permissions (small)', null, null, this.getTagsForStencil(gn, 'key permissions small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_protected;',
					w * 38, h * 52, '', 'Lock, Protected', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_protected;fillColor=#2072B8;',
					w * 38, h * 52, '', 'Lock, Protected (blue)', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_protected;fillColor=#DA4026;',
					w * 38, h * 52, '', 'Lock, Protected (orange)', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_protected;fillColor=#7FBA42;',
					w * 38, h * 52, '', 'Lock, Protected (green)', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_protected;fillColor=#CCCBCB;',
					w * 38, h * 52, '', 'Lock, Protected (ghosted)', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_protected;',
					w * 28, h * 37, '', 'Lock, Protected (small)', null, null, this.getTagsForStencil(gn, 'lock protected small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_unprotected;',
					w * 38, h * 55, '', 'Lock, Unprotected', null, null, this.getTagsForStencil(gn, 'lock unprotected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_unprotected;fillColor=#2072B8;',
					w * 38, h * 55, '', 'Lock, Unprotected (blue)', null, null, this.getTagsForStencil(gn, 'lock unprotected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_unprotected;fillColor=#DA4026;',
					w * 38, h * 55, '', 'Lock, Unprotected (orange)', null, null, this.getTagsForStencil(gn, 'lock unprotected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_unprotected;fillColor=#7FBA42;',
					w * 38, h * 55, '', 'Lock, Unprotected (green)', null, null, this.getTagsForStencil(gn, 'lock unprotected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock_unprotected;fillColor=#CCCBCB;',
					w * 38, h * 55, '', 'Lock, Unprotected (ghosted)', null, null, this.getTagsForStencil(gn, 'lock unprotected', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_unprotected;',
					w * 28, h * 40, '', 'Lock, Unprotected (small)', null, null, this.getTagsForStencil(gn, 'lock unprotected small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_with_key_security;',
					w * 47, h * 58, '', 'Lock With Key, Security', null, null, this.getTagsForStencil(gn, 'lock with key security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_with_key_security_blue;',
					w * 47, h * 58, '', 'Lock With Key, Security (blue)', null, null, this.getTagsForStencil(gn, 'lock with key security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_with_key_security_orange;',
					w * 47, h * 58, '', 'Lock With Key, Security (orange)', null, null, this.getTagsForStencil(gn, 'lock with key security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_with_key_security_green;',
					w * 47, h * 58, '', 'Lock With Key, Security (green)', null, null, this.getTagsForStencil(gn, 'lock with key security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lock_with_key_security_ghosted;',
					w * 47, h * 58, '', 'Lock With Key, Security (ghosted)', null, null, this.getTagsForStencil(gn, 'lock with key security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'management_role;',
					w * 45, h * 45, '', 'Management Role', null, null, this.getTagsForStencil(gn, 'management role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'policy;',
					w * 53, h * 49, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'policy;',
					w * 39, h * 36, '', 'Policy (small)', null, null, this.getTagsForStencil(gn, 'policy small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'protected_voice_mail;',
					w * 59, h * 51, '', 'Protected Voice Mail', null, null, this.getTagsForStencil(gn, 'protected voice mail', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'retention_policy;',
					w * 54, h * 55, '', 'Retention Policy', null, null, this.getTagsForStencil(gn, 'retention policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'retention_policy_tag;',
					w * 56, h * 58, '', 'Retention Policy Tag', null, null, this.getTagsForStencil(gn, 'retention policy tag', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'role_assignment_policy;',
					w * 55, h * 54, '', 'Role Assignment Policy', null, null, this.getTagsForStencil(gn, 'role assignment policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'role_group;',
					w * 59, h * 56, '', 'Role Group', null, null, this.getTagsForStencil(gn, 'role group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'secure_messaging;',
					w * 55, h * 46, '', 'Secure Messaging', null, null, this.getTagsForStencil(gn, 'secure messaging', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'security_access_portal;',
					w * 64, h * 55, '', 'Security Access Portal', null, null, this.getTagsForStencil(gn, 'security access portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sharing_policy;',
					w * 56, h * 53, '', 'Sharing Policy', null, null, this.getTagsForStencil(gn, 'sharing policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'split_domain_user;',
					w * 59, h * 55, '', 'Split-Domain User', null, null, this.getTagsForStencil(gn, 'split domain user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'token;',
					w * 41, h * 52, '', 'Token', null, null, this.getTagsForStencil(gn, 'token', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'token;',
					w * 29, h * 37, '', 'Token (small)', null, null, this.getTagsForStencil(gn, 'token small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'token_service;',
					w * 60, h * 56, '', 'Token Service', null, null, this.getTagsForStencil(gn, 'token service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'trusted_application_server;',
					w * 46, h * 57, '', 'Trusted Application Server', null, null, this.getTagsForStencil(gn, 'trusted application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_mailbox_policy;',
					w * 55, h * 53, '', 'UM Mailbox Policy', null, null, this.getTagsForStencil(gn, 'um mailbox policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'universal_security_group;',
					w * 58, h * 58, '', 'Universal Security Group', null, null, this.getTagsForStencil(gn, 'universal security group', dt).join(' '))
		];
			
		this.addPalette('officeSecurity', 'Office / Security', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeServersPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.servers.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.servers.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.servers';
		var dt = 'office server ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + '3rd_party_mail_server;',
					w * 47, h * 59, '', '3rd Party Mail Server', null, null, this.getTagsForStencil(gn, '3rd party mail server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_proxy;',
					w * 44, h * 55, '', 'Active Directory Federation Services Proxy', null, null, this.getTagsForStencil(gn, 'active directory federation services proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_server;',
					w * 45, h * 56, '', 'Active Directory Federation Services Server', null, null, this.getTagsForStencil(gn, 'active directory federation services server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_server_blue;',
					w * 45, h * 56, '', 'Active Directory Federation Services Server (blue)', null, null, this.getTagsForStencil(gn, 'active directory federation services server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_server_orange;',
					w * 45, h * 56, '', 'Active Directory Federation Services Server (orange)', null, null, this.getTagsForStencil(gn, 'active directory federation services server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_server_green;',
					w * 45, h * 56, '', 'Active Directory Federation Services Server (green)', null, null, this.getTagsForStencil(gn, 'active directory federation services server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'active_directory_federation_services_server_ghosted;',
					w * 45, h * 56, '', 'Active Directory Federation Services Server (ghosted)', null, null, this.getTagsForStencil(gn, 'active directory federation services server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server;',
					w * 46, h * 56, '', 'Application Server', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server_blue;',
					w * 46, h * 56, '', 'Application Server (blue)', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server_orange;',
					w * 46, h * 56, '', 'Application Server (orange)', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server_green;',
					w * 46, h * 56, '', 'Application Server (green)', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server_ghosted;',
					w * 46, h * 56, '', 'Application Server (ghosted)', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'call_admission_control_service;',
					w * 50, h * 60, '', 'Call Admission Control Service', null, null, this.getTagsForStencil(gn, 'call admission control service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'certificate_authority;',
					w * 46, h * 59, '', 'Certificate Authority', null, null, this.getTagsForStencil(gn, 'certificate authority', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cluster_server;',
					w * 49, h * 59, '', 'Cluster Server', null, null, this.getTagsForStencil(gn, 'cluster_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server;',
					w * 43, h * 56, '', 'Database Server', null, null, this.getTagsForStencil(gn, 'database_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_blue;',
					w * 43, h * 56, '', 'Database Server (blue)', null, null, this.getTagsForStencil(gn, 'database_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_orange;',
					w * 43, h * 56, '', 'Database Server (orange)', null, null, this.getTagsForStencil(gn, 'database_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_green;',
					w * 43, h * 56, '', 'Database Server (green)', null, null, this.getTagsForStencil(gn, 'database_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server_ghosted;',
					w * 43, h * 56, '', 'Database Server (ghosted)', null, null, this.getTagsForStencil(gn, 'database_server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datacenter;',
					w * 53, h * 53, '', 'Datacenter', null, null, this.getTagsForStencil(gn, 'datacenter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dirsync_server;',
					w * 47, h * 56, '', 'DirSync Server', null, null, this.getTagsForStencil(gn, 'dirsync server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'domain_controller;',
					w * 45, h * 55, '', 'Domain Controller', null, null, this.getTagsForStencil(gn, 'domain controller', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'excahnge_client_access_server_role;',
					w * 52, h * 59, '', 'Exchange Client Access Server Role', null, null, this.getTagsForStencil(gn, 'excahnge client access server role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_edge_transport_server_role;',
					w * 52, h * 55, '', 'Exchange Edge Transport Server Role', null, null, this.getTagsForStencil(gn, 'exchange edge transport server role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_hub_transport_server_role;',
					w * 52, h * 59, '', 'Exchange Hub Transport Server Role', null, null, this.getTagsForStencil(gn, 'exchange hub transport server role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_mailbox_server_role;',
					w * 52, h * 59, '', 'Exchange Mailbox Server Role', null, null, this.getTagsForStencil(gn, 'exchange mailbox server role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_um_server_role;',
					w * 52, h * 59, '', 'Exchange UM Server Role', null, null, this.getTagsForStencil(gn, 'exchange um server role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_client_access_server;',
					w * 57, h * 59, '', 'Exchange Client Access Server', null, null, this.getTagsForStencil(gn, 'exchange client access server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_edge_transport_server;',
					w * 57, h * 55, '', 'Exchange Edge Transport Server', null, null, this.getTagsForStencil(gn, 'exchange edge transport server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_mailbox_server;',
					w * 57, h * 59, '', 'Exchange Mailbox Server', null, null, this.getTagsForStencil(gn, 'exchange mailbox server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_server;',
					w * 57, h * 55, '', 'Exchange Server', null, null, this.getTagsForStencil(gn, 'exchange server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file_server;',
					w * 45, h * 56, '', 'File Server', null, null, this.getTagsForStencil(gn, 'file server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hybrid_server;',
					w * 59, h * 52, '', 'Hybrid Server', null, null, this.getTagsForStencil(gn, 'hybrid server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mainframe;',
					w * 58, h * 42, '', 'Mainframe', null, null, this.getTagsForStencil(gn, 'mainframe', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mainframe_host;',
					w * 44, h * 42, '', 'Mainframe Host', null, null, this.getTagsForStencil(gn, 'mainframe host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'monitoring_sql_reporting_services;',
					w * 50, h * 59, '', 'Monitoring SQL Reporting Services', null, null, this.getTagsForStencil(gn, 'monitoring sql reporting services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'network;',
					w * 34, h * 57, '', 'Network', null, null, this.getTagsForStencil(gn, 'network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'office_web_apps_server;',
					w * 52, h * 56, '', 'Office Web Apps Server', null, null, this.getTagsForStencil(gn, 'office web apps server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'on_premises_server;',
					w * 44, h * 58, '', 'On Premises Server', null, null, this.getTagsForStencil(gn, 'on premises server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'physical_host;fillColor=#2072B8;',
					w * 27, h * 52, '', 'Physical Host', null, null, this.getTagsForStencil(gn, 'physical host', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'physical_host_farm;fillColor=#2072B8;',
					w * 56, h * 49, '', 'Physical Host Farm', null, null, this.getTagsForStencil(gn, 'physical host farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'reverse_proxy;',
					w * 41, h * 53, '', 'Reverse Proxy', null, null, this.getTagsForStencil(gn, 'reverse proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'scom;',
					w * 56, h * 53, '', 'SCOM', null, null, this.getTagsForStencil(gn, 'scom', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_disaster;',
					w * 46, h * 57, '', 'Server Disaster', null, null, this.getTagsForStencil(gn, 'server disaster', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_farm;',
					w * 56, h * 49, '', 'Server Farm', null, null, this.getTagsForStencil(gn, 'server_farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_farm;fillColor=#2072B8;',
					w * 56, h * 49, '', 'Server Farm (blue)', null, null, this.getTagsForStencil(gn, 'server_farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_farm;fillColor=#DA4026;',
					w * 56, h * 49, '', 'Server Farm (orange)', null, null, this.getTagsForStencil(gn, 'server_farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_farm;fillColor=#7FBA42;',
					w * 56, h * 49, '', 'Server Farm (green)', null, null, this.getTagsForStencil(gn, 'server_farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_farm;fillColor=#CCCBCB;',
					w * 56, h * 49, '', 'Server Farm (ghosted)', null, null, this.getTagsForStencil(gn, 'server_farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_generic;',
					w * 27, h * 52, '', 'Server, Generic', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'server_generic;fillColor=#2072B8;',
					w * 27, h * 52, '', 'Server, Generic (blue)', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'server_generic;fillColor=#DA4026;',
					w * 27, h * 52, '', 'Server, Generic (orange)', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'server_generic;fillColor=#7FBA42;',
					w * 27, h * 52, '', 'Server, Generic (green)', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'server_generic;fillColor=#CCCBCB;',
					w * 27, h * 52, '', 'Server, Generic (ghosted)', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_generic;',
					w * 20, h * 39, '', 'Server, Generic (small)', null, null, this.getTagsForStencil(gn, 'server generic small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_side_code;',
					w * 49, h * 56, '', 'Server Side Code', null, null, this.getTagsForStencil(gn, 'server side code', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sharepoint_server;',
					w * 56, h * 55, '', 'Sharepoint Server', null, null, this.getTagsForStencil(gn, 'sharepoint server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_back_end_server;',
					w * 54, h * 60, '', 'Skype for Business Back End Server', null, null, this.getTagsForStencil(gn, 'skype for business back end server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_back_end_server_mirror;',
					w * 54, h * 60, '', 'Skype for Business Back End Server Mirror', null, null, this.getTagsForStencil(gn, 'skype for business back end server mirror', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_director;',
					w * 54, h * 55, '', 'Skype for Business Director', null, null, this.getTagsForStencil(gn, 'skype for business director', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_director_array;',
					w * 70, h * 60, '', 'Skype for Business Director Array', null, null, this.getTagsForStencil(gn, 'skype for business director array', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_edge_server;',
					w * 54, h * 55, '', 'Skype for Business Edge Server', null, null, this.getTagsForStencil(gn, 'skype for business edge server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_edge_server_pool;',
					w * 70, h * 60, '', 'Skype for Business Edge Server Pool', null, null, this.getTagsForStencil(gn, 'skype for business edge server pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_front_end_pool;',
					w * 70, h * 60, '', 'Skype for Business Front End Pool', null, null, this.getTagsForStencil(gn, 'skype for business front end pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_front_end_server;',
					w * 54, h * 60, '', 'Skype for Business Front End Server', null, null, this.getTagsForStencil(gn, 'skype for business front end server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_mediation_server;',
					w * 54, h * 60, '', 'Skype for Business Mediation Server', null, null, this.getTagsForStencil(gn, 'skype for business mediation server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_monitoring_server;',
					w * 54, h * 60, '', 'Skype for Business Monitoring Server', null, null, this.getTagsForStencil(gn, 'skype for business monitoring server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_persistent_chat_server;',
					w * 54, h * 58, '', 'Skype for Business Persistent Chat Server', null, null, this.getTagsForStencil(gn, 'skype for business persistent chat server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_server;',
					w * 54, h * 55, '', 'Skype for Business Server', null, null, this.getTagsForStencil(gn, 'skype for business server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sql_server;',
					w * 43, h * 56, '', 'SQL Server', null, null, this.getTagsForStencil(gn, 'sql server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'survivable_branch_appliance;',
					w * 37, h * 59, '', 'Survivable Branch Appliance', null, null, this.getTagsForStencil(gn, 'survivable branch appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'survivable_branch_server;',
					w * 42, h * 58, '', 'Survivable Branch Server', null, null, this.getTagsForStencil(gn, 'survivable branch server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'topology_builder;',
					w * 59, h * 59, '', 'Topology Builder', null, null, this.getTagsForStencil(gn, 'topology builder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'trusted_application_pool;',
					w * 59, h * 59, '', 'Trusted Application Pool', null, null, this.getTagsForStencil(gn, 'trusted application pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'trusted_application_server;',
					w * 43, h * 52, '', 'Trusted Application Server', null, null, this.getTagsForStencil(gn, 'trusted application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tunnel_angled;',
					w * 55, h * 35, '', 'Tunnel Angled', null, null, this.getTagsForStencil(gn, 'tunnel angled', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tunnel_straight;',
					w * 59, h * 10, '', 'Tunnel Straight', null, null, this.getTagsForStencil(gn, 'tunnel straight', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'universal_security_group;',
					w * 58, h * 58, '', 'Universal Security Group', null, null, this.getTagsForStencil(gn, 'universal security group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_interop_server;',
					w * 54, h * 60, '', 'Video Interop Server', null, null, this.getTagsForStencil(gn, 'video interop server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_application_server;',
					w * 48, h * 55, '', 'Virtual Application Server', null, null, this.getTagsForStencil(gn, 'virtual application server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'virtual_application_server;fillColor=#2072B8;',
					w * 48, h * 55, '', 'Virtual Application Server (blue)', null, null, this.getTagsForStencil(gn, 'virtual application server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_database_server;',
					w * 41, h * 56, '', 'Virtual Database Server', null, null, this.getTagsForStencil(gn, 'virtual database server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'virtual_database_server;fillColor=#2072B8;',
					w * 41, h * 56, '', 'Virtual Database Server (blue)', null, null, this.getTagsForStencil(gn, 'virtual database server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_server;',
					w * 28, h * 52, '', 'Virtual Server', null, null, this.getTagsForStencil(gn, 'virtual server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'virtual_server;fillColor=#2072B8;',
					w * 28, h * 52, '', 'Virtual Server (blue)', null, null, this.getTagsForStencil(gn, 'virtual server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_server;',
					w * 20, h * 37, '', 'Virtual Server (small)', null, null, this.getTagsForStencil(gn, 'virtual server small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_web_server;',
					w * 44, h * 55, '', 'Virtual Web Server', null, null, this.getTagsForStencil(gn, 'virtual web server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'virtual_web_server;fillColor=#2072B8;',
					w * 44, h * 55, '', 'Virtual Web Server (blue)', null, null, this.getTagsForStencil(gn, 'virtual web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vociemail_preview_partner;',
					w * 46, h * 56, '', 'Vociemail Preview Partner', null, null, this.getTagsForStencil(gn, 'vociemail preview partner', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_server;',
					w * 48, h * 57, '', 'Web Server', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_server_blue;',
					w * 48, h * 57, '', 'Web Server (blue)', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_server_orange;',
					w * 48, h * 57, '', 'Web Server (orange)', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_server_green;',
					w * 48, h * 57, '', 'Web Server (green)', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_server_ghosted;',
					w * 48, h * 57, '', 'Web Server (ghosted)', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'windows_router;',
					w * 52, h * 59, '', 'Windows Router', null, null, this.getTagsForStencil(gn, 'windows router', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'windows_server;',
					w * 52, h * 55, '', 'Windows Server', null, null, this.getTagsForStencil(gn, 'windows server', dt).join(' '))
		];
			
		this.addPalette('officeServers', 'Office / Servers', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeServicesPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.services.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.services';
		var dt = 'office service ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + '3rd_party_service;',
					w * 53, h * 54, '', '3rd Party Service', null, null, this.getTagsForStencil(gn, '3rd party service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'access_services;',
					w * 59, h * 49, '', 'Access Services', null, null, this.getTagsForStencil(gn, 'access services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'business_connectivity_services;',
					w * 34, h * 51, '', 'Business Connectivity Services', null, null, this.getTagsForStencil(gn, 'business connectivity services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'call_admission_control_service;',
					w * 50, h * 59, '', 'Call Admission Control Service', null, null, this.getTagsForStencil(gn, 'call admission control service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'central_management_service;',
					w * 51, h * 54, '', 'Central Management Service', null, null, this.getTagsForStencil(gn, 'central management service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'conference_announcement_service;',
					w * 59, h * 59, '', 'Conference Announcement Service', null, null, this.getTagsForStencil(gn, 'conference announcement service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_update_service;',
					w * 50, h * 54, '', 'Device Update Service', null, null, this.getTagsForStencil(gn, 'device update service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_service;',
					w * 58, h * 48, '', 'Email Service', null, null, this.getTagsForStencil(gn, 'email service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'excel_services;',
					w * 60, h * 49, '', 'Excel Services', null, null, this.getTagsForStencil(gn, 'excel services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'federation_service;',
					w * 58, h * 59, '', 'Federation Service', null, null, this.getTagsForStencil(gn, 'federation service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_storage_service;',
					w * 65, h * 58, '', 'Lync Storage Service', null, null, this.getTagsForStencil(gn, 'lync storage service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lync_web_app_client;',
					w * 83, h * 51, '', 'Lync Web App Client', null, null, this.getTagsForStencil(gn, 'lync web app client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mobility_service;',
					w * 45, h * 53, '', 'Mobility Service', null, null, this.getTagsForStencil(gn, 'mobility service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'network_file_share_service;',
					w * 55, h * 53, '', 'Network File Share Service', null, null, this.getTagsForStencil(gn, 'network file share service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'online_hosted_services;',
					w * 56, h * 52, '', 'Online Hosted Services', null, null, this.getTagsForStencil(gn, 'online hosted services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'outlook_web_app;',
					w * 83, h * 51, '', 'Outlook Web App', null, null, this.getTagsForStencil(gn, 'outlook web app', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'powerpoint_automation_services;',
					w * 59, h * 49, '', 'PowerPoint Automation Services', null, null, this.getTagsForStencil(gn, 'powerpoint automation services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'push_notification_service;',
					w * 50, h * 58, '', 'Push Notification Service', null, null, this.getTagsForStencil(gn, 'push notification service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'registrar_service;',
					w * 56, h * 52, '', 'Registrar Service', null, null, this.getTagsForStencil(gn, 'registrar service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'response_group_service;',
					w * 58, h * 54, '', 'Response Group Service', null, null, this.getTagsForStencil(gn, 'response group service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_storage_service;',
					w * 62, h * 58, '', 'Skype for Business Storage Service', null, null, this.getTagsForStencil(gn, 'skype for business storage service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_services;',
					w * 59, h * 59, '', 'User Services', null, null, this.getTagsForStencil(gn, 'user services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'verification_service;',
					w * 57, h * 59, '', 'Verification Service', null, null, this.getTagsForStencil(gn, 'verification service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_services;',
					w * 60, h * 56, '', 'Web Services', null, null, this.getTagsForStencil(gn, 'web services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'word_automation_services;',
					w * 60, h * 49, '', 'Word Automation Services', null, null, this.getTagsForStencil(gn, 'word automation services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'xmpp_service;',
					w * 58, h * 52, '', 'XMPP Service', null, null, this.getTagsForStencil(gn, 'xmpp service', dt).join(' '))
		];
			
		this.addPalette('officeServices', 'Office / Services', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeSitesPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.sites.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.sites.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.sites';
		var dt = 'office site ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'access_services;',
					w * 59, h * 49, '', 'Access Services', null, null, this.getTagsForStencil(gn, 'access services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'blog_site;',
					w * 56, h * 49, '', 'Blog Site', null, null, this.getTagsForStencil(gn, 'blog site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'business_connectivity_services;',
					w * 34, h * 51, '', 'Business Connectivity Services', null, null, this.getTagsForStencil(gn, 'business connectivity services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'excel_services;',
					w * 60, h * 49, '', 'Excel Services', null, null, this.getTagsForStencil(gn, 'excel services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'meeting_workspace_site;',
					w * 58, h * 50, '', 'Meeting Workspace Site', null, null, this.getTagsForStencil(gn, 'meeting workspace site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'my_site;',
					w * 58, h * 49, '', 'My Site', null, null, this.getTagsForStencil(gn, 'my site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'powerpoint_automation_services;',
					w * 59, h * 49, '', 'PowerPoint Automation Services', null, null, this.getTagsForStencil(gn, 'powerpoint automation services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'publish;',
					w * 57, h * 48, '', 'Publish', null, null, this.getTagsForStencil(gn, 'publish', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'site_collection;',
					w * 52, h * 40, '', 'Site Collection', null, null, this.getTagsForStencil(gn, 'site collection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'site_shared;',
					w * 56, h * 50, '', 'Site Shared', null, null, this.getTagsForStencil(gn, 'site shared', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'site_team;',
					w * 60, h * 49, '', 'Site, Team', null, null, this.getTagsForStencil(gn, 'site team', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'subsite;',
					w * 53, h * 40, '', 'Subsite', null, null, this.getTagsForStencil(gn, 'substitute', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'subsite;fillColor=#2072B8;',
					w * 53, h * 40, '', 'Subsite (blue)', null, null, this.getTagsForStencil(gn, 'substitute', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'subsite;fillColor=#DA4026;',
					w * 53, h * 40, '', 'Subsite (orange)', null, null, this.getTagsForStencil(gn, 'substitute', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'subsite;fillColor=#7FBA42;',
					w * 53, h * 40, '', 'Subsite (green)', null, null, this.getTagsForStencil(gn, 'substitute', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'subsite;fillColor=#CCCBCB;',
					w * 53, h * 40, '', 'Subsite (ghosted)', null, null, this.getTagsForStencil(gn, 'substitute', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'subsite;',
					w * 38, h * 29, '', 'Subsite (small)', null, null, this.getTagsForStencil(gn, 'substitute small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'upgrade_site;',
					w * 59, h * 48, '', 'Upgrade Site', null, null, this.getTagsForStencil(gn, 'upgrade site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'website;',
					w * 59, h * 49, '', 'Website', null, null, this.getTagsForStencil(gn, 'website', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'website_public;',
					w * 58, h * 48, '', 'Website, Public', null, null, this.getTagsForStencil(gn, 'website public', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wiki_site;',
					w * 59, h * 50, '', 'Wiki Site', null, null, this.getTagsForStencil(gn, 'wiki_site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'word_automation_services;',
					w * 60, h * 49, '', 'Word Automation Services', null, null, this.getTagsForStencil(gn, 'word automation services', dt).join(' '))
		];
			
		this.addPalette('officeSites', 'Office / Sites', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addOfficeUsersPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#505050;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.users.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;align=center;shape=mxgraph.office.users.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.office.users';
		var dt = 'office user ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'administrator;',
					w * 58, h * 56, '', 'Administrator', null, null, this.getTagsForStencil(gn, 'administrator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'approver;',
					w * 59, h * 55, '', 'Approver', null, null, this.getTagsForStencil(gn, 'approver', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'call_center_agent;',
					w * 46, h * 55, '', 'Call Center Agent', null, null, this.getTagsForStencil(gn, 'call center agent', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'communications;',
					w * 54, h * 58, '', 'Communications', null, null, this.getTagsForStencil(gn, 'communications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'conferencing_attendant;',
					w * 53, h * 59, '', 'Conferencing Attendant', null, null, this.getTagsForStencil(gn, 'conferencing attendant', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'credentials;',
					w * 56, h * 58, '', 'Credentials', null, null, this.getTagsForStencil(gn, 'credentials', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'csv_file;',
					w * 59, h * 43, '', 'CSV File', null, null, this.getTagsForStencil(gn, 'csv comma separated value file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'distribution_group;',
					w * 58, h * 59, '', 'Distribution Group', null, null, this.getTagsForStencil(gn, 'distribution group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dynamic_distribution_group;',
					w * 58, h * 59, '', 'Dynamic Distribution Group', null, null, this.getTagsForStencil(gn, 'dynamic distribution group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mail_user;',
					w * 58, h * 59, '', 'Mail User', null, null, this.getTagsForStencil(gn, 'mail user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'meeting;',
					w * 59, h * 38, '', 'Meeting', null, null, this.getTagsForStencil(gn, 'meeting', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mobile_user;',
					w * 59, h * 56, '', 'Mobile User', null, null, this.getTagsForStencil(gn, 'mobile user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'online_user;',
					w * 54, h * 43, '', 'Online User', null, null, this.getTagsForStencil(gn, 'online user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'on_premises_user;',
					w * 49, h * 59, '', 'On-Premises User', null, null, this.getTagsForStencil(gn, 'on premises user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'outlook_user;',
					w * 63, h * 55, '', 'Outlook User', null, null, this.getTagsForStencil(gn, 'outlook user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'response_group;',
					w * 58, h * 54, '', 'Response Group', null, null, this.getTagsForStencil(gn, 'response group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'role_group;',
					w * 59, h * 56, '', 'Role Group', null, null, this.getTagsForStencil(gn, 'role group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_commercial_user;',
					w * 59, h * 56, '', 'Skype Commercial User', null, null, this.getTagsForStencil(gn, 'skype commercial user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'skype_for_business_user;',
					w * 59, h * 56, '', 'Skype for Business User', null, null, this.getTagsForStencil(gn, 'skype for business user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tenant_admin;',
					w * 56, h * 58, '', 'Tenant Admin', null, null, this.getTagsForStencil(gn, 'tenant admin', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'um_enabled_user;',
					w * 58, h * 59, '', 'UM-Enabled User', null, null, this.getTagsForStencil(gn, 'um enabled user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'universal_security_group;',
					w * 58, h * 58, '', 'Universal Security Group', null, null, this.getTagsForStencil(gn, 'universal security group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user;',
					w * 46, h * 50, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'user;fillColor=#2072B8;',
					w * 46, h * 50, '', 'User (blue)', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'user;fillColor=#DA4026;',
					w * 46, h * 50, '', 'User (orange)', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'user;fillColor=#7FBA42;',
					w * 46, h * 50, '', 'User (green)', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'user;fillColor=#CCCBCB;',
					w * 46, h * 50, '', 'User (ghosted)', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user;',
					w * 32, h * 35, '', 'User (small)', null, null, this.getTagsForStencil(gn, 'user small', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users;',
					w * 46, h * 50, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'users;fillColor=#2072B8;',
					w * 46, h * 50, '', 'Users (blue)', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'users;fillColor=#DA4026;',
					w * 46, h * 50, '', 'Users (orange)', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'users;fillColor=#7FBA42;',
					w * 46, h * 50, '', 'Users (green)', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'users;fillColor=#CCCBCB;',
					w * 46, h * 50, '', 'Users (ghosted)', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users_two;',
					w * 57, h * 43, '', 'Users, Two', null, null, this.getTagsForStencil(gn, 'users two', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users_two;fillColor=#2072B8;',
					w * 57, h * 43, '', 'Users, Two (blue)', null, null, this.getTagsForStencil(gn, 'users two', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users_two;fillColor=#DA4026;',
					w * 57, h * 43, '', 'Users, Two (orange)', null, null, this.getTagsForStencil(gn, 'users two', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users_two;fillColor=#7FBA42;',
					w * 57, h * 43, '', 'Users, Two (green)', null, null, this.getTagsForStencil(gn, 'users two', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'users_two;fillColor=#CCCBCB;',
					w * 57, h * 43, '', 'Users, Two (ghosted)', null, null, this.getTagsForStencil(gn, 'users two', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_accounts;',
					w * 59, h * 59, '', 'User Accounts', null, null, this.getTagsForStencil(gn, 'user accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_external;',
					w * 59, h * 50, '', 'User External', null, null, this.getTagsForStencil(gn, 'user external', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_services;',
					w * 59, h * 59, '', 'User Services', null, null, this.getTagsForStencil(gn, 'user services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_store;',
					w * 50, h * 55, '', 'User Store', null, null, this.getTagsForStencil(gn, 'user store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'writer;',
					w * 54, h * 59, '', 'Writer', null, null, this.getTagsForStencil(gn, 'writer', dt).join(' '))
		];
			
		this.addPalette('officeUsers', 'Office / Users', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
})();
