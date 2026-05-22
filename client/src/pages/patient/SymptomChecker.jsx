import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const patientLinks = [
  { path: "/patient/dashboard",        icon: "🏠", label: "Dashboard" },
  { path: "/patient/symptoms",         icon: "🤖", label: "Symptom Checker" },
  { path: "/patient/book-appointment", icon: "📅", label: "Book Appointment" },
  { path: "/patient/health-tracker",   icon: "❤️", label: "Health Tracker" },
];

const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Health Assistant 👋 Describe your symptoms and I'll provide suggestions. Remember: this is not a substitute for professional medical advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a compassionate AI health assistant. When a user describes symptoms:
1. Acknowledge their symptoms with empathy
2. List possible conditions (mention 2-3)
3. Give immediate home care suggestions
4. Clearly state when they should see a doctor urgently
5. Always remind them this is not a medical diagnosis
Keep responses clear, structured, and under 200 words.`,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const aiReply = data.content[0].text;
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to the AI. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar links={patientLinks} />
      <div className="main-content">
        <h1 className="page-title">🤖 AI Symptom Checker</h1>

        {/* Chat Box */}
        <div style={{
          background: "white", borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          display: "flex", flexDirection: "column", height: "70vh"
        }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
              }}>
                {msg.role === "assistant" && (
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "#dbeafe", display: "flex", alignItems: "center",
                    justifyContent: "center", marginRight: "0.75rem", flexShrink: 0
                  }}>
                    <FaRobot color="#2563eb" />
                  </div>
                )}
                <div style={{
                  maxWidth: "70%", padding: "0.9rem 1.2rem", borderRadius: "16px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #0f4c81, #1a7fc1)" : "#f1f5f9",
                  color: msg.role === "user" ? "white" : "#333",
                  fontSize: "0.95rem", lineHeight: "1.6",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                  borderBottomLeftRadius: msg.role === "assistant" ? "4px" : "16px",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#888" }}>
                <FaRobot color="#2563eb" />
                <span style={{ fontStyle: "italic" }}>AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "1rem 1.5rem", borderTop: "1px solid #f0f0f0",
            display: "flex", gap: "1rem", alignItems: "flex-end"
          }}>
            <textarea
              rows={2}
              placeholder="Describe your symptoms... (e.g. I have a headache and fever since 2 days)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1, padding: "0.8rem 1rem", border: "1.5px solid #d1d5db",
                borderRadius: "12px", resize: "none", outline: "none",
                fontSize: "0.95rem", fontFamily: "Segoe UI, sans-serif"
              }}
            />
            <button onClick={sendMessage} disabled={loading} style={{
              padding: "0.8rem 1.2rem", background: "linear-gradient(135deg, #0f4c81, #1a7fc1)",
              border: "none", borderRadius: "12px", color: "white",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem"
            }}>
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ marginTop: "1rem", color: "#888", fontSize: "0.82rem", textAlign: "center" }}>
          ⚠️ This AI assistant provides general health information only. Always consult a qualified doctor for medical advice.
        </p>
      </div>
    </div>
  );
};

export default SymptomChecker;