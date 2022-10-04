const Therapist = require('../models/therapist.model.js');
/*  == USER INTERFACE ADDITIONS == */
//create a new Therapist and save to the database
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.firstname || !req.body.lastname|| !req.body.mobile|| !req.body.email || !req.body.add1 || !req.body.town || !req.body.countycity) {
        return res.status(400).send({
            message: "Therapist content cannot be empty!"
        });
    }


    // Create a new Therapist (using schema)
    const therapist = new Therapist({
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email:req.body.email,
        add1:req.body.add1,
        add2:req.body.add2,
        town:req.body.town,
        countycity:req.body.countycity,
        eircode:req.body.eircode
    });

    // Save Therapist in the database
    therapist.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Therapist."
        });
    });
};


//Return all therapist in the database
exports.findAll = (req, res) => {
    Therapist.find()
    .then(therapists => {
        res.render('app_view',{
            results: therapists
          });
        res.send(therapists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
        });
    });
};


//Return one therapist by userId
exports.findOne = (req, res) => {
    Therapist.findById(req.params.userId)
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });            
        }
        res.send(therapist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Therapist with id " + req.params.userId
        });
    });
};


//update therapist identified by userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Therapist content cannot be empty"
        });
    }

    // Find the therapist and update it with the request body
    Therapist.findByIdAndUpdate(req.params.userId, {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email:req.body.email,
        add1:req.body.add1,
        add2:req.body.add2,
        town:req.body.town,
        countycity:req.body.countycity,
        eircode:req.body.eircode
    }, 
       { new: true })  // "new: true" return updated object
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });
        }
        res.send(therapist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Therapist not found with id " + req.params.userId
        });
    });
};


//delete a therapist identified by userId
exports.delete = (req, res) => {
    console.log("got to here");
    Therapist.findByIdAndRemove(req.params.userId)
    .then(therapist => {
        if(!therapist) {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });
        }
        res.send({message: "Therapist deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Therapist not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Therapist with id " + req.params.userId
        });
    });
};


//search for therapist by first name
exports.searchFirstname = (req, res) => {
    var search = req.params.s;
    console.log("Searching therapists: "+search)
    Therapist.find({ firstname: new RegExp(search,"ig")})
    .then(therapists => {
        res.render('app_view',{
            results: therapists
          });
        res.send(therapists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
        });
    });
};

//search for therapist by last name
exports.searchLastname = (req, res) => {
    var search = req.params.s;
    console.log("Searching therapists: "+search)
    Therapist.find({ lastname: new RegExp(search,"ig")})
    .then(therapists => {
        res.render('app_view',{
            results: therapists
          });
        res.send(therapists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Therapists."
        });
    });
};