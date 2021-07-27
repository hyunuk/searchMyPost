import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import Layout from './components/Layout'

import './App.css'

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/search">
                        <Layout>
                            <SearchPage />
                        </Layout>
                    </Route>
                    <Route path="/">
                        <Layout>
                            <Home />
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
