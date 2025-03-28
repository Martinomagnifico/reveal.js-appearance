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


var D = Object.defineProperty;
var _ = (t, e, a) => e in t ? D(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var m = (t, e, a) => _(t, typeof e != "symbol" ? e + "" : e, a);
const R = (t) => {
  try {
    return JSON.parse(t) && !!t;
  } catch {
    return !1;
  }
}, q = (t) => Array.from(t.childNodes).some((e) => e.tagName === "SECTION"), P = (t, e, a) => {
  for (const n of Array.from(t.attributes))
    n.nodeName.startsWith("data") && n.nodeName !== a && e.setAttribute(n.nodeName, n.nodeValue || "");
}, H = (t) => {
  if (t == null)
    return "";
  let e = "", a = t;
  return typeof a == "string" && (a = a.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")), R(t) ? e = t : typeof t == "object" ? e = JSON.stringify(t, null, 2) : typeof t == "string" && (e = t.trim().replace(/'/g, '"').charAt(0) === "{" ? t.trim().replace(/'/g, '"') : `{${t.trim().replace(/'/g, '"')}}`), e;
};
(() => {
  try {
    return !!import.meta.url;
  } catch {
    return !1;
  }
})();
class U {
  constructor() {
    m(this, "debugMode", !1);
    m(this, "label", "DEBUG");
    m(this, "log", (...e) => {
      this.debugMode && console.log(...e);
    });
    m(this, "warn", (...e) => {
      this.debugMode && console.warn(...e);
    });
    m(this, "error", (...e) => {
      this.debugMode && console.error(...e);
    });
    m(this, "info", (...e) => {
      this.debugMode && console.info(...e);
    });
    m(this, "labellog", (...e) => {
      this.debugMode && console.log(`[${this.label}]:`, ...e);
    });
    m(this, "labelwarn", (...e) => {
      this.debugMode && console.warn(`[${this.label}]:`, ...e);
    });
    m(this, "labelerror", (...e) => {
      this.debugMode && console.error(`[${this.label}]:`, ...e);
    });
    m(this, "labelinfo", (...e) => {
      this.debugMode && console.info(`[${this.label}]:`, ...e);
    });
    m(this, "group", (...e) => {
      this.debugMode && console.group(`[${this.label}]:`, ...e);
    });
    m(this, "groupEnd", (...e) => {
      this.debugMode && console.groupEnd();
    });
  }
  initialize(e, a = "DEBUG") {
    this.debugMode = e, this.label = a;
  }
}
const v = new U();
function B(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var w, M;
function x() {
  if (M) return w;
  M = 1;
  var t = function(c) {
    return e(c) && !a(c);
  };
  function e(i) {
    return !!i && typeof i == "object";
  }
  function a(i) {
    var c = Object.prototype.toString.call(i);
    return c === "[object RegExp]" || c === "[object Date]" || s(i);
  }
  var n = typeof Symbol == "function" && Symbol.for, r = n ? Symbol.for("react.element") : 60103;
  function s(i) {
    return i.$$typeof === r;
  }
  function o(i) {
    return Array.isArray(i) ? [] : {};
  }
  function d(i, c) {
    return c.clone !== !1 && c.isMergeableObject(i) ? S(o(i), i, c) : i;
  }
  function l(i, c, f) {
    return i.concat(c).map(function(y) {
      return d(y, f);
    });
  }
  function u(i, c) {
    if (!c.customMerge)
      return S;
    var f = c.customMerge(i);
    return typeof f == "function" ? f : S;
  }
  function g(i) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(i).filter(function(c) {
      return Object.propertyIsEnumerable.call(i, c);
    }) : [];
  }
  function p(i) {
    return Object.keys(i).concat(g(i));
  }
  function b(i, c) {
    try {
      return c in i;
    } catch {
      return !1;
    }
  }
  function I(i, c) {
    return b(i, c) && !(Object.hasOwnProperty.call(i, c) && Object.propertyIsEnumerable.call(i, c));
  }
  function L(i, c, f) {
    var y = {};
    return f.isMergeableObject(i) && p(i).forEach(function(h) {
      y[h] = d(i[h], f);
    }), p(c).forEach(function(h) {
      I(i, h) || (b(i, h) && f.isMergeableObject(c[h]) ? y[h] = u(h, f)(i[h], c[h], f) : y[h] = d(c[h], f));
    }), y;
  }
  function S(i, c, f) {
    f = f || {}, f.arrayMerge = f.arrayMerge || l, f.isMergeableObject = f.isMergeableObject || t, f.cloneUnlessOtherwiseSpecified = d;
    var y = Array.isArray(c), h = Array.isArray(i), N = y === h;
    return N ? y ? f.arrayMerge(i, c, f) : L(i, c, f) : d(c, f);
  }
  S.all = function(c, f) {
    if (!Array.isArray(c))
      throw new Error("first argument should be an array");
    return c.reduce(function(y, h) {
      return S(y, h, f);
    }, {});
  };
  var T = S;
  return w = T, w;
}
var z = x();
const J = /* @__PURE__ */ B(z);
var F = Object.defineProperty, k = (t, e, a) => e in t ? F(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a, A = (t, e, a) => k(t, typeof e != "symbol" ? e + "" : e, a);
class V {
  /**
   * Create a new plugin instance
   * @param idOrOptions Plugin ID string or options object
   * @param init Optional initialization function
   * @param defaultConfig Optional default configuration
   */
  constructor(e, a, n) {
    A(this, "defaultConfig"), A(this, "pluginInit"), A(this, "pluginId"), A(this, "mergedConfig", null), A(this, "data", {}), typeof e == "string" ? (this.pluginId = e, this.pluginInit = a, this.defaultConfig = n || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
  }
  /**
   * Initialize plugin configuration by merging default and user settings
   */
  initializeConfig(e) {
    const a = this.defaultConfig, n = e.getConfig()[this.pluginId] || {};
    this.mergedConfig = J(a, n, {
      arrayMerge: (r, s) => s,
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
      init: (a) => this.init(a),
      getConfig: () => this.getCurrentConfig(),
      getData: () => this.getData(),
      ...e
    };
  }
}
const G = (t) => {
  const e = document.querySelector(
    `script[src$="${t}.js"], script[src$="${t}.min.js"], script[src$="${t}.mjs"]`
  );
  if (e != null && e.src) {
    const a = e.getAttribute("src") || "", n = a.lastIndexOf("/");
    if (n !== -1)
      return a.substring(0, n + 1);
  }
  try {
    if (typeof import.meta < "u" && import.meta.url)
      return import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
  } catch {
  }
  return `plugin/${t}/`;
}, j = "data-css-id", Q = (t, e, a) => new Promise((n, r) => {
  const s = document.createElement("link");
  s.rel = "stylesheet", s.href = e, s.setAttribute(j, t);
  const o = setTimeout(() => {
    s.parentNode && s.parentNode.removeChild(s), a && console.log(`[${t}] Timeout loading CSS from: ${e}`), r(new Error(`Timeout loading CSS from: ${e}`));
  }, 5e3);
  s.onload = () => {
    clearTimeout(o), n();
  }, s.onerror = () => {
    clearTimeout(o), s.parentNode && s.parentNode.removeChild(s), r(new Error(`Failed to load CSS from: ${e}`));
  }, document.head.appendChild(s);
}), W = (t) => document.querySelectorAll(`[${j}="${t}"]`).length > 0, Y = async (t) => {
  const {
    id: e,
    enableLoading: a = !0,
    userPath: n = "",
    debug: r = !1
  } = t;
  if (a === !1 || n === !1) return;
  if (W(e)) {
    r && console.log(`[${e}] CSS already loaded, skipping`);
    return;
  }
  const s = [];
  if (typeof n == "string")
    n && n.trim() !== "" && s.push(n);
  else if (Array.isArray(n)) {
    const u = n.filter((g) => g && g.trim() !== "");
    s.push(...u);
  }
  const o = G(e);
  if (o) {
    const u = `${o}${e}.css`;
    s.push(u);
  }
  const d = `plugin/${e}/${e}.css`;
  s.push(d);
  const l = `plugins/${e}/${e}.css`;
  s.push(l);
  for (const u of s)
    try {
      await Q(e, u, r);
      let g = "CSS";
      n && (typeof n == "string" ? u === n : n.includes(u)) ? g = "user-specified CSS" : u === `${o}${e}.css` ? g = "CSS (through script detection)" : g = "CSS (fallback path)", r && console.log(`[${e}] ${g} loaded successfully from: ${u}`);
      return;
    } catch {
      r && console.log(`[${e}] Failed to load CSS from: ${u}`);
    }
  console.warn(`[${e}] Could not load CSS from any location`);
}, K = {
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
function X(t, e, a) {
  const n = {
    baseclass: t,
    compatibilitybaseclass: e,
    fragmentSelector: ".fragment",
    fragmentClass: "fragment",
    speedClasses: ["slower", "slow", "fast", "faster"],
    animatecss: '[class^="animate__"],[class*=" animate__"]',
    eventnames: ["ready", "slidechanged", "slidetransitionend", "autoanimate", "overviewhidden"]
  };
  return n.speedClasses = [
    ...n.speedClasses,
    ...n.speedClasses.map((r) => `animate__${r}`)
  ], a && (n.animatecss = ".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur", n.baseclass = e), n;
}
function Z(t, e, a) {
  let n = null;
  if (t instanceof HTMLElement && t.hasAttribute("data-autoappear")) {
    let r = t.dataset.autoappear;
    r == "auto" || r == "" || r == "true" ? n = e.autoelements ? e.autoelements : null : n = r;
  } else e.autoappear && e.autoelements && (n = e.autoelements);
  if (n) {
    let r = JSON.parse(H(n));
    Object.entries(r).forEach(([s, o]) => {
      let d = Array.from(t.querySelectorAll(s)).filter((l) => !a.includes(l));
      d.length && d.forEach((l) => {
        a.push(l);
        let u = [], g = null, p = !1, b = null, I = null;
        Array.isArray(o) ? (u = o[0].split(/[ ,]+/), g = o[1]) : typeof o == "string" ? u = o.split(/[ ,]+/) : o && typeof o == "object" && ((o.class || o.animation) && (u = (o.animation ? o.animation : o.class).split(/[ ,]+/)), o.speed && (p = String(o.speed), p.includes("animate__") || (p = `animate__${p}`)), o.delay && (g = String(o.delay)), o.split && (b = String(o.split)), o["container-delay"] && (I = String(o["container-delay"]))), l.classList.add(...u), p && l.classList.add(p), l instanceof HTMLElement && (g && (l.dataset.delay || (l.dataset.delay = g)), b && (l.dataset.split = b), I && (l.dataset.containerDelay = I));
      });
    });
  }
}
function ee(t, e) {
  t.classList.contains(e.baseclass) || t.classList.add(e.baseclass), t.classList.contains(e.fragmentClass) && t.classList.add("custom");
}
function $(t, e) {
  const a = t.parentNode;
  if (a) {
    for (const n of Array.from(a.children))
      if (n !== t && n.dataset.appearParent) return;
    a instanceof Element && (a.classList.value = t.classList.value, P(t, a, "data-appear-parent"), a.innerHTML = t.innerHTML, e && a.classList.add(e));
  }
}
function te(t, e, a) {
  const n = a.baseclass;
  if (t.hasAttribute("data-appear-parent") && $(t, n), e.appearparents && t.parentNode && t.parentNode instanceof Element && t.tagName === "SPAN" && t.parentNode.tagName === "LI") {
    const r = t.outerHTML.length, s = t.parentNode.innerHTML.length;
    r === s && $(t);
  }
}
function ae(t, e) {
  var r, s;
  let a = !1, n = " ";
  if (e === "words" ? a = ((r = t.textContent) == null ? void 0 : r.trim().split(/\s+/)) || [] : e === "letters" && (a = ((s = t.textContent) == null ? void 0 : s.trim().split("")) || [], n = ""), a && a.length > 0) {
    const o = Array.from(t.classList).filter((l) => l.startsWith("animate__")), d = a.map((l, u) => {
      const g = document.createElement("span");
      return g.textContent = l, l === " " && (g.textContent = " "), t.dataset.delay && u !== 0 && (g.dataset.delay = t.dataset.delay), t.dataset.containerDelay && u === 0 && (g.dataset.delay = t.dataset.containerDelay), o.forEach((p) => g.classList.add(p)), g.outerHTML;
    }).join(n);
    t.classList.add("wordchargroup"), o.forEach((l) => t.classList.remove(l)), t.removeAttribute("data-delay"), t.removeAttribute("data-split"), t.removeAttribute("data-container-delay"), t.innerHTML = d;
  }
}
function ne(t, e, a) {
  return Array.from(a.querySelectorAll(`.${t}`)).filter((n) => !n.closest(`.${e}`));
}
function re(t, e, a) {
  return Array.from(a.querySelectorAll(`.${t}`)).filter((n) => n.closest(`.${e}`) === a);
}
function ie(t, e, a) {
  if (!e) return !1;
  const n = [
    ne(e, a, t),
    ...Array.from(t.querySelectorAll(`.${a}`)).map((r) => re(e, a, r))
  ];
  return n.some((r) => r.length > 0) ? n : !1;
}
function se(t, e, a) {
  let n = 0;
  t.forEach((r, s) => {
    if (s === 0 && r instanceof HTMLElement && r.dataset.delay || s !== 0) {
      let o = e.delay;
      if (r instanceof HTMLElement && r.dataset && r.dataset.delay) {
        const d = parseInt(r.dataset.delay);
        isNaN(d) || (o = d);
      }
      n = n + o, r instanceof HTMLElement && (r.style.setProperty("animation-delay", n + "ms"), r.removeAttribute("data-delay"));
    }
  });
}
function oe(t) {
  return {
    from: t.fromSlide || t.previousSlide || null,
    to: t.toSlide || t.currentSlide || null
  };
}
function le(t, e) {
  t.dataset.appearevent && t.dataset.appearevent === "auto" && (t.dataset.appearevent = "autoanimate");
  let a = e.appearevent;
  return a === "auto" && (a = "autoanimate"), t.dataset.appearevent || a;
}
function C(t, e) {
  e.hideagain && t.from && t.from.dataset.appearanceCanStart && t.from.removeAttribute("data-appearance-can-start");
}
function O(t, e, a) {
  if (e.hideagain && t && t.from) {
    const n = t.from.querySelectorAll(a.animatecss);
    n && n.forEach((s) => {
      s.classList.remove("animationended");
    });
    const r = t.from.querySelectorAll(".fragment.visible");
    r && r.forEach((s) => {
      s.classList.remove("visible");
    });
  }
}
function ce(t, e, a, n) {
  const r = n.getViewportElement();
  n.getConfig().view;
  const o = r.classList.contains("reveal-scroll"), d = t.type, l = oe(t);
  if (l.to) {
    d === "ready" && (l.to.dataset.appearanceCanStart = "true");
    const u = le(l.to, e);
    (d === u || d === "slidetransitionend" && u === "autoanimate") && (l.to.dataset.appearanceCanStart = "true"), o && d === "slidechanged" && (C(l, e), O(l, e, a), setTimeout(() => {
      l.to && (l.to.dataset.appearanceCanStart = "true");
    }, e.delay)), d === "slidetransitionend" && (C(l, e), O(l, e, a)), d === "slidechanged" && document.body.dataset.exitoverview ? (C(l, e), l.to.dataset.appearanceCanStart = "true") : d === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
      document.body.removeAttribute("data-exitoverview");
    }, 500), t.currentSlide && (C(l, e), l.to.dataset.appearanceCanStart = "true"));
  }
}
class E {
  constructor(e, a) {
    m(this, "deck");
    m(this, "viewport");
    m(this, "revealEl");
    m(this, "slides");
    m(this, "options");
    m(this, "consts");
    m(this, "sections");
    m(this, "regularSections");
    m(this, "fragments");
    m(this, "appearances");
    this.deck = e, this.options = a, this.viewport = e.getViewportElement(), this.revealEl = e.getRevealElement(), this.slides = e.getSlidesElement(), this.consts = X(
      a.baseclass,
      a.compatibilitybaseclass,
      a.compatibility
    ), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter((n) => !q(n)), this.fragments = this.slides.querySelectorAll(this.consts.fragmentSelector), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
  }
  /**
   * Prepare appearance elements
   */
  async prepareElements() {
    this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss)), this.regularSections.forEach(
      (e) => Z(e, this.options, this.appearances)
    ), this.appearances.forEach((e) => {
      te(e, this.options, this.consts), ee(e, this.consts), e instanceof HTMLElement && e.dataset.split && ae(e, e.dataset.split);
    }), this.regularSections.forEach((e) => {
      const a = ie(
        e,
        this.consts.baseclass,
        this.consts.fragmentClass
      );
      a && a.forEach((n) => se(n, this.options, this.consts));
    });
  }
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    this.consts.eventnames.forEach((e) => {
      this.deck.on(e, (a) => {
        ce(a, this.options, this.consts, this.deck);
      });
    }), this.viewport.addEventListener("animationend", (e) => {
      e.target.classList.add("animationended");
    }), this.viewport.addEventListener("fragmenthidden", (e) => {
      e.fragment && (e.fragment.classList.remove("animationended"), e.fragment.querySelectorAll(".animationended").forEach((a) => {
        a.classList.remove("animationended");
      }));
    });
  }
  /**
   * Create a new Appearance instance
   */
  static async create(e, a) {
    v.group("Appearance Plugin");
    const n = new E(e, a);
    return await n.prepareElements(), n.setupEventListeners(), v.groupEnd(), n;
  }
}
const fe = async (t, e, a) => {
  v && (a.debug || e.getConfig().debug) && v.initialize(!0, "Appearance");
  const n = document.querySelector("meta[name=generator]");
  if (!(n instanceof HTMLMetaElement && n.content.includes("quarto")) && a.cssautoload)
    try {
      await Y({
        id: t.pluginId,
        enableLoading: a.cssautoload,
        userPath: a.csspath,
        debug: a.debug
      });
    } catch (s) {
      console.warn("CSS loading failed, but plugin will continue:", s);
    }
  await E.create(e, a);
}, ue = () => new V("appearance", fe, K).createInterface();
export {
  ue as default
};
