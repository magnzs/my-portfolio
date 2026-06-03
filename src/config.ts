import type { Component } from 'vue'
import type { WindowType } from '@/windows/types'

import { Globe, Settings, Grid2X2 } from '@lucide/vue'

export const WindowIcons: Record<WindowType, Component> = {
  browser: Globe,
  settings: Settings,
}

export const SuperIcon = Grid2X2
