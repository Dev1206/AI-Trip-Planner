import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {Dialog,DialogContent,DialogDescription,DialogHeader,} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';


const Header = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const[openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  },[])

  const login = useGoogleLogin ({
    onSuccess:(codeResponse) => GetUserProfile(codeResponse),
    onError:(error) => console.log(error)
  })

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
        window.location.reload();
    })
}

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <a href="/">
          <img src="/logo.svg" alt="" />
        </a>
        <div>
            {user 
            ? 
              <div className='flex items-center gap-3'>
                  <a href="/create-trip">
                    <Button variant="outline" className="rounded-full">Create Trip</Button>
                  </a>
                  <a href="/my-trips">
                    <Button variant="outline" className="rounded-full">My Trips</Button>
                  </a>
                  <Popover>
                    <PopoverTrigger>
                      <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
                    </PopoverTrigger>
                    <PopoverContent>
                      <h2 onClick={() => {googleLogout();localStorage.clear();window.location.reload();}} className='cursor-pointer'>
                        Logout
                      </h2>
                    </PopoverContent>
                  </Popover>
              </div>
            :
              <Button onClick={()=>setOpenDialog(true)}>Sign in</Button>
            }
        </div>
        <Dialog open={openDialog} >
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <img className='' src='/public/logo.svg'/>
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

export default Header