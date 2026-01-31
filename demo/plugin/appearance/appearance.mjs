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


function k(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var D, O;
function q() {
  if (O) return D;
  O = 1;
  var e = function(o) {
    return t(o) && !n(o);
  };
  function t(r) {
    return !!r && typeof r == "object";
  }
  function n(r) {
    var o = Object.prototype.toString.call(r);
    return o === "[object RegExp]" || o === "[object Date]" || c(r);
  }
  var a = typeof Symbol == "function" && Symbol.for, i = a ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
  function c(r) {
    return r.$$typeof === i;
  }
  function u(r) {
    return Array.isArray(r) ? [] : {};
  }
  function s(r, o) {
    return o.clone !== !1 && o.isMergeableObject(r) ? p(u(r), r, o) : r;
  }
  function l(r, o, f) {
    return r.concat(o).map(function(h) {
      return s(h, f);
    });
  }
  function g(r, o) {
    if (!o.customMerge)
      return p;
    var f = o.customMerge(r);
    return typeof f == "function" ? f : p;
  }
  function b(r) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(o) {
      return Object.propertyIsEnumerable.call(r, o);
    }) : [];
  }
  function y(r) {
    return Object.keys(r).concat(b(r));
  }
  function d(r, o) {
    try {
      return o in r;
    } catch {
      return !1;
    }
  }
  function C(r, o) {
    return d(r, o) && !(Object.hasOwnProperty.call(r, o) && Object.propertyIsEnumerable.call(r, o));
  }
  function I(r, o, f) {
    var h = {};
    return f.isMergeableObject(r) && y(r).forEach(function(m) {
      h[m] = s(r[m], f);
    }), y(o).forEach(function(m) {
      C(r, m) || (d(r, m) && f.isMergeableObject(o[m]) ? h[m] = g(m, f)(r[m], o[m], f) : h[m] = s(o[m], f));
    }), h;
  }
  function p(r, o, f) {
    f = f || {}, f.arrayMerge = f.arrayMerge || l, f.isMergeableObject = f.isMergeableObject || e, f.cloneUnlessOtherwiseSpecified = s;
    var h = Array.isArray(o), m = Array.isArray(r), U = h === m;
    return U ? h ? f.arrayMerge(r, o, f) : I(r, o, f) : s(o, f);
  }
  p.all = function(o, f) {
    if (!Array.isArray(o))
      throw new Error("first argument should be an array");
    return o.reduce(function(h, m) {
      return p(h, m, f);
    }, {});
  };
  var S = p;
  return D = S, D;
}
var B = q();
const V = /* @__PURE__ */ k(B);
let L = null;
const F = () => {
  if (L) return L;
  const e = typeof window < "u", t = typeof document < "u";
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
    hasWindow: e,
    hasDocument: t
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
  constructor(t, n, a) {
    typeof t == "string" ? (this.pluginId = t, this.pluginInit = n, this.defaultConfig = a || {}) : (this.pluginId = t.id, this.pluginInit = t.init, this.defaultConfig = t.defaultConfig || {});
  }
  // Initialize plugin configuration by merging default and user settings
  initializeConfig(t) {
    const n = this.defaultConfig, a = t.getConfig()[this.pluginId] || {};
    this.userConfigData = a, this.mergedConfig = V(n, a, {
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
  getEnvironmentInfo = () => F();
  // Initialize the plugin
  init(t) {
    if (this.initializeConfig(t), this.pluginInit)
      return this.pluginInit(this, t, this.getCurrentConfig());
  }
  // Create the plugin interface containing all exports
  createInterface(t = {}) {
    return {
      id: this.pluginId,
      init: (n) => this.init(n),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...t
    };
  }
}
const G = (e) => {
  const t = document.querySelector(
    `script[src$="${e}.js"], script[src$="${e}.min.js"], script[src$="${e}.mjs"]`
  );
  if (t?.src) {
    const n = t.getAttribute("src") || "", a = n.lastIndexOf("/");
    if (a !== -1)
      return n.substring(0, a + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${e}/`;
}, R = "data-css-id", W = (e, t) => new Promise((n, a) => {
  const i = document.createElement("link");
  i.rel = "stylesheet", i.href = t, i.setAttribute(R, e);
  const c = setTimeout(() => {
    i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${e}] Timeout loading CSS from: ${t}`));
  }, 5e3);
  i.onload = () => {
    clearTimeout(c), n();
  }, i.onerror = () => {
    clearTimeout(c), i.parentNode && i.parentNode.removeChild(i), a(new Error(`[${e}] Failed to load CSS from: ${t}`));
  }, document.head.appendChild(i);
}), T = (e) => document.querySelectorAll(`[${R}="${e}"]`).length > 0, K = (e) => new Promise((t) => {
  if (n())
    return t(!0);
  setTimeout(() => {
    t(n());
  }, 50);
  function n() {
    if (T(e)) return !0;
    try {
      return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
    } catch {
      return !1;
    }
  }
}), j = async (e) => {
  const { id: t, cssautoload: n = !0, csspath: a = "", debug: i = !1 } = e;
  if (n === !1 || a === !1) return;
  if (T(t) && !(typeof a == "string" && a.trim() !== "")) {
    i && console.log(`[${t}] CSS is already loaded, skipping`);
    return;
  }
  T(t) && typeof a == "string" && a.trim() !== "" && i && console.log(`[${t}] CSS is already loaded, also loading user-specified path: ${a}`);
  const c = [];
  typeof a == "string" && a.trim() !== "" && c.push(a);
  const u = G(t);
  if (u) {
    const l = `${u}${t}.css`;
    c.push(l);
  }
  const s = `plugin/${t}/${t}.css`;
  c.push(s);
  for (const l of c)
    try {
      await W(t, l);
      let g = "CSS";
      a && l === a ? g = "user-specified CSS" : u && l === `${u}${t}.css` ? g = "CSS (auto-detected from script location)" : g = "CSS (standard fallback)", i && console.log(`[${t}] ${g} loaded successfully from: ${l}`);
      return;
    } catch {
      i && console.log(`[${t}] Failed to load CSS from: ${l}`);
    }
  console.warn(`[${t}] Could not load CSS from any location`);
};
async function Y(e, t) {
  if ("getEnvironmentInfo" in e && t) {
    const n = e, a = n.getEnvironmentInfo();
    if (await K(n.pluginId) && !(typeof t.csspath == "string" && t.csspath.trim() !== "")) {
      t.debug && console.log(`[${n.pluginId}] CSS is already imported, skipping`);
      return;
    }
    if ("cssautoload" in n.userConfig ? t.cssautoload : !a.isDevelopment)
      return j({
        id: n.pluginId,
        cssautoload: !0,
        csspath: t.csspath,
        debug: t.debug
      });
    a.isDevelopment && console.warn(
      `[${n.pluginId}] CSS autoloading is disabled in bundler environments. Please import the CSS manually, using import.`
    );
    return;
  }
  return j(e);
}
class Q {
  // Flag to enable/disable all debugging output
  debugMode = !1;
  // Label to prefix all debug messages with
  label = "DEBUG";
  // Tracks the current depth of console groups for proper formatting
  groupDepth = 0;
  // Initializes the debug utility with custom settings.
  initialize(t, n = "DEBUG") {
    this.debugMode = t, this.label = n;
  }
  // Creates a new console group and tracks the group depth. 
  // Groups will always display the label prefix in their header.
  group = (...t) => {
    this.debugLog("group", ...t), this.groupDepth++;
  };
  // Creates a new collapsed console group and tracks the group depth.
  groupCollapsed = (...t) => {
    this.debugLog("groupCollapsed", ...t), this.groupDepth++;
  };
  // Ends the current console group and updates the group depth tracker.
  groupEnd = () => {
    this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
  };
  // Formats and logs an error message with the debug label. 
  // Error messages are always shown, even when debug mode is disabled.
  error = (...t) => {
    const n = this.debugMode;
    this.debugMode = !0, this.formatAndLog(console.error, t), this.debugMode = n;
  };
  // Displays a table in the console with the pluginDebug label.
  // Special implementation for console.table to handle tabular data properly.
  // @param messageOrData - Either a message string or the tabular data
  // @param propertiesOrData - Either property names or tabular data (if first param was message)
  // @param optionalProperties - Optional property names (if first param was message)
  table = (t, n, a) => {
    if (this.debugMode)
      try {
        typeof t == "string" && n !== void 0 && typeof n != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${t}`) : console.log(t), a ? console.table(n, a) : console.table(n)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof n == "object" && Array.isArray(n) ? console.table(t, n) : console.table(t));
      } catch (i) {
        console.error(`[${this.label}]: Error showing table:`, i), console.log(`[${this.label}]: Raw data:`, t);
      }
  };
  // Helper method that formats and logs messages with the pluginDebug label.
  // @param logMethod - The console method to use for logging
  // @param args - Arguments to pass to the console method
  formatAndLog = (t, n) => {
    if (this.debugMode)
      try {
        this.groupDepth > 0 ? t.call(console, ...n) : n.length > 0 && typeof n[0] == "string" ? t.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : t.call(console, `[${this.label}]:`, ...n);
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
  debugLog(t, ...n) {
    const a = console[t];
    if (!this.debugMode && t !== "error" || typeof a != "function") return;
    const i = a;
    if (t === "group" || t === "groupCollapsed") {
      n.length > 0 && typeof n[0] == "string" ? i.call(console, `[${this.label}]: ${n[0]}`, ...n.slice(1)) : i.call(console, `[${this.label}]:`, ...n);
      return;
    }
    if (t === "groupEnd") {
      i.call(console);
      return;
    }
    if (t === "table") {
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
const X = (e) => new Proxy(e, {
  get: (t, n) => {
    if (n in t)
      return t[n];
    const a = n.toString();
    if (typeof console[a] == "function")
      return (...i) => {
        t.debugLog(a, ...i);
      };
  }
}), v = X(new Q());
var P = /* @__PURE__ */ ((e) => (e.HORIZONTAL = "horizontal", e.STACK = "stack", e.VERTICAL = "vertical", e.INVALID = "invalid", e))(P || {});
const A = (e) => e instanceof HTMLElement && e.tagName === "SECTION", w = (e) => A(e) ? Array.from(e.children).some(
  (t) => t instanceof HTMLElement && t.tagName === "SECTION"
) : !1, $ = (e) => A(e) ? e.parentElement instanceof HTMLElement && e.parentElement.tagName === "SECTION" : !1, Z = (e) => A(e) && !$(e) && !w(e), ee = (e) => {
  if (!A(e)) return null;
  if ($(e)) {
    const t = e.parentElement;
    if (t instanceof HTMLElement && w(t))
      return t;
  }
  return null;
}, te = (e) => A(e) ? $(e) ? "vertical" : w(e) ? "stack" : "horizontal" : "invalid", ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SectionType: P,
  getSectionType: te,
  getStack: ee,
  isHorizontal: Z,
  isSection: A,
  isStack: w,
  isVertical: $
}, Symbol.toStringTag, { value: "Module" })), ae = {
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
function ie(e, t, n) {
  const a = {
    baseclass: e,
    compatibilitybaseclass: t,
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
  ], n && (a.animatecss = ".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur", a.baseclass = t), a;
}
const re = (e) => {
  try {
    return JSON.parse(e) && !!e;
  } catch {
    return !1;
  }
}, x = (e) => {
  if (e == null)
    return "";
  let t = "", n = e;
  return typeof n == "string" && (n = n.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")), re(e) ? t = e : typeof e == "object" ? t = JSON.stringify(e, null, 2) : typeof e == "string" && (t = e.trim().replace(/'/g, '"').charAt(0) === "{" ? e.trim().replace(/'/g, '"') : `{${e.trim().replace(/'/g, '"')}}`), t;
}, se = (e, t, n) => {
  for (const a of Array.from(e.attributes))
    a.nodeName.startsWith("data") && a.nodeName !== n && t.setAttribute(a.nodeName, a.nodeValue || "");
}, oe = (e) => {
  const t = document.createElement("textarea");
  return t.innerHTML = e, t.value;
}, le = (e) => e.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"'), N = (e, t = !1) => {
  if (!e) return null;
  if (typeof e == "object" && e !== null && !Array.isArray(e))
    return e;
  if (typeof e == "boolean")
    return null;
  if (typeof e == "string")
    try {
      let n = e;
      return t && (n = le(oe(e))), JSON.parse(x(n));
    } catch (n) {
      return v.log(`Error parsing autoelements: ${n} (${e})`), null;
    }
  return null;
}, ce = (e) => typeof e == "object" && e !== null, fe = (e, t, n) => {
  let a = null, i = null;
  if (t.autoappear && t.autoelements && (i = N(t.autoelements, !1)), e instanceof HTMLElement && e.hasAttribute("data-autoappear")) {
    const c = e.dataset.autoappear;
    if (c === "auto" || c === "" || c === "true")
      a = i;
    else {
      const s = N(c || "", !0);
      i && s ? a = { ...i, ...s } : s ? a = s : a = i;
    }
  } else i && (a = i);
  if (a)
    try {
      const c = JSON.parse(x(a));
      for (const [u, s] of Object.entries(c)) {
        const l = Array.from(e.querySelectorAll(u)).filter((y) => {
          if (n.includes(y)) return !1;
          for (const d of n)
            if (d.contains(y) && d !== y)
              return !1;
          return !0;
        });
        if (l.length === 0) continue;
        let g = null, b = 0;
        for (let y = 0; y < l.length; y++) {
          const d = l[y], C = d.parentElement;
          C !== g && (g = C, b = 0), n.push(d);
          let I = [], p = null, S = !1, r = null, o = null;
          if (Array.isArray(s))
            I = String(s[0]).split(/[ ,]+/), p = s[1] !== void 0 ? String(s[1]) : null;
          else if (typeof s == "string")
            I = s.split(/[ ,]+/);
          else if (ce(s)) {
            if (s.class || s.animation) {
              const f = s.animation || s.class;
              I = String(f).split(/[ ,]+/);
            }
            s.speed && (S = String(s.speed), S.includes("animate__") || (S = `animate__${S}`)), s.delay !== void 0 && (p = String(s.delay)), s.split !== void 0 && (r = String(s.split)), s["container-delay"] !== void 0 && (o = String(s["container-delay"]));
          }
          I.length > 0 && d.classList.add(...I), S && d.classList.add(S), d instanceof HTMLElement && (r ? (p && (d.dataset.delay = p), o && (d.dataset.containerDelay = o), d.dataset.split = r) : o && b === 0 ? d.dataset.delay = o : p && b > 0 && !d.dataset.delay && (d.dataset.delay = p)), b++;
        }
      }
    } catch (c) {
      v.log(t, `Error processing auto animations: ${c}`);
    }
};
function ue(e, t) {
  e.classList.contains(t.baseclass) || e.classList.add(t.baseclass), e.classList.contains(t.fragmentClass) && e.classList.add("custom");
}
function de(e, t) {
  let n = 0;
  e.forEach((a, i) => {
    if (!(a instanceof HTMLElement && a.style.animationDelay) && (i === 0 && a instanceof HTMLElement && a.dataset.delay || i !== 0)) {
      let c = t.delay;
      if (a instanceof HTMLElement && a.dataset && a.dataset.delay) {
        const u = Number.parseInt(a.dataset.delay, 10);
        Number.isNaN(u) || (c = u);
      }
      n = n + c, a instanceof HTMLElement && (a.style.setProperty("animation-delay", `${n}ms`), a.removeAttribute("data-delay"));
    }
  });
}
function ge(e, t) {
  let n = !1, a = " ";
  if (e.textContent?.trim() && (t === "words" ? n = e.textContent.trim().split(/\s+/) || [] : t === "letters" && (n = e.textContent.trim().split("") || [], a = ""), n && n.length > 0)) {
    const i = Array.from(e.classList).filter(
      (u) => u.startsWith("animate__")
    ), c = n.map((u, s) => {
      const l = document.createElement("span");
      l.textContent = u === " " ? " " : u, e.dataset.delay && s !== 0 && (l.dataset.delay = e.dataset.delay), e.dataset.containerDelay && s === 0 && (l.dataset.delay = e.dataset.containerDelay);
      for (let g = 0; g < i.length; g++)
        l.classList.add(i[g]);
      return l.outerHTML;
    }).join(a);
    e.classList.add("wordchargroup");
    for (let u = 0; u < i.length; u++)
      e.classList.remove(i[u]);
    e.removeAttribute("data-delay"), e.removeAttribute("data-split"), e.removeAttribute("data-container-delay"), e.innerHTML = c;
  }
}
function _(e, t) {
  const n = e.parentNode;
  if (n) {
    for (const a of Array.from(n.children))
      if (a !== e && a.dataset.appearParent) return;
    n instanceof Element && (n.classList.value = e.classList.value, se(e, n, "data-appear-parent"), n.innerHTML = e.innerHTML, t && n.classList.add(t));
  }
}
function me(e, t, n) {
  const a = n.baseclass;
  if (e.hasAttribute("data-appear-parent") && _(e, a), t.appearparents && e.parentNode && e.parentNode instanceof Element && e.tagName === "SPAN" && e.parentNode.tagName === "LI") {
    const i = e.outerHTML.length, c = e.parentNode.innerHTML.length;
    i === c && _(e);
  }
}
const pe = (e, t, n) => Array.from(n.querySelectorAll(`.${e}`)).filter(
  (a) => !a.closest(`.${t}`)
), he = (e, t, n) => Array.from(n.querySelectorAll(`.${e}`)).filter(
  (a) => a.closest(`.${t}`) === n
), ye = (e, t, n) => {
  if (!t) return !1;
  const a = [
    pe(t, n, e),
    ...Array.from(e.querySelectorAll(`.${n}`)).map(
      (i) => he(t, n, i)
    )
  ];
  return a.some((i) => i.length > 0) ? a : !1;
};
function be(e) {
  return {
    from: e.fromSlide || e.previousSlide || null,
    to: e.toSlide || e.currentSlide || null
  };
}
function Se(e, t) {
  e.dataset.appearevent && e.dataset.appearevent === "auto" && (e.dataset.appearevent = "autoanimate");
  let n = t.appearevent;
  return n === "auto" && (n = "autoanimate"), e.dataset.appearevent || n;
}
function E(e, t) {
  t.hideagain && e.from && e.from.dataset.appearanceCanStart && e.from.removeAttribute("data-appearance-can-start");
}
function H(e, t, n) {
  if (t.hideagain && e && e.from) {
    const a = e.from.querySelectorAll(n.animatecss);
    if (a)
      for (const c of a)
        c.classList.remove("animationended");
    const i = e.from.querySelectorAll(".fragment.visible");
    if (i)
      for (const c of i)
        c.classList.remove("animationended");
  }
}
function ve(e, t, n, a, i) {
  const u = a.getViewportElement().classList.contains("reveal-scroll"), s = e.type, l = be(e);
  if (l.to) {
    if (s === "ready") {
      const b = l.to.dataset.initdelay ? parseInt(l.to.dataset.initdelay, 10) : t.initdelay || 0;
      i.value && b > 0 ? setTimeout(() => {
        l.to && (l.to.dataset.appearanceCanStart = "true"), i.value = !1;
      }, b) : (l.to.dataset.appearanceCanStart = "true", i.value = !1);
    }
    const g = Se(l.to, t);
    (s === g || s === "slidetransitionend" && g === "autoanimate") && (l.to.dataset.appearanceCanStart = "true"), u && s === "slidechanged" && (E(l, t), H(l, t, n), setTimeout(() => {
      l.to && (l.to.dataset.appearanceCanStart = "true");
    }, t.delay)), s === "slidetransitionend" && (E(l, t), H(l, t, n)), s === "slidechanged" && document.body.dataset.exitoverview ? (E(l, t), l.to.dataset.appearanceCanStart = "true") : s === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
      document.body.removeAttribute("data-exitoverview");
    }, 500), e.currentSlide && (E(l, t), l.to.dataset.appearanceCanStart = "true"));
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
  constructor(t, n) {
    this.deck = t, this.options = n, this.isInitialLoad = !0, this.viewport = t.getViewportElement(), this.slides = t.getSlidesElement(), this.consts = ie(
      n.baseclass,
      n.compatibilitybaseclass,
      n.compatibility
    ), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter(
      (a) => !ne.isStack(a)
    ), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
  }
  /**
   * Prepare appearance elements
   */
  async prepareElements() {
    this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));
    for (const t of this.regularSections)
      fe(t, this.options, this.appearances);
    for (const t of this.appearances)
      me(t, this.options, this.consts), ue(t, this.consts), t instanceof HTMLElement && t.dataset.split && ge(t, t.dataset.split);
    for (const t of this.regularSections) {
      const n = ye(
        t,
        this.consts.baseclass,
        this.consts.fragmentClass
      );
      if (n)
        for (const a of n)
          de(a, this.options);
    }
  }
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    v.log("Options:", this.options), v.log("Setting up event listeners");
    const t = { value: this.isInitialLoad };
    for (const n of this.consts.eventnames)
      v.log(`Adding listener for ${n} event`), this.deck.on(n, (a) => {
        ve(a, this.options, this.consts, this.deck, t), this.isInitialLoad = t.value;
      });
    this.viewport.addEventListener("animationend", (n) => {
      n.target.classList.add("animationended");
    }), this.viewport.addEventListener("autoanimate", (n) => {
      v.log("Autoanimate event triggered:", n);
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
  static async create(t, n) {
    const a = new M(t, n);
    return await a.prepareElements(), a.setupEventListeners(), a;
  }
}
const z = "appearance", Ie = async (e, t, n) => {
  v && n.debug && v.initialize(!0, z), await Y(e, n), await M.create(t, n);
}, Ae = () => new J(z, Ie, ae).createInterface();
export {
  Ae as default
};
