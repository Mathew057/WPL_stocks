const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const saltRounds = 12

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format")
            }
        }
    },
    address: {
      type: String,
      required: true
    },
    username: {
      type: String,
      index: true,
      required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

usersSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({ email: email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

usersSchema.methods.generateAuthToken = async function () {

    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || "replaceme")

    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

usersSchema.methods.toJSON = function () {
    const user = this
    const publicUserData = user.toObject()

    delete publicUserData.password
    delete publicUserData.tokens

    return publicUserData
}

const Users = mongoose.model('Users', usersSchema)

if (process.env.NODE_ENV !== "production") {
  console.log('Adding default user')
  Users.updateOne({_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7")},{
    _id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
    name: "cooldude",
    email: "fake@fakethis.com",
    username: "sentient_koala",
    address: "1733 Somewhere st, hello, KS, 82932",
    password: bcrypt.hashSync("hodlme", saltRounds)
  }, {upsert: true}).then((doc)=> {
    if (doc.upserted) {
      console.log('added default user', doc.upserted)
    }
  })
}
module.exports = Users
