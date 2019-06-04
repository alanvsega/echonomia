const router = require('express').Router();
const Tips = require('../schemas/tip');

router.get('/tips', async (req, res) => {
  try {
    const tips = await Tips.find();
    res.json({ tips });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.get('/tip', async (req, res) => {
  try {
    const [tip] = await Tips.aggregate([{ $sample: { size: 1 } }]);
    if (!tip) return res.status(404).send('Nenhuma dica encontrada.');
    res.json({ tip });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.post('/tip', async (req, res) => {
  try {
    const tip = await Tips.create(req.body);
    res.json({ tip });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

router.delete('/tip/:id', async (req, res) => {
  try {
    const tip = await Tips.findByIdAndRemove(req.params.id);
    if (!tip) return res.status(404).send('Dica não encontrada.');
    res.json({ tip });
  } catch (error) {
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
