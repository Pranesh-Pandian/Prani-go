import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from "moment"

const Flights = () => {
    // const [ers,setErs] =useState(false)
    const [search,setSearch]=useState({
        sstart:"",
        sdest:"",
        sdate:""
      })
    // const [date,setDate]=useState({
    //     sdate:""
    // })
    const [flight,setFlight]=useState([])
    // const [sflights,setSFlights]=useState(false)

    useEffect(()=>{
        const fetchsearch=async()=>{
            try {
                await axios.post("http://localhost:8800/home",search).then((res)=>{
                    console.log(res)
                    // if(res.data.length===0) setErs(true);
                    // else setErs(false)  
                    // console.log(ers)
                    setFlight(res.data)
                    // setErs(false)
                })
            } catch (err) {
                console.log(err)
            }
        }
        fetchsearch()
        // console.log("HELLO")
    },[search])

    // const sflight=flight.filter((item)=>{
    //     if(search.sstart==="" && search.sdest==="" && search.sdate===""){
    //         setSFlights(true) 
    //         return true;
    //     }
    //     else if(search.sdest==="" && search.sdate==="" && item.start.toLowerCase().includes(search.sstart.toLocaleLowerCase())) {
    //         setSFlights(true)
    //         return true;
    //     }
    //     else if(search.sstart==="" && search.sdate==="" && item.dest.toLowerCase().includes(search.sdest.toLocaleLowerCase())) {
    //         setSFlights(true)
    //         return true;
    //     }
    //     else if(search.sstart==="" && search.sdest==="" && item.date.toLowerCase().includes(search.sdate.toLocaleLowerCase())) {
    //         setSFlights(true)
    //         return true;
    //     }
    //     else if(search.sdate==="" && item.dest.toLowerCase().includes(search.sdest.toLowerCase()) && item.start.toLowerCase().includes(search.sstart.toLocaleLowerCase())) {
    //         setSFlights(true)
    //         return true;
    //     }
    //     setSFlights(false)
    //     return false
    // })

    useEffect(()=>{
        const fetchAllFlight=async()=>{
            try{
                const res=await axios.get("http://localhost:8800/home")
                setFlight(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllFlight()
    },[])

    const handleChange=(e)=>{
        setSearch(prev=>({...prev,[e.target.name]:e.target.value}))
        console.log(search)
    };
    // const handleDateChange=(e)=>{
    //     setDate(prev=>({...prev,[e.target.name]:e.target.value}))
    //     console.log(date)
    // };
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
    <div className='final'>
        <div className="disp">
        <h1>Flight Details</h1> 
        <div className='sear'>
        <label htmlFor="sstart">From:</label><input type="text" name='sstart' onChange={handleChange} placeholder='Search '/><label htmlFor="sdest">To: </label><input type="text" name='sdest' onChange={handleChange} placeholder='Search'/>
        <label htmlFor="sdate">Date:</label><input type="date" name='sdate' min={maxDate} onChange={handleChange}/>
        </div>
        {flight.map(fls=>(
            <div className='flightdisp'>
                <p className='comp'>{fls.company}</p>
                <p>{fls.duration}hrs</p>
                <p className='comp'>From: {fls.start}</p>
                <p>₹{fls.cost}</p>
                <p className='comp'>To: {fls.dest}</p>
                <p>{fls.seats}-seats</p>
                <p className='date comp'>Date: {moment.utc(fls.date).format('DD-MM-YYYY')}</p>
                <p><button id="book"><Link to={`/book/${fls.id}`} style={{ textDecoration: 'none', color:'black' }}>Book Tickets</Link></button></p>
            </div>
        ))}
        {flight.length===0 && <p id="err">No Flights Available!!</p>}
        </div>
    </div>
  )
}

export default Flights