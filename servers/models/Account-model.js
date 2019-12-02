const mongoose = require("mongoose")
const validator = require('validator')

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    index: true
  },
    type: {
        type: String,
        required: true,
        maxlength: 20,
        enum: ["bank_account", "credit_card"]
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    account_number: {
        type: String,
        required: function(){
              return this.type === "bank_account"
        },
        minlength: 9,
        maxlength: 12,
        trim: true,
    },
    routing_number: {
        type: String,
        required: function(){
              return this.type === "bank_account"
        },
        minlength: 9,
        maxlength: 12,
        trim: true,
    },
    card_number: {
        type: String,
        required: function(){
              return this.type === "credit_card"
        },
        minlength: 15,
        maxlength: 16,
        trim: true,
    },
    security_code: {
        type: String,
        required: function(){
              return this.type === "credit_card"
        },
        minlength: 0,
        maxlength: 5,
        trim: true,
    },
    expiration: {
        type: Date,
        required: function(){
              return this.type === "credit_card"
        },
    },
    name_on_card: {
      type: String,
      required: function(){
            return this.type === "credit_card"
      },
      maxlength: 100,
    }
}, {
    timestamps: true
})

const Account = mongoose.model('Accounts', accountSchema)

if (process.env.NODE_ENV !== "production") {
  console.log('Adding default Account')
  Account.updateOne({user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7")},{
    user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
    name: "Demo Account",
    type: "bank_account",
    account_number: "1111111111",
    routing_number:"1111111111",
  }, {upsert: true}).then((doc)=> {
    if (doc.upserted) {
      console.log('added default account', doc.upserted)
    }
  })
}

module.exports = Account
