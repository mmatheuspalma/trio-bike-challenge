import { describe, expect, it, vi } from 'vitest'
import { request, response } from '@/core/api/interceptors'

import { AxiosError } from 'axios'
import responseHandleError from '@/core/api/interceptors/response/01-handleError'

describe('API interceptors', () => {
  describe('request', () => {
    it('checks if is array of interceptors', () => {
      expect(request).toBeInstanceOf(Array)
    })
  })

  describe('response', () => {
    it('checks if is array of interceptors', () => {
      expect(response).toBeInstanceOf(Array)
    })

    it('01-handleError', () => {
      const spy = vi.spyOn(console, 'error')

      expect(responseHandleError).toBeInstanceOf(Array)

      const mockError1 = new AxiosError('mock error message', '400')
      const mockError2 = new AxiosError('Bad Request', '400', undefined, undefined, {
        status: 400,
        data: {},
        statusText: 'Bad Request',
        headers: {},
        config: {}
      })
      const [success, error] = responseHandleError

      expect(success).toBe(undefined)
      expect(error).toBeInstanceOf(Function)

      expect(error!(mockError1)).rejects.toBeInstanceOf(AxiosError)

      expect(error!(mockError2)).rejects.toBeInstanceOf(AxiosError)
      expect(spy).toHaveBeenCalledWith('Error while requesting URL: ', 'Bad Request')
    })
  })
})
