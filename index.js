var express = require('express')
var app = express();
var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://shining-heat-3529.firebaseio.com/");

myFirebaseRef.on("shining-heat-3529 ", function(snapshot) {
	console.log(snapshot.val());
	}, 
	function (errorObject) {
		console.log("The read failed: " + errorObject.code);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('test')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
