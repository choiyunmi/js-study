window.Granite = window.Granite || {};

(function(Granite, $) {
    Granite.Util = (function() {

        var self = {
            patchText: function(text, snippets) {
                if (snippets) {
                    if (!$.isArray(snippets)) {
                        text = text.replace("{0}", snippets);
                    } else {
                        for (var i = 0; i < snippets.length; i++) {
                            text = text.replace(("{" + i + "}"), snippets[i]);
                        }
                    }
                }
                return text;
            }

        };

        return self;

    }());

}(Granite, jQuery));


(function (Granite, util, $) {
    Granite.HTTP = (function() {
        var contextPath = null,
            SCRIPT_URL_REGEXP = /^(?:http|https):\/\/[^\/]+(\/.*)\/(?:etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs).*\.js(\?.*)?$/,
            ENCODE_PATH_REGEXP = /[^1\w-\.!~\*'\(\)\/%;:@&=\$,]/,
            loginRedirected = false,
            self = {};
        self.getSchemeAndAuthority = function (url) {
            var end;

            try {
                if (url.indexOf("://") == -1) return ""; // e.g. url was /en.html
                end = url.indexOf("/", url.indexOf("://") + 3);

                return (end == -1) ?
                    url :   // e.g. url was http://www.day.com
                    url.substring(0, end);  // e.g. url was http://www.day.com/en.html
            }
            catch (e) {
                return "";
            }
        };
        self.getContextPath = function () {
            return contextPath;
        };
        self.detectContextPath = function () {
            try {
                if (window.CQURLInfo) {
                    contextPath = CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        // in IE the first script is not the expected widgets js: loop
                        // until it is found
                        var result = SCRIPT_URL_REGEXP.exec(scripts[i].src);
                        if (result) {
                            contextPath = result[1];
                            return;
                        }
                    }
                    contextPath = "";
                }
            } catch (e) {
            }
        };
        self.externalize = function (url) {
            try {
                if (url.indexOf("/") == 0 && contextPath &&
                    url.indexOf(contextPath + "/") != 0) {
                    url = contextPath + url;
                }
            }
            catch (e) {
            }
            return url;
        };
        self.internalize = function (url, doc) {
            if (url.charAt(0) == '/') {
                if (contextPath === url) {
                    return '';
                }
                else if (contextPath && url.indexOf(contextPath + "/") == 0) {
                    return url.substring(contextPath.length);
                } else {
                    return url;
                }
            }

            if (!doc) doc = document;
            var docHost = self.getSchemeAndAuthority(doc.location.href);
            var urlHost = self.getSchemeAndAuthority(url);
            if (docHost == urlHost) {
                return url.substring(urlHost.length + (contextPath ? contextPath.length : 0));
            }
            else {
                return url;
            }
        };
        self.getPath = function (url) {

            if (!url) {
                if (window.CQURLInfo && CQURLInfo.requestPath) {
                    return CQURLInfo.requestPath;
                } else {
                    url = window.location.pathname;
                }
            } else {
                url = self.removeParameters(url);
                url = self.removeAnchor(url);
            }

            url = self.internalize(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i != -1) {
                url = url.substring(0, i);
            }
            return url;
        };
        self.removeAnchor = function (url) {
            if (url.indexOf("#") != -1) {
                return url.substring(0, url.indexOf("#"));
            }
            return url;
        };
        self.removeParameters = function (url) {
            if (url.indexOf("?") != -1) {
                return url.substring(0, url.indexOf("?"));
            }
            return url;
        };
        self.encodePathOfURI = function (url) {
            var parts, delim;
            if (url.indexOf("?") != -1) {
                parts = url.split("?");
                delim = "?";
            }
            else if (url.indexOf("#") != -1) {
                parts = url.split("#");
                delim = "#";
            }
            else {
                parts = [url];
            }
            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = self.encodePath(parts[0]);
            }
            return parts.join(delim);
        };
       self.encodePath = function (path) {
            path = encodeURI(path).replace(/%5B/g, '[').replace(/%5D/g, ']');
            path = path.replace(/\+/g, "%2B");
            path = path.replace(/\?/g, "%3F");
            path = path.replace(/;/g, "%3B");
            path = path.replace(/#/g, "%23");
            path = path.replace(/=/g, "%3D");
            path = path.replace(/\$/g, "%24");
            path = path.replace(/,/g, "%2C");
            path = path.replace(/'/g, "%27");
            path = path.replace(/"/g, "%22");
            return path;
       };
        self.handleLoginRedirect = function () {
            if (!loginRedirected) {
                loginRedirected = true;
                alert(Granite.I18n.get("Your request could not be completed because you have been signed out."));
                var l = util.getTopWindow().document.location;
                l.href = self.externalize(sling.LOGIN_URL) +
                    "?resource=" + encodeURIComponent(l.pathname + l.search + l.hash);
            }
        };
        self.getXhrHook = function (url, method, params) {
            method = method || "GET";
            if (window.G_XHR_HOOK && $.isFunction(G_XHR_HOOK)) {
                var p = {
                    "url": url,
                    "method": method
                };
                if (params) {
                    p["params"] = params;
                }
                return G_XHR_HOOK(p);
            }
            return null;
        };

        self.eval = function(response) {
            if (typeof response != "object") {
                response = $.ajax({
                    url: response,
                    type: 'get',
                    async: false
                });
            }
            try {
                return eval("(" + (response.body ? response.body :
                    response.responseText) + ")");
            } catch (e) {
            }
            return null;
        };

        return self;
    }());

}(Granite, Granite.Util, jQuery));

(function(document, Granite, util, http, $) {

    Granite.I18n = (function() {

         var dicts = {},

            urlPrefix = "/libs/cq/i18n/dict.",

            urlSuffix = ".json",

            manualLocale = undefined,

            pseudoTranslations = false,

            languages = null,

            self = {},

            manualDictionary = false,

            getDictionaryUrl = function(locale) {
                if (manualDictionary) {
                    return urlPrefix + locale + urlSuffix;
                }

                var dictionarySrc = $("html").attr("data-i18n-dictionary-src");

                if (!dictionarySrc) {
                    return urlPrefix + locale + urlSuffix;
                }

                return dictionarySrc.replace("{locale}", encodeURIComponent(locale)).replace("{+locale}", locale);
            };

        self.LOCALE_DEFAULT = "en";

        self.PSEUDO_LANGUAGE = "zz";

        self.PSEUDO_PATTERN_KEY = "_pseudoPattern_";

        self.init = function(config) {
            config = config || {};

            this.setLocale(config.locale);
            this.setUrlPrefix(config.urlPrefix);
            this.setUrlSuffix(config.urlSuffix);
        };

        self.setLocale = function(locale) {
            if (!locale) return;

            manualLocale = locale;
        };

        self.getLocale = function() {
            if ($.isFunction(manualLocale)) {
                manualLocale = manualLocale();
            }

            return manualLocale || document.documentElement.lang || self.LOCALE_DEFAULT;
        };

        self.setUrlPrefix = function(prefix) {
            if (!prefix) return;

            urlPrefix = prefix;
            manualDictionary = true;
        };

        self.setUrlSuffix = function(suffix) {
            if (!suffix) return;

            urlSuffix = suffix;
            manualDictionary = true;
        };

        self.getDictionary = function(locale) {
            locale = locale || self.getLocale();

            if (!dicts[locale]) {
                pseudoTranslations = (locale.indexOf(self.PSEUDO_LANGUAGE) == 0);

                try {
                    var response = $.ajax(getDictionaryUrl(locale), {
                        async: false,
                        dataType: "json"
                    });
                    dicts[locale] = $.parseJSON(response.responseText);
                } catch (e) {}
                if (!dicts[locale]) {
                    dicts[locale] = {};
                }
            }
            return dicts[locale];
        };

        self.get = function(text, snippets, note) {
            var dict, newText, lookupText;

            dict = self.getDictionary();

            lookupText = pseudoTranslations ? self.PSEUDO_PATTERN_KEY :
                note ? text + " ((" + note + "))" :
                text;
            if (dict) {
                newText = dict[lookupText];
            }
            if (!newText) {
                newText = text;
            }
            if (pseudoTranslations) {
                newText = newText.replace("{string}", text).replace("{comment}", note ? note : "");
            }
            return util.patchText(newText, snippets);
        };

        self.getVar = function(text, note) {
            if (!text) {
                return null;
            }
            return self.get(text, null, note);
        };

        self.getLanguages = function() {
            if (!languages) {
                try {
                    var json = http.eval("/libs/wcm/core/resources/languages.overlay.infinity.json");
                    $.each(json, function(name, lang) {
                        lang.title = self.getVar(lang.language);
                        if (lang.title && lang.country && lang.country != "*") {
                            lang.title += " (" + self.getVar(lang.country) + ")";
                        }
                    });
                    languages = json;
                } catch (e) {
                    languages = {};
                }
            }
            return languages;
        };

        self.parseLocale = function(langCode) {
            if (!langCode) {
                return null;
            }
            var pos = langCode.indexOf("_");
            if (pos < 0) {
                pos = langCode.indexOf("-");
            }

            var language, country;
            if (pos < 0) {
                language = langCode;
                country = null;
            } else {
                language = langCode.substring(0, pos);
                country = langCode.substring(pos + 1);
            }
            return {
                code: langCode,
                language: language,
                country: country
            };
        };

        return self;

    }());

}(document, Granite, Granite.Util, Granite.HTTP, jQuery));

Granite.HTTP.detectContextPath();
