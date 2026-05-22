import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../api/axios";

const doctorLinks = [
  { path: "/doctor/dashboard",    icon: "🏠", label: "Dashboard" },
  { path: "/doctor/appointments", icon: "📅", label: "Appointments" },
  { path: "/doctor/patients",     icon: "👥", label: "Patient Records" },
];

const PatientRecords = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/appointments/doctor");
        // Get unique patients from appointments
        setAppointments(data.filter((a) => a.status === "completed"));
      } catch {}
    };
    fetch();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar links={doctorLinks} />
      <div className="main-content">
        <h1 className="page-title">👥 Patient Records</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Patient</th><th>Date</th><th>Symptoms</th><th>Prescription</th></tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "#888", padding: "2rem" }}>No completed appointments yet</td></tr>
              ) : appointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.patient?.name}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.symptoms || "—"}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
                    {a.prescription || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;