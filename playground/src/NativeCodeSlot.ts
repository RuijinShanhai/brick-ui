// Standard code-<identifier> slot; reuse Sutras' existing Shiki renderer.
import { defineComponent, h, inject, ref, watch } from 'vue'
import { ReplFilesInjectKey } from '@sgwm-sutras/hooks'
import { createRender } from '../../sutras/ui/src/widgets/code/editor/prepare'
export default defineComponent({props:{identifier:{type:String,required:true}},setup(props){
  const files=inject(ReplFilesInjectKey)!
  const html=ref('');let generation=0
  const renderer=createRender()
  watch(()=>files.value.find(f=>f.identifier===props.identifier)?.code ?? '',async code=>{
    const current=++generation;const render=await renderer
    const rendered=render(code,'vue');if(current===generation)html.value=rendered
  },{immediate:true})
  return ()=>h('div',{class:'language-vue vp-adaptive-theme'},[h('span',{class:'lang'},'vue'),h('div',{innerHTML:html.value})])
}})
