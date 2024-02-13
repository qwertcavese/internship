import React, { useState } from 'react'

export default function Dialoguebox() {
  var arry=[1,2,3,4,5,6,5,6,9]
  var target =[5];
  var change=true;
  var dis=[]
  arry.map((val)=>{
    change=target.find((value)=>{
      if(value==val){
        return true;
      }
      else{
        return false;
      }
    })
  })
  console.log(change);
  return (
    <div>
      {/* {dis.map((val,index)=>{
        return(
          <div key={index}>
            <p>{val}</p>
          </div>
        )
      })} */}
    </div>
  )
}
