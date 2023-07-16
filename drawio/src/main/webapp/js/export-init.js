var isLocalStorage = false;
var mxLoadStylesheets = false;

function getUrlParam(param)
{
	var result = (new RegExp(param + '=([^&]*)')).exec(window.location.search);
	
	if (result != null && result.length > 0)
	{
		return decodeURIComponent(result[1].replace(/\+/g, '%20'));
	}
	
	return null;
};

var remoteMath = getUrlParam('remoteMath') == '1';
var fallbackFont = getUrlParam('fallbackFont');
