
import React from "react";
import "./header.css";
import { Bell, Menu } from "lucide-react";

export default function Header({
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

  const currentHour = new Date().getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good to See You";
  }

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
        <p className="header_greeting">{greeting},</p>

        <h1>{isLoggedIn ? fullName : "LOG IN PLEASE"}</h1>

        <p className="header_description">
          {description}
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
