'use strict';

// load the mysql library
var mysql = require('promise-mysql');

// create a connection to our Cloud9 server
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root', // CHANGE THIS :)
    password : 'admin',
    database: 'reddit',
    connectionLimit: 10
});

// Load our API and pass it the connection
var RedditAPI = require('./reddit');

var myReddit = new RedditAPI(connection);



// We call this function to create a new user to test our API
// The function will return the newly created user's ID in the callback
/*
myReddit.createUser({
    username: 'PM_ME_CUTES',
    password: 'abc123'
})
    .then(newUserId => {
        // Now that we have a user ID, we can use it to create a new post
        // Each post should be associated with a user ID
        console.log('New user created! ID=' + newUserId);

        return myReddit.createPost({
            title: 'Hello Reddit! This is my first post',
            url: 'http://www.digg.com',
            userId: newUserId,
            subredditId: 1
        });
    })
    .then(newPostId => {
        // If we reach that part of the code, then we have a new post. We can print the ID
        console.log('New post created! ID=' + newPostId);
    })
    .catch(error => {
        console.log(error.stack);
    });

myReddit.createSubreddit({
    name: 'food',
    description: 'all you know about recipes, dishes, restaurants, etc'
})
    .then(newSubredditId => {
        // Now that we have a user ID, we can use it to create a new post
        // Each post should be associated with a user ID
        console.log('New subreddit created! ID=' + newSubredditId);
    });

*/
/*********************************************************************************************/
/*
Promise.all([
    myReddit.createUser({
        username: 'PM_ME_CUTES',
        password: 'abc123'
    }),
    myReddit.createSubreddit({
        name: 'food',
        description: 'all you know about recipes, dishes, restaurants, etc'
    })
])
    .then(data => {
        console.log('New user created! ID=' + data[0]);
        console.log('New subreddit created! ID=' + data[1]);

        return myReddit.createPost({
            title: 'Hello Reddit! This is my first post',
            url: 'http://www.digg.com',
            userId:  data[0],
            subredditId: data[1]
        });
    })
    .then(newPostId => {
        console.log('New post created! ID=' + newPostId);
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function () {
        connection.end();
    })
*/

/*********************************************/
/*

myReddit.getAllSubreddis().then(function (data) {
    console.log(data);
});
*/

/***************************************************/
/*
myReddit.createPost({
    title: 'Hello Reddit! This is my first post',
    url: 'http://www.digg.com',
    userId: 1
})
    .then(newPostId => {
    console.log('New post created! ID=' + newPostId);
})
    .catch(function(error) {
        console.log('Something went wrong' + error);
    })
    .then(function () {
        connection.end();
    })
*/

/***************************************************/

/*
myReddit.getAllPosts()
    .then(function (data) {

    var resultArray = data.map(function(post) {

        var formattedResult = {
            id: post.postId,
            title: post.title,
            url: post.url,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: {
                userId: post.userId,
                username: post.username,
                createdAt: post.userCreatedAt,
                updatedAt: post.userUpdatedAT
            }
        };

        return formattedResult;
    });
    return resultArray;
})
    .then(function (result) {
        console.log(result)
        connection.end();
    });

*/

/*
myReddit.createVote({
    postId: 2,
    userId: 1,
    voteDirection: 1
})
    .then(vote => {
        console.log('New voted registered! ID: ' + newPostId);
    })
    .then(function (result) {
        connection.end();
    });
*/

/*
myReddit.createUser({
    username: 'ANTONIO',
    password: 'mypass'
})
    .then(newUserId => {
        // Now that we have a user ID, we can use it to create a new post
        // Each post should be associated with a user ID
        console.log('New user created! ID=' + newUserId);
    });

 */

/*
myReddit.getAllPosts()
    .then(function (data) {
        console.log(data);
    })
    .then(function () {
        connection.end();
    });

*/
/*
myReddit.createPost({
    subredditId: 10,
    userId: 5,
    title: 'Do not waist your money on this',
    url: 'just a test'
});
*/

/*
myReddit.createdComment({

    userId: 3,
    postId: 2,
    //parentId: 1,
    text: 'This is so funny, I cannot stop laughing'
})
    .then(newPostId => {
        console.log('New comment has benn made! ID=' + newPostId);
    })
    .catch(function(error) {
        console.log('Something went wrong' + error);
    })
    .then(function () {
        connection.end();
    });
*/

var arrayOfComments [];
myReddit.getCommentsForPost(2).then(function (data) {

    for (var i= 0; i < data.length; i++) {

        var obj {};



    } // for ends


})
.then(function () {
    connection.end();
});
