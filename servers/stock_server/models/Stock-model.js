const mongoose = require("mongoose")
const validator = require('validator')

const stockSchema = new mongoose.Schema({
    datetime: {
      type: Date,
      require: true,
      index: true
    },
    stock_indicator: {
        type: String,
        required: true,
        maxlength: 5,
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
    },
    price: {
      type: Number,
      required: true
    }
}, {
    timestamps: true
})

const Stock = mongoose.model('Stocks', stockSchema)

module.exports = Stock
