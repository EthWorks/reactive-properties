export type Callback = () => void

export abstract class Property<T> {
  abstract get (): T

  abstract subscribe (cb: Callback): Callback

  pipe<U1> (
    fn1: PipeFn<this, U1>,
  ): U1
  pipe<U1, U2> (
    fn1: PipeFn<this, U1>,
    fn2: PipeFn<U1, U2>,
  ): U2
  pipe<U1, U2, U3> (
    fn1: PipeFn<this, U1>,
    fn2: PipeFn<U1, U2>,
    fn3: PipeFn<U2, U3>,
  ): U3
  pipe (...fns: ((x: any) => any)[]): any {
    return fns.reduce((arg, fn) => fn(arg), this)
  }
}

type PipeFn<T, U> = (value: T) => U
