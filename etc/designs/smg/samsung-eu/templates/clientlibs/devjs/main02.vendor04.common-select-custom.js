(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        pluginName = 'SelectLibs';

    win.smg.euCp[pluginName] = function (container, args) {
        if (!(this instanceof win.smg.euCp[pluginName])) {
            return new win.smg.euCp[pluginName](container, args);
        }
        var defParams = {
            container : container || '.js-select-wrap',
            selectBtn : '.configurator-select__placeholder',
            selectPush : 'span:eq(0)',
            selectBlindText : '.blind',
            selectWrap : '.configurator-select__options',
            selectParent : '>ul',
            activeClass : 'is-opened',
            selectClass : 'is-selected',
            accessData : {
                EXPANDED : 'aria-expanded',
                HIDDEN : 'aria-hidden'
            },
            type2Class : 'select-type2',
            jsAlignClass : 'js-align-placeholder',
            selectMoBtn : '.s-select-text',
            selectMo : '.s-select-mo',
            selectMoParent : '.shop-select__options-mo',
            selectMoActiveClass : 's-select-focus',
            prop : {},
            viewType : false,
            slideSpeed : 200
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.euCp[pluginName].prototype = {
        init : function () {
            this.setElements();
            this.initOpts();
            this.initLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.selectBtn = this.obj.find(this.opts.selectBtn);
            this.selectPush = this.selectBtn.find(this.opts.selectPush);
            this.selectBlindText = this.selectBtn.find(this.opts.selectBlindText);
            this.selectWrap = this.obj.find(this.opts.selectWrap);
            this.selectParent = this.selectWrap.find(this.opts.selectParent);
            this.selectChild = this.selectParent.children();
            this.selectMoBtn = this.obj.find(this.opts.selectMoBtn);
            this.selectMoPush = this.selectMoBtn.find(this.opts.selectPush);
            this.selectMo = this.obj.find(this.opts.selectMo);
            this.selectMoParent = this.selectMo.closest(this.opts.selectMoParent);
        },
        initOpts : function () {
            var globalText = this.obj.data('global-text');
            this.globalText = {
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : ''
            };
        },
        initLayout : function () {
            this.obj.attr('data-select-init', true);
            if (this.obj.hasClass(this.opts.type2Class)) {
                this.selectPush.wrap('<span class="' + this.opts.jsAlignClass + '" />');
            }
            this.selectWrap.hide();
            this.obj.removeClass(this.opts.activeClass);
            this.accessbilityFunc(false);
        },
        bindEvents : function () {
            this.selectBtn.on('click', $.proxy(this.onClickFunc, this));
            this.selectParent.on('click', '>li>a', $.proxy(this.onChangeText, this));
            this.obj.on('onSelect', $.proxy(this.onSelectFunc, this));
            this.selectMo.on('change', $.proxy(this.onChangeFunc, this));
            this.selectMo.on('focusin focusout', $.proxy(this.onFocusFunc, this));
        },
        onClickFunc : function (e) {
            e.preventDefault();
            if (this.opts.viewType) {
                this.selectWrap.stop().hide();
                this.obj.removeClass(this.opts.activeClass);
                this.obj.attr('tabIndex', '');
                this.accessbilityFunc(false);
                this.bindOutsideEvents(false);
            } else {
                this.selectWrap.stop().show();
                this.obj.addClass(this.opts.activeClass);
                this.obj.attr('tabIndex', 0);
                this.accessbilityFunc(true);
                this.bindOutsideEvents(true);
            }
            this.opts.viewType = !this.opts.viewType;
        },
        bindOutsideEvents : function (type) {
            (type) ? this.obj.on('clickoutside focusoutside', $.proxy(this.outsideFunc, this)) : this.obj.off('clickoutside focusoutside');
        },
        outsideFunc : function () {
            this.selectBtn.triggerHandler('click');
        },
        onSelectFunc : function (e, data) {
            this.setDesktopSelect(data);
            this.setMobileSelect(data);
        },
        onChangeFunc : function (e, data) {
            var target = $(e.currentTarget),
                targetSelected = target.find('option').filter(':selected'),
                targetIndex = targetSelected.index(),
                targetText = $.trim(targetSelected.text()),
                prop = {
                    value : targetText,
                    valueIndex : targetIndex
                };
            this.setDesktopSelect(prop);
            this.setMobileSelect(prop);
        },
        onFocusFunc : function (e) {
            if (e.type === 'focusin') {
                if (this.selectMoParent.hasClass(this.opts.selectMoActiveClass)) return;
                this.selectMoParent.addClass(this.opts.selectMoActiveClass);
            } else if (e.type === 'focusout') {
                if (!this.selectMoParent.hasClass(this.opts.selectMoActiveClass)) return;
                this.selectMoParent.removeClass(this.opts.selectMoActiveClass);
            }
        },
        setDesktopSelect : function (prop) {
            var selectClass = this.opts.selectClass;
            this.selectChild.eq(prop.valueIndex).addClass(selectClass).siblings().removeClass(selectClass);
            this.selectPush.text(prop.value);
            this.selectMoPush.text(prop.value);
        },
        setMobileSelect : function (prop) {
            this.selectMo.find('option').eq(prop.valueIndex).attr('selected', 'selected').siblings().removeAttr('selected');
            this.selectPush.text(prop.value);
            this.selectMoPush.text(prop.value);
        },
        onChangeText : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                targetText = $.trim(target.text()),
                targetParent = target.parent();
            this.opts.prop['value'] = targetText;
            this.opts.prop['valueIndex'] = targetParent.index();
            this.obj.trigger('onSelect', this.opts.prop);
            this.outsideFunc();
        },
        accessbilityFunc : function (type) {
            var accessData = this.opts.accessData,
                globalText = this.globalText;
            if (type) {
                this.selectBtn.attr(accessData.EXPANDED, 'true');
                this.selectWrap.attr(accessData.HIDDEN, 'false');
                this.selectBlindText.text(globalText.Collapse);
            } else {
                this.selectBtn.attr(accessData.EXPANDED, 'false');
                this.selectWrap.attr(accessData.HIDDEN, 'true');
                this.selectBlindText.text(globalText.Expand);
            }
        }
    };
    $.fn[pluginName] = function (args) {
        var _this = this;
        for (var i = 0, max = this.length; i < max; i++) {
            (function (index) {
                new win.smg.euCp[pluginName](_this.eq(index), args);
            })(i);
        }
    };

    $(function () {
        $('.js-select-wrap').SelectLibs();
    });
})(window, window.jQuery, window.document);