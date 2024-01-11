import { describe, expect, it } from 'vitest'

import { BikePrice } from '@/components/bike'
import { CurrencyCode } from '@/core/config'
import { formatCurrency } from '@/core/helpers/currency'
import { mockedBike } from '@/mocks'
import { mount } from '@vue/test-utils'

describe('BikeImageSelector', () => {
  it('renders correctly', () => {
    const wrapper = mount(BikePrice, { props: { price: mockedBike.rate, currency: CurrencyCode.EUR } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('show different currency price', () => {
    const wrapper = mount(BikePrice, { props: { price: mockedBike.rate, currency: CurrencyCode.USD } })

    const compare = formatCurrency(mockedBike.rate, CurrencyCode.USD)

    expect(wrapper.text()).equal(compare)
  })

  it('show price rate', () => {
    const wrapper = mount(BikePrice, { props: { price: mockedBike.rate, currency: CurrencyCode.EUR, rate: 'daily' } })

    const compare = `${formatCurrency(mockedBike.rate, CurrencyCode.EUR)}/ Day`

    expect(wrapper.text()).equal(compare)
  })
})
