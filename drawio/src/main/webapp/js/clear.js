try
{
	function write(text)
	{
		document.body.appendChild(document.createTextNode(text));
	};

	function writeln(text)
	{
		write(text);
		document.body.appendChild(document.createElement('br'));
	};
	
	write('Clearing Cache...');

	navigator.serviceWorker.getRegistrations().then(function(registrations)
	{
		if (registrations != null && registrations.length > 0)
		{
			for (var i = 0; i < registrations.length; i++)
			{
				registrations[i].unregister();
			}

			writeln('Done');
		}
		else
		{
			writeln('OK');
		}
		
		if ((/test\.draw\.io$/.test(window.location.hostname)) ||
			(/stage\.diagrams\.net$/.test(window.location.hostname)) ||
			(/app\.diagrams\.net$/.test(window.location.hostname)))
		{
			var link = document.createElement('a');
			link.setAttribute('href', './');
			link.appendChild(document.createTextNode('Start App'));
			document.body.appendChild(link);
		}
	});

	// Clears corresponding domain of current domain
	var iframe = document.createElement('iframe');
	iframe.style.display = 'none';

	if (window.location.hostname == 'ac.draw.io')
	{
		iframe.src = 'https://clear.diagrams.net';
	}
	else
	{
		iframe.src = 'https://clear.draw.io';
	}

	document.body.appendChild(iframe);
}
catch (e)
{
	write('Error: ' + e.message);
}
