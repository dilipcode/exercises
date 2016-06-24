var http = require('http');
// console.log(http);
var url = require('url');

function start(route,handle){

	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for" + pathname + "recieved");
		request.setEncoding("utf8");
		request.addListener("data", function(postDatachunk){
			postData += postDatachunk;
			console.log("Recieved post data chunk:" + postDatachunk);
		});
		request.addListener("end", function(){
				route(handle,pathname,response,postData);

					});
		
		// response.writeHead(200, {"Content-Type": "text/plain"});
		// response.write("Hello World");
		// response.end();

	}

	var m = http.createServer(onRequest);
	console.log(m);
	m.listen(8888);
	console.log("server started");
}

exports.start = start;