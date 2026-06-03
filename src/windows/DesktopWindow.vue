<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Minimize, Maximize, X } from '@lucide/vue'
import { emitter } from '@/services/events'
import { useWindowsStore } from '@/stores/windows'
import { useDraggable, useWindowSize } from '@vueuse/core'

const winStore = useWindowsStore()
const window = computed(() => winStore.windows.find((w) => w.id === props.id)!)

const el = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
const containerStyle = computed(() => {
  return window.value.state === 'maximized' ? MAXIMIZED_STYLE : style.value
})

const MAXIMIZED_STYLE = {
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
}

const props = defineProps<{
  id: number
  safeZone: HTMLElement | null
}>()

onMounted(() => {
  emitter.on('window:focused', (id) => {
    if (id === props.id) console.log(`Window ${id} focused`)
  })

  emitter.on('window:restored', (id) => {
    if (id === props.id) console.log(`Window ${id} restored`)
  })

  emitter.on('window:maximized', (id) => {
    if (id === props.id) console.log(`Window ${id} maximized`)
  })
})

onUnmounted(() => {
  emitter.off('window:focused')
  emitter.off('window:restored')
  emitter.off('window:maximized')
})

const { x, y, style } = useDraggable(el, {
  initialValue: {
    x: window.value!.x,
    y: window.value!.y,
  },
  containerElement: props.safeZone,
  handle: handle,
})

const { width, height } = useWindowSize()
// Sempre que a tela mudar de tamanho (zoom ou redimensionar janela)
watch([width, height], () => {
  if (window.value.state === 'maximized') return // Janela maximizada não precisa de ajuste

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
    @mousedown="winStore.focusWindow(id)"
    ref="el"
    :style="containerStyle"
  >
    <div class="window__header" ref="handle">
      <div>{{ window.type }}</div>
      <div class="window__header-buttons">
        <button class="window__header-button" @click="winStore.toggleMinimize(id)">
          <Minimize />
        </button>
        <button class="window__header-button" @click="winStore.toggleMaximize(id)">
          <Maximize />
        </button>
        <button class="window__header-button" @click="winStore.removeWindow(id)">
          <X />
        </button>
      </div>
    </div>
    <div class="window__content">
      <p>Página kkkkkkkkkkkkkkkkkk</p>
      <p>1l76192735011lLiIlI googIe</p>
    </div>
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
