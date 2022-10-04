const Client = require('../models/client.model.js');
/*  == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.root = (req, res) => {
    Client.find()
    .then(clients => {
        res.render('app_view',{
            results: clients
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all clients."
        });
    });
};


//create a new Client and save to the database
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.firstname || !req.body.lastname|| !req.body.mobile|| !req.body.email || !req.body.add1 || !req.body.town || !req.body.countycity || !req.body.dob || !req.body.parentguardian || !req.body.plmphoneemail || !req.body.gender || !req.body.maritalstatus) {
        return res.status(400).send({
            message: "Clients content cannot be empty!"
        });
    }


    // Create a new Client (using schema)
    const clients = new Client({
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email:req.body.email,
        add1:req.body.add1,
        add2:req.body.add2,
        town:req.body.town,
        countycity:req.body.countycity,
        eircode:req.body.eircode,
        dob:req.body.dob,
        parentguardian: req.body.parentguardian,
        plmphoneemail: req.body.plmphoneemail,
        gender: req.body.gender,
        maritalstatus: req.body.maritalstatus,
        referer: req.body.referer
    });

    // Save Client in the database
    clients.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the clients."
        });
    });
};


//Return all Client in the database
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all clients."
        });
    });
};


//Return one Client by userId
exports.findOne = (req, res) => {
    Client.findById(req.params.userId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Client with id " + req.params.userId
        });
    });
};


//update Client identified by userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Client content cannot be empty"
        });
    }

    // Find the Client and update it with the request body
    Client.findByIdAndUpdate(req.params.userId, {
        title: req.body.title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email:req.body.email,
        add1:req.body.add1,
        add2:req.body.add2,
        town:req.body.town,
        countycity:req.body.countycity,
        eircode:req.body.eircode,
        dob:req.body.dob,
        parentguardian: req.body.parentguardian,
        plmphoneemail: req.body.plmphoneemail,
        gender: req.body.gender,
        maritalstatus: req.body.maritalstatus,
        referer: req.body.referer
    }, 
       { new: true })  // "new: true" return updated object
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Client not found with id " + req.params.userId
        });
    });
};


//delete a Client identified by userId
exports.delete = (req, res) => {
    console.log("got to here");
    Client.findByIdAndRemove(req.params.userId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Client with id " + req.params.userId
        });
    });
};


//search for Client by first name
exports.searchFirstname = (req, res) => {
    var search = req.params.s;
    console.log("Searching clients: "+search)
    Client.find({ firstname: new RegExp(search,"ig")})
    .then(clients => {
        res.render('app_view',{
            results: clients
        });
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all clients."
        });
    });
};

//search for Client by last name
exports.searchLastname = (req, res) => {
    var search = req.params.s;
    console.log("Searching clients: "+search)
    Client.find({ lastname: new RegExp(search,"ig")})
    .then(clients => {
        res.render('app_view',{
            results: clients
        });
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all clients."
        });
    });
};