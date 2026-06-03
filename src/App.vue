<script setup lang="ts">
import { ref } from 'vue'
import { WindowIcons, SuperIcon } from '@/config'
import { useWindowsStore } from '@/stores/windows'
import DesktopWindow from '@/windows/DesktopWindow.vue'

const winStore = useWindowsStore()

const safeZone = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="desktop">
    <div ref="safeZone" class="workplace">
      <DesktopWindow
        v-for="window in winStore.activeWindows"
        :key="window.id"
        :id="window.id"
        :safeZone="safeZone"
      />
      <button @click="winStore.addWindow('settings')">Add settings</button>
      <button @click="winStore.addWindow('browser')">Add browser</button>
    </div>
    <div class="taskbar">
      <div class="taskbar__item taskbar__start">
        <SuperIcon :size="32" />
      </div>
      <div
        class="taskbar__item"
        v-for="window in winStore.windows"
        :key="window.id"
        @click="winStore.toggleMinimize(window.id)"
      >
        <component :is="WindowIcons[window.type]" :size="32" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop {
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template-rows: 1fr 60px;
  overflow: hidden;
}

.workplace {
  top: 0px;
  left: 0px;
  position: relative;
  user-select: none;
}

button {
  width: 128px;
  padding: 8px;
  background-color: #007bff;
  border-radius: 8px;
}

.taskbar {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.taskbar__item {
  height: 80%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #fff;
  background-color: #555;
  transition: 0.1s ease;
}

.taskbar__item:hover {
  filter: brightness(1.2);
}

.taskbar__item:active {
  scale: 0.9;
  filter: brightness(1.4);
}

.taskbar__start {
  background-color: #244ad5;
}
</style>
