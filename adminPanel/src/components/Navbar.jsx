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
    return (
        <AppBar position="static" className='navbar-main'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuOpenIcon onClick={() => {
                        document.querySelector(".sidebar-container").classList.toggle("sidebar-collapse")
                        document.querySelector(".navbar-main").classList.toggle("navbar-collapse")
                        document.querySelector(".body-main").classList.toggle("body-collapse")
                        document.querySelector(".line-graph").classList.toggle("line-graph-collapse")
                        document.querySelector(".bar-graph").classList.toggle("bar-graph-collapse")
                        document.querySelector(".order-table").classList.toggle("order-table-collapse")
                        document.querySelector(".analytics-report").classList.toggle("analytics-report-collapse")
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
                        <div className='navbar-input'>

                            <SearchIcon style={{ color: "grey", fontSize: "20px" }} />
                            <input type="text" placeholder="Enter Here" id="navbar-search-input"
                                style={{ border: "none", height: "100%", width: "80%" ,outline:"none"}}
                            />
                        </div>


                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}} className='avatar-container'>

                            <Avatar alt="Travis Howard" src={avatar} style={{height:"35px",width:"35px"}}/>
                            <h4>John Doe</h4>
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