import { processDates } from "../../utils/helper.js";
import {schema} from "./schema.js";


let PROMPT_SUFFIX = `generate travel data according to the schema and in JSON format.\nDo not return anything in your response outside of curly braces.\nGenerate the response as per the function schema provided.\nDates given, activity preferences, and travelling with may influence the plan by 50%`;
PROMPT_SUFFIX += `Follow JSON schema.<JSONSchema>${JSON.stringify(schema)}</JSONSchema>`

const formatDateRange = (dates) => `from date-${dates[0]} to date-${dates[1]} and total ${processDates(dates[0],dates[1]).numberOfDays} days and create itinerary's for ${processDates(dates[0],dates[1]).numberOfDays} this many days`;

const formatTravelWith = (travelWith) => (travelWith ? ` Travelling with-${travelWith}.` : '');

const formatActivities = (activities) => {
  const selectedActivities = Object.entries(activities)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  return selectedActivities.length > 0 ? ` Activity preferences-${selectedActivities.join(", ")}.` : '';
};

export const getPrompt = ({ destination, dates, activities, travelWith }) => {
  const dateRange = formatDateRange(dates);
  const travelWithText = formatTravelWith(travelWith);
  const activitiesText = formatActivities(activities);
  return `Travel to ${destination}, ${dateRange}.${travelWithText}${activitiesText}\n${PROMPT_SUFFIX} `;
};



