import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './containers/App/App'
import Edit from './routes/Edit/Edit'
import store from './store/store'
import './styles/normalize.scss'

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/edit" component={Edit} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'))

