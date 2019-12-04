const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 12

const auth = async (req, res, next) => {
    try {
        const decoded_token = jwt.verify(req.token, process.env.JWT_SECRET || "replaceme")
        console.log(decoded_token)
        req.user = decoded_token

        next()
    } catch (e) {
        res.status(401).send({ error: 'Token Invalid' })
    }
}
module.exports = auth
