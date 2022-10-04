const mongoose = require('mongoose');

// create a mongoose schema for a Users
const ClientSchema = mongoose.Schema({
    title: String, enum:["Mx","Ms",	"Mr","Mrs","Miss","Dr","Other(specify)"],
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    add1: String,
    add2: String,
    town: String,
    countycity: String,
    eircode: String,
    dob: String,
    parentguardian: String,
    plmphoneemail: String,enum:["Y","N"],
    gender: String,
    maritalstatus: String,enum:["Never Married","Domestic Partnership","Married","Separated","Divorced","Widowed"],
    referer: String
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
        "countycity",
        "dob",
        "parentguardian",
        "plmphoneemail",
        "gender",
        "maritalstatus",
   ]
});
// export the model to our app
module.exports = mongoose.model('Clients', ClientSchema);