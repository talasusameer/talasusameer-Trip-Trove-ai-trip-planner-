import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { TravelPlanCard } from "./TravelPlanCard.jsx";
import pb from "../pocketbase/pocketbase.js";

const Dashboard = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getTrips() {
      const resultList = (await pb.collection('trips')
        .getFullList({
          filter: `public=True`,
          sort: '-created'
        }));

      const data = resultList.map(({ user_input, id, image }) => ({
        id, user_input, image
      }));

      setTravelPlans(data);
    }

    getTrips();
  }, []);

  // Filter travel plans based on search query
  const filteredTravelPlans = travelPlans.filter(plan =>
    plan.user_input.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-900 w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative flex-grow w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search Travel Plan..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {filteredTravelPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTravelPlans.map(({ id, image, user_input }) => (
              <TravelPlanCard
                key={id}
                id={id}
                destination={user_input.destination}
                imageUrl={image}
                startDate={user_input.dates[0]}
                endDate={user_input.dates[1]}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 min-h-[70vh] flex items-center justify-center">
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Your travel plans will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
