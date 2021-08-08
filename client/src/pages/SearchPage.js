import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import axios from 'axios'

import '../styles/SearchPage.css'

import { useStateValue } from '../StateProvider'
import Search from '../components/Search'
import filteredByTerm from '../filteredByTerm'

function SearchPage() {
    const LIMIT = '&limit=250'
    const [{ term, user, mode }] = useStateValue()
    const [data, setData] = useState(null)
    const [paging, setPaging] = useState(null)
    const [resultCount, setResultCount] = useState(null)
    const searchFromFBInitial = e => {
        e?.preventDefault()
        searchFromFB(`https://graph.facebook.com/v11.0/${user.id}/feed?access_token=${user.accessToken}`)
    }
    const searchFromFB = async address => {
        const response = await fetch(address + LIMIT)
        const result = await response.json()
        const filteredData = filteredByTerm(term, result.data)
        setData(filteredData)
        setPaging({ prev: result.paging?.prev, next: result.paging?.next })
        setResultCount(`About ${filteredData?.length} result(s) for ${term}`)
    }

    const searchFromDB = async () => {
        const response = await axios.get('/search', { params: { term, id: user.id } })
        setData(response.data)
        setResultCount(`About ${response?.data?.length} result(s) for ${term}`)
    }

    useEffect(() => {
        if (user) {
            if (mode === 'linear') {
                searchFromFBInitial()
            } else if (mode === 'fullText') {
                searchFromDB()
            }
        }
    }, [])

    return (
        <div className="searchPage">
            { mode === 'linear' ? (
                <>
                    <div className="searchPage__header">
                        <Link to="/">
                            <img
                                className="searchPage__logo"
                                src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                                alt=""
                            />
                        </Link>
                        <div className="searchPage__headerBody">
                            <Search search={searchFromFBInitial} />
                        </div>
                        <div className="searchPage__headerRight">
                            <p>{ user?.name }</p>
                        </div>
                    </div>
                    <div className="searchPage_results" style={{ margin: '2rem' }}>
                        <p className="searchPage__resultCount">
                            {resultCount}
                        </p>

                        {data?.map((item, i) => (
                            <div key={i} className="searchPage__result">
                                <a className="searchPage__resultTitle" href={item.link} target="_blank" rel="noreferrer">
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
                    {paging && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {paging.prev && (
                                <div className="searchPage_prev">
                                    <Button onClick={() => searchFromFB(paging.prev)}>Prev</Button>
                                </div>
                            )}
                            {paging.next && (
                                <div className="searchPage_next">
                                    <Button onClick={() => searchFromFB(paging.next)}>Next</Button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="searchPage__header">
                        <Link to="/">
                            <img
                                className="searchPage__logo"
                                src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
                                alt=""
                            />
                        </Link>
                        <div className="searchPage__headerBody">
                            <Search search={searchFromDB} />
                        </div>
                        <div className="searchPage__headerRight">
                            <p>{ user?.name }</p>
                        </div>
                    </div>
                    <div className="searchPage_results" style={{ margin: '2rem' }}>
                        <p className="searchPage__resultCount">
                            {resultCount}
                        </p>

                        {data?.map((item, i) => (
                            <div key={i} className="searchPage__result">
                                <a className="searchPage__resultTitle" href={item.link} target="_blank" rel="noreferrer">
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
                </>
            )}
        </div>
    )
}

export default SearchPage
