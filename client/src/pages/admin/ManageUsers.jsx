import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../api/axios";
import { toast } from "react-toastify";

const adminLinks = [
  { path: "/admin/dashboard", icon: "🏠", label: "Dashboard" },
  { path: "/admin/users",     icon: "👥", label: "Manage Users" },
  { path: "/admin/doctors",   icon: "👨‍⚕️", label: "Manage Doctors" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch { toast.error("Failed to load users"); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/user/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar links={adminLinks} />
      <div className="main-content">
        <h1 className="page-title">👥 Manage Users</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === "doctor" ? "confirmed" : u.role === "admin" ? "completed" : "pending"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-danger" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                      onClick={() => deleteUser(u._id)}>Delete</button>
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

export default ManageUsers;