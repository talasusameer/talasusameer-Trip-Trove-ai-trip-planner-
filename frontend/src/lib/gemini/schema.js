export const schema = {
  "type": "object",
  "properties": {
    "aboutThePlace": {
      "type": "string",
      "description": "About the place in at least 50 words"
    },
    "bestTimeToVisit": {
      "type": "string",
      "description": "Best time to visit"
    },
    "adventuresActivitiesToDo": {
      "type": "array",
      "description": "Top adventures activities, at least 5, like trekking, water sports, specify the place also",
      "items": {
        "type": "string"
      }
    },
    "localCuisineRecommendations": {
      "type": "array",
      "description": "Local Cuisine Recommendations",
      "items": {
        "type": "string"
      }
    },
    "packingChecklist": {
      "type": "array",
      "description": "Packing Checklist",
      "items": {
        "type": "string"
      }
    },
    "itinerary": {
      "type": "array",
      "description": "Itinerary for the specified number of days in array format",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Day title"
          },
          "activities": {
            "type": "object",
            "properties": {
              "morning": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "itineraryItem": {
                      "type": "string",
                      "description": "About the itinerary item"
                    },
                    "briefDescription": {
                      "type": "string",
                      "description": "Elaborate about the place suggested"
                    }
                  },
                  "required": ["itineraryItem", "briefDescription"]
                }
              },
              "afternoon": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "itineraryItem": {
                      "type": "string",
                      "description": "About the itinerary item"
                    },
                    "briefDescription": {
                      "type": "string",
                      "description": "Elaborate about the place suggested"
                    }
                  },
                  "required": ["itineraryItem", "briefDescription"]
                }
              },
              "evening": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "itineraryItem": {
                      "type": "string",
                      "description": "About the itinerary item"
                    },
                    "briefDescription": {
                      "type": "string",
                      "description": "Elaborate about the place suggested"
                    }
                  },
                  "required": ["itineraryItem", "briefDescription"]
                }
              }
            },
            "required": ["morning", "afternoon", "evening"]
          }
        },
        "required": ["title", "activities"]
      }
    },
    "topplacestovisit": {
      "type": "array",
      "description": "Top places to visit along with their coordinates, at least top 5, can be more",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the place"
          },
          "coordinates": {
            "type": "object",
            "properties": {
              "lat": {
                "type": "number",
                "description": "Latitude"
              },
              "lng": {
                "type": "number",
                "description": "Longitude"
              }
            },
            "required": ["lat", "lng"]
          }
        },
        "required": ["name", "coordinates"]
      }
    }
  },
  "required": ["aboutThePlace", "bestTimeToVisit", "adventuresActivitiesToDo", "localCuisineRecommendations", "packingChecklist", "itinerary", "topplacestovisit"]
}
