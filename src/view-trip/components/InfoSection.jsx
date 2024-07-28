import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { GoShare } from "react-icons/go";

function InfoSection({ trip }) {
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
    <div>
      <img src={photoUrl?photoUrl:'/placeholder.webp'} className='h-[340px] w-full object-cover rounded-xl '/>
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-4'>
            <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 md:text-xs'>🗓️ {trip?.userSelection?.noOfDays} Day Trip</h2>
            <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 md:text-xs'>💳 {trip?.userSelection?.budget}</h2>
            <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 md:text-xs'>🧳 No. of Travelers : {trip?.userSelection?.people}</h2>
          </div>
        </div>
        <Button><GoShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
