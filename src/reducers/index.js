import { combineReducers } from 'redux'
import editing from './editing'
import forms from './form'
import questions from './question'

const rootReducer = combineReducers({
    editing,
    forms,
    questions,
})

export default rootReducer
