import { Callback, Property } from '../Property'
import { multipleCallback } from '../util/multipleCallback'

export function callEffectForEach <T> (effect: (value: T) => Callback): (property: Property<T>) => Callback {
  return property => {
    let clear = effect(property.get())
    const unsubscribe = property.subscribe(() => {
      clear()
      clear = effect(property.get())
    })
    return multipleCallback([unsubscribe, clear])
  }
}
