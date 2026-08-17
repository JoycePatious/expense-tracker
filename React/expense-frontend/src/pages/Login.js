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
        background:
          "linear-gradient(135deg, #dbeafe 0%, #eff6ff 50%, #bfdbfe 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "410px",
          backgroundColor: "#ffffff",
          padding: "38px",
          borderRadius: "18px",
          border: "1px solid #bfdbfe",
          borderTop: "5px solid #1e40af",
          boxShadow: "0 12px 35px rgba(30, 64, 175, 0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            margin: "0 0 8px",
            fontSize: "34px",
            fontWeight: "700",
          }}
        >
          TracMee
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            margin: "0 0 30px",
            fontSize: "14px",
          }}
        >
          Login to your expense tracker
        </p>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              color: "#1e3a8a",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              boxSizing: "border-box",
              border: "1px solid #93c5fd",
              borderRadius: "9px",
              fontSize: "15px",
              color: "#1e293b",
              backgroundColor: "#f8fbff",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              color: "#1e3a8a",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "22px",
              boxSizing: "border-box",
              border: "1px solid #93c5fd",
              borderRadius: "9px",
              fontSize: "15px",
              color: "#1e293b",
              backgroundColor: "#f8fbff",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              backgroundColor: "#1e40af",
              color: "#ffffff",
              border: "none",
              borderRadius: "9px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 5px 12px rgba(30, 64, 175, 0.22)",
            }}
          >
            Login
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "18px",
              padding: "10px",
              backgroundColor: "#fee2e2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#b91c1c",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {message}
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#1e40af",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

