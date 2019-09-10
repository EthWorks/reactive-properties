import { withEffect } from './withEffect'
import { Callback } from '../Property'

interface Subscribable {
  subscribe: (cb: Callback) => Callback
}

export function withSubscription<T> (
  callback: () => void,
  subscribable: Subscribable,
) {
  return withEffect(() => {
    setImmediate(callback)
    return subscribable.subscribe(callback)
  })
}
