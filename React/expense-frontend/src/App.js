import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlyTotal from "./components/MonthlyTotal";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses/");

      console.log("STATUS:", response.status);
      console.log("EXPENSE DATA:", response.data);

      setExpenses(response.data);
    } catch (error) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0",
                color: "#1e293b",
                fontSize: "28px",
              }}
            >
              Personal Expense Tracker
            </h1>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Track your spending with ease
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              padding: "9px 16px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>

        <MonthlyTotal expenses={expenses} />

        <ExpenseForm fetchExpenses={fetchExpenses} />

        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;