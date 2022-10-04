const mongoose = require('mongoose');

// create a mongoose schema for a Phones
const SessionSchema = mongoose.Schema({
    date: String,
    stime: String,
    clients: String,
    therapist: String,
    fee: String,
    sessionnumber: String,
    sessionattendance: String,enum:["Attended",	"Cancelled", "No Show"],
    sessiontype: String,enum:["Intake","Psychotherapy","Assessment","Other(specify)"],
    sessionnotes: String,
}, {
    timestamps: true,
    required:[  
        "date",
        "stime",
        "clients",
        "therapist",
        "fee",
        "sessionnumber",
        "sessionattendance",
        "sessiontype",
        "sessionnotes",
   ]
});
// export the model to our app
module.exports = mongoose.model('Sessions', SessionSchema);