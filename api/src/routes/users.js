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

router.get('/user', async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/user', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(409).send('E-mail já cadastrado.');

    req.body.password = await bcrypt.hash(req.body.password, bcrypt.SALT_ROUNDS);
    user = await Users.create(req.body);
    const token = await jwt.sign({ id: user._id }, jwt.JWT_KEY);
    res.json({ token, user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.patch('/user', async (req, res) => {
  try {
    // Valida atualização de e-mail
    let user = await Users.findOne({ email: req.body.email, _id: { $ne: req.userId }});
    if (user) return res.status(409).send('E-mail já cadastrado.');

    // Encrypta a senha caso seja enviada
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, bcrypt.SALT_ROUNDS);
    }

    user = await Users.findByIdAndUpdate(req.userId, { $set: req.body }, { new: true });
    if (!user) return res.status(404).send('Usuário não encontrado.');
    res.json({ user });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.delete('/user', async (req, res) => {
  try {
    const user = await Users.findByIdAndRemove(req.userId);
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
