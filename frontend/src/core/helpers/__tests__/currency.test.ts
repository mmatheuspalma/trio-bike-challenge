import { describe, expect, it } from 'vitest'

import { formatCurrency } from '../currency'

describe('currency.js', () => {
  describe('formatCurrency', () => {
    it('should throw error', () => {
      try {
        formatCurrency(0, '')
      } catch (err) {
        expect(err).instanceOf(RangeError)
      }
    })
    it('should display 1 USD', () => {
      expect(formatCurrency(1, 'USD')).equal('1 $')
    })
    it('should display 10 BRL', () => {
      expect(formatCurrency(10, 'BRL')).equal('10 R$')
    })
    it('should display 100 EUR', () => {
      expect(formatCurrency(100, 'EUR')).equal('100 €')
    })
    it('should display negative value', () => {
      expect(formatCurrency(-10, 'EUR')).equal('-10 €')
    })
    it('should display floating point correctly value', () => {
      expect(formatCurrency(0.1 + 0.2, 'EUR')).equal('0.30 €')
    })
    it('should display zero value', () => {
      expect(formatCurrency(0, 'EUR')).equal('0 €')
    })
  })
})
