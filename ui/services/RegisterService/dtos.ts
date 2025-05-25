export interface RequestSignUp {
  username: string,
  password: string,
  email?: string | null,
  phoneNumber?: string | null,
  lastName: string,
  firstName: string,
  birthday: string,
  gender: string
}

export interface ResponseSignUpDto {
  username: string,
  password: string,
  email?: string | null,
  phoneNumber?: string | null,
  lastName: string,
  firstName: string,
  birthday: string,
  gender: string
}