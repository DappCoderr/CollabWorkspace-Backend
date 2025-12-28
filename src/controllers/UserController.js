import { StatusCodes } from 'http-status-codes';
import {
  loginUserService,
  registerUserService,
  getCurrentUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  getAllUsersService,
} from '../services/UserService.js';

export const registerUserController = async (req, res) => {
  try {
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
    const response = await loginUserService(req.body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User successfully logged in',
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

export const getCurrentUserController = async (req, res) => {
  try {
    const user = await getCurrentUserService(req.userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully fetched Current User',
      data: user,
    });
  } catch (error) {
    console.error('Get Current User Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Successfully User by given Id',
      data: user,
    });
  } catch (error) {
    console.error('Get User By ID Controller Error: ', error);
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const updated = await updateUserService(req.params.id, req.body);
    return res.status(StatusCodes.OK).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update User Controller Error: ', error);
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const deleted = await deleteUserService(req.params.id);
    return res.status(StatusCodes.OK).json({ success: true, data: deleted });
  } catch (error) {
    console.error('Delete User Controller Error: ', error);
    const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    return res.status(StatusCodes.OK).json({ success: true, data: users });
  } catch (error) {
    console.error('Get All Users Controller Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  }
};
