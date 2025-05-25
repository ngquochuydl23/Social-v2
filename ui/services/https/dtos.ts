export interface HttpResult<T> {
  result?: T;
  error?: ErrorResult;
  statusCode?: string;
}

export interface ErrorResult {
  code?: Number
  message?: string
  details?: string
  //validationErrors?: ValidationError[]
}