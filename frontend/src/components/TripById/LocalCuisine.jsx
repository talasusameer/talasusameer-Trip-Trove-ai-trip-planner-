import React from "react";
import {Utensils} from 'lucide-react'

export const LocalCuisine = ({localCuisineRecommendations}) => {
  return (
      <div id={'local-cuisines'} className="bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <Utensils /> Local Cuisine Recommendations</h2>
          {localCuisineRecommendations.map((activity, index)=> (
              <p key={index}>{index+1}. {activity.split(':')[0]}</p>
          ))}
      </div>
  );
};

