import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-5'>Recommended Hotels</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 cursor-pointer'>
            {trip.tripData?.hotelOptions?.map((hotel,index)=>(
                <HotelCardItem key={index} hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels
