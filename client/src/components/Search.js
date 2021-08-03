import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'
import './Search.css'
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Search({ hideButtons = false }) {
    const [{ term = '' }, dispatch] = useStateValue()
    const history = useHistory()

    const search = e => {
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term,
        })
        history.push(`/search`)
    }

    return (
        <form className="search">
            <div className="search__input">
                <SearchIcon className="search__inputIcon" />
                <input
                    value={term}
                    onChange={e => dispatch({
                        type: actionTypes.SET_SEARCH_TERM,
                        term: e.target.value,
                    })}
                />
            </div>
            {!hideButtons ? (
                <div className="search__buttons">
                    <Button onClick={search} variant="outlined">
                        Linear Search
                    </Button>
                    <Button variant="outlined">Full-text Search</Button>
                    <Button variant="outlined">Upload to DB</Button>
                </div>
            ) : (
                <div className="search__buttons">
                    <Button
                        className="search__buttonsHidden"
                        onClick={search}
                        variant="outlined"
                    >
                        Linear Search
                    </Button>
                    <Button className="search__buttonsHidden" variant="outlined">
                        Full-text Search
                    </Button>
                </div>
            )}
        </form>
    )
}

export default Search
