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
                <div className='logo' style={{ display: "flex",alignItems:"center",gap:"5px",height:"75px",marginLeft:"20px"}}>
                    <h1><AcUnitIcon/></h1>
                    <h1 style={{ fontSize: "30px"}}>Mantis</h1>
                </div>
                <div className='sidebar-items'>
                    <h4>Navigation</h4>
                    <NavLink to="/" className="sideitems-typo"><SpeedIcon/>&nbsp;&nbsp;Dashboard</NavLink>
                    <h4>Authentication</h4>
                    <NavLink className="sideitems-typo"><LoginIcon/>&nbsp;&nbsp;Login</NavLink>
                    <NavLink className="sideitems-typo"><AppRegistrationIcon/>&nbsp;&nbsp;Register</NavLink>
                    <h4>Utilities</h4>
                    <NavLink to="/Typography" className="sideitems-typo"><TextFieldsIcon/>&nbsp;&nbsp;Typography</NavLink>
                    <NavLink to="/Color" className="sideitems-typo"><InvertColorsIcon/>&nbsp;&nbsp;Color</NavLink>
                    <NavLink to="/Shadow" className="sideitems-typo"><VerticalShadesClosedIcon/>&nbsp;&nbsp;Shadow</NavLink>
                    <NavLink className="sideitems-typo"><DeviceHubIcon/>&nbsp;&nbsp;Ant Icons</NavLink>
                    <h4>Support</h4>
                    <NavLink className="sideitems-typo"><PlaylistAddCircleIcon/>&nbsp;&nbsp;Sample Page</NavLink>
                    <NavLink className="sideitems-typo"><QuestionMarkIcon/>&nbsp;&nbsp;Documentation</NavLink>
                </div>
            </div>
        </div>
    )
}
