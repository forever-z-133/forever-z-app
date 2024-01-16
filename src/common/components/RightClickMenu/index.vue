<script setup lang="ts">
interface Props {
  menus: string[]
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
})

const emit = defineEmits<{
  (e: 'click', menu: string): void
}>()

function onClick(menu) {
  emit('click', menu)
}
</script>

<template>
  <div>
    <template v-for="menu in props.menus" :key="menu">
      <div class="item" @click="onClick(menu)">
        {{ menu }}
      </div>
    </template>
  </div>
</template>
