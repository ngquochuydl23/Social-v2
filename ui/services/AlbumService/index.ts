import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { AlbumDto } from "./dtos"

export const getAllAlbums = (userName?: string | null):
  Promise<HttpResult<AlbumDto[]>> => http.get('/Album', { params: { userName: userName } })


export const getAlbumDetail = (albumId: number):
  Promise<HttpResult<AlbumDto>> => http.get('/Album/' + albumId)


