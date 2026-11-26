import { defineComponent, h, ref } from "vue";
import { InitButton } from "@brick/components";
export const WorkspaceDemo = defineComponent({
  name: "WorkspaceDemo",
  setup() {
    const count = ref(0);
    return () =>
      h("section", { class: "demo" }, [
        h("h2", "真实 import 链路"),
        h("p", "playground → templates → pro-components → components"),
        h(InitButton, { onActivate: () => count.value++ }),
        h(
          "output",
          { "data-testid": "count", "aria-live": "polite" },
          `联动计数：${count.value}`,
        ),
      ]);
  },
});
