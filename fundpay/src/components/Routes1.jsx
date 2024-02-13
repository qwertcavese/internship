import React, { useEffect, useState } from 'react'
import {Route,Routes} from "react-router-dom"
import SignIn from './SignIn'
import CoverPage from './CoverPage'
import SignIn2 from './SignIn2'
import CoverPage2 from './CoverPage2'
import SignUp from './SignUp'
import BasicModal from './Modal'
import ForgotPwd from './ForgotPwd'
import PopUpResponse from './PopUpResponse'
import AlertDialogSlide from './AlertDialog'

function Routes1() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/reset-password/*' element={<SignIn />} />
        <Route path='/sign up' element={<SignUp />} />
        <Route path='/cover page' element={<CoverPage/>}/>
        <Route path='/cover page2' element={<CoverPage2/>}/>
        <Route path='/signin 2' element={<SignIn2/>}/>
        <Route path='/popupforresponses' element={<PopUpResponse/>}/>
        <Route path='/forgot pwd' element={<ForgotPwd/>}/>
        <Route path='/d' element={<AlertDialogSlide/>}/>
      </Routes>
    </div>    
  )
}

export default Routes1
