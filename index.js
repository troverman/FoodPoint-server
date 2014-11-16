var express = require('express')
var app = express();
var Firebase = require("firebase");

var baseURL = "https://shining-heat-3529.firebaseio.com/";
var rootRef = new Firebase(baseURL);
var marketsRef = rootRef.child('markets');


var requestsRef = rootRef.child('requests');
requestsRef.on("child_added", function(snapshot) {
	var newPost = snapshot.val();
});


marketsRef.orderByKey().on("child_added", function(snapshot) {	
	var marketInfo = snapshot.val();
	//console.log(marketInfo);

	var marketRef = marketsRef.child(snapshot.key());
	var sellerList = marketInfo.sellers;
	var buyers = marketInfo.buyers;

	if(Object.size(sellerList) >= 5) {
		var emailed = snapshot.val().emailed;
		if(emailed == "no"){
			sendMail(buyers);
			marketRef.update({
				"emailed": "yes"
			});
			console.log("email sent");
		}
	}	
});


marketsRef.orderByKey().on("child_changed", function(snapshot) {
	var marketInfo = snapshot.val();
	//console.log(marketInfo);

	var marketRef = marketsRef.child(snapshot.key());
	var sellerList = marketInfo.sellers;
	var buyers = marketInfo.buyers;

	if(Object.size(sellerList) >= 5) {
		var emailed = snapshot.val().emailed;
		if(emailed == "no"){
			sendMail(buyers);
			marketRef.update({
				"emailed": "yes"
			});
			console.log("email sent");
		}
	}
}); 


Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
}; 


function sendMail(buyers){
	// run through buyer list
	for(key in buyers) {
		var toEmail = buyers[key]['email'];
	
		var sendgrid_username = 'troverman';
		var sendgrid_password = 'trev77922';
		var to = toEmail;
		var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
		var email = new sendgrid.Email();
		email.addTo(to);
		email.setFrom(to);
		email.setSubject('food point');
		email.setHtml('<p>glad youre on board with foodpoint and promoting local farmers!</p><br><hr><br><p>date: 11/11/11</p><br><hr><br><p>location: lat lng </p><br><hr><br>');
		email.addHeader('X-Sent-Using', 'SendGrid-API');
		email.addHeader('X-Transport', 'web');

		sendgrid.send(email, function(err, json) {
		if (err) { return console.error(err); }
			console.log(json);
		}); 

	}
}


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('newPost');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


