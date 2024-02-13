import React from 'react'
import logo from "../assets/logo.png"

export default function CoverPage() {
    // console.log(cover);
    return (
        <div className='cover-main'>
            <div className='cover-logo-container'>
               <img src={logo} alt="logo" className='cover-logo'/>
            </div>
               <p className='cover-page-typo'>Copyright @ 2024 Fund Pay Solutions.</p>
        </div>
    )
}
