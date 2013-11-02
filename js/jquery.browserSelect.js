/* 
  	All code is released under MIT license. Contact us on website for
	any kind of support.
	Author: Shreyas Purohit
	Website: http://www.bitourea.com
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is furnished
	to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	In addition, the following condition applies:
	Any other license of the libraries either javascript or java/scala used still
	applies and must be used according to its licensing information.
*/

/*
 * 
 *  This BrowserDetect Logic is taken from http://www.quirksmode.org/js/detect.html with minimal modifications
 *  as jquery support for browser detection is very minimal. This script performs well for our scenarios. 
 * 
 */
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "Unknown";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "9999";
		this.OS = this.searchString(this.dataOS) || "Unknown";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{		// for IE11+
			string: navigator.userAgent,
			subString: "Trident/",
			identity: "Explorer",
			versionSearch: "rv"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

(function( $ ) {
  var $this;
  	
  var modalHtml = "<div id='modal-overlay'></div>" +
"<div id='modal-container'>" +
    "<div id='modal-outer-content'>" +
        "<div id='modal-inner-content'>" +
          "<div id='modal-browser-header'><label></label></div>" +
          "<div id='modal-browser-types'>" +			
		  "</div>" +
        "</div>" +
        "<div id='modal-button-close'><a href='#' class='button'>Close</a></div>" +
    "</div>" +
"</div>"

  var methods={
		showModal: function(config){
			if(!this.hasClass('parent')){
				this.addClass('parent');
			}
			$('#modal-overlay').css({height:'100%', width:'100%'}).show();
			$('#modal-container').css({width:config.width, height:config.height, margin:'0 auto', background:config.backgroundColor}).show();			
		},
		attachHtml: function(config){
			this.append(modalHtml);
			$('#modal-browser-header label').append(config.message);
			$.each(config.suggestBrowsers, function(index, elem){
				$("#modal-browser-types").append(
					$("<a href='"+config[elem].dlLink+"'><img src='"+config[elem].image+"' alt='"+config[elem].label+"'/>"+config[elem].label+"</a>")
				);
			});
		},
		allowClose: function(config){
			if(config.allowClose){
				$('#modal-outer-content a.button').show();
				$('#modal-outer-content a, #modal-overlay').click(function () {     
					$this.removeClass('parent');					
					$('#modal-overlay, #modal-container').hide();       
					$('#modal-container').remove();
					$('#modal-overlay').remove();
					return false;
				});		
			}
		},
		attachEventHandlers: function(config){
			$(window).resize(function () {
				if ($('#modal-container').length > 0) methods.showModal.call($this,config);       
			});
		}
  };
  
  $.fn.browserSelect = function(options) {
	 var config = $.extend({
		 width: '80%',
		 height: '80%',
		 backgroundColor: '#FFFFFF',
		 allowClose: false,
		 suggestBrowsers: ['ie9','firefox', 'chrome', 'opera'],
		 ie9: {
			 image: 'http://upload.wikimedia.org/wikipedia/en/1/10/Internet_Explorer_7_Logo.png',
			 dlLink: 'http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-9/worldwide-languages',
			 label: 'IE 9'
		 },
		 firefox: {
			 image: 'https://assets.mozillalabs.com/Brands-Logos/Firefox/logo-only/firefox_logo-only_RGB.png',
			 dlLink: 'http://www.firefox.org/en-US/firefox/all/',
			 label: 'Firefox'
		 },
		 chrome: {
			 image: 'http://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png',
			 dlLink: 'http://www.google.com/chrome',
			 label: 'Chrome'
		 },
		 opera: {
			 image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Opera_browser_logo_2013_vector.svg/500px-Opera_browser_logo_2013_vector.svg.png',
			 dlLink: 'http://www.opera.com/download/',
			 label: 'Opera'
		 },
		 displayWhen: [{browser: 'explorer', version: 9}],
		 message: 'The website is best viewed using latest version of the below browsers. Please upgrade.',
		 useJqueryDetect: false
	 }, options);
	
	$this = this;
	var currentBrowser;	
	if(config.useJqueryDetect){
		currentBrowser=$.browser
	}else{
		currentBrowser= {};
		currentBrowser[BrowserDetect.browser.toLowerCase()] = true;
		currentBrowser['version'] = BrowserDetect.version;
	}
	
	$.each(config.displayWhen, function(index, elem){
		if(currentBrowser.hasOwnProperty(elem.browser)){
			if(parseFloat(currentBrowser.version) < elem.version){				
				methods.attachHtml.call($this, config); 				
				methods.allowClose.call($this, config);
				methods.attachEventHandlers(config);
				methods.showModal.call($this, config); 
				return true;
			}
		}
	});
  };
})( jQuery );
