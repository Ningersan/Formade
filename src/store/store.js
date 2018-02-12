import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import questionnaires from '../reducers/questionnaire'
import rootReducer from '../reducers/'

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware, ReduxThunk),
)

// store.subscribe(() => {
//     console.log(store.getState())
// })

export default store
