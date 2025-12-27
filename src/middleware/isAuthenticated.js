import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt.js';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

export { isAuthenticated };
