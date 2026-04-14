<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDraggable, useWindowSize } from '@vueuse/core'
import { Maximize, X } from '@lucide/vue'

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
const isMaximized = ref(false)

const props = defineProps<{
  safeZone: HTMLElement | null
  title: string
  content: string
}>()

defineEmits<{
  (e: 'grabing'): void
  (e: 'close'): void
}>()

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 100, y: 100 },
  containerElement: props.safeZone,
  handle: handle,
})

function onMaximize() {
  console.log('teste')
  isMaximized.value = !isMaximized.value
}

const { width, height } = useWindowSize()
// Sempre que a tela mudar de tamanho (zoom ou redimensionar janela)
watch([width, height], () => {
  if (isMaximized.value) return // Janela maximizada não precisa de ajuste

  const elRect = el.value?.getBoundingClientRect()
  if (!elRect) return

  // Se o X da janela + a largura dela for maior que a largura da tela
  if (x.value + elRect.width > width.value) {
    x.value = width.value - elRect.width
  }
  // Se o Y da janela + a altura dela for maior que a altura da tela
  if (y.value + elRect.height > height.value) {
    y.value = height.value - elRect.height
  }

  // Garante que não fique negativo (fora da tela pela esquerda/topo)
  x.value = Math.max(0, x.value)
  y.value = Math.max(0, y.value)
})
</script>

<template>
  <div
    class="window__container"
    @mousedown="$emit('grabing')"
    ref="el"
    :style="isMaximized ? { top: 0, left: 0, width: '100%', height: '100%' } : style"
  >
    <div class="window__header" ref="handle">
      <div>{{ props.title }}</div>
      <div class="window__header-buttons">
        <button class="window__header-button" @click="onMaximize">
          <Maximize />
        </button>
        <button class="window__header-button" @click="$emit('close')">
          <X />
        </button>
      </div>
    </div>
    <div class="window__content">{{ props.content }}</div>
  </div>
</template>

<style scoped>
.window__container {
  position: absolute;
  width: 600px;
  min-height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.window__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}

.window__header-buttons {
  display: flex;
  gap: 5px;
}

.window__header-button {
  width: 30px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  border-radius: 50%;
  border: none;
}

.window__header-button:hover {
  background-color: #37a8ff;
}

.window__content {
  padding: 10px;
}
</style>
