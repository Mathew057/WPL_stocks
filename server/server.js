/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-02T13:27:09-05:00
 * @License: MIT
 */

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const login_routes = require('./routes/login')
app.use('/login', login_routes)

// TODO VALIDATE API REQUESTS

const user_routes = require('./routes/user')
app.use('/user',user_routes)

const stock_routes = require('./routes/stocks')
app.use('/stocks',stock_routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
