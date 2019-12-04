/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-04T01:21:58-06:00
 * @License: MIT
 */

 const routes = require('express').Router();
 const {
   Stocks_Weekly,
   Stocks_Daily,
   Stocks_Hourly,
   Stocks_5min
 } = require('../models/Stock-model')

 function precDiff(a, b) {
  return  100 * ( a - b ) / ( (a+b)/2 );
 }

 routes.route('/')
 .get(async (req,res) => {
   var last_month =  new Date()
   last_month.setMonth(last_month.getMonth() - 1);
   var stocks = await Stocks_Hourly.aggregate([
     {
       $match: {
         datetime: {
           $gte: last_month
         }
       }
     },
     {
      $sort: {
          datetime: 1
      }
  }, {
      $group: {
          _id: "$stock_indicator",
          company_name: {
              "$first": "$company_name"
          },
          graph: {
              "$push": {
                  t: "$datetime",
                  y: "$price"
              }
          }
      }
  }])

   payload = []

   for (var i = 0; i < stocks.length; i++) {
     payload.push({
       ...stocks[i],
       price: stocks[i].graph[stocks[i].graph.length-1].y,
       trend: precDiff(stocks[i].graph[stocks[i].graph.length-1].y, stocks[i].graph[stocks[i].graph.length-2].y)
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
