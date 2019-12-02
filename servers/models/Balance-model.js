const mongoose = require("mongoose")
const validator = require('validator')

const balanceSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      index: true
    },
    amount: {
      type: Number,
      min: 0,
      required: true
    }
}, {
    timestamps: true
})

const Balance = mongoose.model('Balances', balanceSchema)

if (process.env.NODE_ENV !== "production") {
  console.log('Adding default balance')
  Balance.updateOne({user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7")},{
    user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
    amount: 20
  }, {upsert: true}).then((doc)=> {
    if (doc.upserted) {
      console.log('added default balance', doc.upserted)
    }
  })
}

module.exports = Balance
