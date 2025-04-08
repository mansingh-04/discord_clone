import { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

const initialCategories = [
  {
    id: "general",
    name: "GENERAL",
    channels: [
      { id: "welcome", name: "welcome", type: "text" },
      { id: "announcements", name: "announcements", type: "text" },
      { id: "general", name: "general", type: "text" },
    ],
  },
  {
    id: "voice",
    name: "VOICE CHANNELS",
    channels: [
      { id: "voice-general", name: "General", type: "voice" },
      { id: "voice-gaming", name: "Gaming", type: "voice" },
      { id: "voice-music", name: "Music", type: "voice" },
    ],
  },
];

export default function ChannelSidebar() {
  const [categories, setCategories] = useState(initialCategories);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("text");
  const [newChannelCategory, setNewChannelCategory] = useState("general");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(["general", "voice"]);
  const [activeChannel, setActiveChannel] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      const updatedCategories = categories.map((category) => {
        if (category.id === newChannelCategory) {
          return {
            ...category,
            channels: [
              ...category.channels,
              {
                id: `${newChannelType}-${Date.now()}`,
                name: newChannelName,
                type: newChannelType,
              },
            ],
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewChannelName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="channel-sidebar">
      <div className="channel-header">
        <h2>Gaming Squad</h2>
      </div>

      <div className="channel-list">
        {categories.map((category) => (
          <div key={category.id} className="channel-category">
            <div className="category-header" onClick={() => toggleCategory(category.id)}>
              <span className="category-name">{category.name}</span>
            </div>
            {openCategories.includes(category.id) && (
              <div className="category-channels">
                {category.channels.map((channel) => (
                  <Link
                    key={channel.id}
                    to={`/channels/${channel.id}`}
                    className={`channel-item ${activeChannel === channel.id ? "active" : ""}`}
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    # {channel.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="create-channel-btn" onClick={() => setIsDialogOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Channel
        </button>
      </div>

      {isDialogOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3>Create Channel</h3>
            </div>
            <div className="modal-content">
              <input
                placeholder="new-channel"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
              />
              <select value={newChannelType} onChange={(e) => setNewChannelType(e.target.value)}>
                <option value="text">Text Channel</option>
                <option value="voice">Voice Channel</option>
              </select>
              <select value={newChannelCategory} onChange={(e) => setNewChannelCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
              <button onClick={handleCreateChannel}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}