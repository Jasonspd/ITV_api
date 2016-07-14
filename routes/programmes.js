var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {
	console.log(req);
  var options = {
  	method: 'GET',
  	host: 'fetd.prod.cps.awseuwest1.itvcloud.zone',
  	path: '/platform/itvonline/samsung/productions?grouping=popular&size=15&broadcaster=ITV',
  	headers: {
  		'accept': 'application/vnd.itv.default.production.v2+hal+json; charset=UTF-8'
  	}
  }

  var callback = function(response) {
    var reply = '';

    response.on('data', function (chunk) {
      reply += chunk;
    });

    response.on('end', function () {
    	var data = JSON.parse(reply);
      res.render('programmes', {title: 'Most Popular programmes', data: data._embedded.productions});
    });
  }

  http.request(options, callback).end();
});

router.post('/', function(req, res, next) {
	console.log(res.body);
	res.send('posting');
});

module.exports = router;
