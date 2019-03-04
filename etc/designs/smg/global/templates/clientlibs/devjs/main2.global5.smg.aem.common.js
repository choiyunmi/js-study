/*!
 * samsung.com - Phase2 - Common Script Defined
 * src : js/src/smg/aem/common/smg.aem.common.js
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

	if('undefined' === typeof win.smg.aem.common) {
		win.smg.aem.common = {};
	}

	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	/**
	 * @name window.smg.aem.common
	 * @namespace
	 * @requires jQuery
	 * @requires namespace.js
	 * @requires window.smg.aem.static.js
	 * @requires window.smg.aem.util.js
	 * @requires window.smg.aem.event.js
	 */
	win.smg.aem.common = (function() {
		return {
			init : function() {
				this.detection();

				this.responsiveName = '';
				this.responsiveNameEx = '';
				this.responsiveGNB = '';
				this.responsiveGNBEx = '';


				$('body').on(CST_EVENT.RESPONSIVE.GET_STATUS, $.proxy(this.resizeListener, this));
				$(win).on('resize', $.proxy(this.resizeListener, this));
				this.resizeListener();

				this.skipNavgation =  $(".s-skip-content").children();
				this.skipNavgation.on('click', $.proxy(this.skipNavgationFunc, this));

				return this;
			},
			detection : function() {
				// SVG Support Check
				if (!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')) {
					$('body').addClass(V_STATIC.SUPPORT.NO_SVG);
				}

				// IE lt 8 Check
				if (document.all && !document.addEventListener) {
					$('body').addClass(V_STATIC.SUPPORT.IE_LT_8);
				}

				// CSS3 Support Check
				var thisBody = document.body || document.documentElement,
				thisStyle = thisBody.style,
				css3support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
				if (!css3support) {
					$('body').addClass(V_STATIC.SUPPORT.NO_CSS3);
				}

				// Touch Support Check
				var supportsTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
				if (supportsTouch) {
					$('body').addClass(V_STATIC.SUPPORT.TOUCH_DEVICE);
				}
			},
			resizeListener : function(e) {
				var winWidth = UTIL.winSize().w;

				if (winWidth <= V_STATIC.RESPONSIVE.MOBILE.WIDTH) {
					this.responsiveName = V_STATIC.RESPONSIVE.MOBILE.NAME;
				} else if (winWidth <= V_STATIC.RESPONSIVE.TABLET.WIDTH) {
					this.responsiveName = V_STATIC.RESPONSIVE.TABLET.NAME;
				} else {
					this.responsiveName = V_STATIC.RESPONSIVE.DESKTOP.NAME;
				}

				if (winWidth <= V_STATIC.RESPONSIVE.GNB.WIDTH) {
					this.responsiveGNB = V_STATIC.RESPONSIVE.GNB.NAME;
				} else {
					this.responsiveGNB = '';
				}

				if (this.responsiveName !== this.responsiveNameEx || this.responsiveGNB !== this.responsiveGNBEx) {
					this.responsiveNameEx = this.responsiveName;
					this.responsiveGNBEx = this.responsiveGNB;
					$('body').trigger(CST_EVENT.RESPONSIVE.CHANGE, { RESPONSIVE_NAME : this.responsiveName, RESPONSIVE_GNB_NAME : this.responsiveGNB, isMobile : winWidth <= V_STATIC.RESPONSIVE.MOBILE.WIDTH });
				}

				if (e && e.type === CST_EVENT.RESPONSIVE.GET_STATUS) {
					$('body').trigger(CST_EVENT.RESPONSIVE.CHANGE, { RESPONSIVE_NAME : this.responsiveName, RESPONSIVE_GNB_NAME : this.responsiveGNB, isMobile : winWidth <= V_STATIC.RESPONSIVE.MOBILE.WIDTH });
				}
			},
			skipNavgationFunc : function(e) {
				e.preventDefault();
				var targetObjectSelector = $(e.currentTarget).attr("href");
				if (targetObjectSelector == '#accHelp') {
					$(targetObjectSelector).focus();
				}else{
					$(targetObjectSelector).attr('tabindex', -1).focus().removeAttr('tabindex','');
				}
			}
		};
	})();

	var common;
	$(function() {
		common = win.smg.aem.common.init();
	});

	// confrict samsung.min.js - resize
	$(win).on('resize', function(e) {
		if (!common || !common.resizeListener) return;
		common.resizeListener.call(common, e);
	});
})(window, window.jQuery);




// contents height matching
;(function (win, $) {
	'use strict';

	if( typeof $.fn.heightMatch === 'function') $.fn.heightMatch = function() {};
	
	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	win._heightMatch = function (container, options) {
		var defParams = {
			compType : 'list',
			listWrap : '',
			isListMatch : true,
			targetElements : [],
			matchAlignIgnore : '',
			matchAlign : 0,
			matchAttr : 'height',
			forceMobile: false
		};
		this.container = container;
		this.opts = UTIL.def(defParams, (options || {}));

		this.init();
	};
	win._heightMatch.prototype = {
		init : function () {
			this.setElements();
			this.bindEvents();
			this.maxHeightBuildChk();
		},
		setElements : function () {
			this.$body = $('body');
			this.IS_MOBILE_MODE = false;
			this.obj = this.getTargetElement();
			this.isColumns = this.obj.hasClass('cm-columns__item');
			this.columnLineClass = 'is-active-line';
			this.opts.matchAlign = (this.opts.matchAlign > 0) ? this.opts.matchAlign : this.obj.length;
			this.maxLine = Math.ceil(this.obj.length / this.opts.matchAlign);
			this.setTime = 500;
		},
		getTargetElement : function () {
			if(this.container.hasClass(this.opts.targetElements.substring(1))) {
				return this.container;
			} else {
				return this.container.find(this.opts.targetElements);
			}
		},
		bindEvents : function () {
			this.$body.on(CST_EVENT.RESPONSIVE.CHANGE, $.proxy(this.onResponsiveChange, this));
			this.$body.trigger(CST_EVENT.RESPONSIVE.GET_STATUS);
			$(win).on('resize orientationchange', $.proxy(this.resizeFunc, this));
		},
		resizeFunc : function () {
			this.maxHeightBuildChk();
		},
		maxHeightBuildChk : function () {
			if(this.IS_MOBILE_MODE){
				this.maxHeightBuild(false);
			}else{
				this.maxHeightBuild(true);
			}
		},
		maxHeightBuild : function (type) {
			var setTime = this.setTime;
			if(this.opts.compType == 'carousel' && !this.IS_MOBILE_MODE) {
				setTime = 800;
			}
			if(this.isColumns) {
				setTime += 1000;
			}

			if (this.opts.forceMobile) {
				type = true;
			}

			if(type){
				setTimeout($.proxy(function() {
					var heightArray = [];
					for (var i = 0; i < this.maxLine; i++) {
						heightArray[i] = [];
					}
					for (var i = 0, max = this.obj.length; i < max; i++) {
						this.obj.eq(i).outerHeight('');
						var _arrayIndex = parseInt((i / this.opts.matchAlign), 10),
						_height   = this.obj.eq(i).outerHeight();
						heightArray[_arrayIndex].push(_height);
					}
					for (var i = 0; i < this.maxLine; i++) {
						heightArray[i] = Math.max.apply(null, heightArray[i]);
					}
					for (var i = 0, max = this.obj.length; i < max; i++) {
						var _arrayIndex = parseInt((i / this.opts.matchAlign), 10);
						var current   = this.obj.eq(i);
						if(heightArray[_arrayIndex] > 0) {
							current.css(this.opts.matchAttr, heightArray[_arrayIndex]);
						}
					}
					this.obj.closest('.cm-columns--separation-line').addClass(this.columnLineClass);
					if(this.opts.compType == 'carousel') {
						if(this.container.closest('.s-slick').hasClass('slick-initialized')) this.container.closest('.s-slick').slick('setPosition');
					}
				}, this), setTime);
			} else {
				for (var i = 0, max = this.obj.length; i < max; i++) {
					this.obj.eq(i).outerHeight('');
				}
				setTimeout($.proxy(function() {
					if(this.IS_MOBILE_MODE) {
						if(this.container.closest('.s-slick').hasClass('slick-initialized')) this.container.closest('.s-slick').slick('setPosition');
					}
				}, this), setTime);
			}
		},
		onResponsiveChange : function(e, data) {
			if (data.RESPONSIVE_NAME === V_STATIC.RESPONSIVE.MOBILE.NAME) {
				this.IS_MOBILE_MODE = true;
			} else {
				this.IS_MOBILE_MODE = false;
			}
		}
	};

	$.fn.heightMatch = function (options) {

		if(!options.matchElements || !$(this).length) return;

		var cardWrap    = $(this),
			child       = cardWrap.find(options.listWrap);

		if(!options.listWrap) child = cardWrap;

		if(options.compType == 'list' && child.length <= 1) return;

		if(options.compType == 'carousel') options.isListMatch = false;

		if(options.forceMobile) {
			this.IS_MOBILE_MODE = true;
		}

		if(options.isListMatch) options.matchElements.push(options.listWrap);

		if(options.matchAlignIgnore) {
			if(cardWrap.children(options.matchAlignIgnore).length) {
				options.matchAlign = 0;
			}
		}
		for(var prop in options.matchElements) {
			options.targetElements = options.matchElements[prop];
			new win._heightMatch(child, options);
		}
	};
})(window, window.jQuery);

;(function (win, $) {
	'use strict';
	if( typeof $.fn.listSeeMore === 'function') $.fn.listSeeMore = function() {};

	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	$.fn.listSeeMore = function (options) {
		var defParams = {
			useSeeMore : 's-use-seemore',
			component : '',
			listItems : '',
			moreBtn : '.s-btn-encased',
			appendType : false,
			itemVisible : '',
			itemActive : 'is-item-active',
			itemInterval : 100,
			perPageDefault : {
				pc : 9,
				mo : 6
			},
			perPageNum : {
				pc : 'data-pc-per-page',
				mo : 'data-mo-per-page'
			},
			heightMatch : {
				hasComponent : [],
				matchElements : [],
				matchAlign : 3
			},
			masonry : {
				hasComponent : [],
				itemWrap : '',
				items : ''
			},
			scrollView : true,
			scrollViewIgnore : [],
			moreIntervalView : true,
			moreIntervalViewIgnore : [],
			beforeFunc : null,
			afterFunc : null
		};
		var opts = UTIL.def(defParams, (options || {}));
		var $components = $(opts.component);
		var $body = $('body');
		var isMobile = null;

		var setBindEvents = function() {
			$body.on(CST_EVENT.RESPONSIVE.CHANGE, onResponsiveChange);
			$body.trigger(CST_EVENT.RESPONSIVE.GET_STATUS);
			$components.on('click', opts.moreBtn, onViewMore);
		}
		var setMasonry = (function() {

			var $html = $('html');

			var eventList = {

				masonry : function( el ){

					if ( $html.hasClass('rtl') ) {

						el.addClass('js-masonry-load').masonry({
							itemSelector: eventList.items,
							horizontalOrder: true,
							originLeft: false
						});

					} else {

						el.addClass('js-masonry-load').masonry({
							itemSelector: eventList.items,
							percentPosition: true,
							horizontalOrder: true
						});

					}

		
				},

				loadCheck: function( el, container, cb ){

					var loadCount = 0;
					var elLength = el.length;

					for (var i = 0; i < elLength; i++){

						var img = new Image();
						
						img.src = el.eq(i).attr('src');

						img.onload = function(){

							loadCount += 1;
							
							if ( loadCount == elLength ) cb(container);
							
						}

					};

				},

				actMasonry: function( container, $items ){

					var itemsImage = $items.find('img');

					if(!container.length) return;

					eventList.loadCheck(itemsImage, container, eventList.masonry);

				}

			};

			var init = function(mComponent, itemWrap, items){

				var $components = mComponent;
				var $componentList = $components.find(itemWrap);
				var $items = $components.find(items);

				if ( UTIL.isAemEditMode() ) return;
				if (!$components.length) return;
				if (!$items.length) return;
				if (typeof $.fn.masonry != 'function') return;
				
				eventList.items = items;
				eventList.actMasonry( $componentList, $items );

			};

			return {

				init: init
				
			}
		})();
		var onResponsiveChange = function(e, data) {
			if (data.RESPONSIVE_NAME === V_STATIC.RESPONSIVE.MOBILE.NAME) {
				isMobile = true;
			} else {
				isMobile = false;
			}
		}

		var onViewMore = function(e) {
			e.preventDefault();
			var $current = $(e.currentTarget),
				$component = $current.closest(opts.component);
			var isPromoFeed = true,
				isViewMore = true;

			if($component.length) {
				setViewMoreCTA.init({
					component : $component, 
					isViewMore : isViewMore,
					isPromoFeed : isPromoFeed
				});
			}
		}

		var setViewMoreCTA = {
			getIsInterval : function($component) {

				var isInterval = opts.moreIntervalView;
				
				if(opts.moreIntervalViewIgnore.length > 1) {
					for(var a = 0; a < opts.moreIntervalViewIgnore.length; a++) {
						if(opts.moreIntervalViewIgnore[a]) {
							if($component.hasClass(opts.moreIntervalViewIgnore[a])) {
								isInterval = false;
							}
						}
					}
				} else {
					if(opts.moreIntervalViewIgnore[0]) {
						if($component.hasClass(opts.moreIntervalViewIgnore[0])) {
							isInterval = false;
						}
					}
				}
				return isInterval;
			},
			getViewCnt : function($component) {
				var viewCnt = 0;
				if(isMobile) {
					viewCnt = ($component.attr(opts.perPageNum.mo)) ? parseInt($component.attr(opts.perPageNum.mo)) : opts.perPageDefault.mo;
				} else {
					viewCnt = ($component.attr(opts.perPageNum.pc)) ? parseInt($component.attr(opts.perPageNum.pc)) : opts.perPageDefault.pc;
				}
				return viewCnt;
			},
			setItemActive : function($component, cnt) {
				$component.find(opts.listItems + ':lt(' + (cnt) + ')').addClass(opts.itemActive);
			},
			hideMoreCTA : function($component, $cta) {
				if(opts.appendType) {

				} else {
					if(!$component.find(opts.listItems + ':not(:visible)').length && $cta.length && $cta.is(':visible')) {
						$cta.css('display', 'none');
					}
				}
			},
			getIsMathchHeight : function($component) {
				var hComponent = '';
				if(opts.heightMatch.hasComponent && opts.heightMatch.matchElements) {
					for(var i = 0; i < opts.heightMatch.hasComponent.length; i++) {
						if(opts.heightMatch.hasComponent[i]) {
							if($component.hasClass(opts.heightMatch.hasComponent[i])) {
								hComponent = true;
							}
						}
					}
				}
				return hComponent;
			},
			getIsMasonry : function($component) {
				var mComponent = '';
				if(opts.masonry.hasComponent && opts.masonry.itemWrap && opts.masonry.items) {
					for(var a = 0; a < opts.masonry.hasComponent.length; a++) {
						if(opts.masonry.hasComponent[a]) {
							if($component.hasClass(opts.masonry.hasComponent[a])) {
								mComponent = true;
							}
						}
					}
				}
				return mComponent;
			},
			init : function(info) {
				var $cta = info.component.find(opts.moreBtn),
					$items = info.component.find(opts.listItems),
					$viewList;
				var viewCnt = this.getViewCnt(info.component),
					isInterval = this.getIsInterval(info.component),
					mComponent = this.getIsMasonry(info.component),
					hComponent = this.getIsMathchHeight(info.component);



				if(!UTIL.isAemEditMode()) {
					if(info.component.hasClass(opts.useSeeMore)) {
						var cnt = viewCnt,
							visibleLength = info.component.find(opts.listItems + ':visible').length;

						if(info.isViewMore) {
							cnt = visibleLength + viewCnt;
						} else {
							if(!$cta.length) {
								cnt = $items.length;
								viewCnt = $items.length;
							}
						}

						if(opts.beforeFunc != null) opts.beforeFunc(info.component, isMobile);

						this.setItemActive(info.component, cnt);
						this.hideMoreCTA(info.component, $cta);

						if(isInterval) {

							setTimeout(function() {

								if(hComponent) columnMatch(info, (cnt - viewCnt - 1));

								setTimeout(function() {
									var k = visibleLength;
									var interval = setInterval(function() {
										if(k == cnt) {
											clearInterval(interval);
											if(mComponent) {
												setTimeout(function() {
													if(opts.afterFunc != null) opts.afterFunc(info.component, isMobile);
													setMasonry.init(info.component, opts.masonry.itemWrap, opts.masonry.items);
												}, 100);
											} else {
												if(opts.afterFunc != null) opts.afterFunc(info.component, isMobile);
											}
										} else {
											$items.eq(k).addClass(opts.itemVisible);
											k++;
										}
									}, opts.itemInterval);
								}, 400);

							}, 100);

						} else {
							
							if(mComponent || hComponent) {
								for(var k = visibleLength; k <= cnt; k++) {
									if(k == cnt) {
										setTimeout(function() {
											if(mComponent) {
												setMasonry.init(info.component, opts.masonry.itemWrap, opts.masonry.items);
											}
											if(hComponent) {
												columnMatch(info, (cnt - viewCnt - 1));
											}
											if(opts.afterFunc != null) opts.afterFunc(info.component, isMobile);
										}, 100);
									} else {
										$items.eq(k).addClass(opts.itemVisible);
									}
								}
							} else {
								$items.addClass(opts.itemVisible);
								if(opts.afterFunc != null) opts.afterFunc(info.component, isMobile);
							}
						}
					} else {
						var cnt = $items.length,
							viewCnt = $items.length;
						if(mComponent) {
							setMasonry.init(info.component, opts.masonry.itemWrap, opts.masonry.items);
						}
						if(hComponent) {
							columnMatch(info, (cnt - viewCnt - 1));
						}
						info.isViewMore = false;
						if(opts.afterFunc != null) opts.afterFunc(info.component, isMobile);
					}
				}
			}
		}

		var columnMatch = function(info, cnt){
			var cnt = parseInt(cnt) || 0;
			var listWrap = opts.listItems;


			if(info.component.hasClass('cm-columns--separation-line')) {
				if(info.component.hasClass('cm-columns--2columns')) {
					opts.heightMatch.matchAlign = 2;
				} else if(info.component.hasClass('cm-columns--3columns')) {
					opts.heightMatch.matchAlign = 3;
				} else if(info.component.hasClass('cm-columns--4columns')) {
					opts.heightMatch.matchAlign = 4;
				} else if(info.component.hasClass('cm-columns--5columns')) {
					opts.heightMatch.matchAlign = 5;
				}
			}

			if(info.isViewMore) {
				listWrap = opts.listItems + ':gt(' + cnt + ')';
			}

			info.component.heightMatch({
				listWrap      : listWrap,
				matchAlignIgnore  : '.slick-initialized',
				matchElements     : opts.heightMatch.matchElements,
				matchAlign : opts.heightMatch.matchAlign
			});
		}

		var initDA = function($component, isScroll) {
			if(isScroll && (typeof $.fn.feature == 'function') && $component.hasClass(opts.useSeeMore)) {
				$component.feature({
					onVisible : function($target) {
						if(!$target.hasClass('js-feature-loaded')) {
							var isPromoFeed = true;
							var isViewMore = false;
							$target.addClass('js-feature-loaded');
							setViewMoreCTA.init({
								component : $target, 
								isViewMore : isViewMore,
								isPromoFeed : isPromoFeed
							});
						}
					}
				});
			} else {
				if(!$component.hasClass('js-feature-loaded')) {
					var isPromoFeed = true;
					var isViewMore = false;
					$component.addClass('js-feature-loaded');
					setViewMoreCTA.init({
						component : $component, 
						isViewMore : isViewMore,
						isPromoFeed : isPromoFeed
					});
				}
			}
		}

		var getIsScroll = function($component) {

			var isScroll = opts.scrollView;
			
			if(opts.scrollViewIgnore.length > 1) {
				for(var a = 0; a < opts.scrollViewIgnore.length; a++) {
					if(opts.scrollViewIgnore[a]) {
						if($component.hasClass(opts.scrollViewIgnore[a])) {
							isScroll = false;
						}
					}
				}
			} else {
				if(opts.scrollViewIgnore[0]) {
					if($component.hasClass(opts.scrollViewIgnore[0])) {
						isScroll = false;
					}
				}
			}
			return isScroll;
		}


		var init = function() {

			var $component;
			var isScroll = opts.scrollView;

			setBindEvents();
			if(opts.scrollView) {
				for(var i = 0; i < $components.length; i++) {
					$component = $components.eq(i);
					isScroll = getIsScroll($component);
					initDA($component, isScroll);
				}
			} else {
				for(var i = 0; i < $components.length; i++) {
					$component = $components.eq(i);
					initDA($component, false);
				}
			}
		}
		init();
	}

	if( typeof $.getI18nDiction === 'function') $.getI18nDiction = function() {};
	$.getI18nDiction = function (key, text) {

		if ('undefined' === typeof Granite) {
			return text;
		}
		if ('undefined' === typeof Granite.I18n) {
			return text;
		}

		Granite.I18n.setLocale($('#siteCode').val());
		return Granite.I18n.get(key, [], $('#siteCode').val()) || text;

	}
})(window, window.jQuery);