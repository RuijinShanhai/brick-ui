import { nextTick, onBeforeUnmount, ref } from 'vue'

/** Optional Brick application glue, not an AntD Dropdown replacement. */
export function useButtonActionMenu(onSelect: (value: string) => void) {
  const open = ref(false)
  const trigger = ref<{ focus(): void } | null>(null)
  const menu = ref<HTMLElement | null>(null)
  const items = () => Array.from(menu.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])') ?? [])
  const close = (restore = false) => { open.value = false; if (restore) trigger.value?.focus() }
  let documentTarget: Document | undefined
  const outside = (event: PointerEvent) => {
    const path = event.composedPath()
    if (menu.value && !path.includes(menu.value) && !path.some(n => n instanceof Element && n.getAttribute('aria-controls') === menu.value?.id)) close()
  }
  const removeOutside = () => documentTarget?.removeEventListener('pointerdown', outside)
  const show = async (last = false) => {
    open.value = true
    await nextTick()
    const list = items(); (last ? list.at(-1) : list[0])?.focus()
    removeOutside()
    documentTarget = menu.value?.ownerDocument
    documentTarget?.addEventListener('pointerdown', outside)
  }
  onBeforeUnmount(removeOutside)
  const triggerKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); void show(e.key === 'ArrowUp') }
    else if (e.key === 'Escape') { e.preventDefault(); close(true) }
  }
  const menuKeydown = (e: KeyboardEvent) => {
    const list = items()
    const index = list.indexOf(menu.value?.ownerDocument.activeElement as HTMLElement)
    let next: number | undefined
    if (e.key === 'ArrowDown') next = (index + 1) % list.length
    if (e.key === 'ArrowUp') next = (index - 1 + list.length) % list.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = list.length - 1
    if (next !== undefined) { e.preventDefault(); list[next]?.focus() }
    if (e.key === 'Escape') { e.preventDefault(); close(true) }
    if (e.key === 'Tab') close() // Preserve native tab movement.
  }
  return {
    open, trigger, menu, show, close, triggerKeydown, menuKeydown,
    toggle: () => { if (open.value) close(); else void show() },
    choose: (value: string) => { onSelect(value); close(true) },
  }
}
