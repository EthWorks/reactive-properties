import { flat, State } from '../../src'
import { expect } from 'chai'
import sinon from 'sinon'

describe('operators/flat', () => {
  it('can get the current value', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)

    expect(flatProp.get()).to.eq(5)
  })

  it('can get the current value when inner prop changes', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)

    prop.set(new State(7))
    expect(flatProp.get()).to.eq(7)
  })

  it('subscribe notifies about changes in inner prop', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    flatProp.subscribe(cb)

    prop.get().set(7)
    expect(cb).to.be.calledOnce
  })

  it('subscribe notifies about changes in inner prop after it changes', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    flatProp.subscribe(cb)

    prop.set(new State(3))
    cb.resetHistory()
    prop.get().set(7)
    expect(cb).to.be.calledOnce
  })

  it('subscribe notifies about changes in outer prop', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    flatProp.subscribe(cb)

    prop.set(new State(7))
    expect(cb).to.be.calledOnce
  })

  it('unsubscribes from inner prop when it is no longer used', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    flatProp.subscribe(cb)

    const inner = prop.get()
    expect((inner as any).subscribers.size).to.eq(1)
    prop.set(new State(7))
    expect((inner as any).subscribers.size).to.eq(0)
  })

  it('unsubscribes from inner prop when the user unsubscribes', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    const unsub = flatProp.subscribe(cb)

    const inner = prop.get()
    expect((inner as any).subscribers.size).to.eq(1)
    unsub()
    expect((inner as any).subscribers.size).to.eq(0)
  })

  it('unsubscribes from outer prop when the user unsubscribes', () => {
    const prop = new State(new State(5))
    const flatProp = prop.pipe(flat)
    const cb = sinon.fake()
    const unsub = flatProp.subscribe(cb)

    expect((prop as any).subscribers.size).to.be.greaterThan(0)
    unsub()
    expect((prop as any).subscribers.size).to.eq(0)
  })
})
