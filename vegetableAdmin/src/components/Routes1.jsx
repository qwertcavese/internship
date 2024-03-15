import React from 'react'
import {Routes,Route} from "react-router-dom"
import SignIn from './SignIn'
import ShowDialog from './ShowDialog'
import Home from './Home'
import Category from './Category'
import Item from './Item'
import PackSize from './PackSize'


export default function Routes1() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/show_dialog' element={<ShowDialog/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/item' element={<Item/>}/>
        <Route path='/packsize' element={<PackSize/>}/>
      </Routes>
    </div>
  )
}
