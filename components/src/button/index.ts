import { Comment, Fragment, Text, cloneVNode, computed, defineComponent, h, inject, onBeforeUnmount, onMounted, onUpdated, provide, ref, shallowRef, watch, type ComputedRef, type InjectionKey, type PropType, type VNode } from 'vue'
import { Icon } from '../icon'
export type ButtonType = 'default' | 'primary' | 'dashed' | 'danger' | 'link' | 'ghost'
export type ButtonSize = 'default' | 'small' | 'large'
export type ButtonShape = 'circle' | 'round' | 'circle-outline'
export type ButtonHTMLType = 'button' | 'submit' | 'reset'
export type ButtonLoading = boolean | { delay?: number }
export interface ButtonRef { focus(options?: FocusOptions): void; blur(): void; readonly element: HTMLButtonElement | HTMLAnchorElement | null }
const groupSize: InjectionKey<ComputedRef<ButtonSize>> = Symbol('brick-button-group-size')
export const ButtonGroup = defineComponent({
  name: 'BrickButtonGroup',
  props: { size: { type: String as PropType<ButtonSize>, default: 'default' } },
  setup(p, { slots }) {
    provide(groupSize, computed(() => p.size))
    return () => h('div', { class: ['brick-button-group', `brick-button-group-${p.size}`], role: 'group' }, slots.default?.())
  },
})
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap(n => n.type === Fragment ? flatten(n.children as VNode[]) : n.type === Comment || (n.type === Text && !String(n.children).trim()) ? [] : [n])
}
const twoCN = /^[\u4e00-\u9fa5]{2}$/
export const Button = defineComponent({
  name: 'BrickButton', inheritAttrs: false,
  props: {
    type: { type: String as PropType<ButtonType>, default: 'default' }, size: String as PropType<ButtonSize>, shape: String as PropType<ButtonShape>,
    ghost: Boolean, disabled: Boolean, block: Boolean,
    loading: { type: [Boolean, Object] as PropType<ButtonLoading>, default: false }, icon: String, href: String, target: String,
    htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
    autoInsertSpaceInButton: { type: Boolean, default: true },
  },
  emits: { click: (_event: MouseEvent) => true },
  setup(p, { slots, attrs, emit, expose }) {
    const element = shallowRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
    const inherited = inject(groupSize, computed<ButtonSize>(() => 'default'))
    const size = computed(() => p.size ?? inherited.value)
    const activeLoading = ref(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    const clear = () => { if (timer !== undefined) clearTimeout(timer); timer = undefined }
    watch([() => Boolean(p.loading), () => typeof p.loading === 'object' ? p.loading.delay : 0], () => {
      clear()
      const delay = typeof p.loading === 'object' ? p.loading.delay ?? 0 : 0
      if (p.loading && Number.isFinite(delay) && delay > 0) {
        activeLoading.value = false
        timer = setTimeout(() => { activeLoading.value = true; timer = undefined }, delay)
      } else activeLoading.value = Boolean(p.loading)
    }, { immediate: true, flush: 'sync' })
    const blocked = computed(() => p.disabled || activeLoading.value)
    // Finite autonomous click feedback; no global style injection, no AntD component.
    const wave = ref(0)
    let waveTimer: ReturnType<typeof setTimeout> | undefined
    let waveSequence = 0
    const stopWave = () => { if (waveTimer !== undefined) clearTimeout(waveTimer); waveTimer = undefined; wave.value = 0 }
    const startWave = () => {
      if (p.type === 'link' || p.href !== undefined || blocked.value) return
      if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
      stopWave(); wave.value = ++waveSequence
      waveTimer = setTimeout(stopWave, 550)
    }
    watch(blocked, value => { if (value) stopWave() }, { flush: 'sync' })
    onBeforeUnmount(() => { clear(); stopWave() })
    const hasTwoCN = ref(false)
    const syncCN = () => {
      hasTwoCN.value = Boolean(p.autoInsertSpaceInButton && !p.icon && !slots.icon && p.type !== 'link' && element.value && twoCN.test(element.value.textContent ?? ''))
    }
    onMounted(syncCN); onUpdated(syncCN)
    expose({ focus: (options?: FocusOptions) => element.value?.focus(options), blur: () => element.value?.blur(), get element() { return element.value } })
    const guard = (event: Event) => { if (blocked.value) { event.preventDefault(); event.stopImmediatePropagation(); return true }; return false }
    const invoke = (listener: unknown, event: Event) => {
      if (Array.isArray(listener)) listener.forEach(fn => { if (typeof fn === 'function') fn(event) })
      else if (typeof listener === 'function') listener(event)
    }
    return () => {
      const children = flatten(slots.default?.() ?? [])
      const iconSlot = flatten(slots.icon?.() ?? [])
      const needSpace = p.autoInsertSpaceInButton && children.length === 1 && !p.icon && iconSlot.length === 0 && p.type !== 'link'
      let inserted = false
      const content = children.map(child => {
        if (child.type === Text) {
          const text = String(child.children), space = needSpace && twoCN.test(text)
          inserted ||= space
          return h('span', space ? { class: 'brick-button-spaced-text' } : null, space ? text.split('').join(' ') : text)
        }
        if (needSpace && typeof child.type === 'string' && typeof child.children === 'string' && twoCN.test(child.children)) {
          const copy = cloneVNode(child); copy.children = child.children.split('').join(' '); inserted = true; return copy
        }
        return child
      })
      const icon = activeLoading.value ? h(Icon, { type: 'loading' }) : iconSlot.length ? iconSlot : p.icon ? h(Icon, { type: p.icon }) : null
      const isLink = p.href !== undefined
      return h(isLink ? 'a' : 'button', {
        ...attrs, ref: element,
        class: ['brick-button', `brick-button-${p.type}`, `brick-button-${size.value}`, p.shape && `brick-button-${p.shape}`, {
          'brick-button-background-ghost': p.ghost, 'brick-button-block': p.block, 'brick-button-loading': activeLoading.value,
          'brick-button-disabled': p.disabled, 'brick-button-icon-only': Boolean(icon) && children.length === 0,
          'brick-button-two-chinese-chars': needSpace && hasTwoCN.value && !inserted,
        }, attrs.class],
        type: isLink ? undefined : p.htmlType, disabled: isLink ? undefined : p.disabled,
        href: isLink && !blocked.value ? p.href : undefined, target: isLink ? p.target : undefined,
        role: isLink && blocked.value ? attrs.role ?? 'link' : attrs.role,
        tabindex: isLink && blocked.value ? -1 : attrs.tabindex,
        'aria-disabled': blocked.value ? 'true' : attrs['aria-disabled'], 'aria-busy': activeLoading.value ? 'true' : undefined,
        onClickCapture: (e: Event) => { if (!guard(e)) invoke(attrs.onClickCapture, e) },
        onClick: (e: MouseEvent) => { if (!guard(e)) { startWave(); emit('click', e) } },
        onAuxclick: (e: Event) => { if (!guard(e)) invoke(attrs.onAuxclick, e) },
      }, [icon, ...content, wave.value ? h('span', { key: wave.value, class: 'brick-button-wave', 'aria-hidden': 'true' }) : null])
    }
  },
})
