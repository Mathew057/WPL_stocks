/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-04T15:29:53-06:00
 * @License: MIT
 */

  const base_epoch_time = 1262304000000
 const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017/hodl-exchange"
 const port = process.env.PORT || 4000
 const base_route = process.env.BASE_ROUTE || "/stock_api"

 const fs = require('fs');
 let stocks = JSON.parse(fs.readFileSync('symbols.json'));

let cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const auth = require('./middlewares/auth')
const mongoose = require('mongoose')
mongoose.set('debug', true);


var morgan = require('morgan')

const stock_routes = require('./routes/stocks')
const {
  Stocks_Weekly,
  Stocks_Daily,
  Stocks_Hourly,
  Stocks_5min
} = require('./models/Stock-model')

const {generatePoints, randomStep} = require('./generator/stocks')

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
  res.send('Hello exchange!')
})

async function update_stocks (Model, interval, base_date) {
  write_ops = []
  for (var symbol in stocks) {

    const last_stock = await Model.find({
      stock_indicator: symbol
    })
    .sort({ datetime: -1 })
    .limit(1).exec()


    var start_time = last_stock[0] ? last_stock[0].datetime : base_date
    const points = generatePoints(symbol, interval, start_time)
    console.log(points.length)
    if (points.length !== 0) {

      for (var i = 0; i < points.length; i ++) {
        write_ops.push({
          updateOne: {
            filter: {
              datetime: points[i].t,
              stock_indicator: symbol
            },
            update: {
              datetime: points[i].t,
              price: points[i].y,
              stock_indicator: symbol,
              company_name: stocks[symbol].company_name,
              quantity: stocks[symbol].shares_available
            },
            upsert: true
          }
        })
      }
    try {
      const result = await Model.collection.bulkWrite(write_ops)
      console.log("Finished bulk inserting", symbol)
    }
    catch (e) {
        console.error(e)

    }
  }
  }
}

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
  console.log('Generating 1 week')
  var write_ops = []
  var last_week = new Date()
  last_week.setDate(last_week.getDate() - 7);
  await update_stocks(Stocks_5min, "m", last_week)
  console.log('Generating 1 month')
  var last_month = new Date()
  last_month.setMonth(last_month.getMonth()-1)
  await update_stocks(Stocks_Hourly, "h", last_month)
  console.log('Generating 1 year')
  var last_year = new Date()
  last_year.setFullYear( last_year.getFullYear() - 1 );
  await update_stocks(Stocks_Daily, "d", last_year)
  console.log('Generating all time')
  await update_stocks(Stocks_Weekly, "w", new Date(base_epoch_time))
  console.log("Finished generating stocks")

  app.use(`${base_route}/stocks`, auth, stock_routes)
  app.listen(port, () => console.log(`App listening on port ${port}!`))

})()

setInterval(async () => {
  var last_5min = new Date(Date.now() - 300000)
  await update_stocks(Stocks_5min, "m", last_5min)
}, 300000)
