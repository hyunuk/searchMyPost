import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Button,
    SwipeableDrawer as Drawer,
    Toolbar,
    Paper, IconButton, InputBase,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import classes from '../styles/navbar.module.css'
// import { getUser } from '../actions'

const Navbar = ({ user }) => {
    const input = useRef(null)
    const history = useHistory()

    const handleLogin = async () => {
        await axios.get('/auth/login/facebook')
        history.push('/auth/login/facebook')
    }

    const handleSubmit = async () => {
        // await axios.get(`posts/search?keyword=${input.current?.value}`)
        const user = await axios.get(`me`)
        console.log(user)
    }

    const Searchbar = () => (
        <Paper className={classes.searchbar} component="form" onSubmit={handleSubmit}>
            <InputBase
                style={{
                    marginLeft: '.5rem',
                    flex: 1,
                    fontSize: 'small',
                }}
                placeholder="Input keywords to search"
                inputRef={input}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" size="small" aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )

    return (
        <>
            <AppBar position="static" color="transparent" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <a href="/"><h1 className={classes.logo}>Search My Post</h1></a>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Searchbar />
                        <>
                            <Button
                                className={classes.button}
                                onClick={handleLogin}
                                variant="contained"
                                color="primary"
                                disableElevation
                            >
                                Connect with FB
                            </Button>
                        </>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
