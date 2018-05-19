require("dotenv").config();

var Twitter = require('twitter')
var Spotify = require("node-spotify-api")
var request = require("request")
var keys = require('./keys.js')
var fs = require('fs')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var mediaInput = process.argv[3];

if (command === "my-tweets") {
    getTweets();
    //print last twenty tweets
} else if (command === "spotify-this-song"){
    getSong(mediaInput);
    //get the requested song
} else if (command === "movie-this"){
    getMovie(mediaInput);
    //get movie information from OMDB
} else if (command === "do-what-it-says"){
    doIt();
    //do some shit
} else {
    console.log("Hello, my name is LIRI. What would you like me to do?")
}



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

function getSong (mediaInput){
 
    spotify.search({ type: 'track', query: mediaInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].album.name);
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].external_urls.spotify);
      });
 
 }
 

function getMovie (mediaInput){
    var queryURL = "http://www.omdbapi.com?apikey=trilogy&t=" + mediaInput
    request(queryURL, function (error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
          }else{
            var movie = JSON.parse(body);
            console.log(movie.Ratings);
            console.log(`
            Title: ${movie.Title}
            Year of Release: ${movie.Year}
            IMDB Rating: ${movie.imdbRating}
            Rotten Tomatoes: ${movie.Ratings[1].Value}
            Produced in: ${movie.Country}
            Language: ${movie.Language}
            Plot: ${movie.Plot}
            Actors: ${movie.Actors}
            `);
          }
    });
}

function doIt(){
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
        getSong(txt[1]);
      });
}
