import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";


const Verify = () => {
    const [searchParams]=useSearchParams();
    const token=searchParams.get("token");
    const email=searchParams.get("email");

    const[formdata,setFormdata]=useState({
        password:"",
        confirmPassword:"",
    })

    const[loading,setLoading]=useState(true);
    const[verifying,setVerifying]=useState(false);
    const[error,setError]=useState(false)

   useEffect(()=>{
     const verifyToken=async()=>{
        try{
        const{data}=await axios.post("",{token,email})

        if(data.success){
            setVerifying(true);
        }
        else{
            setError("Verification Denied")
        }
    }catch(e){
        setError("Something Went Wrong")
    }
    finally{
        setLoading(false)
    }
    }
    verifyToken();
   },[token,email])

   const changeHandler=(e)=>{
    setFormdata({
        ...formdata,
        [e.target.name]:e.target.value
    })
   }
   const navigate = useNavigate();

   const submitPassword=()=>{
    if(formdata.password!=formdata.confirmPassword){
        alert("Passwords Doesn't Match")
    }
    try{
        const {data}=axios.post("",{token,email,password:formdata.password})
        if(data.success){
            alert("password setted sucessfully")
            navigate("/login")
        }
        else{
            alert(data.message)
        }
    }catch(e){
        alert("something went wrong while setting pasword")
    }
   }
  return (
    <div className='verify-content'>
        {loading && <h2>Verifying the token</h2>}
        {!loading && error &&<h2 style={{color:"red"}}>{error}</h2>}
        {!loading && verifying && (<>
          <h2>Set Your Password</h2>
          <input name='password' placeholder='Enter the password' value={formdata.password} onChange={changeHandler} ></input>
          <input name="confirmPassword" placeholder='"Confirm Password' value={formdata.confirmPassword} onChange={changeHandler} ></input>
          <button onClick={submitPassword}>Submit</button>
        </>)}
    </div>
  )
}

export default Verify
