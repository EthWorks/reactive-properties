import { expect } from 'chai'
import { Property, State } from '../src'

describe('Property', () => {
  describe('pipe', () => {
    const prop = new State(5)

    it('works with one argument', () => {
      const piped: number = prop.pipe(
        x => x.get(),
      )
      expect(piped).to.eq(5)
    })

    it('works with two arguments', () => {
      const piped: number = prop.pipe(
        x => x.get(),
        x => x * 2,
      )
      expect(piped).to.eq(10)
    })

    it('works with three arguments', () => {
      const piped: string = prop.pipe(
        x => x.get(),
        x => x * 2,
        x => x.toString(),
      )
      expect(piped).to.eq('10')
    })
  })
})
