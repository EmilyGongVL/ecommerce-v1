# VivaMarket Backend Server

This is the backend API for the VivaMarket e-commerce application.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JWT Authentication
- RESTful API design

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vivamarket

   # JWT Configuration
   JWT_SECRET=replace-this-with-at-least-32-characters-long-secret-key
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3000
   ```

3. Start MongoDB:
   Make sure you have MongoDB running locally or provide a connection string to a MongoDB Atlas cluster.

4. Run the server in development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/users/signup`: Register a new user
- `POST /api/users/login`: Login user
- `GET /api/users/logout`: Logout user
- `POST /api/users/forgotPassword`: Request password reset
- `PATCH /api/users/resetPassword/:token`: Reset password with token
- `PATCH /api/users/updateMyPassword`: Update current user password (protected route)

### Users
- `GET /api/users/me`: Get current user (protected route)
- `PATCH /api/users/updateMe`: Update current user data (protected route)
- `DELETE /api/users/deleteMe`: Deactivate current user (protected route)

### Stores
- `GET /api/stores`: Get all stores
- `GET /api/stores/:id`: Get a specific store
- `POST /api/stores`: Create a new store (protected route)
- `PATCH /api/stores/:id`: Update a store (protected & restricted)
- `DELETE /api/stores/:id`: Delete a store (protected & restricted)
- `GET /api/stores/top-rated`: Get top rated stores
- `GET /api/stores/new`: Get new stores
- `GET /api/stores/upcoming`: Get upcoming stores
- `GET /api/stores/starred`: Get starred stores
- `GET /api/stores/:id/products`: Get store products

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product (protected & restricted)
- `PATCH /api/products/:id`: Update a product (protected & restricted)
- `DELETE /api/products/:id`: Delete a product (protected & restricted)

### Orders
- `GET /api/orders`: Get all orders (protected route)
- `GET /api/orders/:id`: Get a specific order (protected route)
- `POST /api/orders`: Create a new order (protected route)
- `PATCH /api/orders/:id`: Update an order (admin only)

## Testing

Run tests with:
```bash
npm test
```