import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { injectRequired as inject } from '../../../injectRequired'
import Tooltip from 'ant-design-vue/es/tooltip'
import { ReplPattenKey, ReplPatternChangeKey, ReplCollapseChangeKey, ReplCollapseKey } from '@sgwm-sutras/hooks'
import EditFilled from '@ant-design/icons-vue/EditFilled'
import UndoOutlined from '@ant-design/icons-vue/UndoOutlined'

// Brick local MIT patch: stable native Tooltip; reject obsolete visibility callbacks.
export default defineComponent({
  name: 'EditAction',
  setup() {
    const pattern = inject(ReplPattenKey)
    const collapse = inject(ReplCollapseKey)
    const setCollapse = inject(ReplCollapseChangeKey)
    const setPattern = inject(ReplPatternChangeKey)
    const open = ref(false)
    const generation = ref(0)
    const trigger = ref<HTMLElement | null>(null)
    let disposed = false
    let hovered = false
    const close = () => { generation.value++; open.value = false }
    watch(pattern, close, { flush: 'sync' })
    onBeforeUnmount(() => { disposed = true; close() })
    const activate = () => {
      const restoreFocus = trigger.value?.ownerDocument.activeElement === trigger.value
      close()
      if (pattern.value === 'readPretty') {
        if (collapse.value) setCollapse?.(false)
        setPattern?.('editable')
      } else setPattern?.('readPretty')
      if (restoreFocus) void nextTick(() => { if (!disposed) trigger.value?.focus() })
    }
    return () => {
      const current = generation.value
      const editing = pattern.value !== 'readPretty'
      // A mode key disposes the old Tooltip lifecycle. Preserve keyboard focus
      // explicitly across that local trigger remount; never remount DemoBox.
      return <Tooltip key={editing ? 'cancel' : 'edit'} title={editing ? '取消' : '编辑'} open={open.value}
        {...{ 'onUpdate:open': (value: boolean) => {
          if (!disposed && current === generation.value) open.value = value && hovered
        } }}>
        <span ref={trigger} class="su-action" role="button" tabindex={0} aria-label={editing ? '取消编辑' : '编辑示例'}
          onMouseenter={() => { hovered = true }}
          onMouseleave={() => { hovered = false; close() }}
          onClick={activate}
          onKeydown={(event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate() }
          }}>
          {editing ? <UndoOutlined /> : <EditFilled />}
        </span>
      </Tooltip>
    }
  },
})
