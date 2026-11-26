import { defineComponent, onMounted, ref } from "vue";
import './style.css'

const Toolbar = defineComponent({
    name: 'Toolbar',
    setup(_, {slots}){
        // Toolbar actions depend on browser clipboard/portal capabilities.
        // Keep the SSR and first client shell identical; mount actions only
        // after hydration instead of reconciling incompatible fragment anchors.
        const mounted = ref(false)
        onMounted(() => { mounted.value = true })
        return () => {
            return (
                <div class="toolbar">
                    {mounted.value ? slots.default?.() : null}
                </div>
            )
        }
    }
})

export default Toolbar
