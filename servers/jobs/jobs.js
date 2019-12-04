/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-12-01T14:40:26-06:00
 * @Email:  dev@mathewblack.com
 * @Filename: jobs.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-03T19:02:56-06:00
 * @License: MIT
 */

var Agenda = require('agenda')
const mongoose = require('mongoose')
const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017/hodl"
const agenda_db_url = mongodb_url.substring(0, mongodb_url.lastIndexOf('/')) + "/agenda";
var agenda = new Agenda({db: {address: agenda_db_url}})

const Account = require('../models/Account-model')
const Stock = require('../models/Stock-model')
const Schedule = require('../models/Schedule-model')
const Balance = require('../models/Balance-model')
const Users = require('../models/Users-model')

 agenda.define('buyStock', async (job) => {
   console.log('buying stock')
   const stock = job.attrs.data.stock
   if (job.attrs.data.end_datetime) {
     const end_datetime = new Date(job.attrs.data.end_datetime).getTime()
     if (end_datetime < Date.now()) {
       try {
         console.log('Time ended on job', job.attrs._id, 'deleting')
         await job.remove();
       }
       catch (e) {
         console.error(e)
         job.fail(e)
       }
     }
   }
   try{
     var old_stock = await Stock.findOne({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     })
   }
   catch (e) {
     console.error('could not find original stock', e)
     job.fail(e)
   }
   const quantity = "quantity" in old_stock ? old_stock.quantity + stock.quantity : stock.quantity
   try {
     const result = await Stock.updateOne({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     }, {
       quantity: quantity
     });
     console.log(result);
   }
   catch(e) {
     console.error('could not update stock', e)
     job.fail(e)
   }


 });

 agenda.define('sellStock', async (job) => {
   console.log("selling stock!")
   const stock = job.attrs.data.stock
   if (job.attrs.data.end_datetime) {
     const end_datetime = new Date(job.attrs.data.end_datetime).getTime()
     if (end_datetime < Date.now()) {
       try {
         console.log('Time ended on job', job.attrs._id, 'deleting')
         await job.remove();
       }
       catch (e) {
         console.error(e)
         job.fail(e)
       }
     }
   }
   try{
     var old_stock = await Stock.findOne({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     })
   }
   catch (e) {
     console.error('could not find original stock', e)
     job.fail(e)
   }

   console.log(old_stock)
   const quantity = "quantity" in old_stock ? old_stock.quantity - stock.quantity : stock.quantity
   try {
     const result = await Stock.updateOne({
       user_id: stock.user_id,
       stock_indicator: stock.stock_indicator
     }, {
       quantity: quantity
     });
     console.log(result);
   }
   catch(e) {
     console.error('could not update stock', e)
     job.fail(e)
   }

 });

 agenda.on('ready', async () => {
   try {
     await mongoose.connect(mongodb_url, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true
     })
   }
   catch(e) {
     console.error("could not connect to mongodb", mongodb_url,e)
     process.exit(1)
   }
 })

 module.exports = agenda
