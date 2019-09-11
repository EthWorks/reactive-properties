import { combine, State } from '../src'
import { expect } from 'chai'
import sinon from 'sinon'

describe('combine', () => {
  describe('2 sources', () => {
    const propA = new State(5)
    const propB = new State(7)

    const res = combine([propA, propB], (a, b) => a + b)

    it('get returns proper values', () => {
      expect(res.get()).to.eq(12)
    })

    it('subscription is triggered when first source changes', () => {
      const cb = sinon.fake()

      const unsub = res.subscribe(cb)

      expect(cb).not.to.be.called

      propA.set(15)

      expect(cb).to.be.calledOnce

      unsub()
    })

    it('subscription is triggered when second source changes', () => {
      const cb = sinon.fake()

      const unsub = res.subscribe(cb)

      expect(cb).not.to.be.called

      propB.set(15)

      expect(cb).to.be.calledOnce

      unsub()
    })
  })

  describe('3 sources', () => {
    const propA = new State(5)
    const propB = new State(7)
    const propC = new State(9)

    const res = combine([propA, propB, propC], (a, b, c) => a + b + c)

    it('get returns proper values', () => {
      expect(res.get()).to.eq(21)
    })
  })

  it('works on union types', () => {
    const propA = new State<number | string>(5)
    const propB = new State({ a: true })

    const res = combine([propA, propB], (a, b) => b.a ? a : b)

    expect(res.get()).to.eq(5)
  })
})
