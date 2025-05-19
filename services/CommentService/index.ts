import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { CommentDto, CommentTimelineDto, RequestCreateComment } from "./dtos";

export const createComment = (feedId: number, parentId?: number | null, body?: RequestCreateComment):
  Promise<HttpResult<CommentDto>> => http.post(`/Comment/${feedId}`, body, { params: { parentId } })

export const getComments = (feedId: number):
  Promise<HttpResult<CommentDto[]>> => http.get(`/Comment/${feedId}`)

export const deleteComment = (feedId: number): Promise<HttpResult<string>> => 
  http.delete("/Comment", { params: { feedId: feedId } })

export const getCommentsInteraction = ():
  Promise<HttpResult<CommentTimelineDto[]>> => http.get(`/Comment`)