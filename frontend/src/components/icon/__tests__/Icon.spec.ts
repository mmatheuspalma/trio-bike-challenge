import { Icon, IconType } from '@/components/icon'
import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

describe('BikeBookmark', () => {
  it('renders correctly', () => {
    const wrapper = mount(Icon, { slots: { default: 'star' } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows empty icon', () => {
    const wrapper = mount(Icon)

    expect(wrapper.find('em').classes().length).equal(1)
  })

  it('shows icon solid type', () => {
    const wrapper = mount(Icon, { props: { type: IconType.SOLID }, slots: { default: 'star' } })

    expect(wrapper.find('em').classes()).contain('fa-solid')
  })

  it('shows different size', () => {
    const wrapper = mount(Icon, { props: { size: 'lg' }, slots: { default: 'star' } })

    expect(wrapper.classes()).contain('text-lg')
  })

  it('changes size', async () => {
    const wrapper = mount(Icon, { slots: { default: 'star' } })

    expect(wrapper.classes()).contain('text-base')

    wrapper.setProps({ size: 'lg' })
    await flushPromises()

    expect(wrapper.classes()).contain('text-lg')
  })
})
