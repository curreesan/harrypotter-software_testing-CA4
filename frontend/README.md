# Hogwarts Store - MERN Stack Application

A full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) to manage a toy store. This project allows users to authenticate, add items to their cart, and make purchases. The application tracks the total number of toys in the store and the number of toys added to the cart. It features user authentication with JWT, dynamic updates of the toy count, and purchase logic.

## Features

- **User Authentication**:

  - JWT-based authentication for secure login and sign-up.
  - Users must be logged in to add items to the cart and make a purchase.

- **HomePage**:

  - Displays available toys with + and - buttons to adjust the number of toys added to the cart.
  - Requires the user to be logged in to adjust cart counts.

- **PurchasePage**:

  - Displays the purchase count of toys.
  - Requires user authentication and verifies that the cart is not empty before proceeding with the purchase.
  - After purchase, the toy count in the backend is updated and reset to 0.

- **Backend**:
  - MongoDB is used to track the toy inventory and purchase counts.
  - Express.js is used to handle API routes for authentication and toy updates.
  - The database consists of two collections: one for tracking toy totals and another for tracking cart purchases.

## Tech Stack

- **Frontend**: React, React Context API for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API

### Prerequisites

- Node.js (v16+)
- MongoDB (local or remote instance)
- npm (v7+)

## Usage

1. **User Authentication**:
   - The user can sign up with a new account or log in using existing credentials. JWT tokens are used to authenticate and manage sessions.
2. **HomePage**:

   - Users can see available toys and adjust the cart count using + or - buttons. The toy count is updated dynamically on the frontend and backend when adjustments are made.

3. **PurchasePage**:
   - The user clicks the 'Purchase' button to finalize their purchase. If the user is logged in and the cart is not empty, the purchase is processed, updating the toy count in the database and resetting the cart count.
