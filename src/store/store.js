import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import questionnaires from '../reducers/questionnaire'

const loggerMiddleware = createLogger()
const store = createStore(questionnaires,
    applyMiddleware(loggerMiddleware),
)

store.subscribe(() => {
    console.log(store.getState())
})

export default store
