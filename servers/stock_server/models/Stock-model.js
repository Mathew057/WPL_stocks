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

const Stocks_Weekly = mongoose.model('Stocks_Weekly', stockSchema)
const Stocks_Daily = mongoose.model('Stocks_Daily', stockSchema)
const Stocks_Hourly = mongoose.model('Stocks_Hourly', stockSchema)
const Stocks_5min = mongoose.model('Stocks_5min', stockSchema)

module.exports = {
  Stocks_Weekly,
  Stocks_Daily,
  Stocks_Hourly,
  Stocks_5min
}
