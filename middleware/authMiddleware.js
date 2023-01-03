import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      res.json({ status: 'error', message: 'Not authorized, token failed' });
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    res.json({ status: 'error', message: 'Not authorized, no token' });
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    res.json({ status: 'error', message: 'Not authorized as an admin' });
    throw new Error('Not authorized as an admin');
  }
};

const consultant = (req, res, next) => {
  if (req.user && req.user.isConsultant) {
    next();
  } else {
    res.status(401);
    res.json({
      status: 'error',
      message: 'Not authorized as a feasibility account'
    });
    throw new Error('Not authorized as a feasibility account');
  }
};

export { protect, admin };
