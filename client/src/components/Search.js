import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import './Search.css'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Search({ toggleMode, search }) {
    const [{ term = '' }, dispatch] = useStateValue()
    const [mode, setMode] = useState('Linear Search')

    const handleMode = (e, value) => {
        setMode(value)
    }

    return (
        <form className="search" onSubmit={search}>
            <div className="search__input">
                <SearchIcon className="search__inputIcon" />
                <input
                    type="text"
                    value={term || ''}
                    onChange={e => dispatch({
                        type: actionTypes.SET_SEARCH_TERM,
                        term: e.target.value,
                    })}
                />
            </div>
            {toggleMode && (
                <ToggleButtonGroup value={mode} exclusive variant="outlined" style={{ width: '100%', justifyContent: 'center', margin: '1rem auto' }} onChange={handleMode}>
                    <ToggleButton value="Linear Search">Linear Search</ToggleButton>
                    <ToggleButton value="Full-text Search">Full-text Search</ToggleButton>
                </ToggleButtonGroup>
            )}
        </form>
    )
}

export default Search
