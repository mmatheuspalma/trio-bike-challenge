import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { BikeImageSelector } from '@/components/bike'
import { mockIntersectionObserver } from '@/core/helpers/tests'
import { mockedImageUrls } from '@/mocks'

describe('BikeImageSelector', () => {
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mount(BikeImageSelector, { props: { images: mockedImageUrls } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render empty component', () => {
    const wrapper = mount(BikeImageSelector, { props: { images: [] } })

    expect(wrapper.find('.bike-image-selector').exists()).toBe(false)
  })

  it('renders image list', () => {
    const wrapper = mount(BikeImageSelector, { props: { images: mockedImageUrls } })

    expect(wrapper.findAll('.bike-image-selector__image').length).equals(mockedImageUrls.length)
  })

  it('renders default selected image', async () => {
    vi.mock('lodash-es', () => ({
      debounce: vi.fn((fn) => fn)
    }))

    const wrapper = mount(BikeImageSelector, { props: { images: mockedImageUrls } })

    await flushPromises()

    expect(wrapper.find('.bike-image-selector__selected img').attributes('src')).equals(mockedImageUrls[0])
  })

  it('renders another selected image', async () => {
    const index = Math.max(0, mockedImageUrls.length - 1)

    vi.mock('lodash-es', () => ({
      debounce: vi.fn((fn) => fn)
    }))

    const wrapper = mount(BikeImageSelector, { props: { images: mockedImageUrls } })

    await flushPromises()
    wrapper.findAll('.bike-image-selector__image')[index].trigger('click')
    await flushPromises()

    expect(wrapper.findAll('.bike-image-selector__image')[index].classes()).contains(
      'bike-image-selector__image--active'
    )
    expect(wrapper.find('.bike-image-selector__selected img').attributes('src')).equals(mockedImageUrls[index])
  })
})
