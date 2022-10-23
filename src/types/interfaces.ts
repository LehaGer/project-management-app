export interface responseError {
  data: {
    statusCode: number;
    message: string;
  };
  status: number;
}

export interface IErrorMessages {
  [key: string]: string;
}
