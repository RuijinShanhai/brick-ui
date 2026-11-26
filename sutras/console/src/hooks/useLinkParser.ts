import { inject, provide, useSlots } from 'vue'
import type { Component, InjectionKey, Slot } from 'vue'
import type { DLink } from '../definition'
import { encode } from '../core/encode'
import type { EncodeTypeResult, LinkStore } from '../core/encode'

export type ConsoleLinkRender = Component<{ href: string }> | Slot | string

export interface ConsoleLinkParser {
  render?: ConsoleLinkRender
  store?: LinkStore
  _getListLinkAsync?: (link: DLink) => Promise<EncodeTypeResult>
  readLinkObjectAsync?: (link: DLink) => Promise<EncodeTypeResult>
  callFnLinkAsync?: (link: DLink) => Promise<EncodeTypeResult>
}

export const ConsoleLinkParserInjectKey = Symbol('ConsoleLinkParser') as InjectionKey<ConsoleLinkParser>

export function provideConsoleLinkParser(props: ConsoleLinkParser) {
  const store: LinkStore = (() => { if (!props.store) throw new Error('Console provider requires a link store'); return props.store })()
  async function _getListLinkAsync(link: DLink): Promise<EncodeTypeResult> {
    const fn = store.get(link['@link'])
    if (typeof fn !== 'function') {
      return await {
        '@t': 'error',
        '@first': false,
        '@stack': 'Error: this memory freed.',
        '@real': null,
      }
    }

    return await encode(fn(), {
      first: false,
      linkReal: true,
      store,
    })
  }

  async function readLinkObjectAsync(link: DLink): Promise<EncodeTypeResult> {
    const obj = store.get(link['@link'])
    return encode(obj, {
      first: false,
      linkReal: false,
      store,
    })
  }

  async function callFnLinkAsync(link: DLink): Promise<EncodeTypeResult> {
    const fn = store.get(link['@link'])

    if (typeof fn !== 'function') {
      return {
        '@t': 'error',
        '@first': false,
        '@stack': 'Error: this memory freed.',
        '@real': null,
      }
    }

    return encode(fn(), {
      first: false,
      linkReal: true,
      store,
    })
  }

  return provide(ConsoleLinkParserInjectKey, {
    ...props,
    _getListLinkAsync,
    readLinkObjectAsync,
    callFnLinkAsync,
  })
}

export function useConsoleLinkParser() {
  const parser = inject(ConsoleLinkParserInjectKey)
  if (!parser) throw new Error('Missing console link provider')
  const { readLinkObjectAsync, callFnLinkAsync, _getListLinkAsync } = parser
  if (!readLinkObjectAsync || !callFnLinkAsync || !_getListLinkAsync) throw new Error('Incomplete console link provider')
  return { ...parser, readLinkObjectAsync, callFnLinkAsync, _getListLinkAsync }
}

export function useLinkRender() {
  const { render } = useConsoleLinkParser()
  const slots = useSlots()
  return render ?? slots.anchor ?? 'a'
}
