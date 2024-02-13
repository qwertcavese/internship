import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

function Shadow() {
    const address = window.location.pathname.substring(1);
    const[elevation,setElevation]=React.useState([0, 1, 2, 3, 4,5, 6,7, 8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24 ])

    return (
        <>
            <Sidebar />
            <div className='body-main'>
                <div className='typography-main'>
                    <p>Home&nbsp; / &nbsp;<b>{address}</b></p>
                    <div className='shadow-card-container'>
                        <h3>Shadow</h3>
                        <div className='shadow-card-box'>
                            <p style={{width:"100%"}}>Basic shadow</p>
                            {elevation.map((elevation) => (
                                <Item key={elevation} elevation={elevation} style={{width:"15%",height:"100px",marginBottom:"25px",borderRadius:"5px"}}>
                                    {`BoxShadow=${elevation}`}
                                </Item>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shadow
