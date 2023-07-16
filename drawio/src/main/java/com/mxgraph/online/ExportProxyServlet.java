package com.mxgraph.online;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mxgraph.online.Utils.SizeLimitExceededException;

/**
 * Servlet implementation ExportProxyServlet
 */
@SuppressWarnings("serial")
public class ExportProxyServlet extends HttpServlet
{
	private final String[] supportedServices = {"EXPORT_URL", "PLANTUML_URL", "VSD_CONVERT_URL", "EMF_CONVERT_URL"};

	private void doRequest(String method, HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		try
		{
			int serviceId = 0;
			String proxyPath = "";
			String queryString = "";
			
			try 
			{
				if (request.getQueryString() != null)
				{
					queryString = "?" + request.getQueryString(); 	
				}
				
				if (request.getPathInfo() != null) // /{serviceId}/*
				{
					String[] pathParts = request.getPathInfo().split("/");
	
					if (pathParts.length > 1)
					{
						serviceId = Integer.parseInt(pathParts[1]);
					}
					
					if (pathParts.length > 2)
					{
						proxyPath = String.join("/", Arrays.copyOfRange(pathParts, 2, pathParts.length));
					}
					
					if (serviceId < 0 || serviceId > supportedServices.length)
					{
						serviceId = 0;
					}
				}
			}
			catch (Exception e) 
			{
				// Ignore and use 0
				serviceId = 0;
			}
			
			String exportUrl = System.getenv(supportedServices[serviceId]);
			
			if (exportUrl == null || exportUrl.isEmpty() || 
				(!exportUrl.startsWith("http://") && !exportUrl.startsWith("https://")))
			{
				throw new Exception(supportedServices[serviceId] + " not set or invalid");
			}
			else if (!exportUrl.endsWith("/")) // There are other non-trivial cases, admins should configure these URLs carefully
			{
				exportUrl += "/";
			}
			
			URL url = new URL(exportUrl + proxyPath + queryString);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			
			con.setRequestMethod(method);
			
			//Copy request headers to export server
			Enumeration<String> headerNames = request.getHeaderNames();
			 
	        while (headerNames.hasMoreElements()) 
	        {
	            String headerName = headerNames.nextElement();
	            Enumeration<String> headers = request.getHeaders(headerName);
	            
	            while (headers.hasMoreElements()) 
	            {
	                String headerValue = headers.nextElement();
	                con.addRequestProperty(headerName, headerValue);
	            }
	        }
	        
	        if ("POST".equals(method))
	        {
				// Send post request
				con.setDoOutput(true);
				
				OutputStream params = con.getOutputStream();
				Utils.copyRestricted(request.getInputStream(), params);
				params.flush();
				params.close();
	        }
	        
	        int responseCode = con.getResponseCode();
			//Copy response code
			response.setStatus(responseCode);
			
			//Copy response headers
			Map<String, List<String>> map = con.getHeaderFields();
			
			for (Map.Entry<String, List<String>> entry : map.entrySet()) 
			{
				String key = entry.getKey();
				
				if (key != null)
				{
					for (String val : entry.getValue())
					{	
						
						response.addHeader(entry.getKey(), val);
					}
				}
			}
			
			//Copy response
			OutputStream out = response.getOutputStream();
			
			//Error
			if (responseCode >= 400)
			{
				Utils.copy(con.getErrorStream(), out);
			}
			else //Success
			{
				Utils.copy(con.getInputStream(), out);
			}
			
			out.flush();
			out.close();
		}
		catch (SizeLimitExceededException e)
		{
			response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);

			throw e;
		}
		catch (Exception e)
		{
			response.setStatus(
					HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		doRequest("GET", request, response);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		doRequest("POST", request, response);
	}
}