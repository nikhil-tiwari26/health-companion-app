import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../api/axios";
import { toast } from "react-toastify";

const adminLinks = [
  { path: "/admin/dashboard", icon: "🏠", label: "Dashboard" },
  { path: "/admin/users",     icon: "👥", label: "Manage Users" },
  { path: "/admin/doctors",   icon: "👨‍⚕️", label: "Manage Doctors" },
];

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/doctor");
      setDoctors(data);
    } catch { toast.error("Failed to load doctors"); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const approveDoctor = async (userId) => {
    try {
      await API.put(`/admin/approve/${userId}`);
      toast.success("Doctor approved!");
      fetchDoctors();
    } catch { toast.error("Approval failed"); }
  };

  const deleteDoctor = async (userId) => {
    if (!window.confirm("Delete this doctor?")) return;
    try {
      await API.delete(`/admin/user/${userId}`);
      toast.success("Doctor removed");
      fetchDoctors();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar links={adminLinks} />
      <div className="main-content">
        <h1 className="page-title">👨‍⚕️ Manage Doctors</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Name</th><th>Specialization</th><th>Fee</th><th>Approval</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "#888", padding: "2rem" }}>No doctors found</td></tr>
              ) : doctors.map((d) => (
                <tr key={d._id}>
                  <td>{d.user?.name}</td>
                  <td>{d.specialization}</td>
                  <td>₹{d.consultationFee}</td>
                  <td>
                    <span className={`badge ${d.user?.isApproved ? "confirmed" : "pending"}`}>
                      {d.user?.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "0.5rem" }}>
                    {!d.user?.isApproved && (
                      <button className="btn btn-success" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                        onClick={() => approveDoctor(d.user._id)}>Approve</button>
                    )}
                    <button className="btn btn-danger" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                      onClick={() => deleteDoctor(d.user._id)}>Remove</button>
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

export default ManageDoctors;