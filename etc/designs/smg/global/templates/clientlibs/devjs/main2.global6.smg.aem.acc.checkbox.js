/*!
 * samsung.com - Phase2 - Accessibility Checkbox Script
 * src : js/src/smg/aem/accessibility/placehoder/smg.aem.acc.checkbox.js
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
	 * @name window.smg.aem.accessibility.checkbox
	 * @namespace
	 * @requires jQuery
	 * @requires namespace.js
	 * @requires window.smg.aem.static.js
	 * @requires window.smg.aem.util.js
	 * @requires window.smg.aem.event.js
	 */
	namespace.checkbox = (function() {
		/**
		 * @description Default Options
		 * @private
		 * @type {Object}
		 */
		var defParams = {
			targets : '[data-accessibility=\'checkbox\']',
			targetsValue : 'data-acc-checkbox-value',
			holder : 'data-acc-checkbox',
			holderTarget : 'data-acc-checkbox-target',
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
				this.holders = $('[' + this.opts.holder + ']');

				$.each(this.targets, $.proxy(function(idx, elm) {
					$(elm).attr(this.opts.targetsValue, $(elm).attr('checked'));
				}, this));
			},
			setBindEvents : function() {
				this.holders.on('click', $.proxy(this.onHolderClick, this));
				this.targets.on('change', $.proxy(this.onTargetChange, this));
			},
			unElements : function() {
				var target,
				targetInfo;
				$.each(this.targets, $.proxy(function(idx, elm) {
					target = $(elm);
					targetInfo = this.getTargetInfo(target);

					target.removeAttr('checked', 'checked');
					target.prop('checked', false);
					if (targetInfo.onClass) {
						targetInfo.holder.removeClass(targetInfo.onClass);
					}
				}, this));
				this.targets = [];
				this.holders = [];
			},
			unBindEvents : function() {
				this.holders.off('click', $.proxy(this.onHolderClick, this));
				this.targets.off('change', $.proxy(this.onTargetChange, this));
			},
			onHolderClick : function(e) {
				var target = $(e.currentTarget);
				target = $('[' + this.opts.holderTarget + '=\'' + target.attr(this.opts.holder) + '\']');

				if (target.size()) {
					target.trigger('click').focus();
				}
			},
			onTargetChange : function(e) {
				var target = $(e.currentTarget),
				targetInfo = this.getTargetInfo(target),
				holder = targetInfo.holder,
				onClass = targetInfo.onClass,
				isChecked = target.attr('checked');

				if (!isChecked) {
					target.attr('checked', 'checked');
					target.prop('checked', true);
					if (onClass) {
						holder.addClass(onClass);
					}
				} else {
					target.removeAttr('checked', 'checked');
					target.prop('checked', false);
					if (onClass) {
						holder.removeClass(onClass);
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
		namespace.checkbox.init($('body'));
	});

})(window, window.jQuery);