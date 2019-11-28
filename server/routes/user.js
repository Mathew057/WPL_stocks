/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:48:40-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: user.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-02T13:22:09-05:00
 * @License: MIT
 */

const routes = require('express').Router();

routes.get('/stocks', (req, res) => {
  res.json([{
    stock_indicator: "GOOGL",
    price: "10.22",
    quantity: "100",
    graph: [{
      x: new Date(),
      y: 100
    }]
  }])
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
    password: "secretpassword"
  })
})

routes.get('/accounts', (req,res) => {
  res.json([{
    type: "card",
    name: "test1",
    card_type: "VISA",
    account_indicator: "3322",
    expiration: "10/21"
  },{
    type: "bank_account",
    name: "test2",
    account_indicator: "33223242432",
    routing_number: "11111111111"
  }])
})

routes.route('/accounts/:account_id')
.get((req, res) => {
  res.json({
    id: req.params.account_id,
    type: "bank_account",
    name: "test",
    account_indicator: "3322",
    routing_number: "11111111111"
  })
})
.put((req,res) => {
  console.log(req)
  res.send('success')
})
.delete((req,res) => {
  res.send('success')
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
	account_id: "3322",
	account_name: "test bank account",
    amount: "350.42"
  })
})
module.exports = routes;
