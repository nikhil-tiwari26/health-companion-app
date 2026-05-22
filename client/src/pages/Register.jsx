import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaHeartbeat } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "patient", specialization: ""
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      login(data);
      toast.success(`Welcome, ${data.name}! Account created successfully!`);

      if (data.role === "patient")     navigate("/patient/dashboard");
      else if (data.role === "doctor") navigate("/doctor/dashboard");
      else                             navigate("/admin/dashboard");

    } catch (error) {
      console.error("Register error:", error);
      toast.error("Cannot connect to server. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <FaHeartbeat size={40} color="#1a7fc1" />
        </div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {form.role === "doctor" && (
            <input
              type="text"
              placeholder="Specialization (e.g. Cardiologist)"
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;