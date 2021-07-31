import React from 'react'
import { useStateValue } from '../StateProvider'
import './SearchPage.css'

function SearchPage() {
    const [{ term }] = useStateValue()
    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <h1>{term}</h1>
            </div>
            <div className="searchPage_results">a</div>
        </div>
    )
}

export default SearchPage
