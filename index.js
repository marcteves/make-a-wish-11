// START HEROKU SETUP
var express = require("express");
var http = require("http");
var app = express();
app.get('/', function(req, res){ res.send('The robot is happily running.'); });
app.listen(process.env.PORT || 5000);
// END HEROKU SETUP


// Listbot config
//
// Config.keys uses environment variables so sensitive info is not in the repo.
var config = {
    me: 'MakeAWish_11_11', // The authorized account with a list to retweet.
    tweetmsgAM: "It's 11:11AM. Make a wish!",
    tweetmsgPM: "It's 11:11PM. Make a wish!",
    keys: {
        consumer_key: 'quwGEB6GsfqrBDibykrwR486g',
        consumer_secret: 'lNwuEtkTQdma47GBqZCOrovV5VATKw7WVlCbLeJ5tZZcKkpYND',
        access_token_key: '4825553844-E9btNFIHgh1ESiuiYLrwkmi0Zya1XWa9J6nlHKR',
        access_token_secret: 'YLwtswYQ4eKpDomrrz5PGKOK75ckkBMbSyMr0f2Z1CejZ'
    },
};

// What to do when it's time to make a wish!
function onEleven(when) {
  if (when == "AM"){
    tu.update({
      status: config.tweetmsgAM
    }, onTweet);
  } else if (when == "PM"){
    tu.update({
      status: config.tweetmsgPM
    }, onTweet);
  }
}

// What to do after we tweet something. Error handling stuffs.
function onTweet(err) {
    if(err) {
        console.error("tweeting failed :(");
        console.error(err);
    } else {
      console.log("tweet successful!");
    }
}

// Checks if the time is 11:11 using UTC time.
function checkTime(){
  var d = new Date();
  if (d.getUTCHours() + 8 == 23 && d.getUTCMinutes() == 40){
    onEleven("AM");
  } else if (d.getUTCHours() + 8 == 11 && d.getUTCMinutes() == 11){
    onEleven("PM");
  }
  console.log("ayyylamo");
}

// The application itself.
// Use the tuiter node module to get access to twitter.
var tu = require('tuiter')(config.keys);

//Checks if the time is 11:11 ever minute. Ideally, this will not skip over
//11:11 and make sure it doesn't post twice per 11:11. (Better solution soon.)
setInterval(checkTime, 60000);

setInterval(function() {
  http.get("https://immense-caverns-17058.herokuapp.com");
}, 300000);
