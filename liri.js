require("dotenv").config();

var Twitter = require('twitter')

var keys = require('./keys.js')

var client = new Twitter(keys.twitter);

function getTweets(){

    var params = {screen_name: 'datrudeboislay'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var normalized = []
        for ( var i=0; i < tweets.length; i++ ){
            //console.log(tweets[i].created_at)
            //console.log(tweets[i].text)
               normalized.push({
                    time: tweets[i].created_at,
                    text: tweets[i].text,
                })
            }
            console.log('NORMALIZED ===>', normalized)
        }
    })   
};



var command = process.argv[2];

if (command === "my-tweets") {
    getTweets();
    //print last twenty tweets
}

if (command === "spotify-this-song '<song name here>'"){
    getSong();
    //get the requested song
}

if (command === "movie-this '<movie name here>'"){
    getMovie();
    //get movie information from OMDB
}