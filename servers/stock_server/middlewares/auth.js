const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 12

const auth = async (req, res, next) => {
    try {
      const {token} = req.body
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET || "replaceme")
        req.user = decoded_token

        next()
    } catch (e) {
        console.error("login token was invalid")
        res.status(401).send({ error: 'Token Invalid' })
    }
}
module.exports = auth
