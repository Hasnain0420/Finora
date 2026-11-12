
import React from "react";
import "./SpendingByCategory.css";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const categoryColors = [
  "#fb923c",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#ec4899",
  "#9ca3af",
  "#eab308",
  "#06b6d4",
];

export default function SpendingByCategory({ transactions = [] }) {
  const categoryTotals = transactions
    .filter((item) => item.type === "expense")
    .reduce((result, item) => {
      const category = item.category;
      result[category] =
        (result[category] || 0) + Number(item.amount);
      return result;
    }, {});

  const categoryData = Object.entries(categoryTotals).map(
    ([name, amount], index) => ({
      name,
      amount,
      color: categoryColors[index % categoryColors.length],
    })
  );

  const total = categoryData.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  return (
    <div className="pie_chart">
      <div className="pie_graph">
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="75%"
                innerRadius="45%"
                paddingAngle={2}
              >
                {categoryData.map((category) => (
                  <Cell
                    key={category.name}
                    fill={category.color}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `Rs. ${Number(value).toLocaleString("en-PK")}`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No expense data yet</p>
        )}
      </div>

      <div className="pie_side_menu">
        <h3>Spending by Category</h3>

        {categoryData.length > 0 ? (
          categoryData.map((category) => (
            <div className="category_item" key={category.name}>
              <span
                className="category_dot"
                style={{ backgroundColor: category.color }}
              />

              <span className="category_name">
                {category.name}
              </span>

              <span className="category_amount">
                Rs. {category.amount.toLocaleString("en-PK")}
              </span>

              <span className="category_percent">
                {((category.amount / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))
        ) : (
          <p>No categories to display</p>
        )}
      </div>
    </div>
  );
}
