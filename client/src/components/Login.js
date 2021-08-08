import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import { useHistory } from 'react-router-dom'
import { actionTypes } from '../reducer'
import { useStateValue } from '../StateProvider'

function Login() {
    const [, dispatch] = useStateValue()
    const history = useHistory()

    const login = async user => {
        dispatch({
            type: actionTypes.LOG_IN,
            user,
        })
        try {
            const response = await axios.get('/user', { params: user })
            dispatch({
                type: actionTypes.SET_DB,
                creationDate: response.data.creationDate,
                count: response.data.count,
            })
        } catch (err) {
            console.error(err)
        }
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
