
import React from "react";
import "./transactionList.css";

import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  HeartPulse,
  Gamepad2,
  GraduationCap,
  Wallet,
  Briefcase,
  TrendingUp,
  Gift,
  CircleDollarSign,
  MoreHorizontal,
} from "lucide-react";

const categoryIcons = {
  "Food & Dining": Utensils,
  Transportation: Car,
  Shopping: ShoppingBag,
  "Bills & Utilities": Receipt,
  Health: HeartPulse,
  Entertainment: Gamepad2,
  Education: GraduationCap,
  "Other Expense": MoreHorizontal,
  Salary: Wallet,
  Freelance: Briefcase,
  Investment: TrendingUp,
  Gift: Gift,
  "Other Income": CircleDollarSign,
};

export default function TransactionList({ transactions = [] }) {
  const formatPKR = (amount) =>
    `Rs. ${Number(amount).toLocaleString("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (transactions.length === 0) {
    return (
      <div className="transaction_list_empty">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="transaction_list">
      <div className="transaction_list_header">
        <h3>All Transactions</h3>
        <span>{transactions.length} transactions</span>
      </div>

      {/* Column Headings */}
      <div className="transaction_row transaction_table_heading">
        <span>Transaction</span>
        <span>Date</span>
        <span>Type</span>
        <span>Amount</span>
      </div>

      {/* Transaction Rows */}
      <div className="transaction_rows">
        {transactions.map((item) => {
          const Icon = categoryIcons[item.category] || MoreHorizontal;
          const isIncome = item.type === "income";

          return (
            <div className="transaction_row" key={item.id}>
              <div className="transaction_info">
                <div
                  className={`transaction_icon ${
                    isIncome ? "income_icon" : "expense_icon"
                  }`}
                >
                  <Icon size={19} />
                </div>

                <div className="transaction_details">
                  <strong>{item.category}</strong>
                  <span>{item.description || "No description"}</span>
                </div>
              </div>

              <span className="transaction_date">
                {formatDate(item.date)}
              </span>

              <span
                className={`transaction_type ${
                  isIncome ? "income_type" : "expense_type"
                }`}
              >
                {isIncome ? "Income" : "Expense"}
              </span>

              <strong
                className={`transaction_amount ${
                  isIncome ? "income_amount" : "expense_amount"
                }`}
              >
                {isIncome ? "+" : "-"} {formatPKR(item.amount)}
              </strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}
