<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@brick/components'
const submitted=ref(0)
</script>
<template><div class="demo-stack"><form @submit.prevent="submitted++" @reset="submitted=0" class="demo-row"><Button html-type="submit" type="primary">Submit</Button><Button html-type="reset">Reset</Button><output>提交：{{submitted}}</output></form><div class="demo-row"><Button href="#api" target="_self">API anchor</Button><Button href="https://3x.ant.design/components/button-cn/" target="_blank" rel="noopener noreferrer">上游文档</Button><Button href="#api" disabled>Disabled link</Button><Button type="ghost">Legacy ghost type</Button><Button shape="circle-outline" icon="search" aria-label="兼容圆形"/><Button>按钮</Button></div><p>Brick补充：真实表单、链接、兼容枚举与中文间距；不是第10个上游公开案例。</p></div></template>
