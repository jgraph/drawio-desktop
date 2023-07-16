package com.mxgraph.properties;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.text.Bidi;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileNameExtensionFilter;

/**
 * Takes an English properties file and uses a tsv output of translations
 * of each word/phrase to generate the properties files for all supported
 * languages.
 * 
 * The reason for using tsv (tab separated values) is so that commas 
 * may be used in the translations.
 *
 */
public class PropGen
{
	/**
	 * Whether or not to use the mxGraph % sign encoding for unicode
	 */
	public static boolean encodeValues = false;

	/**
	 * Specifies the file extension.
	 */
	public static String fileExtension = "txt";

	/**
	 * @param args
	 */
	public static void main(String[] args)
	{
		File tsvFile = selectFile("Select TSV file", "tsv");

		if (tsvFile != null)
		{
			try
			{
				execute(tsvFile);
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
	}

	/**
	 * Creates the translations for the given files.
	 */
	public static void execute(File tsvFile) throws IOException
	{
		if (tsvFile != null)
		{
			BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(tsvFile), "UTF-8"));

			// First line contains full language names
			in.readLine();

			// Second line contains file extensions
			String line = in.readLine();

			if (line != null)
			{
				String[] codes = line.split("\t");

				if (codes.length > 0)
				{
					if (codes[0].equals(""))
					{
						codes[0] = "i18n";
					}
					
					StringBuilder[] outputFiles = new StringBuilder[codes.length];

					while ((line = in.readLine()) != null)
					{
						String[] entries = line.split("\t");

						if (entries.length > 1)
						{
							String key = entries[0];

							if (key != null && key.length() > 0)
							{
								for (int i = 0; i < outputFiles.length; i++)
								{
									if (!codes[i].equals(""))
									{
										if (outputFiles[i] == null)
										{
											outputFiles[i] = new StringBuilder();
										}
										
										if (codes[i] == "i18n")
										{
											outputFiles[i].append(key + "=" + key + "\n");
										}
										else
										{
											String value = (entries.length > i) ? entries[i] : "";
	
											// Empty entries will be translated to English
											if (value.equals(""))
											{
												value = entries[1];
											}
	
											if (PropGen.encodeValues)
											{
												value = encodeString(value);
											}
	
											String lang = codes[i].toLowerCase();
											boolean rtl = false;
											
											if (lang.equals("ar") || lang.equals("fa") || lang.equals("he"))
											{
												Bidi bidi = new Bidi(value, 0);
												
												if (!bidi.isLeftToRight())
												{
													System.out.println(value);
													rtl = true;
												}
											}
											
											if (rtl)
											{
												outputFiles[i].append(key + "=" + "\u202B" + value + "\u202C" + "\n");
											}
											else
											{
												// Checks for HTML entities in output
												if (value.contains("<") || value.contains(">"))
												{
													System.out.println("**** WARNING: HTML Entities in " + lang + "/" + key + "=" + value);
												}

												outputFiles[i].append(key + "=" + value + "\n");
											}
										}
									}
								}
							}
						}
					}

					for (int i = 0; i < codes.length; i++)
					{
						if (!codes[i].equals(""))
						{
							String ext = (codes[i].equals("en")) ? "" : "_" + codes[i].toLowerCase();
							File file = new File(tsvFile.getParent() + "/dia" + ext + "." + fileExtension);
							BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "UTF-8"));
							writer.write("# *DO NOT DIRECTLY EDIT THIS FILE, IT IS AUTOMATICALLY GENERATED AND IT IS BASED ON:*\n");
							writer.write("# https://docs.google.com/spreadsheet/ccc?key=0AmQEO36liL4FdDJLWVNMaVV2UmRKSnpXU09MYkdGbEE\n");

							writer.write(outputFiles[i].toString());
							writer.close();

							System.out.println(file.getAbsolutePath() + " created");
						}
					}
				}
			}

			in.close();
		}
		else
		{
			System.out.println("No file specified");
		}
	}

	/**
	 * Encodes the given string.
	 */
	public static String encodeString(String value)
	{
		StringBuilder result = new StringBuilder();
		value = value.trim();

		for (int j = 0; j < value.length(); j++)
		{
			char character = value.charAt(j);

			String hexString = Integer.toHexString(character);

			// +255 value must have 4 digits, 3 doesn't work
			if (hexString.length() == 3)
			{
				hexString = "0" + hexString;
			}

			// Have to convert '%' too
			if (character == 37 || (character > 127 && character < 256))
			{
				result.append("%" + hexString);
			}
			else if (character > 255)
			{
				result.append("%u" + hexString);
			}
			else
			{
				result.append(value.substring(j, j + 1));
			}
		}

		return result.toString();
	}

	/**
	 * Shows a file dialog.
	 */
	public static File selectFile(String title, String extension)
	{
		JFileChooser chooser = new JFileChooser();
		chooser.addChoosableFileFilter(new FileNameExtensionFilter(extension.toUpperCase() + " File", extension));
		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
		chooser.setDialogTitle(title);

		if (chooser.showOpenDialog(chooser) == JFileChooser.APPROVE_OPTION)
		{
			return chooser.getSelectedFile();
		}

		return null;
	}

}
