import React from "react";
import "./card.css";

function IncomeCard({
  title,
  amount,
  bgColor,
  borderColor,
  iconColor,
  iconBgColor,
  Icon,
  footerText,
}) {
  return (
    <div
      className="stat-card"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div
        className="icon-badge"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={20} color={iconColor} />
      </div>

      <span className="card-title">{title}</span>

      <h2 className="card-amount">{amount}</h2>

      {footerText && (
        <div className="card-footer">
          <span className="period">{footerText}</span>
        </div>
      )}
    </div>
  );
}

export default IncomeCard;