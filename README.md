# Node.js TypeScript REST API Boilerplate

A scalable, production-ready boilerplate for REST API development using Node.js, TypeScript, Express, MongoDB, Redis, RabbitMQ, Swagger, and Jest.  
Designed for high concurrency (10 lakh+ users), atomic operations, and best practices in code structure and encapsulation.

---

## Features

- **Atomic User Registration:**  
  Supports 5000+ concurrent user registrations using atomic `findOneAndUpdate` for serial generation.

- **Single Session Login per IP:**  
  Ensures only one user can log in from a single IP at a time.

- **Scalable:**  
  Built to handle 1 million+ users efficiently.

- **Modern Stack:**  
  TypeScript, Express, MongoDB, Redis, RabbitMQ, Swagger (OpenAPI), Jest.

- **Best Practices:**  
  Encapsulated methods, modular folder structure, centralized error and response handling, and environment-based configuration.

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/dasabhishekdev/ts-nodejs-service-best-practice.git
cd  ts-nodejs-service-best-practice
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Environment Setup**

Copy the example environment file and edit as needed:

```bash
cp config/environment/.env.dev.example config/environment/.env.dev
```

Edit `config/environment/.env.dev` with your MongoDB, Redis, RabbitMQ, and other credentials.

### 4. **Generate Swagger API Docs**

Before running the app, generate the Swagger documentation:

```bash
npm run swagger:generate
```

### 5. **Run the App in Development**

```bash
npm run dev
```

This uses `nodemon` and `ts-node` with `tsconfig-paths` for path alias support.

### 6. **Build for Production**

```bash
npm run build
```

### 7. **Start in Production**

```bash
npm start
```

---

## Folder Structure

```
src/
  app/
    controller/      # Route controllers (business logic)
    loaders/         # App/service initializers (Express, DB, etc.)
    middlewares/     # Express middlewares (auth, error, etc.)
    models/          # Mongoose models and schemas
    router/          # API route definitions (versioned)
    services/        # Business/domain services
    utils/           # Utility functions
    constants/       # App-wide constants and enums
    libs/
      response_handlers/ # Standardized API response and error handling
  config/           # Environment configs and settings
  tests/            # Jest test cases
```

- **Encapsulated Methods:**  
  Each module (controller, service, etc.) exposes only what is needed, promoting maintainability and testability.

- **API Versioning:**  
  All routes are versioned (e.g., `/api/v1/`), making it easy to support multiple API versions.

- **Best Practices:**
  - Centralized error and response handling (`libs/response_handlers`)
  - Environment-based configuration
  - Modular, testable code
  - Swagger/OpenAPI documentation

---

## API Documentation

- **Swagger UI:**  
  After running the app, visit:  
  `http://localhost:<PORT>/api-docs`

- **Swagger Reference:**  
  [Automating NodeJS Documentation with Swagger](https://dev.to/yugjadvani/automating-nodejs-documentation-with-swagger-3o0d)

---

## Scripts

| Command                    | Description                      |
| -------------------------- | -------------------------------- |
| `npm run dev`              | Start app in development mode    |
| `npm run build`            | Compile TypeScript to JavaScript |
| `npm start`                | Start compiled app in production |
| `npm run swagger:generate` | Generate Swagger API docs        |
| `npm test`                 | Run Jest test suite              |

---

## Requirements

- Node.js 18+
- MongoDB
- Redis
- RabbitMQ

---

## Notes

- **Path Aliases:**  
  Uses `tsconfig-paths` for cleaner imports.  
  Example:

  ```typescript
  import { ApiResponseHandler } from '@libs/response_handlers';
  ```

- **High Concurrency:**  
  Designed for thousands of concurrent registrations and millions of users.

- **Testing:**  
  Jest is used for unit and integration tests.

---

## Contributing

Feel free to fork and adapt this boilerplate for your own REST API projects!

---

## Author

**Abhishek Das**

- [GitHub](https://github.com/dasabhishekdev)
- [LinkedIn](https://www.linkedin.com/in/abhishek-das-75a3891b9/)
