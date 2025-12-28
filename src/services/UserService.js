import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/UserRepository.js';
import { createToken } from '../utils/jwt.js';
import User from '../schema/UserSchema.js';

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

export const getCurrentUserService = async (userId) => {
  try {
    const user = await UserRepository.getById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }
    return user;
  } catch (error) {
    console.error('User Service Error: getCurrentUserService', error);
    throw error;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const user = await UserRepository.getById(id);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }
    return user;
  } catch (error) {
    console.error('User Service Error: getUserByIdService', error);
    throw error;
  }
};

export const updateUserService = async (id, newData) => {
  try {
    const updated = await UserRepository.update(id, newData);
    if (!updated) {
      const err = new Error('User not found');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }
    return updated;
  } catch (error) {
    console.error('User Service Error: updateUserService', error);
    throw error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const deleted = await UserRepository.delete(id);
    if (!deleted) {
      const err = new Error('User not found');
      err.statusCode = StatusCodes.NOT_FOUND;
      throw err;
    }
    return deleted;
  } catch (error) {
    console.error('User Service Error: deleteUserService', error);
    throw error;
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await UserRepository.getAll();
    return users;
  } catch (error) {
    console.error('User Service Error: getAllUsersService', error);
    throw error;
  }
};
