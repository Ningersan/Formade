import { createStore } from 'redux'
import questionnaires from '../reducers/questionnaire'

const store = createStore(questionnaires)
store.subscribe(() => {
    console.log(store.getState())
})

export default store
