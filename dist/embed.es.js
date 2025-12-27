/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, it = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, nt), xt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new Ut(e, s, nt);
}, Wt = (s, t) => {
  if (it) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = L.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, pt = it ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Vt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Kt, getOwnPropertyDescriptor: Yt, getOwnPropertyNames: Jt, getOwnPropertySymbols: Zt, getPrototypeOf: Gt } = Object, y = globalThis, ft = y.trustedTypes, Qt = ft ? ft.emptyScript : "", J = y.reactiveElementPolyfillSupport, R = (s, t) => s, et = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Qt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, kt = (s, t) => !Ft(s, t), $t = { attribute: !0, type: String, converter: et, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let E = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Kt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: n } = Yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = Gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, r = [...Jt(e), ...Zt(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(pt(i));
    } else t !== void 0 && e.push(pt(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var n;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : et).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : et;
      this._$Em = i;
      const l = c.fromAttribute(e, a.type);
      this[i] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r) {
    var i;
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (r ?? (r = n.getPropertyOptions(t)), !((r.hasChanged ?? kt)(o, e) || r.useDefault && r.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[R("elementProperties")] = /* @__PURE__ */ new Map(), E[R("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: E }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, B = T.trustedTypes, mt = B ? B.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Rt = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + m, Xt = `<${Tt}>`, S = document, M = () => S.createComment(""), j = (s) => s === null || typeof s != "object" && typeof s != "function", ot = Array.isArray, te = (s) => ot(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, _t = />/g, _ = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, bt = /"/g, Nt = /^(?:script|style|textarea|title)$/i, ee = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = ee(1), P = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), At = /* @__PURE__ */ new WeakMap(), b = S.createTreeWalker(S, 129);
function Mt(s, t) {
  if (!ot(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(t) : t;
}
const se = (s, t) => {
  const e = s.length - 1, r = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = x;
  for (let a = 0; a < e; a++) {
    const c = s[a];
    let l, d, h = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, d = o.exec(c), d !== null); ) f = o.lastIndex, o === x ? d[1] === "!--" ? o = yt : d[1] !== void 0 ? o = _t : d[2] !== void 0 ? (Nt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = _) : d[3] !== void 0 && (o = _) : o === _ ? d[0] === ">" ? (o = i ?? x, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? _ : d[3] === '"' ? bt : gt) : o === bt || o === gt ? o = _ : o === yt || o === _t ? o = x : (o = _, i = void 0);
    const $ = o === _ && s[a + 1].startsWith("/>") ? " " : "";
    n += o === x ? c + Xt : h >= 0 ? (r.push(l), c.slice(0, h) + Rt + c.slice(h) + m + $) : c + m + (h === -2 ? a : $);
  }
  return [Mt(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
let st = class jt {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, c = this.parts, [l, d] = se(t, e);
    if (this.el = jt.createElement(l, r), b.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = b.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Rt)) {
          const f = d[o++], $ = i.getAttribute(h).split(m), H = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: H[2], strings: $, ctor: H[1] === "." ? ie : H[1] === "?" ? ne : H[1] === "@" ? oe : Y }), i.removeAttribute(h);
        } else h.startsWith(m) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Nt.test(i.tagName)) {
          const h = i.textContent.split(m), f = h.length - 1;
          if (f > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let $ = 0; $ < f; $++) i.append(h[$], M()), b.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[f], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Tt) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(m, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const r = S.createElement("template");
    return r.innerHTML = t, r;
  }
};
function O(s, t, e = s, r) {
  var o, a;
  if (t === P) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const n = j(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = O(s, i._$AS(s, t.values), i, r)), t;
}
class re {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    b.currentNode = i;
    let n = b.nextNode(), o = 0, a = 0, c = r[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new at(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new ae(n, this, t)), this._$AV.push(l), c = r[++a];
      }
      o !== (c == null ? void 0 : c.index) && (n = b.nextNode(), o++);
    }
    return b.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
let at = class It {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), j(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = st.createElement(Mt(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new re(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = At.get(t.strings);
    return e === void 0 && At.set(t.strings, e = new st(t)), e;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const n of t) i === e.length ? e.push(r = new It(this.O(M()), this.O(M()), this, this.options)) : r = e[i], r._$AI(n), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}, Y = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  _$AI(t, e = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = O(this, t, e, 0), o = !j(t) || t !== this._$AH && t !== P, o && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = O(this, a[r + c], e, c), l === P && (l = this._$AH[c]), o || (o = !j(l) || l !== this._$AH[c]), l === u ? t = u : t !== u && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}, ie = class extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
};
class ne extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class oe extends Y {
  constructor(t, e, r, i, n) {
    super(t, e, r, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? u) === P) return;
    const r = this._$AH, i = t === u && r !== u || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== u && (r === u || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ae {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const G = T.litHtmlPolyfillSupport;
G == null || G(st, at), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.1");
const ce = (s, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new at(t.insertBefore(M(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class w extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ce(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return P;
  }
}
var Ct;
w._$litElement$ = !0, w.finalized = !0, (Ct = A.litElementHydrateSupport) == null || Ct.call(A, { LitElement: w });
const Q = A.litElementPolyfillSupport;
Q == null || Q({ LitElement: w });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.1");
const V = (s) => typeof s == "object" && s !== null && !Array.isArray(s), g = (s) => {
  if (typeof s == "number" && Number.isInteger(s) && s > 0)
    return s;
  if (typeof s == "string") {
    const t = Number(s);
    if (Number.isInteger(t) && t > 0)
      return t;
  }
  return null;
}, St = (s) => {
  if (V(s)) {
    const t = s.version;
    return [
      g(s.major),
      g(s.amount),
      g(s.quantity),
      g(t),
      V(t) ? g(t.major) : null
    ].find((r) => r !== null) ?? null;
  }
  return g(s);
}, le = (s) => typeof s == "string" && s.trim().length > 0 ? s : null, q = (s) => {
  const t = s.trim();
  if (!t)
    return null;
  const e = t.lastIndexOf("@");
  if (e === -1)
    return { name: t, major: 1 };
  const r = t.slice(0, e).trim(), i = t.slice(e + 1).trim();
  if (!r || !i)
    return null;
  const n = g(i);
  return { name: r, major: n };
}, Ht = (s) => {
  if (!s)
    return {};
  if (typeof s == "string") {
    const t = q(s);
    return !t || !t.major ? {} : { [t.name]: t.major };
  }
  return Array.isArray(s) ? s.reduce((t, e) => {
    if (typeof e == "string") {
      const r = q(e);
      return !r || !r.major || (t[r.name] = Math.max(t[r.name] ?? 0, r.major)), t;
    }
    if (V(e)) {
      const r = le(e.stackId ?? e.id);
      if (!r)
        return t;
      const i = q(r);
      if (!i)
        return t;
      const n = St(e), o = [i.major, n].filter((c) => typeof c == "number");
      if (o.length === 0)
        return t;
      const a = Math.max(...o);
      t[i.name] = Math.max(t[i.name] ?? 0, a);
    }
    return t;
  }, {}) : V(s) ? Object.entries(s).reduce((t, [e, r]) => {
    const i = q(e);
    if (!i)
      return t;
    const n = St(r), o = [i.major, n].filter((a) => typeof a == "number");
    return o.length === 0 || (t[i.name] = Math.max(t[i.name] ?? 0, ...o)), t;
  }, {}) : {};
}, W = [
  "structured",
  "quantified",
  "timed",
  "compute",
  "referenced",
  "scaling",
  "equipment",
  "prep",
  "illustrated",
  "dietary",
  "storage",
  "substitutions",
  "techniques"
], v = {
  lite: { requiresStacks: [], label: "Lite" },
  base: { requiresStacks: [], label: "Base" },
  scalable: { requiresStacks: ["quantified", "scaling"], label: "Scalable" },
  timed: { requiresStacks: ["structured", "timed"], label: "Timed" },
  equipped: { requiresStacks: ["equipment"], label: "Equipped" },
  prepped: { requiresStacks: ["prep"], label: "Prepped" },
  illustrated: { requiresStacks: ["illustrated"], label: "Illustrated" }
}, he = [
  "scalable",
  "timed",
  "illustrated",
  "equipped",
  "prepped",
  "base",
  "lite"
], de = (s) => {
  const t = s ?? {}, e = (r) => (t[r] ?? 0) > 0;
  for (const r of he) {
    const i = v[r];
    if (!i)
      continue;
    if (i.requiresStacks.every((o) => e(o)))
      return { profile: r, inferred: !0 };
  }
  return { profile: void 0, inferred: !0 };
}, U = (s) => typeof s == "object" && s !== null, rt = (s) => {
  if (typeof s == "string")
    return s;
  if (typeof s == "number" || typeof s == "boolean")
    return String(s);
  if (s && typeof s == "object") {
    const t = s, e = typeof t.name == "string" ? t.name : typeof t.title == "string" ? t.title : void 0, r = typeof t.amount == "string" || typeof t.amount == "number" ? String(t.amount) : typeof t.quantity == "string" || typeof t.quantity == "number" ? String(t.quantity) : void 0, i = typeof t.description == "string" ? t.description : typeof t.step == "string" ? t.step : void 0, n = [e, r ? `(${r})` : void 0, i].filter(Boolean).join(" ");
    if (n)
      return n;
    const o = Object.entries(t).map(([a, c]) => {
      if (typeof c == "string" || typeof c == "number" || typeof c == "boolean")
        return `${a}: ${c}`;
    }).filter((a) => !!a);
    if (o.length > 0)
      return o.join(", ");
  }
  return "";
}, X = (s) => {
  if (Array.isArray(s))
    return s.map((t) => rt(t)).filter(Boolean);
  if (typeof s == "string" && s.trim().length > 0)
    return [s];
  if (s && typeof s == "object") {
    const t = s, e = Array.isArray(t.items) ? t.items : Object.values(t);
    if (Array.isArray(e))
      return e.map((r) => rt(r)).filter(Boolean);
  }
  return [];
}, qt = (s, t) => {
  if (Array.isArray(s)) {
    const r = s.map((i) => {
      if (i && typeof i == "object" && !Array.isArray(i)) {
        const o = i, a = X(o[t] ?? o.items), c = typeof o.section == "string" ? o.section : void 0;
        return a.length === 0 && !c ? void 0 : { title: c, items: a };
      }
      const n = rt(i);
      if (n)
        return { items: [n] };
    }).filter((i) => !!i);
    if (r.length > 0)
      return r;
  }
  if (s && typeof s == "object" && !Array.isArray(s)) {
    const r = s, i = X(r[t] ?? r.items), n = typeof r.section == "string" ? r.section : void 0;
    if (i.length > 0 || n)
      return [{ title: n, items: i }];
  }
  const e = X(s);
  return e.length > 0 ? [{ items: e }] : [];
}, ue = (s) => {
  if (!U(s))
    return {};
  const t = s.stacks ?? s.declaredStacks ?? s.declaredStacksList;
  return Ht(t);
}, pe = (s) => U(s) ? s.name ?? s.title ?? "" : "", fe = (s) => U(s) && typeof s.profile == "string" ? s.profile : "", $e = (s) => U(s) ? qt(s.ingredients, "ingredients") : [], me = (s) => U(s) ? qt(s.instructions, "steps") : [], Lt = (s) => {
  if (!U(s))
    return [];
  const t = s.declaredStacksList ?? s.declaredStacks ?? s.stacks, e = Ht(t);
  return Object.entries(e).sort(([r], [i]) => {
    const n = W.indexOf(r), o = W.indexOf(i), a = n === -1 ? Number.POSITIVE_INFINITY : n, c = o === -1 ? Number.POSITIVE_INFINITY : o;
    return a !== c ? a - c : r.localeCompare(i);
  }).map(([r, i]) => `${r}@${i}`);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, ct = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Dt = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(s, t, e) {
    if (this._$cssResult$ = !0, e !== Dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = t;
  }
  get styleSheet() {
    let s = this.o;
    const t = this.t;
    if (ct && s === void 0) {
      const e = t !== void 0 && t.length === 1;
      e && (s = Et.get(t)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), e && Et.set(t, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (s) => new ye(typeof s == "string" ? s : s + "", void 0, Dt), ge = (s, t) => {
  if (ct) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = z.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, vt = ct ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return _e(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: be, defineProperty: Ae, getOwnPropertyDescriptor: Se, getOwnPropertyNames: Ee, getOwnPropertySymbols: ve, getPrototypeOf: we } = Object, C = globalThis, wt = C.trustedTypes, Pe = wt ? wt.emptyScript : "", Pt = C.reactiveElementPolyfillSupport, N = (s, t) => s, F = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Pe : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, lt = (s, t) => !be(s, t), Ot = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: lt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class k extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: n } = Se(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = we(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, r = [...Ee(e), ...ve(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(vt(i));
    } else t !== void 0 && e.push(vt(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ge(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : F).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, i;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = n.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : F;
      this._$Em = o;
      const l = c.fromAttribute(e, a.type);
      this[o] = l ?? ((i = this._$Ej) == null ? void 0 : i.get(o)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r) {
    var i;
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (r ?? (r = n.getPropertyOptions(t)), !((r.hasChanged ?? lt)(o, e) || r.useDefault && r.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, o, c);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (t = this._$EO) == null || t.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[N("elementProperties")] = /* @__PURE__ */ new Map(), k[N("finalized")] = /* @__PURE__ */ new Map(), Pt == null || Pt({ ReactiveElement: k }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: lt }, Ce = (s = Oe, t, e) => {
  const { kind: r, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), r === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, s);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = e;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, s);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function ht(s) {
  return (t, e) => typeof e == "object" ? Ce(s, t, e) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
var Ue = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, Bt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? xe(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Ue(t, e, i), i;
};
const tt = (s, t, e) => {
  const r = t.map((i) => ({
    title: i.title,
    items: i.items.filter(Boolean)
  })).filter((i) => i.items.length > 0 || i.title);
  return r.length === 0 ? p`<section>
      <h3>${s}</h3>
      <p class="empty">${e}</p>
    </section>` : p`<section>
    <h3>${s}</h3>
    ${r.map(
    (i) => p`<div class="subsection">
        ${i.title ? p`<h4>${i.title}</h4>` : null}
        <ul>
          ${i.items.map((n) => p`<li>${n}</li>`)}
        </ul>
      </div>`
  )}
  </section>`;
};
let K = class extends w {
  render() {
    const s = this.recipe, t = pe(s) || "Recipe", e = $e(s), r = me(s), i = Lt(s), n = i.length > 0 ? [{ items: i }] : [];
    return p`
      <article>
        <h2>${t}</h2>
        ${tt("Ingredients", e, "No ingredients provided.")}
        ${tt("Instructions", r, "No instructions provided.")}
        ${tt("Stacks", n, "No stacks declared.")}
      </article>
    `;
  }
};
K.styles = xt`
    :host {
      display: block;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #ffffff;
      color: #1f2933;
      max-width: 720px;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    section {
      margin-bottom: 1.25rem;
    }

    .subsection h4 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .subsection ul {
      margin: 0;
      padding-left: 1.25rem;
    }

    .empty {
      color: #6b7280;
      font-style: italic;
    }
  `;
Bt([
  ht({ attribute: !1 })
], K.prototype, "recipe", 2);
K = Bt([
  zt("soustack-recipe")
], K);
var ke = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, dt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Re(t, e) : t, n = s.length - 1, o; n >= 0; n--)
    (o = s[n]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && ke(t, e, i), i;
};
const Te = (s) => {
  const t = s.lastIndexOf("@");
  return t === -1 ? s : s.slice(0, t);
}, Ne = (s, t) => {
  const e = W.indexOf(s), r = W.indexOf(t), i = e === -1 ? Number.POSITIVE_INFINITY : e, n = r === -1 ? Number.POSITIVE_INFINITY : r;
  return i !== n ? i - n : s.localeCompare(t);
};
let I = class extends w {
  constructor() {
    super(...arguments), this.mode = "user";
  }
  render() {
    var s;
    const t = ue(this.recipe), e = Lt(this.recipe), r = this.mode === "dev" ? "dev" : "user", i = fe(this.recipe), n = i && v[i] ? { profile: i, inferred: !1 } : de(t), o = n.profile && v[n.profile] ? n.profile : void 0, a = [];
    if (o) {
      const l = n.inferred ? `${v[o].label} (inferred)` : v[o].label;
      a.push(p`<span class="badge profile">${l}</span>`);
    }
    const c = (r === "dev" ? e : e.map((l) => Te(l))).map(
      (l) => p`<span class="badge">${l}</span>`
    );
    if (a.push(...c), r === "dev" && o) {
      const l = (((s = v[o]) == null ? void 0 : s.requiresStacks) ?? []).filter((d) => !t[d]).sort(Ne).map(
        (d) => p`<span class="badge missing">${d}@1</span>`
      );
      a.push(...l);
    }
    return p`<div class="badges">${a}</div>`;
  }
};
I.styles = xt`
    :host {
      display: block;
    }

    .badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .badge {
      border: 1px solid #d1d5db;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 12px;
      line-height: 1.4;
      color: #111827;
    }

    .badge.profile {
      border-width: 2px;
      font-weight: 600;
    }

    .badge.missing {
      border-style: dashed;
      color: #6b7280;
    }
  `;
dt([
  ht({ attribute: !1 })
], I.prototype, "recipe", 2);
dt([
  ht({ type: String, reflect: !0 })
], I.prototype, "mode", 2);
I = dt([
  zt("soustack-badges")
], I);
function Me(s = document) {
  const t = s.querySelector(
    'link[rel="alternate"][type="application/vnd.soustack+json"]'
  );
  return t != null && t.href ? new URL(t.href, s.baseURI).toString() : null;
}
function je(s, t = document) {
  return new URL(s, t.baseURI).toString();
}
function D(s, t) {
  const e = document.createElement("div");
  e.style.cssText = `
    padding: 0.75rem;
    background: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    color: #991b1b;
    font-size: 0.875rem;
  `, e.textContent = `Error: ${t}`, s.innerHTML = "", s.appendChild(e);
}
async function Ie(s, t = document) {
  const e = s.getAttribute("data-soustack"), r = s.hasAttribute("data-soustack-discover");
  let i = null;
  if (e)
    i = je(e, t);
  else if (r) {
    if (i = Me(t), !i) {
      D(s, "No Soustack recipe URL found via discovery"), console.warn("[soustack-embed] Discovery failed for target", s);
      return;
    }
  } else {
    D(s, "No URL specified (use data-soustack or data-soustack-discover)"), console.warn("[soustack-embed] No URL for target", s);
    return;
  }
  let n;
  try {
    const a = await fetch(i);
    if (!a.ok)
      throw new Error(`HTTP ${a.status}: ${a.statusText}`);
    n = await a.json();
  } catch (a) {
    const c = a instanceof Error ? a.message : "Failed to fetch recipe";
    D(s, c), console.warn("[soustack-embed] Fetch failed for target", s, a);
    return;
  }
  const o = document.createElement("soustack-recipe");
  o.recipe = n, s.innerHTML = "", s.appendChild(o);
}
function De(s) {
  const t = (s == null ? void 0 : s.root) ?? document, e = t instanceof Document ? t : t.ownerDocument ?? document;
  Array.from(
    t.querySelectorAll("[data-soustack], [data-soustack-discover]")
  ).forEach((i) => {
    Ie(i, e).catch((n) => {
      D(i, "Unexpected error"), console.warn("[soustack-embed] Unexpected error for target", i, n);
    });
  });
}
export {
  Me as discoverSoustackUrl,
  De as init
};
