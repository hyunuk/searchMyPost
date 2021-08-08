import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { Button } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import '../styles/Search.css'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import mappingPosts from '../mappingPosts'

function Search({ toggleMode, search }) {
    const [{
        term = '', mode, user, creationDate, count,
    }, dispatch] = useStateValue()
    const message = 'You need to upload your post to the database to use this feature.'
    const isFulltextSearchable = () => (mode === 'fullText' && creationDate && count)

    const handleMode = (_, mode) => {
        dispatch({
            type: actionTypes.MODE_CHANGE,
            mode,
        })
    }

    const upload = async () => {
        const LIMIT = '&limit=250'
        const accessToken = `access_token=${user.accessToken}`
        const host = 'https://graph.facebook.com/v11.0/'
        const path = `${user.id}/feed`
        const address = `${host}${path}?${accessToken}`
        let response = await fetch(address + LIMIT)
        let { data, paging } = await response.json()
        let posts = mappingPosts(data)
        while (paging?.next) {
            // eslint-disable-next-line no-await-in-loop
            response = await fetch(paging.next + LIMIT);
            // eslint-disable-next-line no-await-in-loop
            ({ data, paging } = await response.json())
            posts = posts.concat(mappingPosts(data))
        }
        try {
            const count = await axios.post('/posts', { params: { user, posts, creationDate } })
            const responseUser = await axios.get('/user', { params: user })
            dispatch({
                type: actionTypes.SET_DB,
                creationDate: responseUser.data.creationDate,
                count,
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className="search" onSubmit={search}>
            {(mode === 'linear' || isFulltextSearchable()) && (
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
            )}
            {toggleMode && (
                <ToggleButtonGroup value={mode} exclusive variant="outlined" style={{ width: '100%', justifyContent: 'center', margin: '1rem auto' }} onChange={handleMode}>
                    <ToggleButton value="linear">Linear Search</ToggleButton>
                    <ToggleButton value="fullText">Full-text Search</ToggleButton>
                </ToggleButtonGroup>
            )}
            {mode === 'fullText' && (
                <div
                    className="fullTextInfo"
                    style={
                        {
                            display: 'flex',
                            width: 'auto',
                            justifyContent: 'center',
                            margin: '1rem auto',
                        }
                    }
                >
                    <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        onClick={upload}
                    >
                        Upload to DB
                    </Button>
                    {!creationDate && (
                        <p>{message}</p>
                    )}
                    {creationDate && (
                        <>
                            <p className="creationDate">
                                Latest upload time to DB:
                                {' '}
                                {new Date(parseInt(creationDate, 10))
                                    .toLocaleString(navigator.language)}
                            </p>
                            <p>
                                You have
                                {count}
                                {' '}
                                posts in your DB.
                            </p>
                        </>
                    )}
                </div>
            )}
        </form>
    )
}

export default Search
