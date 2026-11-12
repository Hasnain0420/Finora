
import React, { useEffect, useState } from "react";
import "./dashboard.css";

import Card from "../../components/common/card/Card";
import IncomeExpenseChart from "../../components/common/charts/IncomeExpenseChart/IncomeExpenseChart";
import SpendingByCategory from "../../components/common/charts/SpendingByCategory/SpendingByCategory";
import QuickStats from "../../components/common/QuickStats/QuickStats";
import TransactionForm from "../../components/common/TransactionForm/TransactionForm";

import { Download, Upload, Wallet, PieChart } from "lucide-react";
import {
  getTransactions,
  addTransaction,
} from "../../lib/transactions";

const formatPKR = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError(null);

      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(err.message || "Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleTransactionAdded(transaction) {
    await addTransaction(transaction);
    await fetchTransactions();
  }

  // Calculate dashboard totals
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      {loading && <p>Loading transactions...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <p>Transactions loaded: {transactions.length}</p>
      )}

      {/* Summary Cards */}
      <section className="dashboard_summary">
        <div className="stats_grid">
          <Card
            title="Total Income"
            amount={formatPKR(totalIncome)}
            percentage="0%"
            period="all transactions"
            bgColor="#f4fbf7"
            borderColor="#d8f3e5"
            iconColor="#10b981"
            iconBgColor="#dcfce7"
            Icon={Download}
          />

          <Card
            title="Total Expenses"
            amount={formatPKR(totalExpenses)}
            percentage="0%"
            period="all transactions"
            bgColor="#fff5f5"
            borderColor="#fecaca"
            iconColor="#ef4444"
            iconBgColor="#fee2e2"
            Icon={Upload}
          />

          <Card
            title="Current Balance"
            amount={formatPKR(balance)}
            percentage="0%"
            period="income minus expenses"
            bgColor="#f0f7ff"
            borderColor="#dbeafe"
            iconColor="#3b82f6"
            iconBgColor="#dbeafe"
            Icon={Wallet}
          />

          <Card
            title="Total Transactions"
            amount={transactions.length.toString()}
            percentage="0%"
            period="all transactions"
            bgColor="#f8f5ff"
            borderColor="#ede9fe"
            iconColor="#8b5cf6"
            iconBgColor="#ede9fe"
            Icon={PieChart}
          />
        </div>
      </section>

      {/* Main Charts Layout */}
      <section className="dashboard_charts">
        <div className="visualizer">
          <IncomeExpenseChart transactions={transactions} />

          <div className="graph_states">
            <SpendingByCategory transactions={transactions} />
            <QuickStats transactions={transactions} />
          </div>
        </div>

        <div className="transaction_input">
          <TransactionForm
            onTransactionAdded={handleTransactionAdded}
          />
        </div>
      </section>
    </div>
  );
}
