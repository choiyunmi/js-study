(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        pluginName = 'InputTxts';

    win.smg.euCp[pluginName] = (function () {
        var defParams = {
            container : '.js-inptext-wrap',
            hasTextClass : 'has-input-text',
            txtLabel : 'label',
            activeClass : 'js-inp-active',
            toggleClass : 's-hide',
            txtInput : 'input[type=text], input[type=password], input[type=search], textarea',
            btnDel : '.s-btn-delete',
            useCloseFocus : false
        };
        return {
            init : function () {
                this.setElements();
                this.initLayout();
                this.bindEvents();
            },
            setElements : function () {
                this.obj = $(defParams.container);
                this.inputLabel = this.obj.find(defParams.txtLabel);
                this.inputTag = this.obj.find(defParams.txtInput);
            },
            initLayout : function () {
                var _this = this;
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    (function (index) {
                        var _target = _this.obj.eq(index),
                            _inputLabel = _target.find(defParams.txtLabel),
                            _inputTag = _target.find(defParams.txtInput),
                            inputData = _inputTag.val();
                        if (!inputData.length) return;
                        _inputLabel.addClass(defParams.toggleClass);
                    })(i);
                }
            },
            bindEvents : function () {
                $(doc).on('focusin focusout', defParams.txtInput, $.proxy(this.onFocusFunc, this));
                $(doc).on('keydown click', defParams.container + ' ' + defParams.btnDel, $.proxy(this.onDelClickFunc, this));
            },
            onFocusFunc : function (e) {
                var target = $(e.currentTarget),
                    targetVal = target.val(),
                    targetParent = target.closest(defParams.container),
                    targetLabel = targetParent.find(defParams.txtLabel);
                if (e.type === 'focusin') {
                    if (!targetParent.hasClass(defParams.activeClass)) {
                        targetParent.addClass(defParams.activeClass);
                        target.on('keyup', $.proxy(this.onKeyupFunc, this));
                    }
                    if (!targetVal.length) {
                        targetLabel.addClass(defParams.toggleClass);
                    }
                    $('body').trigger('pageFocusActive');
                } else if (e.type === 'focusout') {
                    if (targetParent.hasClass(defParams.activeClass)) {
                        targetParent.removeClass(defParams.activeClass);
                        target.off('keyup');
                    }
                    if (!targetVal.length) {
                        targetLabel.removeClass(defParams.toggleClass);
                    }
                    $('body').trigger('pageFocusDeactive');
                }
            },
            onKeyupFunc : function (e) {
                var target = $(e.currentTarget),
                    targetVal = target.val(),
                    targetParent = target.closest(defParams.container);
                if (targetVal.length) {
                    if (!targetParent.hasClass(defParams.hasTextClass)) {
                        targetParent.addClass(defParams.hasTextClass);
                    }
                } else {
                    if (targetParent.hasClass(defParams.hasTextClass)) {
                        targetParent.removeClass(defParams.hasTextClass);
                    }
                }
            },
            onDelClickFunc : function (e) {
                if (e.type === 'keydown') {
                    var keyCode = e.which || e.keyCode;
                    if (keyCode === 13) {
                        e.stopPropagation();
                        defParams.useCloseFocus = true;
                    }
                } else if (e.type === 'click') {
                    e.preventDefault();
                    var target = $(e.currentTarget),
                        targetParent = target.closest(defParams.container),
                        targetLabel = targetParent.find(defParams.txtLabel),
                        targetInput = targetParent.find(defParams.txtInput);
                    targetInput.val('');
                    targetParent.removeClass(defParams.hasTextClass);
                    targetLabel.removeClass(defParams.toggleClass);
                    if (defParams.useCloseFocus) {
                        targetInput.focus();
                    }
                    defParams.useCloseFocus = false;
                }
            }
        }
    })();

    $(function () {
        win.smg.euCp[pluginName].init();
    });
})(window, window.jQuery, window.document);
