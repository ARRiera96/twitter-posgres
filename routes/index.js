'use strict';
var express = require('express');
var router = express.Router();
// var tweetBank= require('./tweetBank');

module.exports = function makeRouterWithSockets (io, client) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    client.query('SELECT * FROM users INNER JOIN tweets on users.id=tweets.userid', function (err, result) {
  var allTheTweets = result.rows;
  console.log(result.rows);
  res.render('index', { title: 'Twitter.js', tweets: allTheTweets, showForm: true });
});
  }

// SELECT * FROM users
// INNER JOIN tweetson users.id=tweets.userid
//   // function respondWithAllTweets (req, res, next){
//   //   var allTheTweets = tweetBank.list();
//   //   res.render('index', {
//   //     title: 'Twitter.js',
//   //     tweets: allTheTweets,
  //     showForm: true
  //   });


  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){

    // var tweetsForName = tweetBank.find({ name: req.params.username });
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: tweetsForName,
    //   showForm: true,
    //   username: req.params.username
    // });

client.query('SELECT * FROM users INNER JOIN tweets on users.id=tweets.userid WHERE name=$1', [req.params.username], 
  function (err, data) {var tweetsForName=data.rows;
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: req.params.username})
  });

  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
  //   var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsWithThatId // an array of only one element ;-)
  
  client.query('SELECT * FROM users INNER JOIN tweets on users.id=tweets.userid WHERE Tweets.id=$1', [req.params.id], 
  function (err, data) {var tweetsForName=data.rows;
    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: null})  
    });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){
  //   var newTweet = tweetBank.add(req.body.name, req.body.text);
  //   io.sockets.emit('new_tweet', newTweet);
  //   res.redirect('/');
  // });
client.query('SELECT name FROM users WHERE name= $(1)',[req.body.name], function(err,data){
  if(err){
    //create this user and put him in. 
    client.query('INSERT INTO users (name) VALUES ($1))', [req.body.name])
  }

  client.query('INSERT INTO tweets (userId, content) VALUES ($1, $2)', [req.body.userid, req.body.text], function (err, data) {
    // var newTweet=data.rows;
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });


});


  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}