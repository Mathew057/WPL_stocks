const mongoose = require("mongoose")
const validator = require('validator')

const stockSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
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

if (process.env.NODE_ENV !== "production") {
  console.log('Adding default stock')
  Stock.updateOne({user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7")},{
    user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
    stock_indicator: "GOOG",
    company_name: "Google Inc.",
    quantity: 1
  }, {upsert: true}).then((doc)=> {
    if (doc.upserted) {
      console.log('added default stock', doc.upserted)
    }
  })
}

module.exports = Stock
