/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-01T16:55:59-06:00
 * @License: MIT
 */

 const routes = require('express').Router();
 const axios = require('axios')

const base_exchange_url =  process.env.EXCHANGE_URL || "http://localhost:4000/stock_api"

 routes.get('/', async (req, res) => {
   try {
     var response = await axios.get(`${base_exchange_url}/stocks`)
     console.log(response.data.length)
     res.json(response.data)
   }
   catch (e) {
     console.error(e)
       res.status(400).send(e)
   }
 })

 routes.route('/:stock_id')
 .get(async (req, res) => {
   var stock_id = req.params.stock_id
   try {
     var today = new Date().toISOString()
     var last_month =  new Date()
     last_month.setMonth(last_month.getMonth() - 1)
     last_month = last_month.toISOString()
     var response = await axios.post(`${base_exchange_url}/stocks/daily/${stock_id}`, {
       start_datetime: last_month,
       end_datetime: today
     })
     res.json(response.data)
   }
   catch (e) {
     console.error(e)
       res.status(400).send(e)
   }
 })
 .post(async (req, res) => {
   var stock_id = req.params.stock_id
   try {
     var {start_datetime, end_datetime, interval} = req.body
     var url = "daily"
     switch (interval) {
       case '5min':
         url = '5min'
         break;
       case 'hourly':
         url = 'hourly'
         break;
       case 'daily':
        url = 'daily';
        break;
      case 'weekly':
        url = 'weekly'
        break;
     }
     var response = await axios.post(`${base_exchange_url}/stocks/${url}/${stock_id}`, {
       start_datetime: start_datetime,
       end_datetime: end_datetime
     })
     res.json(response.data)
   }
   catch (e) {
     console.error(e)
       res.status(400).send(e)
   }
 })

 module.exports = routes;
