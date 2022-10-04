const Session = require('../models/session.model.js');
/*  == USER INTERFACE ADDITIONS == */
//create a new session and save to the database
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.date || !req.body.stime|| !req.body.clients|| !req.body.therapist || !req.body.fee || !req.body.sessionnumber || !req.body.sessionattendance || !req.body.sessiontype || !req.body.sessionnotes) {
        return res.status(400).send({
            message: "Session content cannot be empty!"
        });
    }


    // Create a new Therapist (using schema)
    const session = new Session({
        date: req.body.date,
        stime: req.body.stime,
        clients: req.body.clients,
        therapist: req.body.therapist,
        fee: req.body.fee,
        sessionnumber: req.body.sessionnumber,
        sessionattendance: req.body.sessionattendance,
        sessiontype: req.body.sessiontype,
        sessionnotes: req.body.sessionnotes
    });

    // Save session in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Sessions."
        });
    });
};


//Return all session in the database
exports.findAll = (req, res) => {
    Session.find()
    .then(sessions => {
        res.render('app_view',{
            results: sessions
          });
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};


//Return one session by sessionId
exports.findOne = (req, res) => {
    Session.findById(req.params.userId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });            
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Session with id " + req.params.userId
        });
    });
};


//update session identified by userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Session content cannot be empty"
        });
    }

    // Find the session and update it with the request body
    Session.findByIdAndUpdate(req.params.userId, {
        date: req.body.date,
        stime: req.body.stime,
        clients: req.body.clients,
        therapist: req.body.therapist,
        fee: req.body.fee,
        sessionnumber: req.body.sessionnumber,
        sessionattendance: req.body.sessionattendance,
        sessiontype: req.body.sessiontype,
        sessionnotes: req.body.sessionnotes
    }, 
       { new: true })  // "new: true" return updated object
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Session not found with id " + req.params.userId
        });
    });
};


//delete a session identified by userId
exports.delete = (req, res) => {
    console.log("got to here");
    Session.findByIdAndRemove(req.params.userId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Session with id " + req.params.userId
        });
    });
};