# React Food Ordering App

**[Live Demo]** (https://fooodorderr.netlify.app/)

---

This is a web application for ordering food, built with a modern React frontend and a Node.js backend. It provides a seamless user experience for browsing meals, managing a shopping cart, and submitting an order.

## Features

- **Browse Meals:** Fetches and displays a list of available meals from the backend API.
- **Dynamic Shopping Cart:** Add items to the cart, adjust quantities, and see the total price update in real-time.
- **Seamless Checkout:** A modal-based checkout form that allows users to enter their details without leaving the page.
- **Form Handling:** Utilizes modern React hooks like `useActionState` for robust and user-friendly form submissions.
- **User Feedback:** Clear loading and error states to keep the user informed during API requests.
- **Global State Management:** Uses React's Context API to manage cart contents and UI state (like showing/hiding modals) across the application.
- **Custom Hooks:** Business logic for HTTP requests is abstracted into a reusable `useHttp` hook, keeping components clean and focused.

## Tech Stack

- **Frontend:**
  - React (Vite or Create React App)
  - React Hooks (including `useContext`, `useActionState`)
- **Backend:**
  - Node.js
  - Express.js

## Project Structure

```
/
├── backend/         # Node.js/Express backend server
├── public/          # Static assets
└── src/
    ├── components/  # Reusable React components (Meals, Checkout, Modal, etc.)
    ├── hooks/       # Custom hooks (e.g., useHttp)
    ├── store/       # React Context for state management
    ├── util/        # Utility functions (e.g., formatting)
    └── App.jsx      # Main application component
```

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### 1. Clone the Repository

```sh
git clone https://github.com/Murzuq/food-order.git
cd food-order
```

### 2. Install Backend Dependencies

From the project root directory:

```sh
cd backend
npm install
```

### 3. Install Frontend Dependencies

Navigate back to the root directory and install the frontend dependencies.

```sh
cd ..
npm install
```

### 4. Run the Application

You need to run both the backend and frontend servers simultaneously in two separate terminal windows.

**Terminal 1: Start the Backend Server**

```sh
cd backend
npm start
```

The backend will be running on `http://localhost:3000`.

**Terminal 2: Start the Frontend Development Server**

```sh
npm run dev
```

The React application will open in your browser at `http://localhost:5173` (or another port if 5173 is busy).
