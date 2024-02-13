import "./Adminpanelapp.css";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import teamwork from "./teamwork.png";
import PrimarySearchAppBar from "./Appbar";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function Adminpanelapp() {

  function showHeadings(){
    var headings=document.querySelectorAll(".headings")
    // for each is loop which will store all ".headings" in it we have used it because "querySelectorAll"
    // will store all targeted class in array
    headings.forEach((heading)=>{
      heading.classList.toggle("headings-show")
    })
  }  

  function showIcons(){
    var icons=document.querySelectorAll(".icons")
    icons.forEach((icon)=>{
      icon.classList.toggle("icons-show")
    })
  }

  var navigate=useNavigate();

  
    



  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
    >
      <IconButton 
      onClick={()=>{
        handleMenuClose();
        navigate("/user info")
      }}
      style={{
        color:"black",
        fontSize:"16px",
        borderRadius:"1px",
        width:"100%"
      }} 
      >Profile</IconButton>
      <IconButton onClick={()=>{
        handleMenuClose();
        sessionStorage.removeItem("user")
        
        navigate('/Signin')
        
      }} 
      style={{
        color:"black",
        fontSize:"16px",
        borderRadius:"1px",
        width:"100%"
      }}>Logout</IconButton>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
    
  
  return (
    <div className="admin-panel-main">
      <div className="side-bar">
        <div className="logo">
          <img src={teamwork} alt="logo" className="teamwork-logo" />
        </div>
        <div className="icons-head">
          <HomeIcon className="icons" />
          <p className="headings">Home</p>
        </div>
        <div className="icons-head">
          <NoteAddIcon className="icons" />
          <p className="headings">Create project</p>
        </div>
        <div className="icons-head">
          <TaskIcon className="icons" />
          <p className="headings">Current project</p>
        </div>
        <div className="icons-head">
          <AssignmentLateIcon className="icons" />
          <p className="headings">Close project</p>
        </div>
        <div className="icons-head">
          <SearchIcon className="icons" />
          <p className="headings">Search</p>
        </div>
        <div className="icons-head">
          <HelpIcon className="icons" />
          <p className="headings">FAQ</p>
        </div>
        <div className="icons-head">
          <SettingsIcon className="icons" /> 
          <p className="headings">Settings</p>
        </div>
      </div>

      <div className="navbar-main">
      <div className="navbar-container">

       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  style={{backgroundColor:"rgb(17, 17, 17)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>{
                // "toggle" is inbuilt which do both "add & removes" class
                document.querySelector(".side-bar").classList.toggle("side-bar-show")
                document.querySelector(".navbar-container").classList.toggle("navbar-container-collapse")
                showIcons();
                showHeadings();
                document.querySelector(".teamwork-logo").classList.toggle("teamwork-logo-show")
                document.querySelector(".navbar-main").classList.toggle("navbar-main-collapse")
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>

      </div>
      
      </div>
    </div>
  );
}






