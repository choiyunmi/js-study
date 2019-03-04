(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        BREAKPOINTS = win.smg.euCp.common.breakpoints,
        pluginName = 'LayerPopupLibs';

    win.smg.euCp[pluginName] = function (container, args) {
        if (!(this instanceof win.smg.euCp[pluginName])) {
            return new win.smg.euCp[pluginName](container, args);
        }
        var defParams = {
            effect : 'default', // Could be 'default', 'fade', 'slide', 'flip'
            layerWrapElements : container,
            layerElements : '.hive-layer',
            openerElements : '.hive-layer-opener',
            openerAsyncClass : 'is-async',
            closerElements : '.hive-layer-closer',
            dimmedElements : '.hive-layer-dimmed',
            focusOutObj : {
                CLASS : 'hive-layer-focusout',
                CSS : {
                    'overflow' : 'hidden',
                    'position' : 'absolute',
                    'left' : 0,
                    'top' : 0,
                    'z-index' : -1,
                    'width' : 1,
                    'height' : 1,
                    'font-size' : '1px',
                    'line-height' : 0
                }
            },
            customEvent : '.' + pluginName + (new Date()).getTime(),
            // scrollLockType : (UTIL.isDevice) ? true : false,
            scrollLockType : true,
            scrollLockClass : 'hive-layer-scroll-lock',
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            },
            openerTarget : null,
            useOutside : false,
            useEscape : false,
            useCloseFocus : false,
            bgOpacity : .3,
            bgColor : '#000',
            slide : {
                range : 200,
                direction : 'rightToLeft' // Could be 'rightToLeft', 'leftToRight', 'topToBottom', 'bottomToTop'
            },
            flip : {
                CLASS : 'hive-layer-flip',
                direction : 'horizontal', // Could be 'horizontal', 'vertical'
                rotateStart : 90,
                rotateEnd : 0
            },
            customToggle : false,
            dimmedDuration : 250,
            fps : 120,
            easing : 'swing',
            duration : 250,
            layerMove : null,
            layerOpenBefore : null,
            layerOpenAfter : null,
            layerCloseBefore : null,
            layerCloseAfter : null
        };
        if (!(this.layerWrap = defParams.layerWrapElements).length) return;
        this.opts = UTIL.def(defParams, this.layerWrap.data('hivelayer-opts') || args || {});
        this.init();
    };
    win.smg.euCp[pluginName].prototype = UTIL.def({
        init : function () {
            this.initOpts();
            this.setElements();
            this.initLayout();
            this.bindEvents(true);
        },
        initOpts : function () {
            this.layerWrapInstance = '#' + this.layerWrap.attr('id');
            if (!this.opts.isSupportTransition && this.opts.effect === 'flip') {
                this.opts.effect = 'default';
            }
        },
        setElements : function () {
            this.dimmedObj = this.layerWrap.find(this.opts.dimmedElements);
            this.layerObj = this.layerWrap.find(this.opts.layerElements);
            this.closerObj = this.layerWrap.find(this.opts.closerElements);
        },
        initLayout : function () {
            var focusOutClass = this.opts.focusOutObj.CLASS,
                focusOutElements = '<span class="' + focusOutClass + '" tabindex="0">""</span>';
            if (!this.layerObj.prev().hasClass(focusOutClass)) {
                this.layerObj.before(focusOutElements);
            }
            if (!this.layerObj.next().hasClass(focusOutClass)) {
                this.layerObj.after(focusOutElements);
            }
            this.prevFocusOutObj = this.layerObj.prev();
            this.nextFocusOutObj = this.layerObj.next();
            this.focusOutObj = this.layerObj.prev().add(this.layerObj.next());
            this.layerObj.attr({
                'tabIndex' : -1,
                'role' : 'dialog'
            });
            this.focusOutObj.css(this.opts.focusOutObj.CSS);
            // this.dimmedObj.css({
            //     background : this.opts.bgColor,
            //     opacity : this.opts.bgOpacity
            // });
            if (this.opts.effect === 'slide') {
                var sDirection = this.opts.slide.direction;
                if (sDirection === 'rightToLeft' || sDirection === 'leftToRight') {
                    this.opts.slide.cssD = 'left';
                } else if (sDirection === 'topToBottom' || sDirection === 'bottomToTop') {
                    this.opts.slide.cssD = 'top';
                }
                this.dimmedObj.hide();
                this.focusOutObj.hide();
                this.layerObj.hide();
            } else if (this.opts.effect === 'flip') {
                var fDirection = this.opts.flip.direction;
                if (fDirection !== 'vertical') {
                    this.opts.flip.cssD = 'rotateY';
                } else {
                    this.opts.flip.cssD = 'rotateX';
                }
                this.dimmedObj.hide();
                this.focusOutObj.hide();
                this.layerObj.hide();
                this.layerWrap.addClass(this.opts.flip.CLASS);
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
                $(doc).on(this.changeEvents('click clickCustom'), this.opts.openerElements + '[data-layer-target="' + this.layerWrapInstance + '"]', $.proxy(this.onLayerOpen, this));
                this.layerWrap.on(this.changeEvents('openLayer'), $.proxy(this.onLayerOpen, this));
                this.prevFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onPrevOut, this));
                this.nextFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onNextOut, this));
                this.closerObj.on(this.changeEvents('keydown click clickCustom'), $.proxy(this.onLayerClose, this));
                this.layerWrap.on(this.changeEvents('layerSetOptions'), $.proxy(this.setOptions, this));
                if (this.opts.useEscape) {
                    this.layerObj.on(this.changeEvents('keydown'), $.proxy(this.onEscapeClose, this));
                }
            } else {
                $(doc).off(this.changeEvents('click clickCustom'));
                this.layerWrap.off(this.changeEvents('openLayer'));
                this.prevFocusOutObj.off(this.changeEvents('focusin'));
                this.nextFocusOutObj.off(this.changeEvents('focusin'));
                this.closerObj.off(this.changeEvents('keydown click clickCustom'));
                this.layerWrap.off(this.changeEvents('layerSetOptions'));
                if (this.opts.useEscape) {
                    this.layerObj.off(this.changeEvents('keydown'));
                }
            }
        },
        bindOutsideEvents : function (type) {
            if (!this.opts.useOutside) return;
            if (type) {
                this.layerObj.on('clickoutside touchendoutside', $.proxy(this.onLayerOutsideFunc, this));
            } else {
                this.layerObj.off('clickoutside touchendoutside');
            }
        },
        scrollLock : {
            init : function (type) {
                if (!this.opts.scrollLockType) return;
                var lockClass = this.opts.scrollLockClass,
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements);
                lockElements.toggleClass(lockClass, type);
                if (type) {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                        lockOpts.appliedLock = {};
                        this.scrollLock.saveStyles.call(this);
                        this.scrollLock.saveScrolls.call(this);
                        $.extend(lockOpts.appliedLock, lockOpts.lockStyles, {
                            'left' : - lockOpts.prevScroll.scrollLeft,
                            'top' : - lockOpts.prevScroll.scrollTop
                        });
                        lockElements.css(lockOpts.appliedLock);
                        lockElements.data('lockScroll', {
                            'left' : lockOpts.prevScroll.scrollLeft,
                            'top' : lockOpts.prevScroll.scrollTop
                        });
                        lockOpts.scrollLocked = true;
                    }
                } else {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                        this.scrollLock.saveStyles.call(this);
                        for (var key in lockOpts.appliedLock) {
                            delete lockOpts.prevStyles[key];
                        }
                        lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');
                        lockElements.data('lockScroll', null);
                        $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop);
                        lockOpts.scrollLocked = false;
                    }
                }
            },
            saveStyles : function () {
                var styleStrs = [],
                    styleHash = {},
                    lockOpts = this.opts.scrollLockOpts,
                    lockElements = $(lockOpts.lockElements),
                    styleAttr =  lockElements.attr('style');
                if (!styleAttr) return;
                styleStrs = styleAttr.split(';');
                $.each(styleStrs, function styleProp (styleString) {
                    var styleString = styleStrs[styleString];
                    if (!styleString) return;
                    var keyValue = styleString.split(':');
                    if (keyValue.length < 2) return;
                    styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]);
                });
                $.extend(lockOpts.prevStyles, styleHash);
            },
            saveScrolls : function () {
                var lockOpts = this.opts.scrollLockOpts;
                lockOpts.prevScroll = {
                    scrollLeft : $(win).scrollLeft(),
                    scrollTop : $(win).scrollTop()
                };
            }
        },
        bindCloseEvents : function (type) {
            if (type) {
                this.layerWrap.on(this.changeEvents('closeLayer'), $.proxy(this.closeLayer, this));
            } else {
                this.layerWrap.off(this.changeEvents('closeLayer'));
            }
        },
        setOptions : function (e, data) {
            UTIL.def(this.opts, data || {});
            if (data.customToggle) {
                this.opts.effect = 'default';
            }
        },
        onLayerOpen : function (e) {
            var _this = this;
            if (e.type === 'click' || e.type === 'clickCustom') {
                this.opts.openerTarget = $(e.currentTarget);
            }
            if (e.type === 'click') {
                if (this.opts.openerTarget.hasClass(this.opts.openerAsyncClass)) return;
            }
            this.layerViewType = 'open';
            this.scrollLock.init.call(this, true);
            this.bindCloseEvents(true);
            if (this.opts.effect === 'default') {
                this.outCallback('layerOpenBefore');
                if (!this.opts.customToggle) {
                    this.layerWrap.stop(true, true).show();
                    this.openAfterBugFunc();
                }
            } else if (this.opts.effect === 'fade') {
                this.outCallback('layerOpenBefore');
                this.focusOutObj.show();
                this.layerWrap.stop(true, true).fadeIn({
                    duration : this.opts.duration,
                    easing : this.opts.easing,
                    step : function (now, tween) {
                        _this.outCallback('layerMove', now, tween);
                    },
                    complete : $.proxy(this.openAfterBugFunc, this)
                });
            } else if (this.opts.effect === 'slide') {
                this.layerWrap.show();
                this.layerObj.css({
                    'display' : 'block',
                    'opacity' : 0
                });
                var slideData = this.opts.slide,
                    cssD = slideData.cssD,
                    offset = parseFloat(this.layerObj.css('margin-' + cssD)),
                    moveData = {'opacity' : 1};
                if (cssD === 'left') {
                    var initPos = (slideData.direction === 'rightToLeft') ? offset + slideData.range : offset - slideData.range;
                    this.layerObj.css({
                        'margin-left' : initPos
                    });
                    moveData['margin-' + cssD] = offset;
                } else if (cssD === 'top') {
                    var initPos = (slideData.direction === 'topToBottom') ? offset - slideData.range : offset + slideData.range;
                    this.layerObj.css({
                        'margin-top' : initPos
                    });
                    moveData['margin-' + cssD] = offset;
                }
                this.dimmedObj.fadeIn(this.opts.dimmedDuration, $.proxy(function () {
                    this.outCallback('layerOpenBefore');
                    this.focusOutObj.show();
                    this.layerObj.animate(moveData, {
                        duration : this.opts.duration,
                        easing : this.opts.easing,
                        step : function (now, tween) {
                            _this.outCallback('layerMove', now, tween);
                        },
                        complete : $.proxy(this.openAfterBugFunc, this)
                    });
                }, this));
            } else if (this.opts.effect === 'flip') {
                var moveDistance = this.opts.flip.rotateEnd - this.opts.flip.rotateStart,
                    moveOneStep = moveDistance / this.opts.duration * (1000 / this.opts.fps),
                    currentStep = 0;
                this.opts.flip.moveData = {
                    startDistance : this.opts.flip.rotateStart,
                    endDistance : this.opts.flip.rotateEnd,
                    moveDistance : moveDistance,
                    moveOneStep : moveOneStep,
                    currentStep : currentStep
                };
                this.layerWrap.show();
                this.dimmedObj.fadeIn(this.opts.dimmedDuration, $.proxy(function () {
                    this.outCallback('layerOpenBefore');
                    this.focusOutObj.show();
                    this.layerObj.show();
                    this.initStep(this.opts.flip.moveData);
                    this.flipFunc();
                }, this));
            }
            this.ariaAccessbility(true);
        },
        initStep : function (data) {
            this.opts.stepTimeOld = new Date();
            this.direction = data.startDistance > data.moveDistance ? 'toNext' : 'toPrev';
            this.condition = this.direction === 'toNext' ? data.currentStep > data.moveDistance : data.currentStep < data.moveDistance;
        },
        moveStep : function (data) {
            this.opts.stepTimeNew = new Date();
            this.opts.remaining = Math.max(0, (this.opts.stepTimeOld - this.opts.stepTimeNew) + this.opts.duration);
            var temp = this.opts.remaining / this.opts.duration || 0,
                percent = 1 - temp,
                eased = $.easing[this.opts.easing](percent, this.opts.duration * percent, 0, 1, this.opts.duration);
            data.currentStep = (data.endDistance - data.startDistance) * eased;
        },
        flipFunc : function () {
            var data = this.opts.flip.moveData;
            this.moveStep(data);
            if (this.condition) {
                win.clearTimeout(this.stepTimeout);
                this.stepTimeout = win.setTimeout($.proxy(function () {
                    this.flipFunc();
                }, this), 1000 / this.opts.fps);
                this.condition = this.direction === 'toNext' ? data.currentStep > data.moveDistance : data.currentStep < data.moveDistance;
                this.outCallback('layerMove', data.currentStep, data);
            } else {
                this.opts.remaining = this.opts.duration;
                if (this.layerViewType === 'close' || !this.layerViewType) {
                    this.closeAfterBugFunc();
                    this.dimmedObj.fadeOut(this.opts.dimmedDuration, $.proxy(function () {
                        this.layerWrap.hide();
                        this.focusOutObj.hide();
                        this.layerObj.hide();
                    }, this));
                } else {
                    this.openAfterBugFunc();
                }
            }
            var movePosition = data.startDistance + data.currentStep;
            this.layerObj.css({
                'transform' : this.opts.flip.cssD + '(' + movePosition + 'deg)'
            });
        },
        onLayerOpenAfter : function () {
            this.layerObj.focus();
            this.bindOutsideEvents(true);
            this.outCallback('layerOpenAfter');
        },
        openAfterBugFunc : function () {
            win.clearTimeout(this.openAfterTimeout);
            this.openAfterTimeout = win.setTimeout($.proxy(this.onLayerOpenAfter, this), 30);
        },
        onLayerClose : function (e) {
            if (e.type === 'keydown') {
                var keyCode = e.which || e.keyCode;
                if (keyCode === 13) {
                    e.stopPropagation();
                    this.opts.useCloseFocus = true;
                }
            } else if (e.type === 'click' || e.type === 'clickCustom') {
                e.preventDefault();
                this.layerWrap.trigger(this.changeEvents('closeLayer'));
            }
        },
        closeLayer : function () {
            this.layerViewType = 'close';
            this.outCallback('layerCloseBefore');
            win.clearTimeout(this.closeBeforeTimeout);
            this.closeBeforeTimeout = win.setTimeout($.proxy(this.closeBeforeBugFunc, this), 30);
            this.bindOutsideEvents(false);
            this.ariaAccessbility(false);
        },
        onEscapeClose : function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode !== 27) return;
            this.opts.useCloseFocus = true;
            this.layerWrap.trigger(this.changeEvents('closeLayer'));
        },
        onPrevOut : function () {
            this.layerWrap.find('a, button, input, select').filter(':visible').last().focus();
        },
        onNextOut : function () {
            this.layerObj.focus();
        },
        onLayerOutsideFunc : function () {
            this.layerWrap.trigger(this.changeEvents('closeLayer'));
        },
        closeBeforeBugFunc : function () {
            var _this = this;
            if (this.opts.effect === 'default') {
                if (!this.opts.customToggle) {
                    this.layerWrap.stop(true, true).hide();
                }
                this.closeAfterBugFunc();
            } else if (this.opts.effect === 'fade') {
                this.layerWrap.stop(true, true).fadeOut({
                    duration : this.opts.duration,
                    easing : this.opts.easing,
                    step : function (now, tween) {
                        _this.outCallback('layerMove', now, tween);
                    },
                    complete : $.proxy(this.closeAfterBugFunc, this)
                });
            } else if (this.opts.effect === 'slide') {
                var slideData = this.opts.slide,
                    cssD = slideData.cssD,
                    offset = parseFloat(this.layerObj.css('margin-' + cssD)),
                    moveData = {'opacity' : 0};
                if (cssD === 'left') {
                    var movePos = (slideData.direction === 'rightToLeft') ? offset - slideData.range : offset + slideData.range;
                    moveData['margin-' + cssD] = movePos;
                } else if (cssD === 'top') {
                    var movePos = (slideData.direction === 'topToBottom') ? offset + slideData.range : offset - slideData.range;
                    moveData['margin-' + cssD] = movePos;
                }
                this.layerObj.animate(moveData, {
                    duration : this.opts.duration,
                    easing : this.opts.easing,
                    step : function (now, tween) {
                        _this.outCallback('layerMove', now, tween);
                    },
                    complete : $.proxy(function () {
                        this.closeAfterBugFunc();
                        this.dimmedObj.fadeOut(this.opts.dimmedDuration, $.proxy(function () {
                            this.layerWrap.hide();
                            this.focusOutObj.hide();
                            this.layerObj.hide().css('margin', '');
                        }, this));
                    }, this)
                });
            } else if (this.opts.effect === 'flip') {
                var moveDistance = -(this.opts.flip.rotateStart) - this.opts.flip.rotateEnd,
                    moveOneStep = moveDistance / this.opts.duration * (1000 / this.opts.fps),
                    currentStep = 0;
                this.opts.flip.moveData = {
                    startDistance : this.opts.flip.rotateEnd,
                    endDistance : -(this.opts.flip.rotateStart),
                    moveDistance : moveDistance,
                    moveOneStep : moveOneStep,
                    currentStep : currentStep
                };
                this.initStep(this.opts.flip.moveData);
                this.flipFunc();
            }
        },
        closeAfterBugFunc : function () {
            win.clearTimeout(this.closeAfterTimeout);
            this.closeAfterTimeout = win.setTimeout($.proxy(this.onLayerCloseAfter, this), 30);
        },
        onLayerCloseAfter : function () {
            this.scrollLock.init.call(this, false);
            if (this.opts.openerTarget !== null) {
                if (UTIL.isDevice) {
                    this.opts.useCloseFocus = true;
                }
                if (this.opts.useCloseFocus) {
                    this.opts.openerTarget.focus();
                }
                this.opts.openerTarget = null;
            }
            this.opts.useCloseFocus = false;
            this.bindCloseEvents(false);
            this.outCallback('layerCloseAfter');
        },
        ariaAccessbility : function (type) {
            var layerWrap = this.layerWrap,
                layerParents = layerWrap.parents();
            if (type) {
                layerWrap.siblings().attr('aria-hidden', 'true');
                for (var i = 0, max = layerParents.length; i < max; i++) {
                    var _target = layerParents.eq(i);
                    _target.siblings().attr('aria-hidden', 'true');
                }
            } else {
                layerWrap.siblings().removeAttr('aria-hidden');
                for (var i = 0, max = layerParents.length; i < max; i++) {
                    var _target = layerParents.eq(i);
                    _target.siblings().removeAttr('aria-hidden');
                }
            }
        },
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (ing === 'layerMove') {
                this.layerWrap.trigger(ing, arguments[1], arguments[2], this);
            } else {
                this.layerWrap.trigger(ing, this);
            }
            if (callbackObj == null) return;
            if (ing === 'layerMove') {
                callbackObj(arguments[1], arguments[2], this);
            } else {
                callbackObj(this);
            }
        },
        destroy : function () {
            this.bindEvents(false);
            this.bindOutsideEvents(false);
            this.bindCloseEvents(false);
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
    $(function() {
        var preOrderPopup = $('.cm-configurator-popup');
        for (var i = 0, max = preOrderPopup.length; i < max; i++) {
            (function (index) {
                var _this = preOrderPopup.eq(i),
                    _layer = $('#' + _this.attr('id'));
                new window.smg.euCp['LayerPopupLibs'](_layer, {
                    layerElements : '.cm-configurator-popup__layer',
                    openerElements : '.cm-configurator-popup-opener',
                    closerElements : '.cm-configurator-popup-closer',
                    dimmedElements : '.cm-configurator-popup__dimmed'
                });
            })(i);
        }
    });
})(window, window.jQuery, window.document);
