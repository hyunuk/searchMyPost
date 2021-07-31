import React from 'react'
import './Home.css'
import Login from '../components/Login'
import Search from '../components/Search'
import { useStateValue } from '../StateProvider'

function Home() {
    const [{ user }] = useStateValue()

    const message1 = 'Search my post is the web-app that allows to search your post by keyword.'
    const message2 = 'You can search via linear search without giving any information or full-text search like google.'
    return (
        <div className="home">
            {user ? (
                <>
                    <div className="home__header">
                        <div className="home_headerLeft">
                            About
                        </div>
                        <div className="home__headerRight">
                            <p>{ user.name }</p>
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
                </>
            ) : (
                <div className="home__body">
                    <img
                        src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                        alt="logo"
                    />
                    <center>
                        <p>
                            {message1}
                            <br />
                            {message2}
                        </p>
                        <Login />
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                    </center>
                </div>
            )}
        </div>
    )
}

export default Home
