import { Property } from './Property'

type PropertyArray<T> = { [K in keyof T]: Property<T[K]> }

export function combine<A extends any[], T> (properties: PropertyArray<A>, map: (...args: A) => T): Property<T> {
  return new class extends Property<any> {
    get (): any {
      const values = properties.map(prop => prop.get())
      return map(...values as any)
    }

    subscribe (cb: () => void): () => void {
      const subscriptions = properties.map(prop => prop.subscribe(cb))
      return () => subscriptions.forEach(unsubscribe => unsubscribe())
    }
  }
}
