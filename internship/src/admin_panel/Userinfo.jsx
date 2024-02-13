import React, { useEffect, useState } from 'react'
import Adminpanelapp from './Adminpanelapp'
import axios from "axios"

export default function Userinfo() {
  const[usernameuid,setusernameuid]=useState("")
  const[emailuid,setemailuid]=useState("")
  const[uid,setuid]=useState("")
  const[fullnameuid,setfullnameuid]=useState("")
  const[dobuid,setdobuid]=useState("")
  const[phonenouid,setphonenouid]=useState("")
   
  const validate=()=>{
    if(document.getElementById("full-name-input").value==""){
      document.getElementById("fullnamefield").style.color="red"
      document.getElementById("fullnamefield").innerHTML="pls enter username"
      document.getElementById("full-name-input").focus();
    }
    else if( document.getElementById("dob-input").value==""){
    document.getElementById("dobfield").style.color="red"
    document.getElementById("dobfield").innerHTML="pls enter username"
    document.getElementById("dob-input").focus();
    }
    else if( document.getElementById("phone-number-input").value==""){
    document.getElementById("phonenofield").style.color="red"
    document.getElementById("phonenofield").innerHTML="pls enter username"
    document.getElementById("phone-number-input").focus();
    }
  }

  useEffect(()=>{
    axios.get('http://192.168.29.183:8000/get_profile/'+sessionStorage.getItem("user"), {
    headers: {
    'accept': 'application/json'
   }
  })
  .then((response)=>{
      console.log(response);
      setusernameuid(response.data.username)
      setemailuid(response.data.email)
      setuid(sessionStorage.getItem("user"))
      setfullnameuid(response.data.full_name)
      setdobuid(response.data.dob)
      setphonenouid(response.data.phone_no)
  })
  },[])
  return (
    <>
        <Adminpanelapp/>
    <div className='navbar-main'>
        <div className='user-details-form-container'>
          <div className='user-details-form'>
          <div className='inner-form'>
           <h3>Username</h3>
            <input type="text" value={usernameuid} className='form-input-field'/>
            </div>
            <div className='inner-form'>
            <h3>Email</h3>
            <input type="text" value={emailuid} className='form-input-field' />
            </div>
            <div className='inner-form'>
            <h3>full_name</h3>
            <input type="text" className='form-input-field' id='full-name-input' value={fullnameuid} onChange={(e)=>{
              setfullnameuid(e.target.value)
              document.getElementById("fullnamefield").innerHTML="";
            }}/>
            <div id='fullnamefield'></div>
            </div>
            <div className='inner-form'>
            <h3>dob</h3>
            <input type="date" className='form-input-field' id='dob-input' value={dobuid} onChange={(e)=>{
              setdobuid(e.target.value)
              document.getElementById("dobfield").innerHTML="";
            }}/>
            <div id='dobfield'></div>
            </div>
            <div className='inner-form'>
            <h3>phone_number</h3>
            <input type="text" className='form-input-field' id='phone-number-input' value={phonenouid} onChange={(e)=>{
              setphonenouid(e.target.value)
              document.getElementById("phonenofield").innerHTML="";
            }}/>
            <div id='phonenofield'></div>
            </div>
            <div><button type="button" onClick={()=>{
              if(document.getElementById("full-name-input").value==""||
                 document.getElementById("dob-input").value==""||
                 document.getElementById("phone-number-input").value=="")
                 {
                  validate();
                 }
                 else{

                   axios.put(
                     'http://192.168.29.183:8000/update_profile/'+uid,
                     {
                       'username':usernameuid,
                       'email': emailuid,
                       'full_name':fullnameuid,
                       'dob':dobuid,
                       'phone_no':phonenouid
                      },
                      {
                        headers: {
                          'accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                      }
                      )
                      .then((response)=>{
                        alert(response.data.message)
                      })
                    }
                    }}>Update</button></div>
                    </div>
                    </div>
                    </div>
    </>
  )
}
