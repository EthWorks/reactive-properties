import { Property } from '../Property'
import { callEffectForEach } from './callEffectForEach'
import { multipleCallback } from '../util/multipleCallback'

export function flat<T> (prop: Property<Property<T>>): Property<T> {
  return new class extends Property<T> {
    get (): T {
      return prop.get().get()
    }

    subscribe (cb: () => void): () => void {
      return multipleCallback([
        prop.subscribe(cb),
        prop.pipe(callEffectForEach(subprop => subprop.subscribe(cb))),
      ])
    }
  }
}
