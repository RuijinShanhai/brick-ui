import { useNamespace } from '@sgwm-sutras/style'
import type { PropType } from 'vue'
import { defineComponent, h, type Component } from 'vue'
import type {
  EncodeTypeResult,
} from '../../core/encode'
import { useValueRender } from '../../hooks'
import './style.scss'

const ConsoleValue = defineComponent({
  name: 'ConsoleValue',
  inheritAttrs: false,
  props: {
    data: {
      type: Object as PropType<EncodeTypeResult>,
      required: true,
    },
    hideNameObject: Boolean,
    flat: Boolean,
    isLog: Boolean,
  },
  setup(props, { slots, attrs }) {
    const ns = useNamespace('console-value')
    return () => {
      const Renderer = useValueRender(props.data)
      return (
        <div class={ns.b()}>
          {h(Renderer as Component, { ...attrs, ...props }, slots)}
        </div>
      )
    }
  },
})

export default ConsoleValue
