import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { FaUserMd, FaCalendarCheck, FaClock, FaRupeeSign } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const patientLinks = [
  { path: "/patient/dashboard",         icon: "🏠", label: "Dashboard"        },
  { path: "/patient/symptoms",          icon: "🤖", label: "Symptom Checker"  },
  { path: "/patient/book-appointment",  icon: "📅", label: "Book Appointment" },
  { path: "/patient/health-tracker",    icon: "❤️", label: "Health Tracker"   },
];

const ALL_SLOTS = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "02:00 PM","03:00 PM","04:00 PM","05:00 PM",
];

const SPECIALIZATIONS = ["All","Cardiologist","Dermatologist","Neurologist","Pediatrician","Orthopedic","Gynecologist"];

const BookAppointment = () => {
  const { user } = useAuth();
  const [step, setStep]             = useState(1); // 1=Select Doctor, 2=Select Slot, 3=Confirm
  const [doctors, setDoctors]       = useState([]);
  const [filtered, setFiltered]     = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots]   = useState([]);
  const [symptoms, setSymptoms]         = useState("");
  const [search, setSearch]             = useState("");
  const [specFilter, setSpecFilter]     = useState("All");
  const [loading, setLoading]           = useState(false);
  const [booked, setBooked]             = useState(false);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res  = await fetch("http://localhost:5000/api/doctor");
        const data = await res.json();
        const approved = data.filter((d) => d.user?.isApproved);
        setDoctors(approved);
        setFiltered(approved);
      } catch {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors
  useEffect(() => {
    let list = [...doctors];
    if (specFilter !== "All") list = list.filter((d) => d.specialization === specFilter);
    if (search) list = list.filter((d) =>
      d.user?.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(list);
  }, [search, specFilter, doctors]);

  // Fetch booked slots when doctor + date selected
  useEffect(() => {
    if (!selectedDoc || !selectedDate) return;
    const fetchSlots = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const res = await fetch(
          `http://localhost:5000/api/appointments/booked-slots?doctorId=${selectedDoc.user?._id}&date=${selectedDate}`,
          { headers: { Authorization: `Bearer ${userInfo?.token}` } }
        );
        const data = await res.json();
        setBookedSlots(data);
      } catch {}
    };
    fetchSlots();
  }, [selectedDoc, selectedDate]);

  const handleBook = async () => {
    if (!selectedDoc || !selectedDate || !selectedSlot) {
      toast.error("Please select doctor, date and time slot");
      return;
    }
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const res = await fetch("http://localhost:5000/api/appointments", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify({
          doctor:   selectedDoc.user?._id,
          date:     selectedDate,
          timeSlot: selectedSlot,
          symptoms,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message); setLoading(false); return; }
      setBooked(true);
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Booking failed. Try again.");
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(1); setSelectedDoc(null); setSelectedDate("");
    setSelectedSlot(""); setSymptoms(""); setBooked(false); setBookedSlots([]);
  };

  // ✅ Success Screen
  if (booked) return (
    <div className="dashboard-layout">
      <Sidebar links={patientLinks} />
      <div className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          background: "white", borderRadius: "20px", padding: "3rem",
          textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "480px"
        }}>
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ color: "#059669", marginBottom: "0.5rem" }}>Appointment Booked!</h2>
          <p style={{ color: "#555", marginBottom: "1.5rem" }}>
            Your appointment with <strong>{selectedDoc?.user?.name}</strong> is confirmed for{" "}
            <strong>{new Date(selectedDate).toDateString()}</strong> at <strong>{selectedSlot}</strong>.
          </p>
          <div style={{
            background: "#f0fdf4", borderRadius: "12px", padding: "1rem",
            marginBottom: "1.5rem", textAlign: "left"
          }}>
            <p><strong>Doctor:</strong> {selectedDoc?.user?.name}</p>
            <p><strong>Specialization:</strong> {selectedDoc?.specialization}</p>
            <p><strong>Date:</strong> {new Date(selectedDate).toDateString()}</p>
            <p><strong>Time:</strong> {selectedSlot}</p>
            <p><strong>Fee:</strong> ₹{selectedDoc?.consultationFee}</p>
          </div>
          <button className="btn btn-primary" onClick={reset} style={{ width: "100%", padding: "0.9rem" }}>
            Book Another Appointment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar links={patientLinks} />
      <div className="main-content">
        <h1 className="page-title">📅 Book Appointment</h1>

        {/* Progress Steps */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem", gap: "0" }}>
          {["Select Doctor", "Choose Slot", "Confirm"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: step > i ? "#059669" : step === i + 1 ? "#1a7fc1" : "#e5e7eb",
                  color: step >= i + 1 ? "white" : "#999",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.9rem"
                }}>
                  {step > i ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "0.75rem", marginTop: "0.3rem", color: step === i + 1 ? "#1a7fc1" : "#999", fontWeight: step === i + 1 ? 700 : 400 }}>
                  {s}
                </span>
              </div>
              {i < 2 && <div style={{ height: "2px", flex: 1, background: step > i + 1 ? "#059669" : "#e5e7eb", marginBottom: "1.2rem" }} />}
            </div>
          ))}
        </div>

        {/* ===== STEP 1 — SELECT DOCTOR ===== */}
        {step === 1 && (
          <div>
            {/* Search + Filter */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <input
                placeholder="🔍 Search doctor or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1, padding: "0.8rem 1rem", border: "1.5px solid #d1d5db",
                  borderRadius: "10px", fontSize: "0.95rem", outline: "none", minWidth: "200px"
                }}
              />
              <select
                value={specFilter}
                onChange={(e) => setSpecFilter(e.target.value)}
                style={{
                  padding: "0.8rem 1rem", border: "1.5px solid #d1d5db",
                  borderRadius: "10px", fontSize: "0.95rem", outline: "none"
                }}
              >
                {SPECIALIZATIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Doctor Cards */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
                <p style={{ fontSize: "3rem" }}>👨‍⚕️</p>
                <p>No doctors found. Try a different filter.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {filtered.map((doc) => (
                  <div key={doc._id} onClick={() => { setSelectedDoc(doc); setStep(2); }}
                    style={{
                      background: "white", borderRadius: "16px", padding: "1.5rem",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer",
                      border: "2px solid transparent", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#1a7fc1"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                  >
                    {/* Avatar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{
                        width: "60px", height: "60px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #0f4c81, #1a7fc1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.5rem", color: "white", fontWeight: 700, flexShrink: 0
                      }}>
                        {doc.user?.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ color: "#0f4c81", margin: 0, fontSize: "1rem" }}>{doc.user?.name}</h3>
                        <p style={{ color: "#1a7fc1", margin: 0, fontSize: "0.85rem", fontWeight: 600 }}>{doc.specialization}</p>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", color: "#555" }}>
                      <span>🎓 {doc.experience} years experience</span>
                      <span>📅 {doc.availableDays?.slice(0, 3).join(", ")}...</span>
                      <span>🕐 {doc.availableTime?.start} - {doc.availableTime?.end}</span>
                    </div>

                    {/* Fee + Button */}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginTop: "1rem",
                      paddingTop: "1rem", borderTop: "1px solid #f0f0f0"
                    }}>
                      <span style={{ fontWeight: 700, color: "#059669", fontSize: "1.1rem" }}>
                        ₹{doc.consultationFee}
                      </span>
                      <button className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
                        Book Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 2 — SELECT DATE & SLOT ===== */}
        {step === 2 && selectedDoc && (
          <div style={{ maxWidth: "680px" }}>
            {/* Selected Doctor Summary */}
            <div style={{
              background: "white", borderRadius: "16px", padding: "1.2rem 1.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: "1rem"
            }}>
              <div style={{
                width: "50px", height: "50px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0f4c81, #1a7fc1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "1.2rem"
              }}>
                {selectedDoc.user?.name?.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: "#0f4c81" }}>{selectedDoc.user?.name}</h3>
                <p style={{ margin: 0, color: "#666", fontSize: "0.88rem" }}>{selectedDoc.specialization} · ₹{selectedDoc.consultationFee}</p>
              </div>
              <button onClick={() => setStep(1)} style={{
                background: "none", border: "1.5px solid #d1d5db",
                borderRadius: "8px", padding: "0.4rem 0.8rem",
                cursor: "pointer", color: "#666", fontSize: "0.85rem"
              }}>Change</button>
            </div>

            {/* Date Picker */}
            <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#0f4c81", marginBottom: "1rem" }}>📅 Select Date</h3>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(""); }}
                style={{
                  width: "100%", padding: "0.8rem 1rem",
                  border: "1.5px solid #d1d5db", borderRadius: "10px",
                  fontSize: "1rem", outline: "none"
                }}
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem" }}>
                <h3 style={{ color: "#0f4c81", marginBottom: "1rem" }}>🕐 Select Time Slot</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
                  {ALL_SLOTS.map((slot) => {
                    const isBooked   = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button key={slot} disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: "0.75rem 0.5rem", borderRadius: "10px", border: "2px solid",
                          cursor: isBooked ? "not-allowed" : "pointer",
                          fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s",
                          borderColor: isBooked ? "#e5e7eb" : isSelected ? "#1a7fc1" : "#d1d5db",
                          background:  isBooked ? "#f9fafb"  : isSelected ? "#1a7fc1" : "white",
                          color:       isBooked ? "#ccc"     : isSelected ? "white"   : "#333",
                        }}>
                        {isBooked ? "🚫" : "🕐"} {slot}
                        {isBooked && <div style={{ fontSize: "0.7rem", color: "#ccc" }}>Booked</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Symptoms */}
            {selectedSlot && (
              <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem" }}>
                <h3 style={{ color: "#0f4c81", marginBottom: "1rem" }}>📝 Describe Symptoms <span style={{ fontWeight: 400, color: "#888", fontSize: "0.85rem" }}>(Optional)</span></h3>
                <textarea rows={3}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  style={{
                    width: "100%", padding: "0.8rem 1rem", border: "1.5px solid #d1d5db",
                    borderRadius: "10px", fontSize: "0.95rem", outline: "none", resize: "none",
                    fontFamily: "Segoe UI, sans-serif"
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(1)} className="btn" style={{
                flex: 1, padding: "0.9rem", background: "white",
                border: "1.5px solid #d1d5db", color: "#333"
              }}>← Back</button>
              <button
                onClick={() => { if (!selectedDate || !selectedSlot) { toast.error("Please select date and time slot"); return; } setStep(3); }}
                className="btn btn-primary" style={{ flex: 2, padding: "0.9rem" }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 3 — CONFIRM ===== */}
        {step === 3 && (
          <div style={{ maxWidth: "500px" }}>
            <div style={{
              background: "white", borderRadius: "16px", padding: "2rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem"
            }}>
              <h3 style={{ color: "#0f4c81", marginBottom: "1.5rem", textAlign: "center" }}>
                ✅ Confirm Your Appointment
              </h3>

              {[
                { label: "Doctor",         value: selectedDoc?.user?.name,    icon: "👨‍⚕️" },
                { label: "Specialization", value: selectedDoc?.specialization, icon: "🏥" },
                { label: "Date",           value: new Date(selectedDate).toDateString(), icon: "📅" },
                { label: "Time",           value: selectedSlot,                icon: "🕐" },
                { label: "Fee",            value: `₹${selectedDoc?.consultationFee}`, icon: "💰" },
                { label: "Patient",        value: user?.name,                  icon: "👤" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "0.8rem 0", borderBottom: "1px solid #f0f0f0", alignItems: "center"
                }}>
                  <span style={{ color: "#666", fontSize: "0.9rem" }}>{item.icon} {item.label}</span>
                  <span style={{ fontWeight: 600, color: "#333" }}>{item.value}</span>
                </div>
              ))}

              {symptoms && (
                <div style={{ marginTop: "1rem", background: "#f8fafc", borderRadius: "10px", padding: "1rem" }}>
                  <p style={{ color: "#666", fontSize: "0.85rem", margin: 0 }}>
                    <strong>Symptoms:</strong> {symptoms}
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep(2)} className="btn" style={{
                flex: 1, padding: "0.9rem", background: "white",
                border: "1.5px solid #d1d5db", color: "#333"
              }}>← Back</button>
              <button onClick={handleBook} disabled={loading}
                className="btn btn-success" style={{ flex: 2, padding: "0.9rem", fontSize: "1rem" }}>
                {loading ? "Booking..." : "Confirm Booking ✅"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;