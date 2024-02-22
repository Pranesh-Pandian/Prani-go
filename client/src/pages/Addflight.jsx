import React, { useState } from 'react'
import logo from '../assets/Prani-Go-logos_black.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const AddFlight = () => {

  const [flight,setFlight]=useState({
    id:"",
    company:"",
    start:"",
    dest:"",
    duration:"",
    cost:"",
    date:""
  })
  const navi=useNavigate()

  const handleChange=(e)=>{
    setFlight(prev=>({...prev,[e.target.name]:e.target.value}))
    // console.log(flight)
  };

  const handleClick= async e =>{
    e.preventDefault()
    try {
        // console.log(flight.date);
        await axios.post("https://prani-go.onrender.com/add",flight).then((res)=>{
          const resp=res.data.code
          if(res.data===1) alert("Enter Companyname!")
          else if(res.data===2) alert("Enter Departure Location")
          else if(res.data===3) alert("Enter Destination Location")
          else if(res.data===4) alert("Enter Duration")
          else if(res.data===5) alert("Enter Cost")
          else if(res.data===6) alert("Enter Date")
          else
          if(resp==='ER_DUP_ENTRY') alert("Flight Id already Exists!")
          else{
              alert("Flight Added Successfully!!")
              navi("/adisp")
              }
        })
    } catch (err) {
        console.log(err)
    }
  };

  // console.log(flight)
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;    
  return (
    <div id="lgmain">
        <div className="aseg">
            <img src={logo} alt="Logo" id='logo'/>
            <h1>Add Flight Details</h1>
            <input type="text" id='company' onChange={handleChange} placeholder='Company' name='company' autoComplete='off'spellCheck='false'/> <br />
            <input type="text" id='start' onChange={handleChange} placeholder='Departure' name='start' autoComplete='off'spellCheck='false'/> <br />
            <input type="text" id='dest' onChange={handleChange} placeholder='Destination' name='dest' autoComplete='off'spellCheck='false'/> <br />
            <input type="text" id='duration' onChange={handleChange} placeholder='Ex: 2.00' name='duration' autoComplete='off' spellCheck='false' /><br />
            <input type="number" id='cost' onChange={handleChange} placeholder='Cost' name='cost' autoComplete='off' spellCheck='false'/><br />
            <input type="date" id='date' min={maxDate} onChange={handleChange} name='date'/>
            <button className='subtn' onClick={handleClick} id='add'>Add Flight</button>
        </div>
    </div>
  )
}

export default AddFlight