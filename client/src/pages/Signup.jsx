import React, { useState } from 'react'
import logo from '../assets/Prani-Go-logos_black.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Signup = () => {

  const [detail,setDetail]=useState({
    id:"",
    username:"",
    email:"",
    password:""
  })
  const navi=useNavigate()

  const handleChange=(e)=>{
    setDetail(prev=>({...prev,[e.target.name]:e.target.value}))
  };

  const handleClick= async e =>{
    e.preventDefault()
    try {
        await axios.post("https://prani-go.onrender.com/signup",detail).then((res)=>{
          const resp=res.data.code
          if(res.data===1) alert("Enter Username!")
          else if(res.data===2) alert("Enter Email!")
          else if(res.data===3) alert("Enter Password!")
          else
          if(resp==='ER_DUP_ENTRY'){ 
            alert("Username or Email already exists!!")
          }
          else{
            alert("Sign-Up Successful!!")
            navi("/")
          }
        })
    } catch (err) {
        console.log(err)
    }
  };

  console.log(detail)

  return (
    <div id="lgmain">
        <div className="suseg">
            <img src={logo} alt="Logo" id='logo'/>
            <h1>Sign Up</h1>
            <input type="text" id='username' onChange={handleChange} placeholder='Username' name='username' autoComplete='off' spellCheck='false'/> <br />
            <input type="text" id='email' onChange={handleChange} placeholder='Email' name='email' autoComplete='off' spellCheck='false'/> <br />
            <input type="password" id='password' onChange={handleChange} placeholder='Password' name='password' autoComplete='off' spellCheck='false'/>
            <button className='subtn' onClick={handleClick}>Sign up</button>
        </div>
    </div>
  )
}

export default Signup