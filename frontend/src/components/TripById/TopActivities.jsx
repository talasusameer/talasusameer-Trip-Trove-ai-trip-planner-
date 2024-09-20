import React from "react";
import {Ship} from 'lucide-react'

export const TopActivities = ({topActivities}) => {

    console.log(topActivities)
  return (
      <div id={'top-activities'} className="bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <Ship /> Top Activites</h2>
          {topActivities.map((activity, index)=> (
              <p key={index}>{index+1}. {activity.split(':')[0]}</p>
          ))}
      </div>
  );
};

