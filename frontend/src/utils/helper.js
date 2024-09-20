export const paths = {
    login: '/login',
    signup: '/signup',
    home: '/',
    dashboard: '/dashboard',
    create: '/trips/create',
    trip: '/trips',
    community: '/community'
}

export function processDates(date1, date2) {
  // Parse the input dates
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the number of days between the two dates
  const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Format the dates to 'Month Day, Year'
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedStartDate = startDate.toLocaleDateString('en-US', options);
  const formattedEndDate = endDate.toLocaleDateString('en-US', options);

  return {
    numberOfDays: numberOfDays,
    formattedStartDate: formattedStartDate,
    formattedEndDate: formattedEndDate
  };
}


export function processDate(date1) {
  // Parse the input dates
  const endDate = new Date(date1);
  // Format the dates to 'Month Day, Year'
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return endDate.toLocaleDateString('en-US', options)
}


