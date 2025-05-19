import { HttpResult } from "services/https/dtos"
import { ResponseSignUpDto} from "./dtos"
import { http } from '../https'
import { RequestSignUp } from "services/RegisterService/dtos";

export const signUpService = (input: RequestSignUp):
  Promise<HttpResult<ResponseSignUpDto>> => http.post('register/signUp', input)


