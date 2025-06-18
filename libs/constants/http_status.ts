export class HttpStatus {
  // 1xx: Informational
  private static readonly codes = Object.freeze({
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,

    // 2xx: Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,

    // 3xx: Redirection
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,

    // 4xx: Client Error
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    RATE_LIMIT_EXCEEDED: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,

    // 5xx: Server Error
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  });

  // API Error Categories
  static readonly SUCCESS_STATUS = Object.freeze({
    OK: 'OK',
    CREATED: 'CREATED',
    ACCEPTED: 'ACCEPTED',
    NO_CONTENT: 'NO_CONTENT',
    PARTIAL_CONTENT: 'PARTIAL_CONTENT',
    MULTI_STATUS: 'MULTI_STATUS',
    ALREADY_REPORTED: 'ALREADY_REPORTED',
    IM_USED: 'IM_USED',
  });

  // Validation & Request Errors
  static readonly VALIDATION_ERRORS = Object.freeze({
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
    PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
    UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',
    UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
    PRECONDITION_FAILED: 'PRECONDITION_FAILED',
    TOO_EARLY: 'TOO_EARLY',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    LENGTH_REQUIRED: 'LENGTH_REQUIRED',
  });

  // Authentication & Authorization Errors
  static readonly AUTH_ERRORS = Object.freeze({
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
    LOCKED: 'LOCKED',
  });

  // Resource Errors
  static readonly RESOURCE_ERRORS = Object.freeze({
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    NOT_FOUND: 'NOT_FOUND',
    GONE: 'GONE',
    NOT_MODIFIED: 'NOT_MODIFIED',
    CONFLICT: 'CONFLICT',
    DEPENDENCY_ERROR: 'DEPENDENCY_ERROR',
  });

  // Rate Limiting & Throttling
  static readonly RATE_LIMIT_ERRORS = Object.freeze({
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  });

  // Server Errors
  static readonly SERVER_ERRORS = Object.freeze({
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    BAD_GATEWAY: 'BAD_GATEWAY',
    GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',
    NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
    IM_A_TEAPOT: 'IM_A_TEAPOT',
  });

  // For backward compatibility: all API errors in one object
  static readonly HTTP_STATUS_TYPE = Object.freeze({
    ...HttpStatus.VALIDATION_ERRORS,
    ...HttpStatus.AUTH_ERRORS,
    ...HttpStatus.RESOURCE_ERRORS,
    ...HttpStatus.RATE_LIMIT_ERRORS,
    ...HttpStatus.SERVER_ERRORS,
    ...HttpStatus.SUCCESS_STATUS,
  });

  static all() {
    return this.codes;
  }
  static getHttpStatusCode(name: string) {
    return this.codes[name] || 500; // Default to 500 if not found
  }
}

export type THttpStatusCode = (typeof HttpStatus)['all'] extends () => infer R
  ? R extends Record<string, infer V>
    ? V
    : never
  : never;

export type TGlobalStatusValues =
  (typeof HttpStatus)['HTTP_STATUS_TYPE'] extends Record<string, infer V>
    ? V
    : never;

export type TGlobalStatus = keyof typeof HttpStatus.HTTP_STATUS_TYPE;

export default HttpStatus;
