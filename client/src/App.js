import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button, Paper, IconButton, InputBase,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import './App.css'

function App() {
    const input = useRef(null)
    const history = useHistory()
    const handleSubmit = () => {
        axios.get(`/posts/search/?q=${input.current?.value}`).then(res => console.log(res))
    }

    const connectFB = async () => {
        try {
            await axios.get('/auth/login/facebook')
            history.push(`/${user.username}`)
        } catch (err) {
            setOpen(true)
        }
    }

    const ContainedButton = ({ title, ...props }) => (
        <Button
            variant="contained"
            color="primary"
            disableElevation
            {...props}
        >
            {title}
        </Button>
    )

    return (
        <Paper component="form" onSubmit={handleSubmit}>
            <InputBase
                style={{
                    marginLeft: '.5rem',
                    flex: 1,
                    fontSize: 'small',
                }}
                placeholder="Search"
                inputRef={input}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" size="small" aria-label="search">
                <SearchIcon />
            </IconButton>
            <a href="/auth/login/facebook">
                <ContainedButton title="Login with Facebook" />
            </a>
        </Paper>
    )
}

export default App
