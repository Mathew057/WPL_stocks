/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-04T15:30:08-06:00
 * @License: MIT
 */
 const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017/hodl"
const port = process.env.PORT || 5000
const base_route = process.env.BASE_ROUTE || "/api"

const mongoose = require('mongoose')
mongoose.set('debug', true);

let cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
var morgan = require('morgan')

const login_routes = require('./routes/login')
const user_routes = require('./routes/user')
const error_routes = require('./routes/error-routes')
const stock_routes = require('./routes/stocks')
const auth = require('./middlewares/auth')

const app = express()
app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(compression())
app.use(cookieParser())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    }
}))

app.get(base_route, (req, res) => {
  res.send('Hello brockerage!')
})

;(async function() {
  try {
    await mongoose.connect(mongodb_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
  }
  catch(e) {
    console.error("could not connect to mongodb", mongodb_url,e)
    process.exit(1)
  }

  app.use(`${base_route}/`, login_routes)
  app.use(`${base_route}/user`, auth, user_routes)
  app.use(`${base_route}/stocks`, auth, stock_routes)
  app.use(base_route, error_routes)

  app.listen(port, () => console.log(`App listening on port ${port}!`))

})()
