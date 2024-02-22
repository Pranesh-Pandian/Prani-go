import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";

const app= express();
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:"bhd3wiuhdycwupzxy8zj-mysql.services.clever-cloud.com",
    user:"ufwjujr9vslbyhzy",
    password:"PHrJOcBEvcDBQQyCW8gy",
    database:"bhd3wiuhdycwupzxy8zj"
})

app.post("/signup",async (req,res)=>{
    const q="INSERT INTO users (`username`,`email`,`password`) VALUE (?)"  
    const values=[req.body.username.trim(),req.body.email,req.body.password]
    if(values[0]=="") return res.json(1);
    else if(values[1]=="") return res.json(2);
    else if(values[2]=="") return res.json(3);
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("User Added");
    })
})

app.post("/add",async (req,res)=>{
    const q="INSERT INTO flights (`company`,`start`,`dest`,`duration`,`cost`,`date`) VALUES (?,?,?,?,?,?)"
    const vals=[req.body.company[0].toUpperCase()+req.body.company.slice(1),req.body.start[0].toUpperCase()+req.body.start.slice(1),req.body.dest[0].toUpperCase()+req.body.dest.slice(1),req.body.duration,req.body.cost,req.body.date]
    // console.log(vals);
    
    if(vals[0]=="") return res.json(1) 
    else if(vals[1]=="") return res.json(2)
    else if(vals[2]=="") return res.json(3)
    else if(vals[3]=="") return res.json(4)
    else if(vals[4]=="") return res.json(5)
    else if(vals[5]=="") return res.json(6)
    db.query(q,vals,(err,data)=>{
        if(err) return res.json(err)
        return res.json("Flight added!!")
    })

})

app.post("/",(req,res)=>{
    const username = req.body.username.trim();
    if(username=="") return res.json(2)
    const password = req.body.password;
    if(password=="") return res.json(3)
    const q="SELECT * FROM users WHERE `username`=(?)"
    db.query(q,username,(err,data)=>{
        // if(err) return res.json(err);
        // console.log(data);
        if(data.length==0) return res.json(0);
        else if(data[0].password==password) return res.json(1);
        else return res.json(0);
    })
})

app.get("/adisp",(req,res)=>{
    const q="SELECT * FROM flights"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/home",(req,res)=>{
    const q="SELECT * FROM flights WHERE seats>0"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/home",(req,res)=>{
    // if(req.body.sdate!=""){
    //     const q="SELECT * FROM flights WHERE `date` =(?)"
    //     db.query(q,req.body.sdate,(err,data)=>{
    //         if(err) return res.json(err)
    //         console.log(data)
    //         return res.json(data)
    //     })
        
    // }
    const q="SELECT * FROM flights WHERE `start` LIKE (?) AND `dest` LIKE (?) AND `date` LIKE (?)"
    // console.log(req.body.sdate)
    const vals=[`${req.body.sstart}%`,`${req.body.sdest}%`,`${req.body.sdate}%`]
    // console.log(vals)        
    db.query(q,vals,(err,data)=>{
        if(err) return res.json(data)
        // console.log(data)
        return res.json(data);
    })
    // console.log(vals)
    // console.log(req.body);
})

// app.get("/book/:id",(req,res)=>{
//     const q="SELECT * FROM flights WHERE `id`=?"
//     db.query(q,req.params.fid,(err,data)=>{
//         if(err) return res.json(err)
//         // console.log(req.params)
//         return res.json(data)
//     })
// })
app.post("/book/:id",(req,res)=>{
    const c=req.body.count;
    // console.log(c)
    if(c<=0) return res.json(0);
    else{
    const q=`UPDATE flights SET seats=seats-${c} WHERE id= ${req.body.fID} AND seats>=${c}`
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
    }
})

app.get("/book/:id",(req,res)=>{
    // console.log(req.params.id)
    const q=`SELECT * FROM flights WHERE id=${req.params.id}`
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
})

app.delete("/adisp/:id",(req,res)=>{
    const fid=req.params.id;
    const q="DELETE FROM flights WHERE id=?"
    db.query(q,[fid],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Flight removed successfully")
    })
})

app.listen(8800,()=>{
    console.log("Connected to backend")
})