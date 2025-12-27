import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/UserRepository.js';
import { createToken } from '../utils/jwt.js';

export const registerUserService = async (data) => {
  try {
    const newUser = await UserRepository.create(data);
    return newUser;
  } catch (error) {
    console.error('User Service Error: registerUserService', error);
    throw error;
  }
};

export const loginUserService = async (data) => {
  try {
    const user = await UserRepository.getByEmail(data.email);

    if (!user) {
      const err = new Error('Invalid email id, user not found');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordValid) {
      const err = new Error('Invalid password');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }

    const jwtToken = createToken({ id: user._id, email: user.email });

    return {
      username: user.name,
      email: user.email,
      token: jwtToken,
    };
  } catch (error) {
    console.error('User Service Error: loginUserService', error);
    throw error;
  }
};
