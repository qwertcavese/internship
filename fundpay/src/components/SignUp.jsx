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
import { PostSignUp } from './ApiServices';
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    //   const[signUpData,setSignUpData]=React.useState({
    //     fn:"",
    //     ln:"",
    //     email:"",
    //     pwd:""
    //   })
    //   console.log(signUpData);
    
    const [fn, setfn] = React.useState("")
    const [ln, setln] = React.useState("")
    const [email, setemail] = React.useState("")
    const [pwd, setpwd] = React.useState("")
    const [confirmpwd, setconfirmpwd] = React.useState("")
    const navigate=useNavigate();
    
    return (
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={fn}
                                    onChange={(e) => setfn(e.target.value)}
                                    // onChange={(e) => setSignUpData({ ...signUpData, fn: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={ln}
                                    onChange={(e) => setln(e.target.value)}
                                    // onChange={(e) => setSignUpData({ ...signUpData, ln: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    // onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                />
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
                                    value={pwd}
                                    onChange={(e) => setpwd(e.target.value)}
                                    // onChange={(e) => setSignUpData({ ...signUpData, pwd: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                    value={confirmpwd}
                                    onChange={(e) => setconfirmpwd(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={async() => {
                                if(document.getElementById("password").value!=document.getElementById("confirm-password").value){
                                    alert("Confirm Password Doesn't Match")
                                }
                                else{
                                    try {
                                        
                                       const signUpRes=await PostSignUp({
                                            fn:fn,
                                            ln:ln,
                                            email:email,
                                            pwd:pwd
                                        })
                                        // console.log("sign up positive:",signUpRes);
                                        sessionStorage.removeItem("popUp")
                                        return navigate('/popupforresponses', {
                                            state: {
                                              "data": {
                                                message: signUpRes,
                                                key: "signUpRequest",
                                              }
                                            }
                                          })
                                    } catch (error) {
                                       console.log("signup error:",error);
                                    }
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}