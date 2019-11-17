/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-17T14:57:05-06:00
 * @License: MIT
 */

 const routes = require('express').Router();

 routes.route("/daily/:stock_id")
 .get((req,res) => {
   const stock_id = req.params.stock_id

 })
 .post((req, res) => {
   const stock_id = req.params.stock_id
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

 module.exports = routes;
