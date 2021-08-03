import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { useHistory } from 'react-router-dom'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

function Login() {
    const [, dispatch] = useStateValue()
    const history = useHistory()

    const login = user => {
        dispatch({
            type: actionTypes.LOG_IN,
            user,
        })
        history.push('/')
    }

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            scope="public_profile, user_posts"
            callback={login}
        />
    )
}

export default Login
