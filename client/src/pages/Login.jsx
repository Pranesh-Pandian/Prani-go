import {React,useState } from 'react'
import logo from '../assets/Prani-Go-logos_black.png';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {

  const [login,setLogin]=useState({
    username:"",
    password:""
  })
  const navi=useNavigate()
  const handleChange=(e)=>{
    setLogin(prev=>({...prev,[e.target.name]:e.target.value}))
  };
  const handleClick= async e =>{
    try{
      await axios.post("https://prani-go.onrender.com/",login).then((res)=>{
       if(res.data===1){
        alert("Logged In Successfully!!")
        navi("/home")
       }
       else if(res.data===2) alert("Enter UserName!")
       else if(res.data===3) alert("Enter Password!")
       else alert("Incorect Username or Password!")
      })
    }
    catch(err){console.log(err)}
  };

  return (
    <div id="lgmain">
        <div className="lgseg">
            <img src={logo} alt="Logo" id='logo'/>
            <h1>Login</h1>
            <input type="text" id='username' onChange={handleChange} placeholder='Username' name='username'spellCheck='false'/> <br />
            <input type="password" id='password' onChange={handleChange} placeholder='Password' name='password'spellCheck='false'/>
            <button className='lgbtn' onClick={handleClick} type='submit'>Login</button>
            <p>New User? <Link to="/signup" >Sign Up</Link></p>
            <p><Link to="/admin">Admin Login</Link></p>
        </div>
    </div>
  )
}

export default Login