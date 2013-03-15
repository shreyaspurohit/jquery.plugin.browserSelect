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
			this.addClass('parent');
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
				if (!$('#modal-container').is(':hidden')) methods.showModal.call($this,config);       
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
			 image: 'http://business.opera.com/content/download/436/33260/version/1/file/Opera_512x512.png',
			 dlLink: 'http://www.opera.com/download/',
			 label: 'Opera'
		 },
		 displayWhen: [{browser: 'msie', version: 9}],
		 message: 'The website is best viewed using latest version of the below browsers. Please upgrade.'
	 }, options);
	var currentBrowser=$.browser;
	$this = this;
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
