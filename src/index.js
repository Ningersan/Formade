import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, HashRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './containers/App/App'
import Edit from './routes/Edit/index'
import Fill from './routes/Fill/containers/Fill/Fill'
import store from './store/store'
import './styles/normalize.css'
import './styles/iconfont.css'

// localStorage.clear()

render((
    <MuiThemeProvider>
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/fill" component={Fill} />
                    <Route path="/edit" component={Edit} />
                </Switch>
            </HashRouter>
        </Provider>
    </MuiThemeProvider>
), document.getElementById('root'))
