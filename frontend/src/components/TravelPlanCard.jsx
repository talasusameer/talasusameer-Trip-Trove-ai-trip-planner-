import { Calendar } from 'lucide-react';
import {Link} from "react-router-dom";

export const TravelPlanCard = ({ id, destination,  imageUrl, startDate, endDate, isCollab }) => {
  return (
    <Link className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white" to={`${isCollab ? `/community/trips/${id}` : `trips/${id}`}`}>
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={destination} />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h2 className="text-xl font-bold">{destination}</h2>
        </div>
      </div>
      <div className="px-4 py-2 flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        <span className="text-sm">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};

