var express = require('express')
var app = express();


var myFirebaseRef = new Firebase("https://shining-heat-3529.firebaseio.com/");

//myFirebaseRef.child("buyers").on("value", function(snapshot) {
    //alert(snapshot.val()); // Alerts "San Francisco"
//});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('test')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
