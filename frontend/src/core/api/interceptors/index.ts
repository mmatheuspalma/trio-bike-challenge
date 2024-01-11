const requestModules = import.meta.glob('./**/*.ts', { eager: true })
const responseModules = import.meta.glob('./**/*.ts', { eager: true })

const request: AxiosRequestInterceptor[] = Object.values(requestModules)
  .map((module: any) => module?.default)
  .filter((interceptor) => !!interceptor.length)
const response: AxiosResponseInterceptor[] = Object.values(responseModules)
  .map((module: any) => module?.default)
  .filter((interceptor) => !!interceptor.length)

export { request, response }
