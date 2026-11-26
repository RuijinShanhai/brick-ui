import { defineComponent, h } from 'vue'
export { Button, ButtonGroup } from './button'
export type { ButtonType, ButtonSize, ButtonShape, ButtonHTMLType, ButtonLoading, ButtonRef } from './button'
export { Icon } from './icon'
export { useButtonActionMenu } from './button/action-menu'
export { Button as InitButton } from './button'
const part = (name: string, tag: string) => defineComponent({ name: `Brick${name}`, setup: (_, { slots }) => () => h(tag, { class: `brick-${name.toLowerCase()}` }, slots.default?.()) })
export const Layout = part('Layout', 'div')
export const Header = part('Header', 'header')
export const Sider = part('Sider', 'aside')
export const Content = part('Content', 'main')
export const Footer = part('Footer', 'footer')
