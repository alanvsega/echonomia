const router = require('express').Router();
const Users = require('../schemas/user');
const { compare, hash, SALT_ROUNDS } = require('../utils/auth');

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ users });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado.');
    user.password = undefined;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/users', async (req, res) => {
  try {
    req.body.password = await hash(req.body.password, SALT_ROUNDS);
    const user = await Users.create(req.body);
    user.password = undefined;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!user) return res.status(404).send('Usuário não encontrado.');
    user.password = undefined;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado.');
    user.password = undefined;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(401).send('E-mail ou senha incorretos.');

    const equals = await compare(password, user.password);
    if (!equals) return res.status(401).send('E-mail ou senha incorretos.');
    user.password = undefined;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
