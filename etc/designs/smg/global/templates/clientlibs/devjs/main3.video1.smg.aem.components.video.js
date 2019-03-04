/*!
 * samsung.com - Phase2 - Video Components
 * src : js/src/smg/aem/components/video/smg.aem.components.video.js
 *
 * @version 1.0.0
 * @since 2016.03.18
 */
;(function (win, $, jQuery) {
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

	if('undefined' === typeof win.smg.aem.components.video) {
		win.smg.aem.components.video = {};
	}

	if ($().jquery !== jQuery().jquery) {
		if (jQuery.fn.bcChromePlayer) {
			$ = jQuery;
		}
	}

	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util;

	var namespace = win.smg.aem.components;

	/**
	 * @name window.smg.aem.components.video
	 * @namespace
	 * @requires jQuery
	 * @requires namespace.js
	 * @requires window.smg.static.js
	 * @requires window.smg.util.js
	 */
	namespace.video = (function() {
		/**
		 * @description Default Options
		 * @private
		 * @type {Object}
		 */
		var defParams = {
			videos : '.js-video',
			ctaPlayVideo: '.js-pop-btn, button.js-video',
			youtube : {
				iframe : '<iframe src=\'about:blank\' frameborder=\'0\' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
				embedSrc : 'https://www.youtube.com/embed/{{VIDEO_ID}}?wmode=opaque&rel=0&enablejsapi=1&version=3',
				autoPlay : 'false'
			},
			brightcove : {
				playerType : '',
				countryCode : '',
				divID : '',
				videoTagID : '',
				videoID : '',
				videoWidth : '100%',
				videoHeight : '100%',
				autoPlay : 'false',
				captionURL : ''
			},
			mp4: {
				//videoElement: '<video src="" playsinline title="" class="s-video"></video>',
				videoElement: '<video playsinline class="s-video" controlsList="nodownload"><source src="" type="video/mp4"></video>',
				title: '',
				videoURL: '',
				imgURL : '',
				autoplay: 'false',
				mute: 'false',
				controls: 'false',
				playBtn: '.s-mp4-video-play, .js-pop-btn'
			},
			aparat : {
				iframe : '<iframe src=\'about:blank\' frameborder=\'0\' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
				embedSrc : 'https://www.aparat.com/video/video/embed/vt/frame/pid/0/showadstart/no/showvideo/yes/videohash/{{VIDEO_ID}}',
				autoPlay : 'false'
			},
		};
		return {
			init : function(container, args) {
				if (!(this.container = container).size()) return;

				defParams.brightcove.templateReadyHandler = $.proxy(this.onBrightCoveTemplateReadyHandler, this);

				this.opts = UTIL.def(defParams, (args || {}));

				this.youtubeOpt = this.opts.youtube;
				this.brightcoveOpt = this.opts.brightcove;
				this.mp4Opt = this.opts.mp4;
				this.aparatOpt = this.opts.aparat;
				this._brightcoveOpt = null;
				this.youtubeIframe = null;
				this.aparatIframe = null;
				this.mp4VideoElement = null;

				this.setElements();
				this.bindEventHandlers();
				this.setCreateEmbedVideo();
				this.ie8HidePlayButton();
			},
			setElements : function() {
				this.videosEmbed = this.container.find(this.opts.videos).filter(function(){
					return $(this).attr('data-vid-view') === 'embed';
				});
				this.videosLayer = this.container.find(this.opts.videos).filter(function(){
					return $(this).attr('data-vid-view') === 'layer';
				});
			},
			bindEventHandlers : function(){
				if (document.documentMode <= 10) {
					$(this.opts.ctaPlayVideo).on('click.checkOldBrowserLayerVideo', $.proxy(this.checkOldBrowserLayerVideo, this));
				}
				$(document).on('click', this.opts.videos, $.proxy(this.setCreateLayerVideo, this));
			},
			ie8HidePlayButton : function() {
				if (document.documentMode === 8) {
					$(this.opts.mp4.playBtn).filter('[data-vid-type="mp4"]').css('display', 'none');
					$(this.opts.videos).filter('[data-vid-type="mp4"]').find(this.opts.mp4.playBtn).css('display', 'none');
				}				
			},
			setCreateEmbedVideo : function() {
				// embed
				var _this = this;
				for(var i=0,max=this.videosEmbed.length; i<max; i++){
					(function(index){
						var _target = _this.videosEmbed.eq(index),
						videoView = _target.data('vid-view'),
						videoType = _target.data('vid-type'),
						videoData = _target.data('vid-data');
						switch(videoType) {
							case 'youtube':
								_this.setYoutube(videoData);
								break;
							case 'brightcove':
								_this.setBrightCove(videoData);
								break;
							case 'mp4':
								_this.setMp4Player(videoData, videoView, _target, i);
								break;
							case 'aparat':
								_this.setAparat(videoData);
								break;
						}
					})(i);
				};
			},
			setCreateLayerVideo : function(e) {
				e.stopPropagation();
				// layer
				var _target = $(e.currentTarget),
				videoView = _target.data('vid-view'),
				videoType = _target.data('vid-type'),
				videoData = _target.data('vid-data'),
				homeComponent = _target.closest('.js-home-components');
				if(videoView === 'embed') return;
				_target.attr('data-vid-btn-idx', this.videosLayer.index(_target));
				$('#' + videoData.divID).attr('data-vid-btn-idx', _target.attr('data-vid-btn-idx'));
				switch(videoType) {
					case 'youtube':
						this.setYoutube(videoData);
						break;
					case 'brightcove':
						this.setBrightCove(videoData);
						break;
					case 'mp4':
						this.setMp4Player(videoData, videoView, _target, _target.attr('data-vid-btn-idx'));
						break;
					case 'aparat':
						this.setAparat(videoData);
						break;
				}
				if (homeComponent.size()) {
					homeComponent.addClass('s-video-open');
				}

				if(videoView === 'layer') {
					this.container.addClass('video-layer-open');
				}

				$('#' + videoData.divID).closest('.video-area_5').off('aem_hide', $.proxy(this.onAemHide, this));
				$('#' + videoData.divID).closest('.video-area_5').on('aem_hide', $.proxy(this.onAemHide, this));
			},
			checkOldBrowserLayerVideo : function(e) {
				var _target = $(e.currentTarget),
				videoType = _target.data('vid-type');

				switch(videoType) {
					case 'youtube':
						if (this.alertOldIeBrowser(10, 'Youtube')) {
							e.stopImmediatePropagation();
							return;
						}
						break;
					case 'brightcove':
						if (this.alertOldIeBrowser(8, 'Brightcove')) {
							e.stopImmediatePropagation();
							return;
						}
						break;
					case 'mp4':
						if (this.alertOldIeBrowser(8, 'Mp4')) {
							e.stopImmediatePropagation();
							return;
						}
						break;
					case 'aparat':
						if (this.alertOldIeBrowser(8, 'Aparat')) {
							e.stopImmediatePropagation();
							return;
						}
						break;
				}
			},
			alertOldIeBrowser : function(ver, vType) {
				if (document.documentMode && document.documentMode <= ver) {
					var altFunc = window['a' + 'lert'];
					altFunc('Internet Explorer ' + document.documentMode + ' doesn\'t support ' + vType + ' video.');
					return true;
				}
			},
			setYoutube : function(videoData, jsVideoBtn) {
				this.youtubeIframe = $(this.youtubeOpt.iframe);
				this.youtubeIframe.attr({
					'id' : 'youtubePlayer_' + videoData.videoID.split('-').join('_'),
					'src' : this.youtubeOpt.embedSrc.replace('{{VIDEO_ID}}', videoData.videoID)
							+ '&autoplay=' + ((!!videoData.autoPlay && videoData.autoPlay.toLowerCase() === 'true') ? '1' : '0')
				});
				$('#' + videoData.divID).prepend(this.youtubeIframe)
					.closest('.video-area_5').show()
					.closest('.js-video-area').show();
				// $('#' + videoData.divID).closest('.video-area_5').find('.js-pop-close').on('focus click', $.proxy(this.onCloseBtnClick, this));
				$('#' + videoData.divID).closest('.video-area_5').on('click', '.js-pop-close', $.proxy(this.onCloseBtnClick, this));
				this.container.addClass('video-open');
				
				var videoTitle = $('#' + videoData.divID).data('video-title');
				$('#' + videoData.divID).find('iframe').attr('title', videoTitle);

				var divEl = $('#' + videoData.divID).closest('.video-area_5'),
					youtubeTimeoutObj= {};

				if (divEl.length) {
					divEl.addClass('s-video-youtube');
					youtubeTimeoutObj = setTimeout(function() {
						divEl.addClass('s-youtube-ready');
					}, 4500);
					divEl.data('timer', youtubeTimeoutObj);
				}
			},
			setAparat : function(videoData, jsVideoBtn) {
				this.aparatIframe = $(this.aparatOpt.iframe);
				this.aparatIframe.attr({
					'id' : 'aparatPlayer_' + videoData.videoID.split('-').join('_'),
					'src' : this.aparatOpt.embedSrc.replace('{{VIDEO_ID}}', videoData.videoID)
						+ ((!!videoData.autoPlay && videoData.autoPlay.toLowerCase() === 'true') ? '?data[as]=1' : '')
				});
				$('#' + videoData.divID).closest('.video-area_5').addClass('s-aparat-area');
				$('#' + videoData.divID).prepend(this.aparatIframe)
					.closest('.video-area_5').show()
					.closest('.js-video-area').show();
				// $('#' + videoData.divID).closest('.video-area_5').find('.js-pop-close').on('focus click', $.proxy(this.onCloseBtnClick, this));
				$('#' + videoData.divID).closest('.video-area_5').on('click', '.js-pop-close', $.proxy(this.onCloseBtnClick, this));
				this.container.addClass('video-open');

				var videoTitle = $('#' + videoData.divID).data('video-title');
				$('#' + videoData.divID).find('iframe').attr('title', videoTitle);
			},
			onCloseBtnClick : function(e, focusBoolean) {
				var target = $(e.currentTarget),
				area = target.closest('.video-area_5'),
				brightCoveArea = area.find('.brightCoveArea'),
				btnIdx = $('#' + target.data('div-id')).attr('data-vid-btn-idx'),
				playBtn = $('[data-vid-view="layer"][data-vid-btn-idx="' +  btnIdx + '"]'),
				homeComponent = playBtn.closest('.js-home-components'),
				focusBoo = focusBoolean;
				
				if (playBtn.size()) {
				  if(playBtn.length > 1) {
					var lastIdx = playBtn.length - 1,
					slickSlide = $(playBtn[lastIdx]).closest('.slick-slide');
					if(typeof slickSlide !== 'undefined') {
					  playBtn.each(function(idx, elmt) {
						if(lastIdx === idx) {
						  if(!$(slickSlide).hasClass('slick-cloned')) if (!focusBoo) {$(elmt).focus();}
						} else {
							if (!focusBoo) {$(elmt).focus();}
						}
					  });
					} else {
					 if (!focusBoo) {playBtn.focus();}
					}
				  } else {
					if (!focusBoo) {playBtn.focus();}
				  }
				}

				if (homeComponent.size()) {
					homeComponent.removeClass('s-video-open');
				}

				this.container.removeClass('video-layer-open');

				area.css('display','none');

				if (area.hasClass('s-aparat-area')) {
					area.find('iframe').attr('src', 'about:blank');
				}
				
				brightCoveArea.html('');
				
				target.off('click', $.proxy(this.onCloseBtnClick, this));
				// target.off('focus click', $.proxy(this.onCloseBtnClick, this));
				
				clearTimeout(area.data('timer'));
				area.removeClass('s-video-youtube').removeClass('s-youtube-ready');
			},
			onAemHide : function(e) {
				var target = $(e.currentTarget).find('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close'),
				btnIdx = $('#' + target.data('div-id')).attr('data-vid-btn-idx'),
				playBtn = $('[data-vid-view="layer"][data-vid-btn-idx="' +  btnIdx + '"]'),
				homeComponent = playBtn.closest('.js-home-components');

				if (playBtn.size() && !$(e.target).hasClass('vjs-big-play-button')) {
				  if(playBtn.length > 1) {
					var lastIdx = playBtn.length - 1,
					slickSlide = $(playBtn[lastIdx]).closest('.slick-slide');
					if(typeof slickSlide !== 'undefined') {
					  playBtn.each(function(idx, elmt) {
						if(lastIdx === idx) {
						  if(!$(slickSlide).hasClass('slick-cloned')) $(elmt).focus();
						} else {
						  $(elmt).focus();
						}
					  });
					} else {
					  playBtn.focus();
					}
				  } else {
					playBtn.focus();
				  }
				}

				if (!target.closest('.s-video-area').is(':visible')) {
					homeComponent.removeClass('s-video-open');
				}
			},
			setBrightCove : function(videoData) {
				this._brightcoveOpt = $.extend({}, this.brightcoveOpt, videoData);

				switch(this._brightcoveOpt.playerType) {
					case 'brightcoveBc5PlayerLayer':
						win.brightcoveBc5PlayerLayer(
							this._brightcoveOpt.countryCode,
							this._brightcoveOpt.divID,
							this._brightcoveOpt.videoTagID,
							this._brightcoveOpt.videoID,
							this._brightcoveOpt.videoWidth,
							this._brightcoveOpt.videoHeight,
							this._brightcoveOpt.autoPlay,
							this._brightcoveOpt.captionURL
						);
						break;
					case 'bcHtml5Player':
						$('#' + this._brightcoveOpt.divID).bcHtml5Player(
							this._brightcoveOpt.countryCode,
							this._brightcoveOpt.videoTagID,
							this._brightcoveOpt.videoID,
							this._brightcoveOpt.videoWidth,
							this._brightcoveOpt.videoHeight,
							this._brightcoveOpt.autoPlay,
							this._brightcoveOpt.captionURL
						);
						break;
					case 'brightcoveBccPlayerLayer':
						win.brightcoveBccPlayerLayer(
							this._brightcoveOpt.divID,
							this._brightcoveOpt.countryCode,
							this._brightcoveOpt.videoID,
							this._brightcoveOpt.videoWidth,
							this._brightcoveOpt.videoHeight,
							this._brightcoveOpt.autoPlay
						);
						break;
					case 'bcChromePlayer':
						$('#' + this._brightcoveOpt.divID).bcChromePlayer(
							this._brightcoveOpt.countryCode,
							this._brightcoveOpt.videoID,
							this._brightcoveOpt.videoWidth,
							this._brightcoveOpt.videoHeight,
							this._brightcoveOpt.autoPlay
						);
						break;
				}
			},
			setMp4Player : function(videoData, videoView, divTarget, idx) {
				var _this = this,
					$divTarget = divTarget,
					$mp4PlayBtn = null;

				this.mp4VideoElement = $(this.mp4Opt.videoElement);
				this.mp4VideoElement.attr({
					//'id' : 'mp4Player_' + videoData.videoURL.split('/').pop().split('.').shift().split('-').join('_'),
					//'title' : videoData.title,
					'width' : videoData.videoWidth,
					'height' : videoData.videoHeight
				});

				this.mp4VideoElement.find('source').attr('src', this.getScene7Path(videoData.videoURL, $(divTarget)));
				$mp4PlayBtn = $divTarget.find(this.mp4Opt.playBtn);

				if (document.documentMode !== 8) {
					
					$mp4PlayBtn.off('click.mp4Play').on('click.mp4Play', function (e){
						var $btn = $(e.currentTarget);
						var $videoTagWrap = $('#' + $btn.closest('.js-video').find('.s-video-player, .s-show-video').attr('id'));
	
						e.preventDefault();
						e.stopPropagation();
	
						$videoTagWrap.find('video')[0].play();
						$videoTagWrap.find('video').prop('controls', true);
						$btn.css('display', 'none');
					});
				}

				if (videoData.mute === 'true') {this.mp4VideoElement.prop('muted', true)};
				if (videoData.autoPlay === 'true') {this.mp4VideoElement.prop('autoplay', true)};
				if (videoView === 'layer') {
					if (videoData.controls === 'false') {
				  		this.mp4VideoElement.prop('controls', false);
				 	} else {
				  		this.mp4VideoElement.prop('controls', true);
				 	}
				}
				if (videoView === 'embed' && videoData.scrollPlay === 'true') {
					$mp4PlayBtn.css('display', 'none');	
				}
				if (videoView === 'embed' && videoData.autoPlay === 'true') {
					this.mp4VideoElement.prop('controls', true);
				}
				if (videoData.controls === 'true') {
					this.mp4VideoElement.prop('controls', true);
				}
				
				if (videoData.loop === 'true') {this.mp4VideoElement.prop('loop', true)};
				$('#' + videoData.divID).prepend(this.mp4VideoElement)
					.closest('.video-area_5').show()
					.closest('.js-video-area').show();
				$('#' + videoData.divID).closest('.video-area_5').on('click', '.js-pop-close', $.proxy(this.onCloseBtnClick, this));
				this.container.addClass('video-open');

				// if (document.documentMode === 8) {
				// 	var $mp4AltImage = null;
				// 	if ($divTarget.parent().find('.js-img-src').length) {
				// 		$mp4AltImage = $divTarget.parent().find('.js-img-src');
				// 	} else if ($divTarget.closest('figure').find('.s-img-mo').length) {
				// 		$mp4AltImage = $divTarget.closest('figure').find('.s-img-mo');
				// 	}
					
				// 	if ($mp4AltImage.length) {
				// 		if ($mp4AltImage.eq(0).hasClass('s-img-mo')) {
				// 			$mp4AltImage.eq(0).removeClass('s-img-mo');
				// 		}
				// 	}
				// }
				
				//if (videoView === 'layer') {
					var videoTitle = $('#' + videoData.divID).data('video-title');
					if ($('#' + videoData.divID).closest('.js-video').find('.s-mp4-video-play').length) {
						$('#' + videoData.divID).closest('.js-video').find('.s-mp4-video-play').attr('title', videoTitle);
					}
				//}

				divTarget.trigger('bgMp4Ready', idx);
			},
			getScene7Path: function(pDamPath, element) {
				var $gnbRunmodeInfo = $('#gnbRunmodeInfo'),
					scene7Path = $('#scene7domain').val(),
					damPath = pDamPath || '',
					substitutionPath = '';

				if ($gnbRunmodeInfo.length) {
					if ($gnbRunmodeInfo.val() === 'qa' || $gnbRunmodeInfo.val() === 'live') {
						substitutionPath = damPath.replace('/content/dam/samsung/', scene7Path + 'p5/');
						substitutionPath = substitutionPath.replace('/is/image/', '/is/content/');

						var toChangeDataStr = element.attr('data-vid-data').toString();
						toChangeDataStr = toChangeDataStr.replace(damPath, substitutionPath);
						element.attr('data-vid-data', toChangeDataStr);
					} else {
						substitutionPath = damPath;
					}
				} else {
					substitutionPath = damPath;
				}

				return substitutionPath;
			}
		};
	})();


	$(function() {
		$.each(['show', 'hide'], function (i, ev) {
			var el = $.fn[ev];
			$.fn[ev] = function () {
				this.trigger('aem_' + ev);
				return el.apply(this, arguments);
			};
		});

		namespace.video.init($('body'));
	});
})(window, window.$, window.jQuery);




/*!
 * samsung.com - Phase2 - Video Mp4 Autoplay
 * src : js/src/smg/aem/components/video/smg.aem.components.video.js
 *
 * @version 2.0.0
 * @since 2017.01.02
 */
;
(function(win, $) {
	'use strict';

	if ('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if ('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if ('undefined' === typeof win.smg.aem.components) {
		win.smg.aem.components = {};
	}

	if ('undefined' === typeof win.smg.aem.components.video) {
		win.smg.aem.components.video = {};
	}

	var namespace = win.smg.aem.components.video;

	namespace.mp4AutoPlay = (function() {

		var custom = {
				body: 'body',
				evt: {
					connect: {},
					responsiveMgr: {
						responsiveChange: 'responsiveChange'
					}
				}
			} //custom object

		var responsiveManager = {
			getObjectInfo: function() {
				return {
					responsiveName: this.responsiveName,
					device: this.device
				}
			},
			init: function() {
				this.constants();
				this.bindEvts();
				this.defSetup();
			},
			constants: function() {
				this.device = {
					mobile: { support: true, name: 'mobile', width: 768 },
					tablet: { support: false, name: 'tablet', width: 1280 },
					desktop: { support: true, name: 'desktop' }
				}
				this.evt = custom.evt.responsiveMgr;
			},
			bindEvts: function() {
				this.resizeListener();
			},
			defSetup: function() {
				this.responsiveChange();
			},
			resizeListener: function() {
				$(win).on('resize', $.proxy(this.responsiveChange, this));
			},
			responsiveChange: function() {
				var doc = win.document,
					w = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

				var responsiveName;
				if (this.device.mobile.support && w <= this.device.mobile.width) {
					responsiveName = this.device.mobile.name;
				} else if (this.device.tablet.support && w <= this.device.tablet.width) {
					responsiveName = this.device.tablet.name;
				} else if (this.device.desktop.support) {
					responsiveName = this.device.desktop.name;
				} else return;

				var resObj = { responsiveName: '' };
				if (!this.responsiveName) {
					this.responsiveName = responsiveName;
					//trigger, event custom
					resObj.responsiveName = this.responsiveName;
					$(custom.evt.connect).trigger(this.evt.responsiveChange, resObj);
				} else {
					if (this.responsiveName !== responsiveName) {
						this.responsiveName = responsiveName;
						//trigger, event custom
						resObj.responsiveName = this.responsiveName;
						$(custom.evt.connect).trigger(this.evt.responsiveChange, resObj);
					}
				}
			}
		}

		var orientationchangeManager = {
			init: function() {
				this.orientationchangeListener();
			},
			orientationchangeListener: function() {
				$(win).on('orientationchange', function(e) {
					$(win).trigger('resize.mp4AutoPlay');
				});
			}
		}

		var videoManager = {
			init: function() {
				this.setElmts();
				if (!this.videos) {
					return;
				}
				orientationchangeManager.init();
				responsiveManager.init();
				this.defSetup();
				this.bindEvts();
			},
			setElmts: function() {
				var _this = this;
				this.videos = null;
				$('.mp4-video').each(function(i) {
					var el = $(this);
					var data = el.data('vid-data');
					if (data.scrollPlay === 'true') {
						if (!_this.videos) {
							//_this.videos = el.find('video');
							_this.videos = $('#' + data.divID).find('video');
						} else {
							//_this.videos = _this.videos.add(el.find('video'));
							_this.videos = _this.videos.add($('#' + data.divID).find('video'));
						}

						if (data.playOnce === 'true') {
							_this.videos.eq(i).data('play-once', true);
						}
					}
				});
				this.playStatus = [];
			},
			bindEvts: function() {
				this.responsiveListener();
				// if(document.documentMode === 8) {
				//   this.stateChangeListener();
				// }
				this.videos.each(function(i) {
					var el = $(this);
					el.on('loadedmetadata', function() {
						el.attr('data-loaded-metadata', true);
						videoManager.matching();
					});
				});
			},
			defSetup: function() {
				this.responsiveSupport();
			},
			responsiveListener: function() {
				$(custom.evt.connect).on(custom.evt.responsiveMgr.responsiveChange, $.proxy(this.responsiveSupport, this));
			},
			triggerResponse: function() {
				$(custom.evt.connect).trigger(custom.evt.responsiveMgr.responsiveChange);
			},
			support: {
				mobile: false,
				desktop: true
			},
			responsiveSupport: function() {
				var _ = this,
					resInfo = responsiveManager.getObjectInfo(),
					supportEventHandler = function(supportBoolean) {
						if (supportBoolean) {
							_.bindResizeListener();
							_.bindScrollListener();
						} else {
							_.unbindResizeListener();
							_.unbindScrollListener();
						}
					}

				switch (resInfo.responsiveName) {
					case resInfo.device.mobile.name:
						supportEventHandler(this.support.mobile);
						break;
					case resInfo.device.desktop.name:
						supportEventHandler(this.support.desktop);
						break;
				}
			},
			bindScrollListener: function() {
				$(win).off('scroll.mp4AutoPlay').on('scroll.mp4AutoPlay', $.proxy(this.matching, this));
			},
			bindResizeListener: function() {
				$(win).off('scroll.mp4AutoPlay').on('resize.mp4AutoPlay', $.proxy(this.matching, this));
			},
			unbindScrollListener: function() {
				$(win).off('scroll.mp4AutoPlay', $.proxy(this.matching, this));
			},
			unbindResizeListener: function() {
				$(win).off('resize.mp4AutoPlay', $.proxy(this.matching, this));
			},
			matching: function() {
				var windowTopPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
					windowBottomPosition = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + windowTopPosition,
					_this = this;

				if (document.documentMode === 8) {
					this.videos.each(function(k) {
						//var wrap = $(this).closest('.ma-g-c-halftext__video');
						//if(wrap.size() === 0) return;

						var elmt = $(this),
							elmtHeight = elmt.outerHeight(),
							elmtTopPosition = elmt.offset().top,
							elmtBottomPosition = (elmtTopPosition + elmtHeight);

						if (windowTopPosition <= elmtBottomPosition && windowBottomPosition >= elmtTopPosition) {
							if (!_this.playStatus[k]) {
								if (win.videojs) {
									//videojs(elmt.attr('id')).currentTime(0);
									//videojs(elmt.attr('id')).play();
									_this.playStatus[k] = true;
								}
							}
						} else {
							if (_this.playStatus[k]) {
								if (win.videojs) {
									//videojs(elmt.attr('id')).pause();
									_this.playStatus[k] = false;
								}
							}
						}
					});
				} else {
					this.videos.each(function(j) {
						var elmt = $(this),
							elmtHeight = elmt.outerHeight(),
							elmtTopPosition = elmt.offset().top,
							elmtBottomPosition = (elmtTopPosition + elmtHeight);

						if (elmt.data('play-once') && _this.playStatus[j]) {
							return;
						}

						if (windowTopPosition <= elmtBottomPosition && windowBottomPosition >= elmtTopPosition) {
							if (!_this.playStatus[j]) {
								if (elmt.data('loaded-metadata')) {
									elmt[0].currentTime = 0;
									elmt[0].play();
									_this.playStatus[j] = true;
								}
								
							}
						} else {
							if (_this.playStatus[j]) {
								if (elmt.data('loaded-metadata')) {
									elmt[0].pause();
									_this.playStatus[j] = false;
								}
							}
						}
					});
				}
			},
			stateChangeListener: function() {
				var _ = this;
				$('.ma-g-c-halftext .ma-g-c-halftext__video .s-video').each(function(idx, elmt) {
					elmt.attachEvent('playStateChange', function() {
						if (elmt.PlayState === 2) {
							var duration = Math.floor(elmt.Duration) * 1000;
							setTimeout(function() {
								elmt.pause();
							}, duration);
						}
					});
				})
			}
		}

		var init = function(container) {
			if (!(this.container = container).size()) return;

			videoManager.init();
		}

		return {
			init: init,
			videoManager: videoManager
		}
	})();

	$(function() {
		if ($('body').hasClass('touch-device')) return;
		namespace.mp4AutoPlay.init($('body'));
	});

})(window, window.jQuery);
