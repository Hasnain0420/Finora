
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { DataContext } from "../context/DataContext";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import "./mainlayout.css";

export default function MainLayout() {
  const matches = useMatches();

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

  useEffect(() => {
    // Listen for sign-in, sign-out, and session changes.
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
    console.log("Current origin:", window.location.origin);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

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
