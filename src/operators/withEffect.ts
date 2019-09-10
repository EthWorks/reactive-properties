import { Callback, Property } from '../Property'

export function withEffect (effect: () => Callback | void | undefined): <T> (source: Property<T>) => Property<T> {
  return <T> (source: Property<T>) => new class extends Property<T> {
    private subscriberCount = 0
    private clearEffect: Callback | undefined

    get (): T {
      return source.get()
    }

    subscribe (cb: Callback): Callback {
      const unsubscribe = source.subscribe(cb)

      this.subscriberCount++
      if (this.subscriberCount === 1) {
        this.clearEffect = effect() || undefined
      }

      return () => {
        this.subscriberCount--
        if (this.subscriberCount === 0 && this.clearEffect) {
          this.clearEffect()
        }

        unsubscribe()
      }
    }
  }
}
