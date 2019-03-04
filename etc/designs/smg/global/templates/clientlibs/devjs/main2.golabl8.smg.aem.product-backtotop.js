/*!
 * samsung.com - Phase2 - Product Templates
 * src : js/src/smg/aem/templates/product/product-backtotop.js
 *
 * @version 1.0.0
 * @since 2016.10.10
 */
;(function (win, $) {
	'use strict';

	if('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if('undefined' === typeof win.smg.aem.templates) {
		win.smg.aem.templates = {};
	}

	if('undefined' === typeof win.smg.aem.templates.product) {
		win.smg.aem.templates.product = {};
	}

	// V_STATIC Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	var namespace = win.smg.aem.templates.product;

	/**
	 * @name window.smg.aem.templates.product.details
	 * @namespace
	 * @requires jQuery
	 * @requires namespace.js
	 */
	namespace.backtotop = (function() {
		/**
		 * @description Default Options
		 * @private
		 * @type {Object}
		 */
		var defParams = {
			topBtn : {
				wrap : '.s-gotop-wrap',
				btn : '.s-btn-gotop',
				onClass : 's-show',
				speed : 1000
			},
			footer : {
				target : '#footer'
			}
		};
		return {
			init : function(container, args) {
				if (!(this.container = container).size()) return;

				this.opts = UTIL.def(defParams, (args || {}));
				this.setElements();
				this.onBindEvent();
				this.defSetup();
			},
			setElements : function() {
				this.htmlBody = $('html, body');
				this.footer = $(this.opts.footer.target);
				this.topBtnWrap = this.container.find(this.opts.topBtn.wrap);
				this.topBtn = this.topBtnWrap.find(this.opts.topBtn.btn);
			},
			onBindEvent : function() {
				this.topBtn.on('click', $.proxy(this.onTopBtnClick, this));

				$(win).on('scroll touchmove', $.proxy(this.onScrollListener, this));
				this.onScrollListener();

				$(CST_EVENT.CONNECT).on(CST_EVENT.BACKTOTOP.POSITION_CHANGE, $.proxy(this.setPosition, this));
			},
			defSetup : function() {
				$(win).on('load', function(e) {
					$(win).trigger('scroll');
				});
			},
			onTopBtnClick : function() {
				this.htmlBody.animate({scrollTop : 0}, this.opts.topBtn.speed);
			},
			setPosition : function(e, data) {
				if(this.topPosition === data.TOP_POSITION) return;
				this.topPosition = data.TOP_POSITION;
			},
			onScrollListener : function() {
				var winTop = $(win).scrollTop(),
				winHeight = UTIL.winSize().h,
				footerTop = (this.footer.size()) ? this.footer.offset().top : 0;

				if(typeof this.topPosition === 'undefined') this.topPosition = winTop;

				if (winTop > this.topPosition && (winTop + winHeight) < footerTop) {
					if(!this.topBtnWrap.hasClass(this.opts.topBtn.onClass)) this.topBtnWrap.addClass(this.opts.topBtn.onClass);
				} else {
					if(this.topBtnWrap.hasClass(this.opts.topBtn.onClass)) this.topBtnWrap.removeClass(this.opts.topBtn.onClass);
				}
			}
		};
	})();

	$(function() {
		namespace.backtotop.init($('body'));
	});
})(window, window.jQuery);
