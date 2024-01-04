<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Theme } from '@/constants/theme'
import { changeTheme, initialTheme } from '@/constants/theme'

const theme = ref<Theme>(initialTheme)

onMounted(() => {
  changeTheme(theme.value)
})

function toggleTheme() {
  if (theme.value === 'light') theme.value = 'dark'
  else theme.value = 'light'

  changeTheme(theme.value)
}
</script>

<template>
  <div>hello</div>
  <el-button @click="toggleTheme">
    {{ theme }}
  </el-button>
</template>
