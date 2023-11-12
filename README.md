# TransitTrackr

## Project Overview and Task
TransitTrackr is a real-time public transport tracking web application that allows users to view and track the live locations of public transportation vehicles on a map. This application focuses on the San Jose, California area and simulates vehicle movement by generating routes with random coordinates.

## Deliverables:
  - Create 5 routes comprising 15 points each using the `generateRandomCoordinates` method, and save them to static code or to MongoDB, as in the `backend.js`. Once done, develop an application that shows the live location of public transport vehicles (like buses or trains) on a map.
  - Documentation, including setup instructions, API endpoints, and WebSocket events.

## Additional Notes:
Security considerations such as HTTPS, CORS policy, and WebSocket security must be addressed.
Scalability should be considered - how the app will handle a large number of concurrent users.
The UI should be responsive, providing a seamless experience on desktop and mobile devices.

---

## Features
- **Real-time Location Updates:** Display live, simulated locations of vehicles on a map.
- **Route Information:** View routes generated with random coordinates.
- **Interactive Map:** Utilize an interactive map to track transport movements.
- **WebSocket Integration:** Real-time updates facilitated through WebSocket connections.

## Tech Stack
- **Frontend:** React.js, Leaflet.js/Google Maps API, Styled-Components/Sass, Jest, Cypress
- **Backend:** Node.js, Express.js, Socket.IO, MongoDB, Mocha, Chai
- **DevOps:** Docker, Jenkins/GitHub Actions, NGINX
- **Others:** Git, npm/Yarn, ESLint, Prettier

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB
- Git

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repository/TransitTrackr.git
   cd TransitTrackr
   ```
2. **Install Node.js dependencies:**
   ```sh
   npm install
   ```
3. **Set up MongoDB:**
   - Ensure MongoDB is running on your machine.
   - Create a database named `transittrackr`.

4. **Start the server:**
   ```sh
   npm start
   ```
   This will start the Node.js server on `localhost:5000` and create an initial route with random coordinates.

5. **Running the Frontend:**
   - Navigate to the frontend directory.
   - Install dependencies and start the React application as per the frontend README instructions.

## Using the Application
- Open the application in a web browser.
- Real-time vehicle movement is simulated using random coordinates in the San Jose area.
- You can view different routes, each generated with random waypoints.

## WebSocket Communication
- Upon loading the application, a WebSocket connection is established.
- Real-time location data is sent from the server to the client at regular intervals.

## RESTful API Endpoints
- `GET /api/routes`: Retrieve a list of all routes.
- `GET /api/routes/{id}`: Get detailed information about a specific route.

## Contributing
Contributions to the project are welcome! Please follow the standard fork and pull request workflow.

## License
This project is licensed under the [MIT License](LICENSE.md).

## Contact
- Project Link: [https://github.com/your-repository/TransitTrackr](https://github.com/your-repository/TransitTrackr)

---

This README provides a comprehensive overview of the project, including its features, tech stack, setup instructions, and usage. Make sure to replace the placeholder URLs and instructions with actual details relevant to your project.
