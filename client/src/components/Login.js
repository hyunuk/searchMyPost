import React from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
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
            if (user) {
                const response = await axios.get('/user', { params: user })
                dispatch({
                    type: actionTypes.SET_DB,
                    creationDate: response.data.creationDate,
                    count: response.data.count,
                })
            }
        } catch (err) {
            console.error(err)
        }
        history.push('/')
    }

    const onClick = async e => {
        await axios.get('/auth/login/facebook')
        const response = await axios.get('/auth/me')
        console.log(response)
    }

    return (
        <Button
            variant="outlined"
            onClick={onClick}
            startIcon={<FacebookIcon />}
        >
            Login with Facebook
        </Button>
    )
}

export default Login
