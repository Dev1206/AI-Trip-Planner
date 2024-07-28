import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
    const itineraryData = trip.tripData?.dailyItinerary || trip.tripData?.itinerary || trip.tripData?.days;
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div>
        {itineraryData?.map((item,dayIndex)=>(
            <div key={dayIndex}>
                <h2 className='font-medium text-lg mt-3'>{item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                    {item.activities?.map((place,placeIndex)=>( // {item.plan?.map((place,placeIndex)=>(
                        <div key={placeIndex} className='my-1'>
                            <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default PlacesToVisit

