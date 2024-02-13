import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Adminpanelapp from "./Adminpanelapp";
import AlertDialogSlide from "./Dialoguebox";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const navigate = useNavigate();
  const [userdata, setuserdata] = React.useState([]);
  const [useremail, setuseremail] = React.useState([]);
  const [userpwd, setuserpwd] = React.useState([]);
  const [f, setf] = React.useState(0);
  if (sessionStorage.getItem("user")) {
    navigate("/admin panel");
    return <Adminpanelapp />;
  }
  function validate(){
    if(document.getElementById("email").value==""){
      document.getElementById("useremailfield").style.color="red"
      document.getElementById("useremailfield").innerHTML="pls enter username"
      document.getElementById("email").focus();
    }
    if(document.getElementById("password").value==""){
      document.getElementById("userpwdfield").style.color="red"
      document.getElementById("userpwdfield").innerHTML="pls enter username"
      document.getElementById("password").focus();
    }
  }
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => {
                  setuseremail(e.target.value)
                  document.getElementById("useremailfield").innerHTML="";
                }}
                autoComplete="email"
                autoFocus
                />
              <div id="useremailfield"></div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) =>{ 
                  setuserpwd(e.target.value)
                  document.getElementById("userpwdfield").innerHTML="";
                
                }}
                autoComplete="current-password"
              />
              <div id="userpwdfield"></div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  // axios.get("http://localhost:3000/user")
                  // .then((response) => {
                  //   // find() is function just like map but it returns value and stores it in variable declared
                  //   const foundUser = response.data.find((value) => {
                  //     return value.Email === useremail && value.password === userpwd
      
                  //   });

                  //   if (foundUser) {
                  //     sessionStorage.setItem("user", foundUser.Email);
                  //     // setf(1);
                  //     navigate("/admin panel");
                  //   } else {
                  //     alert("User does not exist");
                  //   }
                  // });
                  if(document.getElementById("email").value==""||document.getElementById("password").value==""){
                    validate();
                  }
                  else{
                    

                      axios.post(
                        'http://192.168.29.183:8000/token1',
                        new URLSearchParams({
                          'grant_type':'',
                        'username': useremail,
                        'password': userpwd,
                        'scope': '',
                        'client_id': '',
                        'client_secret': ''
                      }),
                      {
                        headers: {
                          'accept': 'application/json'
                        }
                      }
                      )
                      .then((response)=>{
                        console.log(response.data);
                        axios.get('http://192.168.29.183:8000/users/me', {
                          headers: {
                            'accept': 'application/json',
                            'Authorization': 'Bearer '+response.data.access_token
                          }
                        })
                        .then((response1)=>{
                          console.log("response1:",response1.data);
                          sessionStorage.setItem("user",response1.data.uid)
                          navigate("/admin panel")
                          
                        })
                        .catch((error)=>alert(error.message)
                        )
                      }).catch((r)=><AlertDialogSlide z={r}/>)

                    }
                  }
                }
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
