<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 页首是否包含左侧
  headerContainLeft?: boolean
  // 页首是否包含右侧
  headerContainRight?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  headerContainLeft: true,
  headerContainRight: false,
})
defineSlots<{
  default(): any
  header(): any
  footer(): any
  left(): any
}>()

const layoutClass = computed(() => ({
  'header-contain-left': props.headerContainLeft,
  'header-contain-right': props.headerContainRight,
}))
</script>

<template>
  <div class="base-layout" :class="layoutClass">
    <div v-if="$slots.header" class="base-layout-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.left" class="base-layout-left">
      <slot name="left" />
    </div>
    <div class="base-layout-container">
      <slot />
    </div>
    <div v-if="$slots.right" class="base-layout-right">
      <slot name="right" />
    </div>
    <div v-if="$slots.footer" class="base-layout-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="less">
.base-layout {
  --base-layout-header-height: 50px;
  --base-layout-left-width: 232px;
  --base-layout-right-width: 232px;
  --base-layout-footer-height: 50px;
}
.base-layout {
  display: grid;
  grid-template-columns: var(--base-layout-left-width) 1fr var(--base-layout-right-width);
  grid-template-rows: var(--base-layout-header-height) 1fr var(--base-layout-footer-height);
  height: 100%;
}
</style>
