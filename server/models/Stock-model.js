const mongoose = require("mongoose")
const validator = require('validator')

const stockSchema = new mongoose.Schema({
    stock_indicator: {
        type: String,
        required: true,
        maxlength: 5,
        unique: true,
        index: true
    },
    company_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    quantity: {
      type: Number,
      required: true
    }
}, {
    timestamps: true
})

const Stock = mongoose.model('Stocks', stockSchema)

module.exports = Stock
