const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const JWT_KEY = 'jansley@roboxilique';
const SALT_ROUNDS = 7;

const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  if ((req.originalUrl === '/user' && req.method === 'POST')
    || req.originalUrl === '/login') return next();

  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Não autorizado.');

  const [, token] = authorization.split(' ');

  try {
    const decoded = await verify(token, JWT_KEY);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send('Não autorizado');
  }
};

module.exports = {
  authenticate,
  bcrypt: {
    compare,
    hash,
    SALT_ROUNDS,
  },
  jwt: {
    JWT_KEY,
    sign
  }
};
