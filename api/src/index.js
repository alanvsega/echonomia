const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const express = require('express');
const yaml = require('yamljs');
const cors = require('cors');
const {
  authenticate
} = require('./utils/auth');

const swaggerDocument = yaml.load('src/swagger.yaml');

const app = express();
mongoose.connect('mongodb://echonomia:echonomia2019@ds145786.mlab.com:45786/echonomia', {
  useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

app.use(authenticate);

app.use(require('./routes/users'));
app.use(require('./routes/bills'));
app.use(require('./routes/questions'));
app.use(require('./routes/answers'));
app.use(require('./routes/tips'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});