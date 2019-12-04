const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../server/models/Users-model')
const saltRounds = 12

const auth = async (req, res, next) => {
    try {
        const token = req.cookies['app-jt']

        if (token === '' || !token) {
            res.redirect(401, '/login')
            return;
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET || "replaceme")
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
module.exports = auth
