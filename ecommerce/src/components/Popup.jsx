import React from 'react'
import { useLocation } from 'react-router-dom'
import BasicModal from './BasicModal';
import Home from './Home';

export default function Popup() {

    const z = useLocation();
    var response = z.state
    console.log(response);

    if (response.data.key == "voiceRecognition") {

        return (
            <div>
                <Home/>
                <BasicModal data={response.data.key}/>
            </div>
        )
    }
    else{
            <div>
                <Home/>
                <BasicModal/>
            </div>

    }


}
