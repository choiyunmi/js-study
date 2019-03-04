/* domchanged.min.js */
(function(e){if(typeof exports=="object"){e(require("jquery"))}else if(typeof define=="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";function t(t,n){return e(t).trigger("DOMChanged",n)}function n(t,n){var r=e.fn[t];if(r){e.fn[t]=function(){var e=Array.prototype.slice.apply(arguments);var t=r.apply(this,e);n.apply(this,e);return t}}}n("prepend",function(){return t(this,"prepend")});n("append",function(){return t(this,"append")});n("before",function(){return t(e(this).parent(),"before")});n("after",function(){return t(e(this).parent(),"after")});n("html",function(e){if(typeof e==="string"){return t(this,"html")}})});
(function (win, $, doc) {
    'use strict';

    if('undefined' === typeof win.smg) {
        win.smg = {};
    }

    if('undefined' === typeof win.smg.aem) {
        win.smg.aem = {};
    }

    if('undefined' === typeof win.smg.aem.components) {
        win.smg.aem.components = {};
    }

    if('undefined' === typeof win.smg.aem.components.responsive) {
        win.smg.aem.components.responsive = {};
    }

    // Static Values
    var V_STATIC = win.smg.aem.varStatic,
    // Utility Script
    UTIL = win.smg.aem.util,
    // Custom Events
    CST_EVENT = win.smg.aem.customEvent;

    var namespace = win.smg.aem.components;

    /**
     * @name window.smg.aem.components.responsive
     * @namespace
     * @requires jQuery
     * @requires namespace.js
     * @requires window.smg.static.js
     * @requires window.smg.util.js
     */
    namespace.responsive = (function() {
        /**
         * @description Default Options
         * @private
         * @type {Object}
         */
        var defParams = {
            isSupportTransform : (function () {
                return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
            })(),
            viewType : null
        };
        return {
            init : function(container, args) {
                if (!(this.container = container).size()) return;

                this.opts = UTIL.def(defParams, (args || {}));
                this.setElements();
                this.setBindEvents();
            },
            setElements : function() {
                this.resImgs = $('.' + V_STATIC.CSS.JS_IMG_SRC);
                this.resDataAttr = V_STATIC.DATA_ATTR.SRC_MOBILE;
            },
            setBindEvents : function() {
                this.container.on(CST_EVENT.RESPONSIVE.CHANGE, $.proxy(this.onResponsiveChange, this));
                this.container.trigger(CST_EVENT.RESPONSIVE.GET_STATUS);
            },
            onResponsiveChange : function(e, data) {
                if (!this.opts.isSupportTransform) {
                    if (this.opts.viewType != 'pc') {
                        this.opts.viewType = 'pc';
                        data['RESPONSIVE_NAME'] = 'desktop';
                        this.setLayout(e, data);
                    }
                } else {
                    this.setLayout(e, data);
                }
            },
            setLayout : function (e, data) {
                var _this = this;
                switch(data.RESPONSIVE_NAME) {
                    case V_STATIC.RESPONSIVE.DESKTOP.NAME:
                        this.resDataAttr = V_STATIC.DATA_ATTR.SRC_PC;
                        break;
                    case V_STATIC.RESPONSIVE.MOBILE.NAME:
                        this.resDataAttr = V_STATIC.DATA_ATTR.SRC_MOBILE;
                        break;
                    default:
                        this.resDataAttr = V_STATIC.DATA_ATTR.SRC_PC;
                        break;
                }

                $.each(this.resImgs, function() {
                    var el = $(this),
                    src = el.attr('src'),
                    resSrc = el.attr(_this.resDataAttr);

                    if (src !== resSrc) {
                        el.attr('src', resSrc);
                    }
                });
            }
        };
    })();

    $(function() {
        namespace.responsive.init($('body'));
    });
})(window, window.jQuery, window.document);
/*!
 * imagesLoaded PACKAGED v3.2.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,s=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),s="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(s?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,s=this.getListenersAsObject(e);for(r in s)s.hasOwnProperty(r)&&(i=t(s[r],n),-1!==i&&s[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)s.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?s.call(this,i,r):o.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,s,o=this.getListenersAsObject(e);for(r in o)if(o.hasOwnProperty(r))for(i=o[r].length;i--;)n=o[r][i],n.once===!0&&this.removeListener(e,n.listener),s=n.listener.apply(this,t||[]),s===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=s,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var s={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",s):e.eventie=s}(this),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"==f.call(e)}function s(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0;n<e.length;n++)t.push(e[n]);else t.push(e);return t}function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=s(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),u&&(this.jqDeferred=new u.Deferred);var r=this;setTimeout(function(){r.check()})}function h(e){this.img=e}function a(e,t){this.url=e,this.element=t,this.img=new Image}var u=e.jQuery,c=e.console,f=Object.prototype.toString;o.prototype=new t,o.prototype.options={},o.prototype.getImages=function(){this.images=[];for(var e=0;e<this.elements.length;e++){var t=this.elements[e];this.addElementImages(t)}},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&d[t]){for(var n=e.querySelectorAll("img"),i=0;i<n.length;i++){var r=n[i];this.addImage(r)}if("string"==typeof this.options.background){var s=e.querySelectorAll(this.options.background);for(i=0;i<s.length;i++){var o=s[i];this.addElementBackgroundImages(o)}}}};var d={1:!0,9:!0,11:!0};o.prototype.addElementBackgroundImages=function(e){for(var t=m(e),n=/url\(['"]*([^'"\)]+)['"]*\)/gi,i=n.exec(t.backgroundImage);null!==i;){var r=i&&i[1];r&&this.addBackground(r,e),i=n.exec(t.backgroundImage)}};var m=e.getComputedStyle||function(e){return e.currentStyle};return o.prototype.addImage=function(e){var t=new h(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var n=new a(e,t);this.images.push(n)},o.prototype.check=function(){function e(e,n,i){setTimeout(function(){t.progress(e,n,i)})}var t=this;if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length)return void this.complete();for(var n=0;n<this.images.length;n++){var i=this.images[n];i.once("progress",e),i.check()}},o.prototype.progress=function(e,t,n){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emit("progress",this,e,t),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&c&&c.log("progress: "+n,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emit(e,this),this.emit("always",this),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},h.prototype=new t,h.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,n.bind(this.proxyImage,"load",this),n.bind(this.proxyImage,"error",this),n.bind(this.img,"load",this),n.bind(this.img,"error",this),void(this.proxyImage.src=this.img.src))},h.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},h.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("progress",this,this.img,t)},h.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},h.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},h.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},h.prototype.unbindEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this),n.unbind(this.img,"load",this),n.unbind(this.img,"error",this)},a.prototype=new h,a.prototype.check=function(){n.bind(this.img,"load",this),n.bind(this.img,"error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},a.prototype.unbindEvents=function(){n.unbind(this.img,"load",this),n.unbind(this.img,"error",this)},a.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("progress",this,this.element,t)},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(u=t,u.fn.imagesLoaded=function(e,t){var n=new o(this,e,t);return n.jqDeferred.promise(u(this))})},o.makeJQueryPlugin(),o});
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
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

(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.euCp = win.smg.euCp || {};
    win.smg.euCp.common = win.smg.euCp.common || {};

    var UTIL = win.smg.euCp.common.util,
        pluginName = 'InputRadios';

    win.smg.euCp[pluginName] = (function () {
        var defParams = {
            container : '.js-radio-wrap',
            formElements : 'input:radio',
            formLabel : '.configurator-radio__label',
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
                this.totalChangeFunc(target);
            },
            totalChangeFunc : function (target) {
                var targetName = target.attr('name');
                $(doc).find(defParams.formElements).filter('[name=' + targetName + ']').not(target).closest(defParams.container).removeClass(defParams.activeClass);
            },
            clickFunc : function (e) {
                var target = $(e.currentTarget),
                    targetContainer = target.closest(defParams.container),
                    targetFormElements = targetContainer.find(defParams.formElements);
                targetFormElements.trigger('click');
                targetContainer.toggleClass(defParams.activeClass, targetFormElements.prop('checked'));
                this.totalChangeFunc(targetFormElements);
            }
        }
    })();

    $(function () {
        win.smg.euCp[pluginName].init();
    });
})(window, window.jQuery, window.document);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4wMS52ZW5kb3IwMS5qcXVlcnkuZG9tY2hhbmdlZC5taW4uanMiLCJtYWluMDEudmVuZG9yMDIuY29tcG9uZW50LnJlc3BvbnNpdmUuaW1nLmpzIiwibWFpbjAxLnZlbmRvcjAzLmltYWdlc2xvYWRlZC5wa2dkLm1pbi5qcyIsIm1haW4wMS52ZW5kb3IwNC5qcXVlcnkubW91c2V3aGVlbC5taW4uanMiLCJtYWluMDIudmVuZG9yMDAuY29tbW9uLmpzIiwibWFpbjAyLnZlbmRvcjAxLmNvbW1vbi1pbnB1dC10ZXh0LmpzIiwibWFpbjAyLnZlbmRvcjAyLmNvbW1vbi1pbnB1dC1jaGVja2JveC5qcyIsIm1haW4wMi52ZW5kb3IwMy5jb21tb24taW5wdXQtcmFkaW8uanMiLCJtYWluMDIudmVuZG9yMDQuY29tbW9uLXNlbGVjdC1jdXN0b20uanMiLCJtYWluMDIudmVuZG9yMDUuY29tbW9uLWhlaWdodC1tYXRjaC5qcyIsIm1haW4wMi52ZW5kb3IwNi5jb21tb24tbGF5ZXItY3VzdG9tLmpzIiwibWFpbjAyLnZlbmRvcjA3LmNvbW1vbi1zdGlja3ktY3VzdG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdlZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4akJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZG9tY2hhbmdlZC5taW4uanMgKi9cclxuKGZ1bmN0aW9uKGUpe2lmKHR5cGVvZiBleHBvcnRzPT1cIm9iamVjdFwiKXtlKHJlcXVpcmUoXCJqcXVlcnlcIikpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW1wianF1ZXJ5XCJdLGUpfWVsc2V7ZShqUXVlcnkpfX0pKGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxuKXtyZXR1cm4gZSh0KS50cmlnZ2VyKFwiRE9NQ2hhbmdlZFwiLG4pfWZ1bmN0aW9uIG4odCxuKXt2YXIgcj1lLmZuW3RdO2lmKHIpe2UuZm5bdF09ZnVuY3Rpb24oKXt2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJndW1lbnRzKTt2YXIgdD1yLmFwcGx5KHRoaXMsZSk7bi5hcHBseSh0aGlzLGUpO3JldHVybiB0fX19bihcInByZXBlbmRcIixmdW5jdGlvbigpe3JldHVybiB0KHRoaXMsXCJwcmVwZW5kXCIpfSk7bihcImFwcGVuZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHQodGhpcyxcImFwcGVuZFwiKX0pO24oXCJiZWZvcmVcIixmdW5jdGlvbigpe3JldHVybiB0KGUodGhpcykucGFyZW50KCksXCJiZWZvcmVcIil9KTtuKFwiYWZ0ZXJcIixmdW5jdGlvbigpe3JldHVybiB0KGUodGhpcykucGFyZW50KCksXCJhZnRlclwiKX0pO24oXCJodG1sXCIsZnVuY3Rpb24oZSl7aWYodHlwZW9mIGU9PT1cInN0cmluZ1wiKXtyZXR1cm4gdCh0aGlzLFwiaHRtbFwiKX19KX0pOyIsIihmdW5jdGlvbiAod2luLCAkLCBkb2MpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBpZigndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHdpbi5zbWcpIHtcclxuICAgICAgICB3aW4uc21nID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB3aW4uc21nLmFlbSkge1xyXG4gICAgICAgIHdpbi5zbWcuYWVtID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB3aW4uc21nLmFlbS5jb21wb25lbnRzKSB7XHJcbiAgICAgICAgd2luLnNtZy5hZW0uY29tcG9uZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCd1bmRlZmluZWQnID09PSB0eXBlb2Ygd2luLnNtZy5hZW0uY29tcG9uZW50cy5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgd2luLnNtZy5hZW0uY29tcG9uZW50cy5yZXNwb25zaXZlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhdGljIFZhbHVlc1xyXG4gICAgdmFyIFZfU1RBVElDID0gd2luLnNtZy5hZW0udmFyU3RhdGljLFxyXG4gICAgLy8gVXRpbGl0eSBTY3JpcHRcclxuICAgIFVUSUwgPSB3aW4uc21nLmFlbS51dGlsLFxyXG4gICAgLy8gQ3VzdG9tIEV2ZW50c1xyXG4gICAgQ1NUX0VWRU5UID0gd2luLnNtZy5hZW0uY3VzdG9tRXZlbnQ7XHJcblxyXG4gICAgdmFyIG5hbWVzcGFjZSA9IHdpbi5zbWcuYWVtLmNvbXBvbmVudHM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbmFtZSB3aW5kb3cuc21nLmFlbS5jb21wb25lbnRzLnJlc3BvbnNpdmVcclxuICAgICAqIEBuYW1lc3BhY2VcclxuICAgICAqIEByZXF1aXJlcyBqUXVlcnlcclxuICAgICAqIEByZXF1aXJlcyBuYW1lc3BhY2UuanNcclxuICAgICAqIEByZXF1aXJlcyB3aW5kb3cuc21nLnN0YXRpYy5qc1xyXG4gICAgICogQHJlcXVpcmVzIHdpbmRvdy5zbWcudXRpbC5qc1xyXG4gICAgICovXHJcbiAgICBuYW1lc3BhY2UucmVzcG9uc2l2ZSA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gRGVmYXVsdCBPcHRpb25zXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBkZWZQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlzU3VwcG9ydFRyYW5zZm9ybSA6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdXZWJraXRUcmFuc2Zvcm0nIGluIGRvYy5ib2R5LnN0eWxlIHx8ICdNb3pUcmFuc2Zvcm0nIGluIGRvYy5ib2R5LnN0eWxlIHx8ICdtc1RyYW5zZm9ybScgaW4gZG9jLmJvZHkuc3R5bGUgfHwgJ09UcmFuc2Zvcm0nIGluIGRvYy5ib2R5LnN0eWxlIHx8ICd0cmFuc2Zvcm0nIGluIGRvYy5ib2R5LnN0eWxlKTtcclxuICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgdmlld1R5cGUgOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24oY29udGFpbmVyLCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcikuc2l6ZSgpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzID0gVVRJTC5kZWYoZGVmUGFyYW1zLCAoYXJncyB8fCB7fSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRzIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc0ltZ3MgPSAkKCcuJyArIFZfU1RBVElDLkNTUy5KU19JTUdfU1JDKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzRGF0YUF0dHIgPSBWX1NUQVRJQy5EQVRBX0FUVFIuU1JDX01PQklMRTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0QmluZEV2ZW50cyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIub24oQ1NUX0VWRU5ULlJFU1BPTlNJVkUuQ0hBTkdFLCAkLnByb3h5KHRoaXMub25SZXNwb25zaXZlQ2hhbmdlLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci50cmlnZ2VyKENTVF9FVkVOVC5SRVNQT05TSVZFLkdFVF9TVEFUVVMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblJlc3BvbnNpdmVDaGFuZ2UgOiBmdW5jdGlvbihlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5pc1N1cHBvcnRUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnZpZXdUeXBlICE9ICdwYycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnZpZXdUeXBlID0gJ3BjJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnUkVTUE9OU0lWRV9OQU1FJ10gPSAnZGVza3RvcCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5b3V0KGUsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoZSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldExheW91dCA6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGRhdGEuUkVTUE9OU0lWRV9OQU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWX1NUQVRJQy5SRVNQT05TSVZFLkRFU0tUT1AuTkFNRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNEYXRhQXR0ciA9IFZfU1RBVElDLkRBVEFfQVRUUi5TUkNfUEM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVl9TVEFUSUMuUkVTUE9OU0lWRS5NT0JJTEUuTkFNRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNEYXRhQXR0ciA9IFZfU1RBVElDLkRBVEFfQVRUUi5TUkNfTU9CSUxFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc0RhdGFBdHRyID0gVl9TVEFUSUMuREFUQV9BVFRSLlNSQ19QQztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMucmVzSW1ncywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSBlbC5hdHRyKCdzcmMnKSxcclxuICAgICAgICAgICAgICAgICAgICByZXNTcmMgPSBlbC5hdHRyKF90aGlzLnJlc0RhdGFBdHRyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyYyAhPT0gcmVzU3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoJ3NyYycsIHJlc1NyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG5hbWVzcGFjZS5yZXNwb25zaXZlLmluaXQoJCgnYm9keScpKTtcclxuICAgIH0pO1xyXG59KSh3aW5kb3csIHdpbmRvdy5qUXVlcnksIHdpbmRvdy5kb2N1bWVudCk7IiwiLyohXHJcbiAqIGltYWdlc0xvYWRlZCBQQUNLQUdFRCB2My4yLjBcclxuICogSmF2YVNjcmlwdCBpcyBhbGwgbGlrZSBcIllvdSBpbWFnZXMgYXJlIGRvbmUgeWV0IG9yIHdoYXQ/XCJcclxuICogTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG4oZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKCl7fWZ1bmN0aW9uIHQoZSx0KXtmb3IodmFyIG49ZS5sZW5ndGg7bi0tOylpZihlW25dLmxpc3RlbmVyPT09dClyZXR1cm4gbjtyZXR1cm4tMX1mdW5jdGlvbiBuKGUpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0aGlzW2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19dmFyIGk9ZS5wcm90b3R5cGUscj10aGlzLHM9ci5FdmVudEVtaXR0ZXI7aS5nZXRMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQsbixpPXRoaXMuX2dldEV2ZW50cygpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlKXt0PXt9O2ZvcihuIGluIGkpaS5oYXNPd25Qcm9wZXJ0eShuKSYmZS50ZXN0KG4pJiYodFtuXT1pW25dKX1lbHNlIHQ9aVtlXXx8KGlbZV09W10pO3JldHVybiB0fSxpLmZsYXR0ZW5MaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQsbj1bXTtmb3IodD0wO3Q8ZS5sZW5ndGg7dCs9MSluLnB1c2goZVt0XS5saXN0ZW5lcik7cmV0dXJuIG59LGkuZ2V0TGlzdGVuZXJzQXNPYmplY3Q9ZnVuY3Rpb24oZSl7dmFyIHQsbj10aGlzLmdldExpc3RlbmVycyhlKTtyZXR1cm4gbiBpbnN0YW5jZW9mIEFycmF5JiYodD17fSx0W2VdPW4pLHR8fG59LGkuYWRkTGlzdGVuZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyPXRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZSkscz1cIm9iamVjdFwiPT10eXBlb2Ygbjtmb3IoaSBpbiByKXIuaGFzT3duUHJvcGVydHkoaSkmJi0xPT09dChyW2ldLG4pJiZyW2ldLnB1c2gocz9uOntsaXN0ZW5lcjpuLG9uY2U6ITF9KTtyZXR1cm4gdGhpc30saS5vbj1uKFwiYWRkTGlzdGVuZXJcIiksaS5hZGRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihlLHtsaXN0ZW5lcjp0LG9uY2U6ITB9KX0saS5vbmNlPW4oXCJhZGRPbmNlTGlzdGVuZXJcIiksaS5kZWZpbmVFdmVudD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5nZXRMaXN0ZW5lcnMoZSksdGhpc30saS5kZWZpbmVFdmVudHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDxlLmxlbmd0aDt0Kz0xKXRoaXMuZGVmaW5lRXZlbnQoZVt0XSk7cmV0dXJuIHRoaXN9LGkucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSxuKXt2YXIgaSxyLHM9dGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChlKTtmb3IociBpbiBzKXMuaGFzT3duUHJvcGVydHkocikmJihpPXQoc1tyXSxuKSwtMSE9PWkmJnNbcl0uc3BsaWNlKGksMSkpO3JldHVybiB0aGlzfSxpLm9mZj1uKFwicmVtb3ZlTGlzdGVuZXJcIiksaS5hZGRMaXN0ZW5lcnM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKCExLGUsdCl9LGkucmVtb3ZlTGlzdGVuZXJzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyghMCxlLHQpfSxpLm1hbmlwdWxhdGVMaXN0ZW5lcnM9ZnVuY3Rpb24oZSx0LG4pe3ZhciBpLHIscz1lP3RoaXMucmVtb3ZlTGlzdGVuZXI6dGhpcy5hZGRMaXN0ZW5lcixvPWU/dGhpcy5yZW1vdmVMaXN0ZW5lcnM6dGhpcy5hZGRMaXN0ZW5lcnM7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHR8fHQgaW5zdGFuY2VvZiBSZWdFeHApZm9yKGk9bi5sZW5ndGg7aS0tOylzLmNhbGwodGhpcyx0LG5baV0pO2Vsc2UgZm9yKGkgaW4gdCl0Lmhhc093blByb3BlcnR5KGkpJiYocj10W2ldKSYmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHI/cy5jYWxsKHRoaXMsaSxyKTpvLmNhbGwodGhpcyxpLHIpKTtyZXR1cm4gdGhpc30saS5yZW1vdmVFdmVudD1mdW5jdGlvbihlKXt2YXIgdCxuPXR5cGVvZiBlLGk9dGhpcy5fZ2V0RXZlbnRzKCk7aWYoXCJzdHJpbmdcIj09PW4pZGVsZXRlIGlbZV07ZWxzZSBpZihcIm9iamVjdFwiPT09bilmb3IodCBpbiBpKWkuaGFzT3duUHJvcGVydHkodCkmJmUudGVzdCh0KSYmZGVsZXRlIGlbdF07ZWxzZSBkZWxldGUgdGhpcy5fZXZlbnRzO3JldHVybiB0aGlzfSxpLnJlbW92ZUFsbExpc3RlbmVycz1uKFwicmVtb3ZlRXZlbnRcIiksaS5lbWl0RXZlbnQ9ZnVuY3Rpb24oZSx0KXt2YXIgbixpLHIscyxvPXRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZSk7Zm9yKHIgaW4gbylpZihvLmhhc093blByb3BlcnR5KHIpKWZvcihpPW9bcl0ubGVuZ3RoO2ktLTspbj1vW3JdW2ldLG4ub25jZT09PSEwJiZ0aGlzLnJlbW92ZUxpc3RlbmVyKGUsbi5saXN0ZW5lcikscz1uLmxpc3RlbmVyLmFwcGx5KHRoaXMsdHx8W10pLHM9PT10aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSYmdGhpcy5yZW1vdmVMaXN0ZW5lcihlLG4ubGlzdGVuZXIpO3JldHVybiB0aGlzfSxpLnRyaWdnZXI9bihcImVtaXRFdmVudFwiKSxpLmVtaXQ9ZnVuY3Rpb24oZSl7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3JldHVybiB0aGlzLmVtaXRFdmVudChlLHQpfSxpLnNldE9uY2VSZXR1cm5WYWx1ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fb25jZVJldHVyblZhbHVlPWUsdGhpc30saS5fZ2V0T25jZVJldHVyblZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaGFzT3duUHJvcGVydHkoXCJfb25jZVJldHVyblZhbHVlXCIpP3RoaXMuX29uY2VSZXR1cm5WYWx1ZTohMH0saS5fZ2V0RXZlbnRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz17fSl9LGUubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiByLkV2ZW50RW1pdHRlcj1zLGV9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJldmVudEVtaXR0ZXIvRXZlbnRFbWl0dGVyXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gZX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWU6dGhpcy5FdmVudEVtaXR0ZXI9ZX0pLmNhbGwodGhpcyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCh0KXt2YXIgbj1lLmV2ZW50O3JldHVybiBuLnRhcmdldD1uLnRhcmdldHx8bi5zcmNFbGVtZW50fHx0LG59dmFyIG49ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LGk9ZnVuY3Rpb24oKXt9O24uYWRkRXZlbnRMaXN0ZW5lcj9pPWZ1bmN0aW9uKGUsdCxuKXtlLmFkZEV2ZW50TGlzdGVuZXIodCxuLCExKX06bi5hdHRhY2hFdmVudCYmKGk9ZnVuY3Rpb24oZSxuLGkpe2VbbitpXT1pLmhhbmRsZUV2ZW50P2Z1bmN0aW9uKCl7dmFyIG49dChlKTtpLmhhbmRsZUV2ZW50LmNhbGwoaSxuKX06ZnVuY3Rpb24oKXt2YXIgbj10KGUpO2kuY2FsbChlLG4pfSxlLmF0dGFjaEV2ZW50KFwib25cIituLGVbbitpXSl9KTt2YXIgcj1mdW5jdGlvbigpe307bi5yZW1vdmVFdmVudExpc3RlbmVyP3I9ZnVuY3Rpb24oZSx0LG4pe2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LG4sITEpfTpuLmRldGFjaEV2ZW50JiYocj1mdW5jdGlvbihlLHQsbil7ZS5kZXRhY2hFdmVudChcIm9uXCIrdCxlW3Qrbl0pO3RyeXtkZWxldGUgZVt0K25dfWNhdGNoKGkpe2VbdCtuXT12b2lkIDB9fSk7dmFyIHM9e2JpbmQ6aSx1bmJpbmQ6cn07XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcImV2ZW50aWUvZXZlbnRpZVwiLHMpOmUuZXZlbnRpZT1zfSh0aGlzKSxmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiZXZlbnRFbWl0dGVyL0V2ZW50RW1pdHRlclwiLFwiZXZlbnRpZS9ldmVudGllXCJdLGZ1bmN0aW9uKG4saSl7cmV0dXJuIHQoZSxuLGkpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dChlLHJlcXVpcmUoXCJ3b2xmeTg3LWV2ZW50ZW1pdHRlclwiKSxyZXF1aXJlKFwiZXZlbnRpZVwiKSk6ZS5pbWFnZXNMb2FkZWQ9dChlLGUuRXZlbnRFbWl0dGVyLGUuZXZlbnRpZSl9KHdpbmRvdyxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gaShlLHQpe2Zvcih2YXIgbiBpbiB0KWVbbl09dFtuXTtyZXR1cm4gZX1mdW5jdGlvbiByKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09Zi5jYWxsKGUpfWZ1bmN0aW9uIHMoZSl7dmFyIHQ9W107aWYocihlKSl0PWU7ZWxzZSBpZihcIm51bWJlclwiPT10eXBlb2YgZS5sZW5ndGgpZm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspdC5wdXNoKGVbbl0pO2Vsc2UgdC5wdXNoKGUpO3JldHVybiB0fWZ1bmN0aW9uIG8oZSx0LG4pe2lmKCEodGhpcyBpbnN0YW5jZW9mIG8pKXJldHVybiBuZXcgbyhlLHQsbik7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZSkpLHRoaXMuZWxlbWVudHM9cyhlKSx0aGlzLm9wdGlvbnM9aSh7fSx0aGlzLm9wdGlvbnMpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/bj10OmkodGhpcy5vcHRpb25zLHQpLG4mJnRoaXMub24oXCJhbHdheXNcIixuKSx0aGlzLmdldEltYWdlcygpLHUmJih0aGlzLmpxRGVmZXJyZWQ9bmV3IHUuRGVmZXJyZWQpO3ZhciByPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe3IuY2hlY2soKX0pfWZ1bmN0aW9uIGgoZSl7dGhpcy5pbWc9ZX1mdW5jdGlvbiBhKGUsdCl7dGhpcy51cmw9ZSx0aGlzLmVsZW1lbnQ9dCx0aGlzLmltZz1uZXcgSW1hZ2V9dmFyIHU9ZS5qUXVlcnksYz1lLmNvbnNvbGUsZj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO28ucHJvdG90eXBlPW5ldyB0LG8ucHJvdG90eXBlLm9wdGlvbnM9e30sby5wcm90b3R5cGUuZ2V0SW1hZ2VzPWZ1bmN0aW9uKCl7dGhpcy5pbWFnZXM9W107Zm9yKHZhciBlPTA7ZTx0aGlzLmVsZW1lbnRzLmxlbmd0aDtlKyspe3ZhciB0PXRoaXMuZWxlbWVudHNbZV07dGhpcy5hZGRFbGVtZW50SW1hZ2VzKHQpfX0sby5wcm90b3R5cGUuYWRkRWxlbWVudEltYWdlcz1mdW5jdGlvbihlKXtcIklNR1wiPT1lLm5vZGVOYW1lJiZ0aGlzLmFkZEltYWdlKGUpLHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kPT09ITAmJnRoaXMuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMoZSk7dmFyIHQ9ZS5ub2RlVHlwZTtpZih0JiZkW3RdKXtmb3IodmFyIG49ZS5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpLGk9MDtpPG4ubGVuZ3RoO2krKyl7dmFyIHI9bltpXTt0aGlzLmFkZEltYWdlKHIpfWlmKFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCl7dmFyIHM9ZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kKTtmb3IoaT0wO2k8cy5sZW5ndGg7aSsrKXt2YXIgbz1zW2ldO3RoaXMuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMobyl9fX19O3ZhciBkPXsxOiEwLDk6ITAsMTE6ITB9O28ucHJvdG90eXBlLmFkZEVsZW1lbnRCYWNrZ3JvdW5kSW1hZ2VzPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1tKGUpLG49L3VybFxcKFsnXCJdKihbXidcIlxcKV0rKVsnXCJdKlxcKS9naSxpPW4uZXhlYyh0LmJhY2tncm91bmRJbWFnZSk7bnVsbCE9PWk7KXt2YXIgcj1pJiZpWzFdO3ImJnRoaXMuYWRkQmFja2dyb3VuZChyLGUpLGk9bi5leGVjKHQuYmFja2dyb3VuZEltYWdlKX19O3ZhciBtPWUuZ2V0Q29tcHV0ZWRTdHlsZXx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUuY3VycmVudFN0eWxlfTtyZXR1cm4gby5wcm90b3R5cGUuYWRkSW1hZ2U9ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IGgoZSk7dGhpcy5pbWFnZXMucHVzaCh0KX0sby5wcm90b3R5cGUuYWRkQmFja2dyb3VuZD1mdW5jdGlvbihlLHQpe3ZhciBuPW5ldyBhKGUsdCk7dGhpcy5pbWFnZXMucHVzaChuKX0sby5wcm90b3R5cGUuY2hlY2s9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsbixpKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5wcm9ncmVzcyhlLG4saSl9KX12YXIgdD10aGlzO2lmKHRoaXMucHJvZ3Jlc3NlZENvdW50PTAsdGhpcy5oYXNBbnlCcm9rZW49ITEsIXRoaXMuaW1hZ2VzLmxlbmd0aClyZXR1cm4gdm9pZCB0aGlzLmNvbXBsZXRlKCk7Zm9yKHZhciBuPTA7bjx0aGlzLmltYWdlcy5sZW5ndGg7bisrKXt2YXIgaT10aGlzLmltYWdlc1tuXTtpLm9uY2UoXCJwcm9ncmVzc1wiLGUpLGkuY2hlY2soKX19LG8ucHJvdG90eXBlLnByb2dyZXNzPWZ1bmN0aW9uKGUsdCxuKXt0aGlzLnByb2dyZXNzZWRDb3VudCsrLHRoaXMuaGFzQW55QnJva2VuPXRoaXMuaGFzQW55QnJva2VufHwhZS5pc0xvYWRlZCx0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLHRoaXMsZSx0KSx0aGlzLmpxRGVmZXJyZWQmJnRoaXMuanFEZWZlcnJlZC5ub3RpZnkmJnRoaXMuanFEZWZlcnJlZC5ub3RpZnkodGhpcyxlKSx0aGlzLnByb2dyZXNzZWRDb3VudD09dGhpcy5pbWFnZXMubGVuZ3RoJiZ0aGlzLmNvbXBsZXRlKCksdGhpcy5vcHRpb25zLmRlYnVnJiZjJiZjLmxvZyhcInByb2dyZXNzOiBcIituLGUsdCl9LG8ucHJvdG90eXBlLmNvbXBsZXRlPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5oYXNBbnlCcm9rZW4/XCJmYWlsXCI6XCJkb25lXCI7aWYodGhpcy5pc0NvbXBsZXRlPSEwLHRoaXMuZW1pdChlLHRoaXMpLHRoaXMuZW1pdChcImFsd2F5c1wiLHRoaXMpLHRoaXMuanFEZWZlcnJlZCl7dmFyIHQ9dGhpcy5oYXNBbnlCcm9rZW4/XCJyZWplY3RcIjpcInJlc29sdmVcIjt0aGlzLmpxRGVmZXJyZWRbdF0odGhpcyl9fSxoLnByb3RvdHlwZT1uZXcgdCxoLnByb3RvdHlwZS5jaGVjaz1mdW5jdGlvbigpe3ZhciBlPXRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7cmV0dXJuIGU/dm9pZCB0aGlzLmNvbmZpcm0oMCE9PXRoaXMuaW1nLm5hdHVyYWxXaWR0aCxcIm5hdHVyYWxXaWR0aFwiKToodGhpcy5wcm94eUltYWdlPW5ldyBJbWFnZSxuLmJpbmQodGhpcy5wcm94eUltYWdlLFwibG9hZFwiLHRoaXMpLG4uYmluZCh0aGlzLnByb3h5SW1hZ2UsXCJlcnJvclwiLHRoaXMpLG4uYmluZCh0aGlzLmltZyxcImxvYWRcIix0aGlzKSxuLmJpbmQodGhpcy5pbWcsXCJlcnJvclwiLHRoaXMpLHZvaWQodGhpcy5wcm94eUltYWdlLnNyYz10aGlzLmltZy5zcmMpKX0saC5wcm90b3R5cGUuZ2V0SXNJbWFnZUNvbXBsZXRlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW1nLmNvbXBsZXRlJiZ2b2lkIDAhPT10aGlzLmltZy5uYXR1cmFsV2lkdGh9LGgucHJvdG90eXBlLmNvbmZpcm09ZnVuY3Rpb24oZSx0KXt0aGlzLmlzTG9hZGVkPWUsdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLHRoaXMuaW1nLHQpfSxoLnByb3RvdHlwZS5oYW5kbGVFdmVudD1mdW5jdGlvbihlKXt2YXIgdD1cIm9uXCIrZS50eXBlO3RoaXNbdF0mJnRoaXNbdF0oZSl9LGgucHJvdG90eXBlLm9ubG9hZD1mdW5jdGlvbigpe3RoaXMuY29uZmlybSghMCxcIm9ubG9hZFwiKSx0aGlzLnVuYmluZEV2ZW50cygpfSxoLnByb3RvdHlwZS5vbmVycm9yPWZ1bmN0aW9uKCl7dGhpcy5jb25maXJtKCExLFwib25lcnJvclwiKSx0aGlzLnVuYmluZEV2ZW50cygpfSxoLnByb3RvdHlwZS51bmJpbmRFdmVudHM9ZnVuY3Rpb24oKXtuLnVuYmluZCh0aGlzLnByb3h5SW1hZ2UsXCJsb2FkXCIsdGhpcyksbi51bmJpbmQodGhpcy5wcm94eUltYWdlLFwiZXJyb3JcIix0aGlzKSxuLnVuYmluZCh0aGlzLmltZyxcImxvYWRcIix0aGlzKSxuLnVuYmluZCh0aGlzLmltZyxcImVycm9yXCIsdGhpcyl9LGEucHJvdG90eXBlPW5ldyBoLGEucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKCl7bi5iaW5kKHRoaXMuaW1nLFwibG9hZFwiLHRoaXMpLG4uYmluZCh0aGlzLmltZyxcImVycm9yXCIsdGhpcyksdGhpcy5pbWcuc3JjPXRoaXMudXJsO3ZhciBlPXRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7ZSYmKHRoaXMuY29uZmlybSgwIT09dGhpcy5pbWcubmF0dXJhbFdpZHRoLFwibmF0dXJhbFdpZHRoXCIpLHRoaXMudW5iaW5kRXZlbnRzKCkpfSxhLnByb3RvdHlwZS51bmJpbmRFdmVudHM9ZnVuY3Rpb24oKXtuLnVuYmluZCh0aGlzLmltZyxcImxvYWRcIix0aGlzKSxuLnVuYmluZCh0aGlzLmltZyxcImVycm9yXCIsdGhpcyl9LGEucHJvdG90eXBlLmNvbmZpcm09ZnVuY3Rpb24oZSx0KXt0aGlzLmlzTG9hZGVkPWUsdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLHRoaXMuZWxlbWVudCx0KX0sby5tYWtlSlF1ZXJ5UGx1Z2luPWZ1bmN0aW9uKHQpe3Q9dHx8ZS5qUXVlcnksdCYmKHU9dCx1LmZuLmltYWdlc0xvYWRlZD1mdW5jdGlvbihlLHQpe3ZhciBuPW5ldyBvKHRoaXMsZSx0KTtyZXR1cm4gbi5qcURlZmVycmVkLnByb21pc2UodSh0aGlzKSl9KX0sby5tYWtlSlF1ZXJ5UGx1Z2luKCksb30pOyIsIi8qIVxyXG4gKiBqUXVlcnkgTW91c2V3aGVlbCAzLjEuMTNcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTUgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcclxuICovXHJcbiFmdW5jdGlvbihhKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiXSxhKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1hOmEoalF1ZXJ5KX0oZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihiKXt2YXIgZz1ifHx3aW5kb3cuZXZlbnQsaD1pLmNhbGwoYXJndW1lbnRzLDEpLGo9MCxsPTAsbT0wLG49MCxvPTAscD0wO2lmKGI9YS5ldmVudC5maXgoZyksYi50eXBlPVwibW91c2V3aGVlbFwiLFwiZGV0YWlsXCJpbiBnJiYobT0tMSpnLmRldGFpbCksXCJ3aGVlbERlbHRhXCJpbiBnJiYobT1nLndoZWVsRGVsdGEpLFwid2hlZWxEZWx0YVlcImluIGcmJihtPWcud2hlZWxEZWx0YVkpLFwid2hlZWxEZWx0YVhcImluIGcmJihsPS0xKmcud2hlZWxEZWx0YVgpLFwiYXhpc1wiaW4gZyYmZy5heGlzPT09Zy5IT1JJWk9OVEFMX0FYSVMmJihsPS0xKm0sbT0wKSxqPTA9PT1tP2w6bSxcImRlbHRhWVwiaW4gZyYmKG09LTEqZy5kZWx0YVksaj1tKSxcImRlbHRhWFwiaW4gZyYmKGw9Zy5kZWx0YVgsMD09PW0mJihqPS0xKmwpKSwwIT09bXx8MCE9PWwpe2lmKDE9PT1nLmRlbHRhTW9kZSl7dmFyIHE9YS5kYXRhKHRoaXMsXCJtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0XCIpO2oqPXEsbSo9cSxsKj1xfWVsc2UgaWYoMj09PWcuZGVsdGFNb2RlKXt2YXIgcj1hLmRhdGEodGhpcyxcIm1vdXNld2hlZWwtcGFnZS1oZWlnaHRcIik7aio9cixtKj1yLGwqPXJ9aWYobj1NYXRoLm1heChNYXRoLmFicyhtKSxNYXRoLmFicyhsKSksKCFmfHxmPm4pJiYoZj1uLGQoZyxuKSYmKGYvPTQwKSksZChnLG4pJiYoai89NDAsbC89NDAsbS89NDApLGo9TWF0aFtqPj0xP1wiZmxvb3JcIjpcImNlaWxcIl0oai9mKSxsPU1hdGhbbD49MT9cImZsb29yXCI6XCJjZWlsXCJdKGwvZiksbT1NYXRoW20+PTE/XCJmbG9vclwiOlwiY2VpbFwiXShtL2YpLGsuc2V0dGluZ3Mubm9ybWFsaXplT2Zmc2V0JiZ0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCl7dmFyIHM9dGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtvPWIuY2xpZW50WC1zLmxlZnQscD1iLmNsaWVudFktcy50b3B9cmV0dXJuIGIuZGVsdGFYPWwsYi5kZWx0YVk9bSxiLmRlbHRhRmFjdG9yPWYsYi5vZmZzZXRYPW8sYi5vZmZzZXRZPXAsYi5kZWx0YU1vZGU9MCxoLnVuc2hpZnQoYixqLGwsbSksZSYmY2xlYXJUaW1lb3V0KGUpLGU9c2V0VGltZW91dChjLDIwMCksKGEuZXZlbnQuZGlzcGF0Y2h8fGEuZXZlbnQuaGFuZGxlKS5hcHBseSh0aGlzLGgpfX1mdW5jdGlvbiBjKCl7Zj1udWxsfWZ1bmN0aW9uIGQoYSxiKXtyZXR1cm4gay5zZXR0aW5ncy5hZGp1c3RPbGREZWx0YXMmJlwibW91c2V3aGVlbFwiPT09YS50eXBlJiZiJTEyMD09PTB9dmFyIGUsZixnPVtcIndoZWVsXCIsXCJtb3VzZXdoZWVsXCIsXCJET01Nb3VzZVNjcm9sbFwiLFwiTW96TW91c2VQaXhlbFNjcm9sbFwiXSxoPVwib253aGVlbFwiaW4gZG9jdW1lbnR8fGRvY3VtZW50LmRvY3VtZW50TW9kZT49OT9bXCJ3aGVlbFwiXTpbXCJtb3VzZXdoZWVsXCIsXCJEb21Nb3VzZVNjcm9sbFwiLFwiTW96TW91c2VQaXhlbFNjcm9sbFwiXSxpPUFycmF5LnByb3RvdHlwZS5zbGljZTtpZihhLmV2ZW50LmZpeEhvb2tzKWZvcih2YXIgaj1nLmxlbmd0aDtqOylhLmV2ZW50LmZpeEhvb2tzW2dbLS1qXV09YS5ldmVudC5tb3VzZUhvb2tzO3ZhciBrPWEuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsPXt2ZXJzaW9uOlwiMy4xLjEyXCIsc2V0dXA6ZnVuY3Rpb24oKXtpZih0aGlzLmFkZEV2ZW50TGlzdGVuZXIpZm9yKHZhciBjPWgubGVuZ3RoO2M7KXRoaXMuYWRkRXZlbnRMaXN0ZW5lcihoWy0tY10sYiwhMSk7ZWxzZSB0aGlzLm9ubW91c2V3aGVlbD1iO2EuZGF0YSh0aGlzLFwibW91c2V3aGVlbC1saW5lLWhlaWdodFwiLGsuZ2V0TGluZUhlaWdodCh0aGlzKSksYS5kYXRhKHRoaXMsXCJtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0XCIsay5nZXRQYWdlSGVpZ2h0KHRoaXMpKX0sdGVhcmRvd246ZnVuY3Rpb24oKXtpZih0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIpZm9yKHZhciBjPWgubGVuZ3RoO2M7KXRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihoWy0tY10sYiwhMSk7ZWxzZSB0aGlzLm9ubW91c2V3aGVlbD1udWxsO2EucmVtb3ZlRGF0YSh0aGlzLFwibW91c2V3aGVlbC1saW5lLWhlaWdodFwiKSxhLnJlbW92ZURhdGEodGhpcyxcIm1vdXNld2hlZWwtcGFnZS1oZWlnaHRcIil9LGdldExpbmVIZWlnaHQ6ZnVuY3Rpb24oYil7dmFyIGM9YShiKSxkPWNbXCJvZmZzZXRQYXJlbnRcImluIGEuZm4/XCJvZmZzZXRQYXJlbnRcIjpcInBhcmVudFwiXSgpO3JldHVybiBkLmxlbmd0aHx8KGQ9YShcImJvZHlcIikpLHBhcnNlSW50KGQuY3NzKFwiZm9udFNpemVcIiksMTApfHxwYXJzZUludChjLmNzcyhcImZvbnRTaXplXCIpLDEwKXx8MTZ9LGdldFBhZ2VIZWlnaHQ6ZnVuY3Rpb24oYil7cmV0dXJuIGEoYikuaGVpZ2h0KCl9LHNldHRpbmdzOnthZGp1c3RPbGREZWx0YXM6ITAsbm9ybWFsaXplT2Zmc2V0OiEwfX07YS5mbi5leHRlbmQoe21vdXNld2hlZWw6ZnVuY3Rpb24oYSl7cmV0dXJuIGE/dGhpcy5iaW5kKFwibW91c2V3aGVlbFwiLGEpOnRoaXMudHJpZ2dlcihcIm1vdXNld2hlZWxcIil9LHVubW91c2V3aGVlbDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy51bmJpbmQoXCJtb3VzZXdoZWVsXCIsYSl9fSl9KTsiLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuXHJcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5cclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGN1c3RvbUV2ZW50IDoge1xyXG4gICAgICAgICAgICAgICAgUEFHRUlTIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIEVWRU5UX01BTkFHRVIgOiAkKCc8ZGl2IGRhdGEtZXZ0LW1hbmFnZXI9XFwncGFnZVxcJy8+JyksXHJcbiAgICAgICAgICAgICAgICAgICAgUEFHRU9CSlMgOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBSRVBPU0lUSU9OIDogJ1BBR0VfUkVQT1NJVElPTidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RpY2t5RGF0YXMgOiBbXSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHMgOiB7XHJcbiAgICAgICAgICAgICAgICBNT0JJTEUgOiA3NjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXRpbCA6IHtcclxuICAgICAgICAgICAgICAgIGlzRGV0ZWN0aW5nIDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNNYWMgPSAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPT0gLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0VtdWxhdG9yID0gbmF2aWdhdG9yLmNvbm5lY3Rpb24gJiYgKG5hdmlnYXRvci5wbGF0Zm9ybS5pbmRleE9mKCdXaW4nKSAhPT0gLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dpblNhZmFyaSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwTmV0c2NhcGUgPSAobmF2aWdhdG9yLmFwcE5hbWUgPT09IFwiTmV0c2NhcGVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbk1hYyA9IChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckFnZW50U2FmYXJpID0gKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPT0gLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJBZ2VudENocm9tZSA9IChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT09IC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYXBwTmV0c2NhcGUgJiYgIWFwcFZlcnNpb25NYWMgJiYgdXNlckFnZW50U2FmYXJpICYmICF1c2VyQWdlbnRDaHJvbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaXNNYWMgJiYgIWlzRW11bGF0b3IpIHx8IGlzV2luU2FmYXJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zLXNhZmFyaScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnRUcmFuc2Zvcm0gOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoJ1dlYmtpdFRyYW5zZm9ybScgaW4gZG9jLmJvZHkuc3R5bGUgfHwgJ01velRyYW5zZm9ybScgaW4gZG9jLmJvZHkuc3R5bGUgfHwgJ21zVHJhbnNmb3JtJyBpbiBkb2MuYm9keS5zdHlsZSB8fCAnT1RyYW5zZm9ybScgaW4gZG9jLmJvZHkuc3R5bGUgfHwgJ3RyYW5zZm9ybScgaW4gZG9jLmJvZHkuc3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydFRyYW5zaXRpb24gOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoJ1dlYmtpdFRyYW5zaXRpb24nIGluIGRvYy5ib2R5LnN0eWxlIHx8ICdNb3pUcmFuc2l0aW9uJyBpbiBkb2MuYm9keS5zdHlsZSB8fCAnbXNUcmFuc2l0aW9uJyBpbiBkb2MuYm9keS5zdHlsZSB8fCAnT1RyYW5zaXRpb24nIGluIGRvYy5ib2R5LnN0eWxlIHx8ICd0cmFuc2l0aW9uJyBpbiBkb2MuYm9keS5zdHlsZSk7XHJcbiAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0VHJhbnNmb3JtczNkIDogKHdpbmRvdy5Nb2Rlcm5penIgJiYgTW9kZXJuaXpyLmNzc3RyYW5zZm9ybXMzZCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgnd2Via2l0UGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnTW96UGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnT1BlcnNwZWN0aXZlJyBpbiBkaXYgfHwgJ01zUGVyc3BlY3RpdmUnIGluIGRpdiB8fCAncGVyc3BlY3RpdmUnIGluIGRpdik7XHJcbiAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgaXNEZXZpY2UgOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoJ29udG91Y2hzdGFydCcgaW4gd2luIHx8ICh3aW4uRG9jdW1lbnRUb3VjaCAmJiBkb2MgaW5zdGFuY2VvZiB3aW4uRG9jdW1lbnRUb3VjaCkpO1xyXG4gICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgIGlzSU9TIDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcclxuICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICBpc0FlbUVkaXRNb2RlIDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luLnNtZy5hZW0udXRpbC5pc0FlbUVkaXRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgZGVmIDogZnVuY3Rpb24gKG9yZywgc3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHNyYywgcHJvcCkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJ29iamVjdCcgPT09ICQudHlwZShvcmdbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmdbcHJvcF0gPSAoJ2FycmF5JyA9PT0gJC50eXBlKG9yZ1twcm9wXSkpID8gc3JjW3Byb3BdLnNsaWNlKDApIDogdGhpcy5kZWYob3JnW3Byb3BdLCBzcmNbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JnW3Byb3BdID0gc3JjW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgd2FpdCA6IGZ1bmN0aW9uKHRpbWVvdXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRlZmVycmVkLnJlc29sdmUsIHRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgd2luU2l6ZSA6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzV2luU2FmYXJpID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcE5ldHNjYXBlID0gKG5hdmlnYXRvci5hcHBOYW1lID09PSBcIk5ldHNjYXBlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbk1hYyA9IChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyQWdlbnRTYWZhcmkgPSAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9PSAtMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyQWdlbnRDaHJvbWUgPSAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9PSAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYXBwTmV0c2NhcGUgJiYgIWFwcFZlcnNpb25NYWMgJiYgdXNlckFnZW50U2FmYXJpICYmICF1c2VyQWdlbnRDaHJvbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2luU2FmYXJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luX3doID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgOiAkKHdpbikud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoIDogJCh3aW4pLmhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbl93aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luX3doID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHcgOiB3aW4uaW5uZXJXaWR0aCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvYy5ib2R5LmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGggOiB3aW4uaW5uZXJIZWlnaHQgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jLmJvZHkuY2xpZW50SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbl93aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QUZyYW1lIDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luLnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW4ud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbi5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luLm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luLm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbi5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbEFGcmFtZSA6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbi5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW4ud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luLndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW4ubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luLm9DYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW4ubXNDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5jbGVhclRpbWVvdXQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgIGlzRGV2VG9vbCA6IGZ1bmN0aW9uIChlLCBfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kZXZMYXlvdXQgPSBfdGFyZ2V0LmNsb3Nlc3QoJyNkZXZMYXlvdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9kZXZMYXlvdXQubGVuZ3RoKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBnZXRSZXN0cmljdEJ5dGVzIDogZnVuY3Rpb24gKHN0ciwgbWF4Qnl0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyTGVuZyA9IHN0ci5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJCeXRlID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgckxlbiA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckNoYXIgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBtYXhCeXRlcyA9IG1heEJ5dGVzIHx8IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJDaGFyID0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVzY2FwZShzdHJDaGFyKS5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByQnl0ZSArPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgckJ5dGUrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAockJ5dGUgPD0gbWF4Qnl0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJMZW4gPSBpKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgOiByQnl0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjdExlbmcgOiByTGVuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGltZ0xvYWRlciA6IGZ1bmN0aW9uIChzZWxlY3RvciwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gKGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tcGxldGUgfHwgJCh0aGlzKS5oZWlnaHQoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignbG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzIDoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgb24gOiBmdW5jdGlvbiAoZXZlbnQsIGNiLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5zdWJzY3JpYmVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbZXZlbnRdID0gdGhpcy5zdWJzY3JpYmVyc1tldmVudF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbZXZlbnRdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgOiBjYixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgOiBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmIDogZnVuY3Rpb24gKGV2ZW50LCBjYiwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4LCBzdWJzID0gdGhpcy5zdWJzY3JpYmVyc1tldmVudF0sIHN1YjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IHN1YnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YiA9IHN1YnNbaWR4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHN1Yi5jYWxsYmFjayA9PT0gY2IpICYmICghY29udGV4dCB8fCBzdWIuY29udGV4dCA9PT0gY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vicy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbWl0IDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJzID0gdGhpcy5zdWJzY3JpYmVyc1tldmVudF0sIGlkeCA9IDAsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBzdWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgc3Vicy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWIgPSBzdWJzW2lkeF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViLmNhbGxiYWNrLmFwcGx5KHN1Yi5jb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICB2YXIgQ1NUX0VWRU5UID0gd2luLnNtZy5ldUNwLmNvbW1vbi5jdXN0b21FdmVudCxcclxuICAgICAgICBTVElDS1lEQVRBUyA9IHdpbi5zbWcuZXVDcC5jb21tb24uc3RpY2t5RGF0YXMsXHJcbiAgICAgICAgVVRJTCA9IHdpbi5zbWcuZXVDcC5jb21tb24udXRpbDtcclxuXHJcbiAgICB3aW4uc21nLmV1Q3AucGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZlBhcmFtcyA9IHtcclxuICAgICAgICAgICAgc2Nyb2xsRHVyYXRpb24gOiAzMDAsXHJcbiAgICAgICAgICAgIHNjcm9sbExvY2sgOiB0cnVlLFxyXG4gICAgICAgICAgICBzY3JvbGxMb2NrQ2xhc3MgOiAnaGl2ZS1zY3JvbGwtbG9jaycsXHJcbiAgICAgICAgICAgIHNjcm9sbExvY2tPcHRzIDoge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsTG9ja2VkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMgOiAnaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWVkTG9jayA6IHt9LFxyXG4gICAgICAgICAgICAgICAgcHJldlN0eWxlcyA6IHt9LFxyXG4gICAgICAgICAgICAgICAgcHJldlNjcm9sbCA6IHt9LFxyXG4gICAgICAgICAgICAgICAgbG9ja1N0eWxlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteScgOiAnc2Nyb2xsJyxcclxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nIDogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnIDogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmluZEV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIENTVF9FVkVOVC5QQUdFSVMuRVZFTlRfTUFOQUdFUi5vbihDU1RfRVZFTlQuUEFHRUlTLlJFUE9TSVRJT04sICQucHJveHkodGhpcy5wYWdlUmVwb3NpdGlvbiwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgJChkb2MpLm9uKCdjbGljaycsICcuanMtdG9wLWdvJywgJC5wcm94eSh0aGlzLnBhZ2VUb3BnbywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW4pLm9uKCdsb2FkJywgJC5wcm94eSh0aGlzLmxvYWRGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2VSZXBvc2l0aW9uIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IENTVF9FVkVOVC5QQUdFSVMuUEFHRU9CSlMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBDU1RfRVZFTlQuUEFHRUlTLlBBR0VPQkpTW2ldLnJlSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsb2FkRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVJlcG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RpY2t5QXJlYSA6IGZ1bmN0aW9uICh0YXJnZXRTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRUb3BzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAga2V5TWlucyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleU1pbiwgaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIFNUSUNLWURBVEFTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0aWNreSA9IFNUSUNLWURBVEFTW2tleV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreURhdGEgPSAkKHN0aWNreS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RpY2t5RGF0YS5vZmZzZXQoKS50b3AgPD0gdGFyZ2V0U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleU1pbnMucHVzaChzdGlja3lEYXRhLm9mZnNldCgpLnRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleU1pbiA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGtleU1pbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgha2V5TWlucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gU1RJQ0tZREFUQVMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0aWNreSA9IFNUSUNLWURBVEFTW2tleV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lEYXRhID0gJChzdGlja3kubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3lEYXRhLm9mZnNldCgpLnRvcCA9PT0ga2V5TWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBzdGlja3lEYXRhLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxNb3ZlRnVuYyA6IGZ1bmN0aW9uICh0YXJnZXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLmNlaWwodGFyZ2V0Lm9mZnNldCgpLnRvcCksXHJcbiAgICAgICAgICAgICAgICAgICAgd2luVG9wID0gJCh3aW4pLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0aWNreUhlaWdodCA9IHRoaXMuc3RpY2t5QXJlYShzY3JvbGxUb3ApLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTW92ZVRvcCA9IHNjcm9sbFRvcCAtIHN0aWNreUhlaWdodCArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2IgPSAoY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge30pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsTW92ZVRvcCA9PT0gd2luVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IuYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdzY3JvbGxUb3AnIDogdG90YWxNb3ZlVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVmUGFyYW1zLnNjcm9sbER1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdlVG9wZ28gOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luKS5zY3JvbGxUb3AoKSA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA6IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGxMb2NrIDoge1xyXG4gICAgICAgICAgICAgICAgaW5pdCA6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWZQYXJhbXMuc2Nyb2xsTG9jaykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NrQ2xhc3MgPSBkZWZQYXJhbXMuc2Nyb2xsTG9ja0NsYXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrT3B0cyA9IGRlZlBhcmFtcy5zY3JvbGxMb2NrT3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja0VsZW1lbnRzID0gJChsb2NrT3B0cy5sb2NrRWxlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cy50b2dnbGVDbGFzcyhsb2NrQ2xhc3MsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVVElMLmlzRGV2aWNlICYmIFVUSUwuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NrT3B0cy5zY3JvbGxMb2NrZWQgfHwgKGxvY2tFbGVtZW50cy5kYXRhKCdsb2NrU2Nyb2xsJykgIT0gbnVsbCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tPcHRzLmFwcGxpZWRMb2NrID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdHlsZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVNjcm9sbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKGxvY2tPcHRzLmFwcGxpZWRMb2NrLCBsb2NrT3B0cy5sb2NrU3R5bGVzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnIDogLSBsb2NrT3B0cy5wcmV2U2Nyb2xsLnNjcm9sbExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCcgOiAtIGxvY2tPcHRzLnByZXZTY3JvbGwuc2Nyb2xsVG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cy5jc3MobG9ja09wdHMuYXBwbGllZExvY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja0VsZW1lbnRzLmRhdGEoJ2xvY2tTY3JvbGwnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnIDogbG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnIDogbG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxUb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja09wdHMuc2Nyb2xsTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVVElMLmlzRGV2aWNlICYmIFVUSUwuaXNJT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9ja09wdHMuc2Nyb2xsTG9ja2VkIHx8IChsb2NrRWxlbWVudHMuZGF0YSgnbG9ja1Njcm9sbCcpID09IG51bGwpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdHlsZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NrT3B0cy5hcHBsaWVkTG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NrT3B0cy5wcmV2U3R5bGVzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMuYXR0cignc3R5bGUnLCAkKCc8eD4nKS5jc3MobG9ja09wdHMucHJldlN0eWxlcykuYXR0cignc3R5bGUnKSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMuZGF0YSgnbG9ja1Njcm9sbCcsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh3aW4pLnNjcm9sbExlZnQobG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxMZWZ0KS5zY3JvbGxUb3AobG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxUb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja09wdHMuc2Nyb2xsTG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2F2ZVN0eWxlcyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVTdHJzID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlSGFzaCA9IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrT3B0cyA9IGRlZlBhcmFtcy5zY3JvbGxMb2NrT3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja0VsZW1lbnRzID0gJChsb2NrT3B0cy5sb2NrRWxlbWVudHMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUF0dHIgPSAgbG9ja0VsZW1lbnRzLmF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHlsZUF0dHIpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZVN0cnMgPSBzdHlsZUF0dHIuc3BsaXQoJzsnKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goc3R5bGVTdHJzLCBmdW5jdGlvbiBzdHlsZVByb3AgKHN0eWxlU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZVN0cmluZyA9IHN0eWxlU3Ryc1tzdHlsZVN0cmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3R5bGVTdHJpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gc3R5bGVTdHJpbmcuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA8IDIpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVIYXNoWyQudHJpbShrZXlWYWx1ZVswXSldID0gJC50cmltKGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChsb2NrT3B0cy5wcmV2U3R5bGVzLCBzdHlsZUhhc2gpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNhdmVTY3JvbGxzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NrT3B0cyA9IGRlZlBhcmFtcy5zY3JvbGxMb2NrT3B0cztcclxuICAgICAgICAgICAgICAgICAgICBsb2NrT3B0cy5wcmV2U2Nyb2xsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0IDogJCh3aW4pLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wIDogJCh3aW4pLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luLnNtZy5ldUNwLnBhZ2UuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKHdpbmRvdywgd2luZG93LmpRdWVyeSwgd2luZG93LmRvY3VtZW50KTsiLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSB3aW4uc21nLmV1Q3AuY29tbW9uIHx8IHt9O1xyXG5cclxuICAgIHZhciBVVElMID0gd2luLnNtZy5ldUNwLmNvbW1vbi51dGlsLFxyXG4gICAgICAgIHBsdWdpbk5hbWUgPSAnSW5wdXRUeHRzJztcclxuXHJcbiAgICB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWZQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA6ICcuanMtaW5wdGV4dC13cmFwJyxcclxuICAgICAgICAgICAgaGFzVGV4dENsYXNzIDogJ2hhcy1pbnB1dC10ZXh0JyxcclxuICAgICAgICAgICAgdHh0TGFiZWwgOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICBhY3RpdmVDbGFzcyA6ICdqcy1pbnAtYWN0aXZlJyxcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgOiAncy1oaWRlJyxcclxuICAgICAgICAgICAgdHh0SW5wdXQgOiAnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIGlucHV0W3R5cGU9c2VhcmNoXSwgdGV4dGFyZWEnLFxyXG4gICAgICAgICAgICBidG5EZWwgOiAnLnMtYnRuLWRlbGV0ZScsXHJcbiAgICAgICAgICAgIHVzZUNsb3NlRm9jdXMgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdExheW91dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldEVsZW1lbnRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmogPSAkKGRlZlBhcmFtcy5jb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dExhYmVsID0gdGhpcy5vYmouZmluZChkZWZQYXJhbXMudHh0TGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFRhZyA9IHRoaXMub2JqLmZpbmQoZGVmUGFyYW1zLnR4dElucHV0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdExheW91dCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5vYmoubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGFyZ2V0ID0gX3RoaXMub2JqLmVxKGluZGV4KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbnB1dExhYmVsID0gX3RhcmdldC5maW5kKGRlZlBhcmFtcy50eHRMYWJlbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5wdXRUYWcgPSBfdGFyZ2V0LmZpbmQoZGVmUGFyYW1zLnR4dElucHV0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YSA9IF9pbnB1dFRhZy52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnB1dERhdGEubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbnB1dExhYmVsLmFkZENsYXNzKGRlZlBhcmFtcy50b2dnbGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJpbmRFdmVudHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKGRvYykub24oJ2ZvY3VzaW4gZm9jdXNvdXQnLCBkZWZQYXJhbXMudHh0SW5wdXQsICQucHJveHkodGhpcy5vbkZvY3VzRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgJChkb2MpLm9uKCdrZXlkb3duIGNsaWNrJywgZGVmUGFyYW1zLmNvbnRhaW5lciArICcgJyArIGRlZlBhcmFtcy5idG5EZWwsICQucHJveHkodGhpcy5vbkRlbENsaWNrRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZvY3VzRnVuYyA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbCA9IHRhcmdldC52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChkZWZQYXJhbXMuY29udGFpbmVyKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbCA9IHRhcmdldFBhcmVudC5maW5kKGRlZlBhcmFtcy50eHRMYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09PSAnZm9jdXNpbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldFBhcmVudC5oYXNDbGFzcyhkZWZQYXJhbXMuYWN0aXZlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBhcmVudC5hZGRDbGFzcyhkZWZQYXJhbXMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQub24oJ2tleXVwJywgJC5wcm94eSh0aGlzLm9uS2V5dXBGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0VmFsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbC5hZGRDbGFzcyhkZWZQYXJhbXMudG9nZ2xlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcigncGFnZUZvY3VzQWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ2ZvY3Vzb3V0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQYXJlbnQuaGFzQ2xhc3MoZGVmUGFyYW1zLmFjdGl2ZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQucmVtb3ZlQ2xhc3MoZGVmUGFyYW1zLmFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Lm9mZigna2V5dXAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRWYWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsLnJlbW92ZUNsYXNzKGRlZlBhcmFtcy50b2dnbGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdwYWdlRm9jdXNEZWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbktleXVwRnVuYyA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbCA9IHRhcmdldC52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQgPSB0YXJnZXQuY2xvc2VzdChkZWZQYXJhbXMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRWYWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRQYXJlbnQuaGFzQ2xhc3MoZGVmUGFyYW1zLmhhc1RleHRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFyZW50LmFkZENsYXNzKGRlZlBhcmFtcy5oYXNUZXh0Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldFBhcmVudC5oYXNDbGFzcyhkZWZQYXJhbXMuaGFzVGV4dENsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYXJlbnQucmVtb3ZlQ2xhc3MoZGVmUGFyYW1zLmhhc1RleHRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRlbENsaWNrRnVuYyA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZQYXJhbXMudXNlQ2xvc2VGb2N1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFyZW50ID0gdGFyZ2V0LmNsb3Nlc3QoZGVmUGFyYW1zLmNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsID0gdGFyZ2V0UGFyZW50LmZpbmQoZGVmUGFyYW1zLnR4dExhYmVsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5wdXQgPSB0YXJnZXRQYXJlbnQuZmluZChkZWZQYXJhbXMudHh0SW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFyZW50LnJlbW92ZUNsYXNzKGRlZlBhcmFtcy5oYXNUZXh0Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsLnJlbW92ZUNsYXNzKGRlZlBhcmFtcy50b2dnbGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZlBhcmFtcy51c2VDbG9zZUZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZlBhcmFtcy51c2VDbG9zZUZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXS5pbml0KCk7XHJcbiAgICB9KTtcclxufSkod2luZG93LCB3aW5kb3cualF1ZXJ5LCB3aW5kb3cuZG9jdW1lbnQpO1xyXG4iLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSB3aW4uc21nLmV1Q3AuY29tbW9uIHx8IHt9O1xyXG5cclxuICAgIHZhciBVVElMID0gd2luLnNtZy5ldUNwLmNvbW1vbi51dGlsLFxyXG4gICAgICAgIHBsdWdpbk5hbWUgPSAnSW5wdXRDaGtib3hzJztcclxuXHJcbiAgICB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWZQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA6ICcuanMtY2hrYm94LXdyYXAnLFxyXG4gICAgICAgICAgICBmb3JtRWxlbWVudHMgOiAnaW5wdXQ6Y2hlY2tib3gnLFxyXG4gICAgICAgICAgICBmb3JtTGFiZWwgOiAnLmNvbmZpZ3VyYXRvci1jaGVja2JveF9fbGFiZWwnLFxyXG4gICAgICAgICAgICBmb3JtRGVzaWduIDogJy5zLWJveCcsXHJcbiAgICAgICAgICAgIGRpc2FibGVDbGFzcyA6ICdpcy1kaXNhYmxlZCcsXHJcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzIDogJ2lzLWNoZWNrZWQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0RWxlbWVudHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iaiA9ICQoZGVmUGFyYW1zLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybSA9IHRoaXMub2JqLmZpbmQoZGVmUGFyYW1zLmZvcm1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXRMYXlvdXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybS5maWx0ZXIoJzpkaXNhYmxlZCcpLmNsb3Nlc3QoZGVmUGFyYW1zLmNvbnRhaW5lcikuYWRkQ2xhc3MoZGVmUGFyYW1zLmRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybS5maWx0ZXIoJzpjaGVja2VkJykuY2xvc2VzdChkZWZQYXJhbXMuY29udGFpbmVyKS5hZGRDbGFzcyhkZWZQYXJhbXMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiaW5kRXZlbnRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJChkb2MpLm9uKCdjaGFuZ2UnLCBkZWZQYXJhbXMuZm9ybUVsZW1lbnRzLCAkLnByb3h5KHRoaXMuY2hhbmdlRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFVVElMLmlzU3VwcG9ydFRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jKS5vbignY2xpY2snLCBkZWZQYXJhbXMuZm9ybUxhYmVsICsgJyBpbWcnLCAkLnByb3h5KHRoaXMuY2xpY2tGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoYW5nZUZ1bmMgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KGRlZlBhcmFtcy5jb250YWluZXIpLnRvZ2dsZUNsYXNzKGRlZlBhcmFtcy5hY3RpdmVDbGFzcywgdGFyZ2V0LnByb3AoJ2NoZWNrZWQnKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrRnVuYyA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbnRhaW5lciA9IHRhcmdldC5jbG9zZXN0KGRlZlBhcmFtcy5jb250YWluZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEZvcm1FbGVtZW50cyA9IHRhcmdldENvbnRhaW5lci5maW5kKGRlZlBhcmFtcy5mb3JtRWxlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybUVsZW1lbnRzLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRDb250YWluZXIudG9nZ2xlQ2xhc3MoZGVmUGFyYW1zLmFjdGl2ZUNsYXNzLCB0YXJnZXRGb3JtRWxlbWVudHMucHJvcCgnY2hlY2tlZCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSh3aW5kb3csIHdpbmRvdy5qUXVlcnksIHdpbmRvdy5kb2N1bWVudCk7XHJcbiIsIihmdW5jdGlvbiAod2luLCAkLCBkb2MpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHdpbi5zbWcgPSB3aW4uc21nIHx8IHt9O1xyXG4gICAgd2luLnNtZy5ldUNwID0gd2luLnNtZy5ldUNwIHx8IHt9O1xyXG4gICAgd2luLnNtZy5ldUNwLmNvbW1vbiA9IHdpbi5zbWcuZXVDcC5jb21tb24gfHwge307XHJcblxyXG4gICAgdmFyIFVUSUwgPSB3aW4uc21nLmV1Q3AuY29tbW9uLnV0aWwsXHJcbiAgICAgICAgcGx1Z2luTmFtZSA9ICdJbnB1dFJhZGlvcyc7XHJcblxyXG4gICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGVmUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBjb250YWluZXIgOiAnLmpzLXJhZGlvLXdyYXAnLFxyXG4gICAgICAgICAgICBmb3JtRWxlbWVudHMgOiAnaW5wdXQ6cmFkaW8nLFxyXG4gICAgICAgICAgICBmb3JtTGFiZWwgOiAnLmNvbmZpZ3VyYXRvci1yYWRpb19fbGFiZWwnLFxyXG4gICAgICAgICAgICBmb3JtRGVzaWduIDogJy5zLWJveCcsXHJcbiAgICAgICAgICAgIGRpc2FibGVDbGFzcyA6ICdpcy1kaXNhYmxlZCcsXHJcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzIDogJ2lzLWNoZWNrZWQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0RWxlbWVudHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iaiA9ICQoZGVmUGFyYW1zLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybSA9IHRoaXMub2JqLmZpbmQoZGVmUGFyYW1zLmZvcm1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXRMYXlvdXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybS5maWx0ZXIoJzpkaXNhYmxlZCcpLmNsb3Nlc3QoZGVmUGFyYW1zLmNvbnRhaW5lcikuYWRkQ2xhc3MoZGVmUGFyYW1zLmRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Rm9ybS5maWx0ZXIoJzpjaGVja2VkJykuY2xvc2VzdChkZWZQYXJhbXMuY29udGFpbmVyKS5hZGRDbGFzcyhkZWZQYXJhbXMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiaW5kRXZlbnRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJChkb2MpLm9uKCdjaGFuZ2UnLCBkZWZQYXJhbXMuZm9ybUVsZW1lbnRzLCAkLnByb3h5KHRoaXMuY2hhbmdlRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFVVElMLmlzU3VwcG9ydFRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jKS5vbignY2xpY2snLCBkZWZQYXJhbXMuZm9ybUxhYmVsICsgJyBpbWcnLCAkLnByb3h5KHRoaXMuY2xpY2tGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoYW5nZUZ1bmMgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KGRlZlBhcmFtcy5jb250YWluZXIpLnRvZ2dsZUNsYXNzKGRlZlBhcmFtcy5hY3RpdmVDbGFzcywgdGFyZ2V0LnByb3AoJ2NoZWNrZWQnKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ2hhbmdlRnVuYyh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b3RhbENoYW5nZUZ1bmMgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0TmFtZSA9IHRhcmdldC5hdHRyKCduYW1lJyk7XHJcbiAgICAgICAgICAgICAgICAkKGRvYykuZmluZChkZWZQYXJhbXMuZm9ybUVsZW1lbnRzKS5maWx0ZXIoJ1tuYW1lPScgKyB0YXJnZXROYW1lICsgJ10nKS5ub3QodGFyZ2V0KS5jbG9zZXN0KGRlZlBhcmFtcy5jb250YWluZXIpLnJlbW92ZUNsYXNzKGRlZlBhcmFtcy5hY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrRnVuYyA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbnRhaW5lciA9IHRhcmdldC5jbG9zZXN0KGRlZlBhcmFtcy5jb250YWluZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEZvcm1FbGVtZW50cyA9IHRhcmdldENvbnRhaW5lci5maW5kKGRlZlBhcmFtcy5mb3JtRWxlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Rm9ybUVsZW1lbnRzLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRDb250YWluZXIudG9nZ2xlQ2xhc3MoZGVmUGFyYW1zLmFjdGl2ZUNsYXNzLCB0YXJnZXRGb3JtRWxlbWVudHMucHJvcCgnY2hlY2tlZCcpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxDaGFuZ2VGdW5jKHRhcmdldEZvcm1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXS5pbml0KCk7XHJcbiAgICB9KTtcclxufSkod2luZG93LCB3aW5kb3cualF1ZXJ5LCB3aW5kb3cuZG9jdW1lbnQpO1xyXG4iLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSB3aW4uc21nLmV1Q3AuY29tbW9uIHx8IHt9O1xyXG5cclxuICAgIHZhciBVVElMID0gd2luLnNtZy5ldUNwLmNvbW1vbi51dGlsLFxyXG4gICAgICAgIHBsdWdpbk5hbWUgPSAnU2VsZWN0TGlicyc7XHJcblxyXG4gICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgYXJncykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdKGNvbnRhaW5lciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkZWZQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA6IGNvbnRhaW5lciB8fCAnLmpzLXNlbGVjdC13cmFwJyxcclxuICAgICAgICAgICAgc2VsZWN0QnRuIDogJy5jb25maWd1cmF0b3Itc2VsZWN0X19wbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgIHNlbGVjdFB1c2ggOiAnc3BhbjplcSgwKScsXHJcbiAgICAgICAgICAgIHNlbGVjdEJsaW5kVGV4dCA6ICcuYmxpbmQnLFxyXG4gICAgICAgICAgICBzZWxlY3RXcmFwIDogJy5jb25maWd1cmF0b3Itc2VsZWN0X19vcHRpb25zJyxcclxuICAgICAgICAgICAgc2VsZWN0UGFyZW50IDogJz51bCcsXHJcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzIDogJ2lzLW9wZW5lZCcsXHJcbiAgICAgICAgICAgIHNlbGVjdENsYXNzIDogJ2lzLXNlbGVjdGVkJyxcclxuICAgICAgICAgICAgYWNjZXNzRGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIEVYUEFOREVEIDogJ2FyaWEtZXhwYW5kZWQnLFxyXG4gICAgICAgICAgICAgICAgSElEREVOIDogJ2FyaWEtaGlkZGVuJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlMkNsYXNzIDogJ3NlbGVjdC10eXBlMicsXHJcbiAgICAgICAgICAgIGpzQWxpZ25DbGFzcyA6ICdqcy1hbGlnbi1wbGFjZWhvbGRlcicsXHJcbiAgICAgICAgICAgIHNlbGVjdE1vQnRuIDogJy5zLXNlbGVjdC10ZXh0JyxcclxuICAgICAgICAgICAgc2VsZWN0TW8gOiAnLnMtc2VsZWN0LW1vJyxcclxuICAgICAgICAgICAgc2VsZWN0TW9QYXJlbnQgOiAnLnNob3Atc2VsZWN0X19vcHRpb25zLW1vJyxcclxuICAgICAgICAgICAgc2VsZWN0TW9BY3RpdmVDbGFzcyA6ICdzLXNlbGVjdC1mb2N1cycsXHJcbiAgICAgICAgICAgIHByb3AgOiB7fSxcclxuICAgICAgICAgICAgdmlld1R5cGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2xpZGVTcGVlZCA6IDIwMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vcHRzID0gVVRJTC5kZWYoZGVmUGFyYW1zLCAoYXJncyB8fCB7fSkpO1xyXG4gICAgICAgIGlmICghKHRoaXMub2JqID0gJCh0aGlzLm9wdHMuY29udGFpbmVyKSkubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9O1xyXG4gICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdLnByb3RvdHlwZSA9IHtcclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE9wdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0RWxlbWVudHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QnRuID0gdGhpcy5vYmouZmluZCh0aGlzLm9wdHMuc2VsZWN0QnRuKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RQdXNoID0gdGhpcy5zZWxlY3RCdG4uZmluZCh0aGlzLm9wdHMuc2VsZWN0UHVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QmxpbmRUZXh0ID0gdGhpcy5zZWxlY3RCdG4uZmluZCh0aGlzLm9wdHMuc2VsZWN0QmxpbmRUZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RXcmFwID0gdGhpcy5vYmouZmluZCh0aGlzLm9wdHMuc2VsZWN0V3JhcCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGFyZW50ID0gdGhpcy5zZWxlY3RXcmFwLmZpbmQodGhpcy5vcHRzLnNlbGVjdFBhcmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2hpbGQgPSB0aGlzLnNlbGVjdFBhcmVudC5jaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vQnRuID0gdGhpcy5vYmouZmluZCh0aGlzLm9wdHMuc2VsZWN0TW9CdG4pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vUHVzaCA9IHRoaXMuc2VsZWN0TW9CdG4uZmluZCh0aGlzLm9wdHMuc2VsZWN0UHVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW8gPSB0aGlzLm9iai5maW5kKHRoaXMub3B0cy5zZWxlY3RNbyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9QYXJlbnQgPSB0aGlzLnNlbGVjdE1vLmNsb3Nlc3QodGhpcy5vcHRzLnNlbGVjdE1vUGFyZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRPcHRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsVGV4dCA9IHRoaXMub2JqLmRhdGEoJ2dsb2JhbC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsVGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIENvbGxhcHNlIDogKGdsb2JhbFRleHQgJiYgZ2xvYmFsVGV4dC5Db2xsYXBzZSkgPyAkLnRyaW0oZ2xvYmFsVGV4dC5Db2xsYXBzZSkgOiAnJyxcclxuICAgICAgICAgICAgICAgIEV4cGFuZCA6IChnbG9iYWxUZXh0ICYmIGdsb2JhbFRleHQuRXhwYW5kKSA/ICQudHJpbShnbG9iYWxUZXh0LkV4cGFuZCkgOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdExheW91dCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5vYmouYXR0cignZGF0YS1zZWxlY3QtaW5pdCcsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vYmouaGFzQ2xhc3ModGhpcy5vcHRzLnR5cGUyQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFB1c2gud3JhcCgnPHNwYW4gY2xhc3M9XCInICsgdGhpcy5vcHRzLmpzQWxpZ25DbGFzcyArICdcIiAvPicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0V3JhcC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5hY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzYmlsaXR5RnVuYyhmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXZlbnRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEJ0bi5vbignY2xpY2snLCAkLnByb3h5KHRoaXMub25DbGlja0Z1bmMsIHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYXJlbnQub24oJ2NsaWNrJywgJz5saT5hJywgJC5wcm94eSh0aGlzLm9uQ2hhbmdlVGV4dCwgdGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLm9iai5vbignb25TZWxlY3QnLCAkLnByb3h5KHRoaXMub25TZWxlY3RGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW8ub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5vbkNoYW5nZUZ1bmMsIHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNby5vbignZm9jdXNpbiBmb2N1c291dCcsICQucHJveHkodGhpcy5vbkZvY3VzRnVuYywgdGhpcykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGlja0Z1bmMgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudmlld1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V3JhcC5zdG9wKCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmoucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLmFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqLmF0dHIoJ3RhYkluZGV4JywgJycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3NiaWxpdHlGdW5jKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVFdmVudHMoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RXcmFwLnN0b3AoKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iai5hZGRDbGFzcyh0aGlzLm9wdHMuYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmouYXR0cigndGFiSW5kZXgnLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzYmlsaXR5RnVuYyh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVFdmVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcHRzLnZpZXdUeXBlID0gIXRoaXMub3B0cy52aWV3VHlwZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRPdXRzaWRlRXZlbnRzIDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgKHR5cGUpID8gdGhpcy5vYmoub24oJ2NsaWNrb3V0c2lkZSBmb2N1c291dHNpZGUnLCAkLnByb3h5KHRoaXMub3V0c2lkZUZ1bmMsIHRoaXMpKSA6IHRoaXMub2JqLm9mZignY2xpY2tvdXRzaWRlIGZvY3Vzb3V0c2lkZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0c2lkZUZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QnRuLnRyaWdnZXJIYW5kbGVyKCdjbGljaycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25TZWxlY3RGdW5jIDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREZXNrdG9wU2VsZWN0KGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vYmlsZVNlbGVjdChkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlRnVuYyA6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3RlZCA9IHRhcmdldC5maW5kKCdvcHRpb24nKS5maWx0ZXIoJzpzZWxlY3RlZCcpLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB0YXJnZXRTZWxlY3RlZC5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0VGV4dCA9ICQudHJpbSh0YXJnZXRTZWxlY3RlZC50ZXh0KCkpLFxyXG4gICAgICAgICAgICAgICAgcHJvcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IHRhcmdldFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJbmRleCA6IHRhcmdldEluZGV4XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNldERlc2t0b3BTZWxlY3QocHJvcCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9iaWxlU2VsZWN0KHByb3ApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Gb2N1c0Z1bmMgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50eXBlID09PSAnZm9jdXNpbicpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE1vUGFyZW50Lmhhc0NsYXNzKHRoaXMub3B0cy5zZWxlY3RNb0FjdGl2ZUNsYXNzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNb1BhcmVudC5hZGRDbGFzcyh0aGlzLm9wdHMuc2VsZWN0TW9BY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnZm9jdXNvdXQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0TW9QYXJlbnQuaGFzQ2xhc3ModGhpcy5vcHRzLnNlbGVjdE1vQWN0aXZlQ2xhc3MpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdE1vUGFyZW50LnJlbW92ZUNsYXNzKHRoaXMub3B0cy5zZWxlY3RNb0FjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0RGVza3RvcFNlbGVjdCA6IGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RDbGFzcyA9IHRoaXMub3B0cy5zZWxlY3RDbGFzcztcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDaGlsZC5lcShwcm9wLnZhbHVlSW5kZXgpLmFkZENsYXNzKHNlbGVjdENsYXNzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKHNlbGVjdENsYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RQdXNoLnRleHQocHJvcC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9QdXNoLnRleHQocHJvcC52YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRNb2JpbGVTZWxlY3QgOiBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vLmZpbmQoJ29wdGlvbicpLmVxKHByb3AudmFsdWVJbmRleCkuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKS5zaWJsaW5ncygpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UHVzaC50ZXh0KHByb3AudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vUHVzaC50ZXh0KHByb3AudmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2VUZXh0IDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0VGV4dCA9ICQudHJpbSh0YXJnZXQudGV4dCgpKSxcclxuICAgICAgICAgICAgICAgIHRhcmdldFBhcmVudCA9IHRhcmdldC5wYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLnByb3BbJ3ZhbHVlJ10gPSB0YXJnZXRUZXh0O1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsndmFsdWVJbmRleCddID0gdGFyZ2V0UGFyZW50LmluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMub2JqLnRyaWdnZXIoJ29uU2VsZWN0JywgdGhpcy5vcHRzLnByb3ApO1xyXG4gICAgICAgICAgICB0aGlzLm91dHNpZGVGdW5jKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY2Nlc3NiaWxpdHlGdW5jIDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGFjY2Vzc0RhdGEgPSB0aGlzLm9wdHMuYWNjZXNzRGF0YSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbFRleHQgPSB0aGlzLmdsb2JhbFRleHQ7XHJcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEJ0bi5hdHRyKGFjY2Vzc0RhdGEuRVhQQU5ERUQsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFdyYXAuYXR0cihhY2Nlc3NEYXRhLkhJRERFTiwgJ2ZhbHNlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEJsaW5kVGV4dC50ZXh0KGdsb2JhbFRleHQuQ29sbGFwc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RCdG4uYXR0cihhY2Nlc3NEYXRhLkVYUEFOREVELCAnZmFsc2UnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V3JhcC5hdHRyKGFjY2Vzc0RhdGEuSElEREVOLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RCbGluZFRleHQudGV4dChnbG9iYWxUZXh0LkV4cGFuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdKF90aGlzLmVxKGluZGV4KSwgYXJncyk7XHJcbiAgICAgICAgICAgIH0pKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdC13cmFwJykuU2VsZWN0TGlicygpO1xyXG4gICAgfSk7XHJcbn0pKHdpbmRvdywgd2luZG93LmpRdWVyeSwgd2luZG93LmRvY3VtZW50KTsiLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSB3aW4uc21nLmV1Q3AuY29tbW9uIHx8IHt9O1xyXG5cclxuICAgIHZhciBVVElMID0gd2luLnNtZy5ldUNwLmNvbW1vbi51dGlsLFxyXG4gICAgICAgIHBsdWdpbk5hbWUgPSAnSGVpZ2h0TWF0Y2gnO1xyXG5cclxuICAgIHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2Ygd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXShjb250YWluZXIsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGVmUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBjb250YWluZXIgOiBjb250YWluZXIgfHwgJy5oZWlnaHRtYXRjaC13cmFwJyxcclxuICAgICAgICAgICAgY2hpbGRFbGVtZW50IDogJz5saScsXHJcbiAgICAgICAgICAgIG5vdENvbXBhcmVFbGVtZW50IDogbnVsbCxcclxuICAgICAgICAgICAgcHVzaEVsZW1lbnQgOiBudWxsLFxyXG4gICAgICAgICAgICBtYXRjaEVsZW1lbnQgOiAnLmhlaWdodG1hdGNoLWNvbnQnLFxyXG4gICAgICAgICAgICBjb2x1bW4gOiAzLFxyXG4gICAgICAgICAgICBwdXNoT2JqcyA6IG51bGwsXHJcbiAgICAgICAgICAgIHVzZURlc3Ryb3lIZWlnaHQgOiB0cnVlLFxyXG4gICAgICAgICAgICBkZXN0cm95VHlwZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXNpemVTdGFydCA6IG51bGwsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzIDoge30sXHJcbiAgICAgICAgICAgIGN1c3RvbUV2ZW50IDogJy4nICsgcGx1Z2luTmFtZSArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgIG1hdGNoQmVmb3JlIDogbnVsbCxcclxuICAgICAgICAgICAgbWF0Y2hBZnRlciA6IG51bGwsXHJcbiAgICAgICAgICAgIGxvYWRBZnRlciA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub3B0cyA9IFVUSUwuZGVmKGRlZlBhcmFtcywgKGFyZ3MgfHwge30pKTtcclxuICAgICAgICBpZiAoISh0aGlzLm9iaiA9ICQodGhpcy5vcHRzLmNvbnRhaW5lcikpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfTtcclxuICAgIHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXS5wcm90b3R5cGUgPSBVVElMLmRlZih7XHJcbiAgICAgICAgaW5pdCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE9wdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb3dzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRIZWlnaHRDb250cm9sKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ2xvYWRBZnRlcicpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHModHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRFbGVtZW50cyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5vYmpDaGlsZCA9IHRoaXMub2JqLmZpbmQodGhpcy5vcHRzLmNoaWxkRWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5wdXNoT2JqcyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucHVzaEVsZW1lbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnB1c2hPYmpzID0gdGhpcy5vYmpDaGlsZC5ub3QodGhpcy5vcHRzLm5vdENvbXBhcmVFbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wdXNoT2JqcyA9IHRoaXMub2JqQ2hpbGQubm90KHRoaXMub3B0cy5ub3RDb21wYXJlRWxlbWVudCkuZmluZCh0aGlzLm9wdHMucHVzaEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRPcHRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgd2luV2lkdGggPSBVVElMLndpblNpemUoKS53O1xyXG4gICAgICAgICAgICAvLyBicmVha3BvaW50c1xyXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSB0aGlzLm9wdHMuYnJlYWtwb2ludHMsXHJcbiAgICAgICAgICAgICAgICBicmVha0tleU1pbnMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGJyZWFrS2V5TWluO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYnJlYWtwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPj0gd2luV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha0tleU1pbnMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrS2V5TWluID0gTWF0aC5taW4uYXBwbHkobnVsbCwgYnJlYWtLZXlNaW5zKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtLZXlNaW4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnJlYWtPcHRzID0gVVRJTC5kZWYoe30sIHRoaXMub3B0cyk7XHJcbiAgICAgICAgICAgIGlmIChicmVha0tleU1pbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyZWFrT3B0cyA9IFVUSUwuZGVmKHRoaXMuYnJlYWtPcHRzLCBicmVha3BvaW50c1ticmVha0tleU1pbl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElFOFxyXG4gICAgICAgICAgICBpZiAoIVVUSUwuaXNTdXBwb3J0VHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyZWFrT3B0cy5jb2x1bW4gPSB0aGlzLm9wdHMuY29sdW1uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuZ2VFdmVudHMgOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lcyA9IGV2ZW50LnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudE5hbWVzKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMucHVzaChldmVudE5hbWVzW2tleV0gKyB0aGlzLm9wdHMuY3VzdG9tRXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudHMuam9pbignICcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEV2ZW50cyA6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbikub24odGhpcy5jaGFuZ2VFdmVudHMoJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBsb2FkJyksICQucHJveHkodGhpcy5yZXNpemVGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbikub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UgbG9hZCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzaXplRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5XaWR0aCA9IFVUSUwud2luU2l6ZSgpLnc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVzaXplU3RhcnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnJlc2l6ZVN0YXJ0ID0gdGhpcy53aW5XaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ21hdGNoQmVmb3JlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUFuaW1hdGVGdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luLmNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZUVuZFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUVuZFRpbWUgPSB3aW4uc2V0VGltZW91dCgkLnByb3h5KHRoaXMucmVzaXplRW5kRnVuYywgdGhpcyksIDUwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2l6ZUVuZEZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5yZXNpemVTdGFydCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvd3MoKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZEhlaWdodENvbnRyb2woKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnbWF0Y2hBZnRlcicpO1xyXG4gICAgICAgICAgICBVVElMLmNhbmNlbEFGcmFtZS5jYWxsKHdpbiwgdGhpcy5yZXNpemVSZXF1ZXN0RnJhbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzaXplQW5pbWF0ZUZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFJvd3MoKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZEhlaWdodENvbnRyb2woKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVSZXF1ZXN0RnJhbWUgPSBVVElMLnJlcXVlc3RBRnJhbWUuY2FsbCh3aW4sICQucHJveHkodGhpcy5yZXNpemVBbmltYXRlRnVuYywgdGhpcykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Um93cyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3dOdW0gPSBNYXRoLmNlaWwodGhpcy5vYmpDaGlsZC5sZW5ndGggLyB0aGlzLmJyZWFrT3B0cy5jb2x1bW4pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnVpbGRIZWlnaHRDb250cm9sIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoVVRJTC5pc1N1cHBvcnRUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJyZWFrT3B0cy5jb2x1bW4gPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucHVzaE9ianMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLnB1c2hPYmpzLmNzcygnaGVpZ2h0JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZEhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidWlsZEhlaWdodCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHRBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93TnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXJyYXlbaV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5vYmpDaGlsZC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFycmF5SW5kZXggPSBwYXJzZUludCgoaSAvIHRoaXMuYnJlYWtPcHRzLmNvbHVtbiksIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaEVsZW1lbnQgPSB0aGlzLm9iakNoaWxkLmVxKGkpLm5vdCh0aGlzLm9wdHMubm90Q29tcGFyZUVsZW1lbnQpLmZpbmQodGhpcy5vcHRzLm1hdGNoRWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uID0gbWF0Y2hFbGVtZW50LmlzKCc6dmlzaWJsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IChjb25kaXRpb24pID8gbWF0Y2hFbGVtZW50Lm91dGVySGVpZ2h0KCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHRBcnJheVthcnJheUluZGV4XS5wdXNoKG1heEhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodEFycmF5W2ldID0gTWF0aC5tYXguYXBwbHkobnVsbCwgdGhpcy5oZWlnaHRBcnJheVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldExheW91dCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IHRoaXMub2JqQ2hpbGQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJheUluZGV4ID0gcGFyc2VJbnQoKGkgLyB0aGlzLmJyZWFrT3B0cy5jb2x1bW4pLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnB1c2hFbGVtZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iakNoaWxkLmVxKGkpLm5vdCh0aGlzLm9wdHMubm90Q29tcGFyZUVsZW1lbnQpLmhlaWdodCh0aGlzLmhlaWdodEFycmF5W2FycmF5SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmpDaGlsZC5lcShpKS5ub3QodGhpcy5vcHRzLm5vdENvbXBhcmVFbGVtZW50KS5maW5kKHRoaXMub3B0cy5wdXNoRWxlbWVudCkuaGVpZ2h0KHRoaXMuaGVpZ2h0QXJyYXlbYXJyYXlJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnVzZURlc3Ryb3lIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucHVzaE9ianMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHVzaE9ianMuY3NzKCdoZWlnaHQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcHRzLmRlc3Ryb3lUeXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlSW5pdCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldE9wdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRSb3dzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRIZWlnaHRDb250cm9sKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplRnVuYygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmRlc3Ryb3lUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZGVzdHJveVR5cGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0Q2FsbGJhY2sgOiBmdW5jdGlvbiAoaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFja09iaiA9IHRoaXMub3B0c1tpbmddO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoaW5nKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrT2JqID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgY2FsbGJhY2tPYmooKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBVVElMLmVtaXR0ZXIpO1xyXG4gICAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gdGhpcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdKF90aGlzLmVxKGluZGV4KSwgYXJncyk7XHJcbiAgICAgICAgICAgIH0pKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKHdpbmRvdywgd2luZG93LmpRdWVyeSwgd2luZG93LmRvY3VtZW50KTsiLCIoZnVuY3Rpb24gKHdpbiwgJCwgZG9jKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB3aW4uc21nID0gd2luLnNtZyB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcCA9IHdpbi5zbWcuZXVDcCB8fCB7fTtcclxuICAgIHdpbi5zbWcuZXVDcC5jb21tb24gPSB3aW4uc21nLmV1Q3AuY29tbW9uIHx8IHt9O1xyXG5cclxuICAgIHZhciBVVElMID0gd2luLnNtZy5ldUNwLmNvbW1vbi51dGlsLFxyXG4gICAgICAgIEJSRUFLUE9JTlRTID0gd2luLnNtZy5ldUNwLmNvbW1vbi5icmVha3BvaW50cyxcclxuICAgICAgICBwbHVnaW5OYW1lID0gJ0xheWVyUG9wdXBMaWJzJztcclxuXHJcbiAgICB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoY29udGFpbmVyLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0oY29udGFpbmVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlZlBhcmFtcyA9IHtcclxuICAgICAgICAgICAgZWZmZWN0IDogJ2RlZmF1bHQnLCAvLyBDb3VsZCBiZSAnZGVmYXVsdCcsICdmYWRlJywgJ3NsaWRlJywgJ2ZsaXAnXHJcbiAgICAgICAgICAgIGxheWVyV3JhcEVsZW1lbnRzIDogY29udGFpbmVyLFxyXG4gICAgICAgICAgICBsYXllckVsZW1lbnRzIDogJy5oaXZlLWxheWVyJyxcclxuICAgICAgICAgICAgb3BlbmVyRWxlbWVudHMgOiAnLmhpdmUtbGF5ZXItb3BlbmVyJyxcclxuICAgICAgICAgICAgb3BlbmVyQXN5bmNDbGFzcyA6ICdpcy1hc3luYycsXHJcbiAgICAgICAgICAgIGNsb3NlckVsZW1lbnRzIDogJy5oaXZlLWxheWVyLWNsb3NlcicsXHJcbiAgICAgICAgICAgIGRpbW1lZEVsZW1lbnRzIDogJy5oaXZlLWxheWVyLWRpbW1lZCcsXHJcbiAgICAgICAgICAgIGZvY3VzT3V0T2JqIDoge1xyXG4gICAgICAgICAgICAgICAgQ0xBU1MgOiAnaGl2ZS1sYXllci1mb2N1c291dCcsXHJcbiAgICAgICAgICAgICAgICBDU1MgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJmbG93JyA6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbicgOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd6LWluZGV4JyA6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCcgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnIDogMSxcclxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJyA6ICcxcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCcgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN1c3RvbUV2ZW50IDogJy4nICsgcGx1Z2luTmFtZSArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgIC8vIHNjcm9sbExvY2tUeXBlIDogKFVUSUwuaXNEZXZpY2UpID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY3JvbGxMb2NrVHlwZSA6IHRydWUsXHJcbiAgICAgICAgICAgIHNjcm9sbExvY2tDbGFzcyA6ICdoaXZlLWxheWVyLXNjcm9sbC1sb2NrJyxcclxuICAgICAgICAgICAgc2Nyb2xsTG9ja09wdHMgOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxMb2NrZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cyA6ICdodG1sJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpZWRMb2NrIDoge30sXHJcbiAgICAgICAgICAgICAgICBwcmV2U3R5bGVzIDoge30sXHJcbiAgICAgICAgICAgICAgICBwcmV2U2Nyb2xsIDoge30sXHJcbiAgICAgICAgICAgICAgICBsb2NrU3R5bGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdy15JyA6ICdzY3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbicgOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCcgOiAnMTAwJSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3BlbmVyVGFyZ2V0IDogbnVsbCxcclxuICAgICAgICAgICAgdXNlT3V0c2lkZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICB1c2VFc2NhcGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlQ2xvc2VGb2N1cyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBiZ09wYWNpdHkgOiAuMyxcclxuICAgICAgICAgICAgYmdDb2xvciA6ICcjMDAwJyxcclxuICAgICAgICAgICAgc2xpZGUgOiB7XHJcbiAgICAgICAgICAgICAgICByYW5nZSA6IDIwMCxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA6ICdyaWdodFRvTGVmdCcgLy8gQ291bGQgYmUgJ3JpZ2h0VG9MZWZ0JywgJ2xlZnRUb1JpZ2h0JywgJ3RvcFRvQm90dG9tJywgJ2JvdHRvbVRvVG9wJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmbGlwIDoge1xyXG4gICAgICAgICAgICAgICAgQ0xBU1MgOiAnaGl2ZS1sYXllci1mbGlwJyxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA6ICdob3Jpem9udGFsJywgLy8gQ291bGQgYmUgJ2hvcml6b250YWwnLCAndmVydGljYWwnXHJcbiAgICAgICAgICAgICAgICByb3RhdGVTdGFydCA6IDkwLFxyXG4gICAgICAgICAgICAgICAgcm90YXRlRW5kIDogMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjdXN0b21Ub2dnbGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgZGltbWVkRHVyYXRpb24gOiAyNTAsXHJcbiAgICAgICAgICAgIGZwcyA6IDEyMCxcclxuICAgICAgICAgICAgZWFzaW5nIDogJ3N3aW5nJyxcclxuICAgICAgICAgICAgZHVyYXRpb24gOiAyNTAsXHJcbiAgICAgICAgICAgIGxheWVyTW92ZSA6IG51bGwsXHJcbiAgICAgICAgICAgIGxheWVyT3BlbkJlZm9yZSA6IG51bGwsXHJcbiAgICAgICAgICAgIGxheWVyT3BlbkFmdGVyIDogbnVsbCxcclxuICAgICAgICAgICAgbGF5ZXJDbG9zZUJlZm9yZSA6IG51bGwsXHJcbiAgICAgICAgICAgIGxheWVyQ2xvc2VBZnRlciA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghKHRoaXMubGF5ZXJXcmFwID0gZGVmUGFyYW1zLmxheWVyV3JhcEVsZW1lbnRzKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICB0aGlzLm9wdHMgPSBVVElMLmRlZihkZWZQYXJhbXMsIHRoaXMubGF5ZXJXcmFwLmRhdGEoJ2hpdmVsYXllci1vcHRzJykgfHwgYXJncyB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9O1xyXG4gICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdLnByb3RvdHlwZSA9IFVUSUwuZGVmKHtcclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRPcHRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TGF5b3V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyh0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRPcHRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyV3JhcEluc3RhbmNlID0gJyMnICsgdGhpcy5sYXllcldyYXAuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuaXNTdXBwb3J0VHJhbnNpdGlvbiAmJiB0aGlzLm9wdHMuZWZmZWN0ID09PSAnZmxpcCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5lZmZlY3QgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEVsZW1lbnRzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpbW1lZE9iaiA9IHRoaXMubGF5ZXJXcmFwLmZpbmQodGhpcy5vcHRzLmRpbW1lZEVsZW1lbnRzKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllck9iaiA9IHRoaXMubGF5ZXJXcmFwLmZpbmQodGhpcy5vcHRzLmxheWVyRWxlbWVudHMpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3Nlck9iaiA9IHRoaXMubGF5ZXJXcmFwLmZpbmQodGhpcy5vcHRzLmNsb3NlckVsZW1lbnRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRMYXlvdXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBmb2N1c091dENsYXNzID0gdGhpcy5vcHRzLmZvY3VzT3V0T2JqLkNMQVNTLFxyXG4gICAgICAgICAgICAgICAgZm9jdXNPdXRFbGVtZW50cyA9ICc8c3BhbiBjbGFzcz1cIicgKyBmb2N1c091dENsYXNzICsgJ1wiIHRhYmluZGV4PVwiMFwiPlwiXCI8L3NwYW4+JztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxheWVyT2JqLnByZXYoKS5oYXNDbGFzcyhmb2N1c091dENsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllck9iai5iZWZvcmUoZm9jdXNPdXRFbGVtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxheWVyT2JqLm5leHQoKS5oYXNDbGFzcyhmb2N1c091dENsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllck9iai5hZnRlcihmb2N1c091dEVsZW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZGb2N1c091dE9iaiA9IHRoaXMubGF5ZXJPYmoucHJldigpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRGb2N1c091dE9iaiA9IHRoaXMubGF5ZXJPYmoubmV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzT3V0T2JqID0gdGhpcy5sYXllck9iai5wcmV2KCkuYWRkKHRoaXMubGF5ZXJPYmoubmV4dCgpKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllck9iai5hdHRyKHtcclxuICAgICAgICAgICAgICAgICd0YWJJbmRleCcgOiAtMSxcclxuICAgICAgICAgICAgICAgICdyb2xlJyA6ICdkaWFsb2cnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzT3V0T2JqLmNzcyh0aGlzLm9wdHMuZm9jdXNPdXRPYmouQ1NTKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5kaW1tZWRPYmouY3NzKHtcclxuICAgICAgICAgICAgLy8gICAgIGJhY2tncm91bmQgOiB0aGlzLm9wdHMuYmdDb2xvcixcclxuICAgICAgICAgICAgLy8gICAgIG9wYWNpdHkgOiB0aGlzLm9wdHMuYmdPcGFjaXR5XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmVmZmVjdCA9PT0gJ3NsaWRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNEaXJlY3Rpb24gPSB0aGlzLm9wdHMuc2xpZGUuZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNEaXJlY3Rpb24gPT09ICdyaWdodFRvTGVmdCcgfHwgc0RpcmVjdGlvbiA9PT0gJ2xlZnRUb1JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5zbGlkZS5jc3NEID0gJ2xlZnQnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzRGlyZWN0aW9uID09PSAndG9wVG9Cb3R0b20nIHx8IHNEaXJlY3Rpb24gPT09ICdib3R0b21Ub1RvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuc2xpZGUuY3NzRCA9ICd0b3AnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaW1tZWRPYmouaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c091dE9iai5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdHMuZWZmZWN0ID09PSAnZmxpcCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmRGlyZWN0aW9uID0gdGhpcy5vcHRzLmZsaXAuZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZEaXJlY3Rpb24gIT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZmxpcC5jc3NEID0gJ3JvdGF0ZVknO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZmxpcC5jc3NEID0gJ3JvdGF0ZVgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaW1tZWRPYmouaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c091dE9iai5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJXcmFwLmFkZENsYXNzKHRoaXMub3B0cy5mbGlwLkNMQVNTKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhbmdlRXZlbnRzIDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudC5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnROYW1lcykge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZXZlbnROYW1lc1trZXldICsgdGhpcy5vcHRzLmN1c3RvbUV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzLmpvaW4oJyAnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFdmVudHMgOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgJChkb2MpLm9uKHRoaXMuY2hhbmdlRXZlbnRzKCdjbGljayBjbGlja0N1c3RvbScpLCB0aGlzLm9wdHMub3BlbmVyRWxlbWVudHMgKyAnW2RhdGEtbGF5ZXItdGFyZ2V0PVwiJyArIHRoaXMubGF5ZXJXcmFwSW5zdGFuY2UgKyAnXCJdJywgJC5wcm94eSh0aGlzLm9uTGF5ZXJPcGVuLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5vbih0aGlzLmNoYW5nZUV2ZW50cygnb3BlbkxheWVyJyksICQucHJveHkodGhpcy5vbkxheWVyT3BlbiwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2Rm9jdXNPdXRPYmoub24odGhpcy5jaGFuZ2VFdmVudHMoJ2ZvY3VzaW4nKSwgJC5wcm94eSh0aGlzLm9uUHJldk91dCwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Rm9jdXNPdXRPYmoub24odGhpcy5jaGFuZ2VFdmVudHMoJ2ZvY3VzaW4nKSwgJC5wcm94eSh0aGlzLm9uTmV4dE91dCwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZXJPYmoub24odGhpcy5jaGFuZ2VFdmVudHMoJ2tleWRvd24gY2xpY2sgY2xpY2tDdXN0b20nKSwgJC5wcm94eSh0aGlzLm9uTGF5ZXJDbG9zZSwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAub24odGhpcy5jaGFuZ2VFdmVudHMoJ2xheWVyU2V0T3B0aW9ucycpLCAkLnByb3h5KHRoaXMuc2V0T3B0aW9ucywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy51c2VFc2NhcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLm9uKHRoaXMuY2hhbmdlRXZlbnRzKCdrZXlkb3duJyksICQucHJveHkodGhpcy5vbkVzY2FwZUNsb3NlLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGRvYykub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdjbGljayBjbGlja0N1c3RvbScpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJXcmFwLm9mZih0aGlzLmNoYW5nZUV2ZW50cygnb3BlbkxheWVyJykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2Rm9jdXNPdXRPYmoub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdmb2N1c2luJykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Rm9jdXNPdXRPYmoub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdmb2N1c2luJykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZXJPYmoub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdrZXlkb3duIGNsaWNrIGNsaWNrQ3VzdG9tJykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdsYXllclNldE9wdGlvbnMnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnVzZUVzY2FwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJPYmoub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdrZXlkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kT3V0c2lkZUV2ZW50cyA6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnVzZU91dHNpZGUpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJPYmoub24oJ2NsaWNrb3V0c2lkZSB0b3VjaGVuZG91dHNpZGUnLCAkLnByb3h5KHRoaXMub25MYXllck91dHNpZGVGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLm9mZignY2xpY2tvdXRzaWRlIHRvdWNoZW5kb3V0c2lkZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY3JvbGxMb2NrIDoge1xyXG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLnNjcm9sbExvY2tUeXBlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9ja0NsYXNzID0gdGhpcy5vcHRzLnNjcm9sbExvY2tDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrT3B0cyA9IHRoaXMub3B0cy5zY3JvbGxMb2NrT3B0cyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMgPSAkKGxvY2tPcHRzLmxvY2tFbGVtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMudG9nZ2xlQ2xhc3MobG9ja0NsYXNzLCB0eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFVUSUwuaXNEZXZpY2UgJiYgVVRJTC5pc0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9ja09wdHMuc2Nyb2xsTG9ja2VkIHx8IChsb2NrRWxlbWVudHMuZGF0YSgnbG9ja1Njcm9sbCcpICE9IG51bGwpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tPcHRzLmFwcGxpZWRMb2NrID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9jay5zYXZlU3R5bGVzLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9jay5zYXZlU2Nyb2xscy5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChsb2NrT3B0cy5hcHBsaWVkTG9jaywgbG9ja09wdHMubG9ja1N0eWxlcywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnIDogLSBsb2NrT3B0cy5wcmV2U2Nyb2xsLnNjcm9sbExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndG9wJyA6IC0gbG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxUb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cy5jc3MobG9ja09wdHMuYXBwbGllZExvY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMuZGF0YSgnbG9ja1Njcm9sbCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsZWZ0JyA6IGxvY2tPcHRzLnByZXZTY3JvbGwuc2Nyb2xsTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnIDogbG9ja09wdHMucHJldlNjcm9sbC5zY3JvbGxUb3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tPcHRzLnNjcm9sbExvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVVRJTC5pc0RldmljZSAmJiBVVElMLmlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9ja09wdHMuc2Nyb2xsTG9ja2VkIHx8IChsb2NrRWxlbWVudHMuZGF0YSgnbG9ja1Njcm9sbCcpID09IG51bGwpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9jay5zYXZlU3R5bGVzLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NrT3B0cy5hcHBsaWVkTG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2tPcHRzLnByZXZTdHlsZXNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrRWxlbWVudHMuYXR0cignc3R5bGUnLCAkKCc8eD4nKS5jc3MobG9ja09wdHMucHJldlN0eWxlcykuYXR0cignc3R5bGUnKSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cy5kYXRhKCdsb2NrU2Nyb2xsJywgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQod2luKS5zY3JvbGxMZWZ0KGxvY2tPcHRzLnByZXZTY3JvbGwuc2Nyb2xsTGVmdCkuc2Nyb2xsVG9wKGxvY2tPcHRzLnByZXZTY3JvbGwuc2Nyb2xsVG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja09wdHMuc2Nyb2xsTG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzYXZlU3R5bGVzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlU3RycyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlSGFzaCA9IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tPcHRzID0gdGhpcy5vcHRzLnNjcm9sbExvY2tPcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tFbGVtZW50cyA9ICQobG9ja09wdHMubG9ja0VsZW1lbnRzKSxcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZUF0dHIgPSAgbG9ja0VsZW1lbnRzLmF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0eWxlQXR0cikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgc3R5bGVTdHJzID0gc3R5bGVBdHRyLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goc3R5bGVTdHJzLCBmdW5jdGlvbiBzdHlsZVByb3AgKHN0eWxlU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlU3RyaW5nID0gc3R5bGVTdHJzW3N0eWxlU3RyaW5nXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0eWxlU3RyaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gc3R5bGVTdHJpbmcuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoIDwgMikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlSGFzaFskLnRyaW0oa2V5VmFsdWVbMF0pXSA9ICQudHJpbShrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKGxvY2tPcHRzLnByZXZTdHlsZXMsIHN0eWxlSGFzaCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNhdmVTY3JvbGxzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvY2tPcHRzID0gdGhpcy5vcHRzLnNjcm9sbExvY2tPcHRzO1xyXG4gICAgICAgICAgICAgICAgbG9ja09wdHMucHJldlNjcm9sbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0IDogJCh3aW4pLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgOiAkKHdpbikuc2Nyb2xsVG9wKClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDbG9zZUV2ZW50cyA6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5vbih0aGlzLmNoYW5nZUV2ZW50cygnY2xvc2VMYXllcicpLCAkLnByb3h5KHRoaXMuY2xvc2VMYXllciwgdGhpcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdjbG9zZUxheWVyJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRPcHRpb25zIDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgVVRJTC5kZWYodGhpcy5vcHRzLCBkYXRhIHx8IHt9KTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuY3VzdG9tVG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMuZWZmZWN0ID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkxheWVyT3BlbiA6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycgfHwgZS50eXBlID09PSAnY2xpY2tDdXN0b20nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMub3BlbmVyVGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub3BlbmVyVGFyZ2V0Lmhhc0NsYXNzKHRoaXMub3B0cy5vcGVuZXJBc3luY0NsYXNzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJWaWV3VHlwZSA9ICdvcGVuJztcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxMb2NrLmluaXQuY2FsbCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kQ2xvc2VFdmVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZWZmZWN0ID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ2xheWVyT3BlbkJlZm9yZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuY3VzdG9tVG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAuc3RvcCh0cnVlLCB0cnVlKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQWZ0ZXJCdWdGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLmVmZmVjdCA9PT0gJ2ZhZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdsYXllck9wZW5CZWZvcmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPdXRPYmouc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAuc3RvcCh0cnVlLCB0cnVlKS5mYWRlSW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogdGhpcy5vcHRzLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA6IHRoaXMub3B0cy5lYXNpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uIChub3csIHR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dENhbGxiYWNrKCdsYXllck1vdmUnLCBub3csIHR3ZWVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlIDogJC5wcm94eSh0aGlzLm9wZW5BZnRlckJ1Z0Z1bmMsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdHMuZWZmZWN0ID09PSAnc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknIDogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICAnb3BhY2l0eScgOiAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZURhdGEgPSB0aGlzLm9wdHMuc2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzRCA9IHNsaWRlRGF0YS5jc3NELFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHBhcnNlRmxvYXQodGhpcy5sYXllck9iai5jc3MoJ21hcmdpbi0nICsgY3NzRCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVEYXRhID0geydvcGFjaXR5JyA6IDF9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGNzc0QgPT09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0UG9zID0gKHNsaWRlRGF0YS5kaXJlY3Rpb24gPT09ICdyaWdodFRvTGVmdCcpID8gb2Zmc2V0ICsgc2xpZGVEYXRhLnJhbmdlIDogb2Zmc2V0IC0gc2xpZGVEYXRhLnJhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJPYmouY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JyA6IGluaXRQb3NcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRGF0YVsnbWFyZ2luLScgKyBjc3NEXSA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3NzRCA9PT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdFBvcyA9IChzbGlkZURhdGEuZGlyZWN0aW9uID09PSAndG9wVG9Cb3R0b20nKSA/IG9mZnNldCAtIHNsaWRlRGF0YS5yYW5nZSA6IG9mZnNldCArIHNsaWRlRGF0YS5yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJyA6IGluaXRQb3NcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRGF0YVsnbWFyZ2luLScgKyBjc3NEXSA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGltbWVkT2JqLmZhZGVJbih0aGlzLm9wdHMuZGltbWVkRHVyYXRpb24sICQucHJveHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ2xheWVyT3BlbkJlZm9yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPdXRPYmouc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJPYmouYW5pbWF0ZShtb3ZlRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA6IHRoaXMub3B0cy5kdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nIDogdGhpcy5vcHRzLmVhc2luZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uIChub3csIHR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRDYWxsYmFjaygnbGF5ZXJNb3ZlJywgbm93LCB0d2Vlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlIDogJC5wcm94eSh0aGlzLm9wZW5BZnRlckJ1Z0Z1bmMsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLmVmZmVjdCA9PT0gJ2ZsaXAnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW92ZURpc3RhbmNlID0gdGhpcy5vcHRzLmZsaXAucm90YXRlRW5kIC0gdGhpcy5vcHRzLmZsaXAucm90YXRlU3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZU9uZVN0ZXAgPSBtb3ZlRGlzdGFuY2UgLyB0aGlzLm9wdHMuZHVyYXRpb24gKiAoMTAwMCAvIHRoaXMub3B0cy5mcHMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5mbGlwLm1vdmVEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGlzdGFuY2UgOiB0aGlzLm9wdHMuZmxpcC5yb3RhdGVTdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBlbmREaXN0YW5jZSA6IHRoaXMub3B0cy5mbGlwLnJvdGF0ZUVuZCxcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlRGlzdGFuY2UgOiBtb3ZlRGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZU9uZVN0ZXAgOiBtb3ZlT25lU3RlcCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RlcCA6IGN1cnJlbnRTdGVwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaW1tZWRPYmouZmFkZUluKHRoaXMub3B0cy5kaW1tZWREdXJhdGlvbiwgJC5wcm94eShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnbGF5ZXJPcGVuQmVmb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c091dE9iai5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllck9iai5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U3RlcCh0aGlzLm9wdHMuZmxpcC5tb3ZlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlwRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXJpYUFjY2Vzc2JpbGl0eSh0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRTdGVwIDogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLnN0ZXBUaW1lT2xkID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkYXRhLnN0YXJ0RGlzdGFuY2UgPiBkYXRhLm1vdmVEaXN0YW5jZSA/ICd0b05leHQnIDogJ3RvUHJldic7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gdGhpcy5kaXJlY3Rpb24gPT09ICd0b05leHQnID8gZGF0YS5jdXJyZW50U3RlcCA+IGRhdGEubW92ZURpc3RhbmNlIDogZGF0YS5jdXJyZW50U3RlcCA8IGRhdGEubW92ZURpc3RhbmNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZVN0ZXAgOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuc3RlcFRpbWVOZXcgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucmVtYWluaW5nID0gTWF0aC5tYXgoMCwgKHRoaXMub3B0cy5zdGVwVGltZU9sZCAtIHRoaXMub3B0cy5zdGVwVGltZU5ldykgKyB0aGlzLm9wdHMuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IHRoaXMub3B0cy5yZW1haW5pbmcgLyB0aGlzLm9wdHMuZHVyYXRpb24gfHwgMCxcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAxIC0gdGVtcCxcclxuICAgICAgICAgICAgICAgIGVhc2VkID0gJC5lYXNpbmdbdGhpcy5vcHRzLmVhc2luZ10ocGVyY2VudCwgdGhpcy5vcHRzLmR1cmF0aW9uICogcGVyY2VudCwgMCwgMSwgdGhpcy5vcHRzLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgZGF0YS5jdXJyZW50U3RlcCA9IChkYXRhLmVuZERpc3RhbmNlIC0gZGF0YS5zdGFydERpc3RhbmNlKSAqIGVhc2VkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmxpcEZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5vcHRzLmZsaXAubW92ZURhdGE7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0ZXAoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgd2luLmNsZWFyVGltZW91dCh0aGlzLnN0ZXBUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcFRpbWVvdXQgPSB3aW4uc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaXBGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSwgMTAwMCAvIHRoaXMub3B0cy5mcHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb24gPSB0aGlzLmRpcmVjdGlvbiA9PT0gJ3RvTmV4dCcgPyBkYXRhLmN1cnJlbnRTdGVwID4gZGF0YS5tb3ZlRGlzdGFuY2UgOiBkYXRhLmN1cnJlbnRTdGVwIDwgZGF0YS5tb3ZlRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdsYXllck1vdmUnLCBkYXRhLmN1cnJlbnRTdGVwLCBkYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5yZW1haW5pbmcgPSB0aGlzLm9wdHMuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXllclZpZXdUeXBlID09PSAnY2xvc2UnIHx8ICF0aGlzLmxheWVyVmlld1R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQWZ0ZXJCdWdGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaW1tZWRPYmouZmFkZU91dCh0aGlzLm9wdHMuZGltbWVkRHVyYXRpb24sICQucHJveHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPdXRPYmouaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkFmdGVyQnVnRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtb3ZlUG9zaXRpb24gPSBkYXRhLnN0YXJ0RGlzdGFuY2UgKyBkYXRhLmN1cnJlbnRTdGVwO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyT2JqLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyA6IHRoaXMub3B0cy5mbGlwLmNzc0QgKyAnKCcgKyBtb3ZlUG9zaXRpb24gKyAnZGVnKSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkxheWVyT3BlbkFmdGVyIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyT2JqLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVFdmVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ2xheWVyT3BlbkFmdGVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuQWZ0ZXJCdWdGdW5jIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW4uY2xlYXJUaW1lb3V0KHRoaXMub3BlbkFmdGVyVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkFmdGVyVGltZW91dCA9IHdpbi5zZXRUaW1lb3V0KCQucHJveHkodGhpcy5vbkxheWVyT3BlbkFmdGVyLCB0aGlzKSwgMzApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25MYXllckNsb3NlIDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMudXNlQ2xvc2VGb2N1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS50eXBlID09PSAnY2xpY2snIHx8IGUudHlwZSA9PT0gJ2NsaWNrQ3VzdG9tJykge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAudHJpZ2dlcih0aGlzLmNoYW5nZUV2ZW50cygnY2xvc2VMYXllcicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2VMYXllciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllclZpZXdUeXBlID0gJ2Nsb3NlJztcclxuICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnbGF5ZXJDbG9zZUJlZm9yZScpO1xyXG4gICAgICAgICAgICB3aW4uY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VCZWZvcmVUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUJlZm9yZVRpbWVvdXQgPSB3aW4uc2V0VGltZW91dCgkLnByb3h5KHRoaXMuY2xvc2VCZWZvcmVCdWdGdW5jLCB0aGlzKSwgMzApO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRPdXRzaWRlRXZlbnRzKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hcmlhQWNjZXNzYmlsaXR5KGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRXNjYXBlQ2xvc2UgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIga2V5Q29kZSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xyXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSAhPT0gMjcpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLnVzZUNsb3NlRm9jdXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyV3JhcC50cmlnZ2VyKHRoaXMuY2hhbmdlRXZlbnRzKCdjbG9zZUxheWVyJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25QcmV2T3V0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5maW5kKCdhLCBidXR0b24sIGlucHV0LCBzZWxlY3QnKS5maWx0ZXIoJzp2aXNpYmxlJykubGFzdCgpLmZvY3VzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk5leHRPdXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJPYmouZm9jdXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uTGF5ZXJPdXRzaWRlRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllcldyYXAudHJpZ2dlcih0aGlzLmNoYW5nZUV2ZW50cygnY2xvc2VMYXllcicpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlQmVmb3JlQnVnRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5lZmZlY3QgPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdHMuY3VzdG9tVG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAuc3RvcCh0cnVlLCB0cnVlKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQWZ0ZXJCdWdGdW5jKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLmVmZmVjdCA9PT0gJ2ZhZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyV3JhcC5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogdGhpcy5vcHRzLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA6IHRoaXMub3B0cy5lYXNpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uIChub3csIHR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dENhbGxiYWNrKCdsYXllck1vdmUnLCBub3csIHR3ZWVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlIDogJC5wcm94eSh0aGlzLmNsb3NlQWZ0ZXJCdWdGdW5jLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRzLmVmZmVjdCA9PT0gJ3NsaWRlJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlRGF0YSA9IHRoaXMub3B0cy5zbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICBjc3NEID0gc2xpZGVEYXRhLmNzc0QsXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gcGFyc2VGbG9hdCh0aGlzLmxheWVyT2JqLmNzcygnbWFyZ2luLScgKyBjc3NEKSksXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZURhdGEgPSB7J29wYWNpdHknIDogMH07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3NzRCA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVQb3MgPSAoc2xpZGVEYXRhLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0VG9MZWZ0JykgPyBvZmZzZXQgLSBzbGlkZURhdGEucmFuZ2UgOiBvZmZzZXQgKyBzbGlkZURhdGEucmFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZURhdGFbJ21hcmdpbi0nICsgY3NzRF0gPSBtb3ZlUG9zO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjc3NEID09PSAndG9wJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlUG9zID0gKHNsaWRlRGF0YS5kaXJlY3Rpb24gPT09ICd0b3BUb0JvdHRvbScpID8gb2Zmc2V0ICsgc2xpZGVEYXRhLnJhbmdlIDogb2Zmc2V0IC0gc2xpZGVEYXRhLnJhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVEYXRhWydtYXJnaW4tJyArIGNzc0RdID0gbW92ZVBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJPYmouYW5pbWF0ZShtb3ZlRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogdGhpcy5vcHRzLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA6IHRoaXMub3B0cy5lYXNpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uIChub3csIHR3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dENhbGxiYWNrKCdsYXllck1vdmUnLCBub3csIHR3ZWVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlIDogJC5wcm94eShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VBZnRlckJ1Z0Z1bmMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaW1tZWRPYmouZmFkZU91dCh0aGlzLm9wdHMuZGltbWVkRHVyYXRpb24sICQucHJveHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c091dE9iai5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyT2JqLmhpZGUoKS5jc3MoJ21hcmdpbicsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdHMuZWZmZWN0ID09PSAnZmxpcCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlRGlzdGFuY2UgPSAtKHRoaXMub3B0cy5mbGlwLnJvdGF0ZVN0YXJ0KSAtIHRoaXMub3B0cy5mbGlwLnJvdGF0ZUVuZCxcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlT25lU3RlcCA9IG1vdmVEaXN0YW5jZSAvIHRoaXMub3B0cy5kdXJhdGlvbiAqICgxMDAwIC8gdGhpcy5vcHRzLmZwcyksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0ZXAgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLmZsaXAubW92ZURhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREaXN0YW5jZSA6IHRoaXMub3B0cy5mbGlwLnJvdGF0ZUVuZCxcclxuICAgICAgICAgICAgICAgICAgICBlbmREaXN0YW5jZSA6IC0odGhpcy5vcHRzLmZsaXAucm90YXRlU3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVEaXN0YW5jZSA6IG1vdmVEaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlT25lU3RlcCA6IG1vdmVPbmVTdGVwLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwIDogY3VycmVudFN0ZXBcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTdGVwKHRoaXMub3B0cy5mbGlwLm1vdmVEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxpcEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2VBZnRlckJ1Z0Z1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbi5jbGVhclRpbWVvdXQodGhpcy5jbG9zZUFmdGVyVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBZnRlclRpbWVvdXQgPSB3aW4uc2V0VGltZW91dCgkLnByb3h5KHRoaXMub25MYXllckNsb3NlQWZ0ZXIsIHRoaXMpLCAzMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkxheWVyQ2xvc2VBZnRlciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxMb2NrLmluaXQuY2FsbCh0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMub3BlbmVyVGFyZ2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVVRJTC5pc0RldmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy51c2VDbG9zZUZvY3VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMudXNlQ2xvc2VGb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5vcGVuZXJUYXJnZXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5vcGVuZXJUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy51c2VDbG9zZUZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZENsb3NlRXZlbnRzKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnbGF5ZXJDbG9zZUFmdGVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcmlhQWNjZXNzYmlsaXR5IDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGxheWVyV3JhcCA9IHRoaXMubGF5ZXJXcmFwLFxyXG4gICAgICAgICAgICAgICAgbGF5ZXJQYXJlbnRzID0gbGF5ZXJXcmFwLnBhcmVudHMoKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyV3JhcC5zaWJsaW5ncygpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBsYXllclBhcmVudHMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGxheWVyUGFyZW50cy5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGFyZ2V0LnNpYmxpbmdzKCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXJXcmFwLnNpYmxpbmdzKCkucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBsYXllclBhcmVudHMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RhcmdldCA9IGxheWVyUGFyZW50cy5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGFyZ2V0LnNpYmxpbmdzKCkucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0Q2FsbGJhY2sgOiBmdW5jdGlvbiAoaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFja09iaiA9IHRoaXMub3B0c1tpbmddO1xyXG4gICAgICAgICAgICBpZiAoaW5nID09PSAnbGF5ZXJNb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcldyYXAudHJpZ2dlcihpbmcsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCB0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJXcmFwLnRyaWdnZXIoaW5nLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tPYmogPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoaW5nID09PSAnbGF5ZXJNb3ZlJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tPYmooYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tPYmoodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Ryb3kgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZE91dHNpZGVFdmVudHMoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRDbG9zZUV2ZW50cyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgVVRJTC5lbWl0dGVyKTtcclxuICAgICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG1heCA9IHRoaXMubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbmV3IHdpbi5zbWcuZXVDcFtwbHVnaW5OYW1lXShfdGhpcy5lcShpbmRleCksIGFyZ3MpO1xyXG4gICAgICAgICAgICB9KShpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcHJlT3JkZXJQb3B1cCA9ICQoJy5jbS1jb25maWd1cmF0b3ItcG9wdXAnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gcHJlT3JkZXJQb3B1cC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSBwcmVPcmRlclBvcHVwLmVxKGkpLFxyXG4gICAgICAgICAgICAgICAgICAgIF9sYXllciA9ICQoJyMnICsgX3RoaXMuYXR0cignaWQnKSk7XHJcbiAgICAgICAgICAgICAgICBuZXcgd2luZG93LnNtZy5ldUNwWydMYXllclBvcHVwTGlicyddKF9sYXllciwge1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyRWxlbWVudHMgOiAnLmNtLWNvbmZpZ3VyYXRvci1wb3B1cF9fbGF5ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lckVsZW1lbnRzIDogJy5jbS1jb25maWd1cmF0b3ItcG9wdXAtb3BlbmVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXJFbGVtZW50cyA6ICcuY20tY29uZmlndXJhdG9yLXBvcHVwLWNsb3NlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGltbWVkRWxlbWVudHMgOiAnLmNtLWNvbmZpZ3VyYXRvci1wb3B1cF9fZGltbWVkJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSh3aW5kb3csIHdpbmRvdy5qUXVlcnksIHdpbmRvdy5kb2N1bWVudCk7XHJcbiIsIihmdW5jdGlvbiAod2luLCAkLCBkb2MpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHdpbi5zbWcgPSB3aW4uc21nIHx8IHt9O1xyXG4gICAgd2luLnNtZy5ldUNwID0gd2luLnNtZy5ldUNwIHx8IHt9O1xyXG4gICAgd2luLnNtZy5ldUNwLmNvbW1vbiA9IHdpbi5zbWcuZXVDcC5jb21tb24gfHwge307XHJcblxyXG4gICAgdmFyIFVUSUwgPSB3aW4uc21nLmV1Q3AuY29tbW9uLnV0aWwsXHJcbiAgICAgICAgQlJFQUtQT0lOVFMgPSB3aW4uc21nLmV1Q3AuY29tbW9uLmJyZWFrcG9pbnRzLFxyXG4gICAgICAgIHBsdWdpbk5hbWUgPSAnSGl2ZVN0aWNreSc7XHJcblxyXG4gICAgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgYXJncykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luLnNtZy5ldUNwW3BsdWdpbk5hbWVdKGNvbnRhaW5lciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkZWZQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGJvZHkgOiAkKCdib2R5JyksXHJcbiAgICAgICAgICAgIGFsaWduIDogJ3RvcCcsIC8vIENvdWxkIGJlICd0b3AnLCAnYm90dG9tJywgJ3RvcEFuZEJvdHRvbSdcclxuICAgICAgICAgICAgYWxpZ25Dc3MgOiB7XHJcbiAgICAgICAgICAgICAgICB0b3AgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b20gOiAnYXV0bydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib3R0b20gOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wIDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSA6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RpY2t5V3JhcEVsZW1lbnRzIDogY29udGFpbmVyIHx8ICcuaGl2ZS1zdGlja3ktd3JhcCcsXHJcbiAgICAgICAgICAgIG92ZXJlZEVsZW1lbnRzIDogbnVsbCxcclxuICAgICAgICAgICAgb3ZlcmVkQ2xhc3MgOiAnc3RpY2t5LW92ZXInLFxyXG4gICAgICAgICAgICBmaXhlZENsYXNzIDogJ3N0aWNreS1hY3RpdmUnLFxyXG4gICAgICAgICAgICBjdXN0b21FdmVudCA6ICcuJyArIHBsdWdpbk5hbWUgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW4gOiAwLFxyXG4gICAgICAgICAgICBzcGFjZVN0aWNreUVsZW1lbnRzIDogbnVsbCxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHMgOiB7fSxcclxuICAgICAgICAgICAgZnBzIDogMTIwLFxyXG4gICAgICAgICAgICBlYXNpbmcgOiBudWxsLFxyXG4gICAgICAgICAgICBlYXNpbmdDbGFzcyA6ICdzdGlja3ktZWFzZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uIDogMjUwLFxyXG4gICAgICAgICAgICBhbmNob3IgOiB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3JFbGVtZW50cyA6ICcuaGl2ZS1zdGlja3ktYW5jaG9yJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNsYXNzIDogJ2FuY2hvci1hY3RpdmUnLFxyXG4gICAgICAgICAgICAgICAgaGFzaG5hdiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaGFzaG5hbWUgOiAnLUhBJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uIDogNTAwLFxyXG4gICAgICAgICAgICAgICAgZWFzaW5nIDogJ3N3aW5nJyxcclxuICAgICAgICAgICAgICAgIGFuY2hvck1vdmUgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yTW92ZUJlZm9yZSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhbmNob3JNb3ZlQWZ0ZXIgOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb3AgOiB7fSxcclxuICAgICAgICAgICAgY2FsbGJhY2tEYXRhIDoge30sXHJcbiAgICAgICAgICAgIGRlc3Ryb3lUeXBlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZpZXdUeXBlIDogbnVsbCxcclxuICAgICAgICAgICAgc2Nyb2xsU3RhcnQgOiBudWxsLFxyXG4gICAgICAgICAgICByZXNpemVTdGFydCA6IG51bGwsXHJcbiAgICAgICAgICAgIC8vIGlzRml4ZWRDb25mbGljdCA6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgICAgLy8gICAgICAgICBpc0lQaG9uZSA9IHVhLm1hdGNoKC8oaVBob25lfGlQYWR8aVBvZCkvaSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaXNBbmRyb2lkID0gdWEubWF0Y2goL0FuZHJvaWQvaSk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoVVRJTC5pc0RldmljZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiAoaXNJUGhvbmUpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9KSgpLFxyXG4gICAgICAgICAgICBpc0ZpeGVkQ29uZmxpY3QgOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RpY2t5TW92ZSA6IG51bGwsXHJcbiAgICAgICAgICAgIHN0aWNreU1vdmVCZWZvcmUgOiBudWxsLFxyXG4gICAgICAgICAgICBzdGlja3lNb3ZlQWZ0ZXIgOiBudWxsLFxyXG4gICAgICAgICAgICBsb2FkQWZ0ZXIgOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISh0aGlzLnN0aWNreVdyYXAgPSAkKGRlZlBhcmFtcy5zdGlja3lXcmFwRWxlbWVudHMpKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICB0aGlzLm9wdHMgPSBVVElMLmRlZihkZWZQYXJhbXMsIHRoaXMuc3RpY2t5V3JhcC5kYXRhKCdoaXZlc3RpY2t5LW9wdHMnKSB8fCBhcmdzIHx8IHt9KTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH07XHJcbiAgICB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0ucHJvdG90eXBlID0gVVRJTC5kZWYoe1xyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE9wdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRMYXlvdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRPcHRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TY3JvbGxGdW5jKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZENvbnRyb2woKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRDYWxsQmFja0V2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdE9wdHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGlnbkNzcyA9IHRoaXMub3B0cy5hbGlnbkNzcztcclxuICAgICAgICAgICAgdGhpcy5hbGlnblJlbW92ZUNzcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYWxpZ25Dc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25SZW1vdmVDc3Nba2V5XSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RpY2t5UG9zID0gKHRoaXMuc3RpY2t5V3JhcC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdhYnNvbHV0ZScpID8gJ3NpZGUnIDogJyc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0aWNreVBvcyA9PT0gJ3NpZGUnICYmIHRoaXMub3B0cy5lYXNpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hbGlnbiA9ICd0b3AnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRFbGVtZW50cyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gYW5jaG9yXHJcbiAgICAgICAgICAgIHRoaXMuc3RpY2t5QW5jaG9yID0gdGhpcy5zdGlja3lXcmFwLmZpbmQodGhpcy5vcHRzLmFuY2hvci5hbmNob3JFbGVtZW50cykuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEhyZWYgPSB0YXJnZXQuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRhcmdldEhyZWYpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdExheW91dCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreVdyYXBDbGFzcyA9IHRoaXMuc3RpY2t5V3JhcC5hdHRyKCdjbGFzcycpLnNwbGl0KCcgJylbMF0sXHJcbiAgICAgICAgICAgICAgICBqc1N0aWNreVdyYXBDbGFzcyA9ICdqcy0nICsgc3RpY2t5V3JhcENsYXNzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGlja3lQb3MgIT09ICdzaWRlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0aWNreVdyYXAucGFyZW50KCkuaGFzQ2xhc3MoanNTdGlja3lXcmFwQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLndyYXAoJzxkaXYgY2xhc3M9XCInICsganNTdGlja3lXcmFwQ2xhc3MgKyAnXCIgLz4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuanNTdGlja3lXcmFwID0gdGhpcy5zdGlja3lXcmFwLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5lYXNpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanNTdGlja3lXcmFwLmFkZENsYXNzKHRoaXMub3B0cy5lYXNpbmdDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hbGlnbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLmNzcygnYm90dG9tJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0cy5hbGlnbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLmNzcygndG9wJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpzU3RpY2t5V3JhcCA9IHRoaXMuc3RpY2t5V3JhcC5wYXJlbnRzKCkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAkKHRoaXMpLmNzcygncG9zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBvc2l0aW9uID09PSAncmVsYXRpdmUnIHx8IHBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pLmVxKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qc1N0aWNreVdyYXAgPSAodGhpcy5qc1N0aWNreVdyYXAubGVuZ3RoKSA/IHRoaXMuanNTdGlja3lXcmFwIDogJCgnYm9keScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFuY2hvclxyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QW5jaG9yID0gdGhpcy5zdGlja3lBbmNob3IsXHJcbiAgICAgICAgICAgICAgICBvcHRzQW5jaG9yID0gdGhpcy5vcHRzLmFuY2hvcjtcclxuICAgICAgICAgICAgaWYgKHN0aWNreUFuY2hvci5sZW5ndGggJiYgb3B0c0FuY2hvci5oYXNobmF2KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gc3RpY2t5QW5jaG9yLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHN0aWNreUFuY2hvci5lcShpKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0YXJnZXQpLmF0dHIoJ2RhdGEtaGFzaCcsIHRhcmdldC5yZXBsYWNlKCcjJywgJycpICsgb3B0c0FuY2hvci5oYXNobmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaXNGaXhlZENvbmZsaWN0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuaXNGaXhlZENvbmZsaWN0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZml4ZWRDbGFzcyA9ICdoaXZlU3RpY2t5Zml4ZWRBcmVhJyxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZEVsZW1lbnRzID0gJzxkaXYgY2xhc3M9XCInICsgZml4ZWRDbGFzcyArICdcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChmaXhlZEVsZW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZml4ZWRXcmFwID0gJCgnLicgKyBmaXhlZENsYXNzKS5sYXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldE9wdHMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB3aW5XaWR0aCA9IFVUSUwud2luU2l6ZSgpLncsXHJcbiAgICAgICAgICAgICAgICB3aW5IZWlnaHQgPSBVVElMLndpblNpemUoKS5oLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wID0gdGhpcy5qc1N0aWNreVdyYXAub2Zmc2V0KCkudG9wIC0gdGhpcy5vcHRzLmJvZHkub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5SGVpZ2h0ID0gKHRoaXMuc3RpY2t5UG9zICE9PSAnc2lkZScpID8gdGhpcy5zdGlja3lXcmFwLm91dGVySGVpZ2h0KHRydWUpIDogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldEJvdHRvbSA9IG9mZnNldFRvcCArIHN0aWNreUhlaWdodCxcclxuICAgICAgICAgICAgICAgIGFsaWduQm90dG9tT2Zmc2V0ID0gb2Zmc2V0Qm90dG9tIC0gd2luSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnb2Zmc2V0VG9wJ10gPSBNYXRoLmZsb29yKG9mZnNldFRvcCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnb2Zmc2V0Qm90dG9tJ10gPSBNYXRoLmZsb29yKG9mZnNldEJvdHRvbSwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnc3RpY2t5SGVpZ2h0J10gPSBNYXRoLmNlaWwoc3RpY2t5SGVpZ2h0LCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5wcm9wWydhbGlnbkJvdHRvbU9mZnNldCddID0gTWF0aC5jZWlsKGFsaWduQm90dG9tT2Zmc2V0LCAxMCk7XHJcbiAgICAgICAgICAgIC8vIGJyZWFrcG9pbnRzXHJcbiAgICAgICAgICAgIHZhciBicmVha3BvaW50cyA9IHRoaXMub3B0cy5icmVha3BvaW50cyxcclxuICAgICAgICAgICAgICAgIGJyZWFrS2V5TWlucyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtLZXlNaW47XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBicmVha3BvaW50cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA+PSB3aW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrS2V5TWlucy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtLZXlNaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBicmVha0tleU1pbnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha0tleU1pbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5icmVha09wdHMgPSBVVElMLmRlZih7fSwgdGhpcy5vcHRzKTtcclxuICAgICAgICAgICAgaWYgKGJyZWFrS2V5TWluICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtPcHRzID0gVVRJTC5kZWYodGhpcy5icmVha09wdHMsIGJyZWFrcG9pbnRzW2JyZWFrS2V5TWluXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFtzXSBzZXQgb3B0aW9uc1xyXG4gICAgICAgICAgICAvLyBJRThcclxuICAgICAgICAgICAgaWYgKCFVVElMLmlzU3VwcG9ydFRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icmVha09wdHNbJ2FsaWduJ10gPSB0aGlzLm9wdHNbJ2FsaWduJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyZWFrT3B0c1snc3BhY2VTdGlja3lFbGVtZW50cyddID0gdGhpcy5vcHRzWydzcGFjZVN0aWNreUVsZW1lbnRzJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb3ZlcmVkRWxlbWVudHNcclxuICAgICAgICAgICAgaWYgKCFVVElMLmlzU3VwcG9ydFRyYW5zZm9ybSB8fCAoVVRJTC5pc1N1cHBvcnRUcmFuc2Zvcm0gJiYgKHdpbldpZHRoID4gQlJFQUtQT0lOVFMuTU9CSUxFKSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJyZWFrT3B0cy5vdmVyZWRFbGVtZW50cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdmVyZWRFbGVtZW50cyA9IHRoaXMuYnJlYWtPcHRzLm92ZXJlZEVsZW1lbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyZWRFbGVtZW50c09mZnNldFRvcCA9IG92ZXJlZEVsZW1lbnRzLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmVkRWxlbWVudHNIZWlnaHQgPSBvdmVyZWRFbGVtZW50cy5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lXcmFwID0gdGhpcy5zdGlja3lXcmFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lXcmFwSGVpZ2h0ID0gc3RpY2t5V3JhcC5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9wWydvdmVyZWRFbGVtZW50c09mZnNldCddID0gb3ZlcmVkRWxlbWVudHNPZmZzZXRUb3AgKyBvdmVyZWRFbGVtZW50c0hlaWdodCAtIHN0aWNreVdyYXBIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyZWFrT3B0cy5vdmVyZWRFbGVtZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc3BhY2VTdGlja3lFbGVtZW50c1xyXG4gICAgICAgICAgICB2YXIgc3BhY2VTdGlja3lFbGVtZW50cyA9ICQodGhpcy5icmVha09wdHMuc3BhY2VTdGlja3lFbGVtZW50cyksXHJcbiAgICAgICAgICAgICAgICBzcGFjZVN0aWNreUNvbmRpdGlvbiA9IHNwYWNlU3RpY2t5RWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnNwYWNlU3RpY2t5RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFRvcCA6IHNwYWNlU3RpY2t5Q29uZGl0aW9uID8gdGhpcy5zcGFjZVN0aWNreUVsZW1lbnRzLnBhcmVudCgpLm9mZnNldCgpLnRvcCA6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGlja3lIZWlnaHQgOiBzcGFjZVN0aWNreUNvbmRpdGlvbiA/IHRoaXMuc3BhY2VTdGlja3lFbGVtZW50cy5vdXRlckhlaWdodCgpIDogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBzcGFjZUJldHdlZW5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJyZWFrT3B0cy5zcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BhY2VCZXR3ZWVuRWxlbWVudHMgPSAkKHRoaXMuYnJlYWtPcHRzLnNwYWNlQmV0d2VlbiksXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuQ29uZGl0aW9uID0gc3BhY2VCZXR3ZWVuRWxlbWVudHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbkhlaWdodCA9IChzcGFjZUJldHdlZW5Db25kaXRpb24gPyBzcGFjZUJldHdlZW5FbGVtZW50cy5vdXRlckhlaWdodCgpIDogMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwYWNlQmV0d2VlbiA9IHNwYWNlQmV0d2VlbkhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VCZXR3ZWVuID0gdGhpcy5icmVha09wdHMuc3BhY2VCZXR3ZWVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNzc0tleSBpbiB0aGlzLm9wdHMuYWxpZ25Dc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hbGlnbkNzc1tjc3NLZXldW2Nzc0tleV0gPSAwICsgdGhpcy5zcGFjZUJldHdlZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gW2VdIHNldCBvcHRpb25zXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRMYXlvdXQoKTtcclxuICAgICAgICAgICAgLy8gYW5jaG9yXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QW5jaG9yT2Zmc2V0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRMYXlvdXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5vcHRzLnByb3A7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0aWNreVBvcyAhPT0gJ3NpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpzU3RpY2t5V3JhcC5jc3MoJ2hlaWdodCcsIHByb3Auc3RpY2t5SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5jYWxsYmFja0RhdGEgPSBwcm9wO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLmNhbGxiYWNrRGF0YSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBbmNob3JPZmZzZXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGlja3lBbmNob3IubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lBbmNob3IgPSB0aGlzLnN0aWNreUFuY2hvcixcclxuICAgICAgICAgICAgICAgIHByb3AgPSB0aGlzLm9wdHMucHJvcCxcclxuICAgICAgICAgICAgICAgIHNwYWNlSGVpZ2h0ID0gKHRoaXMuYnJlYWtPcHRzLmFsaWduID09PSAnYm90dG9tJykgPyAwIDogcHJvcC5zdGlja3lIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW4gPSAodGhpcy5zdGlja3lQb3MgIT09ICdzaWRlJykgPyB0aGlzLnNwYWNlQmV0d2VlbiA6IDAsXHJcbiAgICAgICAgICAgICAgICBzcGFjZVN0aWNreURhdGEgPSB0aGlzLnNwYWNlU3RpY2t5RGF0YTtcclxuICAgICAgICAgICAgdGhpcy5hbmNob3JEYXRhcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gc3RpY2t5QW5jaG9yLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SHJlZiA9IHN0aWNreUFuY2hvci5lcShpKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gJCh0YXJnZXRIcmVmKSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZVN0aWNreUhlaWdodCA9ICh0YXJnZXQub2Zmc2V0KCkudG9wID49IHNwYWNlU3RpY2t5RGF0YS5vZmZzZXRUb3ApID8gc3BhY2VTdGlja3lEYXRhLnN0aWNreUhlaWdodCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEIDogdGFyZ2V0SHJlZi5yZXBsYWNlKCcjJywgJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgOiB0YXJnZXQub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5PZmZzZXQgOiBNYXRoLmNlaWwodGFyZ2V0Lm9mZnNldCgpLnRvcCAtIHNwYWNlSGVpZ2h0IC0gc3BhY2VCZXR3ZWVuIC0gc3BhY2VTdGlja3lIZWlnaHQsIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4T2Zmc2V0IDogTWF0aC5jZWlsKHRhcmdldC5vZmZzZXQoKS50b3AgKyB0YXJnZXQub3V0ZXJIZWlnaHQodHJ1ZSkgLSBzcGFjZUhlaWdodCAtIHNwYWNlQmV0d2VlbiAtIHNwYWNlU3RpY2t5SGVpZ2h0LCAxMClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JEYXRhcy5wdXNoKGRhdGFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hhbmdlRXZlbnRzIDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBldmVudC5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnROYW1lcykge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZXZlbnROYW1lc1trZXldICsgdGhpcy5vcHRzLmN1c3RvbUV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzLmpvaW4oJyAnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFdmVudHMgOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgJCh3aW4pLm9uKHRoaXMuY2hhbmdlRXZlbnRzKCdzY3JvbGwnKSwgJC5wcm94eSh0aGlzLm9uU2Nyb2xsRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW4pLm9uKHRoaXMuY2hhbmdlRXZlbnRzKCdyZXNpemUnKSwgJC5wcm94eSh0aGlzLm9uUmVzaXplRnVuYywgdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgLy8gYW5jaG9yXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0aWNreUFuY2hvci5vbih0aGlzLmNoYW5nZUV2ZW50cygnY2xpY2snKSwgJC5wcm94eSh0aGlzLm9uQ2xpY2tBbmNob3IsIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIC8vIGhhc2hcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYW5jaG9yLmhhc2huYXYgJiYgdGhpcy5zdGlja3lBbmNob3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh3aW4pLm9uKHRoaXMuY2hhbmdlRXZlbnRzKCdoYXNoY2hhbmdlJyksICQucHJveHkodGhpcy5vbkhhc2hDaGFuZ2VGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbikub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdzY3JvbGwnKSk7XHJcbiAgICAgICAgICAgICAgICAkKHdpbikub2ZmKHRoaXMuY2hhbmdlRXZlbnRzKCdyZXNpemUnKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBhbmNob3JcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RpY2t5QW5jaG9yLm9mZih0aGlzLmNoYW5nZUV2ZW50cygnY2xpY2snKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBoYXNoXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmFuY2hvci5oYXNobmF2ICYmIHRoaXMuc3RpY2t5QW5jaG9yLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQod2luKS5vZmYodGhpcy5jaGFuZ2VFdmVudHMoJ2hhc2hjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tBbmNob3IgOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRIcmVmID0gdGFyZ2V0LmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgdGhpcy5hbmNob3JNb3ZlKHRhcmdldEhyZWYucmVwbGFjZSgnIycsICcnKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkhhc2hDaGFuZ2VGdW5jIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3SGFzaCA9IGRvYy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyksXHJcbiAgICAgICAgICAgICAgICBuZXdIYXNobmFtZSA9IG5ld0hhc2gucmVwbGFjZSh0aGlzLm9wdHMuYW5jaG9yLmhhc2huYW1lLCAnJyk7XHJcbiAgICAgICAgICAgIGlmIChuZXdIYXNobmFtZSAhPT0gdGhpcy5hbmNob3JUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yTW92ZShuZXdIYXNobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEhhc2ggOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmFuY2hvci5oYXNobmF2IHx8ICF0aGlzLnN0aWNreUFuY2hvci5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGFuY2hvclRhcmdldCA9IHRoaXMuYW5jaG9yVGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgb3B0c0FuY2hvciA9IHRoaXMub3B0cy5hbmNob3IsXHJcbiAgICAgICAgICAgICAgICBoYXNobmFtZSA9IGFuY2hvclRhcmdldCArIG9wdHNBbmNob3IuaGFzaG5hbWUsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SGFzaCA9IGRvYy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SGFzaCAhPT0gaGFzaG5hbWUgJiYgYW5jaG9yVGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZG9jLmxvY2F0aW9uLmhhc2ggPSBoYXNobmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5jaG9yTW92ZSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIG9wdHNBbmNob3IgPSB0aGlzLm9wdHMuYW5jaG9yLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yRGF0YXMgPSB0aGlzLmFuY2hvckRhdGFzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0TnVtID0gbnVsbDtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFuY2hvckRhdGFzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGFuY2hvckRhdGFzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5JRCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TnVtID0gZGF0YS5taW5PZmZzZXQgKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdhbmNob3JNb3ZlQmVmb3JlJyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRzQW5jaG9yLmR1cmF0aW9uIDw9IDAgfHwgIW9wdHNBbmNob3IuZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuc2Nyb2xsVG9wKG9mZnNldE51bSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuY2hvck1vdmVBZnRlckJ1Z0Z1bmMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wIDogb2Zmc2V0TnVtXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiBvcHRzQW5jaG9yLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA6IG9wdHNBbmNob3IuZWFzaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgOiBmdW5jdGlvbiAobm93LCB0d2Vlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRDYWxsYmFjaygnYW5jaG9yTW92ZScsIG5vdywgdHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGUgOiAkLnByb3h5KHRoaXMuYW5jaG9yTW92ZUFmdGVyQnVnRnVuYywgdGhpcylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvck1vdmVBZnRlciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmNob3JGb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdhbmNob3JNb3ZlQWZ0ZXInKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuY2hvck1vdmVBZnRlckJ1Z0Z1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYW5jaG9yLmhhc2huYXYgJiYgdGhpcy5zdGlja3lBbmNob3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhhc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW4uY2xlYXJUaW1lb3V0KHRoaXMuYW5jaG9yTW92ZUFmdGVyVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yTW92ZUFmdGVyVGltZW91dCA9IHdpbi5zZXRUaW1lb3V0KCQucHJveHkodGhpcy5vbkFuY2hvck1vdmVBZnRlciwgdGhpcyksIDMwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuY2hvckFjdGl2ZSA6IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUFuY2hvciA9IHRoaXMuc3RpY2t5QW5jaG9yLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yRGF0YXMgPSB0aGlzLmFuY2hvckRhdGFzLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlRGF0YXMgPSBhbmNob3JEYXRhc1tudW1dLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlQ2xhc3MgPSB0aGlzLm9wdHMuYW5jaG9yLmFjdGl2ZUNsYXNzO1xyXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBudW0pID09IHVuZGVmaW5lZCB8fCBudW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5QW5jaG9yLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBzdGlja3lBbmNob3IubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gc3RpY2t5QW5jaG9yLmVxKGkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRIcmVmID0gdGFyZ2V0LmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SHJlZi5yZXBsYWNlKCcjJywgJycpID09PSBhY3RpdmVEYXRhcy5JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5oYXNDbGFzcyhhY3RpdmVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnYWN0aXZlSUQnXSA9IGFjdGl2ZURhdGFzLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5oYXNDbGFzcyhhY3RpdmVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuY2hvckZvY3VzIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyB2YXIgc3RpY2t5QW5jaG9yID0gdGhpcy5zdGlja3lBbmNob3IsXHJcbiAgICAgICAgICAgIC8vICAgICBhbmNob3JUYXJnZXQgPSAkKCcjJyArIHRoaXMuYW5jaG9yVGFyZ2V0KSxcclxuICAgICAgICAgICAgLy8gICAgIGZvY3VzQ2xhc3MgPSAnaGl2ZVN0aWNreWZvY3VzQXJlYScsXHJcbiAgICAgICAgICAgIC8vICAgICBmb2N1c0VsZW1lbnRzID0gJzxzcGFuIGNsYXNzPVwiJyArIGZvY3VzQ2xhc3MgKyAnXCIgdGFiaW5kZXg9XCIwXCIgc3R5bGU9XCJwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7dG9wOjA7d2lkdGg6MXB4O2hlaWdodDoxcHg7Zm9udC1zaXplOjA7bGluZS1oZWlnaHQ6MFwiPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAvLyBpZiAoIWFuY2hvclRhcmdldC5maW5kKCcuJyArIGZvY3VzQ2xhc3MpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyAgICAgYW5jaG9yVGFyZ2V0LnByZXBlbmQoZm9jdXNFbGVtZW50cyk7XHJcbiAgICAgICAgICAgIC8vICAgICBmb2N1c0VsZW1lbnRzID0gYW5jaG9yVGFyZ2V0LmZpbmQoJy4nICsgZm9jdXNDbGFzcykuZm9jdXMoKTtcclxuICAgICAgICAgICAgLy8gICAgIGZvY3VzRWxlbWVudHMub24oJ2ZvY3Vzb3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIGFuY2hvclRhcmdldC5vbignbW91c2Vkb3dub3V0c2lkZSBmb2N1c291dHNpZGUnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYW5jaG9yVGFyZ2V0Lm9mZignbW91c2Vkb3dub3V0c2lkZSBmb2N1c291dHNpZGUnKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoZS50eXBlID09PSAnZm9jdXNvdXRzaWRlJykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gc3RpY2t5QW5jaG9yLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gc3RpY2t5QW5jaG9yLmVxKGkpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRhcmdldEhyZWYgPSB0YXJnZXQuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEhyZWYucmVwbGFjZSgnIycsICcnKSA9PT0gdGhpcy5hbmNob3JUYXJnZXQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0YXJnZXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH0sIHRoaXMpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QW5jaG9yID0gdGhpcy5zdGlja3lBbmNob3IsXHJcbiAgICAgICAgICAgICAgICBhbmNob3JUYXJnZXQgPSAkKCcjJyArIHRoaXMuYW5jaG9yVGFyZ2V0KTtcclxuICAgICAgICAgICAgaWYgKCFhbmNob3JUYXJnZXQubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBmaXJzdEVsZW1lbnQgPSBhbmNob3JUYXJnZXQuZmluZCgnKicpLmZpbHRlcignOnZpc2libGUnKS5maXJzdCgpLmNzcygnb3V0bGluZScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGZpcnN0RWxlbWVudC5hdHRyKHtcclxuICAgICAgICAgICAgICAgICdyb2xlJyA6ICdkaWFsb2cnLFxyXG4gICAgICAgICAgICAgICAgJ3RhYkluZGV4JyA6IC0xXHJcbiAgICAgICAgICAgIH0pLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGZpcnN0RWxlbWVudC5vbignZm9jdXNvdXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQXR0cigndGFiSW5kZXgnKS5jc3MoJ291dGxpbmUnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vZmYoJ2ZvY3Vzb3V0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB3aW4uc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0RWxlbWVudC5yZW1vdmVBdHRyKCdyb2xlJyk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpLCAxNTApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25TY3JvbGxGdW5jIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpblNjcm9sbFRvcCA9ICQod2luKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5zY3JvbGxTdGFydCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMuc2Nyb2xsU3RhcnQgPSB0aGlzLndpblNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZWFzaW5nID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdzdGlja3lNb3ZlQmVmb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxBbmltYXRlRnVuYygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbi5jbGVhclRpbWVvdXQodGhpcy5zY3JvbGxFbmRUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxFbmRUaW1lb3V0ID0gd2luLnNldFRpbWVvdXQoJC5wcm94eSh0aGlzLm9uU2Nyb2xsRW5kRnVuYywgdGhpcyksIDYwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uU2Nyb2xsRW5kRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRzLnNjcm9sbFN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gYW5jaG9yXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRzLmRlc3Ryb3lUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGlja3lBbmNob3IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuY2hvckRhdGFzID0gdGhpcy5hbmNob3JEYXRhcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luU2Nyb2xsVG9wID0gdGhpcy53aW5TY3JvbGxUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4QWN0aXZlS2V5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9ja1Njcm9sbCA9ICQoJ2h0bWwnKS5kYXRhKCdsb2NrU2Nyb2xsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tUeXBlID0gKGxvY2tTY3JvbGwgIT0gbnVsbCkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA9IChsb2NrVHlwZSkgPyBsb2NrU2Nyb2xsLnRvcCA6IHdpblNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFuY2hvckRhdGFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gYW5jaG9yRGF0YXNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubWluT2Zmc2V0IDw9IHNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlS2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubWF4T2Zmc2V0ID4gc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhBY3RpdmVLZXkgPSBwYXJzZUludChrZXksIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKCh0eXBlb2YgYWN0aXZlS2V5KSA9PSB1bmRlZmluZWQgfHwgYWN0aXZlS2V5ID09IG51bGwpIHx8ICgodHlwZW9mIG1heEFjdGl2ZUtleSkgPT0gdW5kZWZpbmVkIHx8IG1heEFjdGl2ZUtleSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVLZXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBtYXhBY3RpdmVLZXkpID09IHVuZGVmaW5lZCB8fCBtYXhBY3RpdmVLZXkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnYWN0aXZlSUQnXSA9IGFuY2hvckRhdGFzW2FuY2hvckRhdGFzLmxlbmd0aCAtIDFdLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIGFjdGl2ZUtleSkgPT0gdW5kZWZpbmVkIHx8IGFjdGl2ZUtleSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvcFsnYWN0aXZlSUQnXSA9IGFuY2hvckRhdGFzWzBdLklEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yQWN0aXZlKGFjdGl2ZUtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmVhc2luZyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lGaXhlZEZ1bmMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdzdGlja3lNb3ZlQWZ0ZXInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lFYXNpbmdGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVVRJTC5jYW5jZWxBRnJhbWUuY2FsbCh3aW4sIHRoaXMuc2Nyb2xsUmVxdWVzdEZyYW1lKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEFuaW1hdGVGdW5jIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0cy5kZXN0cm95VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGlja3lGaXhlZEZ1bmMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ3N0aWNreU1vdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFJlcXVlc3RGcmFtZSA9IFVUSUwucmVxdWVzdEFGcmFtZS5jYWxsKHdpbiwgJC5wcm94eSh0aGlzLnNjcm9sbEFuaW1hdGVGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGlja3lGaXhlZEZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy5vcHRzLnByb3AsXHJcbiAgICAgICAgICAgICAgICBhbGlnbiA9IHRoaXMuYnJlYWtPcHRzLmFsaWduLFxyXG4gICAgICAgICAgICAgICAgYWxpZ25Dc3MgPSB0aGlzLm9wdHMuYWxpZ25Dc3MsXHJcbiAgICAgICAgICAgICAgICB3aW5TY3JvbGxUb3AgPSB0aGlzLndpblNjcm9sbFRvcCxcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbiA9ICh0aGlzLnN0aWNreVBvcyAhPT0gJ3NpZGUnKSA/IHRoaXMuc3BhY2VCZXR3ZWVuIDogMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2NrU2Nyb2xsID0gJCgnaHRtbCcpLmRhdGEoJ2xvY2tTY3JvbGwnKSxcclxuICAgICAgICAgICAgICAgIGxvY2tUeXBlID0gKGxvY2tTY3JvbGwgIT0gbnVsbCkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAobG9ja1R5cGUpID8gbG9ja1Njcm9sbC50b3AgOiB3aW5TY3JvbGxUb3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWxpZ24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ25EYXRhID0gYWxpZ25Dc3NbYWxpZ25dO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb24gPSBzY3JvbGxUb3AgPiAocHJvcC5vZmZzZXRUb3AgLSBzcGFjZUJldHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnJlYWtPcHRzLm92ZXJlZEVsZW1lbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVyQ29uZGl0aW9uID0gc2Nyb2xsVG9wID4gcHJvcC5vdmVyZWRFbGVtZW50c09mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGlnbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGlnbkRhdGEgPSBhbGlnbkNzc1thbGlnbl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IHNjcm9sbFRvcCA8IChwcm9wLmFsaWduQm90dG9tT2Zmc2V0ICsgc3BhY2VCZXR3ZWVuKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGlnbiA9PT0gJ3RvcEFuZEJvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gc2Nyb2xsVG9wID4gKHByb3Aub2Zmc2V0VG9wIC0gc3BhY2VCZXR3ZWVuKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA8IChwcm9wLmFsaWduQm90dG9tT2Zmc2V0ICsgc3BhY2VCZXR3ZWVuKTtcclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPiAocHJvcC5vZmZzZXRUb3AgLSBzcGFjZUJldHdlZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsaWduRGF0YSA9IGFsaWduQ3NzWyd0b3AnXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsVG9wIDwgKHByb3AuYWxpZ25Cb3R0b21PZmZzZXQgKyBzcGFjZUJldHdlZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsaWduRGF0YSA9IGFsaWduQ3NzWydib3R0b20nXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGlja3lXcmFwLmhhc0NsYXNzKHRoaXMub3B0cy5maXhlZENsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2t5V3JhcC5hZGRDbGFzcyh0aGlzLm9wdHMuZml4ZWRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5pc0ZpeGVkQ29uZmxpY3QgJiYgdGhpcy5zdGlja3lQb3MgIT09ICdzaWRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpeGVkV3JhcC5hcHBlbmQodGhpcy5zdGlja3lXcmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGlja3lQb3MgIT09ICdzaWRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2t5V3JhcC5jc3MoYWxpZ25EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0aWNreVdyYXAuaGFzQ2xhc3ModGhpcy5vcHRzLmZpeGVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RpY2t5UG9zICE9PSAnc2lkZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLmNzcyh0aGlzLmFsaWduUmVtb3ZlQ3NzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5maXhlZENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmlzRml4ZWRDb25mbGljdCAmJiB0aGlzLnN0aWNreVBvcyAhPT0gJ3NpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNTdGlja3lXcmFwLmFwcGVuZCh0aGlzLnN0aWNreVdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5icmVha09wdHMub3ZlcmVkRWxlbWVudHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJDb25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RpY2t5V3JhcC5oYXNDbGFzcyh0aGlzLm9wdHMub3ZlcmVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2t5V3JhcC5hZGRDbGFzcyh0aGlzLm9wdHMub3ZlcmVkQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0aWNreVdyYXAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCcgOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdib3R0b20nIDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGlja3lXcmFwLmhhc0NsYXNzKHRoaXMub3B0cy5vdmVyZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5vdmVyZWRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RpY2t5V3JhcC5oYXNDbGFzcyh0aGlzLm9wdHMub3ZlcmVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5vdmVyZWRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0aWNreUVhc2luZ0Z1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBwcm9wID0gdGhpcy5vcHRzLnByb3AsXHJcbiAgICAgICAgICAgICAgICBhbGlnbiA9IHRoaXMuYnJlYWtPcHRzLmFsaWduLFxyXG4gICAgICAgICAgICAgICAgYWxpZ25Dc3MgPSB0aGlzLm9wdHMuYWxpZ25Dc3MsXHJcbiAgICAgICAgICAgICAgICBhbGlnbkRhdGEgPSB7fSxcclxuICAgICAgICAgICAgICAgIHdpblNjcm9sbFRvcCA9IHRoaXMud2luU2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuID0gdGhpcy5zcGFjZUJldHdlZW4sXHJcbiAgICAgICAgICAgICAgICBzaWRlU3RpY2t5RWFzaW5nID0gdGhpcy5zdGlja3lQb3MgPT09ICdzaWRlJyAmJiB0aGlzLm9wdHMuZWFzaW5nICE9IG51bGwsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gOiB0aGlzLm9wdHMuZHVyYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nIDogdGhpcy5vcHRzLmVhc2luZyxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwIDogZnVuY3Rpb24gKG5vdywgdHdlZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0Q2FsbGJhY2soJ3N0aWNreU1vdmUnLCBub3csIHR3ZWVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlIDogJC5wcm94eSh0aGlzLm1vdmVBZnRlckJ1Z0Z1bmMsIHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvY2tTY3JvbGwgPSAkKCdodG1sJykuZGF0YSgnbG9ja1Njcm9sbCcpLFxyXG4gICAgICAgICAgICAgICAgbG9ja1R5cGUgPSAobG9ja1Njcm9sbCAhPSBudWxsKSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA9IChsb2NrVHlwZSkgPyBsb2NrU2Nyb2xsLnRvcCA6IHdpblNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYWxpZ24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2lkZVN0aWNreUVhc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gc2Nyb2xsVG9wID4gcHJvcC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gc2Nyb2xsVG9wID4gKHByb3Aub2Zmc2V0VG9wIC0gc3BhY2VCZXR3ZWVuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduRGF0YVsndG9wJ10gPSBzY3JvbGxUb3AgLSAocHJvcC5vZmZzZXRUb3AgLSBzcGFjZUJldHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkRhdGFbJ3RvcCddID0gKHNpZGVTdGlja3lFYXNpbmcpID8gc3BhY2VCZXR3ZWVuIDogMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGlnbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uID0gc2Nyb2xsVG9wIDwgKHByb3AuYWxpZ25Cb3R0b21PZmZzZXQgKyBzcGFjZUJldHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZGl0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25EYXRhWyd0b3AnXSA9IHNjcm9sbFRvcCAtIChwcm9wLmFsaWduQm90dG9tT2Zmc2V0ICsgc3BhY2VCZXR3ZWVuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25EYXRhWyd0b3AnXSA9IChzaWRlU3RpY2t5RWFzaW5nKSA/IHNwYWNlQmV0d2VlbiA6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWxpZ24gPT09ICd0b3BBbmRCb3R0b20nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IHNjcm9sbFRvcCA+IChwcm9wLm9mZnNldFRvcCAtIHNwYWNlQmV0d2VlbikgfHxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgPCAocHJvcC5hbGlnbkJvdHRvbU9mZnNldCArIHNwYWNlQmV0d2Vlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wID4gKHByb3Aub2Zmc2V0VG9wIC0gc3BhY2VCZXR3ZWVuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduRGF0YVsndG9wJ10gPSBzY3JvbGxUb3AgLSAocHJvcC5vZmZzZXRUb3AgLSBzcGFjZUJldHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPCAocHJvcC5hbGlnbkJvdHRvbU9mZnNldCArIHNwYWNlQmV0d2VlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkRhdGFbJ3RvcCddID0gc2Nyb2xsVG9wIC0gKHByb3AuYWxpZ25Cb3R0b21PZmZzZXQgKyBzcGFjZUJldHdlZW4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkRhdGFbJ3RvcCddID0gKHNpZGVTdGlja3lFYXNpbmcpID8gc3BhY2VCZXR3ZWVuIDogMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGlja3lXcmFwLmhhc0NsYXNzKHRoaXMub3B0cy5maXhlZENsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RpY2t5V3JhcC5hZGRDbGFzcyh0aGlzLm9wdHMuZml4ZWRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dENhbGxiYWNrKCdzdGlja3lNb3ZlQmVmb3JlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0aWNreVdyYXAuc3RvcCgpLmFuaW1hdGUoYWxpZ25EYXRhLCBjYWxsYmFja0RhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RpY2t5V3JhcC5oYXNDbGFzcyh0aGlzLm9wdHMuZml4ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0aWNreVdyYXAucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLmZpeGVkQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0Q2FsbGJhY2soJ3N0aWNreU1vdmVCZWZvcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0aWNreVdyYXAuc3RvcCgpLmFuaW1hdGUoYWxpZ25EYXRhLCBjYWxsYmFja0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblN0aWNreU1vdmVBZnRlciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnc3RpY2t5TW92ZUFmdGVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlQWZ0ZXJCdWdGdW5jIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW4uY2xlYXJUaW1lb3V0KHRoaXMubW92ZUFmdGVyVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUFmdGVyVGltZW91dCA9IHdpbi5zZXRUaW1lb3V0KCQucHJveHkodGhpcy5vblN0aWNreU1vdmVBZnRlciwgdGhpcyksIDMwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uUmVzaXplRnVuYyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aW5XaWR0aCA9IFVUSUwud2luU2l6ZSgpLnc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVzaXplU3RhcnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnJlc2l6ZVN0YXJ0ID0gdGhpcy53aW5XaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQW5pbWF0ZUZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW4uY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRW5kVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplRW5kVGltZW91dCA9IHdpbi5zZXRUaW1lb3V0KCQucHJveHkodGhpcy5vblJlc2l6ZUVuZEZ1bmMsIHRoaXMpLCA2MCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblJlc2l6ZUVuZEZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0cy5yZXNpemVTdGFydCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0cygpO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2Nyb2xsRnVuYygpO1xyXG4gICAgICAgICAgICBVVElMLmNhbmNlbEFGcmFtZS5jYWxsKHdpbiwgdGhpcy5yZXNpemVSZXF1ZXN0RnJhbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzaXplQW5pbWF0ZUZ1bmMgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0cygpO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2Nyb2xsRnVuYygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZVJlcXVlc3RGcmFtZSA9IFVUSUwucmVxdWVzdEFGcmFtZS5jYWxsKHdpbiwgJC5wcm94eSh0aGlzLnJlc2l6ZUFuaW1hdGVGdW5jLCB0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkQ29udHJvbCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRDYWxsYmFjaygnbG9hZEFmdGVyJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdXRDYWxsYmFjayA6IGZ1bmN0aW9uIChpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrVHlwZSA9IGluZy5zZWFyY2goJ2FuY2hvcicpLFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tPYmogPSAoY2FsbGJhY2tUeXBlID49IDApID8gdGhpcy5vcHRzLmFuY2hvcltpbmddIDogdGhpcy5vcHRzW2luZ10sXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBpbmcgPT09ICdzdGlja3lNb3ZlJyB8fCBpbmcgPT09ICdhbmNob3JNb3ZlJztcclxuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGluZywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGluZywgdGhpcy5vcHRzLmNhbGxiYWNrRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrT2JqID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tPYmooYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tPYmoodGhpcy5vcHRzLmNhbGxiYWNrRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDYWxsQmFja0V2ZW50cyA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLm9uKCdkZXN0cm95JywgJC5wcm94eSh0aGlzLmRlc3Ryb3ksIHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5zdGlja3lXcmFwLm9uKCdyZUluaXQnLCAkLnByb3h5KHRoaXMucmVJbml0LCB0aGlzKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuZGVzdHJveVR5cGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVJbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuZGVzdHJveVR5cGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFVUSUwuZW1pdHRlcik7XHJcbiAgICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSB0aGlzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIG5ldyB3aW4uc21nLmV1Q3BbcGx1Z2luTmFtZV0oX3RoaXMuZXEoaW5kZXgpLCBhcmdzKTtcclxuICAgICAgICAgICAgfSkoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkod2luZG93LCB3aW5kb3cualF1ZXJ5LCB3aW5kb3cuZG9jdW1lbnQpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=