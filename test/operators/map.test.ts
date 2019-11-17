import { Property, map } from '../../src'
import { expect } from 'chai'
import sinon from 'sinon'

describe('operators/map', () => {
  it('get returns mapped value', () => {
    const prop = new class extends Property<number> {
      get () {
        return 5
      }

      subscribe (cb: () => void): () => void {
        return () => null
      }
    }

    const mapped = prop.pipe(map((x) => x * 2))

    expect(mapped.get()).to.eq(10)
  })

  it('subscribe passes callback through', () => {
    const unsubscribe = sinon.fake()

    const prop = new class extends Property<number> {
      subscribe = sinon.fake.returns(unsubscribe)

      get () {
        return 5
      }
    }

    const mapped = prop.pipe(map((x) => x * 2))

    const cb = () => null
    const res = mapped.subscribe(cb)

    expect(prop.subscribe).to.be.calledWith(cb)
    expect(res).to.eq(unsubscribe)
  })
})
