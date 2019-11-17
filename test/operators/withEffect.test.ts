import { Property, withEffect } from '../../src'
import { expect } from 'chai'
import sinon from 'sinon'

describe('operators/withEffect', () => {
  it('get passes value through', () => {
    const prop = new class extends Property<number> {
      get () {
        return 5
      }

      subscribe (cb: () => void): () => void {
        return () => null
      }
    }

    const mapped = prop.pipe(withEffect(() => {
    }))

    expect(mapped.get()).to.eq(5)
  })

  it('on first subscription runs the effect', () => {
    const prop = new class extends Property<number> {
      subscribe = sinon.fake.returns(() => {
      })

      get () {
        return 5
      }
    }

    const effect = sinon.fake()
    const mapped = prop.pipe(withEffect(effect))

    expect(effect).not.to.be.called

    mapped.subscribe(() => {
    })

    expect(effect).to.be.calledOnce
  })

  it('does not run effect on subsequent subscriptions', () => {
    const prop = new class extends Property<number> {
      subscribe = sinon.fake.returns(() => {
      })

      get () {
        return 5
      }
    }

    const effect = sinon.fake()
    const mapped = prop.pipe(withEffect(effect))

    mapped.subscribe(() => {
    })

    expect(effect).to.be.calledOnce

    mapped.subscribe(() => {
    })

    expect(effect).to.be.calledOnce
  })

  it('clears the effect on last unsubscribe', () => {
    const prop = new class extends Property<number> {
      subscribe = sinon.fake.returns(() => {
      })

      get () {
        return 5
      }
    }

    const clear = sinon.fake()
    const effect = sinon.fake.returns(clear)
    const mapped = prop.pipe(withEffect(effect))

    const sub1 = mapped.subscribe(() => {
    })
    const sub2 = mapped.subscribe(() => {
    })

    expect(clear).not.to.be.called

    sub1()

    expect(clear).not.to.be.called

    sub2()

    expect(clear).to.be.called
  })
})
