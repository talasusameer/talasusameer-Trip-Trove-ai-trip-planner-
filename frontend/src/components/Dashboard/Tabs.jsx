import React from 'react';

const Tab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`text-sm sm:text-base font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out ${
          activeTab === 'Your Plans' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
        }`}
        onClick={() => setActiveTab('Your Plans')}
      >
        Your Plans
      </button>
      <button
        className={`text-sm sm:text-base font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out ${
          activeTab === 'Collaboration' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
        }`}
        onClick={() => setActiveTab('Collaboration')}
      >
        Collaboration
      </button>
      <button
        className={`text-sm sm:text-base font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out ${
          activeTab === 'Community Plans' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
        }`}
        onClick={() => setActiveTab('Community Plans')}
      >
        Community Plans
      </button>
    </div>
  );
};

export default Tab;
