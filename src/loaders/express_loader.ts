import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import api_router from '../router';
import {
  ApiError,
  ApiResponseHandler,
  HttpStatus,
} from '@libs/response_handlers';

export default async ({ app }: { app: express.Application }) => {
  // Enable CORS for all routes
  app.use(express.json());
  app.use(cors());

  // Use Helmet to secure Express apps by setting various HTTP headers
  app.use(helmet());

  // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set up rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

  app.use(limiter);
  // Use morgan for logging HTTP requests
  app.use(morgan('combined'));

  // Error handling middleware
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      // Pass the error to the next error handler if needed
      next(err);
    },
  );

  app.route('/').get((req, res, next) => {
    return ApiResponseHandler(
      HttpStatus.SUCCESS_STATUS.OK,
      'Server is working',
      {},
    )(res);
  });

  app.route('/error').get((req, res, next) => {
    throw new ApiError(
      HttpStatus.RATE_LIMIT_ERRORS.RATE_LIMIT_EXCEEDED,
      'Too many requests',
    );
  });

  app.use('/api', api_router);

  return app;
};
