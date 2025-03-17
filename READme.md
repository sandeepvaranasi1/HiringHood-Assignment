# RestContactApp

A full-stack contact management application with weather integration.

## Features

- Create, read, update, and delete contacts
- Search contacts by name, phone, or address
- View weather information for contact locations
- Responsive design for all devices
- Dark mode UI

## Tech Stack

### Frontend

- React with Vite
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend

- Express.js
- MongoDB with Mongoose
- RESTful API architecture
- OpenWeatherMap API integration

### DevOps

- Docker for containerization
- GitHub Actions for CI/CD
- Heroku/Vercel for deployment

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- OpenWeatherMap API key

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173

### Docker Setup

1. Build and run with Docker Compose:
   ```
   docker-compose up --build
   ```
   This will start both frontend and backend services.

## API Endpoints

### Contacts API

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get a specific contact
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

### Weather API

- `GET /api/weather/:city` - Get weather data for a city

## Project Structure
