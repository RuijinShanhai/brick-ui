import type { DBigInt, DNill, DNumber, DString, DSymbol } from '../../definition'
import type { EncoderType } from './types'

export const encodeString: EncoderType<string> = (data, opt) => {
  return {
    '@t': 'string',
    '@first': opt.first,
    '@value': data,
  } as DString
}

export const encodeNumber: EncoderType<number | boolean> = (data) => {
  return {
    '@t': 'number',
    '@value': data.toString(),
  } as DNumber
}

export const encodeBigInt: EncoderType<bigint> = (data) => {
  return {
    '@t': 'bint',
    '@value': `${data.toString()}n`,
  } as DBigInt
}

export const encodeSymbol: EncoderType<symbol> = (data) => {
  return {
    '@t': 'symbol',
    '@value': `${data.toString()}`,
  } as DSymbol
}

export const encodeUndefined: EncoderType = () => {
  return {
    '@t': 'nill',
    '@value': 'undefined',
  } as DNill
}

export const encodeNull: EncoderType = () => {
  return {
    '@t': 'nill',
    '@value': 'null',
  }
}
