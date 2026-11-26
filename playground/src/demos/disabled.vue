<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const clicks=ref(0)
</script>
<template><div class="demo-stack"><div v-for="type in (['primary','default','dashed','link'] as const)" :key="type" class="demo-row"><Button :type="type" @click="clicks++">{{type}}</Button><Button :type="type" disabled @click="clicks++">{{type}}(disabled)</Button></div><div class="ghost-surface ghost-surface-disabled demo-row"><Button ghost @click="clicks++">Ghost</Button><Button ghost disabled @click="clicks++">Ghost(disabled)</Button></div><output aria-live="polite">有效点击：{{clicks}}</output></div></template>
