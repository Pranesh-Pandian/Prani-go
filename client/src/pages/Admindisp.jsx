import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from "moment"

const Admindisp = () => {

    const [flight,setFlight]=useState([])

    useEffect(()=>{
        const fetchAllFlight=async()=>{
            try{
                const res=await axios.get("https://prani-go.onrender.com/adisp")
                setFlight(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllFlight()
    },[])

    const handleDelete =async(id)=>{
        try {
            await axios.delete("https://prani-go.onrender.com/adisp/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='final'>
        <div className="disp">
        <h1>Flight Details</h1> 
        {flight.map(fls=>(
            <div className='flightdisp'>
                <p className='comp'>{fls.company}</p>
                <p>{fls.duration}hrs</p>
                <p className='comp'>From: {fls.start}</p>
                <p>₹{fls.cost}</p>
                <p className='comp' >To: {fls.dest}</p>
                <p>{fls.seats}-seats</p>
                <p className='comp'>Date: {moment(fls.date).utc().format('DD-MM-YYYY')}</p>
                <p><button id="del" onClick={()=>handleDelete(fls.id)}>Remove</button></p>
            </div>
        ))}
        <button><Link to={"/add"} style={{ textDecoration: 'none', color:'white' }}>Add flight</Link></button>
        </div>
    </div>
  )
}

export default Admindisp