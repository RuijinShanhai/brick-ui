import { Icon as e } from "../icon.js";
import { Comment as t, Fragment as n, Text as r, cloneVNode as i, computed as a, defineComponent as o, h as s, inject as c, onBeforeUnmount as l, onMounted as u, onUpdated as d, provide as f, ref as p, shallowRef as m, watch as h } from "vue";
// components/src/button/index.ts
var g = Symbol("brick-button-group-size"), _ = o({
	name: "BrickButtonGroup",
	props: { size: {
		type: String,
		default: "default"
	} },
	setup(e, { slots: t }) {
		return f(g, a(() => e.size)), () => s("div", {
			class: ["brick-button-group", `brick-button-group-${e.size}`],
			role: "group"
		}, t.default?.());
	}
});
function v(e) {
	return e.flatMap((e) => e.type === n ? v(e.children) : e.type === t || e.type === r && !String(e.children).trim() ? [] : [e]);
}
var y = /^[\u4e00-\u9fa5]{2}$/, b = o({
	name: "BrickButton",
	inheritAttrs: !1,
	props: {
		type: {
			type: String,
			default: "default"
		},
		size: String,
		shape: String,
		ghost: Boolean,
		disabled: Boolean,
		block: Boolean,
		loading: {
			type: [Boolean, Object],
			default: !1
		},
		icon: String,
		href: String,
		target: String,
		htmlType: {
			type: String,
			default: "button"
		},
		autoInsertSpaceInButton: {
			type: Boolean,
			default: !0
		}
	},
	emits: { click: (e) => !0 },
	setup(t, { slots: n, attrs: o, emit: f, expose: _ }) {
		let b = m(null), x = c(g, a(() => "default")), S = a(() => t.size ?? x.value), C = p(!1), w, T = () => {
			w !== void 0 && clearTimeout(w), w = void 0;
		};
		h([() => !!t.loading, () => typeof t.loading == "object" ? t.loading.delay : 0], () => {
			T();
			let e = typeof t.loading == "object" ? t.loading.delay ?? 0 : 0;
			t.loading && Number.isFinite(e) && e > 0 ? (C.value = !1, w = setTimeout(() => {
				C.value = !0, w = void 0;
			}, e)) : C.value = !!t.loading;
		}, {
			immediate: !0,
			flush: "sync"
		});
		let E = a(() => t.disabled || C.value), D = p(0), O, k = 0, A = () => {
			O !== void 0 && clearTimeout(O), O = void 0, D.value = 0;
		}, j = () => {
			t.type === "link" || t.href !== void 0 || E.value || typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches || (A(), D.value = ++k, O = setTimeout(A, 550));
		};
		h(E, (e) => {
			e && A();
		}, { flush: "sync" }), l(() => {
			T(), A();
		});
		let M = p(!1), N = () => {
			M.value = !!(t.autoInsertSpaceInButton && !t.icon && !n.icon && t.type !== "link" && b.value && y.test(b.value.textContent ?? ""));
		};
		u(N), d(N), _({
			focus: (e) => b.value?.focus(e),
			blur: () => b.value?.blur(),
			get element() {
				return b.value;
			}
		});
		let P = (e) => E.value ? (e.preventDefault(), e.stopImmediatePropagation(), !0) : !1, F = (e, t) => {
			Array.isArray(e) ? e.forEach((e) => {
				typeof e == "function" && e(t);
			}) : typeof e == "function" && e(t);
		};
		return () => {
			let a = v(n.default?.() ?? []), c = v(n.icon?.() ?? []), l = t.autoInsertSpaceInButton && a.length === 1 && !t.icon && c.length === 0 && t.type !== "link", u = !1, d = a.map((e) => {
				if (e.type === r) {
					let t = String(e.children), n = l && y.test(t);
					return u ||= n, s("span", n ? { class: "brick-button-spaced-text" } : null, n ? t.split("").join(" ") : t);
				}
				if (l && typeof e.type == "string" && typeof e.children == "string" && y.test(e.children)) {
					let t = i(e);
					return t.children = e.children.split("").join(" "), u = !0, t;
				}
				return e;
			}), p = C.value ? s(e, { type: "loading" }) : c.length ? c : t.icon ? s(e, { type: t.icon }) : null, m = t.href !== void 0;
			return s(m ? "a" : "button", {
				...o,
				ref: b,
				class: [
					"brick-button",
					`brick-button-${t.type}`,
					`brick-button-${S.value}`,
					t.shape && `brick-button-${t.shape}`,
					{
						"brick-button-background-ghost": t.ghost,
						"brick-button-block": t.block,
						"brick-button-loading": C.value,
						"brick-button-disabled": t.disabled,
						"brick-button-icon-only": !!p && a.length === 0,
						"brick-button-two-chinese-chars": l && M.value && !u
					},
					o.class
				],
				type: m ? void 0 : t.htmlType,
				disabled: m ? void 0 : t.disabled,
				href: m && !E.value ? t.href : void 0,
				target: m ? t.target : void 0,
				role: m && E.value ? o.role ?? "link" : o.role,
				tabindex: m && E.value ? -1 : o.tabindex,
				"aria-disabled": E.value ? "true" : o["aria-disabled"],
				"aria-busy": C.value ? "true" : void 0,
				onClickCapture: (e) => {
					P(e) || F(o.onClickCapture, e);
				},
				onClick: (e) => {
					P(e) || (j(), f("click", e));
				},
				onAuxclick: (e) => {
					P(e) || F(o.onAuxclick, e);
				}
			}, [
				p,
				...d,
				D.value ? s("span", {
					key: D.value,
					class: "brick-button-wave",
					"aria-hidden": "true"
				}) : null
			]);
		};
	}
});
export { b as Button, _ as ButtonGroup };
