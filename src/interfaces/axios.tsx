import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosErrorInterface<T = any> extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response: {
    data: {
      statuscode: number
      errorText: string
    }
  }
  isAxiosError: boolean
}
