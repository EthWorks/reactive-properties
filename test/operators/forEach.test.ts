import { State } from '../../src'
import sinon from 'sinon'
import { forEach } from '../../src/operators/forEach'
import { expect } from 'chai'

describe('Property/forEach', () => {
  it('triggers initially', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    prop.pipe(forEach(cb))

    expect(cb).to.be.calledWith(5)
  })

  it('triggers on every update', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    prop.pipe(forEach(cb))

    prop.set(6)
    expect(cb).to.be.calledWith(6)

    prop.set(7)
    expect(cb).to.be.calledWith(7)
  })

  it('stops after unsubscribe', () => {
    const prop = new State(5)
    const cb = sinon.fake()

    const unsub = prop.pipe(forEach(cb))
    prop.set(6)
    unsub()
    prop.set(7)
    expect(cb).to.not.be.calledWith(7)
  })
})
