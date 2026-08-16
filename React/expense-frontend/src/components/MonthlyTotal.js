function MonthlyTotal({ expenses }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const total = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

  const monthName = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "#2563eb",
        padding: "25px",
        marginBottom: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
        color: "white",
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        {monthName.toUpperCase()}
      </p>

      <h2
        style={{
          margin: "0 0 8px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        This Month's Total
      </h2>

      <h1
        style={{
          margin: "0",
          fontSize: "36px",
        }}
      >
        ₹ {total.toLocaleString("en-IN")}
      </h1>
    </div>
  );
}

export default MonthlyTotal;