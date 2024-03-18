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
import adminLogin from './ApiServices';
import ShowDialog from './ShowDialog';
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [email, setEmail] = React.useState("")
  const [pwd, setPwd] = React.useState("")

  const navigate = useNavigate();

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              variant='filled'
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              className='signin-inpt-field'
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                document.getElementById("signin-inpt").style.contentVisibility = "hidden"
              }}
            />
            <div id='signin-inpt' style={{ color: "red", position: "absolute", marginTop: "-10px", fontSize: "12px", contentVisibility: "hidden" }}>Please Enter Email</div>
            <TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              name="password"
              label="Password"
              type="password"
              id="password"
              className='signin-inpt-field'
              autoComplete="current-password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value)
                document.getElementById("pwd-inpt").style.contentVisibility = "hidden"
              }}
            />
            <div id='pwd-inpt' style={{ color: "red", position: "absolute", marginTop: "-10px", fontSize: "12px", contentVisibility: "hidden" }}>Please Enter password</div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={async () => {
                if (document.getElementById("email").value == "" || document.getElementById("password").value == "") {
                  if (document.getElementById("email").value == "") {
                    document.getElementById("signin-inpt").style.contentVisibility = "visible"
                  } else {

                    document.getElementById("pwd-inpt").style.contentVisibility = "visible"
                  }
                }
                else {

                  sessionStorage.setItem("popUp", "popUp")
                  var adminLoginres = await adminLogin({ email, pwd })
                  navigate('/show_dialog', {
                    state: {
                      data: {
                        message: adminLoginres,
                        key: "adminLoginres",
                        basePath: "/",
                        visitingPath: "/home"
                      }
                    }
                  })
                  console.log(adminLoginres);
                }
              }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
