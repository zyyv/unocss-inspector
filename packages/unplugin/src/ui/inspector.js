import { defineComponent as N, mergeModels as we, useModel as $e, inject as et, computed as B, createElementBlock as _, openBlock as v, createElementVNode as p, createCommentVNode as T, normalizeClass as j, normalizeStyle as ee, unref as R, toDisplayString as A, watchEffect as tt, provide as Te, renderSlot as de, ref as E, watch as U, createVNode as O, withDirectives as je, withModifiers as ce, vModelText as nt, Transition as Be, withCtx as D, Fragment as G, renderList as K, useTemplateRef as gt, onMounted as Oe, createBlock as W, createTextVNode as P, resolveComponent as yt, resolveDynamicComponent as st, vShow as xt, KeepAlive as bt, onUnmounted as _t, Teleport as wt } from "vue";
import { useEventListener as Ve, useMagicKeys as $t, useClipboard as Ct, computedAsync as kt, useDebounceFn as St, useToggle as xe, useWindowSize as ot, useMouse as At } from "@vueuse/core";
const Lt = {
  "inline-flex": "",
  "w-fit": "",
  flex: "items-center gap-0.75",
  "children:cursor-pointer": "",
  "select-none": ""
}, Et = ["id", "checked", "type", "disabled"], Mt = ["for"], ae = /* @__PURE__ */ N({
  __name: "FormControl",
  props: /* @__PURE__ */ we({
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
  setup(o) {
    const e = o, t = $e(o, "modelValue"), n = e.id || Math.random().toString(36).slice(2, 11), s = et("controlGroup", null), l = B(() => s && typeof e.modelValue == "string" ? s.isChecked(e.modelValue) : !!t.value);
    function c() {
      s && typeof e.modelValue == "string" ? e.type === "radio" || s.type === "radio" ? s.select(e.modelValue) : s.toggle(e.modelValue) : e.type === "radio" ? t.value = !0 : t.value = !t.value;
    }
    function m(u) {
      u.preventDefault(), c();
    }
    return (u, i) => (v(), _("div", Lt, [
      p("div", {
        class: j(["inline-flex items-center relative", {
          "opacity-50 cursor-not-allowed": u.disabled
        }]),
        onClick: c
      }, [
        p("input", {
          id: R(n),
          checked: l.value,
          type: u.type,
          disabled: u.disabled,
          class: j(["btn-clear peer checked:b-$context-color/50 b b-solid b-white/30", u.shape === "square" ? "rd-sm" : "rd-full"]),
          style: ee([{ "--webkit-appearance": "none", "-moz-appearance": "none", appearance: "none" }, {
            width: `calc(var(--spacing) * ${e.size})`,
            height: `calc(var(--spacing) * ${e.size})`
          }])
        }, null, 14, Et),
        p("div", {
          class: j(["pos-center transition-all size-0 peer-checked:size-58% peer-checked:bg-$context-color", u.shape === "square" ? "rd-2px" : "rd-full"])
        }, null, 2)
      ], 2),
      u.label ? (v(), _("label", {
        key: 0,
        "transition-opacity": "",
        class: j([{ "op-50": !l.value }, "text-3.25 leading-normal whitespace-nowrap"]),
        for: R(n),
        onClick: m
      }, A(u.label), 11, Mt)) : T("", !0)
    ]));
  }
}), pe = /* @__PURE__ */ N({
  __name: "FormControlGroup",
  props: /* @__PURE__ */ we({
    type: { default: "checkbox" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = $e(o, "modelValue");
    tt(() => {
      (t.value === void 0 || t.value === null) && (t.value = e.type === "checkbox" ? [] : "");
    });
    function n(c) {
      e.type === "checkbox" && Array.isArray(t.value) && (t.value.indexOf(c) === -1 ? t.value = [...t.value, c] : t.value = t.value.filter((u) => u !== c));
    }
    function s(c) {
      e.type === "radio" ? t.value = c : e.type === "checkbox" && Array.isArray(t.value) && (t.value.includes(c) || (t.value = [...t.value, c]));
    }
    function l(c) {
      return e.type === "checkbox" && Array.isArray(t.value) ? t.value.includes(c) : e.type === "radio" ? t.value === c : !1;
    }
    return Te("controlGroup", {
      toggle: n,
      select: s,
      isChecked: l,
      modelValue: B(() => t.value),
      type: e.type
    }), (c, m) => (v(), _("div", null, [
      de(c.$slots, "default")
    ]));
  }
}), Tt = { flex: "~ items-center gap-1" }, Vt = ["placeholder"], Ft = { flex: "~ items-center gap-1" }, Rt = {
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
}, jt = ["onClick"], Bt = {
  key: 1,
  class: "text-2.25 text-white/50 self-end"
}, Ot = {
  key: 2,
  "i-hugeicons:tick-01": "",
  "ml-auto": "",
  text: "3.25"
}, re = /* @__PURE__ */ N({
  __name: "Select",
  props: /* @__PURE__ */ we({
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
  setup(o) {
    const e = o, t = $e(o, "modelValue"), n = E(!1), s = E(), l = E(), c = E("");
    U(t, (b) => {
      c.value = String(b || "");
    }, { immediate: !0 });
    const m = B({
      get: () => e.inputable ? c.value : "",
      set: (b) => {
        c.value = b;
      }
    });
    function u(b) {
      if (!e.inputable)
        return;
      const h = b.target.value.trim();
      h !== String(t.value || "") && (t.value = h || "");
    }
    function i(b) {
      e.inputable && b.key === "Enter" && (b.preventDefault(), u(b), l.value?.blur());
    }
    const a = B(() => e.options.find((b) => b.value === t.value));
    function d() {
      e.disabled || (n.value = !n.value);
    }
    function r(b) {
      e.disabled || (t.value = b.value, n.value = !1);
    }
    function g(b) {
      s.value && !s.value.contains(b.target) && (n.value = !1);
    }
    return Ve("click", g), (b, f) => (v(), _("div", {
      ref_key: "selectRef",
      ref: s,
      class: j({ "is-disabled": b.disabled, "is-open": n.value }),
      relative: "",
      "w-full": ""
    }, [
      p("div", {
        class: j(["select-trigger", b.borderable ? "b-1" : "b-0"]),
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
        p("div", Tt, [
          de(b.$slots, "prefix"),
          a.value?.icon ? (v(), _("span", {
            key: 0,
            class: j(a.value.icon)
          }, null, 2)) : T("", !0),
          b.inputable ? je((v(), _("input", {
            key: 1,
            ref_key: "inputRef",
            ref: l,
            "onUpdate:modelValue": f[0] || (f[0] = (h) => m.value = h),
            name: "select-input",
            placeholder: b.placeholder,
            "text-size-inherit": "",
            "w-full": "",
            "flex-1": "",
            "min-w-0": "",
            "bg-transparent": "",
            "border-none": "",
            "outline-none": "",
            class: j(b.inputClass),
            onClick: f[1] || (f[1] = ce(() => {
            }, ["stop"])),
            onBlur: u,
            onKeydown: i
          }, null, 42, Vt)), [
            [nt, m.value]
          ]) : (v(), _("span", {
            key: 2,
            class: j({ "op-50": !a.value })
          }, A(a.value?.label || b.placeholder), 3))
        ]),
        p("div", Ft, [
          de(b.$slots, "suffix"),
          b.options.length > 0 ? (v(), _("div", {
            key: 0,
            class: j({ "rotate-180": n.value }),
            "i-hugeicons:arrow-down-01": "",
            "transition-transform": "",
            "duration-200": ""
          }, null, 2)) : T("", !0)
        ])
      ], 2),
      O(Be, {
        "enter-active-class": "transition-all duration-200 ease-out",
        "enter-from-class": "opacity-0 translate-y-[-8px] scale-95",
        "enter-to-class": "opacity-100 translate-y-0 scale-100",
        "leave-active-class": "transition-all duration-150 ease-in",
        "leave-from-class": "opacity-100 translate-y-0 scale-100",
        "leave-to-class": "opacity-0 translate-y-[-8px] scale-95"
      }, {
        default: D(() => [
          n.value && b.options.length > 0 ? (v(), _("div", Rt, [
            (v(!0), _(G, null, K(b.options, (h) => (v(), _("div", {
              key: h.value,
              class: j([{
                "is-selected": h.value === t.value,
                "is-disabled": b.disabled
              }, "text-white text-2.75 text-op-80 hover:bg-white/5 hover:text-op-100"]),
              p: "x2 y1.5",
              "cursor-pointer": "",
              flex: "~ items-center gap-1.5",
              "transition-all": "",
              "duration-150": "",
              onClick: ($) => r(h)
            }, [
              h.icon ? (v(), _("span", {
                key: 0,
                class: j(h.icon)
              }, null, 2)) : T("", !0),
              p("span", null, A(h.label), 1),
              h.desc ? (v(), _("sub", Bt, A(h.desc), 1)) : T("", !0),
              h.value === t.value ? (v(), _("div", Ot)) : T("", !0)
            ], 10, jt))), 128))
          ])) : T("", !0)
        ]),
        _: 1
      })
    ], 2));
  }
}), lt = "selected-element", Nt = "update-trigger", Ne = E(0), be = E(null);
function it() {
  Ne.value;
}
function Fe() {
  if (!be.value)
    return;
  const o = window.getComputedStyle(be.value), e = Number.parseFloat(o.transitionDuration) + Number.parseFloat(o.transitionDelay), t = Number.parseFloat(o.animationDuration) + Number.parseFloat(o.animationDelay), n = Math.max(e, t);
  setTimeout(() => {
    Ne.value++;
  }, n * 1e3 + 50);
}
function zt() {
  return Te(lt, be), Te(Nt, Ne), {
    /**
     * The currently tracked selected element
     */
    element: be,
    // currentElement: CURRENT_ELEMENT,
    tracking: it,
    triggering: Fe
  };
}
function J() {
  const o = et(lt);
  if (!o)
    throw new Error("useElement must be used within a component that provides element context");
  function e(t, n = "style") {
    o?.value && ((n === "style" || n === "both") && Object.assign(o.value.style, t), Fe());
  }
  return {
    element: o,
    // currentElement,
    tracking: it,
    triggering: Fe,
    setElementStyle: e
  };
}
function Dt(o, e) {
  const t = $t(), n = t["cmd+u"], s = t["ctrl+u"], l = t.escape;
  U([n, s], ([c, m]) => {
    (c || m) && o();
  }), U(l, (c) => {
    c && e();
  });
}
function X(o) {
  return o.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}
const Ie = (o) => Number.parseFloat(X(o / 16)), Pe = (o) => Number.parseFloat(X(o * 16));
function Ut(o) {
  switch (o.toLowerCase()) {
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
const It = {
  "b-b": "~ solid white/10",
  class: "text-3.25 flex items-center pb-2"
}, Pt = { class: "w-4.5 text-center text-base op-80" }, Wt = { class: "mx-1 font-medium whitespace-nowrap op-80" }, Ht = { class: "flex-1 font-medium flex justify-end" }, ue = /* @__PURE__ */ N({
  __name: "Cell",
  props: {
    label: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (v(), _("div", It, [
      p("div", Pt, [
        p("div", {
          class: j(e.icon)
        }, null, 2)
      ]),
      p("div", Wt, A(e.label), 1),
      p("div", Ht, [
        de(e.$slots, "default")
      ])
    ]));
  }
}), Yt = ["title"], We = /* @__PURE__ */ N({
  __name: "ColorDot",
  props: {
    color: {},
    size: { default: 3.5 }
  },
  setup(o) {
    const e = gt("canvas"), t = E(null);
    function n() {
      if (!t.value || !e.value)
        return;
      const s = 3, { width: l, height: c } = e.value.getBoundingClientRect();
      e.value.width = l, e.value.height = c, t.value.clearRect(0, 0, l, c);
      for (let m = 0; m < c; m += s)
        for (let u = 0; u < l; u += s)
          t.value.fillStyle = (u / s + m / s) % 2 === 0 ? "#ffffffcc" : "#88888888", t.value.fillRect(u, m, s, s);
    }
    return Oe(() => {
      e.value && (t.value = e.value.getContext("2d"), n());
    }), (s, l) => (v(), _("div", {
      class: "inline-block rounded group-hover:rounded-50% transition-all relative of-hidden",
      style: ee({
        width: `calc(var(--spacing) * ${s.size})`,
        height: `calc(var(--spacing) * ${s.size})`
      }),
      title: s.color
    }, [
      p("canvas", {
        ref_key: "canvas",
        ref: e,
        "size-full": ""
      }, null, 512),
      p("div", {
        class: "absolute inset-0",
        style: ee({ backgroundColor: s.color })
      }, null, 4)
    ], 12, Yt));
  }
}), Gt = {
  key: 0,
  "p-3": ""
}, Xt = { class: "flex flex-col gap-2" }, qt = {
  p: "x1.5 y0.5",
  class: "bg-purple/30 text-purple rd w-fit"
}, Kt = ["title"], Jt = { flex: "~ items-center" }, Qt = { flex: "~ items-center" }, Zt = ["title"], en = { key: 0 }, tn = { key: 1 }, nn = ["title"], sn = /* @__PURE__ */ N({
  __name: "BasicInfo",
  setup(o) {
    const { element: e, tracking: t } = J(), n = E(!1), s = E(!1), l = B(() => {
      if (t(), !e.value)
        return null;
      const d = e.value, r = d.getBoundingClientRect();
      return {
        tagName: d.tagName.toLowerCase(),
        id: d.id,
        rect: {
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          height: Math.round(r.height)
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
      return X(d / 16);
    }
    function m() {
      n.value = !n.value;
    }
    function u() {
      s.value = !s.value;
    }
    const { copy: i } = Ct();
    function a(d) {
      i(d), console.log("Copied to clipboard:", d);
    }
    return (d, r) => l.value ? (v(), _("div", Gt, [
      p("div", Xt, [
        O(ue, {
          label: "Tag",
          icon: "i-hugeicons:discount-tag-01"
        }, {
          default: D(() => [
            p("div", qt, A(l.value.tagName), 1)
          ]),
          _: 1
        }),
        l.value.id ? (v(), W(ue, {
          key: 0,
          label: "ID",
          icon: "i-hugeicons:pin-code"
        }, {
          default: D(() => [
            p("div", null, [
              r[2] || (r[2] = p("span", { class: "mr-0.25 text-white/64 text-10px" }, "#", -1)),
              P(" " + A(l.value.id), 1)
            ])
          ]),
          _: 1
        })) : T("", !0),
        O(ue, {
          label: "Position",
          icon: "i-hugeicons:location-09"
        }, {
          default: D(() => [
            p("div", null, [
              r[3] || (r[3] = p("span", { "op-50": "" }, "X:", -1)),
              P(" " + A(l.value.rect.x) + " ", 1),
              r[4] || (r[4] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              r[5] || (r[5] = P()),
              r[6] || (r[6] = p("span", { "op-50": "" }, "Y:", -1)),
              P(" " + A(l.value.rect.y), 1)
            ])
          ]),
          _: 1
        }),
        O(ue, {
          label: "Size",
          icon: "i-hugeicons:image-actual-size"
        }, {
          default: D(() => [
            p("div", {
              class: "cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded transition-colors select-none",
              title: `Click to switch to ${n.value ? "px" : "rem"}`,
              onClick: m
            }, [
              n.value ? (v(), _(G, { key: 0 }, [
                r[7] || (r[7] = p("span", { "op-50": "" }, "W:", -1)),
                P(" " + A(c(l.value.rect.width)), 1),
                r[8] || (r[8] = p("span", { class: "mx-1 op-50" }, "rem", -1)),
                r[9] || (r[9] = P()),
                r[10] || (r[10] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
                r[11] || (r[11] = P()),
                r[12] || (r[12] = p("span", { "op-50": "" }, "H:", -1)),
                P(" " + A(c(l.value.rect.height)), 1),
                r[13] || (r[13] = p("span", { class: "mx-1 op-50" }, "rem", -1))
              ], 64)) : (v(), _(G, { key: 1 }, [
                r[14] || (r[14] = p("span", { "op-50": "" }, "W:", -1)),
                P(" " + A(l.value.rect.width), 1),
                r[15] || (r[15] = p("span", { class: "mx-1 op-50" }, "px", -1)),
                r[16] || (r[16] = P()),
                r[17] || (r[17] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
                r[18] || (r[18] = P()),
                r[19] || (r[19] = p("span", { "op-50": "" }, "H:", -1)),
                P(" " + A(l.value.rect.height), 1),
                r[20] || (r[20] = p("span", { class: "mx-1 op-50" }, "px", -1))
              ], 64))
            ], 8, Kt)
          ]),
          _: 1
        }),
        O(ue, {
          label: "Color",
          icon: "i-hugeicons:color-picker"
        }, {
          default: D(() => [
            p("div", Jt, [
              p("div", {
                title: "Click to copy text color",
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded",
                onClick: r[0] || (r[0] = (g) => a(l.value.color.text))
              }, [
                r[21] || (r[21] = p("span", null, "Text:", -1)),
                O(We, {
                  color: l.value.color.text
                }, null, 8, ["color"])
              ]),
              r[23] || (r[23] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              p("div", {
                title: "Click to copy background color",
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded",
                onClick: r[1] || (r[1] = (g) => a(l.value.color.background))
              }, [
                r[22] || (r[22] = p("span", null, "Background:", -1)),
                O(We, {
                  color: l.value.color.background
                }, null, 8, ["color"])
              ])
            ])
          ]),
          _: 1
        }),
        O(ue, {
          label: "Font",
          icon: "i-hugeicons:text"
        }, {
          default: D(() => [
            p("div", Qt, [
              p("div", {
                flex: "~ items-center gap-1",
                class: "hover:bg-white/10 cursor-pointer px-1 py-0.5 rounded transition-colors select-none",
                title: `Click to switch to ${s.value ? "px" : "rem"}`,
                onClick: u
              }, [
                s.value ? (v(), _("span", en, [
                  P(A(c(parseFloat(l.value.font.size))), 1),
                  r[24] || (r[24] = p("span", { class: "mx-1 text-white/50" }, "rem", -1))
                ])) : (v(), _("span", tn, A(l.value.font.size), 1))
              ], 8, Zt),
              r[25] || (r[25] = p("span", { class: "mx-1 text-white/10" }, "|", -1)),
              r[26] || (r[26] = P()),
              p("div", {
                "flex-1": "",
                "line-clamp-1": "",
                "break-all": "",
                title: l.value.font.family
              }, [
                p("span", null, A(l.value.font.family), 1)
              ], 8, nn)
            ])
          ]),
          _: 1
        })
      ])
    ])) : T("", !0);
  }
}), on = {
  key: 0,
  class: "lh-loose flex items-center justify-center p-4"
}, ln = {
  b: "~ dashed inspect-margin",
  class: "w-full bg-inspect-margin bg-op-50 p-5 relative"
}, rn = { class: "box-model-labels" }, an = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, un = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, cn = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, dn = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, pn = {
  b: "~ solid inspect-border/35",
  class: "bg-inspect-border/35 p-5 relative text-center"
}, fn = { class: "box-model-labels" }, mn = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, vn = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, hn = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, gn = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, yn = {
  b: "~ dashed inspect-padding",
  class: "bg-inspect-padding/40 p-5 relative text-center"
}, xn = { class: "box-model-labels" }, bn = { class: "box-model-text top-0 left-1/2 -translate-x-1/2 translate-y-0" }, _n = { class: "box-model-text top-1/2 right-0 -translate-y-1/2 translate-x-0" }, wn = { class: "box-model-text bottom-0 left-1/2 -translate-x-1/2 translate-y-0" }, $n = { class: "box-model-text top-1/2 left-0 -translate-y-1/2 translate-x-0" }, Cn = { class: "border border-inspect-content bg-inspect-content/40 min-h-10 flex items-center justify-center" }, kn = { class: "text-10px" }, Sn = /* @__PURE__ */ N({
  __name: "BoxModel",
  setup(o) {
    const { element: e, tracking: t } = J(), n = B(() => {
      if (t(), !e.value)
        return null;
      const l = e.value, c = window.getComputedStyle(l), m = l.getBoundingClientRect();
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
          width: m.width,
          height: m.height
        }
      };
    });
    function s(l) {
      return l === 0 ? "0" : `${l}px`;
    }
    return (l, c) => n.value ? (v(), _("div", on, [
      p("div", ln, [
        c[2] || (c[2] = p("div", { class: "box-model-title" }, " margin ", -1)),
        p("div", rn, [
          p("span", an, A(s(n.value.margin.top)), 1),
          p("span", un, A(s(n.value.margin.right)), 1),
          p("span", cn, A(s(n.value.margin.bottom)), 1),
          p("span", dn, A(s(n.value.margin.left)), 1)
        ]),
        p("div", pn, [
          c[1] || (c[1] = p("div", { class: "box-model-title" }, " border ", -1)),
          p("div", fn, [
            p("span", mn, A(s(n.value.border.top)), 1),
            p("span", vn, A(s(n.value.border.right)), 1),
            p("span", hn, A(s(n.value.border.bottom)), 1),
            p("span", gn, A(s(n.value.border.left)), 1)
          ]),
          p("div", yn, [
            c[0] || (c[0] = p("div", { class: "box-model-title" }, " padding ", -1)),
            p("div", xn, [
              p("span", bn, A(s(n.value.padding.top)), 1),
              p("span", _n, A(s(n.value.padding.right)), 1),
              p("span", wn, A(s(n.value.padding.bottom)), 1),
              p("span", $n, A(s(n.value.padding.left)), 1)
            ]),
            p("div", Cn, [
              p("div", kn, A(Math.round(n.value.size.width)) + " × " + A(Math.round(n.value.size.height)), 1)
            ])
          ])
        ])
      ])
    ])) : T("", !0);
  }
}), He = ["class", "id", "href", "src", "style"];
function An() {
  const { element: o, tracking: e, triggering: t } = J(), n = E(/* @__PURE__ */ new Map()), s = E([]), l = E(/* @__PURE__ */ new Map()), c = B(() => {
    if (e(), !o.value)
      return /* @__PURE__ */ new Map();
    const i = /* @__PURE__ */ new Map();
    for (let a = 0; a < o.value.attributes.length; a++) {
      const d = o.value.attributes[a];
      if (!He.includes(d.name)) {
        const r = d.value.split(" ").filter(Boolean);
        i.set(d.name, new Set(r.length > 0 ? r : ["~"]));
      }
    }
    return i;
  });
  U(
    () => o.value,
    (i) => {
      if (n.value.clear(), s.value = [], l.value.clear(), i)
        for (let a = 0; a < i.attributes.length; a++) {
          const d = i.attributes[a];
          if (!He.includes(d.name)) {
            s.value.push(d.name);
            const r = d.value.split(" ").filter(Boolean);
            n.value.set(d.name, new Set(r)), l.value.set(d.name, r.length > 0 ? r : ["~"]);
          }
        }
    },
    { immediate: !0 }
  ), U(
    c,
    (i) => {
      i.forEach((a, d) => {
        if (n.value.has(d) || (n.value.set(d, /* @__PURE__ */ new Set()), s.value.includes(d) || s.value.push(d)), a.forEach((r) => {
          n.value.get(d).add(r);
        }), !l.value.has(d))
          l.value.set(d, Array.from(a));
        else {
          const r = l.value.get(d), g = Array.from(a).filter((b) => !r.includes(b));
          l.value.set(d, [...r, ...g]);
        }
      });
    },
    { immediate: !0 }
  );
  const m = B(() => {
    const i = /* @__PURE__ */ new Map();
    return s.value.forEach((a) => {
      if (n.value.has(a)) {
        const d = n.value.get(a), r = c.value.get(a) || /* @__PURE__ */ new Set(), g = l.value.get(a) || [], b = g.filter((h) => d.has(h)), f = g.filter((h) => r.has(h));
        i.set(a, {
          all: b,
          active: f
        });
      }
    }), i;
  });
  function u(i, a) {
    if (o.value) {
      if (a.length === 0)
        o.value.removeAttribute(i);
      else if (a.length === 1 && a[0] === "~")
        o.value.setAttribute(i, "");
      else {
        const d = a.filter((r) => r !== "~");
        if (d.length === 0)
          o.value.removeAttribute(i);
        else {
          const r = l.value.get(i) || [], g = r.filter((h) => d.includes(h)), b = d.filter((h) => !r.includes(h)), f = [...g, ...b];
          o.value.setAttribute(i, f.join(" "));
        }
      }
      t();
    }
  }
  return {
    attributes: m,
    updateAttribute: u,
    originalAttributeOrder: B(() => s.value),
    originalValueOrder: B(() => l.value)
  };
}
function rt() {
  const { element: o, tracking: e, triggering: t } = J(), n = E(/* @__PURE__ */ new Set()), s = E([]), l = B(() => (e(), o.value ? Array.from(o.value.classList) : []));
  U(
    () => o.value,
    (u) => {
      if (n.value.clear(), s.value = [], u) {
        const i = Array.from(u.classList);
        s.value = [...i], i.forEach((a) => {
          n.value.add(a);
        });
      }
    },
    { immediate: !0 }
  ), U(
    l,
    (u) => {
      u.forEach((i) => {
        n.value.has(i) || (n.value.add(i), s.value.includes(i) || s.value.push(i));
      });
    },
    { immediate: !0 }
  );
  const c = B(() => s.value.filter((u) => n.value.has(u))), m = B({
    get: () => l.value,
    set: (u) => {
      if (!o.value)
        return;
      const i = s.value.filter((r) => u.includes(r)), a = u.filter((r) => !s.value.includes(r)), d = [...i, ...a];
      o.value.className = d.join(" "), t();
    }
  });
  return {
    displayClasses: c,
    classList: m,
    originalClassOrder: B(() => s.value)
  };
}
const Ln = {
  key: 0,
  class: "flex flex-col gap-1"
}, En = { class: "flex flex-col gap-2" }, Mn = {
  key: 0,
  flex: "1 ~ justify-end gap-1.5",
  style: { "--context-color": "var(--colors-teal-DEFAULT)" }
}, Tn = /* @__PURE__ */ N({
  __name: "AttributesSection",
  props: {
    attributes: {}
  },
  emits: ["updateAttribute"],
  setup(o) {
    return (e, t) => e.attributes?.size ? (v(), _("div", Ln, [
      t[0] || (t[0] = p("h5", { class: "text-teal/80 m0 flex items-center gap-1" }, [
        p("div", { "i-hugeicons:leaf-01": "" }),
        p("span", null, "Attributes")
      ], -1)),
      p("div", En, [
        (v(!0), _(G, null, K(e.attributes, ([n, s]) => (v(), _("div", {
          key: n,
          class: "flex gap-2"
        }, [
          p("span", {
            class: j(["text-sm", { "op-50": s.active.length === 0 }])
          }, A(n), 3),
          s.all.length ? (v(), _("div", Mn, [
            O(pe, {
              "model-value": s.active,
              class: "flex flex-wrap gap-2",
              type: "checkbox",
              "justify-end": "",
              "onUpdate:modelValue": (l) => e.$emit("updateAttribute", n, l || [])
            }, {
              default: D(() => [
                (v(!0), _(G, null, K(s.all, (l) => (v(), W(ae, {
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
          ])) : T("", !0)
        ]))), 128))
      ])
    ])) : T("", !0);
  }
}), Vn = {
  key: 0,
  class: "flex flex-wrap gap-1"
}, Fn = /* @__PURE__ */ N({
  __name: "ClassListSection",
  props: {
    displayClasses: {},
    classList: {}
  },
  emits: ["update:classList"],
  setup(o) {
    return (e, t) => e.displayClasses.length ? (v(), _("div", Vn, [
      t[1] || (t[1] = p("h5", { class: "text-sky/80 m0 flex items-center gap-1" }, [
        p("div", { "i-hugeicons:leaf-04": "" }),
        P(" Class List ")
      ], -1)),
      O(pe, {
        class: "flex flex-wrap gap-2",
        "model-value": e.classList,
        type: "checkbox",
        style: { "--context-color": "var(--colors-sky-DEFAULT)" },
        "onUpdate:modelValue": t[0] || (t[0] = (n) => e.$emit("update:classList", n || []))
      }, {
        default: D(() => [
          (v(!0), _(G, null, K(e.displayClasses, (n) => (v(), W(ae, {
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
    ])) : T("", !0);
  }
}), Rn = { class: "flex flex-col items-center justify-center py-8 text-center" }, jn = { class: "text-sm font-medium mb-1 text-white/72" }, Bn = { class: "text-sm text-white/32 max-w-xs leading-relaxed m0" }, at = /* @__PURE__ */ N({
  __name: "Empty",
  props: {
    title: {},
    description: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (v(), _("div", Rn, [
      p("div", {
        class: j(["text-5xl mb-4 text-orange-400/60", e.icon ?? "i-hugeicons:cheese-cake-01"])
      }, null, 2),
      p("h3", jn, A(e.title || "Empty"), 1),
      p("p", Bn, A(e.description || "No data to display at the moment."), 1)
    ]));
  }
}), On = { "p-3": "" }, Nn = {
  key: 0,
  "my-2": "",
  divided: ""
}, zn = /* @__PURE__ */ N({
  __name: "ClassList",
  setup(o) {
    const { displayClasses: e, classList: t } = rt(), { attributes: n, updateAttribute: s } = An();
    return (l, c) => (v(), _("div", On, [
      R(e).length === 0 && R(n).size === 0 ? (v(), W(at, { key: 0 })) : (v(), _(G, { key: 1 }, [
        O(Fn, {
          "display-classes": R(e),
          "class-list": R(t),
          "onUpdate:classList": c[0] || (c[0] = (m) => t.value = m)
        }, null, 8, ["display-classes", "class-list"]),
        R(n).size > 0 && R(e).length > 0 ? (v(), _("div", Nn)) : T("", !0),
        O(Tn, {
          attributes: R(n),
          onUpdateAttribute: R(s)
        }, null, 8, ["attributes", "onUpdateAttribute"])
      ], 64))
    ]));
  }
}), ge = "default", Re = "preflights", Dn = "shortcuts", Un = "imports", In = {
  [Un]: -200,
  [Re]: -100,
  [Dn]: -10,
  [ge]: 0
}, Pn = /[\\:]?[\s'"`;{}]+/g;
function Wn(o) {
  return o.split(Pn);
}
const Hn = {
  name: "@unocss/core/extractor-split",
  order: 0,
  extract({ code: o }) {
    return Wn(o);
  }
};
function Y(o = []) {
  return Array.isArray(o) ? o : [o];
}
function te(o) {
  return Array.from(new Set(o));
}
function Ye(o, e) {
  return o.reduce((t, n) => (t.findIndex((l) => e(n, l)) === -1 && t.push(n), t), []);
}
function H(o) {
  return typeof o == "string";
}
class ut extends Set {
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
function Se(o) {
  return o instanceof ut;
}
function Yn(o) {
  const e = o.length;
  let t = -1, n, s = "";
  const l = o.charCodeAt(0);
  for (; ++t < e; ) {
    if (n = o.charCodeAt(t), n === 0) {
      s += "�";
      continue;
    }
    if (n === 37) {
      s += "\\%";
      continue;
    }
    if (n === 44) {
      s += "\\,";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      n >= 1 && n <= 31 || n === 127 || t === 0 && n >= 48 && n <= 57 || t === 1 && n >= 48 && n <= 57 && l === 45
    ) {
      s += `\\${n.toString(16)} `;
      continue;
    }
    if (
      // If the character is the first character and is a `-` (U+002D), and
      // there is no second character, […]
      t === 0 && e === 1 && n === 45
    ) {
      s += `\\${o.charAt(t)}`;
      continue;
    }
    if (n >= 128 || n === 45 || n === 95 || n >= 48 && n <= 57 || n >= 65 && n <= 90 || n >= 97 && n <= 122) {
      s += o.charAt(t);
      continue;
    }
    s += `\\${o.charAt(t)}`;
  }
  return s;
}
const Ae = Yn;
function Gn() {
  return {
    events: {},
    emit(o, ...e) {
      (this.events[o] || []).forEach((t) => t(...e));
    },
    on(o, e) {
      return (this.events[o] = this.events[o] || []).push(e), () => this.events[o] = (this.events[o] || []).filter((t) => t !== e);
    }
  };
}
function Xn(o) {
  return typeof o == "function" ? { match: o } : o;
}
function Ge(o) {
  return o.length === 3;
}
function Le(o) {
  return o != null;
}
function qn() {
}
class Kn {
  _map = /* @__PURE__ */ new Map();
  get(e, t) {
    const n = this._map.get(e);
    if (n)
      return n.get(t);
  }
  getFallback(e, t, n) {
    let s = this._map.get(e);
    return s || (s = /* @__PURE__ */ new Map(), this._map.set(e, s)), s.has(t) || s.set(t, n), s.get(t);
  }
  set(e, t, n) {
    let s = this._map.get(e);
    return s || (s = /* @__PURE__ */ new Map(), this._map.set(e, s)), s.set(t, n), this;
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
    return Array.from(this._map.entries()).flatMap(([t, n]) => Array.from(n.entries()).map(([s, l]) => e(l, t, s)));
  }
}
class Jn extends Map {
  getFallback(e, t) {
    const n = this.get(e);
    return n === void 0 ? (this.set(e, t), t) : n;
  }
  map(e) {
    const t = [];
    return this.forEach((n, s) => {
      t.push(e(n, s));
    }), t;
  }
  flatMap(e) {
    const t = [];
    return this.forEach((n, s) => {
      t.push(...e(n, s));
    }), t;
  }
}
function _e(o) {
  return H(o) ? o : (Array.isArray(o) ? o : Object.entries(o)).filter((e) => e[1] != null);
}
function Qn(o) {
  return Array.isArray(o) ? o.find((e) => !Array.isArray(e) || Array.isArray(e[0])) ? o.map((e) => _e(e)) : [o] : [_e(o)];
}
function Zn(o) {
  return o.filter(([e, t], n) => {
    if (e.startsWith("$$"))
      return !1;
    for (let s = n - 1; s >= 0; s--)
      if (o[s][0] === e && o[s][1] === t)
        return !1;
    return !0;
  });
}
const ct = "__virtual_key__";
function Ee(o) {
  return o == null ? "" : Zn(o).map(([e, t]) => t != null && typeof t != "function" ? e !== ct ? `${e}:${t};` : t : void 0).filter(Boolean).join("");
}
function ve(o) {
  return o && typeof o == "object" && !Array.isArray(o);
}
function dt(o, e, t = !1) {
  const n = o, s = e;
  if (Array.isArray(s))
    return t && Array.isArray(s) ? [...n, ...s] : [...s];
  const l = { ...n };
  return ve(n) && ve(s) && Object.keys(s).forEach((c) => {
    ve(n[c]) && ve(s[c]) || Array.isArray(n[c]) && Array.isArray(s[c]) ? l[c] = dt(n[c], s[c], t) : Object.assign(l, { [c]: s[c] });
  }), l;
}
function ye(o) {
  let e, t, n;
  if (Array.isArray(o)) {
    for (t = Array.from({ length: e = o.length }); e--; ) t[e] = (n = o[e]) && typeof n == "object" ? ye(n) : n;
    return t;
  }
  if (Object.prototype.toString.call(o) === "[object Object]") {
    t = {};
    for (e in o)
      e === "__proto__" ? Object.defineProperty(t, e, {
        value: ye(o[e]),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : t[e] = (n = o[e]) && typeof n == "object" ? ye(n) : n;
    return t;
  }
  return o;
}
function es(o) {
  return H(o[0]);
}
function ts(o) {
  return H(o[0]);
}
const he = {};
function ns(o = ["-", ":"]) {
  const e = o.join("|");
  return he[e] || (he[e] = new RegExp(`((?:[!@<~\\w+:_-]|\\[&?>?:?\\S*\\])+?)(${e})\\(((?:[~!<>\\w\\s:/\\\\,%#.$?-]|\\[[^\\]]*?\\])+?)\\)(?!\\s*?=>)`, "gm")), he[e].lastIndex = 0, he[e];
}
function ss(o, e = ["-", ":"], t = 5) {
  const n = ns(e);
  let s, l = o.toString();
  const c = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
  do
    s = !1, l = l.replace(
      n,
      (i, a, d, r, g) => {
        if (!e.includes(d))
          return i;
        s = !0, c.add(a + d);
        const b = g + a.length + d.length + 1, f = { length: i.length, items: [] };
        m.set(g, f);
        for (const h of [...r.matchAll(/\S+/g)]) {
          const $ = b + h.index;
          let x = m.get($)?.items;
          x ? m.delete($) : x = [{
            offset: $,
            length: h[0].length,
            className: h[0]
          }];
          for (const w of x)
            w.className = w.className === "~" ? a : w.className.replace(/^(!?)(.*)/, `$1${a}${d}$2`), f.items.push(w);
        }
        return "$".repeat(i.length);
      }
    ), t -= 1;
  while (s && t);
  let u;
  if (typeof o == "string") {
    u = "";
    let i = 0;
    for (const [a, d] of m)
      u += o.slice(i, a), u += d.items.map((r) => r.className).join(" "), i = a + d.length;
    u += o.slice(i);
  } else {
    u = o;
    for (const [i, a] of m)
      u.overwrite(
        i,
        i + a.length,
        a.items.map((d) => d.className).join(" ")
      );
  }
  return {
    prefixes: Array.from(c),
    hasChanged: s,
    groupsByOffset: m,
    // Computed lazily because MagicString's toString does a lot of work
    get expanded() {
      return u.toString();
    }
  };
}
function os(o, e = ["-", ":"], t = 5) {
  const n = ss(o, e, t);
  return typeof o == "string" ? n.expanded : o;
}
const Xe = /* @__PURE__ */ new Set();
function ls(o) {
  Xe.has(o) || (console.warn("[unocss]", o), Xe.add(o));
}
function pt(o) {
  return Y(o).flatMap((e) => Array.isArray(e) ? [e] : Object.entries(e));
}
const qe = "_uno_resolved";
async function is(o) {
  let e = typeof o == "function" ? await o() : await o;
  if (qe in e)
    return e;
  e = { ...e }, Object.defineProperty(e, qe, {
    value: !0,
    enumerable: !1
  });
  const t = e.shortcuts ? pt(e.shortcuts) : void 0;
  if (e.shortcuts = t, e.prefix || e.layer) {
    const n = (s) => {
      s[2] || (s[2] = {});
      const l = s[2];
      l.prefix == null && e.prefix && (l.prefix = Y(e.prefix)), l.layer == null && e.layer && (l.layer = e.layer);
    };
    t?.forEach(n), e.rules?.forEach(n);
  }
  return e;
}
async function ft(o) {
  const e = await is(o);
  if (!e.presets)
    return [e];
  const t = (await Promise.all((e.presets || []).flatMap(Y).flatMap(ft))).flat();
  return [e, ...t];
}
function rs(o) {
  if (o.length === 0)
    return {};
  const e = [], t = [];
  let n = !1;
  const s = [], l = [];
  for (const m of o) {
    if (m.pipeline === !1) {
      n = !0;
      break;
    } else
      m.pipeline?.include && e.push(m.pipeline.include), m.pipeline?.exclude && t.push(m.pipeline.exclude);
    m.filesystem && s.push(m.filesystem), m.inline && l.push(m.inline);
  }
  const c = {
    pipeline: n ? !1 : {
      include: te(Je(...e)),
      exclude: te(Je(...t))
    }
  };
  return s.length && (c.filesystem = te(s.flat())), l.length && (c.inline = te(l.flat())), c;
}
async function Ke(o = {}, e = {}) {
  const t = Object.assign({}, e, o), n = Ye(
    (await Promise.all((t.presets || []).flatMap(Y).flatMap(ft))).flat(),
    (k, M) => k.name === M.name
  ), s = [
    ...n.filter((k) => k.enforce === "pre"),
    ...n.filter((k) => !k.enforce),
    ...n.filter((k) => k.enforce === "post")
  ], l = [
    ...s,
    t
  ], c = [...l].reverse(), m = Object.assign({}, In, ...l.map((k) => k.layers));
  function u(k) {
    return te(l.flatMap((M) => Y(M[k] || [])));
  }
  const i = u("extractors");
  let a = c.find((k) => k.extractorDefault !== void 0)?.extractorDefault;
  a === void 0 && (a = Hn), a && !i.includes(a) && i.unshift(a), i.sort((k, M) => (k.order || 0) - (M.order || 0));
  const d = u("rules"), r = d.length, g = {}, b = [];
  for (const [k, M] of d.entries()) {
    const S = M[2] ?? (M[2] = {});
    S.__index = k, es(M) ? Y(S.prefix ?? "").forEach((y) => {
      g[y + M[0]] = M;
    }) : b.unshift(M);
  }
  const f = {
    templates: te(l.flatMap((k) => Y(k.autocomplete?.templates))),
    extractors: l.flatMap((k) => Y(k.autocomplete?.extractors)).sort((k, M) => (k.order || 0) - (M.order || 0)),
    shorthands: us(l.map((k) => k.autocomplete?.shorthands || {}))
  };
  let h = u("separators");
  h.length || (h = [":", "-"]);
  const $ = u("content"), x = rs($), w = {
    mergeSelectors: !0,
    warn: !0,
    sortLayers: (k) => k,
    ...t,
    blocklist: u("blocklist"),
    presets: s,
    envMode: t.envMode || "build",
    shortcutsLayer: t.shortcutsLayer || "shortcuts",
    layers: m,
    theme: as(l.map((k) => k.theme)),
    rules: d,
    rulesSize: r,
    rulesDynamic: b,
    rulesStaticMap: g,
    preprocess: u("preprocess"),
    postprocess: u("postprocess"),
    preflights: u("preflights"),
    autocomplete: f,
    variants: u("variants").map(Xn).sort((k, M) => (k.order || 0) - (M.order || 0)),
    shortcuts: pt(u("shortcuts")).reverse(),
    extractors: i,
    safelist: u("safelist"),
    separators: h,
    details: t.details ?? t.envMode === "dev",
    content: x,
    transformers: Ye(u("transformers"), (k, M) => k.name === M.name)
  }, V = u("extendTheme");
  for (const k of V)
    w.theme = k(w.theme, w) || w.theme;
  for (const k of l)
    k?.configResolved?.(w);
  return w;
}
function as(o) {
  return o.map((e) => e ? ye(e) : {}).reduce((e, t) => dt(e, t), {});
}
function us(o) {
  return o.reduce((e, t) => {
    const n = {};
    for (const s in t) {
      const l = t[s];
      Array.isArray(l) ? n[s] = `(${l.join("|")})` : n[s] = l;
    }
    return {
      ...e,
      ...n
    };
  }, {});
}
function Je(...o) {
  return o.flatMap(cs);
}
function cs(o) {
  return Array.isArray(o) ? o : o ? [o] : [];
}
const ds = "66.5.1", Z = {
  shortcutsNoMerge: "$$symbol-shortcut-no-merge",
  noMerge: "$$symbol-no-merge",
  variants: "$$symbol-variants",
  parent: "$$symbol-parent",
  selector: "$$symbol-selector",
  layer: "$$symbol-layer",
  sort: "$$symbol-sort",
  body: "$$symbol-body"
};
class ze {
  constructor(e = {}, t = {}) {
    this.userConfig = e, this.defaults = t;
  }
  version = ds;
  events = Gn();
  config = void 0;
  cache = /* @__PURE__ */ new Map();
  blocked = /* @__PURE__ */ new Set();
  parentOrders = /* @__PURE__ */ new Map();
  activatedRules = /* @__PURE__ */ new Set();
  static async create(e = {}, t = {}) {
    const n = new ze(e, t);
    return n.config = await Ke(n.userConfig, n.defaults), n.events.emit("config", n.config), n;
  }
  async setConfig(e, t) {
    e && (t && (this.defaults = t), this.userConfig = e, this.blocked.clear(), this.parentOrders.clear(), this.activatedRules.clear(), this.cache.clear(), this.config = await Ke(e, this.defaults), this.events.emit("config", this.config));
  }
  async applyExtractors(e, t, n = /* @__PURE__ */ new Set()) {
    const s = {
      original: e,
      code: e,
      id: t,
      extracted: n,
      envMode: this.config.envMode
    };
    for (const l of this.config.extractors) {
      const c = await l.extract?.(s);
      if (c)
        if (Se(c) && Se(n))
          for (const m of c)
            n.setCount(m, n.getCount(m) + c.getCount(m));
        else
          for (const m of c)
            n.add(m);
    }
    return n;
  }
  makeContext(e, t) {
    const n = {
      rawSelector: e,
      currentSelector: t[1],
      theme: this.config.theme,
      generator: this,
      symbols: Z,
      variantHandlers: t[2],
      constructCSS: (...s) => this.constructCustomCSS(n, ...s),
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
    const s = this.config.preprocess.reduce((u, i) => i(u) ?? u, e);
    if (this.isBlocked(s)) {
      this.blocked.add(e), this.cache.set(n, null);
      return;
    }
    const l = await this.matchVariants(e, s);
    if (l.every((u) => !u || this.isBlocked(u[1]))) {
      this.blocked.add(e), this.cache.set(n, null);
      return;
    }
    const c = async (u) => {
      const i = this.makeContext(e, [t || u[0], u[1], u[2], u[3]]);
      this.config.details && (i.variants = [...u[3]]);
      const a = await this.expandShortcut(i.currentSelector, i);
      return a ? await this.stringifyShortcuts(i.variantMatch, i, a[0], a[1]) : (await this.parseUtil(i.variantMatch, i))?.map((r) => this.stringifyUtil(r, i)).filter(Le);
    }, m = (await Promise.all(l.map((u) => c(u)))).flat().filter((u) => !!u);
    if (m?.length)
      return this.cache.set(n, m), m;
    this.cache.set(n, null);
  }
  async generate(e, t = {}) {
    const {
      id: n,
      scope: s,
      preflights: l = !0,
      safelist: c = !0,
      minify: m = !1,
      extendedInfo: u = !1
    } = t, i = H(e) ? await this.applyExtractors(
      e,
      n,
      u ? new ut() : /* @__PURE__ */ new Set()
    ) : Array.isArray(e) ? new Set(e) : e;
    if (c) {
      const S = {
        generator: this,
        theme: this.config.theme
      };
      this.config.safelist.flatMap((C) => typeof C == "function" ? C(S) : C).forEach((C) => {
        const y = C.trim();
        y && !i.has(y) && i.add(y);
      });
    }
    const a = m ? "" : `
`, d = /* @__PURE__ */ new Set([ge]), r = u ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    let b = {};
    const f = Array.from(i).map(async (S) => {
      if (r.has(S))
        return;
      const C = await this.parseToken(S);
      if (C != null) {
        r instanceof Map ? r.set(S, {
          data: C,
          count: Se(i) ? i.getCount(S) : -1
        }) : r.add(S);
        for (const y of C) {
          const L = y[3] || "", F = y[4]?.layer;
          g.has(L) || g.set(L, []), g.get(L).push(y), F && d.add(F);
        }
      }
    });
    await Promise.all(f), await (async () => {
      if (!l)
        return;
      const S = {
        generator: this,
        theme: this.config.theme
      }, C = /* @__PURE__ */ new Set([]);
      this.config.preflights.forEach(({ layer: y = Re }) => {
        d.add(y), C.add(y);
      }), b = Object.fromEntries(
        await Promise.all(Array.from(C).map(
          async (y) => {
            const F = (await Promise.all(
              this.config.preflights.filter((z) => (z.layer || Re) === y).map(async (z) => await z.getCSS(S))
            )).filter(Boolean).join(a);
            return [y, F];
          }
        ))
      );
    })();
    const h = this.config.sortLayers(Array.from(d).sort((S, C) => (this.config.layers[S] ?? 0) - (this.config.layers[C] ?? 0) || S.localeCompare(C))), $ = {}, x = this.config.outputToCssLayers, w = (S) => {
      let C = S;
      return typeof x == "object" && (C = x.cssLayerName?.(S)), C === null ? null : C ?? S;
    }, V = (S = ge) => {
      if ($[S])
        return $[S];
      let C = Array.from(g).sort((F, z) => (this.parentOrders.get(F[0]) ?? 0) - (this.parentOrders.get(z[0]) ?? 0) || F[0]?.localeCompare(z[0] || "") || 0).map(([F, z]) => {
        const fe = z.length, ne = z.filter((I) => (I[4]?.layer || ge) === S).sort((I, q) => I[0] - q[0] || (I[4]?.sort || 0) - (q[4]?.sort || 0) || I[5]?.currentSelector?.localeCompare(q[5]?.currentSelector ?? "") || I[1]?.localeCompare(q[1] || "") || I[2]?.localeCompare(q[2] || "") || 0).map(([, I, q, , me, , Ce]) => [
          [[(I && ms(I, s)) ?? "", me?.sort ?? 0]],
          q,
          !!(Ce ?? me?.noMerge)
        ]);
        if (!ne.length)
          return;
        const se = ne.reverse().map(([I, q, me], Ce) => {
          if (!me && this.config.mergeSelectors)
            for (let ie = Ce + 1; ie < fe; ie++) {
              const Q = ne[ie];
              if (Q && !Q[2] && (I && Q[0] || I == null && Q[0] == null) && Q[1] === q)
                return I && Q[0] && Q[0].push(...I), null;
            }
          const ke = I ? te(I.sort((ie, Q) => ie[1] - Q[1] || ie[0]?.localeCompare(Q[0] || "") || 0).map((ie) => ie[0]).filter(Boolean)) : [];
          return ke.length ? `${ke.join(`,${a}`)}{${q}}` : q;
        }).filter(Boolean), oe = Array.from(new Set(se)).reverse().join(a);
        if (!F)
          return oe;
        const le = F.split(" $$ ");
        return `${le.join("{")}{${a}${oe}${a}${"}".repeat(le.length)}`;
      }).filter(Boolean).join(a);
      l && (C = [b[S], C].filter(Boolean).join(a));
      let y;
      x && C && (y = w(S), y !== null && (C = `@layer ${y}{${a}${C}${a}}`));
      const L = m ? "" : `/* layer: ${S}${y && y !== S ? `, alias: ${y}` : ""} */${a}`;
      return $[S] = C ? L + C : "";
    }, k = (S = h, C) => {
      const y = S.filter((L) => !C?.includes(L));
      return [
        x && y.length > 0 ? `@layer ${y.map(w).filter(Le).join(", ")};` : void 0,
        ...y.map((L) => V(L) || "")
      ].filter(Boolean).join(a);
    };
    return {
      get css() {
        return k();
      },
      layers: h,
      matched: r,
      getLayers: k,
      getLayer: V,
      setLayer: async (S, C) => {
        const y = await C(V(S));
        return $[S] = y, y;
      }
    };
  }
  async matchVariants(e, t) {
    const n = {
      rawSelector: e,
      theme: this.config.theme,
      generator: this
    }, s = async (l) => {
      let c = !0;
      const [, , m, u] = l;
      for (; c; ) {
        c = !1;
        const i = l[1];
        for (const a of this.config.variants) {
          if (!a.multiPass && u.has(a))
            continue;
          let d = await a.match(i, n);
          if (d) {
            if (H(d)) {
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
                const r = d.map((g) => {
                  const b = g.matcher ?? i, f = [g, ...m], h = new Set(u);
                  return h.add(a), [l[0], b, f, h];
                });
                return (await Promise.all(r.map((g) => s(g)))).flat();
              }
            }
            l[1] = d.matcher ?? i, m.unshift(d), u.add(a), c = !0;
            break;
          }
        }
        if (!c)
          break;
        if (m.length > 500)
          throw new Error(`Too many variants applied to "${e}"`);
      }
      return [l];
    };
    return await s([
      e,
      t || e,
      [],
      /* @__PURE__ */ new Set()
    ]);
  }
  applyVariants(e, t = e[4], n = e[1]) {
    const l = t.slice().sort((i, a) => (i.order || 0) - (a.order || 0)).reduceRight(
      (i, a) => (d) => {
        const r = a.body?.(d.entries) || d.entries, g = Array.isArray(a.parent) ? a.parent : [a.parent, void 0], b = a.selector?.(d.selector, r);
        return (a.handle ?? hs)({
          ...d,
          entries: r,
          selector: b || d.selector,
          parent: g[0] || d.parent,
          parentOrder: g[1] || d.parentOrder,
          layer: a.layer || d.layer,
          sort: a.sort || d.sort
        }, i);
      },
      (i) => i
    )({
      prefix: "",
      selector: vs(n),
      pseudo: "",
      entries: e[2]
    }), { parent: c, parentOrder: m } = l;
    c != null && m != null && this.parentOrders.set(c, m);
    const u = {
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
      i(u);
    return u;
  }
  constructCustomCSS(e, t, n) {
    const s = _e(t);
    if (H(s))
      return s;
    const { selector: l, entries: c, parent: m } = this.applyVariants([0, n || e.rawSelector, s, void 0, e.variantHandlers]), u = `${l}{${Ee(c)}}`;
    return m ? `${m}{${u}}` : u;
  }
  async parseUtil(e, t, n = !1, s) {
    const l = H(e) ? await this.matchVariants(e) : [e], c = async ([u, i, a]) => {
      this.config.details && (t.rules = t.rules ?? []);
      const d = {
        ...t,
        variantHandlers: a
      }, r = this.config.rulesStaticMap[i];
      if (r && r[1] && (n || !r[2]?.internal))
        return this.resolveCSSResult(u, r[1], r, d);
      for (const g of this.config.rulesDynamic) {
        const [b, f, h] = g;
        if (h?.internal && !n)
          continue;
        let $ = i;
        if (h?.prefix) {
          const k = Y(h.prefix);
          if (s) {
            const M = Y(s);
            if (!k.some((S) => M.includes(S)))
              continue;
          } else {
            const M = k.find((S) => i.startsWith(S));
            if (M == null)
              continue;
            $ = i.slice(M.length);
          }
        }
        const x = $.match(b);
        if (!x)
          continue;
        let w = await f(x, d);
        if (!w)
          continue;
        if (typeof w != "string")
          if (Symbol.asyncIterator in w) {
            const k = [];
            for await (const M of w)
              M && k.push(M);
            w = k;
          } else Symbol.iterator in w && !Array.isArray(w) && (w = Array.from(w).filter(Le));
        const V = this.resolveCSSResult(u, w, g, d);
        if (V)
          return V;
      }
    }, m = (await Promise.all(l.map((u) => c(u)))).flat().filter((u) => !!u);
    if (m.length)
      return m;
  }
  resolveCSSResult = (e, t, n, s) => {
    const l = Qn(t).filter((c) => c.length);
    if (l.length) {
      this.config.details && s.rules.push(n), s.generator.activatedRules.add(n);
      const c = n[2];
      return l.map((m) => {
        if (H(m))
          return [c.__index, m, c];
        let u = s.variantHandlers, i = c;
        for (const a of m)
          a[0] === Z.variants ? typeof a[1] == "function" ? u = a[1](u) || u : u = [
            ...Y(a[1]),
            ...u
          ] : a[0] === Z.parent ? u = [
            { parent: a[1] },
            ...u
          ] : a[0] === Z.selector ? u = [
            { selector: a[1] },
            ...u
          ] : a[0] === Z.layer ? u = [
            { layer: a[1] },
            ...u
          ] : a[0] === Z.sort ? i = {
            ...i,
            sort: a[1]
          } : a[0] === Z.noMerge ? i = {
            ...i,
            noMerge: a[1]
          } : a[0] === Z.body && (a[0] = ct);
        return [c.__index, e, m, i, u];
      });
    }
  };
  stringifyUtil(e, t) {
    if (!e)
      return;
    if (Ge(e))
      return [e[0], void 0, e[1], void 0, e[2], this.config.details ? t : void 0, void 0];
    const {
      selector: n,
      entries: s,
      parent: l,
      layer: c,
      sort: m,
      noMerge: u
    } = this.applyVariants(e), i = Ee(s);
    if (!i)
      return;
    const { layer: a, sort: d, ...r } = e[3] ?? {}, g = {
      ...r,
      layer: c ?? a,
      sort: m ?? d
    };
    return [e[0], n, i, l, g, this.config.details ? t : void 0, u];
  }
  async expandShortcut(e, t, n = 5) {
    if (n === 0)
      return;
    const s = this.config.details ? (i) => {
      t.shortcuts = t.shortcuts ?? [], t.shortcuts.push(i);
    } : qn;
    let l, c, m, u;
    for (const i of this.config.shortcuts) {
      let a = e;
      if (i[2]?.prefix) {
        const r = Y(i[2].prefix).find((g) => e.startsWith(g));
        if (r == null)
          continue;
        a = e.slice(r.length);
      }
      if (ts(i)) {
        if (i[0] === a) {
          l = l || i[2], c = i[1], s(i);
          break;
        }
      } else {
        const d = a.match(i[0]);
        if (d && (c = i[1](d, t)), c) {
          l = l || i[2], s(i);
          break;
        }
      }
    }
    if (c && (m = te(Y(c).filter(H).map((i) => os(i.trim()).split(/\s+/g)).flat()), u = Y(c).filter((i) => !H(i)).map((i) => ({ handles: [], value: i }))), !c) {
      const i = H(e) ? await this.matchVariants(e) : [e];
      for (const a of i) {
        const [d, r, g] = a;
        if (d !== r) {
          const b = await this.expandShortcut(r, t, n - 1);
          b && (m = b[0].filter(H).map((f) => d.replace(r, f)), u = b[0].filter((f) => !H(f)).map((f) => ({ handles: [...f.handles, ...g], value: f.value })));
        }
      }
    }
    if (!(!m?.length && !u?.length))
      return [
        [
          await Promise.all(Y(m).map(async (i) => (await this.expandShortcut(i, t, n - 1))?.[0] || [i])),
          u
        ].flat(2).filter((i) => !!i),
        l
      ];
  }
  async stringifyShortcuts(e, t, n, s = { layer: this.config.shortcutsLayer }) {
    const l = new Jn(), c = (await Promise.all(te(n).map(async (a) => {
      const d = H(a) ? await this.parseUtil(a, t, !0, s.prefix) : [[Number.POSITIVE_INFINITY, "{inline}", _e(a.value), void 0, a.handles]];
      return !d && this.config.warn && ls(`unmatched utility "${a}" in shortcut "${e[1]}"`), d || [];
    }))).flat(1).filter(Boolean).sort((a, d) => a[0] - d[0]), [m, , u] = e, i = [];
    for (const a of c) {
      if (Ge(a)) {
        i.push([a[0], void 0, a[1], void 0, a[2], t, void 0]);
        continue;
      }
      const { selector: d, entries: r, parent: g, sort: b, noMerge: f, layer: h } = this.applyVariants(a, [...a[4], ...u], m);
      l.getFallback(h ?? s.layer, new Kn()).getFallback(d, g, [[], a[0]])[0].push([r, !!(f ?? a[3]?.noMerge), b ?? 0]);
    }
    return i.concat(l.flatMap(
      (a, d) => a.map(([r, g], b, f) => {
        const h = (x, w, V) => {
          const k = Math.max(...V.map((S) => S[1])), M = V.map((S) => S[0]);
          return (x ? [M.flat(1)] : M).map((S) => {
            const C = Ee(S);
            if (C)
              return [g, b, C, f, { ...s, noMerge: w, sort: k, layer: d }, t, void 0];
          });
        };
        return [
          [r.filter(([, x]) => x).map(([x, , w]) => [x, w]), !0],
          [r.filter(([, x]) => !x).map(([x, , w]) => [x, w]), !1]
        ].map(([x, w]) => [
          ...h(!1, w, x.filter(([V]) => V.some((k) => k[0] === Z.shortcutsNoMerge))),
          ...h(!0, w, x.filter(([V]) => V.every((k) => k[0] !== Z.shortcutsNoMerge)))
        ]);
      }).flat(2).filter(Boolean)
    ));
  }
  isBlocked(e) {
    return !e || this.config.blocklist.map((t) => Array.isArray(t) ? t[0] : t).some((t) => typeof t == "function" ? t(e) : H(t) ? t === e : t.test(e));
  }
  getBlocked(e) {
    const t = this.config.blocklist.find((n) => {
      const s = Array.isArray(n) ? n[0] : n;
      return typeof s == "function" ? s(e) : H(s) ? s === e : s.test(e);
    });
    return t ? Array.isArray(t) ? t : [t, void 0] : void 0;
  }
}
async function ps(o, e) {
  return await ze.create(o, e);
}
const mt = /\s\$\$\s+/g;
function fs(o) {
  return mt.test(o);
}
function ms(o, e) {
  return fs(o) ? o.replace(mt, e ? ` ${e} ` : " ") : e ? `${e} ${o}` : o;
}
const Qe = /^\[(.+?)(~?=)"(.*)"\]$/;
function vs(o) {
  return Qe.test(o) ? o.replace(Qe, (e, t, n, s) => `[${Ae(t)}${n}"${Ae(s)}"]`) : `.${Ae(o)}`;
}
function hs(o, e) {
  return e(o);
}
const gs = E({});
function No() {
  return {
    uno: kt(async () => await ps(gs.value))
  };
}
const ys = ["onClick", "onMouseenter"], xs = { class: "flex-1 of-hidden whitespace-nowrap text-xs cursor-pointer select-none" }, bs = {
  key: 0,
  class: "text-yellow-400 op-72 text-2.75 ml-1"
}, _s = ["onClick"], ws = /* @__PURE__ */ N({
  __name: "Tree",
  props: {
    elements: {},
    depth: { default: 0 },
    elFilter: {},
    checkedElement: {},
    onHover: {}
  },
  emits: ["change"],
  setup(o, { emit: e }) {
    const t = o, n = e;
    function s(i) {
      t.onHover?.(i);
    }
    const l = E(/* @__PURE__ */ new Map());
    function c(i) {
      return Array.from(i.children).filter((a) => !t.elFilter || !t.elFilter(a));
    }
    function m(i) {
      const a = l.value.get(i) ?? !0;
      l.value.set(i, !a);
    }
    function u(i) {
      return l.value.get(i) ?? !0;
    }
    return (i, a) => {
      const d = yt("Tree", !0);
      return v(), _("div", null, [
        (v(!0), _(G, null, K(i.elements, (r) => (v(), _("div", {
          key: r,
          style: ee({ paddingLeft: `${t.depth * 2}px` }),
          class: ""
        }, [
          p("div", {
            class: j(["flex items-center gap-1 w-full hover:bg-white/10 px-1.5 py-1 my-1 group rounded-sm", { "important:bg-white/10": i.checkedElement === r }]),
            onClick: (g) => c(r).length > 0 && m(r),
            onMouseenter: (g) => s(r),
            onMouseleave: a[0] || (a[0] = (g) => s(null))
          }, [
            c(r).length > 0 ? (v(), _("div", {
              key: 0,
              class: j(["text-xs transition-transform duration-200", u(r) ? "rotate-0" : "-rotate-90"]),
              "i-hugeicons:arrow-down-01": ""
            }, null, 2)) : T("", !0),
            p("div", xs, [
              p("span", {
                class: j([R(Ut)(r.tagName.toLowerCase()), i.checkedElement === r ? "fw-bold" : ""])
              }, A(r.tagName.toLowerCase()), 3),
              r.id ? (v(), _("span", bs, "#" + A(r.id), 1)) : T("", !0),
              p("span", {
                class: j(["group-hover:op-100 op-0", { "op-100!": i.checkedElement === r }])
              }, [
                (v(!0), _(G, null, K(Array.from(r.classList), (g) => (v(), _("span", {
                  key: g,
                  class: "text-green-400 op-72 text-2.75 ml-1"
                }, "." + A(g), 1))), 128))
              ], 2)
            ]),
            p("div", {
              class: j(["ml-1 h-4 flex items-center op-0 group-hover:op-100", { "op-100!": i.checkedElement === r }]),
              onClick: ce((g) => n("change", r), ["stop"])
            }, [
              O(ae, {
                type: "radio",
                shape: "round",
                size: 3,
                style: { "--context-color": "var(--colors-purple-DEFAULT)" },
                "model-value": i.checkedElement === r
              }, null, 8, ["model-value"])
            ], 10, _s)
          ], 42, ys),
          c(r).length > 0 && u(r) ? (v(), W(d, {
            key: 0,
            elements: c(r),
            depth: i.depth + 1,
            "el-filter": i.elFilter,
            "checked-element": i.checkedElement,
            "on-hover": i.onHover,
            onChange: a[1] || (a[1] = (g) => n("change", g))
          }, null, 8, ["elements", "depth", "el-filter", "checked-element", "on-hover"])) : T("", !0)
        ], 4))), 128))
      ]);
    };
  }
}), $s = {
  "p-2": "",
  "h-60": "",
  "of-y-auto": "",
  "no-scrollbar": ""
}, Cs = /* @__PURE__ */ N({
  __name: "DomTree",
  setup(o) {
    const { element: e } = J(), t = E([]);
    function n(u) {
      return !!(["style", "script", "link", "meta", "title", "noscript", "template"].includes(u.tagName.toLowerCase()) || Array.from(u.classList).some((i) => i.startsWith("uno-inspect")) || getComputedStyle(u).pointerEvents === "none");
    }
    const s = E(!1), l = E(e.value), c = St((u) => {
      u ? e.value = u : e.value = l.value, s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 100);
    }, 150);
    function m(u) {
      l.value = u, e.value = u, s.value = !0, setTimeout(() => {
        s.value = !1;
      }, 100);
    }
    return Oe(() => {
      t.value = Array.from(document.body.children).filter((u) => !n(u));
    }), U(e, (u) => {
      s.value || (l.value = u);
    }), (u, i) => (v(), _("div", $s, [
      O(ws, {
        elements: t.value,
        "checked-element": l.value,
        "on-hover": R(c),
        onChange: m
      }, null, 8, ["elements", "checked-element", "on-hover"])
    ]));
  }
}), ks = {
  m0: "",
  "mb-2": "",
  flex: "~ items-center justify-between"
}, Ss = { flex: "~ items-center gap-1" }, De = /* @__PURE__ */ N({
  __name: "PanelTitle",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (v(), _("h5", ks, [
      p("div", Ss, [
        e.icon ? (v(), _("div", {
          key: 0,
          class: j(e.icon)
        }, null, 2)) : T("", !0),
        p("span", null, A(e.title), 1)
      ]),
      de(e.$slots, "default")
    ]));
  }
}), As = {
  "p-3": "",
  "no-scrollbar": ""
}, Ls = {
  flex: "~ items-center gap-2",
  "flex-1": ""
}, Es = {
  key: 0,
  class: "text-sky-300 px-2.1 py-1.5 text-xs flex-[0_0_35%] select-none decoration-line-through"
}, Ms = {
  key: 2,
  class: "text-white/80 px-2.1 py-1.5 text-xs flex-1 select-none decoration-line-through"
}, Ze = /* @__PURE__ */ N({
  __name: "InlineStyles",
  setup(o) {
    const { element: e, tracking: t } = J(), n = E([]), s = B(() => {
      const u = {};
      return n.value.forEach((i) => {
        u[i] = !0;
      }), u;
    }), l = B(() => {
      t();
      const u = {};
      if (!e.value)
        return u;
      const i = e.value;
      if (i.style.length > 0) {
        const a = i.__vnode;
        if (a)
          for (const [d, r] of Object.entries(a.props?.style || {}))
            u[d] = r;
        else
          for (let d = 0; d < i.style.length; d++) {
            const r = i.style.item(d);
            u[r] = i.style.getPropertyValue(r);
          }
      }
      return u;
    });
    U(l, (u) => {
      const i = Object.keys(u);
      n.value = i;
    }, { immediate: !0 }), U(n, (u, i) => {
      if (!e.value)
        return;
      const a = e.value, d = Object.keys(l.value);
      u.forEach((r) => {
        if (!i?.includes(r)) {
          const g = l.value[r];
          g && a.style.setProperty(r, g);
        }
      }), d.forEach((r) => {
        !u.includes(r) && i?.includes(r) && a.style.removeProperty(r);
      });
    }, { deep: !0 });
    function c(u, i) {
      if (!e.value || !i.trim() || u === i || !s.value[u])
        return;
      const a = e.value, d = l.value[u];
      a.style.removeProperty(u), d && a.style.setProperty(i, d);
      const r = [...n.value], g = r.indexOf(u);
      g !== -1 && (r[g] = i, n.value = r);
    }
    function m(u, i) {
      if (!e.value || !u || !s.value[u])
        return;
      const a = e.value;
      if (i.trim())
        a.style.setProperty(u, i);
      else {
        a.style.removeProperty(u);
        const d = n.value.indexOf(u);
        d !== -1 && n.value.splice(d, 1);
      }
    }
    return (u, i) => (v(), _("div", As, [
      O(De, {
        title: "Styles",
        icon: "i-hugeicons:drawing-mode"
      }),
      Object.keys(l.value).length > 0 ? (v(), W(pe, {
        key: 0,
        modelValue: n.value,
        "onUpdate:modelValue": i[0] || (i[0] = (a) => n.value = a),
        type: "checkbox",
        class: "space-y-1.5"
      }, {
        default: D(() => [
          (v(!0), _(G, null, K(l.value, (a, d) => (v(), _("div", {
            key: `inline-${d}`,
            class: j(["flex items-center group w-full", { "op-50": !s.value[d] }])
          }, [
            O(ae, {
              style: { "--context-color": "var(--colors-purple-DEFAULT)" },
              shape: "round",
              type: "checkbox",
              size: 3.4,
              "model-value": d,
              class: "group-hover:opacity-100 opacity-0 transition-opacity duration-200"
            }, null, 8, ["model-value"]),
            p("div", Ls, [
              s.value[d] ? (v(), W(re, {
                key: 1,
                class: "flex-[0_0_35%]",
                "model-value": d,
                borderable: !1,
                inputable: "",
                placeholder: "Property",
                "input-class": "text-sky-300",
                "onUpdate:modelValue": (r) => c(d, String(r))
              }, null, 8, ["model-value", "onUpdate:modelValue"])) : (v(), _("div", Es, A(d), 1)),
              i[1] || (i[1] = p("span", { class: "text-white/50 text-xs" }, ":", -1)),
              s.value[d] ? (v(), W(re, {
                key: 3,
                "model-value": a,
                "flex-1": "",
                borderable: !1,
                inputable: "",
                placeholder: "Value",
                "input-class": "text-white/80",
                "onUpdate:modelValue": (r) => m(d, String(r))
              }, null, 8, ["model-value", "onUpdate:modelValue"])) : (v(), _("div", Ms, A(a), 1))
            ])
          ], 2))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])) : (v(), W(at, { key: 1 }))
    ]));
  }
}), Ts = [
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
], Vs = [
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
], Me = [
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
], Fs = {
  "text-xs": "",
  flex: "~ items-center gap-2",
  "w-full": ""
}, Rs = { class: "flex-1" }, js = {
  key: 0,
  "op-50": ""
}, Bs = {
  flex: "~ items-center gap-1",
  "text-sm": ""
}, Os = { "flex-1": "" }, Ns = {
  key: 0,
  "op-50": ""
}, zs = {
  flex: "~ items-center gap-1",
  "text-sm": ""
}, Ue = /* @__PURE__ */ N({
  __name: "WH",
  setup(o) {
    const { element: e, tracking: t, triggering: n } = J(), s = E(!1), l = E(!1), c = E(1);
    function m(f) {
      if (!f)
        return { num: 0, unit: "px" };
      const h = f.match(/^([\d.]+)(px|rem|%)$/);
      return h ? { num: Number.parseFloat(h[1]), unit: h[2] } : { num: Number.parseFloat(f) || 0, unit: "px" };
    }
    function u(f, h) {
      return h === "%" ? `${f}%` : `${f}${h}`;
    }
    const i = B({
      get: () => {
        if (!e.value)
          return "";
        t();
        let f = e.value.style.width;
        if ((!f || f === "") && (f = window.getComputedStyle(e.value).width, f === "auto" || Number.parseFloat(f) > 9999) || !f || f === "0px")
          return "";
        if (f === "auto")
          return "auto";
        if (f.includes("%"))
          return f;
        const { num: h, unit: $ } = m(f);
        return s.value && $ === "px" ? String(Ie(h)) : !s.value && $ === "rem" ? String(Pe(h)) : X(h);
      },
      set: (f) => {
        if (e.value && f) {
          if (f === "auto" || String(f).includes("%")) {
            e.value.style.width = String(f), n();
            return;
          }
          const h = Number.parseFloat(String(f));
          if (Number.isNaN(h))
            return;
          const $ = s.value ? "rem" : "px", x = `${h}${$}`, w = e.value.style.height;
          if (e.value.style.width = x, l.value && x !== "auto" && w && w !== "auto") {
            const { num: V } = m(x), k = V / c.value, { unit: M } = m(w);
            e.value.style.height = u(k, M);
          }
          n();
        }
      }
    }), a = B({
      get: () => {
        if (!e.value)
          return "";
        t();
        let f = e.value.style.height;
        if ((!f || f === "") && (f = window.getComputedStyle(e.value).height, f === "auto" || Number.parseFloat(f) > 9999) || !f || f === "0px")
          return "";
        if (f === "auto")
          return "auto";
        if (f.includes("%"))
          return f;
        const { num: h, unit: $ } = m(f);
        return s.value && $ === "px" ? String(Ie(h)) : !s.value && $ === "rem" ? String(Pe(h)) : X(h);
      },
      set: (f) => {
        if (e.value && f) {
          if (f === "auto" || String(f).includes("%")) {
            e.value.style.height = String(f), n();
            return;
          }
          const h = Number.parseFloat(String(f));
          if (Number.isNaN(h))
            return;
          const $ = s.value ? "rem" : "px", x = `${h}${$}`, w = e.value.style.width;
          if (e.value.style.height = x, l.value && x !== "auto" && w && w !== "auto") {
            const { num: V } = m(x), k = V * c.value, { unit: M } = m(w);
            e.value.style.width = u(k, M);
          }
          n();
        }
      }
    });
    U([i, a], ([f, h]) => {
      if (f && h && f !== "auto" && h !== "auto" && !String(f).includes("%") && !String(h).includes("%")) {
        const $ = Number.parseFloat(String(f)), x = Number.parseFloat(String(h));
        $ > 0 && x > 0 && (c.value = $ / x);
      }
    }, { immediate: !0 }), U(s, () => {
      n();
    });
    function d() {
      s.value = !s.value;
    }
    function r() {
      if (e.value) {
        const f = e.value.style.width;
        e.value.style.width = e.value.style.height, e.value.style.height = f, n();
      }
    }
    function g() {
      if (l.value = !l.value, l.value) {
        const f = e.value?.style.width, h = e.value?.style.height;
        if (f && h && f !== "auto" && h !== "auto") {
          const $ = m(f).num, x = m(h).num;
          $ > 0 && x > 0 && (c.value = $ / x);
        }
      }
    }
    const b = [
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
    return (f, h) => (v(), _("div", Fs, [
      p("div", Rs, [
        O(re, {
          modelValue: i.value,
          "onUpdate:modelValue": h[0] || (h[0] = ($) => i.value = $),
          options: b,
          placeholder: "Width...",
          inputable: ""
        }, {
          prefix: D(() => [...h[2] || (h[2] = [
            p("span", { "op-50": "" }, "W", -1)
          ])]),
          suffix: D(() => [
            i.value && i.value !== "auto" && !String(i.value).includes("%") ? (v(), _("span", js, A(s.value ? "rem" : "px"), 1)) : T("", !0)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", Bs, [
        p("div", {
          "i-hugeicons:exchange-01": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          class: j({ "op-100": s.value }),
          onClick: d
        }, null, 2),
        p("div", {
          "i-hugeicons:arrow-data-transfer-horizontal": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          onClick: r
        })
      ]),
      p("div", Os, [
        O(re, {
          modelValue: a.value,
          "onUpdate:modelValue": h[1] || (h[1] = ($) => a.value = $),
          options: b,
          placeholder: "Height...",
          inputable: ""
        }, {
          prefix: D(() => [...h[3] || (h[3] = [
            p("span", { "op-50": "" }, "H", -1)
          ])]),
          suffix: D(() => [
            a.value && a.value !== "auto" && !String(a.value).includes("%") ? (v(), _("span", Ns, A(s.value ? "rem" : "px"), 1)) : T("", !0)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", zs, [
        p("div", {
          "i-hugeicons:connect": "",
          "cursor-pointer": "",
          "op-50": "",
          "hover:op-100": "",
          class: j({ "op-100! text-blue-500": l.value }),
          onClick: g
        }, null, 2)
      ])
    ]));
  }
}), Ds = { class: "space-y-2" }, Us = { flex: "~ gap-2" }, Is = {
  "flex-1": "",
  class: "b b-solid b-white/10 grid grid-cols-3 grid-gap-0.5 rd-md p-1 text-xs h-17"
}, Ps = ["title", "onClick"], Ws = { flex: "1 ~ col gap-2" }, vt = /* @__PURE__ */ N({
  __name: "FlexLayout",
  props: {
    direction: {},
    wrap: { type: Boolean, default: !1 }
  },
  setup(o) {
    const e = o, { classList: t } = rt(), n = E(null), s = E("auto"), l = E("auto"), c = E("auto"), m = B(() => e.direction === "row" ? Ts : Vs), u = B(() => e.direction === "row" && e.wrap), i = B(() => {
      const $ = t.value;
      for (const x of m.value)
        if (x.class.split(" ").every((V) => $.includes(V)))
          return x.id;
      return null;
    }), a = B(() => {
      const x = t.value.find((w) => w.startsWith("gap-") && !w.startsWith("gap-x-") && !w.startsWith("gap-y-"));
      return x ? x.replace("gap-", "") : "auto";
    }), d = B(() => {
      const x = t.value.find((w) => w.startsWith("gap-x-"));
      return x ? x.replace("gap-x-", "") : "auto";
    }), r = B(() => {
      const x = t.value.find((w) => w.startsWith("gap-y-"));
      return x ? x.replace("gap-y-", "") : "auto";
    });
    U(i, ($) => {
      n.value = $;
    }, { immediate: !0 }), U(a, ($) => {
      s.value = $;
    }, { immediate: !0 }), U(d, ($) => {
      l.value = $;
    }, { immediate: !0 }), U(r, ($) => {
      c.value = $;
    }, { immediate: !0 });
    function g($) {
      const x = t.value.filter((V) => !V.startsWith("justify-") && !V.startsWith("items-")), w = $.class.split(" ");
      t.value = [...x, ...w], n.value = $.id;
    }
    function b($) {
      const x = String($), w = t.value.filter((V) => !V.startsWith("gap-"));
      t.value = [...w, `gap-${x}`];
    }
    function f($) {
      const x = String($), w = t.value.filter((V) => !V.startsWith("gap-x-"));
      t.value = [...w, `gap-x-${x}`];
    }
    function h($) {
      const x = String($), w = t.value.filter((V) => !V.startsWith("gap-y-"));
      t.value = [...w, `gap-y-${x}`];
    }
    return ($, x) => (v(), _("div", Ds, [
      O(Ue),
      p("div", Us, [
        p("div", Is, [
          (v(!0), _(G, null, K(m.value, (w) => (v(), _("div", {
            key: w.label,
            title: w.label,
            class: "group relative flex justify-center items-center cursor-pointer",
            onClick: (V) => g(w)
          }, [
            p("div", {
              class: j([[w.icon, n.value === w.id ? "text-yellow-500 op-100" : ""], "op-0 transition-opacity group-hover:op-100"])
            }, null, 2),
            p("div", {
              class: j([n.value === w.id ? "op-0!" : "", "bg-white/50 size-1.3 rd-full op-100 transition-opacity group-hover:op-0 pos-center"])
            }, null, 2)
          ], 8, Ps))), 128))
        ]),
        p("div", Ws, [
          u.value ? (v(), _(G, { key: 1 }, [
            O(re, {
              modelValue: l.value,
              "onUpdate:modelValue": [
                x[1] || (x[1] = (w) => l.value = w),
                f
              ],
              placeholder: "Gap X",
              options: R(Me),
              inputable: ""
            }, {
              prefix: D(() => [...x[4] || (x[4] = [
                p("div", {
                  "i-hugeicons:paragraph-spacing": "",
                  "rotate-90": ""
                }, null, -1)
              ])]),
              _: 1
            }, 8, ["modelValue", "options"]),
            O(re, {
              modelValue: c.value,
              "onUpdate:modelValue": [
                x[2] || (x[2] = (w) => c.value = w),
                h
              ],
              placeholder: "Gap Y",
              options: R(Me),
              inputable: ""
            }, {
              prefix: D(() => [...x[5] || (x[5] = [
                p("div", { "i-hugeicons:paragraph-spacing": "" }, null, -1)
              ])]),
              _: 1
            }, 8, ["modelValue", "options"])
          ], 64)) : (v(), W(re, {
            key: 0,
            modelValue: s.value,
            "onUpdate:modelValue": [
              x[0] || (x[0] = (w) => s.value = w),
              b
            ],
            placeholder: "Gap",
            options: R(Me),
            inputable: ""
          }, {
            prefix: D(() => [...x[3] || (x[3] = [
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
}), Hs = /* @__PURE__ */ N({
  __name: "FlexCol",
  setup(o) {
    return (e, t) => (v(), W(vt, { direction: "col" }));
  }
}), Ys = /* @__PURE__ */ N({
  __name: "FlexRow",
  props: {
    wrap: { type: Boolean }
  },
  setup(o) {
    return (e, t) => (v(), W(vt, {
      direction: "row",
      wrap: e.wrap
    }, null, 8, ["wrap"]));
  }
}), Gs = /* @__PURE__ */ N({
  __name: "Freedom",
  setup(o) {
    const { element: e, tracking: t, setElementStyle: n } = J(), s = B({
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
    return (l, c) => (v(), _("div", null, [
      O(Ue),
      O(ae, {
        modelValue: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (m) => s.value = m),
        "mt-2": "",
        style: { "--context-color": "var(--colors-sky-DEFAULT)" },
        label: "Clip Content"
      }, null, 8, ["modelValue"])
    ]));
  }
}), Xs = /* @__PURE__ */ N({
  __name: "Grid",
  setup(o) {
    return (e, t) => (v(), _("div", null, [
      O(Ue)
    ]));
  }
}), qs = { "p-2": "" }, Ks = { flex: "~ items-center gap-1" }, Js = {
  flex: "~ items-center gap-2",
  bg: "white/10",
  "rd-sm": "",
  "p-0.5": "",
  "mb-2": "",
  "un-children": "py-0.75 flex-1 flex items-center justify-center rd-2.5px text-sm op-50 @active:op-100 @active:bg-white/20! cursor-pointer hover:bg-white/50 transition-all"
}, Qs = ["title", "onClick"], Zs = { "min-h-40": "" }, eo = /* @__PURE__ */ N({
  __name: "index",
  setup(o) {
    const { element: e } = J(), t = E(""), n = E(!1), s = E([
      { id: "freedom", icon: "i-custom:freedom?mask", component: Gs },
      { id: "horizontal", icon: "i-custom:horizontal?mask", component: Ys },
      { id: "vertical", icon: "i-custom:vertical?mask", component: Hs },
      { id: "grid", icon: "i-hugeicons:dashboard-square-03?mask", component: Xs }
    ]), l = E(s.value[0].id), c = B(() => s.value.find((a) => a.id === l.value) || s.value[0]);
    function m(a) {
      l.value = a;
    }
    const [u, i] = xe(!1);
    return Oe(() => {
      if (e.value) {
        const a = window.getComputedStyle(e.value);
        t.value = a.display, n.value = t.value.startsWith("inline");
      }
    }), tt(() => {
      if (e.value) {
        const a = window.getComputedStyle(e.value);
        a.display.includes("flex") ? (a.flexDirection === "column" ? l.value = "vertical" : l.value = "horizontal", a.flexWrap === "wrap" ? u.value = !0 : u.value = !1) : a.display.includes("grid") ? l.value = "grid" : l.value = "freedom", a.flexWrap === "wrap" && (u.value = !0);
      }
    }), (a, d) => (v(), _("section", qs, [
      O(De, {
        title: "Auto Layout",
        icon: "i-hugeicons:dashboard-square-02"
      }, {
        default: D(() => [
          p("div", Ks, [
            c.value.id === "horizontal" ? (v(), _("div", {
              key: 0,
              title: "Wrap text",
              "i-hugeicons:text-wrap": "",
              "op-50": "",
              "hover:op-100": "",
              "cursor-pointer": "",
              class: j({ "text-purple op-100!": R(u) }),
              onClick: d[0] || (d[0] = (r) => R(i)())
            }, null, 2)) : T("", !0)
          ])
        ]),
        _: 1
      }),
      p("div", Js, [
        (v(!0), _(G, null, K(s.value, (r) => (v(), _("div", {
          key: r.id,
          class: j({ active: c.value.id === r.id }),
          title: r.id,
          onClick: (g) => m(r.id)
        }, [
          p("div", {
            class: j(r.icon)
          }, null, 2)
        ], 10, Qs))), 128))
      ]),
      p("div", Zs, [
        O(Be, {
          "enter-active-class": "animate-fade-in animate-duration-200",
          "leave-active-class": "animate-fade-out animate-duration-200",
          mode: "out-in"
        }, {
          default: D(() => [
            (v(), W(st(c.value.component), { wrap: R(u) }, null, 8, ["wrap"]))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), to = {
  key: 0,
  class: "p-3 no-scrollbar"
}, no = { flex: "~ items-center gap-2" }, so = ["title"], oo = { class: "mb-1 flex items-center gap-2 text-xs" }, lo = {
  key: 0,
  "i-hugeicons:star": "",
  class: "text-xs text-yellow ml-0.5",
  title: "Recommended"
}, io = { class: "mb-2 text-2.5 text-white/50 leading-relaxed" }, ro = {
  key: 0,
  flex: "~ items-center gap-1"
}, ao = {
  key: 1,
  flex: "~ items-center gap-1"
}, uo = ["placeholder"], co = {
  key: 0,
  class: "mt-2 text-xs text-orange/80 flex items-center gap-1"
}, po = /* @__PURE__ */ N({
  __name: "TextContent",
  setup(o) {
    const { element: e, tracking: t, triggering: n } = J(), s = E("innerText"), l = E(""), c = B(() => {
      if (t(), !e.value)
        return "";
      switch (s.value) {
        case "innerText":
          return e.value.innerText || "";
        case "innerHTML":
          return e.value.innerHTML || "";
        default:
          return "";
      }
    }), m = B(() => {
      if (!e.value)
        return !1;
      const r = e.value.textContent || "", g = e.value.innerHTML || "";
      return g.includes("<") && g !== r;
    }), u = B(() => e.value && m.value ? "innerHTML" : "innerText");
    U(c, (r) => {
      l.value = r;
    }, { immediate: !0 }), U(s, () => {
      l.value = c.value;
    });
    function i() {
      if (e.value) {
        switch (s.value) {
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
      s.value = u.value;
    }
    return (r, g) => c.value ? (v(), _("div", to, [
      O(De, {
        icon: "i-hugeicons:quill-write-01",
        title: "Element Content"
      }, {
        default: D(() => [
          p("div", no, [
            u.value !== s.value ? (v(), _("div", {
              key: 0,
              "i-hugeicons:magic-wand-01": "",
              title: `Use recommended: ${u.value}`,
              "text-sm": "",
              "op-64": "",
              hover: "op-100 text-blue",
              "cursor-pointer": "",
              onClick: d
            }, null, 8, so)) : T("", !0),
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
      p("div", oo, [
        g[2] || (g[2] = p("span", { text: "white/60" }, "Type:", -1)),
        O(pe, {
          modelValue: s.value,
          "onUpdate:modelValue": g[0] || (g[0] = (b) => s.value = b),
          type: "radio",
          class: "flex items-center gap-3",
          style: { "--context-color": "var(--colors-yellow-DEFAULT)" }
        }, {
          default: D(() => [
            (v(), _(G, null, K(["innerText", "innerHTML"], (b) => p("div", {
              key: b,
              class: j(["flex items-center gap-1", { "text-yellow": s.value === b, "text-white/60": s.value !== b }])
            }, [
              O(ae, {
                "model-value": b,
                label: b,
                type: "radio",
                shape: "round",
                size: 2.8
              }, null, 8, ["model-value", "label"]),
              b === u.value ? (v(), _("div", lo)) : T("", !0)
            ], 2)), 64))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      p("div", io, [
        s.value === "innerText" ? (v(), _("div", ro, [...g[3] || (g[3] = [
          p("div", {
            "i-hugeicons:information-circle": "",
            "text-sky-300": ""
          }, null, -1),
          P(" Only visible text content ", -1)
        ])])) : s.value === "innerHTML" ? (v(), _("div", ao, [...g[4] || (g[4] = [
          p("div", {
            "i-hugeicons:alert-02": "",
            "text-yellow": ""
          }, null, -1),
          P(" HTML content with tags (be careful with XSS) ", -1)
        ])])) : T("", !0)
      ]),
      je(p("textarea", {
        "onUpdate:modelValue": g[1] || (g[1] = (b) => l.value = b),
        class: "btn-clear min-h-20 h-30 max-h-60 w-full resize-y box-border p-2",
        border: "~ white/10 solid",
        "rd-md": "",
        text: "xs white/72",
        placeholder: `Enter ${s.value} content...`,
        font: "mono"
      }, null, 8, uo), [
        [nt, l.value]
      ]),
      m.value ? (v(), _("div", co, [...g[5] || (g[5] = [
        p("div", { "i-hugeicons:code": "" }, null, -1),
        p("span", null, "This element contains HTML content", -1)
      ])])) : T("", !0)
    ])) : T("", !0);
  }
}), fo = [
  { id: "basic", label: "Basic Info", icon: "i-hugeicons:alert-diamond", component: sn },
  { id: "classes", label: "Class", icon: "i-hugeicons:colors", component: zn },
  { id: "styles", label: "Inline Styles", icon: "i-hugeicons:left-to-right-list-star", component: Ze },
  { id: "layout", label: "Layout", icon: "i-hugeicons:layout-03", component: eo },
  { id: "colors", label: "Colors", icon: "i-hugeicons:biscuit", component: Ze },
  { id: "box", label: "Box Model", icon: "i-hugeicons:package-dimensions-02", component: Sn },
  { id: "text", label: "Text", icon: "i-hugeicons:text-footnote", component: po },
  { id: "dom-tree", label: "Dom Tree", icon: "i-hugeicons:crowdfunding", component: Cs }
  // { id: 'setting', label: 'Setting', icon: 'i-hugeicons:ai-setting', component: Settings },
];
function mo(o = []) {
  const e = E([...fo, ...o]), t = E(e.value[0].id), n = E("right");
  function s(c) {
    const m = e.value.findIndex((i) => i.id === t.value);
    e.value.findIndex((i) => i.id === c) < m ? n.value = "right" : n.value = "left", t.value = c;
  }
  const l = B(() => e.value.find((c) => c.id === t.value));
  return {
    tabs: e,
    activeTab: l,
    slideDirection: n,
    setActiveTab: s
  };
}
const vo = {
  "b-b": "~ solid white/10",
  class: "flex justify-between items-center px-2 py-1.5 select-none text-xl"
}, ho = { class: "flex items-center gap-2" }, go = {
  class: "flex items-center gap-1.25 px-2 py-1 no-scrollbar of-x-auto",
  "b-b": "~ solid white/10"
}, yo = ["title", "onClick"], xo = { class: "flex-1 overflow-y-auto relative no-scrollbar" }, bo = /* @__PURE__ */ N({
  __name: "ElementInfo",
  props: {
    isSelected: { type: Boolean },
    action: {},
    userPanels: {}
  },
  setup(o) {
    const e = o, { element: t, triggering: n } = J(), { width: s, height: l } = ot(), { x: c, y: m } = At(), u = E(), [i, a] = xe(!1), d = E({ x: 0, y: 0 }), r = E({ x: 0, y: 0 }), g = E({ x: 0, y: 0 }), b = E({ x: 0, y: 0 }), { tabs: f, activeTab: h, slideDirection: $, setActiveTab: x } = mo(e.userPanels);
    function w(y, L) {
      const ne = u.value?.offsetHeight || 350, se = 10;
      let oe = y + 20, le = L + 20;
      return oe + 300 > s.value && (oe = y - 300 - 20), le + ne > l.value && (le = L - ne - 20), oe < se && (oe = se), le < se && (le = se), { x: oe, y: le };
    }
    const V = B(() => {
      let y, L;
      if (e.isSelected)
        if (i.value)
          y = r.value.x, L = r.value.y;
        else if (g.value.x !== 0 || g.value.y !== 0)
          y = g.value.x, L = g.value.y;
        else {
          const F = w(b.value.x, b.value.y);
          y = F.x, L = F.y;
        }
      else {
        const F = w(c.value, m.value);
        y = F.x, L = F.y;
      }
      return {
        position: "fixed",
        left: `${y}px`,
        top: `${L}px`,
        zIndex: "1001"
      };
    });
    function k() {
      n();
    }
    function M(y) {
      if (!e.isSelected)
        return;
      const L = y.currentTarget.closest(".uno-inspect-element-info")?.getBoundingClientRect();
      L && (d.value = {
        x: y.clientX - L.left,
        y: y.clientY - L.top
      }, r.value = {
        x: L.left,
        y: L.top
      }), i.value = !0, document.addEventListener("mousemove", S), document.addEventListener("mouseup", C), y.preventDefault();
    }
    function S(y) {
      if (!i.value)
        return;
      const L = y.clientX - d.value.x, F = y.clientY - d.value.y, z = 300, fe = u.value?.offsetHeight || 350, ne = s.value - z, se = l.value - fe;
      r.value = {
        x: Math.max(0, Math.min(L, ne)),
        y: Math.max(0, Math.min(F, se))
      };
    }
    function C() {
      i.value && (g.value = {
        x: r.value.x,
        y: r.value.y
      }), i.value = !1, document.removeEventListener("mousemove", S), document.removeEventListener("mouseup", C);
    }
    return U(() => t.value, () => {
      t.value && (g.value = { x: 0, y: 0 }, r.value = { x: 0, y: 0 }, i.value = !1);
    }), U(() => e.isSelected, (y) => {
      y && (b.value = {
        x: c.value,
        y: m.value
      });
    }), Ve("resize", k), Ve("scroll", k, { capture: !0 }), (y, L) => R(t) ? (v(), _("div", {
      key: 0,
      ref_key: "panelRef",
      ref: u,
      class: "uno-inspect-element-info font-dm rd-md",
      b: "~ solid white/10",
      style: ee(V.value)
    }, [
      p("div", vo, [
        p("div", {
          "i-catppuccin:unocss": "",
          class: j(["header-logo", { draggable: y.isSelected, dragging: R(i) }]),
          onMousedown: M
        }, null, 34),
        p("div", ho, [
          p("div", {
            "i-hugeicons:cursor-magic-selection-02": "",
            class: j(["select-btn cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100", { selecting: !y.isSelected }]),
            title: "Click to select an element",
            onClick: L[0] || (L[0] = ce((F) => y.action.start(), ["stop"]))
          }, null, 2),
          je(p("div", {
            "i-hugeicons:cancel-01": "",
            class: "cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100 text-base",
            onClick: L[1] || (L[1] = ce((F) => y.action.stop(), ["stop"])),
            onMousedown: L[2] || (L[2] = ce(() => {
            }, ["stop"]))
          }, null, 544), [
            [xt, y.isSelected]
          ])
        ])
      ]),
      p("div", go, [
        (v(!0), _(G, null, K(R(f), (F) => (v(), _("button", {
          key: F.id,
          class: j(["btn-clear p-1 rounded-full cursor-pointer transition-colors duration-200 flex items-center justify-center cursor-pointer @active:bg-amber/20 @active:text-amber", { active: R(h).id === F.id }]),
          title: F.label,
          text: "white/60",
          hover: "bg-amber/20 text-amber",
          onClick: (z) => R(x)(F.id)
        }, [
          p("div", {
            class: j([F.icon, "text-base"])
          }, null, 2)
        ], 10, yo))), 128))
      ]),
      p("div", xo, [
        O(Be, {
          name: `slide-${R($)}`,
          mode: "out-in"
        }, {
          default: D(() => [
            (v(), W(bt, null, [
              (v(), W(st(R(h).component), {
                key: R(h).id
              }))
            ], 1024))
          ]),
          _: 1
        }, 8, ["name"])
      ])
    ], 4)) : T("", !0);
  }
}), ht = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, s] of e)
    t[n] = s;
  return t;
}, _o = /* @__PURE__ */ ht(bo, [["__scopeId", "data-v-88209f99"]]), wo = { id: "__uno-inspector" }, $o = {
  key: 0,
  class: "uno-inspect-controls-overlay fixed pointer-events-none font-dm"
}, Co = { class: "absolute text-10px font-medium text-inspect-margin inset-0 pointer-events-none" }, ko = {
  key: 0,
  class: "absolute",
  style: {
    top: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, So = {
  key: 1,
  class: "absolute",
  style: {
    top: "50%",
    right: "0",
    transform: "translateY(-50%)"
  }
}, Ao = {
  key: 2,
  class: "absolute",
  style: {
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, Lo = {
  key: 3,
  class: "absolute",
  style: {
    top: "50%",
    left: "0",
    transform: "translateY(-50%)"
  }
}, Eo = { class: "absolute text-10px font-medium inset-0 text-inspect-padding pointer-events-none" }, Mo = {
  key: 0,
  class: "absolute",
  style: {
    top: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, To = {
  key: 1,
  class: "absolute",
  style: {
    top: "50%",
    right: "0",
    transform: "translateY(-50%)"
  }
}, Vo = {
  key: 2,
  class: "absolute",
  style: {
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)"
  }
}, Fo = {
  key: 3,
  class: "absolute",
  style: {
    top: "50%",
    left: "0",
    transform: "translateY(-50%)"
  }
}, Ro = /* @__PURE__ */ N({
  __name: "Inspector",
  props: /* @__PURE__ */ we({
    panels: {}
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const { tracking: e, triggering: t, element: n } = zt(), s = $e(o, "modelValue"), [l, c] = xe(!1), [m, u] = xe(!1), { width: i, height: a } = ot(), d = E({ x: 20, y: 20 }), r = E({ x: 0, y: 0 }), g = E({ x: 0, y: 0 }), b = E(!1), f = B(() => {
      e();
      const C = n.value;
      if (!C)
        return;
      const y = C.getBoundingClientRect(), L = window.getComputedStyle(C), F = {
        top: Number.parseFloat(L.marginTop),
        right: Number.parseFloat(L.marginRight),
        bottom: Number.parseFloat(L.marginBottom),
        left: Number.parseFloat(L.marginLeft)
      }, z = {
        top: Number.parseFloat(L.paddingTop),
        right: Number.parseFloat(L.paddingRight),
        bottom: Number.parseFloat(L.paddingBottom),
        left: Number.parseFloat(L.paddingLeft)
      };
      return {
        containerTop: y.top - F.top,
        containerLeft: y.left - F.left,
        containerWidth: y.width + F.left + F.right,
        containerHeight: y.height + F.top + F.bottom,
        elementTop: y.top,
        elementLeft: y.left,
        elementWidth: y.width,
        elementHeight: y.height,
        contentTop: y.top + z.top,
        contentLeft: y.left + z.left,
        contentWidth: y.width - z.left - z.right,
        contentHeight: y.height - z.top - z.bottom,
        margin: F,
        padding: z
      };
    });
    function h() {
      t();
    }
    function $() {
      l.value = !0, document.body.addEventListener("mouseover", w, { capture: !0 }), document.body.addEventListener("click", V, { capture: !0 }), document.body.style.cursor = "crosshair", window.addEventListener("resize", h), window.addEventListener("scroll", h, !0);
    }
    function x() {
      l.value = !1, n.value = null, document.body.removeEventListener("mouseover", w, { capture: !0 }), document.body.removeEventListener("click", V, { capture: !0 }), document.body.style.cursor = "", window.removeEventListener("resize", h), window.removeEventListener("scroll", h, !0);
    }
    function w(C) {
      if (!l.value)
        return;
      const y = C.target;
      y && !y.closest(".uno-inspect-controls") && !y.closest(".uno-inspect-element-info") && (n.value = y);
    }
    function V(C) {
      if (!l.value)
        return;
      C.preventDefault(), C.stopPropagation(), C.stopImmediatePropagation();
      const y = C.target;
      y && !y.closest(".uno-inspect-controls") && !y.closest(".uno-inspect-element-info") && (n.value = y, s.value = y, l.value = !1, document.body.removeEventListener("mouseover", w, { capture: !0 }), document.body.removeEventListener("click", V, { capture: !0 }), document.body.style.cursor = "");
    }
    function k(C) {
      g.value = { x: C.clientX, y: C.clientY }, b.value = !1;
      const y = C.currentTarget.getBoundingClientRect();
      r.value = {
        x: C.clientX - y.left,
        y: C.clientY - y.top
      }, document.addEventListener("mousemove", M), document.addEventListener("mouseup", S), C.preventDefault(), C.stopPropagation();
    }
    function M(C) {
      if (Math.sqrt(
        (C.clientX - g.value.x) ** 2 + (C.clientY - g.value.y) ** 2
      ) > 5 && (m.value = !0, b.value = !0), !m.value)
        return;
      const L = C.clientX - r.value.x, F = C.clientY - r.value.y, z = 40;
      d.value = {
        x: Math.max(0, Math.min(L, i.value - z)),
        y: Math.max(0, Math.min(F, a.value - z))
      };
    }
    function S() {
      b.value || setTimeout(() => {
        $();
      }, 0), m.value = !1, b.value = !1, document.removeEventListener("mousemove", M), document.removeEventListener("mouseup", S);
    }
    return _t(() => {
      x(), window.removeEventListener("resize", h), window.removeEventListener("scroll", h, !0);
    }), Dt(() => {
      l.value ? x() : $();
    }, x), (C, y) => (v(), W(wt, { to: "body" }, [
      p("div", wo, [
        p("div", {
          class: j(["uno-inspect-controls p-1 cursor-move select-none", { "cursor-grabbing": R(m) }]),
          style: ee({
            position: "fixed",
            top: `${d.value.y}px`,
            left: `${d.value.x}px`,
            zIndex: "10002"
          }),
          onMousedown: k
        }, [...y[0] || (y[0] = [
          p("button", { class: "border-none bg-transparent cursor-move" }, [
            p("div", {
              "text-xl": "",
              "i-catppuccin:unocss": ""
            })
          ], -1)
        ])], 38),
        f.value ? (v(), _("div", $o, [
          f.value.margin && f.value.padding ? (v(), _("div", {
            key: 0,
            b: "~ dashed inspect-margin/50",
            class: "rd-md bg-inspect-margin/25 overflow-hidden transition-all duration-100 relative",
            style: ee({
              position: "fixed",
              top: `${f.value.containerTop}px`,
              left: `${f.value.containerLeft}px`,
              width: `${f.value.containerWidth}px`,
              height: `${f.value.containerHeight}px`,
              pointerEvents: "none"
            })
          }, [
            p("div", Co, [
              f.value.margin.top > 0 ? (v(), _("div", ko, " mt-" + A(R(X)(f.value.margin.top / 4)), 1)) : T("", !0),
              f.value.margin.right > 0 ? (v(), _("div", So, " mr-" + A(R(X)(f.value.margin.right / 4)), 1)) : T("", !0),
              f.value.margin.bottom > 0 ? (v(), _("div", Ao, " mb-" + A(R(X)(f.value.margin.bottom / 4)), 1)) : T("", !0),
              f.value.margin.left > 0 ? (v(), _("div", Lo, " ml-" + A(R(X)(f.value.margin.left / 4)), 1)) : T("", !0)
            ]),
            p("div", {
              class: "absolute bg-inspect-padding/30 transition-all duration-100 relative",
              style: ee({
                top: `${f.value.margin.top}px`,
                left: `${f.value.margin.left}px`,
                width: `${f.value.elementWidth}px`,
                height: `${f.value.elementHeight}px`
              })
            }, [
              p("div", Eo, [
                f.value.padding.top > 0 ? (v(), _("div", Mo, " pt-" + A(R(X)(f.value.padding.top / 4)), 1)) : T("", !0),
                f.value.padding.right > 0 ? (v(), _("div", To, " pr-" + A(R(X)(f.value.padding.right / 4)), 1)) : T("", !0),
                f.value.padding.bottom > 0 ? (v(), _("div", Vo, " pb-" + A(R(X)(f.value.padding.bottom / 4)), 1)) : T("", !0),
                f.value.padding.left > 0 ? (v(), _("div", Fo, " pl-" + A(R(X)(f.value.padding.left / 4)), 1)) : T("", !0)
              ]),
              p("div", {
                class: "absolute bg-inspect-content/15 transition-all duration-100",
                style: ee({
                  top: `${f.value.padding.top}px`,
                  left: `${f.value.padding.left}px`,
                  width: `${f.value.contentWidth}px`,
                  height: `${f.value.contentHeight}px`
                })
              }, null, 4)
            ], 4)
          ], 4)) : T("", !0)
        ])) : T("", !0),
        R(n) ? (v(), W(_o, {
          key: 1,
          "is-selected": !R(l),
          action: { start: $, stop: x },
          "user-panels": C.panels
        }, null, 8, ["is-selected", "action", "user-panels"])) : T("", !0)
      ])
    ]));
  }
}), jo = /* @__PURE__ */ ht(Ro, [["__scopeId", "data-v-e4642815"]]), zo = {
  install: (o) => {
    o.component("Inspector", jo), o.component("FormControl", ae), o.component("FormControlGroup", pe);
  }
};
export {
  ae as FormControl,
  pe as FormControlGroup,
  jo as Inspector,
  re as Select,
  zo as default,
  J as useElement,
  mo as useTabs,
  zt as useTracker,
  No as useUno
};
