const mongoose = require("mongoose")
const validator = require('validator')

const balanceSchema = new mongoose.Schema({
    amount: {
      type: Number,
      min: 0,
      required: true
    }
}, {
    timestamps: true
})

const Balance = mongoose.model('Balances', balanceSchema)

module.exports = Balance
