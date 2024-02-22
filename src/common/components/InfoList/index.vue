<script setup lang="ts">
import { computed, provide } from 'vue'

interface Props {
  labelWidth?: 'auto' | string | number
  labelPosition?: 'left' | 'right' | 'top'
}

defineOptions({
  name: 'InfoList',
})

const props = withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  labelPosition: 'left',
})

defineSlots<{
  default(): any
}>()

// 传递数据给 InfoListItem 子组件用
export type INFO_LIST_PROVIDE = Props
provide<INFO_LIST_PROVIDE>('INFO_LIST_PROVIDE', props)

// 介绍词位置样式
const labelPositionClass = computed(() => {
  return props.labelPosition ? `label-at-${props.labelPosition}` : ''
})
</script>

<template>
  <div class="info-list" :class="[labelPositionClass]">
    <slot />
  </div>
</template>

<style scoped lang="less">
@import "../../styles/mixins.less";

.info-list {
  --info-list-children-gap: 8px;
}

.info-list {
  .items-gap(var(--info-list-children-gap), bottom);

  &.label-at-top {
    & > :deep(.info-list-item) {
      display: block;
    }
  }

  &.label-at-right {
    & > :deep(.info-list-item) {
      .label {
        text-align: right;
      }
    }
  }
}
</style>
