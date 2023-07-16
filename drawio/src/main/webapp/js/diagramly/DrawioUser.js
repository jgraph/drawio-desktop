/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
DrawioUser = function(id, email, displayName, pictureUrl, locale)
{
	// Unique ID of the user for the current storage system
	this.id = id;
	
	// Email address of the user
	this.email = email;
	
	// Display name of the user
	this.displayName = displayName;
	
	// URL to an image of the user
	this.pictureUrl = pictureUrl;
	
	// country code locale of the user
	this.locale = locale;
};
