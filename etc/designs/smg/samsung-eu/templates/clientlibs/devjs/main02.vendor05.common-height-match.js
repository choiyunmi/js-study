(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        pluginName = 'HeightMatch';

    win.smg.euCp[pluginName] = function (container, args) {
        if (!(this instanceof win.smg.euCp[pluginName])) {
            return new win.smg.euCp[pluginName](container, args);
        }
        var defParams = {
            container : container || '.heightmatch-wrap',
            childElement : '>li',
            notCompareElement : null,
            pushElement : null,
            matchElement : '.heightmatch-cont',
            column : 3,
            pushObjs : null,
            useDestroyHeight : true,
            destroyType : false,
            resizeStart : null,
            breakpoints : {},
            customEvent : '.' + pluginName + (new Date()).getTime(),
            matchBefore : null,
            matchAfter : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.smg.euCp[pluginName].prototype = UTIL.def({
        init : function () {
            this.setElements();
            this.setOpts();
            this.setRows();
            this.buildHeightControl();
            this.outCallback('loadAfter');
            this.bindEvents(true);
        },
        setElements : function () {
            this.objChild = this.obj.find(this.opts.childElement);
            this.opts.pushObjs = null;
            if (this.opts.pushElement == null) {
                this.opts.pushObjs = this.objChild.not(this.opts.notCompareElement);
            } else {
                this.opts.pushObjs = this.objChild.not(this.opts.notCompareElement).find(this.opts.pushElement);
            }
        },
        setOpts : function () {
            var winWidth = UTIL.winSize().w;
            // breakpoints
            var breakpoints = this.opts.breakpoints,
                breakKeyMins = [],
                breakKeyMin;
            for (var key in breakpoints) {
                if (key >= winWidth) {
                    breakKeyMins.push(key);
                    breakKeyMin = Math.min.apply(null, breakKeyMins);
                } else {
                    breakKeyMin = null;
                }
            }
            this.breakOpts = UTIL.def({}, this.opts);
            if (breakKeyMin != null) {
                this.breakOpts = UTIL.def(this.breakOpts, breakpoints[breakKeyMin]);
            }
            // IE8
            if (!UTIL.isSupportTransform) {
                this.breakOpts.column = this.opts.column;
            }
        },
        changeEvents : function (event) {
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function (type) {
            if (type) {
                $(win).on(this.changeEvents('resize orientationchange load'), $.proxy(this.resizeFunc, this));
            } else {
                $(win).off(this.changeEvents('resize orientationchange load'));
            }
        },
        resizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) {
                this.opts.resizeStart = this.winWidth;
                this.outCallback('matchBefore');
                this.resizeAnimateFunc();
            }
            win.clearTimeout(this.resizeEndTime);
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 50);
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null;
            this.setOpts();
            this.setRows();
            this.buildHeightControl();
            this.outCallback('matchAfter');
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        resizeAnimateFunc : function () {
            this.setOpts();
            this.setRows();
            this.buildHeightControl();
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        setRows : function () {
            this.rowNum = Math.ceil(this.objChild.length / this.breakOpts.column);
        },
        buildHeightControl : function () {
            if (UTIL.isSupportTransform) {
                if (this.breakOpts.column <= 1) {
                    if (this.opts.pushObjs !== null) {
                        this.opts.pushObjs.css('height', '');
                    }
                } else {
                    this.buildHeight();
                }
            } else {
                this.buildHeight();
            }
        },
        buildHeight : function () {
            this.heightArray = [];
            for (var i = 0; i < this.rowNum; i++) {
                this.heightArray[i] = [];
            }
            for (var i = 0, max = this.objChild.length; i < max; i++) {
                var arrayIndex = parseInt((i / this.breakOpts.column), 10),
                    matchElement = this.objChild.eq(i).not(this.opts.notCompareElement).find(this.opts.matchElement),
                    condition = matchElement.is(':visible'),
                    maxHeight = (condition) ? matchElement.outerHeight() : 0;
                this.heightArray[arrayIndex].push(maxHeight);
            }
            for (var i = 0; i < this.rowNum; i++) {
                this.heightArray[i] = Math.max.apply(null, this.heightArray[i]);
            }
            this.setLayout();
        },
        setLayout : function () {
            for (var i = 0, max = this.objChild.length; i < max; i++) {
                var arrayIndex = parseInt((i / this.breakOpts.column), 10);
                if (this.opts.pushElement == null) {
                    this.objChild.eq(i).not(this.opts.notCompareElement).height(this.heightArray[arrayIndex]);
                } else {
                    this.objChild.eq(i).not(this.opts.notCompareElement).find(this.opts.pushElement).height(this.heightArray[arrayIndex]);
                }
            }
        },
        destroy : function () {
            if (this.opts.useDestroyHeight) {
                if (this.opts.pushObjs !== null) {
                    this.opts.pushObjs.css('height', '');
                }
            }
            this.opts.destroyType = true;
            this.bindEvents(false);
        },
        reInit : function () {
            this.setElements();
            this.setOpts();
            this.setRows();
            this.buildHeightControl();
            this.resizeFunc();
            if (this.opts.destroyType) {
                this.opts.destroyType = false;
                this.bindEvents(true);
            }
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            this.emit(ing);
            if (callbackObj == null) return;
            callbackObj();
        }
    }, UTIL.emitter);
    $.fn[pluginName] = function (args) {
        var _this = this;
        for (var i = 0, max = this.length; i < max; i++) {
            (function (index) {
                new win.smg.euCp[pluginName](_this.eq(index), args);
            })(i);
        }
    };
})(window, window.jQuery, window.document);