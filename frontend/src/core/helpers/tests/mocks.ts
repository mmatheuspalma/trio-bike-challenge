import { vi } from 'vitest'

const mockIntersectionObserver = vi.fn((callback: Function) => {
  return {
    disconnect: vi.fn(),
    observe(target: Element) {
      callback.call(null, [{ target, isIntersecting: true, intersectionRatio: 1 }])
    },
    takeRecords: vi.fn(),
    unobserve: vi.fn()
  }
})

export { mockIntersectionObserver }
