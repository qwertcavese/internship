import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import login2 from "../assets/login2.png"
import login1 from "../assets/login1.png"
import login3 from "../assets/login3.png"
import logo from "../assets/logo.png"
import { Await, NavLink, useNavigate } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';
import PostSignin, { PostResetRequest, PutNewPwd } from './ApiServices';
import Modal from '@mui/material/Modal';
import ForgotPwd from './ForgotPwd';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn(props) {
  const [responseData, setResponseData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  function RemovePopUp() {
    sessionStorage.removeItem("popUp")
  }
  const [email, setEmail] = React.useState("")
  const [pwd, setPwd] = React.useState("")
  const navigate = useNavigate();

  function validate() {
    if (document.getElementById("email").value == "") {
      document.getElementById("useremailfield").style.color = "red"
      document.getElementById("useremailfield").innerHTML = "Please Enter Username"
      document.getElementById("email").focus();
    }
    if (document.getElementById("password").value == "") {
      document.getElementById("userpwdfield").style.color = "red"
      document.getElementById("userpwdfield").innerHTML = "Please Enter Password"
      document.getElementById("password").focus();
    }
  }


  var token = window.location.search
  var lastIndex = token.lastIndexOf("=")
  var forgotPwdUrl = token.substring(lastIndex + 1, token.length)
  sessionStorage.setItem("forgotPwdToken", forgotPwdUrl)
  // console.log("pwdNew:",forgotPwdUrl);

  if (sessionStorage.getItem("forgotPwdToken")) {
    return <ForgotPwd />
  }

  else {
    return (
      <div className='sign-in-main'>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
          >
            <div>
              <img src={login2} alt="login logo" className='login2-logo' />
              <div className='login3-logo'>
                <img src={login3} alt="login logo" className='login3-logo' />
              </div>
              <div className='login-para'>

                <p style={{ color: "rgba(207, 167, 103, 1)" }}>Securely pay anyone, anywhere, in-store or online using <br />
                  Wallet or directly from your bank account. Easily <b>send <br />
                    and receive money hassle-free.</b></p>
              </div>
              <div className='login1-logo'>
                <img src={login1} alt="login logo" className='login1-logo' />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='signin-container'
            style={{ height: "100vh" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flexStart',
                marginTop: "15px",
              }}
              className="signin-box"
            >
              <img src={logo} alt="logo" className='logo' />
              <Typography style={{ fontWeight: "bold" }} className='signin-typo'>
                SignIn
                <NavLink style={{ textDecoration: "none", color: "rgba(207, 167, 103, 1)", display: "flex" }}
                  className="help-typo">Help
                  <div>
                    <HelpIcon />
                  </div>
                </NavLink>
              </Typography>
              <Typography className='fund-pay-typo'>
                Welcome Login with your FUND PAY account.
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <div>

                  <label htmlFor="" className='input-field-labels'>Email Address/Mobile Number</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    placeholder='abc@gmail.com'
                    name="email"
                    autoComplete="email"
                    className='input-field-signin'
                    autoFocus
                    onChange={(e) => {
                      setEmail(e.target.value)
                      document.getElementById("useremailfield").innerHTML = "";
                    }}
                  />
                  <div id="useremailfield" style={{ marginTop: "-10px", position: "fixed" }}></div>
                </div>
                <div style={{ marginTop: "7px" }}>

                  <label htmlFor="" className='input-field-labels'>Password</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    placeholder='Enter Password'
                    className='input-field-signin'
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPwd(e.target.value)
                      document.getElementById("userpwdfield").innerHTML = "";
                    }}
                  />
                  <div id="userpwdfield" style={{ marginTop: "-10px", position: "fixed" }}></div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <FormControlLabel
                  control={<Checkbox value="remember" style={{ color: "rgba(207, 167, 103, 1)" }} />}
                  label="Remember me"
                  className='remember-me-typo'
                />
                <Link variant="body2" style={{ color: "black", textDecoration: "none" }}
                  className='forgot-pwd-typo'
                  onClick={async () => {
                    try {

                      var resetRes = await PostResetRequest({ email: email })
                      RemovePopUp();
                      // console.log(resetRes.message);
                      return navigate('/popupforresponses', {
                        state: {
                          "data": {
                            message: resetRes.message,
                            key: "PostResetRequest",
                          }
                        }
                      })
                    } catch (error) {
                      console.log("signin error",error);
                    }
                  }}
                >
                  Forgot password?
                </Link>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className='login-btn'
                  onClick={async () => {
                    if (document.getElementById("email").value == "" || document.getElementById("password").value == "") {
                      validate();
                    }
                    else {

                      try {
                        var signInRes = await PostSignin({ email: email, pwd: pwd })
                        RemovePopUp();
                        // console.log(signInRes.detail.message)
                        return navigate('/popupforresponses', {
                          state: {
                            "data": {
                              message: signInRes.detail.message,
                              key: "PostSignIn"
                            }
                          }
                        }
                        )
                      } catch (error) {
                        // console.log("error signin page:",error.message)
                        RemovePopUp();
                        return navigate('/popupforresponses', {
                          state: {
                            "data": {
                              message: error.message,
                              key: "PostSignIn"
                            }
                          }
                        }
                        )
                      }
                    }
                  }}
                >
                  LOGIN
                </Button>

                <div
                  className='dont-ac'
                >
                  Doesn’t has any account?
                  <Link href="/sign up" style={{ textDecoration: "none", color: "rgba(207, 167, 103, 1)" }} className='register-typo'>
                    Register here
                  </Link>
                </div>

                <div className='copyright-typo'>

                  <p>Use the application according to policy rules. Any kinds of</p>
                  <p>violations will be subject to sanctions.</p>

                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>


      </div >
    )
  }
}