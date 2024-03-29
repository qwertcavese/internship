import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import avatar from '../assets/avatar.png'
import MicIcon from '@mui/icons-material/Mic';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import recognition from '../assets/recognition.mp3'


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 200,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    background: "black",
    display: "grid",
    placeItems: "center",
};

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [recognition1, setRecognition1] = React.useState("")

    // function startTimer(){
    //     setTimeout(()=>{
    //         console.log(`time out`);
    //         // navigate("/contact us")
    //     },5000)
    // }
    // startTimer();
    // console.log(window);

    return (
        <AppBar position="static" className='navbar-main'>


            {/* box modal */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ color: "white" }}>
                        <p>{recognition1}</p>
                        <div id="modal-modal-description" style={{ color: "white" }}>
                            <audio src={recognition} autoPlay></audio>
                            <MicIcon style={{ fontSize: "50px" }} />
                        </div>
                    </Box>
                </Modal>
            </div>


            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuOpenIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            document.querySelector(".sidebar-container").classList.toggle("sidebar-collapse")
                            document.querySelector(".navbar-main").classList.toggle("navbar-collapse")
                            document.querySelector(".body-main").classList.toggle("body-collapse")
                        }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>


                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>

                            <div className='navbar-input'>

                                <SearchIcon style={{ color: "grey", fontSize: "20px" }} />
                                <input type="text" placeholder="Enter Here" id="navbar-search-input"
                                    style={{ border: "none", height: "100%", width: "80%", outline: "none" }}
                                    // onKeyDown={(e)=>{
                                    //     if(e.key=="Enter"){
                                    //         console.log("Enter key pressed");
                                    //     }
                                    //     else{
                                    //         console.log("not pressed");
                                    //     }
                                    // }}
                                />
                                <MicIcon style={{ color: "grey", fontSize: "23px", cursor: "pointer" }}
                                    onClick={() => {
                                        // voice object
                                        var recognition = new window.webkitSpeechRecognition();
                                        //    language
                                        recognition.lang = "en-GB";
                                        recognition.start();
                                        recognition.onresult = function (event) {
                                            document.getElementById("navbar-search-input").value = event.results[0][0].transcript;
                                            setRecognition1(event.results[0][0].transcript)
                                        }
                                        handleOpen();
                                        recognition.onend = function () {
                                            handleClose();
                                        }
                                    }}
                                />
                            </div>
                            <button className='search-btn'>Search</button>
                        </div>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }} className='avatar-container'>
                            <ShoppingCartIcon style={{ color: "grey", fontSize: "25px", cursor: "pointer" }} />
                            <FavoriteBorderIcon style={{ color: "grey", fontSize: "25px", cursor: "pointer" }} />
                            <Avatar alt="Travis Howard" src={avatar} style={{ height: "35px", width: "35px", cursor: "pointer" }} />
                        </div>


                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;