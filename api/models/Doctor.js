import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
  },
  ticketPrice: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  specialization: {
    type: String,
  },
  qualifications: {
    type: Array,
  },
  experiences: {
    type: Array,
  },
  bio: {
    type: String,
    maxLength: 50,
  },
  timeSlots: {
    type: Array,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Review',
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending',
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

export default mongoose.model('Doctor', doctorSchema);
