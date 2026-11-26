# Brick Button 按钮

按钮用于开始一个即时操作。

To trigger an operation.

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## 安装与导入

从文档下载组件tgz与demo-layout.css；本地执行 npm install ./brick-components-0.1.0-button-full-r6.tgz vue@3.5.46。导入 @brick/components 和 @brick/components/button/style.css；案例另外导入下载的 ./demo-layout.css。未发布公共npm，不能从公共registry直接安装@brick/components。

```ts
import { Button, ButtonGroup, Icon } from '@brick/components'
```

## 版本

{"vue":"3.5.46","typescript":"7.0.2","node":"24.22.2","nodeRequired":">=22.12.0","vite":"8.3.8"}

## 下载与案例样式

[组件tgz](../brick-components-0.1.0-button-full-r6.tgz) · [案例辅助CSS](../demo-layout.css)

```css
/* Shared by the document preview and the native Sutras editable iframe. */
.demo-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.demo-stack{display:flex;flex-direction:column;gap:16px;min-width:0}
.ghost-surface{background:#bec8c8}
.ghost-surface-disabled{padding:8px 8px 0 8px}
.ghost-surface-standalone{padding:26px 16px 16px}
.size-choice{display:flex;flex-wrap:wrap;gap:12px;border:1px solid #d9d9d9;padding:8px 12px;margin:0;min-width:0}
.size-choice label{display:inline-flex;align-items:center;gap:4px}
.actions-wrap{position:relative;display:inline-block}
.actions-menu{position:absolute;z-index:3;top:100%;right:0;min-width:120px;display:flex;flex-direction:column;padding:4px;background:white;box-shadow:0 2px 8px #0002}
.demo-stack output{font-size:13px}

```

固定原站loading最后两个交互按钮同文Click me!，第二个带poweroff图标。本页明确标为Click me!和Click with icon；保留上游React原文供追溯，不能将两个按钮当一个。

## API（React → Vue）

|属性 / Vue 名称|上游类型|Vue 类型|Brick默认|上游默认（中 / 英）|Since|说明|

|---|---|---|---|---|---|---|

|disabled / disabled|boolean|boolean|false|`false` / `false`|3.5.1|按钮失效状态 / disabled state of button|

|ghost / ghost|boolean|boolean|false|false / `false`|—|幽灵属性，使按钮背景透明，版本 2.7 中增加 / make background transparent and invert text and border colors, added in 2.7|

|href / href|string|string|undefined|- / -|—|点击跳转的地址，指定此属性 button 的行为和 a 链接一致 / redirect url of link button|

|htmlType / html-type|string|'button' &#124; 'submit' &#124; 'reset'|button|`button` / `button`|—|设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) / set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)|

|icon / icon|string|string|undefined|- / -|—|设置按钮的图标类型 / set the icon of button, see: Icon component|

|loading / loading|boolean &#124; { delay: number }|boolean &#124; { delay?: number }|false|`false` / `false`|—|设置按钮载入状态 / set the loading status of button|

|shape / shape|string|'circle' &#124; 'round' &#124; 'circle-outline'|undefined|- / -|—|设置按钮形状，可选值为 `circle`、 `round` 或者不设 / can be set to `circle`, `round` or omitted|

|size / size|string|'default' &#124; 'large' &#124; 'small'|default|`default` / `default`|—|设置按钮大小，可选值为 `small` `large` 或者不设 / can be set to `small` `large` or omitted|

|target / target|string|string|undefined|- / -|—|相当于 a 链接的 target 属性，href 存在时生效 / same as target attribute of a, works when href is specified|

|type / type|string|'default' &#124; 'primary' &#124; 'dashed' &#124; 'danger' &#124; 'link' &#124; 'ghost'|default|- / `default`|—|设置按钮类型，可选值为 `primary` `dashed` `danger` `link`(3.17 中增加) 或者不设 / can be set to `primary` `ghost` `dashed` `danger` `link`(added in 3.17) or omitted (meaning `default`)|

|onClick / @click|(event) => void|@click: (event: MouseEvent) => void|—|- / -|—|点击按钮时的回调 / set the handler to handle `click` event|

|block / block|boolean|boolean|false|`false` / `false`|3.8.0|将按钮宽度调整为其父宽度的选项 / option to fit button width to its parent width|

## 事件、Slots 与 Group

[
  {
    "react": "children",
    "vue": "default slot"
  },
  {
    "react": "onClick",
    "vue": "@click / MouseEvent"
  },
  {
    "react": "className",
    "vue": "class（原生透传）"
  },
  {
    "react": "style",
    "vue": "style（原生透传）"
  },
  {
    "react": "Button.Group",
    "vue": "命名导出ButtonGroup，无Button.Group静态别名；子Button显式size优先于Group继承，未指定时继承。"
  },
  {
    "react": "icon string / inline Icon",
    "vue": "icon具名slot优先于icon prop，空slot回退prop；Icon子节点保原顺序。具名slot为Brick扩展。"
  },
  {
    "react": "ConfigProvider.autoInsertSpaceInButton",
    "vue": "Brick本地autoInsertSpaceInButton布尔prop，默认true；false关闭。不提供全局ConfigProvider，不计上游12个公开API。"
  },
  {
    "react": "prefixCls",
    "vue": "不公开prefixCls；Brick类名前缀固定，不能视为可配置兼容prop。"
  },
  {
    "react": "ref",
    "vue": "Brick ButtonRef扩展：focus(FocusOptions)、blur()、element；不是直接HTMLElement实例。"
  }
]

[
  {
    "name": "size",
    "type": "'large' | 'default' | 'small'",
    "default": "default"
  },
  {
    "name": "default slot",
    "type": "Vue VNodes",
    "default": "—"
  }
]

## 全部公开案例（9）

### 按钮类型 / Type

按钮有五种类型：主按钮、次按钮、虚线按钮、危险按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

There are `primary` button, `default` button, `dashed` button, `danger` button and `link` button in antd.

```vue
<script setup lang="ts">
import { Button } from '@brick/components'
</script>
<template><div class="demo-row"><Button type="primary">Primary</Button><Button>Default</Button><Button type="dashed">Dashed</Button><Button type="danger">Danger</Button><Button type="link">Link</Button></div></template>

```

### 图标按钮 / Icon

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。

如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。 Brick补充：本页末尾第10个Search按钮带尾部Icon，用于Vue子节点顺序映射，不计原站9个按钮。

`Button` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Button`.

If you want specific control over the positioning and placement of the `Icon`, then that should be done by placing the `Icon` component within the `Button` rather than using the `icon` property.

```vue
<script setup lang="ts">
import { Button, Icon } from '@brick/components'
</script>
<template><div class="demo-stack"><div class="demo-row"><Button type="primary" shape="circle" icon="search" aria-label="搜索"/><Button type="primary" shape="circle">A</Button><Button type="primary" icon="search">Search</Button><Button shape="circle" icon="search" aria-label="搜索"/><Button icon="search">Search</Button></div><div class="demo-row"><Button shape="circle" icon="search" aria-label="搜索"/><Button icon="search">Search</Button><Button type="dashed" shape="circle" icon="search" aria-label="搜索"/><Button type="dashed" icon="search">Search</Button><Button>Search<Icon type="search"/></Button></div></div></template>

```

### 按钮尺寸 / Size

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

Ant Design supports a default button size as well as a large and small size.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, ButtonGroup, Icon } from '@brick/components'
const size = ref<'large'|'default'|'small'>('large')
</script>
<template><div class="demo-stack"><fieldset class="size-choice"><legend>按钮尺寸</legend><label v-for="value in (['large','default','small'] as const)" :key="value"><input v-model="size" type="radio" :value="value"/>{{value}}</label></fieldset><div class="demo-row"><Button type="primary" :size="size">Primary</Button><Button :size="size">Normal</Button><Button type="dashed" :size="size">Dashed</Button><Button type="danger" :size="size">Danger</Button><Button type="link" :size="size">Link</Button></div><div class="demo-row"><Button type="primary" icon="download" :size="size" aria-label="下载"/><Button type="primary" shape="circle" icon="download" :size="size" aria-label="下载"/><Button type="primary" shape="round" icon="download" :size="size" aria-label="下载"/><Button type="primary" shape="round" icon="download" :size="size">Download</Button><Button type="primary" icon="download" :size="size">Download</Button></div><ButtonGroup :size="size"><Button type="primary"><Icon type="left"/>Backward</Button><Button type="primary">Forward<Icon type="right"/></Button></ButtonGroup></div></template>

```

### 不可用状态 / Disabled

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

To mark a button as disabled, add the `disabled` property to the `Button`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const clicks=ref(0)
</script>
<template><div class="demo-stack"><div v-for="type in (['primary','default','dashed','link'] as const)" :key="type" class="demo-row"><Button :type="type" @click="clicks++">{{type}}</Button><Button :type="type" disabled @click="clicks++">{{type}}(disabled)</Button></div><div class="ghost-surface ghost-surface-disabled demo-row"><Button ghost @click="clicks++">Ghost</Button><Button ghost disabled @click="clicks++">Ghost(disabled)</Button></div><output aria-live="polite">有效点击：{{clicks}}</output></div></template>

```

### 加载中状态 / Loading

添加 loading 属性可让按钮处于加载状态。原站原文“最后两个按钮演示点击后进入加载状态”对应本页 Click me! 与 Click with icon（带poweroff图标），不是本页补充的 Delayed loading / Reset loading。

A loading indicator can be added to a button by setting the `loading` property on the `Button`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const loading=ref(false),iconLoading=ref(false),delayed=ref(false)
</script>
<!-- 原站 loading.md 两个交互按钮原文均为 Click me!，第二个有 poweroff 图标；本页对应 Click me! / Click with icon。 -->
<template><div class="demo-stack"><div class="demo-row"><Button type="primary" loading>Loading</Button><Button type="primary" size="small" loading>Loading</Button></div><div class="demo-row"><Button type="primary" :loading="loading" @click="loading=true">Click me!</Button><Button type="primary" icon="poweroff" :loading="iconLoading" @click="iconLoading=true">Click with icon</Button></div><div class="demo-row"><Button type="primary" loading aria-label="加载中"/><Button type="primary" shape="circle" loading aria-label="加载中"/><Button type="danger" shape="round" loading aria-label="加载中"/></div><div class="demo-row"><Button type="primary" :loading="delayed ? {delay:800} : false" @click="delayed=true">Delayed loading</Button><Button @click="loading=false;iconLoading=false;delayed=false">Reset loading</Button></div><p>补充 API 演示：delay 单位毫秒；800ms 内可取消，重置后清除计时。</p></div></template>

```

### 多个按钮组合 / Multiple Buttons

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。

If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more than three operations, you can group some of them into `Dropdown.Button`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon, useButtonActionMenu } from '@brick/components'
const selected = ref('')
const { open, trigger, menu, toggle, triggerKeydown, menuKeydown, choose } =
  useButtonActionMenu(value => { selected.value = value })
</script>
<template>
  <div class="demo-stack">
    <div class="demo-row">
      <Button type="primary" @click="selected='primary'">primary</Button>
      <Button @click="selected='secondary'">secondary</Button>
      <span class="actions-wrap">
        <Button ref="trigger" aria-haspopup="menu" aria-controls="button-multiple-actions"
          :aria-expanded="open" @click="toggle" @keydown="triggerKeydown">Actions<Icon type="down"/></Button>
        <span v-if="open" id="button-multiple-actions" ref="menu" class="actions-menu" role="menu" @keydown="menuKeydown">
          <Button v-for="item in ['1st item','2nd item','3rd item']" :key="item"
            role="menuitem" tabindex="-1" @click="choose(item)">{{item}}</Button>
        </span>
      </span>
    </div>
    <output aria-live="polite">{{selected ? '已选择：'+selected : '请选择操作'}}</output>
    <p>自主 Button 与原生菜单组合；支持方向键、Home/End、Escape 回焦、Tab 关闭及外部点击关闭，不声称完整 Dropdown 产品。</p>
  </div>
</template>

```

### 按钮组合 / Button Group

可以将多个 `Button` 放入 `Button.Group` 的容器中。

通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

Buttons can be grouped by placing multiple `Button` components into a `Button.Group`.

The `size` can be set to `large`, `small` or left unset resulting in a default size.

```vue
<script setup lang="ts">
import { Button, ButtonGroup, Icon } from '@brick/components'
</script>
<template><div class="demo-stack"><h4>Basic</h4><div class="demo-row"><ButtonGroup><Button>Cancel</Button><Button>OK</Button></ButtonGroup><ButtonGroup><Button disabled>L</Button><Button disabled>M</Button><Button disabled>R</Button></ButtonGroup><ButtonGroup><Button>L</Button><Button>M</Button><Button>R</Button></ButtonGroup></div><h4>With Icon</h4><div class="demo-row"><ButtonGroup><Button type="primary"><Icon type="left"/>Go back</Button><Button type="primary">Go forward<Icon type="right"/></Button></ButtonGroup><ButtonGroup><Button type="primary" icon="cloud" aria-label="云"/><Button type="primary" icon="cloud-download" aria-label="云下载"/></ButtonGroup><ButtonGroup size="small"><Button type="primary" icon="cloud" aria-label="云"/><Button type="primary" icon="cloud-download" aria-label="云下载"/></ButtonGroup></div></div></template>

```

### 幽灵按钮 / Ghost Button

幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。

`ghost` property will make button's background transparent, it is commonly used in colored background.

```vue
<script setup lang="ts">
import { Button } from '@brick/components'
</script>
<template><div class="ghost-surface ghost-surface-standalone demo-row"><Button type="primary" ghost>Primary</Button><Button ghost>Default</Button><Button type="dashed" ghost>Dashed</Button><Button type="danger" ghost>danger</Button><Button type="link" ghost>link</Button></div></template>

```

### block 按钮 / block Button

`block`属性将使按钮适合其父宽度。

`block` property will make the button fit to its parent width.

```vue
<script setup lang="ts">
import { Button } from '@brick/components'
</script>
<template><div class="demo-stack"><Button type="primary" block>Primary</Button><Button block>Default</Button><Button type="dashed" block>Dashed</Button><Button type="danger" block>Danger</Button><Button type="link" block>Link</Button></div></template>

```

## Brick 补充示例（不计上游公开案例）

### 表单、链接与兼容 API

Brick 新增补充示例：验证 htmlType/href/target、兼容枚举与中文间距，不计上游公开案例。

Brick-only supplementary example, not an upstream demo.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const submitted=ref(0)
</script>
<template><div class="demo-stack"><form @submit.prevent="submitted++" @reset="submitted=0" class="demo-row"><Button html-type="submit" type="primary">Submit</Button><Button html-type="reset">Reset</Button><output>提交：{{submitted}}</output></form><div class="demo-row"><Button href="#api" target="_self">API anchor</Button><Button href="https://3x.ant.design/components/button-cn/" target="_blank" rel="noopener noreferrer">上游文档</Button><Button href="#api" disabled>Disabled link</Button><Button type="ghost">Legacy ghost type</Button><Button shape="circle-outline" icon="search" aria-label="兼容圆形"/><Button>按钮</Button></div><p>Brick补充：真实表单、链接、兼容枚举与中文间距；不是第10个上游公开案例。</p></div></template>

```

## FAQ 与注意

AntD3 对只有两个汉字且非link/无icon的单子节点自动插空格；上游全局ConfigProvider可关闭。Brick默认开启，通过本地autoInsertSpaceInButton=false关闭；组件/翻译slot按textContent回退letter-spacing，不改其子DOM。不实现全局ConfigProvider。icon-only须提供aria-label；disabled及有效loading链接阻止导航；delay单位毫秒，延迟期仍可点击，false取消计时。Button默认htmlType=button，submit/reset保留真实表单默认行为。主按钮同区域最多一个。推荐prop顺序 type→shape→size→loading→disabled。prefixCls不公开；React className映射Vue class，children映射default slot，不支持children prop。type=ghost与ghost布尔属性不同；shape=circle-outline为源兼容值。 FAQ图来源：https://gw.alipayobjects.com/zos/antfincdn/Hz5HL9gsT4/f29f170d-b78d-4d2b-aa71-0da6a9ead4d9.png；保留原始外部图链接以追溯FAQ，不复制第三方CDN图片入包；静态交付不依赖外图加载来解释空格规则。

## 隐藏与特殊项

[
  {
    "kind": "hidden-debug-demos",
    "count": 0,
    "evidence": "固定tag全部demo/*.md共9文件，无debug:true；order缺7不是第10个隐藏案例"
  },
  {
    "kind": "localized-public-api-difference",
    "items": [
      "type=ghost"
    ],
    "evidence": "中文公开API未列type=ghost，但英文公开API及button.tsx均列；不是source-only。ghost布尔属性独立。"
  },
  {
    "kind": "source-only-enum",
    "items": [
      "shape=circle-outline"
    ],
    "evidence": "button.tsx L67–74含兼容枚举；中英文公开shape仅circle/round。"
  },
  {
    "kind": "source-only-props",
    "items": [
      "prefixCls",
      "className",
      "children"
    ],
    "evidence": "BaseButtonProps L76–87，React→Vue映射/组件合同单列"
  },
  {
    "kind": "upstream-tests-and-styles",
    "files": [
      "components/button/__tests__/__snapshots__/demo.test.js.snap",
      "components/button/__tests__/__snapshots__/index.test.js.snap",
      "components/button/__tests__/demo.test.js",
      "components/button/__tests__/index.test.js",
      "components/button/style/index.less",
      "components/button/style/index.tsx",
      "components/button/style/mixin.less"
    ]
  }
]

## 来源与许可

Ant Design 3.26.20 / bc0f0b62ea809be1b5093a464c74b1ca3f906d49 / MIT

https://3x.ant.design/components/button-cn/

https://3x.ant.design/components/button/

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type

https://3x.ant.design/components/config-provider-cn/#API

https://3x.ant.design/components/icon-cn/

https://3x.ant.design/docs/react/contributing-cn

https://github.com/ant-design/ant-design/tree/bc0f0b62ea809be1b5093a464c74b1ca3f906d49/components/button

## 限制

AntD3在固定tag未提供LLMs；llms.txt/button.md/llms-full.txt/button.json为Brick新增。

Dropdown/Radio为原生交互演示，未宣称独立完整Brick Dropdown/Radio组件；不使用AntD示例替身。

Sutras标准DemoBox/toolbar/REPL/Shiki沿既有DemoContext适配；不是完整pluginMkit迁移。

原生取消回静态构建示例并保源码修改，不是源码回滚。

不声称全组件库、全可访问性或不可信代码隔离已经完成。

精卫COMP-FULL-R2已集成。自主有限Wave仅可用非link原生按钮，固定550ms、本地token；reduced-motion不创建。没有上游computed-border动态取色/隐藏元素/CSP全局伪元素机制，不是上游完全等价动画。自主SVG存在像素差异。工程自检不是独立验收。
