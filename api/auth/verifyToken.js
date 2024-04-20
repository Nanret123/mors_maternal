import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

export const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization;


  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decoded;

      next();
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const isAuthorized = (roles) => async (req, res, next) => {
  try {
    let user;

    const patient = await User.findById(req.user.id);
    const doctor = await Doctor.findById(req.user.id);

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (!roles.includes(user.role)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
