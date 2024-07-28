import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
  
    const [photoUrl, setPhotoUrl] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (hotel?.hotelName) {
        GetPlacePhoto();
        } else {
        console.error("Hotel name is not defined.");
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        try {
        const data = {
            text_query:hotel?.hotelName
        };
        // console.log("Request data:", data);

        const result = await GetPlaceDetails(data);
        if (result.data.places.length > 0) {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[1].name);
            setPhotoUrl(PhotoUrl);
        } else {
            console.error("No photos found or index out of range.");
            setError("No photos found for the selected place.");
        }
        } catch (err) {
        console.error("Error fetching place details:", err);
        setError("Failed to fetch place details. Please try again later.");
        }
    };

    return (
    <div>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+ hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all '>
                    <img src={photoUrl?photoUrl:'/placeholder.webp'} className='rounded-xl h-[180px] w-full object-cover'/>
                    <div className='my-2 flex flex-col gap-1'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                        <h2 className='text-sm'>💵 {hotel?.price}</h2> 
                        <h2 className='text-sm'> {hotel?.rating} ⭐</h2>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default HotelCardItem