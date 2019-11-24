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
    name: "test",
    card_type: "VISA",
    account_indicator: "3322",
    expiration: "10/21"
  },{
    type: "bank_account",
    name: "test",
    account_indicator: "3322",
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

module.exports = routes;
