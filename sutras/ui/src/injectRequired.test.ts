import { expect, test } from 'vitest'
import { createSSRApp, defineComponent, h, provide, type InjectionKey } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { injectRequired } from './injectRequired'

const key: InjectionKey<number> = Symbol('synthetic-required')
const Child = defineComponent({ setup() { const value = injectRequired(key); return () => h('span', String(value)) } })

test('required provider preserves provided falsy value', async () => {
  const app = createSSRApp(defineComponent({ setup() { provide(key, 0); return () => h(Child) } }))
  expect(await renderToString(app)).toBe('<span>0</span>')
})

test('missing required provider fails explicitly rather than returning undefined', async () => {
  const app = createSSRApp(Child)
  app.config.warnHandler = () => {}
  await expect(renderToString(app)).rejects.toThrow('Missing required Sutras provider')
})
