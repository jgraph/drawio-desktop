/**
 * $Id: ProxyServlet.java,v 1.4 2013/12/13 13:18:11 david Exp $
 * Copyright (c) 2011-2012, JGraph Ltd
 */
package com.mxgraph.online;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation ProxyServlet
 */
@SuppressWarnings("serial")
public class ImgurRedirectServlet extends HttpServlet
{

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ImgurRedirectServlet()
	{
		super();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		String uri = request.getRequestURI();
		int last = uri.lastIndexOf("/");

		if (last > 0)
		{
			String id = uri.substring(last + 1);
			response.setHeader("Location",
					"https://www.draw.io/?chrome=0&lightbox=1&layers=1&url=http%3A%2F%2Fi.imgur.com%2F"
							+ id + ".png"
							+ "&edit=https%3A%2F%2Fwww.draw.io%2F%3Furl%3Dhttp%253A%252F%252Fi.imgur.com%252F"
							+ id + ".png");
			response.setStatus(HttpServletResponse.SC_TEMPORARY_REDIRECT);
		}
		else
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

}
