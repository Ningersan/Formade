import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './containers/App/App'
import Edit from './routes/Edit/index'
import Fill from './routes/Fill/containers/Fill/Fill'
import Response from './routes/Edit/containers/Response/Response'
import store from './store/store'
import './styles/normalize.scss'

localStorage.clear()

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/edit" component={Edit} />
                <Route path="/fill" component={Fill} />
                <Route path="/response" component={Response} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'))
