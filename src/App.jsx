
import { useState } from "react";
import { DataContext } from "./context/DataContext";

import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Transaction from "./pages/transaction/Transaction";
import Report from "./pages/report/Report";
import Setting from "./pages/setting/Setting";
import MainLayout from "./layout/MainLayout";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: {
          title: "Dashboard",
          description: "Here's your expense overview.",
        },
      },
      {
        path: "transaction",
        element: <Transaction />,
        handle: {
          title: "Transaction",
          description: "Analyze your spending trends.",
        },
      },
      {
        path: "report",
        element: <Report />,
        handle: {
          title: "Reports",
          description: "Track your income and expenses over time.",
        },
      },
      {
        path: "setting",
        element: <Setting />,
        handle: {
          title: "Settings",
          description: "Manage your preferences and account settings.",
        },
      },
    ],
  },
]);

function App() {
  const [dashboardTransactions, setDashboardTransactions] = useState([]);
  const [transactionTransactions, setTransactionTransactions] = useState([]);

  const [dashboardNewData, setDashboardNewData] = useState(true);
  const [transactionNewData, setTransactionNewData] = useState(true);

  return (
    <DataContext.Provider
      value={{
        dashboardTransactions,
        setDashboardTransactions,
        transactionTransactions,
        setTransactionTransactions,
        dashboardNewData,
        setDashboardNewData,
        transactionNewData,
        setTransactionNewData,
      }}
    >
      <RouterProvider router={router} />
    </DataContext.Provider>
  );
}

export default App;
