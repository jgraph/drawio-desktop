/**
 * $Id: EmbedServlet.java,v 1.18 2014/01/31 22:27:07 gaudenz Exp $
 * Copyright (c) 2011-2012, JGraph Ltd
 * 
 * TODO
 * 
 * We could split the static part and the stencils into two separate requests
 * in order for multiple graphs in the pages to not load the static part
 * multiple times. This is only relevant if the embed arguments are different,
 * in which case there is a problem with parsin the graph model too soon, ie.
 * before certain stencils become available.
 * 
 * Easier solution is for the user to move the embed script to after the last
 * graph in the page and merge the stencil arguments.
 * 
 * Note: The static part is roundly 105K, the stencils are much smaller in size.
 * This means if the embed function is widely used, it will make sense to factor
 * out the static part because only stencils will change between pages.
 */
package com.mxgraph.online;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.File;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;

import com.google.appengine.api.utils.SystemProperty;

import com.mxgraph.online.Utils.SizeLimitExceededException;

/**
 * Servlet implementation class OpenServlet
 */
public class EmbedServlet2 extends HttpServlet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	protected static String SHAPES_PATH = "/shapes";

	/**
	 * 
	 */
	protected static String STENCIL_PATH = "/stencils";

	/**
	 * 
	 */
	protected static String lastModified = null;

	/**
	 * 
	 */
	protected HashMap<String, String> stencils = new HashMap<String, String>();

	/**
	 * 
	 */
	protected HashMap<String, String[]> libraries = new HashMap<String, String[]>();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public EmbedServlet2()
	{
		if (lastModified == null)
		{
			// Uses deployment date as lastModified header
			String applicationVersion = SystemProperty.applicationVersion.get();
			Date uploadDate = new Date(Long
					.parseLong(applicationVersion
							.substring(applicationVersion.lastIndexOf(".") + 1))
					/ (2 << 27) * 1000);

			DateFormat httpDateFormat = new SimpleDateFormat(
					"EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
			lastModified = httpDateFormat.format(uploadDate);
		}

		initLibraries(libraries);
	}

	/**
	 * Sets up collection of stencils
	 */
	public static void initLibraries(HashMap<String, String[]> libraries)
	{
		libraries.put("mockup",
				new String[] { SHAPES_PATH + "/mockup/mxMockupButtons.js" });
		libraries.put("arrows2", new String[] { SHAPES_PATH + "/mxArrows.js" });
		libraries.put("bpmn",
				new String[] { SHAPES_PATH + "/bpmn/mxBpmnShape2.js",
						STENCIL_PATH + "/bpmn.xml" });
		libraries.put("er", new String[] { SHAPES_PATH + "/er/mxER.js" });
		libraries.put("ios",
				new String[] { SHAPES_PATH + "/mockup/mxMockupiOS.js" });
		libraries.put("rackGeneral",
				new String[] { SHAPES_PATH + "/rack/mxRack.js",
						STENCIL_PATH + "/rack/general.xml" });
		libraries.put("rackF5", new String[] { STENCIL_PATH + "/rack/f5.xml" });
		libraries.put("lean_mapping",
				new String[] { SHAPES_PATH + "/mxLeanMap.js",
						STENCIL_PATH + "/lean_mapping.xml" });
		libraries.put("basic", new String[] { SHAPES_PATH + "/mxBasic.js",
				STENCIL_PATH + "/basic.xml" });
		libraries.put("ios7icons",
				new String[] { STENCIL_PATH + "/ios7/icons.xml" });
		libraries.put("ios7ui",
				new String[] { SHAPES_PATH + "/ios7/mxIOS7Ui.js",
						STENCIL_PATH + "/ios7/misc.xml" });
		libraries.put("android", new String[] { SHAPES_PATH + "/mxAndroid.js",
				STENCIL_PATH + "electrical/transmission" });
		libraries.put("electrical/transmission",
				new String[] { SHAPES_PATH + "/mxElectrical.js",
						STENCIL_PATH + "/electrical/transmission.xml" });
		libraries.put("mockup/buttons",
				new String[] { SHAPES_PATH + "/mockup/mxMockupButtons.js" });
		libraries.put("mockup/containers",
				new String[] { SHAPES_PATH + "/mockup/mxMockupContainers.js" });
		libraries.put("mockup/forms",
				new String[] { SHAPES_PATH + "/mockup/mxMockupForms.js" });
		libraries.put("mockup/graphics",
				new String[] { SHAPES_PATH + "/mockup/mxMockupGraphics.js",
						STENCIL_PATH + "/mockup/misc.xml" });
		libraries.put("mockup/markup",
				new String[] { SHAPES_PATH + "/mockup/mxMockupMarkup.js" });
		libraries.put("mockup/misc",
				new String[] { SHAPES_PATH + "/mockup/mxMockupMisc.js",
						STENCIL_PATH + "/mockup/misc.xml" });
		libraries.put("mockup/navigation",
				new String[] { SHAPES_PATH + "/mockup/mxMockupNavigation.js",
						STENCIL_PATH + "/mockup/misc.xml" });
		libraries.put("mockup/text",
				new String[] { SHAPES_PATH + "/mockup/mxMockupText.js" });
		libraries.put("floorplan",
				new String[] { SHAPES_PATH + "/mxFloorplan.js",
						STENCIL_PATH + "/floorplan.xml" });
		libraries.put("bootstrap",
				new String[] { SHAPES_PATH + "/mxBootstrap.js",
						STENCIL_PATH + "/bootstrap.xml" });
		libraries.put("gmdl", new String[] { SHAPES_PATH + "/mxGmdl.js",
				STENCIL_PATH + "/gmdl.xml" });
		libraries.put("cabinets", new String[] { SHAPES_PATH + "/mxCabinets.js",
				STENCIL_PATH + "/cabinets.xml" });
		libraries.put("archimate",
				new String[] { SHAPES_PATH + "/mxArchiMate.js" });
		libraries.put("archimate3",
				new String[] { SHAPES_PATH + "/mxArchiMate3.js" });
		libraries.put("sysml", new String[] { SHAPES_PATH + "/mxSysML.js" });
		libraries.put("eip", new String[] { SHAPES_PATH + "/mxEip.js",
				STENCIL_PATH + "/eip.xml" });
		libraries.put("networks", new String[] { SHAPES_PATH + "/mxNetworks.js",
				STENCIL_PATH + "/networks.xml" });
		libraries.put("aws3d", new String[] { SHAPES_PATH + "/mxAWS3D.js",
				STENCIL_PATH + "/aws3d.xml" });
		libraries.put("pid2inst",
				new String[] { SHAPES_PATH + "/pid2/mxPidInstruments.js" });
		libraries.put("pid2misc",
				new String[] { SHAPES_PATH + "/pid2/mxPidMisc.js",
						STENCIL_PATH + "/pid/misc.xml" });
		libraries.put("pid2valves",
				new String[] { SHAPES_PATH + "/pid2/mxPidValves.js" });
		libraries.put("pidFlowSensors",
				new String[] { STENCIL_PATH + "/pid/flow_sensors.xml" });
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException
	{
		try
		{
			String qs = request.getQueryString();

			if (qs != null && qs.equals("stats"))
			{
				writeStats(response);
			}
			else
			{
				// Checks or sets last modified date of delivered content.
				// Date comparison not needed. Only return 304 if
				// delivered by this servlet instance.
				String modSince = request.getHeader("If-Modified-Since");

				if (modSince != null && modSince.equals(lastModified)
						&& request.getParameter("fetch") == null)
				{
					response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
				}
				else
				{
					writeEmbedResponse(request, response);
				}
			}
		}
		catch (SizeLimitExceededException e)
		{
			response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);

			throw e;
		}
		catch (Exception e)
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			throw e;
		}
	}

	public void writeEmbedResponse(HttpServletRequest request,
			HttpServletResponse response) throws IOException
	{
		response.setStatus(HttpServletResponse.SC_OK);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/javascript; charset=UTF-8");
		response.setHeader("Last-Modified", lastModified);
		
		if (request.getParameter("fetch") != null)
		{
			response.setHeader("Cache-Control", "no-store");
		}

		OutputStream out = response.getOutputStream();

		// Creates XML for stencils
		PrintWriter writer = new PrintWriter(out);

		// Writes JavaScript and adds function call with
		// stylesheet and stencils as arguments 
		writer.println(createEmbedJavaScript(request));
		writer.flush();
		writer.close();
	}

	public String createEmbedJavaScript(HttpServletRequest request)
			throws IOException
	{
		String sparam = request.getParameter("s");
		String dev = request.getParameter("dev");
		StringBuffer result = new StringBuffer("[");
		StringBuffer js = new StringBuffer("");

		// Processes each stencil only once
		HashSet<String> done = new HashSet<String>();

		// Processes each lib only once
		HashSet<String> libsLoaded = new HashSet<String>();

		if (sparam != null)
		{
			String[] names = sparam.split(";");

			for (int i = 0; i < names.length; i++)
			{
				if (names[i].indexOf("..") < 0 && !done.contains(names[i]) && names[i].length() > 0)
				{
					if (names[i].equals("*"))
					{
						js.append(readXmlFile("/js/shapes-14-6-5.min.js", false));
						result.append(
								"'" + readXmlFile("/stencils.xml", true) + "'");
					}
					else
					{
						// Makes name canonical
						names[i] = new File("/" + names[i]).getCanonicalPath().substring(1);

						// Checks if any JS files are associated with the library
						// name and injects the JS into the page
						String[] libs = libraries.get(names[i]);

						if (libs != null)
						{
							for (int j = 0; j < libs.length; j++)
							{
								if (!libsLoaded.contains(libs[j]))
								{
									String tmp = stencils.get(libs[j]);
									libsLoaded.add(libs[j]);

									if (tmp == null)
									{
										try
										{
											tmp = readXmlFile(libs[j],
													!libs[j].toLowerCase()
															.endsWith(".js"));

											// Cache for later use
											if (tmp != null)
											{
												stencils.put(libs[j], tmp);
											}
										}
										catch (NullPointerException e)
										{
											// This seems possible according to access log so ignore stencil
										}
									}

									if (tmp != null)
									{
										// TODO: Add JS to Javascript code inline. This had to be done to quickly
										// add JS-based dynamic loading to the existing embed setup where everything
										// dynamic is passed via function call, so an indirection via eval must be
										// used even though the JS could be parsed directly by adding it to JS.
										if (libs[j].toLowerCase()
												.endsWith(".js"))
										{
											js.append(tmp);
										}
										else
										{
											if (result.length() > 1)
											{
												result.append(",");
											}

											result.append("'" + tmp + "'");
										}
									}
								}
							}
						}
						else
						{
							String tmp = stencils.get(names[i]);

							if (tmp == null)
							{
								try
								{
									tmp = readXmlFile(
											"/stencils/" + names[i] + ".xml",
											true);

									// Cache for later use
									if (tmp != null)
									{
										stencils.put(names[i], tmp);
									}
								}
								catch (NullPointerException e)
								{
									// This seems possible according to access log so ignore stencil
								}
							}

							if (tmp != null)
							{
								if (result.length() > 1)
								{
									result.append(",");
								}

								result.append("'" + tmp + "'");
							}
						}
					}

					done.add(names[i]);
				}
			}
		}

		result.append("]");

		// LATER: Detect protocol of request in dev
		// mode to avoid security errors
		String proto = "https://";

		String setCachedUrls = "";
		String[] urls = request.getParameterValues("fetch");

		if (urls != null)
		{
			HashSet<String> completed = new HashSet<String>();
			int sizeLimit = Utils.MAX_SIZE;

			for (int i = 0; i < urls.length; i++)
			{
				// Checks if URL already fetched to avoid duplicates
				if (!completed.contains(urls[i]) && Utils.sanitizeUrl(urls[i]))
				{
					completed.add(urls[i]);
					URL url = new URL(urls[i]);
					URLConnection connection = url.openConnection();
					((HttpURLConnection) connection).setInstanceFollowRedirects(false);
					connection.setRequestProperty("User-Agent", "draw.io");
					ByteArrayOutputStream stream = new ByteArrayOutputStream();
					String contentLength = connection.getHeaderField("Content-Length");

					// If content length is available, use it to enforce maximum size
					if (contentLength != null && Long.parseLong(contentLength) > sizeLimit)
					{
						break;
					}

					sizeLimit -= Utils.copyRestricted(connection.getInputStream(), stream);
					setCachedUrls += "GraphViewer.cachedUrls['"
							+ StringEscapeUtils.escapeEcmaScript(urls[i])
							+ "'] = decodeURIComponent('"
							+ StringEscapeUtils.escapeEcmaScript(
									Utils.encodeURIComponent(
											stream.toString("UTF-8"),
											Utils.CHARSET_FOR_URL_ENCODING))
							+ "');";
				}
			}
		}

		// Installs a callback to load the stencils after the viewer was injected
		return "window.onDrawioViewerLoad = function() {" + setCachedUrls
				+ "mxStencilRegistry.parseStencilSets(" + result.toString()
				+ ");" + js + "GraphViewer.processElements(); };"
				+ "var t = document.getElementsByTagName('script');"
				+ "if (t != null && t.length > 0) {"
				+ "var script = document.createElement('script');"
				+ "script.type = 'text/javascript';" + "script.src = '" + proto
				+ ((dev != null && dev.equals("1")) ? "test" : "www")
				+ ".draw.io/js/viewer-static.min.js';"
				+ "t[0].parentNode.appendChild(script);}";
	}

	public void writeStats(HttpServletResponse response) throws IOException
	{
		PrintWriter writer = new PrintWriter(response.getOutputStream());
		writer.println("<html>");
		writer.println("<body>");
		writer.println("Deployed: " + lastModified);
		writer.println("</body>");
		writer.println("</html>");
		writer.flush();
	}

	public String readXmlFile(String filename, boolean xmlContent)
			throws IOException
	{
		String result = readFile(filename);

		if (xmlContent)
		{
			result = result.replaceAll("'", "\\\\'").replaceAll("\t", "")
					.replaceAll("\n", "");
		}

		return result;
	}

	public String readFile(String filename) throws IOException
	{
		InputStream is = getServletContext().getResourceAsStream(filename);

		return Utils.readInputStream(is);
	}

}
