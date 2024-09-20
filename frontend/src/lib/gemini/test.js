const promptSuffix = `generate travel data according to the schema and in JSON format.\nDo not return anything in your response outside of curly braces. \nGenerate the response as per the function schema provided. \nDates given, activity preferences, and travelling with may influence the plan by 50%.`;

const getPrompt = ({ destination, dates, activities, travelWith }) => {
  let prompt = `Travel to ${destination}, from date-${dates[0]} to date-${dates[1]}.`;

  if (travelWith) {
    prompt += ` Travelling with-${travelWith}.`;
  }

  const selectedActivities = Object.entries(activities)
    .filter(([_, value]) => value)
    .map(([key, _]) => key);

  if (selectedActivities.length > 0) {
    prompt += ` Activity preferences-${selectedActivities.join(", ")}.`;
  }

  prompt += `\n${promptSuffix}`;
  return prompt;
};

// Example input:
const input = {
  destination: "Varanasi, Uttar Pradesh, India",
  dates: ["2024-08-24T18:30:00.000Z", "2024-08-29T18:30:00.000Z"],
  activities: {
    Sightseeing: false,
    "Cultural Experiences": true
  },
  travelWith: "Solo"
};

// Generating the prompt:
const generatedPrompt = getPrompt(input);
console.log(generatedPrompt);
