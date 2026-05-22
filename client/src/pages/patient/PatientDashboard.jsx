import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { FaCalendarCheck, FaHeartbeat, FaRobot, FaNotesMedical } from "react-icons/fa";

const patientLinks = [
  { path: "/patient/dashboard",       icon: "🏠", label: "Dashboard" },
  { path: "/patient/symptoms",        icon: "🤖", label: "Symptom Checker" },
  { path: "/patient/book-appointment",icon: "📅", label: "Book Appointment" },
  { path: "/patient/health-tracker",  icon: "❤️", label: "Health Tracker" },
];

const PatientDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <FaCalendarCheck />, label: "Appointments", value: "3", color: "#dbeafe", iconColor: "#2563eb" },
    { icon: <FaHeartbeat />,     label: "Health Records", value: "12", color: "#d1fae5", iconColor: "#059669" },
    { icon: <FaRobot />,         label: "AI Checks",   value: "5",  color: "#fef3c7", iconColor: "#d97706" },
    { icon: <FaNotesMedical />,  label: "Prescriptions",value: "2", color: "#fee2e2", iconColor: "#dc2626" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar links={patientLinks} />
      <div className="main-content">
        <h1 className="page-title">Welcome back, {user?.name} 👋</h1>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="icon" style={{ background: s.color, color: s.iconColor }}>
                {s.icon}
              </div>
              <div>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="table-container">
          <h3 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Recent Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Doctor</th><th>Date</th><th>Time</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Sharma</td><td>2025-02-10</td><td>10:00 AM</td>
                <td><span className="badge confirmed">Confirmed</span></td>
              </tr>
              <tr>
                <td>Dr. Patel</td><td>2025-02-15</td><td>02:00 PM</td>
                <td><span className="badge pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;