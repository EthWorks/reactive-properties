import { Callback } from '../Property'

export function multipleCallback (callbacks: Callback[]): Callback {
  return () => callbacks.forEach(cb => cb())
}
