
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./IncomeExpenseChart.css";

export default function IncomeExpenseChart({ transactions = [] }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const startDay = index * 5 + 1;
    const endDay = Math.min(startDay + 4, 31);

    const periodTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(`${transaction.date}T00:00:00`);

      const isCurrentMonth =
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() === currentMonth;

      const day = transactionDate.getDate();

      return (
        isCurrentMonth &&
        day >= startDay &&
        day <= endDay
      );
    });

    return {
      month: `${startDay}-${endDay}`,
      income: periodTransactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0),
      expenses: periodTransactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0),
    };
  });

  return (
    <div className="bar_graph">
      <div className="bar_graph_header">
        <div>
          <h3>Income vs Expenses</h3>
          <p>Compare your monthly cash flow</p>
        </div>

        <span className="chart_period">Monthly</span>
      </div>

      <div className="bar_graph_chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
            barGap={5}
            barCategoryGap="25%"
          >
            <CartesianGrid
              stroke="#e9eef5"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) => [
                `Rs. ${Number(value).toLocaleString("en-PK")}`,
              ]}
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
                fontSize: "12px",
              }}
              cursor={{ fill: "#f1f5f9" }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "12px",
                paddingBottom: "12px",
              }}
            />

            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={22}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
