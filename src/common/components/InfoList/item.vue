<script setup lang="ts">
import { computed, inject } from 'vue'
import { isNumberString } from '../../utils/index'
import type { INFO_LIST_PROVIDE } from './index.vue'

interface Props {
  label?: string
  labelWidth?: 'auto' | string | number
  value?: string | number
  tooltip?: string | number
  ellipsis?: boolean
}

defineOptions({
  name: 'InfoListItem',
})

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelWidth: 'auto',
  value: '',
  tooltip: '',
  ellipsis: true,
})

defineSlots<{
  default(props: { value: Props['value'], tooltip: Props['tooltip'] }): any
  label(props: { label: Props['label'] }): any
}>()

// 由 InfoList 父组件来的数据
const ctx = inject<INFO_LIST_PROVIDE>('INFO_LIST_PROVIDE', {})

// 介绍词定宽，获取 css 实际值
const labelWidth = computed(() => {
  if (ctx.labelPosition === 'top') return ''
  if (ctx.labelWidth) return calculateUnitNumber(ctx.labelWidth)
  return calculateUnitNumber(props.labelWidth)
})

// 比如 10 转为 10px，格式化 css 数字单位
function calculateUnitNumber(str: Props['labelWidth']) {
  if (!str || str === 'auto') return ''
  if (isNumberString(str)) return `${str}px`
  return str
}
</script>

<template>
  <div class="info-list-item">
    <div v-if="props.label || $slots.label" class="label" :style="{ width: labelWidth }">
      <slot name="label" :label="props.label">
        <span class="">{{ props.label }}</span>
      </slot>
    </div>
    <div class="value" :class="{ ellipsis }">
      <slot :value="props.value" :tooltip="props.tooltip">
        <el-tooltip :disabled="!props.tooltip" :content="String(props.tooltip)" placement="top">
          <div class="content" :title="String(props.value)">
            {{ props.value }}
          </div>
        </el-tooltip>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../styles/mixins.less";
.info-list-item {
  display: flex;
  .items-gap(16px);

  .label {
    flex-shrink: 0;
  }

  .value {
    color: rgba(15, 24, 41, 0.7);
    &.ellipsis {
      overflow: hidden;
      & > .content {
        .text-overflow();
      }
    }
  }
}
</style>
