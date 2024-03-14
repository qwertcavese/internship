import React from 'react'
import Sidebar from './Sidebar'


function Home() {
    return (
        <>
            <Sidebar />
            <div className='body-main'>
                <div className='home-main' style={{ margin: "25px" }}>
                    <p>Category / <b>Home</b></p>
                </div>
            </div>
        </>
    )
}

export default Home
