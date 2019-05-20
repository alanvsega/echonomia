const router = require('express').Router();
const Bills = require('../schemas/bill');
const {
    bcrypt,
    jwt
} = require('../utils/auth');

router.get('/bills', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 12;
        const skip = req.query.skip ? parseInt(req.query.skip) : 0;

        const bills = await Bills.find({
            userId: req.userId
        }).limit(limit).skip(skip);

        res.status(200).json({
            bills
        });

    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

router.get('/bill/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const bill = await Bills.findById(id);
        if (!bill) return res.status(404).send('Conta não encontrado.');

        res.status(200).json({
            bill
        });
    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

router.post('/bill', async (req, res) => {
    try {
        const bill = await Bills.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            bill
        });
    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

router.patch('/bill/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bill = await Bills.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });

        res.status(200).json({
            bill
        })
    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

router.delete('/bill/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bill = await Bills.findByIdAndRemove(id);

        if (!bill) return res.status(404).send('Conta não encontrada.');

        res.status(200).json({
            bill
        });
    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

module.exports = router;