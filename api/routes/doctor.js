import express from 'express';
import {
  deleteDoctor,
  getAllDoctors,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
} from '../controllers/doctor.js';
import { authenticate, isAuthorized } from '../auth/verifyToken.js';
import { reviewRoutes } from './review.js';

export const doctorRoutes = express.Router();

doctorRoutes.use('/:doctorId/reviews', reviewRoutes);
doctorRoutes.get('/:id', getSingleDoctor);
doctorRoutes.get('/', getAllDoctors);
doctorRoutes.put('/:id', authenticate, isAuthorized(['doctor']), updateDoctor);
doctorRoutes.delete(
  '/:id',
  authenticate,
  isAuthorized(['doctor']),
  deleteDoctor
);
doctorRoutes.get(
  '/profile/me',
  authenticate,
  isAuthorized(['doctor']),
  getDoctorProfile
);
