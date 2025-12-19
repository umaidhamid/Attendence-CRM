import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Attendence from './Attendance';
const UserDashboard = () => {
    const[page,setPage]=useState("")
  return (
    <div>
        <Sidebar setPage={setPage}/>

        <Topbar/>

        {!page &&<h2>Click on Attendence to View your Record</h2>}

        {page==="Attendence" && <Attendence/>}
      
    </div>
  )
}

export default UserDashboard
