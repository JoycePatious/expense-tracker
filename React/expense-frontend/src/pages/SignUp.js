import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register/", {
        username,
        password,
      });

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      if (error.response?.data?.username) {
        setMessage(error.response.data.username[0]);
      } else {
        setMessage("Could not create account");
      }
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
            fontSize: "28px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Sign up for your Expense Tracker
        </p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "18px",
              boxSizing: "border-box",
              border: "1px solid #93c5fd",
              borderRadius: "9px",
              fontSize: "15px",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "7px",
              marginBottom: "22px",
              boxSizing: "border-box",
              border: "1px solid #93c5fd",
              borderRadius: "9px",
              fontSize: "15px",
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
            }}
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#1e3a8a",
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#1e40af",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;