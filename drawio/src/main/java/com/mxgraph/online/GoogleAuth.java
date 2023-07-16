/**
 * Copyright (c) 2006-2022, JGraph Ltd
 */
package com.mxgraph.online;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

@SuppressWarnings("serial")
abstract public class GoogleAuth extends AbsAuth
{
	public static String CLIENT_SECRET_FILE_PATH = "google_client_secret";
	public static String CLIENT_ID_FILE_PATH = "google_client_id";
	
	private static Config CONFIG = null;
	
	protected Config getConfig()
	{
		if (CONFIG == null)
		{
			String clientSerets = SecretFacade.getSecret(CLIENT_SECRET_FILE_PATH, getServletContext()), 
				clientIds = SecretFacade.getSecret(CLIENT_ID_FILE_PATH, getServletContext());
			
			CONFIG = new Config(clientIds, clientSerets);
			CONFIG.REDIRECT_PATH = "/google";
			CONFIG.AUTH_SERVICE_URL = "https://www.googleapis.com/oauth2/v4/token";
		}
		
		return CONFIG;
	}

	public GoogleAuth()
	{
		super();
		cookiePath = "/google";
	}
	
	protected String getTokenFromCookieVal(String tokenCookieVal, Object request)
	{
		String userId = getParameter("userId", request);
		
		if (tokenCookieVal != null && userId != null)
		{
			String[] tokens = tokenCookieVal.split(SEPARATOR);
			
			for (int i = 0; i < tokens.length; i++)
			{
				if (tokens[i].startsWith(userId + ":"))
				{
					return tokens[i].substring(userId.length() + 1);
				}
			}
		}

		return tokenCookieVal;
	}
	
	protected String getRefreshTokenCookie(String refreshToken, String tokenCookieVal, String accessToken) 
	{
		HttpURLConnection con = null;
		String userId = null;
		
		try
		{
			URL obj = new URL("https://www.googleapis.com/oauth2/v2/userinfo?alt=json");
			con = (HttpURLConnection) obj.openConnection();
			con.setRequestProperty("Authorization", "Bearer " + accessToken);
			con.setRequestProperty("User-Agent", "draw.io");
			int status = con.getResponseCode();
			
			if (status >= 200 && status <= 299)
			{
				BufferedReader in = new BufferedReader(
						new InputStreamReader(con.getInputStream()));
				String inputLine;
				StringBuffer strRes = new StringBuffer();
				
				while ((inputLine = in.readLine()) != null)
				{
					strRes.append(inputLine);
				}
				in.close();
				
				userId = new Gson().fromJson(strRes.toString(), JsonElement.class).getAsJsonObject().get("id").getAsString();
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		if (userId != null)
		{
			ArrayList<String> tokens = new ArrayList<>();
			tokens.add(userId + ":" + refreshToken);
			
			if (tokenCookieVal != null)
			{
				String[] curTokens = tokenCookieVal.split(SEPARATOR);
				
				for (int i = 0; i < curTokens.length; i++)
				{
					if (!curTokens[i].startsWith(userId + ":"))
					{
						tokens.add(curTokens[i]);
					}
				}
			}
			
			return String.join(SEPARATOR, tokens);
		}
		
		return tokenCookieVal; //If we couldn't get the userId, we just return existing tokens such that we don't corrupt them
	}
	
	protected void logout(String tokenCookieName, String tokenCookieVal, Object request, Object response)
	{
		String userId = getParameter("userId", request);
		
		if (tokenCookieVal != null && userId != null)
		{
			ArrayList<String> tokens = new ArrayList<>();
			String[] curTokens = tokenCookieVal.split(SEPARATOR);
			
			for (int i = 0; i < curTokens.length; i++)
			{
				if (!curTokens[i].startsWith(userId + ":"))
				{
					tokens.add(curTokens[i]);
				}
			}
			
			if (tokens.size() > 0)
            {
                addCookie(tokenCookieName, String.join(SEPARATOR, tokens), TOKEN_COOKIE_AGE, cookiePath, response);
            }
            else
            {
                deleteCookie(tokenCookieName, cookiePath, response);
            }
		}
	}
	
	protected String processAuthResponse(String authRes, boolean jsonResponse)
	{
		StringBuffer res = new StringBuffer();
		
		//In Office Add-in, we don't have access to opened window to attach a function to it, 
		//	also with the redirect (since we had to open google auth in the same window) we lost Office Messaging.
		//	This is due to using Google own file picker instead of creating our own picker 
		//	(as we did with OneDrive since its picker only support popup windows which is not supported in Office)
		//	This is why we load driveLoader.js which define onGDriveCallback and redirects automatically to the page including the picker
		//	For other scenarios, we use another function name (onGoogleDriveCallback)
		if (!jsonResponse)
		{
			res.append("<!DOCTYPE html><html><head>");
			res.append("<script src=\"/connect/office365/js/driveLoader.js\" type=\"text/javascript\"></script>");
			res.append("<script type=\"text/javascript\">");
			res.append("(function() { var authInfo = ");  //The following is a json containing access_token
		}
		
		res.append(authRes);
		
		if (!jsonResponse)
		{
			res.append(";");
			res.append("if (window.opener != null && window.opener.onGoogleDriveCallback != null)"); 
			res.append("{");
			res.append("	window.opener.onGoogleDriveCallback(authInfo, window);");
			res.append("} else {");
			res.append("	onGDriveCallback(authInfo);");
			res.append("}");
			res.append("})();</script>");
			res.append("</head><body></body></html>");
		}

		return res.toString();
	}
}
