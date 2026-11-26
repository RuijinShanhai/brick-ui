import { defineComponent } from 'vue';
import { injectRequired as inject } from '../../../injectRequired'
import Tooltip from 'ant-design-vue/es/tooltip'
import { ReplCollapseKey, ReplCollapseChangeKey, ReplPageDataInjectKey } from '@sgwm-sutras/hooks';
import './style.css'

const CollapseAction = defineComponent({
    name: 'CollapseAction',
    setup(){
        const collapse = inject(ReplCollapseKey)
        const setCollapse = inject(ReplCollapseChangeKey)
        // Self-contained glyphs: static deployments must not require third-party CDN images.
        const glyph = (d: string) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}" fill="none" stroke="#888" stroke-width="2"/></svg>`)
        return () => {
            return (
                <Tooltip title={collapse.value ? '展开代码' : '收起代码'}>
                    <span 
                        class="su-collapse-action su-action"
                    >
                        <img
                            alt="expand code"
                            src={glyph('M4 9l8 8 8-8M4 3l8 8 8-8')}
                            class={!collapse.value ? 'hide' : 'show'}
                            onClick={() => setCollapse(!collapse.value)}
                        />
                        <img
                            alt="collapse code"
                            src={glyph('M4 15l8-8 8 8M4 21l8-8 8 8')}
                            class={!collapse.value ? 'show' : 'hide'}
                            onClick={() => setCollapse(!collapse.value)}
                        />
                    </span>
                </Tooltip>
            )
        }
    }
})

export default CollapseAction
