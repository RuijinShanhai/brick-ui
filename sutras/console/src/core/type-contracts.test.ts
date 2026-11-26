import { expect, test } from 'vitest'
import { encode } from './encode/encode'
import { LinkStore } from './store'
import { isTypedArray } from '../utils/isTypedArray'
import { classNames } from '@sgwm-sutras/style'

test('typeof dispatch preserves primitive wire values', () => {
  const store = new LinkStore()
  for (const [value, tag, wire] of [['text','string','text'],[42,'number','42'],[true,'number','true'],[4n,'bint','4n'],[undefined,'nill','undefined']] as const) {
    const data = encode(value, { store })
    expect(data['@t']).toBe(tag)
    expect('@value' in data && data['@value']).toBe(wire)
  }
})

test('typed-array guard recognizes instances, not constructors or DataView', () => {
  expect(isTypedArray(new Uint8Array([1]))).toBe(true)
  expect(isTypedArray(new BigInt64Array([1n]))).toBe(true)
  expect(isTypedArray(Uint8Array)).toBe(false)
  expect(isTypedArray(new DataView(new ArrayBuffer(2)))).toBe(false)
})

test('recursive classNames preserves strings, arrays and conditional keys', () => {
  expect(classNames('base', ['nested', ['', 'deep']], { yes: true, no: false }, null)).toBe('base nested deep yes')
})
