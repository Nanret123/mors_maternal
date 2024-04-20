import express from 'express';
import { authenticate, isAuthorized } from '../auth/verifyToken.js';
import { createReview, getAllReviews } from '../controllers/review.js';

export const reviewRoutes = express.Router({mergeParams: true});

reviewRoutes.get('/', getAllReviews);
reviewRoutes.post('/', authenticate, isAuthorized(['patient']),createReview);
