// Page formats are in 1/100 inch (mxPrintPreview.pixelsPerInch), so one unit is 254 microns
const MICRONS_PER_PAGE_UNIT = 254;

// Options for webContents.print() from the page format of the printed
// diagram. The paper goes to the native print dialog in portrait order
// with the orientation as a separate flag, as macOS and GTK pick the printer's
// own paper (A4, Letter...) by size and rotate it for landscape. A landscape
// page sent as a wide sheet opened as an unknown custom paper in portrait, and
// choosing Landscape in the dialog turned that wide sheet back into a portrait
// one. Sizes in CSS pixels (96 dpi) never matched a printer paper either
// [jgraph/drawio-desktop#2568]
export function getPrintOptions(pageWidth, pageHeight)
{
	var width = pageWidth * MICRONS_PER_PAGE_UNIT;
	var height = pageHeight * MICRONS_PER_PAGE_UNIT;

	return {
		// The render paginates at pageFormat * pageScale to match the editor's
		// page breaks [jgraph/drawio#5540], and Chromium already shrinks a page
		// that is larger than the paper to fit it when printing (Blink's
		// TargetScaleForPage, as in the web app), so a scaleFactor of
		// 100 / pageScale shrank pages twice. scaleFactor is an integer
		// percent, not a fraction [jgraph/drawio-desktop#2451]
		scaleFactor: 100,
		printBackground: true,
		landscape: width > height,
		pageSize: {
			width: Math.min(width, height),
			height: Math.max(width, height)
		},
		margins: {
			marginType: 'none' // no margin
		}
	};
}
