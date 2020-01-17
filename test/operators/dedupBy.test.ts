import { State, dedupBy } from '../../src'
import sinon from 'sinon'
import { forEach } from '../../src/operators/forEach'
import { expect } from 'chai'

describe('operators/dedupBy', () => {
  const eq = (a: number, b: number) => a === b

  it('triggers initially', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const deduped = prop.pipe(dedupBy(eq))
    deduped.pipe(forEach(cb))

    expect(cb).to.be.calledWith(5)
    expect(cb).to.be.calledOnce
  })

  it('triggers on every update', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const deduped = prop.pipe(dedupBy(eq))
    deduped.pipe(forEach(cb))

    prop.set(6)
    expect(cb).to.be.calledWith(6)
    expect(cb).to.be.calledTwice

    prop.set(7)
    expect(cb).to.be.calledWith(7)
    expect(cb).to.be.calledThrice
  })

  it('does not update when value is the same', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const deduped = prop.pipe(dedupBy(eq))
    deduped.pipe(forEach(cb))

    prop.set(5)
    expect(cb).to.be.calledOnce
  })

  it('triggers when the state changed before subscription and the value is different', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const deduped = prop.pipe(dedupBy(eq))
    
    prop.set(6)
    expect(cb).to.not.be.called
    
    deduped.pipe(forEach(cb))
    expect(cb).to.be.calledOnce
    expect(cb).to.be.calledWith(6)

    prop.set(7)
    expect(cb).to.be.calledWith(7)
    expect(cb).to.be.calledTwice
  })

  it('does not trigger when the state changed before subscription and the value is the same', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const deduped = prop.pipe(dedupBy(eq))
    
    prop.set(6)
    expect(cb).to.not.be.called
    
    deduped.pipe(forEach(cb))
    expect(cb).to.be.calledOnce
    expect(cb).to.be.calledWith(6)

    prop.set(6)
    expect(cb).to.be.calledOnce
  })

  it('works with 2 subscribers', () => {
    const prop = new State(5)
    const cb1 = sinon.fake()
    const cb2 = sinon.fake()
    const deduped = prop.pipe(dedupBy(eq))
    
    prop.set(6)

    deduped.pipe(forEach(cb1))
    expect(cb1).to.be.calledOnce
    expect(cb1).to.be.calledWith(6)

    prop.set(6)
    expect(cb1).to.be.calledOnce

    deduped.pipe(forEach(cb2))
    expect(cb2).to.be.calledOnce
    expect(cb2).to.be.calledWith(6)


    prop.set(6)
    expect(cb2).to.be.calledOnce

    prop.set(7)
    expect(cb1).to.be.calledTwice
    expect(cb1).to.be.calledWith(6)
    expect(cb2).to.be.calledTwice
    expect(cb2).to.be.calledWith(6)
  })
})
