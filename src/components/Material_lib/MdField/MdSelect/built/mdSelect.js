import { openBlock as m, createElementBlock as y, resolveComponent as g, createBlock as $, normalizeClass as _, renderSlot as C, setBlockTracking as ge, createVNode as x, withCtx as M, createElementVNode as E, nextTick as Qe, h as W, mergeProps as k, Transition as _e, normalizeStyle as de, createCommentVNode as N, withDirectives as se, vModelDynamic as Ze, Fragment as Te, renderList as Pe, withModifiers as re, toHandlers as et, withKeys as Z, KeepAlive as tt, createTextVNode as it, toDisplayString as nt, vModelText as st, vModelSelect as rt } from "vue";
var ot = function(t) {
  return lt(t) && !at(t);
};
function lt(e) {
  return !!e && typeof e == "object";
}
function at(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || ct(e);
}
var dt = typeof Symbol == "function" && Symbol.for, ut = dt ? Symbol.for("react.element") : 60103;
function ct(e) {
  return e.$$typeof === ut;
}
function ht(e) {
  return Array.isArray(e) ? [] : {};
}
function j(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? I(ht(e), e, t) : e;
}
function ft(e, t, i) {
  return e.concat(t).map(function(n) {
    return j(n, i);
  });
}
function pt(e, t) {
  if (!t.customMerge)
    return I;
  var i = t.customMerge(e);
  return typeof i == "function" ? i : I;
}
function mt(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function be(e) {
  return Object.keys(e).concat(mt(e));
}
function xe(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function vt(e, t) {
  return xe(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function gt(e, t, i) {
  var n = {};
  return i.isMergeableObject(e) && be(e).forEach(function(s) {
    n[s] = j(e[s], i);
  }), be(t).forEach(function(s) {
    vt(e, s) || (xe(e, s) && i.isMergeableObject(t[s]) ? n[s] = pt(s, i)(e[s], t[s], i) : n[s] = j(t[s], i));
  }), n;
}
function I(e, t, i) {
  i = i || {}, i.arrayMerge = i.arrayMerge || ft, i.isMergeableObject = i.isMergeableObject || ot, i.cloneUnlessOtherwiseSpecified = j;
  var n = Array.isArray(t), s = Array.isArray(e), r = n === s;
  return r ? n ? i.arrayMerge(e, t, i) : gt(e, t, i) : j(t, i);
}
I.all = function(t, i) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, s) {
    return I(n, s, i);
  }, {});
};
var bt = I, Le = bt;
function T(e) {
  return Le({
    props: {
      mdTheme: "md-theme-default"
    },
    computed: {
      $mdActiveTheme() {
        return "md-theme-default";
      }
    }
  }, e);
}
const b = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [n, s] of t)
    i[n] = s;
  return i;
};
let ee = {};
const Mt = {
  name: "MdSVGLoader",
  props: {
    mdSrc: {
      type: String,
      required: !0
    }
  },
  data: () => ({
    html: null,
    error: null
  }),
  watch: {
    mdSrc() {
      this.html = null, this.loadSVG();
    }
  },
  methods: {
    isSVG(e) {
      return typeof e != "string" ? !1 : e.indexOf("svg") >= 0;
    },
    setHtml(e) {
      ee[this.mdSrc].then((t) => (this.html = t, this.$nextTick())).then(() => this.$emit("md-loaded"));
    },
    unexpectedError(e) {
      this.error = `Something bad happened trying to fetch ${this.mdSrc}.`, e(this.error);
    },
    loadSVG() {
      ee.hasOwnProperty(this.mdSrc) ? this.setHtml() : ee[this.mdSrc] = new Promise((e, t) => {
        const i = new window.XMLHttpRequest();
        i.open("GET", this.mdSrc, !0), i.onload = () => {
          const n = i.getResponseHeader("content-type");
          i.status === 200 ? this.isSVG(n) ? (e(i.response), this.setHtml()) : (this.error = `The file ${this.mdSrc} is not a valid SVG.`, t(this.error)) : i.status >= 400 && i.status < 500 ? (this.error = `The file ${this.mdSrc} do not exists.`, t(this.error)) : this.unexpectedError(t);
        }, i.onerror = () => this.unexpectedError(t), i.onabort = () => this.unexpectedError(t), i.send();
      });
    }
  },
  mounted() {
    this.loadSVG();
  }
}, yt = ["innerHTML"];
function wt(e, t, i, n, s, r) {
  return m(), y("i", {
    class: "md-svg-loader",
    innerHTML: e.html
  }, null, 8, yt);
}
const St = /* @__PURE__ */ b(Mt, [["render", wt]]);
const $t = new T({
  name: "MdIcon",
  emits: ["md-loaded"],
  components: {
    MdSvgLoader: St
  },
  props: {
    mdSrc: String
  }
});
function Ct(e, t, i, n, s, r) {
  const o = g("md-svg-loader");
  return e.mdSrc ? (m(), $(o, {
    key: 0,
    class: _(["md-icon md-icon-image", [e.$mdActiveTheme]]),
    "md-src": e.mdSrc,
    onMdLoaded: t[0] || (t[0] = (l) => e.$emit("md-loaded"))
  }, null, 8, ["md-src", "class"])) : (m(), y("i", {
    key: 1,
    class: _(["md-icon md-icon-font", [e.$mdActiveTheme]])
  }, [
    C(e.$slots, "default")
  ], 2));
}
const Et = /* @__PURE__ */ b($t, [["render", Ct]]), Ot = {
  name: "MdDropDownIcon",
  components: {
    MdIcon: Et
  }
}, _t = /* @__PURE__ */ E("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ E("path", { d: "M7 10l5 5 5-5z" }),
  /* @__PURE__ */ E("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })
], -1);
function Tt(e, t, i, n, s, r) {
  const o = g("md-icon");
  return t[0] || (ge(-1), t[0] = x(o, { class: "md-icon-image" }, {
    default: M(() => [
      _t
    ]),
    _: 1
  }), ge(1), t[0]);
}
const Pt = /* @__PURE__ */ b(Ot, [["render", Tt]]), Me = (e, t) => ({
  validator: (i) => !!t.includes(i)
});
const xt = {
  emits: ["md-opened", "md-closed", "update:mdActive"],
  name: "MdMenu",
  props: {
    mdActive: Boolean,
    mdAlignTrigger: Boolean,
    mdOffsetX: Number,
    mdOffsetY: Number,
    mdFullWidth: Boolean,
    mdDense: Boolean,
    mdDirection: {
      type: String,
      default: "bottom-start",
      ...Me("md-direction", [
        "top-end",
        "top-start",
        "bottom-end",
        "bottom-start"
      ])
    },
    mdCloseOnSelect: {
      type: Boolean,
      default: !0
    },
    mdCloseOnClick: {
      type: Boolean,
      default: !1
    },
    mdSize: {
      type: String,
      default: "small",
      ...Me("md-size", [
        "auto",
        "small",
        "medium",
        "big",
        "huge"
      ])
    }
  },
  data() {
    return {
      triggerEl: null,
      MdMenu: {
        instance: this,
        active: this.mdActive,
        direction: this.mdDirection,
        size: this.mdSize,
        alignTrigger: this.mdAlignTrigger,
        offsetX: this.mdOffsetX,
        offsetY: this.mdOffsetY,
        fullWidth: this.mdFullWidth,
        dense: this.mdDense,
        closeOnSelect: this.mdCloseOnSelect,
        closeOnClick: this.mdCloseOnClick,
        bodyClickObserver: null,
        windowResizeObserver: null,
        $el: this.$el
      }
    };
  },
  provide() {
    return {
      MdMenu: this.MdMenu
    };
  },
  computed: {
    isActive() {
      return this.MdMenu.active;
    }
  },
  watch: {
    mdActive: {
      immediate: !0,
      handler(e) {
        this.MdMenu.active = e;
      }
    },
    mdDirection(e) {
      this.MdMenu.direction = e;
    },
    mdSize(e) {
      this.MdMenu.size = e;
    },
    mdAlignTrigger(e) {
      this.MdMenu.alignTrigger = e;
    },
    mdOffsetX(e) {
      this.MdMenu.offsetX = e;
    },
    mdOffsetY(e) {
      this.MdMenu.offsetY = e;
    },
    isActive(e) {
      this.$emit("update:mdActive", e), e ? this.$emit("md-opened") : this.$emit("md-closed");
    },
    mdCloseOnSelect() {
      this.MdMenu.closeOnSelect = this.mdCloseOnSelect;
    },
    mdCloseOnClick() {
      this.MdMenu.closeOnClick = this.mdCloseOnClick;
    }
  },
  methods: {
    toggleContent(e) {
      this.MdMenu.active = !this.MdMenu.active;
    }
  },
  mounted() {
    this.MdMenu.$el = this.$el, this.$nextTick().then(() => {
      this.triggerEl = this.$el.querySelector("[md-menu-trigger]"), this.triggerEl && this.triggerEl.addEventListener("click", this.toggleContent);
    });
  },
  beforeUnmount() {
    this.triggerEl && this.triggerEl.removeEventListener("click", this.toggleContent);
  }
}, Lt = { class: "md-menu" };
function At(e, t, i, n, s, r) {
  return m(), y("div", Lt, [
    C(e.$slots, "default")
  ]);
}
const kt = /* @__PURE__ */ b(xt, [["render", At]]), Ae = (e, t, i, n) => {
  function s() {
    e.removeEventListener(t, i);
  }
  return t && t.indexOf("click") >= 0 && /iP/i.test(navigator.userAgent) && (e.style.cursor = "pointer"), e.addEventListener(t, i, n || !1), {
    destroy: s
  };
}, Vt = (e = window, t) => ({
  destroy: Ae(e, "resize", () => {
    window.requestAnimationFrame(t);
  }, { passive: !0 }).destroy
});
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var U = typeof window < "u" && typeof document < "u" && typeof navigator < "u", It = function() {
  for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
    if (U && navigator.userAgent.indexOf(e[t]) >= 0)
      return 1;
  return 0;
}();
function Ft(e) {
  var t = !1;
  return function() {
    t || (t = !0, window.Promise.resolve().then(function() {
      t = !1, e();
    }));
  };
}
function Bt(e) {
  var t = !1;
  return function() {
    t || (t = !0, setTimeout(function() {
      t = !1, e();
    }, It));
  };
}
var Rt = U && window.Promise, Dt = Rt ? Ft : Bt;
function ke(e) {
  var t = {};
  return e && t.toString.call(e) === "[object Function]";
}
function V(e, t) {
  if (e.nodeType !== 1)
    return [];
  var i = e.ownerDocument.defaultView, n = i.getComputedStyle(e, null);
  return t ? n[t] : n;
}
function ue(e) {
  return e.nodeName === "HTML" ? e : e.parentNode || e.host;
}
function q(e) {
  if (!e)
    return document.body;
  switch (e.nodeName) {
    case "HTML":
    case "BODY":
      return e.ownerDocument.body;
    case "#document":
      return e.body;
  }
  var t = V(e), i = t.overflow, n = t.overflowX, s = t.overflowY;
  return /(auto|scroll|overlay)/.test(i + s + n) ? e : q(ue(e));
}
function Ve(e) {
  return e && e.referenceNode ? e.referenceNode : e;
}
var ye = U && !!(window.MSInputMethodContext && document.documentMode), we = U && /MSIE 10/.test(navigator.userAgent);
function H(e) {
  return e === 11 ? ye : e === 10 ? we : ye || we;
}
function F(e) {
  if (!e)
    return document.documentElement;
  for (var t = H(10) ? document.body : null, i = e.offsetParent || null; i === t && e.nextElementSibling; )
    i = (e = e.nextElementSibling).offsetParent;
  var n = i && i.nodeName;
  return !n || n === "BODY" || n === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(i.nodeName) !== -1 && V(i, "position") === "static" ? F(i) : i;
}
function Nt(e) {
  var t = e.nodeName;
  return t === "BODY" ? !1 : t === "HTML" || F(e.firstElementChild) === e;
}
function oe(e) {
  return e.parentNode !== null ? oe(e.parentNode) : e;
}
function Y(e, t) {
  if (!e || !e.nodeType || !t || !t.nodeType)
    return document.documentElement;
  var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = i ? e : t, s = i ? t : e, r = document.createRange();
  r.setStart(n, 0), r.setEnd(s, 0);
  var o = r.commonAncestorContainer;
  if (e !== o && t !== o || n.contains(s))
    return Nt(o) ? o : F(o);
  var l = oe(e);
  return l.host ? Y(l.host, t) : Y(e, oe(t).host);
}
function B(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", i = t === "top" ? "scrollTop" : "scrollLeft", n = e.nodeName;
  if (n === "BODY" || n === "HTML") {
    var s = e.ownerDocument.documentElement, r = e.ownerDocument.scrollingElement || s;
    return r[i];
  }
  return e[i];
}
function Ht(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = B(t, "top"), s = B(t, "left"), r = i ? -1 : 1;
  return e.top += n * r, e.bottom += n * r, e.left += s * r, e.right += s * r, e;
}
function Se(e, t) {
  var i = t === "x" ? "Left" : "Top", n = i === "Left" ? "Right" : "Bottom";
  return parseFloat(e["border" + i + "Width"]) + parseFloat(e["border" + n + "Width"]);
}
function $e(e, t, i, n) {
  return Math.max(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], H(10) ? parseInt(i["offset" + e]) + parseInt(n["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(n["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
}
function Ie(e) {
  var t = e.body, i = e.documentElement, n = H(10) && getComputedStyle(i);
  return {
    height: $e("Height", t, i, n),
    width: $e("Width", t, i, n)
  };
}
var Wt = function(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}, jt = function() {
  function e(t, i) {
    for (var n = 0; n < i.length; n++) {
      var s = i[n];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
    }
  }
  return function(t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(), R = function(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}, S = Object.assign || function(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t];
    for (var n in i)
      Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }
  return e;
};
function L(e) {
  return S({}, e, {
    right: e.left + e.width,
    bottom: e.top + e.height
  });
}
function le(e) {
  var t = {};
  try {
    if (H(10)) {
      t = e.getBoundingClientRect();
      var i = B(e, "top"), n = B(e, "left");
      t.top += i, t.left += n, t.bottom += i, t.right += n;
    } else
      t = e.getBoundingClientRect();
  } catch {
  }
  var s = {
    left: t.left,
    top: t.top,
    width: t.right - t.left,
    height: t.bottom - t.top
  }, r = e.nodeName === "HTML" ? Ie(e.ownerDocument) : {}, o = r.width || e.clientWidth || s.width, l = r.height || e.clientHeight || s.height, a = e.offsetWidth - o, u = e.offsetHeight - l;
  if (a || u) {
    var c = V(e);
    a -= Se(c, "x"), u -= Se(c, "y"), s.width -= a, s.height -= u;
  }
  return L(s);
}
function ce(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = H(10), s = t.nodeName === "HTML", r = le(e), o = le(t), l = q(e), a = V(t), u = parseFloat(a.borderTopWidth), c = parseFloat(a.borderLeftWidth);
  i && s && (o.top = Math.max(o.top, 0), o.left = Math.max(o.left, 0));
  var d = L({
    top: r.top - o.top - u,
    left: r.left - o.left - c,
    width: r.width,
    height: r.height
  });
  if (d.marginTop = 0, d.marginLeft = 0, !n && s) {
    var h = parseFloat(a.marginTop), f = parseFloat(a.marginLeft);
    d.top -= u - h, d.bottom -= u - h, d.left -= c - f, d.right -= c - f, d.marginTop = h, d.marginLeft = f;
  }
  return (n && !i ? t.contains(l) : t === l && l.nodeName !== "BODY") && (d = Ht(d, t)), d;
}
function Ut(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, i = e.ownerDocument.documentElement, n = ce(e, i), s = Math.max(i.clientWidth, window.innerWidth || 0), r = Math.max(i.clientHeight, window.innerHeight || 0), o = t ? 0 : B(i), l = t ? 0 : B(i, "left"), a = {
    top: o - n.top + n.marginTop,
    left: l - n.left + n.marginLeft,
    width: s,
    height: r
  };
  return L(a);
}
function Fe(e) {
  var t = e.nodeName;
  if (t === "BODY" || t === "HTML")
    return !1;
  if (V(e, "position") === "fixed")
    return !0;
  var i = ue(e);
  return i ? Fe(i) : !1;
}
function Be(e) {
  if (!e || !e.parentElement || H())
    return document.documentElement;
  for (var t = e.parentElement; t && V(t, "transform") === "none"; )
    t = t.parentElement;
  return t || document.documentElement;
}
function he(e, t, i, n) {
  var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, r = { top: 0, left: 0 }, o = s ? Be(e) : Y(e, Ve(t));
  if (n === "viewport")
    r = Ut(o, s);
  else {
    var l = void 0;
    n === "scrollParent" ? (l = q(ue(t)), l.nodeName === "BODY" && (l = e.ownerDocument.documentElement)) : n === "window" ? l = e.ownerDocument.documentElement : l = n;
    var a = ce(l, o, s);
    if (l.nodeName === "HTML" && !Fe(o)) {
      var u = Ie(e.ownerDocument), c = u.height, d = u.width;
      r.top += a.top - a.marginTop, r.bottom = c + a.top, r.left += a.left - a.marginLeft, r.right = d + a.left;
    } else
      r = a;
  }
  i = i || 0;
  var h = typeof i == "number";
  return r.left += h ? i : i.left || 0, r.top += h ? i : i.top || 0, r.right -= h ? i : i.right || 0, r.bottom -= h ? i : i.bottom || 0, r;
}
function qt(e) {
  var t = e.width, i = e.height;
  return t * i;
}
function Re(e, t, i, n, s) {
  var r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (e.indexOf("auto") === -1)
    return e;
  var o = he(i, n, r, s), l = {
    top: {
      width: o.width,
      height: t.top - o.top
    },
    right: {
      width: o.right - t.right,
      height: o.height
    },
    bottom: {
      width: o.width,
      height: o.bottom - t.bottom
    },
    left: {
      width: t.left - o.left,
      height: o.height
    }
  }, a = Object.keys(l).map(function(h) {
    return S({
      key: h
    }, l[h], {
      area: qt(l[h])
    });
  }).sort(function(h, f) {
    return f.area - h.area;
  }), u = a.filter(function(h) {
    var f = h.width, p = h.height;
    return f >= i.clientWidth && p >= i.clientHeight;
  }), c = u.length > 0 ? u[0].key : a[0].key, d = e.split("-")[1];
  return c + (d ? "-" + d : "");
}
function De(e, t, i) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, s = n ? Be(t) : Y(t, Ve(i));
  return ce(i, s, n);
}
function Ne(e) {
  var t = e.ownerDocument.defaultView, i = t.getComputedStyle(e), n = parseFloat(i.marginTop || 0) + parseFloat(i.marginBottom || 0), s = parseFloat(i.marginLeft || 0) + parseFloat(i.marginRight || 0), r = {
    width: e.offsetWidth + s,
    height: e.offsetHeight + n
  };
  return r;
}
function X(e) {
  var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return e.replace(/left|right|bottom|top/g, function(i) {
    return t[i];
  });
}
function He(e, t, i) {
  i = i.split("-")[0];
  var n = Ne(e), s = {
    width: n.width,
    height: n.height
  }, r = ["right", "left"].indexOf(i) !== -1, o = r ? "top" : "left", l = r ? "left" : "top", a = r ? "height" : "width", u = r ? "width" : "height";
  return s[o] = t[o] + t[a] / 2 - n[a] / 2, i === l ? s[l] = t[l] - n[u] : s[l] = t[X(l)], s;
}
function z(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}
function zt(e, t, i) {
  if (Array.prototype.findIndex)
    return e.findIndex(function(s) {
      return s[t] === i;
    });
  var n = z(e, function(s) {
    return s[t] === i;
  });
  return e.indexOf(n);
}
function We(e, t, i) {
  var n = i === void 0 ? e : e.slice(0, zt(e, "name", i));
  return n.forEach(function(s) {
    s.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var r = s.function || s.fn;
    s.enabled && ke(r) && (t.offsets.popper = L(t.offsets.popper), t.offsets.reference = L(t.offsets.reference), t = r(t, s));
  }), t;
}
function Yt() {
  if (!this.state.isDestroyed) {
    var e = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    e.offsets.reference = De(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = Re(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = He(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = We(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
  }
}
function je(e, t) {
  return e.some(function(i) {
    var n = i.name, s = i.enabled;
    return s && n === t;
  });
}
function fe(e) {
  for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
    var s = t[n], r = s ? "" + s + i : e;
    if (typeof document.body.style[r] < "u")
      return r;
  }
  return null;
}
function Xt() {
  return this.state.isDestroyed = !0, je(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[fe("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function Ue(e) {
  var t = e.ownerDocument;
  return t ? t.defaultView : window;
}
function qe(e, t, i, n) {
  var s = e.nodeName === "BODY", r = s ? e.ownerDocument.defaultView : e;
  r.addEventListener(t, i, { passive: !0 }), s || qe(q(r.parentNode), t, i, n), n.push(r);
}
function Kt(e, t, i, n) {
  i.updateBound = n, Ue(e).addEventListener("resize", i.updateBound, { passive: !0 });
  var s = q(e);
  return qe(s, "scroll", i.updateBound, i.scrollParents), i.scrollElement = s, i.eventsEnabled = !0, i;
}
function Gt() {
  this.state.eventsEnabled || (this.state = Kt(this.reference, this.options, this.state, this.scheduleUpdate));
}
function Jt(e, t) {
  return Ue(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(i) {
    i.removeEventListener("scroll", t.updateBound);
  }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}
function Qt() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Jt(this.reference, this.state));
}
function pe(e) {
  return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
}
function ae(e, t) {
  Object.keys(t).forEach(function(i) {
    var n = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(i) !== -1 && pe(t[i]) && (n = "px"), e.style[i] = t[i] + n;
  });
}
function Zt(e, t) {
  Object.keys(t).forEach(function(i) {
    var n = t[i];
    n !== !1 ? e.setAttribute(i, t[i]) : e.removeAttribute(i);
  });
}
function ei(e) {
  return ae(e.instance.popper, e.styles), Zt(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && ae(e.arrowElement, e.arrowStyles), e;
}
function ti(e, t, i, n, s) {
  var r = De(s, t, e, i.positionFixed), o = Re(i.placement, r, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
  return t.setAttribute("x-placement", o), ae(t, { position: i.positionFixed ? "fixed" : "absolute" }), i;
}
function ii(e, t) {
  var i = e.offsets, n = i.popper, s = i.reference, r = Math.round, o = Math.floor, l = function(P) {
    return P;
  }, a = r(s.width), u = r(n.width), c = ["left", "right"].indexOf(e.placement) !== -1, d = e.placement.indexOf("-") !== -1, h = a % 2 === u % 2, f = a % 2 === 1 && u % 2 === 1, p = t ? c || d || h ? r : o : l, v = t ? r : l;
  return {
    left: p(f && !d && t ? n.left - 1 : n.left),
    top: v(n.top),
    bottom: v(n.bottom),
    right: p(n.right)
  };
}
var ni = U && /Firefox/i.test(navigator.userAgent);
function si(e, t) {
  var i = t.x, n = t.y, s = e.offsets.popper, r = z(e.instance.modifiers, function(A) {
    return A.name === "applyStyle";
  }).gpuAcceleration;
  r !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var o = r !== void 0 ? r : t.gpuAcceleration, l = F(e.instance.popper), a = le(l), u = {
    position: s.position
  }, c = ii(e, window.devicePixelRatio < 2 || !ni), d = i === "bottom" ? "top" : "bottom", h = n === "right" ? "left" : "right", f = fe("transform"), p = void 0, v = void 0;
  if (d === "bottom" ? l.nodeName === "HTML" ? v = -l.clientHeight + c.bottom : v = -a.height + c.bottom : v = c.top, h === "right" ? l.nodeName === "HTML" ? p = -l.clientWidth + c.right : p = -a.width + c.right : p = c.left, o && f)
    u[f] = "translate3d(" + p + "px, " + v + "px, 0)", u[d] = 0, u[h] = 0, u.willChange = "transform";
  else {
    var O = d === "bottom" ? -1 : 1, P = h === "right" ? -1 : 1;
    u[d] = v * O, u[h] = p * P, u.willChange = d + ", " + h;
  }
  var w = {
    "x-placement": e.placement
  };
  return e.attributes = S({}, w, e.attributes), e.styles = S({}, u, e.styles), e.arrowStyles = S({}, e.offsets.arrow, e.arrowStyles), e;
}
function ze(e, t, i) {
  var n = z(e, function(l) {
    var a = l.name;
    return a === t;
  }), s = !!n && e.some(function(l) {
    return l.name === i && l.enabled && l.order < n.order;
  });
  if (!s) {
    var r = "`" + t + "`", o = "`" + i + "`";
    console.warn(o + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
  }
  return s;
}
function ri(e, t) {
  var i;
  if (!ze(e.instance.modifiers, "arrow", "keepTogether"))
    return e;
  var n = t.element;
  if (typeof n == "string") {
    if (n = e.instance.popper.querySelector(n), !n)
      return e;
  } else if (!e.instance.popper.contains(n))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
  var s = e.placement.split("-")[0], r = e.offsets, o = r.popper, l = r.reference, a = ["left", "right"].indexOf(s) !== -1, u = a ? "height" : "width", c = a ? "Top" : "Left", d = c.toLowerCase(), h = a ? "left" : "top", f = a ? "bottom" : "right", p = Ne(n)[u];
  l[f] - p < o[d] && (e.offsets.popper[d] -= o[d] - (l[f] - p)), l[d] + p > o[f] && (e.offsets.popper[d] += l[d] + p - o[f]), e.offsets.popper = L(e.offsets.popper);
  var v = l[d] + l[u] / 2 - p / 2, O = V(e.instance.popper), P = parseFloat(O["margin" + c]), w = parseFloat(O["border" + c + "Width"]), A = v - e.offsets.popper[d] - P - w;
  return A = Math.max(Math.min(o[u] - p, A), 0), e.arrowElement = n, e.offsets.arrow = (i = {}, R(i, d, Math.round(A)), R(i, h, ""), i), e;
}
function oi(e) {
  return e === "end" ? "start" : e === "start" ? "end" : e;
}
var Ye = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], te = Ye.slice(3);
function Ce(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, i = te.indexOf(e), n = te.slice(i + 1).concat(te.slice(0, i));
  return t ? n.reverse() : n;
}
var ie = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function li(e, t) {
  if (je(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
    return e;
  var i = he(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), n = e.placement.split("-")[0], s = X(n), r = e.placement.split("-")[1] || "", o = [];
  switch (t.behavior) {
    case ie.FLIP:
      o = [n, s];
      break;
    case ie.CLOCKWISE:
      o = Ce(n);
      break;
    case ie.COUNTERCLOCKWISE:
      o = Ce(n, !0);
      break;
    default:
      o = t.behavior;
  }
  return o.forEach(function(l, a) {
    if (n !== l || o.length === a + 1)
      return e;
    n = e.placement.split("-")[0], s = X(n);
    var u = e.offsets.popper, c = e.offsets.reference, d = Math.floor, h = n === "left" && d(u.right) > d(c.left) || n === "right" && d(u.left) < d(c.right) || n === "top" && d(u.bottom) > d(c.top) || n === "bottom" && d(u.top) < d(c.bottom), f = d(u.left) < d(i.left), p = d(u.right) > d(i.right), v = d(u.top) < d(i.top), O = d(u.bottom) > d(i.bottom), P = n === "left" && f || n === "right" && p || n === "top" && v || n === "bottom" && O, w = ["top", "bottom"].indexOf(n) !== -1, A = !!t.flipVariations && (w && r === "start" && f || w && r === "end" && p || !w && r === "start" && v || !w && r === "end" && O), Je = !!t.flipVariationsByContent && (w && r === "start" && p || w && r === "end" && f || !w && r === "start" && O || !w && r === "end" && v), ve = A || Je;
    (h || P || ve) && (e.flipped = !0, (h || P) && (n = o[a + 1]), ve && (r = oi(r)), e.placement = n + (r ? "-" + r : ""), e.offsets.popper = S({}, e.offsets.popper, He(e.instance.popper, e.offsets.reference, e.placement)), e = We(e.instance.modifiers, e, "flip"));
  }), e;
}
function ai(e) {
  var t = e.offsets, i = t.popper, n = t.reference, s = e.placement.split("-")[0], r = Math.floor, o = ["top", "bottom"].indexOf(s) !== -1, l = o ? "right" : "bottom", a = o ? "left" : "top", u = o ? "width" : "height";
  return i[l] < r(n[a]) && (e.offsets.popper[a] = r(n[a]) - i[u]), i[a] > r(n[l]) && (e.offsets.popper[a] = r(n[l])), e;
}
function di(e, t, i, n) {
  var s = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), r = +s[1], o = s[2];
  if (!r)
    return e;
  if (o.indexOf("%") === 0) {
    var l = void 0;
    switch (o) {
      case "%p":
        l = i;
        break;
      case "%":
      case "%r":
      default:
        l = n;
    }
    var a = L(l);
    return a[t] / 100 * r;
  } else if (o === "vh" || o === "vw") {
    var u = void 0;
    return o === "vh" ? u = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : u = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), u / 100 * r;
  } else
    return r;
}
function ui(e, t, i, n) {
  var s = [0, 0], r = ["right", "left"].indexOf(n) !== -1, o = e.split(/(\+|\-)/).map(function(c) {
    return c.trim();
  }), l = o.indexOf(z(o, function(c) {
    return c.search(/,|\s/) !== -1;
  }));
  o[l] && o[l].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var a = /\s*,\s*|\s+/, u = l !== -1 ? [o.slice(0, l).concat([o[l].split(a)[0]]), [o[l].split(a)[1]].concat(o.slice(l + 1))] : [o];
  return u = u.map(function(c, d) {
    var h = (d === 1 ? !r : r) ? "height" : "width", f = !1;
    return c.reduce(function(p, v) {
      return p[p.length - 1] === "" && ["+", "-"].indexOf(v) !== -1 ? (p[p.length - 1] = v, f = !0, p) : f ? (p[p.length - 1] += v, f = !1, p) : p.concat(v);
    }, []).map(function(p) {
      return di(p, h, t, i);
    });
  }), u.forEach(function(c, d) {
    c.forEach(function(h, f) {
      pe(h) && (s[d] += h * (c[f - 1] === "-" ? -1 : 1));
    });
  }), s;
}
function ci(e, t) {
  var i = t.offset, n = e.placement, s = e.offsets, r = s.popper, o = s.reference, l = n.split("-")[0], a = void 0;
  return pe(+i) ? a = [+i, 0] : a = ui(i, r, o, l), l === "left" ? (r.top += a[0], r.left -= a[1]) : l === "right" ? (r.top += a[0], r.left += a[1]) : l === "top" ? (r.left += a[0], r.top -= a[1]) : l === "bottom" && (r.left += a[0], r.top += a[1]), e.popper = r, e;
}
function hi(e, t) {
  var i = t.boundariesElement || F(e.instance.popper);
  e.instance.reference === i && (i = F(i));
  var n = fe("transform"), s = e.instance.popper.style, r = s.top, o = s.left, l = s[n];
  s.top = "", s.left = "", s[n] = "";
  var a = he(e.instance.popper, e.instance.reference, t.padding, i, e.positionFixed);
  s.top = r, s.left = o, s[n] = l, t.boundaries = a;
  var u = t.priority, c = e.offsets.popper, d = {
    primary: function(f) {
      var p = c[f];
      return c[f] < a[f] && !t.escapeWithReference && (p = Math.max(c[f], a[f])), R({}, f, p);
    },
    secondary: function(f) {
      var p = f === "right" ? "left" : "top", v = c[p];
      return c[f] > a[f] && !t.escapeWithReference && (v = Math.min(c[p], a[f] - (f === "right" ? c.width : c.height))), R({}, p, v);
    }
  };
  return u.forEach(function(h) {
    var f = ["left", "top"].indexOf(h) !== -1 ? "primary" : "secondary";
    c = S({}, c, d[f](h));
  }), e.offsets.popper = c, e;
}
function fi(e) {
  var t = e.placement, i = t.split("-")[0], n = t.split("-")[1];
  if (n) {
    var s = e.offsets, r = s.reference, o = s.popper, l = ["bottom", "top"].indexOf(i) !== -1, a = l ? "left" : "top", u = l ? "width" : "height", c = {
      start: R({}, a, r[a]),
      end: R({}, a, r[a] + r[u] - o[u])
    };
    e.offsets.popper = S({}, o, c[n]);
  }
  return e;
}
function pi(e) {
  if (!ze(e.instance.modifiers, "hide", "preventOverflow"))
    return e;
  var t = e.offsets.reference, i = z(e.instance.modifiers, function(n) {
    return n.name === "preventOverflow";
  }).boundaries;
  if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
    if (e.hide === !0)
      return e;
    e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
  } else {
    if (e.hide === !1)
      return e;
    e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
  }
  return e;
}
function mi(e) {
  var t = e.placement, i = t.split("-")[0], n = e.offsets, s = n.popper, r = n.reference, o = ["left", "right"].indexOf(i) !== -1, l = ["top", "left"].indexOf(i) === -1;
  return s[o ? "left" : "top"] = r[i] - (l ? s[o ? "width" : "height"] : 0), e.placement = X(t), e.offsets.popper = L(s), e;
}
var vi = {
  shift: {
    order: 100,
    enabled: !0,
    fn: fi
  },
  offset: {
    order: 200,
    enabled: !0,
    fn: ci,
    offset: 0
  },
  preventOverflow: {
    order: 300,
    enabled: !0,
    fn: hi,
    priority: ["left", "right", "top", "bottom"],
    padding: 5,
    boundariesElement: "scrollParent"
  },
  keepTogether: {
    order: 400,
    enabled: !0,
    fn: ai
  },
  arrow: {
    order: 500,
    enabled: !0,
    fn: ri,
    element: "[x-arrow]"
  },
  flip: {
    order: 600,
    enabled: !0,
    fn: li,
    behavior: "flip",
    padding: 5,
    boundariesElement: "viewport",
    flipVariations: !1,
    flipVariationsByContent: !1
  },
  inner: {
    order: 700,
    enabled: !1,
    fn: mi
  },
  hide: {
    order: 800,
    enabled: !0,
    fn: pi
  },
  computeStyle: {
    order: 850,
    enabled: !0,
    fn: si,
    gpuAcceleration: !0,
    x: "bottom",
    y: "right"
  },
  applyStyle: {
    order: 900,
    enabled: !0,
    fn: ei,
    onLoad: ti,
    gpuAcceleration: void 0
  }
}, gi = {
  placement: "bottom",
  positionFixed: !1,
  eventsEnabled: !0,
  removeOnDestroy: !1,
  onCreate: function() {
  },
  onUpdate: function() {
  },
  modifiers: vi
}, G = function() {
  function e(t, i) {
    var n = this, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Wt(this, e), this.scheduleUpdate = function() {
      return requestAnimationFrame(n.update);
    }, this.update = Dt(this.update.bind(this)), this.options = S({}, e.Defaults, s), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = t && t.jquery ? t[0] : t, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(S({}, e.Defaults.modifiers, s.modifiers)).forEach(function(o) {
      n.options.modifiers[o] = S({}, e.Defaults.modifiers[o] || {}, s.modifiers ? s.modifiers[o] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(o) {
      return S({
        name: o
      }, n.options.modifiers[o]);
    }).sort(function(o, l) {
      return o.order - l.order;
    }), this.modifiers.forEach(function(o) {
      o.enabled && ke(o.onLoad) && o.onLoad(n.reference, n.popper, n.options, o, n.state);
    }), this.update();
    var r = this.options.eventsEnabled;
    r && this.enableEventListeners(), this.state.eventsEnabled = r;
  }
  return jt(e, [{
    key: "update",
    value: function() {
      return Yt.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return Xt.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return Gt.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return Qt.call(this);
    }
  }]), e;
}();
G.Utils = (typeof window < "u" ? window : global).PopperUtils;
G.placements = Ye;
G.Defaults = gi;
const bi = G, Mi = {
  name: "MdPortal",
  abstract: !0,
  emits: ["md-destroy", "md-initial-parent"],
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator(e) {
        return HTMLElement && e && e instanceof HTMLElement ? !0 : (console.log("The md-target-el prop is invalid. You should pass a valid HTMLElement."), !1);
      }
    }
  },
  data: () => ({
    leaveTimeout: null,
    originalParentEl: null
  }),
  computed: {
    transitionName() {
      return this.$attrs["transition-prefix"] ? this.$attrs["transition-prefix"] : "v";
    },
    leaveClass() {
      return this.transitionName + "-leave-from";
    },
    leaveActiveClass() {
      return this.transitionName + "-leave-active";
    },
    leaveToClass() {
      return this.transitionName + "-leave-to";
    }
  },
  watch: {
    mdTarget(e, t) {
      this.changeParentEl(e), t && this.$forceUpdate();
    }
  },
  methods: {
    getTransitionDuration(e) {
      const t = window.getComputedStyle(e).transitionDuration, i = parseFloat(t, 10);
      let n = t.match(/m?s/);
      return n && (n = n[0]), n === "s" ? i * 1e3 : n === "ms" ? i : 0;
    },
    killGhostElement(e) {
      e.parentNode && (this.changeParentEl(this.originalParentEl), this.$options._parentElm = this.originalParentEl, e.parentNode.removeChild(e));
    },
    initDestroy(e) {
      let t = this.$el;
      e && this.$el.nodeType === Node.COMMENT_NODE && (t = this.$vnode.elm), t.classList.add(this.leaveClass), t.classList.add(this.leaveActiveClass), this.$nextTick().then(() => {
        t.classList.add(this.leaveToClass), clearTimeout(this.leaveTimeout), this.leaveTimeout = setTimeout(() => {
          this.destroyElement(t);
        }, this.getTransitionDuration(t));
      });
    },
    destroyElement(e) {
      window.requestAnimationFrame(() => {
        e.classList.remove(this.leaveClass), e.classList.remove(this.leaveActiveClass), e.classList.remove(this.leaveToClass), this.$emit("md-destroy"), this.killGhostElement(e);
      });
    },
    changeParentEl(e) {
      e && e.appendChild(this.$el);
    }
  },
  mounted() {
    this.originalParentEl || (this.originalParentEl = this.$el.parentNode, this.$emit("md-initial-parent", this.$el.parentNode)), this.mdAttachToParent && this.$el.parentNode.parentNode ? this.changeParentEl(this.$el.parentNode.parentNode) : document && this.changeParentEl(this.mdTarget || document.body);
  },
  beforeUnmount() {
    if (this.$el.classList)
      this.initDestroy();
    else {
      var e = this;
      this.$nextTick(function() {
        e.killGhostElement(e.$el);
      });
    }
  },
  render() {
    const e = this.$slots.default();
    if (e && e[0])
      return e[0];
  }
};
const yi = {
  name: "MdPopover",
  emits: ["md-active"],
  abstract: !0,
  components: {
    MdPortal: Mi
  },
  props: {
    mdActive: Boolean,
    mdSettings: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    popperInstance: null,
    originalParentEl: null,
    shouldRender: !1,
    shouldActivate: !1
  }),
  computed: {
    popoverClasses() {
      if (this.shouldActivate)
        return "md-active";
      if (this.shouldRender)
        return "md-rendering";
    }
  },
  watch: {
    mdActive: {
      immediate: !0,
      handler(e) {
        this.shouldRender = e, e ? this.bindPopper() : this.shouldActivate = !1;
      }
    },
    mdSettings() {
      this.popperInstance && this.createPopper();
    }
  },
  methods: {
    getPopperOptions() {
      return {
        placement: "bottom",
        modifiers: {
          preventOverflow: {
            boundariesElement: "viewport",
            padding: 16
          },
          computeStyle: {
            gpuAcceleration: !1
          }
        },
        onCreate: () => {
          this.shouldActivate = !0, this.$emit("md-active");
        }
      };
    },
    setOriginalParent(e) {
      this.originalParentEl || (this.originalParentEl = e);
    },
    killPopper() {
      this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null);
    },
    bindPopper() {
      this.$nextTick().then(() => {
        this.originalParentEl && this.createPopper();
      });
    },
    createPopper() {
      if (this.mdSettings) {
        const t = Le(this.getPopperOptions(), this.mdSettings);
        if (this.$el.nodeType !== Node.COMMENT_NODE) {
          this.popperInstance = new bi(this.originalParentEl, this.$el, t);
          var e = this;
          Qe(function() {
            var i = e.$el.style && e.$el.style.left ? e.$el.style.left : !1;
            i && i.charAt(0) == "-" && (e.$el.style.left = "10px");
          });
        }
      }
    },
    resetPopper() {
      this.popperInstance && (this.killPopper(), this.createPopper());
    }
  },
  beforeUnmount() {
    this.killPopper();
  },
  mounted() {
    this.resetPopper();
  },
  render() {
    const e = g("md-portal");
    return W(e, {
      ...this.$attrs,
      onMdInitialParent: this.setOriginalParent,
      onMdDestroy: this.killPopper
    }, this.$slots.default);
  }
}, wi = {
  name: "MdFocusTrap",
  abstract: !0,
  methods: {
    setFocus() {
      window.setTimeout(() => {
        this.$el.tagName && (this.$el.setAttribute("tabindex", "-1"), this.$el.focus());
      }, 20);
    }
  },
  mounted() {
    this.setFocus();
  },
  render() {
    try {
      const e = this.$slots.default();
      if (!e)
        return null;
      if (e.length > 1)
        throw new Error();
      return e[0];
    } catch {
      console.log("MdFocusTrap can only render one, and exactly one child component.");
    }
    return null;
  }
};
const Si = new T({
  name: "MdList",
  data() {
    return {
      MdList: {
        expandable: [],
        expandATab: this.expandATab,
        pushExpandable: this.pushExpandable,
        removeExpandable: this.removeExpandable
      }
    };
  },
  provide() {
    return {
      MdList: this.MdList
    };
  },
  props: {
    mdExpandSingle: {
      default: !1
    }
  },
  methods: {
    expandATab(e) {
      this.mdExpandSingle && e && this.MdList.expandable.filter((i) => i !== e).forEach((i) => i.close());
    },
    pushExpandable(e) {
      let t = this.MdList.expandable;
      t.find((i) => i === e) || (this.MdList.expandable = t.concat([e]));
    },
    removeExpandable(e) {
      let t = this.MdList.expandable;
      t.find((i) => i === e) && (this.MdList.expandable = t.filter((i) => i !== e));
    }
  }
});
function $i(e, t, i, n, s, r) {
  return m(), y("ul", k({
    class: ["md-list", [e.$mdActiveTheme]]
  }, e.$attrs), [
    C(e.$slots, "default")
  ], 16);
}
const Ci = /* @__PURE__ */ b(Si, [["render", $i]]), Ee = (e, t) => typeof Node.prototype.contains == "function" ? Node.prototype.contains.call(e, t) : (Node.prototype.compareDocumentPosition.call(t, e) & Node.prototype.DOCUMENT_POSITION_CONTAINS) !== 0;
const Ei = new T({
  emits: ["setParentOffsets"],
  name: "MdMenuContent",
  components: {
    MdPopover: yi,
    MdFocusTrap: wi,
    MdList: Ci
  },
  props: {
    mdListClass: [String, Boolean],
    mdContentClass: [String, Boolean]
  },
  inject: ["MdMenu"],
  data: () => ({
    highlightIndex: -1,
    didMount: !1,
    highlightItems: [],
    popperSettings: null,
    menuStyles: "",
    observerTimeout: !1
  }),
  computed: {
    filteredAttrs() {
      return this.$attrs;
    },
    highlightedItem() {
      return this.highlightItems[this.highlightIndex];
    },
    shouldRender() {
      return this.MdMenu.active;
    },
    menuClasses() {
      const e = "md-menu-content-";
      return {
        [e + this.MdMenu.direction]: !0,
        [e + this.MdMenu.size]: !0,
        "md-menu-content": this.didMount,
        "md-shallow": !this.didMount
      };
    },
    listClasses() {
      return {
        "md-dense": this.MdMenu.dense,
        ...this.mdListClass
      };
    }
  },
  watch: {
    shouldRender(e) {
      e && (this.setPopperSettings(), setTimeout(() => {
        this.setInitialHighlightIndex(), this.createResizeObserver(), this.createKeydownListener();
      }, 0), this.observerTimeout && (clearTimeout(this.observerTimeout), this.observerTimeout = !1), this.observerTimeout = setTimeout(() => {
        this.createClickEventObserver();
      }, 200));
    }
  },
  methods: {
    setPopperSettings() {
      const { direction: e, alignTrigger: t } = this.MdMenu;
      let { offsetX: i, offsetY: n } = this.getOffsets();
      this.hasCustomOffsets() || (this.MdMenu.instance.$el && this.MdMenu.instance.$el.offsetHeight && (n = -this.MdMenu.instance.$el.offsetHeight - 11), e.includes("start") ? i = -8 : e.includes("end") && (i = 8)), this.popperSettings = {
        placement: e,
        modifiers: {
          keepTogether: {
            enabled: !0
          },
          flip: {
            enabled: !1
          },
          offset: {
            offset: `${i}, ${n}`
          }
        }
      };
    },
    setInitialHighlightIndex() {
      this.setHighlightItems(), this.highlightItems.forEach((e, t) => {
        e.classList.contains("md-selected") && (this.highlightIndex = t - 1);
      });
    },
    setHighlightItems() {
      if (this.$el.querySelectorAll) {
        const e = this.$el.querySelectorAll(".md-list-item-container:not(.md-list-item-default):not([disabled])");
        this.highlightItems = Array.from(e);
      }
    },
    setHighlight(e) {
      this.setHighlightItems(), this.highlightItems.length && (e === "down" ? this.highlightIndex === this.highlightItems.length - 1 ? this.highlightIndex = 0 : this.highlightIndex++ : this.highlightIndex === 0 ? this.highlightIndex = this.highlightItems.length - 1 : this.highlightIndex--, this.clearAllHighlights(), this.setItemHighlight());
    },
    clearAllHighlights() {
      this.highlightItems.forEach((e) => {
        e.closest(".md-menu-item").classList.remove("md-highlight");
      });
    },
    setItemHighlight() {
      if (this.highlightedItem) {
        var e = this.highlightedItem.closest(".md-menu-item");
        e.classList.add("md-highlight"), this.$emit("setParentOffsets", e);
      }
    },
    setSelection() {
      this.highlightedItem && this.highlightedItem.closest(".md-menu-item").click();
    },
    onEsc() {
      this.MdMenu.active = !1, this.destroyKeyDownListener();
    },
    getOffsets() {
      const e = this.getBodyPosition(), t = this.MdMenu.offsetX || 0, i = this.MdMenu.offsetY || 0;
      return {
        offsetX: t - e.x,
        offsetY: i - e.y
      };
    },
    hasCustomOffsets() {
      const { offsetX: e, offsetY: t, alignTrigger: i } = this.MdMenu;
      return Boolean(i || t || e);
    },
    isMenu({ target: e }) {
      return this.MdMenu.$el ? Ee(this.MdMenu.$el, e) : !1;
    },
    isMenuContentEl({ target: e }) {
      return this.$refs.menu ? Ee(this.$refs.menu, e) : !1;
    },
    createClickEventObserver() {
      document && (this.MdMenu.bodyClickObserver = Ae(document.body, "click", (e) => {
        e.stopPropagation(), !this.isMenu(e) && (this.MdMenu.closeOnClick || !this.isMenuContentEl(e)) && (this.MdMenu.active = !1, this.MdMenu.bodyClickObserver.destroy(), this.MdMenu.windowResizeObserver.destroy(), this.destroyKeyDownListener());
      }));
    },
    createKeydownListener() {
      window.addEventListener("keydown", this.keyNavigation);
    },
    destroyKeyDownListener() {
      window.removeEventListener("keydown", this.keyNavigation);
    },
    keyNavigation(e) {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault(), this.setHighlight("up");
          break;
        case "ArrowDown":
          e.preventDefault(), this.setHighlight("down");
          break;
        case "Enter":
          this.setSelection(), e.stopPropagation();
          break;
        case "Space":
          this.setSelection();
          break;
        case "Escape":
          this.onEsc();
      }
    },
    createResizeObserver() {
      this.MdMenu.windowResizeObserver = Vt(window, this.setStyles);
    },
    setupWatchers() {
      this.$watch("MdMenu.direction", this.setPopperSettings), this.$watch("MdMenu.alignTrigger", this.setPopperSettings), this.$watch("MdMenu.offsetX", this.setPopperSettings), this.$watch("MdMenu.offsetY", this.setPopperSettings);
    },
    setStyles() {
      this.MdMenu.fullWidth && (this.menuStyles = `
            width: ${this.MdMenu.instance.$el.offsetWidth}px;
            max-width: ${this.MdMenu.instance.$el.offsetWidth}px
          `);
    },
    getBodyPosition() {
      const e = document.body, { top: t, left: i } = e.getBoundingClientRect(), n = window.scrollX !== void 0 ? window.scrollX : e.scrollLeft, s = window.scrollY !== void 0 ? window.scrollY : e.scrollTop;
      return { x: i + n, y: t + s };
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.setHighlightItems(), this.setupWatchers(), this.setStyles(), this.didMount = !0;
    });
  },
  beforeUnmount() {
    this.MdMenu.bodyClickObserver && this.MdMenu.bodyClickObserver.destroy(), this.MdMenu.windowResizeObserver && this.MdMenu.windowResizeObserver.destroy(), this.destroyKeyDownListener();
  }
});
function Oi(e, t, i, n, s, r) {
  const o = g("md-list"), l = g("md-popover");
  return m(), $(l, {
    "md-settings": e.popperSettings,
    "transition-prefix": "md-menu-content",
    "md-active": e.shouldRender
  }, {
    default: M(() => [
      x(_e, {
        name: "md-menu-content",
        css: e.didMount
      }, {
        default: M(() => [
          e.shouldRender ? (m(), y("div", {
            key: 0,
            class: _([e.menuClasses, e.mdContentClass, e.$mdActiveTheme]),
            style: de(e.menuStyles),
            ref: "menu"
          }, [
            E("div", {
              class: _(["md-menu-content-container md-scrollbar", e.$mdActiveTheme]),
              ref: "container"
            }, [
              x(o, k({ class: e.listClasses }, e.filteredAttrs), {
                default: M(() => [
                  C(e.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ], 2)
          ], 6)) : N("", !0)
        ]),
        _: 3
      }, 8, ["css"])
    ]),
    _: 3
  }, 8, ["md-settings", "md-active"]);
}
const _i = /* @__PURE__ */ b(Ei, [["render", Oi]]), J = () => Math.random().toString(36).slice(4), Xe = {
  emits: ["update:modelValue"],
  props: {
    value: {},
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    mdCounter: [String, Number]
  },
  data() {
    return {
      localValue: this.value,
      textareaHeight: !1
    };
  },
  computed: {
    model: {
      get() {
        return this.attributes.modelValue;
      },
      set(e) {
        e.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== "inputevent" && this.$nextTick(() => {
          this.localValue = e, this.MdField.hasInvalidValue = this.isInvalidValue();
        });
      }
    },
    clear() {
      return this.MdField.clear;
    },
    attributes() {
      return {
        ...this.$attrs,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength
      };
    }
  },
  watch: {
    model(e) {
      this.setFieldValue();
    },
    clear(e) {
      e && this.clearField();
    },
    placeholder() {
      this.setPlaceholder();
    },
    disabled() {
      this.setDisabled();
    },
    required() {
      this.setRequired();
    },
    maxlength() {
      this.setMaxlength();
    },
    mdCounter() {
      this.setMaxlength();
    },
    localValue(e) {
      this.$emit("update:modelValue", e);
    },
    value(e) {
      this.localValue = e;
    }
  },
  methods: {
    clearField() {
      this.$el.value = "", this.model = "", this.setFieldValue();
    },
    setLabelFor() {
      if (this.$el.parentNode) {
        const e = this.$el.parentNode.querySelector("label");
        if (e) {
          const t = e.getAttribute("for");
          (!t || t.indexOf("md-") >= 0) && e.setAttribute("for", this.id);
        }
      }
    },
    setFormResetListener() {
      if (!this.$el.form)
        return;
      this.$el.form.addEventListener("reset", this.onParentFormReset);
    },
    removeFormResetListener() {
      if (!this.$el.form)
        return;
      this.$el.form.removeEventListener("reset", this.onParentFormReset);
    },
    onParentFormReset() {
      this.clearField();
    },
    isInvalidValue() {
      return this.$el.validity ? this.$el.validity.badInput : !1;
    },
    setFieldValue() {
      this.MdField.value = this.model;
    },
    setPlaceholder() {
      this.MdField.placeholder = Boolean(this.placeholder);
    },
    setDisabled() {
      this.MdField.disabled = Boolean(this.disabled);
    },
    setRequired() {
      this.MdField.required = Boolean(this.required);
    },
    setMaxlength() {
      this.mdCounter ? this.MdField.counter = parseInt(this.mdCounter, 10) : this.MdField.maxlength = parseInt(this.maxlength, 10);
    },
    onFocus() {
      this.MdField.focused = !0;
    },
    onBlur() {
      this.MdField.focused = !1;
    }
  },
  created() {
    this.setFieldValue(), this.setPlaceholder(), this.setDisabled(), this.setRequired(), this.setMaxlength();
  },
  mounted() {
    this.setLabelFor(), this.setFormResetListener();
  },
  beforeUnmount() {
    this.removeFormResetListener();
  }
}, Ti = new T({
  name: "MdInput",
  mixins: [Xe],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-input-" + J()
    },
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    toggleType() {
      return this.MdField.togglePassword;
    },
    isPassword() {
      return this.type === "password";
    }
  },
  watch: {
    type(e) {
      this.setPassword(this.isPassword);
    },
    toggleType(e) {
      e ? this.setTypeText() : this.setTypePassword();
    }
  },
  methods: {
    setPassword(e) {
      this.MdField.password = e, this.MdField.togglePassword = !1;
    },
    setTypePassword() {
      this.$el.type = "password";
    },
    setTypeText() {
      this.$el.type = "text";
    }
  },
  created() {
    this.setPassword(this.isPassword);
  },
  mounted() {
    this.isPassword && this.setTypePassword();
  },
  beforeUnmount() {
    this.setPassword(!1);
  }
});
function Pi(e, t, i, n, s, r) {
  return se((m(), y("input", k({
    class: "md-input",
    "onUpdate:modelValue": t[0] || (t[0] = (o) => e.model = o)
  }, e.attributes, {
    onFocus: t[1] || (t[1] = (...o) => e.onFocus && e.onFocus(...o)),
    onBlur: t[2] || (t[2] = (...o) => e.onBlur && e.onBlur(...o))
  }), null, 16)), [
    [Ze, e.model]
  ]);
}
const xi = /* @__PURE__ */ b(Ti, [["render", Pi]]);
const Li = new T({
  name: "MdWave",
  data() {
    return {
      animating: !1
    };
  },
  props: {
    waveClasses: null,
    waveStyles: null
  },
  mounted: function() {
    this.animating = !0;
  },
  methods: {
    end() {
      this.animating = !1, this.$emit("md-end");
    }
  }
}), Ai = { key: 0 };
function ki(e, t, i, n, s, r) {
  return m(), $(_e, {
    name: "md-ripple",
    onAfterEnter: e.end,
    appear: ""
  }, {
    default: M(() => [
      e.animating ? (m(), y("span", Ai)) : N("", !0)
    ]),
    _: 1
  }, 8, ["onAfterEnter"]);
}
const Vi = /* @__PURE__ */ b(Li, [["render", ki]]);
const Ii = new T({
  name: "MdRipple",
  components: {
    MdWave: Vi
  },
  props: {
    mdActive: null,
    mdDisabled: Boolean,
    mdCentered: Boolean,
    mdEventTrigger: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    ripples: [],
    touchTimeout: null,
    eventType: null
  }),
  computed: {
    isDisabled() {
      return this.mdDisabled;
    },
    rippleClasses() {
      return {
        "md-disabled": this.isDisabled
      };
    },
    waveClasses() {
      return {
        "md-centered": this.mdCentered
      };
    }
  },
  watch: {
    mdActive(e) {
      const t = typeof e == "boolean", i = e instanceof MouseEvent;
      t && this.mdCentered && e ? this.startRipple({
        type: "mousedown"
      }) : i && this.startRipple(e), this.$emit("update:mdActive", !1);
    }
  },
  methods: {
    touchMoveCheck() {
      window.clearTimeout(this.touchTimeout);
    },
    touchStartCheck(e) {
      this.touchTimeout = window.setTimeout(() => {
        this.startRipple(e);
      }, 100);
    },
    startRipple(e) {
      window.requestAnimationFrame(() => {
        const { eventType: t, isDisabled: i, mdCentered: n } = this;
        if (!i && (!t || t === e.type)) {
          let s = this.getSize(), r = null;
          n ? r = this.getCenteredPosition(s) : r = this.getHitPosition(e, s), this.eventType = e.type, this.ripples.push({
            waveStyles: this.applyStyles(r, s),
            uuid: J()
          });
        }
      });
    },
    applyStyles(e, t) {
      return t += "px", {
        ...e,
        width: t,
        height: t
      };
    },
    clearWave(e) {
      e ? this.ripples = this.ripples.filter((t) => t.uuid !== e) : this.ripples = [];
    },
    getSize() {
      const { offsetWidth: e, offsetHeight: t } = this.$el;
      return Math.round(Math.max(e, t));
    },
    getCenteredPosition(e) {
      const t = -e / 2 + "px";
      return {
        "margin-top": t,
        "margin-left": t
      };
    },
    getHitPosition(e, t) {
      const i = this.$el.getBoundingClientRect();
      let n = e.pageY, s = e.pageX;
      return e.type === "touchstart" && (n = e.changedTouches[0].pageY, s = e.changedTouches[0].pageX), {
        top: n - i.top - t / 2 - document.documentElement.scrollTop + "px",
        left: s - i.left - t / 2 - document.documentElement.scrollLeft + "px"
      };
    }
  }
});
function Fi(e, t, i, n, s, r) {
  const o = g("md-wave");
  return m(), y("div", {
    class: _(["md-ripple", e.rippleClasses]),
    onTouchstartPassive: t[0] || (t[0] = (l) => e.mdEventTrigger && e.touchStartCheck(l)),
    onTouchmovePassive: t[1] || (t[1] = (l) => e.mdEventTrigger && e.touchMoveCheck(l)),
    onMousedownPassive: t[2] || (t[2] = (l) => e.mdEventTrigger && e.startRipple(l))
  }, [
    C(e.$slots, "default"),
    e.isDisabled ? N("", !0) : (m(!0), y(Te, { key: 0 }, Pe(e.ripples, (l) => (m(), $(o, {
      key: l.uuid,
      class: _(["md-ripple-wave", e.waveClasses]),
      style: de(l.waveStyles),
      onMdEnd: (a) => e.clearWave(l.uuid)
    }, null, 8, ["class", "style", "onMdEnd"]))), 128))
  ], 34);
}
const Q = /* @__PURE__ */ b(Ii, [["render", Fi]]), Bi = {
  emits: ["update:modelValue"],
  components: {
    MdRipple: Q
  },
  props: {
    model: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number]
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    trueValue: {
      default: !0
    },
    falseValue: {
      default: !1
    },
    modelValue: !1
  },
  model: {
    prop: "model",
    event: "change"
  },
  data: () => ({
    rippleActive: !1,
    innervalue: !1
  }),
  computed: {
    attrs() {
      const e = {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        "true-value": this.trueValue,
        "false-value": this.falseValue
      };
      return e.modelValue = this.$attrs.modelValue, e;
    },
    checkClasses() {
      return {
        "md-checked": this.innervalue,
        "md-disabled": this.disabled,
        "md-required": this.required,
        "md-indeterminate": this.indeterminate
      };
    }
  },
  watch: {
    modelValue(e) {
      this.innervalue != e && this.toggleCheck();
    }
  },
  methods: {
    toggleCheck() {
      if (!this.disabled) {
        this.rippleActive = !0, this.innervalue = !this.innervalue, this.$emit("update:modelValue", this.innervalue);
        var e = this;
        this.$nextTick(function() {
          e.rippleActive = !1;
        });
      }
    }
  },
  mounted() {
    this.innervalue = this.$attrs.modelValue;
  }
};
const Ri = new T({
  name: "MdCheckbox",
  mixins: [Bi],
  props: {
    id: {
      type: String,
      default: () => "md-checkbox-" + J()
    }
  }
}), Di = ["id", ".indeterminate"], Ni = ["for"];
function Hi(e, t, i, n, s, r) {
  const o = g("md-ripple");
  return m(), y("div", {
    class: _(["md-checkbox", [e.$mdActiveTheme, e.checkClasses]])
  }, [
    E("div", {
      class: "md-checkbox-container",
      onClick: t[0] || (t[0] = (...l) => e.toggleCheck && e.toggleCheck(...l))
    }, [
      x(o, {
        "md-centered": "",
        mdActive: e.rippleActive,
        "md-disabled": e.disabled
      }, {
        default: M(() => [
          E("input", k({
            id: e.id,
            type: "checkbox"
          }, e.attrs, { ".indeterminate": e.indeterminate }), null, 16, Di)
        ]),
        _: 1
      }, 8, ["mdActive", "md-disabled"])
    ]),
    e.$slots.default ? (m(), y("label", {
      key: 0,
      for: e.id,
      class: "md-checkbox-label",
      onClick: t[1] || (t[1] = re((...l) => e.toggleCheck && e.toggleCheck(...l), ["prevent"]))
    }, [
      C(e.$slots, "default")
    ], 8, Ni)) : N("", !0)
  ], 2);
}
const Wi = /* @__PURE__ */ b(Ri, [["render", Hi]]), Ke = {
  components: {
    MdRipple: Q
  },
  props: {
    mdRipple: {
      type: Boolean,
      default: !0
    }
  }
}, ji = {
  name: "MdListItemContent",
  components: {
    MdRipple: Q
  },
  props: {
    mdDisabled: Boolean
  }
};
function Ui(e, t, i, n, s, r) {
  const o = g("md-ripple");
  return m(), $(o, {
    class: "md-list-item-content",
    "md-disabled": i.mdDisabled
  }, {
    default: M(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["md-disabled"]);
}
const qi = /* @__PURE__ */ b(ji, [["render", Ui]]), zi = {
  mixins: [Ke],
  components: {
    MdListItemContent: qi
  },
  props: {
    disabled: Boolean
  },
  computed: {
    isDisabled() {
      return !this.mdRipple || this.disabled;
    }
  }
}, Yi = {
  name: "MdListItemButton",
  mixins: [zi]
}, Xi = ["disabled"];
function Ki(e, t, i, n, s, r) {
  const o = g("md-list-item-content");
  return m(), y("button", {
    type: "button",
    class: "md-list-item-button",
    disabled: e.disabled
  }, [
    x(o, { "md-disabled": e.isDisabled }, {
      default: M(() => [
        C(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["md-disabled"])
  ], 8, Xi);
}
const Gi = /* @__PURE__ */ b(Yi, [["render", Ki]]);
let Oe = !1, D = null, Ge = !1, me = {
  currentElement: null
};
function Ji() {
  try {
    var e = Object.defineProperty({}, "passive", {
      get() {
        Ge = { passive: !0 };
      }
    });
    window.addEventListener("ghost", null, e);
  } catch {
  }
}
function Qi({ keyCode: e, target: t }) {
  me.currentElement = t;
}
function K(e) {
  me.currentElement = null;
}
function Zi() {
  D.addEventListener("keyup", Qi);
}
function en() {
  D.addEventListener("pointerup", K);
}
function tn() {
  D.addEventListener("MSPointerUp", K);
}
function nn() {
  D.addEventListener("mouseup", K), "ontouchend" in window && D.addEventListener("touchend", K, Ge);
}
function sn() {
  window.PointerEvent ? en() : window.MSPointerEvent ? tn() : nn(), Zi();
}
function rn() {
  Oe || (D = document.body, Ji(), sn(), Oe = !0);
}
const on = {
  data: () => ({
    mdHasFocus: !1
  }),
  computed: {
    focusedElement() {
      return me.currentElement;
    }
  },
  watch: {
    focusedElement(e) {
      this.mdHasFocus = e === this.$el;
    }
  },
  mounted() {
    rn();
  }
}, ln = {
  props: {
    to: [String, Object],
    replace: Boolean,
    append: Boolean,
    activeClass: String,
    exact: Boolean,
    event: [String, Array],
    exactActiveClass: String
  }
}, an = (e, t) => {
  const i = e.$options.components.RouterLink || e.$options.components["router-link"];
  return {
    ...t,
    ...i.options.props
  };
};
const dn = {
  name: "MdButtonContent",
  components: {
    MdRipple: Q
  },
  props: {
    mdRipple: Boolean,
    mdRippleActive: null,
    disabled: Boolean
  }
}, un = { class: "md-button-content" };
function cn(e, t, i, n, s, r) {
  const o = g("md-ripple");
  return m(), $(o, {
    "md-disabled": !i.mdRipple || i.disabled,
    "md-event-trigger": !1,
    "md-active": i.mdRippleActive,
    "onUpdate:mdActive": t[0] || (t[0] = (l) => e.$emit("update:mdRippleActive", l))
  }, {
    default: M(() => [
      E("div", un, [
        C(e.$slots, "default")
      ])
    ]),
    _: 3
  }, 8, ["md-disabled", "md-active"]);
}
const hn = /* @__PURE__ */ b(dn, [["render", cn]]);
const fn = new T({
  name: "MdButton",
  data() {
    return {
      rippleActive: !1
    };
  },
  components: {
    MdButtonContent: hn
  },
  mixins: [
    Ke,
    on,
    ln
  ],
  props: {
    href: String,
    type: {
      type: String,
      default: "button"
    },
    nolink: Boolean,
    disabled: Boolean
  },
  computed: {
    rippleWorks() {
      return this.mdRipple && !this.disabled;
    },
    isRouterLink() {
      return this.$router && this.to;
    }
  },
  render() {
    const e = g("md-button-content"), t = W(e, {
      mdRipple: this.mdRipple,
      disabled: this.disabled,
      mdRippleActive: this.rippleActive,
      "onUpdate:MdRippleActive": (s) => this.rippleActive = s
    }, this.$slots.default);
    let i = {
      ...this.$attrs,
      class: [
        "md-button",
        this.$mdActiveTheme,
        {
          "md-ripple-off": !this.mdRipple,
          "md-focused": this.mdHasFocus
        }
      ],
      href: this.href,
      disabled: this.disabled,
      type: !this.href && (this.type || "button"),
      onTouchstart: (s) => {
        this.rippleWorks && (this.rippleActive = s), this.$attrs.touchstart && this.$attrs.touchstart(s);
      },
      onTouchmove: (s) => {
        this.rippleWorks && (this.rippleActive = s), this.$attrs.touchstart && this.$attrs.touchstart(s);
      },
      onMousedown: (s) => {
        this.rippleWorks && (this.rippleActive = s), this.$attrs.onMousedown && this.$attrs.onMousedown(s);
      }
    }, n = "button";
    if (!this.nolink) {
      if (this.href)
        n = "a";
      else if (this.isRouterLink) {
        this.$options.props = an(this, this.$options.props), n = "router-link";
        const s = this.$props.exactActiveClass, r = `${this.$props.activeClass || this.$material.router.linkActiveClass} md-active`;
        i.props = {
          ...this.$props,
          exactActiveClass: s,
          activeClass: r
        }, delete i.props.type, delete i.attrs.type, delete i.props.href, delete i.attrs.href;
      }
    }
    return W(n, i, [t]);
  }
});
function pn(e) {
  return e.hasOwnProperty("mdExpand") && e.mdExpand !== !1;
}
function mn(e, t) {
  if (pn(e))
    return {
      "md-expand": () => t["md-expand"][0]
    };
}
function vn(e) {
  return Gi;
}
const gn = {
  name: "MdListItem",
  functional: !0,
  components: {
    MdButton: fn
  },
  render() {
    let e = this.$slots, t = vn(this.$props, this.$attrs), i = "md-list-item";
    return W("li", {
      ...this.$attrs,
      class: this.$attrs.class + " " + i
    }, [
      W(t, {
        ...this.$props,
        slots: mn(this.$props, e),
        class: "md-list-item-container md-button-clean"
      }, e.default)
    ]);
  }
}, bn = new T({
  components: {
    MdListItem: gn
  },
  name: "MdMenuItem",
  props: {
    disabled: Boolean
  },
  inject: ["MdMenu"],
  data: () => ({
    highlighted: !1
  }),
  computed: {
    itemClasses() {
      return {
        "md-highlight": this.highlighted
      };
    }
  },
  methods: {
    closeMenu() {
      this.MdMenu.active = !1, this.MdMenu.eventObserver && this.MdMenu.eventObserver.destroy();
    },
    triggerCloseMenu() {
      this.disabled || this.closeMenu();
    }
  },
  mounted() {
    this.$el.children && this.$el.children[0] && this.$el.children[0].tagName.toUpperCase() === "A" && this.$el.addEventListener("click", this.triggerCloseMenu);
  },
  unmounted() {
    this.$el && this.$el.removeEventListener("click", this.triggerCloseMenu);
  }
});
function Mn(e, t, i, n, s, r) {
  const o = g("md-list-item");
  return m(), $(o, k({ class: "md-menu-item" }, e.$attrs, {
    class: [e.itemClasses, e.$mdActiveTheme],
    disabled: e.disabled,
    tabindex: e.highlighted && -1,
    onClick: t[0] || (t[0] = (l) => e.closeMenu())
  }), {
    default: M(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "disabled", "tabindex"]);
}
const yn = /* @__PURE__ */ b(bn, [["render", Mn]]), wn = {
  components: {
    MdCheckbox: Wi,
    MdMenuItem: yn
  },
  name: "MdOption",
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean
  },
  inject: {
    MdSelect: {},
    MdOptgroup: {
      default: {}
    }
  },
  data: () => ({
    uniqueId: "md-option-" + J(),
    isSelected: !1,
    isChecked: !1
  }),
  computed: {
    selectValue() {
      return this.MdSelect.modelValue;
    },
    isMultiple() {
      return this.MdSelect.multiple;
    },
    isDisabled() {
      return this.MdOptgroup.disabled || this.disabled;
    },
    key() {
      return this.value || this.value === 0 || this.value === !1 || this.value === "" ? this.value : this.uniqueId;
    },
    inputLabel() {
      return this.MdSelect.label;
    },
    optionClasses() {
      return {
        "md-selected": this.isSelected || this.isChecked
      };
    }
  },
  watch: {
    selectValue() {
      this.setIsSelected();
    },
    isChecked(e) {
      e !== this.isSelected && this.setSelection();
    },
    isSelected(e) {
      this.isChecked = e;
    }
  },
  methods: {
    getTextContent() {
      if (this.$el)
        return this.$el.textContent.trim();
      const e = this.$slots.default();
      return e[0] ? e[0].children.trim() : "";
    },
    setIsSelected() {
      if (!this.isMultiple) {
        this.isSelected = this.selectValue === this.value;
        return;
      }
      if (this.selectValue === void 0) {
        this.isSelected = !1;
        return;
      }
      this.isSelected = this.selectValue.includes(this.value);
    },
    setSingleSelection() {
      this.MdSelect.setValue(this.value);
    },
    setMultipleSelection() {
      this.MdSelect.setMultipleValue(this.value);
    },
    setSelection() {
      this.isDisabled || (this.isMultiple ? this.setMultipleSelection() : this.setSingleSelection());
    },
    setItem() {
      this.MdSelect.items[this.key] = this.getTextContent();
    }
  },
  vnodeUpdated() {
    this.setItem();
  },
  created() {
    this.setItem(), this.setIsSelected();
  }
}, Sn = {
  class: "md-list-item-text",
  ref: "text"
};
function $n(e, t, i, n, s, r) {
  const o = g("md-checkbox"), l = g("md-menu-item");
  return m(), $(l, {
    class: _(r.optionClasses),
    disabled: r.isDisabled,
    onClick: r.setSelection
  }, {
    default: M(() => [
      r.MdSelect.multiple ? (m(), $(o, {
        key: 0,
        class: "md-primary",
        modelValue: e.isChecked,
        "onUpdate:modelValue": t[0] || (t[0] = (a) => e.isChecked = a),
        disabled: r.isDisabled
      }, null, 8, ["modelValue", "disabled"])) : N("", !0),
      E("span", Sn, [
        C(e.$slots, "default")
      ], 512)
    ]),
    _: 3
  }, 8, ["class", "disabled", "onClick"]);
}
const Cn = /* @__PURE__ */ b(wn, [["render", $n]]);
const ne = {
  x: -15,
  y: -48
}, En = {
  name: "MdSelect",
  emits: ["md-closed", "md-selected", "md-opened"],
  components: {
    MdInput: xi,
    MdMenu: kt,
    MdMenuContent: _i,
    MdDropDownIcon: Pt,
    MdOption: Cn
  },
  mixins: [Xe],
  props: {
    mdDense: Boolean,
    mdClass: String,
    multiple: Boolean,
    id: String,
    name: String,
    modelValue: !1,
    dropdown_options: Object
  },
  inject: ["MdField"],
  data() {
    return {
      menuStyles: {},
      offset: {
        x: ne.x,
        y: 0
      },
      showSelect: !0,
      didMount: !1,
      MdSelect: {
        items: {},
        label: null,
        multiple: !1,
        modelValue: this.localValue,
        setValue: this.setValue,
        setContent: this.setContent,
        setMultipleValue: this.setMultipleValue,
        setMultipleContent: this.setMultipleContent
      }
    };
  },
  provide() {
    return { MdSelect: this.MdSelect };
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
        name: this.name,
        id: void 0
      };
    },
    inputListeners() {
      return {
        input: void 0
      };
    }
  },
  watch: {
    modelValue(e) {
      if (this.localValue != e) {
        var t = this;
        this.$nextTick(() => {
          t.setFieldContent(), t.MdSelect.modelValue = e;
          var i = t.dropdown_options[e];
          t.setContent(i);
        });
      }
    },
    model(e) {
      this.localValue = e;
    },
    localValue: {
      immediate: !0,
      handler(e) {
        this.setFieldContent(), this.MdSelect.modelValue = this.localValue, this.didMount && this.emitSelected(e);
      }
    },
    multiple: {
      immediate: !0,
      handler(e) {
        this.MdSelect.multiple = e, this.$nextTick(this.initialLocalValueByDefault);
      }
    }
  },
  methods: {
    elHasScroll(e) {
      return e.scrollHeight > e.offsetHeight;
    },
    scrollToSelectedOption(e, t) {
      const i = e.offsetTop, n = e.offsetHeight, s = t.offsetHeight;
      t.scrollTop = i - (s - n) / 2;
    },
    setOffsets(e) {
      if (!this.$isServer) {
        const t = this.$refs.menu.$refs.container;
        if (t) {
          const i = e || t.querySelector(".md-selected");
          i ? (this.scrollToSelectedOption(i, t), this.offset.y = ne.y - i.offsetTop + t.scrollTop + 8, this.menuStyles = {
            "transform-origin": `0 ${Math.abs(this.offset.y)}px`
          }) : (this.offset.y = ne.y + 1, this.menuStyles = {});
        }
      }
    },
    onMenuEnter() {
      !this.didMount || (this.setOffsets(), this.MdField.focused = !0, this.$emit("md-opened"));
    },
    applyHighlight() {
      this.MdField.focused = !1, this.MdField.highlighted = !0, this.$refs.input.$el.focus();
    },
    onClose() {
      this.$emit("md-closed"), this.removeHighlight();
    },
    onFocus() {
      this.didMount && this.applyHighlight(), this.showSelect || this.openSelect();
    },
    removeHighlight() {
      this.MdField.focused = !1, this.MdField.highlighted = !1;
    },
    openSelect() {
      this.disabled || (this.showSelect = !0);
    },
    arrayAccessorRemove(e, t) {
      let i = e.slice(0, t), n = e.slice(t + 1, e.length);
      return i.concat(n);
    },
    toggleArrayValue(e) {
      let t = this.localValue.indexOf(e);
      t > -1 ? this.localValue = this.arrayAccessorRemove(this.localValue, t) : this.localValue = this.localValue.concat([e]);
    },
    setValue(e) {
      this.model = e, this.setFieldValue(), this.showSelect = !1;
    },
    setContent(e) {
      this.MdSelect.label = e;
    },
    setContentByValue() {
      const e = this.MdSelect.items[this.localValue];
      e ? this.setContent(e) : this.setContent("");
    },
    setMultipleValue(e) {
      const t = e;
      this.toggleArrayValue(t), this.setFieldValue();
    },
    setMultipleContentByValue() {
      this.localValue || this.initialLocalValueByDefault();
      let e = [];
      this.localValue.forEach((t) => {
        const i = this.MdSelect.items[t];
        i && e.push(i);
      }), this.setContent(e.join(", "));
    },
    setFieldContent() {
      this.multiple ? this.setMultipleContentByValue() : this.setContentByValue();
    },
    isLocalValueSet() {
      return this.localValue !== void 0 && this.localValue !== null;
    },
    setLocalValueIfMultiple() {
      this.isLocalValueSet() ? this.localValue = [this.localValue] : this.localValue = [];
    },
    setLocalValueIfNotMultiple() {
      this.localValue.length > 0 ? this.localValue = this.localValue[0] : this.localValue = null;
    },
    initialLocalValueByDefault() {
      let e = Array.isArray(this.localValue);
      this.multiple && !e ? this.setLocalValueIfMultiple() : !this.multiple && e && this.setLocalValueIfNotMultiple();
    },
    emitSelected(e) {
      this.$emit("md-selected", e);
    }
  },
  mounted() {
    this.showSelect = !1, this.localValue = this.modelValue, this.setFieldContent(), this.$nextTick().then(() => {
      this.didMount = !0;
    });
  },
  vnodeUpdated() {
    this.setFieldContent();
  }
}, On = ["disabled"];
function _n(e, t, i, n, s, r) {
  const o = g("md-input"), l = g("md-drop-down-icon"), a = g("md-option"), u = g("md-menu-content"), c = g("md-menu");
  return m(), $(c, {
    class: _(["md-select", { "md-disabled": e.disabled }]),
    "md-close-on-select": !1,
    mdActive: s.showSelect,
    "onUpdate:mdActive": t[3] || (t[3] = (d) => s.showSelect = d),
    "md-offset-x": s.offset.x,
    "md-offset-y": s.offset.y,
    "md-dense": i.mdDense,
    onMdClosed: r.onClose
  }, {
    default: M(() => [
      x(o, k({
        class: "md-input md-select-value",
        modelValue: s.MdSelect.label,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => s.MdSelect.label = d),
        ref: "input",
        readonly: "",
        disabled: e.disabled,
        required: e.required,
        placeholder: e.placeholder
      }, et(r.inputListeners), {
        onFocus: re(r.onFocus, ["prevent"]),
        onBlur: re(r.removeHighlight, ["prevent"]),
        onClick: r.openSelect,
        onKeydown: [
          Z(r.openSelect, ["down"]),
          Z(r.openSelect, ["enter"]),
          Z(r.openSelect, ["space"])
        ]
      }), null, 16, ["modelValue", "disabled", "required", "placeholder", "onFocus", "onBlur", "onClick", "onKeydown"]),
      x(l, { onClick: r.openSelect }, null, 8, ["onClick"]),
      (m(), $(tt, null, [
        x(u, {
          ref: "menu",
          class: "md-select-menu",
          "md-content-class": i.mdClass,
          style: de(s.menuStyles),
          onSetParentOffsets: r.setOffsets,
          onEnter: r.onMenuEnter
        }, {
          default: M(() => [
            s.showSelect ? (m(!0), y(Te, { key: 0 }, Pe(i.dropdown_options, (d, h) => (m(), $(a, {
              key: h,
              value: h
            }, {
              default: M(() => [
                it(nt(d), 1)
              ]),
              _: 2
            }, 1032, ["value"]))), 128)) : N("", !0)
          ]),
          _: 1
        }, 8, ["md-content-class", "style", "onSetParentOffsets", "onEnter"])
      ], 1024)),
      se(E("input", {
        class: "md-input-fake",
        "onUpdate:modelValue": t[1] || (t[1] = (d) => e.model = d),
        disabled: e.disabled,
        readonly: "",
        tabindex: "-1"
      }, null, 8, On), [
        [st, e.model]
      ]),
      se(E("select", k({
        readonly: "",
        "onUpdate:modelValue": t[2] || (t[2] = (d) => e.model = d)
      }, e.attributes, { tabindex: "-1" }), null, 16), [
        [rt, e.model]
      ])
    ]),
    _: 1
  }, 8, ["class", "mdActive", "md-offset-x", "md-offset-y", "md-dense", "onMdClosed"]);
}
const Pn = /* @__PURE__ */ b(En, [["render", _n]]);
export {
  Pn as MdSelect
};
