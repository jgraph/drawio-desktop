package com.mxgraph.online;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import java.nio.file.Path;
import java.nio.file.Paths;

//This servlet is an interface between draw.io and CloudConverter.
//For EMF files, it detect its size and resize the huge images such that max dimension is MAX_DIM
public class ConverterServlet  extends HttpServlet 
{
	private static final long serialVersionUID = -5084595244442555865L;

	private static final Logger log = Logger
			.getLogger(HttpServlet.class.getName());
	
	private static final int MAX_DIM = 5000;
	private static final int MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
	private static final double EMF_10thMM2PXL = 26.458;
	private static final String API_KEY_FILE_PATH = "/WEB-INF/cloud_convert_api_key"; // Not migrated to new pattern, since will not be used on diagrams.net
	private static final String CONVERT_SERVICE_URL = "https://api.cloudconvert.com/convert";
	private static final String CRLF = "\r\n";
	private static final String TWO_HYPHENS = "--";
	private static final String BOUNDARY =  "----WebKitFormBoundary6XTanBMjO0kFwa3p"; //FIXME The boundary should not occur inside the file, it is very unlikely but still a possibility
	
	private static String API_KEY = null;
	
	private void readApiKey() 
	{
		if (API_KEY == null)
		{
			try 
			{
				API_KEY = Utils
							.readInputStream(getServletContext()
							.getResourceAsStream(API_KEY_FILE_PATH))
							.replaceAll("\n", "");
			} 
			catch (IOException e) 
			{
				throw new RuntimeException("Invalid API key file/path");
			}
		}
	}
	
	//Little-endian
	private int fromByteArray(byte[] bytes, int start) 
	{
		return ((bytes[start + 3] & 0xFF) << 24) | 
	           ((bytes[start + 2] & 0xFF) << 16) | 
	           ((bytes[start + 1] & 0xFF) << 8 ) | 
	           ((bytes[start] & 0xFF) << 0 );
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		readApiKey();
		
		String inputformat = null, outputformat = null, fileName = null;
		InputStream fileContent = null;
		
		try 
		{
	        List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
	        
	        for (FileItem item : items) 
	        {
	            if (item.isFormField()) 
	            {
	                String fieldName = item.getFieldName();
	                
	                if ("inputformat".equals(fieldName))
	                {
	                	inputformat = item.getString();
	                }
	                else if ("outputformat".equals(fieldName))
	                {
	                	outputformat = item.getString();
	                }
	            }
	            else
	            {
	            	//We expect only one file
	                Path file = Paths.get(item.getName());
	                fileName = file.getFileName().toString();
	                fileContent = item.getInputStream();
	            }
	        }
	    } 
		catch (FileUploadException e)
		{
	        throw new ServletException("Cannot parse multipart request.", e);
	    }

		if (inputformat == null || outputformat == null || fileContent == null)
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		else
		{
		    HttpURLConnection con = null;
			
			try
			{
				URL obj = new URL(CONVERT_SERVICE_URL);
				con = (HttpURLConnection) obj.openConnection();
				con.setUseCaches(false);
				con.setDoOutput(true);
				
				con.setRequestMethod("POST");
				con.setRequestProperty("Connection", "Keep-Alive");
				con.setRequestProperty("Cache-Control", "no-cache");
				con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
				
				DataOutputStream postRequest = new DataOutputStream(con.getOutputStream());

				byte[] data      = new byte[10240]; //10 KB buffer
				int    bytesRead = fileContent.read(data);
				int w = 0, h = 0, dpi = 96;
				
				if (inputformat.equals("emf") && bytesRead >= 40)
				{
					//Read Frame from EMF header (the rectangular inclusive-inclusive dimensions, in .01 millimeter units, 
					//		of a rectangle that surrounds the image stored in the metafile.)
					int x0 = fromByteArray(data, 24);
					int y0 = fromByteArray(data, 28);
					int x1 = fromByteArray(data, 32);
					int y1 = fromByteArray(data, 36);
					
					//Approximate dimensions of the image
					w = (int) ((x1 - x0) / EMF_10thMM2PXL);
					h = (int) ((y1 - y0) / EMF_10thMM2PXL);
				}
				
				if (w > MAX_DIM || h > MAX_DIM)
				{
					dpi = (int) (dpi * Math.min(MAX_DIM / (double) w, MAX_DIM / (double) h));
					
					if (dpi == 0)
					{
						dpi = 1;
					}
				}
				
				addParameter("apikey", API_KEY, postRequest);
				addParameter("inputformat", inputformat, postRequest);
				addParameter("outputformat", outputformat, postRequest);
				addParameter("input", "upload", postRequest);
				addParameter("wait", "true", postRequest);
				addParameter("download", "true", postRequest);
				
				if (dpi != 96)
				{
					addParameter("converteroptions[density]", Integer.toString(dpi), postRequest);
				}

				addParameterHeader("file", fileName, postRequest);
				int total = 0;

				while(bytesRead != -1) 
				{
					postRequest.write(data, 0, bytesRead);
					bytesRead = fileContent.read(data);
					total += bytesRead;

					if (total > Utils.MAX_SIZE)
					{
						postRequest.close();
						throw new Exception("File size exceeds the maximum allowed size of " + MAX_FILE_SIZE + " bytes.");
					}
				}
				
				postRequest.writeBytes(CRLF + TWO_HYPHENS + BOUNDARY + TWO_HYPHENS + CRLF);
				
				postRequest.flush();
				postRequest.close();
	
				InputStream in = con.getInputStream();
				
				response.setStatus(con.getResponseCode());
				
				String contentType = "application/octet-stream";
				
				if ("png".equals(outputformat))
				{
					contentType = "image/png";
				}
				else if ("jpg".equals(outputformat))
				{
					contentType = "image/jpeg";
				}
				
				response.setHeader("Content-Type", contentType);
				
				OutputStream out = response.getOutputStream();

				bytesRead = in.read(data);
				
				try
				{
					URI uri = new URI(request.getHeader("referer"));
				    String domain = uri.getHost();
					log.log(Level.CONFIG, "EMF-CONVERT, domain: " + domain + " ,Filename: " + 
							fileName != null ? fileName : "" + ", size: " + bytesRead);
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}
				
				while(bytesRead != -1) 
				{
					out.write(data, 0, bytesRead);
					bytesRead = in.read(data);
				}
				
				in.close();
				out.flush();
				out.close();
			}
			catch(Exception e)
			{
				e.printStackTrace();

				if (con != null)
				{
					try 
					{
						BufferedReader in = new BufferedReader(
								new InputStreamReader(con.getErrorStream()));
						
						String inputLine;
	
						while ((inputLine = in.readLine()) != null)
						{
							System.err.println(inputLine);
						}
						in.close();
					}
					catch (Exception e2) 
					{
						// Ignore
					}
				}
				
				response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			}
		}
	}

	private void addParameter(String name, String val, DataOutputStream postRequest) throws IOException {
		addParameterHeader(name, null, postRequest);
		postRequest.writeBytes(val);
		postRequest.writeBytes(CRLF);
	}
	
	private void addParameterHeader(String name, String fileName, DataOutputStream postRequest) throws IOException {
		postRequest.writeBytes(TWO_HYPHENS + BOUNDARY + CRLF);
		postRequest.writeBytes("Content-Disposition: form-data; name=\"" + name + "\"" + 
					(fileName != null? "; filename=\"" + fileName + "\"" + CRLF + "Content-Type: application/octet-stream" : "") + CRLF);
		postRequest.writeBytes(CRLF);
	}
}
