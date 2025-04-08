"use client"

import { useState } from "react"
import "../style.css"

const generateAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Mock data for members
const initialMembers = [
  { id: "user1", name: "Jane Cooper", avatar: generateAvatar("jane"), status: "online", role: "admin" },
  { id: "user2", name: "Alex Johnson", avatar: generateAvatar("alex"), status: "online", role: "moderator" },
  { id: "user3", name: "Sam Wilson", avatar: generateAvatar("sam"), status: "idle", role: "member" },
  { id: "user4", name: "Taylor Swift", avatar: generateAvatar("taylor"), status: "dnd", role: "member" },
  { id: "user5", name: "Morgan Freeman", avatar: generateAvatar("morgan"), status: "offline", role: "member" },
  { id: "user6", name: "Emma Watson", avatar: generateAvatar("emma"), status: "online", role: "member" },
]

export default function MembersList() {
  const [members] = useState(initialMembers)

  const groupedMembers = members.reduce((acc, member) => {
    acc[member.role] = acc[member.role] || []
    acc[member.role].push(member)
    return acc
  }, {})

  const statusClasses = {
    online: "status-online",
    idle: "status-idle",
    dnd: "status-dnd",
    offline: "status-offline",
  }

  return (
    <div className="members-list">
      <div className="members-container">
        <h3 className="members-title">Members — {members.length}</h3>
        <div className="members-scroll-area">
          {Object.entries(groupedMembers).map(([role, groupMembers]) => (
            <div key={role}>
              <h4 className="member-group-title">{role.charAt(0).toUpperCase() + role.slice(1)} — {groupMembers.length}</h4>
              {groupMembers.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-avatar-container">
                    <img src={member.avatar} alt={member.name} className="member-avatar" />
                    <span className={`status-indicator ${statusClasses[member.status] || "status-offline"}`} />
                  </div>
                  <span className="member-name">{member.name}</span>
                  {member.role !== "member" && <span className="member-role">{member.role}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}