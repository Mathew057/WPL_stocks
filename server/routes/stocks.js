/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:53:11-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-17T14:57:04-06:00
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
   res.json([
    {
      stock_indicator: "GOOGL",
      company_name: "Google",
      trend: "+1.5",
      price: "10.22",
      shares_available: "200",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
      {
      stock_indicator: "AMZN",
      company_name: "Amazon",
      trend: "-1.5",
      price: "4100.22",
      shares_available: "500",
      data: [25, 50, 25, 64, 99, 26, 72]
     },
     {
      stock_indicator: "WMT",
      company_name: "Walmart",
      trend: "+12.5",
      price: "60.46",
      shares_available: "900",
      data: [12, 16, 42, 19, 35, 56, 2]
     },
      {
      stock_indicator: "NTDOY",
      company_name: "Nintendo",
      trend: "+1.9",
      price: "1239.40",
      shares_available: "1600",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
    {
      stock_indicator: "HPQ",
      company_name: "HP",
      trend: "+3.5",
      price: "12.40",
      shares_available: "200",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
    {
      stock_indicator: "FB",
      company_name: "Facebook",
      trend: "+2.5",
      price: "193.22",
      shares_available: "20",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
      {
      stock_indicator: "NVDA",
      company_name: "Nvidia ",
      trend: "+28.5",
      price: "592.12",
      shares_available: "40",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
     {
      stock_indicator: "SPLK",
      company_name: "Splunk",
      trend: "-2.5",
      price: "31.46",
      shares_available: "100",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
      {
      stock_indicator: "PYPL",
      company_name: "Paypal",
      trend: "-12.5",
      price: "9.42",
      shares_available: "100",
      data: [65, 59, 80, 81, 56, 55, 40]
     },
    {
      stock_indicator: "AAPL",
      company_name: "Apple",
      trend: "-4.5",
      price: "746.00",
      shares_available: "29",
      data: [65, 59, 80, 81, 56, 55, 40]
     }
  ])
 })

 routes.route('/:stock_id')
 .get((req, res) => {
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
 .put((req,res) => {
   res.send('success')
 })
 .delete((req,res) => {
   res.send('success')
 })

 module.exports = routes;
