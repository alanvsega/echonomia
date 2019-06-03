const router = require('express').Router();
const Answers = require('../schemas/answer');
const Users = require('../schemas/user');

router.get('/answers', async (req, res) => {
  try {
    const answers = await Answers.find({ userId: req.userId });
    res.json({ answers });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/answers', async (req, res) => {
  try {
    let answers = req.body;
    if (!Array.isArray(answers)) return res.status(400).send('Formato inválido.');

    const user = await Users.findById(req.userId);
    if (user.formAnswered) await Answers.remove({ userId: req.userId });

    answers = answers.map(answer => {
      return { ...answer, userId: req.userId };
    });
    answers = await Answers.create(answers);

    user.formAnswered = true;
    await user.save();

    res.json({ answers });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
