import mongoose, { Schema, Document, Model } from 'mongoose';
import {
  UserRole,
  ShardRegion,
  TShardRegion,
  TUserRole,
} from '@libs/constants';
import Counter from './counter';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { ApiError, HttpStatus } from '@libs/response_handlers';

export interface IUser {
  serial_number: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: TUserRole;
  region: TShardRegion;
  ip: string;
  // Method to compare password
}

export interface IUserDocument extends IUser, Document {
  compare_password(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  getId(): string; // Method to generate a new unique ID
  isUsernameExists(username: string): Promise<boolean>; // Method to check if a username exists
  isEmailExists(email: string): Promise<boolean>; // Method to check if an email exists
  createUser(userData: IUser): Promise<IUserDocument | null>; // Method to create a new user
  getUserById(userId: string): Promise<IUserDocument | null>; // Method to get a user by ID
  getUserByUsername(username: string): Promise<IUserDocument | null>; // Method to get a user by username
  getAllUsers(
    filter?: Partial<IUser>,
    options?: { page?: number; limit?: number },
  ): Promise<{
    users: IUserDocument[];
    total: number;
    page: number;
    limit: number;
  }>; // Method to get all users with optional pagination and filter
  login(email: string, password: string): Promise<IUserDocument | null>; // Method to login a user
}

const user_schema = new Schema<IUserDocument>({
  id: {
    type: String,
    required: function () {
      return this.isNew;
    },
    unique: true,
  },
  serial_number: {
    type: Number,
    required: function () {
      return this.isNew;
    },
    unique: true,
  },
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: function () {
      return this.isNew;
    },
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole.all()),
    default: UserRole.all().GUEST,
  },
  region: {
    type: String,
    required: false,
    enum: Object.values(ShardRegion.all()),
    default: ShardRegion.all().GLOBAL,
  },
  ip: {
    type: String,
    required: false,
    default: '<user_ip>',
  },
});

// Method to hash the password before saving
const hashPassword = async function (password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Compares the provided password with the user's hashed password.
 * @param password - The password to compare.
 * @returns {Promise<boolean>} - Returns true if the passwords match, false otherwise.
 */
user_schema.methods.compare_password = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

/**
 * Pre-save hook to update the serial number and hash the password
 * @param next - The next middleware function
 */
user_schema.pre('save', async function (next) {
  // update the serial number before saving the user
  const user = this;

  if (user.isNew || !user.serial_number) {
    const counter = await Counter.getNextSequence(user.id);
    user.serial_number = counter;
  }

  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

/**
 * Override toObject to remove sensitive fields
 */
user_schema.methods.toObject = function (options?: any) {
  const obj = mongoose.Document.prototype.toObject.call(this, options);
  delete obj.password;
  delete obj.__v;
  delete obj._id;
  return obj;
};

/*******static functions*********/
/**
 * Static method to generate a new unique ID
 * @returns {string} - Returns a new unique ID
 */
user_schema.statics.getId = function (): string {
  return uuidv4();
};

/**
 * Check if a username already exists
 * @param username
 * @returns  {Promise<boolean>} - Returns true if the username exists, false otherwise
 */

user_schema.statics.isUsernameExists = async function (
  username: string,
): Promise<boolean> {
  return !!(await this.findOne({ username }).lean());
};

/**
 * Check if an email already exists
 * @param email
 * @returns  {Promise<boolean>} - Returns true if the email exists, false otherwise
 */

user_schema.statics.isEmailExists = async function (
  email: string,
): Promise<boolean> {
  return !!(await this.findOne({ email }).lean());
};

/**
 *  Static method to create new user
 * @param userData - The user data to create a new user
 * @return {Promise<IUserDocument>} - Returns the created user document
 */

user_schema.statics.createUser = async function (
  userData: IUser,
): Promise<IUserDocument | null> {
  try {
    const usernameExists = await User.isUsernameExists(userData.username);
    const emailExists = await User.isEmailExists(userData.email);

    if (usernameExists || emailExists) {
      throw new ApiError(
        HttpStatus.RESOURCE_ERRORS.CONFLICT,
        `Username or email already exists`,
      );
    }
    const user = new this(userData);
    await user.save();
    return user.toObject();
  } catch (error) {
    throw new ApiError(
      HttpStatus.SERVER_ERRORS.INTERNAL_SERVER_ERROR,
      `Failed to create user: ${error.message}`,
    );
  }
};

/**
 *
 */

user_schema.statics.getUserById = async function (
  userId: string,
): Promise<IUserDocument | null> {
  const user = await this.findOne({ id: userId }).lean();
  if (!user) {
    throw new ApiError(
      HttpStatus.RESOURCE_ERRORS.NOT_FOUND,
      `User with ID ${userId} not found`,
    );
  }
  return user;
};

user_schema.statics.getUserByUsername = async function (
  username: string,
): Promise<IUserDocument | null> {
  const user = await this.findOne({ username }).lean();
  if (!user) {
    throw new ApiError(
      HttpStatus.RESOURCE_ERRORS.NOT_FOUND,
      `User withusername ${username} not found`,
    );
  }
  return user;
};

/**
 * Static method to get all users
 * @returns {Promise<IUserDocument[]>} - Returns an array of user documents
 */
/**
 * Static method to get all users with optional pagination and filter
 * @param filter - Optional filter object
 * @param options - Optional pagination options: { page, limit }
 * @returns {Promise<{ users: IUserDocument[], total: number, page: number, limit: number }>}
 */
user_schema.statics.getAllUsers = async function (
  filter: Partial<IUser> = {},
  options: { page?: number; limit?: number } = {},
): Promise<{
  users: IUserDocument[];
  total: number;
  page: number;
  limit: number;
}> {
  const page = options.page && options.page > 0 ? options.page : 1;
  const limit = options.limit && options.limit > 0 ? options.limit : 10;
  const skip = (page - 1) * limit;

  const query = this.find(filter).lean();
  const total = await this.countDocuments(filter);
  const users = await query.skip(skip).limit(limit);

  return { users, total, page, limit };
};

/**
 *  Static method to login a user
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns {Promise<IUserDocument | null>} - Returns the user document if login is successful, null otherwise
 */

user_schema.statics.login = async function (
  email: string,
  password: string,
): Promise<IUserDocument | null> {
  const user = await this.findOne({ email }).lean();
  if (!user) {
    throw new ApiError(
      HttpStatus.RESOURCE_ERRORS.NOT_FOUND,
      `User with email ${email} not found`,
    );
  }
  const isPasswordValid = await user.compare_password(password);
  if (!isPasswordValid) {
    throw new ApiError(
      HttpStatus.AUTH_ERRORS.UNAUTHORIZED,
      'Invalid email or password',
    );
  }
  return user;
};

// Indexes for the user schema
user_schema.index({ id: 1, serial_number: 1 }, { unique: true });
user_schema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUserDocument, IUserModel>('User', user_schema);

export default User;
