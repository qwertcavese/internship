import React from 'react'
import Sidebar from './Sidebar'

export default function Help() {
  return (
    <>
        <Sidebar/>
        <div className='body-main'>
            <div className='help-main' style={{margin:"25px"}}>
            <p>Category / <b>Help</b></p>
            </div>
        </div>
    </>
  )
}
