
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

  // Filter existing transactions locally
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
    return <div className="transaction_page">Loading transactions...</div>;
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
          title="Total Period Income"
          amount={formatPKR(totalIncome)}
          footerText="All-time total"
          bgColor="#f0faf4"
          borderColor="#d1eadb"
          iconColor="#16a34a"
          iconBgColor="#dcfce7"
          Icon={TrendingUp}
        />

        <IncomeCard
          title="Total Period Expense"
          amount={formatPKR(totalExpenses)}
          footerText="All-time total"
          bgColor="#fff5f5"
          borderColor="#fecaca"
          iconColor="#ef4444"
          iconBgColor="#fee2e2"
          Icon={TrendingDown}
        />

        <IncomeCard
          title="Net Period Balance"
          amount={formatPKR(netBalance)}
          footerText="All-time total"
          bgColor="#f0f7ff"
          borderColor="#dbeafe"
          iconColor="#3b82f6"
          iconBgColor="#dbeafe"
          Icon={Wallet}
        />
      </div>

      {/* Control Panel */}
      <TransactionControlPanel
        transactions={transactions}
        onFilterChange={setFilters}
      />

      {/* Transaction List */}
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}
