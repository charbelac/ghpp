/*
  SlidesJS 3.0.4 http://slidesjs.com
  (c) 2013 by Nathan Searles http://nathansearles.com
  Updated: June 26th, 2013
  Apache License: http://www.apache.org/licenses/LICENSE-2.0
*/
(function() {
    (function(e, t, n) {
        var r, i, s;
        s = "slidesjs";
        i = {
            width: 940,
            height: 528,
            start: 1,
            navigation: {
                active: !0,
                effect: "slide"
            },
            pagination: {
                active: !0,
                effect: "slide"
            },
            play: {
                active: !1,
                effect: "slide",
                interval: 5e3,
                auto: !1,
                swap: !0,
                pauseOnHover: !1,
                restartDelay: 2500
            },
            effect: {
                slide: {
                    speed: 500
                },
                fade: {
                    speed: 300,
                    crossfade: !0
                }
            },
            callback: {
                loaded: function() {},
                start: function() {},
                complete: function() {}
            }
        };
        r = function() {
            function t(t, n) {
                this.element = t;
                this.options = e.extend(!0, {}, i, n);
                this._defaults = i;
                this._name = s;
                this.init()
            }
            return t
        }();
        r.prototype.init = function() {
            var n, r, i, s, o, u, a = this;
            n = e(this.element);
            this.data = e.data(this);
            e.data(this, "animating", !1);
            e.data(this, "total", n.children().not(".slidesjs-navigation", n).length);
            e.data(this, "current", this.options.start - 1);
            e.data(this, "vendorPrefix", this._getVendorPrefix());
            if (typeof TouchEvent != "undefined") {
                e.data(this, "touch", !0);
                this.options.effect.slide.speed = this.options.effect.slide.speed / 2
            }
            n.css({
                overflow: "hidden"
            });
            n.slidesContainer = n.children().not(".slidesjs-navigation", n).wrapAll("<div class='slidesjs-container'>", n).parent().css({
                overflow: "hidden",
                position: "relative"
            });
            e(".slidesjs-container", n).wrapInner("<div class='slidesjs-control'>", n).children();
            e(".slidesjs-control", n).css({
                position: "relative",
                left: 0
            });
            e(".slidesjs-control", n).children().addClass("slidesjs-slide").css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 0,
                display: "none",
                webkitBackfaceVisibility: "hidden"
            });
            e.each(e(".slidesjs-control", n).children(), function(t) {
                var n;
                n = e(this);
                return n.attr("slidesjs-index", t)
            });
            if (this.data.touch) {
                e(".slidesjs-control", n).on("touchstart", function(e) {
                    return a._touchstart(e)
                });
                e(".slidesjs-control", n).on("touchmove", function(e) {
                    return a._touchmove(e)
                });
                e(".slidesjs-control", n).on("touchend", function(e) {
                    return a._touchend(e)
                })
            }
            n.fadeIn(0);
            this.update();
            this.data.touch && this._setuptouch();
            e(".slidesjs-control", n).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
                return e(this).css({
                    zIndex: 10
                })
            });
            if (this.options.navigation.active) {
                o = e("<a>", {
                    "class": "slidesjs-previous slidesjs-navigation",
                    href: "#",
                    title: "Previous",
                    text: "Previous"
                }).appendTo(n);
                r = e("<a>", {
                    "class": "slidesjs-next slidesjs-navigation",
                    href: "#",
                    title: "Next",
                    text: "Next"
                }).appendTo(n)
            }
            e(".slidesjs-next", n).click(function(e) {
                e.preventDefault();
                a.stop(!0);
                return a.next(a.options.navigation.effect)
            });
            e(".slidesjs-previous", n).click(function(e) {
                e.preventDefault();
                a.stop(!0);
                return a.previous(a.options.navigation.effect)
            });
            if (this.options.play.active) {
                s = e("<a>", {
                    "class": "slidesjs-play slidesjs-navigation",
                    href: "#",
                    title: "Play",
                    text: "Play"
                }).appendTo(n);
                u = e("<a>", {
                    "class": "slidesjs-stop slidesjs-navigation",
                    href: "#",
                    title: "Stop",
                    text: "Stop"
                }).appendTo(n);
                s.click(function(e) {
                    e.preventDefault();
                    return a.play(!0)
                });
                u.click(function(e) {
                    e.preventDefault();
                    return a.stop(!0)
                });
                this.options.play.swap && u.css({
                    display: "none"
                })
            }
            if (this.options.pagination.active) {
                i = e("<ul>", {
                    "class": "slidesjs-pagination"
                }).appendTo(n);
                e.each(new Array(this.data.total), function(t) {
                    var n, r;
                    n = e("<li>", {
                        "class": "slidesjs-pagination-item"
                    }).appendTo(i);
                    r = e("<a>", {
                        href: "#",
                        "data-slidesjs-item": t,
                        html: t + 1
                    }).appendTo(n);
                    return r.click(function(t) {
                        t.preventDefault();
                        a.stop(!0);
                        return a.goto(e(t.currentTarget).attr("data-slidesjs-item") * 1 + 1)
                    })
                })
            }
            e(t).bind("resize", function() {
                return a.update()
            });
            this._setActive();
            this.options.play.auto && this.play();
            return this.options.callback.loaded(this.options.start)
        };
        r.prototype._setActive = function(t) {
            var n, r;
            n = e(this.element);
            this.data = e.data(this);
            r = t > -1 ? t : this.data.current;
            e(".active", n).removeClass("active");
            return e(".slidesjs-pagination li:eq(" + r + ") a", n).addClass("active")
        };
        r.prototype.update = function() {
            var t, n, r;
            t = e(this.element);
            this.data = e.data(this);
            e(".slidesjs-control", t).children(":not(:eq(" + this.data.current + "))").css({
                display: "none",
                left: 0,
                zIndex: 0
            });
            r = t.width();
            n = this.options.height / this.options.width * r;
            this.options.width = r;
            this.options.height = n;
            return e(".slidesjs-control, .slidesjs-container", t).css({
                width: r,
                height: n
            })
        };
        r.prototype.next = function(t) {
            var n;
            n = e(this.element);
            this.data = e.data(this);
            e.data(this, "direction", "next");
            t === void 0 && (t = this.options.navigation.effect);
            return t === "fade" ? this._fade() : this._slide()
        };
        r.prototype.previous = function(t) {
            var n;
            n = e(this.element);
            this.data = e.data(this);
            e.data(this, "direction", "previous");
            t === void 0 && (t = this.options.navigation.effect);
            return t === "fade" ? this._fade() : this._slide()
        };
        r.prototype.goto = function(t) {
            var n, r;
            n = e(this.element);
            this.data = e.data(this);
            r === void 0 && (r = this.options.pagination.effect);
            t > this.data.total ? t = this.data.total : t < 1 && (t = 1);
            if (typeof t == "number") return r === "fade" ? this._fade(t) : this._slide(t);
            if (typeof t == "string") {
                if (t === "first") return r === "fade" ? this._fade(0) : this._slide(0);
                if (t === "last") return r === "fade" ? this._fade(this.data.total) : this._slide(this.data.total)
            }
        };
        r.prototype._setuptouch = function() {
            var t, n, r, i;
            t = e(this.element);
            this.data = e.data(this);
            i = e(".slidesjs-control", t);
            n = this.data.current + 1;
            r = this.data.current - 1;
            r < 0 && (r = this.data.total - 1);
            n > this.data.total - 1 && (n = 0);
            i.children(":eq(" + n + ")").css({
                display: "block",
                left: this.options.width
            });
            return i.children(":eq(" + r + ")").css({
                display: "block",
                left: -this.options.width
            })
        };
        r.prototype._touchstart = function(t) {
            var n, r;
            n = e(this.element);
            this.data = e.data(this);
            r = t.originalEvent.touches[0];
            this._setuptouch();
            e.data(this, "touchtimer", Number(new Date));
            e.data(this, "touchstartx", r.pageX);
            e.data(this, "touchstarty", r.pageY);
            return t.stopPropagation()
        };
        r.prototype._touchend = function(t) {
            var n, r, i, s, o, u, a, f = this;
            n = e(this.element);
            this.data = e.data(this);
            u = t.originalEvent.touches[0];
            s = e(".slidesjs-control", n);
            if (s.position().left > this.options.width * .5 || s.position().left > this.options.width * .1 && Number(new Date) - this.data.touchtimer < 250) {
                e.data(this, "direction", "previous");
                this._slide()
            } else if (s.position().left < -(this.options.width * .5) || s.position().left < -(this.options.width * .1) && Number(new Date) - this.data.touchtimer < 250) {
                e.data(this, "direction", "next");
                this._slide()
            } else {
                i = this.data.vendorPrefix;
                a = i + "Transform";
                r = i + "TransitionDuration";
                o = i + "TransitionTimingFunction";
                s[0].style[a] = "translateX(0px)";
                s[0].style[r] = this.options.effect.slide.speed * .85 + "ms"
            }
            s.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                i = f.data.vendorPrefix;
                a = i + "Transform";
                r = i + "TransitionDuration";
                o = i + "TransitionTimingFunction";
                s[0].style[a] = "";
                s[0].style[r] = "";
                return s[0].style[o] = ""
            });
            return t.stopPropagation()
        };
        r.prototype._touchmove = function(t) {
            var n, r, i, s, o;
            n = e(this.element);
            this.data = e.data(this);
            s = t.originalEvent.touches[0];
            r = this.data.vendorPrefix;
            i = e(".slidesjs-control", n);
            o = r + "Transform";
            e.data(this, "scrolling", Math.abs(s.pageX - this.data.touchstartx) < Math.abs(s.pageY - this.data.touchstarty));
            if (!this.data.animating && !this.data.scrolling) {
                t.preventDefault();
                this._setuptouch();
                i[0].style[o] = "translateX(" + (s.pageX - this.data.touchstartx) + "px)"
            }
            return t.stopPropagation()
        };
        r.prototype.play = function(t) {
            var n, r, i, s = this;
            n = e(this.element);
            this.data = e.data(this);
            if (!this.data.playInterval) {
                if (t) {
                    r = this.data.current;
                    this.data.direction = "next";
                    this.options.play.effect === "fade" ? this._fade() : this._slide()
                }
                e.data(this, "playInterval", setInterval(function() {
                    r = s.data.current;
                    s.data.direction = "next";
                    return s.options.play.effect === "fade" ? s._fade() : s._slide()
                }, this.options.play.interval));
                i = e(".slidesjs-container", n);
                if (this.options.play.pauseOnHover) {
                    i.unbind();
                    i.bind("mouseenter", function() {
                        return s.stop()
                    });
                    i.bind("mouseleave", function() {
                        return s.options.play.restartDelay ? e.data(s, "restartDelay", setTimeout(function() {
                            return s.play(!0)
                        }, s.options.play.restartDelay)) : s.play()
                    })
                }
                e.data(this, "playing", !0);
                e(".slidesjs-play", n).addClass("slidesjs-playing");
                if (this.options.play.swap) {
                    e(".slidesjs-play", n).hide();
                    return e(".slidesjs-stop", n).show()
                }
            }
        };
        r.prototype.stop = function(t) {
            var n;
            n = e(this.element);
            this.data = e.data(this);
            clearInterval(this.data.playInterval);
            this.options.play.pauseOnHover && t && e(".slidesjs-container", n).unbind();
            e.data(this, "playInterval", null);
            e.data(this, "playing", !1);
            e(".slidesjs-play", n).removeClass("slidesjs-playing");
            if (this.options.play.swap) {
                e(".slidesjs-stop", n).hide();
                return e(".slidesjs-play", n).show()
            }
        };
        r.prototype._slide = function(t) {
            var n, r, i, s, o, u, a, f, l, c, h = this;
            n = e(this.element);
            this.data = e.data(this);
            if (!this.data.animating && t !== this.data.current + 1) {
                e.data(this, "animating", !0);
                r = this.data.current;
                if (t > -1) {
                    t -= 1;
                    c = t > r ? 1 : -1;
                    i = t > r ? -this.options.width : this.options.width;
                    o = t
                } else {
                    c = this.data.direction === "next" ? 1 : -1;
                    i = this.data.direction === "next" ? -this.options.width : this.options.width;
                    o = r + c
                }
                o === -1 && (o = this.data.total - 1);
                o === this.data.total && (o = 0);
                this._setActive(o);
                a = e(".slidesjs-control", n);
                t > -1 && a.children(":not(:eq(" + r + "))").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                });
                a.children(":eq(" + o + ")").css({
                    display: "block",
                    left: c * this.options.width,
                    zIndex: 10
                });
                this.options.callback.start(r + 1);
                if (this.data.vendorPrefix) {
                    u = this.data.vendorPrefix;
                    l = u + "Transform";
                    s = u + "TransitionDuration";
                    f = u + "TransitionTimingFunction";
                    a[0].style[l] = "translateX(" + i + "px)";
                    a[0].style[s] = this.options.effect.slide.speed + "ms";
                    return a.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                        a[0].style[l] = "";
                        a[0].style[s] = "";
                        a.children(":eq(" + o + ")").css({
                            left: 0
                        });
                        a.children(":eq(" + r + ")").css({
                            display: "none",
                            left: 0,
                            zIndex: 0
                        });
                        e.data(h, "current", o);
                        e.data(h, "animating", !1);
                        a.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
                        a.children(":not(:eq(" + o + "))").css({
                            display: "none",
                            left: 0,
                            zIndex: 0
                        });
                        h.data.touch && h._setuptouch();
                        return h.options.callback.complete(o + 1)
                    })
                }
                return a.stop().animate({
                    left: i
                }, this.options.effect.slide.speed, function() {
                    a.css({
                        left: 0
                    });
                    a.children(":eq(" + o + ")").css({
                        left: 0
                    });
                    return a.children(":eq(" + r + ")").css({
                        display: "none",
                        left: 0,
                        zIndex: 0
                    }, e.data(h, "current", o), e.data(h, "animating", !1), h.options.callback.complete(o + 1))
                })
            }
        };
        r.prototype._fade = function(t) {
            var n, r, i, s, o, u = this;
            n = e(this.element);
            this.data = e.data(this);
            if (!this.data.animating && t !== this.data.current + 1) {
                e.data(this, "animating", !0);
                r = this.data.current;
                if (t) {
                    t -= 1;
                    o = t > r ? 1 : -1;
                    i = t
                } else {
                    o = this.data.direction === "next" ? 1 : -1;
                    i = r + o
                }
                i === -1 && (i = this.data.total - 1);
                i === this.data.total && (i = 0);
                this._setActive(i);
                s = e(".slidesjs-control", n);
                s.children(":eq(" + i + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 10
                });
                this.options.callback.start(r + 1);
                if (this.options.effect.fade.crossfade) {
                    s.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed);
                    return s.children(":eq(" + i + ")").stop().fadeIn(this.options.effect.fade.speed, function() {
                        s.children(":eq(" + i + ")").css({
                            zIndex: 0
                        });
                        e.data(u, "animating", !1);
                        e.data(u, "current", i);
                        return u.options.callback.complete(i + 1)
                    })
                }
                return s.children(":eq(" + r + ")").stop().fadeOut(this.options.effect.fade.speed, function() {
                    s.children(":eq(" + i + ")").stop().fadeIn(u.options.effect.fade.speed, function() {
                        return s.children(":eq(" + i + ")").css({
                            zIndex: 10
                        })
                    });
                    e.data(u, "animating", !1);
                    e.data(u, "current", i);
                    return u.options.callback.complete(i + 1)
                })
            }
        };
        r.prototype._getVendorPrefix = function() {
            var e, t, r, i, s;
            e = n.body || n.documentElement;
            r = e.style;
            i = "transition";
            s = ["Moz", "Webkit", "Khtml", "O", "ms"];
            i = i.charAt(0).toUpperCase() + i.substr(1);
            t = 0;
            while (t < s.length) {
                if (typeof r[s[t] + i] == "string") return s[t];
                t++
            }
            return !1
        };
        return e.fn[s] = function(t) {
            return this.each(function() {
                if (!e.data(this, "plugin_" + s)) return e.data(this, "plugin_" + s, new r(this, t))
            })
        }
    })(jQuery, window, document)
}).call(this);


/*
 * Actual height/width plugin
 */
(function(a) {
    a.fn.addBack = a.fn.addBack || a.fn.andSelf;
    a.fn.extend({
        actual: function(b, l) {
            if (!this[b]) {
                throw '$.actual => The jQuery method "' + b + '" you called does not exist';
            }
            var f = {
                absolute: false,
                clone: false,
                includeMargin: false
            };
            var i = a.extend(f, l);
            var e = this.eq(0);
            var h, j;
            if (i.clone === true) {
                h = function() {
                    var m = "position: absolute !important; top: -1000 !important; ";
                    e = e.clone().attr("style", m).appendTo("body");
                };
                j = function() {
                    e.remove();
                };
            } else {
                var g = [];
                var d = "";
                var c;
                h = function() {
                    c = e.parents().addBack().filter(":hidden");
                    d += "visibility: hidden !important; display: block !important; ";
                    if (i.absolute === true) {
                        d += "position: absolute !important; ";
                    }
                    c.each(function() {
                        var m = a(this);
                        var n = m.attr("style");
                        g.push(n);
                        m.attr("style", n ? n + ";" + d : d);
                    });
                };
                j = function() {
                    c.each(function(m) {
                        var o = a(this);
                        var n = g[m];
                        if (n === undefined) {
                            o.removeAttr("style");
                        } else {
                            o.attr("style", n);
                        }
                    });
                };
            }
            h();
            var k = /(outer)/.test(b) ? e[b](i.includeMargin) : e[b]();
            j();
            return k;
        }
    });
})(jQuery);

/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode,
                g = f.name,
                h;
            return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !! h && d(h))
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }

    function d(b) {
        return !a(b).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.ui = a.ui || {};
    if (a.ui.version) return;
    a.extend(a.ui, {
        version: "1.8.23",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var b;
            return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]),
                    e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
        function h(b, c, d, f) {
            return a.each(e, function() {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            }), c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            f = d.toLowerCase(),
            g = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + d] = function(c) {
            return c === b ? g["inner" + d].call(this) : this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function(b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
            return function(c) {
                return !!a.data(c, b)
            }
        }) : function(b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var d = a.attr(b, "tabindex"),
                e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }
    }), a(function() {
        var b = document.body,
            c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
            },
            call: function(a, b, c) {
                var d = a.plugins[b];
                if (!d || !a.element[0].parentNode) return;
                for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden") return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop",
                e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },
        isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },
        isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    })
})(jQuery);;
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.widget.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(b) {
            for (var d = 0, e;
                (e = b[d]) != null; d++) try {
                a(e).triggerHandler("remove")
            } catch (f) {}
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function(b, c) {
            return this.each(function() {
                return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {}
                }), d.call(a(this), b, c)
            })
        }
    }
    a.widget = function(b, c, d) {
        var e = b.split(".")[0],
            f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
            return !!a.data(c, b)
        }, a[e] = a[e] || {}, a[e][b] = function(a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
            namespace: e,
            widgetName: b,
            widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: f
        }, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function(c, d) {
        a.fn[c] = function(e) {
            var f = typeof e == "string",
                g = Array.prototype.slice.call(arguments, 1),
                h = this;
            return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function() {
                var d = a.data(this, c),
                    f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b) return h = f, !1
            }) : this.each(function() {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            }), h)
        }
    }, a.Widget = function(a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(b, c) {
            a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e = c;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof c == "string") {
                if (d === b) return this.options[c];
                e = {}, e[c] = d
            }
            return this._setOptions(e), this
        },
        _setOptions: function(b) {
            var c = this;
            return a.each(b, function(a, b) {
                c._setOption(a, b)
            }), this
        },
        _setOption: function(a, b) {
            return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)
                for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }
    }
})(jQuery);;
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.mouse.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }), a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(b) {
            if (c) return;
            this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
            var d = this,
                e = b.which == 1,
                f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
            if (!e || f || !this._mouseCapture(b)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                d.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = this._mouseStart(b) !== !1;
                if (!this._mouseStarted) return b.preventDefault(), !0
            }
            return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                return d._mouseMove(a)
            }, this._mouseUpDelegate = function(a) {
                return d._mouseUp(a)
            }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
        },
        _mouseMove: function(b) {
            return !a.browser.msie || document.documentMode >= 9 || !! b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },
        _mouseUp: function(b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },
        _mouseStart: function(a) {},
        _mouseDrag: function(a) {},
        _mouseStop: function(a) {},
        _mouseCapture: function(a) {
            return !0
        }
    })
})(jQuery);;
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.position.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.ui = a.ui || {};
    var c = /left|center|right/,
        d = /top|center|bottom/,
        e = "center",
        f = {}, g = a.fn.position,
        h = a.fn.offset;
    a.fn.position = function(b) {
        if (!b || !b.of) return g.apply(this, arguments);
        b = a.extend({}, b);
        var h = a(b.of),
            i = h[0],
            j = (b.collision || "flip").split(" "),
            k = b.offset ? b.offset.split(" ") : [0, 0],
            l, m, n;
        return i.nodeType === 9 ? (l = h.width(), m = h.height(), n = {
            top: 0,
            left: 0
        }) : i.setTimeout ? (l = h.width(), m = h.height(), n = {
            top: h.scrollTop(),
            left: h.scrollLeft()
        }) : i.preventDefault ? (b.at = "left top", l = m = 0, n = {
            top: b.of.pageY,
            left: b.of.pageX
        }) : (l = h.outerWidth(), m = h.outerHeight(), n = h.offset()), a.each(["my", "at"], function() {
            var a = (b[this] || "").split(" ");
            a.length === 1 && (a = c.test(a[0]) ? a.concat([e]) : d.test(a[0]) ? [e].concat(a) : [e, e]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a
        }), j.length === 1 && (j[1] = j[0]), k[0] = parseInt(k[0], 10) || 0, k.length === 1 && (k[1] = k[0]), k[1] = parseInt(k[1], 10) || 0, b.at[0] === "right" ? n.left += l : b.at[0] === e && (n.left += l / 2), b.at[1] === "bottom" ? n.top += m : b.at[1] === e && (n.top += m / 2), n.left += k[0], n.top += k[1], this.each(function() {
            var c = a(this),
                d = c.outerWidth(),
                g = c.outerHeight(),
                h = parseInt(a.curCSS(this, "marginLeft", !0)) || 0,
                i = parseInt(a.curCSS(this, "marginTop", !0)) || 0,
                o = d + h + (parseInt(a.curCSS(this, "marginRight", !0)) || 0),
                p = g + i + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0),
                q = a.extend({}, n),
                r;
            b.my[0] === "right" ? q.left -= d : b.my[0] === e && (q.left -= d / 2), b.my[1] === "bottom" ? q.top -= g : b.my[1] === e && (q.top -= g / 2), f.fractions || (q.left = Math.round(q.left), q.top = Math.round(q.top)), r = {
                left: q.left - h,
                top: q.top - i
            }, a.each(["left", "top"], function(c, e) {
                a.ui.position[j[c]] && a.ui.position[j[c]][e](q, {
                    targetWidth: l,
                    targetHeight: m,
                    elemWidth: d,
                    elemHeight: g,
                    collisionPosition: r,
                    collisionWidth: o,
                    collisionHeight: p,
                    offset: k,
                    my: b.my,
                    at: b.at
                })
            }), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(q, {
                using: b.using
            }))
        })
    }, a.ui.position = {
        fit: {
            left: function(b, c) {
                var d = a(window),
                    e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
                b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left)
            },
            top: function(b, c) {
                var d = a(window),
                    e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
                b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top)
            }
        },
        flip: {
            left: function(b, c) {
                if (c.at[0] === e) return;
                var d = a(window),
                    f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(),
                    g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0,
                    h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth,
                    i = -2 * c.offset[0];
                b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0
            },
            top: function(b, c) {
                if (c.at[1] === e) return;
                var d = a(window),
                    f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(),
                    g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0,
                    h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight,
                    i = -2 * c.offset[1];
                b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0
            }
        }
    }, a.offset.setOffset || (a.offset.setOffset = function(b, c) {
        /static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
        var d = a(b),
            e = d.offset(),
            f = parseInt(a.curCSS(b, "top", !0), 10) || 0,
            g = parseInt(a.curCSS(b, "left", !0), 10) || 0,
            h = {
                top: c.top - e.top + f,
                left: c.left - e.left + g
            };
        "using" in c ? c.using.call(b, h) : d.css(h)
    }, a.fn.offset = function(b) {
        var c = this[0];
        return !c || !c.ownerDocument ? null : b ? a.isFunction(b) ? this.each(function(c) {
            a(this).offset(b.call(this, c, a(this).offset()))
        }) : this.each(function() {
            a.offset.setOffset(this, b)
        }) : h.call(this)
    }), a.curCSS || (a.curCSS = a.css),
    function() {
        var b = document.getElementsByTagName("body")[0],
            c = document.createElement("div"),
            d, e, g, h, i;
        d = document.createElement(b ? "div" : "body"), g = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, b && a.extend(g, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (var j in g) d.style[j] = g[j];
        d.appendChild(c), e = b || document.documentElement, e.insertBefore(d, e.firstChild), c.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", h = a(c).offset(function(a, b) {
            return b
        }).offset(), d.innerHTML = "", e.removeChild(d), i = h.top + h.left + (b ? 2e3 : 0), f.fractions = i > 21 && i < 22
    }()
})(jQuery);;
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.draggable.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function() {
            if (!this.element.data("draggable")) return;
            return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },
        _mouseCapture: function(b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(b) {
            var c = this.options;
            return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
        },
        _mouseDrag: function(b, c) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
        },
        _mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
            var d = this.element[0],
                e = !1;
            while (d && (d = d.parentNode)) d == document && (e = !0);
            if (!e && this.options.helper === "original") return !1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var f = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    f._trigger("stop", b) !== !1 && f._clear()
                })
            } else this._trigger("stop", b) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function(b) {
            return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
            return a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            }), c
        },
        _createHelper: function(b) {
            var c = this.options,
                d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment),
                    d = c[0];
                if (!d) return;
                var e = c.offset(),
                    f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            } else b.containment.constructor == Array && (this.containment = b.containment)
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1,
                e = this.options,
                f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
                d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(d[0].tagName),
                f = b.pageX,
                g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(b, c, d) {
            return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function(a) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), a.extend(a.ui.draggable, {
        version: "1.8.23"
    }), a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = a.extend({}, c, {
                    item: d.element
                });
            d.sortables = [], a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },
        stop: function(b, c) {
            var d = a(this).data("draggable"),
                e = a.extend({}, c, {
                    item: d.element
                });
            a.each(d.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = this,
                f = function(b) {
                    var c = this.offset.click.top,
                        d = this.offset.click.left,
                        e = this.positionAbs.top,
                        f = this.positionAbs.left,
                        g = b.height,
                        h = b.width,
                        i = b.top,
                        j = b.left;
                    return a.ui.isOver(e + c, f + d, i, j, g, h)
                };
            a.each(d.sortables, function(f) {
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }
    }), a.ui.plugin.add("draggable", "cursor", {
        start: function(b, c) {
            var d = a("body"),
                e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }
    }), a.ui.plugin.add("draggable", "opacity", {
        start: function(b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }
    }), a.ui.plugin.add("draggable", "scroll", {
        start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }
    }), a.ui.plugin.add("draggable", "snap", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options;
            d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
                var b = a(this),
                    c = b.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: c.top,
                    left: c.left
                })
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = e.snapTolerance,
                g = c.offset.left,
                h = g + d.helperProportions.width,
                i = c.offset.top,
                j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left,
                    m = l + d.snapElements[k].width,
                    n = d.snapElements[k].top,
                    o = n + d.snapElements[k].height;
                if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })), d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f,
                        q = Math.abs(o - i) <= f,
                        r = Math.abs(l - h) <= f,
                        s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                        top: o,
                        left: 0
                    }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l - d.helperProportions.width
                    }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m
                    }).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f,
                        q = Math.abs(o - j) <= f,
                        r = Math.abs(l - g) <= f,
                        s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n,
                        left: 0
                    }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                        top: o - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m - d.helperProportions.width
                    }).left - d.margins.left)
                }!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[k].item
                })), d.snapElements[k].snapping = p || q || r || s || t
            }
        }
    }), a.ui.plugin.add("draggable", "stack", {
        start: function(b, c) {
            var d = a(this).data("draggable").options,
                e = a.makeArray(a(d.stack)).sort(function(b, c) {
                    return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                });
            if (!e.length) return;
            var f = parseInt(e[0].style.zIndex) || 0;
            a(e).each(function(a) {
                this.style.zIndex = f + a
            }), this[0].style.zIndex = f + e.length
        }
    }), a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }
    })
})(jQuery);;
/*! jQuery UI - v1.8.23 - 2012-08-15
/* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a, b) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var b = this.options,
                c = b.accept;
            this.isover = 0, this.isout = 1, this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) b[c] == this && b.splice(c, 1);
            return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
        },
        _setOption: function(b, c) {
            b == "accept" && (this.accept = a.isFunction(c) ? c : function(a) {
                return a.is(c)
            }), a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
        },
        _deactivate: function(b) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
        },
        _over: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
        },
        _out: function(b) {
            var c = a.ui.ddmanager.current;
            if (!c || (c.currentItem || c.element)[0] == this.element[0]) return;
            this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
        },
        _drop: function(b, c) {
            var d = c || a.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) return !1;
            var e = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                    offset: b.element.offset()
                }), b.options.tolerance)) return e = !0, !1
            }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1
        },
        ui: function(a) {
            return {
                draggable: a.currentItem || a.element,
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    }), a.extend(a.ui.droppable, {
        version: "1.8.23"
    }), a.ui.intersect = function(b, c, d) {
        if (!c.offset) return !1;
        var e = (b.positionAbs || b.position.absolute).left,
            f = e + b.helperProportions.width,
            g = (b.positionAbs || b.position.absolute).top,
            h = g + b.helperProportions.height,
            i = c.offset.left,
            j = i + c.proportions.width,
            k = c.offset.top,
            l = k + c.proportions.height;
        switch (d) {
            case "fit":
                return i <= e && f <= j && k <= g && h <= l;
            case "intersect":
                return i < e + b.helperProportions.width / 2 && f - b.helperProportions.width / 2 < j && k < g + b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < l;
            case "pointer":
                var m = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left,
                    n = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top,
                    o = a.ui.isOver(n, m, k, i, c.proportions.height, c.proportions.width);
                return o;
            case "touch":
                return (g >= k && g <= l || h >= k && h <= l || g < k && h > l) && (e >= i && e <= j || f >= i && f <= j || e < i && f > j);
            default:
                return !1
        }
    }, a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(b, c) {
            var d = a.ui.ddmanager.droppables[b.options.scope] || [],
                e = c ? c.type : null,
                f = (b.currentItem || b.element).find(":data(droppable)").andSelf();
            g: for (var h = 0; h < d.length; h++) {
                if (d[h].options.disabled || b && !d[h].accept.call(d[h].element[0], b.currentItem || b.element)) continue;
                for (var i = 0; i < f.length; i++)
                    if (f[i] == d[h].element[0]) {
                        d[h].proportions.height = 0;
                        continue g
                    }
                d[h].visible = d[h].element.css("display") != "none";
                if (!d[h].visible) continue;
                e == "mousedown" && d[h]._activate.call(d[h], c), d[h].offset = d[h].element.offset(), d[h].proportions = {
                    width: d[h].element[0].offsetWidth,
                    height: d[h].element[0].offsetHeight
                }
            }
        },
        drop: function(b, c) {
            var d = !1;
            return a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!this.options) return;
                !this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, c))
            }), d
        },
        dragStart: function(b, c) {
            b.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            })
        },
        drag: function(b, c) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) return;
                var d = a.ui.intersect(b, this, this.options.tolerance),
                    e = !d && this.isover == 1 ? "isout" : d && this.isover == 0 ? "isover" : null;
                if (!e) return;
                var f;
                if (this.options.greedy) {
                    var g = this.element.parents(":data(droppable):eq(0)");
                    g.length && (f = a.data(g[0], "droppable"), f.greedyChild = e == "isover" ? 1 : 0)
                }
                f && e == "isover" && (f.isover = 0, f.isout = 1, f._out.call(f, c)), this[e] = 1, this[e == "isout" ? "isover" : "isout"] = 0, this[e == "isover" ? "_over" : "_out"].call(this, c), f && e == "isout" && (f.isout = 0, f.isover = 1, f._over.call(f, c))
            })
        },
        dragStop: function(b, c) {
            b.element.parents(":not(body,html)").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        }
    }
})(jQuery);;



/**************************************************
 ***************************************************
 ****************jquery.ui.touch********************
 ***************************************************
 **************************************************/

function cancelTap() {
    tapValid = false
}

function cancelHold() {
    if (rightClickPending) {
        window.clearTimeout(holdTimeout);
        rightClickPending = false;
        rightClickEvent = null
    }
}

function startHold(e) {
    if (rightClickPending) return;
    rightClickPending = true;
    rightClickEvent = e.changedTouches[0];
    holdTimeout = window.setTimeout("doRightClick();", 800)
}

function doRightClick() {
    rightClickPending = false;
    var e = rightClickEvent,
        t = document.createEvent("MouseEvent");
    t.initMouseEvent("mouseup", true, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);
    e.target.dispatchEvent(t);
    t = document.createEvent("MouseEvent");
    t.initMouseEvent("mousedown", true, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 2, null);
    e.target.dispatchEvent(t);
    t = document.createEvent("MouseEvent");
    t.initMouseEvent("contextmenu", true, true, window, 1, e.screenX + 50, e.screenY + 5, e.clientX + 50, e.clientY + 5, false, false, false, false, 2, null);
    e.target.dispatchEvent(t);
    cancelMouseUp = true;
    rightClickEvent = null
}

function iPadTouchStart(e) {
    var t = e.changedTouches,
        n = t[0],
        r = "mouseover",
        i = document.createEvent("MouseEvent");
    i.initMouseEvent(r, true, true, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, false, false, false, false, 0, null);
    n.target.dispatchEvent(i);
    r = "mousedown";
    i = document.createEvent("MouseEvent");
    i.initMouseEvent(r, true, true, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, false, false, false, false, 0, null);
    n.target.dispatchEvent(i);
    if (!tapValid) {
        lastTap = n.target;
        tapValid = true;
        tapTimeout = window.setTimeout("cancelTap();", 600);
        startHold(e)
    } else {
        window.clearTimeout(tapTimeout);
        if (n.target == lastTap) {
            lastTap = null;
            tapValid = false;
            r = "click";
            i = document.createEvent("MouseEvent");
            i.initMouseEvent(r, true, true, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, false, false, false, false, 0, null);
            n.target.dispatchEvent(i);
            r = "dblclick";
            i = document.createEvent("MouseEvent");
            i.initMouseEvent(r, true, true, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, false, false, false, false, 0, null);
            n.target.dispatchEvent(i)
        } else {
            lastTap = n.target;
            tapValid = true;
            tapTimeout = window.setTimeout("cancelTap();", 600);
            startHold(e)
        }
    }
}

function iPadTouchHandler(e) {
    var t = "",
        n = 0;
    if (e.touches.length > 1) return;
    switch (e.type) {
        case "touchstart":
            if ($(e.changedTouches[0].target).is("select")) {
                return
            }
            iPadTouchStart(e);
            e.preventDefault();
            return false;
            break;
        case "touchmove":
            cancelHold();
            t = "mousemove";
            e.preventDefault();
            break;
        case "touchend":
            if (cancelMouseUp) {
                cancelMouseUp = false;
                e.preventDefault();
                return false
            }
            cancelHold();
            t = "mouseup";
            break;
        default:
            return
    }
    var r = e.changedTouches,
        i = r[0],
        s = document.createEvent("MouseEvent");
    s.initMouseEvent(t, true, true, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, false, false, false, false, n, null);
    i.target.dispatchEvent(s);
    if (t == "mouseup" && tapValid && i.target == lastTap) {
        s = document.createEvent("MouseEvent");
        s.initMouseEvent("click", true, true, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, false, false, false, false, n, null);
        i.target.dispatchEvent(s)
    }
}
$(function() {
    $.extend($.support, {
        touch: "ontouchend" in document
    });
    if ($.support.touch) {
        var e = document.getElementsByClassName("QapTcha");
        for (i = 0; i < e.length; i++) {
            e[i].addEventListener("touchstart", iPadTouchHandler, false);
            e[i].addEventListener("touchmove", iPadTouchHandler, false);
            e[i].addEventListener("touchend", iPadTouchHandler, false);
            e[i].addEventListener("touchcancel", iPadTouchHandler, false)
        }
    }
});
var lastTap = null;
var tapValid = false;
var tapTimeout = null;
var rightClickPending = false;
var rightClickEvent = null;
var holdTimeout = null;
var cancelMouseUp = false


/************************************************************************
*************************************************************************
@Name :        QapTcha - jQuery Plugin
@Revison :     4.2
@Date :  06/09/2012  - dd/mm/YYYY
@Author:       ALPIXEL - (www.myjqueryplugins.com - www.alpixel.fr) 
@License :  Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
 
**************************************************************************
*************************************************************************/
jQuery.QapTcha = {
    build: function(options) {
        var defaults = {
            txtLock: 'Slide the arrow to unlock the form',
            txtUnlock: 'Form can be submited',
            disabledSubmit: true,
            autoRevert: true,
            PHPfile: '/unlock',
            autoSubmit: false
        };

        if (this.length > 0)
            return jQuery(this).each(function(i) {
                /** Vars **/
                var
                opts = $.extend(defaults, options),
                    $this = $(this),
                    form = $('form').has($this),
                    Clr = jQuery('<div>', {
                        'class': 'clr'
                    }),
                    bgSlider = jQuery('<div>', {
                        'class': 'bgSlider'
                    }),
                    Slider = jQuery('<div>', {
                        'class': 'Slider'
                    }),
                    TxtStatus = jQuery('<div>', {
                        'class': ' TxtStatus dropError',
                        text: opts.txtLock
                    }),
                    inputQapTcha = jQuery('<input>', {
                        name: generatePass(32),
                        value: generatePass(7),
                        type: 'hidden'
                    });

                /** Disabled submit button **/
                if (opts.disabledSubmit) form.find('input[type=\'submit\']').attr('disabled', 'disabled');

                /** Construct DOM **/
                bgSlider.appendTo($this);
                Clr.insertAfter(bgSlider);
                TxtStatus.insertAfter(Clr);
                inputQapTcha.appendTo($this);
                Slider.appendTo(bgSlider);
                $this.show();

                Slider.draggable({
                    revert: function() {
                        if (opts.autoRevert) {
                            if (parseInt(Slider.css("left")) > (bgSlider.width() - Slider.width() - 10)) return false;
                            else return true;
                        }
                    },
                    containment: bgSlider,
                    axis: 'x',
                    stop: function(event, ui) {
                        if (ui.position.left > (bgSlider.width() - Slider.width() - 10)) {
                            // set the SESSION iQaptcha in PHP file
                            $.post(opts.PHPfile, {
                                    action: 'qaptcha',
                                    qaptcha_key: inputQapTcha.attr('name')
                                },
                                function(data) {
                                    if (!data.error) {
                                        Slider.draggable('disable').css('cursor', 'default');
                                        inputQapTcha.val('');
                                        TxtStatus.text(opts.txtUnlock).addClass('dropSuccess').removeClass('dropError');
                                        form.find('input[type=\'submit\']').removeAttr('disabled');
                                        if (opts.autoSubmit) form.find('input[type=\'submit\']').trigger('click');
                                    }
                                }, 'json');
                        }
                    }
                });

                function generatePass(nb) {
                    var chars = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN_-#@';
                    var pass = '';
                    for (i = 0; i < nb; i++) {
                        var wpos = Math.round(Math.random() * chars.length);
                        pass += chars.substring(wpos, wpos + 1);
                    }
                    return pass;
                }

            });
    }
};
jQuery.fn.QapTcha = jQuery.QapTcha.build;








/********** MOBILE MENU ************/

$('#navOpenBtn').on('click', function() {
    var $menu = $('.sf-menu');

    (!$menu.hasClass('opened')) ? $menu.addClass('opened') : $menu.removeClass('opened');

});

/********** MOBILE ACCORDION ************/

$('.accordion dt').on('click mouseenter', function() {
    var $this = $(this);

    if (!$this.hasClass('activeTitle')) {
        var id = $this.attr('id');

        $('.accordion dt').removeClass('activeTitle');
        $('.accordion dd').removeClass('activeDesc');
        $this.addClass('activeTitle');
        $this.next('dd').addClass('activeDesc');
    }
});

/********** IMAGE SLIDES ************/

$('#slides').slidesjs({
    width: 950,
    height: getImageHeight(),
    pagination: {
        active: false
    },
    effect: {
        slide: {
            speed: 1500
        }
    },
    navigation: {
        active: false
    },
    play: {
        active: false,
        auto: true,
        interval: 5000,
        swap: true
    }
});

function getImageHeight() {
    var $height = -1,
        myArr = [];

    $('#slides .slidesjs-control').children('div').each(function(i) {
        myArr.push($(this).actual('outerHeight'));
    });

    $height = Math.max.apply(Math, myArr);

    return $height;
}

$('#slides').height(getImageHeight() + 'px');

$(window).on('resize', function() {
    $('#slides').height(getImageHeight() + 'px');
});

/********** FONT SELECTOR ************/

$('#fontSmall, #fontMedium, #fontLarge').on('click', function() {
    var $this = $(this);

    if ($('.homeLayout').length !== 0) {
        var $text_1 = $('.accordion > p'),
            $text_2 = $('.accordion dd p, .accordion dt'),
            $text_3 = $('.promotionImageWrapper h3'),
            $text_4 = $('.promotionImageWrapper > p'),
            $text_5 = $('.buttonSkin');

        if ($this.prop('id') === 'fontSmall') {
            $text_1.css('font-size', '1.5em');
            $text_2.css('font-size', '1.3em');
            $text_3.css('font-size', '1.5em');
            $text_4.css('font-size', '1.3em');
            $text_5.css('font-size', '1.2em');
        } else if ($this.prop('id') === 'fontMedium') {
            $text_1.css('font-size', '1.6em');
            $text_2.css('font-size', '1.4em');
            $text_3.css('font-size', '1.6em');
            $text_4.css('font-size', '1.4em');
            $text_5.css('font-size', '1.3em');
        } else if ($this.prop('id') === 'fontLarge') {
            $text_1.css('font-size', '1.7em');
            $text_2.css('font-size', '1.5em');
            $text_3.css('font-size', '1.7em');
            $text_4.css('font-size', '1.5em');
            $text_5.css('font-size', '1.4em');
        }
    } else if ($('.genericLayout').length !== 0) {
        var $text_1 = $('.genericLayout h2'),
            $text_2 = $('.genericLayout p'),
            $text_3 = $('.promotionImageWrapper h3'),
            $text_4 = $('.promotionImageWrapper > p'),
            $text_5 = $('.buttonSkin'),
            $text_6 = $('.genericLayout h4'),
            $text_7 = $('.genericLayout .lead ul');

        if ($this.prop('id') === 'fontSmall') {
            $text_1.css('font-size', '2.3em');
            $text_2.css('font-size', '1.3em');
            $text_3.css('font-size', '1.5em');
            $text_4.css('font-size', '1.3em');
            $text_5.css('font-size', '1.2em');
            $text_6.css('font-size', '1.6em');
            $text_7.css('font-size', '1.3em');
        } else if ($this.prop('id') === 'fontMedium') {
            $text_1.css('font-size', '2.4em');
            $text_2.css('font-size', '1.4em');
            $text_3.css('font-size', '1.6em');
            $text_4.css('font-size', '1.4em');
            $text_5.css('font-size', '1.3em');
            $text_6.css('font-size', '1.7em');
            $text_7.css('font-size', '1.4em');
        } else if ($this.prop('id') === 'fontLarge') {
            $text_1.css('font-size', '2.5em');
            $text_2.css('font-size', '1.5em');
            $text_3.css('font-size', '1.7em');
            $text_4.css('font-size', '1.5em');
            $text_5.css('font-size', '1.4em');
            $text_6.css('font-size', '1.8em');
            $text_7.css('font-size', '1.5em');
        }
    } else if ($('.searchResults').length !== 0) {
        var $text_1 = $('.searchResults h3'),
            //$text_2 = $('#paging li a'),
            $text_3 = $('.searchResults p');

        if ($this.prop('id') === 'fontSmall') {
            $text_1.css('font-size', '2.3em');
            //$text_2.css('font-size', '.6em');
            $text_3.css('font-size', '1.3em');
        } else if ($this.prop('id') === 'fontMedium') {
            $text_1.css('font-size', '2.4em');
            //$text_2.css('font-size', '.7em');
            $text_3.css('font-size', '1.4em');
        } else if ($this.prop('id') === 'fontLarge') {
            $text_1.css('font-size', '2.5em');
            //$text_2.css('font-size', '.8em');
            $text_3.css('font-size', '1.5em');
        }
    } else if ($('.testimonialLayout').length !== 0) {
        var $text_1 = $('.searchResults p'),
            $text_2 = $('.testimonialDate');

        if ($this.prop('id') === 'fontSmall') {
            $text_1.css('font-size', '1.3em');
            $text_2.css('font-size', '1em');
        } else if ($this.prop('id') === 'fontMedium') {
            $text_1.css('font-size', '1.5em');
            $text_2.css('font-size', '1.1em');
        } else if ($this.prop('id') === 'fontLarge') {
            $text_1.css('font-size', '1.7em');
            $text_2.css('font-size', '1.2em');
        }
    }
});

/********** QAPTCHA INIT *********/

if ($('.testimonialLayout').length !== 0) {
    $('.QapTcha').QapTcha();
}


/********** SEARCH VALIDATION ************/
$('.searchBar input[type="submit"]').on('click', function() {
    var $this = $(this);
    if ($this.prev().val() === '') {
        $this.siblings('p').show();
        return false;
    } else {
        $this.siblings('p').hide();
        return true;
    }
});

/************** CONTACT US MODAL ****************/

var Modal = Modal || {};

Modal = {

    Init: function(_this) {
        var myModal = $(_this);

        Modal.Open(myModal);

        $(window).resize(function() {
            if (myModal.is(':visible')) {
                Modal.Open(myModal);
            }
        });
    },

    Open: function(modal) {
        var scrollY = $(window).scrollTop(),
            viewportHeight = $(window).height(),
            viewportWidth = $('#contactusWrapper').width(),
            outerHeightPx = $(modal).outerHeight(),
            scrollHeight = scrollY + (viewportHeight / 2) - (outerHeightPx / 2),
            viewportLeft = (viewportWidth - $(modal).outerWidth()) / 2;

        // This test is only for smartphone viewphone so the modal doesn't float outside the box
        if (scrollHeight < 0) scrollHeight = 15;

        $(modal).css({
            'top': scrollHeight + 'px',
            'left': viewportLeft + 'px'
        }).show();
        //$('body').css('overflow', 'hidden');
        $('.widgetContactusOverlay').css({
            'width': $(document).width(),
            'height': $(document).height()
        }).show();

        return false;
    },

    Close: function(_this) {
        //$('body').css('overflow', 'auto');
        $('.widgetContactusOverlay').css('display', 'none');
        $(_this).css('display', 'none');
    }
}

var isTestimonial = false;

/*
var recaptcha;

if ($('.testimonialLayout').length !== 0) {
isTestimonial = true;
recaptcha = $('#recaptchaContact').children('div').detach();
recaptcha.appendTo('#recaptchaTestimonial');
}

*/

$('#contactus').on('click', function() {
    // if (isTestimonial) {
    //  recaptcha = $('#recaptchaTestimonial').children('div').detach();
    //  recaptcha.appendTo('#recaptchaContact');
    // }
    var $this = $('#contactusForm');

    if (!$this.is(':visible')) {
        $this.css('visibility', 'visible')
        $('.contactusBg > p').css('display', 'none');
    }

    Modal.Init('#widgetContactUs');
});

$('#closeContactus').on('click', function(evt) {
    evt.preventDefault();
    Modal.Close('#widgetContactUs');
    //    if (isTestimonial) {
    //     $('.recaptcha_input_area label.error').remove();
    //     recaptcha.appendTo('#recaptchaTestimonial');
    // }
});


/************ CONTACT US *************/

$('#brochureSubForm').on('click', 'input[type="radio"]', function(evt) {
    var $this = $(this);
    if ($this.attr('id') === 'yesBrochure') {
        $this.siblings('div').slideDown('fast');
    } else {
        $this.siblings('div').slideUp('fast');
    }
});

jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/);
}, "Please specify a valid phone number");

var contactObj = {
    contactTime: {},
    contactMethod: {},
    brochures: {}
};

$('#fullname, #useremail, #userphone, #userquestions, #userreasons, #recaptcha_response_field').on('focusout', function() {
    var $this = $(this),
        id = $this.prop('id');

    switch (id) {
        case 'fullname':
            contactObj.name = $this.val();
            break;
        case 'useremail':
            contactObj.email = $this.val();
            break;
        case 'userphone':
            contactObj.phone = $this.val();
            break;
        case 'userquestions':
            contactObj.comments = $this.val();
            break;
        case 'userreasons':
            contactObj.reasons = $this.val();
            break;
        case 'recaptcha_response_field':
            contactObj.recaptcha = $this.val();
            break;
        default:
            break;
    }
});

$('#morning, #evening, #afternoon, #email, #phone').on('click', function() {
    var $this = $(this),
        id = $this.prop('id');

    switch (id) {
        case 'morning':
            contactObj.contactTime['morning'] = $this.prop('checked');
            break;
        case 'evening':
            contactObj.contactTime['evening'] = $this.prop('checked');
            break;
        case 'afternoon':
            contactObj.contactTime['afternoon'] = $this.prop('checked');
            break;
        case 'email':
            contactObj.contactMethod['email'] = $this.prop('checked');
            break;
        case 'phone':
            contactObj.contactMethod['phone'] = $this.prop('checked');
            break;
        default:
            break;
    }
});

$('#brochureSubForm').on('click', 'input[type="checkbox"]', function() {
    var $this = $(this);
    contactObj.brochures[$this.prop('id')] = $this.prop('checked')
});

$('#contactusForm').validate({
    // rules:{
    //  recaptcha_response_field:{
    //  required:true
    //  }
    // },

    submitHandler: function() {
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: {
                fields: contactObj
            },
            success: function(obj) {
                var data = $.parseJSON(obj),
                    thanksMsg = '<p><span>' + data.name + '</span>, thank you for submitting your information. Our team will contact you as soon as possible.</p>';

                $('#contactusForm').css('visibility', 'hidden');
                $('.contactusBg').append(thanksMsg);
                $('#widgetContactUs').delay(3000).fadeOut(600);
                $('.widgetContactusOverlay').delay(3000).fadeOut(600);
            },
            error: function(obj) {
                console.log('Error: ' + obj);
            }
        })

        // 1 - construct JSON
        // 2 - AJAX POST
        // 3 - RESPONSE --> Fail: Recaptcha Error
        //  --> Success: Thank you message then Close Modal

        return false;
    }
});

$('#testimonialForm').validate({
    rules: {
        recaptcha_response_field: {
            required: true
        }
    },

    messages: {
        recaptcha_response_field: "Please enter valid text in CAPTCHA control"
    },
    submitHandler: function(form) {
        if ($('#myFavoriteColor').val() !== '') {
            console.log('Spam - no submit');
        } else {
            console.log('Submit');
            form.submit();
            return false;
        }

    }
});

var isPrivacyOpen = false;

$('#privacy').on('click', function() {
    if (!isPrivacyOpen) {
        isPrivacyOpen = true;
        $(this).find('ul').slideDown();
    } else {
        isPrivacyOpen = false;
        $(this).find('ul').slideUp();
    }
});

var isLiveChat = true;

/************ LIVE CHAT *************/
$('#livechat, #smallLiveChat').on('click', function() {
    if (isLiveChat) {
        $('.purechat').show();
        isLiveChat = false;
    } else {
        $('.purechat').hide();
        isLiveChat = true;
    }
});

$('.purechat').on('mouseout', function() {
    $(this).css('display', 'block');
});
/************ SEARCH FIELD *************/
$('#searchBtn').on('click', function() {
    var _this = $(this),
        val = _this.prev().val();
    if (val === '') {
        _this.siblings('span').show();
        return false;
    } else {
        _this.parent().attr('action', searchQueryUrl + val);
        return true;
    }
});
$('.searchBar .inputBoxSkin').focus(function() {
    $(this).siblings('span').hide();
});

/************ SEARCH RESULTS *************/

if ($('#searchResults').length) {
    //$('#searchResults ul').addClass('visibleList');
    if (!$('.newsRoom').length) {

        var len = $('#searchResults').children('ul').children().length,
            item = Math.ceil(len / 10),
            li = '',
            ul = '';

        for (var i = 0; i < item; i++) {
            var cls = (i === 0) ? cls = "activeList" : cls = '';
            li += '<li><a href="#/" id="page_' + i + '" class="' + cls + '">' + (i + 1) + '</a></li>';
        }

        ul = '<ul id="paging">' + li + '</ul>';
        $('#searchResults h3').append(ul);

        $('#paging a').on('click', function() {
            var _this = $(this);
            if (!_this.hasClass('activeList')) {
                $('#paging a').removeClass('activeList');
                _this.addClass('activeList');
                var index = this.id.replace(/^\D+/g, '');
                $('#searchResults > ul').removeClass('visibleList');
                $('#searchResults > ul').eq(index).addClass('visibleList');
            }
        });
    }

}


// Fix height of promotionImageWrapper
var heights = [];
$('.promotionImageWrapper p').each(function() {
    heights.push($(this).height());
});

Array.max = function(arr) {
    return Math.max.apply(Math, arr);
};

$('.promotionImageWrapper p').css('height', Array.max(heights));