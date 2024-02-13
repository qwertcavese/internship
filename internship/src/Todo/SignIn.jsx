import React, { useState } from 'react'
import Navbar from './Navbar'
import "./Todo.css"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Home from './Home';


export default function SignIn(props) {
    const[email,setemail]=useState("")
    const[pwd,setpwd]=useState("")
    const[resetpwd,setresetpwd]=useState("")
    
    const navigate=useNavigate();

    const apiURL=props.apiURL
    // console.log(apiURL);

    function signinValidate(){
        if(document.getElementById("signin-todo-email-field").value==""){
            document.getElementById("signin-todo-email").style.color="red"
            document.getElementById("signin-todo-email").innerHTML="Pls Enter Email"
        }   
        else if(document.getElementById("signin-todo-pwd-field").value==""){
            document.getElementById("signin-todo-pwd").style.color="red"
            document.getElementById("signin-todo-pwd").innerHTML="Pls Enter Password"
        }
    }

        // token 
        var forgotPwdUrl=window.location.search;
        var lastIndex=forgotPwdUrl.lastIndexOf("=");
        var token=forgotPwdUrl.substring(lastIndex+1,forgotPwdUrl.length)
        sessionStorage.setItem("token",token)

        
        if((sessionStorage.getItem("token"))){
            return (
                <div className='signin-todo-main'>
                <Navbar/>
                <div className='signin-todo-container'>
                    <div className='signin-todo-form'>
                        <h3 style={{textAlign:"center"}}>Forgot Password</h3>
                        <hr />
                        <div className='signin-form-todo'>
                            <h6 className='signin-todo-headings'>Reset Password</h6>
                            <input type="text" id='signin-todo-email-field'
                            value={resetpwd}
                            onChange={(e)=>{
                                setresetpwd(e.target.value)
                                document.getElementById("signin-todo-email").innerHTML=""
                            }}
                            placeholder='&nbsp;&nbsp;Reset Password...' className='signinform-todo-input'/>
                            <div id='signin-todo-email' style={{position:"fixed"}}></div>
                        </div>
                        <div className='signin-form-todo'>
                            <h6 className='signin-todo-headings'>Renter New Password</h6>
                            <input type="text" id='signin-todo-pwd-field'
                            value={resetpwd}
                            onChange={(e)=>{
                                setresetpwd(e.target.value)
                                document.getElementById("signin-todo-pwd").innerHTML=""
                            }}
                            placeholder='&nbsp;&nbsp;Renter New Password...' className='signinform-todo-input'/>
                            <div id='signin-todo-pwd' style={{position:"fixed"}}></div>
                        </div>
                        <div>
                            <button type="reset" className='todo-btn' style={{background:"blue"
                            ,marginTop:"25px"}}
                            onClick={()=>{
                                try {
                                    
                                    axios.put(
                                    apiURL+'/reset_password',
                                    {
                                      'token':sessionStorage.getItem("token"),
                                      'password':resetpwd
                                    },
                                    {
                                      headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                }
                                )
                                .then((res)=>{alert(res.data.message)
                                sessionStorage.removeItem("token")
                                navigate("/")}
                                )
                                .catch(err=>alert(err.message))
                            } 
                            catch (error) {
                                alert(error.message);
                            }
                            }}
                            >submit</button>
                            <button type="reset" className='todo-btn' style={{background:"rgb(255, 46, 46)"
                            ,marginTop:"25px"}}
                            onClick={()=>{
                                document.getElementById("signin-todo-email-field").value=""
                                document.getElementById("signin-todo-pwd-field").value=""
                                document.getElementById("signin-todo-pwd").innerHTML=""
                                document.getElementById("signin-todo-email").innerHTML=""
                            }}
                            >Reset</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            )
        }

        else if(sessionStorage.getItem("user")){
            window.location.pathname="/home"
                return(
                    <Home/>
                )
        }

    else{
        
  return (  
    <div className='signin-todo-main'>
        <Navbar/>
        <div className='signin-todo-container'>
            <div className='signin-todo-form'>
                <h3 style={{textAlign:"center"}}>Sign In</h3>
                <hr />
                <div className='signin-form-todo'>
                    <h6 className='signin-todo-headings'>Email</h6>
                    <input type="text" id='signin-todo-email-field'
                    value={email}
                    onChange={(e)=>{
                        setemail(e.target.value)
                        document.getElementById("signin-todo-email").innerHTML=""
                    }}
                    placeholder='&nbsp;&nbsp;Enter Email...' className='signinform-todo-input'/>
                    <div id='signin-todo-email' style={{position:"fixed"}}></div>
                </div>
                <div className='signin-form-todo'>
                    <h6 className='signin-todo-headings'>Password</h6>
                    <input type="text" id='signin-todo-pwd-field'
                    value={pwd}
                    onChange={(e)=>{
                        setpwd(e.target.value)
                        document.getElementById("signin-todo-pwd").innerHTML=""
                    }}
                    placeholder='&nbsp;&nbsp;Enter Password...' className='signinform-todo-input'/>
                    <div id='signin-todo-pwd' style={{position:"fixed"}}></div>
                </div>
                <div className='todo-forgot-pwd' style={{display:"flex",justifyContent:"right"}}>
                    <NavLink to="#" style={{textDecoration:"none",marginBottom:"20px"}}
                    onClick={()=>{
                        try{

                            axios.post(
                                apiURL+'/password',
                                
                                {
                                  'email': email
                                },
                                {
                                  headers: {
                                    'accept': 'application/json',
                                    'Content-Type': 'application/json'
                                  }
                                }
                              )
                              .then((res)=>alert(res.data.message))
                              .catch(err=>alert(err.message))
                        }
                        catch(err){
                            alert(err.message)
                        }
                    }}
                    >Forgot Password?</NavLink>
                </div>
                <div className='todo-buttons' style={{display:"flex",justifyContent:"space-around"}}>
                    <button type="button" className='todo-btn' style={{background:"rgb(29, 122, 243)"}}
                    onClick={()=>{
                        var emailIncludes=document.getElementById("signin-todo-email-field").value
                        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        try{

                            if(document.getElementById("signin-todo-email-field").value==""||
                            document.getElementById("signin-todo-pwd-field").value==""){
    
                                signinValidate();
                            }
                            else{
                                 
                                // test is inbuilt method which tests that whether above format is
                                // included in our target
                                if (!emailRegex.test(emailIncludes)) {
                                    document.getElementById("signin-todo-email").style.color="red"
                                    document.getElementById("signin-todo-email").innerHTML="@ is mandatory"
                                }

                                axios.post(
                                    apiURL+'/signin',
                                    // '{\n  "email": "user@example.com",\n  "password": "string"\n}',
                                    {
                                      'email': email,
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
                                    // console.log(response);
                                    alert(response.data.message)
                                    sessionStorage.setItem("user",response.data.uid)
    
                                    navigate("/home")
                                    //         // window.location.href="home"
                                  })
                                  .catch(error=>alert(error.message))
                                  }
                        }
                        catch(error){
                            alert(error.message);
                        }
                        
                    }}
                    >Sign In</button>
                    <button type="reset" className='todo-btn' style={{background:"rgb(255, 46, 46)"}}
                    onClick={()=>{
                        document.getElementById("signin-todo-email-field").value=""
                        document.getElementById("signin-todo-pwd-field").value=""
                        document.getElementById("signin-todo-pwd").innerHTML=""
                        document.getElementById("signin-todo-email").innerHTML=""
                    }}
                    >Reset</button>
                </div>
                <div className='todo-signup-navigate'>
                    <p style={{textAlign:"center"}}>
                        Don't have an account?
                    <NavLink to="/sign up" style={{textDecoration:"none"}}>Sign Up</NavLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
}
