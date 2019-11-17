/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-17T16:01:02-06:00
 * @License: MIT
 */

const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017"
const client = process.env.CLIENT || "localhost"
const port = process.env.PORT || 5000

const mongoose = require('mongoose')

mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const login_routes = require('./routes/login')
const user_routes = require('./routes/user')
const error_routes = require('./routes/error-routes')
const stock_routes = require('./routes/stocks')

let cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()


app.use(express.json())
app.use(cors({
    origin: client,
    credentials: true
}))

app.use(cookieParser())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// TODO VALIDATE API REQUESTS

app.use('/login', login_routes)
app.use('/user',user_routes)
app.use('/stocks',stock_routes)
app.use(error_routes)

app.listen(port, () => console.log(`App listening on port ${port}!`))
