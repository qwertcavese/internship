import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import "./Todo.css"
import Navbar from './Navbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Home(props) {

  const apiURL=props.apiURL
  const[runningTask,setrunningTask]=React.useState([])
  const[detailTask,setDetailTask]=React.useState([]);
  const[assignedUsers,setAssignedUsers]=React.useState([])
  const[change,setchange]=React.useState(true)

  

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const navigate=useNavigate()

  React.useEffect(()=>{
    try{

      axios.get(apiURL+"/get_running_tasks?current_user_id="+sessionStorage.getItem("user"))
      .then((response)=>{
        setrunningTask(response.data.user_tasks)  
        // console.log(response)
        
      })
    }
    catch(err){
      alert(err.message)
    }

    
  },[])
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='home-todo-main' style={{background:"rgb(197, 219, 252)",height:"100vh"}}>
      <Navbar/>



    {/* Dialog box code */}
      <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
            <h4 style={{
              textAlign:"center",
              fontWeight:"bold"
            }}>Task Details View</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
            
             
                <div className='show-detail-task-card' style={{padding:"5px"}}>
                  <h5 className='show-detail-task-headings'>Title:-{detailTask.title}</h5>
                  <h5 className='show-detail-task-headings'>Description:-{detailTask.description}</h5>
                  <h5 className='show-detail-task-headings'>Priority:-{detailTask.priority}</h5>
                  <h5 className='show-detail-task-headings'>Start Date:-{detailTask.start_date}</h5>
                  <h5 className='show-detail-task-headings'>End Date:-{detailTask.end_date}</h5>
                  <h5 className='show-detail-task-headings'>Owner Name:-{detailTask.owner_firstname}&nbsp;
                  {detailTask.owner_lastname}
                  </h5>
                  
                  <h5 className='show-detail-task-headings'>Users:-</h5>
                  {assignedUsers.map((val)=>{
                    return(
                      <div>
                        <h6>{val.firstname}&nbsp;{val.lastname}</h6>
                      </div>
                    );
                  })}
                </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{
            setchange(true)
            handleClose();
            }}>
            Close
          </Button>
          <Button onClick={()=>{
             axios.put(
              apiURL+'/complete_task/'+sessionStorage.getItem("taskId"),
              '',
              {
                params: {
                 'current_user': sessionStorage.getItem("user")
               },
               headers: {
                 'accept': 'application/json'
               }
             }
            )
            .then((res)=>alert(res.data.message))
            handleClose();
            navigate("/complete task")
          }} autoFocus disabled={change}>
            Complete
          </Button>
          <Button onClick={()=>{
            handleClose();
           navigate('/update task',{
            state:detailTask
           })
            }} 
            autoFocus
            disabled={change}
            >
            Edit
          </Button>
          <Button onClick={handleClose} autoFocus>
            Chat
          </Button>
        </DialogActions>
      </Dialog>
    </div>




      <div className='show-task-container'>
        <div className='display-task-box'>
        <ButtonGroup
      disableElevation
      // variant="contained"
      aria-label="Disabled elevation buttons"
      className='display-task-todo-buttons'
    >
      <Button className='display-task-todo-btn' onClick={()=>{
        console.log("running task");
      }}>Running</Button>
      <Button className='display-task-todo-btn' onClick={()=>{

        navigate("/complete task")
        
      }}>Complete</Button>
    </ButtonGroup>
        </div>
      </div>
        <div className='show-running-task-container'>

          <div className='show-running-task-box'>
            <h3 style={{textAlign:"center"}}>RUNNING TASKS</h3><hr />
            <div className='add-task-btn-container' style={{display:"flex",justifyContent:"end"}}>
              <Button variant="contained" onClick={()=>navigate("/add task")}>Add Task</Button>
            </div><hr/>

            <div className='show-running-task'>
              {runningTask.map((value)=>{
                return(
                  <div className='show-running-task-card' onClick={()=>{
                    // console.log("div clicked");
                    axios.get(apiURL+"/getTaskById/"+value.task_id)
                    // here res.data.task_details is not giving "array" it is giving "object" because
                    // we are opening data onclick of card and that card is of particular user
                    // it if in log api data has index it means it is in "array" else it is "object"
                    .then((res)=>{
                      setDetailTask(res.data.task_details)
                      setAssignedUsers(res.data.task_details.assigned_users)
                      sessionStorage.setItem("ownerId",value.owner_id)
                      sessionStorage.setItem("taskId",value.task_id)
                      if(sessionStorage.getItem("ownerId")==sessionStorage.getItem("user"))
                      {
                        setchange(false)
                      }
                    })
                    handleClickOpen();
                  }}>
                    {/* {console.log("z:",detailTask.owner_id)} */}
                    <h5>Title:-{value.title}</h5>
                    <div style={{display:"flex",justifyContent:"space-between"}}>

                    <h5>Priority:-{value.priority}</h5>
                    <h5>Start Date:-{value.start_date}</h5>
                    <h5>End Date:-{value.end_date}</h5>
                    </div>
                    <h5>Owner Name:-{value.owner_id}</h5>
                  </div>
                  );
              })}
            </div>
      
          </div>

        </div>
    </div>
  )
}



  
