import { State, callEffectForEach } from '../../src'
import sinon from 'sinon'
import { expect } from 'chai'

describe('operators/callEffectForEach', () => {
  it('triggers initially', () => {
    const prop = new State(5)
    const clear = sinon.fake()
    const cb = sinon.fake.returns(clear)

    prop.pipe(callEffectForEach(cb))

    expect(cb).to.be.calledWith(5)
    expect(clear).to.not.be.called
  })

  it('triggers on every update', () => {
    const prop = new State(5)
    const clear = sinon.fake()
    const cb = sinon.fake.returns(clear)

    prop.pipe(callEffectForEach(cb))

    clear.resetHistory()
    cb.resetHistory()

    prop.set(6)
    expect(cb).to.be.calledOnceWith(6)
    expect(clear).to.be.calledOnce

    clear.resetHistory()
    cb.resetHistory()

    prop.set(7)
    expect(cb).to.be.calledOnceWith(7)
    expect(clear).to.be.calledOnce
  })

  it('stops after unsubscribe', () => {
    const prop = new State(5)
    const clear = sinon.fake()
    const cb = sinon.fake.returns(clear)

    const unsub = prop.pipe(callEffectForEach(cb))

    clear.resetHistory()
    cb.resetHistory()

    unsub()

    expect(clear).to.be.calledOnce

    prop.set(7)
    expect(cb).to.not.be.calledWith(7)
  })
})
