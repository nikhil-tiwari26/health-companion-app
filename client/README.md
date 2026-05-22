# 🎨 Health Companion - Frontend

This is the React-based frontend application for the Health Companion healthcare management system. It provides a responsive user interface for patients, doctors, and administrators to interact with the platform.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Contributing](#contributing)

## ✨ Features

- **Role-Based Dashboards**: Different interfaces for patients, doctors, and admins
- **Responsive Design**: Mobile-friendly and works on all devices
- **Real-Time Notifications**: Toast notifications for user feedback
- **Secure Authentication**: JWT-based authentication with protected routes
- **Appointment Management**: Book, view, and manage appointments
- **Health Tracking**: Monitor health metrics and records
- **Symptom Checker**: AI-powered symptom analysis
- **User-Friendly UI**: Clean and intuitive interface with React Icons

## 🛠 Tech Stack

- **React** (v19.2.6) - UI framework
- **React Router** (v7.15.1) - Client-side routing
- **Axios** (v1.16.1) - HTTP client for API calls
- **React Icons** (v5.6.0) - Icon library
- **React Toastify** (v11.1.0) - Toast notifications
- **React Scripts** (v5.0.1) - Build tools

## 📁 Folder Structure

```
src/
├── components/                  # Reusable React components
│   ├── Navbar.jsx              # Top navigation bar
│   ├── Sidebar.jsx             # Side navigation
│   └── ProtectedRoute.jsx       # Route protection wrapper
├── pages/                       # Page components
│   ├── Landing.jsx             # Landing/home page
│   ├── Login.jsx               # User login page
│   ├── Register.jsx            # User registration page
│   ├── admin/                  # Admin dashboard pages
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageDoctors.jsx
│   │   └── ManageUsers.jsx
│   ├── doctor/                 # Doctor dashboard pages
│   │   ├── DoctorDashboard.jsx
│   │   ├── ManageAppointments.jsx
│   │   └── PatientRecords.jsx
│   └── patient/                # Patient dashboard pages
│       ├── PatientDashboard.jsx
│       ├── BookAppointment.jsx
│       ├── HealthTracker.jsx
│       └── SymptomChecker.jsx
├── context/                    # React Context for state management
│   └── AuthContext.jsx         # Authentication context
├── api/                        # API integration
│   └── axios.js                # Axios instance with interceptors
├── styles/                     # CSS stylesheets
│   └── index.css
├── App.js                      # Main App component
├── App.css                     # App styles
└── index.js                    # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see lint errors in the console.

**Keyboard shortcut to open dev tools:** `F12`

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and filenames include the hashes.\
Your app is ready to be deployed!

### `npm test`

Launches the test runner in interactive watch mode.\
See [Create React App Testing Documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. However, note that you will be responsible for maintaining all configurations.

## 🧩 Components

### Navbar
Main navigation component displayed at the top of the application.
- Displays user info
- Logout button
- Navigation links

### Sidebar
Side navigation component for easy access to features.
- Navigation menu based on user role
- Collapsible on mobile
- Quick action links

### ProtectedRoute
Wrapper component to protect routes that require authentication.
- Redirects unauthenticated users to login
- Checks user role and permissions

## 🔌 API Integration

The frontend communicates with the backend API through:

- **Base URL**: Configured in `.env` as `REACT_APP_API_URL`
- **HTTP Client**: Axios instance with automatic JWT token injection
- **Interceptors**: Handle token refresh and error responses

### Example API Call:
```javascript
import axios from './api/axios';

const fetchAppointments = async () => {
  try {
    const response = await axios.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};
```

## 🔐 Authentication

The app uses JWT-based authentication:

1. **Login**: User credentials are sent to backend
2. **Token Storage**: JWT token is stored in localStorage
3. **Protected Routes**: Routes wrapped with `ProtectedRoute` require valid token
4. **Auto Logout**: Expired tokens trigger automatic logout
5. **Token Injection**: Axios interceptor automatically adds token to requests

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers (1920px and above)
- Tablets (768px to 1024px)
- Mobile phones (320px to 767px)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

---

**Happy Coding! 🚀**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
