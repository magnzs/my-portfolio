import type { Window } from '@/windows/types'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { emitter } from '@/services/events'

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<Window[]>([])
  const activeWindows = computed(() => windows.value.filter((w) => w.state !== 'minimized')) // active and maximized windows
  const minimizedWindows = computed(() => windows.value.filter((w) => w.state === 'minimized'))
  const maximizedWindow = computed(() => windows.value.find((w) => w.state === 'maximized'))

  let newWindowId = 1

  function addWindow(type: Window['type']) {
    // if a window of the same type already exists, just focus it instead of adding a new one
    const existingWindow = windows.value.find((w) => w.type === type)
    if (existingWindow) {
      focusWindow(existingWindow.id)
      return
    }

    const offset = windows.value.length * 30
    const window: Window = {
      id: newWindowId++,
      type,
      state: 'active',
      x: 100 + offset,
      y: 100 + offset,
    }
    windows.value.push(window)
    emitter.emit('window:created', window.id)
  }

  function removeWindow(id: number) {
    windows.value = windows.value.filter((window) => window.id !== id)
    emitter.emit('window:closed', id)
  }

  // move the window to the end of the array, so it will be on top of the others
  function focusWindow(id: number) {
    const window = windows.value.find((w) => w.id === id)
    if (!window) return

    // can't focus a window if another one is maximized
    if (maximizedWindow.value && maximizedWindow.value!.id !== id) return

    // if the window is minimized, restore it
    if (window.state === 'minimized') {
      window.state = 'active'
      emitter.emit('window:restored', id)
    }

    const index = windows.value.indexOf(window)
    if (index !== windows.value.length - 1) {
      const window = windows.value.splice(index, 1)[0]!
      windows.value.push(window)
      emitter.emit('window:focused', id)
    }
  }

  function toggleMaximize(id: number) {
    const window = windows.value.find((w) => w.id === id)
    if (!window) return

    if (window.state === 'maximized') {
      window.state = 'active'
      emitter.emit('window:restored', id)
    } else {
      window.state = 'maximized'
      emitter.emit('window:maximized', id)
    }
  }

  function toggleMinimize(id: number) {
    const window = windows.value.find((w) => w.id === id)
    if (!window) return

    if (window.state === 'minimized') {
      focusWindow(id)
    } else {
      window.state = 'minimized'
      emitter.emit('window:minimized', id)
    }
  }

  return {
    windows,
    activeWindows,
    minimizedWindows,
    addWindow,
    removeWindow,
    focusWindow,
    toggleMaximize,
    toggleMinimize,
  }
})
