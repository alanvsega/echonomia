const router = require('express').Router();
const Users = require('../schemas/user');
const { bcrypt, jwt } = require('../utils/auth');

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
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/users', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, bcrypt.SALT_ROUNDS);
    const user = await Users.create(req.body);
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await Users.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado.');
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

    const equals = await bcrypt.compare(password, user.password);
    if (!equals) return res.status(401).send('E-mail ou senha incorretos.');

    const token = await jwt.sign({ id: user._id }, jwt.JWT_KEY);
    res.json({ token, user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
