"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../style.css"

export default function UserSettings() {
  const [username, setUsername] = useState("JaneDoe")
  const [email, setEmail] = useState("jane@example.com")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [activeTab, setActiveTab] = useState("account")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { darkMode, toggleTheme } = useTheme();

  const handleSaveSettings = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    alert("Settings saved!")
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={`settings-container ${!darkMode ? 'light-mode' : ''}`}>
      <div className="settings-header">
        <Link to="/dashboard" className="back-button">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="settings-title">User Settings</h1>
      </div>

      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          My Account
        </button>
        <button
          className={`settings-tab ${activeTab === "appearance" ? "active" : ""}`}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>
        <button
          className={`settings-tab ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {activeTab === "account" && (
        <div className="settings-card">
          <div className="settings-card-header">
            <h2 className="settings-card-title">Account Settings</h2>
            <p className="settings-card-description">Manage your account information</p>
          </div>
          <div className="settings-card-content">
            <div className="avatar-section">
              <img src={avatar} alt={username} className="user-avatar" />
              <div className="avatar-actions">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="btn btn-outline">
                  Upload Avatar
                </label>
                <p className="avatar-hint">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input id="current-password" type="password" className="input" />
            </div>

            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                id="confirm-password"
                type="password"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="settings-card-footer">
            <button className="btn btn-primary" onClick={handleSaveSettings}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="settings-card">
          <div className="settings-card-header">
            <h2 className="settings-card-title">Appearance Settings</h2>
            <p className="settings-card-description">Customize how Discord looks</p>
          </div>
          <div className="settings-card-content">
            <div className="theme-preview">
              <div className={`theme-preview-card ${!darkMode ? 'light-mode' : ''}`}>
                <div className="theme-preview-header">
                  <div className="theme-preview-title">Preview</div>
                </div>
                <div className="theme-preview-content">
                  <div className="theme-preview-message">
                    <div className="theme-preview-avatar"></div>
                    <div className="theme-preview-text">
                      <div className="theme-preview-name">User</div>
                      <div className="theme-preview-msg">This is how your Discord will look</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="appearance-option">
              <div className="appearance-option-info">
                <h3 className="appearance-option-title">Theme</h3>
                <p className="appearance-option-description">Choose between dark and light theme</p>
              </div>
              <div className="appearance-option-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!darkMode}
                    onChange={toggleTheme}
                  />
                  <span className="slider"></span>
                </label>
                <span className="theme-label">{darkMode ? 'Dark' : 'Light'} Mode</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="settings-card">
          <div className="settings-card-header">
            <h2 className="settings-card-title">Notification Settings</h2>
            <p className="settings-card-description">Manage how you receive notifications</p>
          </div>
          <div className="settings-card-content">
            {/* Add notification settings here */}
          </div>
        </div>
      )}
    </div>
  );
}
