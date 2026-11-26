import { Button as e, ButtonGroup as t } from "./button/index.js";
import { Icon as n } from "./icon.js";
import { useButtonActionMenu as r } from "./button/action-menu.js";
import { defineComponent as i, h as a } from "vue";
// components/src/index.ts
var o = (e, t) => i({
	name: `Brick${e}`,
	setup: (n, { slots: r }) => () => a(t, { class: `brick-${e.toLowerCase()}` }, r.default?.())
}), s = o("Layout", "div"), c = o("Header", "header"), l = o("Sider", "aside"), u = o("Content", "main"), d = o("Footer", "footer");
export { e as Button, e as InitButton, t as ButtonGroup, u as Content, d as Footer, c as Header, n as Icon, s as Layout, l as Sider, r as useButtonActionMenu };
