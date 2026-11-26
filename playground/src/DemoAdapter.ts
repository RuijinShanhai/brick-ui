import { computed, defineComponent, h, provide, ref, type Component } from 'vue'
import { DemoBox } from '@sgwm-sutras/ui'
import { getDemoInjectSymbol, getPageInjectSymbol } from '@sgwm-sutras/shared'
import NativeCodeSlot from './NativeCodeSlot'
import iframeFontCSS from './iframe-font.css?url'
const components=import.meta.glob('./demos/*.vue',{eager:true,import:'default'}) as Record<string,Component>
export default defineComponent({props:{demo:{type:Object,required:true}},setup(props){
 const d=props.demo as {id:string;code:string;title:Record<string,string>;description:Record<string,string>}
 const identifier='Button_'+d.id.replaceAll('-','_'),base=new URL('./',location.href).pathname
 provide(getPageInjectSymbol(),{isDark:ref(false),site:ref({base})})
 provide(getDemoInjectSymbol(identifier),{identifier,entry:'./'+d.id,page:{frontmatter:{}},meta:{defaultPreviewMode:'block',defaultCodeCollapse:true,deviceList:{Default:[0,0],'iPhone 5/SE':[320,568],'iPhone X':[375,812],iPad:[768,1024]},iframeFontStylesheet:new URL(iframeFontCSS,location.href).href},site:{base,assetsDir:'assets'},importMap:{imports:{vue:`${base}vendor/vue.js`,'@brick/components':`${base}vendor/brick.js`}},files:[{identifier,filename:d.id,extension:'.vue',isEntry:true,pathFromEntry:'./'+d.id,code:encodeURIComponent(d.code),parsed:{code:encodeURIComponent(d.code),imports:[],docMeta:{}}}]})
 return()=>h('section',{id:'components-button-demo-'+d.id,'data-demo':d.id,class:'demo-section'},[h(DemoBox,{key:identifier},{['code-'+identifier]:()=>h(NativeCodeSlot,{identifier}),default:()=>h(components['./demos/'+d.id+'.vue']),title:()=>h('h3',[h('a',{href:'#components-button-demo-'+d.id},d.title['zh-CN']),h('small',d.title['en-US'])]),description:()=>h('div',{class:'demo-description'},[h('p',d.description['zh-CN']),h('p',{lang:'en',class:'english-description'},d.description['en-US'])])})])
}})
