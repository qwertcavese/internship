import React from 'react'
import {Routes,Route} from "react-router-dom"
import Signup from './Signup'
import Signin from './Signin'
import Adminpanelapp from './Adminpanelapp'
import Userinfo from './Userinfo'
import AlertDialogSlide from './Dialoguebox'


export default function Routesadminpanel() {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path='/Signin' Component={Signin}/>
        <Route path='/admin panel' Component={Adminpanelapp}/>
        <Route path='/user info' Component={Userinfo}/>
        <Route path='/dialogue' Component={AlertDialogSlide}/>
      </Routes>
    </div>
  )
}
