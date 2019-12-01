const mongoose = require("mongoose")
const validator = require('validator')

const scheduleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    index: true
  },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    type: {
        type: String,
        required: true,
        enum: ["buy", "sell"]
    },
    frequency: {
        type: String,
        required: true,
        enum: ["second", "minute", "hour","day","week", "month", "year"]
    },
    interval: {
      type: Number,
      required: true
    },
    stock_indicator: {
      type: String,
      required: true,
      maxlength: 5
    },
    quantity: {
      type: Number,
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
}, {
    timestamps: true
})

const Schedule = mongoose.model('Schedules', scheduleSchema)

if (process.env.NODE_ENV !== "production") {
  console.log('Adding default schedule')
  Schedule.updateOne({user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7")},{
    user_id: mongoose.Types.ObjectId("5de33c325777db3f7b96c7f7"),
    name: "Get Googled",
    type: "buy",
    frequency: "week",
    interval:1,
    stock_indicator: "GOOG",
    quantity: 1,
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString()
  }, {upsert: true}).then((doc)=> {
    if (doc.upserted) {
      console.log('added default schedule', doc.upserted)
    }
  })
}

module.exports = Schedule
