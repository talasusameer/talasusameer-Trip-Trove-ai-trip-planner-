import {
  Navigation,
  PlusCircle,
  Trash,
  Sunrise,
  Sun,
  Sunset
} from 'lucide-react';

const VaranasiItinerary = ({itinerary}) => {
  return (
    <article id="itinerary" className="scroll-mt-20 text-foreground shadow-md border rounded-lg p-5 bg-gray-800 ">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold tracking-wide flex items-center">
          <Navigation className="mr-2" />
          Itinerary
        </h2>
      </div>
      <ol className="relative border-s border-gray-200 dark:border-foreground/40 ml-10 mt-5">
        {itinerary.map((day, index) => (
          <li key={index} className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <Sun className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
            </span>
            <div className="flex justify-between mb-2 text-lg font-bold leading-2 text-foreground">
              <span>{day.title}</span>
            </div>
            <div className="flex flex-col gap-6">
              {Object.keys(day.activities).map((timeOfDay) => (
                <div key={timeOfDay} className="flex flex-col gap-2 shadow-md p-2 bg-gray-900 rounded-lg">
                  <h3 className="text-sm leading-none text-gray-600 w-max p-2 font-semibold flex justify-center gap-2 items-center capitalize">
                    {timeOfDay === 'morning' && <Sunrise className="w-4 h-4 text-blue-500" />}
                    {timeOfDay === 'afternoon' && <Sun className="w-4 h-4 text-yellow-500" />}
                    {timeOfDay === 'evening' && <Sunset className="w-4 h-4 text-gray-600 dark:text-white" />}
                    <div className="text-foreground">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</div>
                  </h3>
                  <ul className="space-y-1 text-muted-foreground pl-2">
                    {day.activities[timeOfDay].map((activity, activityIndex) => (
                      <li key={activityIndex}>
                        <div className="w-full p-1 overflow-hidden">
                          <span className="text-foreground font-semibold">{activity.itineraryItem}</span>
                          <p className="max-w-md md:max-w-full text-wrap whitespace-pre-line">{activity.briefDescription}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </article>)
};

export default VaranasiItinerary;
