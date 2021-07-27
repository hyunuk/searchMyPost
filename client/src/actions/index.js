import axios from 'axios'

export const SET_USER = 'SET_USER'
export const LOAD_USER = 'LOAD_USER'
export const USER_NOT_FOUND = 'USER_NOT_FOUND'

export const getUser = (force = false) => async (dispatch, getState) => {
    const { user, profile } = getState()
    if (!force && user.loaded) return

    dispatch(loadUser())

    try {
        const self = profile.loaded && user.user.username === profile.profile.username
        const res = await axios.get('/me')
        dispatch(setUser(res.data.user))
        if (self) dispatch(setProfile(res.data.user))
    } catch (err) {
        dispatch(userNotFound())
    }
}
