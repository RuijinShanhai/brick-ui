<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon, useButtonActionMenu } from '@brick/components'
const selected = ref('')
const { open, trigger, menu, toggle, triggerKeydown, menuKeydown, choose } =
  useButtonActionMenu(value => { selected.value = value })
</script>
<template>
  <div class="demo-stack">
    <div class="demo-row">
      <Button type="primary" @click="selected='primary'">primary</Button>
      <Button @click="selected='secondary'">secondary</Button>
      <span class="actions-wrap">
        <Button ref="trigger" aria-haspopup="menu" aria-controls="button-multiple-actions"
          :aria-expanded="open" @click="toggle" @keydown="triggerKeydown">Actions<Icon type="down"/></Button>
        <span v-if="open" id="button-multiple-actions" ref="menu" class="actions-menu" role="menu" @keydown="menuKeydown">
          <Button v-for="item in ['1st item','2nd item','3rd item']" :key="item"
            role="menuitem" tabindex="-1" @click="choose(item)">{{item}}</Button>
        </span>
      </span>
    </div>
    <output aria-live="polite">{{selected ? '已选择：'+selected : '请选择操作'}}</output>
    <p>自主 Button 与原生菜单组合；支持方向键、Home/End、Escape 回焦、Tab 关闭及外部点击关闭，不声称完整 Dropdown 产品。</p>
  </div>
</template>
