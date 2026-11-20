
import React from "react";
import {
  Wallet,
  ArrowRight,
  TrendingUp,
  ChartNoAxesCombined,
  ShieldCheck,
  ReceiptText,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const features = [
    {
      icon: <Wallet size={23} />,
      title: "Track Your Income",
      description:
        "Keep all your income records organized in one place.",
    },
    {
      icon: <ReceiptText size={23} />,
      title: "Manage Expenses",
      description:
        "Record your daily expenses and understand your spending.",
    },
    {
      icon: <ChartNoAxesCombined size={23} />,
      title: "Visual Reports",
      description:
        "Analyze your financial activity through clear reports.",
    },
    {
      icon: <ShieldCheck size={23} />,
      title: "Your Personal Account",
      description:
        "Keep your financial information connected to your account.",
    },
  ];

  return (
    <div className="landing_page">
      {/* Navbar */}
      <nav className="landing_nav">
        <Link to="/" className="landing_logo">
          <Wallet size={29} />
          <span>Finora</span>
        </Link>

        <div className="landing_nav_links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="landing_nav_actions">
          <Link to="/login" className="landing_signin">
            Sign In
          </Link>

          <Link to="/login" className="landing_nav_btn">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing_hero">
        <div className="hero_content">
          <span className="hero_badge">
            <CircleDollarSign size={16} />
            PERSONAL FINANCE MANAGEMENT
          </span>

          <h1>
            Take Control of Your Money.
            <span> Track Every Rupee.</span>
          </h1>

          <p>
            Manage your income, track your expenses, and
            understand your spending habits with Finora.
            Your finances, organized in one place.
          </p>

          <div className="hero_actions">
            <Link to="/login" className="hero_primary_btn">
              Get Started <ArrowRight size={18} />
            </Link>

            <a href="#features" className="hero_secondary_btn">
              Explore Features
            </a>
          </div>

          <div className="hero_trust">
            <CheckCircle2 size={17} />
            Simple, organized and easy to use
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero_preview">
          <div className="preview_header">
            <div>
              <span>Finora Dashboard</span>
              <p>Your financial overview</p>
            </div>

            <div className="preview_status">
              <span></span>
              Preview
            </div>
          </div>

          <div className="preview_stats">
            <div className="preview_stat income_stat">
              <span>Total Income</span>
              <strong>Rs. 85,000</strong>
              <TrendingUp size={19} />
            </div>

            <div className="preview_stat expense_stat">
              <span>Total Expenses</span>
              <strong>Rs. 32,000</strong>
              <ReceiptText size={19} />
            </div>
          </div>

          <div className="preview_balance">
            <span>Available Balance</span>
            <strong>Rs. 53,000</strong>
            <small>Your income minus expenses</small>
          </div>

          <div className="preview_chart">
            <div className="preview_chart_header">
              <strong>Monthly Overview</strong>
              <span>Last 7 months</span>
            </div>

            <div className="preview_bars">
              {[45, 65, 50, 85, 60, 75, 95].map(
                (height, index) => (
                  <div className="preview_bar_group" key={index}>
                    <div className="preview_bar_container">
                      <div
                        className="preview_bar"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing_features" id="features">
        <div className="section_heading">
          <span>FEATURES</span>
          <h2>Everything You Need to Manage Your Money</h2>
          <p>
            Take the stress out of managing your personal finances.
          </p>
        </div>

        <div className="features_grid">
          {features.map((feature, index) => (
            <div className="feature_card" key={index}>
              <div className="feature_icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing_how" id="how-it-works">
        <div className="section_heading">
          <span>HOW IT WORKS</span>
          <h2>Managing Money Made Simple</h2>
          <p>Three simple steps to better financial organization.</p>
        </div>

        <div className="how_grid">
          <div className="how_card">
            <div className="how_number">01</div>
            <h3>Create Your Account</h3>
            <p>Sign in and get started with your personal account.</p>
          </div>

          <div className="how_card">
            <div className="how_number">02</div>
            <h3>Add Transactions</h3>
            <p>Record your income and expenses whenever you need.</p>
          </div>

          <div className="how_card">
            <div className="how_number">03</div>
            <h3>Monitor Your Finances</h3>
            <p>Review your reports and understand your spending.</p>
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section className="landing_cta" id="about">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>
          Start organizing your money and make every rupee count.
        </p>

        <Link to="/login" className="hero_primary_btn">
          Get Started with Finora <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing_footer">
        <Link to="/" className="landing_logo">
          <Wallet size={25} />
          <span>Finora</span>
        </Link>

        <p>
          Take control of your finances, one transaction at a time.
        </p>

        <span>© {new Date().getFullYear()} Finora. All rights reserved.</span>
      </footer>
    </div>
  );
}
