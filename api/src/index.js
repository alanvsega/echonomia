const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://echonomia:echonomia2019@ds145786.mlab.com:45786/echonomia', {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());

app.use(require('./routes/users'));

app.listen(3000, () => {
  console.log('Server is running...');
});
