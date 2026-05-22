import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaHeartbeat } from "react-icons/fa";

const Login = () => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { user, login }       = useAuth();
  const navigate              = useNavigate();

  // ✅ Already logged in → redirect to dashboard
  useEffect(() => {
    if (user) {
      if (user.role === "patient") navigate("/patient/dashboard");
      else if (user.role === "doctor") navigate("/doctor/dashboard");
      else navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      login(data);
      toast.success(`Welcome back, ${data.name}!`);

      if (data.role === "patient")     navigate("/patient/dashboard");
      else if (data.role === "doctor") navigate("/doctor/dashboard");
      else                             navigate("/admin/dashboard");

    } catch (error) {
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email" placeholder="Email Address" required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password" placeholder="Password" required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;