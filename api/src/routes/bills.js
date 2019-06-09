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
        let bill = await Bills.findOne({
            userId: req.userId,
            year: req.body.year,
            month: req.body.month
        });
        if (bill) return res.status(409).send('Uma conta deste mês/ano ja foi cadastrada.');

        bill = await Bills.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            bill
        });
    } catch (error) {
        res.status(500).send(error + ' Erro interno no servidor.');
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

router.get('/bills/MonthEconomy', async (req, res) => {
    try {
        let month = req.query.referenceMonth ? parseInt(req.query.referenceMonth) : new Date().getMonth() + 1;
        let year = req.query.referenceYear ? parseInt(req.query.referenceYear) : new Date().getFullYear();

        const bill1 = await Bills.findOne({
            userId: req.userId,
            month: month,
            year: year
        });

        const bill2 = await Bills.findOne({
            userId: req.userId,
            month: month - 1 === 0 ? 12 : month - 1,
            year: month - 1 === 0 ? year - 1 : year
        });

        return res.status(200).json({
            echonomy: {
                totalEconomy: (!bill1 || !bill2 ? 0 : bill1.totalValue) - (!bill1 || !bill2 ? 0 : bill2.totalValue),
                relatedMonth: month
            }
        });
    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

router.get('/bills/ConsumeChart', async (req, res) => {
    try {
        const chartResolution = req.query.chartResolution ? parseInt(req.query.chartResolution) : 6;

        const bills = await Bills.find({
            userId: req.userId
        }).sort({
            year: -1,
            month: -1
        }).limit(chartResolution);

        if (bills.length === 0)
            return res.status(200).json({bills});

        const chartBills = bills.map(bill => {
            return {
                year: bill.year,
                month: bill.month,
                expenditure: bill.expenditure
            }
        });

        if (chartBills.length < chartResolution) {
            const firstBill = chartBills[chartBills.length - 1]

            for (let i = chartResolution - chartBills.length; i > 0; i--) {
                chartBills.push({
                    year: firstBill.month - i <= 0 ? firstBill.year - 1 : firstBill.year,
                    month: firstBill.month - i <= 0 ? firstBill.month - i + 12 : firstBill.month - i,
                    expenditure: 0
                });
            }
        }

        return res.status(200).json(chartBills.sort((one, another) => {
            if (one.year > another.year) {
                return 1
            }
            if (one.year === another.year) {
                if (one.month > another.month) {
                    return 1;
                } else if (one.month < another.month) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return -1;
            }
        }));

    } catch (error) {
        res.status(500).send('Erro interno no servidor.');
    }
});

module.exports = router;