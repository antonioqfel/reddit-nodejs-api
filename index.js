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

// load the express library
var express = require('express');
var app = express();


// Set Express to use the Pug engine
app.set('view engine', 'pug');

// load the parser library
var bodyParser = require('body-parser');

// Serving static files in Express
app.use('/files', express.static('static_files'));

// Exercise 1
app.get('/', function (request, response) {
    response.send('Hello World!');
});

// Exercise 2
app.get('/hello', function (request, response) {
    if(request.query.name) {
        response.send(`<h1>Hello ${request.query.name}</h1>`);
    }
    else {
        response.send('<h1>Hello World</h1>');
    }
});

// Exercise 3
app.get('/calculator/:operation', function (request, response) {
    var num1 = request.query.num1;
    var num2 = request.query.num2;
    var total = 0;

    if (num1 === undefined || num1 === null) {
        num1 = 0
    }
    if (num2 === undefined || num2 === null) {
        num2 = 0;
    }

    if(request.params.operation === 'add' || request.params.operation === 'multiply') {

        if (request.query.operation === 'add') {
            total = num1 + num2;
        }
        else {
            total = num1 * num2;
        }

        response.send(`{
        "operation": ${request.params.operation},
        "firstOperand": ${num1},
        "secondOperand": ${num2},
        "solution": ${total}
        }`);
    }
    else {
        result.status();
    }
});

// Exercise 4
app.get('/posts', function (request, response) {

    myReddit.getAllPosts().then(function (data) {

        response.render('post-list', {posts: data});

    });
});


// Exercise 5
app.get('/new-post', function (request, response) {

    response.render('create-content');
});

// Exercise 6

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/createPost', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    else {
        myReddit.createPost({
            title: request.body.title,
            url: request.body.url,
            userId: 1,
            subredditId: 3
        });

        response.send('Post has been created');
    }
});



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(3333, function () {
    console.log('Web server is listening.');
});