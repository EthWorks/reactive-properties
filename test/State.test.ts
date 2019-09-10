import { State } from '../src'
import { expect } from 'chai'
import sinon from 'sinon'

describe('State', () => {
  it('returns initial value', () => {
    const state = new State(5)

    expect(state.get()).to.eq(5)
  })

  it('set sets the new value', () => {
    const state = new State(5)

    state.set(10)

    expect(state.get()).to.eq(10)
  })

  it('does not trigger subscriptions without mutations', () => {
    const state = new State(5)
    const cb = sinon.fake()

    state.subscribe(cb)

    expect(cb).not.to.be.called
  })

  it('triggers subscriptions after set', () => {
    const state = new State(5)
    const cb = sinon.fake()

    state.subscribe(cb)

    state.set(10)

    expect(cb).to.be.calledOnce

    state.set(10)

    expect(cb).to.be.calledTwice

    state.set(15)

    expect(cb).to.be.calledThrice
  })

  it('stops triggering subscriptions after unsubscribe', () => {
    const state = new State(5)
    const cb = sinon.fake()

    const sub = state.subscribe(cb)

    state.set(6)

    expect(cb).to.be.calledOnce

    sub()

    state.set(7)

    expect(cb).to.be.calledOnce
  })

  it('works with multiple subscriptions', () => {
    const state = new State(5)
    const cb1 = sinon.fake()
    const cb2 = sinon.fake()

    const sub1 = state.subscribe(cb1)
    const sub2 = state.subscribe(cb2)

    state.set(6)

    expect(cb1).to.be.calledOnce
    expect(cb2).to.be.calledOnce

    sub1()
    state.set(7)

    expect(cb1).to.be.calledOnce
    expect(cb2).to.be.calledTwice

    sub2()
    state.set(8)


    expect(cb1).to.be.calledOnce
    expect(cb2).to.be.calledTwice
  })
})
