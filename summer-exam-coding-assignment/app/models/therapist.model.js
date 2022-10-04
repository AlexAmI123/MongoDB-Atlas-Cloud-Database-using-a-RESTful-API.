const mongoose = require('mongoose');

// create a mongoose schema for a Orders
const TherapistSchema = mongoose.Schema({
    title: String, enum:["Mx","Ms",	"Mr","Mrs","Miss","Dr","Other(specify)"],
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    add1: String,
    add2: String,
    town: String,
    countycity: String,
    eircode: String
}, {
    timestamps: true,
    required:[  
        "title",
        "firstName",
        "lastName",
        "phone",
        "email",
        "add1",
        "town",
        "countycity"
   ]
});
// export the model to our app
module.exports = mongoose.model('Therapists', TherapistSchema);