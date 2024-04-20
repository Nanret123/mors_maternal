import Doctor from '../models/Doctor.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);
    const savedReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview },
    });
    res.status(200).json({
      message: 'Review submitted successfully',
      savedReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to submit review',
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      message: 'Successful',
      reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Not found',
    });
  }
};
