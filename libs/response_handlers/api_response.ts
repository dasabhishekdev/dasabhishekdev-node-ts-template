import HttpStatus, {
  TGlobalStatus,
  THttpStatusCode,
} from '../constants/http_status';

export class ApiResponse<T = unknown> {
  public status: THttpStatusCode;
  public data: T;
  public message: string;
  public status_type: TGlobalStatus;

  constructor(type: TGlobalStatus, message: string = 'Success', data: T) {
    this.status_type = type;
    this.status =
      (HttpStatus.getHttpStatusCode(this.status_type) as THttpStatusCode) ||
      HttpStatus.getHttpStatusCode(HttpStatus.HTTP_STATUS_TYPE.OK);
    this.data = data;
    this.message = message;
  }

  toJSON() {
    return {
      success: {
        type: this.status_type,
        status: this.status,
        message: this.message,
        data: this.data,
      },
    };
  }

  // This makes it callable like a function
  send = (res: any) => {
    return res.status(this.status).json(this.toJSON());
  };
}

// Export a factory function that makes it usable like: ApiResponse(...)(res)
export function ApiResponseHandler<T = unknown>(
  type: TGlobalStatus,
  message: string = 'Success',
  data: T = {} as T,
) {
  const response = new ApiResponse(type, message, data);
  return (res: any) => response.send(res);
}

export default ApiResponseHandler;
