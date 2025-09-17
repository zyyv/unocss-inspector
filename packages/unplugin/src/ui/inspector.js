import { defineComponent as I, mergeModels as Me, useModel as Ee, inject as ze, computed as R, createElementBlock as S, openBlock as b, createElementVNode as p, createCommentVNode as V, normalizeClass as O, normalizeStyle as se, unref as F, toDisplayString as M, watchEffect as Te, provide as Ne, renderSlot as me, isRef as mt, shallowRef as z, toValue as K, watch as P, getCurrentScope as Ft, onScopeDispose as Rt, onMounted as ve, nextTick as jt, shallowReadonly as Ot, getCurrentInstance as Ue, hasInjectionContext as vt, reactive as Ze, ref as T, toRaw as Wt, createVNode as W, withDirectives as He, withModifiers as pe, vModelText as ht, Transition as Ye, withCtx as N, Fragment as q, renderList as Z, useTemplateRef as It, createBlock as H, createTextVNode as U, resolveComponent as Bt, resolveDynamicComponent as gt, vShow as Nt, KeepAlive as Pt, onUnmounted as Dt, Teleport as zt } from "vue";
const Ut = {
  "inline-flex": "",
  "w-fit": "",
  flex: "items-center gap-0.75",
  "children:cursor-pointer": "",
  "select-none": ""
}, Ht = ["id", "checked", "type", "disabled"], Yt = ["for"], de = /* @__PURE__ */ I({
  __name: "FormControl",
  props: /* @__PURE__ */ Me({
    id: {},
    label: {},
    disabled: { type: Boolean },
    modelValue: { type: [String, Boolean] },
    shape: { default: "square" },
    type: { default: "checkbox" },
    size: { default: 4 }
  }, {
    modelValue: { type: [Boolean, String] },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, t = Ee(s, "modelValue"), n = e.id || Math.random().toString(36).slice(2, 11), o = ze("controlGroup", null), l = R(() => o && typeof e.modelValue == "string" ? o.isChecked(e.modelValue) : !!t.value);
    function c() {
      o && typeof e.modelValue == "string" ? e.type === "radio" || o.type === "radio" ? o.select(e.modelValue) : o.toggle(e.modelValue) : e.type === "radio" ? t.value = !0 : t.value = !t.value;
    }
    function f(r) {
      r.preventDefault(), c();
    }
    return (r, i) => (b(), S("div", Ut, [
      p("div", {
        class: O(["inline-flex items-center relative", {
          "opacity-50 cursor-not-allowed": r.disabled
        }]),
        onClick: c
      }, [
        p("input", {
          id: F(n),
          checked: l.value,
          type: r.type,
          disabled: r.disabled,
          class: O(["btn-clear peer checked:b-$context-color/50 b b-solid b-white/30", r.shape === "square" ? "rd-sm" : "rd-full"]),
          style: se([{ "--webkit-appearance": "none", "-moz-appearance": "none", appearance: "none" }, {
            width: `calc(var(--spacing) * ${e.size})`,
            height: `calc(var(--spacing) * ${e.size})`
          }])
        }, null, 14, Ht),
        p("div", {
          class: O(["pos-center transition-all size-0 peer-checked:size-58% peer-checked:bg-$context-color", r.shape === "square" ? "rd-2px" : "rd-full"])
        }, null, 2)
      ], 2),
      r.label ? (b(), S("label", {
        key: 0,
        "transition-opacity": "",
        class: O([{ "op-50": !l.value }, "text-3.25 leading-normal whitespace-nowrap"]),
        for: F(n),
        onClick: f
      }, M(r.label), 11, Yt)) : V("", !0)
    ]));
  }
}), he = /* @__PURE__ */ I({
  __name: "FormControlGroup",
  props: /* @__PURE__ */ Me({
    type: { default: "checkbox" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, t = Ee(s, "modelValue");
    Te(() => {
      (t.value === void 0 || t.value === null) && (t.value = e.type === "checkbox" ? [] : "");
    });
    function n(c) {
      e.type === "checkbox" && Array.isArray(t.value) && (t.value.indexOf(c) === -1 ? t.value = [...t.value, c] : t.value = t.value.filter((r) => r !== c));
    }
    function o(c) {
      e.type === "radio" ? t.value = c : e.type === "checkbox" && Array.isArray(t.value) && (t.value.includes(c) || (t.value = [...t.value, c]));
    }
    function l(c) {
      return e.type === "checkbox" && Array.isArray(t.value) ? t.value.includes(c) : e.type === "radio" ? t.value === c : !1;
    }
    return Ne("controlGroup", {
      toggle: n,
      select: o,
      isChecked: l,
      modelValue: R(() => t.value),
      type: e.type
    }), (c, f) => (b(), S("div", null, [
      me(c.$slots, "default")
    ]));
  }
});
function yt(s) {
  return Ft() ? (Rt(s), !0) : !1;
}
const Fe = /* @__PURE__ */ new WeakMap(), Xt = /* @__NO_SIDE_EFFECTS__ */ (...s) => {
  var e;
  const t = s[0], n = (e = Ue()) == null ? void 0 : e.proxy;
  if (n == null && !vt())
    throw new Error("injectLocal must be called in setup");
  return n && Fe.has(n) && t in Fe.get(n) ? Fe.get(n)[t] : ze(...s);
}, Xe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Gt = Object.prototype.toString, qt = (s) => Gt.call(s) === "[object Object]", Se = () => {
};
function Kt(s, e) {
  function t(...n) {
    return new Promise((o, l) => {
      Promise.resolve(s(() => e.apply(this, n), { fn: e, thisArg: this, args: n })).then(o).catch(l);
    });
  }
  return t;
}
function Jt(s, e = {}) {
  let t, n, o = Se;
  const l = (r) => {
    clearTimeout(r), o(), o = Se;
  };
  let c;
  return (r) => {
    const i = K(s), a = K(e.maxWait);
    return t && l(t), i <= 0 || a !== void 0 && a <= 0 ? (n && (l(n), n = void 0), Promise.resolve(r())) : new Promise((d, u) => {
      o = e.rejectOnCancel ? u : d, c = r, a && !n && (n = setTimeout(() => {
        t && l(t), n = void 0, d(c());
      }, a)), t = setTimeout(() => {
        n && l(n), n = void 0, d(r());
      }, i);
    });
  };
}
function Qt(s) {
  let e;
  function t() {
    return e || (e = s()), e;
  }
  return t.reset = async () => {
    const n = e;
    e = void 0, n && await n;
  }, t;
}
function et(s) {
  return s.endsWith("rem") ? Number.parseFloat(s) * 16 : Number.parseFloat(s);
}
function Re(s) {
  return Array.isArray(s) ? s : [s];
}
function Zt(s) {
  return Ue();
}
// @__NO_SIDE_EFFECTS__
function en(s, e = 200, t = {}) {
  return Kt(
    Jt(e, t),
    s
  );
}
function tn(s, e = !0, t) {
  Zt() ? ve(s, t) : e ? s() : jt(s);
}
function nn(s, e, t = {}) {
  const {
    immediate: n = !0,
    immediateCallback: o = !1
  } = t, l = z(!1);
  let c;
  function f() {
    c && (clearTimeout(c), c = void 0);
  }
  function r() {
    l.value = !1, f();
  }
  function i(...a) {
    o && s(), f(), l.value = !0, c = setTimeout(() => {
      l.value = !1, c = void 0, s(...a);
    }, K(e));
  }
  return n && (l.value = !0, Xe && i()), yt(r), {
    isPending: Ot(l),
    start: i,
    stop: r
  };
}
// @__NO_SIDE_EFFECTS__
function Ce(s = !1, e = {}) {
  const {
    truthyValue: t = !0,
    falsyValue: n = !1
  } = e, o = mt(s), l = z(s);
  function c(f) {
    if (arguments.length)
      return l.value = f, l.value;
    {
      const r = K(t);
      return l.value = l.value === r ? K(n) : r, l.value;
    }
  }
  return o ? c : [l, c];
}
function sn(s, e, t) {
  return P(
    s,
    e,
    {
      ...t,
      immediate: !0
    }
  );
}
function on(s, e, t) {
  var n;
  let o;
  mt(t) ? o = {
    evaluating: t
  } : o = {};
  const {
    lazy: l = !1,
    flush: c = "pre",
    evaluating: f = void 0,
    shallow: r = !0,
    onError: i = (n = globalThis.reportError) != null ? n : Se
  } = o, a = z(!l), d = r ? z(e) : T(e);
  let u = 0;
  return Te(async (h) => {
    if (!a.value)
      return;
    u++;
    const y = u;
    let m = !1;
    f && Promise.resolve().then(() => {
      f.value = !0;
    });
    try {
      const v = await s((_) => {
        h(() => {
          f && (f.value = !1), m || _();
        });
      });
      y === u && (d.value = v);
    } catch (v) {
      i(v);
    } finally {
      f && y === u && (f.value = !1), m = !0;
    }
  }, { flush: c }), l ? R(() => (a.value = !0, d.value)) : d;
}
const ge = Xe ? window : void 0, xt = Xe ? window.navigator : void 0;
function ln(s) {
  var e;
  const t = K(s);
  return (e = t?.$el) != null ? e : t;
}
function X(...s) {
  const e = [], t = () => {
    e.forEach((f) => f()), e.length = 0;
  }, n = (f, r, i, a) => (f.addEventListener(r, i, a), () => f.removeEventListener(r, i, a)), o = R(() => {
    const f = Re(K(s[0])).filter((r) => r != null);
    return f.every((r) => typeof r != "string") ? f : void 0;
  }), l = sn(
    () => {
      var f, r;
      return [
        (r = (f = o.value) == null ? void 0 : f.map((i) => ln(i))) != null ? r : [ge].filter((i) => i != null),
        Re(K(o.value ? s[1] : s[0])),
        Re(F(o.value ? s[2] : s[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        K(o.value ? s[3] : s[2])
      ];
    },
    ([f, r, i, a]) => {
      if (t(), !f?.length || !r?.length || !i?.length)
        return;
      const d = qt(a) ? { ...a } : a;
      e.push(
        ...f.flatMap(
          (u) => r.flatMap(
            (h) => i.map((y) => n(u, h, y, d))
          )
        )
      );
    },
    { flush: "post" }
  ), c = () => {
    l(), t();
  };
  return yt(t), c;
}
// @__NO_SIDE_EFFECTS__
function rn() {
  const s = z(!1), e = Ue();
  return e && ve(() => {
    s.value = !0;
  }, e), s;
}
// @__NO_SIDE_EFFECTS__
function Ge(s) {
  const e = /* @__PURE__ */ rn();
  return R(() => (e.value, !!s()));
}
const an = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function un() {
  const s = vt() ? /* @__PURE__ */ Xt(an, null) : null;
  return typeof s == "number" ? s : void 0;
}
function cn(s, e = {}) {
  const { window: t = ge, ssrWidth: n = /* @__PURE__ */ un() } = e, o = /* @__PURE__ */ Ge(() => t && "matchMedia" in t && typeof t.matchMedia == "function"), l = z(typeof n == "number"), c = z(), f = z(!1), r = (i) => {
    f.value = i.matches;
  };
  return Te(() => {
    if (l.value) {
      l.value = !o.value;
      const i = K(s).split(",");
      f.value = i.some((a) => {
        const d = a.includes("not all"), u = a.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), h = a.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let y = !!(u || h);
        return u && y && (y = n >= et(u[1])), h && y && (y = n <= et(h[1])), d ? !y : y;
      });
      return;
    }
    o.value && (c.value = t.matchMedia(K(s)), f.value = c.value.matches);
  }), X(c, "change", r, { passive: !0 }), R(() => f.value);
}
// @__NO_SIDE_EFFECTS__
function tt(s, e = {}) {
  const {
    controls: t = !1,
    navigator: n = xt
  } = e, o = /* @__PURE__ */ Ge(() => n && "permissions" in n), l = z(), c = typeof s == "string" ? { name: s } : s, f = z(), r = () => {
    var a, d;
    f.value = (d = (a = l.value) == null ? void 0 : a.state) != null ? d : "prompt";
  };
  X(l, "change", r, { passive: !0 });
  const i = Qt(async () => {
    if (o.value) {
      if (!l.value)
        try {
          l.value = await n.permissions.query(c);
        } catch {
          l.value = void 0;
        } finally {
          r();
        }
      if (t)
        return Wt(l.value);
    }
  });
  return i(), t ? {
    state: f,
    isSupported: o,
    query: i
  } : f;
}
function dn(s = {}) {
  const {
    navigator: e = xt,
    read: t = !1,
    source: n,
    copiedDuring: o = 1500,
    legacy: l = !1
  } = s, c = /* @__PURE__ */ Ge(() => e && "clipboard" in e), f = /* @__PURE__ */ tt("clipboard-read"), r = /* @__PURE__ */ tt("clipboard-write"), i = R(() => c.value || l), a = z(""), d = z(!1), u = nn(() => d.value = !1, o, { immediate: !1 });
  async function h() {
    let g = !(c.value && _(f.value));
    if (!g)
      try {
        a.value = await e.clipboard.readText();
      } catch {
        g = !0;
      }
    g && (a.value = v());
  }
  i.value && t && X(["copy", "cut"], h, { passive: !0 });
  async function y(g = K(n)) {
    if (i.value && g != null) {
      let x = !(c.value && _(r.value));
      if (!x)
        try {
          await e.clipboard.writeText(g);
        } catch {
          x = !0;
        }
      x && m(g), a.value = g, d.value = !0, u.start();
    }
  }
  function m(g) {
    const x = document.createElement("textarea");
    x.value = g ?? "", x.style.position = "absolute", x.style.opacity = "0", document.body.appendChild(x), x.select(), document.execCommand("copy"), x.remove();
  }
  function v() {
    var g, x, A;
    return (A = (x = (g = document?.getSelection) == null ? void 0 : g.call(document)) == null ? void 0 : x.toString()) != null ? A : "";
  }
  function _(g) {
    return g === "granted" || g === "prompt";
  }
  return {
    isSupported: i,
    text: a,
    copied: d,
    copy: y
  };
}
const fn = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function pn(s = {}) {
  const {
    reactive: e = !1,
    target: t = ge,
    aliasMap: n = fn,
    passive: o = !0,
    onEventFired: l = Se
  } = s, c = Ze(/* @__PURE__ */ new Set()), f = {
    toJSON() {
      return {};
    },
    current: c
  }, r = e ? Ze(f) : f, i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  function u(v, _) {
    v in r && (e ? r[v] = _ : r[v].value = _);
  }
  function h() {
    c.clear();
    for (const v of d)
      u(v, !1);
  }
  function y(v, _) {
    var g, x;
    const A = (g = v.key) == null ? void 0 : g.toLowerCase(), L = [(x = v.code) == null ? void 0 : x.toLowerCase(), A].filter(Boolean);
    A && (_ ? c.add(A) : c.delete(A));
    for (const $ of L)
      d.add($), u($, _);
    if (A === "shift" && !_) {
      const $ = Array.from(a), C = $.indexOf("shift");
      $.forEach((w, E) => {
        E >= C && (c.delete(w), u(w, !1));
      }), a.clear();
    } else typeof v.getModifierState == "function" && v.getModifierState("Shift") && _ && [...c, ...L].forEach(($) => a.add($));
    A === "meta" && !_ ? (i.forEach(($) => {
      c.delete($), u($, !1);
    }), i.clear()) : typeof v.getModifierState == "function" && v.getModifierState("Meta") && _ && [...c, ...L].forEach(($) => i.add($));
  }
  X(t, "keydown", (v) => (y(v, !0), l(v)), { passive: o }), X(t, "keyup", (v) => (y(v, !1), l(v)), { passive: o }), X("blur", h, { passive: o }), X("focus", h, { passive: o });
  const m = new Proxy(
    r,
    {
      get(v, _, g) {
        if (typeof _ != "string")
          return Reflect.get(v, _, g);
        if (_ = _.toLowerCase(), _ in n && (_ = n[_]), !(_ in r))
          if (/[+_-]/.test(_)) {
            const A = _.split(/[+_-]/g).map((k) => k.trim());
            r[_] = R(() => A.map((k) => K(m[k])).every(Boolean));
          } else
            r[_] = z(!1);
        const x = Reflect.get(v, _, g);
        return e ? K(x) : x;
      }
    }
  );
  return m;
}
const mn = {
  page: (s) => [s.pageX, s.pageY],
  client: (s) => [s.clientX, s.clientY],
  screen: (s) => [s.screenX, s.screenY],
  movement: (s) => s instanceof MouseEvent ? [s.movementX, s.movementY] : null
};
function vn(s = {}) {
  const {
    type: e = "page",
    touch: t = !0,
    resetOnTouchEnds: n = !1,
    initialValue: o = { x: 0, y: 0 },
    window: l = ge,
    target: c = l,
    scroll: f = !0,
    eventFilter: r
  } = s;
  let i = null, a = 0, d = 0;
  const u = z(o.x), h = z(o.y), y = z(null), m = typeof e == "function" ? e : mn[e], v = ($) => {
    const C = m($);
    i = $, C && ([u.value, h.value] = C, y.value = "mouse"), l && (a = l.scrollX, d = l.scrollY);
  }, _ = ($) => {
    if ($.touches.length > 0) {
      const C = m($.touches[0]);
      C && ([u.value, h.value] = C, y.value = "touch");
    }
  }, g = () => {
    if (!i || !l)
      return;
    const $ = m(i);
    i instanceof MouseEvent && $ && (u.value = $[0] + l.scrollX - a, h.value = $[1] + l.scrollY - d);
  }, x = () => {
    u.value = o.x, h.value = o.y;
  }, A = r ? ($) => r(() => v($), {}) : ($) => v($), k = r ? ($) => r(() => _($), {}) : ($) => _($), L = r ? () => r(() => g(), {}) : () => g();
  if (c) {
    const $ = { passive: !0 };
    X(c, ["mousemove", "dragover"], A, $), t && e !== "movement" && (X(c, ["touchstart", "touchmove"], k, $), n && X(c, "touchend", x, $)), f && e === "page" && X(l, "scroll", L, $);
  }
  return {
    x: u,
    y: h,
    sourceType: y
  };
}
// @__NO_SIDE_EFFECTS__
function bt(s = {}) {
  const {
    window: e = ge,
    initialWidth: t = Number.POSITIVE_INFINITY,
    initialHeight: n = Number.POSITIVE_INFINITY,
    listenOrientation: o = !0,
    includeScrollbar: l = !0,
    type: c = "inner"
  } = s, f = z(t), r = z(n), i = () => {
    if (e)
      if (c === "outer")
        f.value = e.outerWidth, r.value = e.outerHeight;
      else if (c === "visual" && e.visualViewport) {
        const { width: d, height: u, scale: h } = e.visualViewport;
        f.value = Math.round(d * h), r.value = Math.round(u * h);
      } else l ? (f.value = e.innerWidth, r.value = e.innerHeight) : (f.value = e.document.documentElement.clientWidth, r.value = e.document.documentElement.clientHeight);
  };
  i(), tn(i);
  const a = { passive: !0 };
  if (X("resize", i, a), e && c === "visual" && e.visualViewport && X(e.visualViewport, "resize", i, a), o) {
    const d = cn("(orientation: portrait)");
    P(d, () => i());
  }
  return { width: f, height: r };
}
const hn = { flex: "~ items-center gap-1" }, gn = ["placeholder"], yn = { flex: "~ items-center gap-1" }, xn = {
  key: 0,
  absolute: "",
  "top-full": "",
  "left-0": "",
  "right-0": "",
  "z-20": "",
  "mt-1": "",
  "backdrop-blur-md": "",
  class: "bg-white/5 rd-md max-h-30 of-y-auto no-scrollbar",
  border: "~ solid white/5 1px",
  "select-none": ""
}, bn = ["onClick"], _n = {
  key: 1,
  class: "text-2.25 text-white/50 self-end"
}, wn = {
  key: 2,
  "i-hugeicons:tick-01": "",
  "ml-auto": "",
  text: "3.25"
}, ce = /* @__PURE__ */ I({
  __name: "Select",
  props: /* @__PURE__ */ Me({
    options: { default: () => [] },
    placeholder: { default: "Please select..." },
    disabled: { type: Boolean, default: !1 },
    inputable: { type: Boolean, default: !1 },
    borderable: { type: Boolean, default: !0 },
    inputClass: {}
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, t = Ee(s, "modelValue"), n = T(!1), o = T(), l = T(), c = T("");
    P(t, (y) => {
      c.value = String(y || "");
    }, { immediate: !0 });
    const f = R({
      get: () => e.inputable ? c.value : "",
      set: (y) => {
        c.value = y;
      }
    });
    function r(y) {
      if (!e.inputable)
        return;
      const v = y.target.value.trim();
      v !== String(t.value || "") && (t.value = v || "");
    }
    function i(y) {
      e.inputable && y.key === "Enter" && (y.preventDefault(), r(y), l.value?.blur());
    }
    const a = R(() => e.options.find((y) => y.value === t.value));
    function d() {
      e.disabled || (n.value = !n.value);
    }
    function u(y) {
      e.disabled || (t.value = y.value, n.value = !1);
    }
    function h(y) {
      o.value && !o.value.contains(y.target) && (n.value = !1);
    }
    return X("click", h), (y, m) => (b(), S("div", {
      ref_key: "selectRef",
      ref: o,
      class: O({ "is-disabled": y.disabled, "is-open": n.value }),
      relative: "",
      "w-full": ""
    }, [
      p("div", {
        class: O(["select-trigger", y.borderable ? "b-1" : "b-0"]),
        text: "white/80 xs",
        p: "x2 y1.5",
        "cursor-pointer": "",
        flex: "~ justify-between items-center",
        b: "solid white/10 hover:dashed",
        "rd-md": "",
        "transition-all": "",
        "duration-200": "",
        "hover:text-white": "",
        onClick: d
      }, [
        p("div", hn, [
          me(y.$slots, "prefix"),
          a.value?.icon ? (b(), S("span", {
            key: 0,
            class: O(a.value.icon)
          }, null, 2)) : V("", !0),
          y.inputable ? He((b(), S("input", {
            key: 1,
            ref_key: "inputRef",
            ref: l,
            "onUpdate:modelValue": m[0] || (m[0] = (v) => f.value = v),
            name: "select-input",
            placeholder: y.placeholder,
            "text-size-inherit": "",
            "w-full": "",
            "flex-1": "",
            "min-w-0": "",
            "bg-transparent": "",
            "border-none": "",
            "outline-none": "",
            class: O(y.inputClass),
            onClick: m[1] || (m[1] = pe(() => {
            }, ["stop"])),
            onBlur: r,
            onKeydown: i
          }, null, 42, gn)), [
            [ht, f.value]
          ]) : (b(), S("span", {
            key: 2,
            class: O({ "op-50": !a.value })
          }, M(a.value?.label || y.placeholder), 3))
        ]),
        p("div", yn, [
          me(y.$slots, "suffix"),
          y.options.length > 0 ? (b(), S("div", {
            key: 0,
            class: O({ "rotate-180": n.value }),
            "i-hugeicons:arrow-down-01": "",
            "transition-transform": "",
            "duration-200": ""
          }, null, 2)) : V("", !0)
        ])
      ], 2),
      W(Ye, {
        "enter-active-class": "transition-all duration-200 ease-out",
        "enter-from-class": "opacity-0 translate-y-[-8px] scale-95",
        "enter-to-class": "opacity-100 translate-y-0 scale-100",
        "leave-active-class": "transition-all duration-150 ease-in",
        "leave-from-class": "opacity-100 translate-y-0 scale-100",
        "leave-to-class": "opacity-0 translate-y-[-8px] scale-95"
      }, {
        default: N(() => [
          n.value && y.options.length > 0 ? (b(), S("div", xn, [
            (b(!0), S(q, null, Z(y.options, (v) => (b(), S("div", {
              key: v.value,
              class: O([{
                "is-selected": v.value === t.value,
                "is-disabled": y.disabled
              }, "text-white text-2.75 text-op-80 hover:bg-white/5 hover:text-op-100"]),
              p: "x2 y1.5",
              "cursor-pointer": "",
              flex: "~ items-center gap-1.5",
              "transition-all": "",
              "duration-150": "",
              onClick: (_) => u(v)
            }, [
              v.icon ? (b(), S("span", {
                key: 0,
                class: O(v.icon)
              }, null, 2)) : V("", !0),
              p("span", null, M(v.label), 1),
              v.desc ? (b(), S("sub", _n, M(v.desc), 1)) : V("", !0),
              v.value === t.value ? (b(), S("div", wn)) : V("", !0)
            ], 10, bn))), 128))
          ])) : V("", !0)
        ]),
        _: 1
      })
    ], 2));
  }
}), _t = "selected-element", $n = "update-trigger", qe = T(0), ke = T(null);
function wt() {
  qe.value;
}
function Pe() {
  if (!ke.value)
    return;
  const s = window.getComputedStyle(ke.value), e = Number.parseFloat(s.transitionDuration) + Number.parseFloat(s.transitionDelay), t = Number.parseFloat(s.animationDuration) + Number.parseFloat(s.animationDelay), n = Math.max(e, t);
  setTimeout(() => {
    qe.value++;
  }, n * 1e3 + 50);
}
function Sn() {
  return Ne(_t, ke), Ne($n, qe), {
    /**
     * The currently tracked selected element
     */
    element: ke,
    // currentElement: CURRENT_ELEMENT,
    tracking: wt,
    triggering: Pe
  };
}
function ee() {
  const s = ze(_t);
  if (!s)
    throw new Error("useElement must be used within a component that provides element context");
  function e(t, n = "style") {
    s?.value && ((n === "style" || n === "both") && Object.assign(s.value.style, t), Pe());
  }
  return {
    element: s,
    // currentElement,
    tracking: wt,
    triggering: Pe,
    setElementStyle: e
  };
}
function Cn(s, e) {
  const t = pn(), n = t["cmd+u"], o = t["ctrl+u"], l = t.escape;
  P([n, o], ([c, f]) => {
    (c || f) && s();
  }), P(l, (c) => {
    c && e();
  });
}
function J(s) {
  return s.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}
const nt = (s) => Number.parseFloat(J(s / 16)), st = (s) => Number.parseFloat(J(s * 16));
function kn(s) {
  switch (s.toLowerCase()) {
    case "div":
      return "text-white:60";
    case "span":
      return "text-purple";
    case "p":
      return "text-yellow";
    case "a":
      return "text-purple";
    case "img":
      return "text-pink";
    case "button":
      return "text-red";
    case "ul":
    case "ol":
      return "text-indigo";
    case "li":
      return "text-teal";
    case "header":
    case "footer":
      return "text-gray";
    case "section":
    case "article":
      return "text-cyan";
    case "nav":
      return "text-lime";
    case "input":
    case "textarea":
    case "select":
      return "text-amber";
    default:
      return "text-white/50";
  }
}
const An = {
  "b-b": "~ solid white/10",
  class: "text-3.25 flex items-center pb-2"
}, Mn = { class: "w-4.5 text-center text-base op-80" }, En = { class: "mx-1 font-medium whitespace-nowrap op-80" }, Tn = { class: "flex-1 font-medium flex justify-end" }, fe = /* @__PURE__ */ I({
  __name: "Cell",
  props: {
    label: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (b(), S("div", An, [
      p("div", Mn, [
        p("div", {
          class: O(e.icon)
        }, null, 2)
      ]),
      p("div", En, M(e.label), 1),
      p("div", Tn, [
        me(e.$slots, "default")
      ])
    ]));
  }
}), Ln = ["title"], ot = /* @__PURE__ */ I({
  __name: "ColorDot",
  props: {
    color: {},
    size: { default: 3.5 }
  },
  setup(s) {
    const e = It("canvas"), t = T(null);
    function n() {
      if (!t.value || !e.value)
        return;
      const o = 3, { width: l, height: c } = e.value.getBoundingClientRect();
      e.value.width = l, e.value.height = c, t.value.clearRect(0, 0, l, c);
      for (let f = 0; f < c; f += o)
        for (let r = 0; r < l; r += o)
          t.value.fillStyle = (r / o + f / o) % 2 === 0 ? "#ffffffcc" : "#88888888", t.value.fillRect(r, f, o, o);
    }
    return ve(() => {
      e.value && (t.value = e.value.getContext("2d"), n());
    }), (o, l) => (b(), S("div", {
      class: "inline-block rounded group-hover:rounded-50% transition-all relative of-hidden",
      style: se({
        width: `calc(var(--spacing) * ${o.size})`,
        height: `calc(var(--spacing) * ${o.size})`
      }),
      title: o.color
    }, [
      p("canvas", {
        ref_key: "canvas",
        ref: e,
        "size-full": ""
      }, null, 512),
      p("div", {
        class: "absolute inset-0",
        style: se({ backgroundColor: o.color })
      }, null, 4)
    ], 12, Ln));
  }
}), Vn = {
  key: 0,
  "p-3": ""
}, Fn = { class: "flex flex-col gap-2" }, Rn = {
  p: "x1.5 y0.5",
  class: "bg-purple/30 text-purple rd w-fit"
}, jn = ["title"], On = { flex: "~ items-center" }, Wn = { flex: "~ items-center" }, In = ["title"], Bn = { key: 0 }, Nn = { key: 1 }, Pn = ["title"], Dn = /* @__PURE__ */ I({
  __name: "BasicInfo",
  setup(s) {
    const { element: e, tracking: t } = ee(), n = T(!1), o = T(!1), l = R(() => {
      if (t(), !e.value)
        return null;
      const d = e.value, u = d.getBoundingClientRect();
      return {
        tagName: d.tagName.toLowerCase(),
        id: d.id,
        rect: {
          x: Math.round(u.x),
          y: Math.round(u.y),
          width: Math.round(u.width),
          height: Math.round(u.height)
        },
        color: {
          text: getComputedStyle(d).color,
          background: getComputedStyle(d).backgroundColor
        },
        font: {
          size: getComputedStyle(d).fontSize,
          family: getComputedStyle(d).fontFamily
        }
      };
    });
    function c(d) {
      return J(d / 16);
    }
    function f() {
      n.value = !n.value;
    }
    function r() {
      o.value = !o.value;
    }
    const { copy: i } = dn();
    function a(d) {
      i(d), console.log("Copied to clipboard:", d);
    }
    return (d, u) => l.value ? (b(), S("div", Vn, [
      p("div", Fn, [
        W(fe, {
          label: "Tag",
          icon: "i-hugeicons:discount-tag-01"
        }, {
          default: N(() => [
            p("div", Rn, M(l.value.tagName), 1)
          ]),
          _: 1
        }),
        l.value.id ? (b(), H(fe, {
          key: 0,
          label: "ID",
          icon: "i-hugeicons:pin-code"
        }, {
          default: N(() => [
            p("div", null, [
              u[2] || (u[2] = p("span", { class: "mr-0.25 text-white/64 text-10px" }, "#", -1)),
              U(" " + M(l.value.id), 1)
            ])
          ]),
          _: 1
        })) : V("", !0),
        W(fe, {
          label: "Position",
          icon: "i-hugeicons:location-09"
        }, {
          default: N(() => [
            p("div", null, [
              u[3] || (u[3] = p("span", { "op-50": "" }, "X:", -1)),
              U(" " + M(l.value.rect.x) + " ", 1),
              u[4] || (u[4] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              u[5] || (u[5] = U()),
              u[6] || (u[6] = p("span", { "op-50": "" }, "Y:", -1)),
              U(" " + M(l.value.rect.y), 1)
            ])
          ]),
          _: 1
        }),
        W(fe, {
          label: "Size",
          icon: "i-hugeicons:image-actual-size"
        }, {
          default: N(() => [
            p("div", {
              class: "cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded transition-colors select-none",
              title: `Click to switch to ${n.value ? "px" : "rem"}`,
              onClick: f
            }, [
              n.value ? (b(), S(q, { key: 0 }, [
                u[7] || (u[7] = p("span", { "op-50": "" }, "W:", -1)),
                U(" " + M(c(l.value.rect.width)), 1),
                u[8] || (u[8] = p("span", { class: "mx-1 op-50" }, "rem", -1)),
                u[9] || (u[9] = U()),
                u[10] || (u[10] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
                u[11] || (u[11] = U()),
                u[12] || (u[12] = p("span", { "op-50": "" }, "H:", -1)),
                U(" " + M(c(l.value.rect.height)), 1),
                u[13] || (u[13] = p("span", { class: "mx-1 op-50" }, "rem", -1))
              ], 64)) : (b(), S(q, { key: 1 }, [
                u[14] || (u[14] = p("span", { "op-50": "" }, "W:", -1)),
                U(" " + M(l.value.rect.width), 1),
                u[15] || (u[15] = p("span", { class: "mx-1 op-50" }, "px", -1)),
                u[16] || (u[16] = U()),
                u[17] || (u[17] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
                u[18] || (u[18] = U()),
                u[19] || (u[19] = p("span", { "op-50": "" }, "H:", -1)),
                U(" " + M(l.value.rect.height), 1),
                u[20] || (u[20] = p("span", { class: "mx-1 op-50" }, "px", -1))
              ], 64))
            ], 8, jn)
          ]),
          _: 1
        }),
        W(fe, {
          label: "Color",
          icon: "i-hugeicons:color-picker"
        }, {
          default: N(() => [
            p("div", On, [
              p("div", {
                title: "Click to copy text color",
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded",
                onClick: u[0] || (u[0] = (h) => a(l.value.color.text))
              }, [
                u[21] || (u[21] = p("span", null, "Text:", -1)),
                W(ot, {
                  color: l.value.color.text
                }, null, 8, ["color"])
              ]),
              u[23] || (u[23] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              p("div", {
                title: "Click to copy background color",
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded",
                onClick: u[1] || (u[1] = (h) => a(l.value.color.background))
              }, [
                u[22] || (u[22] = p("span", null, "Background:", -1)),
                W(ot, {
                  color: l.value.color.background
                }, null, 8, ["color"])
              ])
            ])
          ]),
          _: 1
        }),
        W(fe, {
          label: "Font",
          icon: "i-hugeicons:text"
        }, {
          default: N(() => [
            p("div", Wn, [
              p("div", {
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer px-1 py-0.5 rounded transition-colors select-none",
                title: `Click to switch to ${o.value ? "px" : "rem"}`,
                onClick: r
              }, [
                o.value ? (b(), S("span", Bn, [
                  U(M(c(parseFloat(l.value.font.size))), 1),
                  u[24] || (u[24] = p("span", { class: "mx-1 text-white/50" }, "rem", -1))
                ])) : (b(), S("span", Nn, M(l.value.font.size), 1))
              ], 8, In),
              u[25] || (u[25] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              u[26] || (u[26] = U()),
              p("div", {
                "flex-1": "",
                "line-clamp-1": "",
                "break-all": "",
                title: l.value.font.family
              }, [
                p("span", null, M(l.value.font.family), 1)
              ], 8, Pn)
            ])
          ]),
          _: 1
        })
      ])
    ])) : V("", !0);
  }
}), zn = {
  key: 0,
  class: "lh-loose flex items-center justify-center p-4"
}, Un = {
  b: "~ dashed inspect-margin",
  class: "w-full bg-inspect-margin bg-op-50 p-5 relative"
}, Hn = { class: "box-model-labels" }, Yn = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, Xn = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, Gn = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, qn = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, Kn = {
  b: "~ solid inspect-border/35",
  class: "bg-inspect-border/35 p-5 relative text-center"
}, Jn = { class: "box-model-labels" }, Qn = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, Zn = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, es = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, ts = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, ns = {
  b: "~ dashed inspect-padding",
  class: "bg-inspect-padding/40 p-5 relative text-center"
}, ss = { class: "box-model-labels" }, os = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, ls = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, is = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, rs = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, as = { class: "border border-inspect-content bg-inspect-content/40 min-h-10 flex items-center justify-center" }, us = { class: "text-10px" }, cs = /* @__PURE__ */ I({
  __name: "BoxModel",
  setup(s) {
    const { element: e, tracking: t } = ee(), n = R(() => {
      if (t(), !e.value)
        return null;
      const l = e.value, c = window.getComputedStyle(l), f = l.getBoundingClientRect();
      return {
        margin: {
          top: Number.parseFloat(c.marginTop),
          right: Number.parseFloat(c.marginRight),
          bottom: Number.parseFloat(c.marginBottom),
          left: Number.parseFloat(c.marginLeft)
        },
        border: {
          top: Number.parseFloat(c.borderTopWidth),
          right: Number.parseFloat(c.borderRightWidth),
          bottom: Number.parseFloat(c.borderBottomWidth),
          left: Number.parseFloat(c.borderLeftWidth)
        },
        padding: {
          top: Number.parseFloat(c.paddingTop),
          right: Number.parseFloat(c.paddingRight),
          bottom: Number.parseFloat(c.paddingBottom),
          left: Number.parseFloat(c.paddingLeft)
        },
        size: {
          width: f.width,
          height: f.height
        }
      };
    });
    function o(l) {
      return l === 0 ? "0" : `${l}px`;
    }
    return (l, c) => n.value ? (b(), S("div", zn, [
      p("div", Un, [
        c[2] || (c[2] = p("div", { class: "box-model-title" }, " margin ", -1)),
        p("div", Hn, [
          p("span", Yn, M(o(n.value.margin.top)), 1),
          p("span", Xn, M(o(n.value.margin.right)), 1),
          p("span", Gn, M(o(n.value.margin.bottom)), 1),
          p("span", qn, M(o(n.value.margin.left)), 1)
        ]),
        p("div", Kn, [
          c[1] || (c[1] = p("div", { class: "box-model-title" }, " border ", -1)),
          p("div", Jn, [
            p("span", Qn, M(o(n.value.border.top)), 1),
            p("span", Zn, M(o(n.value.border.right)), 1),
            p("span", es, M(o(n.value.border.bottom)), 1),
            p("span", ts, M(o(n.value.border.left)), 1)
          ]),
          p("div", ns, [
            c[0] || (c[0] = p("div", { class: "box-model-title" }, " padding ", -1)),
            p("div", ss, [
              p("span", os, M(o(n.value.padding.top)), 1),
              p("span", ls, M(o(n.value.padding.right)), 1),
              p("span", is, M(o(n.value.padding.bottom)), 1),
              p("span", rs, M(o(n.value.padding.left)), 1)
            ]),
            p("div", as, [
              p("div", us, M(Math.round(n.value.size.width)) + " × " + M(Math.round(n.value.size.height)), 1)
            ])
          ])
        ])
      ])
    ])) : V("", !0);
  }
}), lt = ["class", "id", "href", "src", "style"];
function ds() {
  const { element: s, tracking: e, triggering: t } = ee(), n = T(/* @__PURE__ */ new Map()), o = T([]), l = T(/* @__PURE__ */ new Map()), c = R(() => {
    if (e(), !s.value)
      return /* @__PURE__ */ new Map();
    const i = /* @__PURE__ */ new Map();
    for (let a = 0; a < s.value.attributes.length; a++) {
      const d = s.value.attributes[a];
      if (!lt.includes(d.name)) {
        const u = d.value.split(" ").filter(Boolean);
        i.set(d.name, new Set(u.length > 0 ? u : ["~"]));
      }
    }
    return i;
  });
  P(
    () => s.value,
    (i) => {
      if (n.value.clear(), o.value = [], l.value.clear(), i)
        for (let a = 0; a < i.attributes.length; a++) {
          const d = i.attributes[a];
          if (!lt.includes(d.name)) {
            o.value.push(d.name);
            const u = d.value.split(" ").filter(Boolean);
            n.value.set(d.name, new Set(u)), l.value.set(d.name, u.length > 0 ? u : ["~"]);
          }
        }
    },
    { immediate: !0 }
  ), P(
    c,
    (i) => {
      i.forEach((a, d) => {
        if (n.value.has(d) || (n.value.set(d, /* @__PURE__ */ new Set()), o.value.includes(d) || o.value.push(d)), a.forEach((u) => {
          n.value.get(d).add(u);
        }), !l.value.has(d))
          l.value.set(d, Array.from(a));
        else {
          const u = l.value.get(d), h = Array.from(a).filter((y) => !u.includes(y));
          l.value.set(d, [...u, ...h]);
        }
      });
    },
    { immediate: !0 }
  );
  const f = R(() => {
    const i = /* @__PURE__ */ new Map();
    return o.value.forEach((a) => {
      if (n.value.has(a)) {
        const d = n.value.get(a), u = c.value.get(a) || /* @__PURE__ */ new Set(), h = l.value.get(a) || [], y = h.filter((v) => d.has(v)), m = h.filter((v) => u.has(v));
        i.set(a, {
          all: y,
          active: m
        });
      }
    }), i;
  });
  function r(i, a) {
    if (s.value) {
      if (a.length === 0)
        s.value.removeAttribute(i);
      else if (a.length === 1 && a[0] === "~")
        s.value.setAttribute(i, "");
      else {
        const d = a.filter((u) => u !== "~");
        if (d.length === 0)
          s.value.removeAttribute(i);
        else {
          const u = l.value.get(i) || [], h = u.filter((v) => d.includes(v)), y = d.filter((v) => !u.includes(v)), m = [...h, ...y];
          s.value.setAttribute(i, m.join(" "));
        }
      }
      t();
    }
  }
  return {
    attributes: f,
    updateAttribute: r,
    originalAttributeOrder: R(() => o.value),
    originalValueOrder: R(() => l.value)
  };
}
function $t() {
  const { element: s, tracking: e, triggering: t } = ee(), n = T(/* @__PURE__ */ new Set()), o = T([]), l = R(() => (e(), s.value ? Array.from(s.value.classList) : []));
  P(
    () => s.value,
    (r) => {
      if (n.value.clear(), o.value = [], r) {
        const i = Array.from(r.classList);
        o.value = [...i], i.forEach((a) => {
          n.value.add(a);
        });
      }
    },
    { immediate: !0 }
  ), P(
    l,
    (r) => {
      r.forEach((i) => {
        n.value.has(i) || (n.value.add(i), o.value.includes(i) || o.value.push(i));
      });
    },
    { immediate: !0 }
  );
  const c = R(() => o.value.filter((r) => n.value.has(r))), f = R({
    get: () => l.value,
    set: (r) => {
      if (!s.value)
        return;
      const i = o.value.filter((u) => r.includes(u)), a = r.filter((u) => !o.value.includes(u)), d = [...i, ...a];
      s.value.className = d.join(" "), t();
    }
  });
  return {
    displayClasses: c,
    classList: f,
    originalClassOrder: R(() => o.value)
  };
}
const fs = {
  key: 0,
  class: "flex flex-col gap-1"
}, ps = { class: "flex flex-col gap-2" }, ms = {
  key: 0,
  flex: "1 ~ justify-end gap-1.5",
  style: { "--context-color": "var(--colors-teal-DEFAULT)" }
}, vs = /* @__PURE__ */ I({
  __name: "AttributesSection",
  props: {
    attributes: {}
  },
  emits: ["updateAttribute"],
  setup(s) {
    return (e, t) => e.attributes?.size ? (b(), S("div", fs, [
      t[0] || (t[0] = p("h5", { class: "text-teal/80 m0 flex items-center gap-1" }, [
        p("div", { "i-hugeicons:leaf-01": "" }),
        p("span", null, "Attributes")
      ], -1)),
      p("div", ps, [
        (b(!0), S(q, null, Z(e.attributes, ([n, o]) => (b(), S("div", {
          key: n,
          class: "flex gap-2"
        }, [
          p("span", {
            class: O(["text-sm", { "op-50": o.active.length === 0 }])
          }, M(n), 3),
          o.all.length ? (b(), S("div", ms, [
            W(he, {
              "model-value": o.active,
              class: "flex flex-wrap gap-2",
              type: "checkbox",
              "justify-end": "",
              "onUpdate:modelValue": (l) => e.$emit("updateAttribute", n, l || [])
            }, {
              default: N(() => [
                (b(!0), S(q, null, Z(o.all, (l) => (b(), H(de, {
                  id: `attr-${n}-${l}`,
                  key: l,
                  "model-value": l,
                  label: l,
                  type: "checkbox",
                  shape: "round",
                  size: 3.8
                }, null, 8, ["id", "model-value", "label"]))), 128))
              ]),
              _: 2
            }, 1032, ["model-value", "onUpdate:modelValue"])
          ])) : V("", !0)
        ]))), 128))
      ])
    ])) : V("", !0);
  }
}), hs = {
  key: 0,
  class: "flex flex-wrap gap-1"
}, gs = /* @__PURE__ */ I({
  __name: "ClassListSection",
  props: {
    displayClasses: {},
    classList: {}
  },
  emits: ["update:classList"],
  setup(s) {
    return (e, t) => e.displayClasses.length ? (b(), S("div", hs, [
      t[1] || (t[1] = p("h5", { class: "text-sky/80 m0 flex items-center gap-1" }, [
        p("div", { "i-hugeicons:leaf-04": "" }),
        U(" Class List ")
      ], -1)),
      W(he, {
        class: "flex flex-wrap gap-2",
        "model-value": e.classList,
        type: "checkbox",
        style: { "--context-color": "var(--colors-sky-DEFAULT)" },
        "onUpdate:modelValue": t[0] || (t[0] = (n) => e.$emit("update:classList", n || []))
      }, {
        default: N(() => [
          (b(!0), S(q, null, Z(e.displayClasses, (n) => (b(), H(de, {
            id: `class-${n}`,
            key: n,
            "model-value": n,
            label: `.${n}`,
            type: "checkbox",
            size: 3.8
          }, null, 8, ["id", "model-value", "label"]))), 128))
        ]),
        _: 1
      }, 8, ["model-value"])
    ])) : V("", !0);
  }
}), ys = { class: "flex flex-col items-center justify-center py-8 text-center" }, xs = { class: "text-sm font-medium mb-1 text-white/72" }, bs = { class: "text-sm text-white/32 max-w-xs leading-relaxed m0" }, St = /* @__PURE__ */ I({
  __name: "Empty",
  props: {
    title: {},
    description: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (b(), S("div", ys, [
      p("div", {
        class: O(["text-5xl mb-4 text-orange-400/60", e.icon ?? "i-hugeicons:cheese-cake-01"])
      }, null, 2),
      p("h3", xs, M(e.title || "Empty"), 1),
      p("p", bs, M(e.description || "No data to display at the moment."), 1)
    ]));
  }
}), _s = { "p-3": "" }, ws = {
  key: 0,
  "my-2": "",
  divided: ""
}, $s = /* @__PURE__ */ I({
  __name: "ClassList",
  setup(s) {
    const { displayClasses: e, classList: t } = $t(), { attributes: n, updateAttribute: o } = ds();
    return (l, c) => (b(), S("div", _s, [
      F(e).length === 0 && F(n).size === 0 ? (b(), H(St, { key: 0 })) : (b(), S(q, { key: 1 }, [
        W(gs, {
          "display-classes": F(e),
          "class-list": F(t),
          "onUpdate:classList": c[0] || (c[0] = (f) => t.value = f)
        }, null, 8, ["display-classes", "class-list"]),
        F(n).size > 0 && F(e).length > 0 ? (b(), S("div", ws)) : V("", !0),
        W(vs, {
          attributes: F(n),
          onUpdateAttribute: F(o)
        }, null, 8, ["attributes", "onUpdateAttribute"])
      ], 64))
    ]));
  }
}), we = "default", De = "preflights", Ss = "shortcuts", Cs = "imports", ks = {
  [Cs]: -200,
  [De]: -100,
  [Ss]: -10,
  [we]: 0
}, As = /[\\:]?[\s'"`;{}]+/g;
function Ms(s) {
  return s.split(As);
}
const Es = {
  name: "@unocss/core/extractor-split",
  order: 0,
  extract({ code: s }) {
    return Ms(s);
  }
};
function G(s = []) {
  return Array.isArray(s) ? s : [s];
}
function oe(s) {
  return Array.from(new Set(s));
}
function it(s, e) {
  return s.reduce((t, n) => (t.findIndex((l) => e(n, l)) === -1 && t.push(n), t), []);
}
function Y(s) {
  return typeof s == "string";
}
class Ct extends Set {
  _map = /* @__PURE__ */ new Map();
  constructor(e) {
    if (super(), e)
      for (const t of e)
        this.add(t);
  }
  add(e) {
    return this._map.set(e, (this._map.get(e) ?? 0) + 1), super.add(e);
  }
  delete(e) {
    return this._map.has(e) ? (this._map.delete(e), super.delete(e)) : !1;
  }
  clear() {
    this._map.clear(), super.clear();
  }
  getCount(e) {
    return this._map.get(e) ?? 0;
  }
  setCount(e, t) {
    return this._map.set(e, t), super.add(e);
  }
}
function je(s) {
  return s instanceof Ct;
}
function Ts(s) {
  const e = s.length;
  let t = -1, n, o = "";
  const l = s.charCodeAt(0);
  for (; ++t < e; ) {
    if (n = s.charCodeAt(t), n === 0) {
      o += "�";
      continue;
    }
    if (n === 37) {
      o += "\\%";
      continue;
    }
    if (n === 44) {
      o += "\\,";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      n >= 1 && n <= 31 || n === 127 || t === 0 && n >= 48 && n <= 57 || t === 1 && n >= 48 && n <= 57 && l === 45
    ) {
      o += `\\${n.toString(16)} `;
      continue;
    }
    if (
      // If the character is the first character and is a `-` (U+002D), and
      // there is no second character, […]
      t === 0 && e === 1 && n === 45
    ) {
      o += `\\${s.charAt(t)}`;
      continue;
    }
    if (n >= 128 || n === 45 || n === 95 || n >= 48 && n <= 57 || n >= 65 && n <= 90 || n >= 97 && n <= 122) {
      o += s.charAt(t);
      continue;
    }
    o += `\\${s.charAt(t)}`;
  }
  return o;
}
const Oe = Ts;
function Ls() {
  return {
    events: {},
    emit(s, ...e) {
      (this.events[s] || []).forEach((t) => t(...e));
    },
    on(s, e) {
      return (this.events[s] = this.events[s] || []).push(e), () => this.events[s] = (this.events[s] || []).filter((t) => t !== e);
    }
  };
}
function Vs(s) {
  return typeof s == "function" ? { match: s } : s;
}
function rt(s) {
  return s.length === 3;
}
function We(s) {
  return s != null;
}
function Fs() {
}
class Rs {
  _map = /* @__PURE__ */ new Map();
  get(e, t) {
    const n = this._map.get(e);
    if (n)
      return n.get(t);
  }
  getFallback(e, t, n) {
    let o = this._map.get(e);
    return o || (o = /* @__PURE__ */ new Map(), this._map.set(e, o)), o.has(t) || o.set(t, n), o.get(t);
  }
  set(e, t, n) {
    let o = this._map.get(e);
    return o || (o = /* @__PURE__ */ new Map(), this._map.set(e, o)), o.set(t, n), this;
  }
  has(e, t) {
    return this._map.get(e)?.has(t);
  }
  delete(e, t) {
    return this._map.get(e)?.delete(t) || !1;
  }
  deleteTop(e) {
    return this._map.delete(e);
  }
  map(e) {
    return Array.from(this._map.entries()).flatMap(([t, n]) => Array.from(n.entries()).map(([o, l]) => e(l, t, o)));
  }
}
class js extends Map {
  getFallback(e, t) {
    const n = this.get(e);
    return n === void 0 ? (this.set(e, t), t) : n;
  }
  map(e) {
    const t = [];
    return this.forEach((n, o) => {
      t.push(e(n, o));
    }), t;
  }
  flatMap(e) {
    const t = [];
    return this.forEach((n, o) => {
      t.push(...e(n, o));
    }), t;
  }
}
function Ae(s) {
  return Y(s) ? s : (Array.isArray(s) ? s : Object.entries(s)).filter((e) => e[1] != null);
}
function Os(s) {
  return Array.isArray(s) ? s.find((e) => !Array.isArray(e) || Array.isArray(e[0])) ? s.map((e) => Ae(e)) : [s] : [Ae(s)];
}
function Ws(s) {
  return s.filter(([e, t], n) => {
    if (e.startsWith("$$"))
      return !1;
    for (let o = n - 1; o >= 0; o--)
      if (s[o][0] === e && s[o][1] === t)
        return !1;
    return !0;
  });
}
const kt = "__virtual_key__";
function Ie(s) {
  return s == null ? "" : Ws(s).map(([e, t]) => t != null && typeof t != "function" ? e !== kt ? `${e}:${t};` : t : void 0).filter(Boolean).join("");
}
function be(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function At(s, e, t = !1) {
  const n = s, o = e;
  if (Array.isArray(o))
    return t && Array.isArray(o) ? [...n, ...o] : [...o];
  const l = { ...n };
  return be(n) && be(o) && Object.keys(o).forEach((c) => {
    be(n[c]) && be(o[c]) || Array.isArray(n[c]) && Array.isArray(o[c]) ? l[c] = At(n[c], o[c], t) : Object.assign(l, { [c]: o[c] });
  }), l;
}
function $e(s) {
  let e, t, n;
  if (Array.isArray(s)) {
    for (t = Array.from({ length: e = s.length }); e--; ) t[e] = (n = s[e]) && typeof n == "object" ? $e(n) : n;
    return t;
  }
  if (Object.prototype.toString.call(s) === "[object Object]") {
    t = {};
    for (e in s)
      e === "__proto__" ? Object.defineProperty(t, e, {
        value: $e(s[e]),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : t[e] = (n = s[e]) && typeof n == "object" ? $e(n) : n;
    return t;
  }
  return s;
}
function Is(s) {
  return Y(s[0]);
}
function Bs(s) {
  return Y(s[0]);
}
const _e = {};
function Ns(s = ["-", ":"]) {
  const e = s.join("|");
  return _e[e] || (_e[e] = new RegExp(`((?:[!@<~\\w+:_-]|\\[&?>?:?\\S*\\])+?)(${e})\\(((?:[~!<>\\w\\s:/\\\\,%#.$?-]|\\[[^\\]]*?\\])+?)\\)(?!\\s*?=>)`, "gm")), _e[e].lastIndex = 0, _e[e];
}
function Ps(s, e = ["-", ":"], t = 5) {
  const n = Ns(e);
  let o, l = s.toString();
  const c = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
  do
    o = !1, l = l.replace(
      n,
      (i, a, d, u, h) => {
        if (!e.includes(d))
          return i;
        o = !0, c.add(a + d);
        const y = h + a.length + d.length + 1, m = { length: i.length, items: [] };
        f.set(h, m);
        for (const v of [...u.matchAll(/\S+/g)]) {
          const _ = y + v.index;
          let g = f.get(_)?.items;
          g ? f.delete(_) : g = [{
            offset: _,
            length: v[0].length,
            className: v[0]
          }];
          for (const x of g)
            x.className = x.className === "~" ? a : x.className.replace(/^(!?)(.*)/, `$1${a}${d}$2`), m.items.push(x);
        }
        return "$".repeat(i.length);
      }
    ), t -= 1;
  while (o && t);
  let r;
  if (typeof s == "string") {
    r = "";
    let i = 0;
    for (const [a, d] of f)
      r += s.slice(i, a), r += d.items.map((u) => u.className).join(" "), i = a + d.length;
    r += s.slice(i);
  } else {
    r = s;
    for (const [i, a] of f)
      r.overwrite(
        i,
        i + a.length,
        a.items.map((d) => d.className).join(" ")
      );
  }
  return {
    prefixes: Array.from(c),
    hasChanged: o,
    groupsByOffset: f,
    // Computed lazily because MagicString's toString does a lot of work
    get expanded() {
      return r.toString();
    }
  };
}
function Ds(s, e = ["-", ":"], t = 5) {
  const n = Ps(s, e, t);
  return typeof s == "string" ? n.expanded : s;
}
const at = /* @__PURE__ */ new Set();
function zs(s) {
  at.has(s) || (console.warn("[unocss]", s), at.add(s));
}
function Mt(s) {
  return G(s).flatMap((e) => Array.isArray(e) ? [e] : Object.entries(e));
}
const ut = "_uno_resolved";
async function Us(s) {
  let e = typeof s == "function" ? await s() : await s;
  if (ut in e)
    return e;
  e = { ...e }, Object.defineProperty(e, ut, {
    value: !0,
    enumerable: !1
  });
  const t = e.shortcuts ? Mt(e.shortcuts) : void 0;
  if (e.shortcuts = t, e.prefix || e.layer) {
    const n = (o) => {
      o[2] || (o[2] = {});
      const l = o[2];
      l.prefix == null && e.prefix && (l.prefix = G(e.prefix)), l.layer == null && e.layer && (l.layer = e.layer);
    };
    t?.forEach(n), e.rules?.forEach(n);
  }
  return e;
}
async function Et(s) {
  const e = await Us(s);
  if (!e.presets)
    return [e];
  const t = (await Promise.all((e.presets || []).flatMap(G).flatMap(Et))).flat();
  return [e, ...t];
}
function Hs(s) {
  if (s.length === 0)
    return {};
  const e = [], t = [];
  let n = !1;
  const o = [], l = [];
  for (const f of s) {
    if (f.pipeline === !1) {
      n = !0;
      break;
    } else
      f.pipeline?.include && e.push(f.pipeline.include), f.pipeline?.exclude && t.push(f.pipeline.exclude);
    f.filesystem && o.push(f.filesystem), f.inline && l.push(f.inline);
  }
  const c = {
    pipeline: n ? !1 : {
      include: oe(dt(...e)),
      exclude: oe(dt(...t))
    }
  };
  return o.length && (c.filesystem = oe(o.flat())), l.length && (c.inline = oe(l.flat())), c;
}
async function ct(s = {}, e = {}) {
  const t = Object.assign({}, e, s), n = it(
    (await Promise.all((t.presets || []).flatMap(G).flatMap(Et))).flat(),
    (k, L) => k.name === L.name
  ), o = [
    ...n.filter((k) => k.enforce === "pre"),
    ...n.filter((k) => !k.enforce),
    ...n.filter((k) => k.enforce === "post")
  ], l = [
    ...o,
    t
  ], c = [...l].reverse(), f = Object.assign({}, ks, ...l.map((k) => k.layers));
  function r(k) {
    return oe(l.flatMap((L) => G(L[k] || [])));
  }
  const i = r("extractors");
  let a = c.find((k) => k.extractorDefault !== void 0)?.extractorDefault;
  a === void 0 && (a = Es), a && !i.includes(a) && i.unshift(a), i.sort((k, L) => (k.order || 0) - (L.order || 0));
  const d = r("rules"), u = d.length, h = {}, y = [];
  for (const [k, L] of d.entries()) {
    const $ = L[2] ?? (L[2] = {});
    $.__index = k, Is(L) ? G($.prefix ?? "").forEach((w) => {
      h[w + L[0]] = L;
    }) : y.unshift(L);
  }
  const m = {
    templates: oe(l.flatMap((k) => G(k.autocomplete?.templates))),
    extractors: l.flatMap((k) => G(k.autocomplete?.extractors)).sort((k, L) => (k.order || 0) - (L.order || 0)),
    shorthands: Xs(l.map((k) => k.autocomplete?.shorthands || {}))
  };
  let v = r("separators");
  v.length || (v = [":", "-"]);
  const _ = r("content"), g = Hs(_), x = {
    mergeSelectors: !0,
    warn: !0,
    sortLayers: (k) => k,
    ...t,
    blocklist: r("blocklist"),
    presets: o,
    envMode: t.envMode || "build",
    shortcutsLayer: t.shortcutsLayer || "shortcuts",
    layers: f,
    theme: Ys(l.map((k) => k.theme)),
    rules: d,
    rulesSize: u,
    rulesDynamic: y,
    rulesStaticMap: h,
    preprocess: r("preprocess"),
    postprocess: r("postprocess"),
    preflights: r("preflights"),
    autocomplete: m,
    variants: r("variants").map(Vs).sort((k, L) => (k.order || 0) - (L.order || 0)),
    shortcuts: Mt(r("shortcuts")).reverse(),
    extractors: i,
    safelist: r("safelist"),
    separators: v,
    details: t.details ?? t.envMode === "dev",
    content: g,
    transformers: it(r("transformers"), (k, L) => k.name === L.name)
  }, A = r("extendTheme");
  for (const k of A)
    x.theme = k(x.theme, x) || x.theme;
  for (const k of l)
    k?.configResolved?.(x);
  return x;
}
function Ys(s) {
  return s.map((e) => e ? $e(e) : {}).reduce((e, t) => At(e, t), {});
}
function Xs(s) {
  return s.reduce((e, t) => {
    const n = {};
    for (const o in t) {
      const l = t[o];
      Array.isArray(l) ? n[o] = `(${l.join("|")})` : n[o] = l;
    }
    return {
      ...e,
      ...n
    };
  }, {});
}
function dt(...s) {
  return s.flatMap(Gs);
}
function Gs(s) {
  return Array.isArray(s) ? s : s ? [s] : [];
}
const qs = "66.5.1", ne = {
  shortcutsNoMerge: "$$symbol-shortcut-no-merge",
  noMerge: "$$symbol-no-merge",
  variants: "$$symbol-variants",
  parent: "$$symbol-parent",
  selector: "$$symbol-selector",
  layer: "$$symbol-layer",
  sort: "$$symbol-sort",
  body: "$$symbol-body"
};
class Ke {
  constructor(e = {}, t = {}) {
    this.userConfig = e, this.defaults = t;
  }
  version = qs;
  events = Ls();
  config = void 0;
  cache = /* @__PURE__ */ new Map();
  blocked = /* @__PURE__ */ new Set();
  parentOrders = /* @__PURE__ */ new Map();
  activatedRules = /* @__PURE__ */ new Set();
  static async create(e = {}, t = {}) {
    const n = new Ke(e, t);
    return n.config = await ct(n.userConfig, n.defaults), n.events.emit("config", n.config), n;
  }
  async setConfig(e, t) {
    e && (t && (this.defaults = t), this.userConfig = e, this.blocked.clear(), this.parentOrders.clear(), this.activatedRules.clear(), this.cache.clear(), this.config = await ct(e, this.defaults), this.events.emit("config", this.config));
  }
  async applyExtractors(e, t, n = /* @__PURE__ */ new Set()) {
    const o = {
      original: e,
      code: e,
      id: t,
      extracted: n,
      envMode: this.config.envMode
    };
    for (const l of this.config.extractors) {
      const c = await l.extract?.(o);
      if (c)
        if (je(c) && je(n))
          for (const f of c)
            n.setCount(f, n.getCount(f) + c.getCount(f));
        else
          for (const f of c)
            n.add(f);
    }
    return n;
  }
  makeContext(e, t) {
    const n = {
      rawSelector: e,
      currentSelector: t[1],
      theme: this.config.theme,
      generator: this,
      symbols: ne,
      variantHandlers: t[2],
      constructCSS: (...o) => this.constructCustomCSS(n, ...o),
      variantMatch: t
    };
    return n;
  }
  async parseToken(e, t) {
    if (this.blocked.has(e))
      return;
    const n = `${e}${t ? ` ${t}` : ""}`;
    if (this.cache.has(n))
      return this.cache.get(n);
    const o = this.config.preprocess.reduce((r, i) => i(r) ?? r, e);
    if (this.isBlocked(o)) {
      this.blocked.add(e), this.cache.set(n, null);
      return;
    }
    const l = await this.matchVariants(e, o);
    if (l.every((r) => !r || this.isBlocked(r[1]))) {
      this.blocked.add(e), this.cache.set(n, null);
      return;
    }
    const c = async (r) => {
      const i = this.makeContext(e, [t || r[0], r[1], r[2], r[3]]);
      this.config.details && (i.variants = [...r[3]]);
      const a = await this.expandShortcut(i.currentSelector, i);
      return a ? await this.stringifyShortcuts(i.variantMatch, i, a[0], a[1]) : (await this.parseUtil(i.variantMatch, i))?.map((u) => this.stringifyUtil(u, i)).filter(We);
    }, f = (await Promise.all(l.map((r) => c(r)))).flat().filter((r) => !!r);
    if (f?.length)
      return this.cache.set(n, f), f;
    this.cache.set(n, null);
  }
  async generate(e, t = {}) {
    const {
      id: n,
      scope: o,
      preflights: l = !0,
      safelist: c = !0,
      minify: f = !1,
      extendedInfo: r = !1
    } = t, i = Y(e) ? await this.applyExtractors(
      e,
      n,
      r ? new Ct() : /* @__PURE__ */ new Set()
    ) : Array.isArray(e) ? new Set(e) : e;
    if (c) {
      const $ = {
        generator: this,
        theme: this.config.theme
      };
      this.config.safelist.flatMap((C) => typeof C == "function" ? C($) : C).forEach((C) => {
        const w = C.trim();
        w && !i.has(w) && i.add(w);
      });
    }
    const a = f ? "" : `
`, d = /* @__PURE__ */ new Set([we]), u = r ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
    let y = {};
    const m = Array.from(i).map(async ($) => {
      if (u.has($))
        return;
      const C = await this.parseToken($);
      if (C != null) {
        u instanceof Map ? u.set($, {
          data: C,
          count: je(i) ? i.getCount($) : -1
        }) : u.add($);
        for (const w of C) {
          const E = w[3] || "", j = w[4]?.layer;
          h.has(E) || h.set(E, []), h.get(E).push(w), j && d.add(j);
        }
      }
    });
    await Promise.all(m), await (async () => {
      if (!l)
        return;
      const $ = {
        generator: this,
        theme: this.config.theme
      }, C = /* @__PURE__ */ new Set([]);
      this.config.preflights.forEach(({ layer: w = De }) => {
        d.add(w), C.add(w);
      }), y = Object.fromEntries(
        await Promise.all(Array.from(C).map(
          async (w) => {
            const j = (await Promise.all(
              this.config.preflights.filter((B) => (B.layer || De) === w).map(async (B) => await B.getCSS($))
            )).filter(Boolean).join(a);
            return [w, j];
          }
        ))
      );
    })();
    const v = this.config.sortLayers(Array.from(d).sort(($, C) => (this.config.layers[$] ?? 0) - (this.config.layers[C] ?? 0) || $.localeCompare(C))), _ = {}, g = this.config.outputToCssLayers, x = ($) => {
      let C = $;
      return typeof g == "object" && (C = g.cssLayerName?.($)), C === null ? null : C ?? $;
    }, A = ($ = we) => {
      if (_[$])
        return _[$];
      let C = Array.from(h).sort((j, B) => (this.parentOrders.get(j[0]) ?? 0) - (this.parentOrders.get(B[0]) ?? 0) || j[0]?.localeCompare(B[0] || "") || 0).map(([j, B]) => {
        const ye = B.length, le = B.filter((D) => (D[4]?.layer || we) === $).sort((D, Q) => D[0] - Q[0] || (D[4]?.sort || 0) - (Q[4]?.sort || 0) || D[5]?.currentSelector?.localeCompare(Q[5]?.currentSelector ?? "") || D[1]?.localeCompare(Q[1] || "") || D[2]?.localeCompare(Q[2] || "") || 0).map(([, D, Q, , xe, , Le]) => [
          [[(D && Qs(D, o)) ?? "", xe?.sort ?? 0]],
          Q,
          !!(Le ?? xe?.noMerge)
        ]);
        if (!le.length)
          return;
        const ie = le.reverse().map(([D, Q, xe], Le) => {
          if (!xe && this.config.mergeSelectors)
            for (let ue = Le + 1; ue < ye; ue++) {
              const te = le[ue];
              if (te && !te[2] && (D && te[0] || D == null && te[0] == null) && te[1] === Q)
                return D && te[0] && te[0].push(...D), null;
            }
          const Ve = D ? oe(D.sort((ue, te) => ue[1] - te[1] || ue[0]?.localeCompare(te[0] || "") || 0).map((ue) => ue[0]).filter(Boolean)) : [];
          return Ve.length ? `${Ve.join(`,${a}`)}{${Q}}` : Q;
        }).filter(Boolean), re = Array.from(new Set(ie)).reverse().join(a);
        if (!j)
          return re;
        const ae = j.split(" $$ ");
        return `${ae.join("{")}{${a}${re}${a}${"}".repeat(ae.length)}`;
      }).filter(Boolean).join(a);
      l && (C = [y[$], C].filter(Boolean).join(a));
      let w;
      g && C && (w = x($), w !== null && (C = `@layer ${w}{${a}${C}${a}}`));
      const E = f ? "" : `/* layer: ${$}${w && w !== $ ? `, alias: ${w}` : ""} */${a}`;
      return _[$] = C ? E + C : "";
    }, k = ($ = v, C) => {
      const w = $.filter((E) => !C?.includes(E));
      return [
        g && w.length > 0 ? `@layer ${w.map(x).filter(We).join(", ")};` : void 0,
        ...w.map((E) => A(E) || "")
      ].filter(Boolean).join(a);
    };
    return {
      get css() {
        return k();
      },
      layers: v,
      matched: u,
      getLayers: k,
      getLayer: A,
      setLayer: async ($, C) => {
        const w = await C(A($));
        return _[$] = w, w;
      }
    };
  }
  async matchVariants(e, t) {
    const n = {
      rawSelector: e,
      theme: this.config.theme,
      generator: this
    }, o = async (l) => {
      let c = !0;
      const [, , f, r] = l;
      for (; c; ) {
        c = !1;
        const i = l[1];
        for (const a of this.config.variants) {
          if (!a.multiPass && r.has(a))
            continue;
          let d = await a.match(i, n);
          if (d) {
            if (Y(d)) {
              if (d === i)
                continue;
              d = { matcher: d };
            }
            if (Array.isArray(d)) {
              if (!d.length)
                continue;
              if (d.length === 1)
                d = d[0];
              else {
                if (a.multiPass)
                  throw new Error("multiPass can not be used together with array return variants");
                const u = d.map((h) => {
                  const y = h.matcher ?? i, m = [h, ...f], v = new Set(r);
                  return v.add(a), [l[0], y, m, v];
                });
                return (await Promise.all(u.map((h) => o(h)))).flat();
              }
            }
            l[1] = d.matcher ?? i, f.unshift(d), r.add(a), c = !0;
            break;
          }
        }
        if (!c)
          break;
        if (f.length > 500)
          throw new Error(`Too many variants applied to "${e}"`);
      }
      return [l];
    };
    return await o([
      e,
      t || e,
      [],
      /* @__PURE__ */ new Set()
    ]);
  }
  applyVariants(e, t = e[4], n = e[1]) {
    const l = t.slice().sort((i, a) => (i.order || 0) - (a.order || 0)).reduceRight(
      (i, a) => (d) => {
        const u = a.body?.(d.entries) || d.entries, h = Array.isArray(a.parent) ? a.parent : [a.parent, void 0], y = a.selector?.(d.selector, u);
        return (a.handle ?? eo)({
          ...d,
          entries: u,
          selector: y || d.selector,
          parent: h[0] || d.parent,
          parentOrder: h[1] || d.parentOrder,
          layer: a.layer || d.layer,
          sort: a.sort || d.sort
        }, i);
      },
      (i) => i
    )({
      prefix: "",
      selector: Zs(n),
      pseudo: "",
      entries: e[2]
    }), { parent: c, parentOrder: f } = l;
    c != null && f != null && this.parentOrders.set(c, f);
    const r = {
      selector: [
        l.prefix,
        l.selector,
        l.pseudo
      ].join(""),
      entries: l.entries,
      parent: c,
      layer: l.layer,
      sort: l.sort,
      noMerge: l.noMerge
    };
    for (const i of this.config.postprocess)
      i(r);
    return r;
  }
  constructCustomCSS(e, t, n) {
    const o = Ae(t);
    if (Y(o))
      return o;
    const { selector: l, entries: c, parent: f } = this.applyVariants([0, n || e.rawSelector, o, void 0, e.variantHandlers]), r = `${l}{${Ie(c)}}`;
    return f ? `${f}{${r}}` : r;
  }
  async parseUtil(e, t, n = !1, o) {
    const l = Y(e) ? await this.matchVariants(e) : [e], c = async ([r, i, a]) => {
      this.config.details && (t.rules = t.rules ?? []);
      const d = {
        ...t,
        variantHandlers: a
      }, u = this.config.rulesStaticMap[i];
      if (u && u[1] && (n || !u[2]?.internal))
        return this.resolveCSSResult(r, u[1], u, d);
      for (const h of this.config.rulesDynamic) {
        const [y, m, v] = h;
        if (v?.internal && !n)
          continue;
        let _ = i;
        if (v?.prefix) {
          const k = G(v.prefix);
          if (o) {
            const L = G(o);
            if (!k.some(($) => L.includes($)))
              continue;
          } else {
            const L = k.find(($) => i.startsWith($));
            if (L == null)
              continue;
            _ = i.slice(L.length);
          }
        }
        const g = _.match(y);
        if (!g)
          continue;
        let x = await m(g, d);
        if (!x)
          continue;
        if (typeof x != "string")
          if (Symbol.asyncIterator in x) {
            const k = [];
            for await (const L of x)
              L && k.push(L);
            x = k;
          } else Symbol.iterator in x && !Array.isArray(x) && (x = Array.from(x).filter(We));
        const A = this.resolveCSSResult(r, x, h, d);
        if (A)
          return A;
      }
    }, f = (await Promise.all(l.map((r) => c(r)))).flat().filter((r) => !!r);
    if (f.length)
      return f;
  }
  resolveCSSResult = (e, t, n, o) => {
    const l = Os(t).filter((c) => c.length);
    if (l.length) {
      this.config.details && o.rules.push(n), o.generator.activatedRules.add(n);
      const c = n[2];
      return l.map((f) => {
        if (Y(f))
          return [c.__index, f, c];
        let r = o.variantHandlers, i = c;
        for (const a of f)
          a[0] === ne.variants ? typeof a[1] == "function" ? r = a[1](r) || r : r = [
            ...G(a[1]),
            ...r
          ] : a[0] === ne.parent ? r = [
            { parent: a[1] },
            ...r
          ] : a[0] === ne.selector ? r = [
            { selector: a[1] },
            ...r
          ] : a[0] === ne.layer ? r = [
            { layer: a[1] },
            ...r
          ] : a[0] === ne.sort ? i = {
            ...i,
            sort: a[1]
          } : a[0] === ne.noMerge ? i = {
            ...i,
            noMerge: a[1]
          } : a[0] === ne.body && (a[0] = kt);
        return [c.__index, e, f, i, r];
      });
    }
  };
  stringifyUtil(e, t) {
    if (!e)
      return;
    if (rt(e))
      return [e[0], void 0, e[1], void 0, e[2], this.config.details ? t : void 0, void 0];
    const {
      selector: n,
      entries: o,
      parent: l,
      layer: c,
      sort: f,
      noMerge: r
    } = this.applyVariants(e), i = Ie(o);
    if (!i)
      return;
    const { layer: a, sort: d, ...u } = e[3] ?? {}, h = {
      ...u,
      layer: c ?? a,
      sort: f ?? d
    };
    return [e[0], n, i, l, h, this.config.details ? t : void 0, r];
  }
  async expandShortcut(e, t, n = 5) {
    if (n === 0)
      return;
    const o = this.config.details ? (i) => {
      t.shortcuts = t.shortcuts ?? [], t.shortcuts.push(i);
    } : Fs;
    let l, c, f, r;
    for (const i of this.config.shortcuts) {
      let a = e;
      if (i[2]?.prefix) {
        const u = G(i[2].prefix).find((h) => e.startsWith(h));
        if (u == null)
          continue;
        a = e.slice(u.length);
      }
      if (Bs(i)) {
        if (i[0] === a) {
          l = l || i[2], c = i[1], o(i);
          break;
        }
      } else {
        const d = a.match(i[0]);
        if (d && (c = i[1](d, t)), c) {
          l = l || i[2], o(i);
          break;
        }
      }
    }
    if (c && (f = oe(G(c).filter(Y).map((i) => Ds(i.trim()).split(/\s+/g)).flat()), r = G(c).filter((i) => !Y(i)).map((i) => ({ handles: [], value: i }))), !c) {
      const i = Y(e) ? await this.matchVariants(e) : [e];
      for (const a of i) {
        const [d, u, h] = a;
        if (d !== u) {
          const y = await this.expandShortcut(u, t, n - 1);
          y && (f = y[0].filter(Y).map((m) => d.replace(u, m)), r = y[0].filter((m) => !Y(m)).map((m) => ({ handles: [...m.handles, ...h], value: m.value })));
        }
      }
    }
    if (!(!f?.length && !r?.length))
      return [
        [
          await Promise.all(G(f).map(async (i) => (await this.expandShortcut(i, t, n - 1))?.[0] || [i])),
          r
        ].flat(2).filter((i) => !!i),
        l
      ];
  }
  async stringifyShortcuts(e, t, n, o = { layer: this.config.shortcutsLayer }) {
    const l = new js(), c = (await Promise.all(oe(n).map(async (a) => {
      const d = Y(a) ? await this.parseUtil(a, t, !0, o.prefix) : [[Number.POSITIVE_INFINITY, "{inline}", Ae(a.value), void 0, a.handles]];
      return !d && this.config.warn && zs(`unmatched utility "${a}" in shortcut "${e[1]}"`), d || [];
    }))).flat(1).filter(Boolean).sort((a, d) => a[0] - d[0]), [f, , r] = e, i = [];
    for (const a of c) {
      if (rt(a)) {
        i.push([a[0], void 0, a[1], void 0, a[2], t, void 0]);
        continue;
      }
      const { selector: d, entries: u, parent: h, sort: y, noMerge: m, layer: v } = this.applyVariants(a, [...a[4], ...r], f);
      l.getFallback(v ?? o.layer, new Rs()).getFallback(d, h, [[], a[0]])[0].push([u, !!(m ?? a[3]?.noMerge), y ?? 0]);
    }
    return i.concat(l.flatMap(
      (a, d) => a.map(([u, h], y, m) => {
        const v = (g, x, A) => {
          const k = Math.max(...A.map(($) => $[1])), L = A.map(($) => $[0]);
          return (g ? [L.flat(1)] : L).map(($) => {
            const C = Ie($);
            if (C)
              return [h, y, C, m, { ...o, noMerge: x, sort: k, layer: d }, t, void 0];
          });
        };
        return [
          [u.filter(([, g]) => g).map(([g, , x]) => [g, x]), !0],
          [u.filter(([, g]) => !g).map(([g, , x]) => [g, x]), !1]
        ].map(([g, x]) => [
          ...v(!1, x, g.filter(([A]) => A.some((k) => k[0] === ne.shortcutsNoMerge))),
          ...v(!0, x, g.filter(([A]) => A.every((k) => k[0] !== ne.shortcutsNoMerge)))
        ]);
      }).flat(2).filter(Boolean)
    ));
  }
  isBlocked(e) {
    return !e || this.config.blocklist.map((t) => Array.isArray(t) ? t[0] : t).some((t) => typeof t == "function" ? t(e) : Y(t) ? t === e : t.test(e));
  }
  getBlocked(e) {
    const t = this.config.blocklist.find((n) => {
      const o = Array.isArray(n) ? n[0] : n;
      return typeof o == "function" ? o(e) : Y(o) ? o === e : o.test(e);
    });
    return t ? Array.isArray(t) ? t : [t, void 0] : void 0;
  }
}
async function Ks(s, e) {
  return await Ke.create(s, e);
}
const Tt = /\s\$\$\s+/g;
function Js(s) {
  return Tt.test(s);
}
function Qs(s, e) {
  return Js(s) ? s.replace(Tt, e ? ` ${e} ` : " ") : e ? `${e} ${s}` : s;
}
const ft = /^\[(.+?)(~?=)"(.*)"\]$/;
function Zs(s) {
  return ft.test(s) ? s.replace(ft, (e, t, n, o) => `[${Oe(t)}${n}"${Oe(o)}"]`) : `.${Oe(s)}`;
}
function eo(s, e) {
  return e(s);
}
const to = T({});
function Sl() {
  return {
    uno: on(async () => await Ks(to.value))
  };
}
const no = ["onClick", "onMouseenter"], so = { class: "flex-1 of-hidden whitespace-nowrap text-xs cursor-pointer select-none" }, oo = {
  key: 0,
  class: "text-yellow-400 op-72 text-2.75 ml-1"
}, lo = ["onClick"], io = /* @__PURE__ */ I({
  __name: "Tree",
  props: {
    elements: {},
    depth: { default: 0 },
    elFilter: {},
    checkedElement: {},
    onHover: {}
  },
  emits: ["change"],
  setup(s, { emit: e }) {
    const t = s, n = e;
    function o(i) {
      t.onHover?.(i);
    }
    const l = T(/* @__PURE__ */ new Map());
    function c(i) {
      return Array.from(i.children).filter((a) => !t.elFilter || !t.elFilter(a));
    }
    function f(i) {
      const a = l.value.get(i) ?? !0;
      l.value.set(i, !a);
    }
    function r(i) {
      return l.value.get(i) ?? !0;
    }
    return (i, a) => {
      const d = Bt("Tree", !0);
      return b(), S("div", null, [
        (b(!0), S(q, null, Z(i.elements, (u) => (b(), S("div", {
          key: u,
          style: se({ paddingLeft: `${t.depth * 2}px` }),
          class: ""
        }, [
          p("div", {
            class: O(["flex items-center gap-1 w-full hover:bg-white/10 px-1.5 py-1 my-1 group rounded-sm", { "important:bg-white/10": i.checkedElement === u }]),
            onClick: (h) => c(u).length > 0 && f(u),
            onMouseenter: (h) => o(u),
            onMouseleave: a[0] || (a[0] = (h) => o(null))
          }, [
            c(u).length > 0 ? (b(), S("div", {
              key: 0,
              class: O(["text-xs transition-transform duration-200", r(u) ? "rotate-0" : "-rotate-90"]),
              "i-hugeicons:arrow-down-01": ""
            }, null, 2)) : V("", !0),
            p("div", so, [
              p("span", {
                class: O([F(kn)(u.tagName.toLowerCase()), i.checkedElement === u ? "fw-bold" : ""])
              }, M(u.tagName.toLowerCase()), 3),
              u.id ? (b(), S("span", oo, "#" + M(u.id), 1)) : V("", !0),
              p("span", {
                class: O(["group-hover:op-100 op-0", { "op-100!": i.checkedElement === u }])
              }, [
                (b(!0), S(q, null, Z(Array.from(u.classList), (h) => (b(), S("span", {
                  key: h,
                  class: "text-green-400 op-72 text-2.75 ml-1"
                }, "." + M(h), 1))), 128))
              ], 2)
            ]),
            p("div", {
              class: O(["ml-1 h-4 flex items-center op-0 group-hover:op-100", { "op-100!": i.checkedElement === u }]),
              onClick: pe((h) => n("change", u), ["stop"])
            }, [
              W(de, {
                type: "radio",
                shape: "round",
                size: 3,
                style: { "--context-color": "var(--colors-purple-DEFAULT)" },
                "model-value": i.checkedElement === u
              }, null, 8, ["model-value"])
            ], 10, lo)
          ], 42, no),
          c(u).length > 0 && r(u) ? (b(), H(d, {
            key: 0,
            elements: c(u),
            depth: i.depth + 1,
            "el-filter": i.elFilter,
            "checked-element": i.checkedElement,
            "on-hover": i.onHover,
            onChange: a[1] || (a[1] = (h) => n("change", h))
          }, null, 8, ["elements", "depth", "el-filter", "checked-element", "on-hover"])) : V("", !0)
        ], 4))), 128))
      ]);
    };
  }
}), ro = {
  "p-2": "",
  "h-60": "",
  "of-y-auto": "",
  "no-scrollbar": ""
}, ao = /* @__PURE__ */ I({
  __name: "DomTree",
  setup(s) {
    const { element: e } = ee(), t = T([]);
    function n(r) {
      return !!(["style", "script", "link", "meta", "title", "noscript", "template"].includes(r.tagName.toLowerCase()) || Array.from(r.classList).some((i) => i.startsWith("uno-inspect")) || getComputedStyle(r).pointerEvents === "none");
    }
    const o = T(!1), l = T(e.value), c = /* @__PURE__ */ en((r) => {
      r ? e.value = r : e.value = l.value, o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 100);
    }, 150);
    function f(r) {
      l.value = r, e.value = r, o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 100);
    }
    return ve(() => {
      t.value = Array.from(document.body.children).filter((r) => !n(r));
    }), P(e, (r) => {
      o.value || (l.value = r);
    }), (r, i) => (b(), S("div", ro, [
      W(io, {
        elements: t.value,
        "checked-element": l.value,
        "on-hover": F(c),
        onChange: f
      }, null, 8, ["elements", "checked-element", "on-hover"])
    ]));
  }
}), uo = {
  m0: "",
  "mb-2": "",
  flex: "~ items-center justify-between"
}, co = { flex: "~ items-center gap-1" }, Je = /* @__PURE__ */ I({
  __name: "PanelTitle",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (b(), S("h5", uo, [
      p("div", co, [
        e.icon ? (b(), S("div", {
          key: 0,
          class: O(e.icon)
        }, null, 2)) : V("", !0),
        p("span", null, M(e.title), 1)
      ]),
      me(e.$slots, "default")
    ]));
  }
}), fo = {
  "p-3": "",
  "no-scrollbar": ""
}, po = {
  flex: "~ items-center gap-2",
  "flex-1": ""
}, mo = {
  key: 0,
  class: "text-sky-300 px-2.1 py-1.5 text-xs flex-[0_0_35%] select-none decoration-line-through"
}, vo = {
  key: 2,
  class: "text-white/80 px-2.1 py-1.5 text-xs flex-1 select-none decoration-line-through"
}, pt = /* @__PURE__ */ I({
  __name: "InlineStyles",
  setup(s) {
    const { element: e, tracking: t } = ee(), n = T([]), o = R(() => {
      const r = {};
      return n.value.forEach((i) => {
        r[i] = !0;
      }), r;
    }), l = R(() => {
      t();
      const r = {};
      if (!e.value)
        return r;
      const i = e.value;
      if (i.style.length > 0) {
        const a = i.__vnode;
        if (a)
          for (const [d, u] of Object.entries(a.props?.style || {}))
            r[d] = u;
        else
          for (let d = 0; d < i.style.length; d++) {
            const u = i.style.item(d);
            r[u] = i.style.getPropertyValue(u);
          }
      }
      return r;
    });
    P(l, (r) => {
      const i = Object.keys(r);
      n.value = i;
    }, { immediate: !0 }), P(n, (r, i) => {
      if (!e.value)
        return;
      const a = e.value, d = Object.keys(l.value);
      r.forEach((u) => {
        if (!i?.includes(u)) {
          const h = l.value[u];
          h && a.style.setProperty(u, h);
        }
      }), d.forEach((u) => {
        !r.includes(u) && i?.includes(u) && a.style.removeProperty(u);
      });
    }, { deep: !0 });
    function c(r, i) {
      if (!e.value || !i.trim() || r === i || !o.value[r])
        return;
      const a = e.value, d = l.value[r];
      a.style.removeProperty(r), d && a.style.setProperty(i, d);
      const u = [...n.value], h = u.indexOf(r);
      h !== -1 && (u[h] = i, n.value = u);
    }
    function f(r, i) {
      if (!e.value || !r || !o.value[r])
        return;
      const a = e.value;
      if (i.trim())
        a.style.setProperty(r, i);
      else {
        a.style.removeProperty(r);
        const d = n.value.indexOf(r);
        d !== -1 && n.value.splice(d, 1);
      }
    }
    return (r, i) => (b(), S("div", fo, [
      W(Je, {
        title: "Styles",
        icon: "i-hugeicons:drawing-mode"
      }),
      Object.keys(l.value).length > 0 ? (b(), H(he, {
        key: 0,
        modelValue: n.value,
        "onUpdate:modelValue": i[0] || (i[0] = (a) => n.value = a),
        type: "checkbox",
        class: "space-y-1.5"
      }, {
        default: N(() => [
          (b(!0), S(q, null, Z(l.value, (a, d) => (b(), S("div", {
            key: `inline-${d}`,
            class: O(["flex items-center group w-full", { "op-50": !o.value[d] }])
          }, [
            W(de, {
              style: { "--context-color": "var(--colors-purple-DEFAULT)" },
              shape: "round",
              type: "checkbox",
              size: 3.4,
              "model-value": d,
              class: "group-hover:opacity-100 opacity-0 transition-opacity duration-200"
            }, null, 8, ["model-value"]),
            p("div", po, [
              o.value[d] ? (b(), H(ce, {
                key: 1,
                class: "flex-[0_0_35%]",
                "model-value": d,
                borderable: !1,
                inputable: "",
                placeholder: "Property",
                "input-class": "text-sky-300",
                "onUpdate:modelValue": (u) => c(d, String(u))
              }, null, 8, ["model-value", "onUpdate:modelValue"])) : (b(), S("div", mo, M(d), 1)),
              i[1] || (i[1] = p("span", { class: "text-white/50 text-xs" }, ":", -1)),
              o.value[d] ? (b(), H(ce, {
                key: 3,
                "model-value": a,
                "flex-1": "",
                borderable: !1,
                inputable: "",
                placeholder: "Value",
                "input-class": "text-white/80",
                "onUpdate:modelValue": (u) => f(d, String(u))
              }, null, 8, ["model-value", "onUpdate:modelValue"])) : (b(), S("div", vo, M(a), 1))
            ])
          ], 2))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])) : (b(), H(St, { key: 1 }))
    ]));
  }
}), ho = [
  // 1st row
  {
    id: "top-left",
    icon: "i-hugeicons:text-align-justify-left",
    label: "Align Top Left",
    class: "justify-start items-start"
  },
  {
    id: "top-center",
    icon: "i-hugeicons:text-align-center rotate-180",
    label: "Align Top Center",
    class: "justify-center items-start"
  },
  {
    id: "top-right",
    icon: "i-hugeicons:text-align-justify-right",
    label: "Align Top Right",
    class: "justify-end items-start"
  },
  //  2nd row
  {
    id: "center-left",
    icon: "i-hugeicons:text-align-justify-left",
    label: "Align Center Left",
    class: "justify-start items-center"
  },
  {
    id: "center-center",
    icon: "i-hugeicons:text-align-center rotate-180",
    label: "Align Center Center",
    class: "justify-center items-center"
  },
  {
    id: "center-right",
    icon: "i-hugeicons:text-align-justify-right",
    label: "Align Center Right",
    class: "justify-end items-center"
  },
  // 3rd row
  {
    id: "bottom-left",
    icon: "i-hugeicons:text-align-justify-left",
    label: "Align Bottom Left",
    class: "justify-start items-end"
  },
  {
    id: "bottom-center",
    icon: "i-hugeicons:text-align-center rotate-180",
    label: "Align Bottom Center",
    class: "justify-center items-end"
  },
  {
    id: "bottom-right",
    icon: "i-hugeicons:text-align-justify-right",
    label: "Align Bottom Right",
    class: "justify-end items-end"
  }
], go = [
  // 1st row
  {
    id: "top-left",
    icon: "i-hugeicons:text-align-left",
    label: "Align Top Left",
    class: "justify-start items-start"
  },
  {
    id: "top-center",
    icon: "i-hugeicons:text-align-center",
    label: "Align Top Center",
    class: "justify-start items-center"
  },
  {
    id: "top-right",
    icon: "i-hugeicons:text-align-right",
    label: "Align Top Right",
    class: "justify-start items-end"
  },
  //  2nd row
  {
    id: "center-left",
    icon: "i-hugeicons:text-align-left",
    label: "Align Center Left",
    class: "justify-center items-start"
  },
  {
    id: "center-center",
    icon: "i-hugeicons:text-align-center",
    label: "Align Center Center",
    class: "justify-center items-center"
  },
  {
    id: "center-right",
    icon: "i-hugeicons:text-align-right",
    label: "Align Center Right",
    class: "justify-center items-end"
  },
  // 3rd row
  {
    id: "bottom-left",
    icon: "i-hugeicons:text-align-left",
    label: "Align Bottom Left",
    class: "justify-end items-start"
  },
  {
    id: "bottom-center",
    icon: "i-hugeicons:text-align-center",
    label: "Align Bottom Center",
    class: "justify-end items-center"
  },
  {
    id: "bottom-right",
    icon: "i-hugeicons:text-align-right",
    label: "Align Bottom Right",
    class: "justify-end items-end"
  }
], Be = [
  { value: "auto", label: "Auto" },
  { value: "0", label: "0" },
  { value: "0.5", label: "0.5", desc: "2px" },
  { value: "1", label: "1", desc: "4px" },
  { value: "2", label: "2", desc: "8px" },
  { value: "3", label: "3", desc: "12px" },
  { value: "4", label: "4", desc: "16px" },
  { value: "6", label: "6", desc: "24px" },
  { value: "8", label: "8", desc: "32px" },
  { value: "12", label: "12", desc: "48px" },
  { value: "24", label: "24", desc: "96px" }
], yo = {
  "text-xs": "",
  flex: "~ items-center gap-2",
  "w-full": ""
}, xo = { class: "flex-1" }, bo = {
  key: 0,
  "op-50": ""
}, _o = {
  flex: "~ items-center gap-1",
  "text-sm": ""
}, wo = { "flex-1": "" }, $o = {
  key: 0,
  "op-50": ""
}, So = {
  flex: "~ items-center gap-1",
  "text-sm": ""
}, Qe = /* @__PURE__ */ I({
  __name: "WH",
  setup(s) {
    const { element: e, tracking: t, triggering: n } = ee(), o = T(!1), l = T(!1), c = T(1);
    function f(m) {
      if (!m)
        return { num: 0, unit: "px" };
      const v = m.match(/^([\d.]+)(px|rem|%)$/);
      return v ? { num: Number.parseFloat(v[1]), unit: v[2] } : { num: Number.parseFloat(m) || 0, unit: "px" };
    }
    function r(m, v) {
      return v === "%" ? `${m}%` : `${m}${v}`;
    }
    const i = R({
      get: () => {
        if (!e.value)
          return "";
        t();
        let m = e.value.style.width;
        if ((!m || m === "") && (m = window.getComputedStyle(e.value).width, m === "auto" || Number.parseFloat(m) > 9999) || !m || m === "0px")
          return "";
        if (m === "auto")
          return "auto";
        if (m.includes("%"))
          return m;
        const { num: v, unit: _ } = f(m);
        return o.value && _ === "px" ? String(nt(v)) : !o.value && _ === "rem" ? String(st(v)) : J(v);
      },
      set: (m) => {
        if (e.value && m) {
          if (m === "auto" || String(m).includes("%")) {
            e.value.style.width = String(m), n();
            return;
          }
          const v = Number.parseFloat(String(m));
          if (Number.isNaN(v))
            return;
          const _ = o.value ? "rem" : "px", g = `${v}${_}`, x = e.value.style.height;
          if (e.value.style.width = g, l.value && g !== "auto" && x && x !== "auto") {
            const { num: A } = f(g), k = A / c.value, { unit: L } = f(x);
            e.value.style.height = r(k, L);
          }
          n();
        }
      }
    }), a = R({
      get: () => {
        if (!e.value)
          return "";
        t();
        let m = e.value.style.height;
        if ((!m || m === "") && (m = window.getComputedStyle(e.value).height, m === "auto" || Number.parseFloat(m) > 9999) || !m || m === "0px")
          return "";
        if (m === "auto")
          return "auto";
        if (m.includes("%"))
          return m;
        const { num: v, unit: _ } = f(m);
        return o.value && _ === "px" ? String(nt(v)) : !o.value && _ === "rem" ? String(st(v)) : J(v);
      },
      set: (m) => {
        if (e.value && m) {
          if (m === "auto" || String(m).includes("%")) {
            e.value.style.height = String(m), n();
            return;
          }
          const v = Number.parseFloat(String(m));
          if (Number.isNaN(v))
            return;
          const _ = o.value ? "rem" : "px", g = `${v}${_}`, x = e.value.style.width;
          if (e.value.style.height = g, l.value && g !== "auto" && x && x !== "auto") {
            const { num: A } = f(g), k = A * c.value, { unit: L } = f(x);
            e.value.style.width = r(k, L);
          }
          n();
        }
      }
    });
    P([i, a], ([m, v]) => {
      if (m && v && m !== "auto" && v !== "auto" && !String(m).includes("%") && !String(v).includes("%")) {
        const _ = Number.parseFloat(String(m)), g = Number.parseFloat(String(v));
        _ > 0 && g > 0 && (c.value = _ / g);
      }
    }, { immediate: !0 }), P(o, () => {
      n();
    });
    function d() {
      o.value = !o.value;
    }
    function u() {
      if (e.value) {
        const m = e.value.style.width;
        e.value.style.width = e.value.style.height, e.value.style.height = m, n();
      }
    }
    function h() {
      if (l.value = !l.value, l.value) {
        const m = e.value?.style.width, v = e.value?.style.height;
        if (m && v && m !== "auto" && v !== "auto") {
          const _ = f(m).num, g = f(v).num;
          _ > 0 && g > 0 && (c.value = _ / g);
        }
      }
    }
    const y = [
      { label: "Auto", value: "auto" },
      { label: "Full (100%)", value: "100%" },
      { label: "12", value: "12" },
      { label: "24", value: "24" },
      { label: "36", value: "36" },
      { label: "48", value: "48" },
      { label: "64", value: "64" },
      { label: "72", value: "72" },
      { label: "96", value: "96" },
      { label: "120", value: "120" },
      { label: "150", value: "150" },
      { label: "200", value: "200" },
      { label: "300", value: "300" }
    ];
    return (m, v) => (b(), S("div", yo, [
      p("div", xo, [
        W(ce, {
          modelValue: i.value,
          "onUpdate:modelValue": v[0] || (v[0] = (_) => i.value = _),
          options: y,
          placeholder: "Width...",
          inputable: ""
        }, {
          prefix: N(() => [...v[2] || (v[2] = [
            p("span", { "op-50": "" }, "W", -1)
          ])]),
          suffix: N(() => [
            i.value && i.value !== "auto" && !String(i.value).includes("%") ? (b(), S("span", bo, M(o.value ? "rem" : "px"), 1)) : V("", !0)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", _o, [
        p("div", {
          "i-hugeicons:exchange-01": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          class: O({ "op-100": o.value }),
          onClick: d
        }, null, 2),
        p("div", {
          "i-hugeicons:arrow-data-transfer-horizontal": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          onClick: u
        })
      ]),
      p("div", wo, [
        W(ce, {
          modelValue: a.value,
          "onUpdate:modelValue": v[1] || (v[1] = (_) => a.value = _),
          options: y,
          placeholder: "Height...",
          inputable: ""
        }, {
          prefix: N(() => [...v[3] || (v[3] = [
            p("span", { "op-50": "" }, "H", -1)
          ])]),
          suffix: N(() => [
            a.value && a.value !== "auto" && !String(a.value).includes("%") ? (b(), S("span", $o, M(o.value ? "rem" : "px"), 1)) : V("", !0)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", So, [
        p("div", {
          "i-hugeicons:connect": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          class: O({ "op-100! text-blue-500": l.value }),
          onClick: h
        }, null, 2)
      ])
    ]));
  }
}), Co = { class: "space-y-2" }, ko = { flex: "~ gap-2" }, Ao = {
  "flex-1": "",
  class: "b b-solid b-white/10 grid grid-cols-3 grid-gap-0.5 rd-md p-1 text-xs h-17"
}, Mo = ["title", "onClick"], Eo = { flex: "1 ~ col gap-2" }, Lt = /* @__PURE__ */ I({
  __name: "FlexLayout",
  props: {
    direction: {},
    wrap: { type: Boolean, default: !1 }
  },
  setup(s) {
    const e = s, { classList: t } = $t(), n = T(null), o = T("auto"), l = T("auto"), c = T("auto"), f = R(() => e.direction === "row" ? ho : go), r = R(() => e.direction === "row" && e.wrap), i = R(() => {
      const _ = t.value;
      for (const g of f.value)
        if (g.class.split(" ").every((A) => _.includes(A)))
          return g.id;
      return null;
    }), a = R(() => {
      const g = t.value.find((x) => x.startsWith("gap-") && !x.startsWith("gap-x-") && !x.startsWith("gap-y-"));
      return g ? g.replace("gap-", "") : "auto";
    }), d = R(() => {
      const g = t.value.find((x) => x.startsWith("gap-x-"));
      return g ? g.replace("gap-x-", "") : "auto";
    }), u = R(() => {
      const g = t.value.find((x) => x.startsWith("gap-y-"));
      return g ? g.replace("gap-y-", "") : "auto";
    });
    P(i, (_) => {
      n.value = _;
    }, { immediate: !0 }), P(a, (_) => {
      o.value = _;
    }, { immediate: !0 }), P(d, (_) => {
      l.value = _;
    }, { immediate: !0 }), P(u, (_) => {
      c.value = _;
    }, { immediate: !0 });
    function h(_) {
      const g = t.value.filter((A) => !A.startsWith("justify-") && !A.startsWith("items-")), x = _.class.split(" ");
      t.value = [...g, ...x], n.value = _.id;
    }
    function y(_) {
      const g = String(_), x = t.value.filter((A) => !A.startsWith("gap-"));
      t.value = [...x, `gap-${g}`];
    }
    function m(_) {
      const g = String(_), x = t.value.filter((A) => !A.startsWith("gap-x-"));
      t.value = [...x, `gap-x-${g}`];
    }
    function v(_) {
      const g = String(_), x = t.value.filter((A) => !A.startsWith("gap-y-"));
      t.value = [...x, `gap-y-${g}`];
    }
    return (_, g) => (b(), S("div", Co, [
      W(Qe),
      p("div", ko, [
        p("div", Ao, [
          (b(!0), S(q, null, Z(f.value, (x) => (b(), S("div", {
            key: x.label,
            title: x.label,
            class: "group relative flex justify-center items-center cursor-pointer",
            onClick: (A) => h(x)
          }, [
            p("div", {
              class: O([[x.icon, n.value === x.id ? "text-yellow-500 op-100" : ""], "op-0 transition-opacity group-hover:op-100"])
            }, null, 2),
            p("div", {
              class: O([n.value === x.id ? "op-0!" : "", "bg-white/50 size-1.3 rd-full op-100 transition-opacity group-hover:op-0 pos-center"])
            }, null, 2)
          ], 8, Mo))), 128))
        ]),
        p("div", Eo, [
          r.value ? (b(), S(q, { key: 1 }, [
            W(ce, {
              modelValue: l.value,
              "onUpdate:modelValue": [
                g[1] || (g[1] = (x) => l.value = x),
                m
              ],
              placeholder: "Gap X",
              options: F(Be),
              inputable: ""
            }, {
              prefix: N(() => [...g[4] || (g[4] = [
                p("div", {
                  "i-hugeicons:paragraph-spacing": "",
                  "rotate-90": ""
                }, null, -1)
              ])]),
              _: 1
            }, 8, ["modelValue", "options"]),
            W(ce, {
              modelValue: c.value,
              "onUpdate:modelValue": [
                g[2] || (g[2] = (x) => c.value = x),
                v
              ],
              placeholder: "Gap Y",
              options: F(Be),
              inputable: ""
            }, {
              prefix: N(() => [...g[5] || (g[5] = [
                p("div", { "i-hugeicons:paragraph-spacing": "" }, null, -1)
              ])]),
              _: 1
            }, 8, ["modelValue", "options"])
          ], 64)) : (b(), H(ce, {
            key: 0,
            modelValue: o.value,
            "onUpdate:modelValue": [
              g[0] || (g[0] = (x) => o.value = x),
              y
            ],
            placeholder: "Gap",
            options: F(Be),
            inputable: ""
          }, {
            prefix: N(() => [...g[3] || (g[3] = [
              p("div", {
                "i-hugeicons:paragraph-spacing": "",
                "rotate-90": ""
              }, null, -1)
            ])]),
            _: 1
          }, 8, ["modelValue", "options"]))
        ])
      ])
    ]));
  }
}), To = /* @__PURE__ */ I({
  __name: "FlexCol",
  setup(s) {
    return (e, t) => (b(), H(Lt, { direction: "col" }));
  }
}), Lo = /* @__PURE__ */ I({
  __name: "FlexRow",
  props: {
    wrap: { type: Boolean }
  },
  setup(s) {
    return (e, t) => (b(), H(Lt, {
      direction: "row",
      wrap: e.wrap
    }, null, 8, ["wrap"]));
  }
}), Vo = /* @__PURE__ */ I({
  __name: "Freedom",
  setup(s) {
    const { element: e, tracking: t, setElementStyle: n } = ee(), o = R({
      get: () => {
        if (e.value) {
          t();
          const l = window.getComputedStyle(e.value);
          return l.overflow && l.overflow !== "visible";
        }
        return !1;
      },
      set: (l) => {
        e.value && n({ overflow: l ? "hidden" : "visible" });
      }
    });
    return (l, c) => (b(), S("div", null, [
      W(Qe),
      W(de, {
        modelValue: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (f) => o.value = f),
        "mt-2": "",
        style: { "--context-color": "var(--colors-sky-DEFAULT)" },
        label: "Clip Content"
      }, null, 8, ["modelValue"])
    ]));
  }
}), Fo = /* @__PURE__ */ I({
  __name: "Grid",
  setup(s) {
    return (e, t) => (b(), S("div", null, [
      W(Qe)
    ]));
  }
}), Ro = { "p-2": "" }, jo = { flex: "~ items-center gap-1" }, Oo = {
  flex: "~ items-center gap-2",
  bg: "white/10",
  "rd-sm": "",
  "p-0.5": "",
  "mb-2": "",
  "un-children": "py-0.75 flex-1 flex items-center justify-center rd-2.5px text-sm op-50 @active:op-100 @active:bg-white/20! cursor-pointer hover:bg-white/50 transition-all"
}, Wo = ["title", "onClick"], Io = { "min-h-40": "" }, Bo = /* @__PURE__ */ I({
  __name: "index",
  setup(s) {
    const { element: e } = ee(), t = T(""), n = T(!1), o = T([
      { id: "freedom", icon: "i-custom:freedom?mask", component: Vo },
      { id: "horizontal", icon: "i-custom:horizontal?mask", component: Lo },
      { id: "vertical", icon: "i-custom:vertical?mask", component: To },
      { id: "grid", icon: "i-hugeicons:dashboard-square-03?mask", component: Fo }
    ]), l = T(o.value[0].id), c = R(() => o.value.find((a) => a.id === l.value) || o.value[0]);
    function f(a) {
      l.value = a;
    }
    const [r, i] = /* @__PURE__ */ Ce(!1);
    return ve(() => {
      if (e.value) {
        const a = window.getComputedStyle(e.value);
        t.value = a.display, n.value = t.value.startsWith("inline");
      }
    }), Te(() => {
      if (e.value) {
        const a = window.getComputedStyle(e.value);
        a.display.includes("flex") ? (a.flexDirection === "column" ? l.value = "vertical" : l.value = "horizontal", a.flexWrap === "wrap" ? r.value = !0 : r.value = !1) : a.display.includes("grid") ? l.value = "grid" : l.value = "freedom", a.flexWrap === "wrap" && (r.value = !0);
      }
    }), (a, d) => (b(), S("section", Ro, [
      W(Je, {
        title: "Auto Layout",
        icon: "i-hugeicons:dashboard-square-02"
      }, {
        default: N(() => [
          p("div", jo, [
            c.value.id === "horizontal" ? (b(), S("div", {
              key: 0,
              title: "Wrap text",
              "i-hugeicons:text-wrap": "",
              "op-50": "",
              "hover:op-100": "",
              "cursor-pointer": "",
              class: O({ "text-purple op-100!": F(r) }),
              onClick: d[0] || (d[0] = (u) => F(i)())
            }, null, 2)) : V("", !0)
          ])
        ]),
        _: 1
      }),
      p("div", Oo, [
        (b(!0), S(q, null, Z(o.value, (u) => (b(), S("div", {
          key: u.id,
          class: O({ active: c.value.id === u.id }),
          title: u.id,
          onClick: (h) => f(u.id)
        }, [
          p("div", {
            class: O(u.icon)
          }, null, 2)
        ], 10, Wo))), 128))
      ]),
      p("div", Io, [
        W(Ye, {
          "enter-active-class": "animate-fade-in animate-duration-200",
          "leave-active-class": "animate-fade-out animate-duration-200",
          mode: "out-in"
        }, {
          default: N(() => [
            (b(), H(gt(c.value.component), { wrap: F(r) }, null, 8, ["wrap"]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), No = { class: "p-4" }, Po = { key: 0 }, Do = /* @__PURE__ */ I({
  __name: "Settings",
  setup(s) {
    const e = T("");
    async function t() {
    }
    return (n, o) => (b(), S("div", No, [
      p("button", { onClick: t }, " Get UnoCSS Version "),
      e.value ? (b(), S("div", Po, " UnoCSS Version: " + M(e.value), 1)) : V("", !0)
    ]));
  }
}), zo = {
  key: 0,
  class: "p-3 no-scrollbar"
}, Uo = { flex: "~ items-center gap-2" }, Ho = ["title"], Yo = { class: "mb-1 flex items-center gap-2 text-xs" }, Xo = {
  key: 0,
  "i-hugeicons:star": "",
  class: "text-xs text-yellow ml-0.5",
  title: "Recommended"
}, Go = { class: "mb-2 text-2.5 text-white/50 leading-relaxed" }, qo = {
  key: 0,
  flex: "~ items-center gap-1"
}, Ko = {
  key: 1,
  flex: "~ items-center gap-1"
}, Jo = ["placeholder"], Qo = {
  key: 0,
  class: "mt-2 text-xs text-orange/80 flex items-center gap-1"
}, Zo = /* @__PURE__ */ I({
  __name: "TextContent",
  setup(s) {
    const { element: e, tracking: t, triggering: n } = ee(), o = T("innerText"), l = T(""), c = R(() => {
      if (t(), !e.value)
        return "";
      switch (o.value) {
        case "innerText":
          return e.value.innerText || "";
        case "innerHTML":
          return e.value.innerHTML || "";
        default:
          return "";
      }
    }), f = R(() => {
      if (!e.value)
        return !1;
      const u = e.value.textContent || "", h = e.value.innerHTML || "";
      return h.includes("<") && h !== u;
    }), r = R(() => e.value && f.value ? "innerHTML" : "innerText");
    P(c, (u) => {
      l.value = u;
    }, { immediate: !0 }), P(o, () => {
      l.value = c.value;
    });
    function i() {
      if (e.value) {
        switch (o.value) {
          case "innerText":
            e.value.innerText = l.value;
            break;
          case "innerHTML":
            e.value.innerHTML = l.value;
            break;
        }
        n();
      }
    }
    function a() {
      l.value = c.value;
    }
    function d() {
      o.value = r.value;
    }
    return (u, h) => c.value ? (b(), S("div", zo, [
      W(Je, {
        icon: "i-hugeicons:quill-write-01",
        title: "Element Content"
      }, {
        default: N(() => [
          p("div", Uo, [
            r.value !== o.value ? (b(), S("div", {
              key: 0,
              "i-hugeicons:magic-wand-01": "",
              title: `Use recommended: ${r.value}`,
              "text-sm": "",
              "op-64": "",
              hover: "op-100 text-blue",
              "cursor-pointer": "",
              onClick: d
            }, null, 8, Ho)) : V("", !0),
            p("div", {
              "i-hugeicons:refresh": "",
              title: "Reset Content",
              "text-sm": "",
              "op-64": "",
              hover: "op-100 text-orange",
              "cursor-pointer": "",
              onClick: a
            }),
            p("div", {
              "i-hugeicons:task-done-02": "",
              title: "Save Changes",
              "text-base": "",
              "op-64": "",
              hover: "op-100 text-purple",
              "cursor-pointer": "",
              onClick: i
            })
          ])
        ]),
        _: 1
      }),
      p("div", Yo, [
        h[2] || (h[2] = p("span", { text: "white/60" }, "Type:", -1)),
        W(he, {
          modelValue: o.value,
          "onUpdate:modelValue": h[0] || (h[0] = (y) => o.value = y),
          type: "radio",
          class: "flex items-center gap-3",
          style: { "--context-color": "var(--colors-yellow-DEFAULT)" }
        }, {
          default: N(() => [
            (b(), S(q, null, Z(["innerText", "innerHTML"], (y) => p("div", {
              key: y,
              class: O(["flex items-center gap-1", { "text-yellow": o.value === y, "text-white/60": o.value !== y }])
            }, [
              W(de, {
                "model-value": y,
                label: y,
                type: "radio",
                shape: "round",
                size: 2.8
              }, null, 8, ["model-value", "label"]),
              y === r.value ? (b(), S("div", Xo)) : V("", !0)
            ], 2)), 64))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", Go, [
        o.value === "innerText" ? (b(), S("div", qo, [...h[3] || (h[3] = [
          p("div", {
            "i-hugeicons:information-circle": "",
            "text-sky-300": ""
          }, null, -1),
          U(" Only visible text content ", -1)
        ])])) : o.value === "innerHTML" ? (b(), S("div", Ko, [...h[4] || (h[4] = [
          p("div", {
            "i-hugeicons:alert-02": "",
            "text-yellow": ""
          }, null, -1),
          U(" HTML content with tags (be careful with XSS) ", -1)
        ])])) : V("", !0)
      ]),
      He(p("textarea", {
        "onUpdate:modelValue": h[1] || (h[1] = (y) => l.value = y),
        class: "btn-clear min-h-20 h-30 max-h-60 w-full resize-y box-border p-2",
        border: "~ white/10 solid",
        "rd-md": "",
        text: "xs white/72",
        placeholder: `Enter ${o.value} content...`,
        font: "mono"
      }, null, 8, Jo), [
        [ht, l.value]
      ]),
      f.value ? (b(), S("div", Qo, [...h[5] || (h[5] = [
        p("div", { "i-hugeicons:code": "" }, null, -1),
        p("span", null, "This element contains HTML content", -1)
      ])])) : V("", !0)
    ])) : V("", !0);
  }
}), el = [
  { id: "basic", label: "Basic Info", icon: "i-hugeicons:alert-diamond", component: Dn },
  { id: "classes", label: "Class", icon: "i-hugeicons:colors", component: $s },
  { id: "styles", label: "Inline Styles", icon: "i-hugeicons:left-to-right-list-star", component: pt },
  { id: "layout", label: "Layout", icon: "i-hugeicons:layout-03", component: Bo },
  { id: "colors", label: "Colors", icon: "i-hugeicons:biscuit", component: pt },
  { id: "box", label: "Box Model", icon: "i-hugeicons:package-dimensions-02", component: cs },
  { id: "text", label: "Text", icon: "i-hugeicons:text-footnote", component: Zo },
  { id: "dom-tree", label: "Dom Tree", icon: "i-hugeicons:crowdfunding", component: ao },
  { id: "setting", label: "Setting", icon: "i-hugeicons:ai-setting", component: Do }
];
function tl(s = []) {
  const e = T([...el, ...s]), t = T(e.value[0].id), n = T("right");
  function o(c) {
    const f = e.value.findIndex((i) => i.id === t.value);
    e.value.findIndex((i) => i.id === c) < f ? n.value = "right" : n.value = "left", t.value = c;
  }
  const l = R(() => e.value.find((c) => c.id === t.value));
  return {
    tabs: e,
    activeTab: l,
    slideDirection: n,
    setActiveTab: o
  };
}
const nl = {
  "b-b": "~ solid white/10",
  class: "flex justify-between items-center px-2 py-1.5 select-none text-xl"
}, sl = { class: "flex items-center gap-2" }, ol = {
  class: "flex items-center gap-1.25 px-2 py-1 no-scrollbar of-x-auto",
  "b-b": "~ solid white/10"
}, ll = ["title", "onClick"], il = { class: "flex-1 overflow-y-auto relative no-scrollbar" }, rl = /* @__PURE__ */ I({
  __name: "ElementInfo",
  props: {
    isSelected: { type: Boolean },
    action: {},
    userPanels: {}
  },
  setup(s) {
    const e = s, { element: t, triggering: n } = ee(), { width: o, height: l } = /* @__PURE__ */ bt(), { x: c, y: f } = vn(), r = T(), [i, a] = /* @__PURE__ */ Ce(!1), d = T({ x: 0, y: 0 }), u = T({ x: 0, y: 0 }), h = T({ x: 0, y: 0 }), y = T({ x: 0, y: 0 }), { tabs: m, activeTab: v, slideDirection: _, setActiveTab: g } = tl(e.userPanels);
    function x(w, E) {
      const le = r.value?.offsetHeight || 350, ie = 10;
      let re = w + 20, ae = E + 20;
      return re + 300 > o.value && (re = w - 300 - 20), ae + le > l.value && (ae = E - le - 20), re < ie && (re = ie), ae < ie && (ae = ie), { x: re, y: ae };
    }
    const A = R(() => {
      let w, E;
      if (e.isSelected)
        if (i.value)
          w = u.value.x, E = u.value.y;
        else if (h.value.x !== 0 || h.value.y !== 0)
          w = h.value.x, E = h.value.y;
        else {
          const j = x(y.value.x, y.value.y);
          w = j.x, E = j.y;
        }
      else {
        const j = x(c.value, f.value);
        w = j.x, E = j.y;
      }
      return {
        position: "fixed",
        left: `${w}px`,
        top: `${E}px`,
        zIndex: "1001"
      };
    });
    function k() {
      n();
    }
    function L(w) {
      if (!e.isSelected)
        return;
      const E = w.currentTarget.closest(".uno-inspect-element-info")?.getBoundingClientRect();
      E && (d.value = {
        x: w.clientX - E.left,
        y: w.clientY - E.top
      }, u.value = {
        x: E.left,
        y: E.top
      }), i.value = !0, document.addEventListener("mousemove", $), document.addEventListener("mouseup", C), w.preventDefault();
    }
    function $(w) {
      if (!i.value)
        return;
      const E = w.clientX - d.value.x, j = w.clientY - d.value.y, B = 300, ye = r.value?.offsetHeight || 350, le = o.value - B, ie = l.value - ye;
      u.value = {
        x: Math.max(0, Math.min(E, le)),
        y: Math.max(0, Math.min(j, ie))
      };
    }
    function C() {
      i.value && (h.value = {
        x: u.value.x,
        y: u.value.y
      }), i.value = !1, document.removeEventListener("mousemove", $), document.removeEventListener("mouseup", C);
    }
    return P(() => t.value, () => {
      t.value && (h.value = { x: 0, y: 0 }, u.value = { x: 0, y: 0 }, i.value = !1);
    }), P(() => e.isSelected, (w) => {
      w && (y.value = {
        x: c.value,
        y: f.value
      });
    }), X("resize", k), X("scroll", k, { capture: !0 }), (w, E) => F(t) ? (b(), S("div", {
      key: 0,
      ref_key: "panelRef",
      ref: r,
      class: "uno-inspect-element-info font-dm rd-md",
      b: "~ solid white/10",
      style: se(A.value)
    }, [
      p("div", nl, [
        p("div", {
          "i-catppuccin:unocss": "",
          class: O(["header-logo", { draggable: w.isSelected, dragging: F(i) }]),
          onMousedown: L
        }, null, 34),
        p("div", sl, [
          p("div", {
            "i-hugeicons:cursor-magic-selection-02": "",
            class: O(["select-btn cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100", { selecting: !w.isSelected }]),
            title: "Click to select an element",
            onClick: E[0] || (E[0] = pe((j) => w.action.start(), ["stop"]))
          }, null, 2),
          He(p("div", {
            "i-hugeicons:cancel-01": "",
            class: "cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100 text-base",
            onClick: E[1] || (E[1] = pe((j) => w.action.stop(), ["stop"])),
            onMousedown: E[2] || (E[2] = pe(() => {
            }, ["stop"]))
          }, null, 544), [
            [Nt, w.isSelected]
          ])
        ])
      ]),
      p("div", ol, [
        (b(!0), S(q, null, Z(F(m), (j) => (b(), S("button", {
          key: j.id,
          class: O(["btn-clear p-1 rounded-full cursor-pointer transition-colors duration-200 flex items-center justify-center cursor-pointer @active:bg-amber/20 @active:text-amber", { active: F(v).id === j.id }]),
          title: j.label,
          text: "white/60",
          hover: "bg-amber/20 text-amber",
          onClick: (B) => F(g)(j.id)
        }, [
          p("div", {
            class: O([j.icon, "text-base"])
          }, null, 2)
        ], 10, ll))), 128))
      ]),
      p("div", il, [
        W(Ye, {
          name: `slide-${F(_)}`,
          mode: "out-in"
        }, {
          default: N(() => [
            (b(), H(Pt, null, [
              (b(), H(gt(F(v).component), {
                key: F(v).id
              }))
            ], 1024))
          ]),
          _: 1
        }, 8, ["name"])
      ])
    ], 4)) : V("", !0);
  }
}), Vt = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, o] of e)
    t[n] = o;
  return t;
}, al = /* @__PURE__ */ Vt(rl, [["__scopeId", "data-v-88209f99"]]), ul = { id: "__uno-inspector" }, cl = {
  key: 0,
  class: "uno-inspect-controls-overlay fixed pointer-events-none font-dm"
}, dl = { class: "absolute text-10px font-medium text-inspect-margin inset-0 pointer-events-none" }, fl = {
  key: 0,
  class: "absolute",
  style: {
    top: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, pl = {
  key: 1,
  class: "absolute",
  style: {
    top: "50%",
    right: "0",
    transform: "translateY(-50%)"
  }
}, ml = {
  key: 2,
  class: "absolute",
  style: {
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, vl = {
  key: 3,
  class: "absolute",
  style: {
    top: "50%",
    left: "0",
    transform: "translateY(-50%)"
  }
}, hl = { class: "absolute text-10px font-medium inset-0 text-inspect-padding pointer-events-none" }, gl = {
  key: 0,
  class: "absolute",
  style: {
    top: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, yl = {
  key: 1,
  class: "absolute",
  style: {
    top: "50%",
    right: "0",
    transform: "translateY(-50%)"
  }
}, xl = {
  key: 2,
  class: "absolute",
  style: {
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, bl = {
  key: 3,
  class: "absolute",
  style: {
    top: "50%",
    left: "0",
    transform: "translateY(-50%)"
  }
}, _l = /* @__PURE__ */ I({
  __name: "Inspector",
  props: /* @__PURE__ */ Me({
    panels: {}
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const { tracking: e, triggering: t, element: n } = Sn(), o = Ee(s, "modelValue"), [l, c] = /* @__PURE__ */ Ce(!1), [f, r] = /* @__PURE__ */ Ce(!1), { width: i, height: a } = /* @__PURE__ */ bt(), d = T({ x: 20, y: 20 }), u = T({ x: 0, y: 0 }), h = T({ x: 0, y: 0 }), y = T(!1), m = R(() => {
      e();
      const C = n.value;
      if (!C)
        return;
      const w = C.getBoundingClientRect(), E = window.getComputedStyle(C), j = {
        top: Number.parseFloat(E.marginTop),
        right: Number.parseFloat(E.marginRight),
        bottom: Number.parseFloat(E.marginBottom),
        left: Number.parseFloat(E.marginLeft)
      }, B = {
        top: Number.parseFloat(E.paddingTop),
        right: Number.parseFloat(E.paddingRight),
        bottom: Number.parseFloat(E.paddingBottom),
        left: Number.parseFloat(E.paddingLeft)
      };
      return {
        containerTop: w.top - j.top,
        containerLeft: w.left - j.left,
        containerWidth: w.width + j.left + j.right,
        containerHeight: w.height + j.top + j.bottom,
        elementTop: w.top,
        elementLeft: w.left,
        elementWidth: w.width,
        elementHeight: w.height,
        contentTop: w.top + B.top,
        contentLeft: w.left + B.left,
        contentWidth: w.width - B.left - B.right,
        contentHeight: w.height - B.top - B.bottom,
        margin: j,
        padding: B
      };
    });
    function v() {
      t();
    }
    function _() {
      l.value = !0, document.body.addEventListener("mouseover", x, { capture: !0 }), document.body.addEventListener("click", A, { capture: !0 }), document.body.style.cursor = "crosshair", window.addEventListener("resize", v), window.addEventListener("scroll", v, !0);
    }
    function g() {
      l.value = !1, n.value = null, document.body.removeEventListener("mouseover", x, { capture: !0 }), document.body.removeEventListener("click", A, { capture: !0 }), document.body.style.cursor = "", window.removeEventListener("resize", v), window.removeEventListener("scroll", v, !0);
    }
    function x(C) {
      if (!l.value)
        return;
      const w = C.target;
      w && !w.closest(".uno-inspect-controls") && !w.closest(".uno-inspect-element-info") && (n.value = w);
    }
    function A(C) {
      if (!l.value)
        return;
      C.preventDefault(), C.stopPropagation(), C.stopImmediatePropagation();
      const w = C.target;
      w && !w.closest(".uno-inspect-controls") && !w.closest(".uno-inspect-element-info") && (n.value = w, o.value = w, l.value = !1, document.body.removeEventListener("mouseover", x, { capture: !0 }), document.body.removeEventListener("click", A, { capture: !0 }), document.body.style.cursor = "");
    }
    function k(C) {
      h.value = { x: C.clientX, y: C.clientY }, y.value = !1;
      const w = C.currentTarget.getBoundingClientRect();
      u.value = {
        x: C.clientX - w.left,
        y: C.clientY - w.top
      }, document.addEventListener("mousemove", L), document.addEventListener("mouseup", $), C.preventDefault(), C.stopPropagation();
    }
    function L(C) {
      if (Math.sqrt(
        (C.clientX - h.value.x) ** 2 + (C.clientY - h.value.y) ** 2
      ) > 5 && (f.value = !0, y.value = !0), !f.value)
        return;
      const E = C.clientX - u.value.x, j = C.clientY - u.value.y, B = 40;
      d.value = {
        x: Math.max(0, Math.min(E, i.value - B)),
        y: Math.max(0, Math.min(j, a.value - B))
      };
    }
    function $() {
      y.value || setTimeout(() => {
        _();
      }, 0), f.value = !1, y.value = !1, document.removeEventListener("mousemove", L), document.removeEventListener("mouseup", $);
    }
    return Dt(() => {
      g(), window.removeEventListener("resize", v), window.removeEventListener("scroll", v, !0);
    }), Cn(() => {
      l.value ? g() : _();
    }, g), (C, w) => (b(), H(zt, { to: "body" }, [
      p("div", ul, [
        p("div", {
          class: O(["uno-inspect-controls p-1 cursor-move select-none", { "cursor-grabbing": F(f) }]),
          style: se({
            position: "fixed",
            top: `${d.value.y}px`,
            left: `${d.value.x}px`,
            zIndex: "10002"
          }),
          onMousedown: k
        }, [...w[0] || (w[0] = [
          p("button", { class: "border-none bg-transparent cursor-move" }, [
            p("div", {
              "text-xl": "",
              "i-catppuccin:unocss": ""
            })
          ], -1)
        ])], 38),
        m.value ? (b(), S("div", cl, [
          m.value.margin && m.value.padding ? (b(), S("div", {
            key: 0,
            b: "~ dashed inspect-margin/50",
            class: "rd-md bg-inspect-margin/25 overflow-hidden transition-all duration-100 relative",
            style: se({
              position: "fixed",
              top: `${m.value.containerTop}px`,
              left: `${m.value.containerLeft}px`,
              width: `${m.value.containerWidth}px`,
              height: `${m.value.containerHeight}px`,
              pointerEvents: "none"
            })
          }, [
            p("div", dl, [
              m.value.margin.top > 0 ? (b(), S("div", fl, " mt-" + M(F(J)(m.value.margin.top / 4)), 1)) : V("", !0),
              m.value.margin.right > 0 ? (b(), S("div", pl, " mr-" + M(F(J)(m.value.margin.right / 4)), 1)) : V("", !0),
              m.value.margin.bottom > 0 ? (b(), S("div", ml, " mb-" + M(F(J)(m.value.margin.bottom / 4)), 1)) : V("", !0),
              m.value.margin.left > 0 ? (b(), S("div", vl, " ml-" + M(F(J)(m.value.margin.left / 4)), 1)) : V("", !0)
            ]),
            p("div", {
              class: "absolute bg-inspect-padding/30 transition-all duration-100 relative",
              style: se({
                top: `${m.value.margin.top}px`,
                left: `${m.value.margin.left}px`,
                width: `${m.value.elementWidth}px`,
                height: `${m.value.elementHeight}px`
              })
            }, [
              p("div", hl, [
                m.value.padding.top > 0 ? (b(), S("div", gl, " pt-" + M(F(J)(m.value.padding.top / 4)), 1)) : V("", !0),
                m.value.padding.right > 0 ? (b(), S("div", yl, " pr-" + M(F(J)(m.value.padding.right / 4)), 1)) : V("", !0),
                m.value.padding.bottom > 0 ? (b(), S("div", xl, " pb-" + M(F(J)(m.value.padding.bottom / 4)), 1)) : V("", !0),
                m.value.padding.left > 0 ? (b(), S("div", bl, " pl-" + M(F(J)(m.value.padding.left / 4)), 1)) : V("", !0)
              ]),
              p("div", {
                class: "absolute bg-inspect-content/15 transition-all duration-100",
                style: se({
                  top: `${m.value.padding.top}px`,
                  left: `${m.value.padding.left}px`,
                  width: `${m.value.contentWidth}px`,
                  height: `${m.value.contentHeight}px`
                })
              }, null, 4)
            ], 4)
          ], 4)) : V("", !0)
        ])) : V("", !0),
        F(n) ? (b(), H(al, {
          key: 1,
          "is-selected": !F(l),
          action: { start: _, stop: g },
          "user-panels": C.panels
        }, null, 8, ["is-selected", "action", "user-panels"])) : V("", !0)
      ])
    ]));
  }
}), wl = /* @__PURE__ */ Vt(_l, [["__scopeId", "data-v-e4642815"]]), Cl = {
  install: (s) => {
    s.component("Inspector", wl), s.component("FormControl", de), s.component("FormControlGroup", he);
  }
};
export {
  de as FormControl,
  he as FormControlGroup,
  wl as Inspector,
  ce as Select,
  Cl as default,
  ee as useElement,
  tl as useTabs,
  Sn as useTracker,
  Sl as useUno
};
