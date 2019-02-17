import { addOne, stringToNum } from '../valueHelper'

describe('addOne()', () => {
  it('should add 1 to the value passed', () => {
    const res = addOne(2)
    expect(res).toEqual(3)
  })
})

describe('stringToNum()', () => {
  it('should convert a string to a number', () => {
    const res = stringToNum('1')
    expect(res).toEqual(1)
  })
})
