import { Callback, Property } from './Property'

export class State<T> extends Property<T> {
  private value: T
  private subscribers: Set<Callback> = new Set()

  constructor (initialValue: T) {
    super()

    this.value = initialValue
  }

  get (): T {
    return this.value
  }

  set (newValue: T) {
    this.value = newValue

    this.subscribers.forEach((cb) => cb())
  }

  subscribe (cb: Callback): Callback {
    this.subscribers.add(cb)

    return () => this.subscribers.delete(cb)
  }

}
