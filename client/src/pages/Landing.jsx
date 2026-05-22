import { Link } from "react-router-dom";
import { FaHeartbeat, FaUserMd, FaCalendarCheck, FaRobot } from "react-icons/fa";

const Landing = () => {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 3rem", background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FaHeartbeat color="#1a7fc1" size={28} />
          <span style={{ fontWeight: 700, fontSize: "1.3rem", color: "#0f4c81" }}>
            HealthCompanion
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login" style={{
            padding: "0.6rem 1.5rem", border: "2px solid #1a7fc1",
            borderRadius: "8px", color: "#1a7fc1", textDecoration: "none", fontWeight: 600
          }}>Login</Link>
          <Link to="/register" style={{
            padding: "0.6rem 1.5rem", background: "#1a7fc1",
            borderRadius: "8px", color: "white", textDecoration: "none", fontWeight: 600
          }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f4c81, #1a7fc1)",
        color: "white", padding: "5rem 3rem", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>
          Your AI-Powered Health Companion
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 2rem" }}>
          Track your health, check symptoms, get AI suggestions, and book doctor appointments — all in one place.
        </p>
        <Link to="/register" style={{
          padding: "1rem 2.5rem", background: "white", color: "#0f4c81",
          borderRadius: "12px", fontWeight: 700, fontSize: "1.1rem",
          textDecoration: "none", display: "inline-block"
        }}>Start For Free →</Link>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 3rem", background: "#f0f4f8" }}>
        <h2 style={{ textAlign: "center", color: "#0f4c81", marginBottom: "3rem", fontSize: "2rem" }}>
          Everything You Need
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem"
        }}>
          {[
            { icon: <FaRobot size={32} color="#1a7fc1" />, title: "AI Symptom Checker", desc: "Describe symptoms and get instant AI-powered health suggestions." },
            { icon: <FaCalendarCheck size={32} color="#059669" />, title: "Book Appointments", desc: "Schedule appointments with verified doctors in seconds." },
            { icon: <FaHeartbeat size={32} color="#dc2626" />, title: "Health Tracker", desc: "Log blood pressure, heart rate, sugar levels and more daily." },
            { icon: <FaUserMd size={32} color="#d97706" />, title: "3-Panel System", desc: "Separate dashboards for Patients, Doctors, and Admins." },
          ].map((f, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px", padding: "2rem",
              textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.07)"
            }}>
              <div style={{ marginBottom: "1rem" }}>{f.icon}</div>
              <h3 style={{ marginBottom: "0.5rem", color: "#0f4c81" }}>{f.title}</h3>
              <p style={{ color: "#666", fontSize: "0.95rem" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#0f4c81", color: "white",
        textAlign: "center", padding: "1.5rem"
      }}>
        <p>© 2025 HealthCompanion. Built with MERN Stack + AI.</p>
      </footer>
    </div>
  );
};

export default Landing;