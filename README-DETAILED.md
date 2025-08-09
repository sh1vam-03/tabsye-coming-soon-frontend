# Tabsye Coming Soon - Waitlist Application

## Overview

This is a "coming soon" landing page with a waitlist registration feature. Users can sign up with either their email or mobile number to be notified when the product launches.

## Features

- **Responsive UI**: Works on mobile and desktop devices
- **Waitlist Registration**: Collects first name, last name, and either email or mobile number
- **Data Validation**: Ensures data integrity and uniqueness
- **Count Display**: Shows how many people have signed up
- **Fallback Mode**: Frontend works even when backend is unreachable

## Architecture

The application uses a decoupled architecture:

- **Frontend**: Next.js-based React application
- **Backend**: Express.js API with MongoDB database
- **Communication**: REST API for data exchange

## Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB connection (optional)

### Installation

1. Run the setup script to install dependencies and create configuration files:

```bash
./setup.sh
```

2. Update the MongoDB connection string in `backend/.env` if you want to use a real database:

```
MONGODB_URI=mongodb+srv://your_username:your_password@your-cluster.mongodb.net/tabsye?retryWrites=true&w=majority
```

### Running the Application

Start the backend server:

```bash
./run-backend.sh
```

Start the frontend development server:

```bash
./run-frontend.sh
```

Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Troubleshooting

### Frontend Cannot Connect to Backend

The application is designed to work even when the backend is unavailable. If you're experiencing "Failed to fetch" errors:

1. Check that the backend server is running
2. Verify the API URL in `frontend/.env.local` is correct
3. Ensure your network allows connections to localhost
4. If needed, you can use the mock service worker for testing:

```javascript
// Add this to your frontend's src/pages/_app.js
import '../mocks/mockServiceWorker.js';
```

### MongoDB Connection Issues

If you see MongoDB connection errors:

1. Check your MongoDB connection string in `backend/.env`
2. Ensure your MongoDB instance is running
3. Verify your IP address is whitelisted in MongoDB Atlas
4. The application will run in fallback mode without MongoDB

### Port Already in Use

If you see "address already in use" errors:

```bash
# Find processes using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## Development

### Directory Structure

```
├── backend/            # Express.js API server
│   ├── src/
│   │   ├── index.ts    # Server entry point
│   │   └── waitlist.ts # Waitlist API routes
│   ├── package.json    
│   └── .env           
├── frontend/           # Next.js frontend
│   ├── src/
│   │   ├── app/        # Next.js app router pages
│   │   ├── components/ # React components
│   │   ├── mocks/      # Mock API for testing
│   │   └── utils/      # Utility functions
│   ├── package.json   
│   └── .env.local      
├── run-backend.sh      # Script to run the backend server
├── run-frontend.sh     # Script to run the frontend server
└── setup.sh            # Setup script
```

### API Endpoints

- `GET /api/health`: Server status check
- `GET /api/waitlist/count`: Get total number of waitlist entries
- `GET /api/waitlist/exists?type=email&value=test@example.com`: Check if email/mobile exists
- `POST /api/waitlist/add`: Add a new entry to the waitlist

### Fallback Mode

The application is designed to work even without a MongoDB connection. In fallback mode:

- Waitlist entries are not stored persistently
- Uniqueness checks always return false (allowing duplicates)
- The waitlist count is always zero or simulated

## License

This project is proprietary and confidential.

## Contact

For support or inquiries, please contact admin@tabsye.com
