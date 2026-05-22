import Sidebar from "../../components/Sidebar";
import { FaUsers, FaUserMd, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";

const adminLinks = [
  { path: "/admin/dashboard", icon: "🏠", label: "Dashboard" },
  { path: "/admin/users",     icon: "👥", label: "Manage Users" },
  { path: "/admin/doctors",   icon: "👨‍⚕️", label: "Manage Doctors" },
];

const AdminDashboard = () => {
  const stats = [
    { icon: <FaUsers />,         label: "Total Users",        value: "120", color: "#dbeafe", iconColor: "#2563eb" },
    { icon: <FaUserMd />,        label: "Doctors",            value: "18",  color: "#d1fae5", iconColor: "#059669" },
    { icon: <FaCalendarCheck />, label: "Appointments",       value: "340", color: "#fef3c7", iconColor: "#d97706" },
    { icon: <FaCheckCircle />,   label: "Pending Approvals",  value: "4",   color: "#fee2e2", iconColor: "#dc2626" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar links={adminLinks} />
      <div className="main-content">
        <h1 className="page-title">Admin Dashboard</h1>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</div>
              <div><h3>{s.value}</h3><p>{s.label}</p></div>
            </div>
          ))}
        </div>

        <div className="table-container">
          <h3 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Recent Registrations</h3>
          <table>
            <thead>
              <tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Aman Gupta</td><td>Doctor</td><td>aman@gmail.com</td>
                <td><span className="badge pending">Pending Approval</span></td>
              </tr>
              <tr>
                <td>Sneha Patel</td><td>Patient</td><td>sneha@gmail.com</td>
                <td><span className="badge confirmed">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;