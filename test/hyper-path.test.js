var should = require('should');
var express = require('express');
var request = require('supertest');
var cases = require('./cases');

var app = express();
app.use(express.static(__dirname));

describe('hyper-path', function() {
  var agent = {
    root: function (fn) {
      return agent.get('/api/index.json', fn);
    },
    get: function(href, fn) {
      request(app)
        .get(href)
        .end(function(err, res) {
          if (!res.ok) return fn(new Error('HTTP Error ' + res.status + ' ' + href));
          fn(err, res.body);
        });
    }
  };

  cases(agent);

  require('./immutable.test.js');
});
