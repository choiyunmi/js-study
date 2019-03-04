/*!
 * samsung.com - Phase2 - Custom Events Defined
 * src : js/src/smg/aem/event/smg.aem.event.js
 *
 * @version 1.0.0
 * @since 2016.10.10
 */
;(function(win) {
	'use strict';

	if('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if('undefined' === typeof win.smg.aem.customEvent) {
		win.smg.aem.customEvent = {};
	}

	/**
	 * @name window.smg.aem.customEvent
	 * @namespace
	 * @requires namespace.js
	 */
	win.smg.aem.customEvent = {
		CONNECT : {},
		VIDEO : {
			PLAY : 'AEM_VIDEO_PLAY',
			CLOSE : 'AEM_VIDEO_CLOSE'
		},
		RESPONSIVE : {
			GET_STATUS : 'AEM_RESPONSIVE_GET_STATUS',
			CHANGE : 'AEM_RESPONSIVE_CHANGE'
		},
		BACKTOTOP : {
			POSITION_CHANGE : 'AEM_POSITION_CHANGE'
		}
	};

})(window);
