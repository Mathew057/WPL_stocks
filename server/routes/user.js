/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:48:40-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: user.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-30T12:01:19-06:00
 * @License: MIT
 */

const routes = require('express').Router();
const auth = require('../middlewares/auth')
const Account = require('../models/Account-model')

routes.get('/stocks', (req, res) => {
  res.json([{
    stock_indicator: "GOOGL",
    company_name: "Google",
    trend: "+1.5",
    price: "10.22",
    quantity: "200",
    data: [65, 59, 80, 81, 56, 55, 40]
  },{
    stock_indicator: "AMZN",
    company_name: "Amazon",
    trend: "-1.5",
    price: "4100.22",
    quantity: "500",
    data: [25, 50, 25, 64, 99, 26, 72]
    }
  ])
})

routes.route('/stocks/:stock_id')
.get((req, res) => {
  res.json({
    stock_indicator: "GOOGL",
    price: "10.22",
    quantity: "100",
    graph: [{
      x: new Date(),
      y: 100
    }]
  })
})
.put((req,res) => {
  res.send('success')
})
.delete((req,res) => {
  res.send('success')
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
  const Accounts = await Account.find()
  res.json(Accounts)
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


routes.get('/schedules', (req,res) => {
  res.json([{
    id: "sched1",
    type: "buy",
    frequency: "day",
    interval: "1",
    stock_indicator: "GOOGL",
    quantity: "512",
    start_date: "2019-11-18",
    end_date: "2019-12-18"
  },{
    id: "sched2",
    type: "sell",
    frequency: "week",
    interval: "2",
    stock_indicator: "AMZN",
    quantity: "10",
    start_date: "2019-12-15",
    end_date: "2020-01-10"
  },{
    id: "sched3",
    type: "sell",
    frequency: "month",
    interval: "4",
    stock_indicator: "AAPL",
    quantity: "10",
    start_date: "2019-12-15",
    end_date: "2020-01-10"
  },{
    id: "sched4",
    type: "buy",
    frequency: "year",
    interval: "5",
    stock_indicator: "WMT",
    quantity: "10",
    start_date: "2019-12-15",
    end_date: "2020-01-10"
     }
  ])
})

routes.route('/schedules/:schedule_id')
.get((req, res) => {
  res.json({
    id: "sched1",
    type: "buy",
    frequency: "day",
    interval: "1",
    stock_indicator: "GOOGL",
    quantity: "512",
    start_date: "2019-11-18",
    end_date: "2019-12-18"
  })
})
.put((req,res) => {
  console.log(req)
  res.send('success')
})
.delete((req,res) => {
  res.send('success')
})


routes.get('/balance', (req,res) => {
  res.json({
	amount: "52.40"
  })
})

routes.get('/transfer', (req,res) => {
  res.json({
	from_id: "3322",
	from_name: "test bank account",
	to_id: "0000",
	to_name: "balance",
    amount: "350.42"
  })
})
module.exports = routes;
