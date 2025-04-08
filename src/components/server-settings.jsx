import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style.css";

export default function ServerSettings() {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const [serverName, setServerName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    navigate(`/server/${serverId}`);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      // TODO: Implement delete functionality
      navigate("/");
    } else {
      setDeleteConfirm(true);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Server Settings</h2>
        <button className="close-button" onClick={() => navigate(`/server/${serverId}`)}>×</button>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>Overview</h3>
          <div className="form-group">
            <label>Server Name</label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Enter server name"
              className="input"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Server Icon</h3>
          <div className="server-icon-upload">
            <div className="server-icon-preview">
              {/* TODO: Add server icon preview */}
            </div>
            <button className="btn">Upload Image</button>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h3>Delete Server</h3>
          <p>Once you delete a server, there is no going back. Please be certain.</p>
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
          >
            {deleteConfirm ? "Click again to confirm" : "Delete Server"}
          </button>
        </div>
      </div>

      <div className="settings-footer">
        <button className="btn" onClick={() => navigate(`/server/${serverId}`)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
} 