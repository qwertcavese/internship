import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

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

export default function SignUp() {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLast] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  let newnav = useNavigate();
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleinput = (e) => {
    if (e.target.id === "firstName") {
      setFirstname(e.target.value);
      //   console.log(Firstname);

      document.getElementById("fname").innerHTML = ""

    } if (e.target.id === "lastName") {
      setLast(e.target.value);
      // console.log(Firstname);
      // console.log(Lastname);
      document.getElementById("lname").innerHTML = ""

    } if (e.target.id === "email") {
      setEmail(e.target.value);
      document.getElementById("em").innerHTML = ""


    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
      document.getElementById("pass").innerHTML = ""




    }

  };
  if (sessionStorage.getItem("user")) {

    newnav('/')
    return (
      <>

        <Home />
      </>
    );
    // console.log(1);
  }



  else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleinput}
                    sx={{ border: "" }}
                  />
                  <div id="fname"></div>

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleinput}
                    autoComplete="family-name"
                  />
                  <div id="lname"></div>
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
                  <div id="em"></div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleinput}

                  />
                  <div id="pass"></div>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

                onClick={() => {

                  if (Firstname === "") {
                    document.getElementById("fname").innerHTML = "*Enter First"
                    document.getElementById("fname").style.color = "red"
                    
                  }
                  if (Lastname === "") {
                    document.getElementById("lname").innerHTML = "*Enter last Name"
                    document.getElementById("lname").style.color = "red"
                  }
                  if (Email === "") {
                    document.getElementById("em").innerHTML = "*Enter Email"
                    document.getElementById("em").style.color = "red"
                  }
                  if (Password === "") {
                    document.getElementById("pass").innerHTML = "*Enter Password"
                    document.getElementById("pass").style.color = "red"
                  }
                  else {

                    const obj = {
                      "Firstname": Firstname,
                      "Lastname": Lastname,
                      "Email": Email,
                      "Password": Password,
                    };

                    axios.post("http://localhost:3000/a", obj);
                    document.getElementById("firstName").value = "" ;
                    document.getElementById("lastName").value = "" ;
                    document.getElementById("email").value = "" ;
                    document.getElementById("password").value = "" ;

                  }
                }
                }

              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}
