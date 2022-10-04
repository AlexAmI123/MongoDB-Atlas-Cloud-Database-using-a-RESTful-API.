module.exports = (app) => {
    const clients = require('../controllers/clients.controllers.js');
    const sessions = require('../controllers/sessions.controllers.js');
    const therapists = require('../controllers/therapists.controllers.js');
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //clients
    // Default message for /
    app.get('/', clients.root);

    // Create a new client
    app.post('/clients', clients.create);

    // Retrieve all clients
    app.get('/clients', clients.findAll);

    // Retrieve a single client specified by userId
    app.get('/clients/:userId', clients.findOne);

    // Update a client specified by userId
    app.put('/clients/:userId', clients.update);

    // Delete a client specified by userId
    app.delete('/clients/:userId', clients.delete);

    // Search for clients matching s
    app.get('/clients/firstname/:s', clients.searchFirstname); 
    app.get('/clients/lastname/:s', clients.searchLastname); 

    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //therapists
    // Create a new therapist
    app.post('/therapists', therapists.create);

    // Retrieve all therapists
    app.get('/therapists', therapists.findAll);

    // Retrieve a single therapist specified by userId
    app.get('/therapists/:userId', therapists.findOne);

    // Update a therapist specified by userId
    app.put('/therapists/:userId', therapists.update);

    // Delete a therapist specified by userId
    app.delete('/therapists/:userId', therapists.delete);

    // Search for therapist matching s
    app.get('/therapists/firstname/:s', therapists.searchFirstname); 
    app.get('/therapists/lastname/:s', therapists.searchLastname); 
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    //sessions
    // Create a new session
    app.post('/sessions', sessions.create);

    // Retrieve all sessions
    app.get('/sessions', sessions.findAll);

    // Retrieve a single session specified by sessionId
    app.get('/sessions/:userId', sessions.findOne);

    // Update a session specified by sessionId
    app.put('/sessions/:userId', sessions.update);

    // Delete a session specified by sessionId
    app.delete('/sessions/:userId', sessions.delete);
}