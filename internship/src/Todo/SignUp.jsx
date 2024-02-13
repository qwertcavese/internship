import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios';
import SignIn from './SignIn';

export default function SignUp(props) {

    const[fn,setfn]=useState("")
    const[ln,setln]=useState("")
    const[email,setemail]=useState("")
    const[phone,setphone]=useState("")
    const[pwd,setpwd]=useState("")
    const[confirmpwd,setconfirmpwd]=useState("")

    const apiURL=props.apiURL


   const navigate=useNavigate();


    

    function cleanInput(){
        document.getElementById("signup-fn-field").value=""
        document.getElementById("signup-ln-field").value=""
        document.getElementById("signup-phone-field").value=""
        document.getElementById("signup-email-field").value=""
        document.getElementById("signup-pwd-field").value=""
        document.getElementById("signup-confirm-pwd-field").value=""
        document.getElementById("signup-fn").innerHTML=""
        document.getElementById("signup-ln").innerHTML=""
        document.getElementById("signup-phone").innerHTML=""
        document.getElementById("signup-email").innerHTML=""
        document.getElementById("signup-pwd").innerHTML=""
        document.getElementById("signup-confirm-pwd").innerHTML=""
    }

    function signupSetValidate(){
        if(document.getElementById("signup-fn-field").value==""){
            document.getElementById("signup-fn").style.color="red"
            document.getElementById("signup-fn").innerHTML="Pls Enter First Name"
        }
        else if(document.getElementById("signup-ln-field").value==""){
        document.getElementById("signup-ln").style.color="red"
        document.getElementById("signup-ln").innerHTML="Pls Enter Last Name"
        }
        else if(document.getElementById("signup-email-field").value==""){
        document.getElementById("signup-email").style.color="red"
        document.getElementById("signup-email").innerHTML="Pls Enter Email"
        }
        else if(document.getElementById("signup-phone-field").value==""){
        document.getElementById("signup-phone").style.color="red"
        document.getElementById("signup-phone").innerHTML="Pls Enter Phone Number"
        }
        else if(document.getElementById("signup-pwd-field").value==""){
        document.getElementById("signup-pwd").style.color="red"
        document.getElementById("signup-pwd").innerHTML="Pls Enter Password"
        }
        else if(document.getElementById("signup-confirm-pwd-field").value==""){
        document.getElementById("signup-confirm-pwd").style.color="red"
        document.getElementById("signup-confirm-pwd").innerHTML="Pls Enter Password Again"
        }
    }

    function handleinput(e){
        if(e.target.id==="signup-fn-field"){
            setfn(e.target.value)
            console.log(fn);
            document.getElementById("signup-fn").innerHTML=""
        }
        else if(e.target.id==="signup-ln-field"){
            setln(e.target.value)
            document.getElementById("signup-ln").innerHTML=""
        }
        else if(e.target.id==="signup-email-field"){
            setemail(e.target.value)
            document.getElementById("signup-email").innerHTML=""
        }
        else if(e.target.id==="signup-phone-field"){
            setphone(e.target.value)
            document.getElementById("signup-phone").innerHTML=""
        }
        else if(e.target.id==="signup-pwd-field"){
            setpwd(e.target.value)
            document.getElementById("signup-pwd").innerHTML=""
        }
        else if(e.target.id==="signup-confirm-pwd-field"){
            setconfirmpwd(e.target.value)
            document.getElementById("signup-confirm-pwd").innerHTML=""
        }
    }

    if(sessionStorage.getItem("register")||sessionStorage.getItem("user")){
        window.location.pathname="/"
        return(
            <SignIn/>
        )
    }

    else{

    
  return (
    <div className='signup-todo-main'>
        <Navbar/>
        <div className='signup-todo-container'>
            <div className='signup-todo-form'>
                <div style={{width:"100%"}}>
                    <h3 style={{textAlign:"center"}}>Sign up</h3>
                <hr />
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>First Name</h6>
                    <input type="text" id="signup-fn-field" placeholder='&nbsp;&nbsp;Enter First Name...' 
                    onChange={(e)=>handleinput(e)}
                    value={fn}
                    className='signup-todo-input'/>
                    <div id='signup-fn' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>Last Name</h6>
                    <input type="text" id="signup-ln-field" placeholder='&nbsp;&nbsp;Enter Last Name...' 
                    value={ln}
                    onChange={(e)=>handleinput(e)}
                    className='signup-todo-input'/>
                    <div id='signup-ln' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>Email</h6>
                    <input type="email" id="signup-email-field" placeholder='&nbsp;&nbsp;Enter Email...' 
                    value={email}
                    onChange={(e)=>handleinput(e)}
                    className='signup-todo-input'
                    required/>
                    <div id='signup-email' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>Phone</h6>
                    <input type="text" id="signup-phone-field" placeholder='&nbsp;&nbsp;Enter Phone Number...' 
                    value={phone}
                    onChange={(e)=>handleinput(e)}
                    className='signup-todo-input'/>
                    <div id='signup-phone' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>Password</h6>
                    <input type="password" id="signup-pwd-field" placeholder='&nbsp;&nbsp;Enter Password...' 
                    value={pwd}
                    onChange={(e)=>handleinput(e)}
                    className='signup-todo-input'/>
                    <div id='signup-pwd' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-form-todo'>
                    <h6 className='signup-todo-form-headings'>Confirm Password</h6>
                    <input type="password" id="signup-confirm-pwd-field" 
                    value={confirmpwd}
                    onChange={(e)=>handleinput(e)}
                    placeholder='&nbsp;&nbsp;Confirm Password...' className='signup-todo-input'/>
                    <div id='signup-confirm-pwd' style={{position:"fixed"}}></div>
                </div>
                <div className='signup-todo-buttons' style={{display:"flex"}}>
                    <button type="button" className='signup-todo-btn' style={{background:"rgb(29, 122, 243)"}} onClick={()=>{
                        var signupValidate=document.querySelectorAll(".signup-todo-input")
                        var flag=true;
                        signupValidate.forEach((signupField)=>{
                            if(signupField.value==""){
                                   signupSetValidate();
                                flag=false;
                                return flag
                            }
                        })
                        try{

                        
                        if(flag===false){
                            signupSetValidate();
                        }
                        else if(pwd!=confirmpwd){
                            alert("your password and confirm password didn't match");
                            document.getElementById("signup-pwd-field").value=""
                            document.getElementById("signup-confirm-pwd-field").value=""
                        }
                        else{
                            axios.post(
                                apiURL+'/signup',
                                // '{\n  "firstname": "string",\n  "lastname": "string",\n  "email": "user@example.com",\n  "phone": "string",\n  "password": "string"\n}',
                                {
                                  'firstname': fn,
                                  'lastname': ln,
                                  'email': email,
                                  'phone': phone,
                                  'password': pwd
                                },
                                {
                                  headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                  }
                                }
                              )
                              .then((response)=>{
                                // console.log(response.data);
                                alert(response.data.message)
                                sessionStorage.setItem("register",email)
                                navigate("/")
                            })
                        }}
                        catch(error){
                            alert(error.message);
                        }
                    }}>
                        Register
                    </button>
                    <button type="reset" className='signup-todo-btn' style={{background:"rgb(255, 46, 46)",marginLeft:"20px"}}
                    onClick={()=>{
                        cleanInput();
                    }}
                    >Reset</button>
                </div>
                <div style={{width:"100%",marginTop:"20px"}}>
                    <p style={{textAlign:"center"}}>
                        already have an account?
                    <NavLink to="/" style={{textDecoration:"none"}}>Sign in</NavLink>
                    </p>
                </div>
            </div>
        </div>

    </div>
  )
}
}