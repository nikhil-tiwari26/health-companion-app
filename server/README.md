# 🚀 Health Companion - Backend

This is the Node.js/Express backend API for the Health Companion healthcare management system. It handles all business logic, authentication, and database operations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## ✨ Features

- **RESTful API**: Fully functional REST API for all healthcare operations
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for patients, doctors, and admins
- **Appointment Management**: Schedule and manage appointments
- **User Management**: Register, login, and manage user profiles
- **Password Security**: Bcrypt encryption for password storage
- **Email Notifications**: Send emails via Nodemailer
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.6.2)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Hashing**: bcryptjs (v3.0.3)
- **Email Service**: Nodemailer (v8.0.7)
- **CORS**: cors (v2.8.6)
- **Environment**: dotenv (v17.4.2)
- **Dev Tool**: Nodemon (v3.1.14)

## 📁 Project Structure

```
server/
├── controllers/                    # Business logic for each module
│   ├── authController.js           # Authentication operations
│   ├── userController.js           # User management
│   ├── appointmentController.js    # Appointment operations
│   ├── doctorController.js         # Doctor-specific operations
│   ├── patientController.js        # Patient-specific operations
│   └── adminController.js          # Admin operations
├── models/                         # MongoDB Mongoose schemas
│   ├── User.js                     # User schema
│   ├── Doctor.js                   # Doctor schema
│   ├── Patient.js                  # Patient schema
│   └── Appointment.js              # Appointment schema
├── routes/                         # API route definitions
│   ├── authRoutes.js               # Auth endpoints
│   ├── userRoutes.js               # User endpoints
│   ├── appointmentRoutes.js        # Appointment endpoints
│   ├── doctorRoutes.js             # Doctor endpoints
│   ├── patientRoutes.js            # Patient endpoints
│   └── adminRoutes.js              # Admin endpoints
├── middleware/                     # Custom middleware
│   ├── authMiddleware.js           # JWT verification
│   ├── roleMiddleware.js           # Role-based access control
│   └── errorMiddleware.js          # Error handling
├── config/                         # Configuration files
│   └── db.js                       # MongoDB connection
├── utils/                          # Utility functions
│   ├── aiHelper.js                 # AI features
│   └── emailHelper.js              # Email sending utilities
├── server.js                       # Main server entry point
├── .env                            # Environment variables (not in repo)
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas cloud)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (see [Environment Configuration](#environment-configuration))

4. Ensure MongoDB is running

## ⚙️ Environment Configuration

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/health-companion
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-companion

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
JWT_EXPIRE=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
# For Gmail, generate an App Password: https://support.google.com/accounts/answer/185833

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Optional: API Keys
AI_API_KEY=your_ai_service_api_key
```

## 🎯 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```
The server will start on `http://localhost:5000`

### Production Mode
```bash
npm start
```

## 📚 API Endpoints

### Authentication (`/api/auth`)
```
POST   /auth/register           - Register a new user
POST   /auth/login              - Login user
POST   /auth/logout             - Logout user
GET    /auth/profile            - Get current user profile
POST   /auth/refresh-token      - Refresh JWT token
POST   /auth/forgot-password    - Request password reset
POST   /auth/reset-password     - Reset password with token
```

### Users (`/api/users`)
```
GET    /users                   - Get all users (admin only)
GET    /users/:id               - Get user by ID
PUT    /users/:id               - Update user profile
DELETE /users/:id               - Delete user account
GET    /users/profile/me        - Get current user profile
```

### Appointments (`/api/appointments`)
```
GET    /appointments            - Get all appointments
GET    /appointments/:id        - Get appointment by ID
POST   /appointments            - Create new appointment
PUT    /appointments/:id        - Update appointment
DELETE /appointments/:id        - Cancel appointment
GET    /appointments/user/:userId - Get user's appointments
GET    /appointments/doctor/:doctorId - Get doctor's appointments
```

### Doctors (`/api/doctors`)
```
GET    /doctors                 - Get all doctors
GET    /doctors/:id             - Get doctor by ID
POST   /doctors                 - Create doctor profile
PUT    /doctors/:id             - Update doctor profile
DELETE /doctors/:id             - Delete doctor
GET    /doctors/specialty/:specialty - Get doctors by specialty
GET    /doctors/:id/appointments - Get doctor's appointments
GET    /doctors/:id/schedule    - Get doctor's availability
PUT    /doctors/:id/schedule    - Update doctor's availability
```

### Patients (`/api/patients`)
```
GET    /patients                - Get all patients (admin/doctor)
GET    /patients/:id            - Get patient by ID
POST   /patients                - Create patient profile
PUT    /patients/:id            - Update patient profile
GET    /patients/:id/records    - Get patient medical records
POST   /patients/:id/records    - Add medical record
GET    /patients/:id/health-metrics - Get health metrics
```

### Admin (`/api/admin`)
```
GET    /admin/statistics        - Get system statistics
GET    /admin/users             - Get all users
GET    /admin/doctors           - Get all doctors
POST   /admin/doctors/approve   - Approve doctor registration
POST   /admin/doctors/reject    - Reject doctor registration
GET    /admin/appointments      - Get all appointments
POST   /admin/users/block       - Block user account
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (patient/doctor/admin),
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  specialty: String,
  licenseNumber: String,
  hospital: String,
  experience: Number,
  qualifications: [String],
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  isApproved: Boolean,
  ratings: Number,
  createdAt: Date
}
```

### Patient Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  age: Number,
  gender: String,
  bloodType: String,
  medicalHistory: [String],
  allergies: [String],
  emergencyContact: String,
  createdAt: Date
}
```

### Appointment Model
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient),
  doctorId: ObjectId (ref: Doctor),
  date: Date,
  time: String,
  reason: String,
  status: String (scheduled/completed/cancelled),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

The backend uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**: Generated on successful login
2. **Token Storage**: Client stores token in localStorage
3. **Token Validation**: Middleware verifies token on protected routes
4. **Token Expiry**: Configured in `.env` (default: 7 days)
5. **Refresh Token**: Endpoint to refresh expired tokens

### Protected Routes
Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## 🛡️ Middleware

### Auth Middleware (`authMiddleware.js`)
- Verifies JWT token
- Extracts user information
- Attaches user to request object

### Role Middleware (`roleMiddleware.js`)
- Checks user role (patient/doctor/admin)
- Restricts access based on role
- Prevents unauthorized access

### Error Middleware
- Handles all errors
- Formats error responses
- Logs errors for debugging

## ⚠️ Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": { ... }
}
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 Best Practices

- **Use async/await** for asynchronous operations
- **Validate input** on all endpoints
- **Use middleware** for common functionality
- **Handle errors** gracefully
- **Document API** endpoints clearly
- **Use environment variables** for sensitive data
- **Implement logging** for debugging

## 🔍 Testing the API

You can test the API using:
- **Postman** - Desktop app for API testing
- **Thunder Client** - VS Code extension
- **cURL** - Command-line tool
- **Axios** - JavaScript HTTP client

Example cURL request:
```bash
curl -X GET http://localhost:5000/api/doctors \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json"
```

## 📞 Support

For issues and support:
- Open an issue on GitHub
- Email: support@healthcompanion.dev

---

**Happy Coding! 🚀**
