import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import Main from './containers/Main/Main'
import Response from '../Response/containers/Response/Response'

function Edit() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/edit" component={Main} />
                <Route path="/edit/response" component={Response} />
            </Switch>
        </Layout>
    )
}

export default Edit
