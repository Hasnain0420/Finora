
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
        "Record and organize your income in one place. Keep track of the money you receive and monitor your overall financial activity.",
    },
    {
      icon: <ReceiptText size={23} />,
      title: "Manage Your Expenses",
      description:
        "Add daily expenses, organize transactions by category, and understand where your money goes.",
    },
    {
      icon: <ChartNoAxesCombined size={23} />,
      title: "Visual Financial Reports",
      description:
        "View your income and expenses through clear charts and reports to better understand your spending habits.",
    },
    {
      icon: <ShieldCheck size={23} />,
      title: "Personal Finance Account",
      description:
        "Access your personal financial dashboard through your account and keep your transactions associated with your account.",
    },
  ];

  return (
    <div className="landing_page">
      {/* Navbar */}
      <nav className="landing_nav" aria-label="Main navigation">
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

      <main>
        {/* Hero Section */}
        <section className="landing_hero">
          <div className="hero_content">
            <span className="hero_badge">
              <CircleDollarSign size={16} />
              PERSONAL FINANCE MANAGEMENT
            </span>

            <h1>
              Personal Expense Tracker.
              <span> Take Control of Every Rupee.</span>
            </h1>

            <p>
              Finora makes personal finance management simple.
              Track your income, record daily expenses, manage
              transactions, and understand your spending habits
              with an organized financial dashboard.
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
            <h2>Everything You Need to Manage Your Personal Finances</h2>
            <p>
              Use one personal finance tracker to organize income,
              manage expenses, and monitor your financial activity.
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
            <h2>How to Manage Your Money with Finora</h2>
            <p>
              Get started with personal expense tracking in three
              simple steps.
            </p>
          </div>

          <div className="how_grid">
            <div className="how_card">
              <div className="how_number">01</div>
              <h3>Create Your Account</h3>
              <p>
                Sign in with your Google account to access your
                personal financial dashboard.
              </p>
            </div>

            <div className="how_card">
              <div className="how_number">02</div>
              <h3>Record Income and Expenses</h3>
              <p>
                Add your income and daily expenses to keep your
                financial transactions organized.
              </p>
            </div>

            <div className="how_card">
              <div className="how_number">03</div>
              <h3>Monitor Your Finances</h3>
              <p>
                Review your financial reports and analyze your
                spending patterns over time.
              </p>
            </div>
          </div>
        </section>

        {/* About / CTA */}
        <section className="landing_cta" id="about">
          <h2>Take Control of Your Personal Finances with Finora</h2>
          <p>
            Start tracking your income, managing expenses, and
            making better sense of your money.
          </p>

          <Link to="/login" className="hero_primary_btn">
            Get Started with Finora <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing_footer">
        <Link to="/" className="landing_logo">
          <Wallet size={25} />
          <span>Finora</span>
        </Link>

        <p>
          Your personal expense tracker for organizing income
          and managing everyday expenses.
        </p>

        <span>
          © {new Date().getFullYear()} Finora. All rights reserved.
        </span>
      </footer>
    </div>
  );
}