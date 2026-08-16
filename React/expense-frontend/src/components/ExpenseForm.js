import { useState } from "react";
import api from "../services/api";

function ExpenseForm({ fetchExpenses }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      amount: amount,
      category: category,
      description: description,
      date: date,
    };

    try {
      await api.post("/expenses/", expense);

      fetchExpenses();

      setMessage("Expense added successfully!");
      setMessageType("success");

      setAmount("");
      setCategory("Food");
      setDescription("");
      setDate("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);

      setMessage("Error adding expense");
      setMessageType("error");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginTop: "0",
          color: "#1e293b",
        }}
      >
        Add Expense
      </h2>

      {message && (
        <div
          style={{
            padding: "10px 12px",
            marginBottom: "18px",
            borderRadius: "8px",
            backgroundColor:
              messageType === "success" ? "#dcfce7" : "#fee2e2",
            color:
              messageType === "success" ? "#166534" : "#991b1b",
            fontSize: "14px",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#334155",
              fontWeight: "500",
            }}
          >
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
            style={{
              width: "100%",
              padding: "11px",
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#334155",
              fontWeight: "500",
            }}
          >
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "11px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#334155",
              fontWeight: "500",
            }}
          >
            Description
          </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            style={{
              width: "100%",
              padding: "11px",
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#334155",
              fontWeight: "500",
            }}
          >
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "11px",
              boxSizing: "border-box",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;