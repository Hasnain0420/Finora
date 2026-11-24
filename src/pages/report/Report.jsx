
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import "./reports.css";

import MonthlyCashFlow from "../../components/common/charts/MonthlyCashFlow/MonthlyCashFlow";
import SpendingByCategory from "../../components/common/charts/SpendingByCategory/SpendingByCategory";
import MonthlyTrends from "../../components/common/charts/MonthlyTrends/MonthlyTrends";

import { DataContext } from "../../context/DataContext";
import { supabase } from "../../lib/supabase";

export default function Report() {
  const {
    availableYears,
    reportNewData,
    setReportNewData,
    reportTransactions: transactions,
    setReportTransactions: setTransactions,
  } = useContext(DataContext);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchTransactions() {
      if (!reportNewData) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const startDate = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`;

        const nextMonth = new Date(
          selectedYear,
          selectedMonth,
          1
        );

        const endDate = [
          nextMonth.getFullYear(),
          String(nextMonth.getMonth() + 1).padStart(2, "0"),
          "01",
        ].join("-");

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .gte("date", startDate)
          .lt("date", endDate)
          .order("date", { ascending: true });

        if (error) {
          throw error;
        }

        if (!isCancelled) {
          setTransactions(data);
          setReportNewData(false);
        }
      } catch (err) {
        console.error("Error fetching report transactions:", err);

        if (!isCancelled) {
          setError(err.message || "Failed to load report data.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchTransactions();

    return () => {
      isCancelled = true;
    };
  }, [
    reportNewData,
    selectedMonth,
    selectedYear,
    setReportNewData,
  ]);

  return (
    <div className="report">
      <h2 className="report_page_title">Reports</h2>

      {error && <p>{error}</p>}

      <section className="report_charts">
        <div className="report_visualizer">
          <MonthlyCashFlow
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            availableYears={availableYears}
            transactions={transactions}
            loading={loading}
          />

          <div className="report_graph_states">
            <SpendingByCategory transactions={transactions} />
            <MonthlyTrends selectedYear={selectedYear} />
          </div>
        </div>
      </section>
    </div>
  );
}
