var currentBrowser;
var currentBrowserVer;
var realConfig;
function onLoad(){				
	currentBrowser=BrowserDetect.browser.toLowerCase();
	currentBrowserVer=BrowserDetect.version;						
	
	$('input[value=explorer]').attr('checked', true);	
	$('#explorerVer').val(9);
	$('#modalWidth').val(80);
	$('#modalHeight').val(80);
	$('#backgroundColor').val('FFFFFF');
	$('#backgroundColor').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val(hex);
			$(el).ColorPickerHide();
		},
		onChange: function(hsb, hex, rgb, el) {
			$('#backgroundColor').val(hex);
		},
		onHide: function(){
			updateApiCall();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
	$('#message').val('The website is best viewed using latest version of the below browsers. Please upgrade.');
	var dialogBrowserVersion=parseFloat(currentBrowserVer)+1;	
	$('body').browserSelect({allowClose: true, displayWhen: [{browser:currentBrowser, version:dialogBrowserVersion}]});
	$('#apiCall').append(document.createTextNode("<script src='js/jquery.browserSelect.js'></script>\n" +
	'<link type="text/css" rel="stylesheet" href="css/browserSelect.css" />\n' +
	'<script>\n' +
	'$(document).ready(function(){\n' +	
		'\t$("body").browserSelect({\n' +
		'\t\tallowClose: true,\n' +  
		'\t\tdisplayWhen: [\n'+
		'\t\t\t{browser:"' + currentBrowser + '", version:' + dialogBrowserVersion + '}\n'+
		'\t\t]\n'+
		'\t});\n'+
		'</script>'));
	
	$('#ie9Img').val('http://upload.wikimedia.org/wikipedia/en/1/10/Internet_Explorer_7_Logo.png');
	$('#ie9dl').val('http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-9/worldwide-languages');
	$('#ie9lbl').val('IE 9');
	
	$('#ffImg').val('https://assets.mozillalabs.com/Brands-Logos/Firefox/logo-only/firefox_logo-only_RGB.png');
	$('#ffdl').val('http://www.firefox.org/en-US/firefox/all/');
	$('#fflbl').val('Firefox');
	
	$('#cImg').val('http://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png');
	$('#cdl').val('http://www.google.com/chrome');
	$('#clbl').val('Chrome');
	
	$('#oImg').val('http://business.opera.com/content/download/436/33260/version/1/file/Opera_512x512.png');
	$('#odl').val('http://www.opera.com/download/');
	$('#olbl').val('Opera');
	
	$('.group').hover(function(){
		$(this).addClass('sectionGroup');
		$(this).find('.sec').addClass('widthAdjust');
	},function(){
		$(this).find('.sec').removeClass('widthAdjust');
		$(this).removeClass('sectionGroup');
	});
	
	$('.contentGroup').hover(function(){
		$('.arrow').show();		
	},function(){
		$('.arrow').hide();
	});
	
	handleChange();
	gPrettyPrint();	
	realConfig=theConfig();							
}
function gPrettyPrint(){
	SyntaxHighlighter.highlight();
}
function handleChange(){
	$('.sec').change(function(){
		updateApiCall();					
	});
}
function updateApiCall(){
	$('#apiCall').remove();
	$('.apiCallDiv').append('<pre id="apiCall" class="brush: js; toolbar: false"></pre>');
	
	$('#apiCall').append(document.createTextNode("<script src='js/jquery.browserSelect.js'></script>\n" +
	'<link type="text/css" rel="stylesheet" href="css/browserSelect.css" />\n' +
	'<script>\n' +
	'$(document).ready(function(){\n' +
	"\t$('body').browserSelect("+JSON.stringify(diffConfig(realConfig, theConfig()), null, '\t')+");\n" +
	"});\n" +
	'</script>'));
			
	gPrettyPrint();
}
function handleSubmit(){
	var config= theConfig();								
	$('body').browserSelect($.extend(config,{
		displayWhen: [{browser:currentBrowser, version:parseFloat(currentBrowserVer)+1}]
	}));
}
function toggleEditDoneLabel(that){
	if($(that).val() == "Edit"){
		$(that).val("Done");
	}else{
		$(that).val("Edit");
	}
}
function diffConfig(c1, c2){
	var diffObj = {};
	$.each( c1, function( key, value ) {
		if(JSON.stringify(value) !== JSON.stringify(c2[key])){
			diffObj[key] = c2[key]
		}
	});
	return diffObj;
}
function theConfig(){
	var suggestBr = [];
	$.each($("input[name='suggestBrowsers']:checked"),  function() {
	  suggestBr.push($(this).val());
	});
	var dispWhen = [];
	$.each($("input[name='grpBrowser']:checked"), function(){
		dispWhen.push({browser:$(this).val(), version:parseFloat($('#'+$(this).val()+'Ver').val())});
	});
	return {
		allowClose: $('#allowClose').is(':checked'),					
		width: $('#modalWidth').val() + '%',
		height: $('#modalHeight').val() + '%',
		backgroundColor: '#'+$('#backgroundColor').val(),
		suggestBrowsers: suggestBr,
		message: $('#message').val(),
		ie9: {
			 image: $('#ie9Img').val(),
			 dlLink: $('#ie9dl').val(),
			 label: $('#ie9lbl').val()
		},
		firefox: {
			 image: $('#ffImg').val(),
			 dlLink: $('#ffdl').val(),
			 label: $('#fflbl').val()
		},
		chrome: {
			 image: $('#cImg').val(),
			 dlLink: $('#cdl').val(),
			 label: $('#clbl').val()
		},
		opera: {
			 image: $('#oImg').val(),
			 dlLink: $('#odl').val(),
			 label: $('#olbl').val()
		},
		displayWhen: dispWhen
	};
}
