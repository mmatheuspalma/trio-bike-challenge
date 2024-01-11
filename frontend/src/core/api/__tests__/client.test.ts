import { describe, expect, it } from 'vitest'

import { client } from '@/core/api'

describe('API client', () => {
  it('checks client instance', () => {
    expect(client).toBeInstanceOf(Function)
  })

  it('checks client has token header', () => {
    expect(client?.defaults?.headers).toHaveProperty('authorization')

    expect(client.defaults.headers.authorization).not.toBeFalsy()
  })

  it('check if can request a resource', () => {
    expect(client.get).toBeInstanceOf(Function)

    expect(client.get('bikes')).resolves.not.toThrowError()
  })
})
