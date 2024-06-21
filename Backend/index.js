const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/UserRoute.js');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
