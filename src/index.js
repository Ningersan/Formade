import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './containers/App/App'
import Edit from './routes/Edit/index'
import Fill from './routes/Fill/containers/Fill/Fill'
import store from './store/store'
import './styles/normalize.scss'

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/edit" component={Edit} />
                <Route exact path="/fill" component={Fill} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'))
