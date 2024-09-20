import React from "react";
import {Info} from 'lucide-react'

export const AboutPlace = ({aboutPlace}) => {
  return (
      <div id={'about-the-place'} className="bg-gray-800 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"> <Info /> About the Place</h2>
          <p>
              {aboutPlace}
          </p>
      </div>
  );
};

