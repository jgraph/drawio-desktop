(function() {
	window.MathJax =
	{
		options:
		{
			skipHtmlTags: {'[+]': ['text']},
			ignoreHtmlClass: 'geDisableMathJax'
		},
		loader:
		{
			load: [(window.opener.urlParams['math-output'] == 'html') ?
				'output/chtml' : 'output/svg', 'input/tex',
				'input/asciimath', 'ui/safe']
		},
		startup:
		{
			ready: function()
			{
				MathJax.startup.defaultReady();

				MathJax.startup.promise.then(function()
				{
					if (window.IMMEDIATE_PRINT)
					{
						window.print();
					}
				});
			}
		}
	};

	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', window.opener.DRAW_MATH_URL + '/startup.js');
	
	var t = document.getElementsByTagName('script')[0];
			  	
  	if (t != null)
  	{
  		t.parentNode.insertBefore(s, t);
  	}
})();
