import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../api/axios";
import { toast } from "react-toastify";

const doctorLinks = [
  { path: "/doctor/dashboard",    icon: "🏠", label: "Dashboard" },
  { path: "/doctor/appointments", icon: "📅", label: "Appointments" },
  { path: "/doctor/patients",     icon: "👥", label: "Patient Records" },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [prescription, setPrescription] = useState("");

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments/doctor");
      setAppointments(data);
    } catch { toast.error("Failed to load appointments"); }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status, prescription });
      toast.success(`Appointment ${status}`);
      setSelected(null);
      setPrescription("");
      fetchAppointments();
    } catch { toast.error("Update failed"); }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar links={doctorLinks} />
      <div className="main-content">
        <h1 className="page-title">📅 Manage Appointments</h1>

        <div className="table-container">
          <table>
            <thead>
              <tr><th>Patient</th><th>Date</th><th>Time</th><th>Symptoms</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#888", padding: "2rem" }}>No appointments found</td></tr>
              ) : appointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.patient?.name}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.timeSlot}</td>
                  <td>{a.symptoms || "—"}</td>
                  <td><span className={`badge ${a.status}`}>{a.status}</span></td>
                  <td style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {a.status === "pending" && (
                      <>
                        <button className="btn btn-success" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                          onClick={() => updateStatus(a._id, "confirmed")}>Confirm</button>
                        <button className="btn btn-danger" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                          onClick={() => updateStatus(a._id, "cancelled")}>Cancel</button>
                      </>
                    )}
                    {a.status === "confirmed" && (
                      <button className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                        onClick={() => setSelected(a._id)}>Complete + Rx</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prescription Modal */}
        {selected && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem", width: "460px" }}>
              <h3 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Add Prescription</h3>
              <textarea rows={5} placeholder="Write prescription details..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1.5px solid #d1d5db", fontSize: "0.95rem" }}
              />
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button className="btn btn-success" style={{ flex: 1 }}
                  onClick={() => updateStatus(selected, "completed")}>Mark Completed</button>
                <button className="btn btn-danger" style={{ flex: 1 }}
                  onClick={() => { setSelected(null); setPrescription(""); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;