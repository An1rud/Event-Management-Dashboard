# Event Management Dashboard

## Overview
The Event Management Dashboard is a web application designed to help users manage events and attendees efficiently. It provides a user-friendly interface for creating, updating, and deleting events and attendees, along with various functionalities to enhance the overall experience.

## Features
- **User Authentication**: Secure login and registration for users
- **Event Management**: Create, update, and delete events
- **Attendee Management**: Add, edit, and remove attendees associated with events
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Brutalist Design Aesthetic**: A unique and modern UI design

## Technologies Used

### Frontend
- React
- Material-UI
- Axios for HTTP requests
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites
- Node.js (version 14.x or higher)
- MongoDB (running locally or a cloud instance)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/An1rud/Event-Management-Dashboard.git
   cd Event-Management-Dashboard
   ```

2. **Install Dependencies**:
   
   For the client:
   ```bash
   cd client
   npm install
   ```
   
   For the server:
   ```bash
   cd ../server
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `server` directory and add the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. **Start the Server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Client**:
   In a new terminal window:
   ```bash
   cd client
   npm start
   ```

3. **Access the Application**:
   Open your browser and go to `http://localhost:3000`

## Usage
- **Register**: Create a new account to access the dashboard
- **Login**: Use your credentials to log in
- **Manage Events**: Add, edit, or delete events from the dashboard
- **Manage Attendees**: Add or remove attendees associated with each event

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
