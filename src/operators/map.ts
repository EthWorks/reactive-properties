import { Callback, Property } from '../Property'

export function map<T, U> (mapFn: (t: T) => U): (prop: Property<T>) => Property<U> {
  return (source) => new class extends Property<U> {
    get (): U {
      return mapFn(source.get())
    }

    subscribe (cb: Callback): Callback {
      return source.subscribe(cb)
    }
  }
}
