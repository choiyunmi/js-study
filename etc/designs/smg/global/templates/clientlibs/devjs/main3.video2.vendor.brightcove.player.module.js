/*
Brightcove Chromeless Player Module
@version : 1.1
@author : W-MARC
@Date : 2016-08-02

2016-05-31	크롬리스 리사이징 이슈 수정
			web(flash only api) vs mobile(smart api) 접속환경에 따라 API 분기처리
			옴니추어 (s_code_next.js) 모듈과 API 충돌 발생
2016-06-15	프로토콜 구분하여 JS API 로딩- BrightcoveExperiences JS 동적 로딩
2016-06-22	AEM 팀 요청사항
			웹표준 문법 수정
			Chromeless Layer 타입 Close시 일괄 닫힘 문제 (function bccLayerClose) 수정
2016-06-29  키보드 패널 : 오토플레이 접근성 수정
            키보드 패널 : 재생/정지 접근성 수정
			키보드 패널 : Closed Caption Controll 접근성 수정
2016-07-06  크롬리스 플레이어 CSS 수정 : 불필요 영역 삭제 및 display:inline(width,height)변경
2016-07-19  크롬리스 플레이어 100% 입력시 브라우저 크기에 맞춰 16:9 비율이 유지되도록 기능 추가
            - 모바일 환경에서 회전시 비율 유지 기능
2016-08-02 HTML5플레이어 autoplay function 수정
           - brightcove api loadedmetadata event 오류
		   크롬리스 플레이어 & HTML5 플레이어 비디오 정보 hashmap put
		   - 한 페이지내에서 두개 이상의 플레이어 생성 가능
		   HTML5플레이어 CSS 추가: <!--bom-studio css add-->
2016-12-01 1. omniture 관련 function onPaly, onStop, onProgress 삭제
		   2. click 이벤트 on(click)로 변경
		    - bcjQuery(".brightcove-bc5-btn-close").click => bcjQuery(document).on('click', '.brightcove-bc5-btn-close', function(){
		    - bcjQuery(".brightcove-bcc-btn-close").click => bcjQuery(document).on('click', '.brightcove-bcc-btn-close', function(){

2017-04-24 신규국가용 ver.5.20.1 국가코드 추가
	var bc5playerData = {
		...
		AL : {'accountId' : '5395474900001', 'playerId' : 'S1WPmS4Rg'},
		LB : {'accountId' : '5359769185001', 'playerId' : 'By5uztNAe'},
		MM : {'accountId' : '5395474902001', 'playerId' : 'BJWPXt4Al'}
	};

2017-12-06 GMC 국가코드 추가 ver.5.28.1 (5.X대 생성가능한 최소버전이 5.28.1)
	var bc5playerData = {
		...
		GCS : {'accountId' : '1852113008001', 'playerId' : 'B1HX3oXbG'},
		SC : {'accountId' : '1275380501001', 'playerId' : 'rJUZMbBZG'},
		LED : {'accountId' : '2172563229001', 'playerId' : 'SJEqMbSWM'}
	};

2017-12-13 브라이트코브 Support GRO 국가코드 추가 ver.5.28.1 (5.X대 생성가능한 최소버전이 5.28.1)
	var bc5playerData = {
		...
		UK_CS : {'accountId' : '5675787969001', 'playerId' : 'Hkmjd40bM'},
		DE_CS : {'accountId' : '5675787970001', 'playerId' : 'ByxCBuECZG'},
		BE_CS : {'accountId' : '5675787971001', 'playerId' : 'r1SZIVRWf'},
		BE_FR_CS : {'accountId' : '5675787972001', 'playerId' : 'r16xOECbz'},
		NL_CS : {'accountId' : '5675788007001', 'playerId' : 'HymXOVAWf'}
	};

2018-01-22 CS 신규 국가코드 추가 

	US_CS : {'accountId' : '5709700875001', 'playerId' : 'SJC96gsNf'},
	CA_FR_CS : {'accountId' : '5709700876001', 'playerId' : 'rye60eiNG'},
	CA_CS : {'accountId' : '5709700877001', 'playerId' : 'BJJnCxi4z'},
	MX_CS : {'accountId' : '5709700878001', 'playerId' : 'SyFThbi4G'},
	BR_CS : {'accountId' : '5709700879001', 'playerId' : 'rypXhbjEf'},
	LATIN_CS : {'accountId' : '5709700880001', 'playerId' : 'rJ3qnZoVz'},
	LATIN_EN_CS : {'accountId' : '5709700881001', 'playerId' : 'rJSnnZjNz'},
	VE_CS : {'accountId' : '5709700882001', 'playerId' : 'HyyTnWo4M'},
	CO_CS : {'accountId' : '5709700883001', 'playerId' : 'B1sd6ejEf'},
	AR_CS : {'accountId' : '5709700884001', 'playerId' : 'ByGBCloVz'},
	CL_CS : {'accountId' : '5709700885001', 'playerId' : 'HyjTClsVf'},
	PE_CS : {'accountId' : '5709700887001', 'playerId' : 'H1qXpZs4z'},
	SG_CS : {'accountId' : '5709700888001', 'playerId' : 'BywY6goNz'},
	AU_CS : {'accountId' : '5709700889001', 'playerId' : 'rkZZPClsEf'},
	NZ_CS : {'accountId' : '5709700890001', 'playerId' : 'H1jD0xsVf'},
	ID_CS : {'accountId' : '5709700891001', 'playerId' : 'rJnOhZi4f'},
	TH_CS : {'accountId' : '5711373553001', 'playerId' : 'SkiJkGsNG'},
	VN_CS : {'accountId' : '5711373555001', 'playerId' : 'rJmcTxiEz'},
	MY_CS : {'accountId' : '5711373556001', 'playerId' : 'SJxYtAZiVG'},
	PH_CS : {'accountId' : '5711373557001', 'playerId' : 'BJ8M6Wj4M'},
	TW_CS : {'accountId' : '5711373558001', 'playerId' : 'rJxptpbo4f'},
	JP_CS : {'accountId' : '5711373559001', 'playerId' : 'Bk4j0ljVG'},
	IN_CS : {'accountId' : '5711373560001', 'playerId' : 'Sk7CdCZjNG'},
	CN_CS : {'accountId' : '5711373561001', 'playerId' : 'S1xr6gsNz'},
	HK_CS : {'accountId' : '5711373562001', 'playerId' : 'HJsUhboVf'},
	HK_EN_CS : {'accountId' : '5711373563001', 'playerId' : 'H1vvhboNf'},
	IE_CS : {'accountId' : '5711373564001', 'playerId' : 'HJgpICZjVM'},
	IT_CS : {'accountId' : '5711373565001', 'playerId' : 'H1Md2boEf'},
	ES_CS : {'accountId' : '5711373566001', 'playerId' : 'By1FaWoNG'},
	HU_CS : {'accountId' : '5711373567001', 'playerId' : 'Bye0rnZoVG'},
	SE_CS : {'accountId' : '5711373568001', 'playerId' : 'Skhl6biEf'},
	DK_CS : {'accountId' : '5711373569001', 'playerId' : 'HkxTRhWjVG'},
	FI_CS : {'accountId' : '5711373571001', 'playerId' : 'Bydk6ZiNM'},
	NO_CS : {'accountId' : '5711373572001', 'playerId' : 'rkMeTWjEz'},
	FR_CS : {'accountId' : '5711373573001', 'playerId' : 'S1ONnWs4G'},
	PT_CS : {'accountId' : '5711373574001', 'playerId' : 'rkZwWaWiVz'},
	PL_CS : {'accountId' : '5711373575001', 'playerId' : 'HyxXTWiVG'},
	GR_CS : {'accountId' : '5711373576001', 'playerId' : 'Hkx7S3WsNM'},
	CZ_CS : {'accountId' : '5711373577001', 'playerId' : 'SJOfnWjEf'},
	SK_CS : {'accountId' : '5711373578001', 'playerId' : 'rkm7hZoNG'},
	RO_CS : {'accountId' : '5711373579001', 'playerId' : 'Sk2D6ZoEG'},
	BG_CS : {'accountId' : '5711373580001', 'playerId' : 'BkzvaZjVG'},
	AT_CS : {'accountId' : '5711373581001', 'playerId' : 'SkaMRgjEz'},
	CH_CS : {'accountId' : '5711373582001', 'playerId' : 'SJumAxjEG'},
	CH_FR_CS : {'accountId' : '5711373583001', 'playerId' : 'BylOVAxoVM'},
	LV_CS : {'accountId' : '5711373584001', 'playerId' : 'B1CFCloEG'},
	LT_CS : {'accountId' : '5711373585001', 'playerId' : 'rytcRljEz'},
	EE_CS : {'accountId' : '5711373586001', 'playerId' : 'ryfYAljEG'},
	RS_CS : {'accountId' : '5711373587001', 'playerId' : 'Skmu3agsEf'},
	HR_CS : {'accountId' : '5711373588001', 'playerId' : 'Bkcials4G'},
	RU_CS : {'accountId' : '5711373589001', 'playerId' : 'BJxrLabiNz'},
	UA_CS : {'accountId' : '5711373590001', 'playerId' : 'SylNBRZiVG'},
	UA_RU_CS : {'accountId' : '5711373592001', 'playerId' : 'rygURWsNM'},
	KZ_RU_CS : {'accountId' : '5711373593001', 'playerId' : 'BJq31zoVG'},
	AE_CS : {'accountId' : '5711373594001', 'playerId' : 'HJgEORWiNz'},
	AE_ARABIC_CS : {'accountId' : '5711373595001', 'playerId' : 'H1ecP0biEG'},
	IL_CS : {'accountId' : '5711373596001', 'playerId' : 'SyyCCZs4G'},
	SA_CS : {'accountId' : '5711373597001', 'playerId' : 'Skd0AboVz'},
	SA_EN_CS : {'accountId' : '5711373598001', 'playerId' : 'BJfkyGoEM'},
	TR_CS : {'accountId' : '5711373599001', 'playerId' : 'Hku9aWi4M'},
	IRAN_CS : {'accountId' : '5711373600001', 'playerId' : 'HkVTCWjVz'},
	LEVANT_CS : {'accountId' : '5711373601001', 'playerId' : 'HkHwplo4M'},
	PK_CS : {'accountId' : '5711373602001', 'playerId' : 'S12rTgoEG'},
	EG_CS : {'accountId' : '5711373603001', 'playerId' : 'SkoQTljVG'},
	N_AFRICA_CS : {'accountId' : '5711373604001', 'playerId' : 'SyeMCnZjNG'},
	AFRICA_EN_CS : {'accountId' : '5711373605001', 'playerId' : 'By1sAbiVM'},
	AFRICA_FR_CS : {'accountId' : '5711373606001', 'playerId' : 'S1MhiRbjEf'},
	AFRICA_PT_CS : {'accountId' : '5711373607001', 'playerId' : 'SyZtnCbs4M'},
	ZA_CS : {'accountId' : '5711373608001', 'playerId' : 'SJNq0Wi4G'},
	SI_CS : {'accountId' : '5711373609001', 'playerId' : 'rJzfRxsVf'},
	PY_CS : {'accountId' : '5711373610001', 'playerId' : 'SkTHCgo4f'},
	UR_CS : {'accountId' : '5711373612001', 'playerId' : 'ByII0eiNf'},
	LB_CS : {'accountId' : '5711373613001', 'playerId' : 'HJK8TlsVz'},
	AL_CS : {'accountId' : '5711373614001', 'playerId' : 'HJjongoEf'},
	MM_CS : {'accountId' : '5711373615001', 'playerId' : 'rkyO6xiNM'}


2018-01-30 업데이트는 기존 1.11.x버전대에서 5.25.x 버전으로 업그레이를 위한 수정
2018-01-30 레이어 다을 때 videojs().dispose() 실행 
 - 이 명령어를 쓰지 않으면 HLS포맷의 영상 재생 중 html 엘리먼트를 지웠을 때 오류메세지가 출력되기 때문에 추가해줌.

	if (window.videojs) {
		var disposeTargetId = target.find('.video-js').attr('id');
		if (disposeTargetId) {
			videojs(document.getElementById(disposeTargetId)).dispose();
		}
	}

2018-01-30 brightcoveBc5PlayerLayer 호출시 ie8, ie9, ie10, ie11, etc 브라우저별 분기처리 
 - 브라우저 버전별로 로드방식을 다르게 적용해주어야 v5.25.5 플레이어가 제대로 실행된다.

	if (getIeVersion() === -1) { // ie11, etc
		s.onload = function() {
			setTimeout(function() {
				myPlayer.callback(vodId);
			}, 500);
		}

		document.body.appendChild(s);
	} else { // ie10, ie9, ie8
		if (getIeVersion() === 8) {
			s.onreadystatechange = function () {
				if(s.readyState == "loaded" || s.readyState == "complete") {
					setTimeout(function() {
						myPlayer.callback(vodId);
					}, 500)
				}
			}
			document.body.appendChild(s);
		} else if (getIeVersion() === 9) {
			s.onload = function() {
				setTimeout(function() {
					myPlayer.callback(vodId);
				}, 500);
			};

			bcjQuery(bc5Info.targetId).append(s);
		} else if (getIeVersion() === 10) {
			s.onload = function() {
				setTimeout(function() {
					myPlayer.callback(vodId);
				}, 500);
			}

			document.body.appendChild(s);
		}
	}

2018-01-30 brightcoveBc5PlayerLayer 호출의 callback함수 변경

	videojs(bc5Info.id).ready(function(){
		...

		if (isAutoPlay) {
			bcjQuery("#"+bc5Info.id).find(".vjs-big-play-button").trigger('click');
		}
		// bc5MyPlayer.on('play') 이벤트가 ie9, ie10에서 동작하지 않아서 trigger('click') 으로 수정함.

		if (getIeVersion() === 9 || getIeVersion() === 10) { // v5.24 luna-skin caption hover
			bcjQuery("#"+bc5Info.id).find('.vjs-captions-button').on('mouseenter', function(e) {
				e.stopPropagation();
				bcjQuery(e.currentTarget).find('.vjs-menu-content').css('background-color', 'rgba(43, 51, 63, 0.7)');
			});
		}
		// v5.24.5. 의 luna스킨은의 캡션 엘리먼트 .vjs-captions-button > .vjs-menu-content (ul)은 
		   css background-color: transparent 속성을 가지고 있는데,
		   ie9, ie10에서는 위 속성이 적용되지 않아서 cc버튼에서 자막선택 메뉴로 움직일 때 hover가 풀리는 오류가 있어서 수정함.


		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { // firefox X button outline
     		var ffCloseBtn = vjsWrap.closest('.video-area_5').find('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close');
     		if (ffCloseBtn.length) {
     			//ffCloseBtn.css('border', 'outline: 1px solid #4d90fe');
     			ffCloseBtn.off('ffoutline').on('focusin.ffoutline', function(e) {
     				ffCloseBtn.css('outline', '1px solid #4d90fe');
     			});
     			ffCloseBtn.off('ffoutline').on('focusout.ffoutline', function(e) {
     				ffCloseBtn.css('outline', 'unset');
     			});
     		}
		}
		// WAQA 접근성 검수에서 레이어형태의 X닫기버턴의 outline이 잘 보이지 않아 FF일때만 outline을 잘 보이도록 focus 이벤트로 변경해줌.

	}

2018-01-30 fnTabIndexSort() 실행함수 제거
	if(!mobile){
		//fnTabIndexSort(vodId);
	}

	caption메뉴를 열어주는 [cc]버튼과 재생이벤트가 충돌나서 주석처리 
	(cc버튼을 keydown으로 누르면 layer타입에서 플레이어가 중복으로 실행되서 주석처리함);


2018-01-30 firefox X버튼 포커스 아웃라인
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { // firefox X button outline
			var ffCloseBtn = vjsWrap.closest('.video-area_5').find('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close');
			if (ffCloseBtn.length) {
				//ffCloseBtn.css('border', 'outline: 1px solid #4d90fe');
				ffCloseBtn.off('ffoutline').on('focusin.ffoutline', function(e) {
					ffCloseBtn.css('outline', '1px solid #4d90fe');
				});
				ffCloseBtn.off('ffoutline').on('focusout.ffoutline', function(e) {
					ffCloseBtn.css('outline', 'unset');
				});
			}
	}

2018-01-30 다국어 적용시 플레이어 UI 폰트 적용
	if (vjsWrap.hasClass('vjs-v5')) {
	 	var uiFontRest = '',
	 		blankSheet = '', 
	 		createdStyleTag = '',
	 		docHead = null;

	 	uiFontRest = '.vjs-control-bar button { font-family: VideoJS !important; }';

		docHead = document.getElementsByTagName("head")[0];

		if (document.createStyleSheet) {
			blankSheet = document.createStyleSheet();
			blankSheet.cssText = uiFontRest;
		} else {
			createdStyleTag = document.createElement("style");
			createdStyleTag.type = "text/css";

			if (createdStyleTag.styleSheet) {
				createdStyleTag.styleSheet.cssText = uiFontRest;
			} else {
				createdStyleTag.appendChild(document.createTextNode(uiFontRest));
			}
			docHead.appendChild(createdStyleTag);
		}
	}

2018-01-30 자막 유무에 따라 자막 영역의 tabindex="0" 설정
	var isTabIndexAble = false;

	if (vjsTextTrack.length) {
		vjsTextTrack.off('DOMSubtreeModified.indexable propertychange.indexable')
		.on('DOMSubtreeModified.indexable propertychange.indexable', function(e) {
			e.stopPropagation();

			if (vjsTextTrack.find('div').length > 2) {
				if (!isTabIndexAble) {
					vjsTextTrack.attr('tabindex', 0);
					isTabIndexAble = true;
				}
			} else {
				if (isTabIndexAble) {
					isTabIndexAble = false;
					vjsTextTrack.removeAttr('tabindex');
				}
			}
		});

		vjsTextTrack.trigger('DOMSubtreeModified.indexable propertychange.indexable');
	}
*/

var bcc_idx = 0;
var areaLiveTimer;
var bcjQuery = window.$;
var bccMsg =  new Array();
var bcBrowser=null;//true : pc , false: mobile
if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	bcBrowser = true;
}else{
	bcBrowser = false;
}
var bcProtocol=null;//true : http . false : https
if(location.protocol == "http:"){
	bcProtocol=true;
}else{
	bcProtocol=false;
}

BcHashMap = function(){
	this.map = new Array();
}
BcHashMap.prototype = {
	put : function(key,value){
		this.map[key] = value;
	},
	get : function(key){
		return this.map[key];
	}
}
if(window.SITE_CD && window.SITE_CD == "sec"){
	bccMsg["text_01"] = "재생";
	bccMsg["text_02"] = "일시정지";
	bccMsg["text_03"] = "정지";
	bccMsg["text_04"] = "되감기";
	bccMsg["text_05"] = "앞으로";
	bccMsg["text_06"] = "음소거";
	bccMsg["text_07"] = "음량 증가";
	bccMsg["text_08"] = "음량 감소";
	bccMsg["text_09"] = "더 이상 비디오 목록 없습니다";
	bccMsg["text_10"] = "브라이트 플레이어 종료";
	bccMsg["text_12"] = "플레이어 준비";
	bccMsg["text_13"] = "이전";
	bccMsg["text_14"] = "다음";
	bccMsg["text_20"] = "자막열기";
	bccMsg["text_21"] = "자막닫기";
	bccMsg["text_22"] = "자막없음";
	bccMsg["text_23"] = "자막";
	bccMsg["text_24"] = "전체화면";
	bccMsg["text_25"] = "전체화면 종료";
}else{
	bccMsg["text_01"] = "Play";
	bccMsg["text_02"] = "Pause";
	bccMsg["text_03"] = "Stop";
	bccMsg["text_04"] = "Rewind";
	bccMsg["text_05"] = "Forward";
	bccMsg["text_06"] = "Mute";
	bccMsg["text_07"] = "Volume up";
	bccMsg["text_08"] = "Volume down";
	bccMsg["text_09"] = "No more video list";
	bccMsg["text_10"] = "End of brightcove player";
	bccMsg["text_12"] = "Player content ready";
	bccMsg["text_13"] = "Previous";
	bccMsg["text_14"] = "Next";
	bccMsg["text_20"] = "Closed caption on";
	bccMsg["text_21"] = "Closed caption off";
	bccMsg["text_22"] = "No Closed caption";
	bccMsg["text_23"] = "Caption";
	bccMsg["text_24"] = "fullscreen";
	bccMsg["text_25"] = "Non-Fullscreen";
}

var bccStatusCcFlag = new Array();

var bcChromePlayerData = {
	DEV		 : {'playerId' : '2487224303001', 'playerKey' : 'AQ~~,AAAA0gEd3vk~,UZmnOpR2YpEfDjzgdcc7b8EnQirJFTfn'},
	LIVE     : {'playerId' : '2474494486001', 'playerKey' : 'AQ~~,AAAA0gHQkRE~,ddRZn78L8shi6Jrn-WVLALuE0paPt520'},
	GLOBAL   : {'playerId' : '2937405510001', 'playerKey' : 'AQ~~,AAACqvvPXZk~,73mGUHxCIIQhsQ1kvmok_IBzGMhHprit'},
	EG       : {'playerId' : '926210542001', 'playerKey' : 'AQ~~,AAAA1vDImsE~,cmf9fQlzDEX60Ap9x_kSo3zfwvzYk9fg'},
	CN       : {'playerId' : '926210307001', 'playerKey' : 'AQ~~,AAAA1vc34eE~,kItzOdTai_fzjaKuIxIg8DV223Iq6cvi'},
	PK       : {'playerId' : '926251521001', 'playerKey' : 'AQ~~,AAAA1vSqgEE~,wOnUwNgORxX5Lx7vj1pm6XhYLoDcEM4_'},
	LEVANT   : {'playerId' : '926251519001', 'playerKey' : 'AQ~~,AAAA1vSqfFk~,wpJou2CBGiTHSgG-P42Xe63FMRD6TyXo'},
	CO       : {'playerId' : '926210505001', 'playerKey' : 'AQ~~,AAAA1vDIWFk~,-osp2UwmJkSayIBzpe-fiWWjFetpHFs9'},
	SG       : {'playerId' : '926210509001', 'playerKey' : 'AQ~~,AAAA1vDIYCk~,zKw77YEpCQO0r9qz-sEytHx3lFErk4ss'},
	VN       : {'playerId' : '926196171001', 'playerKey' : 'AQ~~,AAAA1u88Qek~,6VFss6TVSqtCkDpG6h2Uh4I4PD0GLZLq'},
	US       : {'playerId' : '924336519001', 'playerKey' : 'AQ~~,AAAA1vSqNgk~,TETY7sgK5kwNobvkqdSXY02JjkGuDmIc'},
	HR       : {'playerId' : '926210332001', 'playerKey' : 'AQ~~,AAAA1vc4CPE~,snrDcnWtt4VES1PU9mYW_mbeNmOz1bG8'},
	RS       : {'playerId' : '926210534001', 'playerKey' : 'AQ~~,AAAA1vDIiyE~,1l625wgL4J5inOw1R1uIHQ2AI0mBhVFr'},
	SI       : {'playerId' : '3855497514001', 'playerKey' : 'AQ~~,AAADga3gQqE~,ighS4vLAqw7aEJSfMheNEQNl3lgkikCf'},
	AT       : {'playerId' : '924336545001', 'playerKey' : 'AQ~~,AAAA1vSqZOk~,hp4Wt3zVjWc2whDUvqDH9CGlKil8OyNx'},
	CH_FR    : {'playerId' : '926251507001', 'playerKey' : 'AQ~~,AAAA1vSqaNE~,EQ78wh6EYWdP_mwBFB3IbXxs7JLIAwqv'},
	CH       : {'playerId' : '926210526001', 'playerKey' : 'AQ~~,AAAA1vDIf2k~,iVoVKzdFbeHQvN-Pf_SvWToP7TwoRgPA'},
	AR       : {'playerId' : '926210303001', 'playerKey' : 'AQ~~,AAAA1vc32hE~,GuUbplf11bKwpRy4EAYNGiU2J4b_cVdU'},
	PY       : {'playerId' : '4456565107001', 'playerKey' : 'AQ~~,AAAEDVSMUYE~,3yoQrflDnSf82zbeen7sVq1mwoAwGDlQ'},
	UR       : {'playerId' : '4456565111001', 'playerKey' : 'AQ~~,AAAEDVSMWVE~,nHKELpWrD9QyFGjGFsIleAdaHKQNcHX7'},
	AU       : {'playerId' : '926210511001', 'playerKey' : 'AQ~~,AAAA1vDIZBE~,8Qxfn_gGqXQWmvXHrUz4r05jOuPCLzUa'},
	NZ       : {'playerId' : '926196169001', 'playerKey' : 'AQ~~,AAAA1u88PgE~,GmWzarV2MErCAUzi5b8t5EKcBnk6E8yV'},
	EE       : {'playerId' : '926251513001', 'playerKey' : 'AQ~~,AAAA1vSqcKE~,pLfhI1aol64198gOZquO36bmCItlna-V'},
	LV       : {'playerId' : '926210326001', 'playerKey' : 'AQ~~,AAAA1vc4ASE~,axBlmjdcgk_FU76yezkFgm_XktjFJsfJ'},
	LT       : {'playerId' : '926251515001', 'playerKey' : 'AQ~~,AAAA1vSqdIk~,FfPsfAjtZCPUWwnff6eUCf5dSEQmz-kJ'},
	BE       : {'playerId' : '926196191001', 'playerKey' : 'AQ~~,AAAA1u88bOE~,jLxL4xeWUGVW0JUPGna3w8uSmCNmlptZ'},
	BE_FR    : {'playerId' : '926210528001', 'playerKey' : 'AQ~~,AAAA1vDIg1E~,MkoiW9FH-nnG4ZUl3DOpygEFQNnhP-uI'},
	NL       : {'playerId' : '926196193001', 'playerKey' : 'AQ~~,AAAA1u88cMk~,aJXrrmXqcmSiDmFHqX1rl8jwuB1XCwGA'},
	JP       : {'playerId' : '926210515001', 'playerKey' : 'AQ~~,AAAA1vDIa-E~,E6N35iQp8jDwx86w-tUgYVHCLPSCiARX'},
	sec      : {'playerId' : '926196177001', 'playerKey' : 'AQ~~,AAAA1u88TaE~,H1f81zC57BUdqLYj69bNcK1mnWR6NNTp'},
	CA       : {'playerId' : '924384217001', 'playerKey' : 'AQ~~,AAAA1vc30kE~,cbXkIMRl2tur-XePkk1yLTgjdi2k0-MS'},
	CA_FR    : {'playerId' : '924336521001', 'playerKey' : 'AQ~~,AAAA1vSqOfE~,sZkSFUdTS6eUK64OErxusx96DKJNIbJi'},
	CL       : {'playerId' : '924336527001', 'playerKey' : 'AQ~~,AAAA1vSqRak~,EnrWLy5bVf2utzcUFuidrHPW6lZMMy2X'},
	CZ       : {'playerId' : '926210321001', 'playerKey' : 'AQ~~,AAAA1vc3-VE~,q0UeQmlKWUjB8EFbz1b9FLjEfqJ84u3l'},
	SK       : {'playerId' : '924336543001', 'playerKey' : 'AQ~~,AAAA1vSqYQE~,ri_moVr2zWAxhVn98njnuti412uSoK-x'},
	BR       : {'playerId' : '926210501001', 'playerKey' : 'AQ~~,AAAA1vDIUIk~,LHrzhhIkh5_rkM4qIaeYSJ61GOZoclmv'},
	FR       : {'playerId' : '924336541001', 'playerKey' : 'AQ~~,AAAA1vSqXRk~,4Gh2JxitIlZ5MuGnkuyrS7FZ60fKqZ6m'},
	GR       : {'playerId' : '926196187001', 'playerKey' : 'AQ~~,AAAA1u88YSk~,vxFU_YgYcCL89X9Qwe1s7rnR0bJNIE-M'},
	DE       : {'playerId' : '924336537001', 'playerKey' : 'AQ~~,AAAA1vSqVUk~,Ij_lFfu7jRUnSOIVjtgLuFNXLbFsKk9w'},
	HU       : {'playerId' : '926210309001', 'playerKey' : 'AQ~~,AAAA1vc35ck~,MU-_2j7kl_JrhjFN8O5yPCelm0A90oNf'},
	HK       : {'playerId' : '924336535001', 'playerKey' : 'AQ~~,AAAA1vSqUWE~,2V3Gfvyx2SIdZnODa2GsXGASlNJYJB_E'},
	HK_EN    : {'playerId' : '926196179001', 'playerKey' : 'AQ~~,AAAA1u88UYk~,XDIlg6GcmdvGAbMXEj4cy62aA8fWZ7Rg'},
	IT       : {'playerId' : '926196185001', 'playerKey' : 'AQ~~,AAAA1u88XUE~,fft8jN67dHT3bQ4T-YR299dVUUW2Wq13'},
	ID       : {'playerId' : '926210513001', 'playerKey' : 'AQ~~,AAAA1vDIZ_k~,nr0_v_QukmUrfpAfwd6syDNAutP_lYjB'},
	KZ_UR    : {'playerId' : '926210334001', 'playerKey' : 'AQ~~,AAAA1vc4DNk~,qbZrUsiJtsTqPJmQELpgpisg96XC54ai'},
	LATIN    : {'playerId' : '926196165001', 'playerKey' : 'AQ~~,AAAA1u88Ohk~,v-_KXguDfE5YT_ue64VtxZK0J-pcj-0C'},
	LATIN_EN : {'playerId' : '924336525001', 'playerKey' : 'AQ~~,AAAA1vSqQcE~,BgcEcsklFLovEoVnOt9RPKJB5s7msCEw'},
	VE       : {'playerId' : '926210503001', 'playerKey' : 'AQ~~,AAAA1vDIVHE~,OedBXOLjIJrH7dJYXr4eGBbyQ_PYA65j'},
	MX       : {'playerId' : '924336523001', 'playerKey' : 'AQ~~,AAAA1vSqPdk~,0hHIlIMEKBPQrwDwbHYwzm2SiuZ5pER1'},
	N_AFRICA : {'playerId' : '926251523001', 'playerKey' : 'AQ~~,AAAA1vSqhCk~,tjW3A2k5zkQthYBV9Dwp5Qie2wZvGoF-'},
	DK       : {'playerId' : '926210311001', 'playerKey' : 'AQ~~,AAAA1vc36bE~,FiLtJnouWb44elliFsUPMk5UTMEBLc10'},
	FI       : {'playerId' : '926210524001', 'playerKey' : 'AQ~~,AAAA1vDIe4E~,lKlcTymj-FAv5_CC2dxasn2HZF-vT7a1'},
	NO       : {'playerId' : '924336539001', 'playerKey' : 'AQ~~,AAAA1vSqWTE~,NIYuVb4Yj1W-Vy50_tEzbsb7GSNBGjUu'},
	SE       : {'playerId' : '926210522001', 'playerKey' : 'AQ~~,AAAA1vDId5k~,wl2s5WAZVZQm20Pfrgap3hb8Pb_GhmS2'},
	PT       : {'playerId' : '926210317001', 'playerKey' : 'AQ~~,AAAA1vc38YE~,E3RfSFCBgebLJXrs8gqIapjCZAgtmC6W'},
	PH       : {'playerId' : '926196175001', 'playerKey' : 'AQ~~,AAAA1u88Sbk~,WIP_y9MCYC_2l3T_Wm3nrg1cmQbpBrij'},
	PL       : {'playerId' : '926210319001', 'playerKey' : 'AQ~~,AAAA1vc39Wk~,VQ1_fYOWigV90NMn7kDlwSpB5fr6HAHC'},
	PE       : {'playerId' : '926210507001', 'playerKey' : 'AQ~~,AAAA1vDIXEE~,y0ET89E0lhD6DaPPu4E_3SyvFnevN5ut'},
	RU       : {'playerId' : '926196195001', 'playerKey' : 'AQ~~,AAAA1u88dLE~,N1tbZZomcgAsb_PfXERrXa4VDTt73bow'},
	BG       : {'playerId' : '926210323001', 'playerKey' : 'AQ~~,AAAA1vc3_Tk~,mISXqRtx5TCJSuRDXFAyj0wgMMFj3s4q'},
	RO       : {'playerId' : '926196189001', 'playerKey' : 'AQ~~,AAAA1u88aPk~,81hqJ9oLX0Eod2XeyfzxgoAGCbN2YRcH'},
	ES       : {'playerId' : '926210519001', 'playerKey' : 'AQ~~,AAAA1vDIc7E~,HUeD8rCqt9P3_ICbpxGIpFVTu2PVdhqe'},
	TW       : {'playerId' : '926210305001', 'playerKey' : 'AQ~~,AAAA1vc33fk~,LaoPq8X-3PefH08VUXN2EctTZqxgCTWv'},
	TR       : {'playerId' : '926196201001', 'playerKey' : 'AQ~~,AAAA1u88gGk~,tmBYuNAdVdgtccZMqQiemGQppaBGQ4_z'},
	UA       : {'playerId' : '926210538001', 'playerKey' : 'AQ~~,AAAA1vDIkvE~,i2xeGsQLR673hBz63dg10Ip937VIAfWE'},
	UA_RU    : {'playerId' : '926210536001', 'playerKey' : 'AQ~~,AAAA1vDIjwk~,A2lOutVBN3UbEUcePOvvpHzT5fzY9DPx'},
	IE       : {'playerId' : '926196183001', 'playerKey' : 'AQ~~,AAAA1u88WVk~,uCEaQuZ8nzgtayb6cqEcyT1RHclkJG_9'},
	UK       : {'playerId' : '926196181001', 'playerKey' : 'AQ~~,AAAA1u88VXE~,x0_28B_6Zvk93nAEavFzIk_lfMgOCrDt'},
	AE       : {'playerId' : '926251517001', 'playerKey' : 'AQ~~,AAAA1vSqeHE~,sL-qYGp5vDs9lvQC58LpmsrAdgrnDt-w'},
	AE_ARABIC: {'playerId' : '926196197001', 'playerKey' : 'AQ~~,AAAA1u88eJk~,S0yiLpxyHQcCakj-7HKFJS5XjwgkAXtx'},
	IN       : {'playerId' : '926210517001', 'playerKey' : 'AQ~~,AAAA1vDIb8k~,lUaeNA43HwiHGbg_2NeUs3hiAJaenQDK'},
	MY       : {'playerId' : '926196173001', 'playerKey' : 'AQ~~,AAAA1u88RdE~,kPQQqwrYdp4bxmwR-nZmYOOY7ci7Pwgy'},
	ZA       : {'playerId' : '2573241961001', 'playerKey' : 'AQ~~,AAACVrpFDvk~,goA5RG4suySVUwJKOuX3yfgABbX2fkrD'},
	AFRICA_EN: {'playerId' : '926210336001', 'playerKey' : 'AQ~~,AAAA1vc4EME~,Mr9Hje7LqNftSlNIaKpcSkhnqcpbbP89'},
	AFRICA_FR: {'playerId' : '926251525001', 'playerKey' : 'AQ~~,AAAA1vSqiBE~,Qp5WvJFrHi_K02EFeBsQgtJ5MwsmpUMX'},
	AFRICA_PT: {'playerId' : '926196207001', 'playerKey' : 'AQ~~,AAAA1u88iDk~,ccsEg19-CbJkk_zJ9c6aFicBsNvJsIn8'},
	IRAN     : {'playerId' : '926210340001', 'playerKey' : 'AQ~~,AAAA1vc4GJE~,YM3AHViBVn9RFzwbP1jQ_aE5oeVo1AqU'},
	IL       : {'playerId' : '926210540001', 'playerKey' : 'AQ~~,AAAA1vDIltk~,IPAPGgmj_6fc11IflU32LkXpdx93feNU'},
	SA       : {'playerId' : '926196199001', 'playerKey' : 'AQ~~,AAAA1u88fIE~,O2m1MLoG_muG7KThKuLs8ABApukPd0cJ'},
	SA_EN    : {'playerId' : '2573241962001', 'playerKey' : 'AQ~~,AAACVrpFEuE~,IGsISVlCgs-KnLEUg3gHYj5oez9ODaU5'},
	TH       : {'playerId' : '924336529001', 'playerKey' : 'AQ~~,AAAA1vSqSZE~,QkYUAXu3lHXJWLnyQOCo2M0yp2LeVm6X'}
};

var bccPlayer, bccModVP, bccModExp, bccModCc, bccDiv;
var bcChromePlayer = new function(){
	var bccPlayerMap = new BcHashMap();
	var target = this;
	this.myBccplayerData;
	this.bccPlayerData;

	this.onChangeCC = new Object();

	(function( $ ){
		$.fn.bcChromePlayer = function( alais ){

			var bcExperiencesAPI;
			if(bcProtocol){
				bcExperiencesAPI = "//admin.brightcove.com/js/BrightcoveExperiences.js";
			}else{
				bcExperiencesAPI = "//sadmin.brightcove.com/js/BrightcoveExperiences.js";
			}

			var bcc = bcChromePlayer;
			var arr = Array.prototype.slice.call( arguments, 1);

			if(bcc.checkNull(arr[1]))arr[1]="100%";
			if(bcc.checkNull(arr[2]))arr[2]="100%";
			if(bcc.checkNull(arr[3]))arr[3]="false";
			alais = alais.toUpperCase();
			var bccType = (alais=="LIVE")?"videoList":"videoPlayer";

			myBccplayerData = eval("bcChromePlayerData."+alais);
			if(typeof myBccplayerData == "undefined"){
				alert( 'Alais ' +  alais + ' does not exist on jQuery.bcChromePlayer' );
				return;
			}

			bccPlayerData = {
				'alais' : alais,
				'playerId' : myBccplayerData.playerId,
				'playerKey' : myBccplayerData.playerKey,
				'videoId' : arr[0],
				'width' : arr[1],
				'height' : arr[2],
				'autoplay' : arr[3],
				'type' : bccType
			};
			bcCLog(bccPlayerData);
			//hashmap put
			bccPlayerMap.put(bccPlayerData.videoId,bccPlayerData);

			bccDiv = "#myExperience"+bccPlayerData.videoId;

			arr = [ $( this ) ].concat( arr );

			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = bcExperiencesAPI;
			if(s.readyState) {
				document.getElementsByTagName('head')[0].appendChild(s);

				s.onreadystatechange= function () {
					if(getIeVersion() == "8.0"){
						if(s.readyState == "loaded" || s.readyState == "complete") {
							s.onreadystatechange = null;
							return bcc["run"].apply( bcc, arr );
						}
					}else{
						if(s.readyState == "loaded" || s.readyState == "complete") {
							return bcc["run"].apply( bcc, arr );
						}
					}
				}
			}else{
				document.body.appendChild(s);
				s.onload = function () {
					return bcc["run"].apply( bcc, arr );
				}
			}
		}
	})( bcjQuery );

	this.run = function( div, vodId){
		//bccDiv = div.selector;

		var bccInfo = bccPlayerMap.get(vodId);
		div.html( this.markup(vodId) ).show();
		div.attr('style',"position:absolute;width:" + bccInfo.width + ";height:" + bccInfo.height + ";top:0px;bottom:0px;right:0px;left:0px;");

		brightcove.createExperiences();
		if(bcBrowser){
			div.find("object").bccPlayerControls(bccInfo.videoId, bccInfo.width, bccInfo.height);
		}else{

			var a ='.bc-cplayer-area{display: block; position: relative; padding-top: 56.25%;}';
			var b,c,d;
			d = document.getElementsByTagName("head")[0];
			if (document.createStyleSheet) {
				b = document.createStyleSheet();
				b.cssText = a;
			} else {
				c = document.createElement("style");
				c.type = "text/css";
				if (c.styleSheet) {
					c.styleSheet.cssText = a
				} else {
					c.appendChild(document.createTextNode(a))
				}
				d.appendChild(c);
			}

		}
		if(getIeVersion() != -1){
			div.children('span').css('display','');
		}
		return div;
	};

	this.markup = function(vodId){
		var bccInfo = bccPlayerMap.get(vodId);
		var markup = '';
		markup += '<object id="myExperience' + bccInfo.videoId + '" class="BrightcoveExperience">';
		markup += '<param name="bgcolor" value="#FFFFFF" />';
		markup += '<param name="width" value="' + bccInfo.width + '" />';
		markup += '<param name="height" value="' + bccInfo.height + '" />';
		markup += '<param name="playerID" value="' + bccInfo.playerId + '" />';
		markup += '<param name="playerKey" value="' + bccInfo.playerKey + '" />';
		markup += '<param name="wmode" value="transparent">';
		markup += '<param name="isVid" value="true" />';
		markup += '<param name="isUI" value="true" />';
		markup += '<param name="autoStart" value="'+bccInfo.autoplay+'" />';
		markup += '<param name="includeAPI" value="true" />';
		markup += '<param name="templateLoadHandler" value="myTemplateLoaded" />';
		markup += '<param name="dynamicStreaming" value="true" />';
		markup += '<param name="@' + bccInfo.type + '" value="' + bccInfo.videoId + '" />';
		if(!bcProtocol){
			markup += '<param name="secureConnections" value="true" />';
			markup += '<param name="secureHTMLConnections" value="true" /> ';
		}

		markup += '</object>';

		return markup;
	};

	this.getValue = function ( att ){
		var ret = [];
		if ( ret == null ){
			return null;
		}else{
			return ( typeof( att ) == 'string' ) ? ret[att] : ret;
		}
	};
	this.setValue = function ( name, value ){
		var ret = [];
		for ( var i in value ){
			 ret[i] = value[i];
		}
	};
	this.checkNull = function ( val ){
		return ( val == null || val == '' );
	};
};
//size resize
bcjQuery(window).resize(function(){
	if(bccModExp != undefined){
		onBcVideoSize();
	}
});
function onBcVideoSize(){

	var width = $(bccDiv).parent().width();
	var height = $(bccDiv).parent().height();
	bcCLog("onBcVideoSize width:"+width +" / height:"+height);
	if (bccModExp && bccModExp.experience.type === "html") {
        bccModExp.setSize(width, height);
    }
}
function bccTemplateLoaded( experienceID ){
	bcCLog("]]bccTemplateLoaded");
	if(bcBrowser){
		bccModVP = brightcove.getExperience( experienceID).getModule( APIModules.VIDEO_PLAYER );
		bccModExp = brightcove.getExperience(experienceID).getModule( APIModules.EXPERIENCE );
	}else{
		bccModVP = brightcove.api.getExperience( experienceID).getModule( brightcove.api.modules.APIModules.VIDEO_PLAYER );
		bccModExp = brightcove.api.getExperience(experienceID).getModule( brightcove.api.modules.APIModules.EXPERIENCE );
	}
	bccModVP.addEventListener( BCMediaEvent.CHANGE, onBccVideoLoad );
	bccModVP.addEventListener( BCMediaEvent.BEGIN, onBccVideoReady );
	bccModVP.addEventListener( BCMediaEvent.PLAY, onBccVideoPlay );
	bccModVP.addEventListener( BCMediaEvent.STOP, onBccVideoStop );
}

function onDFXPStyle(e){
	bcCLog("]]onDFXPStyle");
	//bcCLog(bccModCc.getCaptionsEnabled());
}
function onBccVideoLoad( e ){
	bcCLog("]]onBccVideoLoad");
	bccStatusCcFlag[e.media.id] = false;
	if(e.media.captions != null){
		bccStatusCcFlag[e.media.id] = true;
	}
}

function onBccVideoReady( e ){
	bcCLog("]]onBccVideoReady");
	if(e.media.lineupId == 0){
		if(bcjQuery("#myExperience" + e.media.id).length){
			bcjQuery("#myExperience" + e.media.id).parents(".bc-cplayer-control-area").attr("nowVideo",e.media.id);
			if(e.media.captions != null){
				bcjQuery("#myExperience" + e.media.id).parents(".bc-cplayer-control-area").find(".bc-cc").attr("tabindex","0");
			}
			if(bccStatusCcFlag[e.media.id]){
				bcjQuery("#myExperience" + e.media.id).parents(".bc-cplayer-control-area").find(".bc-cc").removeClass("over").addClass("on");
			}else{
				bcjQuery("#myExperience" + e.media.id).parents(".bc-cplayer-control-area").find(".bc-cc").removeClass("on").removeClass("over");
			}
		}
	}else{
		var vp = brightcove.getExperience( "myExperience" + e.media.lineupId ).getModule( APIModules.VIDEO_PLAYER );
		if(e.media.captions != null){
			bccStatusCcFlag[e.media.id] = true;
		}
		if(bcjQuery("#myExperience" + e.media.lineupId).length){
			bcjQuery("#myExperience" + e.media.lineupId).parents(".bc-cplayer-control-area").attr("nowVideo",e.media.id);
			if(e.media.captions != null){
				bcjQuery("#myExperience" + e.media.lineupId).parents(".bc-cplayer-control-area").find(".bc-cc").attr("tabindex","0");
			}
			if(bccStatusCcFlag[e.media.lineupId]){
				bcjQuery("#myExperience" + e.media.lineupId).parents(".bc-cplayer-control-area").find(".bc-cc").removeClass("on").addClass("over");
			}else{
				bcjQuery("#myExperience" + e.media.lineupId).parents(".bc-cplayer-control-area").find(".bc-cc").removeClass("over").addClass("on");
			}
		}
	}

}


function onBccVideoPlay(e){
	bcCLog("]] onBccVideoPlay " +e.media.id);
	var configId = bcjQuery("#myExperience"+e.media.id).parents(".bc-cplayer-control-area").attr('id').split('bc-cplayer-control-area_');
	bcjQuery("#myExperience"+e.media.id).parents(".bc-cplayer-control-area").find(".play").removeClass('play').addClass('pause').attr({'title':bccMsg["text_02"], 'id':'pause-'+configId[1]}).text(bccMsg["text_02"]);
}
function onBccVideoStop(e){
	bcCLog("]] onBccVideoStop "+e.media.id);
	var configId = bcjQuery("#myExperience"+e.media.id).parents(".bc-cplayer-control-area").attr('id').split('bc-cplayer-control-area_');
	bcjQuery("#myExperience"+e.media.id).parents(".bc-cplayer-control-area").find(".pause").removeClass('pause').addClass('play').attr({'title':bccMsg["text_01"], 'id':'play-'+configId[1]}).text(bccMsg["text_01"]);
}

(function($){
	$.fn.bccPlayerControls = function(videoID, vWidth, vHeight){

		var a ='.bc-cplayer-area{display: block; position: relative; max-width: 100%;padding-top: 56.25%;}.bc-cplayer-control-area{overflow:hidden}.bc-cplayer-control{position:relative;opacity:0.01;z-index:0;background-image:url(/common/brightcove/img/bg_panel.gif);width:100%;height:40px;overflow:hidden}.bc-cplayer-control.show {opacity:1 !important;z-index:4000 !important;}.bc-cplayer-control .leftPanel {float:left}.bc-cplayer-control .rightPanel {float:right}.bc-cplayer-container .video{position:relative;	top:-40px;z-index:3000;width:100%;height:100%}.bc-cplayer-control button {float:left;width:50px;height:40px;overflow:hidden;padding-top:40px;font-family: Arial, verdana, sans-serif;color: #000;font-size: 1.1em;background-repeat: no-repeat; border:none;}.bc-cplayer-control button:focus{border:white solid 1px}.bc-cplayer-control .rewind {background-image: url(/common/brightcove/img/btn_rewind.gif); }    .bc-cplayer-control .play {background-image: url(/common/brightcove/img/btn_play.gif);}    .bc-cplayer-control .pause {background-image: url(/common/brightcove/img/btn_pause.gif); }    .bc-cplayer-control .forward {background-image: url(/common/brightcove/img/btn_forward.gif); }.bc-cplayer-control .mute {background-image: url(/common/brightcove/img/btn_volon.gif); }.bc-cplayer-control .volume-down {background-image: url(/common/brightcove/img/btn_voldown.gif); }.bc-cplayer-control .volume-up {background-image: url(/common/brightcove/img/btn_volup.gif); }.bc-cplayer-control .muted{background-image: url(/common/brightcove/img/btn_volmute.gif);}.bc-cplayer-control .rightPanel a {overflow:hidden;display:inline-block;float:left;height:40px;}.bc-cplayer-control .rightPanel button.bc-cc {width:34px;background-image:url(/common/brightcove/img/btn_bc_cc.png);}.bc-cplayer-control .rightPanel button.bc-cc.over {background-image:url(/common/brightcove/img/btn_bc_cc_over.png) !important;}.bc-cplayer-control .rightPanel button.bc-cc.on {background-image:url(/common/brightcove/img/btn_bc_cc_on.png) !important;}.end-of-bc{overflow:hidden;width:0px;height:0px;position:absolute}';
		//dev
		//var a ='.bc-cplayer-area{display: block; position: relative; padding-top: 56.25%;}.bc-cplayer-control-area{overflow:hidden;height:100%}.bc-cplayer-control{position:relative;opacity:0.01;z-index:0;background-image:url(/brightcove/test/module/img/bg_panel.gif);width:100%;height:40px;overflow:hidden}.bc-cplayer-control.show {opacity:1 !important;z-index:4000 !important;}.bc-cplayer-control .leftPanel {float:left}.bc-cplayer-control .rightPanel {float:right}.bc-cplayer-container .video{position:relative;	top:-40px;z-index:3000;width:100%;height:100%}.bc-cplayer-control button {float:left;width:50px;height:40px;overflow:hidden;padding-top:40px;font-family: Arial, verdana, sans-serif;color: #000;font-size: 1.1em;background-repeat: no-repeat; border:none;}.bc-cplayer-control button:focus{border:white solid 1px}.bc-cplayer-control .rewind {background-image: url(/brightcove/test/module/img/btn_rewind.gif); }    .bc-cplayer-control .play {background-image: url(/brightcove/test/module/img/btn_play.gif);}    .bc-cplayer-control .pause {background-image: url(/brightcove/test/module/img/btn_pause.gif); }    .bc-cplayer-control .forward {background-image: url(/brightcove/test/module/img/btn_forward.gif); }.bc-cplayer-control .mute {background-image: url(/brightcove/test/module/img/btn_volon.gif); }.bc-cplayer-control .volume-down {background-image: url(/brightcove/test/module/img/btn_voldown.gif); }.bc-cplayer-control .volume-up {background-image: url(/brightcove/test/module/img/btn_volup.gif); }.bc-cplayer-control .muted{background-image: url(/brightcove/test/module/img/btn_volmute.gif);}.bc-cplayer-control .rightPanel a {overflow:hidden;display:inline-block;float:left;height:40px;}.bc-cplayer-control .rightPanel button.bc-cc {width:34px;background-image:url(/brightcove/test/module/img/btn_bc_cc.png);}.bc-cplayer-control .rightPanel button.bc-cc.over {background-image:url(/brightcove/test/module/img/btn_bc_cc_over.png) !important;}.bc-cplayer-control .rightPanel button.bc-cc.on {background-image:url(/brightcove/test/module/img/btn_bc_cc_on.png) !important;}.bc-cplayer-control .rightPanel button.bc-fs.on {background-image:url(/brightcove/test/module/img/btn_fs_on.gif) !important;}.bc-cplayer-control .rightPanel button.bc-fs.off {background-image:url(/brightcove/test/module/img/btn_fs_off.gif) !important;}.end-of-bc{overflow:hidden;width:0px;height:0px;position:absolute}';
		var b,c,d;
		d = document.getElementsByTagName("head")[0];
		if (document.createStyleSheet) {
			b = document.createStyleSheet();
			b.cssText = a;
		} else {
			c = document.createElement("style");
			c.type = "text/css";
			if (c.styleSheet) {
				c.styleSheet.cssText = a
			} else {
				c.appendChild(document.createTextNode(a))
			}
			d.appendChild(c);
		}
		var config = {
			id: 'bc'+bcc_idx
		};
		var vp = null;
		var vpMenu = null;
		var vpCaption = null;
		var vpExp = null;
		var vpListFlag = false;
		var vpList = null;
		var nowVolume = 0;
		var gapVolume = 1/10;
		var nowPlayCnt = 0;
		var controlOut = false;

		var obj = $(this);
		var areaW = obj.attr("width");
		var areaH = obj.attr("height");

		var startDiv = $("<div />",{"id":"bc-cplayer-control-area_"+bcc_idx}).addClass("bc-cplayer-control-area");
		if (typeof(areaW) != "undefined"){
			startDiv.width(areaW).height(areaH);
		}
		var containerDiv	 = $('<div class="bc-cplayer-container" style="width:'+vWidth+';height:'+vHeight+'"/>');
		var videoDiv	 = $('<div class="video" />');

		var panelDiv = $("<div />").addClass("bc-cplayer-control");
		var leftPanelDiv = $("<div />").addClass("leftPanel");
		var rightPanelDiv = $("<div />").addClass("rightPanel");

		var endDiv = $("<div />",{"class":"end-of-bc"}).html("<a href='#' onclick='return false;'>"+bccMsg["text_10"] +"</a>");

		obj.after(startDiv);
		startDiv.append(containerDiv);

		panelDiv.append(leftPanelDiv);
		panelDiv.append(rightPanelDiv);

		containerDiv.append(panelDiv);
		containerDiv.append(videoDiv);
		obj.appendTo(videoDiv);

		startDiv.after(endDiv);

		if(startDiv.parent("div").length && areaH == "100%"){
			startDiv.parent("div").height("100%");
		}

		var getPlayer = function(){
			if(vp){
				return vp;
			}else{
				vp = brightcove.getExperience( "myExperience" + videoID ).getModule( APIModules.VIDEO_PLAYER );
				vpMenu = brightcove.getExperience( "myExperience" + videoID ).getModule( APIModules.MENU )
				vpCaption = brightcove.getExperience( "myExperience" + videoID ).getModule( APIModules.CAPTIONS );
				vpExp = brightcove.getExperience( "myExperience" + videoID ).getModule( APIModules.EXPERIENCE );
				_chromelessPlayer = vpExp.getElementByID("videoPlayer");
				_chromelessControls = _chromelessPlayer.getControls();

				return vp;
			}
		};

		var createButton = function(action, name) {
			var label = 0;
			var btnId = [action, config.id].join('-');
			var btnArea = $('<button />').append(name).addClass(action).attr({'title':name, 'id':btnId});
			return btnArea;
		};
		var play = function(){
			var player = getPlayer();
			vpMenu.closeMenuPage();
			player.play();
			return false;
		};
		var pause = function(){
			var player = getPlayer();
			if(player.isPlaying()){
				player.pause();
			}else{
				vpMenu.closeMenuPage();
			}
			return false;
		};
		var mute = function(){
			var player = getPlayer();
			var volume = player.getVolume();
			if(volume){
				nowVolume = volume;
				muteBtn.addClass('muted');
				player.setVolume(0);
				player.mute();
			}else{
				if(muteBtn.hasClass('muted')){
					muteBtn.removeClass('muted');
				}
				if(nowVolume){
					player.setVolume(nowVolume);
				}else{
					player.setVolume(gapVolume);
				}
			}
			return false;
		};
		var volup = function(){
			var player = getPlayer();
			var volume = player.getVolume();
			if((volume*10)+(gapVolume*10) > 10){
				nowVolume = 1;
				player.setVolume(nowVolume);
			}else{
				nowVolume = (volume*10)+(gapVolume*10);
				player.setVolume(Math.round(nowVolume)/10);
			}
			if(muteBtn.hasClass('muted')){
				muteBtn.removeClass('muted');
			}
			return false;
		};
		var voldwn = function(){
			var player = getPlayer();
			var volume = player.getVolume();
			if((volume*10)-(gapVolume*10) <= 0){
				nowVolume = 0;
				muteBtn.addClass('muted');
				player.setVolume(nowVolume);
				player.mute();
			}else{
				nowVolume = (volume*10)-(gapVolume*10);
				player.setVolume(Math.round(nowVolume)/10);
			}
			return false;
		};

		var playBtn =createButton("play", bccMsg["text_01"]).attr({'aria-live':'assertive'}).bind({
			"click.fe_brightcove" : function(){
				if($(this).hasClass('play')){
					$(this).removeClass('play').addClass('pause').attr({'title':bccMsg["text_02"], 'id':'pause-'+config.id}).text(bccMsg["text_02"]);
					play();
				}else{
					$(this).removeClass('pause').addClass('play').attr({'title':bccMsg["text_01"], 'id':'play-'+config.id}).text(bccMsg["text_01"]);
					pause();
				}
			},
			"focusin.fe_brightcove" : function(){
				panelDiv.addClass("show");
			},
			"keydown.fe_brightcove" : function(e){
				if ( e.keyCode === 9 && e.shiftKey ) {
					panelDiv.removeClass("show");
				}
			}
		});
		playBtn.appendTo(leftPanelDiv);
		var muteBtn = createButton('mute', bccMsg["text_06"]).bind("click.fe_brightcove",function(){mute();});
		var dwnBtn = createButton("volume-down", bccMsg["text_08"]).bind("click.fe_brightcove",function(){voldwn();});
		var upBtn = createButton("volume-up",bccMsg["text_07"]).bind({
			"click.fe_brightcove" : function(){volup();},
			"focusin.fe_brightcove" : function(){
				panelDiv.addClass("show");
			},
			"keydown.fe_brightcove" : function(e){
				if ( e.keyCode === 9 && !e.shiftKey ) {
					panelDiv.removeClass("show");
					controlOut = true;
					endDiv.find("a").trigger("focus");
				}
			}
		});
		var btnCC = $("<button />",{"class":"bc-cc","tabindex":"-1"});
		btnCC.text(bccMsg["text_22"]);
		btnCC.appendTo(rightPanelDiv);
		var flagCC = false;
		var ccStatus = true;
		btnCC.unbind("click.fe_brightcove").bind("click.fe_brightcove",function(){
			var currentVideo = $(".bc-cplayer-control-area").attr("nowvideo");
			var player = getPlayer();
			if(bccStatusCcFlag[currentVideo]){
				if(btnCC.hasClass("over")){
					flagCC = false;
					btnCC.removeClass("over").addClass("on").attr({'title':bccMsg["text_21"]}).text(bccMsg["text_21"]);
				}else{
					flagCC = true;
					btnCC.removeClass("on").addClass("over").attr({'title':bccMsg["text_20"]}).text(bccMsg["text_20"]);
				}
				vpCaption.setCaptionsEnabled(flagCC);
				_chromelessControls.setVisible(flagCC==true?false:true);
			}else{
				btnCC.attr({'title':bccMsg["text_22"]}).text(bccMsg["text_22"]);
			}
			return false;
		});

		muteBtn.appendTo(rightPanelDiv);
		dwnBtn.appendTo(rightPanelDiv);
		upBtn.appendTo(rightPanelDiv);

		var agent = navigator.userAgent.toLowerCase();
		var ieUse = false;
		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			ieUse = true;
		}else{
			ieUse = false;
		}
		endDiv.find("a").bind(ieUse==true?"onfocusin.fe_brightcove":"focusin.fe_brightcove",function(){
			if(controlOut){
				controlOut = false;
			}else{
				upBtn.trigger("focus");
				controlOut = false;
				return false;
			}
		});

		endDiv.find("a").bind("keydown.fe_brightcove",function(e){
			if ( e.keyCode === 9 && e.shiftKey ) {
				upBtn.trigger("focus");
				return false;
			}
		});
		bcc_idx++;
		return false;
	};
})(bcjQuery);

bcjQuery(document).ready(function(){
	if(typeof(APIModules) == "undefined"){
		if(bcProtocol){
			$("body").append('<script type="text/javascript" src="//admin.brightcove.com/js/APIModules_all.js"></script>');
		}else{
			$("body").append('<script type="text/javascript" src="//sadmin.brightcove.com/js/APIModules_all.js"></script>');
		}
	}
	bcjQuery('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close').on('click', function(){
		bccLayerClose(this);
	});
});
function brightcoveBccPlayerLayer(divId, aliasId, videoId, width, height, autoplay){

	bcjQuery('#'+divId).bcChromePlayer(aliasId,videoId,width,height, autoplay);
	bcjQuery('#'+divId).attr('style',"width:" + width + "; height:" + height + ";position:absolute;top:0px;bottom:0px;right:0px;left: 0px;");

	area = bcjQuery("#"+divId).parents('.video-area_5').wrapAll("<div/>").parent();
	area.find(".video-area_5").show();
	area.find(".brightCoveArea").show();
	bcjQuery('body').addClass('video-open');

	_video_wrap_5 = area.find(".video-wrap_5");

	var top =  Math.max(0, ((bcjQuery(window).height() - _video_wrap_5.outerHeight()) / 2) + bcjQuery(window).scrollTop());
	var left =  Math.max(0, ((bcjQuery(window).width() - _video_wrap_5.outerWidth()) / 2) + bcjQuery(window).scrollLeft());
	_video_wrap_5.css({"left":left+"px", "top":top+"px"}).show().focus();

}

function bccLayerClose(my){
	var target = bcjQuery("#" + ( bcjQuery(my).data("div-id") === undefined ? bcjQuery(my).data("video-id") : bcjQuery(my).data("div-id"))),
	area = target.closest('.video-area_5'),
	wrap = target.closest('.video-wrap'),
	isVidOpen = false;

	if (window.videojs) {
		var disposeTargetId = target.find('.video-js').attr('id');
		if (disposeTargetId) {
			videojs(document.getElementById(disposeTargetId)).dispose();
		}
	}

	area.hide(0);
	target.html('');

	$.each(bcjQuery('.video-area_5'), function() {
		if ($(this).is(':visible')) {
			isVidOpen = true;
			return false;
		}
	});

	area.find(".video-wrap .vjs-big-play-button").focus();
	//bcjQuery(".video-wrap .vjs-big-play-button").focus();

	if (!isVidOpen || bcjQuery('body').hasClass('video-layer-open')) {
		bcjQuery('body').removeClass('video-open');
		bcjQuery('body').removeClass('video-layer-open');
	}
}

var bc5playerData = {
	DEV : {'accountId' : '901961867001', 'playerId' : 'Skefq0fEUZ'},//v5.24.5
	DEV2 : {'accountId' : '901961867001', 'playerId' : 'Vylv7fdWKl'},//v5.11.4
	LIVE : {'accountId' : '901973578001', 'playerId' : 'rkHiJmE8b'},
	GLOBAL : {'accountId' : '2933392367001', 'playerId' : 'HyinAQ4IW'},
	EG : {'accountId' : '923162680001', 'playerId' : 'r1Wa9zBQ8Z'},
	CN : {'accountId' : '923270636001', 'playerId' : 'SylXp4rXLb'},
	PK : {'accountId' : '923227816001', 'playerId' : 'rkx4vzBm8b'},
	LEVANT : {'accountId' : '923227815001', 'playerId' : 'BkuGfH7IZ'},
	CO : {'accountId' : '923162663001', 'playerId' : 'H1R4Pm7UW'},
	SG : {'accountId' : '923162665001', 'playerId' : 'Syz3FXQLW'},
	VN  : {'accountId' : '923136705001', 'playerId' : 'ryMuHjmm8W'},
	US : {'accountId' : '923227797001', 'playerId' : 'B1lhu4BX8Z'},
	HR : {'accountId' : '923270646001', 'playerId' : 'rJ0SpNX8W'},
	RS : {'accountId' : '923162676001', 'playerId' : 'Skf0W64mUW'},
	SI : {'accountId' : '3855502820001', 'playerId' : 'ryKYpN7Lb'},
	AT : {'accountId' : '923227809001', 'playerId' : 'SJqA5VQUb'},
	CH_FR : {'accountId' : '923227810001', 'playerId' : 'SJH8oEQIW'},
	CH : {'accountId' : '923162673001', 'playerId' : 'SyIfiVmUZ'},
	AR : {'accountId' : '923270634001', 'playerId' : 'SkoYw7mLZ'},
	PY : {'accountId' : '4455299568001', 'playerId' : 'SyZFOmXIZ'},
	UR : {'accountId' : '4455299570001', 'playerId' : 'ryezNOmXUZ'},
	AU : {'accountId' : '923162666001', 'playerId' : 'H12xqm7Ub'},
	NZ : {'accountId' : '923136704001', 'playerId' : 'BJ7brcXm8W'},
	EE : {'accountId' : '923227812001', 'playerId' : 'rytC3E7LW'},
	LV : {'accountId' : '923270644001', 'playerId' : 'rylCU2NmLW'},
	LT : {'accountId' : '923227813001', 'playerId' : 'BkR5nNXUW'},
	BE : {'accountId' : '923136716001', 'playerId' : 'H1gxqi4Q8b'},
	BE_FR : {'accountId' : '923162674001', 'playerId' : 'rkERsVX8Z'},
	NL : {'accountId' : '923136717001', 'playerId' : 'SklAMhEQ8Z'},
	JP : {'accountId' : '923162668001', 'playerId' : 'H1elEC7Q8W'},
	SEC : {'accountId' : '923136708001', 'playerId' : 'BJmCHrmIb'},
	CA : {'accountId' : '923270632001', 'playerId' : 'BJ04MQXLb'},
	CA_FR : {'accountId' : '923227798001', 'playerId' : 'rkjclX78W'},
	CL : {'accountId' : '923227801001', 'playerId' : 'Sy8mK7Q8Z'},
	CZ : {'accountId' : '923270642001', 'playerId' : 'rJ1TKEXLW'},
	SK : {'accountId' : '923227808001', 'playerId' : 'rylQe94mIb'},
	BR : {'accountId' : '923162661001', 'playerId' : 'rkrg7XmUW'},
	FR : {'accountId' : '923227807001', 'playerId' : 'SkXZOV7Ub'},
	GR : {'accountId' : '923136713001', 'playerId' : 'HJZ0dEmUZ'},
	DE : {'accountId' : '923227805001', 'playerId' : 'HylzJLVQLW'},
	HU : {'accountId' : '923270637001', 'playerId' : 'H14LrEQLb'},
	HK : {'accountId' : '923227804001', 'playerId' : 'S1e6xSr7Ib'},
	HK_EN : {'accountId' : '923136709001', 'playerId' : 'BJnNrrmLZ'},
	IT : {'accountId' : '923136712001', 'playerId' : 'rkgapeE78W'},
	ID : {'accountId' : '923162667001', 'playerId' : 'ryx3c97XUZ'},
	KZ_UR : {'accountId' : '923270647001', 'playerId' : 'HJZfeBQLZ'},
	LATIN : {'accountId' : '923136703001', 'playerId' : 'BJxSu7XQUb'},
	LATIN_EN : {'accountId' : '923227800001', 'playerId' : 'r1WoKH7QIW'},
	VE : {'accountId' : '923162662001', 'playerId' : 'rJhxEsPMz'},//v5.28.1
	MX : {'accountId' : '923227799001', 'playerId' : 'SJX05MXQUb'},
	N_AFRICA : {'accountId' : '923227817001', 'playerId' : 'ByImXr78W'},
	DK : {'accountId' : '923270638001', 'playerId' : 'Hyb1DEQ8W'},
	FI : {'accountId' : '923162672001', 'playerId' : 'HkUXD4XUZ'},
	NO : {'accountId' : '923227806001', 'playerId' : 'B1I2PVmLb'},
	SE : {'accountId' : '923162671001', 'playerId' : 'B1jKIVQ8b'},
	PT : {'accountId' : '923270640001', 'playerId' : 'SJburdEmUZ'},
	PH : {'accountId' : '923136707001', 'playerId' : 'r1Mnk67XUZ'},
	PL : {'accountId' : '923270641001', 'playerId' : 'BkjYdNQUZ'},
	PE : {'accountId' : '923162664001', 'playerId' : 'rkXuK77UZ'},
	RU : {'accountId' : '923136718001', 'playerId' : 'BkZBHJrXUW'},
	BG : {'accountId' : '923270643001', 'playerId' : 'r1cK5EmIW'},
	RO : {'accountId' : '923136715001', 'playerId' : 'r1gR45NXIZ'},
	ES : {'accountId' : '923162670001', 'playerId' : 'H1xJrNQUW'},
	TW : {'accountId' : '923270635001', 'playerId' : 'BywFHHmUZ'},
	TR : {'accountId' : '923136721001', 'playerId' : 'r175Zrm8Z'},
	UA : {'accountId' : '923162678001', 'playerId' : 'S1SKkrQIb'},
	UA_RU : {'accountId' : '923162677001', 'playerId' : 'B1Ba1rX8Z'},
	IE : {'accountId' : '923136711001', 'playerId' : 'B1DVe4m8Z'},
	UK : {'accountId' : '923136710001', 'playerId' : 'SycJx4QLW'},
	AE : {'accountId' : '923227814001', 'playerId' : 'BygNUlrX8b'},
	AE_ARABIC : {'accountId' : '923136719001', 'playerId' : 'BJjKlS7UZ'},
	IN : {'accountId' : '923162669001', 'playerId' : 'S1KRCQX8W'},
	MY : {'accountId' : '923136706001', 'playerId' : 'B1EqjmQIW'},
	ZA : {'accountId' : '2571515531001', 'playerId' : 'S1fb7VSQUb'},
	AFRICA_EN : {'accountId' : '923270648001', 'playerId' : 'HJKv7H7UZ'},
	AFRICA_FR : {'accountId' : '923227818001', 'playerId' : 'SkmimH7LZ'},
	AFRICA_PT : {'accountId' : '923136723001', 'playerId' : 'S1b8yEBXLb'},
	IRAN : {'accountId' : '923270650001', 'playerId' : 'r1YRZSmIZ'},
	IL : {'accountId' : '923162679001', 'playerId' : 'ryloagBXLb'},
	SA : {'accountId' : '923136720001', 'playerId' : 'HyItbbS7Ub'},
	SA_EN : {'accountId' : '2571515532001', 'playerId' : 'SJpHbr7Ub'},
	TH : {'accountId' : '923227802001', 'playerId' : 'ryoyiQXIZ'},
	AL : {'accountId' : '5395474900001', 'playerId' : 'S1WPmS4Rg'},
	LB : {'accountId' : '5359769185001', 'playerId' : 'By5uztNAe'},
	MM : {'accountId' : '5395474902001', 'playerId' : 'BJWPXt4Al'},
	GCS : {'accountId' : '1852113008001', 'playerId' : 'B1HX3oXbG'},
	SC : {'accountId' : '1275380501001', 'playerId' : 'rJUZMbBZG'},
	LED : {'accountId' : '2172563229001', 'playerId' : 'SJEqMbSWM'},
	UK_CS : {'accountId' : '5675787969001', 'playerId' : 'Hkmjd40bM'},
	DE_CS : {'accountId' : '5675787970001', 'playerId' : 'ByxCBuECZG'},
	BE_CS : {'accountId' : '5675787971001', 'playerId' : 'r1SZIVRWf'},
	BE_FR_CS : {'accountId' : '5675787972001', 'playerId' : 'r16xOECbz'},
	NL_CS : {'accountId' : '5675788007001', 'playerId' : 'HymXOVAWf'},
	ACE : {'accountId' : '5685289444001', 'playerId' : 'Byn7wEUzz'},

	US_CS : {'accountId' : '5709700875001', 'playerId' : 'SJC96gsNf'},
	CA_FR_CS : {'accountId' : '5709700876001', 'playerId' : 'rye60eiNG'},
	CA_CS : {'accountId' : '5709700877001', 'playerId' : 'BJJnCxi4z'},
	MX_CS : {'accountId' : '5709700878001', 'playerId' : 'SyFThbi4G'},
	BR_CS : {'accountId' : '5709700879001', 'playerId' : 'rypXhbjEf'},
	LATIN_CS : {'accountId' : '5709700880001', 'playerId' : 'rJ3qnZoVz'},
	LATIN_EN_CS : {'accountId' : '5709700881001', 'playerId' : 'rJSnnZjNz'},
	VE_CS : {'accountId' : '5709700882001', 'playerId' : 'HyyTnWo4M'},
	CO_CS : {'accountId' : '5709700883001', 'playerId' : 'B1sd6ejEf'},
	AR_CS : {'accountId' : '5709700884001', 'playerId' : 'ByGBCloVz'},
	CL_CS : {'accountId' : '5709700885001', 'playerId' : 'HyjTClsVf'},
	PE_CS : {'accountId' : '5709700887001', 'playerId' : 'H1qXpZs4z'},
	SG_CS : {'accountId' : '5709700888001', 'playerId' : 'BywY6goNz'},
	AU_CS : {'accountId' : '5709700889001', 'playerId' : 'rkZZPClsEf'},
	NZ_CS : {'accountId' : '5709700890001', 'playerId' : 'H1jD0xsVf'},
	ID_CS : {'accountId' : '5709700891001', 'playerId' : 'rJnOhZi4f'},
	TH_CS : {'accountId' : '5711373553001', 'playerId' : 'SkiJkGsNG'},
	VN_CS : {'accountId' : '5711373555001', 'playerId' : 'rJmcTxiEz'},
	MY_CS : {'accountId' : '5711373556001', 'playerId' : 'SJxYtAZiVG'},
	PH_CS : {'accountId' : '5711373557001', 'playerId' : 'BJ8M6Wj4M'},
	TW_CS : {'accountId' : '5711373558001', 'playerId' : 'rJxptpbo4f'},
	JP_CS : {'accountId' : '5711373559001', 'playerId' : 'Bk4j0ljVG'},
	IN_CS : {'accountId' : '5711373560001', 'playerId' : 'Sk7CdCZjNG'},
	CN_CS : {'accountId' : '5711373561001', 'playerId' : 'S1xr6gsNz'},
	HK_CS : {'accountId' : '5711373562001', 'playerId' : 'HJsUhboVf'},
	HK_EN_CS : {'accountId' : '5711373563001', 'playerId' : 'H1vvhboNf'},
	IE_CS : {'accountId' : '5711373564001', 'playerId' : 'HJgpICZjVM'},
	IT_CS : {'accountId' : '5711373565001', 'playerId' : 'H1Md2boEf'},
	ES_CS : {'accountId' : '5711373566001', 'playerId' : 'By1FaWoNG'},
	HU_CS : {'accountId' : '5711373567001', 'playerId' : 'Bye0rnZoVG'},
	SE_CS : {'accountId' : '5711373568001', 'playerId' : 'Skhl6biEf'},
	DK_CS : {'accountId' : '5711373569001', 'playerId' : 'HkxTRhWjVG'},
	FI_CS : {'accountId' : '5711373571001', 'playerId' : 'Bydk6ZiNM'},
	NO_CS : {'accountId' : '5711373572001', 'playerId' : 'rkMeTWjEz'},
	FR_CS : {'accountId' : '5711373573001', 'playerId' : 'S1ONnWs4G'},
	PT_CS : {'accountId' : '5711373574001', 'playerId' : 'rkZwWaWiVz'},
	PL_CS : {'accountId' : '5711373575001', 'playerId' : 'HyxXTWiVG'},
	GR_CS : {'accountId' : '5711373576001', 'playerId' : 'Hkx7S3WsNM'},
	CZ_CS : {'accountId' : '5711373577001', 'playerId' : 'SJOfnWjEf'},
	SK_CS : {'accountId' : '5711373578001', 'playerId' : 'rkm7hZoNG'},
	RO_CS : {'accountId' : '5711373579001', 'playerId' : 'Sk2D6ZoEG'},
	BG_CS : {'accountId' : '5711373580001', 'playerId' : 'BkzvaZjVG'},
	AT_CS : {'accountId' : '5711373581001', 'playerId' : 'SkaMRgjEz'},
	CH_CS : {'accountId' : '5711373582001', 'playerId' : 'SJumAxjEG'},
	CH_FR_CS : {'accountId' : '5711373583001', 'playerId' : 'BylOVAxoVM'},
	LV_CS : {'accountId' : '5711373584001', 'playerId' : 'B1CFCloEG'},
	LT_CS : {'accountId' : '5711373585001', 'playerId' : 'rytcRljEz'},
	EE_CS : {'accountId' : '5711373586001', 'playerId' : 'ryfYAljEG'},
	RS_CS : {'accountId' : '5711373587001', 'playerId' : 'Skmu3agsEf'},
	HR_CS : {'accountId' : '5711373588001', 'playerId' : 'Bkcials4G'},
	RU_CS : {'accountId' : '5711373589001', 'playerId' : 'BJxrLabiNz'},
	UA_CS : {'accountId' : '5711373590001', 'playerId' : 'SylNBRZiVG'},
	UA_RU_CS : {'accountId' : '5711373592001', 'playerId' : 'rygURWsNM'},
	KZ_RU_CS : {'accountId' : '5711373593001', 'playerId' : 'BJq31zoVG'},
	AE_CS : {'accountId' : '5711373594001', 'playerId' : 'HJgEORWiNz'},
	AE_ARABIC_CS : {'accountId' : '5711373595001', 'playerId' : 'H1ecP0biEG'},
	IL_CS : {'accountId' : '5711373596001', 'playerId' : 'SyyCCZs4G'},
	SA_CS : {'accountId' : '5711373597001', 'playerId' : 'Skd0AboVz'},
	SA_EN_CS : {'accountId' : '5711373598001', 'playerId' : 'BJfkyGoEM'},
	TR_CS : {'accountId' : '5711373599001', 'playerId' : 'Hku9aWi4M'},
	IRAN_CS : {'accountId' : '5711373600001', 'playerId' : 'HkVTCWjVz'},
	LEVANT_CS : {'accountId' : '5711373601001', 'playerId' : 'HkHwplo4M'},
	PK_CS : {'accountId' : '5711373602001', 'playerId' : 'S12rTgoEG'},
	EG_CS : {'accountId' : '5711373603001', 'playerId' : 'SkoQTljVG'},
	N_AFRICA_CS : {'accountId' : '5711373604001', 'playerId' : 'SyeMCnZjNG'},
	AFRICA_EN_CS : {'accountId' : '5711373605001', 'playerId' : 'By1sAbiVM'},
	AFRICA_FR_CS : {'accountId' : '5711373606001', 'playerId' : 'S1MhiRbjEf'},
	AFRICA_PT_CS : {'accountId' : '5711373607001', 'playerId' : 'SyZtnCbs4M'},
	ZA_CS : {'accountId' : '5711373608001', 'playerId' : 'SJNq0Wi4G'},
	SI_CS : {'accountId' : '5711373609001', 'playerId' : 'rJzfRxsVf'},
	PY_CS : {'accountId' : '5711373610001', 'playerId' : 'SkTHCgo4f'},
	UR_CS : {'accountId' : '5711373612001', 'playerId' : 'ByII0eiNf'},
	LB_CS : {'accountId' : '5711373613001', 'playerId' : 'HJK8TlsVz'},
	AL_CS : {'accountId' : '5711373614001', 'playerId' : 'HJjongoEf'},
	MM_CS : {'accountId' : '5711373615001', 'playerId' : 'rkyO6xiNM'}
};

var bcHtml5Player = new function(){
	var bc5PlayerMap = new BcHashMap();
	this.myBc5playerData;
	this.html5playerData;
	this.bc5MyPlayer;
	(function( $ ){
		$.fn.bcHtml5Player = function( alais ){

			var bc5 = bcHtml5Player;
			var arr = Array.prototype.slice.call( arguments, 1);

			if(bc5.checkNull(arr[0]))arr[0]="";//id
			if(bc5.checkNull(arr[1]))arr[1]="";//videoId
			if(bc5.checkNull(arr[2]))arr[2]="100%";//width
			if(bc5.checkNull(arr[3]))arr[3]="100%";//height
			if(bc5.checkNull(arr[4]))arr[4]="false";//autoplay
			if(bc5.checkNull(arr[5]))arr[5]="false";//ccUrl

			myBc5playerData = eval("bc5playerData."+alais.toUpperCase());
			if(typeof myBc5playerData == "undefined"){
				alert( 'Alais ' +  alais + ' does not exist on jQuery.bc5playerData' );
				return;
			}
			html5playerData = {
				'targetId' : this.selector,
				'alais' : alais,
				'id' : arr[0] + '_videoTagID',
				'videoId' : arr[1],
				'width' : arr[2],
				'height' : arr[3],
				'autoplay' : arr[4],
				'ccUrl' : arr[5],
				'accountId' : myBc5playerData.accountId,
				'playerId' : myBc5playerData.playerId,
			};
			bc5PlayerMap.put(html5playerData.videoId,html5playerData);//비디오 정보 put
			arr = [ bcjQuery( this ) ].concat( arr );
			return bc5["run"].apply( bc5, arr );
		}
	})( bcjQuery );

	this.run = function(div, vodTagId, vodId){
		bcCLog("html5 Run!! "+vodId);
		var bc5Info = bc5PlayerMap.get(vodId);//비디오 정보 get
		bcCLog(bc5Info);
		bcCLog("html5 Run End!! ");
		var a ='.vjs-menu li:focus{border:white dashed 1px}.vjs-mouse.vjs-has-started.vjs-user-inactive .vjs-control,.vjs-mouse.vjs-has-started.vjs-user-inactive .vjs-control-bar,.vjs-mouse.vjs-has-started.vjs-user-inactive .vjs-progress-control,.vjs-mouse.vjs-has-started.vjs-user-inactive .vjs-time-divider {transition-delay: 0s!important;-webkit-transition-delay: 0s!important;-moz-transition-delay: 0s!important;-ms-transition-delay: 0s!important;-o-transition-delay: 0s!important;}.vjs-big-play-button {top:0px!important; left:0px!important; right:0px!important; bottom:0px!important; margin:auto!important;}.vjs-big-play-button:focus { border:white dashed 1px }.vjs-play-control:focus{ border:white dashed 1px }.vjs-progress-holder:focus { border:white dashed 1px }.vjs-volume-menu-button:focus { border:white dashed 1px }.vjs-captions-button:focus { border:white dashed 1px }.vjs-fullscreen-control:focus { border:white dashed 1px }.vjs-volume-bar:focus{ border:white dashed 1px }.vjs-control-bar.ie8 {display:none !important;}.vjs-fade-out {display: block;visibility: hidden;opacity: 0;-webkit-transition: visibility 1.5s, opacity 1.5s;-moz-transition: visibility 1.5s, opacity 1.5s;-ms-transition: visibility 1.5s, opacity 1.5s;-o-transition: visibility 1.5s, opacity 1.5s;transition: visibility 1.5s, opacity 1.5s;-webkit-transition-delay: 2s;-moz-transition-delay: 2s;-ms-transition-delay: 2s;-o-transition-delay: 2s;transition-delay: 2s;}';
		/*bom-studio css add*/
		a += "/* for IE */ #brightCoveArea2 span {display:inline !important}/* fix bc html5 player */#brightCoveArea2 .vjs-control-text{display:none !important;}.single-area.video-KV.on {max-height: 810px; overflow: hidden;}.vjs-big-play-button{left:0 !important; right:0 !important; top:0 !important; bottom:0 !important; margin: auto;}.vjs-playing .vjs-big-play-button{display:none !important;}.rtl .vjs-control-bar, .rtl .vjs-control-bar *{direction:ltr !important;}";

		var b,c,d;
		d = document.getElementsByTagName("head")[0];
		if (document.createStyleSheet) {
			b = document.createStyleSheet();
			b.cssText = a;
		} else {
			c = document.createElement("style");
			c.type = "text/css";
			if (c.styleSheet) {
				c.styleSheet.cssText = a
			} else {
				c.appendChild(document.createTextNode(a))
			}
			d.appendChild(c);
		}

		if(getIeVersion() == "8.0"){
			document.createElement('video');
			document.createElement('track');
		}
		var myPlayer = this;
		bcjQuery(div).append(this.markup(vodId));

		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = "//players.brightcove.net/" + bc5Info.accountId + "/" + bc5Info.playerId + "_default/index.min.js";

		if (getIeVersion() === -1) { // ie11, etc
			s.onload = function() {
				setTimeout(function() {
					myPlayer.callback(vodId);
				}, 500);
			}

			document.body.appendChild(s);
		} else { // ie10, ie9, ie8
			if (getIeVersion() === 8) {
				s.onreadystatechange = function () {
					if(s.readyState == "loaded" || s.readyState == "complete") {
						setTimeout(function() {
							myPlayer.callback(vodId);
						}, 500)
					}
				}
				document.body.appendChild(s);
			} else if (getIeVersion() === 9) {
				s.onload = function() {
					setTimeout(function() {
						myPlayer.callback(vodId);
					}, 500);
				};

				bcjQuery(bc5Info.targetId).append(s);
			} else if (getIeVersion() === 10) {
				s.onload = function() {
					setTimeout(function() {
						myPlayer.callback(vodId);
					}, 500);
				}

				document.body.appendChild(s);
			}
		}
	};
	this.markup = function(vodId){
		bcCLog("html5 markup !!!!!!!");
		var bc5Info = bc5PlayerMap.get(vodId);//비디오 정보 get
		bcCLog(bc5Info);
		bcCLog("html5 markup End !!!!!!!");
		var tag = "";
		tag += '<div style="display:block;position:relative;max-width:100%;width:'+bc5Info.width+';height:'+bc5Info.height+';">';
		tag += '<div style="padding-top: 56.25%;">';
		tag += '<video id="'+bc5Info.id+'"';
		tag += ' data-video-id="'+ bc5Info.videoId +'"';
		tag += ' data-account="'+bc5Info.accountId+'"';
		tag += ' data-player="'+bc5Info.playerId+'"';
		tag += ' data-embed="default"';
		tag += ' class="video-js"';
		tag += ' style="width: '+bc5Info.width+'; height: '+bc5Info.height+';  position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"';
		tag += ' controls>'
		if(bc5Info.ccUrl != "false"){
			tag += ' <track kind="captions" src="'+bc5Info.ccUrl+'" srclang="en" label="English" default>';
		}
		tag += ' </video>';
		tag += ' </div></div>';
		return tag;

	};
	this.callback = function(vodId){
		bcCLog("html5 callback !!!!!!!"+vodId);
		var bc5Info = bc5PlayerMap.get(vodId);//비디오 정보 get
		bcCLog(bc5Info.id);
		bcCLog("html5 callback End !!!!!!!");

		videojs(bc5Info.id).ready(function(){
			bc5MyPlayer = this;
			var isAutoPlay = (bc5Info.autoplay === 'true');
			
			bcCLog(bc5MyPlayer);
			bcCLog("html5 callback bc5MyPlayer !!!!!!!");

			// accessibility 5.24.5
			var vjsWrap = bcjQuery("#"+bc5Info.id),
				vjsDockText       = vjsWrap.find('.vjs-dock-text'),
				vjsDockTitle      = vjsWrap.find('.vjs-dock-title'),
				vjsControlText    = vjsWrap.find('.vjs-control-text'),
				vjsControlBar     = vjsWrap.find('.vjs-control-bar'),
				vjsBigPlayButton  = vjsWrap.find('.vjs-big-play-button'),
				vjsProgressHolder = vjsWrap.find('.vjs-progress-holder'),
				vjsProgressBar    = vjsWrap.find('.vjs-tooltip-progress-bar'),
				vjsMenuButton     = vjsWrap.find('.vjs-menu-button'),
				vjsTextTrack      = vjsWrap.find('.vjs-text-track-display');

			vjsProgressHolder.attr({'aria-valuenow': '0'});
			vjsProgressBar.attr({
				'role': 'slider',
				'aria-valuemin': '0',
				'aria-valuemax': '100',
				'aria-valuenow': '0'
			});
			vjsMenuButton.attr('role', 'menu');
			vjsTextTrack.attr('tabIndex', 0);

			if (vjsWrap.closest('.s-video-player, .s-video-container').length) {
				vjsBigPlayButton.attr('title', vjsWrap.closest('.s-video-player, .s-video-container').data('video-title'));
			}

			if (getIeVersion() === 9 || getIeVersion() === 10) { // v5.24 luna-skin caption hover
				vjsWrap.find('.vjs-captions-button').on('mouseenter', function(e) {
					e.stopPropagation();
					bcjQuery(e.currentTarget).find('.vjs-menu-content').css('background-color', 'rgba(43, 51, 63, 0.7)');
				});
			}

			if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { // firefox X button outline
     			var ffCloseBtn = vjsWrap.closest('.video-area_5').find('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close');
     			if (ffCloseBtn.length) {
     				//ffCloseBtn.css('border', 'outline: 1px solid #4d90fe');
     				ffCloseBtn.off('ffoutline').on('focusin.ffoutline', function(e) {
     					ffCloseBtn.css('outline', '1px solid #4d90fe');
     				});
     				ffCloseBtn.off('ffoutline').on('focusout.ffoutline', function(e) {
     					ffCloseBtn.css('outline', 'unset');
     				});
     			}
			}

			if (vjsWrap.hasClass('vjs-v5')) {
			 	var uiFontRest = '',
			 		blankSheet = '', 
			 		createdStyleTag = '',
			 		docHead = null;

			 	uiFontRest = '.vjs-control-bar button { font-family: VideoJS !important; } .vjs-big-play-button { font-family: VideoJS !important; }';

				docHead = document.getElementsByTagName("head")[0];

				if (document.createStyleSheet) {
					blankSheet = document.createStyleSheet();
					blankSheet.cssText = uiFontRest;
				} else {
					createdStyleTag = document.createElement("style");
					createdStyleTag.type = "text/css";

					if (createdStyleTag.styleSheet) {
						createdStyleTag.styleSheet.cssText = uiFontRest;
					} else {
						createdStyleTag.appendChild(document.createTextNode(uiFontRest));
					}
					docHead.appendChild(createdStyleTag);
				}
			}

			var isTabIndexAble = false;

			if (vjsTextTrack.length) {
				vjsTextTrack.off('DOMSubtreeModified.indexable propertychange.indexable')
				.on('DOMSubtreeModified.indexable propertychange.indexable', function(e) {
					e.stopPropagation();

					if (vjsTextTrack.find('div').length > 2) {
						if (!isTabIndexAble) {
							vjsTextTrack.attr('tabindex', 0);
							isTabIndexAble = true;
						}
					} else {
						if (isTabIndexAble) {
							isTabIndexAble = false;
							vjsTextTrack.removeAttr('tabindex');
						}
					}
				});

				vjsTextTrack.trigger('DOMSubtreeModified.indexable propertychange.indexable');
			}
			// ---- accessibility

			// autoplay option
			if (isAutoPlay) {
				vjsBigPlayButton.trigger('click');
			}

			bcjQuery(bc5Info.targetId+" .vjs-volume-menu-button").keydown(function(e) {
				if (e.keyCode == 32) {
					var isVolumeMuted = bc5MyPlayer.muted();
					bc5MyPlayer.muted(isVolumeMuted==true ? false:true);
				}
			});
			bcjQuery(".video-area").find(".vjs-big-play-button").on("keydown", function(e){
				if ( e.which == 9 && e.shiftKey) {
					return false;
				}
			});

			var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
			if(!mobile){
				//fnTabIndexSort(vodId);
			}
		});
	};
	this.checkNull = function ( val ){
		return ( val == null || val == '' );
	};

	function ie9CallBack(vodId){
		bcCLog("html5 ie9 callback !!!!!!!"+vodId);
		var bc5Info = bc5PlayerMap.get(vodId);//비디오 정보 get
		bcCLog(bc5Info);
		bcCLog("html5 ie9 callback End !!!!!!!"+bc5Info.id);

		videojs(bc5Info.id).ready(function(){
			bc5MyPlayer = this;
			bc5MyPlayer.autoplay(eval(bc5Info.autoplay));
			bc5MyPlayer.on("play",function() {
				bcjQuery("#"+bc5Info.id).find(".vjs-big-play-button").hide();
			});
			bcjQuery(bc5Info.targetId+" .vjs-volume-menu-button").keydown(function(e) {
				if (e.keyCode == 32) {
					var isVolumeMuted = bc5MyPlayer.muted();
					bc5MyPlayer.muted(isVolumeMuted==true ? false:true);
				}
			});
			bcjQuery(".video-area").find(".vjs-big-play-button").on("keydown", function(e){
				if ( e.which == 9 && e.shiftKey) {
					return false;
				}
			});
			//fnTabIndexSort(vodId);
		});
	}

	function fnTabIndexSort(vodId){
		bcCLog("html5 fnTabIndexSort !!!!!!!"+vodId);
		var bc5Info = bc5PlayerMap.get(vodId);//비디오 정보 get
		bcCLog(bc5Info);
		bcCLog("html5 fnTabIndexSort End !!!!!!!");

		var agent = navigator.userAgent.toLowerCase();
		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {//IE

		}else{

			bcjQuery(bc5Info.targetId+" .vjs-captions-button").keydown(function(e) {
				if (e.keyCode == 13) {
					bcjQuery(bc5Info.targetId+" .vjs-modal-overlay").hide();
				}
			});
			bcjQuery(bc5Info.targetId+" .vjs-texttrack-settings").keydown(function() {
				bcjQuery(bc5Info.targetId+" .vjs-modal-overlay").css("style","");
			});
		}
	}
	bcjQuery('.brightcove-bcc-btn-close, .brightcove-bc5-btn-close').on('click', function(){
		bc5LayerClose(this);
	});
};

function brightcoveBc5PlayerLayer(countryCd, targetId, id, videoId, width, height, autoplay, ccUrl){
	if (bcjQuery('body').hasClass('video-layer-open') && $('#' + targetId).is(':visible')) {
		return;
	}

	bcjQuery('#'+targetId).bcHtml5Player(countryCd,id,videoId, width, height, autoplay, ccUrl);

	area = bcjQuery("#"+targetId).parents('.video-area_5').wrapAll("<div/>").parent();
	area.find(".video-area_5").show();
	area.find(".brightCoveArea").show();
	bcjQuery('body').addClass('video-open');

	_video_wrap_5 = area.find(".video-wrap_5");

	var top =  Math.max(0, ((bcjQuery(window).height() - _video_wrap_5.outerHeight()) / 2) + bcjQuery(window).scrollTop());
	var left =  Math.max(0, ((bcjQuery(window).width() - _video_wrap_5.outerWidth()) / 2) + bcjQuery(window).scrollLeft());
	_video_wrap_5.css({"left":left+"px", "top":top+"px"}).show().focus();

}

function bc5LayerClose(my){
	var target = bcjQuery("#" + ( bcjQuery(my).data("div-id") === undefined ? bcjQuery(my).data("video-id") : bcjQuery(my).data("div-id"))),
	area = target.closest('.video-area_5'),
	wrap = target.closest('.video-wrap'),
	isVidOpen = false;

	if (window.videojs) {
		var disposeTargetId = target.find('.video-js').attr('id');
		if (disposeTargetId) {
			videojs(document.getElementById(disposeTargetId)).dispose();
		}
	}

	area.hide(0);
	target.html('');

	$.each(bcjQuery('.video-area_5'), function() {
		if ($(this).is(':visible')) {
			isVidOpen = true;
			return false;
		}
	});

	area.find(".video-wrap .vjs-big-play-button").focus();
	//bcjQuery(".video-wrap .vjs-big-play-button").focus();

	if (!isVidOpen|| bcjQuery('body').hasClass('video-layer-open')) {
		bcjQuery('body').removeClass('video-open');
		bcjQuery('body').removeClass('video-layer-open');
	}
}
function getIeVersion(){
	var ver = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			ver = parseFloat(RegExp.$1);
	}
	return ver;
}


function bcCLog(arg){
	// if(console){
		//console.log(arg);
	// }
}
