import { RequestSignUp } from "services/RegisterService/dtos";

export interface BaseSignUpFormProps {
  onNext: (data: any) => any;
  data: RequestSignUp;
}