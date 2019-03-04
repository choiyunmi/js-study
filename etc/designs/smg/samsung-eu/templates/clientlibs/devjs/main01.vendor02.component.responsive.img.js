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