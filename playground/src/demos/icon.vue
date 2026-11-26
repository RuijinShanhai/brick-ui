<script setup lang="ts">
import { Button, Icon } from '@brick/components'
</script>
<template><div class="demo-stack"><div class="demo-row"><Button type="primary" shape="circle" icon="search" aria-label="搜索"/><Button type="primary" shape="circle">A</Button><Button type="primary" icon="search">Search</Button><Button shape="circle" icon="search" aria-label="搜索"/><Button icon="search">Search</Button></div><div class="demo-row"><Button shape="circle" icon="search" aria-label="搜索"/><Button icon="search">Search</Button><Button type="dashed" shape="circle" icon="search" aria-label="搜索"/><Button type="dashed" icon="search">Search</Button><Button>Search<Icon type="search"/></Button></div></div></template>
