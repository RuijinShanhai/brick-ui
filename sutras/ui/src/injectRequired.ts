import { inject, type InjectionKey } from 'vue'

/** Required provider contract: fail at setup rather than dereference later. */
export function injectRequired<T>(key: InjectionKey<T>): T {
  const value = inject(key)
  if (value === undefined) throw new Error(`Missing required Sutras provider: ${String(key)}`)
  return value
}
