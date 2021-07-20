import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Login = props => {
    const { onLogin } = props
    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={onLogin}
                scope="public_profile,user_posts"
                render={renderProps => (
                    <div onClick={renderProps.onClick}>facebook</div>
                )}
            />
        </div>
    )
}

export default Login
