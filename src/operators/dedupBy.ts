import { Property, Callback } from '../Property'

export function dedupBy <T> (eq: (a: T, b: T) => boolean) {
  return (source: Property<T>) => new class extends Property<T> {
    get (): T {
      return source.get()
    }

    subscribe (cb: Callback): Callback {
      let previous = source.get()
      return source.subscribe(() => {
        if (!eq(previous, source.get())) {
          previous = source.get()
          cb()
        }
      })
    }
  }
}
