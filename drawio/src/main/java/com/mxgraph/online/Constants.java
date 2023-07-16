package com.mxgraph.online;

public class Constants
{

	/**
	 * Maximum size (in bytes) for request payloads. Default is 52428800 (50MB).
	 */
	public static final int MAX_REQUEST_SIZE = 52428800;

	/**
	 * Maximum are for exports. Default assumes the area taken by a 
	 * 10000px by 10000px image.
	 */
	public static final int MAX_AREA = 10000 * 10000;

	/**
	 * The domain where legacy images are stored.
	 */
	public static final String IMAGE_DOMAIN = "http://img.diagramly.com/";

}
