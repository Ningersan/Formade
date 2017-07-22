import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import questions from './reducers/questionnaire'
import App from './containers/App/App'
import Edit from './routes/Edit/Edit'
import './styles/normalize.scss'

const store = createStore(questions)
store.subscribe(() => {
    console.log(store.getState())
})

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
