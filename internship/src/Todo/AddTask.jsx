import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AddTask(props) {

  const apiURL=props.apiURL

   const[user,setuser]=React.useState([]);
   const [selectedUsers, setSelectedUsers] =React.useState([]);
   const [selectedUsersId, setSelectedUsersId] =React.useState([]);
   const[title,setTitle]=React.useState("")
   const[desc,setDesc]=React.useState("")
  //  console.log("id:",selectedUsersId);
  const[dis,setdis]=React.useState(false)
  
  //  console.log(user);
    function setvalidate(){
        alert("enter all field")
    }

    const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var users = {}
  function handleCheckboxChange(val,index){
     
    // ".checked" is inbuilt method which returns "true" if checkbox is ticked else "false"
    // and we have passed "index" in "getElementById" so on every ticked checkbox id will also
    // change its id to "index"

    // now we have changed "id" everytime because if we give constant "id" to checkbox than
    // every data of api will have same "id" and we will not able to validate it that whether
    // it is "true" or "false"
    var chkbox=document.getElementById(index).checked
    if(chkbox===true){
     
      // to add data to "object" named "users"
      users[val.id] = val.firstname +" "+val.lastname
      
    }
    else if(chkbox===false){
      // to remove data from "object" named "users"
      delete users[val.id]
    }
    //console.log(selectedusers);
    // console.log(users);
  }


  return (
    <div className='add-task-main'>
      <Navbar/>


{/* Dialog box code */}
<div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{display:"flex",justifyContent:"space-between"}}>
            <div>
              <h5 style={{
                textAlign:"center",
                fontWeight:"bold"
              }}>Name</h5>
              {user.map((val,index)=>{
                return(
                  <div key={index} style={{marginRight:"15px"}}>
                    <p style={{fontSize:"18px",textAlign:"center"}}>{val.firstname}&nbsp;{val.lastname}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <h5 style={{
                textAlign:"center",
                fontWeight:"bold"
              }}>Phone no.</h5>
              {user.map((val,index)=>{
                return(
                  <div key={index} style={{marginLeft:"15px"}}>
                    <p style={{fontSize:"18px",textAlign:"center"}}>
                      {val.phone}<input type="checkbox" style={{marginLeft:"5px"}} 
                       onChange={() => {
                        // console.log(val);
                        handleCheckboxChange(val,index);
                      }}
                      // our "id" is "index" so on each tick of checkbox it will return the index of
                      // Object we ticked so its "id" will also be changed everytime 
                        id={index}
                      />
                    </p>
                  </div>
                );
              })}
            </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display:"flex",justifyContent:"space-between"}}>
          <Button onClick={()=>{
            setSelectedUsers(Object.values(users))
            setSelectedUsersId(Object.keys(users))
            setdis(true)
            handleClose();
          }
          } autoFocus>
            Add
          </Button>
          <Button onClick={handleClose} autoFocus>
            Reset
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      <div className='add-task-container'>
        <div className='add-task-box'>
            <h5 className='add-task-headings'>Title:-</h5>
            <input type="text" placeholder='Enter Task Title' className='add-task-inputs'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <h5 className='add-task-headings'>Description:-</h5>
            <textarea name="" id="" cols="37" rows="7" 
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            placeholder='Enter Task Decription' className='add-task-inputs'></textarea>
            <h5 className='add-task-headings'>Start Date:-</h5>
            <input type="date" placeholder='Enter Task Title' id='add-task-start-date' className='add-task-inputs'/>
            <h5 className='add-task-headings'>End Date:-</h5>
            <input type="date" placeholder='Enter Task Title' id='add-task-end-date' className='add-task-inputs'/>
            <h5 className='add-task-headings'>Priority:-</h5>
            <select  id='add-task-priority'>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            <h5 className='add-task-headings'>Add User:-<button onClick={()=>{
              axios.get(apiURL+"/users?current_user_id="+sessionStorage.getItem("user"))
              .then((res)=>{setuser(res.data)})
              handleClickOpen();
              
            }}><AddIcon/></button></h5>
            <button type="button" onClick={()=>{
                var flag=true;
                var addTasks=document.querySelectorAll(".add-task-inputs")
                addTasks.forEach((addTask)=>{
                    if(addTask.value==""){
                        flag=false;
                    }
                })
                if(flag==false){
                    setvalidate();
                }
                else{
                  axios.post(
                    apiURL+'/add_task',
                    // '{\n  "title": "react",\n  "description": "react",\n  "start_date": "2024-01-25T08:13:00.325Z",\n  "end_date": "2024-01-25T08:13:00.325Z",\n  "priority": "medium",\n  "user_ids": [\n    1,2,3\n  ],\n  "owner_id": 1,\n  "status": 1\n}',
                    {
                      'title': title,
                      'description': desc,
                      'start_date': document.getElementById("add-task-start-date").value,
                      'end_date': document.getElementById("add-task-end-date").value,
                      'priority': document.getElementById("add-task-priority").value,
                      'user_ids': selectedUsersId,
                      'owner_id': sessionStorage.getItem("user"),
                      'status': 1
                    },
                    {
                      headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                    }
                  )
                  .then((res)=>alert(res.data.message))
                }
// console.log('title'+title+
// 'description'+ desc+
// 'start_date'+ document.getElementById("add-task-start-date").value+
// 'end_date'+ document.getElementById("add-task-end-date").value+
// 'priority'+ document.getElementById("add-task-priority").value+
// 'user_ids'+ [
//   selectedUsersId
// ]+
// 'owner_id'+ sessionStorage.getItem("user")+
// 'status'+ 1);

            }}>Add</button>
          <div style={{marginTop:"25px"}}>
            <h5>Users:-</h5>
            {selectedUsers.map((val)=>{

              if(dis===true){
                return(

                  <div>
                    <span>
                      {val}
                    </span>
                  </div>
                  )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
