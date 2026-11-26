// Integration boundary for vendored source built by Vite. Upstream Sutras
// implementation strict checking remains a separate regression obligation.
declare module '@sgwm-sutras/ui' {
  import type { Component } from 'vue'
  export const DemoBox: Component
}
declare module '@sgwm-sutras/shared' {
  export function uniqueId(): string
  export function getDemoInjectSymbol(identifier: string): string
  export function getPageInjectSymbol(): string
}
declare module '@sgwm-sutras/hooks' {
  import type { InjectionKey, Ref } from 'vue'
  export const ReplFilesInjectKey: InjectionKey<Ref<Array<{identifier:string;code:string}>>>
}
