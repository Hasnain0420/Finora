
import React, { useContext, useEffect, useState } from "react";
import {
  Outlet,
  useMatches,
  useLocation,
  Navigate,
} from "react-router-dom";

import { supabase } from "../lib/supabase";
import { DataContext } from "../context/DataContext";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import "./mainlayout.css";

export default function MainLayout() {
  const matches = useMatches();
  const location = useLocation();

  const page = matches.find(
    (match) => match.handle?.title
  )?.handle;

  const {
    setDashboardNewData,
    setTransactionNewData,
  } = useContext(DataContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen for authentication changes.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Listen for transaction changes in Supabase.
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`transactions-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          console.log("Transaction database change:", payload);

          setDashboardNewData(true);
          setTransactionNewData(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, setDashboardNewData, setTransactionNewData]);

  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  // Wait until Supabase checks the authentication session.
  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  // Redirect users who are not authenticated.
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="app_layout">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {isSidebarOpen && (
        <div
          className="sidebar_backdrop"
          onClick={closeSidebar}
        />
      )}

      <main className="main_content">
        <Header
          description={page?.description}
          onMenuClick={toggleSidebar}
          isLoggedIn={Boolean(user)}
          user={user}
          authLoading={authLoading}
          onSignIn={handleSignIn}
        />

        <div className="page_content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
