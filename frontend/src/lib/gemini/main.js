import {getPrompt} from "./prompt.js";
import {gen_trip} from "./GenAI.js";




export const generateTrip = async (input) => {
  const generatedPrompt = getPrompt(input);
  return await gen_trip(generatedPrompt);
}


export async function getUnsplashImage(cityName) {
    const accessKey = 'v_1pmCahrLiTZegwEkMOWKBPCblssya8CpputmYjpG8';
    const url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${accessKey}&per_page=1`;

    try {
        const response = await fetch(url);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if any results were returned
        if (data.results.length > 0) {
            // Return the URL of the first image
            return data.results[0].urls.regular;
        } else {
            return 'No images found';
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'Error fetching image';
    }
}




