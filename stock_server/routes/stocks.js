/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-29T12:23:01-06:00
 * @License: MIT
 */

 const routes = require('express').Router();
 const generatePoints = require('../generator/stocks')

 const fs = require('fs');
 let stocks = JSON.parse(fs.readFileSync('symbols.json'));

 routes.route('/')
 .get((req,res) => {
   payload = []
   var today = new Date()
   var last_month =  new Date()
   last_month = last_month.setMonth(last_month.getMonth() - 1);
   for (var symbol in stocks) {
     payload.push({
       graph: generatePoints(symbol, 'd', last_month, today),
       ...stocks[symbol]
     })
   }
   res.json(payload)
 })

 routes.route("/5min/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   res.json({
     graph: generatePoints(stock_id, 'm', start_datetime, end_datetime),
     ...stocks[stock_id]
   })

 })

 routes.route("/hourly/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   res.json({
     graph: generatePoints(stock_id, 'h', start_datetime, end_datetime),
     ...stocks[stock_id]
   })

 })

 routes.route("/daily/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   res.json({
     graph: generatePoints(stock_id, 'd', start_datetime, end_datetime),
     ...stocks[stock_id]
   })
 })

 routes.route("/weekly/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   res.json({
     graph: generatePoints(stock_id, 'w', start_datetime, end_datetime),
     ...stocks[stock_id]
   })
 })

 module.exports = routes;
