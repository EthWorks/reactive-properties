type PipeFn<T, U> = (value: T) => U

export function pipe<T, U1> (
  fn1: PipeFn<T, U1>,
): PipeFn<T, U1>
export function pipe<T, U1, U2> (
  fn1: PipeFn<T, U1>,
  fn2: PipeFn<U1, U2>,
): PipeFn<T, U2>
export function pipe<T, U1, U2, U3> (
  fn1: PipeFn<T, U1>,
  fn2: PipeFn<U1, U2>,
  fn3: PipeFn<U2, U3>,
): PipeFn<T, U3>
export function pipe<T, U1, U2, U3, U4> (
  fn1: PipeFn<T, U1>,
  fn2: PipeFn<U1, U2>,
  fn3: PipeFn<U2, U3>,
  fn4: PipeFn<U3, U4>,
): PipeFn<T, U4>
export function pipe<T, U1, U2, U3, U4, U5> (
  fn1: PipeFn<T, U1>,
  fn2: PipeFn<U1, U2>,
  fn3: PipeFn<U2, U3>,
  fn4: PipeFn<U3, U4>,
  fn5: PipeFn<U4, U5>,
): PipeFn<T, U5>
export function pipe<T, U1, U2, U3, U4, U5, U6> (
  fn1: PipeFn<T, U1>,
  fn2: PipeFn<U1, U2>,
  fn3: PipeFn<U2, U3>,
  fn4: PipeFn<U3, U4>,
  fn5: PipeFn<U4, U5>,
  fn6: PipeFn<U5, U6>,
): PipeFn<T, U6>
export function pipe (...fns: PipeFn<any, any>[]): PipeFn<any, any>
export function pipe (...fns: ((x: any) => any)[]): any {
  return (val: any) => fns.reduce((arg, fn) => fn(arg), val)
}
