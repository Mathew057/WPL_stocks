/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-12-03T20:57:38-06:00
 * @Email:  dev@mathewblack.com
 * @Filename: worker.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-03T21:13:50-06:00
 * @License: MIT
 */
  const mongodb_url = process.env.MONGODB_URL || "mongodb://localhost:27017/hodl"

 // const auth = require('../middlewares/auth')
 const mongoose = require('mongoose')

 ;(async function() {
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

   const agenda = require('./jobs/jobs')
   await agenda.start()
   // console.log('Adding stock job')
   // const stock = {
   //   user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
   //   stock_indicator: "GOOG",
   //   quantity: 1
   // }
   // await agenda.now('buyStock',{stock})

 })()
