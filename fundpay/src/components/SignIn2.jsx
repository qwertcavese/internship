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
import logo2 from "../assets/logo2.png"
import { NavLink, useNavigate } from 'react-router-dom'
import HelpIcon from '@mui/icons-material/Help';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn2() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <div theme={defaultTheme} style={{ background: "black", color: "white", height: "100vh", padding: "25px" ,
        display:"grid",placeItems:"center"
        }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                        }}
                    >
                        <img src={logo2} alt="logo" className='logo' />

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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <label htmlFor="" className='input-field-labels'>Email Address/Mobile Number</label>
                            <TextField
                                sx={{ background: "white", borderRadius: "5px" }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                style={{ background: "white" }}
                                placeholder='abc@gmail.com'
                                name="email"
                                autoComplete="email"
                                className='input-field-signin'
                                autoFocus
                            // onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="" className='input-field-labels'>Password</label>
                            <TextField
                                style={{ background: "white", borderRadius: "5px" }}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                placeholder='Enter Password'
                                className='input-field-signin'
                                autoComplete="current-password"
                            // onChange={(e) => setPwd(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" style={{ color: "rgba(207, 167, 103, 1)" }} />}
                                label="Remember me"
                            />
                            <Link href="#" variant="body2" style={{ color: "black", textDecoration: "none" }}
                                className='forgot-pwd-typo'>
                                Forgot password?
                            </Link>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className='login-btn'
                            >
                                LOGIN
                            </Button>

                            <div className='dont-ac'>
                                Doesn’t has any account?
                                <Link href="#" style={{ textDecoration: "none", color: "rgba(207, 167, 103, 1)" }} className='register-typo'>
                                    Register here
                                </Link>
                            </div>

                            <div className='copyright-typo'>

                                <p>Use the application according to policy rules. Any kinds of</p>
                                <p>violations will be subject to sanctions.</p>

                            </div>
                        </Box>
                    </Box>
                </div>
            </Container>
        </div>
    );
}
