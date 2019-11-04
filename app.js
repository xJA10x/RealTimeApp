
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');


// Builds services.
// Idea services.


 // Initializes express app.
 // Takes one parameter,
 // integrates feathersjs with express.
 const app = express(feathers());

 // Adds middleware.
 // Parse Json.
 app.use(express.json());
 // Configures Socket.io realtime API.
 app.configure(socketio());
 // Enables REST services.
 app.configure(express.res());
 // Register service.
 app.use('/ideas', new IdeaService());

 // New connections connect to stream channel.
 // Connects to channel.
 app.on('connection', conn > app.channel('stream').join(conn))
 // Publish events to stream.
 // Takes one parameter,
 // a function.
 app.publish(data => app.channel('stream'));

 // Initiliazes variable.
 const PORT = processs.env.PORT || 3030;

 // Litsens for request at a given port.
 app.listen(PORT).on('listening', () =>

   console.log(`Realtime server running on port $ {PORT}`)

 )
