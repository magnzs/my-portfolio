export interface Window {
  id: number
  type: WindowType
  state: WindowState
  x: number
  y: number
}

export type WindowType = 'browser' | 'settings'

type WindowState = 'active' | 'maximized' | 'minimized'
