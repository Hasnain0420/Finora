
import React, { useEffect, useState } from "react";
import "./transaction.css";

import IncomeCard from "../../components/common/card/Card";
import TransactionControlPanel from "../../components/common/TransactionControlPanel/TransactionControlPanel";
import TransactionList from "../../components/common/TransactionList/TransactionList";

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

import { getTransactions } from "../../lib/transactions";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);

  const [filters, setFilters] = useState({
    selectedDate: "",
    selectedCategory: "",
    minAmount: "",
    maxAmount: "",
    selectedType: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchTransactions();
  }, []);

  // Filter transactions locally
  const filteredTransactions = transactions.filter((item) => {
    const matchesDate =
      !filters.selectedDate || item.date === filters.selectedDate;

    const matchesCategory =
      !filters.selectedCategory ||
      item.category === filters.selectedCategory;

    const matchesMinAmount =
      filters.minAmount === "" ||
      Number(item.amount) >= Number(filters.minAmount);

    const matchesMaxAmount =
      filters.maxAmount === "" ||
      Number(item.amount) <= Number(filters.maxAmount);

    const matchesType =
      !filters.selectedType || item.type === filters.selectedType;

    return (
      matchesDate &&
      matchesCategory &&
      matchesMinAmount &&
      matchesMaxAmount &&
      matchesType
    );
  });

  // All-time totals (unfiltered)
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const formatPKR = (amount) =>
    `Rs. ${amount.toLocaleString("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="transaction_page">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction_page">
        <p role="alert">{error}</p>
      </div>
    );
  }

  return (
    <div className="transaction_page">
      <h2 className="transaction_page_title">Transactions</h2>

      {/* Summary Cards */}
      <div className="transaction_summary_grid">
        <IncomeCard
          title="Total Income"
          amount={formatPKR(totalIncome)}
          icon={TrendingUp}
          bgColor="#f4fbf7"
          borderColor="#d8f3e5"
          iconColor="#10b981"
          iconBg="#dcfce7"
        />

        <IncomeCard
          title="Total Expenses"
          amount={formatPKR(totalExpenses)}
          icon={TrendingDown}
          bgColor="#fff5f5"
          borderColor="#fecaca"
          iconColor="#ef4444"
          iconBg="#fee2e2"
        />

        <IncomeCard
          title="Net Balance"
          amount={formatPKR(netBalance)}
          icon={Wallet}
          bgColor="#f0f7ff"
          borderColor="#dbeafe"
          iconColor="#3b82f6"
          iconBg="#dbeafe"
        />
      </div>

      {/* Control Panel */}
      <TransactionControlPanel
        transactions={transactions}
        onFilterChange={setFilters}
      />

      {/* Transaction List / Empty State */}
      {filteredTransactions.length > 0 ? (
        <TransactionList transactions={filteredTransactions} />
      ) : (
        <div className="transaction_empty_state">
          <h3>
            {transactions.length === 0
              ? "No transactions yet"
              : "No transactions found"}
          </h3>

          <p>
            {transactions.length === 0
              ? "Your income and expenses will appear here once you add them."
              : "Try changing your filters to see transactions."}
          </p>
        </div>
      )}
    </div>
  );
}
