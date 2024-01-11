/// <reference types="vite/client" />

import type { BikeRent } from '@/core/api/modules/bike'

import type { AxiosError, AxiosInterceptorOptions, AxiosRequestConfig } from 'axios'
import type { PluginCreator } from 'postcss'
import { type CSSProperties } from 'vue'

declare module 'pinia' {
  export interface MapStoresCustomization {
    suffix: ''
  }
}

declare module 'postcss-extend-rule' {
  type RuleOptions = 'ove' | 'ignore' | 'warn' | 'throw'
  declare type pluginOptions = {
    name?: string
    onFunctionalSelector?: RuleOptions
    onRecursiveExtend?: RuleOptions
    onUnusedExtend?: RuleOptions
  }

  declare const creator: PluginCreator<pluginOptions>

  export default creator
}

declare global {
  interface Bike {
    id: number
    candidateId: number
    name: string
    type: string
    bodySize: number
    maxLoad: number
    rate: number
    description: string
    ratings: number
    imageUrls: string[]
    cardImage?: string
    city?: string
    baseRentAmount?: BikeRent
  }

  enum UISizing {
    XS = 'xs',
    SM = 'sm',
    BASE = 'base',
    LG = 'lg',
    XL = 'xl',
    '2XL' = '2xl',
    '3XL' = '3xl',
    '4XL' = '4xl',
    '5XL' = '5xl',
    '6XL' = '6xl',
    '7XL' = '7xl',
    '8XL' = '8xl',
    '9XL' = '9xl'
  }

  type Maybe<T> = T | null | undefined
  type AxiosRequestInterceptor = [
    ((value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>)?,
    ((error: ant) => any)?,
    AxiosInterceptorOptions?
  ]
  type AxiosResponseInterceptor = [
    ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)?,
    ((error: AxiosError) => Promise<never>)?,
    AxiosInterceptorOptions?
  ]

  type UICSSClass = (string | Record<string, boolean>)[]
  type UICSSProperties = CSSProperties

  type UISizingType = `${UISizing}`
}
