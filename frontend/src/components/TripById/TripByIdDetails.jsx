import React from 'react';
import {Header} from "../Header.jsx";
import {AboutPlace} from "./AboutPlace.jsx";
import {TopActivities} from "./TopActivities.jsx";
import TopPlacesToVisit from "./TopPlacesToVisit.jsx";
import VaranasiItinerary from "../Itinerary/VaranasiItinerary.jsx";
import {LocalCuisine} from "./LocalCuisine.jsx";
import {PackingCheckList} from "./PackingCheckList.jsx";
import {BestTime} from "./BestTime.jsx";

function TripByIdDetails({trip}) {
    return (
        <div className="flex-1 p-8 w-3/4">
            <Header
                title={trip.user_input.destination}
                src={trip.image}
                dates={trip.user_input.dates}
            />
            <div className={'ml-64 flex flex-col gap-4'}>
                <AboutPlace aboutPlace={trip.trip.aboutThePlace}/>
                <TopActivities topActivities={trip.trip.adventuresActivitiesToDo}/>
                <TopPlacesToVisit places={trip.trip.topplacestovisit}/>
                <VaranasiItinerary itinerary={trip.trip.itinerary}/>
                <LocalCuisine localCuisineRecommendations={trip.trip.localCuisineRecommendations}/>
                <PackingCheckList packingChecklist={trip.trip.packingChecklist}/>
                <BestTime bestTimeToVisit={trip.trip.bestTimeToVisit}/>
            </div>
        </div>
    );
}

export default TripByIdDetails;