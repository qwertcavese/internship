import React from 'react'
import ResponsiveAppBar from './Navbar'
import { NavLink } from 'react-router-dom'
import SpeedIcon from '@mui/icons-material/Speed';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import VerticalShadesClosedIcon from '@mui/icons-material/VerticalShadesClosed';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function Sidebar() {
    return (
        <div className='sidebar-main'>
            <ResponsiveAppBar />
            <div className='sidebar-container'>
                <div className='logo' style={{ display: "flex", alignItems: "center", gap: "5px", height: "75px", marginLeft: "20px" }}>
                    {/* <h1><AcUnitIcon/></h1> */}
                    <h1 style={{ fontSize: "30px" }}>E-commerce</h1>
                </div>
                <div className='sidebar-items'>

                    <NavLink to="/" className="sideitems-typo"><SpeedIcon />&nbsp;&nbsp;Home</NavLink>


                    <NavLink to="/contact us" className="sideitems-typo"><TextFieldsIcon />&nbsp;&nbsp;Contact us</NavLink>


                    <NavLink to="/about us" className="sideitems-typo"><PlaylistAddCircleIcon />&nbsp;&nbsp;About us</NavLink>
                    <NavLink to="/help" className="sideitems-typo"><QuestionMarkIcon />&nbsp;&nbsp;Help</NavLink>
                </div>
            </div>
        </div>
    )
}
