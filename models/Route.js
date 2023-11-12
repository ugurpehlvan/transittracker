const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    points: [
        {
          lat: Number,
          lng: Number,
        },
      ],
});

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;