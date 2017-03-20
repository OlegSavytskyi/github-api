var express = require('express');
//var githubAuth = require('connect-oauth-github');

var port = process.env.PORT || 5000;

var clientId = "6debf385832bd698f1d1";
var clientSecret = "7a098cf4de2e6fea12f70a16f1388061c7c22ae9";
var callbackUrl = "https://github-api-v2.herokuapp.com/auth";
//var port = 5000;

var app = express();

var githubOAuth = require('github-oauth')({
  githubClient: clientId,
  githubSecret: clientSecret,
  baseURL: "https://github-api-v2.herokuapp.com/",
  loginURI: '/login',
  callbackURI: '/auth',
  scope: 'user' // optional, default scope is set to user 
})

app.get('/auth', function (req, res) {
   return githubOAuth.callback(req, res)
});

app.get('/login', function (req, res) {
   return githubOAuth.login(req, res)
});

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})

app.use(express.cookieParser());
 
githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token)
  //serverResponse.cookie('connect.sess', token);
  var cookie = token.cookies.cookieName;
  serverResponse.cookie('user_session', cookie);
  serverResponse.redirect('https://github-api-v2.herokuapp.com/');
  //serverResponse.send(JSON.stringify(token))
  //serverResponse.cookie('connect.sess', JSON.stringify(token));
})

/* var githubOAuth = require('github-oauth')({
  githubClient: clientId,
  githubSecret: clientSecret,
  baseURL: "https://github-api-v2.herokuapp.com/",
  loginURI: '/login',
  callbackURI: '/auth',
  scope: 'user' // optional, default scope is set to user 
})
 
require('http').createServer(function(req, res) {
  if (req.url.match(/login/)) return githubOAuth.login(req, res)
  if (req.url.match(/auth/)) return githubOAuth.callback(req, res)
}).listen(port)
 
githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})
 
githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token)
  serverResponse.end(JSON.stringify(token))
}) */

 		
// now go to http://localhost/login 

app.configure(function() {
 app.use('/', express.static(__dirname + '/public/'));
}).listen(port); 
