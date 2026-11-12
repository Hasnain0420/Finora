
import { supabase } from "./supabase";

// Fetch all transactions
export async function getTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// Add a transaction
export async function addTransaction(transaction) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("Please log in first.");
  }

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transaction,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Fetch transactions with optional filters
export async function getFilteredTransactions({
  date = "",
  category = "",
  minAmount = "",
  maxAmount = "",
  type = "",
} = {}) {
  let query = supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  // Filter by exact date
  if (date) {
    query = query.eq("date", date);
  }

  // Filter by category
  if (category) {
    query = query.eq("category", category);
  }

  // Filter by minimum amount
  if (minAmount !== "" && Number.isFinite(Number(minAmount))) {
    query = query.gte("amount", Number(minAmount));
  }

  // Filter by maximum amount
  if (maxAmount !== "" && Number.isFinite(Number(maxAmount))) {
    query = query.lte("amount", Number(maxAmount));
  }

  // Filter by transaction type
  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
