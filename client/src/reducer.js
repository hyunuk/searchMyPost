export const initialState = {
    term: null,
    user: null,
    mode: 'linear',
    creationDate: null,
    count: null,
}

export const actionTypes = {
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    MODE_CHANGE: 'MODE_CHANGE',
    SET_DB: 'SET_DB',
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
    case actionTypes.MODE_CHANGE:
        return {
            ...state,
            mode: action.mode,
        }
    case actionTypes.SET_DB:
        return {
            ...state,
            creationDate: action.creationDate,
            count: action.count,
        }

    default:
        return state
    }
}

export default reducer
