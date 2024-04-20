import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/user.js';
import { doctorRoutes } from './routes/doctor.js';
import { reviewRoutes } from './routes/review.js';

dotenv.config();

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doctors',doctorRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/reviews',reviewRoutes);

app.get('/', (req, res) => {
  res.send('App is working');
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  )
  .catch((error) => console.log(error));
