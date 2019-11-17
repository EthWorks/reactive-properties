import { Property } from '../Property'
import { forEach } from './forEach'

export function waitFor <T> (predicate: (value: T) => boolean): (property: Property<T>) => Promise<T> {
  return property => new Promise(resolve => property.pipe(forEach(value => {
    if (predicate(value)) {
      resolve(value)
    }
  })))
}
