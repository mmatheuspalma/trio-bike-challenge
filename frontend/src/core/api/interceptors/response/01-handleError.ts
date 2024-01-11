import type { AxiosError } from 'axios'

export default [
  undefined,
  (error: AxiosError) => {
    const { response, message } = error
    if (!response) {
      return Promise.reject(error)
    }

    const { status } = response

    switch (status) {
      // TODO: handle different status codes
      default:
        // eslint-disable-next-line no-console
        console.error('Error while requesting URL: ', message)
    }

    return Promise.reject(error)
  }
] as AxiosResponseInterceptor
