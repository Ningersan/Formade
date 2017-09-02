import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './containers/App/App'
import Edit from './routes/Edit/index'
import Fill from './routes/Fill/containers/Fill/Fill'
import store from './store/store'
import './styles/normalize.scss'

localStorage.clear()

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/fill" component={Fill} />
                <Route path="/edit" component={Edit} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'))
