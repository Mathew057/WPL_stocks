/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-29T12:48:44-06:00
 * @License: MIT
 */

 const routes = require('express').Router();
 const auth = require('../middlewares/auth')
 const axios = require('axios')

const base_exchange_url =  process.env.EXCHANGE_URL || "http://localhost:3000/stock_api"

 routes.get('/', async (req, res) => {
   try {
     var response = await axios.get(`${base_exchange_url}/stocks`)
     console.log(response.data.length)
     res.json(response.data)
   }
   catch {
     res.send(error)
   }
 })

 routes.route('/:stock_id')
 .get(async (req, res) => {
   res.json({
     stock_indicator: req.params.stock_id,
     price: "10.22",
     quantity: "100",
     graph: [{
       x: new Date(),
       y: 100
     }]
   })
 })
 .put(async (req,res) => {
   res.send('success')
 })
 .delete(async (req,res) => {
   res.send('success')
 })

 module.exports = routes;
