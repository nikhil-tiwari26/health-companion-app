# 🏥 Health Companion

A full-stack healthcare management application that connects patients, doctors, and administrators in a unified platform. This application enables seamless appointment booking, medical record management, and health tracking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Patients
- **User Authentication**: Secure registration and login
- **Book Appointments**: Schedule appointments with available doctors
- **Health Tracking**: Monitor health metrics and medical history
- **Symptom Checker**: AI-powered symptom analysis and recommendations
- **Medical Records**: Access personal health records and prescriptions
- **Dashboard**: Personalized dashboard with upcoming appointments

### For Doctors
- **Practice Dashboard**: Manage your practice and appointments
- **Appointment Management**: View and manage patient appointments
- **Patient Records**: Access comprehensive patient medical history
- **Availability Management**: Set your working hours and availability
- **Dashboard**: Overview of daily appointments and patient information

### For Administrators
- **User Management**: Manage patients, doctors, and system users
- **Doctor Management**: Approve and manage doctor registrations
- **System Oversight**: Monitor platform activities and statistics
- **Role-Based Access**: Control user permissions and roles
- **Admin Dashboard**: System-wide analytics and management tools

## 🛠 Tech Stack

### Frontend
- **React** (v19.2.6) - UI library
- **React Router** (v7.15.1) - Client-side routing
- **Axios** (v1.16.1) - HTTP client
- **React Icons** (v5.6.0) - Icon library
- **React Toastify** (v11.1.0) - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.6.2) - MongoDB ODM
- **JWT** (jsonwebtoken v9.0.3) - Authentication
- **bcryptjs** (v3.0.3) - Password encryption
- **Nodemailer** (v8.0.7) - Email service
- **CORS** (v2.8.6) - Cross-origin requests

### Development Tools
- **Nodemon** (v3.1.14) - Auto-reload for backend
- **React Scripts** (v5.0.1) - Create React App build tools

## 📁 Project Structure

```
health-companion/
├── client/                          # React frontend application
│   ├── public/                      # Static files
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── admin/               # Admin pages
│   │   │   ├── doctor/              # Doctor pages
│   │   │   └── patient/             # Patient pages
│   │   ├── context/                 # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── api/                     # API integration
│   │   │   └── axios.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   ├── package.json
│   └── README.md
│
├── server/                          # Express backend application
│   ├── controllers/                 # Business logic
│   │   ├── authController.js        # Authentication logic
│   │   ├── userController.js        # User management
│   │   ├── appointmentController.js # Appointment management
│   │   ├── doctorController.js      # Doctor-specific logic
│   │   ├── patientController.js     # Patient-specific logic
│   │   └── adminController.js       # Admin operations
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Patient.js
│   │   ├── Appointment.js
│   │   └── Comment.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── patientRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── roleMiddleware.js        # Role-based access control
│   ├── config/                      # Configuration
│   │   └── db.js                    # Database connection
│   ├── utils/                       # Utility functions
│   │   └── aiHelper.js              # AI-powered features
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── config.js
│
└── README.md                        # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **npm** (comes with Node.js)

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/nikhil-tiwari26/health-companion-app.git
cd health-companion
```

### Step 2: Backend Setup

```bash
cd server
npm install
```

### Step 3: Frontend Setup

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/health-companion
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-companion

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Service (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration

1. Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```
The frontend will open at `http://localhost:3000`

### Option 2: Run Backend in Production Mode

```bash
cd server
npm start
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile

### Appointment Endpoints
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get specific doctor
- `PUT /api/doctors/:id` - Update doctor profile
- `GET /api/doctors/:id/appointments` - Get doctor's appointments

### Patient Endpoints
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/records` - Get medical records

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/doctors` - Get all doctors
- `POST /api/admin/doctors/approve` - Approve doctor registration
- `GET /api/admin/statistics` - Get system statistics

## 🗺️ Project Roadmap

- [x] User authentication and authorization
- [x] Appointment booking system
- [x] Role-based access control
- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Integration with payment gateway
- [ ] Mobile app version
- [ ] Advanced health analytics
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support, email nikhil.tiwari@example.com or open an issue on GitHub.

## 👨‍💻 Author

**Nikhil Tiwari**
- GitHub: [@nikhil-tiwari26](https://github.com/nikhil-tiwari26)

---

**Happy Coding! 🚀**
