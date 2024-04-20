import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const { name, password, role, email, photo, gender } = req.body;

    let user;

    if (role === 'patient') {
      user = await User.findOne({
        email,
      });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({
        email,
      });
    }
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === 'patient') {
      user = new User({
        name,
        email,
        hashedPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === 'doctor') {
      user = new Doctor({
        name,
        email,
        hashedPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }
    const token = generateToken(user);

    const { hashedPassword, appointments, ...rest } = user._doc;

    return res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: rest,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Bad request',
    });
  }
};
