/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-12-01T14:40:26-06:00
 * @Email:  dev@mathewblack.com
 * @Filename: jobs.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-01T16:51:20-06:00
 * @License: MIT
 */

var Agenda = require('agenda')
const mongoose = require('mongoose')

const Account = require('../models/Account-model')
const Stock = require('../models/Stock-model')
const Schedule = require('../models/Schedule-model')
const Balance = require('../models/Balance-model')
const Users = require('../models/Users-model')
const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017/hodl"
const agenda_db_url = mongodb_url.substring(0, mongodb_url.lastIndexOf('/')) + "/agenda";
console.log(agenda_db_url)
var agenda = new Agenda({db: {address: agenda_db_url}})

 agenda.define('buyStock', async (job) => {
   console.log('buying stock')
   const stock = job.attrs.data
   console.log(stock)
   try{
     var old_stock = await Stock.findOne({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     })
     console.log(old_stock)
   }
   catch (e) {
     console.error('could not find original stock', e)
   }

   old_stock.quantity += stock.quantity;
   console.log(old_stock)
   try {
     const result = await Stock.findOneAndUpdate({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     }, old_stock);
   }
   catch(e) {
     console.error('could not update stock', e)
   }

   console.log(result);
 });

 agenda.define('sellStock', async job => {
   const stock = job.attrs.data
   console.log("selling stock!")
   var old_stock = await Stock.find({
     user_id: stock.user_id,
     stock_indicator: stock.stock_indicator
   })
   old_stock.quantity -= stock.quantity;
   const result = await Stock.findOneAndUpdate({
     user_id: stock.user_id,
     stock_indicator: stock.stock_indicator
   }, old_stock);
   console.log(result);
 });

 module.exports = agenda
