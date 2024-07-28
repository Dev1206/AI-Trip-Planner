import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({place}) {

    const [photoUrl, setPhotoUrl] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (place.placeName) {
        GetPlacePhoto();
      } else {
        console.error("Place name is not defined.");
      }
    }, [place]);

    const GetPlacePhoto = async () => {
        try {
          const data = {
            text_query:place.placeName
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
        } 
        catch (err) {
          // console.error("Error fetching place details:", err);
          // setError("Failed to fetch place details. Please try again later.");
        }
      };

  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md'>
        <img src={photoUrl?photoUrl:'/placeholder.webp'} className='w-[100px] h-[100px] rounded-lg object-cover'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-xs text-gray-400'>{place.placeDetails}</p>
            <div className='flex justify-between'>
              <div>
                <h2 className='text-xs mt-2'>🕐 {place.timeToTravel} {place.timeToTravelEachLocation}</h2>
                <h2 className='text-xs mt-2'>🎟️ {place.ticketPrice} {place.ticketPricing}</h2>
              </div>
                <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName+","+place?.placeCity} target='_blank'>
                    <Button size="sm" ><FaMapLocationDot /></Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PlaceCardItem