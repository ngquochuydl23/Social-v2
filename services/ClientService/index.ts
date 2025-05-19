import { HttpResult } from "services/https/dtos"
import { http } from '../https'
import { ClientDto } from "./dtos";

export const updateUiMode = (isDarkMode: boolean):
  Promise<HttpResult<boolean>> => http.patch('/Client/UpdateUiMode', { isDarkMode })


export const updateLanguage = (language: string):
  Promise<HttpResult<boolean>> => http.patch('/Client/UpdateLanguage', { language })



