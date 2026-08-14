import { BrowserWindow } from 'electron';
import { EventEmitter } from 'events';

export default class ProgressBar extends EventEmitter
{
	/**
	 * options: { title, text, detail, indeterminate (default true), initialValue (default 0) }
	 *
	 * API surface matches the electron-progressbar package:
	 *   .detail         (get/set) — updates the sub-label text
	 *   .value          (get/set) — updates bar position; emits 'progress' or 'completed'
	 *   ._window        — the underlying BrowserWindow (may be null after close)
	 *   .close()        — destroys the window
	 *   .isCompleted()  — true once value reaches 100
	 *   events: 'ready', 'completed', 'aborted', 'progress'
	 */
	constructor(options = {})
	{
		super();

		this._indeterminate = options.indeterminate !== false;
		this._title    = options.title    || '';
		this._text     = options.text     || '';
		this._detail   = options.detail   || '';
		this._value    = options.initialValue || 0;
		this._completed = false;
		this._ready     = false;
		this._pending   = []; // _exec() calls deferred until did-finish-load
		this._window    = null;

		this._createWindow();
	}

	_createWindow()
	{
		this._window = new BrowserWindow({
			width: 450,
			height: 175,
			resizable: false,
			minimizable: false,
			maximizable: false,
			closable: false,
			title: this._title,
			show: false,
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
			},
		});

		this._window.setMenu(null);

		this._window.once('ready-to-show', () =>
		{
			if (this._window) this._window.show();
		});

		this._window.on('closed', () =>
		{
			if (!this._completed) this.emit('aborted', this._value);
			this._window = null;
		});

		this._window.webContents.on('did-finish-load', () =>
		{
			this._ready = true;
			for (const js of this._pending) this._run(js);
			this._pending = [];
			this.emit('ready');
		});

		this._window.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(this._html()));
	}

	_html()
	{
		const det = this._indeterminate;
		const barStyle = det
			? 'width:40%;animation:indeterminate 1.4s ease-in-out infinite'
			: `width:${this._value}%;transition:width 0.25s ease`;

		return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:#f0f0f0;padding:24px;height:100vh;
  display:flex;flex-direction:column;justify-content:center;
  user-select:none;-webkit-app-region:drag}
#text{font-size:13px;color:#333;margin-bottom:14px}
#track{width:100%;height:4px;background:#d0d0d0;border-radius:2px;overflow:hidden;margin-bottom:10px}
#bar{height:100%;background:#0078d4;border-radius:2px;${barStyle}}
#detail{font-size:12px;color:#666}
${det ? '@keyframes indeterminate{0%{transform:translateX(-200%)}100%{transform:translateX(400%)}}' : ''}
</style></head><body>
<div id="text">${esc(this._text)}</div>
<div id="track"><div id="bar"></div></div>
<div id="detail">${esc(this._detail)}</div>
</body></html>`;
	}

	_run(js)
	{
		if (this._window && !this._window.isDestroyed())
		{
			this._window.webContents.executeJavaScript(js).catch(() => {});
		}
	}

	_exec(js)
	{
		if (this._ready) this._run(js);
		else this._pending.push(js);
	}

	// ── Public API ────────────────────────────────────────────────────────────

	get detail() { return this._detail; }

	set detail(v)
	{
		this._detail = v;
		this._exec(`document.getElementById('detail').textContent=${JSON.stringify(v)}`);
	}

	get value() { return this._value; }

	set value(v)
	{
		this._value = v;
		this._exec(`document.getElementById('bar').style.width=${JSON.stringify(v + '%')}`);

		if (v >= 100)
		{
			this._completed = true;
			this.emit('completed');
		}
		else
		{
			this.emit('progress', v);
		}
	}

	close()
	{
		if (this._window && !this._window.isDestroyed())
		{
			this._window.destroy();
		}
		this._window = null;
	}

	isCompleted() { return this._completed; }
}

function esc(s)
{
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
