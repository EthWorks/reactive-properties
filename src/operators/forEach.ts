import { Callback, Property } from '../Property'

export function forEach <T> (action: (value: T) => void): (property: Property<T>) => Callback {
  return property => {
    action(property.get())
    return property.subscribe(() => action(property.get()))
  }
}
