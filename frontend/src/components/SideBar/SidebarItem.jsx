import React from "react";

const SidebarItem = ({ name, icon, isActive, href, onClick }) => (
  <a
    className={`flex items-center w-full px-2 py-2 mb-2 rounded ${
      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
    }`}
    href={href}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{name}</span>
  </a>
);

export default SidebarItem