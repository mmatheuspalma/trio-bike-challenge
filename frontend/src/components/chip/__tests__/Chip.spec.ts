import { describe, expect, it } from 'vitest'

import { Chip } from '@/components/chip'
import { mount } from '@vue/test-utils'

describe('Chip', () => {
  it('renders correctly', () => {
    const wrapper = mount(Chip, { slots: { default: 'content' } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('prop size (default)', () => {
    const wrapper = mount(Chip, { slots: { default: 'content' } })

    expect(wrapper.classes()).contain('chip--sm')
  })

  it('prop color (default)', () => {
    const wrapper = mount(Chip, { slots: { default: 'content' } })

    expect(wrapper.classes()).contain('chip--gray')
  })

  it('prop size', () => {
    const wrapper = mount(Chip, { slots: { default: 'content' }, props: { size: 'lg' } })

    expect(wrapper.classes()).contain('chip--lg')
  })

  it('prop color', () => {
    const wrapper = mount(Chip, { slots: { default: 'content' }, props: { color: 'primary' } })

    expect(wrapper.classes()).contain('chip--primary')
  })
})
