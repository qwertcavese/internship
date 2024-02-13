import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar'
import { useState } from 'react';
import reptile from "../assets/reptile.jpg"

function TypoGraphy() {
    const address = window.location.pathname.substring(1);

    const [cards, setCards] = React.useState([1, 1, 1, 1,1, 1, 1, 1,])

    return (
        <>
            <Sidebar />
            <div className='body-main'>
                <div className='typography-main'>
                    <p>Home&nbsp; / &nbsp;<b>{address}</b></p>

                    <div className='typo-card-container'>
                        <h3>Typography</h3>
                        <div className='typo-card-box'>
                            {cards.map((value) => {
                                return (
                                    <div className='typoCom-cards'>
                                        <Card>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image={reptile}
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Lizard
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                                    species, ranging across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
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

export default TypoGraphy




