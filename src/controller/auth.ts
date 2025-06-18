import { ApiError, HttpStatus } from '@libs/response_handlers';
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { User } from '../models';

export class AuthController {
  // Encapsulate schema as a private static member
  private static readonly loginSchema: ZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Encapsulate validation logic
  private static validateLoginInput(data: unknown) {
    return this.loginSchema.safeParse(data);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const parseResult = this.validateLoginInput(req.body);

    if (!parseResult.success) {
      throw new ApiError(
        HttpStatus.VALIDATION_ERRORS.BAD_REQUEST,
        parseResult.error.errors.map((err) => err.message).join(', '),
      );
    }

    const { email, password } = parseResult.data;

    try {
      const user = await User.login(email, password);
      if (!user) {
        throw new ApiError(
          HttpStatus.AUTH_ERRORS.UNAUTHORIZED,
          'Invalid email or password',
        );
      }
      res.json(user);
    } catch (error) {
      next(
        error instanceof ApiError
          ? error
          : new ApiError(
              HttpStatus.SERVER_ERRORS.INTERNAL_SERVER_ERROR,
              'An unexpected error occurred',
            ),
      );
    }
  }
}

export default AuthController;
