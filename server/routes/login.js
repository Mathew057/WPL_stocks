/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:52:18-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: login.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-02T13:26:29-05:00
 * @License: MIT
 */
 const routes = require('express').Router();

 routes.get('/register_user', (req, res) => {
   res.send('Hello World!')
 })

 routes.get('/login', (req, res) => {
   res.send('Hello World!')
 })

 routes.get('/logout', (req, res) => {
   res.send('Hello World!')
 })


 module.exports = routes;
