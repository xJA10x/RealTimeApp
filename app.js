
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');

// Builds services.
// Idea services.
class IdeaService {

  // Builds constructor.
  constructor() {

    // Initializes to an empty array.
    this.ideas = [];

  }

  // Builds async function.
  // Returns ideas.
  async find() {

    return this.ideas;

  }


  // Creates ideas.
  // Takes one parameter,
  // data from the client.
  async create(data) {

    // Builds object.
    const idea = {

      // Properties.
      id: this.ideas.length,
      text: data.text,
      tech: data.tech,
      viewer: data.viewer

    };

    // Attachs time to the ida object.
    idea.time = moment().format('h:mm:ss a');

    // Pushes new idea to the ideas array.
    this.ideas.push(idea);

    return idea;

  }

}

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
 app.configure(express.rest());
 // Register service.
 app.use('/ideas', new IdeaService());

 // New connections connect to stream channel.
 // Connects to channel.
 app.on('connection', conn => app.channel('stream').join(conn))
 // Publish events to stream.
 // Takes one parameter,
 // a function.
 app.publish(data => app.channel('stream'));

 // Initiliazes variable.
 const PORT = process.env.PORT || 3030;

 // Litsens for request at a given port.
 // Starts the server.
 app.listen(PORT).on('listening', () =>

   console.log(`Realtime server running on port ${PORT}`)

 )

 // Creates idea.
 // Takes one parameter,
 // idea to create.
 app.service('ideas').create({

   text: 'Builds a cool app',
   tech: 'Node.js',
   viewer: 'Jowy',
   time: moment().format('h:mm:ss a')

});
