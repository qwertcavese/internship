import React, { useEffect, useRef } from 'react'

import { useState } from 'react'

export default function OtpInput({length=4,onOtpSubmit=()=>{}}) {

    const[storeOtp,setStoreOtp]=useState(new Array(length).fill(""))
    const inputRefs=useRef([])
    console.log(inputRefs);
    
    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[])

    const handleChange=(e,index)=>{
        const value=e.target.value;

        // if "if" condition has one statement than we can write it without curly brackets
        if(isNaN(value)) return

        const newOtp=[...storeOtp]

        // allow only one input
        newOtp[index]=value.substring(value.length-1)
        setStoreOtp(newOtp)

        // submit trigger
        const combinedOtp=newOtp.join("")
        if(combinedOtp.length===length){

            onOtpSubmit(combinedOtp)
        }
        // move to next input if current field is filled
        if(value && index<length-1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus();
        }

    }

    const handleClick=(index)=>{
        inputRefs.current[index].setSelectionRange(1,1)
    }

    const handleKeyDown=(e,index)=>{
        if(e.key==="Backspace" && !storeOtp[index] && index>0 && inputRefs.current[index-1]){
            inputRefs.current[index-1].focus()
        }
    }

  return (
    <div className='opt-input-main'>
      <div className='otp-input-container'>
        {
            storeOtp.map((value,index)=>{
                return(
                    <input type="text" key={index} value={value}
                    ref={(input)=>(inputRefs.current[index]=input)}
                    onChange={(e)=>handleChange(e,index)}
                    onClick={()=>handleClick(index)}
                    onKeyDown={(e)=>handleKeyDown(e,index)}
                    className='otp-input'
                    />
                )
            })
        }
      </div>
    </div>
  )
}
