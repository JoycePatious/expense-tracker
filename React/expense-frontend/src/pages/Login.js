import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate("/");
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e293b",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Login to your Expense Tracker
        </p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "6px",
              marginBottom: "18px",
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "6px",
              marginBottom: "20px",
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        {message && (
          <p
            style={{
              color: "#dc2626",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;