/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-03T18:07:54-06:00
 * @License: MIT
 */

 const routes = require('express').Router();
 const generatePoints = require('../generator/stocks')

 const fs = require('fs');
 let stocks = JSON.parse(fs.readFileSync('symbols.json'));


 function precDiff(a, b) {
  return  100 * ( a - b ) / ( (a+b)/2 );
 }

 routes.route('/')
 .get((req,res) => {
   payload = []
   var today = new Date()
   var last_month =  new Date()
   last_month = last_month.setMonth(last_month.getMonth() - 1);
   for (var symbol in stocks) {
     const points = generatePoints(symbol, 'd', last_month, today)
     payload.push({
       ...stocks[symbol],
       stock_indicator: symbol,
       graph: points,
       price: points[points.length-1].y,
       trend: precDiff(points[points.length-1].y, points[points.length-2].y)
     })
   }
   res.json(payload)
 })

 routes.get("/latest", (req, res) => {
   payload = []
   for (var symbol in stocks) {
     const points = generatePoints(symbol, 'm', new Date())
     payload.push({
       ...stocks[symbol],
       stock_indicator: symbol,
       price: points[0].y,
     })
   }
   res.json(payload)
 })

 routes.get("/latest/:stock_id", (req,res) => {
   const stock_id = req.params.stock_id
   const points = generatePoints(stock_id, 'm', new Date())
   console.log(points)
   res.json({
     ...stocks[stock_id],
     stock_indicator: stock_id,
     price: points[0].y,
   })

 })

 routes.route("/5min/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   const points = generatePoints(stock_id, 'm', start_datetime, end_datetime)
   res.json({
     ...stocks[stock_id],
     stock_indicator: stock_id,
     graph: points,
     price: points[points.length-1].y,
     trend: precDiff(points[points.length-1].y, points[points.length-2].y)
   })

 })

 routes.route("/hourly/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   const points = generatePoints(stock_id, 'h', start_datetime, end_datetime)
   res.json({
     ...stocks[stock_id],
     stock_indicator: stock_id,
     graph: points,
     price: points[points.length-1].y,
     trend: precDiff(points[points.length-1].y, points[points.length-2].y)
   })
 })

 routes.route("/daily/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   const points = generatePoints(stock_id, 'd', start_datetime, end_datetime)
   res.json({
     ...stocks[stock_id],
     stock_indicator: stock_id,
     graph: points,
     price: points[points.length-1].y,
     trend: precDiff(points[points.length-1].y, points[points.length-2].y)
   })
 })

 routes.route("/weekly/:stock_id")
 .post((req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   const points = generatePoints(stock_id, 'w', start_datetime, end_datetime)
   res.json({
     ...stocks[stock_id],
     stock_indicator: stock_id,
     graph: points,
     price: points[points.length-1].y,
     trend: precDiff(points[points.length-1].y, points[points.length-2].y)
   })
 })

 module.exports = routes;
