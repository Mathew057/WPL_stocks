/**
 * @Author: Mathew Black <Mathew>
 * @Date:   2019-11-02T12:34:17-05:00
 * @Email:  dev@mathewblack.com
 * @Filename: server.js
 * @Last modified by:   Mathew
 * @Last modified time: 2019-11-17T17:09:57-06:00
 * @License: MIT
 */
const express = require('express')
const cors = require('cors')
const crypto = require('crypto');
var seedrandom = require('seedrandom');
const stock_routes = require('./routes/stocks')

var boxMullerRandom = (function() {
  var phase = 0,
    RAND_MAX,
    array,
    random,
    x1, x2, w, z;

  if (crypto && typeof crypto.getRandomValues === 'function') {
    RAND_MAX = Math.pow(2, 32) - 1;
    array = new Uint32Array(1);
    random = function() {
      crypto.getRandomValues(array);

      return array[0] / RAND_MAX;
    };
  } else {
    random = Math.random;
  }

  return function() {
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
}());

function randomWalk(steps, randFunc) {
  steps = steps >>> 0 || 5000;
  if (typeof randFunc !== 'function') {
    randFunc = boxMullerRandom;
  }

  var points = [],
    value = 0,
    t;

  for (t = 0; t < steps; t += 1) {
    value += randFunc();
    points.push([t, value]);
  }

  return points;
}

function getYValues(points) {
  return points.map(function(point) {
    return point[1];
  });
}

function generatePlots(howMany) {
  howMany = howMany >>> 0 || 10;
  var plots = [],
    index;

  for (index = 0; index < howMany; index += 1) {
    var rnd = seedrandom('AAAA')
    plots.push({
      name: 'plot' + index,
      data: getYValues(randomWalk())
    });
  }

  return plots;
}

console.log(generatePlots(10))

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/stocks', stock_routes)
// app.listen(port, () => console.log(`App listening on port ${port}!`))
