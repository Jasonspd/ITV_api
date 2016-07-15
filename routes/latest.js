var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {

  var categories = ['Children', 'Comedy', 'Drama+%26+Soaps', 'Entertainment', 'Factual', 'Films', 'News', 'Sport'];

	var random_category = categories[Math.floor(Math.random()*categories.length)];

  var options = {
  	method: 'GET',
  	host: 'fetd.prod.cps.awseuwest1.itvcloud.zone',
  	path: '/platform/itvonline/samsung/productions?grouping=latestPerProgramme&category='+ random_category + '&broadcaster=itv',
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

      var category_title = random_category;

      if(category_title === 'Drama+%26+Soaps') {
        category_title = 'Drama & Soaps';
      }

      res.render('latest', {title: category_title, data: data._embedded.productions});
    });
  }

  http.request(options, callback).end();
});

module.exports = router;