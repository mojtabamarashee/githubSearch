var request = require('req-fast');
var http = require('http');
var fs = require('graceful-fs');

created = "2017-02-01";
var options = {
	url: 'https://api.github.com/search/repositories?q=react+created:>' + created + '&sort=stars&order=desc&per_page=400',
	headers: {
		'User-Agent': 'request'
	}
};


StartServer();

function callback(error, response) {
	if (!error && response.statusCode == 200) {

		cntr++;
		if(cntr == 10)
			console.timeEnd('end');
		var info = (response.body);
		items = info.items;
		fs.writeFile("test.html","", function(){});
		//console.log("total : " + items.length);
		items.forEach(function(item){
			fs.appendFile("test.html",  "<br>" + cntr + ":<br><br> ",  function(){});
			keys = Object.keys(item);
			key = "stargazers_count"
				try{
					//keys.forEach(function(key){
					//console.log(key + " : " + item[key]);
					fs.appendFile("test.html", key + " : " + item[key] + "<br> ", function(err){if (err) throw err;});

					//})
				}
			catch(err){}
		});
		//console.log(Object.keys(info.items[0]) + " info");
		info.items.forEach(function(item){
			//console.log((item.stars) + " info");
		})
		//console.log(info.stargazers_count + " Stars");
		//console.log(info.forks_count + " Forks");
	}
}

console.time('end');
var cntr = 0;
/*for(i = 0; i < 10; i++)
  {
  request(options, callback);
  }
  */

function StartServer()
{
	fs.readFile("./index.html", function(err, data){
		var server = http.createServer(function(request, response) {
			response.writeHeader(200, {"Content-Type": "text/html"});  
			console.log("Server is listening");
			response.write(data);
			response.end();
		});

		server.listen(8080);
		console.log("Server is listening");

	})
}

