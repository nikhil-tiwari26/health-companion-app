import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import SymptomChecker from "./pages/patient/SymptomChecker";
import BookAppointment from "./pages/patient/BookAppointment";
import HealthTracker from "./pages/patient/HealthTracker";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ManageAppointments from "./pages/doctor/ManageAppointments";
import PatientRecords from "./pages/doctor/PatientRecords";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageDoctors from "./pages/admin/ManageDoctors";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient */}
          <Route path="/patient/dashboard" element={
            <ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>
          } />
          <Route path="/patient/symptoms" element={
            <ProtectedRoute role="patient"><SymptomChecker /></ProtectedRoute>
          } />
          <Route path="/patient/book-appointment" element={
            <ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>
          } />
          <Route path="/patient/health-tracker" element={
            <ProtectedRoute role="patient"><HealthTracker /></ProtectedRoute>
          } />

          {/* Doctor */}
          <Route path="/doctor/dashboard" element={
            <ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>
          } />
          <Route path="/doctor/appointments" element={
            <ProtectedRoute role="doctor"><ManageAppointments /></ProtectedRoute>
          } />
          <Route path="/doctor/patients" element={
            <ProtectedRoute role="doctor"><PatientRecords /></ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>
          } />
          <Route path="/admin/doctors" element={
            <ProtectedRoute role="admin"><ManageDoctors /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;