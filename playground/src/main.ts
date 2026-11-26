import { createApp, h, ref } from 'vue'
import DemoAdapter from './DemoAdapter'
import data from './button-data.json'
import './style.css'
import './content-wrap.css'
import './demo-layout.css'
import '../../components/src/button/style.css'
import '@fontsource/noto-sans-sc/400.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import './sutras-theme.css'
import './visual-fixes.css'
const link=(text:string,href:string)=>h('a',{href},text)
createApp({setup(){const menu=ref(false);return()=>h('div',{class:'button-doc'},[
 h('header',{class:'docs-header'},[link('砖块 Brick','#top'),h('span','Vue + TypeScript · Button'),h('button',{class:'nav-toggle','aria-expanded':menu.value,onClick:()=>menu.value=!menu.value},'目录'),link('LLMs','./llms.txt')]),
 h('div',{class:'docs-layout'},[h('aside',{class:['docs-nav',{open:menu.value}]},[h('p','通用 General'),link('Button 按钮','#top'),h('p','本页内容'),...data.demos.map(d=>link(d.title['zh-CN'],'#components-button-demo-'+d.id)),link('API','#api'),link('事件 / Slots','#mapping'),link('FAQ','#faq'),link('来源与限制','#sources'),link('机器文档','./button.md')]),
 h('main',{id:'top',class:'vp-doc docs-main'},[h('div',{class:'page-heading'},[h('span',{class:'eyebrow'},'COMPONENTS / GENERAL'),h('h1','Button 按钮'),h('p',{class:'lead'},data.intro['zh-CN']),h('p',{lang:'en'},data.intro['en-US']),h('div',{class:'badges'},[h('span','Ant Design 3.26.20 视觉与语义参考'),h('span','自主 Brick Vue 实现'),h('span','完整 Button 候选')])]),
 h('section',{id:'when'},[h('h2','何时使用'),h('p',data.when['zh-CN']),h('p',{lang:'en'},data.when['en-US'])]),
 h('section',{id:'installation'},[h('h2','安装与导入'),h('p',data.install),h('pre',[h('code',data.imports)]),h('p',`Vue ${data.versions.vue} · TypeScript ${data.versions.typescript} · Node ${data.versions.nodeRequired}（本次 ${data.versions.node}）`)]),
  h('h2',{id:'examples'},'代码演示'),h('p','全部 9 个上游公开案例，保留原生 Sutras 查看／编辑／复制／全屏工具。示例内部仅使用自主 Brick Button。'),h('p',[link('下载组件tgz','./'+data.downloads.package),' · ',link('下载案例辅助CSS','./'+data.downloads.demoCSS)]),h('p',data.loadingClarification),
 h('div',{class:'demo-grid'},data.demos.map(d=>h(DemoAdapter,{key:d.id,demo:d}))),
 h('section',{id:'api'},[h('h2','API'),h('p','推荐顺序：type → shape → size → loading → disabled。支持其余原生 button / a 属性透传；事件映射为 Vue @click。'),h('div',{class:'table-scroll'},[h('table',[h('thead',[h('tr',['属性 / Vue 名称','说明 Description','Vue 类型','默认值 / 上游版本'].map(x=>h('th',x)))]),h('tbody',data.api.map(a=>h('tr',{'data-api':a.name},[h('td',[h('code',a.name),h('small',a.mapping)]),h('td',[h('p',a.description['zh-CN']),h('p',{lang:'en'},a.description['en-US'])]),h('td',[h('code',a.vueType)]),h('td',[h('code',a.vueDefault),h('small',a.since||'3.x')])])))] )])]),
 h('section',{id:'mapping'},[h('h2','React → Vue · 事件 / Slots / Group'),...data.mapping.map(x=>h('p',[h('code',x.react),' → ',x.vue])),h('h3','ButtonGroup'),...data.groupAPI.map(x=>h('p',`${x.name}: ${x.type}；默认 ${x.default}`)),h('p','#icon 插槽是 Brick 扩展；默认插槽对应 React children。Icon 字符串与显式 Icon 子节点均支持，图标必须有装饰/可访问语义。')]),
 h(DemoAdapter,{demo:data.supplementary[0]}),
  h('section',{id:'faq'},[h('h2','FAQ 与注意事项'),h('h3','如何移除两个汉字之间的空格？'),h('p',data.faq)]),
 h('section',{id:'llms'},[h('h2','LLMs · 同源机器文档'),h('p','AntD3 固定版本未提供 LLMs 文档；以下为 Brick 新增，网页与机器文档由同一 button-data 目录生成。'),h('div',{class:'llm-links'},[link('llms.txt','./llms.txt'),link('button.md','./button.md'),link('llms-full.txt','./llms-full.txt'),link('button.json','./button.json')])]),
  h('section',{id:'sources'},[h('h2','来源、特殊项与许可'),h('p',`${data.upstream.name} ${data.upstream.version} · ${data.upstream.commit} · MIT。公开demo 9，隐藏debug demo 0；12公开API行=11 prop+onClick事件，Group/slot为映射能力，不冒原页额外两行API。`),...data.links.map(x=>h('p',link(x.label,x.url))),...data.specialItems.filter(x=>'items' in x).map(x=>h('p',[h('code',x.items?.join(' / ')), '：', 'evidence' in x?x.evidence:''])),h('p',[link('第三方许可清单','./licenses/dependency-notices.json')]),h('h3','明确限制'),h('ul',data.limitations.map(x=>h('li',x)))])]),
  h('nav',{class:'anchor-rail','aria-label':'页内锚点'},[link('何时使用','#when'),link('代码演示','#examples'),...data.demos.map(d=>link(d.title['zh-CN'],'#components-button-demo-'+d.id)),link('API','#api'),link('LLMs','#llms')])]),
 h('footer',{class:'docs-footer'},'Brick Button · Ant Design 3.26.20 MIT 参考与归属 · Sutras 原生 DemoBox / REPL / Shiki · 非 Ant Design 官方产品')
])}}).mount('#app')
