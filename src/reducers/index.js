import { combineReducers } from 'redux'
import editing from './editing'
import forms from './form'

const rootReducer = combineReducers({
    editing,
    forms,
})

export default rootReducer
