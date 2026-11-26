import { defineComponent as e, h as t } from "vue";
// components/src/icon.ts
var n = {
	search: ["M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13", "m15.3 15.3 5 5"],
	download: ["M12 3v12m-5-5 5 5 5-5", "M4 16v5h16v-5"],
	poweroff: ["M12 2v10", "M6.3 5.7a9 9 0 1 0 11.4 0"],
	left: ["m15 4-8 8 8 8"],
	right: ["m9 4 8 8-8 8"],
	down: ["m4 8 8 8 8-8"],
	cloud: ["M6 18a5 5 0 0 1-.6-10A7 7 0 0 1 19 9a4.5 4.5 0 0 1-.5 9Z"],
	"cloud-download": ["M6 17a4.5 4.5 0 0 1-.6-9A7 7 0 0 1 19 9a4 4 0 0 1 1 7", "M12 12v9m-4-4 4 4 4-4"],
	loading: ["M12 3a9 9 0 0 1 9 9"]
}, r = e({
	name: "BrickIcon",
	inheritAttrs: !1,
	props: {
		type: {
			type: String,
			required: !0
		},
		spin: Boolean
	},
	setup(e, { attrs: r, slots: i }) {
		return () => t("svg", {
			...r,
			viewBox: "0 0 24 24",
			width: "1em",
			height: "1em",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": 1.8,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			focusable: "false",
			"aria-hidden": r["aria-label"] ? void 0 : "true",
			role: r["aria-label"] ? "img" : void 0,
			class: [
				"brick-icon",
				{ "brick-icon-spin": e.spin || e.type === "loading" },
				r.class
			],
			"data-icon": e.type
		}, i.default?.() ?? (n[e.type] ?? []).map((e) => t("path", { d: e })));
	}
});
export { r as Icon };
