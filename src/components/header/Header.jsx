
import React from "react";
import "./header.css";
import { Bell, Menu } from "lucide-react";

export default function Header({
  title,
  description,
  onMenuClick,
  isLoggedIn,
  user,
  authLoading,
  onSignIn,
}) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "User";

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture;

  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="header">
      <button
        className="menu_btn"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu size={23} />
      </button>

      <div className="header_text">
        <p className="header_greeting">Good Evening,</p>

        <h1>{title || "Muhammad Hasnain"}</h1>

        <p className="header_description">
          {description || "Here's your expense overview for this month."}
        </p>
      </div>

      <div className="header_actions">
        <button
          className="notification_btn"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.8} />
          <span className="notification_dot"></span>
        </button>

        {!authLoading &&
          (isLoggedIn ? (
            <div
              className="profile_avatar"
              title={fullName}
              aria-label={`Profile: ${fullName}`}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="profile_image"
                />
              ) : (
                initials
              )}
            </div>
          ) : (
            <button
              className="sign_in_btn"
              onClick={onSignIn}
            >
              Sign In
            </button>
          ))}
      </div>
    </header>
  );
}
