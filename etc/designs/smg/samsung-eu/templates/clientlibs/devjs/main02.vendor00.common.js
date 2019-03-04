(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    win.smg.euCp.common = (function () {
        return {
            customEvent : {
                PAGEIS : {
                    EVENT_MANAGER : $('<div data-evt-manager=\'page\'/>'),
                    PAGEOBJS : [],
                    REPOSITION : 'PAGE_REPOSITION'
                }
            },
            stickyDatas : [],
            breakpoints : {
                MOBILE : 768
            },
            util : {
                isDetecting : (function () {
                    var isMac = (navigator.appVersion.indexOf("Mac") !== -1),
                        isEmulator = navigator.connection && (navigator.platform.indexOf('Win') !== -1),
                        isWinSafari = (function () {
                            var appNetscape = (navigator.appName === "Netscape"),
                                appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                                userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                                userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                            return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                        })();
                    if ((isMac && !isEmulator) || isWinSafari) {
                        $('body').addClass('ios-safari');
                    }
                })(),
                isSupportTransform : (function () {
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                })(),
                isSupportTransition : (function () {
                    return ('WebkitTransition' in doc.body.style || 'MozTransition' in doc.body.style || 'msTransition' in doc.body.style || 'OTransition' in doc.body.style || 'transition' in doc.body.style);
                })(),
                isSupportTransforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                    var div = document.createElement('div').style;
                    return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
                })(),
                isDevice : (function () {
                    return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                })(),
                isIOS : (function () {
                    return (/iPad|iPhone|iPod/.test(navigator.userAgent));
                })(),
                isAemEditMode : (function () {
                    return win.smg.aem.util.isAemEditMode();
                })(),
                def : function (org, src) {
                    for (var prop in src) {
                        if (!hasOwnProperty.call(src, prop)) continue;
                        if ('object' === $.type(org[prop])) {
                            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                        } else {
                            org[prop] = src[prop];
                        }
                    }
                    return org;
                },
                wait : function(timeout){
                    var deferred = $.Deferred();
                    setTimeout(deferred.resolve, timeout);
                    return deferred.promise();
                },
                winSize : (function () {
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) {
                        return function () {
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else {
                        return function () {
                            var win_wh = {
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                })(),
                cancelAFrame : (function () {
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                isDevTool : function (e, _target) {
                    var _devLayout = _target.closest('#devLayout');
                    return (_devLayout.length) ? true : false;
                },
                getRestrictBytes : function (str, maxBytes) {
                    var strLeng = str.length,
                        rByte = 0,
                        rLen = 0,
                        strChar = '';
                    maxBytes = maxBytes || 100;
                    for (var i = 0; i < strLeng; i++) {
                        strChar = str.charAt(i);
                        if (escape(strChar).length > 4) {
                            rByte += 2;
                        } else {
                            rByte++;
                        }
                        if (rByte <= maxBytes) {
                            rLen = i+1;
                        }
                    }
                    return {
                        bytes : rByte,
                        rectLeng : rLen
                    }
                },
                imgLoader : function (selector, callback) {
                    $(selector).each(function () {
                        var cb = (callback || function () {});
                        if (this.complete || $(this).height() > 0) {
                            cb.apply(this);
                        } else {
                            $(this).on('load', function () {
                                cb.apply(this);
                                $(this).off('load');
                            });
                        }
                    });
                },
                emitter : {
                    subscribers : {},
                    on : function (event, cb, context) {
                        this.subscribers = $.extend({}, this.subscribers);
                        this.subscribers[event] = this.subscribers[event] || [];
                        this.subscribers[event].push({
                            callback : cb,
                            context : context
                        });
                    },
                    off : function (event, cb, context) {
                        var idx, subs = this.subscribers[event], sub;
                        if (subs) {
                            idx = subs.length - 1;
                            while (idx >= 0) {
                                sub = subs[idx];
                                if ((sub.callback === cb) && (!context || sub.context === context)) {
                                    subs.splice(idx, 1);
                                    break;
                                }
                                idx--;
                            }
                        }
                    },
                    emit : function (event) {
                        var subs = this.subscribers[event], idx = 0, args = Array.prototype.slice.call(arguments, 1), sub;
                        if (subs) {
                            while (idx < subs.length) {
                                sub = subs[idx];
                                sub.callback.apply(sub.context || this, args);
                                idx++;
                            }
                        }
                    }
                }
            }
        }
    })();

    var CST_EVENT = win.smg.euCp.common.customEvent,
        STICKYDATAS = win.smg.euCp.common.stickyDatas,
        UTIL = win.smg.euCp.common.util;

    win.smg.euCp.page = (function () {
        var defParams = {
            scrollDuration : 300,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock',
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
            }
        };
        return {
            init : function () {
                this.bindEvents();
            },
            bindEvents : function () {
                CST_EVENT.PAGEIS.EVENT_MANAGER.on(CST_EVENT.PAGEIS.REPOSITION, $.proxy(this.pageReposition, this));
                $(doc).on('click', '.js-top-go', $.proxy(this.pageTopgo, this));
                $(win).on('load', $.proxy(this.loadFunc, this));
            },
            pageReposition : function () {
                for (var i = 0, max = CST_EVENT.PAGEIS.PAGEOBJS.length; i < max; i++) {
                    CST_EVENT.PAGEIS.PAGEOBJS[i].reInit();
                }
            },
            loadFunc : function () {
                this.pageReposition();
            },
            stickyArea : function (targetScroll) {
                var offsetTops = [],
                    keyMins = [],
                    keyMin, height;
                for (var key in STICKYDATAS) {
                    var sticky = STICKYDATAS[key],
                        stickyData = $(sticky.name);
                    if (stickyData.offset().top <= targetScroll) {
                        keyMins.push(stickyData.offset().top);
                        keyMin = Math.max.apply(null, keyMins);
                    }
                }
                if (!keyMins.length) {
                    height = 0;
                } else {
                    for (var key in STICKYDATAS) {
                        var sticky = STICKYDATAS[key],
                            stickyData = $(sticky.name);
                        if (stickyData.offset().top === keyMin) {
                            height = stickyData.outerHeight();
                        }
                    }
                }
                return height;
            },
            scrollMoveFunc : function (target, callback) {
                if (!target.length) return;
                var scrollTop = Math.ceil(target.offset().top),
                    winTop = $(win).scrollTop(),
                    stickyHeight = this.stickyArea(scrollTop),
                    totalMoveTop = scrollTop - stickyHeight + 1,
                    cb = (callback || function () {});
                if (totalMoveTop === winTop) {
                    cb.apply(this);
                } else {
                    $('html, body').stop().animate({
                        'scrollTop' : totalMoveTop
                    }, defParams.scrollDuration, function () {
                        cb.apply(this);
                    });
                }
            },
            pageTopgo : function (e) {
                e.preventDefault();
                if ($(win).scrollTop() <= 0) return;
                $('html, body').stop().animate({
                    scrollTop : 0
                });
            },
            scrollLock : {
                init : function (type) {
                    if (!defParams.scrollLock) return;
                    var lockClass = defParams.scrollLockClass,
                        lockOpts = defParams.scrollLockOpts,
                        lockElements = $(lockOpts.lockElements);
                    lockElements.toggleClass(lockClass, type);
                    if (type) {
                        if (UTIL.isDevice && UTIL.isIOS) {
                            if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                            lockOpts.appliedLock = {};
                            this.saveStyles();
                            this.saveScrolls();
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
                            this.saveStyles();
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
                        lockOpts = defParams.scrollLockOpts,
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
                    var lockOpts = defParams.scrollLockOpts;
                    lockOpts.prevScroll = {
                        scrollLeft : $(win).scrollLeft(),
                        scrollTop : $(win).scrollTop()
                    };
                }
            }
        }
    })();

    $(function () {
        win.smg.euCp.page.init();
    });
})(window, window.jQuery, window.document);