import React from 'react'
import { useEffect,useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants'
import api from '../api'
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoutes({children}:any) {
    const naviagte = useNavigate()
   const [isAutherized, setAutherized] = useState<null|Boolean>(null);

   useEffect(()=>{
    auth().catch(()=>setAutherized(false))
   },[])

   const refreshToken=async function(){
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
        const res:any = await api.post('api/token/refresh/',{refresh:refreshToken})
        if(res.status ==200){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            setAutherized(true)
        }
    } catch (error) {
        console.log(error)
        setAutherized(false)
    }
   }

   const auth=async function(){
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log("Local Access token ",token)
    if(!token){
        setAutherized(false)
        return;
    }

    const tk = jwtDecode(token);
    const expired:any = tk.exp;
    const now = Date.now()/1000
    if(expired<now){
        await refreshToken();
    }else{
        setAutherized(true)
    }
   }
   if (isAutherized == null){<div>Loading...</div>}
   return isAutherized?children:naviagte('/login')
}

export default ProtectedRoutes