const mongoose = require('mongoose');

const billSchema = {
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    expenditure: {
        type: Date,
        require: true
    },
    flag: {
        type: String,
        require: true
    },
    totalValue: {
        type: Number,
        require: true
    },
    totalTaxes: {
        type: Number,
        require: true
    },
    additionalGreen: {
        type: Number
    },
    additionalYellow: {
        type: Number
    },
    additionalRed: {
        type: Number
    },
    startReadDate: {
        type: Date
    },
    endReadDate: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}

module.exports = mongoose.model('bill', billSchema);