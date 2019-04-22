const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://echonomia:echonomia2019@ds145786.mlab.com:45786/echonomia', {
  useNewUrlParser: true
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
