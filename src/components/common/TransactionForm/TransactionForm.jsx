
import { useState } from "react";
import { CalendarDays, Tag } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import "./TransactionForm.css";

export default function TransactionForm({ onTransactionAdded }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // 1. Validate form fields
    if (
      !type ||
      !amount ||
      !category.trim() ||
      !date ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      setError("Form is filled incorrectly. Please check all fields.");
      return;
    }

    try {
      setSubmitting(true);

      // 2. Check whether user is logged in
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        throw authError;
      }

      if (!user) {
        setError("Please log in first to add a transaction.");
        return;
      }

      // 3. Prepare transaction data
      const transaction = {
        type,
        amount: Number(amount),
        category,
        date,
        description: description.trim() || null,
      };

      // 4. Call Dashboard callback
      await onTransactionAdded(transaction);

      // 5. Reset form after successful submission
      setAmount("");
      setCategory("");
      setDescription("");

    } catch (err) {
      console.error("Transaction submission error:", err);
      setError(err.message || "Failed to add transaction.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="transaction_form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Form Title */}
      <h3 className="transaction_form_title">Add Transaction</h3>

      {/* Error Message */}
      {error && (
        <p
          role="alert"
          style={{
            color: "#dc2626",
            fontSize: "13px",
            margin: "0 0 12px",
          }}
        >
          {error}
        </p>
      )}

      {/* Income / Expense Toggle */}
      <div className="transaction_type">
        <button
          type="button"
          className={type === "income" ? "active income_active" : ""}
          onClick={() => setType("income")}
        >
          Income
        </button>

        <button
          type="button"
          className={type === "expense" ? "active expense_active" : ""}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

      {/* Amount */}
      <div className="transaction_field">
        <label htmlFor="transaction_amount">Amount</label>

        <div className="transaction_amount_input">
          <span>Rs.</span>

          <input
            id="transaction_amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div className="transaction_field">
        <label htmlFor="transaction_category">Category</label>

        <div className="transaction_select_wrapper">
          <Tag size={15} />

          <select
            id="transaction_category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>

            {type === "income" ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Other Income">Other Income</option>
              </>
            ) : (
              <>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Other Expense">Other Expense</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Date */}
      <div className="transaction_field">
        <label htmlFor="transaction_date">Date</label>

        <div className="transaction_date_input">
          <CalendarDays size={15} />

          <input
            id="transaction_date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
      </div>

      {/* Description */}
      <div className="transaction_field">
        <label htmlFor="transaction_description">
          Description (Optional)
        </label>

        <textarea
          id="transaction_description"
          placeholder="Add a note..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={2}
        />
      </div>

      {/* Submit */}
      <button
        className="transaction_submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
