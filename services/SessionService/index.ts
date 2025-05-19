import { HttpResult } from "services/https/dtos"
import { RequestLoginModel, ResponseLoginModel, CurrentSessionDto, RequestLoginViaGoogle } from "./dtos"
import { http } from '../https'
import { getDeviceName } from "utils/BrowserInfo"

export const loginService = (username: string, password: string):
  Promise<HttpResult<ResponseLoginModel>> => {
  const body: RequestLoginModel = {
    username,
    password,
    appName: process.env.NEXT_PUBLIC_APP_NAME!!,
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION!!,
    platform: process.env.NEXT_PUBLIC_APP_PLATFORM!!,
    deviceName: getDeviceName()!!
  }
  return http.post('/session/Login', body)
}

export const loginViaGoogle = (accessToken: string):
  Promise<HttpResult<ResponseLoginModel>> => {
  const body: RequestLoginViaGoogle = {
    accessToken,
    appName: process.env.NEXT_PUBLIC_APP_NAME!!,
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION!!,
    platform: process.env.NEXT_PUBLIC_APP_PLATFORM!!,
    deviceName: getDeviceName()!!
  }
  return http.post('/session/External/Google', body)
}

export const getCurrentSession = ():
  Promise<HttpResult<CurrentSessionDto>> => http.get('/session/getCurrentSession')

export const logOut = ():
  Promise<HttpResult<boolean>> => http.post('/session/LogOut')

