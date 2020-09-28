const datepicker = (window, () => {
    return (function (e) {
        var t = {};
        function n(r) {
            if (t[r]) return t[r].exports;
            var a = (t[r] = { i: r, l: !1, exports: {} });
            return e[r].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
        }
        return (
            (n.m = e),
            (n.c = t),
            (n.d = function (e, t, r) {
                n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
            }),
            (n.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
                Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (n.t = function (e, t) {
                if ((1 & t && (e = n(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var r = Object.create(null);
                if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                    for (var a in e)
                        n.d(
                            r,
                            a,
                            function (t) {
                                return e[t];
                            }.bind(null, a)
                        );
                return r;
            }),
            (n.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return n.d(t, "a", t), t;
            }),
            (n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (n.p = ""),
            n((n.s = 0))
        );
    })([
        function (e, t, n) {
            "use strict";
            n.r(t);
            n(1);
            var r = [],
                a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                o = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                i = { t: "top", r: "right", b: "bottom", l: "left", c: "centered" };
            function s() {}
            var l = ["click", "focusin", "keydown", "input"];
            function c(e) {
                l.forEach(function (t) {
                    e.addEventListener(t, e === document ? Y : j);
                });
            }
            function d(e) {
                return Array.isArray(e)
                    ? e.map(d)
                    : "[object Object]" === x(e)
                    ? Object.keys(e).reduce(function (t, n) {
                          return (t[n] = d(e[n])), t;
                      }, {})
                    : e;
            }
            function u(e, t) {
                var n = e.calendar.querySelector(".qs-overlay"),
                    r = n && !n.classList.contains("qs-hidden");
                (t = t || new Date(e.currentYear, e.currentMonth));
                    (e.calendar.innerHTML = [h(t, e, r), f(t, e, r), v(e, r)].join(""));
                    r &&
                        window.requestAnimationFrame(function () {
                            M(!0, e);
                        });
            }
            function h(e, t, n) {
                return [
                    '<div class="qs-controls' + (n ? " qs-blur" : "") + '">',
                    '<div class="qs-arrow qs-left"></div>',
                    '<div class="qs-month-year">',
                    '<span class="qs-month">' + t.months[e.getMonth()] + "</span>",
                    '<span class="qs-year">' + e.getFullYear() + "</span>",
                    "</div>",
                    '<div class="qs-arrow qs-right"></div>',
                    "</div>",
                ].join("");
            }
            function f(e, t, n) {
                var r = t.currentMonth,
                    a = t.currentYear,
                    o = t.dateSelected,
                    i = t.maxDate,
                    s = t.minDate,
                    l = t.showAllDates,
                    c = t.days,
                    d = t.disabledDates,
                    u = t.startDay,
                    h = (t.weekendIndices, t.events),
                    f = t.getRange ? t.getRange() : {},
                    v = +f.start,
                    m = +f.end,
                    y = g(new Date(e).setDate(1)),
                    p = y.getDay() - u,
                    D = p < 0 ? 7 : 0;
                y.setMonth(y.getMonth() + 1);
                y.setDate(0);
                var b = y.getDate(),
                    w = [],
                    q = D + 7 * (((p + b) / 7) | 0);
                q += (p + b) % 7 ? 7 : 0;
                for (var S = 1; S <= q; S++) {
                    var M = (S - 1) % 7,
                        E = c[M],
                        x = S - (p >= 0 ? p : 7 + p),
                        C = new Date(a, r, x),
                        Y = h[+C],
                        j = x < 1 || x > b,
                        L = j ? (x < 1 ? -1 : 1) : 0,
                        P = j && !l,
                        k = P ? "" : C.getDate(),
                        O = 0 === M || 6 === M,
                        N = v !== m,
                        _ = "qs-square " + E;
                    Y && !P && (_ += " qs-event");
                        j && (_ += " qs-outside-current-month");
                        (!l && j) || (_ += " qs-num");
                        +C == +o && (_ += " qs-active");
                        (d[+C] || t.disabler(C) || (O && t.noWeekends) || (s && +C < +s) || (i && +C > +i)) && !P && (_ += " qs-disabled");
                        +g(new Date()) == +C && (_ += " qs-current");
                        +C === v && m && N && (_ += " qs-range-start");
                        +C > v && +C < m && (_ += " qs-range-middle");
                        +C === m && v && N && (_ += " qs-range-end");
                        if(P) {
                          _ += " qs-empty";
                          k = "";
                        }
                        w.push('<div class="' + _ + '" data-direction="' + L + '">' + k + "</div>");
                }
                var I = c
                    .map(function (e) {
                        return '<div class="qs-square qs-day">' + e + "</div>";
                    })
                    .concat(w);
                return I.unshift('<div class="qs-squares' + (n ? " qs-blur" : "") + '">'), I.push("</div>"), I.join("");
            }
            function v(e, t) {
                var n = e.overlayPlaceholder,
                    r = e.overlayButton;
                return [
                    '<div class="qs-overlay' + (t ? "" : " qs-hidden") + '">',
                    "<div>",
                    '<input class="qs-overlay-year" placeholder="' + n + '" />',
                    '<div class="qs-close">&#10005;</div>',
                    "</div>",
                    '<div class="qs-overlay-month-container">' +
                        e.overlayMonths
                            .map(function (e, t) {
                                return '<div class="qs-overlay-month" data-month-num="' + t + '">' + e + "</div>";
                            })
                            .join("") +
                        "</div>",
                    '<div class="qs-submit qs-disabled">' + r + "</div>",
                    "</div>",
                ].join("");
            }
            function m(e, t, n) {
                var r = t.el,
                    a = t.calendar.querySelector(".qs-active"),
                    o = e.textContent,
                    i = t.sibling;
                    if(!((r.disabled || r.readOnly) && t.respectDisabledReadOnly)) {
                        (t.dateSelected = n ? void 0 : new Date(t.currentYear, t.currentMonth, o));
                        a && a.classList.remove("qs-active");
                        n || e.classList.add("qs-active");
                        p(r, t, n);
                        n || q(t);
                        if(i) {
                            y({ instance: t, deselect: n });
                            if(t.first && !i.dateSelected) {
                                i.currentYear = t.currentYear;
                                i.currentMonth = t.currentMonth;
                                i.currentMonthName = t.currentMonthName;
                            }
                            u(t);
                            u(i);
                        }
                        t.onSelect(t, n ? void 0 : new Date(t.dateSelected));
                    };
            }
            function y(e) {
                var t = e.instance.first ? e.instance : e.instance.sibling,
                    n = t.sibling;
                if(t === e.instance) {
                    if(e.deselect) {
                        t.minDate = t.originalMinDate;
                        n.minDate = n.originalMinDate;
                    } else {
                        n.minDate = t.dateSelected;
                    }
                } else {
                    if(e.deselect) {
                        n.maxDate = n.originalMaxDate;
                        t.maxDate = t.originalMaxDate;
                    } else {
                        t.maxDate = n.dateSelected;
                    }
                }
            }
            function p(e, t, n) {
                if (!t.nonInput) return n ? (e.value = "") : t.formatter !== s ? t.formatter(e, t.dateSelected, t) : void (e.value = t.dateSelected.toDateString());
            }
            function D(e, t, n, r) {
                if(n || r) {
                    n && (t.currentYear = +n);
                    r && (t.currentMonth = +r);
                } else {
                    t.currentMonth += e.contains("qs-right") ? 1 : -1;
                    if(12 === t.currentMonth) {
                        t.currentMonth = 0;
                        t.currentYear++
                    } else {
                        if(-1 === t.currentMonth) {
                            t.currentMonth = 11;
                            t.currentYear--;
                        }
                    }
                }
                t.currentMonthName = t.months[t.currentMonth];
                u(t);
                t.onMonthChange(t);
            }
            function b(e) {
                if (!e.noPosition) {
                    var t = e.position.top,
                        n = e.position.right;
                    if (e.position.centered) return e.calendarContainer.classList.add("qs-centered");
                    var r = e.positionedEl.getBoundingClientRect(),
                        a = e.el.getBoundingClientRect(),
                        o = e.calendarContainer.getBoundingClientRect(),
                        i = a.top - r.top + (t ? -1 * o.height : a.height) + "px",
                        s = a.left - r.left + (n ? a.width - o.width : 0) + "px";
                    e.calendarContainer.style.setProperty("position", "absolute");
                    e.calendarContainer.style.setProperty("left", s);
                    e.calendarContainer.style.setProperty("left", s);
                }
            }
            function w(e) {
                return "[object Date]" === x(e) && "Invalid Date" !== e.toString();
            }
            function g(e) {
                if (w(e) || ("number" == typeof e && !isNaN(e))) {
                    var t = new Date(+e);
                    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
                }
            }
            function q(e) {
                if(!e.disabled) {
                    if(!e.calendarContainer.classList.contains("qs-hidden") && !e.alwaysShow) {
                        M(!0, e);
                        e.calendarContainer.classList.add("qs-hidden");
                        e.onHide(e);
                    }
                }
            }
            function S(e) {
                if(!e.disabled) {
                    e.calendarContainer.classList.remove("qs-hidden");
                    b(e);
                    e.onShow(e)
                };
            }
            function M(e, t) {
                var n = t.calendar,
                    r = n.querySelector(".qs-overlay"),
                    a = r.querySelector(".qs-overlay-year"),
                    o = n.querySelector(".qs-controls"),
                    i = n.querySelector(".qs-squares");
                if(e) {
                    r.classList.add("qs-hidden");
                    o.classList.remove("qs-blur");
                    i.classList.remove("qs-blur");
                    a.value = "";
                } else {
                    r.classList.remove("qs-hidden");
                    o.classList.add("qs-blur");
                    i.classList.add("qs-blur");
                    a.focus();
                }
            }
            function E(e, t, n, r) {
                var a = isNaN(+new Date().setFullYear(t.value || void 0)),
                    o = a ? null : t.value;
                if (13 === e.which || 13 === e.keyCode || "click" === e.type) r ? D(null, n, o, r) : a || t.classList.contains("qs-disabled") || D(null, n, o);
                else if (n.calendar.contains(t)) {
                    n.calendar.querySelector(".qs-submit").classList[a ? "add" : "remove"]("qs-disabled");
                }
            }
            function x(e) {
                return {}.toString.call(e);
            }
            function C(e) {
                r.forEach(function (t) {
                    t !== e && q(t);
                });
            }
            function Y(e) {
                if (!e.__qs_shadow_dom) {
                    var t = e.which || e.keyCode,
                        n = e.type,
                        a = e.target,
                        i = a.classList,
                        s = r.filter(function (e) {
                            return e.calendar.contains(a) || e.el === a;
                        })[0],
                        l = s && s.calendar.contains(a);
                    if (!(s && s.isMobile && s.disableMobile))
                        if ("click" === n) {
                            if (!s) return r.forEach(q);
                            if (s.disabled) return;
                            var c = s.calendar,
                                d = s.calendarContainer,
                                h = s.disableYearOverlay,
                                f = s.nonInput,
                                v = c.querySelector(".qs-overlay-year"),
                                y = !!c.querySelector(".qs-hidden"),
                                p = c.querySelector(".qs-month-year").contains(a),
                                b = a.dataset.monthNum;
                            if (s.noPosition && !l) (d.classList.contains("qs-hidden") ? S : q)(s);
                            else if (i.contains("qs-arrow")) D(i, s);
                            else if (p || i.contains("qs-close")) h || M(!y, s);
                            else if (b) E(e, v, s, b);
                            else {
                                if (i.contains("qs-disabled")) return;
                                if (i.contains("qs-num")) {
                                    var w = a.textContent,
                                        g = +a.dataset.direction,
                                        x = new Date(s.currentYear, s.currentMonth + g, w);
                                    if (g) {
                                        s.currentYear = x.getFullYear();
                                        s.currentMonth = x.getMonth();
                                        s.currentMonthName = o[s.currentMonth];
                                        u(s);
                                        for (var Y, j = s.calendar.querySelectorAll('[data-direction="0"]'), L = 0; !Y; ) {
                                            var P = j[L];
                                            P.textContent === w && (Y = P);
                                            L++;
                                        }
                                        a = Y;
                                    }
                                    return void (+x == +s.dateSelected ? m(a, s, !0) : a.classList.contains("qs-disabled") || m(a, s));
                                }
                                if(i.contains("qs-submit")) {
                                   E(e, v, s);
                                } else {
                                    if(f && a === s.el) {
                                        S(s);
                                        C(s);
                                    }
                                }
                            }
                        } else if ("focusin" === n && s) {
                            S(s);
                            C(s);
                        } else if ("keydown" === n && 9 === t && s) q(s);
                        else if ("keydown" === n && s && !s.disabled) {
                            var k = !s.calendar.querySelector(".qs-overlay").classList.contains("qs-hidden");
                            13 === t && k && l ? E(e, a, s) : 27 === t && k && l && M(!0, s);
                        } else if ("input" === n) {
                            if (!s || !s.calendar.contains(a)) return;
                            var O = s.calendar.querySelector(".qs-submit"),
                                N = a.value
                                    .split("")
                                    .reduce(function (e, t) {
                                        return e || "0" !== t ? e + (t.match(/[0-9]/) ? t : "") : "";
                                    }, "")
                                    .slice(0, 4);
                            a.value = N;
                            O.classList[4 === N.length ? "remove" : "add"]("qs-disabled");
                        }
                }
            }
            function j(e) {
                Y(e);
                e.__qs_shadow_dom = !0;
            }
            function L(e, t) {
                l.forEach(function (n) {
                    e.removeEventListener(n, t);
                });
            }
            function P() {
                S(this);
            }
            function k() {
                q(this);
            }
            function O(e, t) {
                var n = g(e),
                    r = this.currentYear,
                    a = this.currentMonth,
                    o = this.sibling;
                if (null == e) return (this.dateSelected = void 0), p(this.el, this, !0), o && (y({ instance: this, deselect: !0 }), u(o)), u(this), this;
                if (!w(e)) throw new Error("`setDate` needs a JavaScript Date object.");
                if (this.disabledDates[+n] || n < this.minDate || n > this.maxDate) throw new Error("You can't manually set a date that's disabled.");
                this.dateSelected = n;
                if(t) {
                    this.currentYear = n.getFullYear();
                    this.currentMonth = n.getMonth();
                    this.currentMonthName = this.months[n.getMonth()];
                }
                p(this.el, this);
                if(o) {
                    y({ instance: this });
                    u(o);
                }
                var i = r === n.getFullYear() && a === n.getMonth();
                return i || t ? u(this, n) : i || u(this, new Date(r, a, 1)), this;
            }
            function N(e) {
                return I(this, e, !0);
            }
            function _(e) {
                return I(this, e);
            }
            function I(e, t, n) {
                var r = e.dateSelected,
                    a = e.first,
                    o = e.sibling,
                    i = e.minDate,
                    s = e.maxDate,
                    l = g(t),
                    c = n ? "Min" : "Max";
                function d() {
                    return "original" + c + "Date";
                }
                function h() {
                    return c.toLowerCase() + "Date";
                }
                function f() {
                    return "set" + c;
                }
                function v() {
                    throw new Error("Out-of-range date passed to " + f());
                }
                if (null == t) {
                    e[d()] = void 0;
                    if(o) {
                        o[d()] = void 0;
                        if(n) {
                            if((a && !r) || (!a && !o.dateSelected)) {
                                e.minDate = void 0;
                                o.minDate = void 0;
                            }
                        } else {
                            if((a && !o.dateSelected) || (!a && !r)) {
                                e.maxDate = void 0;
                                o.maxDate = void 0;
                            }
                        }
                    } else {
                        e[h()] = void 0;
                    }
                }
                else {
                    if (!w(t)) throw new Error("Invalid date passed to " + f());
                    if(o) {
                        ((a && n && l > (r || s)) || (a && !n && l < (o.dateSelected || i)) || (!a && n && l > (o.dateSelected || s)) || (!a && !n && l < (r || i))) && v();
                        e[d()] = l;
                        o[d()] = l;
                        if((n && ((a && !r) || (!a && !o.dateSelected))) || (!n && ((a && !o.dateSelected) || (!a && !r)))) {
                            e[h()] = l;
                            o[h()] = l;
                        }
                    } else {
                        if((n && l > (r || s)) || (!n && l < (r || i))) {
                            v();
                            e[h()] = l;
                        }
                    }
                }
                return o && u(o), u(e), e;
            }
            function R() {
                var e = this.first ? this : this.sibling,
                    t = e.sibling;
                return { start: e.dateSelected, end: t.dateSelected };
            }
            function A() {
                var e = this.shadowDom,
                    t = this.positionedEl,
                    n = this.calendarContainer,
                    a = this.sibling,
                    o = this;
                this.inlinePosition &&
                    (r.some(function (e) {
                        return e !== o && e.positionedEl === t;
                    }) || t.style.setProperty("position", null));
                n.remove();
                    (r = r.filter(function (e) {
                        return e !== o;
                    }));
                    a && delete a.sibling;
                    r.length || L(document, Y);
                var i = r.some(function (t) {
                    return t.shadowDom === e;
                });
                for (var s in (e && !i && L(e, j), this)) delete this[s];
                r.length ||
                    l.forEach(function (e) {
                        document.removeEventListener(e, Y);
                    });
            }
            function F(e, t) {
                var n = new Date(e);
                if (!w(n)) throw new Error("`navigate` needs a JavaScript Date object.");
                this.currentYear = n.getFullYear();
                this.currentMonth = n.getMonth();
                u(this);
                t && this.onMonthChange(this);
            }
            t.default = function (e, t) {
                var n = (function (e, t) {
                    var n,
                        l,
                        c = (function (e) {
                            var t = d(e);
                            t.events &&
                                (t.events = t.events.reduce(function (e, t) {
                                    if (!w(t)) throw new Error('"options.events" must only contain valid JavaScript Date objects.');
                                    return (e[+g(t)] = !0), e;
                                }, {}));
                            ["startDate", "dateSelected", "minDate", "maxDate"].forEach(function (e) {
                                var n = t[e];
                                if (n && !w(n)) throw new Error('"options.' + e + '" needs to be a valid JavaScript Date object.');
                                t[e] = g(n);
                            });
                            var n = t.position,
                                o = t.maxDate,
                                l = t.minDate,
                                c = t.dateSelected,
                                u = t.overlayPlaceholder,
                                h = t.overlayButton,
                                f = t.startDay,
                                v = t.id;
                            if (
                                ((t.startDate = g(t.startDate || c || new Date())),
                                (t.disabledDates = (t.disabledDates || []).reduce(function (e, t) {
                                    var n = +g(t);
                                    if (!w(t)) throw new Error('You supplied an invalid date to "options.disabledDates".');
                                    if (n === +g(c)) throw new Error('"disabledDates" cannot contain the same date as "dateSelected".');
                                    return (e[n] = 1), e;
                                }, {})),
                                t.hasOwnProperty("id") && null == v)
                            )
                                throw new Error("Id cannot be `null` or `undefined`");
                            if (null != v) {
                                var m = r.filter(function (e) {
                                    return e.id === v;
                                });
                                if (m.length > 1) throw new Error("Only two datepickers can share an id.");
                                if (m.length) {
                                    t.second = !0;
                                    t.sibling = m[0];
                                } else {
                                    t.first = !0;
                                }
                            }
                            var y = ["tr", "tl", "br", "bl", "c"].some(function (e) {
                                return n === e;
                            });
                            if (n && !y) throw new Error('"options.position" must be one of the following: tl, tr, bl, br, or c.');
                            function p(e) {
                                throw new Error('"dateSelected" in options is ' + (e ? "less" : "greater") + ' than "' + (e || "max") + 'Date".');
                            }
                            if (
                                ((t.position = (function (e) {
                                    var t = e[0],
                                        n = e[1],
                                        r = {};
                                    r[i[t]] = 1;
                                    n && (r[i[n]] = 1);
                                    return r;
                                })(n || "bl")),
                                o < l)
                            )
                                throw new Error('"maxDate" in options is less than "minDate".');
                            if(c) {
                                l > c && p("min");
                                o < c && p();
                            }
                            if (
                                (["onSelect", "onShow", "onHide", "onMonthChange", "formatter", "disabler"].forEach(function (e) {
                                    "function" != typeof t[e] && (t[e] = s);
                                }),
                                ["customDays", "customMonths", "customOverlayMonths"].forEach(function (e, n) {
                                    var r = t[e],
                                        a = n ? 12 : 7;
                                    if (r) {
                                        if (
                                            !Array.isArray(r) ||
                                            r.length !== a ||
                                            r.some(function (e) {
                                                return "string" != typeof e;
                                            })
                                        )
                                            throw new Error('"' + e + '" must be an array with ${num} strings.');
                                        t[n ? (n < 2 ? "months" : "overlayMonths") : "days"] = r;
                                    }
                                }),
                                f && f > 0 && f < 7)
                            ) {
                                var D = (t.customDays || a).slice(),
                                    b = D.splice(0, f);
                                t.customDays = D.concat(b);
                                t.startDay = +f;
                                t.weekendIndices = [D.length - 1, D.length];
                            } else {
                                t.startDay = 0;
                                t.weekendIndices = [6, 0];
                            }
                            "string" != typeof u && delete t.overlayPlaceholder;
                            "string" != typeof h && delete t.overlayButton;
                            return t;
                        })(t || { startDate: g(new Date()), position: "bl" }),
                        u = e;
                    if ("string" == typeof u) u = "#" === u[0] ? document.getElementById(u.slice(1)) : document.querySelector(u);
                    else {
                        if ("[object ShadowRoot]" === x(u)) throw new Error("Using a shadow DOM as your selector is not supported.");
                        for (var h, f = ("getRootNode" in window.Node.prototype), v = u.parentNode; !h; ) {
                            var m = x(v);
                            if ("[object HTMLDocument]" === m) h = !0;
                            else if ("[object ShadowRoot]" === m) {
                                if (((h = !0), !f)) throw new Error("The shadow DOM is not supported in your browser.");
                                n = v;
                                l = v.host;
                            } else v = v.parentNode;
                        }
                    }
                    if (!u) throw new Error("No selector / element found.");
                    if (
                        r.some(function (e) {
                            return e.el === u;
                        })
                    )
                        throw new Error("A datepicker already exists on that element.");
                    var y = u === document.body,
                        D = n ? u.parentElement || n : y ? document.body : u.parentElement,
                        b = n ? u.parentElement || l : D,
                        q = document.createElement("div"),
                        M = document.createElement("div");
                    q.className = "qs-datepicker-container qs-hidden";
                    M.className = "qs-datepicker";
                    var E = {
                        shadowDom: n,
                        customElement: l,
                        positionedEl: b,
                        el: u,
                        parent: D,
                        nonInput: "INPUT" !== u.nodeName,
                        noPosition: y,
                        position: !y && c.position,
                        startDate: c.startDate,
                        dateSelected: c.dateSelected,
                        disabledDates: c.disabledDates,
                        minDate: c.minDate,
                        maxDate: c.maxDate,
                        noWeekends: !!c.noWeekends,
                        weekendIndices: c.weekendIndices,
                        calendarContainer: q,
                        calendar: M,
                        currentMonth: (c.startDate || c.dateSelected).getMonth(),
                        currentMonthName: (c.months || o)[(c.startDate || c.dateSelected).getMonth()],
                        currentYear: (c.startDate || c.dateSelected).getFullYear(),
                        events: c.events || {},
                        setDate: O,
                        remove: A,
                        setMin: N,
                        setMax: _,
                        show: P,
                        hide: k,
                        navigate: F,
                        onSelect: c.onSelect,
                        onShow: c.onShow,
                        onHide: c.onHide,
                        onMonthChange: c.onMonthChange,
                        formatter: c.formatter,
                        disabler: c.disabler,
                        months: c.months || o,
                        days: c.customDays || a,
                        startDay: c.startDay,
                        overlayMonths:
                            c.overlayMonths ||
                            (c.months || o).map(function (e) {
                                return e.slice(0, 3);
                            }),
                        overlayPlaceholder: c.overlayPlaceholder || "4-digit year",
                        overlayButton: c.overlayButton || "Submit",
                        disableYearOverlay: !!c.disableYearOverlay,
                        disableMobile: !!c.disableMobile,
                        isMobile: "ontouchstart" in window,
                        alwaysShow: !!c.alwaysShow,
                        id: c.id,
                        showAllDates: !!c.showAllDates,
                        respectDisabledReadOnly: !!c.respectDisabledReadOnly,
                        first: c.first,
                        second: c.second,
                    };
                    if (c.sibling) {
                        var C = c.sibling;
                            Y = E;
                            j = C.minDate || Y.minDate;
                            L = C.maxDate || Y.maxDate;
                            Y.sibling = C;
                            C.sibling = Y;
                            C.minDate = j;
                            C.maxDate = L;
                            Y.minDate = j;
                            Y.maxDate = L;
                            C.originalMinDate = j;
                            C.originalMaxDate = L;
                            Y.originalMinDate = j;
                            Y.originalMaxDate = L;
                            C.getRange = R;
                            Y.getRange = R;
                    }
                    c.dateSelected && p(u, E);
                    var I = getComputedStyle(b).position;
                    if(!(y || (I && "static" !== I))) {
                        E.inlinePosition = !0;
                        b.style.setProperty("position", "relative");
                    }
                    var B = r.filter(function (e) {
                        return e.positionedEl === E.positionedEl;
                    });
                    if(B.some(function (e) { return e.inlinePosition; })) {
                        E.inlinePosition = !0;
                        B.forEach(function (e) {
                            e.inlinePosition = !0;
                        });
                    }
                    q.appendChild(M);
                    D.appendChild(q);
                    E.alwaysShow && S(E);
                    return E;
                })(e, t);
                if (
                    (r.length || c(document),
                    n.shadowDom &&
                        (r.some(function (e) {
                            return e.shadowDom === n.shadowDom;
                        }) ||
                            c(n.shadowDom)),
                    r.push(n),
                    n.second)
                ) {
                    var l = n.sibling;
                    y({ instance: n, deselect: !n.dateSelected });
                    y({ instance: l, deselect: !l.dateSelected });
                    u(l);
                }
                return u(n, n.startDate || n.dateSelected), n.alwaysShow && b(n), n;
            };
        },
        function (e, t, n) {},
    ]).default;
});

export default datepicker;
