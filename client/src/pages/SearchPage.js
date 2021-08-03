import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

import './SearchPage.css'

import { useStateValue } from '../StateProvider'
import Search from '../components/Search'
import filteredByTerm from '../filteredByTerm'

function SearchPage() {
    const LIMIT = '&limit=250'
    const history = useHistory()
    const [{ term, user }] = useStateValue()
    const [data, setData] = useState(null)
    const [paging, setPaging] = useState(null)
    const [resultCount, setResultCount] = useState(null)
    const fetchData = async address => {
        const response = await fetch(address + LIMIT)
        const result = await response.json()
        const filteredData = filteredByTerm(term, result.data)
        setData(filteredData)
        setPaging({ prev: result.paging.prev, next: result.paging.next })
        setResultCount(`About ${filteredData?.length} result(s) for ${term}`)
    }

    useEffect(() => {
        if (!user) {
            history.push('/')
        } else {
            const accessToken = `access_token=${user.accessToken}`
            const host = 'https://graph.facebook.com/v11.0/'
            const path = `${user.id}/feed`
            const address = `${host}${path}?${accessToken}`
            fetchData(address)
        }
    }, [])

    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img
                        className="searchPage__logo"
                        src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                        alt=""
                    />
                </Link>
                <div className="searchPage__headerBody">
                    <Search hideButtons />
                </div>
            </div>
            {term && (
                <div className="searchPage_results">
                    <p className="searchPage__resultCount">
                        {resultCount}
                    </p>

                    {data?.map(item => (
                        <div className="searchPage__result">
                            <a className="searchPage__resultTitle" href={item.link}>
                                <h3>{item.link}</h3>
                            </a>
                            <p className="searchPage__resultSnippet">
                                {item.snippet}
                            </p>
                            <p className="searchPage__resultCreatedTime">
                                {new Date(item.createdTime).toLocaleString(navigator.language)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {paging && (
                <>
                    <div className="searchPage_prev">
                        <Button onClick={() => fetchData(paging.prev)}>Prev</Button>
                    </div>
                    <div className="searchPage_next">
                        <Button onClick={() => fetchData(paging.next)}>Next</Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchPage
