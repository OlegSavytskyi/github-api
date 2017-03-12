var express = require('express');
var port = process.env.PORT || 5000;
var app = express();

app.get('/test.html', function (req, res) {
  res.send('Hello World!');
}); 

app.get('/auth', function (req, res) {
  res.send();
});
 
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
}).configure(function() {
    app.use('/', express.static(__dirname + '/public/'));
}).listen(port);
