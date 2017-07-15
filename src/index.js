import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/normalize.scss'
import App from './containers/App/App'
import Edit from './routes/Edit/Edit'

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/edit" component={Edit} />
        </Switch>
    </Router>
), document.getElementById('root'))
