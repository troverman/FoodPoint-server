var express = require('express')
var app = express();
var Firebase = require("firebase");

var baseURL = "https://shining-heat-3529.firebaseio.com/";
var rootRef = new Firebase(baseURL);
var marketsRef = rootRef.child('markets');
var requestRef = rootRef.child('requests');


// watch for new markets
marketsRef.orderByKey().on("child_added", function(snapshot) {	
	var marketInfo = snapshot.val();
	//console.log(marketInfo);

	console.log(marketInfo.date);
	console.log(marketInfo.lon);

	var marketRef = marketsRef.child(snapshot.key());
	var sellerList = marketInfo.sellers;
	var buyers = marketInfo.buyers;

	if(Object.size(sellerList) >= 5) {
		var emailed = snapshot.val().emailed;
		if(emailed == "no"){
			sendMail(buyers, marketInfo);
			marketRef.update({
				"emailed": "yes"
			});
			console.log("email sent");
		}
	}	
});

// watch for change in markets
marketsRef.orderByKey().on("child_changed", function(snapshot) {
	var marketInfo = snapshot.val();
	//console.log(marketInfo);

	var marketRef = marketsRef.child(snapshot.key());
	var sellerList = marketInfo.sellers;
	var buyers = marketInfo.buyers;

	if(Object.size(sellerList) >= 5) {
		var emailed = snapshot.val().emailed;
		if(emailed == "no"){
			sendMail(buyers, marketInfo);
			marketRef.update({
				"emailed": "yes"
			});
			console.log("email sent");
		}
	}
}); 

// watch for change in currentRequest
requestRef.orderByKey().on("child_changed", function(snapshot) {
	var request = snapshot.val();
	console.log(request);
	//console.log(marketInfo);

	var sendgrid_username = 'troverman';
	var sendgrid_password = 'trev77922';
	var to = request.email;
	var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
	var email = new sendgrid.Email();
	email.addTo(to);
	email.setFrom('troverman@gmail.com');
	email.setSubject('Foodpoint');
	email.setHtml('<h2>Hey ' + request.name + ',</h2><p>Glad you\'re on board with Foodpoint and promoting local farmers! We\'ll let you know when ' + request.nameOfMarket + ' is open!</p><br>');
	email.addHeader('X-Sent-Using', 'SendGrid-API');
	email.addHeader('X-Transport', 'web');

	sendgrid.send(email, function(err, json) {
	if (err) { return console.error(err); }
		console.log(json);
	}); 



}); 


Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
}; 


function sendMail(buyers, market){
	// run through buyer list
	for(key in buyers) {
		var toEmail = buyers[key]['email'];
	
		var sendgrid_username = 'troverman';
		var sendgrid_password = 'trev77922';
		var to = toEmail;
		var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
		var email = new sendgrid.Email();
		email.addTo(to);
		email.setFrom('troverman@gmail.com');
		email.setSubject('Foodpoint');
		email.setHtml('<p>Glad you\'re on board with Foodpoint and promoting local farmers! The Durham Farmer\'s Market is happening!</p><br><hr><br><p>Date: ' + market.date + '</p><br><hr><br><p>Location: lat: ' + market.lat + ' long:' + market.lon + '  </p><br><hr><br>');
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


