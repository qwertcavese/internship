import{ useEffect, useState } from 'react'
import './Crudapp.css';
import axios from "axios"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Crudapp() {

    const[response,setresponse]=useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/get-example")
        .then((response)=>setresponse(response.data))
        .catch((error)=>console.log(error))
    },[response])
    console.log(response);

    const[fn,setfn]=useState("")
    const[pwd,setpwd]=useState("")
    const[updtid,setupdtid]=useState("");
  
    var handleinput=(e)=>{
      if(e.target.id=="firstname"){
        setfn(e.target.value)
        console.log(fn);
      }
      // else{
      //  setpwd(e.target.value)
      //  console.log(pwd);
      // }
    }
    // console.log(
    //   updtfn
    // );
  return (
    <div className='crudmain'>
        <h1>CRUD</h1>
        <div className='name'>
            <label>NAME</label>
            <input type="text" placeholder='&nbsp;&nbsp;&nbsp;&nbsp;Enter first name' id='firstname' value={fn}
            onChange={(e)=>handleinput(e)}/>
        </div>
        <div className='password'>
            <label>PASSWORD</label>
            <input type="text" placeholder='&nbsp;&nbsp;&nbsp;&nbsp;Enter password' id='password' value={pwd}
            onChange={(e)=>handleinput(e)}/>
        </div>
        <div id='smbtbtn'><button type='button' id='submitbtn' onClick={()=>{
          if(document.querySelector("#submitbtn").innerHTML=="Update"){
            axios.put("http://127.0.0.1:8000/put-example/"+updtid+"?new_value="+fn)
            document.querySelector("#submitbtn").innerHTML="Submit"
          }
          else{

            axios.post("http://127.0.0.1:8000/post-example?value="+fn)
          }
        }}>Submit</button></div>

        <div className='tablecontainer'>
        <TableContainer component={Paper}>
      <Table aria-label="simple table"> 
        <TableHead>
          <TableRow>
            <TableCell><b>NAME</b>  </TableCell>
            {/* <TableCell align="right"><b>PASSWORD</b></TableCell> */}
            <TableCell align="right"><b>ACTION</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {response.map((value,index) => (
            <TableRow
              // key={value.name}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {value.Name}
              </TableCell>
              {/* <TableCell align="right">{value.id}</TableCell> */}
              <TableCell align="right">
                <button id='submitbtn' style={{background:"red",color:"white",margin:"0px 10px 0px 0px"}}
                onClick={()=>{
                  axios.delete("http://127.0.0.1:8000/delete-example/"+value.id)
                  console.log(value.id);
                  
                }}>Delete</button>
                <button id='submitbtn' onClick={()=>{
                   
                   setfn(value.Name)
                   setupdtid(value.id)
                   document.querySelector("#submitbtn").innerHTML="Update"
                  //  if(document.querySelector("#submitbtn").value=="Update"){
                  //    axios.put("http://127.0.0.1:8000/put-example/"+value.id+"?new_value="+fn)
                  //   //  document.querySelector("#submitbtn").innerHTML="Submit"
                  //   }
                    
                }}>Update</button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>

    </div>
  )
}







