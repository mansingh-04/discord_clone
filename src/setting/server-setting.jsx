import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function ServerSettings() {
  const [serverName, setServerName] = useState("Gaming Squad");
  const [serverDescription, setServerDescription] = useState("A server for gaming enthusiasts");
  const [isPublic, setIsPublic] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock roles data
  const [roles, setRoles] = useState([
    {
      id: "admin",
      name: "Admin",
      color: "#FF0000",
      permissions: ["manage_server", "manage_channels", "manage_roles", "kick_members", "ban_members"],
    },
    { id: "moderator", name: "Moderator", color: "#00FF00", permissions: ["manage_channels", "kick_members"] },
    { id: "member", name: "Member", color: "#0000FF", permissions: [] },
  ]);

  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleColor, setNewRoleColor] = useState("#FFFFFF");

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newRole = {
        id: `role-${Date.now()}`,
        name: newRoleName,
        color: newRoleColor,
        permissions: [],
      };
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setNewRoleColor("#FFFFFF");
    }
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleSaveSettings = () => {
    // In a real app, you would save the settings to the backend
    alert("Settings saved!");
  };

  return (
    <div className="settings-container">
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
          Back to Server
        </Link>
        <h1 className="settings-title">Server Settings</h1>
      </div>

      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`settings-tab ${activeTab === "roles" ? "active" : ""}`}
          onClick={() => setActiveTab("roles")}
        >
          Roles
        </button>
        <button
          className={`settings-tab ${activeTab === "invites" ? "active" : ""}`}
          onClick={() => setActiveTab("invites")}
        >
          Invites
        </button>
      </div>

      <div className="settings-content">
        {activeTab === "overview" && (
          <div className="settings-card">
            <div className="settings-card-header">
              <h2 className="settings-card-title">Server Overview</h2>
              <p className="settings-card-description">Manage your server's basic information</p>
            </div>
            <div className="settings-card-content">
              <div className="form-group">
                <label htmlFor="server-name">Server Name</label>
                <input
                  id="server-name"
                  className="input"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="server-description">Server Description</label>
                <textarea
                  id="server-description"
                  className="textarea"
                  value={serverDescription}
                  onChange={(e) => setServerDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="form-group-inline">
                <label className="switch">
                  <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                  <span className="slider"></span>
                </label>
                <label htmlFor="public-server">Make server public</label>
              </div>
            </div>
            <div className="settings-card-footer">
              <button className="btn btn-primary" onClick={handleSaveSettings}>
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="settings-card">
            <div className="settings-card-header">
              <h2 className="settings-card-title">Server Roles</h2>
              <p className="settings-card-description">Manage roles and permissions for your server members</p>
            </div>
            <div className="settings-card-content">
              <div className="roles-section">
                <h3 className="section-title">Add New Role</h3>
                <div className="role-form">
                  <div className="form-group">
                    <label htmlFor="role-name">Role Name</label>
                    <input
                      id="role-name"
                      className="input"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role-color">Role Color</label>
                    <div className="color-picker">
                      <input
                        id="role-color"
                        type="color"
                        value={newRoleColor}
                        onChange={(e) => setNewRoleColor(e.target.value)}
                        className="color-input"
                      />
                      <input
                        value={newRoleColor}
                        onChange={(e) => setNewRoleColor(e.target.value)}
                        placeholder="#FFFFFF"
                        className="input"
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={handleAddRole}>
                    Add Role
                  </button>
                </div>
              </div>

              <div className="roles-section">
                <h3 className="section-title">Existing Roles</h3>
                {roles.map((role) => (
                  <div key={role.id} className="role-item">
                    <div className="role-info">
                      <div className="role-color" style={{ backgroundColor: role.color }} />
                      <span className="role-name">{role.name}</span>
                    </div>
                    <div className="role-actions">
                      <button className="btn btn-sm">Edit</button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={["admin", "member"].includes(role.id)}
                      >
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
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="settings-card-footer">
              <button className="btn btn-primary" onClick={handleSaveSettings}>
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "invites" && (
          <div className="settings-card">
            <div className="settings-card-header">
              <h2 className="settings-card-title">Server Invites</h2>
              <p className="settings-card-description">Manage invites to your server</p>
            </div>
            <div className="settings-card-content">
              <div className="invite-section">
                <h3 className="section-title">Invite Link</h3>
                <div className="invite-link-container">
                  <input className="input" value="https://discordly.com/invite/gaming-squad-123456" readOnly />
                  <button className="btn btn-outline">Copy</button>
                  <button className="btn btn-primary">Generate New</button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="invite-expiration">Invite Expiration</label>
                <select id="invite-expiration" className="select" defaultValue="never">
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="6h">6 hours</option>
                  <option value="12h">12 hours</option>
                  <option value="1d">1 day</option>
                  <option value="7d">7 days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="max-uses">Maximum Uses</label>
                <select id="max-uses" className="select" defaultValue="unlimited">
                  <option value="1">1 use</option>
                  <option value="5">5 uses</option>
                  <option value="10">10 uses</option>
                  <option value="25">25 uses</option>
                  <option value="50">50 uses</option>
                  <option value="100">100 uses</option>
                  <option value="unlimited">Unlimited</option>
                </select>
              </div>
            </div>
            <div className="settings-card-footer">
              <button className="btn btn-primary" onClick={handleSaveSettings}>
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
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
