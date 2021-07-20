import axios from 'axios'
import React, { useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import './App.css'

const responseFacebook = response => {
    console.log(response)
}

function App() {
    const callApi = async () => {
        axios.get('/').then(res => console.log(res))
    }

    useEffect(() => {
        callApi()
    }, [])
    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
    )
}

export default App
