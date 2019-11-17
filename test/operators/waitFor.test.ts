import { State } from '../../src'
import sinon from 'sinon'
import { expect } from 'chai'
import { waitFor } from '../../src/operators/waitFor'

describe('operators/waitFor', () => {
  it('resolves if condition is already true', async () => {
    const prop = new State(5)
    const cb = sinon.fake()

    prop.pipe(waitFor(x => x === 5)).then(cb)

    await sleep(1)
    expect(cb).to.be.called
  })

  it('does not resolve if condition is false', async () => {
    const prop = new State(6)
    const cb = sinon.fake()

    prop.pipe(waitFor(x => x === 5)).then(cb)

    await sleep(1)
    expect(cb).not.to.be.called
  })

  it('resolves when condition becomes true', async () => {
    const prop = new State(6)
    const cb = sinon.fake()

    prop.pipe(waitFor(x => x === 5)).then(cb)

    await sleep(1)
    expect(cb).not.to.be.called

    prop.set(5)
    await sleep(1)
    expect(cb).to.be.called
  })

  it('returns the first accepted value', async () => {
    const prop = new State(6)
    const cb = sinon.fake()

    prop.pipe(waitFor(x => x === 5)).then(cb)

    prop.set(5)
    await sleep(1)
    expect(cb).to.be.calledWith(5)
  })
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
