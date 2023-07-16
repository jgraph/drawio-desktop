/**
 * Copyright (c) 2006-2016, JGraph Ltd
 * Copyright (c) 2006-2016, Gaudenz Alder
 */
package com.mxgraph.online;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;
import java.util.zip.Deflater;
import java.util.zip.Inflater;
import java.util.zip.InflaterInputStream;

/**
 * 
 * String/byte array encoding/manipulation utilities
 *
 */
public class Utils
{

	private static SecureRandom randomSecure = new SecureRandom();
	
	/**
	 * 
	 */
	public static String CHARSET_FOR_URL_ENCODING = "ISO-8859-1";

	/**
	 * 
	 */
	public static int MAX_SIZE = 20 * 1024 * 1024; // 20 MB

	/**
	 * 
	 */
	public static final int IO_BUFFER_SIZE = 4 * 1024;

	/**
	 * Alphabet for global unique IDs.
	 */
	public static final String TOKEN_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

	private static Set<Integer> allowedPorts = new HashSet<>();
	
	static {
		// -1 is for no port urls (ports 80, 443)
		allowedPorts.add(-1);

		String allowedPortsStr = System.getenv("DRAWIO_PROXY_ALLOWED_PORTS");
		
		if (allowedPortsStr != null) 
		{
			String[] ports = allowedPortsStr.split(",");
			
			for (String port : ports) 
			{
				try 
				{
					allowedPorts.add(Integer.parseInt(port));
				} 
				catch (NumberFormatException e) 
				{
					System.out.println("Invalid DRAWIO_PROXY_ALLOWED_PORTS port: " + port);
				}
			}
		}
	}

	/**
	 * Returns a random string of the given length.
	 */
	public static String generateToken(int length)
	{
		StringBuffer rtn = new StringBuffer();

		for (int i = 0; i < length; i++)
		{
			int offset = randomSecure.nextInt(TOKEN_ALPHABET.length());
			rtn.append(TOKEN_ALPHABET.substring(offset,offset+1));
		}

		return rtn.toString();
	};

	/**
	 * Applies a standard inflate algo to the input byte array
	 * @param binary the byte array to inflate
	 * @return the inflated String
	 * 
	 */
	public static String inflate(byte[] binary) throws IOException
	{
		StringBuffer result = new StringBuffer();
		InputStream in = new InflaterInputStream(
				new ByteArrayInputStream(binary), new Inflater(true));

		while (in.available() != 0)
		{
			byte[] buffer = new byte[IO_BUFFER_SIZE];
			int len = in.read(buffer, 0, IO_BUFFER_SIZE);

			if (len <= 0)
			{
				break;
			}

			result.append(new String(buffer, 0, len));
		}

		in.close();

		return result.toString();
	}

	/**
	 * Applies a standard deflate algo to the input String
	 * @param inString the String to deflate
	 * @return the deflated byte array
	 * 
	 */
	public static byte[] deflate(String inString) throws IOException
	{
		Deflater deflater = new Deflater(Deflater.DEFAULT_COMPRESSION, true);
		byte[] inBytes = inString.getBytes("UTF-8");
		deflater.setInput(inBytes);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(
				inBytes.length);
		deflater.finish();
		byte[] buffer = new byte[IO_BUFFER_SIZE];

		while (!deflater.finished())
		{
			int count = deflater.deflate(buffer); // returns the generated code... index  
			outputStream.write(buffer, 0, count);
		}

		outputStream.close();
		byte[] output = outputStream.toByteArray();

		return output;
	}

	/**
	 * Copies the input stream to the output stream using the default buffer size
	 * @param in the input stream
	 * @param out the output stream
	 * @throws IOException
	 */
	public static void copy(InputStream in, OutputStream out) throws IOException
	{
		copy(in, out, IO_BUFFER_SIZE);
	}

	/**
	 * Copies the input stream to the output stream using the default buffer size
	 * @param in the input stream
	 * @param out the output stream
	 * @param sizeLimit the maximum number of bytes to copy
	 * @throws IOException
	 */
	public static int copyRestricted(InputStream in, OutputStream out) throws IOException
	{
		return copy(in, out, IO_BUFFER_SIZE, MAX_SIZE);
	}

	/**
	 * Copies the input stream to the output stream using the default buffer size
	 * @param in the input stream
	 * @param out the output stream
	 * @param sizeLimit the maximum number of bytes to copy
	 * @throws IOException
	 */
	public static int copyRestricted(InputStream in, OutputStream out, int sizeLimit) throws IOException
	{
		return copy(in, out, IO_BUFFER_SIZE, sizeLimit);
	}

	/**
	 * Copies the input stream to the output stream using the specified buffer size
	 * @param in the input stream
	 * @param out the output stream
	 * @param bufferSize the buffer size to use when copying
	 * @throws IOException
	 */
	public static void copy(InputStream in, OutputStream out, int bufferSize)
			throws IOException
	{
		copy(in, out, bufferSize, 0);
	}

	/**
	 * Copies the input stream to the output stream using the specified buffer size
	 * @param in the input stream
	 * @param out the output stream
	 * @param bufferSize the buffer size to use when copying
	 * @param sizeLimit the maximum number of bytes to copy
	 * @throws IOException
	 */
	public static int copy(InputStream in, OutputStream out, int bufferSize, int sizeLimit)
			throws IOException
	{
		byte[] b = new byte[bufferSize];
		int read, total = 0;

		while ((read = in.read(b)) != -1)
		{
			total += read;

			if (sizeLimit > 0 && total > sizeLimit)
			{
				throw new SizeLimitExceededException();
			}

			out.write(b, 0, read);
		}

		return total;
	}

	/**
	 * Reads an input stream and returns the result as a String
	 * @param stream the input stream to read
	 * @return a String representation of the input stream
	 * @throws IOException
	 */
	public static String readInputStream(InputStream stream) throws IOException
	{
		BufferedReader reader = new BufferedReader(
				new InputStreamReader(stream));
		StringBuffer result = new StringBuffer();
		String tmp = reader.readLine();

		while (tmp != null)
		{
			result.append(tmp + "\n");
			tmp = reader.readLine();
		}

		reader.close();

		return result.toString();
	}

	/**
	  * Encodes the passed String as UTF-8 using an algorithm that's compatible
	  * with JavaScript's <code>encodeURIComponent</code> function. Returns
	  * <code>null</code> if the String is <code>null</code>.
	  * 
	  * @param s The String to be encoded
	  * @param charset the character set to base the encoding on
	  * @return the encoded String
	  */
	public static String encodeURIComponent(String s, String charset)
	{
		if (s == null)
		{
			return null;
		}
		else
		{
			String result;

			try
			{
				result = URLEncoder.encode(s, charset).replaceAll("\\+", "%20")
						.replaceAll("\\%21", "!").replaceAll("\\%27", "'")
						.replaceAll("\\%28", "(").replaceAll("\\%29", ")")
						.replaceAll("\\%7E", "~");
			}
			catch (UnsupportedEncodingException e)
			{
				// This exception should never occur
				result = s;
			}

			return result;
		}
	}

	/**
	 * Checks the file type of an input stream and returns the
	 * bytes that have been read (because URL connections to not
	 * have support for mark/reset).
	 */
	static public byte[] checkStreamContent(InputStream is)
			throws IOException, UnsupportedContentException
	{
		byte[] head = new byte[16];
		boolean valid = false;

		if (is.read(head) == head.length)
		{
			int c1 = head[0] & 0xFF;
			int c2 = head[1] & 0xFF;
			int c3 = head[2] & 0xFF;
			int c4 = head[3] & 0xFF;
			int c5 = head[4] & 0xFF;
			int c6 = head[5] & 0xFF;
			int c7 = head[6] & 0xFF;
			int c8 = head[7] & 0xFF;
			int c9 = head[8] & 0xFF;
			int c10 = head[9] & 0xFF;
			int c11 = head[10] & 0xFF;
			int c12 = head[11] & 0xFF;
			int c13 = head[12] & 0xFF;
			int c14 = head[13] & 0xFF;
			int c15 = head[14] & 0xFF;
			int c16 = head[15] & 0xFF;

			if (c1 == '<')
			{
				// text/html
				if (c2 == '!'
						|| ((c2 == 'h'
								&& (c3 == 't' && c4 == 'm' && c5 == 'l'
										|| c3 == 'e' && c4 == 'a' && c5 == 'd')
								|| (c2 == 'b' && c3 == 'o' && c4 == 'd'
										&& c5 == 'y')))
						|| ((c2 == 'H'
								&& (c3 == 'T' && c4 == 'M' && c5 == 'L'
										|| c3 == 'E' && c4 == 'A' && c5 == 'D')
								|| (c2 == 'B' && c3 == 'O' && c4 == 'D'
										&& c5 == 'Y'))))
				{
					valid = true;
				}

				// application/xml
				if (c2 == '?' && c3 == 'x' && c4 == 'm' && c5 == 'l'
						&& c6 == ' ')
				{
					valid = true;
				}
				
				// application/svg+xml
				if (c2 == 's' && c3 == 'v' && c4 == 'g' && c5 == ' ')
				{
					valid = true;
				}
			}

			// big and little (identical) endian UTF-8 encodings, with BOM
			// application/xml
			if (c1 == 0xef && c2 == 0xbb && c3 == 0xbf)
			{
				if (c4 == '<' && c5 == '?' && c6 == 'x')
				{
					valid = true;
				}
			}

			// big and little endian UTF-16 encodings, with byte order mark
			// application/xml
			if (c1 == 0xfe && c2 == 0xff)
			{
				if (c3 == 0 && c4 == '<' && c5 == 0 && c6 == '?' && c7 == 0
						&& c8 == 'x')
				{
					valid = true;
				}
			}

			// application/xml
			if (c1 == 0xff && c2 == 0xfe)
			{
				if (c3 == '<' && c4 == 0 && c5 == '?' && c6 == 0 && c7 == 'x'
						&& c8 == 0)
				{
					valid = true;
				}
			}

			// big and little endian UTF-32 encodings, with BOM
			// application/xml
			if (c1 == 0x00 && c2 == 0x00 && c3 == 0xfe && c4 == 0xff)
			{
				if (c5 == 0 && c6 == 0 && c7 == 0 && c8 == '<' && c9 == 0
						&& c10 == 0 && c11 == 0 && c12 == '?' && c13 == 0
						&& c14 == 0 && c15 == 0 && c16 == 'x')
				{
					valid = true;
				}
			}

			// application/xml
			if (c1 == 0xff && c2 == 0xfe && c3 == 0x00 && c4 == 0x00)
			{
				if (c5 == '<' && c6 == 0 && c7 == 0 && c8 == 0 && c9 == '?'
						&& c10 == 0 && c11 == 0 && c12 == 0 && c13 == 'x'
						&& c14 == 0 && c15 == 0 && c16 == 0)
				{
					valid = true;
				}
			}

			// image/gif
			if (c1 == 'G' && c2 == 'I' && c3 == 'F' && c4 == '8')
			{
				valid = true;
			}

			// image/x-bitmap
			if (c1 == '#' && c2 == 'd' && c3 == 'e' && c4 == 'f')
			{
				valid = true;
			}

			// image/x-pixmap
			if (c1 == '!' && c2 == ' ' && c3 == 'X' && c4 == 'P' && c5 == 'M'
					&& c6 == '2')
			{
				valid = true;
			}

			// image/png
			if (c1 == 137 && c2 == 80 && c3 == 78 && c4 == 71 && c5 == 13
					&& c6 == 10 && c7 == 26 && c8 == 10)
			{
				valid = true;
			}

			// image/jpeg
			if (c1 == 0xFF && c2 == 0xD8 && c3 == 0xFF)
			{
				if (c4 == 0xE0 || c4 == 0xEE)
				{
					valid = true;
				}

				/**
				 * File format used by digital cameras to store images.
				 * Exif Format can be read by any application supporting
				 * JPEG. Exif Spec can be found at:
				 * http://www.pima.net/standards/it10/PIMA15740/Exif_2-1.PDF
				 */
				if ((c4 == 0xE1) && (c7 == 'E' && c8 == 'x' && c9 == 'i'
						&& c10 == 'f' && c11 == 0))
				{
					valid = true;
				}
			}

			// Additional signatures
			// See https://www.garykessler.net/library/file_sigs.html
			// and https://en.wikipedia.org/wiki/List_of_file_signatures
			// TODO: Add check for .eot fonts
			// ttf
			if (c1 == 0x00 && c2 == 0x01 && c3 == 0x00 && c4 == 0x00
					&& c5 == 0x00)
			{
				valid = true;
			}

			// otf
			if (c1 == 0x4F && c2 == 0x54 && c3 == 0x54 && c4 == 0x4F
					&& c5 == 0x00)
			{
				valid = true;
			}

			// woff
			if (c1 == 0x77 && c2 == 0x4F && c3 == 0x46 && c4 == 0x46)
			{
				valid = true;
			}

			// woff2
			if (c1 == 0x77 && c2 == 0x4F && c3 == 0x46 && c4 == 0x32)
			{
				valid = true;
			}

			// vsdx, vssx (also zip, jar, odt, ods, odp, docx, xlsx, pptx, apk, aar)
			if (c1 == 0x50 && c2 == 0x4B && c3 == 0x03 && c4 == 0x04)
			{
				valid = true;
			}
			else if (c1 == 0x50 && c2 == 0x4B && c3 == 0x03 && c4 == 0x06)
			{
				valid = true;
			}

			// vsd, ppt
			if (c1 == 0xD0 && c2 == 0xCF && c3 == 0x11 && c4 == 0xE0
					&& c5 == 0xA1 && c6 == 0xB1 && c7 == 0x1A && c8 == 0xE1)
			{
				valid = true;
			}

			// mxfile, mxlibrary, mxGraphModel
			if (c1 == '<' && c2 == 'm' && c3 == 'x')
			{
				valid = true;
			}

			if (c1 == '<' && c2 == 'D' && c3 == 'O' && c4 == 'C' && c5 == 'T'
					&& c6 == 'Y' && c7 == 'P' && c8 == 'E')
			{
				valid = true;
			}

			if (c1 == '<' && c2 == '!' && c3 == '-' && c4 == '-' && c5 == '['
					&& c6 == 'i' && c7 == 'f' && c8 == ' ')
			{
				valid = true;
			}

			// Gliffy
			if (c1 == '{' && c2 == '"' && c3 == 'c' && c4 == 'o' && c5 == 'n'
					&& c6 == 't' && c7 == 'e' && c8 == 'n' && c9 == 't'
					&& c10 == 'T' && c11 == 'y' && c12 == 'p' && c13 == 'e'
					&& c14 == '"' && c15 == ':')
			{
				valid = true;
			}

			// Lucidchart
			if (c1 == '{' && c2 == '"' && c3 == 's' && c4 == 't' && c5 == 'a'
					&& c6 == 't' && c7 == 'e' && c8 == '"' && c9 == ':')
			{
				valid = true;
			}
		}

		if (!valid)
		{
			throw new UnsupportedContentException();
		}

		return head;
	}

	public static boolean isNumeric (String str)
	{ 
		try
		{  
			Double.parseDouble(str);

			return true;
		}
		catch(NumberFormatException e)
		{  
			return false;  
		}  
	}

	/**
	 * Checks if the URL parameter is legal, i.e. isn't attempting an SSRF
	 * 
	 * @param url the URL to check
	 * @return true if the URL is permitted
	 */
	public static boolean sanitizeUrl(String url)
	{
		if (url != null)
		{
			try
			{
				URL parsedUrl = new URL(url);
				String protocol = parsedUrl.getProtocol();
				String host = parsedUrl.getHost();
				InetAddress address = InetAddress.getByName(host);
				String hostAddress = address.getHostAddress();
				host = host.toLowerCase();
				
				return (protocol.equals("http") || protocol.equals("https"))
						&& !address.isAnyLocalAddress()
						&& !address.isLoopbackAddress()
						&& !address.isLinkLocalAddress()
						&& allowedPorts.contains(parsedUrl.getPort())
						&& !host.endsWith(".internal") // Redundant
						&& !host.endsWith(".local") // Redundant
						&& !host.contains("localhost") // Redundant
						&& !hostAddress.startsWith("0.") // 0.0.0.0/8 
						&& !hostAddress.startsWith("10.") // 10.0.0.0/8
						&& !hostAddress.startsWith("127.") // 127.0.0.0/8
						&& !hostAddress.startsWith("169.254.") // 169.254.0.0/16
						&& !hostAddress.startsWith("172.16.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.17.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.18.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.19.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.20.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.21.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.22.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.23.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.24.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.25.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.26.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.27.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.28.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.29.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.30.") // 172.16.0.0/12
						&& !hostAddress.startsWith("172.31.") // 172.16.0.0/12
						&& !hostAddress.startsWith("192.0.0.") // 192.0.0.0/24
						&& !hostAddress.startsWith("192.168.") // 192.168.0.0/16
						&& !hostAddress.startsWith("198.18.") // 198.18.0.0/15
						&& !hostAddress.startsWith("198.19.") // 198.18.0.0/15
						&& !hostAddress.startsWith("fc00::") // fc00::/7 https://stackoverflow.com/questions/53764109/is-there-a-java-api-that-will-identify-the-ipv6-address-fd00-as-local-private
						&& !hostAddress.startsWith("fd00::") // fd00::/8
						&& !host.endsWith(".arpa"); // reverse domain (needed?)
			}
			catch (MalformedURLException e)
			{
				return false;
			}
			catch (UnknownHostException e)
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	/**
	 *
	 */
	public static class UnsupportedContentException extends Exception
	{
		private static final long serialVersionUID = 1239597891574347740L;
	}

	/**
	 * Exception for size limit exceeeded in copy request.
	 */
	public static class SizeLimitExceededException extends IOException
	{
		public SizeLimitExceededException()
		{
			super("Size limit exceeded");
		}
	}

}
