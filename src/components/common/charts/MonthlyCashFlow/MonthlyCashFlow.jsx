
import React, { useContext } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./monthlyCashFlow.css";

import { DataContext } from "../../../../context/DataContext";

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export default function MonthlyCashFlow({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  availableYears,
  transactions,
  loading,
}) {
  const { setReportNewData } = useContext(DataContext);

  // Generate chart data from transactions
  const monthlyData = Object.values(
    transactions.reduce((acc, transaction) => {
      const day = Number(transaction.date.split("-")[2]);

      if (!acc[day]) {
        acc[day] = {
          period: `${months[selectedMonth - 1].label.slice(0, 3)} ${day}`,
          income: 0,
          expenses: 0,
        };
      }

      if (transaction.type === "income") {
        acc[day].income += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        acc[day].expenses += Number(transaction.amount);
      }

      return acc;
    }, {})
  ).sort((a, b) => {
    return (
      Number(a.period.split(" ")[1]) -
      Number(b.period.split(" ")[1])
    );
  });

  function handleMonthChange(e) {
    const newMonth = Number(e.target.value);

    if (newMonth === selectedMonth) return;

    setSelectedMonth(newMonth);
    setReportNewData(true);
  }

  function handleYearChange(e) {
    const newYear = Number(e.target.value);

    if (newYear === selectedYear) return;

    setSelectedYear(newYear);
    setReportNewData(true);
  }

  return (
    <div className="monthly_cash_flow">
      <div className="monthly_cash_flow_header">
        <div>
          <h3>Monthly Cash Flow</h3>
          <p>Track your income and expenses over time</p>
        </div>

        <div className="monthly_cash_flow_filters">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="monthly_cash_flow_select"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="monthly_cash_flow_select"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="monthly_cash_flow_chart">
        {loading ? (
          <div className="monthly_cash_flow_empty">
            <p>Loading cash flow data...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="monthly_cash_flow_empty">
            <div className="monthly_cash_flow_empty_icon">
              <span>↗</span>
            </div>

            <p>No cash flow data available</p>

            <span>
              Add income or expenses to see your monthly cash flow.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="incomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="expensesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#e9eef5"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="period"
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

              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#incomeGradient)"
                activeDot={{ r: 5 }}
              />

              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#expensesGradient)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
