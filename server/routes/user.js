/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:48:40-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: user.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-30T13:07:14-06:00
 * @License: MIT
 */

const routes = require('express').Router();
const axios = require('axios');

const Account = require('../../models/Account-model')
const Stock = require('../../models/Stock-model')
const Schedule = require('../../models/Schedule-model')
const Balance = require('../../models/Balance-model')
const Users = require('../../models/Users-model')

const base_exchange_url =  process.env.EXCHANGE_URL || "http://localhost:4000/stock_api"
const client = process.env.CLIENT || "localhost"
const port = process.env.PORT || 5000
const base_route = process.env.BASE_ROUTE || "/api"

function precDiff(a, b) {
 return  100 * ( a - b ) / ( (a+b)/2 );
}

routes.route('/stocks')
.get(async (req, res) => {
  try {
    var stocks = await Stock.find()
    for (var i = 0; i < stocks.length; i++) {
      var stock = stocks[i]
      const response = await axios.get(`http://${client}:${port}${base_route}/stocks/${stock.stock_indicator}`)
      const {graph} = response.data
      stocks[i] = {
        ...stock.toObject(),
        ...{graph},
        trend: precDiff(graph[graph.length-1].y, graph[graph.length-2].y)
      }
    }
    res.json(stocks)
  }
  catch (e) {
    console.error(e)
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
    var stock = await Stock.findOne({stock_indicator: req.params.stock_id})
    const response = await axios.get(`http://${client}:${port}${base_route}/stocks/${req.params.stock_id}`)
    const {graph} = response.data
    stock = {
      ...stock.toObject(),
      ...{graph},
      trend: precDiff(graph[graph.length-1].y, graph[graph.length-2].y)
    }
    res.json(stock)
  }
  catch (e) {
    res.status(400).send(e)
  }
})
.put(async (req,res) => {
  try {
      const stock = await Stock.findByIdAndUpdate(req.params.stock_id, req.body)
      res.json({stock})
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.delete(async (req,res) => {
  try {
    var result = await Stock.deleteOne({stock_indicator: req.params.stock_id})
    res.send(result)
  }
  catch (e) {
      res.status(400).send(e)
  }

})

routes.get('/profile', async (req, res) => {
  try {
    const user = await Users.findById(req.user._id)
    res.json(user)
  }
  catch (e) {
      res.status(400).send(e)
  }
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
.put(async (req,res) => {
  try {
      const account = await Account.findByIdAndUpdate(req.params.account_id, req.body)
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
.put(async (req,res) => {
  try {
      const schedule = await Schedule.findByIdAndUpdate(req.params.schedule_id, req.body)
      res.json({schedule})
  }
  catch (e) {
      res.status(400).send(e)
  }
})
.delete(async (req,res) => {
  try {
      const result = await Schedule.findByIdAndDelete(req.params.schedule_id)
      res.send(result)
  }
  catch (e) {
      res.status(400).send(e)
  }
})

routes.get('/balance', async (req,res) => {
  try {
    var balance = await Balance.findOne()
    res.json(balance)
  }
  catch (e) {
    res.status(400).send(e)
  }
})

routes.post('/transfer', async (req,res) => {
  const {from_id, to_id, amount} = req.body;
  try {
    const old_balance = await Balance.findOne({user_id: req.user._id})
    var transfered_amount = old_balance.amount
    console.log(transfered_amount, typeof transfered_amount)
    if (from_id === "balance") {
      // transfer out
      transfered_amount -= parseFloat(amount)
    }
    else if (to_id === "balance") {
      // transfer in
      transfered_amount += parseFloat(amount)
    }
    else {
      res.status(400).send('cannot transfer between accounts, only to and from the balance')
    }
    const balance = await Balance.updateOne({user_id: req.user._id}, {
      amount: transfered_amount
    })
    res.json({...balance, new_amount: transfered_amount})
  }
  catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
})
module.exports = routes;
