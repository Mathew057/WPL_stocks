const mongoose = require("mongoose")
const validator = require('validator')

const scheduleSchema = new mongoose.Schema({
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
        enum: ["second", "minute", "hour","day", "month", "year"]
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

module.exports = Schedule
