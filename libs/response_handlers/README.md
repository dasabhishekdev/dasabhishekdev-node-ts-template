# Response Handlers Package

The `response_handlers` package provides a standardized way to handle API responses and errors in your Node.js/Express applications. It includes utilities for consistent HTTP status codes, structured success/error responses, and easy integration with Express.

## Features

- **Consistent API Responses:**  
  Easily send structured success and error responses with standardized fields.

- **Centralized HTTP Status Management:**  
  Use a single source of truth for HTTP status codes and status types.

- **Custom Error Handling:**  
  Throw and catch API errors with detailed information and automatic logging.

- **TypeScript Support:**  
  All exports are fully typed for robust development.

---

## Modules

### 1. `http_status.ts`

- Provides the `HttpStatus` class with all standard HTTP status codes and categorized status types.
- Utility methods for retrieving status codes by name.
- Types: `THttpStatusCode`, `TGlobalStatus`, `TGlobalStatusValues`.

### 2. `api_response.ts`

- `ApiResponse<T>`: Class for building success responses.
- `ApiResponseHandler`: Factory function for sending responses directly in Express route handlers.
- Example output:
  ```json
  {
    "success": {
      "type": "OK",
      "status": 200,
      "message": "Success",
      "data": { ... }
    }
  }
  ```

### 3. `api_error.ts`

- `ApiError`: Custom error class for API errors.
- Automatically logs error details.
- Example output:
  ```json
  {
    "error": {
      "type": "NOT_FOUND",
      "status": 404,
      "title": "NOT_FOUND",
      "message": "Resource not found"
    }
  }
  ```

### 4. `index.ts`

- Single export point for all response handler utilities:
  ```typescript
  export { default as ApiError } from './api_error';
  export { default as ApiResponseHandler } from './api_response';
  export {
    default as HttpStatus,
    type THttpStatusCode,
    type TGlobalStatusValues,
    type TGlobalStatus,
  } from './http_status';
  ```

---

## Usage Example

```typescript
import express from 'express';
import {
  ApiResponseHandler,
  ApiError,
  HttpStatus,
} from '@libs/response_handlers';

const router = express.Router();

router.get('/success', (req, res) => {
  ApiResponseHandler(HttpStatus.HTTP_STATUS_TYPE.OK, 'Fetched successfully', {
    foo: 'bar',
  })(res);
});

router.get('/error', (req, res, next) => {
  next(
    new ApiError(HttpStatus.HTTP_STATUS_TYPE.NOT_FOUND, 'Resource not found'),
  );
});
```

---

## Use Cases

- **Standardizing API responses** across all endpoints.
- **Centralized error handling** for better maintainability and debugging.
- **Type-safe HTTP status and error management** in TypeScript projects.
- **Plug-and-play integration** with Express route handlers and middleware.

---

## Author

**Abhishek Das**

- [GitHub](https://github.com/dasabhishekdev)
- [LinkedIn](https://www.linkedin.com/in/abhishek-das-75a3891b9/)
