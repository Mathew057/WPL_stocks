const mongoose = require("mongoose")
const validator = require('validator')

const accountSchema = new mongoose.Schema({
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
        minlength: 9,
        maxlength: 12,
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

module.exports = Account
