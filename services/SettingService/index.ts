import { http } from "services/https";
import { HttpResult } from "services/https/dtos";
import { RequestChangeAvatar, RequestChangeCover, ResponseChangeAvatar, ResponseChangeCover, SecurityAndPrivacyDto } from "./dtos";

export const getSecurityAndPrivacy = ():
  Promise<HttpResult<SecurityAndPrivacyDto>> => http.get('/Setting/SecurityAndPrivacy')

export const changeAvatar = (model: RequestChangeAvatar):
  Promise<HttpResult<ResponseChangeAvatar>> => http.patch('/Setting/ManageAccount/ChangeAvatar', model)

export const changeCover = (model: RequestChangeCover):
  Promise<HttpResult<ResponseChangeCover>> => http.patch('/Setting/ManageAccount/ChangeCover', model)