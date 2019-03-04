(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        BREAKPOINTS = win.smg.euCp.common.breakpoints,
        pluginName = 'HiveSticky';

    win.smg.euCp[pluginName] = function (container, args) {
        if (!(this instanceof win.smg.euCp[pluginName])) {
            return new win.smg.euCp[pluginName](container, args);
        }
        var defParams = {
            body : $('body'),
            align : 'top', // Could be 'top', 'bottom', 'topAndBottom'
            alignCss : {
                top : {
                    top : 0,
                    bottom : 'auto'
                },
                bottom : {
                    top : 'auto',
                    bottom : 0
                }
            },
            stickyWrapElements : container || '.hive-sticky-wrap',
            overedElements : null,
            overedClass : 'sticky-over',
            fixedClass : 'sticky-active',
            customEvent : '.' + pluginName + (new Date()).getTime(),
            spaceBetween : 0,
            spaceStickyElements : null,
            breakpoints : {},
            fps : 120,
            easing : null,
            easingClass : 'sticky-ease',
            duration : 250,
            anchor : {
                anchorElements : '.hive-sticky-anchor',
                activeClass : 'anchor-active',
                hashnav : false,
                hashname : '-HA',
                duration : 500,
                easing : 'swing',
                anchorMove : null,
                anchorMoveBefore : null,
                anchorMoveAfter : null
            },
            prop : {},
            callbackData : {},
            destroyType : false,
            viewType : null,
            scrollStart : null,
            resizeStart : null,
            // isFixedConflict : (function () {
            //     var ua = window.navigator.userAgent,
            //         isIPhone = ua.match(/(iPhone|iPad|iPod)/i),
            //         isAndroid = ua.match(/Android/i);
            //     if (UTIL.isDevice) {
            //         return (isIPhone) ? true : false;
            //     }
            // })(),
            isFixedConflict : false,
            stickyMove : null,
            stickyMoveBefore : null,
            stickyMoveAfter : null,
            loadAfter : null
        };
        if (!(this.stickyWrap = $(defParams.stickyWrapElements)).length) return;
        this.opts = UTIL.def(defParams, this.stickyWrap.data('hivesticky-opts') || args || {});
        this.init();
    };
    win.smg.euCp[pluginName].prototype = UTIL.def({
        init : function () {
            this.initOpts();
            this.setElements();
            this.initLayout();
            this.setOpts();
            this.onScrollFunc();
            this.loadControl();
            this.bindEvents(true);
            this.bindCallBackEvents();
        },
        initOpts : function () {
            var alignCss = this.opts.alignCss;
            this.alignRemoveCss = {};
            for (var key in alignCss) {
                this.alignRemoveCss[key] = '';
            }
            this.stickyPos = (this.stickyWrap.css('position') === 'absolute') ? 'side' : '';
            if (this.stickyPos === 'side' && this.opts.easing != null) {
                this.stickyWrap.css('position', 'absolute');
                this.opts.align = 'top';
            }
        },
        setElements : function () {
            // anchor
            this.stickyAnchor = this.stickyWrap.find(this.opts.anchor.anchorElements).filter(function () {
                var target = $(this),
                    targetHref = target.attr('href');
                if (!$(targetHref).length) return false;
                return true;
            });
        },
        initLayout : function () {
            var stickyWrapClass = this.stickyWrap.attr('class').split(' ')[0],
                jsStickyWrapClass = 'js-' + stickyWrapClass;
            if (this.stickyPos !== 'side') {
                if (!this.stickyWrap.parent().hasClass(jsStickyWrapClass)) {
                    this.stickyWrap.wrap('<div class="' + jsStickyWrapClass + '" />');
                }
                this.jsStickyWrap = this.stickyWrap.parent();
                if (this.opts.easing != null) {
                    this.jsStickyWrap.addClass(this.opts.easingClass);
                    if (this.opts.align === 'top') {
                        this.stickyWrap.css('bottom', 'auto');
                    } else if (this.opts.align === 'bottom') {
                        this.stickyWrap.css('top', 'auto');
                    }
                }
            } else {
                this.jsStickyWrap = this.stickyWrap.parents().filter(function () {
                    var position = $(this).css('position');
                    return (position === 'relative' || position === 'absolute') ? true : false;
                }).eq(0);
                this.jsStickyWrap = (this.jsStickyWrap.length) ? this.jsStickyWrap : $('body');
            }
            // anchor
            var stickyAnchor = this.stickyAnchor,
                optsAnchor = this.opts.anchor;
            if (stickyAnchor.length && optsAnchor.hashnav) {
                for (var i = 0, max = stickyAnchor.length; i < max; i++) {
                    var target = stickyAnchor.eq(i).attr('href');
                    $(target).attr('data-hash', target.replace('#', '') + optsAnchor.hashname);
                }
            }
            // isFixedConflict
            if (this.opts.isFixedConflict) {
                var fixedClass = 'hiveStickyfixedArea',
                    fixedElements = '<div class="' + fixedClass + '"></div>';
                $('body').append(fixedElements);
                this.fixedWrap = $('.' + fixedClass).last();
            }
        },
        setOpts : function () {
            var winWidth = UTIL.winSize().w,
                winHeight = UTIL.winSize().h,
                offsetTop = this.jsStickyWrap.offset().top - this.opts.body.offset().top,
                stickyHeight = (this.stickyPos !== 'side') ? this.stickyWrap.outerHeight(true) : 0,
                offsetBottom = offsetTop + stickyHeight,
                alignBottomOffset = offsetBottom - winHeight;
            this.opts.prop['offsetTop'] = Math.floor(offsetTop, 10);
            this.opts.prop['offsetBottom'] = Math.floor(offsetBottom, 10);
            this.opts.prop['stickyHeight'] = Math.ceil(stickyHeight, 10);
            this.opts.prop['alignBottomOffset'] = Math.ceil(alignBottomOffset, 10);
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

            // [s] set options
            // IE8
            if (!UTIL.isSupportTransform) {
                this.breakOpts['align'] = this.opts['align'];
                this.breakOpts['spaceStickyElements'] = this.opts['spaceStickyElements'];
            }
            // overedElements
            if (!UTIL.isSupportTransform || (UTIL.isSupportTransform && (winWidth > BREAKPOINTS.MOBILE))) {
                if (this.breakOpts.overedElements !== null) {
                    var overedElements = this.breakOpts.overedElements,
                        overedElementsOffsetTop = overedElements.offset().top,
                        overedElementsHeight = overedElements.outerHeight(),
                        stickyWrap = this.stickyWrap,
                        stickyWrapHeight = stickyWrap.outerHeight();
                    this.opts.prop['overedElementsOffset'] = overedElementsOffsetTop + overedElementsHeight - stickyWrapHeight;
                }
            } else {
                this.breakOpts.overedElements = null;
            }
            // spaceStickyElements
            var spaceStickyElements = $(this.breakOpts.spaceStickyElements),
                spaceStickyCondition = spaceStickyElements.length;
            this.spaceStickyData = {
                offsetTop : spaceStickyCondition ? this.spaceStickyElements.parent().offset().top : 0,
                stickyHeight : spaceStickyCondition ? this.spaceStickyElements.outerHeight() : 0
            };
            // spaceBetween
            if (typeof this.breakOpts.spaceBetween === 'string') {
                var spaceBetweenElements = $(this.breakOpts.spaceBetween),
                    spaceBetweenCondition = spaceBetweenElements.length,
                    spaceBetweenHeight = (spaceBetweenCondition ? spaceBetweenElements.outerHeight() : 0);
                this.spaceBetween = spaceBetweenHeight;
            } else {
                this.spaceBetween = this.breakOpts.spaceBetween;
            }
            for (var cssKey in this.opts.alignCss) {
                this.opts.alignCss[cssKey][cssKey] = 0 + this.spaceBetween;
            }
            // [e] set options


            this.setLayout();
            // anchor
            this.setAnchorOffset();
        },
        setLayout : function () {
            var prop = this.opts.prop;
            if (this.stickyPos !== 'side') {
                this.jsStickyWrap.css('height', prop.stickyHeight);
                this.opts.callbackData = prop;
            } else {
                this.opts.callbackData = {};
            }
        },
        setAnchorOffset : function () {
            if (!this.stickyAnchor.length) return;
            var stickyAnchor = this.stickyAnchor,
                prop = this.opts.prop,
                spaceHeight = (this.breakOpts.align === 'bottom') ? 0 : prop.stickyHeight,
                spaceBetween = (this.stickyPos !== 'side') ? this.spaceBetween : 0,
                spaceStickyData = this.spaceStickyData;
            this.anchorDatas = [];
            for (var i = 0, max = stickyAnchor.length; i < max; i++) {
                var targetHref = stickyAnchor.eq(i).attr('href'),
                    target = $(targetHref),
                    spaceStickyHeight = (target.offset().top >= spaceStickyData.offsetTop) ? spaceStickyData.stickyHeight : 0,
                    datas = {
                        ID : targetHref.replace('#', ''),
                        offset : target.offset().top,
                        minOffset : Math.ceil(target.offset().top - spaceHeight - spaceBetween - spaceStickyHeight, 10),
                        maxOffset : Math.ceil(target.offset().top + target.outerHeight(true) - spaceHeight - spaceBetween - spaceStickyHeight, 10)
                    };
                this.anchorDatas.push(datas);
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
                $(win).on(this.changeEvents('scroll'), $.proxy(this.onScrollFunc, this));
                $(win).on(this.changeEvents('resize'), $.proxy(this.onResizeFunc, this));
                // anchor
                this.stickyAnchor.on(this.changeEvents('click'), $.proxy(this.onClickAnchor, this));
                // hash
                if (this.opts.anchor.hashnav && this.stickyAnchor.length) {
                    $(win).on(this.changeEvents('hashchange'), $.proxy(this.onHashChangeFunc, this));
                }
            } else {
                $(win).off(this.changeEvents('scroll'));
                $(win).off(this.changeEvents('resize'));
                // anchor
                this.stickyAnchor.off(this.changeEvents('click'));
                // hash
                if (this.opts.anchor.hashnav && this.stickyAnchor.length) {
                    $(win).off(this.changeEvents('hashchange'));
                }
            }
        },
        onClickAnchor : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                targetHref = target.attr('href');
            this.anchorMove(targetHref.replace('#', ''));
        },
        onHashChangeFunc : function () {
            var newHash = doc.location.hash.replace('#', ''),
                newHashname = newHash.replace(this.opts.anchor.hashname, '');
            if (newHashname !== this.anchorTarget) {
                this.anchorMove(newHashname);
            }
        },
        setHash : function () {
            if (!this.opts.anchor.hashnav || !this.stickyAnchor.length) return;
            var anchorTarget = this.anchorTarget,
                optsAnchor = this.opts.anchor,
                hashname = anchorTarget + optsAnchor.hashname,
                currentHash = doc.location.hash.replace('#', '');
            if (currentHash !== hashname && anchorTarget.length) {
                doc.location.hash = hashname;
            }
        },
        anchorMove : function (target) {
            var _this = this,
                optsAnchor = this.opts.anchor,
                anchorDatas = this.anchorDatas,
                offsetNum = null;
            for (var key in anchorDatas) {
                var data = anchorDatas[key];
                if (data.ID === target) {
                    offsetNum = data.minOffset + 1;
                }
            }
            this.anchorTarget = target;
            this.outCallback('anchorMoveBefore');
            if (optsAnchor.duration <= 0 || !optsAnchor.duration) {
                $('html, body').stop().scrollTop(offsetNum);
                this.anchorMoveAfterBugFunc();
            } else {
                $('html, body').stop().animate({
                    scrollTop : offsetNum
                }, {
                    duration : optsAnchor.duration,
                    easing : optsAnchor.easing,
                    step : function (now, tween) {
                        _this.outCallback('anchorMove', now, tween);
                    },
                    complete : $.proxy(this.anchorMoveAfterBugFunc, this)
                });
            }
        },
        onAnchorMoveAfter : function () {
            this.anchorFocus();
            this.outCallback('anchorMoveAfter');
        },
        anchorMoveAfterBugFunc : function () {
            if (this.opts.anchor.hashnav && this.stickyAnchor.length) {
                this.setHash();
            }
            win.clearTimeout(this.anchorMoveAfterTimeout);
            this.anchorMoveAfterTimeout = win.setTimeout($.proxy(this.onAnchorMoveAfter, this), 30);
        },
        anchorActive : function (num) {
            var stickyAnchor = this.stickyAnchor,
                anchorDatas = this.anchorDatas,
                activeDatas = anchorDatas[num],
                activeClass = this.opts.anchor.activeClass;
            if ((typeof num) == undefined || num == null) {
                stickyAnchor.removeClass(activeClass);
            } else {
                for (var i = 0, max = stickyAnchor.length; i < max; i++) {
                    var target = stickyAnchor.eq(i),
                        targetHref = target.attr('href');
                    if (targetHref.replace('#', '') === activeDatas.ID) {
                        if (!target.hasClass(activeClass)) {
                            target.addClass(activeClass);
                            this.opts.prop['activeID'] = activeDatas.ID;
                        }
                    } else {
                        if (target.hasClass(activeClass)) {
                            target.removeClass(activeClass);
                        }
                    }
                }
            }
        },
        anchorFocus : function () {
            // var stickyAnchor = this.stickyAnchor,
            //     anchorTarget = $('#' + this.anchorTarget),
            //     focusClass = 'hiveStickyfocusArea',
            //     focusElements = '<span class="' + focusClass + '" tabindex="0" style="position:fixed;left:0;top:0;width:1px;height:1px;font-size:0;line-height:0"></span>';
            // if (!anchorTarget.find('.' + focusClass).length) {
            //     anchorTarget.prepend(focusElements);
            //     focusElements = anchorTarget.find('.' + focusClass).focus();
            //     focusElements.on('focusout', function () {
            //         $(this).remove();
            //     });
            //     anchorTarget.on('mousedownoutside focusoutside', $.proxy(function (e) {
            //         anchorTarget.off('mousedownoutside focusoutside');
            //         if (e.type === 'focusoutside') {
            //             for (var i = 0, max = stickyAnchor.length; i < max; i++) {
            //                 var target = stickyAnchor.eq(i),
            //                     targetHref = target.attr('href');
            //                 if (targetHref.replace('#', '') === this.anchorTarget) {
            //                     target.focus();
            //                 }
            //             }
            //         }
            //     }, this));
            // }
            var stickyAnchor = this.stickyAnchor,
                anchorTarget = $('#' + this.anchorTarget);
            if (!anchorTarget.length) return;
            var firstElement = anchorTarget.find('*').filter(':visible').first().css('outline', 'none');
            firstElement.attr({
                'role' : 'dialog',
                'tabIndex' : -1
            }).focus();
            firstElement.on('focusout', function (e) {
                var _this = $(e.currentTarget);
                _this.removeAttr('tabIndex').css('outline', '');
                _this.off('focusout');
            });
            win.setTimeout($.proxy(function () {
                firstElement.removeAttr('role');
            }, this), 150);
        },
        onScrollFunc : function () {
            this.winScrollTop = $(win).scrollTop();
            if (this.opts.scrollStart == null) {
                this.opts.scrollStart = this.winScrollTop;
                if (this.opts.easing == null) {
                    this.outCallback('stickyMoveBefore');
                    this.scrollAnimateFunc();
                }
            }
            win.clearTimeout(this.scrollEndTimeout);
            this.scrollEndTimeout = win.setTimeout($.proxy(this.onScrollEndFunc, this), 60);
        },
        onScrollEndFunc : function () {
            this.opts.scrollStart = null;
            // anchor
            if (!this.opts.destroyType) {
                if (this.stickyAnchor.length) {
                    var anchorDatas = this.anchorDatas,
                        winScrollTop = this.winScrollTop,
                        activeKey,
                        maxActiveKey;

                    var lockScroll = $('html').data('lockScroll'),
                        lockType = (lockScroll != null) ? true : false,
                        scrollTop = (lockType) ? lockScroll.top : winScrollTop;

                    for (var key in anchorDatas) {
                        var data = anchorDatas[key];
                        if (data.minOffset <= scrollTop) {
                            activeKey = parseInt(key, 10);
                        }
                        if (data.maxOffset > scrollTop) {
                            maxActiveKey = parseInt(key, 10);
                        }
                    }
                    if (((typeof activeKey) == undefined || activeKey == null) || ((typeof maxActiveKey) == undefined || maxActiveKey == null)) {
                        activeKey = null;
                    }
                    if ((typeof maxActiveKey) == undefined || maxActiveKey == null) {
                        this.opts.prop['activeID'] = anchorDatas[anchorDatas.length - 1].ID;
                    } else {
                        if ((typeof activeKey) == undefined || activeKey == null) {
                            this.opts.prop['activeID'] = anchorDatas[0].ID;
                        }
                    }
                    this.anchorActive(activeKey);
                }
                if (this.opts.easing == null) {
                    this.stickyFixedFunc();
                    this.outCallback('stickyMoveAfter');
                } else {
                    this.stickyEasingFunc();
                }
            }
            UTIL.cancelAFrame.call(win, this.scrollRequestFrame);
        },
        scrollAnimateFunc : function () {
            if (!this.opts.destroyType) {
                this.stickyFixedFunc();
                this.outCallback('stickyMove');
            }
            this.scrollRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.scrollAnimateFunc, this));
        },
        stickyFixedFunc : function () {
            var prop = this.opts.prop,
                align = this.breakOpts.align,
                alignCss = this.opts.alignCss,
                winScrollTop = this.winScrollTop,
                spaceBetween = (this.stickyPos !== 'side') ? this.spaceBetween : 0;

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winScrollTop;

            if (align === 'top') {
                var alignData = alignCss[align];
                this.condition = scrollTop > (prop.offsetTop - spaceBetween);
                if (this.breakOpts.overedElements !== null) {
                    this.overCondition = scrollTop > prop.overedElementsOffset;
                }
            } else if (align === 'bottom') {
                var alignData = alignCss[align];
                this.condition = scrollTop < (prop.alignBottomOffset + spaceBetween);
            } else if (align === 'topAndBottom') {
                this.condition = scrollTop > (prop.offsetTop - spaceBetween) ||
                    scrollTop < (prop.alignBottomOffset + spaceBetween);
                if (scrollTop > (prop.offsetTop - spaceBetween)) {
                    var alignData = alignCss['top'];
                } else if (scrollTop < (prop.alignBottomOffset + spaceBetween)) {
                    var alignData = alignCss['bottom'];
                }
            }
            if (this.condition) {
                if (!this.stickyWrap.hasClass(this.opts.fixedClass)) {
                    this.stickyWrap.addClass(this.opts.fixedClass);
                    if (this.opts.isFixedConflict && this.stickyPos !== 'side') {
                        this.fixedWrap.append(this.stickyWrap);
                    }
                }
                if (this.stickyPos !== 'side') {
                    this.stickyWrap.css(alignData);
                }
            } else {
                if (this.stickyWrap.hasClass(this.opts.fixedClass)) {
                    if (this.stickyPos !== 'side') {
                        this.stickyWrap.css(this.alignRemoveCss);
                    }
                    this.stickyWrap.removeClass(this.opts.fixedClass);
                    if (this.opts.isFixedConflict && this.stickyPos !== 'side') {
                        this.jsStickyWrap.append(this.stickyWrap);
                    }
                }
            }
            if (this.breakOpts.overedElements !== null) {
                if (this.overCondition) {
                    if (!this.stickyWrap.hasClass(this.opts.overedClass)) {
                        this.stickyWrap.addClass(this.opts.overedClass);
                    }
                    this.stickyWrap.css({
                        'top' : 'auto',
                        'bottom' : 0
                    });
                } else {
                    if (this.stickyWrap.hasClass(this.opts.overedClass)) {
                        this.stickyWrap.removeClass(this.opts.overedClass);
                    }
                }
            } else {
                if (this.stickyWrap.hasClass(this.opts.overedClass)) {
                    this.stickyWrap.removeClass(this.opts.overedClass);
                }
            }
        },
        stickyEasingFunc : function () {
            var _this = this,
                prop = this.opts.prop,
                align = this.breakOpts.align,
                alignCss = this.opts.alignCss,
                alignData = {},
                winScrollTop = this.winScrollTop,
                spaceBetween = this.spaceBetween,
                sideStickyEasing = this.stickyPos === 'side' && this.opts.easing != null,
                callbackData = {
                    duration : this.opts.duration,
                    easing : this.opts.easing,
                    step : function (now, tween) {
                        _this.outCallback('stickyMove', now, tween);
                    },
                    complete : $.proxy(this.moveAfterBugFunc, this)
                };

            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winScrollTop;
                
            if (align === 'top') {
                if (sideStickyEasing) {
                    this.condition = scrollTop > prop.offsetTop;
                } else {
                    this.condition = scrollTop > (prop.offsetTop - spaceBetween);
                }
                if (this.condition) {
                    alignData['top'] = scrollTop - (prop.offsetTop - spaceBetween);
                } else {
                    alignData['top'] = (sideStickyEasing) ? spaceBetween : 0;
                }
            } else if (align === 'bottom') {
                this.condition = scrollTop < (prop.alignBottomOffset + spaceBetween);
                if (this.condition) {
                    alignData['top'] = scrollTop - (prop.alignBottomOffset + spaceBetween);
                } else {
                    alignData['top'] = (sideStickyEasing) ? spaceBetween : 0;
                }
            } else if (align === 'topAndBottom') {
                this.condition = scrollTop > (prop.offsetTop - spaceBetween) ||
                    scrollTop < (prop.alignBottomOffset + spaceBetween);
                if (scrollTop > (prop.offsetTop - spaceBetween)) {
                    alignData['top'] = scrollTop - (prop.offsetTop - spaceBetween);
                } else if (scrollTop < (prop.alignBottomOffset + spaceBetween)) {
                    alignData['top'] = scrollTop - (prop.alignBottomOffset + spaceBetween);
                } else {
                    alignData['top'] = (sideStickyEasing) ? spaceBetween : 0;
                }
            }
            if (this.condition) {
                if (!this.stickyWrap.hasClass(this.opts.fixedClass)) {
                    this.stickyWrap.addClass(this.opts.fixedClass);
                }
                this.outCallback('stickyMoveBefore');
                this.stickyWrap.stop().animate(alignData, callbackData);
            } else {
                if (this.stickyWrap.hasClass(this.opts.fixedClass)) {
                    this.stickyWrap.removeClass(this.opts.fixedClass);
                    this.outCallback('stickyMoveBefore');
                    this.stickyWrap.stop().animate(alignData, callbackData);
                }
            }
        },
        onStickyMoveAfter : function () {
            this.outCallback('stickyMoveAfter');
        },
        moveAfterBugFunc : function () {
            win.clearTimeout(this.moveAfterTimeout);
            this.moveAfterTimeout = win.setTimeout($.proxy(this.onStickyMoveAfter, this), 30);
        },
        onResizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) {
                this.opts.resizeStart = this.winWidth;
                this.resizeAnimateFunc();
            }
            win.clearTimeout(this.resizeEndTimeout);
            this.resizeEndTimeout = win.setTimeout($.proxy(this.onResizeEndFunc, this), 60);
        },
        onResizeEndFunc : function () {
            this.opts.resizeStart = null;
            this.setOpts();
            this.onScrollFunc();
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        resizeAnimateFunc : function () {
            this.setOpts();
            this.onScrollFunc();
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        loadControl : function () {
            this.outCallback('loadAfter');
        },
        outCallback : function (ing) {
            var callbackType = ing.search('anchor'),
                callbackObj = (callbackType >= 0) ? this.opts.anchor[ing] : this.opts[ing],
                condition = ing === 'stickyMove' || ing === 'anchorMove';
            if (condition) {
                this.emit(ing, arguments[1], arguments[2]);
            } else {
                this.emit(ing, this.opts.callbackData);
            }
            if (callbackObj == null) return;
            if (condition) {
                callbackObj(arguments[1], arguments[2]);
            } else {
                callbackObj(this.opts.callbackData);
            }
        },
        bindCallBackEvents : function () {
            this.stickyWrap.on('destroy', $.proxy(this.destroy, this));
            this.stickyWrap.on('reInit', $.proxy(this.reInit, this));
        },
        destroy : function () {
            this.opts.destroyType = true;
            this.bindEvents(false);
        },
        reInit : function () {
            this.opts.destroyType = false;
            this.bindEvents(false);
            this.bindEvents(true);
            this.onResizeFunc();
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
