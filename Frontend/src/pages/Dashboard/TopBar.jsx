import React, { useEffect, useState } from 'react'

const Topbar = () => {
    Const[username,setUsername]=useState("");

    useEffect(()=>{
        const getUser=async ()=>{
            try{
               const res= await api.get("/user/login")
               setUsername(res.data.username)
            }
            catch(e){}
        }
        
        getUser();
    },[]);
    return (
        <div>
            <span>{username}</span>
            <span>👤</span>

        </div>
    )
}

export default Topbar
