import { defineComponent, h } from "vue";
import { WorkspaceDemo } from "@brick/pro-components";
export const InitLayout = defineComponent({
  name: "InitLayout",
  setup: () => () =>
    h("main", [
      h("header", [
        h("span", { class: "badge" }, "初始化验证阶段"),
        h("h1", "砖块 Brick"),
        h("p", "独立 monorepo 工程起点，不是成熟组件库或完整业务产品。"),
      ]),
      h(WorkspaceDemo),
    ]),
});
