import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Users, Camera, Mountain, Palette, Landmark, Coffee, ShoppingBag, Music, LoaderCircle } from 'lucide-react';
import AutoComplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {generateTrip, getUnsplashImage} from "../lib/gemini/main.js";
import pb from "../pocketbase/pocketbase.js";
import {Navigate, useNavigate, useNavigation} from "react-router-dom";


const CreateTravelPlanModal = ({ onClose }) => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();


 const onSubmit = async (inputdata) => {

  // Set loading state
  setIsLoading(true);
  try {
    // Generate the trip
    const trip = await generateTrip(inputdata);
    // Parse the trip data
    const parsedTrip = await JSON.parse(trip);
    const data = {
      "user_input": inputdata,
      "image": await getUnsplashImage(inputdata.destination.split(',')[0]),
      "trip": parsedTrip,
      "created_by": pb.authStore.model.id
};
    // Save the trip data to PocketBase
    const record = await pb.collection('trips').create(data);
    navigate(`trips/${record.id}`)
  } catch (error) {
    console.error('Error generating or saving trip:', error);
  } finally {
    // Reset loading state
    setIsLoading(false);

  }
};


  const activities = [
    { icon: Camera, label: 'Sightseeing' },
    { icon: Mountain, label: 'Adventure' },
    { icon: Palette, label: 'Cultural Experiences' },
    { icon: Landmark, label: 'Historical' },
    { icon: Coffee, label: 'Relaxation' },
    { icon: ShoppingBag, label: 'Shopping' },
    { icon: Music, label: 'Nightlife' },
  ];

  const travelWith = [
    { icon: Users, label: 'Solo' },
    { icon: Users, label: 'Couple' },
    { icon: Users, label: 'Family' },
    { icon: Users, label: 'Group' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create Travel Plan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Search for your destination city
            </label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <AutoComplete
                  className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  apiKey={import.meta.env.VITE_GOOGLE_PLACES_API}
                  onPlaceSelected={(place) => setValue('destination', place.formatted_address)}
                  placeholder="Search for your destination city..."
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Dates
            </label>
            <Controller
              name="dates"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                    field.onChange(update);
                  }}
                  isClearable={true}
                  placeholderText="Pick Travel Dates"
                  className="max-w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select the kind of activities you want to do (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, index) => (
                <Controller
                  key={index}
                  name={`activities.${activity.label}`}
                  control={control}
                  render={({ field }) => (
                    <label
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm cursor-pointer transition-colors duration-200 ${
                        field.value ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        {...field}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 hidden"
                      />
                      <activity.icon size={16} className="mr-2" />
                      {activity.label}
                    </label>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Who are you travelling with (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {travelWith.map((option, index) => (
                <Controller
                  key={index}
                  name="travelWith"
                  control={control}
                  render={({ field }) => (
                    <label
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm cursor-pointer transition-colors duration-200 ${
                        field.value === option.label ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        {...field}
                        value={option.label}
                        className="form-radio h-4 w-4 text-blue-600 rounded-full border-gray-300 focus:ring-blue-500 hidden"
                      />
                      <option.icon size={16} className="mr-2" />
                      {option.label}
                    </label>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >

              {isLoading? (
                  <div className={'flex justify-center items-center gap-2'}>
                    <LoaderCircle className={'animate-spin'}/>{' '}
                    <span>Loading...</span>
              </div>) : "Generate AI Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTravelPlanModal;
