/* 
Author : Alex Majka 20429324
Written up on the most recent version of Brackets.
tested using nodejs with MongoDB Atlas

Windows 10
Chrome: Version 101.0.4951.54 (Official Build) (64-bit)
Based off John Keating's demo files for week 11 and my own assignment-06 submission

The front end was very difficult for me to fix and troubleshoot therefore it's very iffy, the back end is fully functional but the front end is only partially done.
*/

/*  == USER INTERFACE ADDITIONS == */
const express = require('express');         // we're making an ExpressJS App
const bodyParser = require('body-parser');  // we'll use body-parser extensively
/*  == USER INTERFACE ADDITIONS == */


const app = express();                      // create the ExpressJS app

const hbs = require('hbs');                 // use hbs view engine
const path = require('path');               // use the path module (for views)

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // pplication/x-www-form-urlencoded



/*  == USER INTERFACE ADDITIONS == */
app.set('views',path.join(__dirname,'views'));              // set the views directory
app.set('view engine', 'hbs');                              // set the view engine to hbs
app.use('/assets',express.static(__dirname + '/public'));   // set public folder as "static" for static files
/*  == USER INTERFACE ADDITIONS == */



// Set up Mongoose and our Database connection
const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');

// Set up connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

require('./app/routes/app.routes.js')(app);

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
/*
Database Design:
I designed this db by using 3 different collections; clients, therapists and sessions. These all correspond with eachother. The sessions collection is the connection point of the other two collections
I assigned id's to all elements in the collections so that they can be queried with no hassle.
*/