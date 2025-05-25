import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { FeedDto, RequestCreateFeed } from "./dtos";

export const getAllFeed = (userName?: string | null):
  Promise<HttpResult<FeedDto[]>> => http.get('/Feed', { params: { userName: userName } })

export const deleteFeed = (feedId?: number | null):
  Promise<HttpResult<string>> => http.delete('/Feed/' + feedId)

export const createFeed = (model: RequestCreateFeed):
  Promise<HttpResult<FeedDto>> => http.post('/Feed/Create', model)

export const updateFeed = (feedId: number, model: RequestCreateFeed):
  Promise<HttpResult<FeedDto>> => http.put('/Feed/' + feedId, model)
