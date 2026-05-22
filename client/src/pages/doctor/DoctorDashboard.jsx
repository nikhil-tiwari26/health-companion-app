import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { FaCalendarCheck, FaUserInjured, FaClock } from "react-icons/fa";

const doctorLinks = [
  { path: "/doctor/dashboard",    icon: "🏠", label: "Dashboard" },
  { path: "/doctor/appointments", icon: "📅", label: "Appointments" },
  { path: "/doctor/patients",     icon: "👥", label: "Patient Records" },
];

const DoctorDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <FaCalendarCheck />, label: "Today's Appointments", value: "6",  color: "#dbeafe", iconColor: "#2563eb" },
    { icon: <FaUserInjured />,   label: "Total Patients",       value: "48", color: "#d1fae5", iconColor: "#059669" },
    { icon: <FaClock />,         label: "Pending Requests",     value: "3",  color: "#fef3c7", iconColor: "#d97706" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar links={doctorLinks} />
      <div className="main-content">
        <h1 className="page-title">Doctor Dashboard — {user?.name}</h1>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</div>
              <div><h3>{s.value}</h3><p>{s.label}</p></div>
            </div>
          ))}
        </div>

        <div className="table-container">
          <h3 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Today's Appointments</h3>
          <table>
            <thead>
              <tr><th>Patient</th><th>Time</th><th>Symptoms</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Rahul Sharma</td><td>09:00 AM</td><td>Fever, Cough</td>
                <td><span className="badge confirmed">Confirmed</span></td>
              </tr>
              <tr>
                <td>Priya Singh</td><td>11:00 AM</td><td>Headache</td>
                <td><span className="badge pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;