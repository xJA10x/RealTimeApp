const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const moment = require('moment');

// Builds idea Service
class IdeaService {

  constructor() {

    this.ideas = [];
    
  }

  // Builds ayncs function.
  // Returns ideas.
  async find() {
    return this.ideas;
  }

// Creates ideas.
// Takes one parameter,
// data from the client .
  async create(data) {

    // Builds object.
    const idea = {

      // Properties
      id: this.ideas.length,
      text: data.text,
      tech: data.tech,
      viewer: data.viewer

    };

    // Attachs time to the idea object.
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

// Parses response to JSON
app.use(express.json());
// Config Socket.io realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register services
app.use('/ideas', new IdeaService());

// New connections connect to stream channel
app.on('connection', conn => app.channel('stream').join(conn));
// Publish events to stream
app.publish(data => app.channel('stream'));

/// Litsens for request at a given port.
// Starts the server.
const PORT = process.env.PORT || 3030;

app.listen(PORT).on('listening', () =>

    console.log(`Realtime server running on port ${PORT}`)

  );

// Creates idea.
app.service('ideas').create({

  text: 'Build a cool app',
  tech: 'Node.js',
  viewer: 'John Doe'

});
