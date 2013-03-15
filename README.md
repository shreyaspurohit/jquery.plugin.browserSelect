Jquery Browser Select Plugin
=================================

This plugin allows you to show a dialog to upgrade user browser when it is not upto the
required specification. This is mainly used to redire older version of IE users to upgrade
to later new versions or prompt them to use different and better browser.

Usage
-----
Include the script in the head of the HTML page.

	<script type="text/javascript" src="jquery.browserSelect.js"></script>

Include the stylesheet in the head of the HTML page.
	
	<link type="text/css" rel="stylesheet" href="browserSelect.css" />
	
On document ready call the plugin.

	$('body').browserSelect(options);
	
Options
-------
* width
  * Default: '80%'
  * Type: String
  * Description: Width of the modal dialog
* height
  * Default: '80%'
  * Type: String
  * Description: Height of the modal dialog	
* backgroundColor
  * Default: '#FFFFFF'	
  * Type: String
  * Description: Background color of the modal dialog	
* allowClose
  * Default: false	
  * Type: Boolean
  * Description: When true displays a close button on the dialog. The dialog can be closed by clicking on the closed button or by clicking anywhere	outside the dialog.
* suggestBrowsers
  * Default: ['ie9','firefox', 'chrome', 'opera']	
  * Type: Array of String
  * Description: Array of the browsers that are displayed on the dialog as an option to select for upgrade. 	
* [browserName]
  * Defaults: ie9, firefox, chrome, opera	
  * Type: Object [browserDetails]
  * Description: For each of the items in suggestBrowsers array, a [browserName] with same name defines the [browserDetails] object.
  * Example: 
  
		suggestBrowsers: ['ie9'],
		ie9: {
			 image: 'http://upload.wikimedia.org/wikipedia/en/1/10/Internet_Explorer_7_Logo.png',
			 dlLink: 'http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-9/worldwide-languages',
			 label: 'IE 9'
		}
		
* [browserDetails]
  * Type: Object {image: [imageUrl], dlLink: [downloadLink], label: [labelToDisplay]}
  * Description: For each of the items in suggestBrowsers array, a [browserName] with same name defines the [browserDetails] object.
* displayWhen
  * Defaults: [{browser: 'msie', version: 9}]
  * Type: Array of {browser: [browserType], version: [browserVer]}
  * Description: This options displays the browser select dialog when browser is on from the array with type given by [browserType] and when the version is lesser than [browserVersion]. [browserType] can be one of 'msie', 'webkit', 'mozilla', and 'opera' as defined by $.browser from jquery.
* message
  * Defaults: 'The website is best viewed using latest version of the below browsers. Please upgrade.'
  * Type: String
  * Description: The dialog header to display that provides users with the option to upgrade browser.
 
CSS
---
The dialog has the below html structure. You can customize as much css as you want.

	<div id="modal-container">
	   <div id="modal-outer-content">
		  <div id="modal-inner-content">
			 <div id="modal-browser-header"><label></label></div>
			 <div id="modal-browser-types">
				<a href="">
					<img alt="" src="">
				</a>
				<a href="">
					<img alt="" src="">
				</a>
		     </div>
		  </div>
		  <div id="modal-button-close">
			 <a class="button" href="#">Close</a>
		  </div>
	   </div>
	</div>

Live in Action
--------------

You see it live in action at http://browserselect.bitourea.com/ or http://shreyaspurohit.github.com/jquery.plugin.browserSelect/

Licensing
---------
Released under MIT license, go ahead and use, modify, distribute as you wish. The license is provided in LICENSE.txt. The license of other libraries used must be used as defined by them. 	
