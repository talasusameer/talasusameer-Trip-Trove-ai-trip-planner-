import React, { useState } from 'react';
import pb from "../pocketbase/pocketbase.js"; // Make sure the path to your PocketBase instance is correct
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Settings = ({ tripId }) => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);

  const handleToggle = async (event) => {
    const newValue = event.target.checked;
    try {
      await pb.collection('trips').update(tripId, { public: newValue });
      setIsPublic(newValue);
      toast.success(newValue ? 'Trip successfully shared with the community!' : 'Trip no longer shared with the community.');
    } catch (error) {
      toast.error('Failed to update trip.');
      console.error('Error updating trip:', error);
    }
  };

  const handleDeleteTrip = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await pb.collection('trips').delete(tripId);
        navigate('/dashboard')
        toast.success('Trip successfully deleted!');
        // You may want to redirect the user or update the UI after deletion
      } catch (error) {
        toast.error('Failed to delete the trip.');
        console.error('Error deleting trip:', error);
      }
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-lg">Share with Community</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isPublic}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner"></div>
          <div className={`dot absolute w-4 h-4 bg-white rounded-full shadow ${isPublic ? 'translate-x-5' : 'translate-x-1'} transition-transform`}></div>
        </label>
      </div>
      <button
        onClick={handleDeleteTrip}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Delete Trip
      </button>
    </div>
  );
};

export default Settings;
