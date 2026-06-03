import mitt from 'mitt'

type Events = {
  'window:created': number
  'window:focused': number
  'window:maximized': number
  'window:minimized': number
  'window:restored': number
  'window:closed': number
}

export const emitter = mitt<Events>()
