 /*****************************************************************
 *
 * reveal.js-appearance for Reveal.js 
 * Version 1.4.0
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-appearance
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2025 Martijn De Jongh (Martino)
 *
 ******************************************************************/


var q = Object.defineProperty;
var z = (t, e, n) => e in t ? q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var h = (t, e, n) => z(t, typeof e != "symbol" ? e + "" : e, n);
const x = {
  baseclass: "animate__animated",
  hideagain: !0,
  delay: 300,
  appearevent: "slidetransitionend",
  autoappear: !1,
  autoelements: !1,
  appearparents: !1,
  cssautoload: !0,
  csspath: "",
  compatibility: !1,
  compatibilitybaseclass: "animated"
};
function V(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var O, T;
function k() {
  if (T) return O;
  T = 1;
  var t = function(l) {
    return e(l) && !n(l);
  };
  function e(a) {
    return !!a && typeof a == "object";
  }
  function n(a) {
    var l = Object.prototype.toString.call(a);
    return l === "[object RegExp]" || l === "[object Date]" || u(a);
  }
  var i = typeof Symbol == "function" && Symbol.for, r = i ? Symbol.for("react.element") : 60103;
  function u(a) {
    return a.$$typeof === r;
  }
  function o(a) {
    return Array.isArray(a) ? [] : {};
  }
  function c(a, l) {
    return l.clone !== !1 && l.isMergeableObject(a) ? v(o(a), a, l) : a;
  }
  function s(a, l, f) {
    return a.concat(l).map(function(p) {
      return c(p, f);
    });
  }
  function d(a, l) {
    if (!l.customMerge)
      return v;
    var f = l.customMerge(a);
    return typeof f == "function" ? f : v;
  }
  function y(a) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(a).filter(function(l) {
      return Object.propertyIsEnumerable.call(a, l);
    }) : [];
  }
  function b(a) {
    return Object.keys(a).concat(y(a));
  }
  function S(a, l) {
    try {
      return l in a;
    } catch {
      return !1;
    }
  }
  function A(a, l) {
    return S(a, l) && !(Object.hasOwnProperty.call(a, l) && Object.propertyIsEnumerable.call(a, l));
  }
  function $(a, l, f) {
    var p = {};
    return f.isMergeableObject(a) && b(a).forEach(function(g) {
      p[g] = c(a[g], f);
    }), b(l).forEach(function(g) {
      A(a, g) || (S(a, g) && f.isMergeableObject(l[g]) ? p[g] = d(g, f)(a[g], l[g], f) : p[g] = c(l[g], f));
    }), p;
  }
  function v(a, l, f) {
    f = f || {}, f.arrayMerge = f.arrayMerge || s, f.isMergeableObject = f.isMergeableObject || t, f.cloneUnlessOtherwiseSpecified = c;
    var p = Array.isArray(l), g = Array.isArray(a), U = p === g;
    return U ? p ? f.arrayMerge(a, l, f) : $(a, l, f) : c(l, f);
  }
  v.all = function(l, f) {
    if (!Array.isArray(l))
      throw new Error("first argument should be an array");
    return l.reduce(function(p, g) {
      return v(p, g, f);
    }, {});
  };
  var B = v;
  return O = B, O;
}
var F = k();
const J = /* @__PURE__ */ V(F);
var W = Object.defineProperty, G = (t, e, n) => e in t ? W(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, m = (t, e, n) => G(t, typeof e != "symbol" ? e + "" : e, n);
const K = () => {
  const t = typeof window < "u", e = typeof document < "u", n = t && typeof location < "u" && /localhost|127\.0\.0\.1/.test(location.hostname);
  let i = !1;
  try {
    i = new Function('return typeof module !== "undefined" && !!module.hot')();
  } catch {
  }
  let r = !1;
  try {
    r = new Function('return typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined" && import.meta.env.DEV === true')();
  } catch {
  }
  const u = t && typeof navigator < "u" && /vite|localhost|127\.0\.0\.1/.test(location.origin) && /AppleWebKit|Chrome|Vite/.test(navigator.userAgent), o = e && !!document.querySelector('script[type="module"]');
  let c = !1;
  try {
    c = new Function('return typeof process !== "undefined" && process.env && (process.env.ROLLUP_WATCH === "true" || process.env.NODE_ENV === "development")')();
  } catch {
  }
  let s = !1;
  try {
    s = new Function('return typeof define === "function" && !!define.amd')();
  } catch {
  }
  return {
    isDevServer: n,
    isWebpackHMR: i,
    isVite: r,
    isVitePreview: u,
    hasModuleScripts: o,
    isModuleBundler: c,
    isAMD: s,
    isBundlerEnvironment: i || r || u || o || c || s || n
  };
};
class Y {
  // Create a new plugin instance
  constructor(e, n, i) {
    m(this, "defaultConfig"), m(this, "pluginInit"), m(this, "pluginId"), m(this, "mergedConfig", null), m(this, "userConfigData", null), m(this, "data", {}), m(this, "getEnvironmentInfo", () => K()), typeof e == "string" ? (this.pluginId = e, this.pluginInit = n, this.defaultConfig = i || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(e) {
    const n = this.defaultConfig, i = e.getConfig()[this.pluginId] || {};
    this.userConfigData = i, this.mergedConfig = J(n, i, {
      arrayMerge: (r, u) => u,
      clone: !0
    });
  }
  // Get the current plugin configuration
  getCurrentConfig() {
    if (!this.mergedConfig)
      throw new Error("Plugin configuration has not been initialized");
    return this.mergedConfig;
  }
  // Get plugin data if any exists
  getData() {
    return Object.keys(this.data).length > 0 ? this.data : void 0;
  }
  get userConfig() {
    return this.userConfigData || {};
  }
  // Initialize the plugin
  init(e) {
    if (this.initializeConfig(e), this.pluginInit)
      return this.pluginInit(this, e, this.getCurrentConfig());
  }
  // Create the plugin interface containing all exports
  createInterface(e = {}) {
    return {
      id: this.pluginId,
      init: (n) => this.init(n),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...e
    };
  }
}
const X = (t) => {
  const e = document.querySelector(
    `script[src$="${t}.js"], script[src$="${t}.min.js"], script[src$="${t}.mjs"]`
  );
  if (e != null && e.src) {
    const n = e.getAttribute("src") || "", i = n.lastIndexOf("/");
    if (i !== -1)
      return n.substring(0, i + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${t}/`;
}, _ = "data-css-id", Z = (t, e) => new Promise((n, i) => {
  const r = document.createElement("link");
  r.rel = "stylesheet", r.href = e, r.setAttribute(_, t);
  const u = setTimeout(() => {
    r.parentNode && r.parentNode.removeChild(r), i(new Error(`[${t}] Timeout loading CSS from: ${e}`));
  }, 5e3);
  r.onload = () => {
    clearTimeout(u), n();
  }, r.onerror = () => {
    clearTimeout(u), r.parentNode && r.parentNode.removeChild(r), i(new Error(`[${t}] Failed to load CSS from: ${e}`));
  }, document.head.appendChild(r);
}), H = (t) => document.querySelectorAll(`[${_}="${t}"]`).length > 0, Q = (t) => new Promise((e) => {
  if (n())
    return e(!0);
  setTimeout(() => {
    e(n());
  }, 50);
  function n() {
    if (H(t)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${t}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), D = async (t) => {
  const {
    id: e,
    cssautoload: n = !0,
    csspath: i = "",
    debug: r = !1
  } = t;
  if (n === !1 || i === !1) return;
  if (H(e)) {
    r && console.log(`[${e}] CSS already loaded, skipping`);
    return;
  }
  const u = [];
  typeof i == "string" && i.trim() !== "" && u.push(i);
  const o = X(e);
  if (o) {
    const s = `${o}${e}.css`;
    u.push(s);
  }
  const c = `plugin/${e}/${e}.css`;
  u.push(c);
  for (const s of u)
    try {
      await Z(e, s);
      let d = "CSS";
      i && s === i ? d = "user-specified CSS" : o && s === `${o}${e}.css` ? d = "CSS (auto-detected from script location)" : d = "CSS (standard fallback)", r && console.log(`[${e}] ${d} loaded successfully from: ${s}`);
      return;
    } catch {
      r && console.log(`[${e}] Failed to load CSS from: ${s}`);
    }
  console.warn(`[${e}] Could not load CSS from any location`);
};
async function ee(t, e) {
  if ("getEnvironmentInfo" in t && e) {
    const n = t, i = n.getEnvironmentInfo();
    if (await Q(n.pluginId)) {
      e.debug && console.log(`[${n.pluginId}] CSS already imported, skipping`);
      return;
    }
    if ("cssautoload" in n.userConfig ? e.cssautoload : !i.isBundlerEnvironment)
      return D({
        id: n.pluginId,
        cssautoload: !0,
        csspath: e.csspath,
        debug: e.debug
      });
    i.isBundlerEnvironment && console.warn(`[${n.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`);
    return;
  }
  return D(t);
}
class te {
  constructor() {
    m(this, "debugMode", !1), m(this, "label", "DEBUG"), m(this, "groupDepth", 0), m(this, "group", (...e) => {
      this.debugLog("group", ...e), this.groupDepth++;
    }), m(this, "groupCollapsed", (...e) => {
      this.debugLog("groupCollapsed", ...e), this.groupDepth++;
    }), m(this, "groupEnd", () => {
      this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
    }), m(this, "error", (...e) => {
      const n = this.debugMode;
      this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = n;
    }), m(this, "table", (e, n, i) => {
      if (this.debugMode)
        try {
          typeof e == "string" && n !== void 0 && typeof n != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), i ? console.table(n, i) : console.table(n)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof n == "object" && Array.isArray(n) ? console.table(e, n) : console.table(e));
        } catch (r) {
          console.error(`[${this.label}]: Error showing table:`, r), console.log(`[${this.label}]: Raw data:`, e);
        }
    }), m(this, "formatAndLog", (e, n) => {
      if (this.debugMode)
        try {
          this.groupDepth > 0 ? e.call(console, ...n) : n.length > 0 && typeof n[0] == "string" ? e.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : e.call(console, `[${this.label}]:`, ...n);
        } catch (i) {
          console.error(`[${this.label}]: Error in logging:`, i), console.log(`[${this.label}]: Original log data:`, ...n);
        }
    });
  }
  // Initializes the debug utility with custom settings.
  initialize(e, n = "DEBUG") {
    this.debugMode = e, this.label = n;
  }
  // Core method that handles calling console methods with proper formatting.
  // - Adds label prefix to messages outside of groups
  // - Skips label prefix for messages inside groups to avoid redundancy
  // - Always adds label prefix to group headers
  // - Error messages are always shown regardless of debug mode
  // @param methodName - Name of the console method to call
  // @param args - Arguments to pass to the console method
  debugLog(e, ...n) {
    const i = console[e];
    if (!this.debugMode && e !== "error" || typeof i != "function") return;
    const r = i;
    if (e === "group" || e === "groupCollapsed") {
      n.length > 0 && typeof n[0] == "string" ? r.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : r.call(console, `[${this.label}]:`, ...n);
      return;
    }
    if (e === "groupEnd") {
      r.call(console);
      return;
    }
    if (e === "table") {
      n.length === 1 ? this.table(n[0]) : n.length === 2 ? typeof n[0] == "string" ? this.table(n[0], n[1]) : this.table(n[0], n[1]) : n.length >= 3 && this.table(
        n[0],
        n[1],
        n[2]
      );
      return;
    }
    this.groupDepth > 0 ? r.call(console, ...n) : n.length > 0 && typeof n[0] == "string" ? r.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : r.call(console, `[${this.label}]:`, ...n);
  }
}
const ne = (t) => new Proxy(t, {
  get: (e, n) => {
    if (n in e)
      return e[n];
    const i = n.toString();
    if (typeof console[i] == "function")
      return (...r) => {
        e.debugLog(i, ...r);
      };
  }
}), E = ne(new te());
var R = /* @__PURE__ */ ((t) => (t.HORIZONTAL = "horizontal", t.STACK = "stack", t.VERTICAL = "vertical", t.INVALID = "invalid", t))(R || {});
const I = (t) => t instanceof HTMLElement && t.tagName === "SECTION", L = (t) => I(t) ? Array.from(t.children).some(
  (e) => e instanceof HTMLElement && e.tagName === "SECTION"
) : !1, w = (t) => I(t) ? t.parentElement instanceof HTMLElement && t.parentElement.tagName === "SECTION" : !1, ie = (t) => I(t) && !w(t) && !L(t), re = (t) => {
  if (!I(t)) return null;
  if (w(t)) {
    const e = t.parentElement;
    if (e instanceof HTMLElement && L(e))
      return e;
  }
  return null;
}, ae = (t) => I(t) ? w(t) ? "vertical" : L(t) ? "stack" : "horizontal" : "invalid", se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: R,
  getSectionType: ae,
  getStack: re,
  isHorizontal: ie,
  isSection: I,
  isStack: L,
  isVertical: w
}, Symbol.toStringTag, { value: "Module" }));
function oe(t, e, n) {
  const i = {
    baseclass: t,
    compatibilitybaseclass: e,
    fragmentSelector: ".fragment",
    fragmentClass: "fragment",
    speedClasses: ["slower", "slow", "fast", "faster"],
    animatecss: '[class^="animate__"],[class*=" animate__"]',
    eventnames: [
      "ready",
      "slidechanged",
      "slidetransitionend",
      "autoanimate",
      "overviewhidden"
    ]
  };
  return i.speedClasses = [
    ...i.speedClasses,
    ...i.speedClasses.map((r) => `animate__${r}`)
  ], n && (i.animatecss = ".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur", i.baseclass = e), i;
}
const le = (t) => {
  try {
    return JSON.parse(t) && !!t;
  } catch {
    return !1;
  }
}, ce = (t) => {
  if (t == null)
    return "";
  let e = "", n = t;
  return typeof n == "string" && (n = n.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")), le(t) ? e = t : typeof t == "object" ? e = JSON.stringify(t, null, 2) : typeof t == "string" && (e = t.trim().replace(/'/g, '"').charAt(0) === "{" ? t.trim().replace(/'/g, '"') : `{${t.trim().replace(/'/g, '"')}}`), e;
}, ue = (t, e, n) => {
  for (const i of Array.from(t.attributes))
    i.nodeName.startsWith("data") && i.nodeName !== n && e.setAttribute(i.nodeName, i.nodeValue || "");
}, fe = (t) => typeof t == "object" && t !== null, de = (t, e, n) => {
  let i = null;
  if (t instanceof HTMLElement && t.hasAttribute("data-autoappear")) {
    const r = t.dataset.autoappear;
    if (r === "auto" || r === "" || r === "true")
      i = e.autoelements && typeof e.autoelements == "object" ? e.autoelements : null;
    else
      try {
        i = r ? JSON.parse(r) : null;
      } catch (o) {
        E.log(e, `Error parsing data-autoappear: ${o}`), i = null;
      }
  } else e.autoappear && e.autoelements && typeof e.autoelements == "object" && (i = e.autoelements);
  if (i)
    try {
      const r = JSON.parse(ce(i));
      for (const [u, o] of Object.entries(r)) {
        const c = Array.from(t.querySelectorAll(u)).filter(
          (s) => !n.includes(s)
        );
        if (c.length !== 0)
          for (const s of c) {
            n.push(s);
            let d = [], y = null, b = !1, S = null, A = null;
            if (Array.isArray(o))
              d = String(o[0]).split(/[ ,]+/), y = o[1] !== void 0 ? String(o[1]) : null;
            else if (typeof o == "string")
              d = o.split(/[ ,]+/);
            else if (fe(o)) {
              if (o.class || o.animation) {
                const $ = o.animation || o.class;
                d = String($).split(/[ ,]+/);
              }
              o.speed && (b = String(o.speed), b.includes("animate__") || (b = `animate__${b}`)), o.delay !== void 0 && (y = String(o.delay)), o.split !== void 0 && (S = String(o.split)), o["container-delay"] !== void 0 && (A = String(o["container-delay"]));
            }
            d.length > 0 && s.classList.add(...d), b && s.classList.add(b), s instanceof HTMLElement && (y && !s.dataset.delay && (s.dataset.delay = y), S && (s.dataset.split = S), A && (s.dataset.containerDelay = A));
          }
      }
    } catch (r) {
      E.log(e, `Error processing auto animations: ${r}`);
    }
};
function ge(t, e) {
  t.classList.contains(e.baseclass) || t.classList.add(e.baseclass), t.classList.contains(e.fragmentClass) && t.classList.add("custom");
}
function me(t, e, n) {
  let i = 0;
  t.forEach((r, u) => {
    if (u === 0 && r instanceof HTMLElement && r.dataset.delay || u !== 0) {
      let o = e.delay;
      if (r instanceof HTMLElement && r.dataset && r.dataset.delay) {
        const c = Number.parseInt(r.dataset.delay);
        Number.isNaN(c) || (o = c);
      }
      i = i + o, r instanceof HTMLElement && (r.style.setProperty("animation-delay", `${i}ms`), r.removeAttribute("data-delay"));
    }
  });
}
function pe(t, e) {
  var r;
  let n = !1, i = " ";
  if ((r = t.textContent) != null && r.trim() && (e === "words" ? n = t.textContent.trim().split(/\s+/) || [] : e === "letters" && (n = t.textContent.trim().split("") || [], i = ""), n && n.length > 0)) {
    const u = Array.from(t.classList).filter(
      (c) => c.startsWith("animate__")
    ), o = n.map((c, s) => {
      const d = document.createElement("span");
      d.textContent = c === " " ? " " : c, t.dataset.delay && s !== 0 && (d.dataset.delay = t.dataset.delay), t.dataset.containerDelay && s === 0 && (d.dataset.delay = t.dataset.containerDelay);
      for (let y = 0; y < u.length; y++)
        d.classList.add(u[y]);
      return d.outerHTML;
    }).join(i);
    t.classList.add("wordchargroup");
    for (let c = 0; c < u.length; c++)
      t.classList.remove(u[c]);
    t.removeAttribute("data-delay"), t.removeAttribute("data-split"), t.removeAttribute("data-container-delay"), t.innerHTML = o;
  }
}
function j(t, e) {
  const n = t.parentNode;
  if (n) {
    for (const i of Array.from(n.children))
      if (i !== t && i.dataset.appearParent) return;
    n instanceof Element && (n.classList.value = t.classList.value, ue(t, n, "data-appear-parent"), n.innerHTML = t.innerHTML, e && n.classList.add(e));
  }
}
function he(t, e, n) {
  const i = n.baseclass;
  if (t.hasAttribute("data-appear-parent") && j(t, i), e.appearparents && t.parentNode && t.parentNode instanceof Element && t.tagName === "SPAN" && t.parentNode.tagName === "LI") {
    const r = t.outerHTML.length, u = t.parentNode.innerHTML.length;
    r === u && j(t);
  }
}
const ye = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (i) => !i.closest(`.${e}`)
), be = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (i) => i.closest(`.${e}`) === n
), Se = (t, e, n) => {
  if (!e) return !1;
  const i = [
    ye(e, n, t),
    ...Array.from(t.querySelectorAll(`.${n}`)).map(
      (r) => be(e, n, r)
    )
  ];
  return i.some((r) => r.length > 0) ? i : !1;
};
function ve(t) {
  return {
    from: t.fromSlide || t.previousSlide || null,
    to: t.toSlide || t.currentSlide || null
  };
}
function Ie(t, e) {
  t.dataset.appearevent && t.dataset.appearevent === "auto" && (t.dataset.appearevent = "autoanimate");
  let n = e.appearevent;
  return n === "auto" && (n = "autoanimate"), t.dataset.appearevent || n;
}
function C(t, e) {
  e.hideagain && t.from && t.from.dataset.appearanceCanStart && t.from.removeAttribute("data-appearance-can-start");
}
function N(t, e, n) {
  if (e.hideagain && t && t.from) {
    const i = t.from.querySelectorAll(n.animatecss);
    if (i)
      for (const u of i)
        u.classList.remove("animationended");
    const r = t.from.querySelectorAll(".fragment.visible");
    if (r)
      for (const u of r)
        u.classList.remove("animationended");
  }
}
function Ae(t, e, n, i) {
  const r = i.getViewportElement();
  i.getConfig().view;
  const o = r.classList.contains("reveal-scroll"), c = t.type, s = ve(t);
  if (s.to) {
    c === "ready" && (s.to.dataset.appearanceCanStart = "true");
    const d = Ie(s.to, e);
    (c === d || c === "slidetransitionend" && d === "autoanimate") && (s.to.dataset.appearanceCanStart = "true"), o && c === "slidechanged" && (C(s, e), N(s, e, n), setTimeout(() => {
      s.to && (s.to.dataset.appearanceCanStart = "true");
    }, e.delay)), c === "slidetransitionend" && (C(s, e), N(s, e, n)), c === "slidechanged" && document.body.dataset.exitoverview ? (C(s, e), s.to.dataset.appearanceCanStart = "true") : c === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
      document.body.removeAttribute("data-exitoverview");
    }, 500), t.currentSlide && (C(s, e), s.to.dataset.appearanceCanStart = "true"));
  }
}
class M {
  constructor(e, n) {
    h(this, "deck");
    h(this, "viewport");
    h(this, "revealEl");
    h(this, "slides");
    h(this, "options");
    h(this, "consts");
    h(this, "sections");
    h(this, "regularSections");
    h(this, "fragments");
    h(this, "appearances");
    this.deck = e, this.options = n, this.viewport = e.getViewportElement(), this.revealEl = e.getRevealElement(), this.slides = e.getSlidesElement(), this.consts = oe(
      n.baseclass,
      n.compatibilitybaseclass,
      n.compatibility
    ), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter(
      (i) => !se.isStack(i)
    ), this.fragments = this.slides.querySelectorAll(this.consts.fragmentSelector), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
  }
  /**
   * Prepare appearance elements
   */
  async prepareElements() {
    this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));
    for (const e of this.regularSections)
      de(e, this.options, this.appearances);
    for (const e of this.appearances)
      he(e, this.options, this.consts), ge(e, this.consts), e instanceof HTMLElement && e.dataset.split && pe(e, e.dataset.split);
    for (const e of this.regularSections) {
      const n = Se(
        e,
        this.consts.baseclass,
        this.consts.fragmentClass
      );
      if (n)
        for (const i of n)
          me(i, this.options, this.consts);
    }
  }
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    for (const e of this.consts.eventnames)
      this.deck.on(e, (n) => {
        Ae(n, this.options, this.consts, this.deck);
      });
    this.viewport.addEventListener("animationend", (e) => {
      e.target.classList.add("animationended");
    }), this.viewport.addEventListener("autoanimate", (e) => {
      console.log("Autoanimate event triggered:", e);
    }), this.viewport.addEventListener("fragmenthidden", (e) => {
      const n = e;
      if (n.fragment) {
        n.fragment.classList.remove("animationended");
        const i = n.fragment.querySelectorAll(".animationended");
        for (const r of i)
          r.classList.remove("animationended");
      }
    });
  }
  /**
   * Create a new Appearance instance
   */
  static async create(e, n) {
    const i = new M(e, n);
    return await i.prepareElements(), i.setupEventListeners(), i;
  }
}
const P = "appearance", Ce = async (t, e, n) => {
  E && n.debug && E.initialize(!0, P), await ee(t, n), await M.create(e, n);
}, Le = () => new Y(P, Ce, x).createInterface();
export {
  Le as default
};
