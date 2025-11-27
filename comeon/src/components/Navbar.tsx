"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { player, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setNotificationOpen(false);
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  if (!player) {
    return null;
  }

  return (
    <div
      className="ui top fixed menu"
      style={{ background: "#000", color: "#FFF" }}
    >
      <div className="item">
        <Image src="/images/logo.svg" alt="Logo" width={100} height={35} />
      </div>
      <div className="right menu">
        <div
          className={`ui dropdown item notification ${
            notificationOpen ? "active visible" : ""
          }`}
          onClick={toggleNotification}
          style={{ color: "#FFF", position: "relative" }}
        >
          <i className="bell outline icon" style={{ color: "#FFF" }}></i>
          <div
            className={`menu ${notificationOpen ? "transition visible" : ""}`}
            style={{ right: 0, left: "auto", minWidth: "260px" }}
          >
            <div className="header">Notifications</div>
            <div className="item">
              <p style={{ marginBottom: "0.25rem" }}>New tournament unlocked</p>
              <span className="ui tiny label">2m ago</span>
            </div>
            <div className="item">
              <p style={{ marginBottom: "0.25rem" }}>Weekly bonus ready</p>
              <span className="ui tiny label">1h ago</span>
            </div>
            <div className="item">
              <p style={{ marginBottom: "0.25rem" }}>Collect daily spin</p>
              <span className="ui tiny label">Today</span>
            </div>
            <div className="item">
              <button className="ui fluid mini button">View all</button>
            </div>
          </div>
        </div>

        <div
          className={`ui dropdown item ${dropdownOpen ? "active visible" : ""}`}
          onClick={toggleDropdown}
          style={{ color: "#FFF", padding: "10px", minWidth: "300px" }}
        >
          <Image
            className="ui avatar image"
            src={player.avatar}
            alt={`${player.name}'s avatar`}
            width={35}
            height={35}
          />
          <span className="text">{player.name}</span>
          <br />
          <span className="text">{player.event}</span>
          <i className="dropdown icon" style={{ color: "#FFF" }}></i>
          <div className={`menu ${dropdownOpen ? "transition visible" : ""}`}>
            <div className="item">
              <span className="text">
                <i className="pencil off icon"></i>
                Edit Profile
              </span>
            </div>
            <a className="item" onClick={logout}>
              <i className="power off icon"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
