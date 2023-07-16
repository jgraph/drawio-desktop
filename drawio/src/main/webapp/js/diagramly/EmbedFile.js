/**
 * Copyright (c) 2020, JGraph Ltd
 * Copyright (c) 2020, Gaudenz Alder
 */
EmbedFile = function(ui, data, desc)
{
	DrawioFile.call(this, ui, data);
	
	this.desc = desc || {};
	this.mode = App.MODE_EMBED;
};

//Extends DrawioFile
mxUtils.extend(EmbedFile, DrawioFile);

EmbedFile.prototype.getMode = function()
{
	return this.mode;
};

EmbedFile.prototype.getTitle = function()
{
	return this.desc.title || '';
};

//This class need to be implemented by integrations if some file features like real-time collaboration is needed