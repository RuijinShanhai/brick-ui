import { nextTick as e, onBeforeUnmount as t, ref as n } from "vue";
// components/src/button/action-menu.ts
function r(r) {
	let i = n(!1), a = n(null), o = n(null), s = () => Array.from(o.value?.querySelectorAll("[role=\"menuitem\"]:not([disabled]):not([aria-disabled=\"true\"])") ?? []), c = (e = !1) => {
		i.value = !1, e && a.value?.focus();
	}, l, u = (e) => {
		let t = e.composedPath();
		o.value && !t.includes(o.value) && !t.some((e) => e instanceof Element && e.getAttribute("aria-controls") === o.value?.id) && c();
	}, d = () => l?.removeEventListener("pointerdown", u), f = async (t = !1) => {
		i.value = !0, await e();
		let n = s();
		(t ? n.at(-1) : n[0])?.focus(), d(), l = o.value?.ownerDocument, l?.addEventListener("pointerdown", u);
	};
	return t(d), {
		open: i,
		trigger: a,
		menu: o,
		show: f,
		close: c,
		triggerKeydown: (e) => {
			e.key === "ArrowDown" || e.key === "ArrowUp" ? (e.preventDefault(), f(e.key === "ArrowUp")) : e.key === "Escape" && (e.preventDefault(), c(!0));
		},
		menuKeydown: (e) => {
			let t = s(), n = t.indexOf(o.value?.ownerDocument.activeElement), r;
			e.key === "ArrowDown" && (r = (n + 1) % t.length), e.key === "ArrowUp" && (r = (n - 1 + t.length) % t.length), e.key === "Home" && (r = 0), e.key === "End" && (r = t.length - 1), r !== void 0 && (e.preventDefault(), t[r]?.focus()), e.key === "Escape" && (e.preventDefault(), c(!0)), e.key === "Tab" && c();
		},
		toggle: () => {
			i.value ? c() : f();
		},
		choose: (e) => {
			r(e), c(!0);
		}
	};
}
export { r as useButtonActionMenu };
