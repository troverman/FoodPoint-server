var express = require('express')
var app = express();
var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://shining-heat-3529.firebaseio.com/markets");

// Retrieve new posts as they are added to Firebase
myFirebaseRef.on("child_changed", function(snapshot) {
	var market_info = snapshot.val();
	console.log(snapshot.val());
});


//email after 5 sellers in market
var sendgrid  = require('sendgrid')('troverman', 'trev77922');
sendgrid.send({
  to:       'troverman@gmail.com',
  from:     'troverman@gmail.com',
  subject:  'Hello World',
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});


















app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('newPost')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


