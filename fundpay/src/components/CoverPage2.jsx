import React from 'react'
import cover from "../assets/cover.png"
import logo from "../assets/logo.png"

export default function CoverPage2() {
    // console.log(cover);
    return (
        <div className='cover-main2'>
            <img src={cover} alt="cover" 
            style={{
                position:"absolute",
                height:"100vh",
                width:"100vw",
                top:"0px",
                left:"0px",
                zIndex:"-1",
                opacity:"0.1",
                background:"rgb(249, 244, 236)"
            }}
            />
            <div className='cover-logo-container'>
                <img src={logo} alt="logo" className='cover-logo' />
            </div>
            <p className='cover-page-typo'>Copyright @ 2024 Fund Pay Solutions.</p>
        </div>
    )
}
