import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlyTotal from "./components/MonthlyTotal";
import TopCategory from "./components/TopCategory";

import "./App.css";
import SignUp from "./pages/SignUp";

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

  const transactionCount = expenses.length;

  return (
    <div className="dashboard">
      <div className="dashboard-container">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Personal Expense Tracker</h1>
            <p>Track your spending with ease</p>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>
        </header>

        {/* Summary Cards */}
        <section className="summary-grid">

          {/* Monthly Total */}
          <div className="summary-card">
            <MonthlyTotal expenses={expenses} />
          </div>

          {/* Transactions */}
          <div className="summary-card">
            <span className="summary-title">
              Transactions
            </span>

            <strong className="summary-value">
              {transactionCount}
            </strong>
          </div>

          {/* Top Category */}
          <div className="summary-card">
            <TopCategory expenses={expenses} />
          </div>

        </section>

        {/* Main Content */}
        <section className="dashboard-content">

          {/* Add Expense */}
          <div className="form-panel">
            <ExpenseForm
              fetchExpenses={fetchExpenses}
            />
          </div>

          {/* Recent Expenses */}
          <div className="list-panel">
            <ExpenseList
              expenses={expenses}
              fetchExpenses={fetchExpenses}
            />
          </div>

        </section>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

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