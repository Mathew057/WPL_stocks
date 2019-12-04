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
          stock_indicator: {
              "$first": "$stock_indicator"
          },
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

 routes.get("/latest",async (req, res) => {
   var stocks = await Stocks_5min.aggregate([
     {
      $sort: {
          datetime: -1
      }
    },
    {
        $group: {
            _id: "$stock_indicator",
            stock_indicator: {
                "$first": "$stock_indicator"
            },
            company_name: {
                "$first": "$company_name"
            },
            quantity: {
                "$first": "$quantity"
            },
            datetime: {
                "$first": "$datetime"
            },
            price: {
                "$first": "$price"
            }
        }
    }
  ])
   res.json(stocks)
 })

 routes.get("/latest/:stock_id",async (req,res) => {
   const stock_id = req.params.stock_id
   var stock = await Stocks_5min.aggregate([
     {
       $match: {
         stock_indicator: stock_id
       }
     },
     {
      $sort: {
          datetime: -1
      }
    },
    {
        $group: {
            _id: "$stock_indicator",
            stock_indicator: {
                "$first": "$stock_indicator"
            },
            company_name: {
                "$first": "$company_name"
            },
            quantity: {
                "$first": "$quantity"
            },
            price: {
                "$first": "$price"
            }
        }
    }
  ])
  stock = stock[0]
   res.json(stock)

 })

 routes.route("/5min/:stock_id")
 .post(async (req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   var stock = await Stocks_5min.aggregate([
     {
       $match: {
         datetime: {
           $gte: start_datetime,
           $lte: end_datetime
         },
         stock_indicator: stock_id
       }
     },
     {
      $sort: {
          datetime: 1
      }
  }, {
      $group: {
          _id: "$stock_indicator",
          stock_indicator: {
              "$first": "$stock_indicator"
          },
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

  stock = stock[0]

  console.log(stock)

   res.json({
     ...stock,
     price: stock.graph[stock.graph.length-1].y,
     trend: precDiff(stock.graph[stock.graph.length-1].y, stock.graph[stock.graph.length-2].y)
   })

 })

 routes.route("/hourly/:stock_id")
 .post(async (req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   var stock = await Stocks_Hourly.aggregate([
     {
       $match: {
         datetime: {
           $gte: start_datetime,
           $lte: end_datetime
         },
         stock_indicator: stock_id
       }
     },
     {
      $sort: {
          datetime: 1
      }
  }, {
      $group: {
          _id: "$stock_indicator",
          stock_indicator: {
              "$first": "$stock_indicator"
          },
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
stock = stock[0]
   res.json({
     ...stock,
     price: stock.graph[stock.graph.length-1].y,
     trend: precDiff(stock.graph[stock.graph.length-1].y, stock.graph[stock.graph.length-2].y)
   })
 })

 routes.route("/daily/:stock_id")
 .post(async (req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   var stock = await Stocks_Daily.aggregate([
     {
       $match: {
         datetime: {
           $gte: start_datetime,
           $lte: end_datetime
         },
         stock_indicator: stock_id
       }
     },
     {
      $sort: {
          datetime: 1
      }
  }, {
      $group: {
          _id: "$stock_indicator",
          stock_indicator: {
              "$first": "$stock_indicator"
          },
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
stock = stock[0]
   res.json({
     ...stock,
     price: stock.graph[stock.graph.length-1].y,
     trend: precDiff(stock.graph[stock.graph.length-1].y, stock.graph[stock.graph.length-2].y)
   })
 })

 routes.route("/weekly/:stock_id")
 .post(async (req,res) => {
   var {start_datetime, end_datetime} = req.body
   start_datetime = new Date(start_datetime)
   end_datetime = new Date(end_datetime)
   const stock_id = req.params.stock_id
   var stock = await Stocks_Weekly.aggregate([
     {
       $match: {
         datetime: {
           $gte: start_datetime,
           $lte: end_datetime
         },
         stock_indicator: stock_id
       }
     },
     {
      $sort: {
          datetime: 1
      }
  }, {
      $group: {
          _id: "$stock_indicator",
          stock_indicator: {
              "$first": "$stock_indicator"
          },
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
stock = stock[0]
   res.json({
     ...stock,
     price: stock.graph[stock.graph.length-1].y,
     trend: precDiff(stock.graph[stock.graph.length-1].y, stock.graph[stock.graph.length-2].y)
   })
 })

 module.exports = routes;
