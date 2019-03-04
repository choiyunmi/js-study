(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        pluginName = 'InputChkboxs';

    win.smg.euCp[pluginName] = (function () {
        var defParams = {
            container : '.js-chkbox-wrap',
            formElements : 'input:checkbox',
            formLabel : '.configurator-checkbox__label',
            formDesign : '.s-box',
            disableClass : 'is-disabled',
            activeClass : 'is-checked'
        };
        return {
            init : function () {
                this.setElements();
                this.initLayout();
                this.bindEvents();
            },
            setElements : function () {
                this.obj = $(defParams.container);
                this.inputForm = this.obj.find(defParams.formElements);
            },
            initLayout : function () {
                this.inputForm.filter(':disabled').closest(defParams.container).addClass(defParams.disableClass);
                this.inputForm.filter(':checked').closest(defParams.container).addClass(defParams.activeClass);
            },
            bindEvents : function () {
                $(doc).on('change', defParams.formElements, $.proxy(this.changeFunc, this));
                if (!UTIL.isSupportTransform) {
                    $(doc).on('click', defParams.formLabel + ' img', $.proxy(this.clickFunc, this));
                }
            },
            changeFunc : function (e) {
                var target = $(e.currentTarget);
                target.closest(defParams.container).toggleClass(defParams.activeClass, target.prop('checked'));
            },
            clickFunc : function (e) {
                var target = $(e.currentTarget),
                    targetContainer = target.closest(defParams.container),
                    targetFormElements = targetContainer.find(defParams.formElements);
                targetFormElements.trigger('click');
                targetContainer.toggleClass(defParams.activeClass, targetFormElements.prop('checked'));
            }
        }
    })();

    $(function () {
        win.smg.euCp[pluginName].init();
    });
})(window, window.jQuery, window.document);
