import React, { useEffect, useState } from 'react'

const Attendance = () => {
    const[records,setRecords]=useState("");
    const[summary,setSummary]=useState("");

    useEffect(()=>{
        const fetchAttendance=async()=>{
            try{
                const res=await api.get("/")
            }catch(e){}
        }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Attendance
