/**
 * Copyright (c) 2020, JGraph Ltd
 * Copyright (c) 2020, draw.io AG
 */
package com.mxgraph.online;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet to fake a .well-known directory, GAE does not directly support . prefixed directories
 */
@SuppressWarnings("serial")
public class WellKnownServlet extends HttpServlet
{
	private static final Logger log = Logger
			.getLogger(HttpServlet.class.getName());

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public WellKnownServlet()
	{
		super();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
        // GAE can't serve dot prefixed folders
        String uri = request.getRequestURI().replace("/.", "/");
        
        // Currently, there is only one file that this servlet serves. This is only
        // needed if you want OneDrive integration. 
        if (uri != null && uri.equals("/well-known/microsoft-identity-association.json"))
        {
            if (uri.toLowerCase().contains(".json"))
            {
                response.setContentType("application/json");
            }

            // Serve whatever was requested from .well-known
            try (InputStream in = getServletContext().getResourceAsStream(uri))
            {
                if (in == null)
                {
                    response.sendError(404);
                    return;
                }
                
                byte[] buffer = new byte[8192];
                int count;

                while ((count = in.read(buffer)) > 0)
                {
                    response.getOutputStream().write(buffer, 0, count);
                }
                
                response.getOutputStream().flush();
                response.getOutputStream().close();
            }
        }
        else
        {
            response.sendError(404);
            return;
        }
    }
}
