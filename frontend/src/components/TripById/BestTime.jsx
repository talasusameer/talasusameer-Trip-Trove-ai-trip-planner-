import React from "react";
import {Clock} from 'lucide-react'

export const BestTime = ({bestTimeToVisit}) => {
  return (
      <div id={'best-time'} className="bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <Clock /> Best Time To Visit</h2>
          <p>{bestTimeToVisit}</p>
      </div>
  );
};

