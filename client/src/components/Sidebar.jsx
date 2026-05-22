import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeartbeat, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ links }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{
      width: "240px", minHeight: "100vh", background: "linear-gradient(180deg, #0f4c81, #1a7fc1)",
      color: "white", display: "flex", flexDirection: "column", padding: "1.5rem 0"
    }}>
      {/* Logo */}
      <div style={{ padding: "0 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <FaHeartbeat size={24} />
        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>HealthCompanion</span>
      </div>

      {/* User Info */}
      <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: "10px",
          padding: "0.8rem", textAlign: "center"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>👤</div>
          <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{user?.name}</p>
          <p style={{ fontSize: "0.75rem", opacity: 0.8, textTransform: "capitalize" }}>{user?.role}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: "0 1rem" }}>
        {links.map((link, i) => (
          <NavLink key={i} to={link.path} style={({ isActive }) => ({
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.75rem 1rem", borderRadius: "10px", marginBottom: "0.3rem",
            textDecoration: "none", color: "white", fontWeight: 500,
            background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
            transition: "background 0.2s"
          })}>
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0 1rem" }}>
        <button onClick={handleLogout} style={{
          width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.15)",
          border: "none", borderRadius: "10px", color: "white",
          cursor: "pointer", display: "flex", alignItems: "center",
          gap: "0.75rem", fontWeight: 500, fontSize: "0.95rem"
        }}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;