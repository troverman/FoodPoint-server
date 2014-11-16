var express = require('express')
var app = express();
var Firebase = require("firebase");

var myFirebaseRef = new Firebase("https://shining-heat-3529.firebaseio.com/markets");

// Retrieve new posts as they are added to Firebase
myFirebaseRef.on("child_changed", function(snapshot) {
	var market_info = snapshot.val();

	// re test how sellers there are
	console.log(snapshot.val());
});


//email after 5 sellers in market

var sendgrid_username = 'troverman';
var sendgrid_password = 'trev77922';
var to = 'troverman@gmail.com';
var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
var email = new sendgrid.Email();
email.addTo(to);
email.setFrom(to);
email.setSubject('[sendgrid-php-example] Owl');
email.setText('Owl are you doing?');
email.setHtml('<strong>%how% are you doing?</strong>');
email.addSubstitution("%how%", "Owl");
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addHeader('X-Transport', 'web');
email.addFile({path: './gif.gif', filename: 'owl.gif'});

sendgrid.send(email, function(err, json) {
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


