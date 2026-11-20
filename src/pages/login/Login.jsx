import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Wallet } from "lucide-react";
import "./login.css";

export default function Login() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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

  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login_page">
      <div className="login_card">
        <Wallet size={42} color="#10b981" />
        <h1>Welcome to Finora</h1>
        <p>Sign in to manage your income and expenses.</p>
        <button onClick={handleSignIn}>Continue with Google</button>
      </div>
    </div>
  );
}