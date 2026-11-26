import type { InjectionKey, Ref } from 'vue'
export const CompileErrorsKey: InjectionKey<Ref<Error[]>> = Symbol('SutrasCompileErrors')
