// index.js

const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./app/routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/files', fileRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/fileupload', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.error('MongoDB connection error:', err));
