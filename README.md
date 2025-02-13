# Basic CRUD Application for Customers

This is a simple CRUD (Create, Read, Update, Delete) application for managing customer data. The backend is built with **.NET 8** using an in-memory database, and the frontend is developed with **React**.

## Features

- **Backend**: A .NET 8 API that handles customer data operations.
- **Frontend**: A React app for interacting with the API.
- **In-Memory Database**: No setup is required for a database; data is stored temporarily in memory for ease of use.

---

## Prerequisites

- **Backend**: .NET 8 SDK installed.
- **Frontend**: Node.js and npm/yarn installed.

---

## How to Run

### 1. Start the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd /path/to/backend
   ```
2. Run the backend server:
   ```bash
   dotnet run
   ```
3. Note the URL where the server is running (e.g., `https://localhost:5001` or `https://localhost:7154`).

---

### 2. Configure and Run the React Frontend
1. Navigate to the React project directory:
   ```bash
   cd /path/to/reactproject1
   ```
2. Update the `API_BASE_URL` in the React app to match your backend server URL. For example:
   ```javascript
   const API_BASE_URL = "https://localhost:7154/api/Customers";
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React app:
   ```bash
   npm start
   ```

---

## Application Workflow
1. **Start the Backend Server**: Launch the .NET 8 server to expose the API endpoints.
2. **Update the Frontend URL**: Make sure the React app is configured to communicate with the server.
3. **Run the Frontend**: Start the React app and begin interacting with the API.

---

## Notes
- **In-Memory Database**: Since the backend uses an in-memory database, all customer data will be cleared when the server restarts.
- **No Persistent Storage**: This project is for demonstration purposes and does not include persistent storage.
