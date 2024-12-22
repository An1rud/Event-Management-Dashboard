# Event Manager Application

A modern web application for managing events, tasks, and attendees. Built with React, Node.js, Express, and MongoDB.

## Overview
The Event Manager Application is a web application designed to help users manage events and attendees efficiently. It provides a user-friendly interface for creating, updating, and deleting events and attendees, along with various functionalities to enhance the overall experience.

## Features

- 🎉 Event Management: Create, update, and delete events
- ✅ Task Management: Assign and track tasks for each event
- 👥 Attendee Management: Manage event participants
- 🔐 User Authentication: Secure login and registration
- 🌙 Dark Theme: Beautiful dark-themed UI with modern design

## Technologies Used
- **Frontend**: 
  - React
  - Material-UI
  - Axios for HTTP requests
  - React Toastify for notifications
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication

## Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/An1rud/Event-Management-Dashboard.git
cd Event-Management-Dashboard
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

## Configuration

1. Create a `.env` file in the server directory:
```bash
cd server
```

2. Add the following environment variables to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/eventmanager
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Replace `your_jwt_secret_key` with a secure random string.

## Running the Application

1. Start MongoDB service (if not already running)

2. Start the backend server:
```bash
cd server
node server.js
```
The backend will run on http://localhost:5000

3. In a new terminal, start the frontend development server:
```bash
cd client
npm start
```
The frontend will run on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Register a new account or login with existing credentials
3. Navigate through the application using the navbar:
   - Events: Manage your events
   - Tasks: Create and track tasks
   - Attendees: Manage event participants

## Project Structure

```
Hackathon/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── App.js        # Main application component
│       └── index.js      # Entry point
├── server/                # Backend Node.js application
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Events
- GET /api/events - Get all events
- POST /api/events - Create new event
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event

### Tasks
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

### Attendees
- GET /api/attendees - Get all attendees
- POST /api/attendees - Add new attendee
- PUT /api/attendees/:id - Update attendee
- DELETE /api/attendees/:id - Delete attendee

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB service is running
   - Check MONGODB_URI in .env file
   - Verify MongoDB is installed correctly

2. **Port Already in Use**
   - Kill all Node processes:
     - Windows: `taskkill /F /IM node.exe`
     - Linux/Mac: `killall node`
   - Try different ports in .env file

3. **Dependencies Issues**
   - Delete node_modules and package-lock.json
   - Run `npm install` again in both client and server directories

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
