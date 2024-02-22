import React, { useState,useEffect } from 'react'
import logo from '../assets/Prani-Go-logos_black.png';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

const Booking = () => {

  const loci=useLocation();
  const fId=loci.pathname.split('/')[2]
  const navi=useNavigate()
  const [flight,setFlight]=useState({})
  useEffect(()=>{
    const fetchAllFlight=async()=>{
        try{
          // console.log(fId)
            await axios.get("http://localhost:8800/book/"+fId).then((res)=>{
              // console.log(res.data[0]);
                setFlight(res.data[0]);
              // console.log(flight)
            })
        }catch(err){
            console.log(err)
        }
    }
    fetchAllFlight()
},[])

  const [count,setCount]=useState(0)
  const handleClick= async (e)=>{
    try{
      // console.log(fId);
    await axios.post("http://localhost:8800/book/:id",{count:count,fID: fId} ).then((res)=>{
      if(res.data===0) alert("Enter Valid Number of Seats!!")
      else if(res.data.affectedRows===0) alert("Choose Less Number of Seats!!")
      // console.log(res)
    else {
      alert("Tickets Booked Succesfully!")
      navi("/home")
    }
      // console.log(res)
    })}
    catch(err){
      console.log(err)
    }
  }

  const handleChange=(e)=>{
    setCount(e.target.value)
  };

  return (
    <div className='bfin'>
        <div className='bseg'>
        <img src={logo} alt="Logo" id='logo'/>
        <p>{flight.company}</p>
        <p>From: {flight.start}&nbsp;&nbsp;-&gt;&nbsp;&nbsp;To: {flight.dest}</p>
        <p>Date: {moment(flight.date).utc().format('DD-MM-YYYY')}&nbsp;&nbsp;&nbsp;&nbsp;Cost: ₹{flight.cost}</p>
        <p>Seats Available: {flight.seats}</p>
        <input type="number" id='count' autoComplete='off' onChange={handleChange} min="1" max={flight.seats} placeholder="Enter no of seats" name='count' spellCheck='false'/>
        <button onClick={handleClick}>Book</button>
        </div>
    </div>
  )
}

export default Booking