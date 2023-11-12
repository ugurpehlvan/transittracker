// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');

// Import your route schema
const Route = require('./models/Route');

// Initialize the express application
const app = express();

// Enable CORS with various options
app.use(cors());

// Body parser middleware
app.use(express.json());

// Initialize HTTP Server for Socket.IO
const server = http.createServer(app);

// Initialize socket.io on the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
}});

// Connect to MongoDB
mongoose.connect('mongodb+srv://ugurpehlivan:nBUg2rUCZwL7CYbT@cluster0.08uo7kp.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the RESTful API routes
app.get('/api/routes', (req, res) => {
  Route.find()
    .then(routes => res.json(routes))
    .catch(err => res.status(404).json({ noroutesfound: 'No routes found' }));
});

app.get('/api/routes/:id', (req, res) => {
  Route.findById(req.params.id)
    .then(route => res.json(route))
    .catch(err => res.status(404).json({ noroutefound: 'No route found with that ID' }));
});

// Function to generate random coordinates in San Jose, California
const generateRandomCoordinates = () => {
  // San Jose approximate bounds
  const latMin = 37.1245;
  const latMax = 37.5485;
  const lngMin = -122.2654;
  const lngMax = -121.5891;

  const lat = Math.random() * (latMax - latMin) + latMin;
  const lng = Math.random() * (lngMax - lngMin) + lngMin;
  
  return { lat, lng };
};

// Function to generate a route with 15 random points
const generateRoute = () => {
  const points = Array.from({ length: 15 }, () => generateRandomCoordinates());
  return { points };
};

// Create 5 routes when the server initially starts
const createInitialRoutes = async () => {
  try {
    const numberOfRoutes = 5;
    const routes = Array.from({ length: numberOfRoutes }, generateRoute);
    await Route.insertMany(routes);
    console.log('Initial routes created successfully');
  } catch (error) {
    console.error('Error creating initial routes:', error);
  }
};

createInitialRoutes();

io.on('connection', (socket) => {
  console.log('New client connected');

  let currentRouteIndex = 0; // Keep track of the current route being used

  const sendLocationUpdate = async () => {
    try {
      const routes = await Route.find();
      
      if (routes.length === 0) {
        console.log('No routes found');
        return;
      }

      // Get the current route
      const currentRoute = routes[currentRouteIndex];
      
      // Get the next set of coordinates from the current route
      const nextCoordinates = currentRoute.points;

      // const locationData = {
      //   routeId: currentRoute._id, // Use the route ID from MongoDB
      //   coordinates: nextCoordinates,
      // };

      // send each coordinate one by one to the client with 1 second interval
      nextCoordinates.forEach((coordinate, index) => {
        setTimeout(() => {
          const locationData = {
            routeId: currentRoute._id, // Use the route ID from MongoDB
            coordinates: coordinate,
          };
          socket.emit('locationUpdate', locationData);
        }, 2000 * index);
      });
      

      // socket.emit('locationUpdate', locationData);

      // Update the currentRouteIndex for the next iteration
      currentRouteIndex = (currentRouteIndex + 1) % routes.length;
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const locationUpdateInterval = setInterval(sendLocationUpdate, 28000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(locationUpdateInterval);
  });
});

// Define the PORT
const PORT = process.env.PORT || 5001;

// Run the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
