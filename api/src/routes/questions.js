const router = require('express').Router();
const Questions = require('../schemas/question');

router.get('/questions', async (req, res) => {
  try {
    const questions = await Questions.find();
    res.json({ questions });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/question', async (req, res) => {
  try {
    const question = await Questions.create(req.body);
    res.json({ question });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.delete('/question/:id', async (req, res) => {
  try {
    const question = await Questions.findByIdAndRemove(req.params.id);
    if (!question) return res.status(404).send('Questão não encontrada.');
    res.json({ question });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
