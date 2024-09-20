import React from "react";
import {Backpack} from 'lucide-react'

export const PackingCheckList = ({packingChecklist}) => {
  return (
      <div id={'packing-checklist'} className="bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <Backpack /> Packing Checklist</h2>
          {packingChecklist.map((activity, index)=> (
              <p key={index}>{index+1}. {activity.split(':')[0]}</p>
          ))}
      </div>
  );
};

