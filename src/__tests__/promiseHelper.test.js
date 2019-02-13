import { reflect, allSettled } from '../promiseHelper'

describe('apiHelper::', () => {
  describe('reflect()', () => {
    it('should resolve a promise that resolves in success', async () => {
      const promise = jest.fn().mockResolvedValue({ data: {} })
      const res = await reflect(promise())
      expect(res).toEqual({
        res: {
          data: {},
        },
        status:'resolved',
      })
    })

    it('should resolve a promise that rejects in failure', async () => {
      const promise = jest.fn().mockRejectedValue({ error: {} })
      const res = await reflect(promise())
      expect(res).toEqual({
        err: {
          error: {},
        },
        status:'rejected',
      })
    })
  })

  describe('allSettled()', () => {
    it('should return a resolve an array of promises with all resolved and rejected values, return is in order', async () => {
      const resolve = jest.fn().mockResolvedValue({ data: {} })
      const reject = jest.fn().mockRejectedValue({ error: {} })
      const res = await allSettled([resolve(), reject()])
      expect(res).toEqual([{
        res: {
          data: {},
        },
        status:'resolved',
      }, {
        err: {
          error: {},
        },
        status:'rejected',
      }])
    })

    it('should verify the all does not return out of order in promie all chain', async () => {
      const resolve = jest.fn().mockResolvedValue({ data: {} })
      const reject = jest.fn().mockRejectedValue({ error: {} })
      const res = await allSettled([resolve(), reject()])
      expect(res).not.toEqual([{
        err: {
          error: {},
        },
        status:'rejected',
      }, {
        res: {
          data: {},
        },
        status:'resolved',
      }])
    })
  })
})
