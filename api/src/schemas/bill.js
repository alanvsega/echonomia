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
        type: Number,
        require: true
    },
    additionalYellow: {
        type: Number,
        require: true
    },
    additionalRed: {
        type: Number,
        require: true
    },
    startReadDate: {
        type: Date,
        required: true
    },
    endReadDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}

module.exports = mongoose.model('bill', billSchema);