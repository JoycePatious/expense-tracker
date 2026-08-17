function MonthlyTotal({ expenses }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthName = new Date().toLocaleString("en-IN", {
    month: "long",
  });

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

  return (
    <div className="monthly-total">
      <p className="monthly-total-month">
        {monthName.toUpperCase()} {currentYear}
      </p>

      <p className="monthly-total-label">
        This Month's Total
      </p>

      <h2 className="monthly-total-amount">
        ₹ {total.toLocaleString("en-IN")}
      </h2>
    </div>
  );
}

export default MonthlyTotal;