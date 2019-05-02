const bcrypt = require('bcrypt');
const { promisify } = require('util');
const SALT_ROUNDS = 7;

const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);

module.exports = { compare, hash, SALT_ROUNDS };
