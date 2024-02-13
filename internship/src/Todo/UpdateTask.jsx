import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function UpdateTask(props) {

    const apiURL=props.apiURL
    const z=useLocation();
    var a=z.state.assigned_users
    console.log("a:",a);
    const[updtUser,setUpdtUser]=useState([])
    const[check,setcheck]=useState([])
    var UserId=[];
    const [selectedUsers, setSelectedUsers] =React.useState([]);
   const [selectedUsersId, setSelectedUsersId] =React.useState([]);
   const [updtdesc, setUpdtDesc] =React.useState([z.state.description]);
   const[dis,setdis]=React.useState(false)
   var change=null;

   useEffect(()=>{
    try {
      
      axios.get(apiURL+"/users?current_user_id="+sessionStorage.getItem("user"))
      .then((res)=>{setUpdtUser(res.data)})
    } catch (error) {
      alert(alert(error.message))
    }
      // console.log("kkk",a);
      a.map((value)=>{

        check.push(value.user_id)
        // console.log("nnn",value);
        

      })
      console.log("check:",check);
      // console.log("selected users:",selectedUsers);
      
    },[])


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

  function handlechk(val,index){
    
  }


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
      check.splice(val.id,1)
    }
    // console.log(chkbox);
    console.log(users); 
    // console.log(check); 
  }


  return (
    <div className='update-task-main'>
      <Navbar/>
      <div className='update-task-container'>
        <div className='update-task-box'>
        <h5 className='add-task-headings'>Description:-</h5>
            <textarea name="" id="" cols="40" rows="5" 
            value={updtdesc}
            onChange={(e)=>setUpdtDesc(e.target.value)}
            placeholder='Enter Task Decription' className='add-task-inputs'></textarea>
             <h5 className='add-task-headings'
              style={{marginTop:"25px"}}
             >Add User:-<button onClick={handleClickOpen}><AddIcon/></button></h5>

           

            <button type="button" onClick={()=>{
                var flag=true;
                var addTasks=document.querySelectorAll(".add-task-inputs")
                addTasks.forEach((addTask)=>{
                    if(addTask.value==""){
                        flag=false;
                    }
                })
                try {
                  
                  if(flag==false){
                    setvalidate();
                }
                else{
                  axios.put(
                    apiURL+'/update_task/'+sessionStorage.getItem("taskId"),
                    {
                      'description': updtdesc,
                      'user_ids': selectedUsersId
                    },
                    {
                      params: {
                        'owner_id': sessionStorage.getItem("user")
                      },
                      headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                    }
                    )
                    .then((res)=>alert(res.data.message))
                    .catch(err=>alert(err.message))
                  }
                } catch (error) {
                  alert(error.message)
                }
                
            }}>Add</button>
        </div>

        <div>
            <h5>Users:-</h5>
            {selectedUsers.map((val,index)=>{
              if(dis===true){
                return(

                  <div key={index}>
                    <span>
                      {val}
                    </span>
                  </div>
                  )
              }
            })}
        </div>
            
            
            
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
              {updtUser.map((val,index)=>{
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
              {updtUser.map((val,index)=>{
               
                return(
                  <div key={index} style={{marginLeft:"15px"}}>
                    <p style={{fontSize:"18px",textAlign:"center"}}>
                      {val.phone}<input type="checkbox" style={{marginLeft:"5px"}}  
                       onChange={() => {
                        // console.log(val);
                        handleCheckboxChange(val,index);
                    }}
                    onClick={()=>handlechk(val,index)}
                      // our "id" is "index" so on each tick of checkbox it will return the index of
                      // Object we ticke  d so its "id" will also be changed everytime 
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
            {/* {console.log(selectedUsersId)} */}
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



      </div>
    </div>
  )
}
