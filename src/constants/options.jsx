export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'Explore freely on your own.',
        icon:'🛫',
        people:'1',
    },
    {
        id:2,
        title:'Couple',
        desc:'Cherish special moments together.',
        icon:'👫',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:'Adventure for the whole family.',
        icon:'🧑‍🧑‍🧒‍🧒',
        people:'3 to 5 people',
    },
    {
        id:4,
        title:'Friends',
        desc:'Thrills with your best friends.',
        icon:'⛵️',
        people:'5 to 10 people',
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Explore without the splurge.',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Balance comfort and cost.',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Indulge in pure luxury.',
        icon:'💸',
    },
]

// export const AI__PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {people} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,rating, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'

export const AI__PROMPT = `
Generate a travel plan for Location: {location}, for {totalDays} days for {people} with a {budget} budget.
Include:
1. Hotel options list, each with:
   - Hotel Name: {hotel?.hotelName}
   - Hotel Address: {hotel?.hotelAddress}
   - Price: {hotel?.price}
   - Hotel Image URL: {hotel?.imageUrl}
   - Geo Coordinates: {hotel?.geoCoordinates}
   - Rating: {hotel?.rating}
   - Description: {hotel?.description}

2. Suggested itinerary with daily activities, each day including:
   - Place Name: {place?.placeName}
   - Place Details: {place?.placeDetails}
   - Place Image URL: {place?.imageUrl}
   - Geo Coordinates: {place?.geoCoordinates}
   - Ticket Pricing: {place?.ticketPrice}
   - Rating: {place?.rating}
   - Time to Travel Each Location: {place?.timeToTravel}
   - Best Time to Visit: {place?.bestTimeToVisit}
   - Place City : {place?.city}

The response should be in JSON format suitable for each day of the trip with detailed information about hotels and daily places to visit.the data flow should go as follows,I want all hotel information under hotelOptions and itinerary information under itinerary don not rename this 2 property.
`;


/*
id: "",
tripData: {
    hotelOptions:{},
    itinerary:{},
},
userEmail: "",
userSelection: {
    budget: "",
    location:{},
    noOfDays: "",
    people:""
}
*/ 