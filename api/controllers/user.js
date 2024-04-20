import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: 'User successfully updated',
      updateUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Failed to update user',
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: 'User successfully deleted',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Failed to delete user' });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'Failed to fetch user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: 'Users found',
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: 'Not found' });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: 'Retrieved successfully',
      data: { ...rest },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Not found' });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });

    const doctorIds = appointments.map((el) => el.doctor.id);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      '-password'
    );

    res.status(200).json({
      success: true,
      message: 'User appointments gotten successfully',
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Not found' });
  }
};

export const createAppointment = async (req, res) => {
  const { doctorId, ticketPrice, appointmentDateTime } = req.body;
  const { id } = req.user;
  try {
    const appointmentDate = new Date(appointmentDateTime);

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: appointmentDate,
      user: id,
    });

    if (existingAppointment) {
      return res
        .status(409)
        .json({
          message:
            'A booking already exists for this user with the selected doctor on this date.',
        });
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      user: id,
      appointmentDate: appointmentDate,
      status: 'pending',
      isPaid: false,
    });

    const savedAppointment = await newAppointment.save();
  
    const updatedUser =  await User.findByIdAndUpdate(id, { $push: { appointments: savedAppointment._id } }, { new: true });
    
    res.status(201).json({
      success: true,
      message: 'User appointment created',
      data: updatedUser._doc,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed To Create Appointment' });
  }
};
