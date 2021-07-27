export const initialState = {
    term: null,
    user: null,
}

export const actionTypes = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
}

const reducer = (state, action) => {
    switch (action.type) {
    case actionTypes.SET_SEARCH_TERM:
        return {
            ...state,
            term: action.term,
        }
    case actionTypes.LOG_IN:
        return {
            ...state,
            user: action.user,
        }
    case actionTypes.LOG_OUT:
        return {
            ...state,
            user: null,
        }

    default:
        return state
    }
}

export default reducer
