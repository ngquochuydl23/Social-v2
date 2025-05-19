import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { FollowerDto, FollowingDto } from "./dtos"

export const createFollowing = (destUserId?: number):
  Promise<HttpResult<string>> => http.post('/Following/' + destUserId)

export const deleteFollowing = (destUserId?: number):
  Promise<HttpResult<string>> => http.delete('/Following/' + destUserId)

export const getFollowings = (destUsername: string | null | undefined):
  Promise<HttpResult<FollowingDto[]>> => http.get('/Following', { params: { username: destUsername } })

export const getFollowers = (creatorUsername: string | null | undefined):
  Promise<HttpResult<FollowerDto[]>> => http.get('/Follower', { params: { username: creatorUsername } })