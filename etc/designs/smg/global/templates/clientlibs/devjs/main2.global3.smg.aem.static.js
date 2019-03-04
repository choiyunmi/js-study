/*!
 * samsung.com - Phase2 - Static Values Defined
 * src : js/src/smg/aem/static/smg.aem.static.js
 *
 * @version 1.0.0
 * @since 2016.02.04
 */
;(function(win) {
	'use strict';

	if('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if('undefined' === typeof win.smg.aem.varStatic) {
		win.smg.aem.varStatic = {};
	}

	/**
	 * @name window.smg.aem.varStatic
	 * @namespace
	 * @requires namespace.js
	 */
	win.smg.aem.varStatic = {
		CSS : {
			VIDEO_OPEN : 'video-open',
			LAYER_OPENED : 'layer-opened-mo',

			SEARCH_POS : 'search-pos',
			NAV_OPEN : 'nav-open',
			NAV_CLOSE : 'nav-close',

			HAS_ANIMATED : 'has-animated',

			IS_SHOW : 'is-show',
			IS_HIDE : 'is-hide',
			IS_OPEN : 'is-open',
			IS_SELECT : 'is-select',

			JS_IMG_SRC : 'js-img-src',
			JS_IMG_LAZY : 'js-img-lazy',
			JS_IMG_LAZY_LOADED : 'js-img-lazy-loaded',

			LAZY_LOADED : 'lazy-loaded',

			SWITCH_MOBILE : 'switch-mobile',
			SWITCH_TABLET : 'switch-tablet'
		},
		DATA_ATTR : {
			SRC_PC : 'data-src-pc',
			SRC_MOBILE : 'data-src-mobile',
			DATA_SRC : 'data-src'
		},
		SUPPORT : {
			NO_SVG : 'no-svg',
			NO_CSS3 : 'no-css3',
			IE_LT_8 : 'lt-ie8',
			COOKIE_WARNING : 'cookie-warning',
			TOUCH_DEVICE : 'touch-device'
		},
		RESPONSIVE : {
			DESKTOP : {
				NAME : 'desktop'
			},
			TABLET : {
				NAME : 'tablet',
				WIDTH : 1280
			},
			MOBILE : {
				NAME : 'mobile',
				WIDTH : 768
			},
			MIN_MOBILE : {
				NAME : 'min_mobile',
				WIDTH : 320
			},
			GNB : {
				NAME : 'gnb_reponsive',
				WIDTH : 1024
			}
		},
		BACKTOTOP : {
			TOP_POSITION : 'top_position'
		}
	};

})(window);
