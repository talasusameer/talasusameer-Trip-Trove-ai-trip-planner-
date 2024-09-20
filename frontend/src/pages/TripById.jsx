import {useEffect, useState} from 'react';
import {Sidebar} from "../components/SideBar/Sidebar.jsx";;
import {useParams} from "react-router-dom";
import pb from "../pocketbase/pocketbase.js";
import TripByIdDetails from "../components/TripById/TripByIdDetails.jsx";
import ExpenseTracker from "../components/Expenses/ExpenseTracker.jsx";
import CollaborateComponent from "../components/Collaborate.jsx";
import Settings from "../components/Settings.jsx";

const TripById = () => {
    const [trip, setTrip] = useState(null)
    let { tripId } = useParams();
    useEffect(() => {
        async function getTripById(){
            const record = await pb.collection('trips').getOne(`${tripId}`, {
                 expand: 'trip'
            });
            setTrip(record)
            return record;
        }

        getTripById()
    }, [tripId]);

  const [activeTab, setActiveTab] = useState('TripById');


  return (
      <>
          {trip === null ? "" : (
              <div className="relative flex bg-gray-900 text-white min-h-screen">
                  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
                  {activeTab === 'TripById' && (<TripByIdDetails trip={trip}/>)}
                  {activeTab === 'Expense Tracker' && (<ExpenseTracker/>)}
                  {activeTab === 'Collaborate' && (<CollaborateComponent tripId={tripId}/>)}
                  {activeTab === 'Settings' && (<Settings tripId={tripId}/>)}
              </div>
          )}
      </>

  );
};

export default TripById;