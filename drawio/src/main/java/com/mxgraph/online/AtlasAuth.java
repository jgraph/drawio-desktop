/**
 * Copyright (c) 2006-2019, JGraph Ltd
 */
package com.mxgraph.online;

import java.io.IOException;

@SuppressWarnings("serial")
abstract public class AtlasAuth extends AbsAuth
{
	public static String CLIENT_SECRET_FILE_PATH = "atlas_client_secret";
	public static String CLIENT_ID_FILE_PATH = "atlas_client_id";
	
	private static Config CONFIG = null;
	
	protected Config getConfig()
	{
		if (CONFIG == null)
		{
			String clientSerets = SecretFacade.getSecret(CLIENT_SECRET_FILE_PATH, getServletContext()), 
					clientIds = SecretFacade.getSecret(CLIENT_ID_FILE_PATH, getServletContext());
		
			CONFIG = new Config(clientIds, clientSerets);
			CONFIG.REDIRECT_PATH = "/atlas";
			CONFIG.AUTH_SERVICE_URL = "https://auth.atlassian.com/oauth/token";
		}
		
		return CONFIG;
	}

	public AtlasAuth() 
	{
		super();
		postType = JSON;
		cookiePath = "/atlas";
	}
	
	protected String processAuthResponse(String authRes, boolean jsonResponse)
	{
		StringBuffer res = new StringBuffer();
		
		//Call the opener callback function directly with the given json
		if (!jsonResponse)
		{
			res.append("<!DOCTYPE html><html><head><script>");
			res.append("(function() { var authInfo = ");  //The following is a json containing access_token
		}
		
		res.append(authRes);

		if (!jsonResponse)
		{
			res.append(";");					
			res.append("if (window.opener != null && window.opener.onAtlasCallback != null)"); 
			res.append("{");
			res.append("	window.opener.onAtlasCallback(authInfo, window);");
			res.append("}");
			res.append("})();</script></head><body></body></html>");
		}

		return res.toString();
	}
}
