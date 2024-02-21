<script setup lang="ts">
import { InfoListItem } from 'common'
import { CopyDocument } from '@element-plus/icons-vue'

defineOptions({
  name: 'InfoListItemExampleDefaultSlot',
})

const props = defineProps([])
</script>

<template>
  <InfoListItem v-bind="props">
    <template #default="{ value: val, tooltip }">
      <div class="content">
        <el-tooltip :disabled="!tooltip" :content="String(tooltip)" placement="top">
          <span>{{ val }}</span>
        </el-tooltip>
        <el-button link type="primary">
          <el-icon><CopyDocument /></el-icon>
        </el-button>
      </div>
    </template>
  </InfoListItem>
</template>

<style scoped lang="less">
@import "common/styles/mixins.less";
.content {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
