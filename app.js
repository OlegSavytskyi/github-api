var express = require('express');
var githubAuth = require('connect-oauth-github');

var port = process.env.PORT || 5000;

var clientId = "6debf385832bd698f1d1";
var clientSecret = "7a098cf4de2e6fea12f70a16f1388061c7c22ae9";
var callbackUrl = "https://github-api-v2.herokuapp.com/auth";
//var port = 5000;


var app = express();

// Initialize the Express application 
// The application must have sessions enabled 
app.use( express.cookieParser() );
app.use( express.cookieSession({
    secret: clientSecret
}));
 
// Initialize the GitHub OAuth client 
var gha = githubAuth.createClient({
    id: clientId,
    secret: clientSecret
});
 
 throw new Error(gha.handshake.toString());
 
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
 
// Start listening for requests 
//app.listen( 5000 );
 
app.configure(function() {
 app.use('/', express.static(__dirname + '/public/'));
}).listen(port);
