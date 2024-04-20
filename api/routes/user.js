import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getUserProfile,
  getMyAppointments,
  createAppointment
} from '../controllers/user.js';
import { authenticate, isAuthorized } from '../auth/verifyToken.js';

export const userRoutes = express.Router();

userRoutes.get('/:id', authenticate, isAuthorized(['patient']), getSingleUser);
userRoutes.get('/', authenticate, isAuthorized(['admin']), getAllUsers);
userRoutes.put('/:id', authenticate, isAuthorized(['patient']), updateUser);
userRoutes.delete('/:id', authenticate, isAuthorized(['patient']), deleteUser);
userRoutes.get(
  '/profile/me',
  authenticate,
  isAuthorized(['patient']),
  getUserProfile
);
userRoutes.get(
  '/appointments/my-appointments',
  authenticate,
  isAuthorized(['patient']),
  getMyAppointments
);

userRoutes.post(
  '/booking',
  authenticate,
  isAuthorized(['patient']),
  createAppointment
);
