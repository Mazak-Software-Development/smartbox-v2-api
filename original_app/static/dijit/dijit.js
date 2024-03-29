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

if (!dojo._hasResource["dijit._base.manager"]) {
    dojo._hasResource["dijit._base.manager"] = true;
    dojo.provide("dijit._base.manager");
    dojo.declare("dijit.WidgetSet", null, {
        constructor: function () {
            this._hash = {};
            this.length = 0;
        },
        add: function (_1) {
            if (this._hash[_1.id]) {
                throw new Error("Tried to register widget with id==" + _1.id + " but that id is already registered");
            }
            this._hash[_1.id] = _1;
            this.length++;
        },
        remove: function (id) {
            if (this._hash[id]) {
                delete this._hash[id];
                this.length--;
            }
        },
        forEach: function (_2, _3) {
            _3 = _3 || dojo.global;
            var i = 0,
                id;
            for (id in this._hash) {
                _2.call(_3, this._hash[id], i++, this._hash);
            }
            return this;
        },
        filter: function (_4, _5) {
            _5 = _5 || dojo.global;
            var _6 = new dijit.WidgetSet(),
                i = 0,
                id;
            for (id in this._hash) {
                var w = this._hash[id];
                if (_4.call(_5, w, i++, this._hash)) {
                    _6.add(w);
                }
            }
            return _6;
        },
        byId: function (id) {
            return this._hash[id];
        },
        byClass: function (_7) {
            var _8 = new dijit.WidgetSet(),
                id,
                _9;
            for (id in this._hash) {
                _9 = this._hash[id];
                if (_9.declaredClass == _7) {
                    _8.add(_9);
                }
            }
            return _8;
        },
        toArray: function () {
            var ar = [];
            for (var id in this._hash) {
                ar.push(this._hash[id]);
            }
            return ar;
        },
        map: function (_a, _b) {
            return dojo.map(this.toArray(), _a, _b);
        },
        every: function (_c, _d) {
            _d = _d || dojo.global;
            var x = 0,
                i;
            for (i in this._hash) {
                if (!_c.call(_d, this._hash[i], x++, this._hash)) {
                    return false;
                }
            }
            return true;
        },
        some: function (_e, _f) {
            _f = _f || dojo.global;
            var x = 0,
                i;
            for (i in this._hash) {
                if (_e.call(_f, this._hash[i], x++, this._hash)) {
                    return true;
                }
            }
            return false;
        },
    });
    dijit.registry = new dijit.WidgetSet();
    dijit._widgetTypeCtr = {};
    dijit.getUniqueId = function (_10) {
        var id;
        do {
            id = _10 + "_" + (_10 in dijit._widgetTypeCtr ? ++dijit._widgetTypeCtr[_10] : (dijit._widgetTypeCtr[_10] = 0));
        } while (dijit.byId(id));
        return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id;
    };
    dijit.findWidgets = function (_11) {
        var _12 = [];
        function _13(_14) {
            for (var _15 = _14.firstChild; _15; _15 = _15.nextSibling) {
                if (_15.nodeType == 1) {
                    var _16 = _15.getAttribute("widgetId");
                    if (_16) {
                        var _17 = dijit.byId(_16);
                        _12.push(_17);
                    } else {
                        _13(_15);
                    }
                }
            }
        }
        _13(_11);
        return _12;
    };
    dijit._destroyAll = function () {
        dijit._curFocus = null;
        dijit._prevFocus = null;
        dijit._activeStack = [];
        dojo.forEach(dijit.findWidgets(dojo.body()), function (_18) {
            if (!_18._destroyed) {
                if (_18.destroyRecursive) {
                    _18.destroyRecursive();
                } else {
                    if (_18.destroy) {
                        _18.destroy();
                    }
                }
            }
        });
    };
    if (dojo.isIE) {
        dojo.addOnWindowUnload(function () {
            dijit._destroyAll();
        });
    }
    dijit.byId = function (id) {
        return typeof id == "string" ? dijit.registry._hash[id] : id;
    };
    dijit.byNode = function (_19) {
        return dijit.registry.byId(_19.getAttribute("widgetId"));
    };
    dijit.getEnclosingWidget = function (_1a) {
        while (_1a) {
            var id = _1a.getAttribute && _1a.getAttribute("widgetId");
            if (id) {
                return dijit.byId(id);
            }
            _1a = _1a.parentNode;
        }
        return null;
    };
    dijit._isElementShown = function (_1b) {
        var _1c = dojo.style(_1b);
        return _1c.visibility != "hidden" && _1c.visibility != "collapsed" && _1c.display != "none" && dojo.attr(_1b, "type") != "hidden";
    };
    dijit.isTabNavigable = function (_1d) {
        if (dojo.attr(_1d, "disabled")) {
            return false;
        } else {
            if (dojo.hasAttr(_1d, "tabIndex")) {
                return dojo.attr(_1d, "tabIndex") >= 0;
            } else {
                switch (_1d.nodeName.toLowerCase()) {
                    case "a":
                        return dojo.hasAttr(_1d, "href");
                    case "area":
                    case "button":
                    case "input":
                    case "object":
                    case "select":
                    case "textarea":
                        return true;
                    case "iframe":
                        if (dojo.isMoz) {
                            return _1d.contentDocument.designMode == "on";
                        } else {
                            if (dojo.isWebKit) {
                                var doc = _1d.contentDocument,
                                    _1e = doc && doc.body;
                                return _1e && _1e.contentEditable == "true";
                            } else {
                                try {
                                    doc = _1d.contentWindow.document;
                                    _1e = doc && doc.body;
                                    return _1e && _1e.firstChild && _1e.firstChild.contentEditable == "true";
                                } catch (e) {
                                    return false;
                                }
                            }
                        }
                    default:
                        return _1d.contentEditable == "true";
                }
            }
        }
    };
    dijit._getTabNavigable = function (_1f) {
        var _20, _21, _22, _23, _24, _25;
        var _26 = function (_27) {
            dojo.query("> *", _27).forEach(function (_28) {
                var _29 = dijit._isElementShown(_28);
                if (_29 && dijit.isTabNavigable(_28)) {
                    var _2a = dojo.attr(_28, "tabIndex");
                    if (!dojo.hasAttr(_28, "tabIndex") || _2a == 0) {
                        if (!_20) {
                            _20 = _28;
                        }
                        _21 = _28;
                    } else {
                        if (_2a > 0) {
                            if (!_22 || _2a < _23) {
                                _23 = _2a;
                                _22 = _28;
                            }
                            if (!_24 || _2a >= _25) {
                                _25 = _2a;
                                _24 = _28;
                            }
                        }
                    }
                }
                if (_29 && _28.nodeName.toUpperCase() != "SELECT") {
                    _26(_28);
                }
            });
        };
        if (dijit._isElementShown(_1f)) {
            _26(_1f);
        }
        return { first: _20, last: _21, lowest: _22, highest: _24 };
    };
    dijit.getFirstInTabbingOrder = function (_2b) {
        var _2c = dijit._getTabNavigable(dojo.byId(_2b));
        return _2c.lowest ? _2c.lowest : _2c.first;
    };
    dijit.getLastInTabbingOrder = function (_2d) {
        var _2e = dijit._getTabNavigable(dojo.byId(_2d));
        return _2e.last ? _2e.last : _2e.highest;
    };
    dijit.defaultDuration = dojo.config["defaultDuration"] || 200;
}
if (!dojo._hasResource["dijit._base.focus"]) {
    dojo._hasResource["dijit._base.focus"] = true;
    dojo.provide("dijit._base.focus");
    dojo.mixin(dijit, {
        _curFocus: null,
        _prevFocus: null,
        isCollapsed: function () {
            return dijit.getBookmark().isCollapsed;
        },
        getBookmark: function () {
            var bm,
                rg,
                tg,
                sel = dojo.doc.selection,
                cf = dijit._curFocus;
            if (dojo.global.getSelection) {
                sel = dojo.global.getSelection();
                if (sel) {
                    if (sel.isCollapsed) {
                        tg = cf ? cf.tagName : "";
                        if (tg) {
                            tg = tg.toLowerCase();
                            if (tg == "textarea" || (tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))) {
                                sel = { start: cf.selectionStart, end: cf.selectionEnd, node: cf, pRange: true };
                                return { isCollapsed: sel.end <= sel.start, mark: sel };
                            }
                        }
                        bm = { isCollapsed: true };
                        if (sel.rangeCount) {
                            bm.mark = sel.getRangeAt(0).cloneRange();
                        }
                    } else {
                        rg = sel.getRangeAt(0);
                        bm = { isCollapsed: false, mark: rg.cloneRange() };
                    }
                }
            } else {
                if (sel) {
                    tg = cf ? cf.tagName : "";
                    tg = tg.toLowerCase();
                    if (cf && tg && (tg == "button" || tg == "textarea" || tg == "input")) {
                        if (sel.type && sel.type.toLowerCase() == "none") {
                            return { isCollapsed: true, mark: null };
                        } else {
                            rg = sel.createRange();
                            return { isCollapsed: rg.text && rg.text.length ? false : true, mark: { range: rg, pRange: true } };
                        }
                    }
                    bm = {};
                    try {
                        rg = sel.createRange();
                        bm.isCollapsed = !(sel.type == "Text" ? rg.htmlText.length : rg.length);
                    } catch (e) {
                        bm.isCollapsed = true;
                        return bm;
                    }
                    if (sel.type.toUpperCase() == "CONTROL") {
                        if (rg.length) {
                            bm.mark = [];
                            var i = 0,
                                len = rg.length;
                            while (i < len) {
                                bm.mark.push(rg.item(i++));
                            }
                        } else {
                            bm.isCollapsed = true;
                            bm.mark = null;
                        }
                    } else {
                        bm.mark = rg.getBookmark();
                    }
                } else {
                    console.warn("No idea how to store the current selection for this browser!");
                }
            }
            return bm;
        },
        moveToBookmark: function (_2f) {
            var _30 = dojo.doc,
                _31 = _2f.mark;
            if (_31) {
                if (dojo.global.getSelection) {
                    var sel = dojo.global.getSelection();
                    if (sel && sel.removeAllRanges) {
                        if (_31.pRange) {
                            var r = _31;
                            var n = r.node;
                            n.selectionStart = r.start;
                            n.selectionEnd = r.end;
                        } else {
                            sel.removeAllRanges();
                            sel.addRange(_31);
                        }
                    } else {
                        console.warn("No idea how to restore selection for this browser!");
                    }
                } else {
                    if (_30.selection && _31) {
                        var rg;
                        if (_31.pRange) {
                            rg = _31.range;
                        } else {
                            if (dojo.isArray(_31)) {
                                rg = _30.body.createControlRange();
                                dojo.forEach(_31, function (n) {
                                    rg.addElement(n);
                                });
                            } else {
                                rg = _30.body.createTextRange();
                                rg.moveToBookmark(_31);
                            }
                        }
                        rg.select();
                    }
                }
            }
        },
        getFocus: function (_32, _33) {
            var _34 = !dijit._curFocus || (_32 && dojo.isDescendant(dijit._curFocus, _32.domNode)) ? dijit._prevFocus : dijit._curFocus;
            return { node: _34, bookmark: _34 == dijit._curFocus && dojo.withGlobal(_33 || dojo.global, dijit.getBookmark), openedForWindow: _33 };
        },
        focus: function (_35) {
            if (!_35) {
                return;
            }
            var _36 = "node" in _35 ? _35.node : _35,
                _37 = _35.bookmark,
                _38 = _35.openedForWindow,
                _39 = _37 ? _37.isCollapsed : false;
            if (_36) {
                var _3a = _36.tagName.toLowerCase() == "iframe" ? _36.contentWindow : _36;
                if (_3a && _3a.focus) {
                    try {
                        _3a.focus();
                    } catch (e) {}
                }
                dijit._onFocusNode(_36);
            }
            if (_37 && dojo.withGlobal(_38 || dojo.global, dijit.isCollapsed) && !_39) {
                if (_38) {
                    _38.focus();
                }
                try {
                    dojo.withGlobal(_38 || dojo.global, dijit.moveToBookmark, null, [_37]);
                } catch (e2) {}
            }
        },
        _activeStack: [],
        registerIframe: function (_3b) {
            return dijit.registerWin(_3b.contentWindow, _3b);
        },
        unregisterIframe: function (_3c) {
            dijit.unregisterWin(_3c);
        },
        registerWin: function (_3d, _3e) {
            var _3f = function (evt) {
                dijit._justMouseDowned = true;
                setTimeout(function () {
                    dijit._justMouseDowned = false;
                }, 0);
                dijit._onTouchNode(_3e || evt.target || evt.srcElement, "mouse");
            };
            var doc = dojo.isIE && dojo.isIE < 11 ? _3d.document.documentElement : _3d.document;
            if (doc) {
                if (dojo.isIE && dojo.isIE < 11) {
                    doc.attachEvent("onmousedown", _3f);
                    var _40 = function (evt) {
                        if (evt.srcElement.tagName.toLowerCase() != "#document" && dijit.isTabNavigable(evt.srcElement)) {
                            dijit._onFocusNode(_3e || evt.srcElement);
                        } else {
                            dijit._onTouchNode(_3e || evt.srcElement);
                        }
                    };
                    doc.attachEvent("onactivate", _40);
                    var _41 = function (evt) {
                        dijit._onBlurNode(_3e || evt.srcElement);
                    };
                    doc.attachEvent("ondeactivate", _41);
                    return function () {
                        doc.detachEvent("onmousedown", _3f);
                        doc.detachEvent("onactivate", _40);
                        doc.detachEvent("ondeactivate", _41);
                        doc = null;
                    };
                } else {
                    doc.addEventListener("mousedown", _3f, true);
                    var _42 = function (evt) {
                        dijit._onFocusNode(_3e || evt.target);
                    };
                    doc.addEventListener("focus", _42, true);
                    var _43 = function (evt) {
                        dijit._onBlurNode(_3e || evt.target);
                    };
                    doc.addEventListener("blur", _43, true);
                    return function () {
                        doc.removeEventListener("mousedown", _3f, true);
                        doc.removeEventListener("focus", _42, true);
                        doc.removeEventListener("blur", _43, true);
                        doc = null;
                    };
                }
            }
        },
        unregisterWin: function (_44) {
            _44 && _44();
        },
        _onBlurNode: function (_45) {
            dijit._prevFocus = dijit._curFocus;
            dijit._curFocus = null;
            if (dijit._justMouseDowned) {
                return;
            }
            if (dijit._clearActiveWidgetsTimer) {
                clearTimeout(dijit._clearActiveWidgetsTimer);
            }
            dijit._clearActiveWidgetsTimer = setTimeout(function () {
                delete dijit._clearActiveWidgetsTimer;
                dijit._setStack([]);
                dijit._prevFocus = null;
            }, 100);
        },
        _onTouchNode: function (_46, by) {
            if (dijit._clearActiveWidgetsTimer) {
                clearTimeout(dijit._clearActiveWidgetsTimer);
                delete dijit._clearActiveWidgetsTimer;
            }
            var _47 = [];
            try {
                while (_46) {
                    var _48 = dojo.attr(_46, "dijitPopupParent");
                    if (_48) {
                        _46 = dijit.byId(_48).domNode;
                    } else {
                        if (_46.tagName && _46.tagName.toLowerCase() == "body") {
                            if (_46 === dojo.body()) {
                                break;
                            }
                            _46 = dijit.getDocumentWindow(_46.ownerDocument).frameElement;
                        } else {
                            var id = _46.getAttribute && _46.getAttribute("widgetId");
                            if (id) {
                                _47.unshift(id);
                            }
                            _46 = _46.parentNode;
                        }
                    }
                }
            } catch (e) {}
            dijit._setStack(_47, by);
        },
        _onFocusNode: function (_49) {
            if (!_49) {
                return;
            }
            if (_49.nodeType == 9) {
                return;
            }
            dijit._onTouchNode(_49);
            if (_49 == dijit._curFocus) {
                return;
            }
            if (dijit._curFocus) {
                dijit._prevFocus = dijit._curFocus;
            }
            dijit._curFocus = _49;
            dojo.publish("focusNode", [_49]);
        },
        _setStack: function (_4a, by) {
            var _4b = dijit._activeStack;
            dijit._activeStack = _4a;
            for (var _4c = 0; _4c < Math.min(_4b.length, _4a.length); _4c++) {
                if (_4b[_4c] != _4a[_4c]) {
                    break;
                }
            }
            var _4d;
            for (var i = _4b.length - 1; i >= _4c; i--) {
                _4d = dijit.byId(_4b[i]);
                if (_4d) {
                    _4d._focused = false;
                    _4d._hasBeenBlurred = true;
                    if (_4d._onBlur) {
                        _4d._onBlur(by);
                    }
                    if (_4d._setStateClass) {
                        _4d._setStateClass();
                    }
                    dojo.publish("widgetBlur", [_4d, by]);
                }
            }
            for (i = _4c; i < _4a.length; i++) {
                _4d = dijit.byId(_4a[i]);
                if (_4d) {
                    _4d._focused = true;
                    if (_4d._onFocus) {
                        _4d._onFocus(by);
                    }
                    if (_4d._setStateClass) {
                        _4d._setStateClass();
                    }
                    dojo.publish("widgetFocus", [_4d, by]);
                }
            }
        },
    });
    dojo.addOnLoad(function () {
        var _4e = dijit.registerWin(window);
        if (dojo.isIE && dojo.isIE < 11) {
            dojo.addOnWindowUnload(function () {
                dijit.unregisterWin(_4e);
                _4e = null;
            });
        }
    });
}
if (!dojo._hasResource["dojo.AdapterRegistry"]) {
    dojo._hasResource["dojo.AdapterRegistry"] = true;
    dojo.provide("dojo.AdapterRegistry");
    dojo.AdapterRegistry = function (_4f) {
        this.pairs = [];
        this.returnWrappers = _4f || false;
    };
    dojo.extend(dojo.AdapterRegistry, {
        register: function (_50, _51, _52, _53, _54) {
            this.pairs[_54 ? "unshift" : "push"]([_50, _51, _52, _53]);
        },
        match: function () {
            for (var i = 0; i < this.pairs.length; i++) {
                var _55 = this.pairs[i];
                if (_55[1].apply(this, arguments)) {
                    if (_55[3] || this.returnWrappers) {
                        return _55[2];
                    } else {
                        return _55[2].apply(this, arguments);
                    }
                }
            }
            throw new Error("No match found");
        },
        unregister: function (_56) {
            for (var i = 0; i < this.pairs.length; i++) {
                var _57 = this.pairs[i];
                if (_57[0] == _56) {
                    this.pairs.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
    });
}
if (!dojo._hasResource["dijit._base.place"]) {
    dojo._hasResource["dijit._base.place"] = true;
    dojo.provide("dijit._base.place");
    dijit.getViewport = function () {
        var _58 = dojo.doc.compatMode == "BackCompat" ? dojo.body() : dojo.doc.documentElement;
        var _59 = dojo._docScroll();
        return { w: _58.clientWidth, h: _58.clientHeight, l: _59.x, t: _59.y };
    };
    dijit.placeOnScreen = function (_5a, pos, _5b, _5c) {
        var _5d = dojo.map(_5b, function (_5e) {
            var c = { corner: _5e, pos: { x: pos.x, y: pos.y } };
            if (_5c) {
                c.pos.x += _5e.charAt(1) == "L" ? _5c.x : -_5c.x;
                c.pos.y += _5e.charAt(0) == "T" ? _5c.y : -_5c.y;
            }
            return c;
        });
        return dijit._place(_5a, _5d);
    };
    dijit._place = function (_5f, _60, _61) {
        var _62 = dijit.getViewport();
        if (!_5f.parentNode || String(_5f.parentNode.tagName).toLowerCase() != "body") {
            dojo.body().appendChild(_5f);
        }
        var _63 = null;
        dojo.some(_60, function (_64) {
            var _65 = _64.corner;
            var pos = _64.pos;
            if (_61) {
                _61(_5f, _64.aroundCorner, _65);
            }
            var _66 = _5f.style;
            var _67 = _66.display;
            var _68 = _66.visibility;
            _66.visibility = "hidden";
            _66.display = "";
            var mb = dojo.marginBox(_5f);
            _66.display = _67;
            _66.visibility = _68;
            var _69 = Math.max(_62.l, _65.charAt(1) == "L" ? pos.x : pos.x - mb.w),
                _6a = Math.max(_62.t, _65.charAt(0) == "T" ? pos.y : pos.y - mb.h),
                _6b = Math.min(_62.l + _62.w, _65.charAt(1) == "L" ? _69 + mb.w : pos.x),
                _6c = Math.min(_62.t + _62.h, _65.charAt(0) == "T" ? _6a + mb.h : pos.y),
                _6d = _6b - _69,
                _6e = _6c - _6a,
                _6f = mb.w - _6d + (mb.h - _6e);
            if (_63 == null || _6f < _63.overflow) {
                _63 = { corner: _65, aroundCorner: _64.aroundCorner, x: _69, y: _6a, w: _6d, h: _6e, overflow: _6f };
            }
            return !_6f;
        });
        _5f.style.left = _63.x + "px";
        _5f.style.top = _63.y + "px";
        if (_63.overflow && _61) {
            _61(_5f, _63.aroundCorner, _63.corner);
        }
        return _63;
    };
    dijit.placeOnScreenAroundNode = function (_70, _71, _72, _73) {
        _71 = dojo.byId(_71);
        var _74 = _71.style.display;
        _71.style.display = "";
        var _75 = dojo.position(_71, true);
        _71.style.display = _74;
        return dijit._placeOnScreenAroundRect(_70, _75.x, _75.y, _75.w, _75.h, _72, _73);
    };
    dijit.placeOnScreenAroundRectangle = function (_76, _77, _78, _79) {
        return dijit._placeOnScreenAroundRect(_76, _77.x, _77.y, _77.width, _77.height, _78, _79);
    };
    dijit._placeOnScreenAroundRect = function (_7a, x, y, _7b, _7c, _7d, _7e) {
        var _7f = [];
        for (var _80 in _7d) {
            _7f.push({ aroundCorner: _80, corner: _7d[_80], pos: { x: x + (_80.charAt(1) == "L" ? 0 : _7b), y: y + (_80.charAt(0) == "T" ? 0 : _7c) } });
        }
        return dijit._place(_7a, _7f, _7e);
    };
    dijit.placementRegistry = new dojo.AdapterRegistry();
    dijit.placementRegistry.register(
        "node",
        function (n, x) {
            return typeof x == "object" && typeof x.offsetWidth != "undefined" && typeof x.offsetHeight != "undefined";
        },
        dijit.placeOnScreenAroundNode
    );
    dijit.placementRegistry.register(
        "rect",
        function (n, x) {
            return typeof x == "object" && "x" in x && "y" in x && "width" in x && "height" in x;
        },
        dijit.placeOnScreenAroundRectangle
    );
    dijit.placeOnScreenAroundElement = function (_81, _82, _83, _84) {
        return dijit.placementRegistry.match.apply(dijit.placementRegistry, arguments);
    };
    dijit.getPopupAlignment = function (_85, _86) {
        var _87 = {};
        dojo.forEach(_85, function (pos) {
            switch (pos) {
                case "after":
                    _87[_86 ? "BR" : "BL"] = _86 ? "BL" : "BR";
                    break;
                case "before":
                    _87[_86 ? "BL" : "BR"] = _86 ? "BR" : "BL";
                    break;
                case "below":
                    _87[_86 ? "BL" : "BR"] = _86 ? "TL" : "TR";
                    _87[_86 ? "BR" : "BL"] = _86 ? "TR" : "TL";
                    break;
                case "above":
                default:
                    _87[_86 ? "TL" : "TR"] = _86 ? "BL" : "BR";
                    _87[_86 ? "TR" : "TL"] = _86 ? "BR" : "BL";
                    break;
            }
        });
        return _87;
    };
    dijit.getPopupAroundAlignment = function (_88, _89) {
        var _8a = {};
        dojo.forEach(_88, function (pos) {
            switch (pos) {
                case "after":
                    _8a[_89 ? "BR" : "BL"] = _89 ? "BL" : "BR";
                    break;
                case "before":
                    _8a[_89 ? "BL" : "BR"] = _89 ? "BR" : "BL";
                    break;
                case "below":
                    _8a[_89 ? "BL" : "BR"] = _89 ? "TL" : "TR";
                    _8a[_89 ? "BR" : "BL"] = _89 ? "TR" : "TL";
                    break;
                case "above":
                default:
                    _8a[_89 ? "TL" : "TR"] = _89 ? "BL" : "BR";
                    _8a[_89 ? "TR" : "TL"] = _89 ? "BR" : "BL";
                    break;
            }
        });
        return _8a;
    };
}
if (!dojo._hasResource["dijit._base.window"]) {
    dojo._hasResource["dijit._base.window"] = true;
    dojo.provide("dijit._base.window");
    dijit.getDocumentWindow = function (doc) {
        if (dojo.isIE && window !== document.parentWindow && !doc._parentWindow) {
            doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
            var win = doc._parentWindow;
            doc._parentWindow = null;
            return win;
        }
        return doc._parentWindow || doc.parentWindow || doc.defaultView;
    };
}
if (!dojo._hasResource["dijit._base.popup"]) {
    dojo._hasResource["dijit._base.popup"] = true;
    dojo.provide("dijit._base.popup");
    dijit.popup = new (function () {
        var _8b = [],
            _8c = 1000,
            _8d = 1;
        this.moveOffScreen = function (_8e) {
            var s = _8e.style;
            s.visibility = "hidden";
            s.position = "absolute";
            s.top = "-9999px";
            if (s.display == "none") {
                s.display = "";
            }
            dojo.body().appendChild(_8e);
        };
        var _8f = function () {
            for (var pi = _8b.length - 1; pi > 0 && _8b[pi].parent === _8b[pi - 1].widget; pi--) {}
            return _8b[pi];
        };
        var _90 = [];
        this.open = function (_91) {
            var _92 = _91.popup,
                _93 = _91.orient || (dojo._isBodyLtr() ? { BL: "TL", BR: "TR", TL: "BL", TR: "BR" } : { BR: "TR", BL: "TL", TR: "BR", TL: "BL" }),
                _94 = _91.around,
                id = _91.around && _91.around.id ? _91.around.id + "_dropdown" : "popup_" + _8d++;
            var _95 = _90.pop(),
                _96,
                _97;
            if (!_95) {
                _96 = dojo.create("div", { class: "dijitPopup" }, dojo.body());
                dijit.setWaiRole(_96, "presentation");
            } else {
                _96 = _95[0];
                _97 = _95[1];
            }
            dojo.attr(_96, { id: id, style: { zIndex: _8c + _8b.length, visibility: "hidden", top: "-9999px" }, dijitPopupParent: _91.parent ? _91.parent.id : "" });
            var s = _92.domNode.style;
            s.display = "";
            s.visibility = "";
            s.position = "";
            s.top = "0px";
            _96.appendChild(_92.domNode);
            if (!_97) {
                _97 = new dijit.BackgroundIframe(_96);
            } else {
                _97.resize(_96);
            }
            var _98 = _94 ? dijit.placeOnScreenAroundElement(_96, _94, _93, _92.orient ? dojo.hitch(_92, "orient") : null) : dijit.placeOnScreen(_96, _91, _93 == "R" ? ["TR", "BR", "TL", "BL"] : ["TL", "BL", "TR", "BR"], _91.padding);
            _96.style.visibility = "visible";
            var _99 = [];
            _99.push(
                dojo.connect(_96, "onkeypress", this, function (evt) {
                    if (evt.charOrCode == dojo.keys.ESCAPE && _91.onCancel) {
                        dojo.stopEvent(evt);
                        _91.onCancel();
                    } else {
                        if (evt.charOrCode === dojo.keys.TAB) {
                            dojo.stopEvent(evt);
                            var _9a = _8f();
                            if (_9a && _9a.onCancel) {
                                _9a.onCancel();
                            }
                        }
                    }
                })
            );
            if (_92.onCancel) {
                _99.push(dojo.connect(_92, "onCancel", _91.onCancel));
            }
            _99.push(
                dojo.connect(_92, _92.onExecute ? "onExecute" : "onChange", function () {
                    var _9b = _8f();
                    if (_9b && _9b.onExecute) {
                        _9b.onExecute();
                    }
                })
            );
            _8b.push({ wrapper: _96, iframe: _97, widget: _92, parent: _91.parent, onExecute: _91.onExecute, onCancel: _91.onCancel, onClose: _91.onClose, handlers: _99 });
            if (_92.onOpen) {
                _92.onOpen(_98);
            }
            return _98;
        };
        this.close = function (_9c) {
            while (
                dojo.some(_8b, function (_9d) {
                    return _9d.widget == _9c;
                })
            ) {
                var top = _8b.pop(),
                    _9e = top.wrapper,
                    _9f = top.iframe,
                    _a0 = top.widget,
                    _a1 = top.onClose;
                if (_a0.onClose) {
                    _a0.onClose();
                }
                dojo.forEach(top.handlers, dojo.disconnect);
                if (_a0 && _a0.domNode) {
                    this.moveOffScreen(_a0.domNode);
                }
                _9e.style.top = "-9999px";
                _9e.style.visibility = "hidden";
                _90.push([_9e, _9f]);
                if (_a1) {
                    _a1();
                }
            }
        };
    })();
    dijit._frames = new (function () {
        var _a2 = [];
        this.pop = function () {
            var _a3;
            if (_a2.length) {
                _a3 = _a2.pop();
                _a3.style.display = "";
            } else {
                if (dojo.isIE < 9) {
                    var _a4 = dojo.config["dojoBlankHtmlUrl"] || dojo.moduleUrl("dojo", "resources/blank.html") + "" || 'javascript:""';
                    var _a5 = "<iframe src='" + _a4 + "'" + " style='position: absolute; left: 0px; top: 0px;" + 'z-index: -1; filter:Alpha(Opacity="0");\'>';
                    _a3 = dojo.doc.createElement(_a5);
                } else {
                    _a3 = dojo.create("iframe");
                    _a3.src = 'javascript:""';
                    _a3.className = "dijitBackgroundIframe";
                    dojo.style(_a3, "opacity", 0.1);
                }
                _a3.tabIndex = -1;
            }
            return _a3;
        };
        this.push = function (_a6) {
            _a6.style.display = "none";
            _a2.push(_a6);
        };
    })();
    dijit.BackgroundIframe = function (_a7) {
        if (!_a7.id) {
            throw new Error("no id");
        }
        if (dojo.isIE || dojo.isMoz) {
            var _a8 = dijit._frames.pop();
            _a7.appendChild(_a8);
            if (dojo.isIE < 7) {
                this.resize(_a7);
                this._conn = dojo.connect(_a7, "onresize", this, function () {
                    this.resize(_a7);
                });
            } else {
                dojo.style(_a8, { width: "100%", height: "100%" });
            }
            this.iframe = _a8;
        }
    };
    dojo.extend(dijit.BackgroundIframe, {
        resize: function (_a9) {
            if (this.iframe && dojo.isIE < 7) {
                dojo.style(this.iframe, { width: _a9.offsetWidth + "px", height: _a9.offsetHeight + "px" });
            }
        },
        destroy: function () {
            if (this._conn) {
                dojo.disconnect(this._conn);
                this._conn = null;
            }
            if (this.iframe) {
                dijit._frames.push(this.iframe);
                delete this.iframe;
            }
        },
    });
}
if (!dojo._hasResource["dijit._base.scroll"]) {
    dojo._hasResource["dijit._base.scroll"] = true;
    dojo.provide("dijit._base.scroll");
    dijit.scrollIntoView = function (_aa, pos) {
        try {
            _aa = dojo.byId(_aa);
            var doc = _aa.ownerDocument || dojo.doc,
                _ab = doc.body || dojo.body(),
                _ac = doc.documentElement || _ab.parentNode,
                _ad = dojo.isIE,
                _ae = dojo.isWebKit;
            if ((!(dojo.isMoz || _ad || _ae || dojo.isOpera) || _aa == _ab || _aa == _ac) && typeof _aa.scrollIntoView != "undefined") {
                _aa.scrollIntoView(false);
                return;
            }
            var _af = doc.compatMode == "BackCompat",
                _b0 =
                    _ad >= 9 && _aa.ownerDocument.parentWindow.frameElement
                        ? _ac.clientHeight > 0 && _ac.clientWidth > 0 && (_ab.clientHeight == 0 || _ab.clientWidth == 0 || _ab.clientHeight > _ac.clientHeight || _ab.clientWidth > _ac.clientWidth)
                            ? _ac
                            : _ab
                        : _af
                        ? _ab
                        : _ac,
                _b1 = _ae ? _ab : _b0,
                _b2 = _b0.clientWidth,
                _b3 = _b0.clientHeight,
                rtl = !dojo._isBodyLtr(),
                _b4 = pos || dojo.position(_aa),
                el = _aa.parentNode,
                _b5 = function (el) {
                    return _ad <= 6 || (_ad && _af) ? false : dojo.style(el, "position").toLowerCase() == "fixed";
                };
            if (_b5(_aa)) {
                return;
            }
            while (el) {
                if (el == _ab) {
                    el = _b1;
                }
                var _b6 = dojo.position(el),
                    _b7 = _b5(el);
                if (el == _b1) {
                    _b6.w = _b2;
                    _b6.h = _b3;
                    if (_b1 == _ac && _ad && rtl) {
                        _b6.x += _b1.offsetWidth - _b6.w;
                    }
                    if (_b6.x < 0 || !_ad) {
                        _b6.x = 0;
                    }
                    if (_b6.y < 0 || !_ad) {
                        _b6.y = 0;
                    }
                } else {
                    var pb = dojo._getPadBorderExtents(el);
                    _b6.w -= pb.w;
                    _b6.h -= pb.h;
                    _b6.x += pb.l;
                    _b6.y += pb.t;
                    var _b8 = el.clientWidth,
                        _b9 = _b6.w - _b8;
                    if (_b8 > 0 && _b9 > 0) {
                        _b6.w = _b8;
                        _b6.x += rtl && (_ad || el.clientLeft > pb.l) ? _b9 : 0;
                    }
                    _b8 = el.clientHeight;
                    _b9 = _b6.h - _b8;
                    if (_b8 > 0 && _b9 > 0) {
                        _b6.h = _b8;
                    }
                }
                if (_b7) {
                    if (_b6.y < 0) {
                        _b6.h += _b6.y;
                        _b6.y = 0;
                    }
                    if (_b6.x < 0) {
                        _b6.w += _b6.x;
                        _b6.x = 0;
                    }
                    if (_b6.y + _b6.h > _b3) {
                        _b6.h = _b3 - _b6.y;
                    }
                    if (_b6.x + _b6.w > _b2) {
                        _b6.w = _b2 - _b6.x;
                    }
                }
                var l = _b4.x - _b6.x,
                    t = _b4.y - Math.max(_b6.y, 0),
                    r = l + _b4.w - _b6.w,
                    bot = t + _b4.h - _b6.h;
                if (r * l > 0) {
                    var s = Math[l < 0 ? "max" : "min"](l, r);
                    if (rtl && ((_ad == 8 && !_af) || _ad >= 9)) {
                        s = -s;
                    }
                    _b4.x += el.scrollLeft;
                    el.scrollLeft += s;
                    _b4.x -= el.scrollLeft;
                }
                if (bot * t > 0) {
                    _b4.y += el.scrollTop;
                    el.scrollTop += Math[t < 0 ? "max" : "min"](t, bot);
                    _b4.y -= el.scrollTop;
                }
                el = el != _b1 && !_b7 && el.parentNode;
            }
        } catch (error) {
            console.error("scrollIntoView: " + error);
            _aa.scrollIntoView(false);
        }
    };
}
if (!dojo._hasResource["dijit._base.sniff"]) {
    dojo._hasResource["dijit._base.sniff"] = true;
    dojo.provide("dijit._base.sniff");
    (function () {
        var d = dojo,
            _ba = d.doc.documentElement,
            ie = d.isIE,
            _bb = d.isOpera,
            maj = Math.floor,
            ff = d.isFF,
            _bc = d.boxModel.replace(/-/, ""),
            _bd = {
                dj_ie: ie,
                dj_ie6: maj(ie) == 6,
                dj_ie7: maj(ie) == 7,
                dj_ie8: maj(ie) == 8,
                dj_ie9: maj(ie) == 9,
                dj_ie10: maj(ie) == 10,
                dj_ie11: maj(ie) == 11,
                dj_iequirks: ie && d.isQuirks,
                dj_opera: _bb,
                dj_khtml: d.isKhtml,
                dj_webkit: d.isWebKit,
                dj_safari: d.isSafari,
                dj_chrome: d.isChrome,
                dj_gecko: d.isMozilla,
                dj_ff3: maj(ff) == 3,
            };
        _bd["dj_" + _bc] = true;
        for (var p in _bd) {
            if (_bd[p]) {
                if (_ba.className) {
                    _ba.className += " " + p;
                } else {
                    _ba.className = p;
                }
            }
        }
        dojo._loaders.unshift(function () {
            if (!dojo._isBodyLtr()) {
                _ba.className += " dijitRtl";
                for (var p in _bd) {
                    if (_bd[p]) {
                        _ba.className += " " + p + "-rtl";
                    }
                }
            }
        });
    })();
}
if (!dojo._hasResource["dijit._base.typematic"]) {
    dojo._hasResource["dijit._base.typematic"] = true;
    dojo.provide("dijit._base.typematic");
    dijit.typematic = {
        _fireEventAndReload: function () {
            this._timer = null;
            this._callback(++this._count, this._node, this._evt);
            this._currentTimeout = Math.max(this._currentTimeout < 0 ? this._initialDelay : this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay), 10);
            this._timer = setTimeout(dojo.hitch(this, "_fireEventAndReload"), this._currentTimeout);
        },
        trigger: function (evt, _be, _bf, _c0, obj, _c1, _c2) {
            if (obj != this._obj) {
                this.stop();
                this._initialDelay = _c2 || 500;
                this._subsequentDelay = _c1 || 0.9;
                this._obj = obj;
                this._evt = evt;
                this._node = _bf;
                this._currentTimeout = -1;
                this._count = -1;
                this._callback = dojo.hitch(_be, _c0);
                this._fireEventAndReload();
            }
        },
        stop: function () {
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }
            if (this._obj) {
                this._callback(-1, this._node, this._evt);
                this._obj = null;
            }
        },
        addKeyListener: function (_c3, _c4, _c5, _c6, _c7, _c8) {
            if (_c4.keyCode) {
                _c4.charOrCode = _c4.keyCode;
                dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
            } else {
                if (_c4.charCode) {
                    _c4.charOrCode = String.fromCharCode(_c4.charCode);
                    dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
                }
            }
            return [
                dojo.connect(_c3, "onkeypress", this, function (evt) {
                    if (
                        evt.charOrCode == _c4.charOrCode &&
                        (_c4.ctrlKey === undefined || _c4.ctrlKey == evt.ctrlKey) &&
                        (_c4.altKey === undefined || _c4.altKey == evt.altKey) &&
                        (_c4.metaKey === undefined || _c4.metaKey == (evt.metaKey || false)) &&
                        (_c4.shiftKey === undefined || _c4.shiftKey == evt.shiftKey)
                    ) {
                        dojo.stopEvent(evt);
                        dijit.typematic.trigger(_c4, _c5, _c3, _c6, _c4, _c7, _c8);
                    } else {
                        if (dijit.typematic._obj == _c4) {
                            dijit.typematic.stop();
                        }
                    }
                }),
                dojo.connect(_c3, "onkeyup", this, function (evt) {
                    if (dijit.typematic._obj == _c4) {
                        dijit.typematic.stop();
                    }
                }),
            ];
        },
        addMouseListener: function (_c9, _ca, _cb, _cc, _cd) {
            var dc = dojo.connect;
            return [
                dc(_c9, "mousedown", this, function (evt) {
                    dojo.stopEvent(evt);
                    dijit.typematic.trigger(evt, _ca, _c9, _cb, _c9, _cc, _cd);
                }),
                dc(_c9, "mouseup", this, function (evt) {
                    dojo.stopEvent(evt);
                    dijit.typematic.stop();
                }),
                dc(_c9, "mouseout", this, function (evt) {
                    dojo.stopEvent(evt);
                    dijit.typematic.stop();
                }),
                dc(_c9, "mousemove", this, function (evt) {
                    dojo.stopEvent(evt);
                }),
                dc(_c9, "dblclick", this, function (evt) {
                    dojo.stopEvent(evt);
                    if (dojo.isIE) {
                        dijit.typematic.trigger(evt, _ca, _c9, _cb, _c9, _cc, _cd);
                        setTimeout(dojo.hitch(this, dijit.typematic.stop), 50);
                    }
                }),
            ];
        },
        addListener: function (_ce, _cf, _d0, _d1, _d2, _d3, _d4) {
            return this.addKeyListener(_cf, _d0, _d1, _d2, _d3, _d4).concat(this.addMouseListener(_ce, _d1, _d2, _d3, _d4));
        },
    };
}
if (!dojo._hasResource["dijit._base.wai"]) {
    dojo._hasResource["dijit._base.wai"] = true;
    dojo.provide("dijit._base.wai");
    dijit.wai = {
        onload: function () {
            var div = dojo.create(
                "div",
                {
                    id: "a11yTestNode",
                    style: {
                        cssText:
                            "border: 1px solid;" +
                            "border-color:red green;" +
                            "position: absolute;" +
                            "height: 5px;" +
                            "top: -999px;" +
                            'background-image: url("' +
                            (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")) +
                            '");',
                    },
                },
                dojo.body()
            );
            var cs = dojo.getComputedStyle(div);
            if (cs) {
                var _d5 = cs.backgroundImage;
                var _d6 = cs.borderTopColor == cs.borderRightColor || (_d5 != null && (_d5 == "none" || _d5 == "url(invalid-url:)"));
                dojo[_d6 ? "addClass" : "removeClass"](dojo.body(), "dijit_a11y");
                if (dojo.isIE) {
                    div.outerHTML = "";
                } else {
                    dojo.body().removeChild(div);
                }
            }
        },
    };
    if (dojo.isIE || dojo.isMoz) {
        dojo._loaders.unshift(dijit.wai.onload);
    }
    dojo.mixin(dijit, {
        _XhtmlRoles: /banner|contentinfo|definition|main|navigation|search|note|secondary|seealso/,
        hasWaiRole: function (_d7, _d8) {
            var _d9 = this.getWaiRole(_d7);
            return _d8 ? _d9.indexOf(_d8) > -1 : _d9.length > 0;
        },
        getWaiRole: function (_da) {
            return dojo.trim((dojo.attr(_da, "role") || "").replace(this._XhtmlRoles, "").replace("wairole:", ""));
        },
        setWaiRole: function (_db, _dc) {
            var _dd = dojo.attr(_db, "role") || "";
            if (!this._XhtmlRoles.test(_dd)) {
                dojo.attr(_db, "role", _dc);
            } else {
                if ((" " + _dd + " ").indexOf(" " + _dc + " ") < 0) {
                    var _de = dojo.trim(_dd.replace(this._XhtmlRoles, ""));
                    var _df = dojo.trim(_dd.replace(_de, ""));
                    dojo.attr(_db, "role", _df + (_df ? " " : "") + _dc);
                }
            }
        },
        removeWaiRole: function (_e0, _e1) {
            var _e2 = dojo.attr(_e0, "role");
            if (!_e2) {
                return;
            }
            if (_e1) {
                var t = dojo.trim((" " + _e2 + " ").replace(" " + _e1 + " ", " "));
                dojo.attr(_e0, "role", t);
            } else {
                _e0.removeAttribute("role");
            }
        },
        hasWaiState: function (_e3, _e4) {
            return _e3.hasAttribute ? _e3.hasAttribute("aria-" + _e4) : !!_e3.getAttribute("aria-" + _e4);
        },
        getWaiState: function (_e5, _e6) {
            return _e5.getAttribute("aria-" + _e6) || "";
        },
        setWaiState: function (_e7, _e8, _e9) {
            _e7.setAttribute("aria-" + _e8, _e9);
        },
        removeWaiState: function (_ea, _eb) {
            _ea.removeAttribute("aria-" + _eb);
        },
    });
}
if (!dojo._hasResource["dijit._base"]) {
    dojo._hasResource["dijit._base"] = true;
    dojo.provide("dijit._base");
}
if (!dojo._hasResource["dojo.date.stamp"]) {
    dojo._hasResource["dojo.date.stamp"] = true;
    dojo.provide("dojo.date.stamp");
    dojo.date.stamp.fromISOString = function (_ec, _ed) {
        if (!dojo.date.stamp._isoRegExp) {
            dojo.date.stamp._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
        }
        var _ee = dojo.date.stamp._isoRegExp.exec(_ec),
            _ef = null;
        if (_ee) {
            _ee.shift();
            if (_ee[1]) {
                _ee[1]--;
            }
            if (_ee[6]) {
                _ee[6] *= 1000;
            }
            if (_ed) {
                _ed = new Date(_ed);
                dojo.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function (_f0) {
                    return _ed["get" + _f0]();
                }).forEach(function (_f1, _f2) {
                    if (_ee[_f2] === undefined) {
                        _ee[_f2] = _f1;
                    }
                });
            }
            _ef = new Date(_ee[0] || 1970, _ee[1] || 0, _ee[2] || 1, _ee[3] || 0, _ee[4] || 0, _ee[5] || 0, _ee[6] || 0);
            if (_ee[0] < 100) {
                _ef.setFullYear(_ee[0] || 1970);
            }
            var _f3 = 0,
                _f4 = _ee[7] && _ee[7].charAt(0);
            if (_f4 != "Z") {
                _f3 = (_ee[8] || 0) * 60 + (Number(_ee[9]) || 0);
                if (_f4 != "-") {
                    _f3 *= -1;
                }
            }
            if (_f4) {
                _f3 -= _ef.getTimezoneOffset();
            }
            if (_f3) {
                _ef.setTime(_ef.getTime() + _f3 * 60000);
            }
        }
        return _ef;
    };
    dojo.date.stamp.toISOString = function (_f5, _f6) {
        var _f7 = function (n) {
            return n < 10 ? "0" + n : n;
        };
        _f6 = _f6 || {};
        var _f8 = [],
            _f9 = _f6.zulu ? "getUTC" : "get",
            _fa = "";
        if (_f6.selector != "time") {
            var _fb = _f5[_f9 + "FullYear"]();
            _fa = ["0000".substr((_fb + "").length) + _fb, _f7(_f5[_f9 + "Month"]() + 1), _f7(_f5[_f9 + "Date"]())].join("-");
        }
        _f8.push(_fa);
        if (_f6.selector != "date") {
            var _fc = [_f7(_f5[_f9 + "Hours"]()), _f7(_f5[_f9 + "Minutes"]()), _f7(_f5[_f9 + "Seconds"]())].join(":");
            var _fd = _f5[_f9 + "Milliseconds"]();
            if (_f6.milliseconds) {
                _fc += "." + (_fd < 100 ? "0" : "") + _f7(_fd);
            }
            if (_f6.zulu) {
                _fc += "Z";
            } else {
                if (_f6.selector != "time") {
                    var _fe = _f5.getTimezoneOffset();
                    var _ff = Math.abs(_fe);
                    _fc += (_fe > 0 ? "-" : "+") + _f7(Math.floor(_ff / 60)) + ":" + _f7(_ff % 60);
                }
            }
            _f8.push(_fc);
        }
        return _f8.join("T");
    };
}
if (!dojo._hasResource["dojo.parser"]) {
    dojo._hasResource["dojo.parser"] = true;
    dojo.provide("dojo.parser");
    dojo.parser = new (function () {
        var d = dojo;
        this._attrName = d._scopeName + "Type";
        this._query = "[" + this._attrName + "]";
        function _100(_101) {
            if (d.isString(_101)) {
                return "string";
            }
            if (typeof _101 == "number") {
                return "number";
            }
            if (typeof _101 == "boolean") {
                return "boolean";
            }
            if (d.isFunction(_101)) {
                return "function";
            }
            if (d.isArray(_101)) {
                return "array";
            }
            if (_101 instanceof Date) {
                return "date";
            }
            if (_101 instanceof d._Url) {
                return "url";
            }
            return "object";
        }
        function _102(_103, type) {
            switch (type) {
                case "string":
                    return _103;
                case "number":
                    return _103.length ? Number(_103) : NaN;
                case "boolean":
                    return typeof _103 == "boolean" ? _103 : !(_103.toLowerCase() == "false");
                case "function":
                    if (d.isFunction(_103)) {
                        _103 = _103.toString();
                        _103 = d.trim(_103.substring(_103.indexOf("{") + 1, _103.length - 1));
                    }
                    try {
                        if (_103.search(/[^\w\.]+/i) != -1) {
                            return new Function(_103);
                        } else {
                            return d.getObject(_103, false);
                        }
                    } catch (e) {
                        return new Function();
                    }
                case "array":
                    return _103 ? _103.split(/\s*,\s*/) : [];
                case "date":
                    switch (_103) {
                        case "":
                            return new Date("");
                        case "now":
                            return new Date();
                        default:
                            return d.date.stamp.fromISOString(_103);
                    }
                case "url":
                    return d.baseUrl + _103;
                default:
                    return d.fromJson(_103);
            }
        }
        var _104 = {};
        dojo.connect(dojo, "extend", function () {
            _104 = {};
        });
        function _105(_106) {
            if (!_104[_106]) {
                var cls = d.getObject(_106);
                if (!d.isFunction(cls)) {
                    throw new Error("Could not load class '" + _106 + "'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
                }
                var _107 = cls.prototype;
                var _108 = {},
                    _109 = {};
                for (var name in _107) {
                    if (name.charAt(0) == "_") {
                        continue;
                    }
                    if (name in _109) {
                        continue;
                    }
                    var _10a = _107[name];
                    _108[name] = _100(_10a);
                }
                _104[_106] = { cls: cls, params: _108 };
            }
            return _104[_106];
        }
        this._functionFromScript = function (_10b) {
            var _10c = "";
            var _10d = "";
            var _10e = _10b.getAttribute("args");
            if (_10e) {
                d.forEach(_10e.split(/\s*,\s*/), function (part, idx) {
                    _10c += "var " + part + " = arguments[" + idx + "]; ";
                });
            }
            var _10f = _10b.getAttribute("with");
            if (_10f && _10f.length) {
                d.forEach(_10f.split(/\s*,\s*/), function (part) {
                    _10c += "with(" + part + "){";
                    _10d += "}";
                });
            }
            return new Function(_10c + _10b.innerHTML + _10d);
        };
        this.instantiate = function (_110, _111, args) {
            var _112 = [],
                dp = dojo.parser;
            _111 = _111 || {};
            args = args || {};
            d.forEach(_110, function (node) {
                if (!node) {
                    return;
                }
                var type = dp._attrName in _111 ? _111[dp._attrName] : node.getAttribute(dp._attrName);
                if (!type || !type.length) {
                    return;
                }
                var _113 = _105(type),
                    _114 = _113.cls,
                    ps = _114._noScript || _114.prototype._noScript;
                var _115 = {},
                    _116 = node.attributes;
                for (var name in _113.params) {
                    var item = name in _111 ? { value: _111[name], specified: true } : _116.getNamedItem(name);
                    if (!item || (!item.specified && (!dojo.isIE || name.toLowerCase() != "value"))) {
                        continue;
                    }
                    var _117 = item.value;
                    switch (name) {
                        case "class":
                            _117 = "className" in _111 ? _111.className : node.className;
                            break;
                        case "style":
                            _117 = "style" in _111 ? _111.style : node.style && node.style.cssText;
                    }
                    var _118 = _113.params[name];
                    if (typeof _117 == "string") {
                        _115[name] = _102(_117, _118);
                    } else {
                        _115[name] = _117;
                    }
                }
                if (!ps) {
                    var _119 = [],
                        _11a = [];
                    d.query("> script[type^='dojo/']", node)
                        .orphan()
                        .forEach(function (_11b) {
                            var _11c = _11b.getAttribute("event"),
                                type = _11b.getAttribute("type"),
                                nf = d.parser._functionFromScript(_11b);
                            if (_11c) {
                                if (type == "dojo/connect") {
                                    _119.push({ event: _11c, func: nf });
                                } else {
                                    _115[_11c] = nf;
                                }
                            } else {
                                _11a.push(nf);
                            }
                        });
                }
                var _11d = _114.markupFactory || (_114.prototype && _114.prototype.markupFactory);
                var _11e = _11d ? _11d(_115, node, _114) : new _114(_115, node);
                _112.push(_11e);
                var _11f = node.getAttribute("jsId");
                if (_11f) {
                    d.setObject(_11f, _11e);
                }
                if (!ps) {
                    d.forEach(_119, function (_120) {
                        d.connect(_11e, _120.event, null, _120.func);
                    });
                    d.forEach(_11a, function (func) {
                        func.call(_11e);
                    });
                }
            });
            if (!_111._started) {
                d.forEach(_112, function (_121) {
                    if (!args.noStart && _121 && _121.startup && !_121._started && (!_121.getParent || !_121.getParent())) {
                        _121.startup();
                    }
                });
            }
            return _112;
        };
        this.parse = function (_122, args) {
            var root;
            if (!args && _122 && _122.rootNode) {
                args = _122;
                root = args.rootNode;
            } else {
                root = _122;
            }
            var list = d.query(this._query, root);
            return this.instantiate(list, null, args);
        };
    })();
    (function () {
        var _123 = function () {
            if (dojo.config.parseOnLoad) {
                dojo.parser.parse();
            }
        };
        if (dojo.exists("dijit.wai.onload") && dijit.wai.onload === dojo._loaders[0]) {
            dojo._loaders.splice(1, 0, _123);
        } else {
            dojo._loaders.unshift(_123);
        }
    })();
}
if (!dojo._hasResource["dijit._Widget"]) {
    dojo._hasResource["dijit._Widget"] = true;
    dojo.provide("dijit._Widget");
    dojo.require("dijit._base");
    dojo.connect(dojo, "_connect", function (_124, _125) {
        if (_124 && dojo.isFunction(_124._onConnect)) {
            _124._onConnect(_125);
        }
    });
    dijit._connectOnUseEventHandler = function (_126) {};
    dijit._lastKeyDownNode = null;
    if (dojo.isIE < 11) {
        (function () {
            var _127 = function (evt) {
                dijit._lastKeyDownNode = evt.srcElement;
            };
            dojo.doc.attachEvent("onkeydown", _127);
            dojo.addOnWindowUnload(function () {
                dojo.doc.detachEvent("onkeydown", _127);
            });
        })();
    } else {
        dojo.doc.addEventListener(
            "keydown",
            function (evt) {
                dijit._lastKeyDownNode = evt.target;
            },
            true
        );
    }
    (function () {
        var _128 = {},
            _129 = function (_12a) {
                var dc = _12a.declaredClass;
                if (!_128[dc]) {
                    var r = [],
                        _12b,
                        _12c = _12a.constructor.prototype;
                    for (var _12d in _12c) {
                        if (dojo.isFunction(_12c[_12d]) && (_12b = _12d.match(/^_set([a-zA-Z]*)Attr$/)) && _12b[1]) {
                            r.push(_12b[1].charAt(0).toLowerCase() + _12b[1].substr(1));
                        }
                    }
                    _128[dc] = r;
                }
                return _128[dc] || [];
            };
        dojo.declare("dijit._Widget", null, {
            id: "",
            lang: "",
            dir: "",
            class: "",
            style: "",
            title: "",
            tooltip: "",
            srcNodeRef: null,
            domNode: null,
            containerNode: null,
            attributeMap: { id: "", dir: "", lang: "", class: "", style: "", title: "" },
            _deferredConnects: { onClick: "", onDblClick: "", onKeyDown: "", onKeyPress: "", onKeyUp: "", onMouseMove: "", onMouseDown: "", onMouseOut: "", onMouseOver: "", onMouseLeave: "", onMouseEnter: "", onMouseUp: "" },
            onClick: dijit._connectOnUseEventHandler,
            onDblClick: dijit._connectOnUseEventHandler,
            onKeyDown: dijit._connectOnUseEventHandler,
            onKeyPress: dijit._connectOnUseEventHandler,
            onKeyUp: dijit._connectOnUseEventHandler,
            onMouseDown: dijit._connectOnUseEventHandler,
            onMouseMove: dijit._connectOnUseEventHandler,
            onMouseOut: dijit._connectOnUseEventHandler,
            onMouseOver: dijit._connectOnUseEventHandler,
            onMouseLeave: dijit._connectOnUseEventHandler,
            onMouseEnter: dijit._connectOnUseEventHandler,
            onMouseUp: dijit._connectOnUseEventHandler,
            _blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")).toString(),
            postscript: function (_12e, _12f) {
                this.create(_12e, _12f);
            },
            create: function (_130, _131) {
                this.srcNodeRef = dojo.byId(_131);
                this._connects = [];
                this._subscribes = [];
                this._deferredConnects = dojo.clone(this._deferredConnects);
                for (var attr in this.attributeMap) {
                    delete this._deferredConnects[attr];
                }
                for (attr in this._deferredConnects) {
                    if (this[attr] !== dijit._connectOnUseEventHandler) {
                        delete this._deferredConnects[attr];
                    }
                }
                if (this.srcNodeRef && typeof this.srcNodeRef.id == "string") {
                    this.id = this.srcNodeRef.id;
                }
                if (_130) {
                    this.params = _130;
                    dojo.mixin(this, _130);
                }
                this.postMixInProperties();
                if (!this.id) {
                    this.id = dijit.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                }
                dijit.registry.add(this);
                this.buildRendering();
                if (this.domNode) {
                    this._applyAttributes();
                    var _132 = this.srcNodeRef;
                    if (_132 && _132.parentNode) {
                        _132.parentNode.replaceChild(this.domNode, _132);
                    }
                    for (attr in this.params) {
                        this._onConnect(attr);
                    }
                }
                if (this.domNode) {
                    this.domNode.setAttribute("widgetId", this.id);
                }
                this.postCreate();
                if (this.srcNodeRef && !this.srcNodeRef.parentNode) {
                    delete this.srcNodeRef;
                }
                this._created = true;
            },
            _applyAttributes: function () {
                var _133 = function (attr, _134) {
                    if ((_134.params && attr in _134.params) || _134[attr]) {
                        _134.attr(attr, _134[attr]);
                    }
                };
                for (var attr in this.attributeMap) {
                    _133(attr, this);
                }
                dojo.forEach(
                    _129(this),
                    function (a) {
                        if (!(a in this.attributeMap)) {
                            _133(a, this);
                        }
                    },
                    this
                );
            },
            postMixInProperties: function () {},
            buildRendering: function () {
                this.domNode = this.srcNodeRef || dojo.create("div");
            },
            postCreate: function () {},
            startup: function () {
                this._started = true;
            },
            destroyRecursive: function (_135) {
                this._beingDestroyed = true;
                this.destroyDescendants(_135);
                this.destroy(_135);
            },
            destroy: function (_136) {
                this._beingDestroyed = true;
                this.uninitialize();
                var d = dojo,
                    dfe = d.forEach,
                    dun = d.unsubscribe;
                dfe(this._connects, function (_137) {
                    dfe(_137, d.disconnect);
                });
                dfe(this._subscribes, function (_138) {
                    dun(_138);
                });
                dfe(this._supportingWidgets || [], function (w) {
                    if (w.destroyRecursive) {
                        w.destroyRecursive();
                    } else {
                        if (w.destroy) {
                            w.destroy();
                        }
                    }
                });
                this.destroyRendering(_136);
                dijit.registry.remove(this.id);
                this._destroyed = true;
            },
            destroyRendering: function (_139) {
                if (this.bgIframe) {
                    this.bgIframe.destroy(_139);
                    delete this.bgIframe;
                }
                if (this.domNode) {
                    if (_139) {
                        dojo.removeAttr(this.domNode, "widgetId");
                    } else {
                        dojo.destroy(this.domNode);
                    }
                    delete this.domNode;
                }
                if (this.srcNodeRef) {
                    if (!_139) {
                        dojo.destroy(this.srcNodeRef);
                    }
                    delete this.srcNodeRef;
                }
            },
            destroyDescendants: function (_13a) {
                dojo.forEach(this.getChildren(), function (_13b) {
                    if (_13b.destroyRecursive) {
                        _13b.destroyRecursive(_13a);
                    }
                });
            },
            uninitialize: function () {
                return false;
            },
            onFocus: function () {},
            onBlur: function () {},
            _onFocus: function (e) {
                this.onFocus();
            },
            _onBlur: function () {
                this.onBlur();
            },
            _onConnect: function (_13c) {
                if (_13c in this._deferredConnects) {
                    var _13d = this[this._deferredConnects[_13c] || "domNode"];
                    this.connect(_13d, _13c.toLowerCase(), _13c);
                    delete this._deferredConnects[_13c];
                }
            },
            _setClassAttr: function (_13e) {
                var _13f = this[this.attributeMap["class"] || "domNode"];
                dojo.removeClass(_13f, this["class"]);
                this["class"] = _13e;
                dojo.addClass(_13f, _13e);
            },
            _setStyleAttr: function (_140) {
                var _141 = this[this.attributeMap.style || "domNode"];
                if (dojo.isObject(_140)) {
                    dojo.style(_141, _140);
                } else {
                    if (_141.style.cssText) {
                        _141.style.cssText += "; " + _140;
                    } else {
                        _141.style.cssText = _140;
                    }
                }
                this.style = _140;
            },
            setAttribute: function (attr, _142) {
                dojo.deprecated(this.declaredClass + "::setAttribute() is deprecated. Use attr() instead.", "", "2.0");
                this.attr(attr, _142);
            },
            _attrToDom: function (attr, _143) {
                var _144 = this.attributeMap[attr];
                dojo.forEach(
                    dojo.isArray(_144) ? _144 : [_144],
                    function (_145) {
                        var _146 = this[_145.node || _145 || "domNode"];
                        var type = _145.type || "attribute";
                        switch (type) {
                            case "attribute":
                                if (dojo.isFunction(_143)) {
                                    _143 = dojo.hitch(this, _143);
                                }
                                var _147 = _145.attribute ? _145.attribute : /^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr;
                                dojo.attr(_146, _147, _143);
                                break;
                            case "innerText":
                                _146.innerHTML = "";
                                _146.appendChild(dojo.doc.createTextNode(_143));
                                break;
                            case "innerHTML":
                                _146.innerHTML = _143;
                                break;
                            case "class":
                                dojo.removeClass(_146, this[attr]);
                                dojo.addClass(_146, _143);
                                break;
                        }
                    },
                    this
                );
                this[attr] = _143;
            },
            attr: function (name, _148) {
                var args = arguments.length;
                if (args == 1 && !dojo.isString(name)) {
                    for (var x in name) {
                        this.attr(x, name[x]);
                    }
                    return this;
                }
                var _149 = this._getAttrNames(name);
                if (args >= 2) {
                    if (this[_149.s]) {
                        args = dojo._toArray(arguments, 1);
                        return this[_149.s].apply(this, args) || this;
                    } else {
                        if (name in this.attributeMap) {
                            this._attrToDom(name, _148);
                        }
                        this[name] = _148;
                    }
                    return this;
                } else {
                    return this[_149.g] ? this[_149.g]() : this[name];
                }
            },
            _attrPairNames: {},
            _getAttrNames: function (name) {
                var apn = this._attrPairNames;
                if (apn[name]) {
                    return apn[name];
                }
                var uc = name.charAt(0).toUpperCase() + name.substr(1);
                return (apn[name] = { n: name + "Node", s: "_set" + uc + "Attr", g: "_get" + uc + "Attr" });
            },
            toString: function () {
                return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
            },
            getDescendants: function () {
                return this.containerNode ? dojo.query("[widgetId]", this.containerNode).map(dijit.byNode) : [];
            },
            getChildren: function () {
                return this.containerNode ? dijit.findWidgets(this.containerNode) : [];
            },
            nodesWithKeyClick: ["input", "button"],
            connect: function (obj, _14a, _14b) {
                var d = dojo,
                    dc = d._connect,
                    _14c = [];
                if (_14a == "ondijitclick") {
                    if (!this.nodesWithKeyClick[obj.tagName.toLowerCase()]) {
                        var m = d.hitch(this, _14b);
                        _14c.push(
                            dc(obj, "onkeydown", this, function (e) {
                                if ((e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                                    dijit._lastKeyDownNode = e.target;
                                    d.stopEvent(e);
                                }
                            }),
                            dc(obj, "onkeyup", this, function (e) {
                                if ((e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) && e.target === dijit._lastKeyDownNode && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                                    dijit._lastKeyDownNode = null;
                                    return m(e);
                                }
                            })
                        );
                    }
                    _14a = "onclick";
                }
                _14c.push(dc(obj, _14a, this, _14b));
                this._connects.push(_14c);
                return _14c;
            },
            disconnect: function (_14d) {
                for (var i = 0; i < this._connects.length; i++) {
                    if (this._connects[i] == _14d) {
                        dojo.forEach(_14d, dojo.disconnect);
                        this._connects.splice(i, 1);
                        return;
                    }
                }
            },
            subscribe: function (_14e, _14f) {
                var d = dojo,
                    _150 = d.subscribe(_14e, this, _14f);
                this._subscribes.push(_150);
                return _150;
            },
            unsubscribe: function (_151) {
                for (var i = 0; i < this._subscribes.length; i++) {
                    if (this._subscribes[i] == _151) {
                        dojo.unsubscribe(_151);
                        this._subscribes.splice(i, 1);
                        return;
                    }
                }
            },
            isLeftToRight: function () {
                return dojo._isBodyLtr();
            },
            isFocusable: function () {
                return this.focus && dojo.style(this.domNode, "display") != "none";
            },
            placeAt: function (_152, _153) {
                if (_152.declaredClass && _152.addChild) {
                    _152.addChild(this, _153);
                } else {
                    dojo.place(this.domNode, _152, _153);
                }
                return this;
            },
            _onShow: function () {
                this.onShow();
            },
            onShow: function () {},
            onHide: function () {},
        });
    })();
}
if (!dojo._hasResource["dojo.string"]) {
    dojo._hasResource["dojo.string"] = true;
    dojo.provide("dojo.string");
    dojo.string.rep = function (str, num) {
        if (num <= 0 || !str) {
            return "";
        }
        var buf = [];
        for (;;) {
            if (num & 1) {
                buf.push(str);
            }
            if (!(num >>= 1)) {
                break;
            }
            str += str;
        }
        return buf.join("");
    };
    dojo.string.pad = function (text, size, ch, end) {
        if (!ch) {
            ch = "0";
        }
        var out = String(text),
            pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
        return end ? out + pad : pad + out;
    };
    dojo.string.substitute = function (_154, map, _155, _156) {
        _156 = _156 || dojo.global;
        _155 = _155
            ? dojo.hitch(_156, _155)
            : function (v) {
                  return v;
              };
        return _154.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function (_157, key, _158) {
            var _159 = dojo.getObject(key, false, map);
            if (_158) {
                _159 = dojo.getObject(_158, false, _156).call(_156, _159, key);
            }
            return _155(_159, key).toString();
        });
    };
    dojo.string.trim = String.prototype.trim
        ? dojo.trim
        : function (str) {
              str = str.replace(/^\s+/, "");
              for (var i = str.length - 1; i >= 0; i--) {
                  if (/\S/.test(str.charAt(i))) {
                      str = str.substring(0, i + 1);
                      break;
                  }
              }
              return str;
          };
}
if (!dojo._hasResource["dojo.cache"]) {
    dojo._hasResource["dojo.cache"] = true;
    dojo.provide("dojo.cache");
    (function () {
        var _15a = {};
        dojo.cache = function (_15b, url, _15c) {
            if (typeof _15b == "string") {
                var _15d = dojo.moduleUrl(_15b, url);
            } else {
                _15d = _15b;
                _15c = url;
            }
            var key = _15d.toString();
            var val = _15c;
            if (_15c !== undefined && !dojo.isString(_15c)) {
                val = "value" in _15c ? _15c.value : undefined;
            }
            var _15e = _15c && _15c.sanitize ? true : false;
            if (val || val === null) {
                if (val == null) {
                    delete _15a[key];
                } else {
                    val = _15a[key] = _15e ? dojo.cache._sanitize(val) : val;
                }
            } else {
                if (!(key in _15a)) {
                    val = dojo._getText(key);
                    _15a[key] = _15e ? dojo.cache._sanitize(val) : val;
                }
                val = _15a[key];
            }
            return val;
        };
        dojo.cache._sanitize = function (val) {
            if (val) {
                val = val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
                var _15f = val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
                if (_15f) {
                    val = _15f[1];
                }
            } else {
                val = "";
            }
            return val;
        };
    })();
}
if (!dojo._hasResource["dijit._Templated"]) {
    dojo._hasResource["dijit._Templated"] = true;
    dojo.provide("dijit._Templated");
    dojo.declare("dijit._Templated", null, {
        templateString: null,
        templatePath: null,
        widgetsInTemplate: false,
        _skipNodeCache: false,
        _earlyTemplatedStartup: false,
        constructor: function () {
            this._attachPoints = [];
        },
        _stringRepl: function (tmpl) {
            var _160 = this.declaredClass,
                _161 = this;
            return dojo.string.substitute(
                tmpl,
                this,
                function (_162, key) {
                    if (key.charAt(0) == "!") {
                        _162 = dojo.getObject(key.substr(1), false, _161);
                    }
                    if (typeof _162 == "undefined") {
                        throw new Error(_160 + " template:" + key);
                    }
                    if (_162 == null) {
                        return "";
                    }
                    return key.charAt(0) == "!" ? _162 : _162.toString().replace(/"/g, "&quot;");
                },
                this
            );
        },
        buildRendering: function () {
            var _163 = dijit._Templated.getCachedTemplate(this.templatePath, this.templateString, this._skipNodeCache);
            var node;
            if (dojo.isString(_163)) {
                node = dojo._toDom(this._stringRepl(_163));
                if (node.nodeType != 1) {
                    throw new Error("Invalid template: " + _163);
                }
            } else {
                node = _163.cloneNode(true);
            }
            this.domNode = node;
            this._attachTemplateNodes(node);
            if (this.widgetsInTemplate) {
                var _164 = dojo.parser,
                    qry,
                    attr;
                if (_164._query != "[dojoType]") {
                    qry = _164._query;
                    attr = _164._attrName;
                    _164._query = "[dojoType]";
                    _164._attrName = "dojoType";
                }
                var cw = (this._startupWidgets = dojo.parser.parse(node, { noStart: !this._earlyTemplatedStartup }));
                if (qry) {
                    _164._query = qry;
                    _164._attrName = attr;
                }
                this._supportingWidgets = dijit.findWidgets(node);
                this._attachTemplateNodes(cw, function (n, p) {
                    return n[p];
                });
            }
            this._fillContent(this.srcNodeRef);
        },
        _fillContent: function (_165) {
            var dest = this.containerNode;
            if (_165 && dest) {
                while (_165.hasChildNodes()) {
                    dest.appendChild(_165.firstChild);
                }
            }
        },
        _attachTemplateNodes: function (_166, _167) {
            _167 =
                _167 ||
                function (n, p) {
                    return n.getAttribute(p);
                };
            var _168 = dojo.isArray(_166) ? _166 : _166.all || _166.getElementsByTagName("*");
            var x = dojo.isArray(_166) ? 0 : -1;
            for (; x < _168.length; x++) {
                var _169 = x == -1 ? _166 : _168[x];
                if (this.widgetsInTemplate && _167(_169, "dojoType")) {
                    continue;
                }
                var _16a = _167(_169, "dojoAttachPoint");
                if (_16a) {
                    var _16b,
                        _16c = _16a.split(/\s*,\s*/);
                    while ((_16b = _16c.shift())) {
                        if (dojo.isArray(this[_16b])) {
                            this[_16b].push(_169);
                        } else {
                            this[_16b] = _169;
                        }
                        this._attachPoints.push(_16b);
                    }
                }
                var _16d = _167(_169, "dojoAttachEvent");
                if (_16d) {
                    var _16e,
                        _16f = _16d.split(/\s*,\s*/);
                    var trim = dojo.trim;
                    while ((_16e = _16f.shift())) {
                        if (_16e) {
                            var _170 = null;
                            if (_16e.indexOf(":") != -1) {
                                var _171 = _16e.split(":");
                                _16e = trim(_171[0]);
                                _170 = trim(_171[1]);
                            } else {
                                _16e = trim(_16e);
                            }
                            if (!_170) {
                                _170 = _16e;
                            }
                            this.connect(_169, _16e, _170);
                        }
                    }
                }
                var role = _167(_169, "waiRole");
                if (role) {
                    dijit.setWaiRole(_169, role);
                }
                var _172 = _167(_169, "waiState");
                if (_172) {
                    dojo.forEach(_172.split(/\s*,\s*/), function (_173) {
                        if (_173.indexOf("-") != -1) {
                            var pair = _173.split("-");
                            dijit.setWaiState(_169, pair[0], pair[1]);
                        }
                    });
                }
            }
        },
        startup: function () {
            dojo.forEach(this._startupWidgets, function (w) {
                if (w && !w._started && w.startup) {
                    w.startup();
                }
            });
            this.inherited(arguments);
        },
        destroyRendering: function () {
            dojo.forEach(
                this._attachPoints,
                function (_174) {
                    delete this[_174];
                },
                this
            );
            this._attachPoints = [];
            this.inherited(arguments);
        },
    });
    dijit._Templated._templateCache = {};
    dijit._Templated.getCachedTemplate = function (_175, _176, _177) {
        var _178 = dijit._Templated._templateCache;
        var key = _176 || _175;
        var _179 = _178[key];
        if (_179) {
            try {
                if (!_179.ownerDocument || _179.ownerDocument == dojo.doc) {
                    return _179;
                }
            } catch (e) {}
            dojo.destroy(_179);
        }
        if (!_176) {
            _176 = dojo.cache(_175, { sanitize: true });
        }
        _176 = dojo.string.trim(_176);
        if (_177 || _176.match(/\$\{([^\}]+)\}/g)) {
            return (_178[key] = _176);
        } else {
            var node = dojo._toDom(_176);
            if (node.nodeType != 1) {
                throw new Error("Invalid template: " + _176);
            }
            return (_178[key] = node);
        }
    };
    if (dojo.isIE) {
        dojo.addOnWindowUnload(function () {
            var _17a = dijit._Templated._templateCache;
            for (var key in _17a) {
                var _17b = _17a[key];
                if (typeof _17b == "object") {
                    dojo.destroy(_17b);
                }
                delete _17a[key];
            }
        });
    }
    dojo.extend(dijit._Widget, { dojoAttachEvent: "", dojoAttachPoint: "", waiRole: "", waiState: "" });
}
if (!dojo._hasResource["dijit._Container"]) {
    dojo._hasResource["dijit._Container"] = true;
    dojo.provide("dijit._Container");
    dojo.declare("dijit._Container", null, {
        isContainer: true,
        buildRendering: function () {
            this.inherited(arguments);
            if (!this.containerNode) {
                this.containerNode = this.domNode;
            }
        },
        addChild: function (_17c, _17d) {
            var _17e = this.containerNode;
            if (_17d && typeof _17d == "number") {
                var _17f = this.getChildren();
                if (_17f && _17f.length >= _17d) {
                    _17e = _17f[_17d - 1].domNode;
                    _17d = "after";
                }
            }
            dojo.place(_17c.domNode, _17e, _17d);
            if (this._started && !_17c._started) {
                _17c.startup();
            }
        },
        removeChild: function (_180) {
            if (typeof _180 == "number" && _180 > 0) {
                _180 = this.getChildren()[_180];
            }
            if (_180 && _180.domNode) {
                var node = _180.domNode;
                node.parentNode.removeChild(node);
            }
        },
        getChildren: function () {
            return dojo.query("> [widgetId]", this.containerNode).map(dijit.byNode);
        },
        hasChildren: function () {
            return dojo.query("> [widgetId]", this.containerNode).length > 0;
        },
        destroyDescendants: function (_181) {
            dojo.forEach(this.getChildren(), function (_182) {
                _182.destroyRecursive(_181);
            });
        },
        _getSiblingOfChild: function (_183, dir) {
            var node = _183.domNode,
                _184 = dir > 0 ? "nextSibling" : "previousSibling";
            do {
                node = node[_184];
            } while (node && (node.nodeType != 1 || !dijit.byNode(node)));
            return node && dijit.byNode(node);
        },
        getIndexOfChild: function (_185) {
            return dojo.indexOf(this.getChildren(), _185);
        },
        startup: function () {
            if (this._started) {
                return;
            }
            dojo.forEach(this.getChildren(), function (_186) {
                _186.startup();
            });
            this.inherited(arguments);
        },
    });
}
if (!dojo._hasResource["dijit._Contained"]) {
    dojo._hasResource["dijit._Contained"] = true;
    dojo.provide("dijit._Contained");
    dojo.declare("dijit._Contained", null, {
        getParent: function () {
            var _187 = dijit.getEnclosingWidget(this.domNode.parentNode);
            return _187 && _187.isContainer ? _187 : null;
        },
        _getSibling: function (_188) {
            var node = this.domNode;
            do {
                node = node[_188 + "Sibling"];
            } while (node && node.nodeType != 1);
            return node && dijit.byNode(node);
        },
        getPreviousSibling: function () {
            return this._getSibling("previous");
        },
        getNextSibling: function () {
            return this._getSibling("next");
        },
        getIndexInParent: function () {
            var p = this.getParent();
            if (!p || !p.getIndexOfChild) {
                return -1;
            }
            return p.getIndexOfChild(this);
        },
    });
}
if (!dojo._hasResource["dijit.layout._LayoutWidget"]) {
    dojo._hasResource["dijit.layout._LayoutWidget"] = true;
    dojo.provide("dijit.layout._LayoutWidget");
    dojo.declare("dijit.layout._LayoutWidget", [dijit._Widget, dijit._Container, dijit._Contained], {
        baseClass: "dijitLayoutContainer",
        isLayoutContainer: true,
        postCreate: function () {
            dojo.addClass(this.domNode, "dijitContainer");
            dojo.addClass(this.domNode, this.baseClass);
            this.inherited(arguments);
        },
        startup: function () {
            if (this._started) {
                return;
            }
            this.inherited(arguments);
            var _189 = this.getParent && this.getParent();
            if (!(_189 && _189.isLayoutContainer)) {
                this.resize();
                this.connect(dojo.isIE ? this.domNode : dojo.global, "onresize", function () {
                    this.resize();
                });
            }
        },
        resize: function (_18a, _18b) {
            var node = this.domNode;
            if (_18a) {
                dojo.marginBox(node, _18a);
                if (_18a.t) {
                    node.style.top = _18a.t + "px";
                }
                if (_18a.l) {
                    node.style.left = _18a.l + "px";
                }
            }
            var mb = _18b || {};
            dojo.mixin(mb, _18a || {});
            if (!("h" in mb) || !("w" in mb)) {
                mb = dojo.mixin(dojo.marginBox(node), mb);
            }
            var cs = dojo.getComputedStyle(node);
            var me = dojo._getMarginExtents(node, cs);
            var be = dojo._getBorderExtents(node, cs);
            var bb = (this._borderBox = { w: mb.w - (me.w + be.w), h: mb.h - (me.h + be.h) });
            var pe = dojo._getPadExtents(node, cs);
            this._contentBox = { l: dojo._toPixelValue(node, cs.paddingLeft), t: dojo._toPixelValue(node, cs.paddingTop), w: bb.w - pe.w, h: bb.h - pe.h };
            this.layout();
        },
        layout: function () {},
        _setupChild: function (_18c) {
            dojo.addClass(_18c.domNode, this.baseClass + "-child");
            if (_18c.baseClass) {
                dojo.addClass(_18c.domNode, this.baseClass + "-" + _18c.baseClass);
            }
        },
        addChild: function (_18d, _18e) {
            this.inherited(arguments);
            if (this._started) {
                this._setupChild(_18d);
            }
        },
        removeChild: function (_18f) {
            dojo.removeClass(_18f.domNode, this.baseClass + "-child");
            if (_18f.baseClass) {
                dojo.removeClass(_18f.domNode, this.baseClass + "-" + _18f.baseClass);
            }
            this.inherited(arguments);
        },
    });
    dijit.layout.marginBox2contentBox = function (node, mb) {
        var cs = dojo.getComputedStyle(node);
        var me = dojo._getMarginExtents(node, cs);
        var pb = dojo._getPadBorderExtents(node, cs);
        return { l: dojo._toPixelValue(node, cs.paddingLeft), t: dojo._toPixelValue(node, cs.paddingTop), w: mb.w - (me.w + pb.w), h: mb.h - (me.h + pb.h) };
    };
    (function () {
        var _190 = function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        };
        var size = function (_191, dim) {
            var _192 = _191.resize ? _191.resize(dim) : dojo.marginBox(_191.domNode, dim);
            if (_192) {
                dojo.mixin(_191, _192);
            } else {
                dojo.mixin(_191, dojo.marginBox(_191.domNode));
                dojo.mixin(_191, dim);
            }
        };
        dijit.layout.layoutChildren = function (_193, dim, _194) {
            dim = dojo.mixin({}, dim);
            dojo.addClass(_193, "dijitLayoutContainer");
            _194 = dojo
                .filter(_194, function (item) {
                    return item.layoutAlign != "client";
                })
                .concat(
                    dojo.filter(_194, function (item) {
                        return item.layoutAlign == "client";
                    })
                );
            dojo.forEach(_194, function (_195) {
                var elm = _195.domNode,
                    pos = _195.layoutAlign;
                var _196 = elm.style;
                _196.left = dim.l + "px";
                _196.top = dim.t + "px";
                _196.position = "absolute";
                dojo.addClass(elm, "dijitAlign" + _190(pos));
                if (pos == "top" || pos == "bottom") {
                    size(_195, { w: dim.w });
                    dim.h -= _195.h;
                    if (pos == "top") {
                        dim.t += _195.h;
                    } else {
                        _196.top = dim.t + dim.h + "px";
                    }
                } else {
                    if (pos == "left" || pos == "right") {
                        size(_195, { h: dim.h });
                        dim.w -= _195.w;
                        if (pos == "left") {
                            dim.l += _195.w;
                        } else {
                            _196.left = dim.l + dim.w + "px";
                        }
                    } else {
                        if (pos == "client") {
                            size(_195, dim);
                        }
                    }
                }
            });
        };
    })();
}
if (!dojo._hasResource["dijit.form._FormWidget"]) {
    dojo._hasResource["dijit.form._FormWidget"] = true;
    dojo.provide("dijit.form._FormWidget");
    dojo.declare("dijit.form._FormWidget", [dijit._Widget, dijit._Templated], {
        baseClass: "",
        name: "",
        alt: "",
        value: "",
        type: "text",
        tabIndex: "0",
        disabled: false,
        intermediateChanges: false,
        scrollOnFocus: true,
        attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, { value: "focusNode", id: "focusNode", tabIndex: "focusNode", alt: "focusNode", title: "focusNode" }),
        postMixInProperties: function () {
            this.nameAttrSetting = this.name ? "name='" + this.name + "'" : "";
            this.inherited(arguments);
        },
        _setDisabledAttr: function (_197) {
            this.disabled = _197;
            dojo.attr(this.focusNode, "disabled", _197);
            if (this.valueNode) {
                dojo.attr(this.valueNode, "disabled", _197);
            }
            dijit.setWaiState(this.focusNode, "disabled", _197);
            if (_197) {
                this._hovering = false;
                this._active = false;
                this.focusNode.setAttribute("tabIndex", "-1");
            } else {
                this.focusNode.setAttribute("tabIndex", this.tabIndex);
            }
            this._setStateClass();
        },
        setDisabled: function (_198) {
            dojo.deprecated("setDisabled(" + _198 + ") is deprecated. Use attr('disabled'," + _198 + ") instead.", "", "2.0");
            this.attr("disabled", _198);
        },
        _onFocus: function (e) {
            if (this.scrollOnFocus) {
                dijit.scrollIntoView(this.domNode);
            }
            this.inherited(arguments);
        },
        _onMouse: function (_199) {
            var _19a = _199.currentTarget;
            if (_19a && _19a.getAttribute) {
                this.stateModifier = _19a.getAttribute("stateModifier") || "";
            }
            if (!this.disabled) {
                switch (_199.type) {
                    case "mouseenter":
                    case "mouseover":
                        this._hovering = true;
                        this._active = this._mouseDown;
                        break;
                    case "mouseout":
                    case "mouseleave":
                        this._hovering = false;
                        this._active = false;
                        break;
                    case "mousedown":
                        this._active = true;
                        this._mouseDown = true;
                        var _19b = this.connect(dojo.body(), "onmouseup", function () {
                            if (this._mouseDown && this.isFocusable()) {
                                this.focus();
                            }
                            this._active = false;
                            this._mouseDown = false;
                            this._setStateClass();
                            this.disconnect(_19b);
                        });
                        break;
                }
                this._setStateClass();
            }
        },
        isFocusable: function () {
            return !this.disabled && !this.readOnly && this.focusNode && dojo.style(this.domNode, "display") != "none";
        },
        focus: function () {
            dijit.focus(this.focusNode);
        },
        _setStateClass: function () {
            var _19c = this.baseClass.split(" ");
            function _19d(_19e) {
                _19c = _19c.concat(
                    dojo.map(_19c, function (c) {
                        return c + _19e;
                    }),
                    "dijit" + _19e
                );
            }
            if (this.checked) {
                _19d("Checked");
            }
            if (this.state) {
                _19d(this.state);
            }
            if (this.selected) {
                _19d("Selected");
            }
            if (this.disabled) {
                _19d("Disabled");
            } else {
                if (this.readOnly) {
                    _19d("ReadOnly");
                } else {
                    if (this._active) {
                        _19d(this.stateModifier + "Active");
                    } else {
                        if (this._focused) {
                            _19d("Focused");
                        }
                        if (this._hovering) {
                            _19d(this.stateModifier + "Hover");
                        }
                    }
                }
            }
            var tn = this.stateNode || this.domNode,
                _19f = {};
            dojo.forEach(tn.className.split(" "), function (c) {
                _19f[c] = true;
            });
            if ("_stateClasses" in this) {
                dojo.forEach(this._stateClasses, function (c) {
                    delete _19f[c];
                });
            }
            dojo.forEach(_19c, function (c) {
                _19f[c] = true;
            });
            var _1a0 = [];
            for (var c in _19f) {
                _1a0.push(c);
            }
            tn.className = _1a0.join(" ");
            this._stateClasses = _19c;
        },
        compare: function (val1, val2) {
            if (typeof val1 == "number" && typeof val2 == "number") {
                return isNaN(val1) && isNaN(val2) ? 0 : val1 - val2;
            } else {
                if (val1 > val2) {
                    return 1;
                } else {
                    if (val1 < val2) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        },
        onChange: function (_1a1) {},
        _onChangeActive: false,
        _handleOnChange: function (_1a2, _1a3) {
            this._lastValue = _1a2;
            if (this._lastValueReported == undefined && (_1a3 === null || !this._onChangeActive)) {
                this._resetValue = this._lastValueReported = _1a2;
            }
            if ((this.intermediateChanges || _1a3 || _1a3 === undefined) && (typeof _1a2 != typeof this._lastValueReported || this.compare(_1a2, this._lastValueReported) != 0)) {
                this._lastValueReported = _1a2;
                if (this._onChangeActive) {
                    if (this._onChangeHandle) {
                        clearTimeout(this._onChangeHandle);
                    }
                    this._onChangeHandle = setTimeout(
                        dojo.hitch(this, function () {
                            this._onChangeHandle = null;
                            this.onChange(_1a2);
                        }),
                        0
                    );
                }
            }
        },
        create: function () {
            this.inherited(arguments);
            this._onChangeActive = true;
            this._setStateClass();
        },
        destroy: function () {
            if (this._onChangeHandle) {
                clearTimeout(this._onChangeHandle);
                this.onChange(this._lastValueReported);
            }
            this.inherited(arguments);
        },
        setValue: function (_1a4) {
            dojo.deprecated("dijit.form._FormWidget:setValue(" + _1a4 + ") is deprecated.  Use attr('value'," + _1a4 + ") instead.", "", "2.0");
            this.attr("value", _1a4);
        },
        getValue: function () {
            dojo.deprecated(this.declaredClass + "::getValue() is deprecated. Use attr('value') instead.", "", "2.0");
            return this.attr("value");
        },
    });
    dojo.declare("dijit.form._FormValueWidget", dijit.form._FormWidget, {
        readOnly: false,
        attributeMap: dojo.delegate(dijit.form._FormWidget.prototype.attributeMap, { value: "", readOnly: "focusNode" }),
        _setReadOnlyAttr: function (_1a5) {
            this.readOnly = _1a5;
            dojo.attr(this.focusNode, "readOnly", _1a5);
            dijit.setWaiState(this.focusNode, "readonly", _1a5);
            this._setStateClass();
        },
        postCreate: function () {
            if (dojo.isIE < 9 || (dojo.isIE && dojo.isQuirks)) {
                this.connect(this.focusNode || this.domNode, "onkeydown", this._onKeyDown);
            }
            if (this._resetValue === undefined) {
                this._resetValue = this.value;
            }
        },
        _setValueAttr: function (_1a6, _1a7) {
            this.value = _1a6;
            this._handleOnChange(_1a6, _1a7);
        },
        _getValueAttr: function () {
            return this._lastValue;
        },
        undo: function () {
            this._setValueAttr(this._lastValueReported, false);
        },
        reset: function () {
            this._hasBeenBlurred = false;
            this._setValueAttr(this._resetValue, true);
        },
        _onKeyDown: function (e) {
            if (e.keyCode == dojo.keys.ESCAPE && !(e.ctrlKey || e.altKey || e.metaKey)) {
                var te;
                if (dojo.isIE) {
                    e.preventDefault();
                    te = document.createEventObject();
                    te.keyCode = dojo.keys.ESCAPE;
                    te.shiftKey = e.shiftKey;
                    e.srcElement.fireEvent("onkeypress", te);
                }
            }
        },
        _layoutHackIE7: function () {
            if (dojo.isIE == 7) {
                var _1a8 = this.domNode;
                var _1a9 = _1a8.parentNode;
                var _1aa = _1a8.firstChild || _1a8;
                var _1ab = _1aa.style.filter;
                while (_1a9 && _1a9.clientHeight == 0) {
                    _1a9._disconnectHandle = this.connect(
                        _1a9,
                        "onscroll",
                        dojo.hitch(this, function (e) {
                            this.disconnect(_1a9._disconnectHandle);
                            _1a9.removeAttribute("_disconnectHandle");
                            _1aa.style.filter = new Date().getMilliseconds();
                            setTimeout(function () {
                                _1aa.style.filter = _1ab;
                            }, 0);
                        })
                    );
                    _1a9 = _1a9.parentNode;
                }
            }
        },
    });
}
if (!dojo._hasResource["dijit.dijit"]) {
    dojo._hasResource["dijit.dijit"] = true;
    dojo.provide("dijit.dijit");
}
