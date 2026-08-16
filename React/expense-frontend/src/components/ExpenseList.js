import { useState } from "react";
import api from "../services/api";

function ExpenseList({ expenses, fetchExpenses }) {
    const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}/`);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setEditData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/expenses/${id}/update/`, editData);

      setEditingId(null);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryStyle = (category) => {
    const styles = {
      Food: {
        backgroundColor: "#fef3c7",
        color: "#92400e",
      },
      Transport: {
        backgroundColor: "#dbeafe",
        color: "#1e40af",
      },
      Shopping: {
        backgroundColor: "#fce7f3",
        color: "#9d174d",
      },
      Bills: {
        backgroundColor: "#ede9fe",
        color: "#5b21b6",
      },
      Entertainment: {
        backgroundColor: "#dcfce7",
        color: "#166534",
      },
      Other: {
        backgroundColor: "#e2e8f0",
        color: "#334155",
      },
    };

    return styles[category] || styles.Other;
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h2
        style={{
          marginTop: "0",
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        Recent Expenses
      </h2>

      {expenses.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "35px 10px",
            color: "#64748b",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "5px",
            }}
          >
            No expenses yet
          </p>

          <p
            style={{
              fontSize: "14px",
              margin: "0",
            }}
          >
            Add your first expense above.
          </p>
        </div>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "15px",
              backgroundColor: "#f8fafc",
            }}
          >
            {editingId === expense.id ? (
              <div>
                <label>Amount</label>

                <input
                  name="amount"
                  type="number"
                  value={editData.amount}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "12px",
                    boxSizing: "border-box",
                    border: "1px solid #cbd5e1",
                    borderRadius: "7px",
                  }}
                />

                <label>Category</label>

                <select
                  name="category"
                  value={editData.category}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "7px",
                  }}
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>

                <label>Description</label>

                <input
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "12px",
                    boxSizing: "border-box",
                    border: "1px solid #cbd5e1",
                    borderRadius: "7px",
                  }}
                />

                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={editData.date}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "15px",
                    boxSizing: "border-box",
                    border: "1px solid #cbd5e1",
                    borderRadius: "7px",
                  }}
                />

                <button
                  onClick={() => handleUpdate(expense.id)}
                  style={{
                    padding: "9px 18px",
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    padding: "9px 18px",
                    backgroundColor: "#64748b",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0",
                      color: "#1e293b",
                      fontSize: "22px",
                    }}
                  >
                    ₹{expense.amount}
                  </h3>

                  <span
                    style={{
                      ...getCategoryStyle(expense.category),
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {expense.category}
                  </span>
                </div>

                <p
                  style={{
                    margin: "8px 0",
                    color: "#475569",
                  }}
                >
                  {expense.description || "No description"}
                </p>

                <p
                  style={{
                    margin: "8px 0 15px",
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  {formatDate(expense.date)}
                </p>

                <button
                  onClick={() => handleEdit(expense)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(expense.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;