var http = require('http');

var Api = function(title) {

  var options = {
  	method: 'GET',
  	host: 'fetd.prod.cps.awseuwest1.itvcloud.zone',
  	path: '/platform/itvonline/samsung/productions?grouping=latestPerProgramme&'+ title + '&broadcaster=itv',
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
    	data = JSON.parse(reply);
    });
  }

  http.request(options, callback).end();

}

module.exports = Api;

//TODO: One module to call api, insert title e.g. category=Children or channelId=itv