import { HttpResult } from "services/https/dtos"
import { httpChat } from '../https'
import { RoomDto } from "./dtos"

export const getRoomById = (roomId?: string | null):
  Promise<HttpResult<RoomDto>> => httpChat.get('/chatRoom/' + roomId)

export const getChatRooms = ():
  Promise<HttpResult<RoomDto[]>> => httpChat.get('/chatRoom')

