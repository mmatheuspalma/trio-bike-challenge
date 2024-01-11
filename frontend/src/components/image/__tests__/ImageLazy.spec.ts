import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { ImageLazy } from '@/components/image'
import { mockIntersectionObserver } from '@/core/helpers/tests'
import { mockedImageUrls } from '@/mocks'

describe('ImageLazy', () => {
  const [image1, image2, image3] = mockedImageUrls

  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)
  vi.mock('lodash-es', () => ({
    debounce: vi.fn((fn) => fn)
  }))

  it('renders correctly', () => {
    const wrapper = mount(ImageLazy, { props: { src: image1 } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render image element', () => {
    const wrapper = mount(ImageLazy, { props: { src: image2 } })

    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('renders image src', async () => {
    const wrapper = mount(ImageLazy, { props: { src: image3 } })

    await flushPromises()

    expect(wrapper.find('img').attributes('src')).equals(image3)
  })

  it('renders empty image', async () => {
    const wrapper = mount(ImageLazy, { props: { src: '' } })

    await flushPromises()

    expect(wrapper.find('img').attributes('src')).toBe('')
  })

  it('renders different image', async () => {
    const wrapper = mount(ImageLazy, { props: { src: image3 } })

    await flushPromises()

    expect(wrapper.find('img').attributes('src')).equals(image3)

    wrapper.setProps({ src: image1 })
    await flushPromises()

    expect(image1, wrapper.find('img').attributes('src')).equals(image1)
  })
})
