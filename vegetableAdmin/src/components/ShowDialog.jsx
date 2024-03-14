import React from 'react'
import ResponsiveDialog from './ResponsiveDialog'
import { useLocation } from 'react-router-dom'
import SignIn from './SignIn';

export default function ShowDialog() {
    var receive = useLocation();


    if (!sessionStorage.getItem("popUp")) {
        if (receive.state.data.message == 'Login Successfully') {
            window.location.pathname = `${receive.state.data.visitingPath}`
        }
        else {
            window.location.pathname = `${receive.state.data.basePath}`
        }
    }
    else {

        if (receive.state.data.key = 'adminLoginres') {
            return (
                <div>
                    <SignIn />
                    <ResponsiveDialog data={receive.state.data} />
                </div>
            )
        }
        else {
            alert("error")
        }
    }
}
