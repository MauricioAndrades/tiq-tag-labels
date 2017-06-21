(function(global) {
    !function() {
        String.prototype.findAll = function(t) {for (var r = [], e = this.indexOf(t); e !== -1;) {r.push(e),e = this.indexOf(t, e + t.length);}return r;},
        String.prototype.replaceControlCharacters = function() {return this.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u0080-\u009f]/g, "\uFFFD");},
        String.prototype.isWhitespace = function() {return /^\s*$/.test(this);},
        String.prototype.computeLineEndings = function() {var t = this.findAll("\\n"); return t.push(this.length),t;},
        String.prototype.escapeCharacters = function(t) {for (var r = !1, e = 0; e < t.length; ++e) {if (this.indexOf(t.charAt(e)) !== -1) {r = !0; break;}}if (!r) {return String(this);}for (var n = "", e = 0; e < this.length; ++e) {t.indexOf(this.charAt(e)) !== -1 && (n += "\\"),n += this.charAt(e);}return n;},
        String.regexSpecialCharacters = function() {return "^[]{}()\\.^$*+?|-,";},
        String.prototype.escapeForRegExp = function() {return this.escapeCharacters(String.regexSpecialCharacters());},
        String.prototype.escapeHTML = function() {return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");},
        String.prototype.unescapeHTML = function() {return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#58;/g, ":").replace(/&quot;/g, '"').replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&amp;/g, "&");},
        String.prototype.collapseWhitespace = function() {return this.replace(/[\s\xA0]+/g, " ");},
        String.prototype.trimMiddle = function(t) {if (this.length <= t) {return String(this);}var r = t >> 1,e = t - r - 1; return this.substr(0, r) + "…" + this.substr(this.length - e, e);},
        String.prototype.trimEnd = function(t) {return this.length <= t ? String(this) : this.substr(0, t - 1) + "…";},
        String.prototype.trimURL = function(t) {var r = this.replace(/^(https|http|file):\/\//i, ""); return t && r.toLowerCase().startsWith(t.toLowerCase()) && (r = r.substr(t.length)),r;},
        String.prototype.toTitleCase = function() {return this.substring(0, 1).toUpperCase() + this.substring(1);},
        String.prototype.compareTo = function(t) {return this > t ? 1 : this < t ? -1 : 0;},
        String.prototype.removeURLFragment = function() {var t = this.indexOf("#"); return t === -1 && (t = this.length),this.substring(0, t);},
        String.hashCode = function(t) {if (!t) {return 0;}for (var r = 4294967291, e = 1345575271, n = 1506996573, i = 0, o = 1, s = 0; s < t.length; s++) {var a = t.charCodeAt(s) * n; i = (i + o * a) % r,o = o * e % r;}return i = (i + o * (r - 1)) % r,Math.abs(0 | i);},
        String.isDigitAt = function(t, r) {var e = t.charCodeAt(r); return 48 <= e && e <= 57;},
        String.prototype.toBase64 = function() {function t(t) {return t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : 62 === t ? 43 : 63 === t ? 47 : 65;}var r = new TextEncoder,e = r.encode(this.toString()),n = e.length,i = ""; if (0 === n) {return i;}for (var o, s = 0, a = 0; a < n; a++) {o = a % 3,s |= e[a] << (16 >>> o & 24),2 === o && (i += String.fromCharCode(t(s >>> 18 & 63), t(s >>> 12 & 63), t(s >>> 6 & 63), t(63 & s)),s = 0);}return 0 === o ? i += String.fromCharCode(t(s >>> 18 & 63), t(s >>> 12 & 63), 61, 61) : 1 === o && (i += String.fromCharCode(t(s >>> 18 & 63), t(s >>> 12 & 63), t(s >>> 6 & 63), 61)),i;},
        String.naturalOrderComparator = function(t, r) {for (var e, n, i, o, s = /^\d+|^\D+/; ;) {if (!t) {return r ? -1 : 0;}if (!r) {return 1;}if (e = t.match(s)[0],n = r.match(s)[0],i = !isNaN(e),o = !isNaN(n),i && !o) {return -1;}if (o && !i) {return 1;}if (i && o) {var a = e - n; if (a) {return a;}if (e.length !== n.length) {return +e || +n ? n.length - e.length : e.length - n.length;}} else if (e !== n) {return e < n ? -1 : 1;}t = t.substring(e.length),r = r.substring(n.length);}},
        String.caseInsensetiveComparator = function(t, r) {return t = t.toUpperCase(),r = r.toUpperCase(),t === r ? 0 : t > r ? 1 : -1;};
    }();
    var kindof = function(data) {
        var data_type = Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase().replace(/^html|element/gim, "");
        switch (data_type) {
            case "number":
            return isNaN(data) ? "nan" : "number";
            default:
            return data_type;
        }
    };
    var build_regex = function(search_value) {
        if (kindof(search_value) === "string") {
            return new RegExp(search_value.escapeForRegExp(), "igm");
        } else {
            return search_value;
        }
    };
    var get_text_content = function() {
        return this.textContent.toLowerCase().collapseWhitespace().trim();
    };
    var unmatched_but_selected = function() {
        var args = Array.from(arguments);
        var text = args[0];
        var regex = args[1];
        return $(this).hasClass("selected") && !text.match(regex);
    };
    var tiq = {
        copy: {
            load_rule: function(uid) {
                function quickcopyLR(id) {
                    return new Promise(function(res, rej) {
                        if (typeof id !== "number") {
                            let loadrule_error = new Error("id must be a number");
                            rej(loadrule_error);
                        }
                        utui.automator.copyLoadRule(id);
                        var data = utui.automator.getClipboard()[0].obj;
                        if (data) {res(data);}
                    });
                }
                return quickcopyLR(uid).then(function(data) {
                    return data;
                }).catch(function(e) {
                    console.log(e);
                });
            },
            tag: function(uid) {
                utui.automator.emptyClipboard();
                var copy_tag = function(tag_id, callback) {
                    utui.automator.copyTag(tag_id);
                    var tag = utui.automator.getClipboard();
                    if (tag) {
                        callback(tag);
                    }
                };
                copy_tag(uid, function(arr) {
                    copy(arr[0].obj);
                });
                console.log("done... check your clipboard");
            }
        },
        select: {
        /**
         *  mau5.select.tag("facebook") or mau5.select.tag(/facebook/igm)
         */
         tag: function(string_or_regex) {
             var regex = build_regex(string_or_regex);
             $(".manage_container").each(function() {
                 var text = get_text_content.call(this);
                 if (unmatched_but_selected.apply(this, [text, regex])) {
                     $(this).find("input").click();
                     $(this).removeClass("selected");
                 }
                 if (text.match(regex)) {
                     $(this).find("input").click();
                     $(this).addClass("selected");
                 }
             });
         },
        /**
         *  mau5.select.loadrule("ga") or mau5.select.loadrule(/ga/igm)
         */
         loadrule: function(string_or_regex) {
             var regex = build_regex(string_or_regex);
             $(".loadrules_container").each(function() {
                 var text = get_text_content.call(this);
                 if (unmatched_but_selected.apply(this, [text, regex])) {
                     $(this).find("input").click();
                     $(this).removeClass("selected");
                 }
                 if (text.match(regex)) {
                     $(this).find("input").click();
                     $(this).addClass("selected");
                 }
             });
         },
        /**
         *  mau5.select.extension("value") or mau5.select.extension(/regex/igm)
         */
         extension: function(string_or_regex) {
             var regex = build_regex(string_or_regex);
             $(".customize_container").each(function() {
                 var text = this.textContent.toLowerCase().collapseWhitespace().trim();
                 if (text.match(regex)) {
                     $(this).find("input").click();
                     $(this).addClass("selected");
                 }
             });
         }
        },
        deselect: function() {
            $(".selected").find("input").click();
        }
    };
    global.tiq = tiq;
    })(window);
