import React from "react";
import {processDates} from "../utils/helper.js";

export function Header ({ title, src , dates}) {
    const result = processDates(dates[0], dates[1]);

    return(
        <div id={'imagination'} className="relative mb-8 ml-64 ">
            <img
                src={src}
                alt={title}
                className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 rounded-lg bg-gradient-to-t from-black to-100%">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-sm">{result.numberOfDays} days trip to {title}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm">
                {result.formattedStartDate} - {result.formattedEndDate}
            </div>
        </div>
    )
}