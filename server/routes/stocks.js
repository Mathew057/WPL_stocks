/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-02T13:29:16-05:00
 * @License: MIT
 */

 const routes = require('express').Router();

 routes.post('/search', (req, res) => {
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

 routes.get('/', (req, res) => {
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

 routes.route('/:stock_id')
 .get((req, res) => {
   res.json({
     stock_indicator: req.params.account_id,
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

 module.exports = routes;
