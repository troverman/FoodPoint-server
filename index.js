var express = require('express')
var app = express();
var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://shining-heat-3529.firebaseio.com/buyers");

// Retrieve new posts as they are added to Firebase
ref.on("child_added", function(snapshot) {
	var newPost = snapshot.val();
	console.log("Author: " + newPost.email);
	console.log("Title: " + newPost.trans);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('test')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
