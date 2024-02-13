import React from 'react'
import {Routes,Route} from "react-router-dom"
import SignIn from './SignIn'
import "./Todo.css"
import SignUp from './SignUp'
import Home from './Home'
import ResponsiveDialog from './Dialoguebox'
import CompleteTask from './CompleteTask'
import AddTask from './AddTask'
import UpdateTask from './UpdateTask'
export default function Routestodo(props) {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn apiURL={props.apiURL}/>}/>
        <Route path='/sign up' element={<SignUp apiURL={props.apiURL}/>}/>
        <Route path='/home' element={<Home apiURL={props.apiURL}/>}/>
        <Route path='/complete task' element={<CompleteTask apiURL={props.apiURL}/>}/>
        <Route path='/add task' element={<AddTask apiURL={props.apiURL}/>}/>
        <Route path='/d' Component={ResponsiveDialog}/>
        <Route path='/update task' element={<UpdateTask apiURL={props.apiURL}/>}/>
      </Routes>
    </div>
  )
}
