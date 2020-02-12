import { Property } from './Property'
import { multipleCallback } from './util/multipleCallback'

type PropertyArray<T> = { [K in keyof T]: Property<T[K]> }

export function combine<T, A, B> (properties: PropertyArray<[A, B]>, map: (a: A, b: B) => T): Property<T>
export function combine<T, A, B, C> (properties: PropertyArray<[A, B, C]>, map: (a: A, b: B, c: C) => T): Property<T>
// tslint:disable-next-line:max-line-length
export function combine<T, A, B, C, D> (properties: PropertyArray<[A, B, C, D]>, map: (a: A, b: B, c: C, d: D) => T): Property<T>
export function combine (properties: Property<any>[], map: (...args: any) => any): Property<any> {
  return new class extends Property<any> {
    get (): any {
      const values = properties.map(prop => prop.get())
      return map(...values as any)
    }

    subscribe (cb: () => void): () => void {
      return multipleCallback(properties.map(prop => prop.subscribe(cb)))
    }
  }
}
