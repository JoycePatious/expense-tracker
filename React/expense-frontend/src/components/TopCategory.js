function TopCategory({ expenses }) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;
    const amount = Number(expense.amount);

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  let topCategory = "None";
  let topAmount = 0;

  Object.entries(categoryTotals).forEach(
    ([category, amount]) => {
      if (amount > topAmount) {
        topCategory = category;
        topAmount = amount;
      }
    }
  );

  return (
    <div>
      <span className="summary-title">
        Top Category
      </span>

      <strong
        style={{
            display: "block",
            color: "#1e3a8a",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "1.1",
    }}
>
  {topCategory}
</strong>

      {topAmount > 0 && (
        <p
          style={{
            margin: "6px 0 0",
            color: "#64748b",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          ₹ {topAmount.toLocaleString("en-IN")} spent
        </p>
      )}
    </div>
  );
}

export default TopCategory;