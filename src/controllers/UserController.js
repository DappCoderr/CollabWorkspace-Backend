import { StatusCodes } from 'http-status-codes';
import {
  loginUserService,
  registerUserService,
} from '../services/UserService.js';

export const registerUserController = async (req, res) => {
  try {
    console.log('User object in controller: ', req.body);
    const response = await registerUserService(req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User successfully registered',
      data: response,
    });
  } catch (error) {
    console.error('Register User Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const response = await loginUserService();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User successfully registered',
      data: response,
    });
  } catch (error) {
    console.error('Login User Controller Error: ', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
