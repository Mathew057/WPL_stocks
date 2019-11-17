/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-17T15:48:48-06:00
 * @License: MIT
 */
 const express = require('express')
 const cors = require('cors')
 var seedrandom = require('seedrandom');
 const stock_routes = require('./routes/stocks')

 const epoch_2010 = 1259560800000

 const app = express()
 const port = process.env.PORT || 5000

function get_time(datetime = "now") {
  var date = new Date()
  if (datetime !== "now") {
    date = new Date(datetime)
  }

  return Math.round((date.getTime() - epoch_2010)/60000)
}

function get_stock_at_time(stock, datetime="now") {
  var epoch_time = get_time()
  var rng = seedrandom(stock)
  for (var j = 0; j<get_time(datetime); ++j) rng();
  return rng();
}


 var saveable = seedrandom("secret-seed", {state: true});
 for (var j = 0; j < 1e5; ++j) saveable();
 var saved = saveable.state();
 console.log(saved)
 saveable();
 saved = saveable.state();
 console.log(saved)

 console.log(get_stock_at_time('GOOG'))

 app.use(express.json())
 app.use(cors({
     origin: process.env.CLIENT,
     credentials: true
 }))

 app.get('/', (req, res) => {
   res.send('Hello World!')
 })

 app.use('/stocks',stock_routes)
 // app.listen(port, () => console.log(`App listening on port ${port}!`))
