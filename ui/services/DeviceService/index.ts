import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { DeviceDto, RequestSetupNotification, RequestTurnOnOffNotification } from "./dtos";

export const getAllDevices = ():
  Promise<HttpResult<DeviceDto[]>> => http.get('/Device')

export const setUpNofication = (model: RequestSetupNotification):
  Promise<HttpResult<DeviceDto>> => http.put('/Device/SetUpNofication', model)

export const turnOffNotification = (deviceId: number, model: RequestTurnOnOffNotification):
  Promise<HttpResult<DeviceDto>> => http.patch(`/Device/TurnOnOffNotification?deviceId=${deviceId}`, model)

export const terminateDevice = (deviceId: number):
  Promise<HttpResult<DeviceDto>> => http.delete(`/Device/TerminateDevice?deviceId=${deviceId}`)