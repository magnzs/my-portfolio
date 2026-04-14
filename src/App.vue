<script setup lang="ts">
import { ref, computed } from 'vue'
import DesktopWindow from '@/windows/DesktopWindow.vue'

type Window = {
  id: number
  zIndex: number
  title: string
  content: string
}

const windows = ref<Window[]>([])
const safeZone = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const selectStatus = computed(() => (isDragging.value ? 'none' : 'auto'))

let globalZIndex = 0

function addWindow(title: string, content: string) {
  globalZIndex++
  const newWindow: Window = {
    id: Date.now(),
    zIndex: globalZIndex,
    title,
    content,
  }
  windows.value.push(newWindow)
}

function grabingWindow(id: number) {
  isDragging.value = true
  const window = windows.value.find((window) => window.id === id)
  if (window) {
    globalZIndex++
    window.zIndex = globalZIndex
  }
}

function closeWindow(id: number) {
  windows.value = windows.value.filter((window) => window.id !== id)
}
</script>

<template>
  <div class="desktop">
    <div ref="safeZone" class="desktop__workplace">
      <DesktopWindow
        @grabing="grabingWindow(window.id)"
        @close="closeWindow(window.id)"
        v-for="window in windows"
        :key="window.id"
        :style="{ zIndex: window.zIndex }"
        :safeZone="safeZone"
        :title="window.title"
        :content="window.content"
      />
      <button @click="addWindow('My Window', 'This is the content of the window.')">
        Add Window
      </button>
    </div>
  </div>
</template>

<style scoped>
.desktop {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
}

.desktop__workplace {
  top: 0px;
  left: 0px;
  position: relative;
  height: 100%;
  background-color: #ebf0f1;
  user-select: v-bind(selectStatus);
}

button {
  width: 128px;
  padding: 8px;
  background-color: #007bff;
  border-radius: 8px;
}
</style>
