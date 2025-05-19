import axios, { AxiosHeaders } from "axios"
import setting from "../settings";
import { ErrorResult } from "./dtos";
import _, { head } from "lodash";


interface SsrCookieProps {
  req: any;
  res: any;
}

export const http = axios.create({
  baseURL: setting.apiBaseURL
})

export const httpChat = axios.create({
  baseURL: setting.chatBaseUrl
})

export const saveAccessToken = (accessToken: string) =>
  localStorage.setItem('social-v2.sessionToken', accessToken)

export const getAccessToken = () =>
  localStorage.getItem('social-v2.sessionToken')

export const clearAccessToken = () =>
  localStorage.removeItem('social-v2.sessionToken')

export const isLoged = ({ req, res }: SsrCookieProps) => {
  return localStorage.getItem('social-v2.sessionToken') !== null
}


async function onFulfilledReq(config: any) {
  const accessToken = getAccessToken();

  config.headers['Authorization'] = `Bearer ${accessToken}`
  config.headers['Content-Type'] = `application/json-patch+json`
  config.headers['accept'] = `*/*`

  return config;
}

async function onRejectedReq(error: any) {
  console.log(error)
  return Promise.reject(error);
}


async function onFulfilledRes(response: any) {
  return response.data;
}

async function onRejectedRes(error: any) {
  if (_.has(error, 'response.data.error')) {

    const resError = _.get(error, 'response.data.error') as ErrorResult
    console.log("http.interceptors.response", { resError })
    const dispatch = _.get(global, 'dispatch')
    //dispatch?.(globalErrorActions.pushResponseError(resError))
    return Promise.reject(resError)
  }
  return Promise.reject(error);
}


http.interceptors.request.use(onFulfilledReq, onRejectedReq);
http.interceptors.response.use(onFulfilledRes, onRejectedRes);

httpChat.interceptors.request.use(onFulfilledReq, onRejectedReq);
httpChat.interceptors.response.use(onFulfilledRes, onRejectedRes);


