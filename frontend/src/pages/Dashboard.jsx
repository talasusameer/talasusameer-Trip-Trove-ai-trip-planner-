import React, { useEffect, useState } from 'react';
import { Search, PlusSquare } from 'lucide-react';
import Tab from '../components/Dashboard/Tabs.jsx';
import SearchBar from '../components/Dashboard/SearchBar.jsx';
import TravelPlanList from '../components/Dashboard/TravelPlansGrid.jsx';
import CreateTravelPlanModal from '../components/CreateTravelPlanModal.jsx';
import pb from "../pocketbase/pocketbase.js";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Your Plans');
  const [travelPlans, setTravelPlans] = useState([]);
  const [collaboratePlans, setCollaboratePlans] = useState([]);
  const [communityPlans, setCommunityPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getTrips() {
      const yourPlansList = await pb.collection('trips').getFullList({
        filter: `created_by~"${pb.authStore.model.id}"`,
        sort: '-created'
      });

      const collaborateList = await pb.collection('trips').getFullList({
        filter: `collaborate~"${pb.authStore.model.id}"`,
        sort: '-created'
      });

      const communityList = await pb.collection('trips').getFullList({
        filter: `public=true`,
        sort: '-created'
      });

      const data = yourPlansList.map(({ user_input, id, image }) => ({
        id, user_input, image
      }));

      const collaborateData = collaborateList.map(({ user_input, id, image }) => ({
        id, user_input, image
      }));

      const communityData = communityList.map(({ user_input, id, image }) => ({
        id, user_input, image
      }));

      setTravelPlans(data);
      setCollaboratePlans(collaborateData);
      setCommunityPlans(communityData);
    }

    getTrips();
  }, [activeTab]);

  // Filter plans based on search query
  const filteredPlans = (plans) =>
    plans.filter(plan =>
      plan.user_input.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-gray-900 w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusSquare className="mr-2" size={20} />
            <span className="text-sm sm:text-base">Create Travel Plan</span>
          </button>
        </div>

        {activeTab === 'Your Plans' && (
          <TravelPlanList plans={filteredPlans(travelPlans)} />
        )}
        {activeTab === 'Collaboration' && (
          <TravelPlanList plans={filteredPlans(collaboratePlans)}  />
        )}
        {activeTab === 'Community Plans' && (
          <TravelPlanList plans={filteredPlans(communityPlans)} isCollab={activeTab === 'Community Plans'}/>
        )}
      </div>
      {isModalOpen && <CreateTravelPlanModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;