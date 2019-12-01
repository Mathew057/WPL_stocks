/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-29T12:08:15-06:00
 * @License: MIT
 */
const express = require('express')
const cors = require('cors')
// const auth = require('./middlewares/auth')

const stock_routes = require('./routes/stocks')
const app = express()
const client = process.env.CLIENT || "localhost"
const port = process.env.PORT || 4000
const base_route = process.env.BASE_ROUTE || "/stock_api"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}))

app.get(base_route, (req, res) => {
  res.send('Hello World!')
})

app.use(`${base_route}/stocks`, stock_routes)
app.listen(port, () => console.log(`App listening on port ${port}!`))
