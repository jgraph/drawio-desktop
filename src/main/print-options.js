// Page formats are in 1/100 inch (mxPrintPreview.pixelsPerInch), so one unit is 254 microns
const MICRONS_PER_PAGE_UNIT = 254;

// Options for webContents.print() from the page format and page scale of the
// printed diagram. The paper goes to the native print dialog in portrait order
// with the orientation as a separate flag, as macOS and GTK pick the printer's
// own paper (A4, Letter...) by size and rotate it for landscape. A landscape
// page sent as a wide sheet opened as an unknown custom paper in portrait, and
// choosing Landscape in the dialog turned that wide sheet back into a portrait
// one. Sizes in CSS pixels (96 dpi) never matched a printer paper either
// [jgraph/drawio-desktop#2568]
export function getPrintOptions(pageWidth, pageHeight, pageScale)
{
	var width = pageWidth * MICRONS_PER_PAGE_UNIT;
	var height = pageHeight * MICRONS_PER_PAGE_UNIT;

	return {
		// scaleFactor is an integer percent in Chromium (Electron 41+ honors
		// it in the native macOS print dialog), so pageScale 1 = 100%, not 1%.
		// The render paginates at pageFormat * pageScale to match the
		// editor's page breaks, so each rendered page is pageScale times
		// the physical paper and must shrink by 1 / pageScale to fit one
		// sheet. Chromium accepts 10-200%, which bounds the printable
		// page scale to 50%-1000% [jgraph/drawio#5540]
		scaleFactor: Math.max(10, Math.min(200, Math.round(
			100 / (pageScale > 0 ? pageScale : 1)))),
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
