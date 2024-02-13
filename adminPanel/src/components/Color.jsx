
import Sidebar from './Sidebar';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import reptile from "../assets/reptile.jpg"

function Color() {
    const address = window.location.pathname.substring(1);
    const [cards, setCards] = React.useState(["red", "blue", "green", "black", "white", "brown"])

    return (
        <>
            <Sidebar />
            <div className='body-main'>
                <div className='typography-main'>
                    <p>Home&nbsp; / &nbsp;<b>{address}</b></p>
                    <div className='color-container'>
                        <h3>Color</h3>
                        <div className='color-card-box'>
                            {cards.map((value) => {
                                return (
                                    <div className='color-cards' style={{backgroundColor:`${value}`}}>
                                        <Card>
                                            <div>{value}</div>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Color
