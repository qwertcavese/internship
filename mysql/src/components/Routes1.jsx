import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'

export default function Routes1() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}
