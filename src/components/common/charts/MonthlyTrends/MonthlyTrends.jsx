
import React, { useEffect, useState } from "react";

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

import "./monthlyTrends.css";

import { supabase } from "../../../../lib/supabase";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyTrends({ selectedYear }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchYearlyTransactions() {
      try {
        setLoading(true);
        setError(null);

        const startDate = `${selectedYear}-01-01`;
        const endDate = `${selectedYear + 1}-01-01`;

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .gte("date", startDate)
          .lt("date", endDate)
          .order("date", { ascending: true });

        if (error) {
          throw error;
        }

        console.log("Monthly Trends selected year:", selectedYear);
        console.log("Monthly Trends transactions:", data);

        if (!isCancelled) {
          setTransactions(data);
        }
      } catch (err) {
        console.error("Error fetching monthly trends:", err);

        if (!isCancelled) {
          setError(err.message || "Failed to load monthly trends.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchYearlyTransactions();

    return () => {
      isCancelled = true;
    };
  }, [selectedYear]);

  const monthlyData = months.map((month) => ({
    month,
    income: 0,
    expenses: 0,
  }));

  transactions.forEach((transaction) => {
    const monthIndex = Number(transaction.date.split("-")[1]) - 1;

    if (transaction.type === "income") {
      monthlyData[monthIndex].income += Number(transaction.amount);
    } else if (transaction.type === "expense") {
      monthlyData[monthIndex].expenses += Number(transaction.amount);
    }
  });

  return (
    <div className="monthly_trends">
      <div className="monthly_trends_header">
        <div>
          <h3>Monthly Trends</h3>
          <p>Compare your monthly income and expenses</p>
        </div>

        <span className="monthly_trends_period">
          {selectedYear}
        </span>
      </div>

      <div className="monthly_trends_chart">
        {loading ? (
          <div className="monthly_trends_empty">
            <p>Loading monthly trends...</p>
          </div>
        ) : error ? (
          <div className="monthly_trends_empty">
            <p>{error}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="monthly_trends_empty">
            <div className="monthly_trends_empty_icon">
              <span>▥</span>
            </div>

            <p>No monthly trends available</p>

            <span>
              Add income or expenses to see your monthly trends.
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
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
                stackId="monthly"
                fill="#10b981"
                radius={[0, 0, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                stackId="monthly"
                fill="#ef4444"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
