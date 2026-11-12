import React from "react";
import "./sidebar.css";
import wallet from "../../assets/wallet.png";
import { NavLink } from "react-router-dom";
import {
  House,
  ArrowLeftRight,
  ChartNoAxesColumn,
  Settings,
  X,
  Sprout
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar_open" : ""}`}>
      <div className="logo">
        <img src={wallet} alt="Wallet" width="30" height="30" />

        <p>
          Finora
        </p>

        <button
          className="sidebar_close_btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={23} />
        </button>
      </div>

      <nav className="sidebar_nav">
        <NavLink to="/" end className="sidebar_link" onClick={onClose}>
          <House size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/transaction" className="sidebar_link" onClick={onClose}>
          <ArrowLeftRight size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/report" className="sidebar_link" onClick={onClose}>
          <ChartNoAxesColumn size={20} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/setting" className="sidebar_link" onClick={onClose}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar_footer">
  <Sprout size={32} strokeWidth={1.8} />

  <p>
    Good money
    <br />
    habits, a brighter
    <br />
    future
  </p>
</div>
    </aside>
  );
}