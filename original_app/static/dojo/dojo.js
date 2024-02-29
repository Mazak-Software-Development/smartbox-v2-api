/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

(function () {
    var _1 = null;
    if ((_1 || (typeof djConfig != "undefined" && djConfig.scopeMap)) && typeof window != "undefined") {
        var _2 = "",
            _3 = "",
            _4 = "",
            _5 = {},
            _6 = {};
        _1 = _1 || djConfig.scopeMap;
        for (var i = 0; i < _1.length; i++) {
            var _7 = _1[i];
            _2 += "var " + _7[0] + " = {}; " + _7[1] + " = " + _7[0] + ";" + _7[1] + "._scopeName = '" + _7[1] + "';";
            _3 += (i == 0 ? "" : ",") + _7[0];
            _4 += (i == 0 ? "" : ",") + _7[1];
            _5[_7[0]] = _7[1];
            _6[_7[1]] = _7[0];
        }
        eval(_2 + "dojo._scopeArgs = [" + _4 + "];");
        dojo._scopePrefixArgs = _3;
        dojo._scopePrefix = "(function(" + _3 + "){";
        dojo._scopeSuffix = "})(" + _4 + ")";
        dojo._scopeMap = _5;
        dojo._scopeMapRev = _6;
    }
    (function () {
        if (typeof this["loadFirebugConsole"] == "function") {
            this["loadFirebugConsole"]();
        } else {
            this.console = this.console || {};
            var cn = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "profile", "profileEnd", "time", "timeEnd", "trace", "warn", "log"];
            var i = 0,
                tn;
            while ((tn = cn[i++])) {
                if (!console[tn]) {
                    (function () {
                        var _8 = tn + "";
                        console[_8] =
                            "log" in console
                                ? function () {
                                      var a = Array.apply({}, arguments);
                                      a.unshift(_8 + ":");
                                      console["log"](a.join(" "));
                                  }
                                : function () {};
                        console[_8]._fake = true;
                    })();
                }
            }
        }
        if (typeof dojo == "undefined") {
            dojo = { _scopeName: "dojo", _scopePrefix: "", _scopePrefixArgs: "", _scopeSuffix: "", _scopeMap: {}, _scopeMapRev: {} };
        }
        var d = dojo;
        if (typeof dijit == "undefined") {
            dijit = { _scopeName: "dijit" };
        }
        if (typeof dojox == "undefined") {
            dojox = { _scopeName: "dojox" };
        }
        if (!d._scopeArgs) {
            d._scopeArgs = [dojo, dijit, dojox];
        }
        d.global = this;
        d.config = { isDebug: false, debugAtAllCosts: false };
        if (typeof djConfig != "undefined") {
            for (var _9 in djConfig) {
                d.config[_9] = djConfig[_9];
            }
        }
        dojo.locale = d.config.locale;
        var _a = "$Rev: 28973 $".match(/\d+/);
        dojo.version = {
            major: 1,
            minor: 4,
            patch: 4,
            flag: "6-XWT",
            revision: _a ? +_a[0] : NaN,
            toString: function () {
                with (d.version) {
                    return major + "." + minor + "." + patch + flag + " (" + revision + ")";
                }
            },
        };
        if (typeof OpenAjax != "undefined") {
            OpenAjax.hub.registerLibrary(dojo._scopeName, "http://dojotoolkit.org", d.version.toString());
        }
        var _b,
            _c,
            _d = {};
        for (var i in { toString: 1 }) {
            _b = [];
            break;
        }
        dojo._extraNames = _b = _b || ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
        _c = _b.length;
        dojo._mixin = function (_e, _f) {
            var _10, s, i;
            for (_10 in _f) {
                s = _f[_10];
                if (!(_10 in _e) || (_e[_10] !== s && (!(_10 in _d) || _d[_10] !== s))) {
                    _e[_10] = s;
                }
            }
            if (_c && _f) {
                for (i = 0; i < _c; ++i) {
                    _10 = _b[i];
                    s = _f[_10];
                    if (!(_10 in _e) || (_e[_10] !== s && (!(_10 in _d) || _d[_10] !== s))) {
                        _e[_10] = s;
                    }
                }
            }
            return _e;
        };
        dojo.mixin = function (obj, _11) {
            if (!obj) {
                obj = {};
            }
            for (var i = 1, l = arguments.length; i < l; i++) {
                d._mixin(obj, arguments[i]);
            }
            return obj;
        };
        dojo._getProp = function (_12, _13, _14) {
            var obj = _14 || d.global;
            for (var i = 0, p; obj && (p = _12[i]); i++) {
                if (i == 0 && d._scopeMap[p]) {
                    p = d._scopeMap[p];
                }
                obj = p in obj ? obj[p] : _13 ? (obj[p] = {}) : undefined;
            }
            return obj;
        };
        dojo.setObject = function (_15, _16, _17) {
            var _18 = _15.split("."),
                p = _18.pop(),
                obj = d._getProp(_18, true, _17);
            return obj && p ? (obj[p] = _16) : undefined;
        };
        dojo.getObject = function (_19, _1a, _1b) {
            return d._getProp(_19.split("."), _1a, _1b);
        };
        dojo.exists = function (_1c, obj) {
            return !!d.getObject(_1c, false, obj);
        };
        dojo["eval"] = function (_1d) {
            return d.global.eval ? d.global.eval(_1d) : eval(_1d);
        };
        d.deprecated = d.experimental = function () {};
    })();
    (function () {
        var d = dojo;
        d.mixin(d, {
            _loadedModules: {},
            _inFlightCount: 0,
            _hasResource: {},
            _modulePrefixes: { dojo: { name: "dojo", value: "." }, doh: { name: "doh", value: "../util/doh" }, tests: { name: "tests", value: "tests" } },
            _moduleHasPrefix: function (_1e) {
                var mp = d._modulePrefixes;
                return !!(mp[_1e] && mp[_1e].value);
            },
            _getModulePrefix: function (_1f) {
                var mp = d._modulePrefixes;
                if (d._moduleHasPrefix(_1f)) {
                    return mp[_1f].value;
                }
                return _1f;
            },
            _loadedUrls: [],
            _postLoad: false,
            _loaders: [],
            _unloaders: [],
            _loadNotifying: false,
        });
        dojo._loadPath = function (_20, _21, cb) {
            var uri = (_20.charAt(0) == "/" || _20.match(/^\w+:/) ? "" : d.baseUrl) + _20;
            try {
                return !_21 ? d._loadUri(uri, cb) : d._loadUriAndCheck(uri, _21, cb);
            } catch (e) {
                console.error(e);
                return false;
            }
        };
        dojo._loadUri = function (uri, cb) {
            if (d._loadedUrls[uri]) {
                return true;
            }
            d._inFlightCount++;
            var _22 = d._getText(uri, true);
            if (_22) {
                d._loadedUrls[uri] = true;
                d._loadedUrls.push(uri);
                if (cb) {
                    _22 = "(" + _22 + ")";
                } else {
                    _22 = d._scopePrefix + _22 + d._scopeSuffix;
                }
                if (!d.isIE) {
                    _22 += "\r\n//@ sourceURL=" + uri;
                }
                try {
                    var _23 = d["eval"](_22);
                    if (cb) {
                        cb(_23);
                    }
                } catch (e) {
                    console.error("Error parsing file: ", e);
                }
            }
            if (--d._inFlightCount == 0 && d._postLoad && d._loaders.length) {
                setTimeout(function () {
                    if (d._inFlightCount == 0) {
                        d._callLoaded();
                    }
                }, 0);
            }
            return !!_22;
        };
        dojo._loadUriAndCheck = function (uri, _24, cb) {
            var ok = false;
            try {
                ok = d._loadUri(uri, cb);
            } catch (e) {
                console.error("failed loading " + uri + " with error: " + e);
            }
            return !!(ok && d._loadedModules[_24]);
        };
        dojo.loaded = function () {
            d._loadNotifying = true;
            d._postLoad = true;
            var mll = d._loaders;
            d._loaders = [];
            for (var x = 0; x < mll.length; x++) {
                try {
                    mll[x]();
                } catch (e) {
                    console.error("Error while executing function inside dojo.addOnLoad");
                }
            }
            d._loadNotifying = false;
            if (d._postLoad && d._inFlightCount == 0 && mll.length) {
                d._callLoaded();
            }
        };
        dojo.unloaded = function () {
            var mll = d._unloaders;
            while (mll.length) {
                mll.pop()();
            }
        };
        d._onto = function (arr, obj, fn) {
            if (!fn) {
                arr.push(obj);
            } else {
                if (fn) {
                    var _25 = typeof fn == "string" ? obj[fn] : fn;
                    arr.push(function () {
                        _25.call(obj);
                    });
                }
            }
        };
        dojo.ready = dojo.addOnLoad = function (obj, _26) {
            d._onto(d._loaders, obj, _26);
            if (d._postLoad && d._inFlightCount == 0 && !d._loadNotifying) {
                d._callLoaded();
            }
        };
        var dca = d.config.addOnLoad;
        if (dca) {
            d.addOnLoad[dca instanceof Array ? "apply" : "call"](d, dca);
        }
        dojo._modulesLoaded = function () {
            if (d._postLoad) {
                return;
            }
            if (d._inFlightCount > 0) {
                console.warn("files still in flight!");
                return;
            }
            d._callLoaded();
        };
        dojo._callLoaded = function () {
            if (typeof setTimeout == "object" || (d.config.useXDomain && d.isOpera)) {
                setTimeout(
                    d.isAIR
                        ? function () {
                              d.loaded();
                          }
                        : d._scopeName + ".loaded();",
                    0
                );
            } else {
                d.loaded();
            }
        };
        dojo._getModuleSymbols = function (_27) {
            var _28 = _27.split(".");
            for (var i = _28.length; i > 0; i--) {
                var _29 = _28.slice(0, i).join(".");
                if (i == 1 && !d._moduleHasPrefix(_29)) {
                    _28[0] = "../" + _28[0];
                } else {
                    var _2a = d._getModulePrefix(_29);
                    if (_2a != _29) {
                        _28.splice(0, i, _2a);
                        break;
                    }
                }
            }
            return _28;
        };
        dojo._global_omit_module_check = false;
        dojo.loadInit = function (_2b) {
            _2b();
        };
        dojo._loadModule = dojo.require = function (_2c, _2d) {
            _2d = d._global_omit_module_check || _2d;
            var _2e = d._loadedModules[_2c];
            if (_2e) {
                return _2e;
            }
            var _2f = d._getModuleSymbols(_2c).join("/") + ".js";
            var _30 = !_2d ? _2c : null;
            var ok = d._loadPath(_2f, _30);
            if (!ok && !_2d) {
                throw new Error("Could not load '" + _2c + "'; last tried '" + _2f + "'");
            }
            if (!_2d && !d._isXDomain) {
                _2e = d._loadedModules[_2c];
                if (!_2e) {
                    throw new Error("symbol '" + _2c + "' is not defined after loading '" + _2f + "'");
                }
            }
            return _2e;
        };
        dojo.provide = function (_31) {
            _31 = _31 + "";
            return (d._loadedModules[_31] = d.getObject(_31, true));
        };
        dojo.platformRequire = function (_32) {
            var _33 = _32.common || [];
            var _34 = _33.concat(_32[d._name] || _32["default"] || []);
            for (var x = 0; x < _34.length; x++) {
                var _35 = _34[x];
                if (_35.constructor == Array) {
                    d._loadModule.apply(d, _35);
                } else {
                    d._loadModule(_35);
                }
            }
        };
        dojo.requireIf = function (_36, _37) {
            if (_36 === true) {
                var _38 = [];
                for (var i = 1; i < arguments.length; i++) {
                    _38.push(arguments[i]);
                }
                d.require.apply(d, _38);
            }
        };
        dojo.requireAfterIf = d.requireIf;
        dojo.registerModulePath = function (_39, _3a) {
            d._modulePrefixes[_39] = { name: _39, value: _3a };
        };
        dojo.requireLocalization = function (_3b, _3c, _3d, _3e) {
            d.require("dojo.i18n");
            d.i18n._requireLocalization.apply(d.hostenv, arguments);
        };
        var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
            ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
        dojo._Url = function () {
            var n = null,
                _3f = arguments,
                uri = [_3f[0]];
            for (var i = 1; i < _3f.length; i++) {
                if (!_3f[i]) {
                    continue;
                }
                var _40 = new d._Url(_3f[i] + ""),
                    _41 = new d._Url(uri[0] + "");
                if (_40.path == "" && !_40.scheme && !_40.authority && !_40.query) {
                    if (_40.fragment != n) {
                        _41.fragment = _40.fragment;
                    }
                    _40 = _41;
                } else {
                    if (!_40.scheme) {
                        _40.scheme = _41.scheme;
                        if (!_40.authority) {
                            _40.authority = _41.authority;
                            if (_40.path.charAt(0) != "/") {
                                var _42 = _41.path.substring(0, _41.path.lastIndexOf("/") + 1) + _40.path;
                                var _43 = _42.split("/");
                                for (var j = 0; j < _43.length; j++) {
                                    if (_43[j] == ".") {
                                        if (j == _43.length - 1) {
                                            _43[j] = "";
                                        } else {
                                            _43.splice(j, 1);
                                            j--;
                                        }
                                    } else {
                                        if (j > 0 && !(j == 1 && _43[0] == "") && _43[j] == ".." && _43[j - 1] != "..") {
                                            if (j == _43.length - 1) {
                                                _43.splice(j, 1);
                                                _43[j - 1] = "";
                                            } else {
                                                _43.splice(j - 1, 2);
                                                j -= 2;
                                            }
                                        }
                                    }
                                }
                                _40.path = _43.join("/");
                            }
                        }
                    }
                }
                uri = [];
                if (_40.scheme) {
                    uri.push(_40.scheme, ":");
                }
                if (_40.authority) {
                    uri.push("//", _40.authority);
                }
                uri.push(_40.path);
                if (_40.query) {
                    uri.push("?", _40.query);
                }
                if (_40.fragment) {
                    uri.push("#", _40.fragment);
                }
            }
            this.uri = uri.join("");
            var r = this.uri.match(ore);
            this.scheme = r[2] || (r[1] ? "" : n);
            this.authority = r[4] || (r[3] ? "" : n);
            this.path = r[5];
            this.query = r[7] || (r[6] ? "" : n);
            this.fragment = r[9] || (r[8] ? "" : n);
            if (this.authority != n) {
                r = this.authority.match(ire);
                this.user = r[3] || n;
                this.password = r[4] || n;
                this.host = r[6] || r[7];
                this.port = r[9] || n;
            }
        };
        dojo._Url.prototype.toString = function () {
            return this.uri;
        };
        dojo.moduleUrl = function (_44, url) {
            var loc = d._getModuleSymbols(_44).join("/");
            if (!loc) {
                return null;
            }
            if (loc.lastIndexOf("/") != loc.length - 1) {
                loc += "/";
            }
            var _45 = loc.indexOf(":");
            if (loc.charAt(0) != "/" && (_45 == -1 || _45 > loc.indexOf("/"))) {
                loc = d.baseUrl + loc;
            }
            return new d._Url(loc, url);
        };
    })();
    if (typeof window != "undefined") {
        dojo.isBrowser = true;
        dojo._name = "browser";
        (function () {
            var d = dojo;
            if (document && document.getElementsByTagName) {
                var _46 = document.getElementsByTagName("script");
                var _47 = /dojo(\.xd)?\.js(\W|$)/i;
                for (var i = 0; i < _46.length; i++) {
                    var src = _46[i].getAttribute("src");
                    if (!src) {
                        continue;
                    }
                    var m = src.match(_47);
                    if (m) {
                        if (!d.config.baseUrl) {
                            d.config.baseUrl = src.substring(0, m.index);
                        }
                        var cfg = _46[i].getAttribute("djConfig");
                        if (cfg) {
                            var _48 = eval("({ " + cfg + " })");
                            for (var x in _48) {
                                dojo.config[x] = _48[x];
                            }
                        }
                        break;
                    }
                }
            }
            d.baseUrl = d.config.baseUrl;
            var n = navigator;
            var dua = n.userAgent,
                dav = n.appVersion,
                tv = parseFloat(dav);
            if (dua.indexOf("Opera") >= 0) {
                d.isOpera = tv;
            }
            if (dua.indexOf("AdobeAIR") >= 0) {
                d.isAIR = 1;
            }
            d.isKhtml = dav.indexOf("Konqueror") >= 0 ? tv : 0;
            d.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
            d.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
            d.isMac = dav.indexOf("Macintosh") >= 0;
            var _49 = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
            if (_49 && !dojo.isChrome) {
                d.isSafari = parseFloat(dav.split("Version/")[1]);
                if (!d.isSafari || parseFloat(dav.substr(_49 + 7)) <= 419.3) {
                    d.isSafari = 2;
                }
            }
            if (document.all && !d.isOpera) {
                d.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
                var _4a = document.documentMode;
                if (_4a && _4a != 5 && Math.floor(d.isIE) != _4a) {
                    d.isIE = _4a;
                }
            } else {
                if (dav.indexOf("Trident")) {
                    d.isIE = parseFloat(dav.split("rv:")[1]) || undefined;
                }
            }
            if (!d.isIE && dua.indexOf("Gecko") >= 0 && !d.isKhtml && !d.isWebKit) {
                d.isMozilla = d.isMoz = tv;
            }
            if (d.isMoz) {
                d.isFF = parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined;
            }
            if (dojo.isIE && window.location.protocol === "file:") {
                dojo.config.ieForceActiveXXhr = true;
            }
            d.isQuirks = document.compatMode == "BackCompat";
            d.locale = dojo.config.locale || (d.isIE ? n.userLanguage : n.language).toLowerCase();
            d._XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
            d._xhrObj = function () {
                var _4b, _4c;
                if (!dojo.isIE || !dojo.config.ieForceActiveXXhr) {
                    try {
                        _4b = new XMLHttpRequest();
                    } catch (e) {}
                }
                if (!_4b) {
                    for (var i = 0; i < 3; ++i) {
                        var _4d = d._XMLHTTP_PROGIDS[i];
                        try {
                            _4b = new ActiveXObject(_4d);
                        } catch (e) {
                            _4c = e;
                        }
                        if (_4b) {
                            d._XMLHTTP_PROGIDS = [_4d];
                            break;
                        }
                    }
                }
                if (!_4b) {
                    throw new Error("XMLHTTP not available: " + _4c);
                }
                return _4b;
            };
            d._isDocumentOk = function (_4e) {
                var _4f = _4e.status || 0,
                    lp = location.protocol;
                return (_4f >= 200 && _4f < 300) || _4f == 304 || _4f == 1223 || (!_4f && (lp == "file:" || lp == "chrome:" || lp == "app:"));
            };
            var _50 = window.location + "";
            var _51 = document.getElementsByTagName("base");
            var _52 = _51 && _51.length > 0;
            d._getText = function (uri, _53) {
                var _54 = d._xhrObj();
                if (!_52 && dojo._Url) {
                    uri = new dojo._Url(_50, uri).toString();
                }
                if (d.config.cacheBust) {
                    uri += "";
                    uri += (uri.indexOf("?") == -1 ? "?" : "&") + String(d.config.cacheBust).replace(/\W+/g, "");
                }
                _54.open("GET", uri, false);
                try {
                    _54.send(null);
                    if (!d._isDocumentOk(_54)) {
                        var err = Error("Unable to load " + uri + " status:" + _54.status);
                        err.status = _54.status;
                        err.responseText = _54.responseText;
                        throw err;
                    }
                } catch (e) {
                    if (_53) {
                        return null;
                    }
                    throw e;
                }
                return _54.responseText;
            };
            var _55 = window;
            var _56 = function (_57, fp) {
                var _58 = _55.attachEvent || _55.addEventListener;
                _57 = _55.attachEvent ? _57 : _57.substring(2);
                _58(
                    _57,
                    function () {
                        fp.apply(_55, arguments);
                    },
                    false
                );
            };
            d._windowUnloaders = [];
            d.windowUnloaded = function () {
                var mll = d._windowUnloaders;
                while (mll.length) {
                    mll.pop()();
                }
            };
            var _59 = 0;
            d.addOnWindowUnload = function (obj, _5a) {
                d._onto(d._windowUnloaders, obj, _5a);
                if (!_59) {
                    _59 = 1;
                    _56("onunload", d.windowUnloaded);
                }
            };
            var _5b = 0;
            d.addOnUnload = function (obj, _5c) {
                d._onto(d._unloaders, obj, _5c);
                if (!_5b) {
                    _5b = 1;
                    _56("onbeforeunload", dojo.unloaded);
                }
            };
        })();
        dojo._initFired = false;
        dojo._loadInit = function (e) {
            if (!dojo._initFired) {
                dojo._initFired = true;
                if (!dojo.config.afterOnLoad && window.detachEvent) {
                    window.detachEvent("onload", dojo._loadInit);
                }
                if (dojo._inFlightCount == 0) {
                    dojo._modulesLoaded();
                }
            }
        };
        if (!dojo.config.afterOnLoad) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", dojo._loadInit, false);
                window.addEventListener("load", dojo._loadInit, false);
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onload", dojo._loadInit);
                }
            }
        }
        if (dojo.isIE) {
            if (!dojo.config.afterOnLoad && !dojo.config.skipIeDomLoaded) {
                document.write("<scr" + 'ipt defer src="//:" ' + "onreadystatechange=\"if(this.readyState=='complete'){" + dojo._scopeName + '._loadInit();}">' + "</scr" + "ipt>");
            }
            try {
                (function () {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                    var _5d = ["*", "group", "roundrect", "oval", "shape", "rect", "imagedata", "path", "textpath", "text"],
                        i = 0,
                        l = 1,
                        s = document.createStyleSheet();
                    if (dojo.isIE >= 8) {
                        i = 1;
                        l = _5d.length;
                    }
                    for (; i < l; ++i) {
                        s.addRule("v\\:" + _5d[i], "behavior:url(#default#VML); display:inline-block");
                    }
                })();
            } catch (e) {}
        }
    }
    (function () {
        var mp = dojo.config["modulePaths"];
        if (mp) {
            for (var _5e in mp) {
                dojo.registerModulePath(_5e, mp[_5e]);
            }
        }
    })();
    if (dojo.config.isDebug) {
        dojo.require("dojo._firebug.firebug");
    }
    if (dojo.config.debugAtAllCosts) {
        dojo.config.useXDomain = true;
        dojo.require("dojo._base._loader.loader_xd");
        dojo.require("dojo._base._loader.loader_debug");
        dojo.require("dojo.i18n");
    }
    if (!dojo._hasResource["dojo._base.lang"]) {
        dojo._hasResource["dojo._base.lang"] = true;
        dojo.provide("dojo._base.lang");
        (function () {
            var d = dojo,
                _5f = Object.prototype.toString;
            dojo.isString = function (it) {
                return typeof it == "string" || it instanceof String;
            };
            dojo.isArray = function (it) {
                return it && (it instanceof Array || typeof it == "array");
            };
            dojo.isFunction = function (it) {
                return _5f.call(it) === "[object Function]";
            };
            dojo.isObject = function (it) {
                return it !== undefined && (it === null || typeof it == "object" || d.isArray(it) || d.isFunction(it));
            };
            dojo.isArrayLike = function (it) {
                return it && it !== undefined && !d.isString(it) && !d.isFunction(it) && !(it.tagName && it.tagName.toLowerCase() == "form") && (d.isArray(it) || isFinite(it.length));
            };
            dojo.isAlien = function (it) {
                return it && !d.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it));
            };
            dojo.extend = function (_60, _61) {
                for (var i = 1, l = arguments.length; i < l; i++) {
                    d._mixin(_60.prototype, arguments[i]);
                }
                return _60;
            };
            dojo._hitchArgs = function (_62, _63) {
                var pre = d._toArray(arguments, 2);
                var _64 = d.isString(_63);
                return function () {
                    var _65 = d._toArray(arguments);
                    var f = _64 ? (_62 || d.global)[_63] : _63;
                    try {
                        return f && f.apply(_62 || this, pre.concat(_65));
                    } catch (e) {
                        if (f && f.toString) {
                            console.error("Error executing: ", f.toString(), e);
                        } else {
                            console.error("Error executing function called using dojo.hitch()", e);
                        }
                    }
                };
            };
            dojo.hitch = function (_66, _67) {
                if (arguments.length > 2) {
                    return d._hitchArgs.apply(d, arguments);
                }
                if (!_67) {
                    _67 = _66;
                    _66 = null;
                }
                if (d.isString(_67)) {
                    _66 = _66 || d.global;
                    if (!_66[_67]) {
                        throw ['dojo.hitch: scope["', _67, '"] is null (scope="', _66, '")'].join("");
                    }
                    return function () {
                        try {
                            return _66[_67].apply(_66, arguments || []);
                        } catch (e) {
                            console.error("Error executing: ", _66[_67].toString(), e);
                        }
                    };
                }
                return !_66
                    ? _67
                    : function () {
                          try {
                              return _67.apply(_66, arguments || []);
                          } catch (e) {
                              console.error("Error executing: ", _67.toString(), e);
                          }
                      };
            };
            dojo.delegate = dojo._delegate = (function () {
                function TMP() {}
                return function (obj, _68) {
                    TMP.prototype = obj;
                    var tmp = new TMP();
                    TMP.prototype = null;
                    if (_68) {
                        d._mixin(tmp, _68);
                    }
                    return tmp;
                };
            })();
            var _69 = function (obj, _6a, _6b) {
                return (_6b || []).concat(Array.prototype.slice.call(obj, _6a || 0));
            };
            var _6c = function (obj, _6d, _6e) {
                var arr = _6e || [];
                for (var x = _6d || 0; x < obj.length; x++) {
                    arr.push(obj[x]);
                }
                return arr;
            };
            dojo._toArray = d.isIE
                ? function (obj) {
                      return (obj.item ? _6c : _69).apply(this, arguments);
                  }
                : _69;
            dojo.partial = function (_6f) {
                var arr = [null];
                return d.hitch.apply(d, arr.concat(d._toArray(arguments)));
            };
            var _70 = d._extraNames,
                _71 = _70.length,
                _72 = {};
            dojo.clone = function (o) {
                if (!o || typeof o != "object" || d.isFunction(o)) {
                    return o;
                }
                if (o.nodeType && "cloneNode" in o) {
                    return o.cloneNode(true);
                }
                if (o instanceof Date) {
                    return new Date(o.getTime());
                }
                var r, i, l, s, _73;
                if (d.isArray(o)) {
                    r = [];
                    for (i = 0, l = o.length; i < l; ++i) {
                        if (i in o) {
                            r.push(d.clone(o[i]));
                        }
                    }
                } else {
                    r = o.constructor ? new o.constructor() : {};
                }
                for (_73 in o) {
                    s = o[_73];
                    if (!(_73 in r) || (r[_73] !== s && (!(_73 in _72) || _72[_73] !== s))) {
                        r[_73] = d.clone(s);
                    }
                }
                if (_71) {
                    for (i = 0; i < _71; ++i) {
                        _73 = _70[i];
                        s = o[_73];
                        if (!(_73 in r) || (r[_73] !== s && (!(_73 in _72) || _72[_73] !== s))) {
                            r[_73] = s;
                        }
                    }
                }
                return r;
            };
            dojo.trim = String.prototype.trim
                ? function (str) {
                      return str.trim();
                  }
                : function (str) {
                      return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                  };
            var _74 = /\{([^\}]+)\}/g;
            dojo.replace = function (_75, map, _76) {
                return _75.replace(
                    _76 || _74,
                    d.isFunction(map)
                        ? map
                        : function (_77, k) {
                              return d.getObject(k, false, map);
                          }
                );
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.array"]) {
        dojo._hasResource["dojo._base.array"] = true;
        dojo.provide("dojo._base.array");
        (function () {
            var _78 = function (arr, obj, cb) {
                return [typeof arr == "string" ? arr.split("") : arr, obj || dojo.global, typeof cb == "string" ? new Function("item", "index", "array", cb) : cb];
            };
            var _79 = function (_7a, arr, _7b, _7c) {
                var _7d = _78(arr, _7c, _7b);
                arr = _7d[0];
                for (var i = 0, l = arr.length; i < l; ++i) {
                    var _7e = !!_7d[2].call(_7d[1], arr[i], i, arr);
                    if (_7a ^ _7e) {
                        return _7e;
                    }
                }
                return _7a;
            };
            dojo.mixin(dojo, {
                indexOf: function (_7f, _80, _81, _82) {
                    var _83 = 1,
                        end = _7f.length || 0,
                        i = 0;
                    if (_82) {
                        i = end - 1;
                        _83 = end = -1;
                    }
                    if (_81 != undefined) {
                        i = _81;
                    }
                    if ((_82 && i > end) || i < end) {
                        for (; i != end; i += _83) {
                            if (_7f[i] == _80) {
                                return i;
                            }
                        }
                    }
                    return -1;
                },
                lastIndexOf: function (_84, _85, _86) {
                    return dojo.indexOf(_84, _85, _86, true);
                },
                forEach: function (arr, _87, _88) {
                    if (!arr || !arr.length) {
                        return;
                    }
                    var _89 = _78(arr, _88, _87);
                    arr = _89[0];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        _89[2].call(_89[1], arr[i], i, arr);
                    }
                },
                every: function (arr, _8a, _8b) {
                    return _79(true, arr, _8a, _8b);
                },
                some: function (arr, _8c, _8d) {
                    return _79(false, arr, _8c, _8d);
                },
                map: function (arr, _8e, _8f) {
                    var _90 = _78(arr, _8f, _8e);
                    arr = _90[0];
                    var _91 = arguments[3] ? new arguments[3]() : [];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        _91.push(_90[2].call(_90[1], arr[i], i, arr));
                    }
                    return _91;
                },
                filter: function (arr, _92, _93) {
                    var _94 = _78(arr, _93, _92);
                    arr = _94[0];
                    var _95 = [];
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        if (_94[2].call(_94[1], arr[i], i, arr)) {
                            _95.push(arr[i]);
                        }
                    }
                    return _95;
                },
            });
        })();
    }
    if (!dojo._hasResource["dojo._base.declare"]) {
        dojo._hasResource["dojo._base.declare"] = true;
        dojo.provide("dojo._base.declare");
        (function () {
            var d = dojo,
                mix = d._mixin,
                op = Object.prototype,
                _96 = op.toString,
                _97 = new Function(),
                _98 = 0,
                _99 = "constructor";
            function err(msg) {
                throw new Error("declare: " + msg);
            }
            function _9a(_9b) {
                var _9c = [],
                    _9d = [{ cls: 0, refs: [] }],
                    _9e = {},
                    _9f = 1,
                    l = _9b.length,
                    i = 0,
                    j,
                    lin,
                    _a0,
                    top,
                    _a1,
                    rec,
                    _a2,
                    _a3;
                for (; i < l; ++i) {
                    _a0 = _9b[i];
                    if (!_a0) {
                        err("mixin #" + i + " is null");
                    }
                    lin = _a0._meta ? _a0._meta.bases : [_a0];
                    top = 0;
                    for (j = lin.length - 1; j >= 0; --j) {
                        _a1 = lin[j].prototype;
                        if (!_a1.hasOwnProperty("declaredClass")) {
                            _a1.declaredClass = "uniqName_" + _98++;
                        }
                        _a2 = _a1.declaredClass;
                        if (!_9e.hasOwnProperty(_a2)) {
                            _9e[_a2] = { count: 0, refs: [], cls: lin[j] };
                            ++_9f;
                        }
                        rec = _9e[_a2];
                        if (top && top !== rec) {
                            rec.refs.push(top);
                            ++top.count;
                        }
                        top = rec;
                    }
                    ++top.count;
                    _9d[0].refs.push(top);
                }
                while (_9d.length) {
                    top = _9d.pop();
                    _9c.push(top.cls);
                    --_9f;
                    while (((_a3 = top.refs), _a3.length == 1)) {
                        top = _a3[0];
                        if (!top || --top.count) {
                            top = 0;
                            break;
                        }
                        _9c.push(top.cls);
                        --_9f;
                    }
                    if (top) {
                        for (i = 0, l = _a3.length; i < l; ++i) {
                            top = _a3[i];
                            if (!--top.count) {
                                _9d.push(top);
                            }
                        }
                    }
                }
                if (_9f) {
                    err("can't build consistent linearization");
                }
                _a0 = _9b[0];
                _9c[0] = _a0 ? (_a0._meta && _a0 === _9c[_9c.length - _a0._meta.bases.length] ? _a0._meta.bases.length : 1) : 0;
                return _9c;
            }
            function _a4(_a5, a, f) {
                var _a6,
                    _a7,
                    _a8,
                    _a9,
                    _aa,
                    _ab,
                    _ac,
                    opf,
                    pos,
                    _ad = (this._inherited = this._inherited || {});
                if (typeof _a5 == "string") {
                    _a6 = _a5;
                    _a5 = a;
                    a = f;
                }
                f = 0;
                _a9 = _a5.callee;
                _a6 = _a6 || _a9.nom;
                if (!_a6) {
                    err("can't deduce a name to call inherited()");
                }
                _aa = this.constructor._meta;
                _a8 = _aa.bases;
                pos = _ad.p;
                if (_a6 != _99) {
                    if (_ad.c !== _a9) {
                        pos = 0;
                        _ab = _a8[0];
                        _aa = _ab._meta;
                        if (_aa.hidden[_a6] !== _a9) {
                            _a7 = _aa.chains;
                            if (_a7 && typeof _a7[_a6] == "string") {
                                err("calling chained method with inherited: " + _a6);
                            }
                            do {
                                _aa = _ab._meta;
                                _ac = _ab.prototype;
                                if (_aa && ((_ac[_a6] === _a9 && _ac.hasOwnProperty(_a6)) || _aa.hidden[_a6] === _a9)) {
                                    break;
                                }
                            } while ((_ab = _a8[++pos]));
                            pos = _ab ? pos : -1;
                        }
                    }
                    _ab = _a8[++pos];
                    if (_ab) {
                        _ac = _ab.prototype;
                        if (_ab._meta && _ac.hasOwnProperty(_a6)) {
                            f = _ac[_a6];
                        } else {
                            opf = op[_a6];
                            do {
                                _ac = _ab.prototype;
                                f = _ac[_a6];
                                if (f && (_ab._meta ? _ac.hasOwnProperty(_a6) : f !== opf)) {
                                    break;
                                }
                            } while ((_ab = _a8[++pos]));
                        }
                    }
                    f = (_ab && f) || op[_a6];
                } else {
                    if (_ad.c !== _a9) {
                        pos = 0;
                        _aa = _a8[0]._meta;
                        if (_aa && _aa.ctor !== _a9) {
                            _a7 = _aa.chains;
                            if (!_a7 || _a7.constructor !== "manual") {
                                err("calling chained constructor with inherited");
                            }
                            while ((_ab = _a8[++pos])) {
                                _aa = _ab._meta;
                                if (_aa && _aa.ctor === _a9) {
                                    break;
                                }
                            }
                            pos = _ab ? pos : -1;
                        }
                    }
                    while ((_ab = _a8[++pos])) {
                        _aa = _ab._meta;
                        f = _aa ? _aa.ctor : _ab;
                        if (f) {
                            break;
                        }
                    }
                    f = _ab && f;
                }
                _ad.c = f;
                _ad.p = pos;
                if (f) {
                    return a === true ? f : f.apply(this, a || _a5);
                }
            }
            function _ae(_af, _b0) {
                if (typeof _af == "string") {
                    return this.inherited(_af, _b0, true);
                }
                return this.inherited(_af, true);
            }
            function _b1(cls) {
                var _b2 = this.constructor._meta.bases;
                for (var i = 0, l = _b2.length; i < l; ++i) {
                    if (_b2[i] === cls) {
                        return true;
                    }
                }
                return this instanceof cls;
            }
            function _b3(_b4, _b5) {
                var _b6,
                    t,
                    i = 0,
                    l = d._extraNames.length;
                for (_b6 in _b5) {
                    t = _b5[_b6];
                    if ((t !== op[_b6] || !(_b6 in op)) && _b6 != _99) {
                        if (_96.call(t) == "[object Function]") {
                            t.nom = _b6;
                        }
                        _b4[_b6] = t;
                    }
                }
                for (; i < l; ++i) {
                    _b6 = d._extraNames[i];
                    t = _b5[_b6];
                    if ((t !== op[_b6] || !(_b6 in op)) && _b6 != _99) {
                        if (_96.call(t) == "[object Function]") {
                            t.nom = _b6;
                        }
                        _b4[_b6] = t;
                    }
                }
                return _b4;
            }
            function _b7(_b8) {
                _b3(this.prototype, _b8);
                return this;
            }
            function _b9(_ba, _bb) {
                return function () {
                    var a = arguments,
                        _bc = a,
                        a0 = a[0],
                        f,
                        i,
                        m,
                        l = _ba.length,
                        _bd;
                    if (_bb && ((a0 && a0.preamble) || this.preamble)) {
                        _bd = new Array(_ba.length);
                        _bd[0] = a;
                        for (i = 0; ; ) {
                            a0 = a[0];
                            if (a0) {
                                f = a0.preamble;
                                if (f) {
                                    a = f.apply(this, a) || a;
                                }
                            }
                            f = _ba[i].prototype;
                            f = f.hasOwnProperty("preamble") && f.preamble;
                            if (f) {
                                a = f.apply(this, a) || a;
                            }
                            if (++i == l) {
                                break;
                            }
                            _bd[i] = a;
                        }
                    }
                    for (i = l - 1; i >= 0; --i) {
                        f = _ba[i];
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, _bd ? _bd[i] : a);
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, _bc);
                    }
                };
            }
            function _be(_bf, _c0) {
                return function () {
                    var a = arguments,
                        t = a,
                        a0 = a[0],
                        f;
                    if (_c0) {
                        if (a0) {
                            f = a0.preamble;
                            if (f) {
                                t = f.apply(this, t) || t;
                            }
                        }
                        f = this.preamble;
                        if (f) {
                            f.apply(this, t);
                        }
                    }
                    if (_bf) {
                        _bf.apply(this, a);
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a);
                    }
                };
            }
            function _c1(_c2) {
                return function () {
                    var a = arguments,
                        i = 0,
                        f;
                    for (; (f = _c2[i]); ++i) {
                        m = f._meta;
                        f = m ? m.ctor : f;
                        if (f) {
                            f.apply(this, a);
                            break;
                        }
                    }
                    f = this.postscript;
                    if (f) {
                        f.apply(this, a);
                    }
                };
            }
            function _c3(_c4, _c5, _c6) {
                return function () {
                    var b,
                        m,
                        f,
                        i = 0,
                        _c7 = 1;
                    if (_c6) {
                        i = _c5.length - 1;
                        _c7 = -1;
                    }
                    for (; (b = _c5[i]); i += _c7) {
                        m = b._meta;
                        f = (m ? m.hidden : b.prototype)[_c4];
                        if (f) {
                            f.apply(this, arguments);
                        }
                    }
                };
            }
            d.declare = function (_c8, _c9, _ca) {
                var _cb,
                    i,
                    t,
                    _cc,
                    _cd,
                    _ce,
                    _cf,
                    _d0 = 1,
                    _d1 = _c9;
                if (typeof _c8 != "string") {
                    _ca = _c9;
                    _c9 = _c8;
                    _c8 = "";
                }
                _ca = _ca || {};
                if (_96.call(_c9) == "[object Array]") {
                    _ce = _9a(_c9);
                    t = _ce[0];
                    _d0 = _ce.length - t;
                    _c9 = _ce[_d0];
                } else {
                    _ce = [0];
                    if (_c9) {
                        t = _c9._meta;
                        _ce = _ce.concat(t ? t.bases : _c9);
                    }
                }
                if (_c9) {
                    for (i = _d0 - 1; ; --i) {
                        _97.prototype = _c9.prototype;
                        _cb = new _97();
                        if (!i) {
                            break;
                        }
                        t = _ce[i];
                        mix(_cb, t._meta ? t._meta.hidden : t.prototype);
                        _cc = new Function();
                        _cc.superclass = _c9;
                        _cc.prototype = _cb;
                        _c9 = _cb.constructor = _cc;
                    }
                } else {
                    _cb = {};
                }
                _b3(_cb, _ca);
                t = _ca.constructor;
                if (t !== op.constructor) {
                    t.nom = _99;
                    _cb.constructor = t;
                }
                _97.prototype = 0;
                for (i = _d0 - 1; i; --i) {
                    t = _ce[i]._meta;
                    if (t && t.chains) {
                        _cf = mix(_cf || {}, t.chains);
                    }
                }
                if (_cb["-chains-"]) {
                    _cf = mix(_cf || {}, _cb["-chains-"]);
                }
                t = !_cf || !_cf.hasOwnProperty(_99);
                _ce[0] = _cc = _cf && _cf.constructor === "manual" ? _c1(_ce) : _ce.length == 1 ? _be(_ca.constructor, t) : _b9(_ce, t);
                _cc._meta = { bases: _ce, hidden: _ca, chains: _cf, parents: _d1, ctor: _ca.constructor };
                _cc.superclass = _c9 && _c9.prototype;
                _cc.extend = _b7;
                _cc.prototype = _cb;
                _cb.constructor = _cc;
                _cb.getInherited = _ae;
                _cb.inherited = _a4;
                _cb.isInstanceOf = _b1;
                if (_c8) {
                    _cb.declaredClass = _c8;
                    d.setObject(_c8, _cc);
                }
                if (_cf) {
                    for (_cd in _cf) {
                        if (_cb[_cd] && typeof _cf[_cd] == "string" && _cd != _99) {
                            t = _cb[_cd] = _c3(_cd, _ce, _cf[_cd] === "after");
                            t.nom = _cd;
                        }
                    }
                }
                return _cc;
            };
            d.safeMixin = _b3;
        })();
    }
    if (!dojo._hasResource["dojo._base.connect"]) {
        dojo._hasResource["dojo._base.connect"] = true;
        dojo.provide("dojo._base.connect");
        dojo._listener = {
            getDispatcher: function () {
                return function () {
                    var ap = Array.prototype,
                        c = arguments.callee,
                        ls = c._listeners,
                        t = c.target;
                    var r = t && t.apply(this, arguments);
                    var lls;
                    lls = [].concat(ls);
                    for (var i in lls) {
                        if (!(i in ap)) {
                            lls[i].apply(this, arguments);
                        }
                    }
                    return r;
                };
            },
            add: function (_d2, _d3, _d4) {
                _d2 = _d2 || dojo.global;
                var f = _d2[_d3];
                if (!f || !f._listeners) {
                    var d = dojo._listener.getDispatcher();
                    d.target = f;
                    d._listeners = [];
                    f = _d2[_d3] = d;
                }
                return f._listeners.push(_d4);
            },
            remove: function (_d5, _d6, _d7) {
                var f = (_d5 || dojo.global)[_d6];
                if (f && f._listeners && _d7--) {
                    delete f._listeners[_d7];
                }
            },
        };
        dojo.connect = function (obj, _d8, _d9, _da, _db) {
            var a = arguments,
                _dc = [],
                i = 0;
            _dc.push(dojo.isString(a[0]) ? null : a[i++], a[i++]);
            var a1 = a[i + 1];
            _dc.push(dojo.isString(a1) || dojo.isFunction(a1) ? a[i++] : null, a[i++]);
            for (var l = a.length; i < l; i++) {
                _dc.push(a[i]);
            }
            return dojo._connect.apply(this, _dc);
        };
        dojo._connect = function (obj, _dd, _de, _df) {
            var l = dojo._listener,
                h = l.add(obj, _dd, dojo.hitch(_de, _df));
            return [obj, _dd, h, l];
        };
        dojo.disconnect = function (_e0) {
            if (_e0 && _e0[0] !== undefined) {
                dojo._disconnect.apply(this, _e0);
                delete _e0[0];
            }
        };
        dojo._disconnect = function (obj, _e1, _e2, _e3) {
            _e3.remove(obj, _e1, _e2);
        };
        dojo._topics = {};
        dojo.subscribe = function (_e4, _e5, _e6) {
            return [_e4, dojo._listener.add(dojo._topics, _e4, dojo.hitch(_e5, _e6))];
        };
        dojo.unsubscribe = function (_e7) {
            if (_e7) {
                dojo._listener.remove(dojo._topics, _e7[0], _e7[1]);
            }
        };
        dojo.publish = function (_e8, _e9) {
            var f = dojo._topics[_e8];
            if (f) {
                f.apply(this, _e9 || []);
            }
        };
        dojo.connectPublisher = function (_ea, obj, _eb) {
            var pf = function () {
                dojo.publish(_ea, arguments);
            };
            return _eb ? dojo.connect(obj, _eb, pf) : dojo.connect(obj, pf);
        };
    }
    if (!dojo._hasResource["dojo._base.Deferred"]) {
        dojo._hasResource["dojo._base.Deferred"] = true;
        dojo.provide("dojo._base.Deferred");
        dojo.Deferred = function (_ec) {
            this.chain = [];
            this.id = this._nextId();
            this.fired = -1;
            this.paused = 0;
            this.results = [null, null];
            this.canceller = _ec;
            this.silentlyCancelled = false;
            this.isFiring = false;
        };
        dojo.extend(dojo.Deferred, {
            _nextId: (function () {
                var n = 1;
                return function () {
                    return n++;
                };
            })(),
            cancel: function () {
                var err;
                if (this.fired == -1) {
                    if (this.canceller) {
                        err = this.canceller(this);
                    } else {
                        this.silentlyCancelled = true;
                    }
                    if (this.fired == -1) {
                        if (!(err instanceof Error)) {
                            var res = err;
                            var msg = "Deferred Cancelled";
                            if (err && err.toString) {
                                msg += ": " + err.toString();
                            }
                            err = new Error(msg);
                            err.dojoType = "cancel";
                            err.cancelResult = res;
                        }
                        this.errback(err);
                    }
                } else {
                    if (this.fired == 0 && this.results[0] instanceof dojo.Deferred) {
                        this.results[0].cancel();
                    }
                }
            },
            _resback: function (res) {
                this.fired = res instanceof Error ? 1 : 0;
                this.results[this.fired] = res;
                this._fire();
            },
            _check: function () {
                if (this.fired != -1) {
                    if (!this.silentlyCancelled) {
                        throw new Error("already called!");
                    }
                    this.silentlyCancelled = false;
                    return;
                }
            },
            callback: function (res) {
                this._check();
                this._resback(res);
            },
            errback: function (res) {
                this._check();
                if (!(res instanceof Error)) {
                    res = new Error(res);
                }
                this._resback(res);
            },
            addBoth: function (cb, _ed) {
                var _ee = dojo.hitch.apply(dojo, arguments);
                return this.addCallbacks(_ee, _ee);
            },
            addCallback: function (cb, _ef) {
                return this.addCallbacks(dojo.hitch.apply(dojo, arguments));
            },
            addErrback: function (cb, _f0) {
                return this.addCallbacks(null, dojo.hitch.apply(dojo, arguments));
            },
            addCallbacks: function (cb, eb) {
                this.chain.push([cb, eb]);
                if (this.fired >= 0 && !this.isFiring) {
                    this._fire();
                }
                return this;
            },
            _fire: function () {
                this.isFiring = true;
                var _f1 = this.chain;
                var _f2 = this.fired;
                var res = this.results[_f2];
                var _f3 = this;
                var cb = null;
                while (_f1.length > 0 && this.paused == 0) {
                    var f = _f1.shift()[_f2];
                    if (!f) {
                        continue;
                    }
                    var _f4 = function () {
                        var ret = f(res);
                        if (typeof ret != "undefined") {
                            res = ret;
                        }
                        _f2 = res instanceof Error ? 1 : 0;
                        if (res instanceof dojo.Deferred) {
                            cb = function (res) {
                                _f3._resback(res);
                                _f3.paused--;
                                if (_f3.paused == 0 && _f3.fired >= 0) {
                                    _f3._fire();
                                }
                            };
                            this.paused++;
                        }
                    };
                    if (dojo.config.debugAtAllCosts) {
                        _f4.call(this);
                    } else {
                        try {
                            _f4.call(this);
                        } catch (err) {
                            _f2 = 1;
                            res = err;
                        }
                    }
                }
                this.fired = _f2;
                this.results[_f2] = res;
                this.isFiring = false;
                if (cb && this.paused) {
                    res.addBoth(cb);
                }
            },
        });
    }
    if (!dojo._hasResource["dojo._base.json"]) {
        dojo._hasResource["dojo._base.json"] = true;
        dojo.provide("dojo._base.json");
        dojo.fromJson = function (_f5) {
            return eval("(" + _f5 + ")");
        };
        dojo._escapeString = function (str) {
            return ('"' + str.replace(/(["\\])/g, "\\$1") + '"').replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
        };
        dojo.toJsonIndentStr = "\t";
        dojo.toJson = function (it, _f6, _f7) {
            if (it === undefined) {
                return "undefined";
            }
            var _f8 = typeof it;
            if (_f8 == "number" || _f8 == "boolean") {
                return it + "";
            }
            if (it === null) {
                return "null";
            }
            if (dojo.isString(it)) {
                return dojo._escapeString(it);
            }
            var _f9 = arguments.callee;
            var _fa;
            _f7 = _f7 || "";
            var _fb = _f6 ? _f7 + dojo.toJsonIndentStr : "";
            var tf = it.__json__ || it.json;
            if (dojo.isFunction(tf)) {
                _fa = tf.call(it);
                if (it !== _fa) {
                    return _f9(_fa, _f6, _fb);
                }
            }
            if (it.nodeType && it.cloneNode) {
                throw new Error("Can't serialize DOM nodes");
            }
            var sep = _f6 ? " " : "";
            var _fc = _f6 ? "\n" : "";
            if (dojo.isArray(it)) {
                var res = dojo.map(it, function (obj) {
                    var val = _f9(obj, _f6, _fb);
                    if (typeof val != "string") {
                        val = "undefined";
                    }
                    return _fc + _fb + val;
                });
                return "[" + res.join("," + sep) + _fc + _f7 + "]";
            }
            if (_f8 == "function") {
                return null;
            }
            var _fd = [],
                key;
            for (key in it) {
                var _fe, val;
                if (typeof key == "number") {
                    _fe = '"' + key + '"';
                } else {
                    if (typeof key == "string") {
                        _fe = dojo._escapeString(key);
                    } else {
                        continue;
                    }
                }
                val = _f9(it[key], _f6, _fb);
                if (typeof val != "string") {
                    continue;
                }
                _fd.push(_fc + _fb + _fe + ":" + sep + val);
            }
            return "{" + _fd.join("," + sep) + _fc + _f7 + "}";
        };
    }
    if (!dojo._hasResource["dojo._base.Color"]) {
        dojo._hasResource["dojo._base.Color"] = true;
        dojo.provide("dojo._base.Color");
        (function () {
            var d = dojo;
            dojo.Color = function (_ff) {
                if (_ff) {
                    this.setColor(_ff);
                }
            };
            dojo.Color.named = {
                black: [0, 0, 0],
                silver: [192, 192, 192],
                gray: [128, 128, 128],
                white: [255, 255, 255],
                maroon: [128, 0, 0],
                red: [255, 0, 0],
                purple: [128, 0, 128],
                fuchsia: [255, 0, 255],
                green: [0, 128, 0],
                lime: [0, 255, 0],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                navy: [0, 0, 128],
                blue: [0, 0, 255],
                teal: [0, 128, 128],
                aqua: [0, 255, 255],
                transparent: d.config.transparentColor || [255, 255, 255],
            };
            dojo.extend(dojo.Color, {
                r: 255,
                g: 255,
                b: 255,
                a: 1,
                _set: function (r, g, b, a) {
                    var t = this;
                    t.r = r;
                    t.g = g;
                    t.b = b;
                    t.a = a;
                },
                setColor: function (_100) {
                    if (d.isString(_100)) {
                        d.colorFromString(_100, this);
                    } else {
                        if (d.isArray(_100)) {
                            d.colorFromArray(_100, this);
                        } else {
                            this._set(_100.r, _100.g, _100.b, _100.a);
                            if (!(_100 instanceof d.Color)) {
                                this.sanitize();
                            }
                        }
                    }
                    return this;
                },
                sanitize: function () {
                    return this;
                },
                toRgb: function () {
                    var t = this;
                    return [t.r, t.g, t.b];
                },
                toRgba: function () {
                    var t = this;
                    return [t.r, t.g, t.b, t.a];
                },
                toHex: function () {
                    var arr = d.map(
                        ["r", "g", "b"],
                        function (x) {
                            var s = this[x].toString(16);
                            return s.length < 2 ? "0" + s : s;
                        },
                        this
                    );
                    return "#" + arr.join("");
                },
                toCss: function (_101) {
                    var t = this,
                        rgb = t.r + ", " + t.g + ", " + t.b;
                    return (_101 ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";
                },
                toString: function () {
                    return this.toCss(true);
                },
            });
            dojo.blendColors = function (_102, end, _103, obj) {
                var t = obj || new d.Color();
                d.forEach(["r", "g", "b", "a"], function (x) {
                    t[x] = _102[x] + (end[x] - _102[x]) * _103;
                    if (x != "a") {
                        t[x] = Math.round(t[x]);
                    }
                });
                return t.sanitize();
            };
            dojo.colorFromRgb = function (_104, obj) {
                var m = _104.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
                return m && dojo.colorFromArray(m[1].split(/\s*,\s*/), obj);
            };
            dojo.colorFromHex = function (_105, obj) {
                var t = obj || new d.Color(),
                    bits = _105.length == 4 ? 4 : 8,
                    mask = (1 << bits) - 1;
                _105 = Number("0x" + _105.substr(1));
                if (isNaN(_105)) {
                    return null;
                }
                d.forEach(["b", "g", "r"], function (x) {
                    var c = _105 & mask;
                    _105 >>= bits;
                    t[x] = bits == 4 ? 17 * c : c;
                });
                t.a = 1;
                return t;
            };
            dojo.colorFromArray = function (a, obj) {
                var t = obj || new d.Color();
                t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
                if (isNaN(t.a)) {
                    t.a = 1;
                }
                return t.sanitize();
            };
            dojo.colorFromString = function (str, obj) {
                var a = d.Color.named[str];
                return (a && d.colorFromArray(a, obj)) || d.colorFromRgb(str, obj) || d.colorFromHex(str, obj);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base"]) {
        dojo._hasResource["dojo._base"] = true;
        dojo.provide("dojo._base");
    }
    if (!dojo._hasResource["dojo._base.window"]) {
        dojo._hasResource["dojo._base.window"] = true;
        dojo.provide("dojo._base.window");
        dojo.doc = window["document"] || null;
        dojo.body = function () {
            return dojo.doc.body || dojo.doc.getElementsByTagName("body")[0];
        };
        dojo.setContext = function (_106, _107) {
            dojo.global = _106;
            dojo.doc = _107;
        };
        dojo.withGlobal = function (_108, _109, _10a, _10b) {
            var _10c = dojo.global;
            try {
                dojo.global = _108;
                return dojo.withDoc.call(null, _108.document, _109, _10a, _10b);
            } finally {
                dojo.global = _10c;
            }
        };
        dojo.withDoc = function (_10d, _10e, _10f, _110) {
            var _111 = dojo.doc,
                _112 = dojo._bodyLtr,
                oldQ = dojo.isQuirks;
            try {
                dojo.doc = _10d;
                delete dojo._bodyLtr;
                dojo.isQuirks = dojo.doc.compatMode == "BackCompat";
                if (_10f && typeof _10e == "string") {
                    _10e = _10f[_10e];
                }
                return _10e.apply(_10f, _110 || []);
            } finally {
                dojo.doc = _111;
                delete dojo._bodyLtr;
                if (_112 !== undefined) {
                    dojo._bodyLtr = _112;
                }
                dojo.isQuirks = oldQ;
            }
        };
    }
    if (!dojo._hasResource["dojo._base.event"]) {
        dojo._hasResource["dojo._base.event"] = true;
        dojo.provide("dojo._base.event");
        (function () {
            var del = (dojo._event_listener = {
                add: function (node, name, fp) {
                    if (!node) {
                        return;
                    }
                    name = del._normalizeEventName(name);
                    fp = del._fixCallback(name, fp);
                    if (!dojo.isIE && (name == "mouseenter" || name == "mouseleave")) {
                        var ofp = fp;
                        name = name == "mouseenter" ? "mouseover" : "mouseout";
                        fp = function (e) {
                            if (!dojo.isDescendant(e.relatedTarget, node)) {
                                return ofp.call(this, e);
                            }
                        };
                    }
                    node.addEventListener(name, fp, false);
                    return fp;
                },
                remove: function (node, _113, _114) {
                    if (node) {
                        _113 = del._normalizeEventName(_113);
                        if (!dojo.isIE && (_113 == "mouseenter" || _113 == "mouseleave")) {
                            _113 = _113 == "mouseenter" ? "mouseover" : "mouseout";
                        }
                        node.removeEventListener(_113, _114, false);
                    }
                },
                _normalizeEventName: function (name) {
                    return name.slice(0, 2) == "on" ? name.slice(2) : name;
                },
                _fixCallback: function (name, fp) {
                    return name != "keypress"
                        ? fp
                        : function (e) {
                              return fp.call(this, del._fixEvent(e, this));
                          };
                },
                _fixEvent: function (evt, _115) {
                    switch (evt.type) {
                        case "keypress":
                            del._setKeyChar(evt);
                            break;
                    }
                    return evt;
                },
                _setKeyChar: function (evt) {
                    evt.keyChar = evt.charCode >= 32 ? String.fromCharCode(evt.charCode) : "";
                    evt.charOrCode = evt.keyChar || evt.keyCode;
                },
                _punctMap: { 106: 42, 111: 47, 186: 59, 187: 43, 188: 44, 189: 45, 190: 46, 191: 47, 192: 96, 219: 91, 220: 92, 221: 93, 222: 39 },
            });
            dojo.fixEvent = function (evt, _116) {
                return del._fixEvent(evt, _116);
            };
            dojo.stopEvent = function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            };
            var _117 = dojo._listener;
            dojo._connect = function (obj, _118, _119, _11a, _11b) {
                var _11c = obj && (obj.nodeType || obj.attachEvent || obj.addEventListener);
                var lid = _11c ? (_11b ? 2 : 1) : 0,
                    l = [dojo._listener, del, _117][lid];
                var h = l.add(obj, _118, dojo.hitch(_119, _11a));
                return [obj, _118, h, lid];
            };
            dojo._disconnect = function (obj, _11d, _11e, _11f) {
                [dojo._listener, del, _117][_11f].remove(obj, _11d, _11e);
            };
            dojo.keys = {
                BACKSPACE: 8,
                TAB: 9,
                CLEAR: 12,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                META: dojo.isSafari ? 91 : 224,
                PAUSE: 19,
                CAPS_LOCK: 20,
                ESCAPE: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT_ARROW: 37,
                UP_ARROW: 38,
                RIGHT_ARROW: 39,
                DOWN_ARROW: 40,
                INSERT: 45,
                DELETE: 46,
                HELP: 47,
                LEFT_WINDOW: 91,
                RIGHT_WINDOW: 92,
                SELECT: 93,
                NUMPAD_0: 96,
                NUMPAD_1: 97,
                NUMPAD_2: 98,
                NUMPAD_3: 99,
                NUMPAD_4: 100,
                NUMPAD_5: 101,
                NUMPAD_6: 102,
                NUMPAD_7: 103,
                NUMPAD_8: 104,
                NUMPAD_9: 105,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_PLUS: 107,
                NUMPAD_ENTER: 108,
                NUMPAD_MINUS: 109,
                NUMPAD_PERIOD: 110,
                NUMPAD_DIVIDE: 111,
                F1: 112,
                F2: 113,
                F3: 114,
                F4: 115,
                F5: 116,
                F6: 117,
                F7: 118,
                F8: 119,
                F9: 120,
                F10: 121,
                F11: 122,
                F12: 123,
                F13: 124,
                F14: 125,
                F15: 126,
                NUM_LOCK: 144,
                SCROLL_LOCK: 145,
                copyKey: dojo.isMac && !dojo.isAIR ? (dojo.isSafari ? 91 : 224) : 17,
            };
            var _120 = dojo.isMac ? "metaKey" : "ctrlKey";
            dojo.isCopyKey = function (e) {
                return e[_120];
            };
            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                dojo.mouseButtons = {
                    LEFT: 1,
                    MIDDLE: 4,
                    RIGHT: 2,
                    isButton: function (e, _121) {
                        return e.button & _121;
                    },
                    isLeft: function (e) {
                        return e.button & 1;
                    },
                    isMiddle: function (e) {
                        return e.button & 4;
                    },
                    isRight: function (e) {
                        return e.button & 2;
                    },
                };
            } else {
                dojo.mouseButtons = {
                    LEFT: 0,
                    MIDDLE: 1,
                    RIGHT: 2,
                    isButton: function (e, _122) {
                        return e.button == _122;
                    },
                    isLeft: function (e) {
                        return e.button == 0;
                    },
                    isMiddle: function (e) {
                        return e.button == 1;
                    },
                    isRight: function (e) {
                        return e.button == 2;
                    },
                };
            }
            if (dojo.isIE) {
                var _123 = function (e, code) {
                    try {
                        return (e.keyCode = code);
                    } catch (e) {
                        return 0;
                    }
                };
                var iel = dojo._listener;
                var _124 = (dojo._ieListenersName = "_" + dojo._scopeName + "_listeners");
                if (!dojo.config._allow_leaks) {
                    _117 = iel = dojo._ie_listener = {
                        handlers: [],
                        add: function (_125, _126, _127) {
                            _125 = _125 || dojo.global;
                            var f = _125[_126];
                            if (!f || !f[_124]) {
                                var d = dojo._getIeDispatcher();
                                d.target = f && ieh.push(f) - 1;
                                d[_124] = [];
                                f = _125[_126] = d;
                            }
                            return f[_124].push(ieh.push(_127) - 1);
                        },
                        remove: function (_128, _129, _12a) {
                            var f = (_128 || dojo.global)[_129],
                                l = f && f[_124];
                            if (f && l && _12a--) {
                                delete ieh[l[_12a]];
                                delete l[_12a];
                            }
                        },
                    };
                    var ieh = iel.handlers;
                }
                dojo.mixin(del, {
                    add: function (node, _12b, fp) {
                        if (!node) {
                            return;
                        }
                        _12b = del._normalizeEventName(_12b);
                        if (_12b == "onkeypress") {
                            var kd = node.onkeydown;
                            if (!kd || !kd[_124] || !kd._stealthKeydownHandle) {
                                var h = del.add(node, "onkeydown", del._stealthKeyDown);
                                kd = node.onkeydown;
                                kd._stealthKeydownHandle = h;
                                kd._stealthKeydownRefs = 1;
                            } else {
                                kd._stealthKeydownRefs++;
                            }
                        }
                        return iel.add(node, _12b, del._fixCallback(fp));
                    },
                    remove: function (node, _12c, _12d) {
                        _12c = del._normalizeEventName(_12c);
                        iel.remove(node, _12c, _12d);
                        if (_12c == "onkeypress") {
                            var kd = node.onkeydown;
                            if (--kd._stealthKeydownRefs <= 0) {
                                iel.remove(node, "onkeydown", kd._stealthKeydownHandle);
                                delete kd._stealthKeydownHandle;
                            }
                        }
                    },
                    _normalizeEventName: function (_12e) {
                        return _12e.slice(0, 2) != "on" ? "on" + _12e : _12e;
                    },
                    _nop: function () {},
                    _fixEvent: function (evt, _12f) {
                        if (!evt) {
                            var w = (_12f && (_12f.ownerDocument || _12f.document || _12f).parentWindow) || window;
                            evt = w.event;
                        }
                        if (!evt) {
                            return evt;
                        }
                        evt.target = evt.srcElement;
                        evt.currentTarget = _12f || evt.srcElement;
                        evt.layerX = evt.offsetX;
                        evt.layerY = evt.offsetY;
                        var se = evt.srcElement,
                            doc = (se && se.ownerDocument) || document;
                        var _130 = dojo.isIE < 6 || doc["compatMode"] == "BackCompat" ? doc.body : doc.documentElement;
                        var _131 = dojo._getIeDocumentElementOffset();
                        evt.pageX = evt.clientX + dojo._fixIeBiDiScrollLeft(_130.scrollLeft || 0) - _131.x;
                        evt.pageY = evt.clientY + (_130.scrollTop || 0) - _131.y;
                        if (evt.type == "mouseover") {
                            evt.relatedTarget = evt.fromElement;
                        }
                        if (evt.type == "mouseout") {
                            evt.relatedTarget = evt.toElement;
                        }
                        if (dojo.isIE < 9 || dojo.isQuirks) {
                            evt.stopPropagation = del._stopPropagation;
                            evt.preventDefault = del._preventDefault;
                        }
                        return del._fixKeys(evt);
                    },
                    _fixKeys: function (evt) {
                        switch (evt.type) {
                            case "keypress":
                                var c = "charCode" in evt ? evt.charCode : evt.keyCode;
                                if (c == 10) {
                                    c = 0;
                                    evt.keyCode = 13;
                                } else {
                                    if (c == 13 || c == 27) {
                                        c = 0;
                                    } else {
                                        if (c == 3) {
                                            c = 99;
                                        }
                                    }
                                }
                                evt.charCode = c;
                                del._setKeyChar(evt);
                                break;
                        }
                        return evt;
                    },
                    _stealthKeyDown: function (evt) {
                        var kp = evt.currentTarget.onkeypress;
                        if (!kp || !kp[_124]) {
                            return;
                        }
                        var k = evt.keyCode;
                        var _132 = (k != 13 || (dojo.isIE >= 9 && !dojo.isQuirks)) && k != 32 && k != 27 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                        if (_132 || evt.ctrlKey) {
                            var c = _132 ? 0 : k;
                            if (evt.ctrlKey) {
                                if (k == 3 || k == 13) {
                                    return;
                                } else {
                                    if (c > 95 && c < 106) {
                                        c -= 48;
                                    } else {
                                        if (!evt.shiftKey && c >= 65 && c <= 90) {
                                            c += 32;
                                        } else {
                                            c = del._punctMap[c] || c;
                                        }
                                    }
                                }
                            }
                            var faux = del._synthesizeEvent(evt, { type: "keypress", faux: true, charCode: c });
                            kp.call(evt.currentTarget, faux);
                            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                                evt.cancelBubble = faux.cancelBubble;
                            }
                            evt.returnValue = faux.returnValue;
                            _123(evt, faux.keyCode);
                        }
                    },
                    _stopPropagation: function () {
                        this.cancelBubble = true;
                    },
                    _preventDefault: function () {
                        this.bubbledKeyCode = this.keyCode;
                        if (this.ctrlKey) {
                            _123(this, 0);
                        }
                        this.returnValue = false;
                    },
                });
                dojo.stopEvent =
                    dojo.isIE < 9 || dojo.isQuirks
                        ? function (evt) {
                              evt = evt || window.event;
                              del._stopPropagation.call(evt);
                              del._preventDefault.call(evt);
                          }
                        : dojo.stopEvent;
            }
            del._synthesizeEvent = function (evt, _133) {
                var faux = dojo.mixin({}, evt, _133);
                del._setKeyChar(faux);
                faux.preventDefault = function () {
                    evt.preventDefault();
                };
                faux.stopPropagation = function () {
                    evt.stopPropagation();
                };
                return faux;
            };
            if (dojo.isOpera) {
                dojo.mixin(del, {
                    _fixEvent: function (evt, _134) {
                        switch (evt.type) {
                            case "keypress":
                                var c = evt.which;
                                if (c == 3) {
                                    c = 99;
                                }
                                c = c < 41 && !evt.shiftKey ? 0 : c;
                                if (evt.ctrlKey && !evt.shiftKey && c >= 65 && c <= 90) {
                                    c += 32;
                                }
                                return del._synthesizeEvent(evt, { charCode: c });
                        }
                        return evt;
                    },
                });
            }
            if (dojo.isWebKit) {
                del._add = del.add;
                del._remove = del.remove;
                dojo.mixin(del, {
                    add: function (node, _135, fp) {
                        if (!node) {
                            return;
                        }
                        var _136 = del._add(node, _135, fp);
                        if (del._normalizeEventName(_135) == "keypress") {
                            _136._stealthKeyDownHandle = del._add(node, "keydown", function (evt) {
                                var k = evt.keyCode;
                                var _137 = k != 13 && k != 32 && (k < 48 || k > 90) && (k < 96 || k > 111) && (k < 186 || k > 192) && (k < 219 || k > 222);
                                if (_137 || evt.ctrlKey) {
                                    var c = _137 ? 0 : k;
                                    if (evt.ctrlKey) {
                                        if (k == 3 || k == 13) {
                                            return;
                                        } else {
                                            if (c > 95 && c < 106) {
                                                c -= 48;
                                            } else {
                                                if (!evt.shiftKey && c >= 65 && c <= 90) {
                                                    c += 32;
                                                } else {
                                                    c = del._punctMap[c] || c;
                                                }
                                            }
                                        }
                                    }
                                    var faux = del._synthesizeEvent(evt, { type: "keypress", faux: true, charCode: c });
                                    fp.call(evt.currentTarget, faux);
                                }
                            });
                        }
                        return _136;
                    },
                    remove: function (node, _138, _139) {
                        if (node) {
                            if (_139._stealthKeyDownHandle) {
                                del._remove(node, "keydown", _139._stealthKeyDownHandle);
                            }
                            del._remove(node, _138, _139);
                        }
                    },
                    _fixEvent: function (evt, _13a) {
                        switch (evt.type) {
                            case "keypress":
                                if (evt.faux) {
                                    return evt;
                                }
                                var c = evt.charCode;
                                c = c >= 32 ? c : 0;
                                return del._synthesizeEvent(evt, { charCode: c, faux: true });
                        }
                        return evt;
                    },
                });
            }
        })();
        if (dojo.isIE) {
            dojo._ieDispatcher = function (args, _13b) {
                var ap = Array.prototype,
                    h = dojo._ie_listener.handlers,
                    c = args.callee,
                    ls = c[dojo._ieListenersName],
                    t = h[c.target];
                var r = t && t.apply(_13b, args);
                var lls = [].concat(ls);
                for (var i in lls) {
                    var f = h[lls[i]];
                    if (!(i in ap) && f) {
                        f.apply(_13b, args);
                    }
                }
                return r;
            };
            dojo._getIeDispatcher = function () {
                return new Function("return " + dojo._scopeName + "._ieDispatcher(arguments, this)");
            };
            dojo._event_listener._fixCallback = function (fp) {
                var f = dojo._event_listener._fixEvent;
                return function (e) {
                    return fp.call(this, f(e, this));
                };
            };
        }
    }
    if (!dojo._hasResource["dojo._base.html"]) {
        dojo._hasResource["dojo._base.html"] = true;
        dojo.provide("dojo._base.html");
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        if (dojo.isIE || dojo.isOpera) {
            dojo.byId = function (id, doc) {
                if (typeof id != "string") {
                    return id;
                }
                var _13c = doc || dojo.doc,
                    te = _13c.getElementById(id);
                if (te && (te.attributes.id.value == id || te.id == id)) {
                    return te;
                } else {
                    var eles = _13c.all[id];
                    if (!eles || eles.nodeName) {
                        eles = [eles];
                    }
                    var i = 0;
                    while ((te = eles[i++])) {
                        if ((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id) {
                            return te;
                        }
                    }
                }
            };
        } else {
            dojo.byId = function (id, doc) {
                return typeof id == "string" ? (doc || dojo.doc).getElementById(id) : id;
            };
        }
        (function () {
            var d = dojo;
            var byId = d.byId;
            var _13d = null,
                _13e;
            d.addOnWindowUnload(function () {
                _13d = null;
            });
            dojo._destroyElement = dojo.destroy = function (node) {
                node = byId(node);
                try {
                    var doc = node.ownerDocument;
                    if (!_13d || _13e != doc) {
                        _13d = doc.createElement("div");
                        _13e = doc;
                    }
                    _13d.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
                    _13d.innerHTML = "";
                } catch (e) {}
            };
            dojo.isDescendant = function (node, _13f) {
                try {
                    node = byId(node);
                    _13f = byId(_13f);
                    while (node) {
                        if (node == _13f) {
                            return true;
                        }
                        node = node.parentNode;
                    }
                } catch (e) {}
                return false;
            };
            dojo.setSelectable = function (node, _140) {
                node = byId(node);
                if (d.isMozilla) {
                    node.style.MozUserSelect = _140 ? "" : "none";
                } else {
                    if (d.isKhtml || d.isWebKit) {
                        node.style.KhtmlUserSelect = _140 ? "auto" : "none";
                    } else {
                        if (d.isIE) {
                            var v = (node.unselectable = _140 ? "" : "on");
                            d.query("*", node).forEach("item.unselectable = '" + v + "'");
                        }
                    }
                }
            };
            var _141 = function (node, ref) {
                var _142 = ref.parentNode;
                if (_142) {
                    _142.insertBefore(node, ref);
                }
            };
            var _143 = function (node, ref) {
                var _144 = ref.parentNode;
                if (_144) {
                    if (_144.lastChild == ref) {
                        _144.appendChild(node);
                    } else {
                        _144.insertBefore(node, ref.nextSibling);
                    }
                }
            };
            dojo.place = function (node, _145, _146) {
                _145 = byId(_145);
                if (typeof node == "string") {
                    node = node.charAt(0) == "<" ? d._toDom(node, _145.ownerDocument) : byId(node);
                }
                if (typeof _146 == "number") {
                    var cn = _145.childNodes;
                    if (!cn.length || cn.length <= _146) {
                        _145.appendChild(node);
                    } else {
                        _141(node, cn[_146 < 0 ? 0 : _146]);
                    }
                } else {
                    switch (_146) {
                        case "before":
                            _141(node, _145);
                            break;
                        case "after":
                            _143(node, _145);
                            break;
                        case "replace":
                            _145.parentNode.replaceChild(node, _145);
                            break;
                        case "only":
                            d.empty(_145);
                            _145.appendChild(node);
                            break;
                        case "first":
                            if (_145.firstChild) {
                                _141(node, _145.firstChild);
                                break;
                            }
                        default:
                            _145.appendChild(node);
                    }
                }
                return node;
            };
            dojo.boxModel = "content-box";
            if (d.isIE) {
                d.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
            }
            var gcs;
            if (d.isWebKit) {
                gcs = function (node) {
                    var s;
                    if (node.nodeType == 1) {
                        var dv = node.ownerDocument.defaultView;
                        s = dv.getComputedStyle(node, null);
                        if (!s && node.style) {
                            node.style.display = "";
                            s = dv.getComputedStyle(node, null);
                        }
                    }
                    return s || {};
                };
            } else {
                if (d.isIE) {
                    gcs = function (node) {
                        return node.nodeType == 1 ? node.currentStyle : {};
                    };
                } else {
                    gcs = function (node) {
                        return node.nodeType == 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
                    };
                }
            }
            dojo.getComputedStyle = gcs;
            if (!d.isIE) {
                d._toPixelValue = function (_147, _148) {
                    return parseFloat(_148) || 0;
                };
            } else {
                d._toPixelValue = function (_149, _14a) {
                    if (!_14a) {
                        return 0;
                    }
                    if (_14a == "medium") {
                        return 4;
                    }
                    if (_14a.slice && _14a.slice(-2) == "px") {
                        return parseFloat(_14a);
                    }
                    with (_149) {
                        var _14b = style.left;
                        var _14c = runtimeStyle.left;
                        runtimeStyle.left = currentStyle.left;
                        try {
                            style.left = _14a;
                            _14a = style.pixelLeft;
                        } catch (e) {
                            _14a = 0;
                        }
                        style.left = _14b;
                        runtimeStyle.left = _14c;
                    }
                    return _14a;
                };
            }
            var px = d._toPixelValue;
            var astr = "DXImageTransform.Microsoft.Alpha";
            var af = function (n, f) {
                try {
                    return n.filters.item(astr);
                } catch (e) {
                    return f ? {} : null;
                }
            };
            dojo._getOpacity =
                d.isIE < 9 || (d.isIE && d.isQuirks)
                    ? function (node) {
                          try {
                              return af(node).Opacity / 100;
                          } catch (e) {
                              return 1;
                          }
                      }
                    : function (node) {
                          return gcs(node).opacity;
                      };
            dojo._setOpacity =
                d.isIE < 9 || (d.isIE && d.isQuirks)
                    ? function (node, _14d) {
                          var ov = _14d * 100;
                          node.style.zoom = 1;
                          af(node, 1).Enabled = !(_14d == 1);
                          if (!af(node)) {
                              node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
                          } else {
                              af(node, 1).Opacity = ov;
                          }
                          if (node.nodeName.toLowerCase() == "tr") {
                              d.query("> td", node).forEach(function (i) {
                                  d._setOpacity(i, _14d);
                              });
                          }
                          return _14d;
                      }
                    : function (node, _14e) {
                          return (node.style.opacity = _14e);
                      };
            var _14f = { left: true, top: true };
            var _150 = /margin|padding|width|height|max|min|offset/;
            var _151 = function (node, type, _152) {
                type = type.toLowerCase();
                if (d.isIE) {
                    if (_152 == "auto") {
                        if (type == "height") {
                            return node.offsetHeight;
                        }
                        if (type == "width") {
                            return node.offsetWidth;
                        }
                    }
                    if (type == "fontweight") {
                        switch (_152) {
                            case 700:
                                return "bold";
                            case 400:
                            default:
                                return "normal";
                        }
                    }
                }
                if (!(type in _14f)) {
                    _14f[type] = _150.test(type);
                }
                return _14f[type] ? px(node, _152) : _152;
            };
            var _153 = d.isIE ? "styleFloat" : "cssFloat",
                _154 = { cssFloat: _153, styleFloat: _153, float: _153 };
            dojo.style = function (node, _155, _156) {
                var n = byId(node),
                    args = arguments.length,
                    op = _155 == "opacity";
                _155 = _154[_155] || _155;
                if (args == 3) {
                    return op ? d._setOpacity(n, _156) : (n.style[_155] = _156);
                }
                if (args == 2 && op) {
                    return d._getOpacity(n);
                }
                var s = gcs(n);
                if (args == 2 && typeof _155 != "string") {
                    for (var x in _155) {
                        d.style(node, x, _155[x]);
                    }
                    return s;
                }
                return args == 1 ? s : _151(n, _155, s[_155] || n.style[_155]);
            };
            dojo._getPadExtents = function (n, _157) {
                var s = _157 || gcs(n),
                    l = px(n, s.paddingLeft),
                    t = px(n, s.paddingTop);
                return { l: l, t: t, w: l + px(n, s.paddingRight), h: t + px(n, s.paddingBottom) };
            };
            dojo._getBorderExtents = function (n, _158) {
                var ne = "none",
                    s = _158 || gcs(n),
                    bl = s.borderLeftStyle != ne ? px(n, s.borderLeftWidth) : 0,
                    bt = s.borderTopStyle != ne ? px(n, s.borderTopWidth) : 0;
                return { l: bl, t: bt, w: bl + (s.borderRightStyle != ne ? px(n, s.borderRightWidth) : 0), h: bt + (s.borderBottomStyle != ne ? px(n, s.borderBottomWidth) : 0) };
            };
            dojo._getPadBorderExtents = function (n, _159) {
                var s = _159 || gcs(n),
                    p = d._getPadExtents(n, s),
                    b = d._getBorderExtents(n, s);
                return { l: p.l + b.l, t: p.t + b.t, w: p.w + b.w, h: p.h + b.h };
            };
            dojo._getMarginExtents = function (n, _15a) {
                var s = _15a || gcs(n),
                    l = px(n, s.marginLeft),
                    t = px(n, s.marginTop),
                    r = px(n, s.marginRight),
                    b = px(n, s.marginBottom);
                if (d.isWebKit && s.position != "absolute") {
                    r = l;
                }
                return { l: l, t: t, w: l + r, h: t + b };
            };
            dojo._getMarginBox = function (node, _15b) {
                var s = _15b || gcs(node),
                    me = d._getMarginExtents(node, s);
                var l = node.offsetLeft - me.l,
                    t = node.offsetTop - me.t,
                    p = node.parentNode;
                if (d.isMoz) {
                    var sl = parseFloat(s.left),
                        st = parseFloat(s.top);
                    if (!isNaN(sl) && !isNaN(st)) {
                        (l = sl), (t = st);
                    } else {
                        if (p && p.style) {
                            var pcs = gcs(p);
                            if (pcs.overflow != "visible") {
                                var be = d._getBorderExtents(p, pcs);
                                (l += be.l), (t += be.t);
                            }
                        }
                    }
                } else {
                    if (d.isOpera || (d.isIE == 8 && !d.isQuirks)) {
                        if (p) {
                            be = d._getBorderExtents(p);
                            l -= be.l;
                            t -= be.t;
                        }
                    }
                }
                return { l: l, t: t, w: node.offsetWidth + me.w, h: node.offsetHeight + me.h };
            };
            dojo._getContentBox = function (node, _15c) {
                var s = _15c || gcs(node),
                    pe = d._getPadExtents(node, s),
                    be = d._getBorderExtents(node, s),
                    w = node.clientWidth,
                    h;
                if (!w) {
                    (w = node.offsetWidth), (h = node.offsetHeight);
                } else {
                    (h = node.clientHeight), (be.w = be.h = 0);
                }
                if (d.isOpera) {
                    pe.l += be.l;
                    pe.t += be.t;
                }
                return { l: pe.l, t: pe.t, w: w - pe.w - be.w, h: h - pe.h - be.h };
            };
            dojo._getBorderBox = function (node, _15d) {
                var s = _15d || gcs(node),
                    pe = d._getPadExtents(node, s),
                    cb = d._getContentBox(node, s);
                return { l: cb.l - pe.l, t: cb.t - pe.t, w: cb.w + pe.w, h: cb.h + pe.h };
            };
            dojo._setBox = function (node, l, t, w, h, u) {
                u = u || "px";
                var s = node.style;
                if (!isNaN(l)) {
                    s.left = l + u;
                }
                if (!isNaN(t)) {
                    s.top = t + u;
                }
                if (w >= 0) {
                    s.width = w + u;
                }
                if (h >= 0) {
                    s.height = h + u;
                }
            };
            dojo._isButtonTag = function (node) {
                return node.tagName == "BUTTON" || (node.tagName == "INPUT" && (node.getAttribute("type") || "").toUpperCase() == "BUTTON");
            };
            dojo._usesBorderBox = function (node) {
                var n = node.tagName;
                return d.boxModel == "border-box" || n == "TABLE" || d._isButtonTag(node);
            };
            dojo._setContentSize = function (node, _15e, _15f, _160) {
                if (d._usesBorderBox(node)) {
                    var pb = d._getPadBorderExtents(node, _160);
                    if (_15e >= 0) {
                        _15e += pb.w;
                    }
                    if (_15f >= 0) {
                        _15f += pb.h;
                    }
                }
                d._setBox(node, NaN, NaN, _15e, _15f);
            };
            dojo._setMarginBox = function (node, _161, _162, _163, _164, _165) {
                var s = _165 || gcs(node),
                    bb = d._usesBorderBox(node),
                    pb = bb ? _166 : d._getPadBorderExtents(node, s);
                if (d.isWebKit) {
                    if (d._isButtonTag(node)) {
                        var ns = node.style;
                        if (_163 >= 0 && !ns.width) {
                            ns.width = "4px";
                        }
                        if (_164 >= 0 && !ns.height) {
                            ns.height = "4px";
                        }
                    }
                }
                var mb = d._getMarginExtents(node, s);
                if (_163 >= 0) {
                    _163 = Math.max(_163 - pb.w - mb.w, 0);
                }
                if (_164 >= 0) {
                    _164 = Math.max(_164 - pb.h - mb.h, 0);
                }
                d._setBox(node, _161, _162, _163, _164);
            };
            var _166 = { l: 0, t: 0, w: 0, h: 0 };
            dojo.marginBox = function (node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getMarginBox(n, s) : d._setMarginBox(n, b.l, b.t, b.w, b.h, s);
            };
            dojo.contentBox = function (node, box) {
                var n = byId(node),
                    s = gcs(n),
                    b = box;
                return !b ? d._getContentBox(n, s) : d._setContentSize(n, b.w, b.h, s);
            };
            var _167 = function (node, prop) {
                if (!(node = (node || 0).parentNode)) {
                    return 0;
                }
                var val,
                    _168 = 0,
                    _169 = d.body();
                while (node && node.style) {
                    if (gcs(node).position == "fixed") {
                        return 0;
                    }
                    val = node[prop];
                    if (val) {
                        _168 += val - 0;
                        if (node == _169) {
                            break;
                        }
                    }
                    node = node.parentNode;
                }
                return _168;
            };
            dojo._docScroll = function () {
                var n = d.global;
                return "pageXOffset" in n
                    ? { x: n.pageXOffset, y: n.pageYOffset }
                    : ((n = d.doc.documentElement), n.clientHeight ? { x: d._fixIeBiDiScrollLeft(n.scrollLeft), y: n.scrollTop } : ((n = d.body()), { x: n.scrollLeft || 0, y: n.scrollTop || 0 }));
            };
            dojo._isBodyLtr = function () {
                return "_bodyLtr" in d ? d._bodyLtr : (d._bodyLtr = (d.body().dir || d.doc.documentElement.dir || "ltr").toLowerCase() == "ltr");
            };
            dojo._getIeDocumentElementOffset = function () {
                var de = d.doc.documentElement;
                if (d.isIE < 8) {
                    var r = de.getBoundingClientRect();
                    var l = r.left,
                        t = r.top;
                    if (d.isIE < 7) {
                        l += de.clientLeft;
                        t += de.clientTop;
                    }
                    return { x: l < 0 ? 0 : l, y: t < 0 ? 0 : t };
                } else {
                    return { x: 0, y: 0 };
                }
            };
            dojo._fixIeBiDiScrollLeft = function (_16a) {
                var dd = d.doc;
                if (d.isIE < 8 && !d._isBodyLtr()) {
                    var de = d.isQuirks ? dd.body : dd.documentElement;
                    return _16a + de.clientWidth - de.scrollWidth;
                }
                return _16a;
            };
            dojo._abs = dojo.position = function (node, _16b) {
                var db = d.body(),
                    dh = db.parentNode,
                    ret;
                node = byId(node);
                if (node["getBoundingClientRect"]) {
                    ret = node.getBoundingClientRect();
                    ret = { x: ret.left, y: ret.top, w: ret.right - ret.left, h: ret.bottom - ret.top };
                    if (d.isIE) {
                        var _16c = d._getIeDocumentElementOffset();
                        ret.x -= _16c.x + (d.isQuirks ? db.clientLeft + db.offsetLeft : 0);
                        ret.y -= _16c.y + (d.isQuirks ? db.clientTop + db.offsetTop : 0);
                    } else {
                        if (d.isFF == 3) {
                            var cs = gcs(dh);
                            ret.x -= px(dh, cs.marginLeft) + px(dh, cs.borderLeftWidth);
                            ret.y -= px(dh, cs.marginTop) + px(dh, cs.borderTopWidth);
                        }
                    }
                } else {
                    ret = { x: 0, y: 0, w: node.offsetWidth, h: node.offsetHeight };
                    if (node["offsetParent"]) {
                        ret.x -= _167(node, "scrollLeft");
                        ret.y -= _167(node, "scrollTop");
                        var _16d = node;
                        do {
                            var n = _16d.offsetLeft,
                                t = _16d.offsetTop;
                            ret.x += isNaN(n) ? 0 : n;
                            ret.y += isNaN(t) ? 0 : t;
                            cs = gcs(_16d);
                            if (_16d != node) {
                                if (d.isMoz) {
                                    ret.x += 2 * px(_16d, cs.borderLeftWidth);
                                    ret.y += 2 * px(_16d, cs.borderTopWidth);
                                } else {
                                    ret.x += px(_16d, cs.borderLeftWidth);
                                    ret.y += px(_16d, cs.borderTopWidth);
                                }
                            }
                            if (d.isMoz && cs.position == "static") {
                                var _16e = _16d.parentNode;
                                while (_16e != _16d.offsetParent) {
                                    var pcs = gcs(_16e);
                                    if (pcs.position == "static") {
                                        ret.x += px(_16d, pcs.borderLeftWidth);
                                        ret.y += px(_16d, pcs.borderTopWidth);
                                    }
                                    _16e = _16e.parentNode;
                                }
                            }
                            _16d = _16d.offsetParent;
                        } while (_16d != dh && _16d);
                    } else {
                        if (node.x && node.y) {
                            ret.x += isNaN(node.x) ? 0 : node.x;
                            ret.y += isNaN(node.y) ? 0 : node.y;
                        }
                    }
                }
                if (_16b) {
                    var _16f = d._docScroll();
                    ret.x += _16f.x;
                    ret.y += _16f.y;
                }
                return ret;
            };
            dojo.coords = function (node, _170) {
                var n = byId(node),
                    s = gcs(n),
                    mb = d._getMarginBox(n, s);
                var abs = d.position(n, _170);
                mb.x = abs.x;
                mb.y = abs.y;
                return mb;
            };
            var _171 = { class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", colspan: "colSpan", frameborder: "frameBorder", rowspan: "rowSpan", valuetype: "valueType" },
                _172 = { classname: "class", htmlfor: "for", tabindex: "tabIndex", readonly: "readOnly" },
                _173 = { innerHTML: 1, className: 1, htmlFor: d.isIE, value: 1 };
            var _174 = function (name) {
                return _172[name.toLowerCase()] || name;
            };
            var _175 = function (node, name) {
                var attr = node.getAttributeNode && node.getAttributeNode(name);
                return attr && attr.specified;
            };
            dojo.hasAttr = function (node, name) {
                var lc = name.toLowerCase();
                return _173[_171[lc] || name] || _175(byId(node), _172[lc] || name);
            };
            var _176 = {},
                _177 = 0,
                _178 = dojo._scopeName + "attrid",
                _179 = { col: 1, colgroup: 1, table: 1, tbody: 1, tfoot: 1, thead: 1, tr: 1, title: 1 };
            dojo.attr = function (node, name, _17a) {
                node = byId(node);
                var args = arguments.length,
                    prop;
                if (args == 2 && typeof name != "string") {
                    for (var x in name) {
                        d.attr(node, x, name[x]);
                    }
                    return node;
                }
                var lc = name.toLowerCase(),
                    _17b = _171[lc] || name,
                    _17c = _173[_17b],
                    _17d = _172[lc] || name;
                if (args == 3) {
                    do {
                        if (_17b == "style" && typeof _17a != "string") {
                            d.style(node, _17a);
                            break;
                        }
                        if (_17b == "innerHTML") {
                            if (d.isIE && node.tagName.toLowerCase() in _179) {
                                d.empty(node);
                                node.appendChild(d._toDom(_17a, node.ownerDocument));
                            } else {
                                node[_17b] = _17a;
                            }
                            break;
                        }
                        if (d.isFunction(_17a)) {
                            var _17e = d.attr(node, _178);
                            if (!_17e) {
                                _17e = _177++;
                                d.attr(node, _178, _17e);
                            }
                            if (!_176[_17e]) {
                                _176[_17e] = {};
                            }
                            var h = _176[_17e][_17b];
                            if (h) {
                                d.disconnect(h);
                            } else {
                                try {
                                    delete node[_17b];
                                } catch (e) {}
                            }
                            _176[_17e][_17b] = d.connect(node, _17b, _17a);
                            break;
                        }
                        if (_17c || typeof _17a == "boolean") {
                            node[_17b] = _17a;
                            break;
                        }
                        node.setAttribute(_17d, _17a);
                    } while (false);
                    return node;
                }
                _17a = node[_17b];
                if (_17c && typeof _17a != "undefined") {
                    return _17a;
                }
                if (_17b != "href" && (typeof _17a == "boolean" || d.isFunction(_17a))) {
                    return _17a;
                }
                return _175(node, _17d) ? node.getAttribute(_17d) : null;
            };
            dojo.removeAttr = function (node, name) {
                byId(node).removeAttribute(_174(name));
            };
            dojo.getNodeProp = function (node, name) {
                node = byId(node);
                var lc = name.toLowerCase(),
                    _17f = _171[lc] || name;
                if (_17f in node && _17f != "href") {
                    return node[_17f];
                }
                var _180 = _172[lc] || name;
                return _175(node, _180) ? node.getAttribute(_180) : null;
            };
            dojo.create = function (tag, _181, _182, pos) {
                var doc = d.doc;
                if (_182) {
                    _182 = byId(_182);
                    doc = _182.ownerDocument;
                }
                if (typeof tag == "string") {
                    tag = doc.createElement(tag);
                }
                if (_181) {
                    d.attr(tag, _181);
                }
                if (_182) {
                    d.place(tag, _182, pos);
                }
                return tag;
            };
            d.empty = d.isIE
                ? function (node) {
                      node = byId(node);
                      for (var c; (c = node.lastChild); ) {
                          d.destroy(c);
                      }
                  }
                : function (node) {
                      byId(node).innerHTML = "";
                  };
            var _183 = {
                    option: ["select"],
                    tbody: ["table"],
                    thead: ["table"],
                    tfoot: ["table"],
                    tr: ["table", "tbody"],
                    td: ["table", "tbody", "tr"],
                    th: ["table", "thead", "tr"],
                    legend: ["fieldset"],
                    caption: ["table"],
                    colgroup: ["table"],
                    col: ["table", "colgroup"],
                    li: ["ul"],
                },
                _184 = /<\s*([\w\:]+)/,
                _185 = {},
                _186 = 0,
                _187 = "__" + d._scopeName + "ToDomId";
            for (var _188 in _183) {
                var tw = _183[_188];
                tw.pre = _188 == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
                tw.post = "</" + tw.reverse().join("></") + ">";
            }
            d._toDom = function (frag, doc) {
                doc = doc || d.doc;
                var _189 = doc[_187];
                if (!_189) {
                    doc[_187] = _189 = ++_186 + "";
                    _185[_189] = doc.createElement("div");
                }
                frag += "";
                var _18a = frag.match(_184),
                    tag = _18a ? _18a[1].toLowerCase() : "",
                    _18b = _185[_189],
                    wrap,
                    i,
                    fc,
                    df;
                if (_18a && _183[tag]) {
                    wrap = _183[tag];
                    _18b.innerHTML = wrap.pre + frag + wrap.post;
                    for (i = wrap.length; i; --i) {
                        _18b = _18b.firstChild;
                    }
                } else {
                    _18b.innerHTML = frag;
                }
                if (_18b.childNodes.length == 1) {
                    return _18b.removeChild(_18b.firstChild);
                }
                df = doc.createDocumentFragment();
                while ((fc = _18b.firstChild)) {
                    df.appendChild(fc);
                }
                return df;
            };
            var _18c = "className";
            dojo.hasClass = function (node, _18d) {
                return (" " + byId(node)[_18c] + " ").indexOf(" " + _18d + " ") >= 0;
            };
            var _18e = /\s+/,
                a1 = [""],
                _18f = function (s) {
                    if (typeof s == "string" || s instanceof String) {
                        if (s.indexOf(" ") < 0) {
                            a1[0] = s;
                            return a1;
                        } else {
                            return s.split(_18e);
                        }
                    }
                    return s;
                };
            dojo.addClass = function (node, _190) {
                node = byId(node);
                _190 = _18f(_190);
                var cls = " " + node[_18c] + " ";
                for (var i = 0, len = _190.length, c; i < len; ++i) {
                    c = _190[i];
                    if (c && cls.indexOf(" " + c + " ") < 0) {
                        cls += c + " ";
                    }
                }
                node[_18c] = d.trim(cls);
            };
            dojo.removeClass = function (node, _191) {
                node = byId(node);
                var cls;
                if (_191 !== undefined) {
                    _191 = _18f(_191);
                    cls = " " + node[_18c] + " ";
                    for (var i = 0, len = _191.length; i < len; ++i) {
                        cls = cls.replace(" " + _191[i] + " ", " ");
                    }
                    cls = d.trim(cls);
                } else {
                    cls = "";
                }
                if (node[_18c] != cls) {
                    node[_18c] = cls;
                }
            };
            dojo.toggleClass = function (node, _192, _193) {
                if (_193 === undefined) {
                    _193 = !d.hasClass(node, _192);
                }
                d[_193 ? "addClass" : "removeClass"](node, _192);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.NodeList"]) {
        dojo._hasResource["dojo._base.NodeList"] = true;
        dojo.provide("dojo._base.NodeList");
        (function () {
            var d = dojo;
            var ap = Array.prototype,
                aps = ap.slice,
                apc = ap.concat;
            var tnl = function (a, _194, _195) {
                if (!a.sort) {
                    a = aps.call(a, 0);
                }
                var ctor = _195 || this._NodeListCtor || d._NodeListCtor;
                a.constructor = ctor;
                dojo._mixin(a, ctor.prototype);
                a._NodeListCtor = ctor;
                return _194 ? a._stash(_194) : a;
            };
            var _196 = function (f, a, o) {
                a = [0].concat(aps.call(a, 0));
                o = o || d.global;
                return function (node) {
                    a[0] = node;
                    return f.apply(o, a);
                };
            };
            var _197 = function (f, o) {
                return function () {
                    this.forEach(_196(f, arguments, o));
                    return this;
                };
            };
            var _198 = function (f, o) {
                return function () {
                    return this.map(_196(f, arguments, o));
                };
            };
            var _199 = function (f, o) {
                return function () {
                    return this.filter(_196(f, arguments, o));
                };
            };
            var _19a = function (f, g, o) {
                return function () {
                    var a = arguments,
                        body = _196(f, a, o);
                    if (g.call(o || d.global, a)) {
                        return this.map(body);
                    }
                    this.forEach(body);
                    return this;
                };
            };
            var _19b = function (a) {
                return a.length == 1 && typeof a[0] == "string";
            };
            var _19c = function (node) {
                var p = node.parentNode;
                if (p) {
                    p.removeChild(node);
                }
            };
            dojo.NodeList = function () {
                return tnl(Array.apply(null, arguments));
            };
            d._NodeListCtor = d.NodeList;
            var nl = d.NodeList,
                nlp = nl.prototype;
            nl._wrap = nlp._wrap = tnl;
            nl._adaptAsMap = _198;
            nl._adaptAsForEach = _197;
            nl._adaptAsFilter = _199;
            nl._adaptWithCondition = _19a;
            d.forEach(["slice", "splice"], function (name) {
                var f = ap[name];
                nlp[name] = function () {
                    return this._wrap(f.apply(this, arguments), name == "slice" ? this : null);
                };
            });
            d.forEach(["indexOf", "lastIndexOf", "every", "some"], function (name) {
                var f = d[name];
                nlp[name] = function () {
                    return f.apply(d, [this].concat(aps.call(arguments, 0)));
                };
            });
            d.forEach(["attr", "style"], function (name) {
                nlp[name] = _19a(d[name], _19b);
            });
            d.forEach(["connect", "addClass", "removeClass", "toggleClass", "empty", "removeAttr"], function (name) {
                nlp[name] = _197(d[name]);
            });
            dojo.extend(dojo.NodeList, {
                _normalize: function (_19d, _19e) {
                    var _19f = _19d.parse === true ? true : false;
                    if (typeof _19d.template == "string") {
                        var _1a0 = _19d.templateFunc || (dojo.string && dojo.string.substitute);
                        _19d = _1a0 ? _1a0(_19d.template, _19d) : _19d;
                    }
                    var type = typeof _19d;
                    if (type == "string" || type == "number") {
                        _19d = dojo._toDom(_19d, _19e && _19e.ownerDocument);
                        if (_19d.nodeType == 11) {
                            _19d = dojo._toArray(_19d.childNodes);
                        } else {
                            _19d = [_19d];
                        }
                    } else {
                        if (!dojo.isArrayLike(_19d)) {
                            _19d = [_19d];
                        } else {
                            if (!dojo.isArray(_19d)) {
                                _19d = dojo._toArray(_19d);
                            }
                        }
                    }
                    if (_19f) {
                        _19d._runParse = true;
                    }
                    return _19d;
                },
                _cloneNode: function (node) {
                    return node.cloneNode(true);
                },
                _place: function (ary, _1a1, _1a2, _1a3) {
                    if (_1a1.nodeType != 1 && _1a2 == "only") {
                        return;
                    }
                    var _1a4 = _1a1,
                        _1a5;
                    var _1a6 = ary.length;
                    for (var i = _1a6 - 1; i >= 0; i--) {
                        var node = _1a3 ? this._cloneNode(ary[i]) : ary[i];
                        if (ary._runParse && dojo.parser && dojo.parser.parse) {
                            if (!_1a5) {
                                _1a5 = _1a4.ownerDocument.createElement("div");
                            }
                            _1a5.appendChild(node);
                            dojo.parser.parse(_1a5);
                            node = _1a5.firstChild;
                            while (_1a5.firstChild) {
                                _1a5.removeChild(_1a5.firstChild);
                            }
                        }
                        if (i == _1a6 - 1) {
                            dojo.place(node, _1a4, _1a2);
                        } else {
                            _1a4.parentNode.insertBefore(node, _1a4);
                        }
                        _1a4 = node;
                    }
                },
                _stash: function (_1a7) {
                    this._parent = _1a7;
                    return this;
                },
                end: function () {
                    if (this._parent) {
                        return this._parent;
                    } else {
                        return new this._NodeListCtor();
                    }
                },
                concat: function (item) {
                    var t = d.isArray(this) ? this : aps.call(this, 0),
                        m = d.map(arguments, function (a) {
                            return a && !d.isArray(a) && ((typeof NodeList != "undefined" && a.constructor === NodeList) || a.constructor === this._NodeListCtor) ? aps.call(a, 0) : a;
                        });
                    return this._wrap(apc.apply(t, m), this);
                },
                map: function (func, obj) {
                    return this._wrap(d.map(this, func, obj), this);
                },
                forEach: function (_1a8, _1a9) {
                    d.forEach(this, _1a8, _1a9);
                    return this;
                },
                coords: _198(d.coords),
                position: _198(d.position),
                place: function (_1aa, _1ab) {
                    var item = d.query(_1aa)[0];
                    return this.forEach(function (node) {
                        d.place(node, item, _1ab);
                    });
                },
                orphan: function (_1ac) {
                    return (_1ac ? d._filterQueryResult(this, _1ac) : this).forEach(_19c);
                },
                adopt: function (_1ad, _1ae) {
                    return d.query(_1ad).place(this[0], _1ae)._stash(this);
                },
                query: function (_1af) {
                    if (!_1af) {
                        return this;
                    }
                    var ret = this.map(function (node) {
                        return d.query(_1af, node).filter(function (_1b0) {
                            return _1b0 !== undefined;
                        });
                    });
                    return this._wrap(apc.apply([], ret), this);
                },
                filter: function (_1b1) {
                    var a = arguments,
                        _1b2 = this,
                        _1b3 = 0;
                    if (typeof _1b1 == "string") {
                        _1b2 = d._filterQueryResult(this, a[0]);
                        if (a.length == 1) {
                            return _1b2._stash(this);
                        }
                        _1b3 = 1;
                    }
                    return this._wrap(d.filter(_1b2, a[_1b3], a[_1b3 + 1]), this);
                },
                addContent: function (_1b4, _1b5) {
                    _1b4 = this._normalize(_1b4, this[0]);
                    for (var i = 0, node; (node = this[i]); i++) {
                        this._place(_1b4, node, _1b5, i > 0);
                    }
                    return this;
                },
                instantiate: function (_1b6, _1b7) {
                    var c = d.isFunction(_1b6) ? _1b6 : d.getObject(_1b6);
                    _1b7 = _1b7 || {};
                    return this.forEach(function (node) {
                        new c(_1b7, node);
                    });
                },
                at: function () {
                    var t = new this._NodeListCtor();
                    d.forEach(
                        arguments,
                        function (i) {
                            if (this[i]) {
                                t.push(this[i]);
                            }
                        },
                        this
                    );
                    return t._stash(this);
                },
            });
            nl.events = ["blur", "focus", "change", "click", "error", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "submit"];
            d.forEach(nl.events, function (evt) {
                var _1b8 = "on" + evt;
                nlp[_1b8] = function (a, b) {
                    return this.connect(_1b8, a, b);
                };
            });
        })();
    }
    if (!dojo._hasResource["dojo._base.query"]) {
        dojo._hasResource["dojo._base.query"] = true;
        if (typeof dojo != "undefined") {
            dojo.provide("dojo._base.query");
        }
        (function (d) {
            var trim = d.trim;
            var each = d.forEach;
            var qlc = (d._NodeListCtor = d.NodeList);
            var _1b9 = function () {
                return d.doc;
            };
            var _1ba = (d.isWebKit || d.isMozilla) && _1b9().compatMode == "BackCompat";
            var _1bb = ">~+";
            var _1bc = false;
            var _1bd = function () {
                return true;
            };
            var _1be = function (_1bf) {
                if (_1bb.indexOf(_1bf.slice(-1)) >= 0) {
                    _1bf += " * ";
                } else {
                    _1bf += " ";
                }
                var ts = function (s, e) {
                    return trim(_1bf.slice(s, e));
                };
                var _1c0 = [];
                var _1c1 = -1,
                    _1c2 = -1,
                    _1c3 = -1,
                    _1c4 = -1,
                    _1c5 = -1,
                    inId = -1,
                    _1c6 = -1,
                    lc = "",
                    cc = "",
                    _1c7;
                var x = 0,
                    ql = _1bf.length,
                    _1c8 = null,
                    _1c9 = null;
                var _1ca = function () {
                    if (_1c6 >= 0) {
                        var tv = _1c6 == x ? null : ts(_1c6, x);
                        _1c8[_1bb.indexOf(tv) < 0 ? "tag" : "oper"] = tv;
                        _1c6 = -1;
                    }
                };
                var _1cb = function () {
                    if (inId >= 0) {
                        _1c8.id = ts(inId, x).replace(/\\/g, "");
                        inId = -1;
                    }
                };
                var _1cc = function () {
                    if (_1c5 >= 0) {
                        _1c8.classes.push(ts(_1c5 + 1, x).replace(/\\/g, ""));
                        _1c5 = -1;
                    }
                };
                var _1cd = function () {
                    _1cb();
                    _1ca();
                    _1cc();
                };
                var _1ce = function () {
                    _1cd();
                    if (_1c4 >= 0) {
                        _1c8.pseudos.push({ name: ts(_1c4 + 1, x) });
                    }
                    _1c8.loops = _1c8.pseudos.length || _1c8.attrs.length || _1c8.classes.length;
                    _1c8.oquery = _1c8.query = ts(_1c7, x);
                    _1c8.otag = _1c8.tag = _1c8["oper"] ? null : _1c8.tag || "*";
                    if (_1c8.tag) {
                        _1c8.tag = _1c8.tag.toUpperCase();
                    }
                    if (_1c0.length && _1c0[_1c0.length - 1].oper) {
                        _1c8.infixOper = _1c0.pop();
                        _1c8.query = _1c8.infixOper.query + " " + _1c8.query;
                    }
                    _1c0.push(_1c8);
                    _1c8 = null;
                };
                for (; (lc = cc), (cc = _1bf.charAt(x)), x < ql; x++) {
                    if (lc == "\\") {
                        continue;
                    }
                    if (!_1c8) {
                        _1c7 = x;
                        _1c8 = {
                            query: null,
                            pseudos: [],
                            attrs: [],
                            classes: [],
                            tag: null,
                            oper: null,
                            id: null,
                            getTag: function () {
                                return _1bc ? this.otag : this.tag;
                            },
                        };
                        _1c6 = x;
                    }
                    if (_1c1 >= 0) {
                        if (cc == "]") {
                            if (!_1c9.attr) {
                                _1c9.attr = ts(_1c1 + 1, x);
                            } else {
                                _1c9.matchFor = ts(_1c3 || _1c1 + 1, x);
                            }
                            var cmf = _1c9.matchFor;
                            if (cmf) {
                                if (cmf.charAt(0) == '"' || cmf.charAt(0) == "'") {
                                    _1c9.matchFor = cmf.slice(1, -1);
                                }
                            }
                            _1c8.attrs.push(_1c9);
                            _1c9 = null;
                            _1c1 = _1c3 = -1;
                        } else {
                            if (cc == "=") {
                                var _1cf = "|~^$*".indexOf(lc) >= 0 ? lc : "";
                                _1c9.type = _1cf + cc;
                                _1c9.attr = ts(_1c1 + 1, x - _1cf.length);
                                _1c3 = x + 1;
                            }
                        }
                    } else {
                        if (_1c2 >= 0) {
                            if (cc == ")") {
                                if (_1c4 >= 0) {
                                    _1c9.value = ts(_1c2 + 1, x);
                                }
                                _1c4 = _1c2 = -1;
                            }
                        } else {
                            if (cc == "#") {
                                _1cd();
                                inId = x + 1;
                            } else {
                                if (cc == ".") {
                                    _1cd();
                                    _1c5 = x;
                                } else {
                                    if (cc == ":") {
                                        _1cd();
                                        _1c4 = x;
                                    } else {
                                        if (cc == "[") {
                                            _1cd();
                                            _1c1 = x;
                                            _1c9 = {};
                                        } else {
                                            if (cc == "(") {
                                                if (_1c4 >= 0) {
                                                    _1c9 = { name: ts(_1c4 + 1, x), value: null };
                                                    _1c8.pseudos.push(_1c9);
                                                }
                                                _1c2 = x;
                                            } else {
                                                if (cc == " " && lc != cc) {
                                                    _1ce();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return _1c0;
            };
            var _1d0 = function (_1d1, _1d2) {
                if (!_1d1) {
                    return _1d2;
                }
                if (!_1d2) {
                    return _1d1;
                }
                return function () {
                    return _1d1.apply(window, arguments) && _1d2.apply(window, arguments);
                };
            };
            var _1d3 = function (i, arr) {
                var r = arr || [];
                if (i) {
                    r.push(i);
                }
                return r;
            };
            var _1d4 = function (n) {
                return 1 == n.nodeType;
            };
            var _1d5 = "";
            var _1d6 = function (elem, attr) {
                if (!elem) {
                    return _1d5;
                }
                if (attr == "class") {
                    return elem.className || _1d5;
                }
                if (attr == "for") {
                    return elem.htmlFor || _1d5;
                }
                if (attr == "style") {
                    return elem.style.cssText || _1d5;
                }
                return (_1bc ? elem.getAttribute(attr) : elem.getAttribute(attr, 2)) || _1d5;
            };
            var _1d7 = {
                "*=": function (attr, _1d8) {
                    return function (elem) {
                        return _1d6(elem, attr).indexOf(_1d8) >= 0;
                    };
                },
                "^=": function (attr, _1d9) {
                    return function (elem) {
                        return _1d6(elem, attr).indexOf(_1d9) == 0;
                    };
                },
                "$=": function (attr, _1da) {
                    var tval = " " + _1da;
                    return function (elem) {
                        var ea = " " + _1d6(elem, attr);
                        return ea.lastIndexOf(_1da) == ea.length - _1da.length;
                    };
                },
                "~=": function (attr, _1db) {
                    var tval = " " + _1db + " ";
                    return function (elem) {
                        var ea = " " + _1d6(elem, attr) + " ";
                        return ea.indexOf(tval) >= 0;
                    };
                },
                "|=": function (attr, _1dc) {
                    var _1dd = " " + _1dc + "-";
                    return function (elem) {
                        var ea = " " + _1d6(elem, attr);
                        return ea == _1dc || ea.indexOf(_1dd) == 0;
                    };
                },
                "=": function (attr, _1de) {
                    return function (elem) {
                        return _1d6(elem, attr) == _1de;
                    };
                },
            };
            var _1df = typeof _1b9().firstChild.nextElementSibling == "undefined";
            var _1e0 = !_1df ? "nextElementSibling" : "nextSibling";
            var _1e1 = !_1df ? "previousElementSibling" : "previousSibling";
            var _1e2 = _1df ? _1d4 : _1bd;
            var _1e3 = function (node) {
                while ((node = node[_1e1])) {
                    if (_1e2(node)) {
                        return false;
                    }
                }
                return true;
            };
            var _1e4 = function (node) {
                while ((node = node[_1e0])) {
                    if (_1e2(node)) {
                        return false;
                    }
                }
                return true;
            };
            var _1e5 = function (node) {
                var root = node.parentNode;
                var i = 0,
                    tret = root.children || root.childNodes,
                    ci = node["_i"] || -1,
                    cl = root["_l"] || -1;
                if (!tret) {
                    return -1;
                }
                var l = tret.length;
                if (cl == l && ci >= 0 && cl >= 0) {
                    return ci;
                }
                root["_l"] = l;
                ci = -1;
                for (var te = root["firstElementChild"] || root["firstChild"]; te; te = te[_1e0]) {
                    if (_1e2(te)) {
                        te["_i"] = ++i;
                        if (node === te) {
                            ci = i;
                        }
                    }
                }
                return ci;
            };
            var _1e6 = function (elem) {
                return !(_1e5(elem) % 2);
            };
            var _1e7 = function (elem) {
                return _1e5(elem) % 2;
            };
            var _1e8 = {
                checked: function (name, _1e9) {
                    return function (elem) {
                        return !!("checked" in elem ? elem.checked : elem.selected);
                    };
                },
                "first-child": function () {
                    return _1e3;
                },
                "last-child": function () {
                    return _1e4;
                },
                "only-child": function (name, _1ea) {
                    return function (node) {
                        if (!_1e3(node)) {
                            return false;
                        }
                        if (!_1e4(node)) {
                            return false;
                        }
                        return true;
                    };
                },
                empty: function (name, _1eb) {
                    return function (elem) {
                        var cn = elem.childNodes;
                        var cnl = elem.childNodes.length;
                        for (var x = cnl - 1; x >= 0; x--) {
                            var nt = cn[x].nodeType;
                            if (nt === 1 || nt == 3) {
                                return false;
                            }
                        }
                        return true;
                    };
                },
                contains: function (name, _1ec) {
                    var cz = _1ec.charAt(0);
                    if (cz == '"' || cz == "'") {
                        _1ec = _1ec.slice(1, -1);
                    }
                    return function (elem) {
                        return elem.innerHTML.indexOf(_1ec) >= 0;
                    };
                },
                not: function (name, _1ed) {
                    var p = _1be(_1ed)[0];
                    var _1ee = { el: 1 };
                    if (p.tag != "*") {
                        _1ee.tag = 1;
                    }
                    if (!p.classes.length) {
                        _1ee.classes = 1;
                    }
                    var ntf = _1ef(p, _1ee);
                    return function (elem) {
                        return !ntf(elem);
                    };
                },
                "nth-child": function (name, _1f0) {
                    var pi = parseInt;
                    if (_1f0 == "odd") {
                        return _1e7;
                    } else {
                        if (_1f0 == "even") {
                            return _1e6;
                        }
                    }
                    if (_1f0.indexOf("n") != -1) {
                        var _1f1 = _1f0.split("n", 2);
                        var pred = _1f1[0] ? (_1f1[0] == "-" ? -1 : pi(_1f1[0])) : 1;
                        var idx = _1f1[1] ? pi(_1f1[1]) : 0;
                        var lb = 0,
                            ub = -1;
                        if (pred > 0) {
                            if (idx < 0) {
                                idx = idx % pred && pred + (idx % pred);
                            } else {
                                if (idx > 0) {
                                    if (idx >= pred) {
                                        lb = idx - (idx % pred);
                                    }
                                    idx = idx % pred;
                                }
                            }
                        } else {
                            if (pred < 0) {
                                pred *= -1;
                                if (idx > 0) {
                                    ub = idx;
                                    idx = idx % pred;
                                }
                            }
                        }
                        if (pred > 0) {
                            return function (elem) {
                                var i = _1e5(elem);
                                return i >= lb && (ub < 0 || i <= ub) && i % pred == idx;
                            };
                        } else {
                            _1f0 = idx;
                        }
                    }
                    var _1f2 = pi(_1f0);
                    return function (elem) {
                        return _1e5(elem) == _1f2;
                    };
                },
            };
            var _1f3 =
                d.isIE < 9 || (dojo.isIE && dojo.isQuirks)
                    ? function (cond) {
                          var clc = cond.toLowerCase();
                          if (clc == "class") {
                              cond = "className";
                          }
                          return function (elem) {
                              return _1bc ? elem.getAttribute(cond) : elem[cond] || elem[clc];
                          };
                      }
                    : function (cond) {
                          return function (elem) {
                              return elem && elem.getAttribute && elem.hasAttribute(cond);
                          };
                      };
            var _1ef = function (_1f4, _1f5) {
                if (!_1f4) {
                    return _1bd;
                }
                _1f5 = _1f5 || {};
                var ff = null;
                if (!("el" in _1f5)) {
                    ff = _1d0(ff, _1d4);
                }
                if (!("tag" in _1f5)) {
                    if (_1f4.tag != "*") {
                        ff = _1d0(ff, function (elem) {
                            return elem && elem.tagName == _1f4.getTag();
                        });
                    }
                }
                if (!("classes" in _1f5)) {
                    each(_1f4.classes, function (_1f6, idx, arr) {
                        var re = new RegExp("(?:^|\\s)" + _1f6 + "(?:\\s|$)");
                        ff = _1d0(ff, function (elem) {
                            return re.test(elem.className);
                        });
                        ff.count = idx;
                    });
                }
                if (!("pseudos" in _1f5)) {
                    each(_1f4.pseudos, function (_1f7) {
                        var pn = _1f7.name;
                        if (_1e8[pn]) {
                            ff = _1d0(ff, _1e8[pn](pn, _1f7.value));
                        }
                    });
                }
                if (!("attrs" in _1f5)) {
                    each(_1f4.attrs, function (attr) {
                        var _1f8;
                        var a = attr.attr;
                        if (attr.type && _1d7[attr.type]) {
                            _1f8 = _1d7[attr.type](a, attr.matchFor);
                        } else {
                            if (a.length) {
                                _1f8 = _1f3(a);
                            }
                        }
                        if (_1f8) {
                            ff = _1d0(ff, _1f8);
                        }
                    });
                }
                if (!("id" in _1f5)) {
                    if (_1f4.id) {
                        ff = _1d0(ff, function (elem) {
                            return !!elem && elem.id == _1f4.id;
                        });
                    }
                }
                if (!ff) {
                    if (!("default" in _1f5)) {
                        ff = _1bd;
                    }
                }
                return ff;
            };
            var _1f9 = function (_1fa) {
                return function (node, ret, bag) {
                    while ((node = node[_1e0])) {
                        if (_1df && !_1d4(node)) {
                            continue;
                        }
                        if ((!bag || _1fb(node, bag)) && _1fa(node)) {
                            ret.push(node);
                        }
                        break;
                    }
                    return ret;
                };
            };
            var _1fc = function (_1fd) {
                return function (root, ret, bag) {
                    var te = root[_1e0];
                    while (te) {
                        if (_1e2(te)) {
                            if (bag && !_1fb(te, bag)) {
                                break;
                            }
                            if (_1fd(te)) {
                                ret.push(te);
                            }
                        }
                        te = te[_1e0];
                    }
                    return ret;
                };
            };
            var _1fe = function (_1ff) {
                _1ff = _1ff || _1bd;
                return function (root, ret, bag) {
                    var te,
                        x = 0,
                        tret = root.children || root.childNodes;
                    while ((te = tret[x++])) {
                        if (_1e2(te) && (!bag || _1fb(te, bag)) && _1ff(te, x)) {
                            ret.push(te);
                        }
                    }
                    return ret;
                };
            };
            var _200 = function (node, root) {
                var pn = node.parentNode;
                while (pn) {
                    if (pn == root) {
                        break;
                    }
                    pn = pn.parentNode;
                }
                return !!pn;
            };
            var _201 = {};
            var _202 = function (_203) {
                var _204 = _201[_203.query];
                if (_204) {
                    return _204;
                }
                var io = _203.infixOper;
                var oper = io ? io.oper : "";
                var _205 = _1ef(_203, { el: 1 });
                var qt = _203.tag;
                var _206 = "*" == qt;
                var ecs = _1b9()["getElementsByClassName"];
                if (!oper) {
                    if (_203.id) {
                        _205 = !_203.loops && _206 ? _1bd : _1ef(_203, { el: 1, id: 1 });
                        _204 = function (root, arr) {
                            var te = d.byId(_203.id, root.ownerDocument || root);
                            if (!te || !_205(te)) {
                                return;
                            }
                            if (9 == root.nodeType) {
                                return _1d3(te, arr);
                            } else {
                                if (_200(te, root)) {
                                    return _1d3(te, arr);
                                }
                            }
                        };
                    } else {
                        if (ecs && /\{\s*\[native code\]\s*\}/.test(String(ecs)) && _203.classes.length && !_1ba) {
                            _205 = _1ef(_203, { el: 1, classes: 1, id: 1 });
                            var _207 = _203.classes.join(" ");
                            _204 = function (root, arr, bag) {
                                var ret = _1d3(0, arr),
                                    te,
                                    x = 0;
                                var tret = root.getElementsByClassName(_207);
                                while ((te = tret[x++])) {
                                    if (_205(te, root) && _1fb(te, bag)) {
                                        ret.push(te);
                                    }
                                }
                                return ret;
                            };
                        } else {
                            if (!_206 && !_203.loops) {
                                _204 = function (root, arr, bag) {
                                    var ret = _1d3(0, arr),
                                        te,
                                        x = 0;
                                    var tret = root.getElementsByTagName(_203.getTag());
                                    while ((te = tret[x++])) {
                                        if (_1fb(te, bag)) {
                                            ret.push(te);
                                        }
                                    }
                                    return ret;
                                };
                            } else {
                                _205 = _1ef(_203, { el: 1, tag: 1, id: 1 });
                                _204 = function (root, arr, bag) {
                                    var ret = _1d3(0, arr),
                                        te,
                                        x = 0;
                                    var tret = root.getElementsByTagName(_203.getTag());
                                    while ((te = tret[x++])) {
                                        if (_205(te, root) && _1fb(te, bag)) {
                                            ret.push(te);
                                        }
                                    }
                                    return ret;
                                };
                            }
                        }
                    }
                } else {
                    var _208 = { el: 1 };
                    if (_206) {
                        _208.tag = 1;
                    }
                    _205 = _1ef(_203, _208);
                    if ("+" == oper) {
                        _204 = _1f9(_205);
                    } else {
                        if ("~" == oper) {
                            _204 = _1fc(_205);
                        } else {
                            if (">" == oper) {
                                _204 = _1fe(_205);
                            }
                        }
                    }
                }
                return (_201[_203.query] = _204);
            };
            var _209 = function (root, _20a) {
                var _20b = _1d3(root),
                    qp,
                    x,
                    te,
                    qpl = _20a.length,
                    bag,
                    ret;
                for (var i = 0; i < qpl; i++) {
                    ret = [];
                    qp = _20a[i];
                    x = _20b.length - 1;
                    if (x > 0) {
                        bag = {};
                        ret.nozip = true;
                    }
                    var gef = _202(qp);
                    for (var j = 0; (te = _20b[j]); j++) {
                        gef(te, ret, bag);
                    }
                    if (!ret.length) {
                        break;
                    }
                    _20b = ret;
                }
                return ret;
            };
            var _20c = {},
                _20d = {};
            var _20e = function (_20f) {
                var _210 = _1be(trim(_20f));
                if (_210.length == 1) {
                    var tef = _202(_210[0]);
                    return function (root) {
                        var r = tef(root, new qlc());
                        if (r) {
                            r.nozip = true;
                        }
                        return r;
                    };
                }
                return function (root) {
                    return _209(root, _210);
                };
            };
            var nua = navigator.userAgent;
            var wk = "WebKit/";
            var _211 = d.isWebKit && nua.indexOf(wk) > 0 && parseFloat(nua.split(wk)[1]) > 528;
            var _212 = d.isIE ? "commentStrip" : "nozip";
            var qsa = "querySelectorAll";
            var _213 = !!_1b9()[qsa] && (!d.isSafari || d.isSafari > 3.1 || _211);
            var _214 = /n\+\d|([^ ])?([>~+])([^ =])?/g;
            var _215 = function (_216, pre, ch, post) {
                return ch ? (pre ? pre + " " : "") + ch + (post ? " " + post : "") : _216;
            };
            var _217 = function (_218, _219) {
                _218 = _218.replace(_214, _215);
                if (_213) {
                    var _21a = _20d[_218];
                    if (_21a && !_219) {
                        return _21a;
                    }
                }
                var _21b = _20c[_218];
                if (_21b) {
                    return _21b;
                }
                var qcz = _218.charAt(0);
                var _21c = -1 == _218.indexOf(" ");
                if (_218.indexOf("#") >= 0 && _21c) {
                    _219 = true;
                }
                var _21d =
                    _213 && !_219 && _1bb.indexOf(qcz) == -1 && (!d.isIE || _218.indexOf(":") == -1) && !(_1ba && _218.indexOf(".") >= 0) && _218.indexOf(":contains") == -1 && _218.indexOf(":checked") == -1 && _218.indexOf("|=") == -1;
                if (_21d) {
                    var tq = _1bb.indexOf(_218.charAt(_218.length - 1)) >= 0 ? _218 + " *" : _218;
                    return (_20d[_218] = function (root) {
                        try {
                            if (!(9 == root.nodeType || _21c)) {
                                throw "";
                            }
                            var r = root[qsa](tq);
                            r[_212] = true;
                            return r;
                        } catch (e) {
                            return _217(_218, true)(root);
                        }
                    });
                } else {
                    var _21e = _218.split(/\s*,\s*/);
                    return (_20c[_218] =
                        _21e.length < 2
                            ? _20e(_218)
                            : function (root) {
                                  var _21f = 0,
                                      ret = [],
                                      tp;
                                  while ((tp = _21e[_21f++])) {
                                      ret = ret.concat(_20e(tp)(root));
                                  }
                                  return ret;
                              });
                }
            };
            var _220 = 0;
            var _221 = d.isIE
                ? function (node) {
                      if (_1bc) {
                          return node.getAttribute("_uid") || node.setAttribute("_uid", ++_220) || _220;
                      } else {
                          return node.uniqueID;
                      }
                  }
                : function (node) {
                      return node._uid || (node._uid = ++_220);
                  };
            var _1fb = function (node, bag) {
                if (!bag) {
                    return 1;
                }
                var id = _221(node);
                if (!bag[id]) {
                    return (bag[id] = 1);
                }
                return 0;
            };
            var _222 = "_zipIdx";
            var _223 = function (arr) {
                if (arr && arr.nozip) {
                    return qlc._wrap ? qlc._wrap(arr) : arr;
                }
                var ret = new qlc();
                if (!arr || !arr.length) {
                    return ret;
                }
                if (arr[0]) {
                    ret.push(arr[0]);
                }
                if (arr.length < 2) {
                    return ret;
                }
                _220++;
                if (d.isIE && _1bc) {
                    var _224 = _220 + "";
                    arr[0].setAttribute(_222, _224);
                    for (var x = 1, te; (te = arr[x]); x++) {
                        if (arr[x].getAttribute(_222) != _224) {
                            ret.push(te);
                        }
                        te.setAttribute(_222, _224);
                    }
                } else {
                    if (d.isIE && arr.commentStrip) {
                        try {
                            for (var x = 1, te; (te = arr[x]); x++) {
                                if (_1d4(te)) {
                                    ret.push(te);
                                }
                            }
                        } catch (e) {}
                    } else {
                        if (arr[0]) {
                            arr[0][_222] = _220;
                        }
                        for (var x = 1, te; (te = arr[x]); x++) {
                            if (arr[x][_222] != _220) {
                                ret.push(te);
                            }
                            te[_222] = _220;
                        }
                    }
                }
                return ret;
            };
            d.query = function (_225, root) {
                qlc = d._NodeListCtor;
                if (!_225) {
                    return new qlc();
                }
                if (_225.constructor == qlc) {
                    return _225;
                }
                if (typeof _225 != "string") {
                    return new qlc(_225);
                }
                if (typeof root == "string") {
                    root = d.byId(root);
                    if (!root) {
                        return new qlc();
                    }
                }
                root = root || _1b9();
                var od = root.ownerDocument || root.documentElement;
                _1bc = (root.contentType && root.contentType == "application/xml") || (d.isOpera && (root.doctype || od.toString() == "[object XMLDocument]")) || (!!od && (d.isIE ? od.xml : root.xmlVersion || od.xmlVersion));
                var r = _217(_225)(root);
                if (r && r.nozip && !qlc._wrap) {
                    return r;
                }
                return _223(r);
            };
            d.query.pseudos = _1e8;
            d._filterQueryResult = function (_226, _227) {
                var _228 = new d._NodeListCtor();
                var _229 = _1ef(_1be(_227)[0]);
                for (var x = 0, te; (te = _226[x]); x++) {
                    if (_229(te)) {
                        _228.push(te);
                    }
                }
                return _228;
            };
        })(this["queryPortability"] || this["acme"] || dojo);
    }
    if (!dojo._hasResource["dojo._base.xhr"]) {
        dojo._hasResource["dojo._base.xhr"] = true;
        dojo.provide("dojo._base.xhr");
        (function () {
            var _22a = dojo,
                cfg = _22a.config;
            function _22b(obj, name, _22c) {
                if (_22c === null) {
                    return;
                }
                var val = obj[name];
                if (typeof val == "string") {
                    obj[name] = [val, _22c];
                } else {
                    if (_22a.isArray(val)) {
                        val.push(_22c);
                    } else {
                        obj[name] = _22c;
                    }
                }
            }
            dojo.fieldToObject = function (_22d) {
                var ret = null;
                var item = _22a.byId(_22d);
                if (item) {
                    var _22e = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_22e && type && !item.disabled) {
                        if (type == "radio" || type == "checkbox") {
                            if (item.checked) {
                                ret = item.value;
                            }
                        } else {
                            if (item.multiple) {
                                ret = [];
                                _22a.query("option", item).forEach(function (opt) {
                                    if (opt.selected) {
                                        ret.push(opt.value);
                                    }
                                });
                            } else {
                                ret = item.value;
                            }
                        }
                    }
                }
                return ret;
            };
            dojo.formToObject = function (_22f) {
                var ret = {};
                var _230 = "file|submit|image|reset|button|";
                _22a.forEach(dojo.byId(_22f).elements, function (item) {
                    var _231 = item.name;
                    var type = (item.type || "").toLowerCase();
                    if (_231 && type && _230.indexOf(type) == -1 && !item.disabled) {
                        _22b(ret, _231, _22a.fieldToObject(item));
                        if (type == "image") {
                            ret[_231 + ".x"] = ret[_231 + ".y"] = ret[_231].x = ret[_231].y = 0;
                        }
                    }
                });
                return ret;
            };
            dojo.objectToQuery = function (map) {
                var enc = encodeURIComponent;
                var _232 = [];
                var _233 = {};
                for (var name in map) {
                    var _234 = map[name];
                    if (_234 != _233[name]) {
                        var _235 = enc(name) + "=";
                        if (_22a.isArray(_234)) {
                            for (var i = 0; i < _234.length; i++) {
                                _232.push(_235 + enc(_234[i]));
                            }
                        } else {
                            _232.push(_235 + enc(_234));
                        }
                    }
                }
                return _232.join("&");
            };
            dojo.formToQuery = function (_236) {
                return _22a.objectToQuery(_22a.formToObject(_236));
            };
            dojo.formToJson = function (_237, _238) {
                return _22a.toJson(_22a.formToObject(_237), _238);
            };
            dojo.queryToObject = function (str) {
                var ret = {};
                var qp = str.split("&");
                var dec = decodeURIComponent;
                _22a.forEach(qp, function (item) {
                    if (item.length) {
                        var _239 = item.split("=");
                        var name = dec(_239.shift());
                        var val = dec(_239.join("="));
                        if (typeof ret[name] == "string") {
                            ret[name] = [ret[name]];
                        }
                        if (_22a.isArray(ret[name])) {
                            ret[name].push(val);
                        } else {
                            ret[name] = val;
                        }
                    }
                });
                return ret;
            };
            dojo._blockAsync = false;
            var _23a = (_22a._contentHandlers = dojo.contentHandlers = {
                text: function (xhr) {
                    return xhr.responseText;
                },
                json: function (xhr) {
                    return _22a.fromJson(xhr.responseText || null);
                },
                "json-comment-filtered": function (xhr) {
                    if (!dojo.config.useCommentedJson) {
                        console.warn(
                            "Consider using the standard mimetype:application/json." +
                                " json-commenting can introduce security issues. To" +
                                " decrease the chances of hijacking, use the standard the 'json' handler and" +
                                " prefix your json with: {}&&\n" +
                                "Use djConfig.useCommentedJson=true to turn off this message."
                        );
                    }
                    var _23b = xhr.responseText;
                    var _23c = _23b.indexOf("/*");
                    var _23d = _23b.lastIndexOf("*/");
                    if (_23c == -1 || _23d == -1) {
                        throw new Error("JSON was not comment filtered");
                    }
                    return _22a.fromJson(_23b.substring(_23c + 2, _23d));
                },
                javascript: function (xhr) {
                    return _22a.eval(xhr.responseText);
                },
                xml: function (xhr) {
                    var _23e = xhr.responseXML;
                    if (_22a.isIE && (!_23e || !_23e.documentElement)) {
                        var ms = function (n) {
                            return "MSXML" + n + ".DOMDocument";
                        };
                        var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
                        _22a.some(dp, function (p) {
                            try {
                                var dom = new ActiveXObject(p);
                                dom.async = false;
                                dom.loadXML(xhr.responseText);
                                _23e = dom;
                            } catch (e) {
                                return false;
                            }
                            return true;
                        });
                    }
                    return _23e;
                },
                "json-comment-optional": function (xhr) {
                    if (xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)) {
                        return _23a["json-comment-filtered"](xhr);
                    } else {
                        return _23a["json"](xhr);
                    }
                },
            });
            dojo._ioSetArgs = function (args, _23f, _240, _241) {
                var _242 = { args: args, url: args.url };
                var _243 = null;
                if (args.form) {
                    var form = _22a.byId(args.form);
                    var _244 = form.getAttributeNode("action");
                    _242.url = _242.url || (_244 ? _244.value : null);
                    _243 = _22a.formToObject(form);
                }
                var _245 = [{}];
                if (_243) {
                    _245.push(_243);
                }
                if (args.content) {
                    _245.push(args.content);
                }
                if (args.preventCache) {
                    _245.push({ "dojo.preventCache": new Date().valueOf() });
                }
                _242.query = _22a.objectToQuery(_22a.mixin.apply(null, _245));
                _242.handleAs = args.handleAs || "text";
                var d = new _22a.Deferred(_23f);
                d.addCallbacks(_240, function (_246) {
                    return _241(_246, d);
                });
                var ld = args.load;
                if (ld && _22a.isFunction(ld)) {
                    d.addCallback(function (_247) {
                        return ld.call(args, _247, _242);
                    });
                }
                var err = args.error;
                if (err && _22a.isFunction(err)) {
                    d.addErrback(function (_248) {
                        return err.call(args, _248, _242);
                    });
                }
                var _249 = args.handle;
                if (_249 && _22a.isFunction(_249)) {
                    d.addBoth(function (_24a) {
                        return _249.call(args, _24a, _242);
                    });
                }
                if (cfg.ioPublish && _22a.publish && _242.args.ioPublish !== false) {
                    d.addCallbacks(
                        function (res) {
                            _22a.publish("/dojo/io/load", [d, res]);
                            return res;
                        },
                        function (res) {
                            _22a.publish("/dojo/io/error", [d, res]);
                            return res;
                        }
                    );
                    d.addBoth(function (res) {
                        _22a.publish("/dojo/io/done", [d, res]);
                        return res;
                    });
                }
                d.ioArgs = _242;
                return d;
            };
            var _24b = function (dfd) {
                dfd.canceled = true;
                var xhr = dfd.ioArgs.xhr;
                var _24c = typeof xhr.abort;
                if (_24c == "function" || _24c == "object" || _24c == "unknown") {
                    xhr.abort();
                }
                var err = dfd.ioArgs.error;
                if (!err) {
                    err = new Error("xhr cancelled");
                    err.dojoType = "cancel";
                }
                return err;
            };
            var _24d = function (dfd) {
                var ret = _23a[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
                return ret === undefined ? null : ret;
            };
            var _24e = function (_24f, dfd) {
                if (!dfd.ioArgs.args.failOk) {
                    console.error(_24f);
                }
                return _24f;
            };
            var _250 = null;
            var _251 = [];
            var _252 = 0;
            var _253 = function (dfd) {
                if (_252 <= 0) {
                    _252 = 0;
                    if (cfg.ioPublish && _22a.publish && (!dfd || (dfd && dfd.ioArgs.args.ioPublish !== false))) {
                        _22a.publish("/dojo/io/stop");
                    }
                }
            };
            var _254 = function () {
                var now = new Date().getTime();
                if (!_22a._blockAsync) {
                    for (var i = 0, tif; i < _251.length && (tif = _251[i]); i++) {
                        var dfd = tif.dfd;
                        var func = function () {
                            if (!dfd || dfd.canceled || !tif.validCheck(dfd)) {
                                _251.splice(i--, 1);
                                _252 -= 1;
                            } else {
                                if (tif.ioCheck(dfd)) {
                                    _251.splice(i--, 1);
                                    tif.resHandle(dfd);
                                    _252 -= 1;
                                } else {
                                    if (dfd.startTime) {
                                        if (dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now) {
                                            _251.splice(i--, 1);
                                            var err = new Error("timeout exceeded");
                                            err.dojoType = "timeout";
                                            dfd.errback(err);
                                            dfd.cancel();
                                            _252 -= 1;
                                        }
                                    }
                                }
                            }
                        };
                        if (dojo.config.debugAtAllCosts) {
                            func.call(this);
                        } else {
                            try {
                                func.call(this);
                            } catch (e) {
                                dfd.errback(e);
                            }
                        }
                    }
                }
                _253(dfd);
                if (!_251.length) {
                    clearInterval(_250);
                    _250 = null;
                    return;
                }
            };
            dojo._ioCancelAll = function () {
                try {
                    _22a.forEach(_251, function (i) {
                        try {
                            i.dfd.cancel();
                        } catch (e) {}
                    });
                } catch (e) {}
            };
            if (_22a.isIE) {
                _22a.addOnWindowUnload(_22a._ioCancelAll);
            }
            _22a._ioNotifyStart = function (dfd) {
                if (cfg.ioPublish && _22a.publish && dfd.ioArgs.args.ioPublish !== false) {
                    if (!_252) {
                        _22a.publish("/dojo/io/start");
                    }
                    _252 += 1;
                    _22a.publish("/dojo/io/send", [dfd]);
                }
            };
            _22a._ioWatch = function (dfd, _255, _256, _257) {
                var args = dfd.ioArgs.args;
                if (args.timeout) {
                    dfd.startTime = new Date().getTime();
                }
                _251.push({ dfd: dfd, validCheck: _255, ioCheck: _256, resHandle: _257 });
                if (!_250) {
                    _250 = setInterval(_254, 50);
                }
                if (args.sync) {
                    _254();
                }
            };
            var _258 = "application/x-www-form-urlencoded";
            var _259 = function (dfd) {
                return dfd.ioArgs.xhr.readyState;
            };
            var _25a = function (dfd) {
                return 4 == dfd.ioArgs.xhr.readyState;
            };
            var _25b = function (dfd) {
                var xhr = dfd.ioArgs.xhr;
                if (_22a._isDocumentOk(xhr)) {
                    dfd.callback(dfd);
                } else {
                    var err = new Error("Unable to load " + dfd.ioArgs.url + " status:" + xhr.status);
                    err.status = xhr.status;
                    err.responseText = xhr.responseText;
                    dfd.errback(err);
                }
            };
            dojo._ioAddQueryToUrl = function (_25c) {
                if (_25c.query.length) {
                    _25c.url += (_25c.url.indexOf("?") == -1 ? "?" : "&") + _25c.query;
                    _25c.query = null;
                }
            };
            dojo.xhr = function (_25d, args, _25e) {
                var dfd = _22a._ioSetArgs(args, _24b, _24d, _24e);
                var _25f = dfd.ioArgs;
                var xhr = (_25f.xhr = _22a._xhrObj(_25f.args));
                if (!xhr) {
                    dfd.cancel();
                    return dfd;
                }
                if ("postData" in args) {
                    _25f.query = args.postData;
                } else {
                    if ("putData" in args) {
                        _25f.query = args.putData;
                    } else {
                        if ("rawBody" in args) {
                            _25f.query = args.rawBody;
                        } else {
                            if ((arguments.length > 2 && !_25e) || "POST|PUT".indexOf(_25d.toUpperCase()) == -1) {
                                _22a._ioAddQueryToUrl(_25f);
                            }
                        }
                    }
                }
                xhr.open(_25d, _25f.url, args.sync !== true, args.user || undefined, args.password || undefined);
                if (args.headers) {
                    for (var hdr in args.headers) {
                        if (hdr.toLowerCase() === "content-type" && !args.contentType) {
                            args.contentType = args.headers[hdr];
                        } else {
                            if (args.headers[hdr]) {
                                xhr.setRequestHeader(hdr, args.headers[hdr]);
                            }
                        }
                    }
                }
                xhr.setRequestHeader("Content-Type", args.contentType || _258);
                if (!args.headers || !("X-Requested-With" in args.headers)) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                _22a._ioNotifyStart(dfd);
                if (dojo.config.debugAtAllCosts) {
                    xhr.send(_25f.query);
                } else {
                    try {
                        xhr.send(_25f.query);
                    } catch (e) {
                        _25f.error = e;
                        dfd.cancel();
                    }
                }
                _22a._ioWatch(dfd, _259, _25a, _25b);
                xhr = null;
                return dfd;
            };
            dojo.xhrGet = function (args) {
                return _22a.xhr("GET", args);
            };
            dojo.rawXhrPost = dojo.xhrPost = function (args) {
                return _22a.xhr("POST", args, true);
            };
            dojo.rawXhrPut = dojo.xhrPut = function (args) {
                return _22a.xhr("PUT", args, true);
            };
            dojo.xhrDelete = function (args) {
                return _22a.xhr("DELETE", args);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.fx"]) {
        dojo._hasResource["dojo._base.fx"] = true;
        dojo.provide("dojo._base.fx");
        (function () {
            var d = dojo;
            var _260 = d._mixin;
            dojo._Line = function (_261, end) {
                this.start = _261;
                this.end = end;
            };
            dojo._Line.prototype.getValue = function (n) {
                return (this.end - this.start) * n + this.start;
            };
            dojo.Animation = function (args) {
                _260(this, args);
                if (d.isArray(this.curve)) {
                    this.curve = new d._Line(this.curve[0], this.curve[1]);
                }
            };
            d._Animation = d.Animation;
            d.extend(dojo.Animation, {
                duration: 350,
                repeat: 0,
                rate: 20,
                _percent: 0,
                _startRepeatCount: 0,
                _getStep: function () {
                    var _262 = this._percent,
                        _263 = this.easing;
                    return _263 ? _263(_262) : _262;
                },
                _fire: function (evt, args) {
                    var a = args || [];
                    if (this[evt]) {
                        if (d.config.debugAtAllCosts) {
                            this[evt].apply(this, a);
                        } else {
                            try {
                                this[evt].apply(this, a);
                            } catch (e) {
                                console.error("exception in animation handler for:", evt);
                                console.error(e);
                            }
                        }
                    }
                    return this;
                },
                play: function (_264, _265) {
                    var _266 = this;
                    if (_266._delayTimer) {
                        _266._clearTimer();
                    }
                    if (_265) {
                        _266._stopTimer();
                        _266._active = _266._paused = false;
                        _266._percent = 0;
                    } else {
                        if (_266._active && !_266._paused) {
                            return _266;
                        }
                    }
                    _266._fire("beforeBegin", [_266.node]);
                    var de = _264 || _266.delay,
                        _267 = dojo.hitch(_266, "_play", _265);
                    if (de > 0) {
                        _266._delayTimer = setTimeout(_267, de);
                        return _266;
                    }
                    _267();
                    return _266;
                },
                _play: function (_268) {
                    var _269 = this;
                    if (_269._delayTimer) {
                        _269._clearTimer();
                    }
                    _269._startTime = new Date().valueOf();
                    if (_269._paused) {
                        _269._startTime -= _269.duration * _269._percent;
                    }
                    _269._endTime = _269._startTime + _269.duration;
                    _269._active = true;
                    _269._paused = false;
                    var _26a = _269.curve.getValue(_269._getStep());
                    if (!_269._percent) {
                        if (!_269._startRepeatCount) {
                            _269._startRepeatCount = _269.repeat;
                        }
                        _269._fire("onBegin", [_26a]);
                    }
                    _269._fire("onPlay", [_26a]);
                    _269._cycle();
                    return _269;
                },
                pause: function () {
                    var _26b = this;
                    if (_26b._delayTimer) {
                        _26b._clearTimer();
                    }
                    _26b._stopTimer();
                    if (!_26b._active) {
                        return _26b;
                    }
                    _26b._paused = true;
                    _26b._fire("onPause", [_26b.curve.getValue(_26b._getStep())]);
                    return _26b;
                },
                gotoPercent: function (_26c, _26d) {
                    var _26e = this;
                    _26e._stopTimer();
                    _26e._active = _26e._paused = true;
                    _26e._percent = _26c;
                    if (_26d) {
                        _26e.play();
                    }
                    return _26e;
                },
                stop: function (_26f) {
                    var _270 = this;
                    if (_270._delayTimer) {
                        _270._clearTimer();
                    }
                    if (!_270._timer) {
                        return _270;
                    }
                    _270._stopTimer();
                    if (_26f) {
                        _270._percent = 1;
                    }
                    _270._fire("onStop", [_270.curve.getValue(_270._getStep())]);
                    _270._active = _270._paused = false;
                    return _270;
                },
                status: function () {
                    if (this._active) {
                        return this._paused ? "paused" : "playing";
                    }
                    return "stopped";
                },
                _cycle: function () {
                    var _271 = this;
                    if (_271._active) {
                        var curr = new Date().valueOf();
                        var step = (curr - _271._startTime) / (_271._endTime - _271._startTime);
                        if (step >= 1) {
                            step = 1;
                        }
                        _271._percent = step;
                        if (_271.easing) {
                            step = _271.easing(step);
                        }
                        _271._fire("onAnimate", [_271.curve.getValue(step)]);
                        if (_271._percent < 1) {
                            _271._startTimer();
                        } else {
                            _271._active = false;
                            if (_271.repeat > 0) {
                                _271.repeat--;
                                _271.play(null, true);
                            } else {
                                if (_271.repeat == -1) {
                                    _271.play(null, true);
                                } else {
                                    if (_271._startRepeatCount) {
                                        _271.repeat = _271._startRepeatCount;
                                        _271._startRepeatCount = 0;
                                    }
                                }
                            }
                            _271._percent = 0;
                            _271._fire("onEnd", [_271.node]);
                            !_271.repeat && _271._stopTimer();
                        }
                    }
                    return _271;
                },
                _clearTimer: function () {
                    clearTimeout(this._delayTimer);
                    delete this._delayTimer;
                },
            });
            var ctr = 0,
                _272 = [],
                _273 = null,
                _274 = { run: function () {} };
            d.extend(d.Animation, {
                _startTimer: function () {
                    if (!this._timer) {
                        this._timer = d.connect(_274, "run", this, "_cycle");
                        ctr++;
                    }
                    if (!_273) {
                        _273 = setInterval(d.hitch(_274, "run"), this.rate);
                    }
                },
                _stopTimer: function () {
                    if (this._timer) {
                        d.disconnect(this._timer);
                        this._timer = null;
                        ctr--;
                    }
                    if (ctr <= 0) {
                        clearInterval(_273);
                        _273 = null;
                        ctr = 0;
                    }
                },
            });
            var _275 = d.isIE
                ? function (node) {
                      var ns = node.style;
                      if (!ns.width.length && d.style(node, "width") == "auto") {
                          ns.width = "auto";
                      }
                  }
                : function () {};
            dojo._fade = function (args) {
                args.node = d.byId(args.node);
                var _276 = _260({ properties: {} }, args),
                    _277 = (_276.properties.opacity = {});
                _277.start = !("start" in _276)
                    ? function () {
                          return +d.style(_276.node, "opacity") || 0;
                      }
                    : _276.start;
                _277.end = _276.end;
                var anim = d.animateProperty(_276);
                d.connect(anim, "beforeBegin", d.partial(_275, _276.node));
                return anim;
            };
            dojo.fadeIn = function (args) {
                return d._fade(_260({ end: 1 }, args));
            };
            dojo.fadeOut = function (args) {
                return d._fade(_260({ end: 0 }, args));
            };
            dojo._defaultEasing = function (n) {
                return 0.5 + Math.sin((n + 1.5) * Math.PI) / 2;
            };
            var _278 = function (_279) {
                this._properties = _279;
                for (var p in _279) {
                    var prop = _279[p];
                    if (prop.start instanceof d.Color) {
                        prop.tempColor = new d.Color();
                    }
                }
            };
            _278.prototype.getValue = function (r) {
                var ret = {};
                for (var p in this._properties) {
                    var prop = this._properties[p],
                        _27a = prop.start;
                    if (_27a instanceof d.Color) {
                        ret[p] = d.blendColors(_27a, prop.end, r, prop.tempColor).toCss();
                    } else {
                        if (!d.isArray(_27a)) {
                            ret[p] = (prop.end - _27a) * r + _27a + (p != "opacity" ? prop.units || "px" : 0);
                        }
                    }
                }
                return ret;
            };
            dojo.animateProperty = function (args) {
                var n = (args.node = d.byId(args.node));
                if (!args.easing) {
                    args.easing = d._defaultEasing;
                }
                var anim = new d.Animation(args);
                d.connect(anim, "beforeBegin", anim, function () {
                    var pm = {};
                    for (var p in this.properties) {
                        if (p == "width" || p == "height") {
                            this.node.display = "block";
                        }
                        var prop = this.properties[p];
                        if (d.isFunction(prop)) {
                            prop = prop(n);
                        }
                        prop = pm[p] = _260({}, d.isObject(prop) ? prop : { end: prop });
                        if (d.isFunction(prop.start)) {
                            prop.start = prop.start(n);
                        }
                        if (d.isFunction(prop.end)) {
                            prop.end = prop.end(n);
                        }
                        var _27b = p.toLowerCase().indexOf("color") >= 0;
                        function _27c(node, p) {
                            var v = { height: node.offsetHeight, width: node.offsetWidth }[p];
                            if (v !== undefined) {
                                return v;
                            }
                            v = d.style(node, p);
                            return p == "opacity" ? +v : _27b ? v : parseFloat(v);
                        }
                        if (!("end" in prop)) {
                            prop.end = _27c(n, p);
                        } else {
                            if (!("start" in prop)) {
                                prop.start = _27c(n, p);
                            }
                        }
                        if (_27b) {
                            prop.start = new d.Color(prop.start);
                            prop.end = new d.Color(prop.end);
                        } else {
                            prop.start = p == "opacity" ? +prop.start : parseFloat(prop.start);
                        }
                    }
                    this.curve = new _278(pm);
                });
                d.connect(anim, "onAnimate", d.hitch(d, "style", anim.node));
                return anim;
            };
            dojo.anim = function (node, _27d, _27e, _27f, _280, _281) {
                return d.animateProperty({ node: node, duration: _27e || d.Animation.prototype.duration, properties: _27d, easing: _27f, onEnd: _280 }).play(_281 || 0);
            };
        })();
    }
    if (!dojo._hasResource["dojo._base.browser"]) {
        dojo._hasResource["dojo._base.browser"] = true;
        dojo.provide("dojo._base.browser");
        dojo.forEach(dojo.config.require, function (i) {
            dojo["require"](i);
        });
    }
    if (dojo.config.afterOnLoad && dojo.isBrowser) {
        window.setTimeout(dojo._loadInit, 1000);
    }
})();
