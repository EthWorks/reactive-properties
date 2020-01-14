import { Property, Callback } from "../Property"

export function dedupBy <T> (eq: (a: T, b: T) => boolean) {
  return (source: Property<T>) => {
    let hasPrevious = false
    let previous: T | undefined = undefined

    return new class extends Property<T> {
      get (): T {
        return source.get()
      }
  
      subscribe (cb: Callback): Callback {
        return source.subscribe(() => {
          if(!hasPrevious || !eq(previous!, source.get())) {
            previous = source.get()
            hasPrevious = true
            cb()
          }
        })
      }
    }
  }
}
