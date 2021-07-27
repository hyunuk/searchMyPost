import React from 'react'
import './Home.css'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AppsIcon from '@material-ui/icons/Apps'
import Search from '../components/Search'

function Home() {
    return (
        <div className="home">
            <div className="home__header">
                <div className="home_headerLeft">
                    <Link to="/auth/login/facebook">Sign in with FB</Link>
                </div>
                <div className="home__headerRight">
                    <AppsIcon />
                    <Avatar />
                </div>
            </div>

            <div className="home__body">
                <img
                    src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                    alt="logo"
                />
                <div className="home__inputContainer">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Home
