import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../api/axios";
import { toast } from "react-toastify";

const patientLinks = [
  { path: "/patient/dashboard",        icon: "🏠", label: "Dashboard" },
  { path: "/patient/symptoms",         icon: "🤖", label: "Symptom Checker" },
  { path: "/patient/book-appointment", icon: "📅", label: "Book Appointment" },
  { path: "/patient/health-tracker",   icon: "❤️", label: "Health Tracker" },
];

const HealthTracker = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ bloodPressure: "", heartRate: "", weight: "", bloodSugar: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      const { data } = await API.get("/patient/profile");
      setRecords(data?.healthRecords?.reverse() || []);
    } catch { toast.error("Failed to load records"); }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/patient/health-record", form);
      toast.success("Health record saved!");
      setForm({ bloodPressure: "", heartRate: "", weight: "", bloodSugar: "", notes: "" });
      fetchRecords();
    } catch { toast.error("Failed to save record"); }
    setLoading(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar links={patientLinks} />
      <div className="main-content">
        <h1 className="page-title">❤️ Health Tracker</h1>

        {/* Form */}
        <div style={{
          background: "white", borderRadius: "16px", padding: "2rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1.5rem", color: "#0f4c81" }}>Log Today's Health</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Blood Pressure (e.g. 120/80)</label>
                <input placeholder="120/80" value={form.bloodPressure}
                  onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Heart Rate (bpm)</label>
                <input type="number" placeholder="72" value={form.heartRate}
                  onChange={(e) => setForm({ ...form, heartRate: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" placeholder="70" value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Blood Sugar (mg/dL)</label>
                <input type="number" placeholder="100" value={form.bloodSugar}
                  onChange={(e) => setForm({ ...form, bloodSugar: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea rows={2} placeholder="Any additional notes..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: "0.9rem 2rem" }}>
              {loading ? "Saving..." : "Save Record"}
            </button>
          </form>
        </div>

        {/* Records Table */}
        <div className="table-container">
          <h3 style={{ marginBottom: "1rem", color: "#0f4c81" }}>Health History</h3>
          {records.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>No records yet. Start logging your health above!</p>
          ) : (
            <table>
              <thead>
                <tr><th>Date</th><th>BP</th><th>Heart Rate</th><th>Weight</th><th>Blood Sugar</th><th>Notes</th></tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{new Date(r.date).toLocaleDateString()}</td>
                    <td>{r.bloodPressure || "—"}</td>
                    <td>{r.heartRate ? `${r.heartRate} bpm` : "—"}</td>
                    <td>{r.weight ? `${r.weight} kg` : "—"}</td>
                    <td>{r.bloodSugar ? `${r.bloodSugar} mg/dL` : "—"}</td>
                    <td>{r.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;