import React from "react";

function SidebarItem ({ name, icon, isActive, onClick })
{

    return (
        <button
            className={`flex items-center w-full px-2 py-2 mb-2 rounded ${
                isActive === name ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={onClick}
        >
            {icon}
            <span className="ml-2">{name}</span>
        </button>
    );
}

export default SidebarItem