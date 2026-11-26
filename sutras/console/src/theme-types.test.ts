import { expect, test } from 'vitest'
import { getHeaderFn } from './core/getHeaderFn'

test('function header parsing handles arrow bodies and ordinary functions', () => {
  expect(getHeaderFn('(x) => x').args).toBe('(x)')
  expect(getHeaderFn('function named(x) { return x }').name).toBe('named')
})
