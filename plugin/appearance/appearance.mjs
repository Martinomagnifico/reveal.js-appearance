 /*****************************************************************
 *
 * reveal.js-appearance for Reveal.js 
 * Version 1.4.0
 * 
 * @link
 * https://github.com/Martinomagnifico/reveal.js-appearance
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


var A = Object.defineProperty;
var P = (t, e, n) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => P(t, typeof e != "symbol" ? e + "" : e, n);
const T = {
  activeclass: "active",
  activeelement: "li",
  barhtml: {
    header: "<nav class='menubar'><ul class='menu'></ul></nav>",
    footer: ""
  },
  cssautoload: !0,
  csspath: "",
  flat: !1,
  menubarclass: "menubar",
  menuclass: "menu",
  scale: 0.67,
  selectby: "id"
};
function _(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var m, y;
function D() {
  if (y) return m;
  y = 1;
  var t = function(o) {
    return e(o) && !n(o);
  };
  function e(r) {
    return !!r && typeof r == "object";
  }
  function n(r) {
    var o = Object.prototype.toString.call(r);
    return o === "[object RegExp]" || o === "[object Date]" || c(r);
  }
  var s = typeof Symbol == "function" && Symbol.for, a = s ? Symbol.for("react.element") : 60103;
  function c(r) {
    return r.$$typeof === a;
  }
  function f(r) {
    return Array.isArray(r) ? [] : {};
  }
  function d(r, o) {
    return o.clone !== !1 && o.isMergeableObject(r) ? h(f(r), r, o) : r;
  }
  function M(r, o, i) {
    return r.concat(o).map(function(g) {
      return d(g, i);
    });
  }
  function S(r, o) {
    if (!o.customMerge)
      return h;
    var i = o.customMerge(r);
    return typeof i == "function" ? i : h;
  }
  function j(r) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(o) {
      return Object.propertyIsEnumerable.call(r, o);
    }) : [];
  }
  function b(r) {
    return Object.keys(r).concat(j(r));
  }
  function p(r, o) {
    try {
      return o in r;
    } catch {
      return !1;
    }
  }
  function w(r, o) {
    return p(r, o) && !(Object.hasOwnProperty.call(r, o) && Object.propertyIsEnumerable.call(r, o));
  }
  function E(r, o, i) {
    var g = {};
    return i.isMergeableObject(r) && b(r).forEach(function(u) {
      g[u] = d(r[u], i);
    }), b(o).forEach(function(u) {
      w(r, u) || (p(r, u) && i.isMergeableObject(o[u]) ? g[u] = S(u, i)(r[u], o[u], i) : g[u] = d(o[u], i));
    }), g;
  }
  function h(r, o, i) {
    i = i || {}, i.arrayMerge = i.arrayMerge || M, i.isMergeableObject = i.isMergeableObject || t, i.cloneUnlessOtherwiseSpecified = d;
    var g = Array.isArray(o), u = Array.isArray(r), O = g === u;
    return O ? g ? i.arrayMerge(r, o, i) : E(r, o, i) : d(o, i);
  }
  h.all = function(o, i) {
    if (!Array.isArray(o))
      throw new Error("first argument should be an array");
    return o.reduce(function(g, u) {
      return h(g, u, i);
    }, {});
  };
  var v = h;
  return m = v, m;
}
var x = D();
const U = /* @__PURE__ */ _(x);
class q {
  /**
   * Create a new plugin instance
   * @param idOrOptions Plugin ID string or options object
   * @param init Optional initialization function
   * @param defaultConfig Optional default configuration
   */
  constructor(e, n, s) {
    l(this, "defaultConfig");
    l(this, "configModifier");
    l(this, "pluginInit");
    l(this, "pluginId");
    l(this, "mergedConfig", null);
    /** Public data storage for plugin state */
    l(this, "data", {});
    typeof e == "string" ? (this.pluginId = e, this.pluginInit = n, this.defaultConfig = s || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {}, this.configModifier = e.configModifier);
  }
  /**
   * Initialize plugin configuration by merging default and user settings
   */
  initializeConfig(e) {
    let n = this.defaultConfig;
    this.configModifier && (n = this.configModifier(e, n));
    const a = e.getConfig()[this.pluginId] || {};
    this.mergedConfig = U(n, a, {
      arrayMerge: (c, f) => f,
      clone: !0
    });
  }
  /**
   * Get the current plugin configuration
   */
  getCurrentConfig() {
    if (!this.mergedConfig)
      throw new Error("Plugin configuration has not been initialized");
    return this.mergedConfig;
  }
  /**
   * Get plugin data if any exists
   */
  getData() {
    return Object.keys(this.data).length > 0 ? this.data : void 0;
  }
  /**
   * Initialize the plugin
   */
  init(e) {
    if (this.initializeConfig(e), this.pluginInit)
      return this.pluginInit(this, e, this.getCurrentConfig());
  }
  /**
   * Create the plugin interface containing all exports
   */
  createInterface(e = {}) {
    return {
      id: this.pluginId,
      init: (s) => this.init(s),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...e
    };
  }
}
const z = async (t, e, n = !0, s, a = !1) => {
  if (n === !1 || s === !1)
    return;
  if (document.querySelector(`[data-css-id="${t}"]`)) {
    a && console.log(`CSS for ${t} already loaded, skipping`);
    return;
  }
  if (s)
    try {
      a && console.log(`Using custom CSS path: ${s}`), await C(t, s, a);
      return;
    } catch (f) {
      throw console.warn(`Failed to load CSS from user-specified path: ${s}. Make sure the path is correct or remove the csspath option to use automatic path detection.`), f;
    }
  const c = F(t, e);
  for (const f of c)
    try {
      a && console.log(`Trying to load CSS from: ${f}`), await C(t, f, a);
      return;
    } catch {
      a && console.log(`Failed to load CSS from: ${f}`);
    }
  console.warn(`Could not load CSS for ${t} from any location. You may need to specify the path using a csspath parameter.`);
}, F = (t, e) => {
  const n = [], s = R(t, e);
  s && (n.push(`${s}${t}.css`), n.push(`${s}${t}.min.css`)), n.push(`node_modules/reveal.js-${t}/plugin/${t}/${t}.css`), n.push(`node_modules/reveal.js-${t}/dist/${t}.css`), n.push(`plugin/${t}/${t}.css`), n.push(`plugins/${t}/${t}.css`), n.push(`dist/plugin/${t}/${t}.css`);
  try {
    if (typeof import.meta < "u" && import.meta.url) {
      const a = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
      n.push(`${a}${t}.css`);
    }
  } catch {
  }
  return n;
}, R = (t, e) => {
  const n = [
    `${t}.js`,
    `${t}.min.js`,
    `${e}.js`,
    `${e}.min.js`
  ];
  for (const s of n) {
    const a = document.querySelector(`script[src*="${s}"]`);
    if (a && a.src) {
      const c = a.getAttribute("src") || "", f = c.lastIndexOf(s);
      if (f !== -1)
        return c.substring(0, f);
    }
  }
  return null;
}, C = (t, e, n = !1) => new Promise((s, a) => {
  const c = document.createElement("link");
  c.rel = "stylesheet", c.href = e, c.setAttribute("data-css-id", t);
  const f = setTimeout(() => {
    n && console.log(`Timeout loading CSS from: ${e}`), a(new Error(`Timeout loading CSS from: ${e}`));
  }, 5e3);
  c.onload = () => {
    clearTimeout(f), n && console.log(`CSS loaded from: ${e}`), s();
  }, c.onerror = () => {
    clearTimeout(f), a(new Error(`Failed to load CSS from: ${e}`));
  }, document.head.appendChild(c);
});
(() => {
  try {
    return !!import.meta.url;
  } catch {
    return !1;
  }
})();
class B {
  constructor() {
    l(this, "debugMode", !1);
    l(this, "label", "DEBUG");
    l(this, "log", (...e) => {
      this.debugMode && console.log(...e);
    });
    l(this, "warn", (...e) => {
      this.debugMode && console.warn(...e);
    });
    l(this, "error", (...e) => {
      this.debugMode && console.error(...e);
    });
    l(this, "info", (...e) => {
      this.debugMode && console.info(...e);
    });
    l(this, "labellog", (...e) => {
      this.debugMode && console.log(`[${this.label}]:`, ...e);
    });
    l(this, "labelwarn", (...e) => {
      this.debugMode && console.warn(`[${this.label}]:`, ...e);
    });
    l(this, "labelerror", (...e) => {
      this.debugMode && console.error(`[${this.label}]:`, ...e);
    });
    l(this, "labelinfo", (...e) => {
      this.debugMode && console.info(`[${this.label}]:`, ...e);
    });
    l(this, "group", (...e) => {
      this.debugMode && console.group(`[${this.label}]:`, ...e);
    });
    l(this, "groupEnd", (...e) => {
      this.debugMode && console.groupEnd();
    });
  }
  initialize(e, n = "DEBUG") {
    this.debugMode = e, this.label = n;
  }
}
const $ = new B(), I = async (t, e, n) => {
  $ && (n.debug || e.getConfig().debug) && $.initialize(!0, "Appearance");
  const s = document.querySelector("[name=generator]");
  let a = !1;
  if (s instanceof HTMLMetaElement && (a = s.content.includes("quarto")), !a)
    try {
      await z(
        t.pluginId,
        `reveal.js-${t.pluginId}`,
        n.cssautoload,
        n.csspath,
        n.debug
      );
    } catch (c) {
      n.debug && console.warn("CSS loading failed but plugin will continue:", c);
    }
}, G = () => new q("appearance", I, T).createInterface();
export {
  G as default
};
