
import React from "react";
import "./QuickStats.css";

export default function QuickStats({ transactions = [] }) {
  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const incomes = transactions.filter(
    (item) => item.type === "income"
  );

  const largestExpense = expenses.reduce(
    (largest, item) =>
      Number(item.amount) > Number(largest?.amount || 0)
        ? item
        : largest,
    null
  );

  const highestIncome = incomes.reduce(
    (highest, item) =>
      Number(item.amount) > Number(highest?.amount || 0)
        ? item
        : highest,
    null
  );

  const now = new Date();

  const currentMonthExpenses = expenses.filter((item) => {
    const date = new Date(`${item.date}T00:00:00`);

    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });

  const monthlySpending = currentMonthExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const averageDailySpending =
    monthlySpending / now.getDate();

  const formatPKR = (amount) =>
    `Rs. ${Number(amount || 0).toLocaleString("en-PK", {
      maximumFractionDigits: 2,
    })}`;

  const stats = [
    {
      id: 1,
      label: "Largest Expense",
      value: formatPKR(largestExpense?.amount),
      description: largestExpense?.category || "No data yet",
      iconClass: "expense",
    },
    {
      id: 2,
      label: "Highest Income",
      value: formatPKR(highestIncome?.amount),
      description: highestIncome?.category || "No data yet",
      iconClass: "income",
    },
    {
      id: 3,
      label: "Avg. Daily Spending",
      value: formatPKR(averageDailySpending),
      description: "Current month",
      iconClass: "average",
    },
  ];

  return (
    <div className="quick_state">
      <h3 className="quick_state_title">Quick Stats</h3>

      <div className="quick_state_content">
        {stats.map((stat) => (
          <div className="quick_stat_item" key={stat.id}>
            <div
              className={`quick_stat_icon quick_stat_icon_${stat.iconClass}`}
            />

            <div className="quick_stat_details">
              <span className="quick_stat_label">
                {stat.label}
              </span>

              <strong className="quick_stat_value">
                {stat.value}
              </strong>

              {stat.description && (
                <span className="quick_stat_description">
                  {stat.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
