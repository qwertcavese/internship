const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const { json } = require("react-router-dom")

const app=express()
app.use(cors())
app.use(express.json())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get('/',(re,res)=>{
    return res.json("from server side")
})

app.get('/users',(req,res)=>{
    const sql="SELECT * FROM users"
    db.query(sql,(err,data)=>{
        return err ? res.json(err):res.json(data)
    })
})

app.post("/users",(req,res)=>{
    const sql="INSERT INTO users ('name','email','password') VALUES(?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,result)=>{
        return err ? res.json(err):res.json(result)
    })
})

app.listen(8081,()=>{
    console.log("listening");
})