import { Request, Response } from 'express';
import { AuthController } from '../src/app/controller';

describe('Login', () => {
  it('should return 200 for valid credentials', async () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    req.body = {
      email: 'test@gmail.com',
      password: 'password123',
    };
    await AuthController.login(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@gmail.com',
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });
  it('should return 400 for invalid email', async () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();
    req.body = {
      email: 'invalid-email',
      password: 'password123',
    };
    await AuthController.login(req, res, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.stringContaining('Invalid input'),
      }),
    );
  });
  it('should return 400 for missing password', async () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();
    req.body = {
      email: 'abhishek@gmail.com',
      // password is missing
    };
    await AuthController.login(req, res, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.stringContaining('Invalid input'),
      }),
    );
  });
});
