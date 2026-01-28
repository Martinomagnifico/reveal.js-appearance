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


function U(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var D, j;
function k() {
  if (j) return D;
  j = 1;
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
  function f(r, l) {
    return l.clone !== !1 && l.isMergeableObject(r) ? m(s(r), r, l) : r;
  }
  function o(r, l, u) {
    return r.concat(l).map(function(h) {
      return f(h, u);
    });
  }
  function d(r, l) {
    if (!l.customMerge)
      return m;
    var u = l.customMerge(r);
    return typeof u == "function" ? u : m;
  }
  function y(r) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(l) {
      return Object.propertyIsEnumerable.call(r, l);
    }) : [];
  }
  function p(r) {
    return Object.keys(r).concat(y(r));
  }
  function C(r, l) {
    try {
      return l in r;
    } catch {
      return !1;
    }
  }
  function S(r, l) {
    return C(r, l) && !(Object.hasOwnProperty.call(r, l) && Object.propertyIsEnumerable.call(r, l));
  }
  function v(r, l, u) {
    var h = {};
    return u.isMergeableObject(r) && p(r).forEach(function(g) {
      h[g] = f(r[g], u);
    }), p(l).forEach(function(g) {
      S(r, g) || (C(r, g) && u.isMergeableObject(l[g]) ? h[g] = d(g, u)(r[g], l[g], u) : h[g] = f(l[g], u));
    }), h;
  }
  function m(r, l, u) {
    u = u || {}, u.arrayMerge = u.arrayMerge || o, u.isMergeableObject = u.isMergeableObject || t, u.cloneUnlessOtherwiseSpecified = f;
    var h = Array.isArray(l), g = Array.isArray(r), z = h === g;
    return z ? h ? u.arrayMerge(r, l, u) : v(r, l, u) : f(l, u);
  }
  m.all = function(l, u) {
    if (!Array.isArray(l))
      throw new Error("first argument should be an array");
    return l.reduce(function(h, g) {
      return m(h, g, u);
    }, {});
  };
  var A = m;
  return D = A, D;
}
var q = k();
const B = /* @__PURE__ */ U(q);
let L = null;
const V = () => {
  if (L) return L;
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
  return L = {
    isDevelopment: n || a,
    hasHMR: n,
    isViteDev: a,
    hasWindow: t,
    hasDocument: e
  }, L;
};
class J {
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
    this.userConfigData = a, this.mergedConfig = B(n, a, {
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
const F = (t) => {
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
}, R = "data-css-id", G = (t, e) => new Promise((n, a) => {
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = e, i.setAttribute(R, t);
  const c = setTimeout(() => {
    i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${t}] Timeout loading CSS from: ${e}`));
  }, 5e3);
  i.onload = () => {
    clearTimeout(c), n();
  }, i.onerror = () => {
    clearTimeout(c), i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${t}] Failed to load CSS from: ${e}`));
  }, document.head.appendChild(i);
}), T = (t) => document.querySelectorAll(`[${R}="${t}"]`).length > 0, W = (t) => new Promise((e) => {
  if (n())
    return e(!0);
  setTimeout(() => {
    e(n());
  }, 50);
  function n() {
    if (T(t)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${t}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), N = async (t) => {
  const { id: e, cssautoload: n = !0, csspath: a = "", debug: i = !1 } = t;
  if (n === !1 || a === !1) return;
  if (T(e) && !(typeof a == "string" && a.trim() !== "")) {
    i && console.log(`[${e}] CSS is already loaded, skipping`);
    return;
  }
  T(e) && typeof a == "string" && a.trim() !== "" && i && console.log(`[${e}] CSS is already loaded, also loading user-specified path: ${a}`);
  const c = [];
  typeof a == "string" && a.trim() !== "" && c.push(a);
  const s = F(e);
  if (s) {
    const o = `${s}${e}.css`;
    c.push(o);
  }
  const f = `plugin/${e}/${e}.css`;
  c.push(f);
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
      return N({
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
  return N(t);
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
}), b = X(new Y());
var P = /* @__PURE__ */ ((t) => (t.HORIZONTAL = "horizontal", t.STACK = "stack", t.VERTICAL = "vertical", t.INVALID = "invalid", t))(P || {});
const I = (t) => t instanceof HTMLElement && t.tagName === "SECTION", w = (t) => I(t) ? Array.from(t.children).some(
  (e) => e instanceof HTMLElement && e.tagName === "SECTION"
) : !1, $ = (t) => I(t) ? t.parentElement instanceof HTMLElement && t.parentElement.tagName === "SECTION" : !1, Z = (t) => I(t) && !$(t) && !w(t), Q = (t) => {
  if (!I(t)) return null;
  if ($(t)) {
    const e = t.parentElement;
    if (e instanceof HTMLElement && w(e))
      return e;
  }
  return null;
}, ee = (t) => I(t) ? $(t) ? "vertical" : w(t) ? "stack" : "horizontal" : "invalid", te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: P,
  getSectionType: ee,
  getStack: Q,
  isHorizontal: Z,
  isSection: I,
  isStack: w,
  isVertical: $
}, Symbol.toStringTag, { value: "Module" })), ne = {
  baseclass: "animate__animated",
  hideagain: !0,
  delay: 300,
  appearevent: "slidetransitionend",
  autoappear: !1,
  autoelements: !1,
  appearparents: !1,
  initdelay: 0,
  cssautoload: !0,
  csspath: "",
  compatibility: !1,
  compatibilitybaseclass: "animated"
};
function ae(t, e, n) {
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
const ie = (t) => {
  try {
    return JSON.parse(t) && !!t;
  } catch {
    return !1;
  }
}, O = (t) => {
  if (t == null)
    return "";
  let e = "", n = t;
  return typeof n == "string" && (n = n.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")), ie(t) ? e = t : typeof t == "object" ? e = JSON.stringify(t, null, 2) : typeof t == "string" && (e = t.trim().replace(/'/g, '"').charAt(0) === "{" ? t.trim().replace(/'/g, '"') : `{${t.trim().replace(/'/g, '"')}}`), e;
}, re = (t, e, n) => {
  for (const a of Array.from(t.attributes))
    a.nodeName.startsWith("data") && a.nodeName !== n && e.setAttribute(a.nodeName, a.nodeValue || "");
}, se = (t) => {
  const e = document.createElement("textarea");
  return e.innerHTML = t, e.value;
}, oe = (t) => typeof t == "object" && t !== null, le = (t, e, n) => {
  let a = null;
  if (t instanceof HTMLElement && t.hasAttribute("data-autoappear")) {
    const i = t.dataset.autoappear;
    if (i === "auto" || i === "" || i === "true")
      if (typeof e.autoelements == "string")
        try {
          a = JSON.parse(e.autoelements);
        } catch (s) {
          b.log(`Error parsing global autoelements string: ${s} (${e.autoelements})`), a = null;
        }
      else
        a = e.autoelements && typeof e.autoelements == "object" ? e.autoelements : null;
    else
      try {
        a = i ? JSON.parse(O(se(i))) : null;
      } catch (s) {
        b.log(`Error parsing data-autoappear: ${s} (${i})`), a = null;
      }
  } else if (e.autoappear && e.autoelements)
    if (typeof e.autoelements == "string")
      try {
        a = JSON.parse(O(e.autoelements));
      } catch (i) {
        b.log(`Error parsing global autoelements string: ${i} (${e.autoelements})`), a = null;
      }
    else typeof e.autoelements == "object" && (a = e.autoelements);
  if (a)
    try {
      const i = JSON.parse(O(a));
      for (const [c, s] of Object.entries(i)) {
        const f = Array.from(t.querySelectorAll(c)).filter(
          (y) => !n.includes(y)
        );
        if (f.length === 0) continue;
        let o = null, d = 0;
        for (let y = 0; y < f.length; y++) {
          const p = f[y], C = p.parentElement;
          C !== o && (o = C, d = 0), n.push(p);
          let S = [], v = null, m = !1, A = null, r = null;
          if (Array.isArray(s))
            S = String(s[0]).split(/[ ,]+/), v = s[1] !== void 0 ? String(s[1]) : null;
          else if (typeof s == "string")
            S = s.split(/[ ,]+/);
          else if (oe(s)) {
            if (s.class || s.animation) {
              const l = s.animation || s.class;
              S = String(l).split(/[ ,]+/);
            }
            s.speed && (m = String(s.speed), m.includes("animate__") || (m = `animate__${m}`)), s.delay !== void 0 && (v = String(s.delay)), s.split !== void 0 && (A = String(s.split)), s["container-delay"] !== void 0 && (r = String(s["container-delay"]));
          }
          S.length > 0 && p.classList.add(...S), m && p.classList.add(m), p instanceof HTMLElement && (r && d === 0 ? p.dataset.delay = r : v && d > 0 && !p.dataset.delay && (p.dataset.delay = v), A && (p.dataset.split = A)), d++;
        }
      }
    } catch (i) {
      b.log(e, `Error processing auto animations: ${i}`);
    }
};
function ce(t, e) {
  t.classList.contains(e.baseclass) || t.classList.add(e.baseclass), t.classList.contains(e.fragmentClass) && t.classList.add("custom");
}
function ue(t, e) {
  let n = 0;
  t.forEach((a, i) => {
    if (i === 0 && a instanceof HTMLElement && a.dataset.delay || i !== 0) {
      let c = e.delay;
      if (a instanceof HTMLElement && a.dataset && a.dataset.delay) {
        const s = Number.parseInt(a.dataset.delay, 10);
        Number.isNaN(s) || (c = s);
      }
      n = n + c, a instanceof HTMLElement && (a.style.setProperty("animation-delay", `${n}ms`), a.removeAttribute("data-delay"));
    }
  });
}
function fe(t, e) {
  let n = !1, a = " ";
  if (t.textContent?.trim() && (e === "words" ? n = t.textContent.trim().split(/\s+/) || [] : e === "letters" && (n = t.textContent.trim().split("") || [], a = ""), n && n.length > 0)) {
    const i = Array.from(t.classList).filter(
      (s) => s.startsWith("animate__")
    ), c = n.map((s, f) => {
      const o = document.createElement("span");
      o.textContent = s === " " ? " " : s, t.dataset.delay && f !== 0 && (o.dataset.delay = t.dataset.delay), t.dataset.containerDelay && f === 0 && (o.dataset.delay = t.dataset.containerDelay);
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
function _(t, e) {
  const n = t.parentNode;
  if (n) {
    for (const a of Array.from(n.children))
      if (a !== t && a.dataset.appearParent) return;
    n instanceof Element && (n.classList.value = t.classList.value, re(t, n, "data-appear-parent"), n.innerHTML = t.innerHTML, e && n.classList.add(e));
  }
}
function de(t, e, n) {
  const a = n.baseclass;
  if (t.hasAttribute("data-appear-parent") && _(t, a), e.appearparents && t.parentNode && t.parentNode instanceof Element && t.tagName === "SPAN" && t.parentNode.tagName === "LI") {
    const i = t.outerHTML.length, c = t.parentNode.innerHTML.length;
    i === c && _(t);
  }
}
const ge = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (a) => !a.closest(`.${e}`)
), me = (t, e, n) => Array.from(n.querySelectorAll(`.${t}`)).filter(
  (a) => a.closest(`.${e}`) === n
), pe = (t, e, n) => {
  if (!e) return !1;
  const a = [
    ge(e, n, t),
    ...Array.from(t.querySelectorAll(`.${n}`)).map(
      (i) => me(e, n, i)
    )
  ];
  return a.some((i) => i.length > 0) ? a : !1;
};
function he(t) {
  return {
    from: t.fromSlide || t.previousSlide || null,
    to: t.toSlide || t.currentSlide || null
  };
}
function ye(t, e) {
  t.dataset.appearevent && t.dataset.appearevent === "auto" && (t.dataset.appearevent = "autoanimate");
  let n = e.appearevent;
  return n === "auto" && (n = "autoanimate"), t.dataset.appearevent || n;
}
function E(t, e) {
  e.hideagain && t.from && t.from.dataset.appearanceCanStart && t.from.removeAttribute("data-appearance-can-start");
}
function H(t, e, n) {
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
function be(t, e, n, a, i) {
  const s = a.getViewportElement().classList.contains("reveal-scroll"), f = t.type, o = he(t);
  if (o.to) {
    if (f === "ready") {
      const y = o.to.dataset.initDelay ? parseInt(o.to.dataset.initDelay, 10) : e.initdelay || 0;
      i.value && y > 0 ? setTimeout(() => {
        o.to && (o.to.dataset.appearanceCanStart = "true"), i.value = !1;
      }, y) : (o.to.dataset.appearanceCanStart = "true", i.value = !1);
    }
    const d = ye(o.to, e);
    (f === d || f === "slidetransitionend" && d === "autoanimate") && (o.to.dataset.appearanceCanStart = "true"), s && f === "slidechanged" && (E(o, e), H(o, e, n), setTimeout(() => {
      o.to && (o.to.dataset.appearanceCanStart = "true");
    }, e.delay)), f === "slidetransitionend" && (E(o, e), H(o, e, n)), f === "slidechanged" && document.body.dataset.exitoverview ? (E(o, e), o.to.dataset.appearanceCanStart = "true") : f === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
      document.body.removeAttribute("data-exitoverview");
    }, 500), t.currentSlide && (E(o, e), o.to.dataset.appearanceCanStart = "true"));
  }
}
class M {
  deck;
  viewport;
  slides;
  options;
  consts;
  sections;
  regularSections;
  appearances;
  isInitialLoad;
  constructor(e, n) {
    this.deck = e, this.options = n, this.isInitialLoad = !0, this.viewport = e.getViewportElement(), this.slides = e.getSlidesElement(), this.consts = ae(
      n.baseclass,
      n.compatibilitybaseclass,
      n.compatibility
    ), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter(
      (a) => !te.isStack(a)
    ), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
  }
  /**
   * Prepare appearance elements
   */
  async prepareElements() {
    this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));


// Find all appearance elements
this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));

// Remove inline elements (em, strong, code, span, etc.) inside list items when they have the same animation class
// This fixes a Reveal.js Markdown parser quirk where .element comments apply classes to both li and inline elements
this.appearances = this.appearances.filter((element) => {
    // Only check common inline elements
    if (!['EM', 'STRONG', 'I', 'B', 'CODE', 'SPAN', 'A', 'ABBR', 'MARK', 'SMALL', 'SUB', 'SUP'].includes(element.tagName)) {
        return true; // Keep non-inline elements
    }
    
    // Check if this inline element is inside a list item
    const parentLi = element.closest('li');
    if (!parentLi || !this.appearances.includes(parentLi)) {
        return true; // Keep if not in an li or li is not animated
    }
    
    // Check if both have the same animation class
    const elementAnimClasses = Array.from(element.classList).filter(c => c.startsWith('animate__'));
    const liAnimClasses = Array.from(parentLi.classList).filter(c => c.startsWith('animate__'));
    const hasSameClass = elementAnimClasses.some(c => liAnimClasses.includes(c));
    
    if (hasSameClass) {
        return false; // Filter out this inline element - it's redundant
    }
    
    return true; // Keep if different animation classes
});

debug.log(this.options, `Initially found ${this.appearances.length} appearance elements`);


    for (const e of this.regularSections)
      le(e, this.options, this.appearances);
    for (const e of this.appearances)
      de(e, this.options, this.consts), ce(e, this.consts), e instanceof HTMLElement && e.dataset.split && fe(e, e.dataset.split);
    for (const e of this.regularSections) {
      const n = pe(
        e,
        this.consts.baseclass,
        this.consts.fragmentClass
      );
      if (n)
        for (const a of n)
          ue(a, this.options);
    }
  }
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    b.log("Options:", this.options), b.log("Setting up event listeners");
    const e = { value: this.isInitialLoad };
    for (const n of this.consts.eventnames)
      b.log(`Adding listener for ${n} event`), this.deck.on(n, (a) => {
        be(a, this.options, this.consts, this.deck, e), this.isInitialLoad = e.value;
      });
    this.viewport.addEventListener("animationend", (n) => {
      n.target.classList.add("animationended");
    }), this.viewport.addEventListener("autoanimate", (n) => {
      b.log("Autoanimate event triggered:", n);
    }), this.viewport.addEventListener("fragmenthidden", (n) => {
      const a = n;
      if (a.fragment) {
        a.fragment.classList.remove("animationended");
        const i = a.fragment.querySelectorAll(".animationended");
        for (const c of i)
          c.classList.remove("animationended");
      }
    });
  }
  /**
   * Create a new Appearance instance
   */
  static async create(e, n) {
    const a = new M(e, n);
    return await a.prepareElements(), a.setupEventListeners(), a;
  }
}
const x = "appearance", Se = async (t, e, n) => {
  b && n.debug && b.initialize(!0, x), await K(t, n), await M.create(e, n);
}, ve = () => new J(x, Se, ne).createInterface();
export {
  ve as default
};
