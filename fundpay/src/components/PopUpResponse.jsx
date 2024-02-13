import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialogSlide from './AlertDialog';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPwd from './ForgotPwd';

function PopUpResponse() {


    var popUpDataReceive = useLocation();
    console.log("pop1", popUpDataReceive.state.data);
    if (sessionStorage.getItem("popUp")) {  
        window.location.pathname="/"
        return < SignIn />

    }
    else if (popUpDataReceive.state.data.key == "PostResetRequest") {

        return (
            <div>
                <SignIn />
                <AlertDialogSlide response={popUpDataReceive.state.data} />
            </div>
        )
    }
    else if (popUpDataReceive.state.data.key == "PostSignIn") {

        return (
            <div>
                <SignIn />
                <AlertDialogSlide response={popUpDataReceive.state.data} />
            </div>
        )
    }
    else if (popUpDataReceive.state.data.key=="signUpRequest") {

        return (
            <div>
                <SignUp />
                <AlertDialogSlide response={popUpDataReceive.state.data} />
            </div>
        )
    }
    else if (popUpDataReceive.state.data.key=="PutNewPwd") {

        return (
            <div>
                <ForgotPwd />
                <AlertDialogSlide response={popUpDataReceive.state.data} />
            </div>
        )
    }
}

export default PopUpResponse
