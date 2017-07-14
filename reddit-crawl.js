'use strict';

// Load the request-promise library
var request = require('request-promise');

// Load the mysql library
var mysql = require('promise-mysql');

// Load our API and pass it the connection
var RedditAPI = require('./reddit');

function getSubreddits() {
    return request('https://www.reddit.com/.json')
        .then(response => {
            // Parse response as JSON and store in variable called result
            var result = JSON.parse(response);

            // Use .map to return a list of subreddit names (strings) only
            return result.data.children.map(function(subreddit) {
                var nameSubreddit = subreddit.data.subreddit;

                return nameSubreddit;

            });
        });
}

/*
getSubreddits().then(function (data) {
    console.log(data);
});*/

function getPostsForSubreddit(subredditName) {
    return request(`https://www.reddit.com/r/${subredditName}.json`)
        .then(
            response => {
                // Parse the response as JSON and store in variable called result
                var result = JSON.parse(response);


                return result.data.children

                    .filter(function(subreddit) { // Use .filter to remove self-posts

                        return subreddit.data.is_self === false;
                    })

                    .map(function(subreddit) { // Use .map to return title/url/user objects only

                        var mappedResult = {
                            title: subreddit.data.title,
                            url: subreddit.data.url,
                            user: subreddit.data.author
                        };
                        return mappedResult;
                    } );

            }
        );
}

/*
getPostsForSubreddit('StarWars').then(function (data) {
    console.log(data);
});
*/

function crawl() {
    // create a connection to the DB
    var connection = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database: 'reddit',
        connectionLimit: 10
    });

    // create a RedditAPI object. we will use it to insert new data
    var myReddit = new RedditAPI(connection);

    // This object will be used as a dictionary from usernames to user IDs
    var users = {};

    /*
     Crawling will go as follows:
        1. Get a list of popular subreddits
        2. Loop thru each subreddit and:
            a. Use the `createSubreddit` function to create it in your database
            b. When the creation succeeds, you will get the new subreddit's ID
            c. Call getPostsForSubreddit with the subreddit's name
            d. Loop thru each post and:
                i. Create the user associated with the post if it doesn't exist
                ii. Create the post using the subreddit Id, userId, title and url
     */


    // Get a list of subreddits
    getSubreddits()
        .then(subredditNames => {
            subredditNames.forEach(subredditName => {
                var subId;
                myReddit.createSubreddit({name: subredditName})
                    .then(subredditId => {
                        subId = subredditId;
                        return getPostsForSubreddit(subredditName)
                    })
                    .then(posts => {
                        posts.forEach(post => {
                            var userIdPromise;
                            if (users[post.user]) {
                                userIdPromise = Promise.resolve(users[post.user]);
                            }
                            else {
                                userIdPromise = myReddit.createUser({
                                    username: post.user,
                                    password: 'abc123'
                            })
                            .catch(function(err) {
                                    return users[post.user];
                                })
                            }

                            userIdPromise.then(userId => {
                                users[post.user] = userId;
                                return myReddit.createPost({
                                    subredditId: subId,
                                    userId: userId,
                                    title: post.title,
                                    url: post.url
                                });
                            });
                        });
                    });
            });
        });
}

//crawl();
