<script setup lang="ts">
import type { PropType } from 'vue'
import type { DArray, DTypedArray, DBuffer, DDataView, PCollection, PArray, PTypedArray, PBuffer, PDataView } from '../../definition'

defineOptions({
  inheritAttrs: false
})

defineProps({
  data: {
    type: Object as PropType<DArray | DTypedArray | DBuffer | DDataView | PCollection | PArray | PTypedArray | PBuffer | PDataView>,
    required: true,
  },
  flat: Boolean,
  isLog: Boolean,
})
</script>

<template>
  <span>
    {{ data['@name'] || 'Array' }}<span v-if="data['@size'] !== null">({{ data['@size'] }})</span>
  </span>
</template>
