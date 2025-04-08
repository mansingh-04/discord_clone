import { useState } from "react";
import { Link } from "react-router-dom";
import "./server-sidebar.css";

const generateAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
};

const initialServers = [
  { id: "home", name: "Home", icon: generateAvatar("home") },
  { id: "gaming", name: "Gaming Squad", icon: generateAvatar("gaming") },
  { id: "study", name: "Study Group", icon: generateAvatar("study") },
  { id: "friends", name: "Friends", icon: generateAvatar("friends") },
];

export default function ServerSidebar() {
  const [servers, setServers] = useState(initialServers);
  const [newServerName, setNewServerName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateServer = () => {
    if (newServerName.trim()) {
      const newServer = {
        id: `server-${Date.now()}`,
        name: newServerName,
        icon: generateAvatar(newServerName),
      };
      setServers([...servers, newServer]);
      setNewServerName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="server-sidebar">
      <div className="servers-list">
        <div className="server-item">
          <Link to="/" className="server-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>
        </div>
        <div className="server-separator"></div>
        {servers.map((server) => (
          <div key={server.id} className="server-item">
            <Link to={`/server/${server.id}`} className="server-icon" title={server.name}>
              <img src={server.icon} alt={server.name} />
            </Link>
          </div>
        ))}
      </div>
      
      <div className="server-footer">
        <button 
          className="server-icon add-server" 
          onClick={() => setIsDialogOpen(true)}
          title="Add a Server"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {isDialogOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Create a new server</h3>
            </div>
            <div className="modal-content">
              <input
                className="input"
                placeholder="Enter server name"
                value={newServerName}
                onChange={(e) => setNewServerName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateServer}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
