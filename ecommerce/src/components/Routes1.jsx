import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './Home'
import Contactus from './Contactus'
import Aboutus from './Aboutus'
import Help from './Help'
import BasicModal from './BasicModal'
import Popup from './Popup'



export default function Routes1() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact us' element={<Contactus/>}/>
        <Route path='/about us' element={<Aboutus/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/modal' element={<BasicModal/>}/>
        <Route path='/pop up' element={<Popup/>}/>
      </Routes>
    </div>
  )
}
