var express = require('express');
var githubAuth = require( "../../lib/oath" );
var port = process.env.PORT || 5000;
var app = express();

app.use( express.cookieParser() );
app.use( express.cookieSession({
    secret: "your secret goes here"
}));

// Initialize the GitHub OAuth client 
var gha = githubAuth.createClient({
    id: "your client id",
    secret: "your client secret"
});
 
// Add the route for the GitHub authorization callback 
// The path must match authorization callback URL for the GitHub application 
app.get( "/auth", gha.handshake );
 
// Create a route which requires authorization 
app.get( "/required", gha.authorize, function( request, response ) {
    var accessToken = gha.users[ request.sessionID ].accessToken;
    response.send( "Your access token is " + accessToken );
});
 
// Create a route with optional authorization 
app.get( "/optional", function( request, response ) {
    gha.isAuthorized( request, function( error, isAuthorized ) {
        if ( error ) {
            response.send( 500 );
        }
 
        var name = isAuthorized ?
            gha.users[ request.sessionID ].accessToken :
            "anonymous";
 
        response.send( "Hello, " + name );
    });
});


/* app.get('/test.html', function (req, res) {
  res.send('Hello World!');
}); 

app.get('/auth', function (req, res) {
  res.send(req);
  //Console.log(req);
}); */


 
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
}).configure(function() {
    app.use('/', express.static(__dirname + '/public/'));
}).listen(port);
