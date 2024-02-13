import React, { useState } from 'react'
import OtpInput from './OtpInput';

export default function PhoneOtpLogin() {
    const[phoneNumber,setPhoneNumber]=useState("")
    const[otpInput,setOtpInput]=useState(false)

    function handlePhoneSubmit(e){
        e.preventDefault();

        // phone validations
        const regex=/[^0-9]/g;
        if(phoneNumber.length<10 || regex.test(phoneNumber)){
            alert("Invalid Phone Number")
            return;
        }

        // show otp field
        setOtpInput(true)
    }

    const onOtpSubmit=(otp)=>{
        console.log("login successful");
    }

  return (
    <div className='otp-main'>
      <div className='otp-container'>
        {!otpInput?
         <form onSubmit={handlePhoneSubmit}>
            <input type="text" placeholder='Enter mobile Number'
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            />
            <button type="submit">submit</button>
        </form>:
        <div>
            <p>Enter Otp Sent To {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
        }
      </div>
    </div>
  )
}
