import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import "./ManageNetwork.css";

const sidebarItems = [
  {
    label: "Connections",
    icon: (
      // Network nodes icon
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" stroke="#222" strokeWidth="2"/><circle cx="12" cy="5" r="2" stroke="#222" strokeWidth="2"/><circle cx="19" cy="12" r="2" stroke="#222" strokeWidth="2"/><circle cx="12" cy="19" r="2" stroke="#222" strokeWidth="2"/><path d="M7 12h3m4 0h3M12 7v3m0 4v3" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    countKey: "connections"
  },
  {
    label: "Following & Followers",
    icon: (
      // User icon
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="2"/><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    countKey: null
  },
  {
    label: "Groups",
    icon: (
      // Group of people icon
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="7" cy="10" r="3" stroke="#222" strokeWidth="2"/><circle cx="17" cy="10" r="3" stroke="#222" strokeWidth="2"/><path d="M2 20c0-2.5 3.5-4 8-4m4 0c4.5 0 8 1.5 8 4" stroke="#222" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="3" stroke="#222" strokeWidth="2"/></svg>
    ),
    countKey: null
  },
  {
    label: "Events",
    icon: (
      // Calendar icon
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3" stroke="#222" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#222" strokeWidth="2" strokeLinecap="round"/><path d="M3 9h18" stroke="#222" strokeWidth="2"/></svg>
    ),
    countKey: null
  },
  {
    label: "Pages",
    icon: (
      // Document/page icon
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#222" strokeWidth="2"/><path d="M9 7h6M9 11h6M9 15h3" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    countKey: "pages"
  }
];

const ManageNetwork = () => {
  const { networkData } = useAuthContext();

  // Example counts (replace with real data as needed)
  const counts = {
    connections: networkData?.connections?.length || 204,
    pages: 4
  };

  return (
    <aside className="mn-sidebar-card">
      <div className="mn-sidebar-title">Manage my network</div>
      <div className="mn-sidebar-divider" />
      <ul className="mn-sidebar-list">
        {sidebarItems.map((item, idx) => (
          <li className="mn-sidebar-list-item" key={item.label}>
            <span className="mn-sidebar-left">
              <span className="mn-sidebar-icon">{item.icon}</span>
              <span className="mn-sidebar-label">{item.label}</span>
            </span>
            {item.countKey && (
              <span className="mn-sidebar-count">{counts[item.countKey]}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ManageNetwork;