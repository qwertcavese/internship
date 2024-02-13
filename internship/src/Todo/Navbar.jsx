import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Todo.css"
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate=useNavigate();
  return (
    <div className='navbar-todo-main'>
      <div className='navbar-todo-container' style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h3 className='your-todo'><ListIcon style={{fontSize:"45px",paddingRight:"10px"}}/>Your ToDo</h3>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" style={{color:"white",border:"2px solid white",height:"40px"
        ,marginRight:"10px" }}
        // (condition) if true then after "?" will be called else after ":"
        disabled={(sessionStorage.getItem("user") ? false:true)}
        onClick={()=>{
          sessionStorage.removeItem("user")
          sessionStorage.removeItem("taskId")
          sessionStorage.removeItem("ownerId")
          sessionStorage.removeItem("register")
          navigate("/")
        }}>Logout</Button>
        </Stack>
      </div>
    </div>
  )
}
