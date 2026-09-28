 /*****************************************************************
 *
 * reveal.js-appearance for Reveal.js 
 * Version 1.4.2
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


//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = /* @__PURE__ */ ((n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)))((/* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		return r(e) && !i(e);
	};
	function r(e) {
		return !!e && typeof e == "object";
	}
	function i(e) {
		var t = Object.prototype.toString.call(e);
		return t === "[object RegExp]" || t === "[object Date]" || o(e);
	}
	var a = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function o(e) {
		return e.$$typeof === a;
	}
	function s(e) {
		return Array.isArray(e) ? [] : {};
	}
	function c(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? g(s(e), e, t) : e;
	}
	function l(e, t, n) {
		return e.concat(t).map(function(e) {
			return c(e, n);
		});
	}
	function u(e, t) {
		if (!t.customMerge) return g;
		var n = t.customMerge(e);
		return typeof n == "function" ? n : g;
	}
	function d(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function f(e) {
		return Object.keys(e).concat(d(e));
	}
	function p(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function m(e, t) {
		return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function h(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && f(e).forEach(function(t) {
			r[t] = c(e[t], n);
		}), f(t).forEach(function(i) {
			m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[i], t[i], n) : c(t[i], n));
		}), r;
	}
	function g(e, t, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject || n, r.cloneUnlessOtherwiseSpecified = c;
		var i = Array.isArray(t);
		return i === Array.isArray(e) ? i ? r.arrayMerge(e, t, r) : h(e, t, r) : c(t, r);
	}
	g.all = function(e, t) {
		if (!Array.isArray(e)) throw Error("first argument should be an array");
		return e.reduce(function(e, n) {
			return g(e, n, t);
		}, {});
	}, t.exports = g;
})))(), 1), l = Object.defineProperty, u = (e, t) => {
	let n = {};
	for (var r in e) l(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || l(n, Symbol.toStringTag, { value: "Module" }), n;
}, d = [
	".js",
	".min.js",
	".mjs"
], f = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), p = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, m = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, h = (e, t) => d.some((n) => e === `${t}${n}`), g = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], _ = (e) => g.some((t) => t.test(e)), v = (e) => {
	if (typeof document < "u") {
		let t = d.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: p(n) };
	}
	return f && !_(f) && h(m(f), e) ? { directory: p(f) } : { directory: null };
}, y = (e) => v(e).directory !== null, b = /* @__PURE__ */ new Map(), ee = (e = "") => {
	let t = b.get(e);
	if (t) return t;
	let n = typeof window < "u", r = typeof document < "u", i = import.meta, a = !1;
	try {
		a = typeof module < "u" && !!module?.hot;
	} catch {}
	let o = !1;
	try {
		o = !!i?.hot;
	} catch {}
	let s = a || o, c = !1;
	try {
		c = i?.env?.DEV === !0;
	} catch {}
	let l = e !== "" && y(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return b.set(e, u), u;
}, te = class {
	defaultConfig;
	pluginInit;
	pluginId;
	mergedConfig = null;
	userConfigData = null;
	data = {};
	constructor(e, t, n) {
		typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = n || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
	}
	initializeConfig(e) {
		let t = this.defaultConfig, n = e.getConfig()[this.pluginId] || {};
		this.userConfigData = n, this.mergedConfig = (0, c.default)(t, n, {
			arrayMerge: (e, t) => t,
			clone: !0
		});
	}
	getCurrentConfig() {
		if (!this.mergedConfig) throw Error("Plugin configuration has not been initialized");
		return this.mergedConfig;
	}
	getData() {
		return Object.keys(this.data).length > 0 ? this.data : void 0;
	}
	get userConfig() {
		return this.userConfigData || {};
	}
	getEnvironmentInfo = () => ee(this.pluginId);
	init(e) {
		if (this.initializeConfig(e), this.pluginInit) return this.pluginInit(this, e, this.getCurrentConfig());
	}
	createInterface(e = {}) {
		return {
			id: this.pluginId,
			init: (e) => this.init(e),
			getConfig: () => this.getCurrentConfig(),
			getData: () => this.getData(),
			...e
		};
	}
}, x = "data-css-id", S = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(x, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), C = (e) => document.querySelectorAll(`[${x}="${e}"]`).length > 0, ne = 1e4, w = (e) => new Promise((t) => {
	if (T(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		T(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(T(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(T(e)), ne);
}), T = (e) => {
	if (C(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, E = ((e) => new Proxy(e, { get: (e, t) => {
	if (t in e) return e[t];
	let n = t.toString();
	if (typeof console[n] == "function") return (...t) => {
		e.debugLog(n, ...t);
	};
} }))(new class {
	debugMode = !1;
	label = "DEBUG";
	groupDepth = 0;
	pending = null;
	emit(e, t) {
		if (this.pending) {
			this.pending.push([e, t]);
			return;
		}
		let n = typeof e == "function" ? e : console[e];
		typeof n == "function" && n.call(console, ...t);
	}
	flush() {
		let e = this.pending;
		if (this.pending = null, e) for (let [t, n] of e) this.emit(t, n);
	}
	initialize(e, t = "DEBUG") {
		this.debugMode = e, this.label = t;
	}
	group = (...e) => {
		this.debugMode && this.groupDepth === 0 && !this.pending && (this.pending = []), this.debugLog("group", ...e), this.groupDepth++;
	};
	groupCollapsed = (...e) => {
		this.debugMode && this.groupDepth === 0 && !this.pending && (this.pending = []), this.debugLog("groupCollapsed", ...e), this.groupDepth++;
	};
	groupEnd = () => {
		this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"), this.groupDepth === 0 && this.flush());
	};
	error = (...e) => {
		let t = this.debugMode;
		this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
	};
	table = (e, t, n) => {
		if (this.debugMode) try {
			typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? this.emit("log", [`[${this.label}]: ${e}`]) : this.emit("log", [e]), n ? this.emit("table", [t, n]) : this.emit("table", [t])) : (this.groupDepth === 0 && this.emit("log", [`[${this.label}]: Table data`]), typeof t == "object" && Array.isArray(t) ? this.emit("table", [e, t]) : this.emit("table", [e]));
		} catch (t) {
			this.emit("error", [`[${this.label}]: Error showing table:`, t]), this.emit("log", [`[${this.label}]: Raw data:`, e]);
		}
	};
	formatAndLog = (e, t) => {
		if (this.debugMode) try {
			this.groupDepth > 0 ? this.emit(e, t) : t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
		} catch (e) {
			this.emit("error", [`[${this.label}]: Error in logging:`, e]), this.emit("log", [`[${this.label}]: Original log data:`, ...t]);
		}
	};
	debugLog(e, ...t) {
		let n = console[e];
		if (!(!this.debugMode && e !== "error" || typeof n != "function")) {
			if (e === "group" || e === "groupCollapsed") {
				t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
				return;
			}
			if (e === "groupEnd") {
				this.emit(e, []);
				return;
			}
			if (e === "table") {
				t.length === 1 ? this.table(t[0]) : t.length === 2 ? (t[0], this.table(t[0], t[1])) : t.length >= 3 && this.table(t[0], t[1], t[2]);
				return;
			}
			this.groupDepth > 0 ? this.emit(e, t) : t.length > 0 && typeof t[0] == "string" ? this.emit(e, [`[${this.label}]: ${t[0]}`, ...t.slice(1)]) : this.emit(e, [`[${this.label}]:`, ...t]);
		}
	}
}()), D = /* @__PURE__ */ new Set(), O = (e, t) => {
	let n = `${e}::${t}`;
	D.has(n) || (D.add(n), console.warn(`[${e}] ${t}`));
}, k = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], re = (e) => typeof e == "string" && e.trim() !== "", A = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (re(r)) {
		let t = r.trim(), n = T(e), a = n && !!document.querySelector(`[data-css-id="${e}"]`);
		try {
			return await S(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), n && O(e, `Loaded CSS from ${t}, but a stylesheet for this plugin was already on the page (${a ? "a tagged <link>" : "an import or inline <style>"}) — csspath adds one, it cannot remove one. Both are live and the cascade decides. Remove the other import or <link>, or drop csspath.`), {
				status: "loaded",
				path: t
			};
		} catch {
			return console.warn(`[${e}] Could not load CSS from: ${t}`), {
				status: "failed",
				path: t
			};
		}
	}
	if (T(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = v(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...k(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await S(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return w(e).then((t) => {
		t || O(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function ie(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return A(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return A(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var ae = /* @__PURE__ */ u({
	SectionType: () => j,
	getSectionType: () => L,
	getStack: () => I,
	isHorizontal: () => F,
	isSection: () => M,
	isStack: () => N,
	isVertical: () => P
}), j = /* @__PURE__ */ function(e) {
	return e.HORIZONTAL = "horizontal", e.STACK = "stack", e.VERTICAL = "vertical", e.INVALID = "invalid", e;
}({}), M = (e) => e instanceof HTMLElement && e.tagName === "SECTION", N = (e) => M(e) ? Array.from(e.children).some((e) => e instanceof HTMLElement && e.tagName === "SECTION") : !1, P = (e) => M(e) ? e.parentElement instanceof HTMLElement && e.parentElement.tagName === "SECTION" : !1, F = (e) => M(e) && !P(e) && !N(e), I = (e) => {
	if (!M(e)) return null;
	if (P(e)) {
		let t = e.parentElement;
		if (t instanceof HTMLElement && N(t)) return t;
	}
	return null;
}, L = (e) => M(e) ? P(e) ? "vertical" : N(e) ? "stack" : "horizontal" : "invalid", R = /* @__PURE__ */ u({
	isJSON: () => z,
	toJSONString: () => B
}), z = (e) => {
	try {
		return JSON.parse(e) && !!e;
	} catch {
		return !1;
	}
}, B = (e) => {
	if (e == null) return "";
	if (z(e)) return e;
	if (typeof e == "object") return JSON.stringify(e, null, 2);
	if (typeof e == "string") {
		let t = e.replace(/[“”]/g, "\"").replace(/[‘’]/g, "'");
		if (z(t)) return t;
		let n = t.trim().replace(/'/g, "\"");
		return n.charAt(0) === "{" ? n : `{${n}}`;
	}
	return "";
}, V = /* @__PURE__ */ u({
	copyDataAttributes: () => H,
	createNode: () => U
}), H = (e, t, n) => {
	for (let r of Array.from(e.attributes)) r.nodeName.startsWith("data") && (!n || r.nodeName !== n) && t.setAttribute(r.nodeName, r.nodeValue || "");
}, U = (e) => document.createRange().createContextualFragment(e).firstElementChild, W = {
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
//#endregion
//#region src/plugin/js/consts.ts
function G(e, t, n) {
	let r = {
		baseclass: e,
		compatibilitybaseclass: t,
		fragmentSelector: ".fragment",
		fragmentClass: "fragment",
		speedClasses: [
			"slower",
			"slow",
			"fast",
			"faster"
		],
		animatecss: "[class^=\"animate__\"],[class*=\" animate__\"]",
		eventnames: [
			"ready",
			"slidechanged",
			"slidetransitionend",
			"autoanimate",
			"overviewhidden"
		]
	};
	return r.speedClasses = [...r.speedClasses, ...r.speedClasses.map((e) => `animate__${e}`)], n && (r.animatecss = ".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur", r.baseclass = t), r;
}
//#endregion
//#region src/plugin/js/functions/parse-auto-elements.ts
var K = (e) => {
	let t = document.createElement("textarea");
	return t.innerHTML = e, t.value;
}, q = (e, t = !1) => {
	if (!e) return null;
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
	if (typeof e == "boolean") return null;
	if (typeof e == "string") try {
		let n = t ? K(e) : e;
		return JSON.parse(R.toJSONString(n));
	} catch (t) {
		return E.log(`Error parsing autoelements: ${t} (${e})`), null;
	}
	return null;
}, J = (e) => typeof e == "object" && !!e, oe = (e, t, n) => {
	let r = null, i = null;
	if (t.autoappear && t.autoelements && (i = q(t.autoelements, !1)), e instanceof HTMLElement && e.hasAttribute("data-autoappear")) {
		let t = e.dataset.autoappear;
		if (t === "auto" || t === "" || t === "true") r = i;
		else {
			let e = q(t || "", !0);
			r = i && e ? {
				...i,
				...e
			} : e || i;
		}
	} else i && (r = i);
	if (r) try {
		let t = JSON.parse(R.toJSONString(r));
		for (let [r, i] of Object.entries(t)) {
			let t = Array.from(e.querySelectorAll(r)).filter((e) => {
				if (n.includes(e)) return !1;
				for (let t of n) if (t.contains(e) && t !== e) return !1;
				return !0;
			});
			if (t.length === 0) continue;
			let a = null, o = 0;
			for (let e = 0; e < t.length; e++) {
				let r = t[e], s = r.parentElement;
				s !== a && (a = s, o = 0), n.push(r);
				let c = [], l = null, u = !1, d = null, f = null;
				if (Array.isArray(i)) c = String(i[0]).split(/[ ,]+/), l = i[1] === void 0 ? null : String(i[1]);
				else if (typeof i == "string") c = i.split(/[ ,]+/);
				else if (J(i)) {
					if (i.class || i.animation) {
						let e = i.animation || i.class;
						c = String(e).split(/[ ,]+/);
					}
					i.speed && (u = String(i.speed), u.includes("animate__") || (u = `animate__${u}`)), i.delay !== void 0 && (l = String(i.delay)), i.split !== void 0 && (d = String(i.split)), i["container-delay"] !== void 0 && (f = String(i["container-delay"]));
				}
				c.length > 0 && r.classList.add(...c), u && r.classList.add(u), r instanceof HTMLElement && (d ? (l && (r.dataset.delay = l), f && (r.dataset.containerDelay = f), r.dataset.split = d) : f && o === 0 ? r.dataset.delay = f : l && o > 0 && !r.dataset.delay && (r.dataset.delay = l)), o++;
			}
		}
	} catch (e) {
		E.log(t, `Error processing auto animations: ${e}`);
	}
};
//#endregion
//#region src/plugin/js/functions/add-base-class.ts
function se(e, t) {
	e.classList.contains(t.baseclass) || e.classList.add(t.baseclass), e.classList.contains(t.fragmentClass) && e.classList.add("custom");
}
//#endregion
//#region src/plugin/js/functions/add-delay.ts
function ce(e, t) {
	let n = 0;
	e.forEach((e, r) => {
		if (!(e instanceof HTMLElement && e.style.animationDelay) && (r === 0 && e instanceof HTMLElement && e.dataset.delay || r !== 0)) {
			let r = t.delay;
			if (e instanceof HTMLElement && e.dataset && e.dataset.delay) {
				let t = Number.parseInt(e.dataset.delay, 10);
				Number.isNaN(t) || (r = t);
			}
			n += r, e instanceof HTMLElement && (e.style.setProperty("animation-delay", `${n}ms`), e.removeAttribute("data-delay"));
		}
	});
}
//#endregion
//#region src/plugin/js/functions/convert-to-spans.ts
function le(e, t) {
	let n = !1, r = " ";
	if (e.textContent?.trim() && (t === "words" ? n = e.textContent.trim().split(/\s+/) || [] : t === "letters" && (n = e.textContent.trim().split("") || [], r = ""), n && n.length > 0)) {
		let t = Array.from(e.classList).filter((e) => e.startsWith("animate__")), i = n.map((n, r) => {
			let i = document.createElement("span");
			i.textContent = n === " " ? "\xA0" : n, e.dataset.delay && r !== 0 && (i.dataset.delay = e.dataset.delay), e.dataset.containerDelay && r === 0 && (i.dataset.delay = e.dataset.containerDelay);
			for (let e = 0; e < t.length; e++) i.classList.add(t[e]);
			return i.outerHTML;
		}).join(r);
		e.classList.add("wordchargroup");
		for (let n = 0; n < t.length; n++) e.classList.remove(t[n]);
		e.removeAttribute("data-delay"), e.removeAttribute("data-split"), e.removeAttribute("data-container-delay"), e.innerHTML = i;
	}
}
//#endregion
//#region src/plugin/js/functions/fix-list-item.ts
function Y(e, t) {
	let n = e.parentNode;
	if (n) {
		for (let t of Array.from(n.children)) if (t !== e && t.dataset.appearParent) return;
		n instanceof Element && (n.classList.value = e.classList.value, V.copyDataAttributes(e, n, "data-appear-parent"), n.innerHTML = e.innerHTML, t && n.classList.add(t));
	}
}
function ue(e, t, n) {
	let r = n.baseclass;
	e.hasAttribute("data-appear-parent") && Y(e, r), t.appearparents && e.parentNode && e.parentNode instanceof Element && e.tagName === "SPAN" && e.parentNode.tagName === "LI" && e.outerHTML.length === e.parentNode.innerHTML.length && Y(e);
}
//#endregion
//#region src/plugin/js/functions/get-appearance-arrays.ts
var de = (e, t, n) => Array.from(n.querySelectorAll(`.${e}`)).filter((e) => !e.closest(`.${t}`)), fe = (e, t, n) => Array.from(n.querySelectorAll(`.${e}`)).filter((e) => e.closest(`.${t}`) === n), pe = (e, t, n) => {
	if (!t) return !1;
	let r = [de(t, n, e), ...Array.from(e.querySelectorAll(`.${n}`)).map((e) => fe(t, n, e))];
	return r.some((e) => e.length > 0) ? r : !1;
};
//#endregion
//#region src/plugin/js/functions/show-hide-slide.ts
function me(e) {
	return {
		from: e.fromSlide || e.previousSlide || null,
		to: e.toSlide || e.currentSlide || null
	};
}
function X(e, t) {
	e.dataset.appearevent && e.dataset.appearevent === "auto" && (e.dataset.appearevent = "autoanimate");
	let n = t.appearevent;
	return n === "auto" && (n = "autoanimate"), e.dataset.appearevent || n;
}
function Z(e, t) {
	t.hideagain && e.from?.dataset.appearanceCanStart && e.from.removeAttribute("data-appearance-can-start");
}
function Q(e, t, n) {
	if (t.hideagain && e?.from) {
		let t = e.from.querySelectorAll(n.animatecss);
		if (t) for (let e of t) e.classList.remove("animationended");
		let r = e.from.querySelectorAll(".fragment.visible");
		if (r) for (let e of r) e.classList.remove("animationended");
	}
}
function he(e, t, n, r, i) {
	let a = r.getViewportElement().classList.contains("reveal-scroll"), o = e.type, s = me(e);
	if (s.to) {
		if (o === "ready") {
			let e = s.to.dataset.initdelay ? parseInt(s.to.dataset.initdelay, 10) : t.initdelay || 0;
			i.value && e > 0 ? setTimeout(() => {
				s.to && (s.to.dataset.appearanceCanStart = "true"), i.value = !1;
			}, e) : (s.to.dataset.appearanceCanStart = "true", i.value = !1);
		}
		let r = X(s.to, t);
		(o === r || o === "slidetransitionend" && r === "autoanimate") && (s.to.dataset.appearanceCanStart = "true"), a && o === "slidechanged" && (Z(s, t), Q(s, t, n), setTimeout(() => {
			s.to && (s.to.dataset.appearanceCanStart = "true");
		}, t.delay)), o === "slidetransitionend" && (Z(s, t), Q(s, t, n)), o === "slidechanged" && document.body.dataset.exitoverview ? (Z(s, t), s.to.dataset.appearanceCanStart = "true") : o === "overviewhidden" && (document.body.dataset.exitoverview = "true", setTimeout(() => {
			document.body.removeAttribute("data-exitoverview");
		}, 500), e.currentSlide && (Z(s, t), s.to.dataset.appearanceCanStart = "true"));
	}
}
//#endregion
//#region src/plugin/js/main.ts
var ge = class e {
	deck;
	viewport;
	slides;
	options;
	consts;
	sections;
	regularSections;
	appearances;
	isInitialLoad;
	constructor(e, t) {
		this.deck = e, this.options = t, this.isInitialLoad = !0, this.viewport = e.getViewportElement(), this.slides = e.getSlidesElement(), this.consts = G(t.baseclass, t.compatibilitybaseclass, t.compatibility), this.sections = this.slides.querySelectorAll("section"), this.regularSections = Array.from(this.sections).filter((e) => !ae.isStack(e)), this.appearances = [], /receiver/i.test(window.location.search) && this.viewport.classList.add("sv");
	}
	async prepareElements() {
		this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));
		for (let e of this.regularSections) oe(e, this.options, this.appearances);
		for (let e of this.appearances) ue(e, this.options, this.consts), se(e, this.consts), e instanceof HTMLElement && e.dataset.split && le(e, e.dataset.split);
		for (let e of this.regularSections) {
			let t = pe(e, this.consts.baseclass, this.consts.fragmentClass);
			if (t) for (let e of t) ce(e, this.options);
		}
	}
	setupEventListeners() {
		E.log("Options:", this.options), E.log("Setting up event listeners");
		let e = { value: this.isInitialLoad };
		for (let t of this.consts.eventnames) E.log(`Adding listener for ${t} event`), this.deck.on(t, (t) => {
			he(t, this.options, this.consts, this.deck, e), this.isInitialLoad = e.value;
		});
		this.viewport.addEventListener("animationend", (e) => {
			e.target.classList.add("animationended");
		}), this.viewport.addEventListener("autoanimate", (e) => {
			E.log("Autoanimate event triggered:", e);
		}), this.viewport.addEventListener("fragmenthidden", (e) => {
			let t = e;
			if (t.fragment) {
				t.fragment.classList.remove("animationended");
				let e = t.fragment.querySelectorAll(".animationended");
				for (let t of e) t.classList.remove("animationended");
			}
		});
	}
	static async create(t, n) {
		let r = new e(t, n);
		return await r.prepareElements(), r.setupEventListeners(), r;
	}
}, $ = "appearance", _e = async (e, t, n) => {
	E && n.debug && E.initialize(!0, $), await ie(e, n), await ge.create(t, n);
}, ve = () => new te($, _e, W).createInterface();
//#endregion
export { ve as default };
