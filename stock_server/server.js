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
const app = express()
const client = process.env.CLIENT || "localhost"
const port = process.env.PORT || 5001

const base_epoch_time = 946684800000
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

function randomWalk(steps, randFunc, start_value = 0) {
  var points = [],
    value = 0,
    t;
  if (typeof randFunc === 'function') {
    randFunc = boxMullerRandom(randFunc)
  } else {
    randFunc = boxMullerRandom()
  }
  for (t = 0; t < steps; t += 1) {
    var random_value = randFunc()*start_value;
    if (value + random_value < 0) {
      value -= random_value;
    } else {
      value += random_value;
    }
    points.push([t, value]);
  }

  return points;
}

function get_graphs(graphs) {
  return {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 500,
  "height": 200,
  "padding": 5,

  "signals": [
    {
      "name": "interpolate",
      "value": "linear",
      "bind": {
        "input": "select",
        "options": [
          "basis",
          "cardinal",
          "catmull-rom",
          "linear",
          "monotone",
          "natural",
          "step",
          "step-after",
          "step-before"
        ]
      }
    }
  ],

  "data": [
    {
      "name": "table",
      "values": graphs.map((points, index) => {

        points = points.slice(0,1000).map(function(point) {
          return {
            "x": new Date((point[0]/unit)+base_epoch_time),
            "y": point[1],
            "c": index
          }
        })
        return points
      }).flat()
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "point",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "nice": true,
      "zero": true,
      "domain": {"data": "table", "field": "y"}
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {"data": "table", "field": "c"}
    }
  ],

  "axes": [
    {"orient": "bottom", "scale": "x"},
    {"orient": "left", "scale": "y"}
  ],

  "marks": [
    {
      "type": "group",
      "from": {
        "facet": {
          "name": "series",
          "data": "table",
          "groupby": "c"
        }
      },
      "marks": [
        {
          "type": "line",
          "from": {"data": "series"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "x"},
              "y": {"scale": "y", "field": "y"},
              "stroke": {"scale": "color", "field": "c"},
              "strokeWidth": {"value": 2}
            },
            "update": {
              "interpolate": {"signal": "interpolate"},
              "fillOpacity": {"value": 1}
            },
            "hover": {
              "fillOpacity": {"value": 0.5}
            }
          }
        }
      ]
    }
  ]
}

}

function generatePoints(symbol) {
  var steps = Math.ceil((Date.now()-base_epoch_time)*unit)
  console.log("Generating graph of size", steps)
  var rnd = seedrandom.alea(symbol)
  return randomWalk(steps,rnd, rnd()*max_start);
}

function generateGraphs() {
  var points = [];
  for (var i = 0; i < 10; ++i) {
    var symbol = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).toUpperCase()
    points.push(generatePoints(symbol))
  }
  return get_graphs(points)
}

const vega = require('vega')
const fs = require('fs')

var graphs = generateGraphs();
// console.log(graphs.data[0].values.slice(0,100))

var view = new vega
  .View(vega.parse(graphs), {
    renderer: 'none'
  });
view
  .toCanvas()
  .then(function (canvas) {
    // process node-canvas instance for example, generate a PNG stream to write var
    // stream = canvas.createPNGStream();
    console.log('Writing PNG to file...')
    fs.writeFileSync('stocks.png', canvas.toBuffer())
  })
  .catch(function (err) {
    console.log("Error writing PNG to file:")
    console.error(err)
  });

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
