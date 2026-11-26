import { defineComponent, computed, toRefs } from "vue";
import { injectRequired as inject } from '../../../injectRequired'
import { ReplCodePreviewRendersKey, ReplCodeShowLangKey, ReplPattenKey, ReplFilesInjectKey} from '@sgwm-sutras/hooks'
import Spin from 'ant-design-vue/es/spin'
import { EditorReadyInjectKey } from "../panel/context";

const CodePreviewer = defineComponent({
    name: 'CodePreviewer',
    props: {
        identifier: String
    },
    setup(props){
        const {identifier} = toRefs(props)
        const renders = inject(ReplCodePreviewRendersKey)
        const files = inject(ReplFilesInjectKey)
        const showLang = inject(ReplCodeShowLangKey)
        const pattern = inject(ReplPattenKey)
        const isEditorReady = inject(EditorReadyInjectKey)
        const spinning = computed(() => {
            return pattern.value === 'editable' && !isEditorReady.value
        })
        const renderName = computed(() => {
            if(showLang?.value === 'js'){
                const tryName = `codejs-${identifier?.value}`
                if(renders[tryName]){
                    return tryName
                }
            }
            return `code-${identifier?.value}`
        })
        return () => {
            return (
                <Spin
                    style={{fontSize: 'inherit'}}
                    spinning={spinning.value}
                >
                    { renders[renderName.value]?.() ?? <pre class="brick-readonly-source"><code>{files.value.find(file => file.identifier === identifier?.value)?.code ?? ''}</code></pre> }
                </Spin>
            )
        }
    }
})

export default CodePreviewer
