var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {
  var options = {
  	method: 'GET',
  	host: 'fetd.prod.cps.awseuwest1.itvcloud.zone',
  	path: '/platform/itvonline/samsung/channels?broadcaster=ITV',
  	headers: {
  		'accept': 'application/vnd.itv.default.channel.v1+hal+json; charset=UTF-8'
  	}
  }

  var callback = function(response) {
    var reply = '';

    response.on('data', function (chunk) {
      reply += chunk;
    });

    response.on('end', function () {
    	var data = JSON.parse(reply);
    	res.send(data);
    });
  }

  http.request(options, callback).end();
});

module.exports = router;
