/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:48:40-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: user.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-30T13:05:27-06:00
 * @License: MIT
 */

const routes = require('express').Router();
const auth = require('../middlewares/auth')
const Account = require('../models/Account-model')
const Stock = require('../models/Stock-model')
const Schedule = require('../models/Schedule-model')
const Balance = require('../models/Balance-model')

routes.route('/stocks')
.get(async (req, res) => {
  // res.json([{
  //   stock_indicator: "GOOGL",
  //   company_name: "Google",
  //   trend: "+1.5",
  //   price: "10.22",
  //   quantity: "200",
  //   data: [65, 59, 80, 81, 56, 55, 40]
  // },{
  //   stock_indicator: "AMZN",
  //   company_name: "Amazon",
  //   trend: "-1.5",
  //   price: "4100.22",
  //   quantity: "500",
  //   data: [25, 50, 25, 64, 99, 26, 72]
  //   }
  // ])
  try {
    var stocks = await Stocks.find()
    stocks.map((stock) => {
      console.log(stock)
      return stock
    })
    res.json(stocks)
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.post(async (req, res) => {
  const newStocks = req.body
  var payload = []
  if (!(newStocks instanceof Array)) {
    res.status(400).send('request is not a list of stocks!')
  }
  try {
    for (var i = 0; i < newStocks.length; i++) {
      const newStock = await Stock(stock);
      await newStock.save();
      payload.push({newStock})
    }
  }
  catch (e) {
      res.status(400).send(e)
  }
  res.json(payload)
})

routes.route('/stocks/:stock_id')
.get(async (req, res) => {
  try {
    var stocks = await Stocks.findOne({stock_indicator: req.params.stock_id})
    res.json(Stocks)
  }
  catch (e) {
    res.status(400).send(e)
  }
})
.put(async (req,res) => {
  res.send('success')
})
.delete(async (req,res) => {
  try {
    var stocks = await Stocks.deleteOne({stock_indicator: req.params.stock_id})
    res.send('success')
  }
  catch (e) {
      res.status(400).send(e)
  }

})

routes.get('/profile', (req, res) => {
  res.json({
    username: "blah",
    first_name: "test",
    last_name: "dummy",
    address: "123 Potato Street",
    email: "test@gmail.com",
  })
})

routes.route('/accounts')
.get(async (req,res) => {
  try {
    const Accounts = await Account.find()
    res.json(Accounts)
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.post(async (req,res) => {
  const newAccount = req.body
  try {
      const account = await Account(newAccount)
      await account.save()
      res.json({ account })
  }
  catch (e) {
      res.status(400).send(e)
  }
})

routes.route('/accounts/:account_id')
.get(async (req, res) => {
  try {
      const account = await Account.findById(req.params.account_id)
      res.json({account})
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.delete(async (req,res) => {
  try {
      const account = await Account.findByIdAndDelete(req.params.account_id)
      res.send('success')
  }
  catch (e) {
      res.status(400).send(e)
  }
})


routes.route('/schedules')
.get(async (req,res) => {
  try {
    const Schedules = await Schedule.find()
    res.json(Schedules)
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.post(async (req,res) => {
  const newSchedule = req.body
  try {
      const schedule = await Schedule(newSchedule)
      await schedule.save()
      res.json({ schedule })
  }
  catch (e) {
      res.status(400).send(e)
  }
})

routes.route('/schedules/:schedule_id')
.get(async (req, res) => {
  try {
      const schedule = await Schedule.findById(req.params.schedule_id)
      res.json({schedule})
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.delete(async (req,res) => {
  try {
      const schedule = await Schedule.findByIdAndDelete(req.params.schedule_id)
      res.send('success')
  }
  catch (e) {
      res.status(400).send(e)
  }
})

routes.get('/balance', (req,res) => {
  try {
    var balance = await Balance.findOne()
    res.json(balance)
  }
  catch (e) {
    res.status(400).send(e)
  }
})

routes.post('/transfer', (req,res) => {
  const {from_id, to_id, amount} = req.body;
  try {
    const old_balance = await Balance.findOne()
    var transfer_amount = old_balance.amount
    if (from_id === "balance") {
      // transfer out
      transfer_amount -= amount
    }
    else if (to_id === "balance") {
      // transfer in
      transfer_amount += amount
    }
    else {
      res.start(400).send('cannot transfer between accounts, only to and from the balance')
    }
    const balance = await Balance.updateOne({}, {
      amount: transfer_amount
    })
  }
  catch (e) {
    res.status(400).send(e)
  }
})
module.exports = routes;
