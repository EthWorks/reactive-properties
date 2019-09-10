export type Callback = () => void

export abstract class Property<T> {
  abstract get (): T

  abstract subscribe (cb: Callback): Callback

  pipe<U1> (
    fn1: (property: Property<T>) => Property<U1>,
  ): Property<U1>
  pipe<U1, U2> (
    fn1: (property: Property<T>) => Property<U1>,
    fn2: (property: Property<U1>) => Property<U2>,
  ): Property<U2>
  pipe<U1, U2, U3> (
    fn1: (property: Property<T>) => Property<U1>,
    fn2: (property: Property<U1>) => Property<U2>,
    fn3: (property: Property<U2>) => Property<U3>,
  ): Property<U3>
  pipe (...fns: ((x: any) => any)[]): any {
    return fns.reduce((arg, fn) => fn(arg), this)
  }
}
