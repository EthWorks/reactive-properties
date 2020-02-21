import { Property } from '../Property'
import { map } from './map'
import { pipe } from '../pipe'
import { flat } from './flat'

export function flatMap<T, U> (mapFn: (t: T) => Property<U>): (prop: Property<T>) => Property<U> {
  return pipe(
    map(mapFn),
    flat,
  )
}
