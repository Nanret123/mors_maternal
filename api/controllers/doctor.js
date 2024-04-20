import Booking from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: 'Doctor successfully updated',
      updateDoctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update Doctor',
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Doctor account successfully deleted',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to delete Doctor',
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id)
      .populate('reviews')
      .select('-password');

    res.status(200).json({
      message: 'Doctor found',
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to fetch Doctor',
    });
  }
};

export const getAllDoctors = async (req, res) => {
  const { query } = req.query;
  try {
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: 'approved',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { specialization: { $regex: query, $options: 'i' } },
        ],
      }).select('-password');
    } else {
      doctors = await Doctor.find({ isApproved: 'approved' }).select(
        '-password'
      );
    }

    res.status(200).json({
      message: 'Doctors found',
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Not found',
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: id });
    res.status(200).json({
      success: true,
      message: 'Retrieved successfully',
      data: { ...rest, appointments },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Not found' });
  }
};
