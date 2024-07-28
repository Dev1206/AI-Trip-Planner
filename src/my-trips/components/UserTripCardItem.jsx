import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {

    const [photoUrl, setPhotoUrl] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (trip?.userSelection?.location?.label) {
        GetPlacePhoto();
      }
    }, [trip]);
  
    const GetPlacePhoto = async () => {
      try {
        const data = {
          text_query: trip?.userSelection?.location?.label
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.webp'} className="object-cover rounded-xl h-[220px]"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'> {trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCard