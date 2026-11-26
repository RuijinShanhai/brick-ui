<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const loading=ref(false),iconLoading=ref(false),delayed=ref(false)
</script>
<!-- 原站 loading.md 两个交互按钮原文均为 Click me!，第二个有 poweroff 图标；本页对应 Click me! / Click with icon。 -->
<template><div class="demo-stack"><div class="demo-row"><Button type="primary" loading>Loading</Button><Button type="primary" size="small" loading>Loading</Button></div><div class="demo-row"><Button type="primary" :loading="loading" @click="loading=true">Click me!</Button><Button type="primary" icon="poweroff" :loading="iconLoading" @click="iconLoading=true">Click with icon</Button></div><div class="demo-row"><Button type="primary" loading aria-label="加载中"/><Button type="primary" shape="circle" loading aria-label="加载中"/><Button type="danger" shape="round" loading aria-label="加载中"/></div><div class="demo-row"><Button type="primary" :loading="delayed ? {delay:800} : false" @click="delayed=true">Delayed loading</Button><Button @click="loading=false;iconLoading=false;delayed=false">Reset loading</Button></div><p>补充 API 演示：delay 单位毫秒；800ms 内可取消，重置后清除计时。</p></div></template>
