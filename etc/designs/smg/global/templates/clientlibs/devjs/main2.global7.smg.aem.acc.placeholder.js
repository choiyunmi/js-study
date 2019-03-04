/*!
 * samsung.com - Phase2 - Accessibility Placeholder Script
 * src : js/src/smg/aem/accessibility/placehoder/smg.aem.acc.placeholder.js
 *
 * @version 1.0.0
 * @since 2016.02.04
 */
;(function(win, $) {
	'use strict';

	if('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if('undefined' === typeof win.smg.aem.accessibility) {
		win.smg.aem.accessibility = {};
	}

	// Utility Script
	var UTIL = win.smg.aem.util;

	var namespace = win.smg.aem.accessibility;

	/**
	 * @name window.smg.aem.accessibility.placeholder
	 * @namespace
	 * @requires jQuery
	 * @requires namespace.js
	 * @requires window.smg.aem.static.js
	 * @requires window.smg.aem.util.js
	 * @requires window.smg.aem.event.js
	 */
	namespace.placeholder = (function() {
		/**
		 * @description Default Options
		 * @private
		 * @type {Object}
		 */
		var defParams = {
			targets : '[data-accessibility=\'placeholder\']',
			targetsValue : 'data-acc-placeholder-value',
			holder : 'data-acc-placeholder',
			holderTarget : 'data-acc-placeholder-target',
			onClass : 'data-acc-onclass'
		};
		return {
			init : function(container, args) {
				if (!(this.container = container).size()) return;

				this.opts = UTIL.def(defParams, (args || {}));

				this.setElements();
				this.setBindEvents();
			},
			setElements : function() {
				this.targets = this.container.find(this.opts.targets);

				$.each(this.targets, $.proxy(function(idx, elm) {
					$(elm).attr(this.opts.targetsValue, $(elm).val());
				}, this));
			},
			setBindEvents : function() {
				this.targets.on('focus', $.proxy(this.onTargetsFocus, this))
							.on('blur', $.proxy(this.onTargetsBlur, this))
							.on('keydown keyup', $.proxy(this.onTargetsChange, this));
			},
			unElements : function() {
				$.each(this.targets, $.proxy(function(idx, elm) {
					$(elm).val($(elm).attr(this.opts.targetsValue));
				}, this));

				var target,
				targetInfo;
				$.each($('[' + this.opts.holder + ']'), $.proxy(function(idx, elm) {
					target = $(elm);
					targetInfo = this.getTargetInfo(target);

					if (targetInfo.onClass) {
						target.removeClass(targetInfo.onClass);
					} else {
						target.show();
					}
				}, this));

				this.targets = [];
			},
			unBindEvents : function() {
				this.targets.off('focus', $.proxy(this.onTargetsFocus, this))
							.off('blur', $.proxy(this.onTargetsBlur, this));
			},
			onTargetsFocus : function(e) {
				var target = $(e.currentTarget),
				targetInfo = this.getTargetInfo(target),
				holder = targetInfo.holder,
				onClass = targetInfo.onClass;

				if (!holder) {
					return;
				}

				if (target.val()) {
					if (onClass) {
						holder.addClass(onClass);
					} else {
						holder.css({ 'visibility' : 'hidden' });
					}
				}
			},
			onTargetsBlur : function(e) {
				var target = $(e.currentTarget),
				targetInfo = this.getTargetInfo(target),
				holder = targetInfo.holder,
				onClass = targetInfo.onClass;

				if (!holder) {
					return;
				}

				if (!target.val()) {
					if (onClass) {
						holder.removeClass(onClass);
					} else {
						holder.css({ 'visibility' : 'visible' });
					}
				}
			},
			onTargetsChange : function(e) {
				var target = $(e.currentTarget),
				targetInfo = this.getTargetInfo(target),
				holder = targetInfo.holder,
				onClass = targetInfo.onClass;

				if (!holder) {
					return;
				}

				if (target.val()) {
					if (onClass) {
						holder.addClass(onClass);
					} else {
						holder.css({ 'visibility' : 'hidden' });
					}
				} else {
					if (onClass) {
						holder.removeClass(onClass);
					} else {
						holder.css({ 'visibility' : 'visible' });
					}
				}
			},
			getTargetInfo : function(target) {
				target = $('[' + this.opts.holder + '=\'' + target.attr(this.opts.holderTarget) + '\']');

				if (target.size()) {
					return { holder : target, onClass : target.attr(this.opts.onClass) };
				}
				return { holder : '', onClass : '' };
			},
			destroy: function() {
				this.unBindEvents();
				this.unElements();
			},
			refresh : function(container, args) {
				container = container || this.container;

				this.destroy();
				this.init(container, args);
			}
		};
	})();

	$(function() {
		namespace.placeholder.init($('body'));
	});

})(window, window.jQuery);