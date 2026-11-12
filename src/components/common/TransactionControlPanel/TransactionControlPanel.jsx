
import React, { useState } from "react";
import "./transactionControlPanel.css";

export default function TransactionControlPanel({
  transactions = [],
  onFilterChange,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Send updated filters to parent
  const updateFilters = (filters) => {
    onFilterChange?.(filters);
  };

  // Get unique categories
  const categories = [
    ...new Set(transactions.map((item) => item.category)),
  ].sort();

  // Get dates from the current month
  const now = new Date();

  const currentMonthDates = [
    ...new Set(
      transactions
        .filter((item) => {
          const transactionDate = new Date(`${item.date}T00:00:00`);

          return (
            transactionDate.getFullYear() === now.getFullYear() &&
            transactionDate.getMonth() === now.getMonth()
          );
        })
        .map((item) => item.date)
    ),
  ].sort((a, b) => b.localeCompare(a));

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      selectedDate,
      selectedCategory,
      minAmount,
      maxAmount,
      selectedType,
      [filterName]: value,
    };

    switch (filterName) {
      case "selectedDate":
        setSelectedDate(value);
        break;
      case "selectedCategory":
        setSelectedCategory(value);
        break;
      case "minAmount":
        setMinAmount(value);
        break;
      case "maxAmount":
        setMaxAmount(value);
        break;
      case "selectedType":
        setSelectedType(value);
        break;
      default:
        break;
    }

    updateFilters(updatedFilters);
  };

  return (
    <div className="transaction_control_panel">
      {/* Date Range */}
      <div className="control_field">
        <label htmlFor="date_filter">Date Range</label>

        <select
          id="date_filter"
          value={selectedDate}
          onChange={(e) =>
            handleFilterChange("selectedDate", e.target.value)
          }
        >
          <option value="">All Dates</option>

          {currentMonthDates.map((date) => (
            <option key={date} value={date}>
              {new Date(`${date}T00:00:00`).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="control_field">
        <label htmlFor="category_filter">Category</label>

        <select
          id="category_filter"
          value={selectedCategory}
          onChange={(e) =>
            handleFilterChange("selectedCategory", e.target.value)
          }
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Range */}
      <div className="control_field">
        <label>Amount Range</label>

        <div className="amount_range_inputs">
          <input
            type="number"
            min="0"
            placeholder="From"
            value={minAmount}
            onChange={(e) =>
              handleFilterChange("minAmount", e.target.value)
            }
          />

          <span>—</span>

          <input
            type="number"
            min="0"
            placeholder="To"
            value={maxAmount}
            onChange={(e) =>
              handleFilterChange("maxAmount", e.target.value)
            }
          />
        </div>
      </div>

      {/* Types */}
      <div className="control_field type_filter">
        <label>Types</label>

        <div className="type_filter_buttons">
          <button
            type="button"
            className={selectedType === "" ? "active all" : "all"}
            onClick={() => handleFilterChange("selectedType", "")}
          >
            All
          </button>

          <button
            type="button"
            className={selectedType === "income" ? "active income" : "income"}
            onClick={() => handleFilterChange("selectedType", "income")}
          >
            Income
          </button>

          <button
            type="button"
            className={selectedType === "expense" ? "active expense" : "expense"}
            onClick={() => handleFilterChange("selectedType", "expense")}
          >
            Expense
          </button>
        </div>
      </div>
    </div>
  );
}
