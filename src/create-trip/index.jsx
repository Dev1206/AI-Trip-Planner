import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI__PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {Dialog,DialogContent,DialogDescription,DialogHeader,} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/service/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
  

function CreateTrip() {
    
    const[place,setPlace] = useState();
    const[formData, setFormData] = useState([]);
    const[openDialog, setOpenDialog] = useState(false);
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelInputChange=(name,value) => {
        setFormData({
            ...formData,
            [name]:value,
        })    
    }

    useEffect(() => {
        console.log(formData);
    },[formData])

    const login = useGoogleLogin ({
        onSuccess:(codeResponse) => GetUserProfile(codeResponse),
        onError:(error) => console.log(error)
    })

    const onGenerateTrip = async() => {

        const user = localStorage.getItem('user');

        if(!user){
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays >10 && !formData?.location || !formData?.budget || !formData?.people ) {
            toast("Please fill all details!!")
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI__PROMPT
        .replace('{location}', formData?.location.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{people}' , formData?.people)
        .replace('{budget}' , formData?.budget)
        // .replace('{totalDays}', formData?.noOfDays)
        
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const SaveAiTrip = async(TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString();
        
        await setDoc(doc(db, "AITrip", docID), {
            userSelection:formData,
            tripData: JSON.parse(TripData),
            userEmail:user?.email,
            id:docID
          });
        
          setLoading(false);
          navigate('/view-trip/'+docID);
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user',JSON.stringify(resp.data));
            setOpenDialog(false);
            onGenerateTrip();
        })
    }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences 🌍 🗺️ </h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences. ✨</p>

        <div className='mt-20 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'>Where would you like to explore next?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange:(v) => {setPlace(v); handelInputChange('location',v)}
                        }}
                    />     
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>How long will your adventure be?</h2>
                <Input placeholder={'Ex.3'} type="number"
                    onChange={(e) => handelInputChange('noOfDays',e.target.value)}
                />
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>How much are you looking to spend on your trip?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5 '>
                    {SelectBudgetOptions.map((item,index)=>(
                        <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget==item.title && 'shadow-lg border-black'}`} 
                        onClick={()=>handelInputChange('budget',item.title)}>
                            <h2 className='text-3xl'>{item.icon}</h2>
                            <h2 className='text-lg font-bold'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>Who will be joining you on your next journey?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5 '>
                    {SelectTravelesList.map((item,index)=>(
                        <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.people==item.people && 'shadow-lg border-black'}`} 
                        onClick={()=>handelInputChange('people',item.people)}>
                            <h2 className='text-3xl'>{item.icon}</h2>
                            <h2 className='text-lg font-bold'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className='my-10 flex justify-end '>
            <Button onClick={onGenerateTrip} disabled={loading}>{loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Plan my Trip'}</Button>
                    
        </div>

        <Dialog open={openDialog} >
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <img className='' src='logo.svg'/>
                    <h2 className='font-bold text-xl mt-5 '>Sign-In with Google</h2>
                    <p>Sign in to the App with Google Authentication securely</p>
                    <Button  className="w-full mt-5 flex gap-3 items-center" onClick={login}><FcGoogle className='h-6 w-6'/> Sign-In with Google</Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )

}
export default CreateTrip


// The budget is exclusively allocated for activities and dining purposes.