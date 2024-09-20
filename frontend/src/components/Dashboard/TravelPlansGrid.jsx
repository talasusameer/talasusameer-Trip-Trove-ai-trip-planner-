import React from 'react';
import { TravelPlanCard } from '../TravelPlanCard.jsx';

const TravelPlansGrid = ({ plans, isCollab=false }) => {
  return (
    <div>
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plans.map(({ id, image, user_input }) => (
            <TravelPlanCard
              key={id}
              id={id}
              destination={user_input.destination}
              imageUrl={image}
              startDate={user_input.dates[0]}
              endDate={user_input.dates[1]}
              isCollab={isCollab}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-400 text-center text-sm sm:text-base">
            No travel plans found.
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelPlansGrid;
