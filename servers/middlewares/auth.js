const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/Users-model')
const saltRounds = 12

const auth = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("skipping login for dev setup")
    req.token = ""
    req.user = {
      _id: "5de33c325777db3f7b96c7f7",
      name: "cooldude",
      email: "fake@fakethis.com",
      username: "sentient_koala",
      address: "1733 Somewhere st, hello, KS, 82932",
      password: bcrypt.hashSync("hodlme", saltRounds)
    }
    next()
  }
  else {
    try {
        const token = req.cookies['app-jt']

        if (token === '') {
            res.redirect(401, '/login')
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Users.findOne({ _id: decoded_token._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please login first.' })
    }
  }
}
module.exports = auth
