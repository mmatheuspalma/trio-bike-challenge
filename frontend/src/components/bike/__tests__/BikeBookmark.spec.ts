import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { BikeBookmark } from '@/components/bike'
import { Icon } from '@/components/icon'

describe('BikeBookmark', () => {
  it('renders correctly', () => {
    const wrapper = mount(BikeBookmark)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows active state', () => {
    const wrapper = mount(BikeBookmark, { props: { active: true } })

    expect(wrapper.classes()).contain('bike-bookmark--active')
  })

  it('show outlined state', async () => {
    const wrapper = mount(BikeBookmark, { props: { outlined: true } })

    expect(wrapper.classes()).contain('bike-bookmark--outlined')
  })

  it('shows different width', async () => {
    const wrapper = mount(BikeBookmark, { props: { width: 150 } })

    expect(wrapper.attributes('style')).contain('width: 150px')
  })

  it('shows different sizing', async () => {
    // TODO: fix vitest config to handle global typings
    // const wrapper = mount(BikeBookmark, { props: { size: UISizing.LG } })
    const wrapper = mount(BikeBookmark, { props: { size: 'lg' } })

    expect(wrapper.findComponent(Icon).classes()).contain('text-lg')
  })

  it('changes active state', async () => {
    const wrapper = mount(BikeBookmark, { props: { active: true } })

    expect(wrapper.classes()).contain('bike-bookmark--active')

    wrapper.setProps({ active: false })
    await flushPromises()

    expect(wrapper.classes()).not.contain('bike-bookmark--active')
  })
})
