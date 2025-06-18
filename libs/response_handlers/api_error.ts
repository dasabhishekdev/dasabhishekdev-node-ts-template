import HttpStatus, {
  TGlobalStatus,
  THttpStatusCode,
} from '../constants/http_status';

export class ApiError extends Error {
  public status: THttpStatusCode;
  public error_type: TGlobalStatus;
  public title: string;

  constructor(
    public type: TGlobalStatus,
    public message: string,
    public details?: string | Error,
  ) {
    super(message);
    this.name = 'ApiError';
    this.error_type =
      HttpStatus.HTTP_STATUS_TYPE[type] ||
      HttpStatus.HTTP_STATUS_TYPE.INTERNAL_SERVER_ERROR;
    this.status =
      (HttpStatus.getHttpStatusCode(this.error_type) as THttpStatusCode) ||
      HttpStatus.getHttpStatusCode(
        HttpStatus.HTTP_STATUS_TYPE.INTERNAL_SERVER_ERROR,
      );

    this.title = this.error_type;

    if (details) {
      const detailMsg =
        details instanceof Error
          ? `${details.name}: ${details.message}\n${details.stack}`
          : details;
      // Log detailed error info, but do not throw
      console.error(
        `[ApiError][${this.status}] ${this.error_type}: ${detailMsg}`,
      );
    }
  }

  toJSON() {
    return {
      error: {
        type: this.error_type,
        status: this.status,
        title: this.title,
        message: this.message,
      },
    };
  }
}

export default ApiError;
