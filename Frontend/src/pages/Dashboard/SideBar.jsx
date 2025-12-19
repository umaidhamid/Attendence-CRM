import React from 'react'

const Sidebar = ({setPage}) => {
  return (
    <div>
      <h3>Menu</h3>
      <p onClick={()=>{setPage('Attendence')}}>
        Attendence</p>
    </div>
  )
}

export default Sidebar
