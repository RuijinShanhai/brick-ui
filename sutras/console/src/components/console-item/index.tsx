import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import LocationConsole from '../console-location'
import type { ConsoleTypeBasic } from '../../definition'
import type { EncodeResult } from '../../core/encode'
import './style.css'
import ConsoleBlock from '../../layouts/console-block'
import { DebugIcon, ErrorIcon, WarnIcon } from '../../icons'
import ConsoleBadge from '../console-badge'
import ConsoleContent from '../console-content'

const ConsoleItem = defineComponent({
  inheritAttrs: false,
  props: {
    data: {
      type: [Object, Array] as PropType<EncodeResult | readonly EncodeResult[]>,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    type: {
      type: String as PropType<ConsoleTypeBasic>,
    },
    noLocation: {
      type: Boolean,
    },
  },
  setup(props) {
    const { data, count, type, noLocation } = toRefs(props)
    const location = computed(() =>
      noLocation.value
        ? undefined
        : (Array.isArray(data.value) ? data.value[0] : data.value)?.['@location'],
    )

    const RenderIcon = () => {
      if (count.value > 1)
        return <ConsoleBadge type={type.value} count={count.value} />

      switch (type.value) {
        case 'debug':
          return <DebugIcon />
        case 'error':
          return <ErrorIcon />
        case 'warn':
          return <WarnIcon />
        default:
          return null
      }
    }

    return () => (
      <ConsoleBlock type={type.value}>
        {{
          icon: RenderIcon,
          default: () => <ConsoleContent type={type.value} data={data.value} />,
          extra: () => <LocationConsole location={location.value} />,
        }}
      </ConsoleBlock>
    )
  },
})

export default ConsoleItem
