/**
 * Copyright (c) 2006-2019, JGraph Ltd
 */
package com.mxgraph.online;

import java.io.IOException;

@SuppressWarnings("serial")
abstract public class DropboxAuth extends AbsAuth
{
	public static String CLIENT_SECRET_FILE_PATH = "dropbox_client_secret";
	public static String CLIENT_ID_FILE_PATH = "dropbox_client_id";
	
	private static Config CONFIG = null;
	
	protected Config getConfig()
	{
		if (CONFIG == null)
		{
			String clientSerets = SecretFacade.getSecret(CLIENT_SECRET_FILE_PATH, getServletContext()), 
					clientIds = SecretFacade.getSecret(CLIENT_ID_FILE_PATH, getServletContext());
			
			CONFIG = new Config(clientIds, clientSerets);
			CONFIG.AUTH_SERVICE_URL = "https://api.dropboxapi.com/oauth2/token";
			CONFIG.REDIRECT_PATH = "/dropbox";
		}
		
		return CONFIG;
	}

	public DropboxAuth()
	{
		super();
		cookiePath = "/dropbox";
		withRedirectUrlInRefresh = false;
	}
	
	protected String processAuthResponse(String authRes, boolean jsonResponse)
	{
		StringBuffer res = new StringBuffer();
		
		if (!jsonResponse)
		{
			res.append("<!DOCTYPE html><html><head><script type=\"text/javascript\">");
			res.append("(function() { var authInfo = ");  //The following is a json containing access_token
		}
		
		res.append(authRes);
		
		if (!jsonResponse)
		{
			res.append(";");
			res.append("if (window.opener != null && window.opener.onDropboxCallback != null)"); 
			res.append("{");
			res.append("	window.opener.onDropboxCallback(authInfo, window);");
			res.append("} else {");
			res.append("	onDropboxCallback(authInfo);");
			res.append("}");
			res.append("})();</script>");
			res.append("</head><body></body></html>");
		}

		return res.toString();
	}
}
