// Restores the window bounds saved in the 'lastWinSize' setting, validating
// them against the current display layout: monitors may have been removed or
// changed resolution since the value was saved [jgraph/drawio-desktop#2282].
// Pure functions (no Electron imports) so they are unit testable.

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;
const MIN_SIZE = 500;

// At least VISIBLE_WIDTH x VISIBLE_HEIGHT pixels of the title bar strip at the
// top of the window must be on a display for the window to be seen and dragged
const TITLE_BAR_HEIGHT = 40;
const VISIBLE_WIDTH = 100;
const VISIBLE_HEIGHT = 20;

// Parses the comma separated 'lastWinSize' value: width,height,x,y,maximized,fullScreen
export function parseLastWinSize(lastWinSizeStr)
{
	const parts = (lastWinSizeStr || '').split(',');
	let width = parseInt(parts[0]);
	let height = parseInt(parts[1]);
	const x = parseInt(parts[2]);
	const y = parseInt(parts[3]);

	if (!isFinite(width))
	{
		width = DEFAULT_WIDTH;
	}

	if (!isFinite(height))
	{
		height = DEFAULT_HEIGHT;
	}

	// TODO On some Mac OS, double click the titlebar set incorrect window size
	if (width < MIN_SIZE)
	{
		width = MIN_SIZE;
	}

	if (height < MIN_SIZE)
	{
		height = MIN_SIZE;
	}

	return {
		width: width,
		height: height,
		x: isFinite(x) ? x : null,
		y: isFinite(y) ? y : null,
		maximized: parts[4] === 'true',
		fullScreen: parts[5] === 'true'
	};
}

function isTitleBarVisible(bounds, workAreas)
{
	return workAreas.some((area) =>
	{
		const visibleWidth = Math.min(bounds.x + bounds.width, area.x + area.width) -
			Math.max(bounds.x, area.x);
		const visibleHeight = Math.min(bounds.y + TITLE_BAR_HEIGHT, area.y + area.height) -
			Math.max(bounds.y, area.y);

		return visibleWidth >= VISIBLE_WIDTH && visibleHeight >= VISIBLE_HEIGHT;
	});
}

// Returns the {x, y, width, height} to use for a new window. The given bounds
// are kept if enough of the title bar is visible on one of the given work
// areas, otherwise the window is centered on the primary display, shrunk to
// fit its work area if needed (centering an oversized window would push the
// title bar above the top of the screen)
export function placeWindowOnDisplays(bounds, workAreas, primaryWorkArea)
{
	if (bounds.x != null && bounds.y != null && isTitleBarVisible(bounds, workAreas))
	{
		return {x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height};
	}

	const width = Math.min(bounds.width, primaryWorkArea.width);
	const height = Math.min(bounds.height, primaryWorkArea.height);

	return {
		x: primaryWorkArea.x + Math.floor((primaryWorkArea.width - width) / 2),
		y: primaryWorkArea.y + Math.floor((primaryWorkArea.height - height) / 2),
		width: width,
		height: height
	};
}
