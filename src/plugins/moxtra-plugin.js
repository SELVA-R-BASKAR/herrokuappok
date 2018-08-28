// ver. 021518
"undefined" == typeof JSON && moxo_loadScript("json.js", null);
var JSONfn = JSONfn || {};
JSONfn.stringify = function(e) {
    return JSON.stringify(e, function(e, t) {
        if ("function" == typeof t) {
            var o = t.toString();
            return -1 != o.indexOf("[native code]") ? "" : o
        }
        return t
    })
}, JSONfn.parse = function(str) {
    return JSON.parse(str, function(key, value) {
        return "string" != typeof value ? value : "function" == value.substring(0, 8) ? eval("(" + value + ")") : value
    })
};
var Moxtra_Session = Moxtra_Session || {};
Moxtra_Session.set = function(e, t) {
    if (window.sessionStorage) {
        var o = JSONfn.stringify(t);
        sessionStorage.setItem(e, o)
    }
}, Moxtra_Session.get = function(e) {
    if (window.sessionStorage) {
        var t = sessionStorage.getItem(e);
        return t ? JSONfn.parse(t) : null
    }
}, Moxtra_Session.remove = function(e) {
    if (window.sessionStorage) sessionStorage.removeItem(e)
}, Moxtra_Session.clear = function() {
    window.sessionStorage && sessionStorage.clear()
};
var Moxtra = Moxtra || {};
Moxtra.baseUrl = "https://www.moxtra.com", Moxtra.ssoUrl = Moxtra.baseUrl + "/sp/startSSO", Moxtra.version = "/service";
var htmlEvents = {
    onload: 1,
    onunload: 1,
    onblur: 1,
    onchange: 1,
    onfocus: 1,
    onreset: 1,
    onselect: 1,
    onsubmit: 1,
    onabort: 1,
    onkeydown: 1,
    onkeypress: 1,
    onkeyup: 1,
    onclick: 1,
    ondblclick: 1,
    onmousedown: 1,
    onmousemove: 1,
    onmouseout: 1,
    onmouseover: 1,
    onmouseup: 1
};

function eventFire(e, t) {
    if (e.fireEvent) e.fireEvent("on" + t);
    else {
        var o = document.createEvent("Event");
        o.initEvent(t, !1, !1), e.dispatchEvent(o)
    }
}

function moxo_triggerEvent(e, t) {
    var o;
    document.createEvent ? (o = document.createEvent("Event")).initEvent(t, !1, !1) : document.createEventObject && ((o = document.createEventObject()).eventType = t), o.eventName = t, e.dispatchEvent ? e.dispatchEvent(o) : e.fireEvent && htmlEvents["on" + t] ? e.fireEvent("on" + o.eventType, o) : e[t] ? e[t]() : e["on" + t] && e["on" + t]()
}

function moxo_install(e) {
    for (var t = e.target; void 0 === t.href;) t = t.parentNode;
    var o = {
        Moxo: {
            URL: e.target.href,
            toString: function() {
                return this.URL
            }
        }
    };
    return InstallTrigger.install(o), !1
}

function moxo_downloadURI(e, t) {
    var o = Moxtra._createHiddenIframe(e);
    document.body.appendChild(o)
}

function moxo_loadScript(e, t) {
    var o = document.createElement("script");
    o.type = "text/javascript", o.readyState ? o.onreadystatechange = function() {
        "loaded" != o.readyState && "complete" != o.readyState || (o.onreadystatechange = null, t && "function" == typeof t && t())
    } : o.onload = function() {
        t && "function" == typeof t && t()
    }, o.src = e, document.getElementsByTagName("head")[0].appendChild(o)
}

function m_r(e) {
    /in/.test(document.readyState) ? setTimeout("m_r(" + e + ")", 9) : e()
}
Moxtra._viewMap = {}, Moxtra._handlerMap = {}, Moxtra._invalidTokenSessionMap = {}, Moxtra._timeMap = {}, Moxtra._auth2faMap = {}, Moxtra.addListener = function(e, t, o) {
        e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && htmlEvents["on" + t] ? e.attachEvent("on" + t, o) : e["on" + t] = o
    }, Moxtra.removeListener = function(e, t, o) {
        e.removeEventListener ? e.removeEventListener(t, o, !1) : e.detachEvent && htmlEvents["on" + t] ? e.detachEvent("on" + t, o) : e["on" + t] = null, console.log("remove handler: " + o)
    }, Moxtra.isIE = function() {
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var e = navigator.userAgent.toLowerCase();
            if (-1 != e.indexOf("msie"))
                if (parseInt(e.split("msie")[1]) < 10) return !0
        }
        return !1
    }, Moxtra._JOINUrl = function(e) {
        return e.joinURL
    }, Moxtra._SSOUrl = function(e, t) {
        var o = "websdk";
        e && e.type && (o = e.type);
        var r, a, i = encodeURIComponent(window.location.protocol + "//" + window.location.host),
            n = !1;
        if (1 == t) {
            if (r = e && e.email ? (r = e && e.refresh_binder_id ? Moxtra.baseUrl + Moxtra.version + "/#meet/" + e.refresh_binder_id + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i : Moxtra.baseUrl + Moxtra.version + "/#api.startMeet?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i) + "&email=" + encodeURIComponent(e.email) : e && e.unique_id ? (r = e && e.refresh_binder_id ? Moxtra.baseUrl + Moxtra.version + "/#meet/" + e.refresh_binder_id + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i : Moxtra.baseUrl + Moxtra.version + "/#api.startMeet?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i) + "&unique_id=" + encodeURIComponent(e.unique_id) : e && e.refresh_binder_id ? Moxtra.baseUrl + Moxtra.version + "/#meet/" + e.refresh_binder_id + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i : Moxtra.baseUrl + Moxtra.version + "/#api.startMeet?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.schedule_binder_id ? r = r + "&schedule_binder_id=" + e.schedule_binder_id : e && e.binder_id && (r = r + "&binder_id=" + e.binder_id), e && e.invite_members && (r = r + "&invite_members=" + e.invite_members), e && e.produce_feeds && (r = r + "&produce_feeds=" + e.produce_feeds), e && e.video && (r += "&video=true"), e && e.topic && (r = r + "&topic=" + e.topic), e && e.options) try {
                var d = JSON.stringify(e.options);
                r = r + "&options=" + encodeURIComponent(d)
            } catch (e) {
                console.warn(e.message)
            }
            if (e && e.tags) try {
                var s = JSON.stringify(e.tags);
                r = r + "&tags=" + encodeURIComponent(s)
            } catch (e) {
                console.warn(e.message)
            }
        } else if (2 == t) r = e && e.noterefresh_binder_id ? Moxtra.baseUrl + Moxtra.version + "/#note/" + e.noterefresh_binder_id + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i : Moxtra.baseUrl + Moxtra.version + "/#api.startNote?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.binder_id && (r = r + "&binder_id=" + e.binder_id), e && e.page_index && (r = r + "&page_index=" + e.page_index);
        else if (3 == t) e && e.binder_id ? (r = Moxtra.baseUrl + Moxtra.version + "/#api.chat/" + e.binder_id, e.file_id && (r = r + "/" + e.file_id)) : r = Moxtra.baseUrl + Moxtra.version + "/#api.startChat", r = r + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.binder_id && (e.chat_id ? (r = r + "&seq=" + e.chat_id + "&tab=tab_chat", n = !0) : e.page_id ? (r = r + "&seq=" + e.page_id + "&tab=tab_pages", n = !0) : e.todo_id ? (r = r + "&seq=" + e.todo_id + "&tab=tab_todo", n = !0) : e.file_id && (r += "&tab=tab_pages", n = !0)), e && e.invite_members && (r = r + "&invite_members=" + e.invite_members), e && e.produce_feeds && (r = r + "&produce_feeds=" + e.produce_feeds), e && e.email ? r = r + "&email=" + encodeURIComponent(e.email) : e && e.unique_id && (r = r + "&unique_id=" + encodeURIComponent(e.unique_id)), e && e.binder_name && (r = r + "&binder_name=" + encodeURIComponent(e.binder_name)), !n && e && e.tab && (r = r + "&tab=" + e.tab);
        else if (4 == t) r = Moxtra.baseUrl + Moxtra.version + "/#api.timeline?header=0&client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.binder_id && (r = r + "&binder_id=" + e.binder_id);
        else if (5 == t) {
            if (r = Moxtra.baseUrl + Moxtra.version + "/#api.timeline", e && e.binder_id && (r = r + "/" + e.binder_id, e.file_id && (r = r + "/" + e.file_id)), r = r + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.binder_id && (e.chat_id ? (r = r + "&seq=" + e.chat_id + "&tab=tab_chat", n = !0) : e.page_id ? (r = r + "&seq=" + e.page_id + "&tab=tab_pages", n = !0) : e.todo_id ? (r = r + "&seq=" + e.todo_id + "&tab=tab_todo", n = !0) : e.file_id && (r += "&tab=tab_pages", n = !0)), e && e.invite_members && (r = r + "&invite_members=" + e.invite_members), e && e.filter && (r = r + "&filter=" + e.filter, "category" == e.filter && e.filter_value && (r = r + "&filter_value=" + e.filter_value)), e && e.produce_feeds && (r = r + "&produce_feeds=" + e.produce_feeds), e && e.tags_include) {
                var m = "",
                    c = "";
                e.tags_include instanceof Array ? c = e.tags_include[0] : "string" == typeof e.tags_include && (c = e.tags_include);
                for (var l = c.split(","), _ = 0; _ < l.length; _++) void 0 !== l[_] && (_ > 0 && (m += ","), m += "API_" + l[_]);
                m.length > 0 && (r = r + "&tags_include=" + m)
            }
            if (e && e.tags_exclude) {
                var p = "",
                    x = "";
                e.tags_exclude instanceof Array ? x = e.tags_exclude[0] : "string" == typeof e.tags_exclude && (x = e.tags_exclude);
                var f = x.split(",");
                for (_ = 0; _ < f.length; _++) void 0 !== f[_] && (_ > 0 && (p += ","), p += "API_" + f[_]);
                p.length > 0 && (r = r + "&tags_exclude=" + p)
            }!n && e && e.tab && (r = r + "&tab=" + e.tab)
        } else if (6 == t) r = (r = e && e.binder_id ? Moxtra.baseUrl + Moxtra.version + "/#api.annotate/" + e.binder_id : Moxtra.baseUrl + Moxtra.version + "/#api.startAnnotate") + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.binder_name && (r = r + "&binder_name=" + encodeURIComponent(e.binder_name));
        else if (7 == t) r = Moxtra.baseUrl + Moxtra.version + "/#api.endMeet/" + e.session_key + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i;
        else if (8 == t) r = Moxtra.baseUrl + Moxtra.version + "/#api.video?video=true&client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.videorefresh_session_key ? r = r + "&session_key=" + e.videorefresh_session_key : e && e.session_key && (r = r + "&session_key=" + e.session_key, e && e.invisible && (r = r + "&invisible=" + e.invisible), e && e.user_name && (r = r + "&name=" + encodeURIComponent(e.user_name))), e && e.layout_mode && (r = r + "&mode=" + e.layout_mode);
        else if (9 == t) {
            if (r = Moxtra.baseUrl + Moxtra.version + "/#api.ui.timeline", e && e.binder_id && (r = r + "/" + e.binder_id), r = r + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.filter && (r = r + "&filter=" + e.filter, "category" == e.filter && e.filter_value && (r = r + "&filter_value=" + e.filter_value)), e && e.category && (r = r + "&category=" + e.category), e && e.tags_include) {
                m = "", c = "";
                e.tags_include instanceof Array ? c = e.tags_include[0] : "string" == typeof e.tags_include && (c = e.tags_include);
                for (l = c.split(","), _ = 0; _ < l.length; _++) void 0 !== l[_] && (_ > 0 && (m += ","), m += "API_" + l[_]);
                m.length > 0 && (r = r + "&tags_include=" + m)
            }
            if (e && e.tags_exclude) {
                p = "", x = "";
                e.tags_exclude instanceof Array ? x = e.tags_exclude[0] : "string" == typeof e.tags_exclude && (x = e.tags_exclude);
                for (f = x.split(","), _ = 0; _ < f.length; _++) void 0 !== f[_] && (_ > 0 && (p += ","), p += "API_" + f[_]);
                p.length > 0 && (r = r + "&tags_exclude=" + p)
            }
        } else if (10 == t) r = Moxtra.baseUrl, e && e.binder_id ? (r = r + Moxtra.version + "/#api.ui.binder/" + e.binder_id + "?", e.chat_id && (r = r + "seq=" + e.chat_id + "&")) : r = r + Moxtra.version + "/#api.startChat?view=ui.binder&", e && e.email ? r = r + "email=" + encodeURIComponent(e.email) + "&" : e && e.unique_id && (r = r + "unique_id=" + encodeURIComponent(e.unique_id) + "&"), r = r + "client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i + "&tab=tab_chat";
        else if (11 == t) {
            if (e && e.viewlink_url) return e.viewlink_url + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i + "&tab=tab_pages";
            r = Moxtra.baseUrl + Moxtra.version + "/#api.ui.binder", e && e.binder_id ? (r = r + "/" + e.binder_id + "?", e.page_id && (r = r + "seq=" + e.page_id + "&")) : r += "?", r = r + "client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i + "&tab=tab_pages"
        } else 12 == t ? (r = Moxtra.baseUrl + Moxtra.version + "/#api.ui.binder", e && e.binder_id ? (r = r + "/" + e.binder_id + "?", e.todo_id && (r = r + "seq=" + e.todo_id + "&")) : r += "?", r = r + "client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i + "&tab=tab_todo") : 13 == t ? (r = Moxtra.baseUrl + Moxtra.version + "/#api.data.timeline", e && e.binder_id && (r = r + "/" + e.binder_id), r = r + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i) : 14 == t ? (r = Moxtra.baseUrl + Moxtra.version + "/#api.ui.binder", e && e.binder_id && (r = r + "/" + e.binder_id), r = r + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i + "&tab=tab_meet", e && e.invite_members && (r = r + "&invite_members=" + e.invite_members), e && e.produce_feeds && (r = r + "&produce_feeds=" + e.produce_feeds)) : 15 == t ? (r = (r = Moxtra.baseUrl + Moxtra.version + "/#api.meet.prepare") + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.module && (r = r + "&module=" + e.module), e && e.role && (r = r + "&role=" + e.role)) : 16 == t && (r = (r = Moxtra.baseUrl + Moxtra.version + "/#api.meet.ds") + "?client_id=" + Moxtra.clientId + "&type=" + o + "&origin=" + i, e && e.action && (r = r + "&action=" + e.action), e && e.session_key && (r = r + "&session_key=" + e.session_key));
        if (e && e.extension) try {
            var u = JSON.stringify(e.extension);
            r = r + "&extension=" + encodeURIComponent(u)
        } catch (e) {
            console.warn(e.message)
        }
        return Moxtra._pluginversion && (r = r + "&plugin_version=" + Moxtra._pluginversion), Moxtra._theme && (r = r + "&theme=" + encodeURIComponent(Moxtra._theme)), e && e.access_token ? a = r + "&access_token=" + e.access_token : Moxtra.accessToken ? a = r + "&access_token=" + Moxtra.accessToken : Moxtra.appKey ? Moxtra._barlogin ? a = r : (a = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(r), Moxtra.partnerId ? a += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (a += "&orgid=" + Moxtra.orgId)) : a = e && e.token ? Moxtra.baseUrl + Moxtra.version + "/#login?token=" + encodeURIComponent(e.token) + "&loginUrl=" + encodeURIComponent(e.loginUrl) + "&type=" + o + "&client_id=" + Moxtra.clientId + "&origin=" + i + "&backUrl=" + encodeURIComponent(r) : r, a
    }, Moxtra._padLeft = function(e, t, o) {
        return e.length >= t ? e : Moxtra._padLeft(o + e, t, o || " ")
    }, Moxtra._s4 = function(e) {
        var t = e.toString(16);
        return Moxtra._padLeft(t, 4, "0")
    }, Moxtra._cryptoGuid = function() {
        var e = new window.Uint16Array(8);
        return window.crypto.getRandomValues(e), [Moxtra._s4(e[0]) + Moxtra._s4(e[1]), Moxtra._s4(e[2]), Moxtra._s4(e[3]), Moxtra._s4(e[4]), Moxtra._s4(e[5]) + Moxtra._s4(e[6]) + Moxtra._s4(e[7])].join("-")
    }, Moxtra._plainGuid = function() {
        var e = (new Date).getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var o = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" === t ? o : 7 & o | 8).toString(16)
        })
    }, Moxtra._guid = function() {
        var e = void 0 !== window.crypto,
            t = void 0 !== window.crypto.getRandomValues;
        return e && t ? Moxtra._cryptoGuid() : Moxtra._plainGuid()
    }, Moxtra._parseURL = function(e) {
        for (var t, o = /[?#&]([^=#]+)=([^&#]*)/g, r = {}; t = o.exec(e);) r[t[1]] = t[2];
        return r
    }, Moxtra._browserSpecs = function() {
        var e, t = navigator.userAgent,
            o = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return /trident/i.test(o[1]) ? {
            name: "IE",
            version: (e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || ""
        } : "Chrome" === o[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/)) ? {
            name: e[1].replace("OPR", "Opera"),
            version: e[2]
        } : (o = o[2] ? [o[1], o[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && o.splice(1, 1, e[1]), {
            name: o[0],
            version: o[1]
        })
    }, Moxtra._OSInfo = function() {
        return {
            init: function() {
                return this.searchString(this.dataOS)
            },
            searchString: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var o = e[t].string,
                        r = e[t].prop;
                    if (o) {
                        if (-1 != o.indexOf(e[t].subString)) return e[t].identity
                    } else if (r) return e[t].identity
                }
            },
            dataOS: [{
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            }, {
                string: navigator.platform,
                subString: "Mac",
                identity: "macOS"
            }, {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }]
        }.init()
    }, Moxtra._handleMessageFromChatEvent = function(e, t) {
        switch (e.action) {
            case "end":
            case "leave_as_ended":
                return Moxtra._popupbychat && (Moxtra.isIE() ? (Moxtra._popupbychat.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._popupbychat)) : Moxtra._popupbychat.close()), Moxtra._popupbychat = null, "function" == typeof t.end ? t.end(e) : "function" == typeof t.end_meet ? t.end_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetEnd", !1, !1), Moxtra._meet.dispatchEvent(m)), !0;
            case "leave":
                return Moxtra._popupbychat && (Moxtra.isIE() ? (Moxtra._popupbychat.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._popupbychat)) : Moxtra._popupbychat.close()), Moxtra._popupbychat = null, "function" == typeof t.exit ? t.exit(e) : "function" == typeof t.exit_meet ? t.exit_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetExit", !1, !1), Moxtra._meet.dispatchEvent(m)), !0;
            case "save_note":
                return Moxtra._notepopupbychat && (Moxtra.isIE() ? (Moxtra._notepopupbychat.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._notepopupbychat)) : Moxtra._notepopupbychat.close()), Moxtra._notepopupbychat = null, "function" == typeof t.save_note ? t.save_note(e) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteSave", !1, !1), m.destination_binder_id = e.destination_binder_id, m.download_url = e.download_url, m.share_url = e.share_url, Moxtra._note.dispatchEvent(m)), !0;
            case "cancel_note":
                return Moxtra._notepopupbychat && (Moxtra.isIE() ? (Moxtra._notepopupbychat.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._notepopupbychat)) : Moxtra._notepopupbychat.close()), Moxtra._notepopupbychat = null, "function" == typeof t.cancel ? t.cancel(e) : "function" == typeof t.cancel_note ? t.cancel_note(e) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteCancel", !1, !1), Moxtra._note.dispatchEvent(m)), !0;
            case "invalidToken":
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            default:
                return Moxtra._handleMessageEvent(e, t)
        }
    }, Moxtra._handleViewMessageEvent = function(e, t, o) {
        switch (e.action) {
            case "fail":
                return "chat" === o ? "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.chat && (Moxtra._analytics(t.binder_id ? "open_chat" : "create_chat", Moxtra._timeMap.chat, e.error_code), delete Moxtra._timeMap.chat) : "page" === o ? "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.page && (Moxtra._analytics("start_page", Moxtra._timeMap.page, e.error_code), delete Moxtra._timeMap.page) : "todo" === o ? "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.todo && (Moxtra._analytics("start_todo", Moxtra._timeMap.todo, e.error_code), delete Moxtra._timeMap.todo) : "timeline" === o ? "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.timeline && (Moxtra._analytics("start_timeline", Moxtra._timeMap.timeline, e.error_code), delete Moxtra._timeMap.timeline) : "meet" === o && "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.meetview && (Moxtra._analytics("start_meetview", Moxtra._timeMap.meetview, e.error_code), delete Moxtra._timeMap.meetview), "function" == typeof t.error && (t.error(e), !1);
            case "view":
                return "chat" === o ? "function" == typeof t.start_chat && ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.chat && (Moxtra._analytics(t.binder_id ? "open_chat" : "create_chat", Moxtra._timeMap.chat, 200), delete Moxtra._timeMap.chat), t.start_chat(e)) : "page" === o ? "function" == typeof t.start_page && ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.page && (Moxtra._analytics("start_page", Moxtra._timeMap.page, 200), delete Moxtra._timeMap.page), t.start_page(e)) : "todo" === o ? "function" == typeof t.start_todo && ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.todo && (Moxtra._analytics("start_todo", Moxtra._timeMap.todo, 200), delete Moxtra._timeMap.todo), t.start_todo(e)) : "meet" === o ? "function" == typeof t.start_meetview && ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.meetview && (Moxtra._analytics("start_meetview", Moxtra._timeMap.meetview, 200), delete Moxtra._timeMap.meetview), t.start_meetview(e)) : "timeline" === o && "function" == typeof t.view_binder && t.view_binder(e), !1;
            case "view_share_link":
                return "function" == typeof t.view_share_link && t.view_share_link(e), !1;
            case "request_view_binder":
                return "function" == typeof t.request_view_binder && t.request_view_binder(e), !1;
            case "view_binder_page":
                return "function" == typeof t.view_binder_page && t.view_binder_page(e), !1;
            case "list":
                return "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.timeline && (Moxtra._analytics("start_timeline", Moxtra._timeMap.timeline, 200), delete Moxtra._timeMap.timeline), "function" == typeof t.start_timeline && t.start_timeline(e), !1;
            case "request_open_webnote":
                return "function" == typeof t.request_open_webnote && t.request_open_webnote(e), !1;
            case "request_close_webnote":
                return "function" == typeof t.request_close_webnote && t.request_close_webnote(e), !1;
            case "request_note":
                return t.autostart_note ? (t.from_chat = !0, t.iframe = !1, t.binder_id = e.binder_id, t.page_index = e.page_index, Moxtra.note(t)) : "function" == typeof t.request_note && t.request_note(e), !1;
            case "share":
                return "function" == typeof t.share && t.share(e), !1;
            case "invalidToken":
                var r;
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (r = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (r.removeChild(t.handle_iframe), t.handle_iframe = null), r || t.handle_iframe && (document.body.removeChild(t.handle_iframe), t.handle_iframe = null);
                    else t.handle_popup && (Moxtra.isIE() ? (t.handle_popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(t.handle_popup)) : t.handle_popup.close(), t.handle_popup = null);
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            case "feed_update_self":
                return "function" == typeof t.publish_feed && t.publish_feed(e), !1;
            case "feed_update":
                return "function" == typeof t.receive_feed && t.receive_feed(e), !1;
            case "request_view_member":
                return "chat" === o && "function" == typeof t.request_view_member && t.request_view_member(e), !1;
            case "request_meet":
                return t.autostart_meet ? (t.binder_id = e.binder_id, t.iframe = !1, Moxtra.meet(t)) : "function" == typeof t.request_meet && t.request_meet(e), !1;
            case "need_install_firefox_extension":
                return moxo_downloadURI(e.download_url, "download extension"), !1;
            case "auth_2fa_request":
                return "function" == typeof t.auth_2fa_request && (Moxtra._auth2faMap[e.request_id] = t, t.auth_2fa_request(e)), !1;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1;
                if ("meet" === o && t.autostart_meet) return Moxtra._handleMessageEvent(e, t)
        }
        if (t.extension && t.extension.menus && t.extension.menus[0].add_page)
            for (var a = 0; a < t.extension.menus[0].add_page.length; a++) {
                var i = t.extension.menus[0].add_page[a];
                if (e.action == i.menu_name) {
                    "function" == typeof t.add_page ? t.add_page(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent(i.menu_name, !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, window.dispatchEvent(m));
                    break
                }
            }
        if (t.extension && t.extension.menus && t.extension.menus[0].page_action)
            for (a = 0; a < t.extension.menus[0].page_action.length; a++) {
                i = t.extension.menus[0].page_action[a];
                if (e.action == i.menu_name) {
                    "function" == typeof t.page_action ? t.page_action(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent("page_action", !1, !1), m.action = e.action, m.binder_id = e.binder_id, m.session_id = e.session_id, m.download_url = e.download_url, window.dispatchEvent(m));
                    break
                }
            }
        return !1
    }, Moxtra._handleChatMessageEvent = function(e, t, o) {
        switch (e.action) {
            case "fail":
                return o ? "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.chat && (Moxtra._analytics(t.binder_id ? "open_chat" : "create_chat", Moxtra._timeMap.chat, e.error_code), delete Moxtra._timeMap.chat) : "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.timeline && (Moxtra._analytics("start_timeline", Moxtra._timeMap.timeline, e.error_code), delete Moxtra._timeMap.timeline), "function" == typeof t.error ? (t.error(e), !1) : (o ? Moxtra._chat && document.createEvent && (m = document.createEvent("Event"), m.initEvent("ChatError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._chat.dispatchEvent(m)) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("TimelineError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._timeline.dispatchEvent(m)), !1);
            case "view":
                return o ? ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.chat && (Moxtra._analytics(t.binder_id ? "open_chat" : "create_chat", Moxtra._timeMap.chat, 200), delete Moxtra._timeMap.chat), "function" == typeof t.start_chat ? t.start_chat(e) : Moxtra._chat && document.createEvent && (m = document.createEvent("Event"), m.initEvent("ChatStart", !1, !1), m.binder_id = e.binder_id, m.session_id = e.session_id, Moxtra._chat.dispatchEvent(m))) : "function" == typeof t.view_binder ? t.view_binder(e) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderView", !1, !1), m.binder_id = e.binder_id, m.session_id = e.session_id, Moxtra._timeline.dispatchEvent(m)), !1;
            case "list":
                return "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.timeline && (Moxtra._analytics("start_timeline", Moxtra._timeMap.timeline, 200), delete Moxtra._timeMap.timeline), "function" == typeof t.start_timeline ? t.start_timeline(e) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("TimelineStart", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), !1;
            case "create_binder":
                return "function" == typeof t.create_binder ? t.create_binder(e) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderCreate", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), !1;
            case "delete_binder":
                return "function" == typeof t.delete_binder ? t.delete_binder(e) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderDelete", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), !1;
            case "leave_binder":
                return "function" == typeof t.leave_binder ? t.leave_binder(e) : (Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderUserLeave", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), Moxtra._chat && document.createEvent && (m.initEvent("BinderUserLeave", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._chat.dispatchEvent(m))), !1;
            case "remove_binder_user":
                return "function" == typeof t.remove_binder_user ? t.remove_binder_user(e) : (Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderUserRemove", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), Moxtra._chat && document.createEvent && (m.initEvent("BinderUserRemove", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._chat.dispatchEvent(m))), !1;
            case "request_meet":
                return t.autostart_meet ? (t.binder_id = e.binder_id, t.from_chat = !0, t.iframe = !1, Moxtra.meet(t)) : "function" == typeof t.request_meet ? t.request_meet(e) : o ? Moxtra._chat && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetRequest", !1, !1), m.binder_id = e.binder_id, Moxtra._chat.dispatchEvent(m)) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetRequest", !1, !1), m.binder_id = e.binder_id, Moxtra._timeline.dispatchEvent(m)), !1;
            case "request_note":
                return t.autostart_note ? (t.from_chat = !0, t.iframe = !1, t.binder_id = e.binder_id, t.page_index = e.page_index, Moxtra.note(t)) : "function" == typeof t.request_note ? t.request_note(e) : o ? Moxtra._chat && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteRequest", !1, !1), Moxtra._chat.dispatchEvent(m)) : Moxtra._timeline && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteRequest", !1, !1), Moxtra._timeline.dispatchEvent(m)), !1;
            case "invite":
                return "function" == typeof t.invite_member ? t.invite_member(e) : (Moxtra._chat || Moxtra._timeline) && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MemberInvite", !1, !1), m.binder_id = e.binder_id, Moxtra._chat ? Moxtra._chat.dispatchEvent(m) : Moxtra._timeline.dispatchEvent(m)), !1;
            case "share":
                return "function" == typeof t.share && t.share(e), !1;
            case "request_join_meet":
                return "function" == typeof t.request_join_meet && t.request_join_meet(e), !1;
            case "invalidToken":
                var r;
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (r = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (r.removeChild(t.handle_iframe), t.handle_iframe = null), r || t.handle_iframe && (document.body.removeChild(t.handle_iframe), t.handle_iframe = null);
                    else t.handle_popup && (Moxtra.isIE() ? (t.handle_popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(t.handle_popup)) : t.handle_popup.close(), t.handle_popup = null);
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            case "feed_update_self":
                return "function" == typeof t.publish_feed && t.publish_feed(e), !1;
            case "feed_update":
                return "function" == typeof t.receive_feed && t.receive_feed(e), !1;
            case "auth_2fa_request":
                return "function" == typeof t.auth_2fa_request && (Moxtra._auth2faMap[e.request_id] = t, t.auth_2fa_request(e)), !1;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1
        }
        if (t.extension && t.extension.menus && t.extension.menus[0].add_page)
            for (var a = 0; a < t.extension.menus[0].add_page.length; a++) {
                var i = t.extension.menus[0].add_page[a];
                if (e.action == i.menu_name) {
                    "function" == typeof t.add_page ? t.add_page(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent(i.menu_name, !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, window.dispatchEvent(m));
                    break
                }
            }
        if (t.extension && t.extension.menus && t.extension.menus[0].page_action)
            for (a = 0; a < t.extension.menus[0].page_action.length; a++) {
                i = t.extension.menus[0].page_action[a];
                if (e.action == i.menu_name) {
                    "function" == typeof t.page_action ? t.page_action(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent("page_action", !1, !1), m.action = e.action, m.binder_id = e.binder_id, m.session_id = e.session_id, m.download_url = e.download_url, window.dispatchEvent(m));
                    break
                }
            }
        return !1
    }, Moxtra._handleMessageEvent = function(e, t) {
        switch (e.action) {
            case "start":
            case "join":
                if (Moxtra.session_key = e.session_key, Moxtra.meet_id = e.meet_id, Moxtra.session_id = e.session_id, Moxtra.joinURL = Moxtra.getJoinMeetURL(e.session_key ? e.session_key : e.meet_id, t.user_name, "websdk", t), t.iframe && !0 === t.iframe ? t.no_refresh || t.from_chat || (t.refresh_binder_id = e.binder_id, t.session_key = e.session_key, Moxtra_Session.set("meet_refresh", t)) : Moxtra_Session.remove("meet_refresh"), "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.meet) {
                    var o = "start" == e.action ? "start_meet" : "join_meet";
                    Moxtra._analytics(o, Moxtra._timeMap.meet, 200), delete Moxtra._timeMap.meet
                }
                return "function" == typeof t.success ? t.success(e) : "function" == typeof t.start_meet ? t.start_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetSuccess", !1, !1), m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._meet.dispatchEvent(m)), !1;
            case "resume_meet":
                return Moxtra.session_key = e.session_key, Moxtra.meet_id = e.meet_id, "function" == typeof t.resume_meet ? t.resume_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetResume", !1, !1), m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._meet.dispatchEvent(m)), !1;
            case "end":
            case "leave_as_ended":
                if (t)
                    if (t.iframe && !0 === t.iframe && Moxtra._iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && a.removeChild(Moxtra._iframe), a || document.body.removeChild(Moxtra._iframe), Moxtra._iframe = null;
                    else Moxtra._popup && (Moxtra.isIE() ? (Moxtra._popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._popup)) : Moxtra._popup.close()), Moxtra._popup = null;
                return Moxtra.session_id = null, Moxtra.session_key = null, Moxtra_Session.remove("meet_refresh"), "function" == typeof t.end ? t.end(e) : "function" == typeof t.end_meet ? t.end_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetEnd", !1, !1), Moxtra._meet.dispatchEvent(m)), !0;
            case "leave":
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && a.removeChild(Moxtra._iframe), a || document.body.removeChild(Moxtra._iframe), Moxtra._iframe = null;
                    else Moxtra._popup && (Moxtra.isIE() ? (Moxtra._popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._popup)) : Moxtra._popup.close()), Moxtra._popup = null;
                return Moxtra.session_id = null, Moxtra.session_key = null, Moxtra_Session.remove("meet_refresh"), "function" == typeof t.exit ? t.exit(e) : "function" == typeof t.exit_meet ? t.exit_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetExit", !1, !1), Moxtra._meet.dispatchEvent(m)), !0;
            case "invite":
                return e.session_key ? "function" == typeof t.invite ? t.invite(e) : "function" == typeof t.invite_meet ? t.invite_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetInvite", !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._meet.dispatchEvent(m)) : "function" == typeof t.invite_member ? t.invite_member(e) : (Moxtra._chat || Moxtra._timeline) && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MemberInvite", !1, !1), m.binder_id = e.binder_id, Moxtra._chat ? Moxtra._chat.dispatchEvent(m) : Moxtra._timeline.dispatchEvent(m)), !1;
            case "invited":
                return "function" == typeof t.invited ? t.invited(e) : "function" == typeof t.invited_meet ? t.invited_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MemberInvited", !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._meet.dispatchEvent(m)), !1;
            case "save":
                return "function" == typeof t.save ? t.save(e) : "function" == typeof t.save_meet ? t.save_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetSaved", !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._meet.dispatchEvent(m)), !1;
            case "share":
                return "function" == typeof t.share && t.share(e), !1;
            case "start_note":
                return t.from_chat || (t.noterefresh_binder_id = e.binder_id, Moxtra_Session.set("note_refresh", t)), "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.note && (Moxtra._analytics("start_clip", Moxtra._timeMap.note, 200), delete Moxtra._timeMap.note), "function" == typeof t.start_note ? t.start_note(e) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteStart", !1, !1), m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, Moxtra._note.dispatchEvent(m)), !1;
            case "save_note":
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && a.removeChild(Moxtra._noteiframe), a || document.body.removeChild(Moxtra._noteiframe), Moxtra._noteiframe = null;
                    else Moxtra._notepopup && (Moxtra.isIE() ? (Moxtra._notepopup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._notepopup)) : Moxtra._notepopup.close()), Moxtra._notepopup = null;
                return Moxtra_Session.remove("note_refresh"), "function" == typeof t.save_note ? t.save_note(e) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteSave", !1, !1), m.destination_binder_id = e.destination_binder_id, m.download_url = e.download_url, m.share_url = e.share_url, Moxtra._note.dispatchEvent(m)), !0;
            case "fail":
                var r = !1;
                if ("https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.meet ? (Moxtra._analytics("start_meet", Moxtra._timeMap.meet, e.error_code), delete Moxtra._timeMap.meet, r = !0) : "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.note ? (Moxtra._analytics("start_clip", Moxtra._timeMap.note, e.error_code), delete Moxtra._timeMap.note) : "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.annotate && (Moxtra._analytics("start_annotation", Moxtra._timeMap.annotate, e.error_code), delete Moxtra._timeMap.annotate), "function" == typeof t.error && (t.error(e), r)) {
                    if (412 == t.error_code || 404 == t.error_code) {
                        if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && a.removeChild(Moxtra._iframe), a || document.body.removeChild(Moxtra._iframe), Moxtra._iframe = null;
                        else Moxtra._popup && (Moxtra.isIE() ? (Moxtra._popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._popup)) : Moxtra._popup.close()), Moxtra._popup = null;
                        return Moxtra.session_id = null, Moxtra.session_key = null, Moxtra_Session.remove("meet_refresh"), "function" == typeof t.exit ? t.exit(e) : "function" == typeof t.exit_meet ? t.exit_meet(e) : Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetExit", !1, !1), Moxtra._meet.dispatchEvent(m)), !0
                    }
                    return !1
                }
                return e.is_chat ? (m = document.createEvent("Event"), m.initEvent("ChatError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._chat.dispatchEvent(m), !1) : (Moxtra.session_id && e.session_id === Moxtra.session_id ? Moxtra._meet && document.createEvent && (m = document.createEvent("Event"), m.initEvent("MeetError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._meet.dispatchEvent(m)) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._note.dispatchEvent(m)), !1);
            case "cancel_note":
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && a.removeChild(Moxtra._noteiframe), a || document.body.removeChild(Moxtra._noteiframe), Moxtra._noteiframe = null;
                    else Moxtra._notepopup && (Moxtra.isIE() ? (Moxtra._notepopup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._notepopup)) : Moxtra._notepopup.close()), Moxtra._notepopup = null;
                return Moxtra_Session.remove("note_refresh"), "function" == typeof t.cancel ? t.cancel(e) : "function" == typeof t.cancel_note ? t.cancel_note(e) : Moxtra._note && document.createEvent && (m = document.createEvent("Event"), m.initEvent("NoteCancel", !1, !1), Moxtra._note.dispatchEvent(m)), !0;
            case "start_annotate":
                return "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.annotate && (Moxtra._analytics("start_annotation", Moxtra._timeMap.annotate, 200), delete Moxtra._timeMap.annotate), "function" == typeof t.start_annotate ? t.start_annotate(e) : Moxtra._annotate && document.createEvent && (m = document.createEvent("Event"), m.initEvent("AnnotateStart", !1, !1), m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._annotate.dispatchEvent(m)), !1;
            case "stop_annotate":
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (a.removeChild(t.handle_iframe), t.handle_iframe = null), a || Moxtra._annotateiframe && (document.body.removeChild(Moxtra._annotateiframe), Moxtra._annotateiframe = null);
                    else t.handle_popup && (Moxtra.isIE() ? (t.handle_popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(t.handle_popup)) : t.handle_popup.close(), t.handle_popup = null);
                return "function" == typeof t.stop_annotate ? t.stop_annotate(e) : Moxtra._annotate && document.createEvent && (m = document.createEvent("Event"), m.initEvent("AnnotateStop", !1, !1), m.download_url = e.download_url, m.share_url = e.share_url, m.binder_id = e.binder_id, Moxtra._annotate.dispatchEvent(m)), !0;
            case "invalidToken":
                var a;
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (a = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (a.removeChild(t.handle_iframe), t.handle_iframe = null), a || Moxtra._annotateiframe && (document.body.removeChild(Moxtra._annotateiframe), Moxtra._annotateiframe = null);
                    else t.handle_popup && (Moxtra.isIE() ? (t.handle_popup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(t.handle_popup)) : t.handle_popup.close(), t.handle_popup = null);
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            case "need_install_firefox_extension":
                return moxo_downloadURI(e.download_url, "download extension"), !1;
            case "message":
                return Moxtra._handleReceiveMessage && "function" == typeof Moxtra._handleReceiveMessage && Moxtra._handleReceiveMessage(e), !1;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1
        }
        if (t.extension && t.extension.menus && t.extension.menus[0].add_page)
            for (var i = 0; i < t.extension.menus[0].add_page.length; i++) {
                var n = t.extension.menus[0].add_page[i];
                if (e.action == n.menu_name) {
                    "function" == typeof t.add_page ? t.add_page(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent(n.menu_name, !1, !1), m.binder_id = e.binder_id, m.session_key = e.session_key, m.meet_id = e.meet_id, m.session_id = e.session_id, window.dispatchEvent(m));
                    break
                }
            }
        if (t.extension && t.extension.menus && t.extension.menus[0].page_action)
            for (i = 0; i < t.extension.menus[0].page_action.length; i++) {
                n = t.extension.menus[0].page_action[i];
                if (e.action == n.menu_name) {
                    "function" == typeof t.page_action ? t.page_action(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent("page_action", !1, !1), m.action = e.action, m.binder_id = e.binder_id, m.session_id = e.session_id, m.download_url = e.download_url, window.dispatchEvent(m));
                    break
                }
            }
        return !1
    }, Moxtra._handleDSMessageEvent = function(e, t) {
        switch (e.action) {
            case "invalidToken":
                return t.tagid4iframe && ((o = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (o.removeChild(t.handle_iframe), t.handle_iframe = null), delete Moxtra._meetScreenShareTag), o || t.handle_iframe && (document.body.removeChild(t.handle_iframe), t.handle_iframe = null, delete Moxtra._meetScreenShareiframe), Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            case "env_ready":
            case "browser_unsupported":
            case "os_unsupported":
            case "need_extension":
            case "need_plugin":
                return Moxtra._meetPrepareiframe && (document.body.removeChild(Moxtra._meetPrepareiframe), delete Moxtra._meetPrepareiframe), "function" == typeof t[e.action] && t[e.action](e), !0;
            case "start_screen_share":
                return Moxtra.ds_session_key = e.session_key, Moxtra.ds_session_id = e.session_id, "function" == typeof t[e.action] && t[e.action](e), !1;
            case "join_screen_share":
                return Moxtra.attds_session_key = e.session_key, Moxtra.attds_session_id = e.session_id, "function" == typeof t[e.action] && t[e.action](e), !1;
            case "fail":
            case "stop_screen_share":
            case "leave_screen_share":
                var o;
                return t.tagid4iframe && ((o = document.getElementById(t.tagid4iframe)) && t.handle_iframe && (o.removeChild(t.handle_iframe), t.handle_iframe = null, delete Moxtra._viewMap[t.tagid4iframe], delete Moxtra._handlerMap[t.tagid4iframe]), delete Moxtra._meetScreenShareTag), o || t.handle_iframe && (document.body.removeChild(t.handle_iframe), t.handle_iframe = null, delete Moxtra._meetScreenShareiframe, delete Moxtra._meetScreenSharefunc), "stop_screen_share" == e.action && (Moxtra.ds_session_key = null, Moxtra.ds_session_id = null), "leave_screen_share" == e.action && (Moxtra.attds_session_key = null, Moxtra.attds_session_id = null), "function" == typeof t[e.action] && t[e.action](e), !0;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1
        }
        if (t.extension && t.extension.menus && t.extension.menus[0].page_action)
            for (var r = 0; r < t.extension.menus[0].page_action.length; r++) {
                var a = t.extension.menus[0].page_action[r];
                if (e.action == a.menu_name) {
                    "function" == typeof t.page_action ? t.page_action(e) : document.createEvent && (m = document.createEvent("Event"), m.initEvent("page_action", !1, !1), m.action = e.action, m.binder_id = e.binder_id, m.session_id = e.session_id, m.download_url = e.download_url, window.dispatchEvent(m));
                    break
                }
            }
        return !1
    }, Moxtra._handleVideoMessageEvent = function(e, t) {
        switch (e.action) {
            case "video_joined":
                return Moxtra.video_session_key = e.session_key, Moxtra.video_access_token = t.access_token, t.no_refresh || (t.videorefresh_session_key = e.session_key, Moxtra_Session.set("video_refresh", t)), "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.video && (Moxtra._analytics("start_video", Moxtra._timeMap.video, 200), delete Moxtra._timeMap.video), "function" == typeof t.start_video ? t.start_video(e) : Moxtra._video && document.createEvent && (m = document.createEvent("Event"), m.initEvent("VideoStart", !1, !1), m.session_key = e.session_key, m.session_id = e.session_id, m.binder_id = e.binder_id, Moxtra._video.dispatchEvent(m)), !1;
            case "end":
            case "leave":
            case "leave_as_ended":
            case "video_left":
                var o;
                if (t)
                    if (t.iframe && !0 === t.iframe) t.tagid4iframe && (o = document.getElementById(t.tagid4iframe)) && o.removeChild(Moxtra._videoiframe), o || document.body.removeChild(Moxtra._videoiframe), Moxtra._videoiframe = null;
                    else Moxtra._videopopup && (Moxtra.isIE() ? (Moxtra._videopopup.contentWindow.postMessage("close", Moxtra.baseUrl), document.body.removeChild(Moxtra._videopopup)) : Moxtra._videopopup.close()), Moxtra._videopopup = null;
                return Moxtra.video_session_key = null, Moxtra.video_access_token = null, Moxtra_Session.remove("video_refresh"), "function" == typeof t.end_video ? t.end_video(e) : Moxtra._video && document.createEvent && (m = document.createEvent("Event"), m.initEvent("VideoEnd", !1, !1), m.session_id = e.session_id, Moxtra._video.dispatchEvent(m)), !0;
            case "video_broadcasted":
                return "function" == typeof t.camera_on ? t.camera_on(e) : Moxtra._video && document.createEvent && (m = document.createEvent("Event"), m.initEvent("CameraOn", !1, !1), m.session_id = e.session_id, Moxtra._video.dispatchEvent(m)), !1;
            case "video_unbroadcasted":
                return "function" == typeof t.camera_off ? t.camera_off(e) : Moxtra._video && document.createEvent && (m = document.createEvent("Event"), m.initEvent("CameraOff", !1, !1), m.session_id = e.session_id, Moxtra._video.dispatchEvent(m)), !1;
            case "fail":
                return "https://www.grouphour.com" == Moxtra.baseUrl && Moxtra._timeMap.video && (Moxtra._analytics("start_video", Moxtra._timeMap.video, e.error_code), delete Moxtra._timeMap.video), "function" == typeof t.error ? (t.error(e), !1) : !!e.is_chat && (m = document.createEvent("Event"), m.initEvent("ChatError", !1, !1), m.error_code = e.error_code, m.error_message = e.error_message, Moxtra._chat.dispatchEvent(m), !1);
            case "invalidToken":
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1
        }
        return !1
    }, Moxtra._handleDataMessageEvent = function(e, t) {
        switch (e.action) {
            case "all_binders":
                return "function" == typeof t.all_binders && t.all_binders(e), !1;
            case "added_binders":
                return "function" == typeof t.added_binders && t.added_binders(e), !1;
            case "updated_binders":
                return "function" == typeof t.updated_binders && t.updated_binders(e), !1;
            case "removed_binders":
                return "function" == typeof t.removed_binders && t.removed_binders(e), !1;
            case "fail":
                return "function" == typeof t.error && t.error(e), !1;
            case "invalidToken":
                return Moxtra._invalidTokenSessionMap[e.session_id] || (Moxtra._invalidTokenSessionMap[e.session_id] = e.session_id, Moxtra._handleInvalidToken && "function" == typeof Moxtra._handleInvalidToken && Moxtra._handleInvalidToken(e)), !0;
            case "feed_update_self":
                return "function" == typeof t.publish_feed && t.publish_feed(e), !1;
            case "feed_update":
                return "function" == typeof t.receive_feed && t.receive_feed(e), !1;
            case "request_view_member":
                return "function" == typeof t.request_view_member && t.request_view_member(e), !1;
            default:
                if ("function" == typeof t[e.action]) return t[e.action](e), !1
        }
        return !1
    }, Moxtra._analytics = function(e, t, o) {
        var r = (new Date).getTime(),
            a = {
                category: "web",
                client_id: Moxtra.clientId,
                api_name: e,
                start_time: t,
                end_time: r,
                status_code: o
            };
        try {
            var i;
            (i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = function() {
                4 == i.readyState && i.status
            }, i.open("POST", "https://api.grouphour.com/sdkae/update", !0), i.setRequestHeader("Content-type", "application/json"), i.send(JSON.stringify(a))
        } catch (e) {}
    }, Moxtra._ajax = function(e, t, o, r, a) {
        var i, n = {};
        if (o)
            for (var d in o) n[d] = o[d];
        (i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = function() {
            4 == i.readyState && (200 == i.status ? r && r(JSON.parse(i.responseText)) : a && a(JSON.parse(i.responseText)))
        }, i.open(e, t, !0), i.setRequestHeader("Content-type", "application/json"), i.send(JSON.stringify(n))
    }, Moxtra._getMembers = function(e, t, o) {
        var r = [];
        Moxtra._ajax("GET", Moxtra.baseUrl + "/board/" + e, null, function(e) {
            var o = e.object.board.users;
            if (o)
                for (var a = 0; a < o.length; a++)
                    if (o[a].user) {
                        var i = {};
                        i.sequence = o[a].sequence, i.id = o[a].user.id, i.name = o[a].user.name, i.email = o[a].user.email, i.email_verified = o[a].user.email_verified, i.first_name = o[a].user.first_name, i.last_name = o[a].user.last_name, r.push(i)
                    }
            t && "function" == typeof t && t(r)
        }, function(e) {
            o && "function" == typeof o && o(e.message)
        })
    }, Moxtra.isBrowserSupported = function() {
        return os = Moxtra._OSInfo(), "Linux" != os && (env = Moxtra._browserSpecs(), "Chrome" == env.name && env.version >= 19 || "Safari" == env.name && env.version >= 6 || "Opera" == env.name && env.version >= 12 || "Firefox" == env.name && env.version >= 12 || "IE" == env.name && env.version >= 9 || !1)
    }, Moxtra.setup = function(e) {
        if (!e) throw "You must pass in options";
        if (e.clientId && (Moxtra.clientId = e.clientId), !Moxtra.clientId) throw "You have to set clientId";
        if (e.base_url) Moxtra.baseUrl = e.base_url;
        else if ("production" === e.mode) Moxtra.baseUrl = "https://www.moxtra.com";
        else if ("sandbox" === e.mode) Moxtra.baseUrl = "https://sandbox.moxtra.com";
        else if ("debug" === e.mode) Moxtra.baseUrl = "https://www.grouphour.com";
        else if ("beta" === e.mode) Moxtra.baseUrl = "https://beta.moxtra.com";
        else {
            if ("local" !== e.mode) return void alert("Please specify mode!");
            Moxtra.baseUrl = window.location.protocol + "//" + window.location.host
        }
        if (!(e && e.uniqueid && e.signature && e.timestamp)) throw "You have to set uniqueid, signature, and timestamp";
        var t;
        t = Moxtra.baseUrl + "/oauthapi/token?client_id=" + Moxtra.clientId + "&uniqueid=" + encodeURIComponent(e.uniqueid) + "&timestamp=" + e.timestamp + "&signature=" + e.signature, e.firstname && (t += "&firstname=" + encodeURIComponent(e.firstname)), e.lastname && (t += "&lastname=" + encodeURIComponent(e.lastname)), e.orgid && (t += "&orgid=" + encodeURIComponent(e.orgid)), e.pictureurl && (t += "&pictureurl=" + encodeURIComponent(e.pictureurl)), e.timezone && (t += "&timezone=" + encodeURIComponent(e.timezone)), e.plancode && (t += "&plancode=" + encodeURIComponent(e.plancode)), e.language && (t += "&language=" + encodeURIComponent(e.language)), e.division && (t += "&division=" + encodeURIComponent(e.division)), e.department && (t += "&department=" + encodeURIComponent(e.department)), e.org_units && (t += "&org_units=" + encodeURIComponent(e.org_units)), jQuery.ajax({
            type: "GET",
            url: t,
            dataType: "jsonp",
            cache: !1,
            jsonpCallback: "verifyme",
            success: function(t, o, r) {
                if (t.access_token) "function" == typeof e.get_accesstoken && e.get_accesstoken(t);
                else if ("error" == t.status && "function" == typeof e.error) {
                    var a = {
                        error_code: "RESPONSE_ERROR"
                    };
                    a.error_message = t.message, e.error(a)
                }
            },
            error: function(t, o, r) {
                if ("function" == typeof e.error) {
                    var a = {
                        error_code: "RESPONSE_ERROR"
                    };
                    a.error_message = r, e.error(a)
                }
            }
        })
    }, Moxtra.logout = function() {
        Moxtra.baseUrl.indexOf("grouphour.com") >= 0 ? (document.cookie = "c_user=; path=/; domain=www.grouphour.com; expires=" + new Date(0).toUTCString(), document.cookie = "token=; path=/; domain=www.grouphour.com; expires=" + new Date(0).toUTCString(), document.cookie = "sessionid=; path=/; domain=www.grouphour.com; expires=" + new Date(0).toUTCString()) : (document.cookie = "c_user=; path=/; domain=www.moxtra.com; expires=" + new Date(0).toUTCString(), document.cookie = "token=; path=/; domain=www.moxtra.com; expires=" + new Date(0).toUTCString(), document.cookie = "sessionid=; path=/; domain=www.moxtra.com; expires=" + new Date(0).toUTCString())
    }, Moxtra.init = function(e) {
        if (e.base_url) Moxtra.baseUrl = e.base_url;
        else if ("production" === e.mode) Moxtra.baseUrl = "https://www.moxtra.com";
        else if ("sandbox" === e.mode) Moxtra.baseUrl = "https://sandbox.moxtra.com";
        else if ("debug" === e.mode) Moxtra.baseUrl = "https://www.grouphour.com";
        else if ("beta" === e.mode) Moxtra.baseUrl = "https://beta.moxtra.com";
        else {
            if ("local" !== e.mode) return void alert("Please specify mode!");
            Moxtra.baseUrl = window.location.protocol + "//" + window.location.host
        }
        e.sdk_version ? "3" == e.sdk_version ? Moxtra.version = "/service3" : "4" == e.sdk_version ? Moxtra.version = "/service4" : "5" == e.sdk_version ? Moxtra.version = "/service5" : "latest" == e.sdk_version ? Moxtra.version = "/latest" : "2" != e.sdk_version && (console.warn("Please set sdk_version to 2, 3, 4, or 5!"), Moxtra.version = "/service") : Moxtra.version = "/service", e.client_id ? (Moxtra.clientId = e.client_id, e.idp_id && (Moxtra.appKey = e.idp_id), "idpdemo" == Moxtra.appKey ? Moxtra.ssoUrl = Moxtra.baseUrl + "/sp/spdemo" : Moxtra.ssoUrl = Moxtra.baseUrl + "/sp/startSSO", e.partner_id && (Moxtra.partnerId = e.partner_id), e.org_id && (Moxtra.orgId = e.org_id), e.access_token && (Moxtra.accessToken = e.access_token), "function" == typeof e.invalid_token && (Moxtra._handleInvalidToken = e.invalid_token), "function" == typeof e.receive_message && (Moxtra._handleReceiveMessage = e.receive_message), e.plugin_version && (Moxtra._pluginversion = e.plugin_version), e.theme && (Moxtra._theme = e.theme), Moxtra_Session.set("init_refresh", e)) : alert("Please specify client_id!")
    }, Moxtra._createWidgetElement = function(e, t, o, r, a) {
        var i, n;
        return a ? (i = !1 === t.border ? a : a.getElementsByTagName("iframe")[0]).src = e : (i = document.createElement("iframe")).src = e, i.setAttribute("frameborder", "0"), i.setAttribute("allowtransparency", "true"), i.setAttribute("allow", "geolocation; microphone; camera"), t.scroll && (i.style.overflow = "scroll"), i.style.backgroundColor = "transparent", i.style.width = "100%", i.style.height = "100%", !0 === t.iframe && t.tagid4iframe && (n = document.getElementById(t.tagid4iframe)) && ("none" == n.style.display && console.warn("Tag " + t.tagid4iframe + " with 'none' display style might not work in Firefox"), !1 === t.border && (t.iframewidth ? i.style.width = t.iframewidth : i.style.width = o ? "850px" : r ? "330px" : "1024px", t.iframeheight ? i.style.height = t.iframeheight : i.style.height = o ? "500px" : "768px")), i.setAttribute("allowFullScreen", ""), i.setAttribute("webkitAllowFullScreen", ""), i.setAttribute("mozallowfullscreen", ""), i.style.border = "none", t.scroll && (i.style.scrolling = "yes"), i
    }, Moxtra._createSimpleDivElement = function(e, t, o, r) {
        var a = document.createElement("div");
        return e.iframewidth ? a.style.width = e.iframewidth : a.style.width = o, e.iframeheight ? a.style.height = e.iframeheight : a.style.height = r, a.style.margin = "10px 0px", a.style.border = "1px solid #ACACAC", a.style.boxShadow = "rgba(0, 0, 0, .2) 0px 4px 16px", a.appendChild(t), a
    }, Moxtra._createDivElement = function(e, t, o, r) {
        var a = document.createElement("div");
        a.style.left = a.style.right = a.style.top = a.style.bottom = "0px", a.style.zIndex = "1000";
        var i = document.createElement("div");
        i.style.left = i.style.right = i.style.top = i.style.bottom = "0px", i.style.backgroundColor = "rgb(160, 160, 160)", i.style.opacity = "0.2", i.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
        var n = Moxtra._createSimpleDivElement(e, t, o, r);
        return a.appendChild(i), a.appendChild(n), a
    }, Moxtra._createHiddenIframe = function(e, t) {
        var o;
        return (o = document.createElement("iframe")).src = e, o.setAttribute("frameborder", "0"), o.style.width = "100%", o.style.height = "0", o.style.border = "none", t && (o.style.cssText = "block !important;" + o.style.cssText), o
    }, Moxtra.joinMeet = function(e) {
        if (!e) throw "You must pass in options";
        var t = "websdk";
        if (e.type && (t = e.type), e.appKey && (Moxtra.appKey = e.appKey), e.partnerId && (Moxtra.partnerId = e.partnerId), e.orgId && (Moxtra.orgId = e.orgId), e.clientId && (Moxtra.clientId = e.clientId), (e.session_key || e.meet_id) && (e.joinURL = Moxtra.getJoinMeetURL(e.session_key ? e.session_key : e.meet_id, e.user_name, t, e)), !e.joinURL) throw "You must pass in session_key";
        Moxtra.meet(e)
    }, Moxtra.endVideo = function() {
        var e = Moxtra._getMeetURL(!0, !1);
        e && (ef = function() {
            var t = function(e) {
                    e.origin == Moxtra.baseUrl && (Moxtra.removeListener(Moxtra._videohiddeniframe, "message", t), document.body.removeChild(Moxtra._videohiddeniframe), delete Moxtra._videohiddeniframe)
                },
                o = Moxtra._createHiddenIframe(e);
            Moxtra.addListener(o, "message", t), document.body.appendChild(o), Moxtra._videohiddeniframe = o
        }, ef())
    }, Moxtra.leaveVideo = function() {
        var e = Moxtra._getMeetURL(!1, !1);
        e && (ef = function() {
            var t = function(e) {
                    e.origin == Moxtra.baseUrl && (Moxtra.removeListener(Moxtra._videohiddeniframe, "message", t), document.body.removeChild(Moxtra._videohiddeniframe), delete Moxtra._videohiddeniframe)
                },
                o = Moxtra._createHiddenIframe(e);
            Moxtra.addListener(o, "message", t), document.body.appendChild(o), Moxtra._videohiddeniframe = o
        }, ef())
    }, Moxtra.leaveMeet = function() {
        var e = Moxtra._getMeetURL(!1, !0);
        e && (ef = function() {
            var t = function(e) {
                    e.origin == Moxtra.baseUrl && Moxtra._meethiddeniframe && (Moxtra.removeListener(Moxtra._meethiddeniframe, "message", t), document.body.removeChild(Moxtra._meethiddeniframe), delete Moxtra._meethiddeniframe)
                },
                o = Moxtra._createHiddenIframe(e);
            Moxtra.addListener(o, "message", t), document.body.appendChild(o), Moxtra._meethiddeniframe = o
        }, ef())
    }, Moxtra.endMeet = function(e) {
        (e || (e = Moxtra._getMeetURL(!0, !0))) && (ef = function() {
            var t = function(e) {
                    e.origin == Moxtra.baseUrl && Moxtra._hiddeniframe && (Moxtra.removeListener(Moxtra._hiddeniframe, "message", t), document.body.removeChild(Moxtra._hiddeniframe), delete Moxtra._hiddeniframe)
                },
                o = Moxtra._createHiddenIframe(e);
            Moxtra.addListener(o, "message", t), document.body.appendChild(o), Moxtra._hiddeniframe = o
        }, ef())
    }, Moxtra.meet = Moxtra.meet || {}, Moxtra.meet = function(e) {
        var t, o, r, a, i, n, d, s;
        if (!e) throw "You must pass in options";
        Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first");
        var m = Moxtra_Session.get("meet_refresh");
        if (m) {
            if (!e.refresh_binder_id) return
        } else if (Moxtra._iframe) return;
        if (e.joinURL && (Moxtra.joinURL = e.joinURL), e.appKey && (Moxtra.appKey = e.appKey), e.partnerId && (Moxtra.partnerId = e.partnerId), e.orgId && (Moxtra.orgId = e.orgId), e.clientId && (Moxtra.clientId = e.clientId), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        Moxtra._timeMap.meet = (new Date).getTime(), ef = function() {
            var c = function(t) {
                if (t.origin == Moxtra.baseUrl) try {
                    var o = JSON.parse(t.data);
                    (e && e.from_chat && !0 === e.from_chat ? Moxtra._handleMessageFromChatEvent(o, e) : Moxtra._handleMessageEvent(o, e)) && Moxtra.removeListener(window, "message", c)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + t.data)
                }
            };
            if (Moxtra.addListener(window, "message", c), e.iframe && !0 === e.iframe) {
                var l;
                if (s = Moxtra._createWidgetElement(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1), e, !1, !1), e.tagid4iframe) {
                    var _ = function() {
                        if (l = document.getElementById(e.tagid4iframe)) !1 === e.border ? (l.appendChild(s), Moxtra._iframe = s) : (o = Moxtra._createSimpleDivElement(e, s, "1024px", "768px"), l.appendChild(o), Moxtra._iframe = o);
                        else {
                            if (m) return Moxtra_Session.remove("meet_refresh"), void s.remove();
                            !1 === e.border ? (document.body.appendChild(s), Moxtra._iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "1024px", "768px"), document.body.appendChild(a), Moxtra._iframe = a, a.scrollIntoView(!0))
                        }
                    };
                    if (m) {
                        var p = 0;
                        ! function t() {
                            p++;
                            var o = setTimeout(t, 1e3);
                            (document.getElementById(e.tagid4iframe) || 6 === p) && (clearTimeout(o), _())
                        }()
                    } else _()
                } else !1 === e.border ? (document.body.appendChild(s), Moxtra._iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "1024px", "768px"), document.body.appendChild(a), Moxtra._iframe = a, a.scrollIntoView(!0))
            } else {
                if (d = 1024, t = 768, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, !0 === e.from_chat)
                    if (Moxtra.isIE()) {
                        var x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                        x += encodeURIComponent(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1) + "&popup=1"), x += "&name=moxtrabychat&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                        var f = Moxtra._createHiddenIframe(x);
                        document.body.appendChild(f), Moxtra._popupbychat = f
                    } else i = !0 === e.tab ? window.open(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1), "moxtrabychat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0", "_blank") : window.open(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1), "moxtrabychat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._popupbychat = i;
                else if (Moxtra.isIE()) {
                    x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                    x += encodeURIComponent(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1) + "&popup=1"), x += "&name=moxtra&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                    f = Moxtra._createHiddenIframe(x);
                    document.body.appendChild(f), Moxtra._popup = f
                } else i = !0 === e.tab ? window.open(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1), "moxtra", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0", "_blank") : window.open(e.joinURL ? Moxtra._JOINUrl(e) : Moxtra._SSOUrl(e, 1), "moxtra", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._popup = i;
                i && i.focus()
            }
        }, ef()
    }, Moxtra.meet.startRecord = function() {
        var e;
        if (Moxtra._iframe) {
            var t = Moxtra._iframe.getElementsByTagName("iframe")[0];
            t && (e = t.contentWindow)
        } else Moxtra._popup ? e = Moxtra._popup : Moxtra._popupbychat && (e = Moxtra._popupbychat);
        if (!e) throw "Need an in-progress meeting";
        e.postMessage('{"action":"request", "type":"control_recording", "message":"record"}', Moxtra.baseUrl)
    }, Moxtra.meet.pauseRecord = function() {
        var e;
        if (Moxtra._iframe) {
            var t = Moxtra._iframe.getElementsByTagName("iframe")[0];
            t && (e = t.contentWindow)
        } else Moxtra._popup ? e = Moxtra._popup : Moxtra._popupbychat && (e = Moxtra._popupbychat);
        if (!e) throw "Need an in-progress meeting";
        e.postMessage('{"action":"request", "type":"control_recording", "message":"pause"}', Moxtra.baseUrl)
    }, Moxtra.meet.changePresenter = function(e) {
        if (!e) throw "Need a user";
        var t;
        if (Moxtra._iframe) {
            var o = Moxtra._iframe.getElementsByTagName("iframe")[0];
            o && (t = o.contentWindow)
        } else Moxtra._popup ? t = Moxtra._popup : Moxtra._popupbychat && (t = Moxtra._popupbychat);
        if (!t) throw "Need an in-progress meeting";
        var r = '{"action":"request", "type":"change_presenter", "message":"' + e + '"}';
        t.postMessage(r, Moxtra.baseUrl)
    }, Moxtra.postMessage = function(e, t, o, r) {
        if (e && o && t && r) {
            var a, i = document.getElementById(e);
            if (i)
                if (Moxtra._viewMap[e]) {
                    var n = i.getElementsByTagName("iframe")[0];
                    n ? a = n.contentWindow : i = null
                } else i = null;
            if (i) {
                var d = {
                    action: "request",
                    type: "post_binder_comment",
                    message: r,
                    session_id: o,
                    binder_id: t
                };
                try {
                    a.postMessage(JSON.stringify(d), Moxtra.baseUrl)
                } catch (e) {
                    console.warn("post message error: " + e.message)
                }
            } else console.warn("No such iframe in tag: " + e)
        } else console.warn("Invalid input!")
    }, Moxtra.message = Moxtra.message || {}, Moxtra.message.sendAll = function(e) {
        if (!e) throw "You must pass in options";
        if (!Moxtra._iframe && !Moxtra._popup && !Moxtra._popupbychat) throw "You need to start or join a Meet";
        var t = Moxtra._guid(),
            o = {
                action: "message",
                message: e,
                message_id: t,
                delivery_mode: "broadcast"
            };
        Moxtra._iframe ? Moxtra._iframe.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify(o), Moxtra.baseUrl) : Moxtra._popup ? Moxtra._popup.postMessage(JSON.stringify(o), Moxtra.baseUrl) : Moxtra._popupbychat && Moxtra._popupbychat.postMessage(JSON.stringify(o), Moxtra.baseUrl);
        return t
    }, Moxtra.message.reply = function(e, t) {
        if (!e || !t) throw "You must pass in options";
        if (!Moxtra._iframe && !Moxtra._popup && !Moxtra._popupbychat) throw "You need to start or join a Meet";
        var o = Moxtra._guid(),
            r = {
                action: "message",
                message: t,
                message_id: o,
                reply_to: e,
                delivery_mode: "reply"
            };
        Moxtra._iframe ? Moxtra._iframe.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify(r), Moxtra.baseUrl) : Moxtra._popup ? Moxtra._popup.postMessage(JSON.stringify(r), Moxtra.baseUrl) : Moxtra._popupbychat && Moxtra._popupbychat.postMessage(JSON.stringify(r), Moxtra.baseUrl);
        return o
    }, Moxtra.clip = function(e) {
        Moxtra.note(e)
    }, Moxtra.note = function(e) {
        var t, o, r, a, i, n, d, s;
        if (!e) throw "You must pass in options";
        Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first");
        var m = Moxtra_Session.get("note_refresh");
        if (m) {
            if (!e.noterefresh_binder_id) return
        } else if (Moxtra._noteiframe) return;
        if (!Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        Moxtra._timeMap.note = (new Date).getTime(), en = function() {
            var c = function(t) {
                if (t.origin == Moxtra.baseUrl) try {
                    var o = JSON.parse(t.data);
                    (e && e.from_chat && !0 === e.from_chat ? Moxtra._handleMessageFromChatEvent(o, e) : Moxtra._handleMessageEvent(o, e)) && Moxtra.removeListener(window, "message", c)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + t.data)
                }
            };
            if (Moxtra.addListener(window, "message", c), e.iframe && !0 === e.iframe) {
                var l;
                if (s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 2), e, !1, !1), e.tagid4iframe) {
                    var _ = function() {
                        if (l = document.getElementById(e.tagid4iframe)) !1 === e.border ? (l.appendChild(s), Moxtra._noteiframe = s) : (o = Moxtra._createSimpleDivElement(e, s, "1024px", "768px"), l.appendChild(o), Moxtra._noteiframe = o);
                        else {
                            if (m) return Moxtra_Session.remove("note_refresh"), void s.remove();
                            !1 === e.border ? (document.body.appendChild(s), Moxtra._noteiframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "1024px", "768px"), document.body.appendChild(a), Moxtra._noteiframe = a, a.scrollIntoView(!0))
                        }
                    };
                    if (m) {
                        var p = 0;
                        ! function t() {
                            p++;
                            var o = setTimeout(t, 1e3);
                            (document.getElementById(e.tagid4iframe) || 6 === p) && (clearTimeout(o), _())
                        }()
                    } else _()
                } else !1 === e.border ? (document.body.appendChild(s), Moxtra._noteiframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "1024px", "768px"), document.body.appendChild(a), Moxtra._noteiframe = a, a.scrollIntoView(!0))
            } else {
                if (d = 1024, t = 768, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, e.from_chat && !0 === e.from_chat)
                    if (Moxtra.isIE()) {
                        var x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                        x += encodeURIComponent(Moxtra._SSOUrl(e, 2) + "&popup=1"), x += "&name=moxtranotebychat&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                        var f = Moxtra._createHiddenIframe(x);
                        document.body.appendChild(f), Moxtra._notepopupbychat = f
                    } else i = window.open(Moxtra._SSOUrl(e, 2), "moxtranotebychat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._notepopupbychat = i;
                else if (Moxtra.isIE()) {
                    x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                    x += encodeURIComponent(Moxtra._SSOUrl(e, 2) + "&popup=1"), x += "&name=moxtranote&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                    f = Moxtra._createHiddenIframe(x);
                    document.body.appendChild(f), Moxtra._notepopup = f
                } else i = window.open(Moxtra._SSOUrl(e, 2), "moxtranote", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._notepopup = i;
                i && i.focus()
            }
        }, en()
    }, Moxtra.chat = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._chatiframe && (document.body.removeChild(Moxtra._chatiframe), delete Moxtra._chatiframe), Moxtra._chatfunc && (Moxtra.removeListener(window, "message", Moxtra._chatfunc), delete Moxtra._chatfunc))
        }
        Moxtra._timeMap.chat = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleChatMessageEvent(r, e, !0) && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe) c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._chatfunc = l, s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 3), e, !0, !1, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._chatiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._chatiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 3) + "&popup=1"), _ += "&name=moxtrachat&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 3), "moxtrachat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.timeline = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._timelineiframe && (document.body.removeChild(Moxtra._timelineiframe), delete Moxtra._timelineiframe), Moxtra._timelinefunc && (Moxtra.removeListener(window, "message", Moxtra._timelinefunc), delete Moxtra._timelinefunc))
        }
        Moxtra._timeMap.timeline = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleChatMessageEvent(r, e, !1) && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._timelinefunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 5), e, !1, !1, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "1024px", "768px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._timelineiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "1024px", "768px"), document.body.appendChild(a), Moxtra._timelineiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 1024, t = 768, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 5) + "&popup=1"), _ += "&name=moxtratimeline&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 5), "moxtratimeline", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.timelineData = function(e) {
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), Moxtra._timelineDatafunc && (Moxtra.removeListener(window, "message", Moxtra._timelineDatafunc), delete Moxtra._timelineDatafunc), Moxtra._timelineDataiframe && (document.body.removeChild(Moxtra._timelineDataiframe), delete Moxtra._timelineDataiframe), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        ec = function() {
            var t = function(o) {
                if (o.origin == Moxtra.baseUrl && o.source == Moxtra._timelineDataiframe.contentWindow) try {
                    var r = JSON.parse(o.data);
                    Moxtra._handleDataMessageEvent(r, e, !1) && (Moxtra.removeListener(window, "message", t), delete Moxtra._timelineDatafunc)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + o.data)
                }
            };
            Moxtra.addListener(window, "message", t), Moxtra._timelineDatafunc = t;
            var o = Moxtra._createHiddenIframe(Moxtra._SSOUrl(e, 13), !0);
            document.body.appendChild(o), Moxtra._timelineDataiframe = o
        }, ec()
    }, Moxtra.removeWidget = function(e) {
        var t;
        if (e) {
            if ((t = document.getElementById(e)) && Moxtra._hasChild(t)) {
                var o = Moxtra._viewMap[e];
                o && (t.removeChild(o), delete Moxtra._viewMap[e]);
                var r = Moxtra._handlerMap[e];
                r && (Moxtra.removeListener(window, "message", r), delete Moxtra._handlerMap[e])
            }
        } else Moxtra._timelineiframe && (document.body.removeChild(Moxtra._timelineiframe), delete Moxtra._timelineiframe), Moxtra._timelinefunc && (Moxtra.removeListener(window, "message", Moxtra._timelinefunc), delete Moxtra._timelinefunc), Moxtra._chatiframe && (document.body.removeChild(Moxtra._chatiframe), delete Moxtra._chatiframe), Moxtra._chatfunc && (Moxtra.removeListener(window, "message", Moxtra._chatfunc), delete Moxtra._chatfunc), Moxtra._timelineViewiframe && (document.body.removeChild(Moxtra._timelineViewiframe), delete Moxtra._timelineViewiframe), Moxtra._timelineViewfunc && (Moxtra.removeListener(window, "message", Moxtra._timelineViewfunc), delete Moxtra._timelineViewfunc), Moxtra._chatViewiframe && (document.body.removeChild(Moxtra._chatViewiframe), delete Moxtra._chatViewiframe), Moxtra._chatViewfunc && (Moxtra.removeListener(window, "message", Moxtra._chatViewfunc), delete Moxtra._chatViewfunc), Moxtra._pageViewiframe && (document.body.removeChild(Moxtra._pageViewiframe), delete Moxtra._pageViewiframe), Moxtra._pageViewfunc && (Moxtra.removeListener(window, "message", Moxtra._pageViewfunc), delete Moxtra._pageViewfunc), Moxtra._todoViewiframe && (document.body.removeChild(Moxtra._todoViewiframe), delete Moxtra._todoViewiframe), Moxtra._todoViewfunc && (Moxtra.removeListener(window, "message", Moxtra._todoViewfunc), delete Moxtra._todoViewfunc), Moxtra._meetViewiframe && (document.body.removeChild(Moxtra._meetViewiframe), delete Moxtra._meetViewiframe), Moxtra._meetViewfunc && (Moxtra.removeListener(window, "message", Moxtra._meetViewfunc), delete Moxtra._meetViewfunc), Moxtra._timelineDatafunc && (Moxtra.removeListener(window, "message", Moxtra._timelineDatafunc), delete Moxtra._timelineDatafunc), Moxtra._timelineDataiframe && (document.body.removeChild(Moxtra._timelineDataiframe), delete Moxtra._timelineDataiframe), Moxtra._annotefunc && (Moxtra.removeListener(window, "message", Moxtra._annotefunc), delete Moxtra._annotefunc), Moxtra._annotateiframe && (document.body.removeChild(Moxtra._annotateiframe), delete Moxtra._annotateiframe)
    }, Moxtra.meet.prepare = function(e) {
        if (!e) throw "You must pass in options";
        if (Moxtra._meetPreparefunc && (Moxtra.removeListener(window, "message", Moxtra._meetPreparefunc), delete Moxtra._meetPreparefunc), Moxtra._meetPrepareiframe && (document.body.removeChild(Moxtra._meetPrepareiframe), delete Moxtra._meetPrepareiframe), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        ec = function() {
            var t = function(o) {
                if (o.origin == Moxtra.baseUrl && Moxtra._meetPrepareiframe && o.source == Moxtra._meetPrepareiframe.contentWindow) try {
                    var r = JSON.parse(o.data);
                    Moxtra._handleDSMessageEvent(r, e, !1) && (Moxtra.removeListener(window, "message", t), delete Moxtra._meetPreparefunc)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + o.data)
                }
            };
            Moxtra.addListener(window, "message", t), Moxtra._meetPreparefunc = t;
            var o = Moxtra._createHiddenIframe(Moxtra._SSOUrl(e, 15));
            document.body.appendChild(o), Moxtra._meetPrepareiframe = o
        }, ec()
    }, Moxtra.meet.screenshare = function(e) {
        if (!e) throw "You must pass in options";
        var t;
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.tagid4iframe) {
            if ((t = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(t)) {
                var o = Moxtra._viewMap[e.tagid4iframe];
                o && (t.removeChild(o), delete Moxtra._viewMap[e.tagid4iframe]);
                var r = Moxtra._handlerMap[e.tagid4iframe];
                r && (Moxtra.removeListener(window, "message", r), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            delete Moxtra._meetScreenShareTag
        }
        t || (Moxtra._meetScreenShareiframe && (document.body.removeChild(Moxtra._meetScreenShareiframe), delete Moxtra._meetScreenShareiframe), Moxtra._meetScreenSharefunc && (Moxtra.removeListener(window, "message", Moxtra._meetScreenSharefunc), delete Moxtra._meetScreenSharefunc)), ec = function() {
            var o = function(t) {
                if (t.origin == Moxtra.baseUrl && e.handle_iframe && e.handle_iframe.contentWindow == t.source) try {
                    var r = JSON.parse(t.data);
                    Moxtra._handleDSMessageEvent(r, e, !1) && Moxtra.removeListener(window, "message", o)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + t.data)
                }
            };
            Moxtra.addListener(window, "message", o), t ? Moxtra._handlerMap[e.tagid4iframe] = o : Moxtra._meetScreenSharefunc = o;
            var r = Moxtra._createHiddenIframe(Moxtra._SSOUrl(e, 16));
            t ? ("join" == e.action && (r.style.height = "100%"), t.appendChild(r), Moxtra._viewMap[e.tagid4iframe] = r, e.handle_iframe = r, Moxtra._meetScreenShareTag = e.tagid4iframe) : ("join" == e.action && (r.style.width = "1024px", r.style.height = "768px"), document.body.appendChild(r), e.handle_iframe = r, Moxtra._meetScreenShareiframe = r)
        }, ec()
    }, Moxtra.meet.stopScreenshare = function() {
        var e;
        if (Moxtra._meetScreenShareTag) {
            var t = Moxtra._viewMap[Moxtra._meetScreenShareTag];
            t && (e = t.contentWindow)
        }
        if (!e && Moxtra._meetScreenShareiframe && (e = Moxtra._meetScreenShareiframe.contentWindow), !e) throw "Need an in-progress screenshare";
        e.postMessage('{"action":"request", "type":"stop_screen_share"}', Moxtra.baseUrl)
    }, Moxtra.meet.endScreenshare = function() {
        var e = Moxtra._getEndDSURL(!0);
        if (e) {
            if (Moxtra._meetScreenShareTag) {
                var t = Moxtra._viewMap[Moxtra._meetScreenShareTag];
                if (t) return void(t.src = e)
            }
            Moxtra._meetScreenShareiframe && (Moxtra._meetScreenShareiframe.src = e)
        }
    }, Moxtra.meet.leaveScreenshare = function() {
        var e = Moxtra._getEndDSURL(!1);
        if (e) {
            if (Moxtra._meetScreenShareTag) {
                var t = Moxtra._viewMap[Moxtra._meetScreenShareTag];
                if (t) return void(t.src = e)
            }
            Moxtra._meetScreenShareiframe && (Moxtra._meetScreenShareiframe.src = e)
        }
    }, Moxtra._getEndDSURL = function(e, t) {
        if (e) {
            if (!Moxtra.ds_session_key) return void alert("Need to start a Moxtra Screen Share first!")
        } else if (!Moxtra.attds_session_key) return void alert("Need to join a Moxtra Screen Share first!");
        var o = "websdk";
        t && (o = t);
        var r = encodeURIComponent(window.location.protocol + "//" + window.location.host),
            a = Moxtra.baseUrl + Moxtra.version;
        return a = (a = e ? a + "/#api.endMeet/" + Moxtra.ds_session_key + "?type=" + o + "&session_id=" + Moxtra.ds_session_id : a + "/#api.leaveMeet/" + Moxtra.attds_session_key + "?type=" + o + "&session_id=" + Moxtra.attds_session_id) + "&client_id=" + Moxtra.clientId + "&origin=" + r, Moxtra.appKey && (a = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(a), Moxtra.partnerId ? a += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (a += "&orgid=" + Moxtra.orgId)), a
    }, Moxtra._hasChild = function(e) {
        for (var t = 0; e && e.childNodes[t]; t++)
            if (1 === e.childNodes[t].nodeType || 11 === e.childNodes[t].nodeType) return !0;
        return !1
    }, Moxtra.timelineView = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._timelineViewiframe && (document.body.removeChild(Moxtra._timelineViewiframe), delete Moxtra._timelineViewiframe), Moxtra._timelineViewfunc && (Moxtra.removeListener(window, "message", Moxtra._timelineViewfunc), delete Moxtra._timelineViewfunc))
        }
        Moxtra._timeMap.timeline = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleViewMessageEvent(r, e, "timeline") && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._timelineViewfunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 9), e, !1, !0, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "330px", "768px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._timelineViewiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "330px", "768px"), document.body.appendChild(a), Moxtra._timelineViewiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 330, t = 768, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 9) + "&popup=1"), _ += "&name=moxtratimelineView&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 9), "moxtratimelineView", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.chatView = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        console.log(e);
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                console.log(c);
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._chatViewiframe && (document.body.removeChild(Moxtra._chatViewiframe), delete Moxtra._chatViewiframe), Moxtra._chatViewfunc && (Moxtra.removeListener(window, "message", Moxtra._chatViewfunc), delete Moxtra._chatViewfunc))
        }
        Moxtra._timeMap.chat = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleViewMessageEvent(r, e, "chat") && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._chatViewfunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 10), e, !0, !0, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._chatViewiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._chatViewiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 10) + "&popup=1"), _ += "&name=moxtrachatView&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 10), "moxtrachatView", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.pageView = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !e.binder_id && !e.viewlink_url) {
            if (e.error && "function" == typeof e.error) {
                var l = {
                    error_code: "invalid binder_id or viewlink_url",
                    error_message: "You must set binder_id or viewlink_url"
                };
                return void e.error(l)
            }
            throw "You must set binder_id or viewlink_url"
        }
        if (!Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                l = {
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                };
                return void e.error(l)
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var _ = Moxtra._handlerMap[e.tagid4iframe];
                _ && (Moxtra.removeListener(window, "message", _), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._pageViewiframe && (document.body.removeChild(Moxtra._pageViewiframe), delete Moxtra._pageViewiframe), Moxtra._pageViewfunc && (Moxtra.removeListener(window, "message", Moxtra._pageViewfunc), delete Moxtra._pageViewfunc))
        }
        Moxtra._timeMap.page = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleViewMessageEvent(r, e, "page") && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._pageViewfunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 11), e, !0, !0, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._pageViewiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._pageViewiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 11) + "&popup=1"), _ += "&name=moxtrapageView&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 11), "moxtrapageView", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.todoView = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !e.binder_id) {
            if (e.error && "function" == typeof e.error) {
                var l = {
                    error_code: "invalid binder_id",
                    error_message: "You must set binder_id"
                };
                return void e.error(l)
            }
            throw "You must set binder_id"
        }
        if (!Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                l = {
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                };
                return void e.error(l)
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var _ = Moxtra._handlerMap[e.tagid4iframe];
                _ && (Moxtra.removeListener(window, "message", _), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._todoViewiframe && (document.body.removeChild(Moxtra._todoViewiframe), delete Moxtra._todoViewiframe), Moxtra._todoViewfunc && (Moxtra.removeListener(window, "message", Moxtra._todoViewfunc), delete Moxtra._todoViewfunc))
        }
        Moxtra._timeMap.todo = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleViewMessageEvent(r, e, "todo") && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._todoViewfunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 12), e, !0, !0, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._todoViewiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._todoViewiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 12) + "&popup=1"), _ += "&name=moxtratodoView&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 12), "moxtratodoView", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.meetView = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._meetViewiframe && (document.body.removeChild(Moxtra._meetViewiframe), delete Moxtra._meetViewiframe), Moxtra._meetViewfunc && (Moxtra.removeListener(window, "message", Moxtra._meetViewfunc), delete Moxtra._meetViewfunc))
        }
        Moxtra._timeMap.meetview = (new Date).getTime(), ec = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) {
                    if (e.handle_iframe)
                        if (!1 === e.border) {
                            if (e.handle_iframe.contentWindow != t.source) return
                        } else {
                            var o = e.handle_iframe.getElementsByTagName("iframe")[0] || e.handle_iframe;
                            if (!o || o.contentWindow != t.source) return
                        }
                    try {
                        var r = JSON.parse(t.data);
                        Moxtra._handleViewMessageEvent(r, e, "meet") && Moxtra.removeListener(window, "message", l)
                    } catch (e) {
                        console.warn("JSON parse error: " + e.message + " for " + t.data)
                    }
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe && (c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._meetViewfunc = l), e.iframe && !0 === e.iframe) s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 14), e, !0, !0, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._meetViewiframe = s, e.handle_iframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._meetViewiframe = a, e.handle_iframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 14) + "&popup=1"), _ += "&name=moxtrameetView&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 10), "moxtrameetView", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, ec(m)
    }, Moxtra.draw = function(e) {
        Moxtra.annotate(e)
    }, Moxtra.annotate = function(e) {
        var t, o, r, a, i, n, d, s, m, c;
        if (!e) throw "You must pass in options";
        if (Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first"), !Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        if (e.iframe && !0 === e.iframe) {
            if (e.tagid4iframe && (c = document.getElementById(e.tagid4iframe)) && Moxtra._hasChild(c)) {
                (m = Moxtra._viewMap[e.tagid4iframe]) && delete Moxtra._viewMap[e.tagid4iframe];
                var l = Moxtra._handlerMap[e.tagid4iframe];
                l && (Moxtra.removeListener(window, "message", l), delete Moxtra._handlerMap[e.tagid4iframe])
            }
            c || (Moxtra._annotateiframe && (document.body.removeChild(Moxtra._annotateiframe), delete Moxtra._annotateiframe), Moxtra._annotefunc && (Moxtra.removeListener(window, "message", Moxtra._annotefunc), delete Moxtra._annotefunc))
        }
        Moxtra._timeMap.annotate = (new Date).getTime(), an = function(m) {
            var l = function(t) {
                if (t.origin == Moxtra.baseUrl) try {
                    var o = JSON.parse(t.data);
                    Moxtra._handleMessageEvent(o, e, !0) && Moxtra.removeListener(window, "message", l)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + t.data)
                }
            };
            if (Moxtra.addListener(window, "message", l), e.iframe && !0 === e.iframe) c ? Moxtra._handlerMap[e.tagid4iframe] = l : Moxtra._annotefunc = l, s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 6), e, !0, !1, m), e.tagid4iframe && c && (!1 === e.border ? m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (c.appendChild(s), Moxtra._viewMap[e.tagid4iframe] = s, e.handle_iframe = s) : m ? (Moxtra._viewMap[e.tagid4iframe] = m, e.handle_iframe = m) : (o = Moxtra._createSimpleDivElement(e, s, "850px", "500px"), c.appendChild(o), Moxtra._viewMap[e.tagid4iframe] = o, e.handle_iframe = o)), c || (!1 === e.border ? (document.body.appendChild(s), Moxtra._annotateiframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "850px", "500px"), document.body.appendChild(a), Moxtra._annotateiframe = a, a.scrollIntoView(!0)));
            else if (d = 850, t = 500, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, Moxtra.isIE()) {
                var _ = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                _ += encodeURIComponent(Moxtra._SSOUrl(e, 6) + "&popup=1"), _ += "&name=moxtraannotate&others=", _ += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1");
                var p = Moxtra._createHiddenIframe(_);
                document.body.appendChild(p), e.handle_popup = p
            } else i = window.open(Moxtra._SSOUrl(e, 6), "moxtraannotate", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0,scrollbars=1"), e.handle_popup = i, i && i.focus()
        }, an(m)
    }, Moxtra.video = function(e) {
        var t, o, r, a, i, n, d, s;
        if (!e) throw "You must pass in options";
        Moxtra_Session.get("init_refresh") || console.warn("You must call Moxtra.init() first");
        var m = Moxtra_Session.get("video_refresh");
        if (m) {
            if (!e.videorefresh_session_key) return
        } else if (Moxtra._videoiframe) return;
        if (!Moxtra.clientId) {
            if (e.error && "function" == typeof e.error) {
                return void e.error({
                    error_code: "invalid client_id",
                    error_message: "Please set client_id in Moxtra.init()"
                })
            }
            throw "Please set client_id in Moxtra.init()"
        }
        Moxtra._timeMap.video = (new Date).getTime(), ef = function() {
            var c = function(t) {
                if (t.origin == Moxtra.baseUrl) try {
                    var o = JSON.parse(t.data);
                    (e && e.from_chat && !0 === e.from_chat ? Moxtra._handleMessageFromChatEvent(o, e) : Moxtra._handleVideoMessageEvent(o, e)) && Moxtra.removeListener(window, "message", c)
                } catch (e) {
                    console.warn("JSON parse error: " + e.message + " for " + t.data)
                }
            };
            if (Moxtra.addListener(window, "message", c), e.iframe && !0 === e.iframe) {
                var l;
                if (s = Moxtra._createWidgetElement(Moxtra._SSOUrl(e, 8), e, !1, !1), e.tagid4iframe) {
                    var _ = function() {
                        if (l = document.getElementById(e.tagid4iframe)) !1 === e.border ? (l.appendChild(s), Moxtra._videoiframe = s) : (o = Moxtra._createSimpleDivElement(e, s, "400px", "300px"), l.appendChild(o), Moxtra._videoiframe = o);
                        else {
                            if (m) return Moxtra_Session.remove("video_refresh"), void s.remove();
                            !1 === e.border ? (document.body.appendChild(s), Moxtra._videoiframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "400px", "300px"), document.body.appendChild(a), Moxtra._videoiframe = a, a.scrollIntoView(!0))
                        }
                    };
                    if (m) {
                        var p = 0;
                        ! function t() {
                            p++;
                            var o = setTimeout(t, 1e3);
                            (document.getElementById(e.tagid4iframe) || 6 === p) && (clearTimeout(o), _())
                        }()
                    } else _()
                } else !1 === e.border ? (document.body.appendChild(s), Moxtra._videoiframe = s, s.scrollIntoView(!0)) : (a = Moxtra._createDivElement(e, s, "400px", "300px"), document.body.appendChild(a), Moxtra._videoiframe = a, a.scrollIntoView(!0))
            } else {
                if (d = 400, t = 300, r = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - d) / 2, n = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - t) / 2, e.from_chat && !0 === e.from_chat)
                    if (Moxtra.isIE()) {
                        var x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                        x += encodeURIComponent(Moxtra._SSOUrl(e, 8) + "&popup=1"), x += "&name=moxtravideobychat&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                        var f = Moxtra._createHiddenIframe(x);
                        document.body.appendChild(f), Moxtra._videopopupbychat = f
                    } else i = e.tab && !0 === e.tab ? window.open(Moxtra._SSOUrl(e, 8), "moxtravideobychat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0", "_blank") : window.open(Moxtra._SSOUrl(e, 8), "moxtravideobychat", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._videopopupbychat = i;
                else if (Moxtra.isIE()) {
                    x = Moxtra.baseUrl + "/api/html/iframeforpopup.htm?url=";
                    x += encodeURIComponent(Moxtra._SSOUrl(e, 8) + "&popup=1"), x += "&name=moxtravideo&others=", x += encodeURIComponent("width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0");
                    f = Moxtra._createHiddenIframe(x);
                    document.body.appendChild(f), Moxtra._videopopup = f
                } else i = e.tab && !0 === e.tab ? window.open(Moxtra._SSOUrl(e, 8), "moxtravideo", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0", "_blank") : window.open(Moxtra._SSOUrl(e, 8), "moxtravideo", "width=" + d + ",height=" + t + ",left=" + r + ",top=" + n + ",resizable=yes,location=0,titlebar=0"), Moxtra._videopopup = i;
                i && i.focus()
            }
        }, ef()
    }, Moxtra._getMeetURL = function(e, t, o, r) {
        var a;
        if (o) a = o;
        else if (t) {
            if (!Moxtra.session_key) return void alert("Need to start a Moxtra Meet first!");
            a = Moxtra.session_key
        } else {
            if (!Moxtra.video_session_key) return void alert("Need to start a Moxtra Video first!");
            a = Moxtra.video_session_key
        }
        var i = "websdk";
        r && (i = r);
        var n, d = encodeURIComponent(window.location.protocol + "//" + window.location.host);
        return n = e ? Moxtra.baseUrl + Moxtra.version + "/#api.endMeet/" + a + "?type=" + i + "&client_id=" + Moxtra.clientId + "&origin=" + d : Moxtra.baseUrl + Moxtra.version + "/#api.leaveMeet/" + a + "?type=" + i + "&client_id=" + Moxtra.clientId + "&origin=" + d, t || (n += "&video=true"), t && Moxtra.accessToken ? n += "&access_token=" + Moxtra.accessToken : !t && Moxtra.video_access_token ? n += "&access_token=" + Moxtra.video_access_token : Moxtra.appKey && (n = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(n), Moxtra.partnerId ? n += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (n += "&orgid=" + Moxtra.orgId)), n
    }, Moxtra.getJoinMeetURL = function(e, t, o, r) {
        var a;
        if (e) a = e;
        else {
            if (!Moxtra.session_key) return void alert("Need to start a Moxtra Meet first!");
            a = Moxtra.session_key
        }
        var i = "websdk";
        o && (i = o);
        var n, d = encodeURIComponent(window.location.protocol + "//" + window.location.host),
            s = Moxtra.baseUrl + Moxtra.version + "/#join?session_key=" + a + "&type=" + i + "&client_id=" + Moxtra.clientId + "&origin=" + d;
        if (t && (s += "&name=", s += encodeURIComponent(t)), r && r.extension) try {
            var m = JSON.stringify(r.extension);
            s = s + "&extension=" + encodeURIComponent(m)
        } catch (e) {
            console.warn(e.message)
        }
        if (r && r.invisible && (s += "&invisible=" + r.invisible), r && r.video && (s += "&video=true"), r && r.options) try {
            var c = JSON.stringify(r.options);
            s = s + "&options=" + encodeURIComponent(c)
        } catch (e) {
            console.warn(e.message)
        }
        return Moxtra._pluginversion && (s = s + "&plugin_version=" + Moxtra._pluginversion), Moxtra._theme && (s = s + "&theme=" + encodeURIComponent(Moxtra._theme)), r && r.access_token ? n = s + "&access_token=" + r.access_token : Moxtra.accessToken ? n = s + "&access_token=" + Moxtra.accessToken : Moxtra.appKey ? Moxtra._barlogin ? n = s : (n = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(s), Moxtra.partnerId ? n += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (n += "&orgid=" + Moxtra.orgId)) : n = r && r.token ? Moxtra.baseUrl + Moxtra.version + "/#login?token=" + encodeURIComponent(r.token) + "&loginUrl=" + encodeURIComponent(r.loginUrl) + "&type=" + i + "&client_id=" + Moxtra.clientId + "&origin=" + d + "&backUrl=" + encodeURIComponent(s) : s, n
    }, Moxtra.auth_2fa_response = function(e) {
        var t = Moxtra._auth2faMap[e];
        if (t) {
            var o;
            if (t.handle_iframe)
                if (!1 === t.border) o = t.handle_iframe.contentWindow;
                else o = (t.handle_iframe.getElementsByTagName("iframe")[0] || t.handle_iframe).contentWindow;
            else t.handle_popup && (o = t.handle_popup.contentWindow);
            if (o) {
                var r = '{"action":"auth_2fa_response", "request_id":"' + e + '"}';
                o.postMessage(r, Moxtra.baseUrl)
            }
            delete Moxtra._auth2faMap[e]
        }
    }, Moxtra.binderChooser = function(e) {
        bc = function() {
            var t, o, r, a = function(t) {
                if (t.source == Moxtra._window) {
                    var o = JSON.parse(t.data);
                    Moxtra._selected(o, e), Moxtra.removeListener(window, "message", a)
                }
            };
            Moxtra.addListener(window, "message", a);
            var i = "websdk";
            if (e && e.type && (i = e.type), Moxtra.appKey) t = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(Moxtra.baseUrl + Moxtra.version + "/#chooser?client_id=" + Moxtra.clientId + "&type=" + i), Moxtra.partnerId ? t += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (t += "&orgid=" + Moxtra.orgId);
            else if (e && e.token) {
                var n = encodeURIComponent(window.location.protocol + "//" + window.location.host);
                t = Moxtra.baseUrl + Moxtra.version + "/#login?token=" + encodeURIComponent(e.token) + "&loginUrl=" + encodeURIComponent(e.loginUrl) + "&type=" + i + "&client_id=" + Moxtra.clientId + "&origin=" + n + "&backUrl=" + encodeURIComponent(Moxtra.baseUrl + Moxtra.version + "/#chooser?client_id=" + Moxtra.clientId + "&type=" + i)
            } else t = Moxtra.baseUrl + Moxtra.version + "/#chooser?client_id=" + Moxtra.clientId + "&type=" + i;
            o = e && e.width ? e.width : "886", r = e && e.height ? e.height : "560", Moxtra._window = window.open(t, "chooser", "location=0,scrollbars=1,status=0,titlebar=0,toolbar=0,menubar=0,width=" + o + ",height=" + r), Moxtra._window.focus()
        }, bc()
    }, Moxtra.pageChooser = function(e) {
        pc = function() {
            var t, o = function(t) {
                if (t.source == Moxtra._pageWindow) {
                    var r = JSON.parse(t.data);
                    Moxtra._pageSelected(r, e), Moxtra.removeListener(window, "message", o)
                }
            };
            Moxtra.addListener(window, "message", o);
            var r = "websdk";
            if (e && e.type && (r = e.type), Moxtra.appKey) t = Moxtra.ssoUrl + "?idpid=" + Moxtra.appKey + "&target=" + encodeURIComponent(Moxtra.baseUrl + "/api/html/pageselector.htm?client_id=" + Moxtra.clientId), Moxtra.partnerId ? t += "&partnerid=" + Moxtra.partnerId : Moxtra.orgId && (t += "&orgid=" + Moxtra.orgId);
            else if (e && e.token) {
                var a = encodeURIComponent(window.location.protocol + "//" + window.location.host);
                t = Moxtra.baseUrl + Moxtra.version + "/#login?token=" + encodeURIComponent(e.token) + "&loginUrl=" + encodeURIComponent(e.loginUrl) + "&type=" + r + "&client_id=" + Moxtra.clientId + "&origin=" + a + "&backUrl=" + encodeURIComponent(Moxtra.baseUrl + "/api/html/pageselector.htm?client_id=" + Moxtra.clientId)
            } else t = Moxtra.baseUrl + "/api/html/pageselector.htm?client_id=" + Moxtra.clientId;
            Moxtra._pageWindow = window.open(t, "pageChooser", "location=0,scrollbars=1,status=0,titlebar=0,toolbar=0,menubar=0,width=886,height=560"), Moxtra._pageWindow.focus()
        }, pc()
    }, Moxtra.toolbar_startmeet = function() {
        return Moxtra.meet({
            success: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetSuccess", !1, !1), t.session_key = e.session_key, t.meet_id = e.meet_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            error: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetError", !1, !1), t.error_code = e.error_code, t.error_message = e.error_message, Moxtra._toolbar.dispatchEvent(t))
            },
            exit: function() {
                var e;
                document.createEvent && ((e = document.createEvent("Event")).initEvent("MeetExit", !1, !1), Moxtra._toolbar.dispatchEvent(e))
            },
            invite: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetInvite", !1, !1), t.binder_id = e.binder_id, t.session_key = e.session_key, t.meet_id = e.meet_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            invited: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MemberInvited", !1, !1), t.binder_id = e.binder_id, t.session_key = e.session_key, t.meet_id = e.meet_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            save: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetSaved", !1, !1), t.binder_id = e.binder_id, t.session_key = e.session_key, t.meet_id = e.meet_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            iframe: !1,
            _trigger: "button"
        }), !1
    }, Moxtra.toolbar_startnote = function() {
        return Moxtra.note({
            start_note: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("NoteStart", !1, !1), t.session_key = e.session_key, t.meet_id = e.meet_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            error: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("NoteError", !1, !1), t.error_code = e.error_code, t.error_message = e.error_message, Moxtra._toolbar.dispatchEvent(t))
            },
            save_note: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("NoteSave", !1, !1), t.destination_binder_id = e.destination_binder_id, t.download_url = e.download_url, t.share_url = e.share_url, Moxtra._toolbar.dispatchEvent(t))
            },
            cancel: function() {
                var e;
                document.createEvent && ((e = document.createEvent("Event")).initEvent("NoteCancel", !1, !1), Moxtra._toolbar.dispatchEvent(e))
            },
            iframe: !1,
            _trigger: "button"
        }), !1
    }, Moxtra.toolbar_startchat = function() {
        return Moxtra.chat({
            start_chat: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("ChatStart", !1, !1), t.binder_id = e.binder_id, t.session_id = e.session_id, Moxtra._toolbar.dispatchEvent(t))
            },
            request_meet: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetRequest", !1, !1), t.binder_id = e.binder_id, Moxtra._toolbar.dispatchEvent(t))
            },
            request_note: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("NoteRequest", !1, !1), Moxtra._toolbar.dispatchEvent(t))
            },
            error: function(e) {
                var t;
                document.createEvent && ((t = document.createEvent("Event")).initEvent("ChatError", !1, !1), t.error_code = e.error_code, t.error_message = e.error_message, Moxtra._toolbar.dispatchEvent(t))
            },
            iframe: !1,
            _trigger: "button"
        }), !1
    }, Moxtra._selected = function(e, t) {
        t && "function" == typeof t.select ? t.select(e) : Moxtra._chooser && document.createEvent && (m = document.createEvent("Event"), m.initEvent("BinderSelect", !1, !1), m.binder_name = e.binder_name, m.binder_id = e.binder_id, m.binder_imageUrl = e.binder_imageUrl, m.binder_viewUrl = e.binder_viewUrl, Moxtra._chooser.dispatchEvent(m)), Moxtra._window.close()
    }, Moxtra._pageSelected = function(e, t) {
        t && "function" == typeof t.select ? t.select(e) : Moxtra._pageChooser && document.createEvent && (m = document.createEvent("Event"), m.initEvent("PagesSelect", !1, !1), m.binder_name = e.binder_name, m.binder_id = e.binder_id, m.binder_imageUrl = e.binder_imageUrl, m.binder_viewUrl = e.binder_viewUrl, m.page_url_prefix = e.page_url_prefix, m.page_viewUrl_prefix = e.page_viewUrl_prefix, m.pages = e.pages, Moxtra._pageChooser.dispatchEvent(m)), Moxtra._pageWindow.close()
    }, Moxtra.setValue = function(e, t) {
        if (null != e && void 0 !== e && 1 == e.nodeType) {
            var o = e.tagName.toLowerCase();
            "div" == o ? e.innerHTML = t : "input" == o ? e.value = t : "img" == o && (img.src = t)
        }
    }, m_a = function() {
        var e, t, o, r, a, i, n, d, s, m = Moxtra_Session.get("init_refresh"),
            c = Moxtra_Session.get("meet_refresh"),
            l = Moxtra_Session.get("note_refresh"),
            _ = Moxtra_Session.get("video_refresh");
        for (t = function(e) {
                var t;
                if ("moxtra-meet" !== e.getAttribute("type") && "moxtra-meet-iframe" !== e.getAttribute("type") || ((t = document.createElement("div")).className = "moxtra-meet", e.style.display = "none", Moxtra._meet = e, i = "moxtra-meet-iframe" === e.getAttribute("type") ? t : null, Moxtra.addListener(t, "click", function(o) {
                        a = "moxtra-meet-iframe" === e.getAttribute("type"), c = Moxtra_Session.get("meet_refresh"), Moxtra.meet(c || {
                            success: function(o) {
                                var r;
                                document.createEvent && ((r = document.createEvent("Event")).initEvent("MeetSuccess", !1, !1), r.session_key = o.session_key, r.meet_id = o.meet_id, r.session_id = o.session_id, e.dispatchEvent(r)), t.className = "moxtra-meet moxtra-meet-used"
                            },
                            error: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("MeetError", !1, !1), o.error_code = t.error_code, o.error_message = t.error_message, e.dispatchEvent(o))
                            },
                            exit: function() {
                                var t;
                                document.createEvent && ((t = document.createEvent("Event")).initEvent("MeetExit", !1, !1), e.dispatchEvent(t))
                            },
                            invite: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("MeetInvite", !1, !1), o.binder_id = t.binder_id, o.session_key = t.session_key, o.meet_id = t.meet_id, o.session_id = t.session_id, e.dispatchEvent(o))
                            },
                            invited: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("MemberInvited", !1, !1), o.binder_id = t.binder_id, o.session_key = t.session_key, o.meet_id = t.meet_id, o.session_id = t.session_id, e.dispatchEvent(o))
                            },
                            save: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("MeetSaved", !1, !1), o.binder_id = t.binder_id, o.session_key = t.session_key, o.meet_id = t.meet_id, o.session_id = t.session_id, e.dispatchEvent(o))
                            },
                            iframe: !!a,
                            extension: {
                                show_dialogs: {
                                    meet_invite: !0
                                }
                            },
                            _trigger: "button"
                        })
                    }), e.parentNode.insertBefore(t, e)), "moxtra-note" !== e.getAttribute("type") && "moxtra-note-iframe" !== e.getAttribute("type") || (nt = document.createElement("div"), nt.className = "moxtra-note", e.style.display = "none", Moxtra._note = e, d = "moxtra-note-iframe" === e.getAttribute("type") ? t : null, Moxtra.addListener(nt, "click", function(t) {
                        n = "moxtra-note-iframe" === e.getAttribute("type"), l = Moxtra_Session.get("note_refresh"), Moxtra.note(l || {
                            start_note: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("NoteStart", !1, !1), o.session_key = t.session_key, o.meet_id = t.meet_id, o.session_id = t.session_id, e.dispatchEvent(o)), nt.className = "moxtra-note moxtra-note-used"
                            },
                            error: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("NoteError", !1, !1), o.error_code = t.error_code, o.error_message = t.error_message, e.dispatchEvent(o))
                            },
                            save_note: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("NoteSave", !1, !1), o.destination_binder_id = t.destination_binder_id, o.download_url = t.download_url, o.share_url = t.share_url, e.dispatchEvent(o))
                            },
                            cancel: function() {
                                var t;
                                document.createEvent && ((t = document.createEvent("Event")).initEvent("NoteCancel", !1, !1), e.dispatchEvent(t))
                            },
                            iframe: !!n,
                            _trigger: "button"
                        })
                    }), e.parentNode.insertBefore(nt, e)), "moxtra-chat" !== e.getAttribute("type") && "moxtra-chat-iframe" !== e.getAttribute("type") || (nt = document.createElement("div"), nt.className = "moxtra-chat", e.style.display = "none", Moxtra._chat = e, "moxtra-chat-iframe" === e.getAttribute("type") ? t : null, Moxtra.addListener(nt, "click", function(t) {
                        s = "moxtra-chat-iframe" === e.getAttribute("type"), Moxtra.chat({
                            start_chat: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("ChatStart", !1, !1), o.binder_id = t.binder_id, o.session_id = t.session_id, e.dispatchEvent(o)), nt.className = "moxtra-chat moxtra-chat-used"
                            },
                            request_meet: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("MeetRequest", !1, !1), o.binder_id = t.binder_id, e.dispatchEvent(o))
                            },
                            request_note: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("NoteRequest", !1, !1), e.dispatchEvent(o))
                            },
                            error: function(t) {
                                var o;
                                document.createEvent && ((o = document.createEvent("Event")).initEvent("ChatError", !1, !1), o.error_code = t.error_code, o.error_message = t.error_message, e.dispatchEvent(o))
                            },
                            iframe: !!s,
                            _trigger: "button"
                        })
                    }), e.parentNode.insertBefore(nt, e)), "moxtra-chooser" === e.getAttribute("type")) {
                    var o = document.createElement("div");
                    Moxtra._chooser = e, o.className = "moxtra-chooser", e.style.display = "none", Moxtra.addListener(o, "click", function(e) {
                        Moxtra.binderChooser()
                    }), e.parentNode.insertBefore(o, e)
                } else if ("moxtra-pagechooser" === e.getAttribute("type")) {
                    o = document.createElement("div");
                    Moxtra._pageChooser = e, o.className = "moxtra-pagechooser", e.style.display = "none", Moxtra.addListener(o, "click", function(e) {
                        Moxtra.pageChooser()
                    }), e.parentNode.insertBefore(o, e)
                }
                "moxtra-timeline" === e.getAttribute("type") && (Moxtra._timeline = e, r = {
                    c: 0,
                    i: 0,
                    o: 0,
                    s: 0,
                    m: 0,
                    q: 0,
                    d: Moxtra.baseUrl,
                    n: 5,
                    g: 60,
                    w: 760,
                    h: 500,
                    r: 0,
                    init: function(e, t) {
                        var o = document;
                        if (o.all && "complete" != o.readyState || !o.body) setTimeout(function() {
                            r.init(e, t)
                        }, 100);
                        else {
                            (a = window).addEventListener ? a.addEventListener("keyup", r.esc_close) : a.attachEvent("keyup", r.esc_close), r.c = o.createElement("DIV");
                            var a = r.c,
                                i = "CSS1Compat" != o.compatMode;
                            i = /MSIE 6/i.test(navigator.userAgent) || /MSIE/i.test(navigator.userAgent) && i ? "absolute" : "fixed";
                            a.style.position = i, a.style.bottom = "5px", a.style.right = "5px", a.style.zIndex = 2147483647, a.style.lineHeight = "12px", e = '<div style="position: absolute; bottom: ' + r.g + 'px; right: 0px; visibility: hidden; overflow: hidden; padding: 0px; height: 0;"><img src="' + r.d + '/api/images/logo-icon.png" style="cursor:pointer;position:absolute;top:0;left:0;border-style:solid;border-color: #00a2e8;border-radius: 5px;" onclick="window[ \'_mchat\' ].toggle(true);" /><div style="width:' + r.w + "px;height:" + r.h + 'px;">' + e + '</div></div><div style="position: absolute; bottom: 0px; right: 0px; width: 45 px; height: 45 px; padding: 3px; cursor: pointer;" title="Click to toggle timeline" onmouseover="window[ \'_mchat\' ].stop();" onclick="window[ \'_mchat\' ].toggle();"><img src="' + r.d + '/api/images/logo.png" alt="Click to toggle timeline" style="max-width: none;border-style:solid;border-color: #00a2e8;border-radius: 5px;border-width: 1px;padding: 3px;width: 40px;height: 40px;"/>', t && (e += '<div style="position: absolute; bottom: 32px; right: 3px; font: bold 14px arial; text-align:center;"><img src="' + r.d + '/api/images/mini_wait.gif"/></div>'), a.innerHTML = e + "</div>", o.body.appendChild(a), r.r = setInterval(r.query, 5e3), r.start()
                        }
                    },
                    start: function() {
                        r.q || 0 >= r.n-- || (r.s = 5, r.m = 30, r.i = setInterval(r.move, 30))
                    },
                    stop: function() {
                        r.q = 1, r.c.style.bottom = "5px", clearInterval(r.i)
                    },
                    move: function() {
                        var e = r.c,
                            t = parseInt(e.style.bottom) + r.s;
                        t >= r.m ? (t = r.m, r.s *= -1, r.s -= Math.abs(r.s) % 2) : 5 >= t && (r.s = Math.abs(r.s) - 1, 0 >= (r.m -= 4) && (clearInterval(r.i), setTimeout(r.start, 2e3)), t = 5), e.style.bottom = t + "px"
                    },
                    toggle: function(e) {
                        clearInterval(r.o);
                        var t = r.c.childNodes[0],
                            o = -100;
                        "hidden" == t.style.visibility && 1 != e && (o *= -1, t.style.width = "0px", t.style.height = "0px", t.style.visibility = "visible"), r.o = setInterval(function() {
                            r.show(t, o)
                        }, 1)
                    },
                    show: function(e, t) {
                        var o = e.offsetWidth + t,
                            a = e.offsetHeight + t,
                            i = 0;
                        0 <= a || (a = 0), 0 <= o || (o = 0), 0 <= o && 0 <= a && (o <= r.w ? i = 1 : o = r.w, a <= r.h ? i = 1 : a = r.h, e.style.width = o + "px", e.style.height = a + "px"), (!i || 0 >= o || 0 >= a) && (clearInterval(r.o), o < r.w ? (e.style.visibility = "hidden", e.style.padding = "0") : e.style.padding = "8px"), "hidden" == e.style.visibility && (r.r = setInterval(r.query, 1e3))
                    },
                    query: function() {
                        try {
                            jQuery.ajax({
                                url: Moxtra.baseUrl + "/oauthapi/unreadfeed",
                                dataType: "jsonp",
                                success: function(e) {
                                    e && "ok" == e.status && (clearInterval(r.r), r.r = setInterval(r.query, 18e4)), e && e.count ? r.c.lastChild.lastChild.innerHTML = '<font color="white" style="background-color:red;border-radius: 100%;">' + e.count + "</font>" : r.c.lastChild.lastChild.innerHTML = ""
                                },
                                error: function(e) {
                                    clearInterval(r.r), r.c.lastChild.lastChild.innerHTML = "", r.r = setInterval(r.query, 1e4)
                                }
                            })
                        } catch (e) {}
                    },
                    esc_close: function(e) {
                        27 == (e.keyCode || e.which) && r.toggle(!0)
                    }
                }, window._mchat = r, r.init('<iframe id="_mchatf" src="' + Moxtra._SSOUrl(null, 4) + '" frameborder="0" allowtransparency="true" allowfullscreen="true" style="width: 100%; height: 100%; overflow: scroll; background-color: transparent;"></iframe>', 1));
                if ("moxtra-toolbar" === e.getAttribute("type")) {
                    Moxtra._toolbar = e;
                    var r = {
                        c: 0,
                        i: 0,
                        o: 0,
                        s: 0,
                        m: 0,
                        q: 0,
                        d: Moxtra.baseUrl,
                        n: 5,
                        g: 60,
                        w: 760,
                        h: 500,
                        r: 0,
                        init: function(e, t) {
                            var o, a = document;
                            a.all && "complete" != a.readyState || !a.body ? setTimeout(function() {
                                r.init(e, t)
                            }, 100) : ((o = window).addEventListener ? o.addEventListener("keyup", r.esc_close) : o.attachEvent("keyup", r.esc_close), r.c = a.createElement("DIV"), (o = r.c).style.zIndex = 2147483647, o.style.lineHeight = "12px", e = '<div style="position: absolute; bottom: ' + r.g + 'px; right: 0px; visibility: hidden; overflow: hidden; padding: 0px; height: 0;"><img src="' + r.d + '/api/images/logo-icon.png" style="cursor:pointer;position:absolute;top:0;left:0;border-style:solid;border-color: #00a2e8;border-radius: 5px;" onclick="window[ \'_mtool\' ].toggle(true);" /><div style="width:' + r.w + "px;height:" + r.h + 'px;">' + e + '</div></div><div style="position: absolute; bottom: 0px; right: 0px; height: 60px; cursor: pointer; overflow:hidden; padding: 5px; background: #eee;"><div title="Start Meet" style="float:left; width: 45 px; height: 45 px; padding: 3px;" onmouseover="" onclick="return Moxtra.toolbar_startmeet();"><img src="' + r.d + '/api/images/meet.png" alt="Click to start Meet" style="max-width: none;border-style:solid;border-color: #00a2e8;border-radius: 5px;border-width: 1px;padding: 3px;width: 40px;height: 40px;"/></div><div title="Create Note" style="float:left; width: 45 px; height: 45 px; padding: 3px;" onmouseover="" onclick="return Moxtra.toolbar_startnote();"><img src="' + r.d + '/api/images/note.png" alt="Click to create Note"  style="max-width: none;border-style:solid;border-color: #00a2e8;border-radius: 5px;border-width: 1px;padding: 3px;width: 40px;height: 40px;"/></div><div title="Chat Now" style="float:left; width: 45 px; height: 45 px;padding:3px;" onmouseover="" onclick="return Moxtra.toolbar_startchat();"><img src="' + r.d + '/api/images/chat.png" alt="Click to join the conversation" style="max-width: none;border-style:solid;border-color: #00a2e8;border-radius: 5px;border-width: 1px;padding: 3px;width: 40px;height: 40px;"/></div><div title="Click to toggle timeline" style="float:left; width: 45 px; height: 45 px;padding:3px;" onmouseover="window[ \'_mtool\' ].stop();" onclick="window[ \'_mtool\' ].toggle();"><img src="' + r.d + '/api/images/logo.png" alt="Click to toggle timeline" style="max-width: none;border-style:solid;border-color: #00a2e8;border-radius: 5px;border-width: 1px;padding: 3px;width: 40px;height: 40px;"/>', t && (e += '<div style="position: absolute; bottom: 45px; right: 3px; font: bold 14px arial; text-align:center;"><img src="' + r.d + '/api/images/mini_wait.gif"/></div>'), o.innerHTML = e + "</div></div>", a.body.appendChild(o), r.r = setInterval(r.query, 5e3))
                        },
                        start: function() {},
                        stop: function() {
                            r.q = 1, r.c.style.bottom = "5px", clearInterval(r.i)
                        },
                        toggle: function(e) {
                            clearInterval(r.o);
                            var t = r.c.childNodes[0],
                                o = -100;
                            "hidden" == t.style.visibility && 1 != e && (o *= -1, t.style.width = "0px", t.style.height = "0px", t.style.visibility = "visible"), r.o = setInterval(function() {
                                r.show(t, o)
                            }, 1)
                        },
                        show: function(e, t) {
                            var o = e.offsetWidth + t,
                                a = e.offsetHeight + t,
                                i = 0;
                            0 <= a || (a = 0), 0 <= o || (o = 0), 0 <= o && 0 <= a && (o <= r.w ? i = 1 : o = r.w, a <= r.h ? i = 1 : a = r.h, e.style.width = o + "px", e.style.height = a + "px"), (!i || 0 >= o || 0 >= a) && (clearInterval(r.o), o < r.w ? (e.style.visibility = "hidden", e.style.padding = "0") : e.style.padding = "8px"), "hidden" == e.style.visibility && (r.r = setInterval(r.query, 2e3))
                        },
                        query: function() {
                            try {
                                jQuery.ajax({
                                    url: Moxtra.baseUrl + "/oauthapi/unreadfeed",
                                    dataType: "jsonp",
                                    success: function(e) {
                                        e && "ok" == e.status ? (clearInterval(r.r), r.r = setInterval(r.query, 18e4), Moxtra._barlogin = !0) : Moxtra._barlogin = !1, e && e.count ? r.c.lastChild.lastChild.lastChild.innerHTML = '<font color="white" style="background-color:red;border-radius: 100%;">' + e.count + "</font>" : r.c.lastChild.lastChild.lastChild.innerHTML = ""
                                    },
                                    error: function(e) {
                                        clearInterval(r.r), r.c.lastChild.lastChild.lastChild.innerHTML = "", r.r = setInterval(r.query, 1e4), Moxtra._barlogin = !1
                                    }
                                })
                            } catch (e) {}
                        },
                        esc_close: function(e) {
                            27 == (e.keyCode || e.which) && r.toggle(!0)
                        }
                    };
                    window._mtool = r, r.init('<iframe id="_mtoolf" src="' + Moxtra._SSOUrl(null, 4) + '" frameborder="0" allowtransparency="true" allowfullscreen="true" style="width: 100%; height: 100%; overflow: scroll; background-color: transparent;"></iframe>', 1)
                }
            }, o = 0, r = (e = document.getElementsByTagName("input")).length; o < r; o++) t(e[o]);
        c && (i ? eventFire(i, "click") : (m && Moxtra.init(m), Moxtra.meet(c))), l && (d ? eventFire(d, "click") : (m && Moxtra.init(m), Moxtra.note(l))), _ && (m && Moxtra.init(m), Moxtra.video(_))
    },
    function() {
        var e;
        if (e = document.getElementById("moxtrajs"), Moxtra.appKey || (Moxtra.appKey = e ? e.getAttribute("data-app-key") : void 0), Moxtra.partnerId || (Moxtra.partnerId = e ? e.getAttribute("data-partner-id") : void 0), Moxtra.orgId || (Moxtra.orgId = e ? e.getAttribute("data-org-id") : void 0), Moxtra.clientId || (Moxtra.clientId = e ? e.getAttribute("data-client-id") : void 0), e) {
            var t = e.getAttribute("src");
            t.indexOf("grouphour.com") >= 0 ? Moxtra.baseUrl = "https://www.grouphour.com" : t.indexOf("../js") >= 0 && (Moxtra.baseUrl = "https://" + window.location.host)
        }
        "idpdemo" == Moxtra.appKey ? Moxtra.ssoUrl = Moxtra.baseUrl + "/sp/spdemo" : Moxtra.ssoUrl = Moxtra.baseUrl + "/sp/startSSO", m_r(function() {
            m_a()
        })
    }();