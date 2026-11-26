import { defineComponent } from "vue";
import { injectRequired as inject } from '../../../injectRequired'
import { ErrorMessageInjectKey, ShowTerminialInjectKey } from "../context";
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import { useNamespace } from "@sgwm-sutras/style";
import './style.scss'

const PreviewError = defineComponent({
  name: 'PreviewError',
  setup(){
    const ns = useNamespace('preview-error')
    const errorMessage = inject(ErrorMessageInjectKey)
    const showTerminial = inject(ShowTerminialInjectKey)
    return () => {
      if(!errorMessage.value){
        return null
      }
      return (
        <div class={ns.b()} tabindex={0} role="region" aria-label="编译错误，使用方向键滚动查看完整错误">
          <div class="error-scroll-hint">编译错误 · 可聚焦此区域，使用方向键滚动查看完整错误</div>
          <Alert type="error" banner message={errorMessage.value}>
            {{action: () => <Button size="small" type="link" onClick={() => showTerminial.value = true}>查看终端</Button>}}
          </Alert>
        </div> 
      )
    }
  }
})

export default PreviewError
