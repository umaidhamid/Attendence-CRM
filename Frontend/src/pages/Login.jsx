import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
    const[formdata,setFormdata]=useState({
        email:"",
        password:""
    })
    const changeHandler=(e)=>{
        setFormdata({
        ...formdata,
        [e.target.name]:e.target.value 
    })
}
    const navigate=useNavigate();

    const submitDetails=()=>{
        const email=formdata.email;
        const password=formdata.password;
        const{data}=axios.put("",{email,password})
        if(data.success){
            navigate('/home')
        }
    }
  return (
    <div>
      <h2>Login</h2>
      <input
  name='email'
  placeholder='Enter email'
  value={formdata.email}
  onChange={changeHandler}
/>
<input
  name='password'
  placeholder='Enter password'
  value={formdata.password}
  onChange={changeHandler}
/>
      <button onClick={submitDetails}>Continue</button>
    </div>
  )
}

export default Login
