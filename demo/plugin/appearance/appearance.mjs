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
 * Copyright (C) 2026 Martijn De Jongh (Martino)
 *
 ******************************************************************/


const U = {
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
function q(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var $, M;
function x() {
  if (M) return $;
  M = 1;
  var t = function(l) {
    return e(l) && !n(l);
  };
  function e(r) {
    return !!r && typeof r == "object";
  }
  function n(r) {
    var l = Object.prototype.toString.call(r);
    return l === "[object RegExp]" || l === "[object Date]" || c(r);
  }
  var a = typeof Symbol == "function" && Symbol.for, i = a ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
  function c(r) {
    return r.$$typeof === i;
  }
  function s(r) {
    return Array.isArray(r) ? [] : {};
  }
  function u(r, l) {
    return l.clone !== !1 && l.isMergeableObject(r) ? h(s(r), r, l) : r;
  }
  function o(r, l, f) {
    return r.concat(l).map(function(m) {
      return u(m, f);
    });
  }
  function d(r, l) {
    if (!l.customMerge)
      return h;
    var f = l.customMerge(r);
    return typeof f == "function" ? f : h;
  }
  function y(r) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(l) {
      return Object.propertyIsEnumerable.call(r, l);
    }) : [];
  }
  function b(r) {
    return Object.keys(r).concat(y(r));
  }
  function p(r, l) {
    try {
      return l in r;
    } catch {
      return !1;
    }
  }
  function v(r, l) {
    return p(r, l) && !(Object.hasOwnProperty.call(r, l) && Object.propertyIsEnumerable.call(r, l));
  }
  function I(r, l, f) {
    var m = {};
    return f.isMergeableObject(r) && b(r).forEach(function(g) {
      m[g] = u(r[g], f);
    }), b(l).forEach(function(g) {
      v(r, g) || (p(r, g) && f.isMergeableObject(l[g]) ? m[g] = d(g, f)(r[g], l[g], f) : m[g] = u(l[g], f));
    }), m;
  }
  function h(r, l, f) {
    f = f || {}, f.arrayMerge = f.arrayMerge || o, f.isMergeableObject = f.isMergeableObject || t, f.cloneUnlessOtherwiseSpecified = u;
    var m = Array.isArray(l), g = Array.isArray(r), z = m === g;
    return z ? m ? f.arrayMerge(r, l, f) : I(r, l, f) : u(l, f);
  }
  h.all = function(l, f) {
    if (!Array.isArray(l))
      throw new Error("first argument should be an array");
    return l.reduce(function(m, g) {
      return h(m, g, f);
    }, {});
  };
  var P = h;
  return $ = P, $;
}
var B = x();
const k = /* @__PURE__ */ q(B);
let A = null;
const V = () => {
  if (A) return A;
  const t = typeof window < "u", e = typeof document < "u";
  let n = !1;
  try {
    const i = new Function('return typeof module !== "undefined" && !!module.hot')(), c = new Function('return typeof import.meta !== "undefined" && !!import.meta.hot')();
    n = i || c;
  } catch {
  }
  let a = !1;
  try {
    a = new Function('return typeof import.meta !== "undefined" && import.meta.env?.DEV === true')();
  } catch {
  }
  return A = {
    isDevelopment: n || a,
    hasHMR: n,
    isViteDev: a,
    hasWindow: t,
    hasDocument: e
  }, A;
};
class F {
  defaultConfig;
  pluginInit;
  pluginId;
  mergedConfig = null;
  userConfigData = null;
  /** Public data storage for plugin state */
  data = {};
  // Create a new plugin instance
  constructor(e, n, a) {
    typeof e == "string" ? (this.pluginId = e, this.pluginInit = n, this.defaultConfig = a || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(e) {
    const n = this.defaultConfig, a = e.getConfig()[this.pluginId] || {};
    this.userConfigData = a, this.mergedConfig = k(n, a, {
      arrayMerge: (i, c) => c,
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
  // Gets information about the current JavaScript environment
  getEnvironmentInfo = () => V();
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
const J = (t) => {
  const e = document.querySelector(
    `script[src$="${t}.js"], script[src$="${t}.min.js"], script[src$="${t}.mjs"]`
  );
  if (e?.src) {
    const n = e.getAttribute("src") || "", a = n.lastIndexOf("/");
    if (a !== -1)
      return n.substring(0, a + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${t}/`;
}, _ = "data-css-id", G = (t, e) => new Promise((n, a) => {
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = e, i.setAttribute(_, t);
  const c = setTimeout(() => {
    i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${t}] Timeout loading CSS from: ${e}`));
  }, 5e3);
  i.onload = () => {
    clearTimeout(c), n();
  }, i.onerror = () => {
    clearTimeout(c), i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${t}] Failed to load CSS from: ${e}`));
  }, document.head.appendChild(i);
}), D = (t) => document.querySelectorAll(`[${_}="${t}"]`).length > 0, W = (t) => new Promise((e) => {
  if (n())
    return e(!0);
  setTimeout(() => {
    e(n());
  }, 50);
  function n() {
    if (D(t)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${t}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), T = async (t) => {
  const { id: e, cssautoload: n = !0, csspath: a = "", debug: i = !1 } = t;
  if (n === !1 || a === !1) return;
  if (D(e) && !(typeof a == "string" && a.trim() !== "")) {
    i && console.log(`[${e}] CSS is already loaded, skipping`);
    return;
  }
  D(e) && typeof a == "string" && a.trim() !== "" && i && console.log(`[${e}] CSS is already loaded, also loading user-specified path: ${a}`);
  const c = [];
  typeof a == "string" && a.trim() !== "" && c.push(a);
  const s = J(e);
  if (s) {
    const o = `${s}${e}.css`;
    c.push(o);
  }
  const u = `plugin/${e}/${e}.css`;
  c.push(u);
  for (const o of c)
    try {
      await G(e, o);
      let d = "CSS";
      a && o === a ? d = "user-specified CSS" : s && o === `${s}${e}.css` ? d = "CSS (auto-detected from script location)" : d = "CSS (standard fallback)", i && console.log(`[${e}] ${d} loaded successfully from: ${o}`);
      return;
    } catch {
      i && console.log(`[${e}] Failed to load CSS from: ${o}`);
    }
  console.warn(`[${e}] Could not load CSS from any location`);
};
async function K(t, e) {
  if ("getEnvironmentInfo" in t && e) {
    const n = t, a = n.getEnvironmentInfo();
    if (await W(n.pluginId) && !(typeof e.csspath == "string" && e.csspath.trim() !== "")) {
      e.debug && console.log(`[${n.pluginId}] CSS is already imported, skipping`);
      return;
    }
    if ("cssautoload" in n.userConfig ? e.cssautoload : !a.isDevelopment)
      return T({
        id: n.pluginId,
        cssautoload: !0,
        csspath: e.csspath,
        debug: e.debug
      });
    a.isDevelopment && console.warn(
      `[${n.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`
    );
    return;
  }
  return T(t);
}
class Y {
  // Flag to enable/disable all debugging output
  debugMode = !1;
  // Label to prefix all debug messages with
  label = "DEBUG";
  // Tracks the current depth of console groups for proper formatting
  groupDepth = 0;
  // Initializes the debug utility with custom settings.
  initialize(e, n = "DEBUG") {
    this.debugMode = e, this.label = n;
  }
  // Creates a new console group and tracks the group depth. 
  // Groups will always display the label prefix in their header.
  group = (...e) => {
    this.debugLog("group", ...e), this.groupDepth++;
  };
  // Creates a new collapsed console group and tracks the group depth.
  groupCollapsed = (...e) => {
    this.debugLog("groupCollapsed", ...e), this.groupDepth++;
  };
  // Ends the current console group and updates the group depth tracker.
  groupEnd = () => {
    this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
  };
  // Formats and logs an error message with the debug label. 
  // Error messages are always shown, even when debug mode is disabled.
  error = (...e) => {
    const n = this.debugMode;
    this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = n;
  };
  // Displays a table in the console with the pluginDebug label.
  // Special implementation for console.table to handle tabular data properly.
  // @param messageOrData - Either a message string or the tabular data
  // @param propertiesOrData - Either property names or tabular data (if first param was message)
  // @param optionalProperties - Optional property names (if first param was message)
  table = (e, n, a) => {
    if (this.debugMode)
      try {
        typeof e == "string" && n !== void 0 && typeof n != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), a ? console.table(n, a) : console.table(n)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof n == "object" && Array.isArray(n) ? console.table(e, n) : console.table(e));
      } catch (i) {
        console.error(`[${this.label}]: Error showing table:`, i), console.log(`[${this.label}]: Raw data:`, e);
      }
  };
  // Helper method that formats and logs messages with the pluginDebug label.
  // @param logMethod - The console method to use for logging
  // @param args - Arguments to pass to the console method
  formatAndLog = (e, n) => {
    if (this.debugMode)
      try {
        this.groupDepth > 0 ? e.call(console, ...n) : n.length > 0 && typeof n[0] == "string" ? e.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : e.call(console, `[${this.label}]:`, ...n);
      } catch (a) {
        console.error(`[${this.label}]: Error in logging:`, a), console.log(`[${this.label}]: Original log data:`, ...n);
      }
  };
  // Core method that handles calling console methods with proper formatting.
  // - Adds label prefix to messages outside of groups
  // - Skips label prefix for messages inside groups to avoid redundancy
  // - Always adds label prefix to group headers
  // - Error messages are always shown regardless of debug mode
  // @param methodName - Name of the console method to call
  // @param args - Arguments to pass to the console method
  debugLog(e, ...n) {
    const a = console[e];
    if (!this.debugMode && e !== "error" || typeof a != "function") return;
    const i = a;
    if (e === "group" || e === "groupCollapsed") {
      n.length > 0 && typeof n[0] == "string" ? i.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : i.call(console, `[${this.label}]:`, ...n);
      return;
    }
    if (e === "groupEnd") {
      i.call(console);
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
    this.groupDepth > 0 ? i.call(console, ...n) : n.length > 0 && typeof n[0] == "string" ? i.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : i.call(console, `[${this.label}]:`, ...n);
  }
}
const X = (t) => new Proxy(t, {
  get: (e, n) => {
    if (n in e)
      return e[n];
    const a = n.toString();
    if (typeof console[a] == "function")
      return (...i) => {
        e.debugLog(a, ...i);
      };
  }
}), L = X(new Y());
var R = /* @__PURE__ */ ((t) => (t.HORIZONTAL = "horizontal", t.STACK = "stack", t.VERTICAL = "vertical", t.INVALID = "invalid", t))(R || {});
const S = (t) => t instanceof HTMLElement && t.tagName === "SECTION", E = (t) => S(t) ? Array.from(t.children).some(
  (e) => e instanceof HTMLElement && e.tagName === "SECTION"
) : !1, w = (t) => S(t) ? t.parentElement instanceof HTMLElement && t.parentElement.tagName === "SECTION" : !1, Z = (t) => S(t) && !w(t) && !E(t), Q = (t) => {
  if (!S(t)) return null;
  if (w(t)) {
    const e = t.parentElement;
    if (e instanceof HTMLElement && E(e))
      return e;
  }
  return null;
}, ee = (t) => S(t) ? w(t) ? "vertical" : E(t) ? "stack" : "horizontal" : "invalid", te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: R,
  getSectionType: ee,
  getStack: Q,
  isHorizontal: Z,
  isSection: S,
  isStack: E,
  isVertical: w
}, Symbol.toStringTag, { value: "Module" }));
function ne(t, e, n) {
  const a = {
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
  return a.speedClasses = [
    ...a.speedClasses,
    ...a.speedClasses.map((i) => `animate__${i}`)
  ], n && (a.animatecss = ".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur", a.baseclass = e), a;
}
const ae = (t) => {
  try {
    return JSON.parse(t) && !!t;
  } catch {
    return !1;
  }
}, ie = (t) => {
  if (t == null)
    return "";
  let e = "", n = t;
  return typeof n == "string" && (n = n.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")), ae(t) ? e = t : typeof t == "object" ? e = JSON.stringify(t, null, 2) : typeof t == "string" && (e = t.trim().replace(/'/g, '"').charAt(0) === "{" ? t.trim().replace(/'/g, '"') : `{${t.trim().replace(/'/g, '"')}}`), e;
}, re = (t, e, n) => {
  for (const a of Array.from(t.attributes))
    a.nodeName.startsWith("data") && a.nodeName !== n && e.setAttribute(a.nodeName, a.nodeValue || "");
}, se = (t) => typeof t == "object" && t !== null, oe = (t, e, n) => {
  let a = null;
  if (t instanceof HTMLElement && t.hasAttribute("data-autoappear")) {
    const i = t.dataset.autoappear;
    if (i === "auto" || i === "" || i === "true")
      a = e.autoelements && typeof e.autoelements == "object" ? e.autoelements : null;
    else
      try {
        a = i ? JSON.parse(i) : null;
      } catch (s) {
        L.log(e, `Error parsing data-autoappear: ${s}`), a = null;
      }
  } else e.autoappear && e.autoelements && typeof e.autoelements == "object" && (a = e.autoelements);
  if (a)
    try {
      const i = JSON.parse(ie(a));
      for (const [c, s] of Object.entries(i)) {
        const u = Array.from(t.querySelectorAll(c)).filter(
          (o) => !n.includes(o)
        );
        if (u.length !== 0)
          for (let o = 0; o < u.length; o++) {
            const d = u[o];
            n.push(d);
            let y = [], b = null, p = !1, v = null, I = null;
            if (Array.isArray(s))
              y = String(s[0]).split(/[ ,]+/), b = s[1] !== void 0 ? String(s[1]) : null;
            else if (typeof s == "string")
              y = s.split(/[ ,]+/);
            else if (se(s)) {
              if (s.class || s.animation) {
                const h = s.animation || s.class;
                y = String(h).split(/[ ,]+/);
              }
              s.speed && (p = String(s.speed), p.includes("animate__") || (p = `animate__${p}`)), s.delay !== void 0 && (b = String(s.delay)), s.split !== void 0 && (v = String(s.split)), s["container-delay"] !== void 0 && (I = String(s["container-delay"]));
            }
            y.length > 0 && d.classList.add(...y), p && d.classList.add(p), d instanceof HTMLElement && (b && o > 0 && !d.dataset.delay && (d.dataset.delay = b), I && o === 0 && (d.dataset.delay = I), v && (d.dataset.split = v));
          }
      }
    } catch (i) {
      L.log(e, `Error processing auto animations: ${i}`);
    }
};
function le(t, e) {
  t.classList.contains(e.baseclass) || t.classList.add(e.baseclass), t.classList.contains(e.fragmentClass) && t.classList.add("custom");
}
function ce(t, e, n) {
  let a = 0;
  t.forEach((i, c) => {
    if (c === 0 && i instanceof HTMLElement && i.dataset.delay || c !== 0) {
      let s = e.delay;
      if (i instanceof HTMLElement && i.dataset && i.dataset.delay) {
        const u = Number.parseInt(i.dataset.delay);
        Number.isNaN(u) || (s = u);
      }
      a = a + s, i instanceof HTMLElement && (i.style.setProperty("animation-delay", `${a}ms`), i.removeAttribute("data-delay"));
    }
  });
}
function fe(t, e) {
  let n = !1, a = " ";
  if (t.textContent?.trim() && (e === "words" ? n = t.textContent.trim().split(/\s+/) || [] : e === "letters" && (n = t.textContent.trim().split("") || [], a = ""), n && n.length > 0)) {
    const i = Array.from(t.classList).filter(
      (s) => s.startsWith("animate__")
    ), c = n.map((s, u) => {
      const o = document.createElement("span");
      o.textContent = s === " " ? " " : s, t.dataset.delay && u !== 0 && (o.dataset.delay = t.dataset.delay), t.dataset.containerDelay && u === 0 && (o.dataset.delay = t.dataset.containerDelay);
      for (let d = 0; d < i.length; d++)
        o.classList.add(i[d]);
      return o.outerHTML;
    }).join(a);
    t.classList.add("wordchargroup");
    for (let s = 0; s < i.length; s++)
      t.classList.remove(i[s]);
    t.removeAttribute("data-delay"), t.removeAttribute("data-split"), t.removeAttribute("data-container-delay"), t.innerHTML = c;
  }
}
function j(t, e) {
  const n = t.parentNode;
  if (n) {
    for (const a of Array.from(n.children))
      if (a !== t && a.dataset.appearParent) return;
    n instanceof Element && (n.classList.value = t.classList.value, re(t, n, "data-appear-parent"), n.innerHTML = t.innerHTML, e && n.classList.add(e));
  }
}
function ue(t, e, n) {
  const a = n.baseclass;
  if (t.hasAttribute("data-appear-parent") && j(t, a), e.appearparents && t.parentNode && t.parentNode instanceof Element && t.tagName === "SPAN" && t.parentNode.tagName === "LI") {
    const i = t.outerHTML.length, c = t.parentNode.innerHTML.length;
    i === c && j(t);
  }
}
const de = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (a) => !a.closest(`.${e}`)
), ge = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (a) => a.closest(`.${e}`) === n
), me = (t, e, n) => {
  if (!e) return !1;
  const a = [
    de(e, n, t),
    ...Array.from(t.querySelectorAll(`.${n}`)).map(
      (i) => ge(e, n, i)
    )
  ];
  return a.some((i) => i.length > 0) ? a : !1;
};
function pe(t) {
  return {
    from: t.fromSlide || t.previousSlide || null,
    to: t.toSlide || t.currentSlide || null
  };
}
function he(t, e) {
  t.dataset.appearevent && t.dataset.appearevent === "auto" && (t.dataset.appearevent = "autoanimate");
  let n = e.appearevent;
  return n === "auto" && (n = "autoanimate"), t.dataset.appearevent || n;
}
function C(t, e) {
  e.hideagain && t.from && t.from.dataset.appearanceCanStart && t.from.removeAttribute("data-appearance-can-start");
}
function N(t, e, n) {
  if (e.hideagain && t && t.from) {
    const a = t.from.querySelectorAll(n.animatecss);
    if (a)
      for (const c of a)
        c.classList.remove("animationended");
    const i = t.from.querySelectorAll(".fragment.visible");
    if (i)
      for (const c of i)
        c.classList.remove("animationended");
  }
}
function ye(t, e, n, a) {
  const i = a.getViewportElement();
  a.getConfig().view;
  const s = i.classList.contains("reveal-scroll"), u = t.type, o = pe(t);
  if (o.to) {
    u === "ready" && (o.to.dataset.appearanceCanStart = "true");
    const d = he(o.to, e);
    (u === d || u === "slidetransitionend" && d === "autoanimate") && (o.to.dataset.appearanceCanStart = "true"), s && u === "slidechanged" && (C(o, e), N(o, e, n), setTimeout(() => {
      o.to && (o.to.dataset.appearanceCanStart = "true");
    }, e.delay)), u === "slidetransitionend" && (C(o, e), N(o, e, n)), u === "slidechanged" && document.body.dataset.exitoverview ? (C(o, e), o.to.dataset.appearanceCanStart = "true") : u === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
      document.body.removeAttribute("data-exitoverview");
    }, 500), t.currentSlide && (C(o, e), o.to.dataset.appearanceCanStart = "true"));
  }
}
class O {
  deck;
  viewport;
  revealEl;
  slides;
  options;
  consts;
  sections;
  regularSections;
  fragments;
  appearances;
  constructor(e, n) {
    this.deck = e, this.options = n, this.viewport = e.getViewportElement(), this.revealEl = e.getRevealElement(), this.slides = e.getSlidesElement(), this.consts = ne(
      n.baseclass,
      n.compatibilitybaseclass,
      n.compatibility
    ), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter(
      (a) => !te.isStack(a)
    ), this.fragments = this.slides.querySelectorAll(this.consts.fragmentSelector), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
  }
  /**
   * Prepare appearance elements
   */
  async prepareElements() {
    this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));
    for (const e of this.regularSections)
      oe(e, this.options, this.appearances);
    for (const e of this.appearances)
      ue(e, this.options, this.consts), le(e, this.consts), e instanceof HTMLElement && e.dataset.split && fe(e, e.dataset.split);
    for (const e of this.regularSections) {
      const n = me(
        e,
        this.consts.baseclass,
        this.consts.fragmentClass
      );
      if (n)
        for (const a of n)
          ce(a, this.options, this.consts);
    }
  }
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    for (const e of this.consts.eventnames)
      this.deck.on(e, (n) => {
        ye(n, this.options, this.consts, this.deck);
      });
    this.viewport.addEventListener("animationend", (e) => {
      e.target.classList.add("animationended");
    }), this.viewport.addEventListener("autoanimate", (e) => {
      console.log("Autoanimate event triggered:", e);
    }), this.viewport.addEventListener("fragmenthidden", (e) => {
      const n = e;
      if (n.fragment) {
        n.fragment.classList.remove("animationended");
        const a = n.fragment.querySelectorAll(".animationended");
        for (const i of a)
          i.classList.remove("animationended");
      }
    });
  }
  /**
   * Create a new Appearance instance
   */
  static async create(e, n) {
    const a = new O(e, n);
    return await a.prepareElements(), a.setupEventListeners(), a;
  }
}
const H = "appearance", be = async (t, e, n) => {
  L && n.debug && L.initialize(!0, H), await K(t, n), await O.create(e, n);
}, Se = () => new F(H, be, U).createInterface();
export {
  Se as default
};
