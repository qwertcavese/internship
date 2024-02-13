import React from 'react'
import {Route,Routes} from "react-router-dom"
import Dashboard from './Dashboard'
import Home from './Home'
import TypoGraphy from './TypoGraphy'
import Color from './Color'
import Shadow from './Shadow'


export default function Routes1() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/Typography' element={<TypoGraphy/>}/>
        <Route path='/Color' element={<Color/>}/>
        <Route path='/Shadow' element={<Shadow/>}/>
      </Routes>
    </div>
  )
}
