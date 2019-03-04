/*!
 * samsung.com - Phase2 - Utility Script Defined
 * src : js/src/smg/aem/static/smg.aem.util.js
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

    if('undefined' === typeof win.smg.aem.util) {
        win.smg.aem.util = {};
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        doc = win.document;

    // window safari check
    (function(){
        var anNetscape = (navigator.appName == "Netscape"),
            avMac = (navigator.appVersion.indexOf("Mac") != -1),
            uaSafari = (navigator.userAgent.indexOf("Safari") != -1),
            uaChrome = (navigator.userAgent.indexOf("Chrome") != -1);
        win.isPcSafari = ( anNetscape && !avMac && uaSafari && !uaChrome ) ? true : false;
    })();

    /**
     * @name window.smg.aem.util
     * @namespace
     * @requires jQuery
     * @requires namespace.js
     */
    win.smg.aem.util = (function() {
        return {
            isArray : function(arr) {
                return 'array' === $.type(arr);
            },
            def : function(org, src) {
                for (var prop in src) {
                    if (!hasOwnProperty.call(src, prop)) continue;
                    if ('object' === $.type(org[prop])) {
                        org[prop] = (this.isArray(org[prop]) ? src[prop].slice(0) : this.def(org[prop], src[prop]));
                    } else {
                        org[prop] = src[prop];
                    }
                }
                return org;
            },
            winSize : function() {
                var win_wh = {
                    w : (!win.isPcSafari) ? win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth : $(win).width(),
                    h : (!win.isPcSafari) ? win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight : $(win).height()
                };
                return win_wh;
            },
            getQueryStr : function(href) {
                href = href || win.location.href;

                var vars = {};
                href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                    vars[key] = value;
                });
                return vars;
            },
            winOpener : function(args) {
                var defParams =   {
                    url 		: '//www.samsung.com',
                    name 		: 'smg_opener_' + new Date().getTime(),
                    width 		: 400,
                    height 		: 400,
                    left 		: null,
                    top 		: null,
                    scrollbars	: 'no',
                    toolbar 	: 'no',
                    location 	: 'no',
                    directories : 'no',
                    status 		: 'no',
                    menubar 	: 'no',
                    resizable 	: 'no'
                }, opener, setting, options;

                options 		= win.smg.util.def(defParams, (args || {}));
                options.left 	= options.left || ( screen.width / 2 - options.width / 2 );
                options.top 	= options.top || ( screen.height / 2 - options.height / 2 );
                setting = '';

                for( var prop in options ) {
                    if( prop != 'url' && prop != 'name' ) {
                        setting += ',' + prop + '=' + options[ prop ];
                    }
                }
                setting = setting.substr( 1, setting.length );
                opener = window.open( options.url, options.name, setting );
                return opener;
            },
            imgLoader : function(img, callback) {
                img.each(function() {
                    var cb = (callback || function() {});
					/*for IE 10-*/
                    if (this.complete || $(this).height() > 0) {
                        cb.apply(img);
                    } else {
                        $(this).load(function() {
                            cb.apply(img);
                        });
                    }
                });
            },
            vwOrientationUpdate : function(css) {
                $(win).on('orientationchange', function() {
                    var vwElem = $(css || '.js-vw');
                    if (!vwElem.size()) {
                        return;
                    }
                    vwElem.css('display', 'none').height();
                    vwElem.css('display', '');
                });
            },
            iPadVWRender : function() {
                if (navigator.userAgent.match(/iPad/i)) {
                    this.vwOrientationUpdate('.js-vw');
                }
            },
            Cookie : function() {
                var defParams = {
                    expires : '', path: '/', domain : '', secure : ''
                };

                return {
                    setCookie : function(cname, cvalue, exdays) {
                        var d = new Date();
                        d.setTime(d.getTime() + ((exdays || 0) * 24 * 60 * 60 * 1000));

                        var opt = win.smg.aem.util.def(defParams, { expires : d });
                        document.cookie = [
                            cname, '=', cvalue,
                            opt.expires ? '; expires=' + opt.expires.toUTCString() : '',
                            opt.path    ? '; path=' + opt.path : '',
                            opt.domain  ? '; domain=' + opt.domain : '',
                            opt.secure  ? '; secure' : ''
                        ].join('');
                    },
                    getCookie : function(cname) {
                        var name = cname + '=',
                            ca = document.cookie.split(';'),
                            c;

                        for(var i=0, leng=ca.length; i<leng; i++) {
                            c = ca[i];
                            while (c.charAt(0)==' ') {
                                c = c.substring(1);
                            }
                            if (c.indexOf(name) != -1) {
                                return c.substring(name.length,c.length);
                            }
                        }
                        return '';
                    }
                };
            },
            loadCSS : function(urls, cb, nocache) {
                if (!urls || 'string' === $.type(urls)) urls = [urls];

                var head = $('head'), dfds = [];
                $.map(urls, function(url) {
                    var _dfd = $.Deferred();
                    dfds.push(_dfd);
                    $('<link>').attr({
                        'rel' : 'stylesheet', type : 'text/css',
                        href : url + (!!nocache ? '?_ts=' + new Date().getTime() : '')
                    }).appendTo(head).load(function() {
                        _dfd.resolve();
                    });
                });

                $.when.apply($, dfds).done(function() {
                    if ($.isFunction(cb)) cb();
                });
            },
            getServerTime : function(callBack, serverUrl) {
                serverUrl = serverUrl || window.location.href.toString();
                callBack = callBack || function() {};

                $.ajax({
                    url : serverUrl,
                    async : false,
                    cashe : false
                })
                    .done(function(res, status, xhr) {
                        callBack(new Date(xhr.getResponseHeader('Date')));
                    });
            },
            getRestrictBytes : function(str, maxBytes) {
                var strLeng = str.length,
                    rByte = 0,
                    rLen = 0,
                    strChar = '';

                maxBytes = maxBytes || 100;

                for (var i=0; i<strLeng; i++) {
                    strChar = str.charAt(i);
                    if (escape(strChar).length > 4) {
                        rByte += 2;
                    } else {
                        rByte++;
                    }

                    if(rByte <= maxBytes) {
                        rLen = i+1;
                    }
                }

                return {
                    bytes : rByte,
                    rectLeng : rLen
                }
            },
            isAemEditMode : function() {
                var flag = false;
                if (win.parent && win.frameElement && $(win.parent.document).find('.foundation-authoring-ui-mode').size()) {
                    flag = true;
                }
                return flag;
            },
            slickOptionControlFuncs : {
                changeOpt : function(targetCarousel, targetOpt, eachDataTarget) {
                    var dataSlickOpt = targetCarousel.data('slick-opt');
                    if (dataSlickOpt !== undefined) {
                        var	changeOpt = $.extend(true, {}, targetOpt),
                        autoSlide = dataSlickOpt.autoSlideOpts.autoSlide,
                        autoSlideTime = dataSlickOpt.autoSlideOpts.autoSlideTime,
                        isInfinite = dataSlickOpt.infinite;

                        changeOpt.autoplay = autoSlide;
                        changeOpt.autoplaySpeed = autoSlideTime;
                        changeOpt.infinite = isInfinite;

                        if (targetOpt.responsive) {
                            changeOpt.responsive[0].settings.infinite = isInfinite;
                        }
                        
                        targetCarousel.data('isAutoSlide', autoSlide);
                        if (eachDataTarget !== undefined) {
                            eachDataTarget.data('isAutoSlide', autoSlide);
                        }
                        return changeOpt;
                    } else {
                        return targetOpt;
                    }
                },
                setToggleButton: function(targetCarousel) {
                    var isAutoSlide = targetCarousel.data('isAutoSlide');
                    targetCarousel = (targetCarousel.hasClass('s-slick')) ? targetCarousel : targetCarousel.find('.s-slick');
                    if (isAutoSlide === undefined || isAutoSlide === false) {return;}
                    if (!targetCarousel.find('.slick-dots').length && !targetCarousel.siblings('.s-slick-dots').find('.slick-dots').length) {return;}
                    var dotsStr = '';
                    var toggleBtnWrap;
                    var dotsAppendEl;
                    var appendType;

                    if (isAutoSlide) {
                        dotsStr += '<li class="slick-dots-autoplay">';
                        dotsStr += '<button class="s-autoplay-pause">Auto Play</button>';
                        dotsStr += '</li>';
                    } else {
                        dotsStr += '<li class="slick-dots-autoplay">';
                        dotsStr += '<button class="s-autoplay-play">Auto Play</button>';
                        dotsStr += '</li>';
                    }

                    if (targetCarousel.find('.slick-dots').length) {
                        dotsAppendEl = targetCarousel.find('.slick-dots');
                        appendType = 'smg';
                    } else if (targetCarousel.siblings('.s-slick-dots').length) {
                        dotsAppendEl = targetCarousel.siblings('.s-slick-dots').find('.slick-dots');
                        appendType = 'cl';
                    }

                    if (dotsAppendEl.length) {
                        dotsAppendEl.append($(dotsStr));
                        toggleBtnWrap = dotsAppendEl.find('.slick-dots-autoplay');
                    }

                    var getToggleButtonStatus = function(toggleBtn) {
                        if (toggleBtn.hasClass('s-autoplay-pause')) {
                            targetCarousel.slick('slickPlay');
                        } else {
                            targetCarousel.slick('slickPause');
                        }
                    };

                    var autoSlideToggleHandler = function(e) {
                        var toggleBtn = $(e.currentTarget).find('> button');
                        if (toggleBtn.hasClass('s-autoplay-pause')) {
                            toggleBtn.removeClass('s-autoplay-pause');
                            toggleBtn.addClass('s-autoplay-play');
                            targetCarousel.slick('slickPause');
                        } else {
                            toggleBtn.removeClass('s-autoplay-play');
                            toggleBtn.addClass('s-autoplay-pause');
                            targetCarousel.slick('slickPlay');
                        }
                    };

                    var bindToggleClickEvent = function() {
                        toggleBtnWrap.off('click.smgaemutil').on('click.smgaemutil', autoSlideToggleHandler);
                    };
            
                    var breakpointChangeHandler = function(e) {
                        var target = targetCarousel.data('detachedButton');
                        var	appendType = targetCarousel.data('appendType');
                        
                        if (appendType === 'smg') {
                            targetCarousel.find('.slick-dots').append(target);
                        } else if (appendType === 'cl') {
                            targetCarousel.siblings('.s-slick-dots').find('.slick-dots').append(target);
                        }
                        
                        bindToggleClickEvent();
                        getToggleButtonStatus(target.find('> button'));
                    };

                    targetCarousel.data('detachedButton', toggleBtnWrap);
                    targetCarousel.data('appendType', appendType);
                    targetCarousel.off('breakpoint.smgaemutil').on('breakpoint.smgaemutil', breakpointChangeHandler);
                    bindToggleClickEvent();
                }
            }
        };
    })();

    win.smg.aem.util.cookie = new win.smg.aem.util.Cookie();

    $(function() {
        win.smg.aem.util.iPadVWRender();
    });
})(window, window.jQuery);