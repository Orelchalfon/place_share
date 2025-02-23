const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const PORT = process.env.PORT || 8888;

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('src', 'uploads', 'images')));
app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next()
});


app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) =>
{
  const error = new Error('Could not find this route.', 404);
  throw error;
});


app.use((error, req, res, next) =>
{

  if (req.file) {
    fs.unlink(
      req.file.path,
      (err) =>
      {
        console.log(err);
      });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
  {
    app.listen(5000);
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .catch(err =>
  {
    console.log(err);
  });

