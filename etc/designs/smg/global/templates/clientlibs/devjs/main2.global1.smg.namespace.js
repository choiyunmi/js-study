/*!
 * samsung.com - Phase2 - Javascript Namespace Defined
 * src : js/src/smg/aem/namespace.js
 *
 * @version 1.0.0
 * @since 2016.02.01
 */
;(function(win) {
	'use strict';

	if('undefined' === typeof win.smg) {
		/**
		 * samsung.com namespace
		 * @name  window.smg
		 * @namespace
		 */
		win.smg = {};
	}

	/**
	 * Phase2 AEM Namespace
	 * @name  window.smg.aem
	 * @namespace
	 */
	win.smg.aem = win.smg.aem || {};

	/**
	 * Phase2 AEM Static Values Defined
	 */
	win.smg.aem.varStatic = win.smg.aem.varStatic || {};

	/**
	 * Phase2 AEM Custom Events Defined
	 */
	win.smg.aem.customEvent = win.smg.aem.customEvent || {};

	/**
	 * Phase2 AEM Utility Script Defined
	 */
	win.smg.aem.util = win.smg.aem.util || {};

	/**
	 * Phase2 AEM Common Script Defined
	 */
	win.smg.aem.common = win.smg.aem.common || {};

	/**
	 * Phase2 AEM Components Namespace
	 * @name  window.smg.aem.components
	 * @namespace
	 */
	win.smg.aem.components = win.smg.aem.components || {};

	/**
	 * Phase2 Home Components Namespace
	 * @name  window.smg.aem.components.home
	 * @namespace
	 */
	win.smg.aem.components.home = win.smg.aem.components.home || {};

	/**
	 * Phase2 AboutSamsung Components Namespace
	 * @name  window.smg.aem.components.aboutsamsung
	 * @namespace
	 */
	win.smg.aem.components.aboutsamsung = win.smg.aem.components.aboutsamsung || {};

	/**
	 * Phase2 AEM Templates Namespace
	 * @name  window.smg.aem.templates
	 * @namespace
	 */
	win.smg.aem.templates = win.smg.aem.templates || {};

	/**
	 * Phase2 Home Templates Namespace
	 * @name  window.smg.aem.templates.home
	 * @namespace
	 */
	win.smg.aem.templates.home = win.smg.aem.templates.home || {};
})(window);