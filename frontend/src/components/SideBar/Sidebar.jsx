import {
    Calendar,
    Clock,
    CloudRain,
    Compass,
    DollarSign,
    Info,
    Map,
    Package,
    Route, Settings,
    Users,
    Utensils
} from "lucide-react";
import React, {useState} from "react";
import SidebarItem from "./SidebarItem.jsx";
import SidebarItem2 from "./SidebarItem2.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../../utils/helper.js";

export const Sidebar = ({activeTab, setActiveTab}) => {
    const isCommunity = window.location.pathname.startsWith('/community')
    const {tripId} = useParams();
    const navigate = useNavigate()
  const tabs = [
    { name: 'Your Imagination', icon: <Calendar className="w-5 h-5" />, action: '#imagination'},
    { name: 'About the Place', icon: <Info className="w-5 h-5" />, action: '#about-the-place' },
    { name: 'Top Activities', icon: <Compass className="w-5 h-5" />,action: '#top-activities' },
    { name: 'Top places to visit', icon: <Map className="w-5 h-5" /> ,action: '#top-places-to-visit' },
    { name: 'Itinerary', icon: <Route className="w-5 h-5" />, action: '#itinerary' },
    { name: 'Local Cuisines', icon: <Utensils className="w-5 h-5" />,action: '#local-cuisines'  },
    { name: 'Packing Checklist', icon: <Package className="w-5 h-5" />,action: '#packing-checklist'  },
    { name: 'Best time to visit', icon: <Clock className="w-5 h-5" />,action: '#best-time'  },
  ];

  const controlCenter = [
    { name: 'Expense Tracker', icon: <DollarSign className="w-5 h-5" />, to: `${paths.dashboard}${paths.trip}/${tripId}/expense-tracker`},
    { name: 'Collaborate', icon: <Users className="w-5 h-5" />, to: `${paths.dashboard}${paths.trip}/${tripId}/collaborate` },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, to: `${paths.dashboard}${paths.trip}/${tripId}/settings`},
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 p-4 fixed overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Your Plan</h2>
      <nav>
        {tabs.map((tab) => (
          <SidebarItem
            key={tab.name}
            name={tab.name}
            icon={tab.icon}
            href={tab.action}
            onClick={() => setActiveTab('TripById')}
          />
        ))}
      </nav>

        {!isCommunity && (<>
      <h2 className="text-xl font-bold mt-8 mb-4">Control Center</h2>
      <nav>
        {controlCenter.map((item) => (
          <SidebarItem2
            key={item.name}
            name={item.name}
            icon={item.icon}
            isActive={activeTab}
            onClick={() => {
                setActiveTab(item.name)
                navigate(item.to)
            }}
          />
        ))}
      </nav>
            </>)}
    </div>
  );
};

