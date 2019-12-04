/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-27T22:54:50-06:00
 * @Email:  dev@mathewblack.com
 * @Filename: stocks.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-12-03T22:08:49-06:00
 * @License: MIT
 */
 const crypto = require('crypto');
 var seedrandom = require('seedrandom');
 const base_epoch_time = 1262304000000
 const unit = 1/300000
 const max_start = 1000


 function boxMullerRandom(random) {
     var phase = 0,
         RAND_MAX,
         array,
         x1, x2, w, z;
     if (typeof random !== 'function'){
       if (crypto && typeof crypto.getRandomValues === 'function') {
           RAND_MAX = Math.pow(2, 32) - 1;
           array = new Uint32Array(1);
           random = function () {
               crypto.getRandomValues(array);

               return array[0] / RAND_MAX;
           };
       } else {
           random = Math.random;
       }
     }

     return function () {
         if (!phase) {
             do {
                 x1 = 2.0 * random() - 1.0;
                 x2 = 2.0 * random() - 1.0;
                 w = x1 * x1 + x2 * x2;
             } while (w >= 1.0);

             w = Math.sqrt((-2.0 * Math.log(w)) / w);
             z = x1 * w;
         } else {
             z = x2 * w;
         }

         phase ^= 1;

         return z;
     }
 }

 function randomWalk(steps, randFunc, start_value, start_index = 0, interval = 1) {
   var points = [],
     value = 0,
     t;
   if (typeof randFunc === 'function') {
     randFunc = boxMullerRandom(randFunc)
   } else {
     randFunc = boxMullerRandom()
   }
   for (t = 0; t <= steps; t += 1) {
     var random_value = randFunc()*start_value;
     if (value + random_value < 0) {
       value -= random_value;
     } else {
       value += random_value;
     }
     if (t%interval == 0 && t >= start_index) {
       points.push({
         "t": new Date((Math.floor(t/108)*288 + 96 + (t%108))/unit + base_epoch_time),
         "y": value
       })
     }
   }

   return points;
 }

 function randomStep(randFunc, prev_point) {
   var {t, y} = prev_point
   var value = y
   if (typeof randFunc === 'function') {
     randFunc = boxMullerRandom(randFunc)
   } else {
     randFunc = boxMullerRandom()
   }
   var random_value = randFunc()*start_value;
   if (value + random_value < 0) {
     value -= random_value;
   } else {
     value += random_value;
   }
   return{
       "t": new Date(t.getTime() + 1/unit),
       "y": value
   }
 }

 function get_date_index(epoch_time) {
   var index = Math.ceil((epoch_time-base_epoch_time)*unit)
   return Math.floor(index/288)*108 + (index%288) - 96
 }

 function generatePoints(symbol, interval = 'm', start_datetime = base_epoch_time, end_datetime = Date.now()) {
   // (Math.floor(t/108)*288 + 96 + (t%108))/unit + base_epoch_time
   if (start_datetime instanceof Date) {
     start_datetime = start_datetime.getTime()
   }
   if (end_datetime instanceof Date) {
     end_datetime = end_datetime.getTime()
   }

   switch (interval) {
     case 'm':
       interval = 1
       break;
    case 'h':
      interval = 12
      break;
    case 'd':
      interval = 108
      break;
    case 'w':
      interval = 756
      break;
    default:
      interval = 1
      break;
   }
   var steps = get_date_index(end_datetime)
   var start_index = get_date_index(start_datetime)
   console.log("Generating graph of size", (steps-start_index)/interval, "for symbol", symbol)
   var rnd = seedrandom.alea(symbol)
   return randomWalk(steps,rnd, rnd()*max_start, start_index, interval);
 }

 module.exports = {
   generatePoints,
   randomStep
 }
