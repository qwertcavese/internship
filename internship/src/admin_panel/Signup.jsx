import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import Signin from './Signin';
import { Routes,Route,useNavigate } from 'react-router-dom';
import Adminpanelapp from './Adminpanelapp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  

  

  
    // React.useEffect(()=>{
    //     if(sessionStorage.getItem("user")){
    //         z('/admin panel')
    //     }
    // },[])
    const z=useNavigate()
    

    const[username,setusername]=React.useState("")
    const[email,setemail]=React.useState("")
    const[pwd,setpwd]=React.useState("")
    
    if(sessionStorage.getItem("user")){
        z("/admin panel")
        return (
            <Adminpanelapp/>
        );
    }

  function handleinput(e){
     if(e.target.id=="username"){
        setusername(e.target.value)
        document.getElementById("usernamefield").innerHTML="";
        console.log(username);
    }
    else if(e.target.id=="email"){
        setemail(e.target.value)
        document.getElementById("emailfield").innerHTML="";
        console.log(email);
    }
    else{
        setpwd(e.target.value)
        document.getElementById("passwordfield").innerHTML="";
        console.log(pwd);
    }
  }

  function validate(){
    if(document.getElementById("username").value==""){

      document.getElementById("usernamefield").style.color="red"
      document.getElementById("usernamefield").innerHTML="pls enter username"
      document.getElementById("username").focus();
    }
    else if(document.getElementById("email").value==""){

      document.getElementById("emailfield").style.color="red"
      document.getElementById("emailfield").innerHTML="pls enter email"
      document.getElementById("email").focus();
    }
    else if(document.getElementById("password").value==""){

      document.getElementById("passwordfield").style.color="red"
      document.getElementById("passwordfield").innerHTML="pls enter password"
      document.getElementById("password").focus();
    }
  }

  function insertprofile(insertusername,insertemail,insertuserid){
    axios.post(
      'http://192.168.29.183:8000/insert_profile',
      {
        'user_id': insertuserid,
        'username':insertusername,
        'email':insertemail,
        'full_name': 'string',
        'dob': 'string',
        'phone_no': 'string'
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response)=>alert(response.data.message))
  }


  
  

  return (
    <>
    

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleinput}
                  />
                  <div id='usernamefield'></div>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleinput}
                  
                  />
                  <div id='emailfield'></div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleinput}
                  autoComplete="new-password"
                  
                  />
                <div id='passwordfield'></div>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                if(document.getElementById("username").value==""||
                document.getElementById("email").value==""||
                document.getElementById("password").value==""){

                  validate();
                }
                else{
                  axios.post(
                    'http://192.168.29.183:8000/signup',
                    {
                      'username':username,
                      'email':email,
                      'password':pwd
                    },
                    {
                      headers: {
                      'accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  }
                )
                .then((response)=>{
                  // alert(response.data.message);
                  AlertDialogSlide(response.data.message);
                  console.log(response);
                  insertprofile(response.data.user.username,response.data.user.email,response.data.user_id[0])
                })
                .catch((error)=>console.log(error.message))
                z('/Signin')
              }
              
              }}
              >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
              </>
  );
}







function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}