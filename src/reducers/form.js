import { combineReducers } from 'redux'
import * as actionTypes from '../constants/ActionTypes'

const initState = {
    // 0: {
    //     id: 0,
    //     title: '未命名的表单',
    //     description: '',
    //     status: '发布中',
    //     stopResponse: false,
    //     deadline: '2017年7月26日',
    //     questions: [],
    // },
}

const stopResponse = (state, action) => {
    const { id } = action.payload
    const form = state[id]
    const isStop = form.stopResponse
    return {
        ...state,
        [id]: {
            ...form,
            stopResponse: !isStop,
        },
    }
}

const saveForm = (state, action) => {
    const { editing, formId } = action.payload
    const form = state[formId]
    return {
        ...state,
        [formId]: {
            ...form,
            ...editing,
        },
    }
}

const renameForm = (state, action) => {
    const { id, name } = action.payload
    const form = state[id]
    return {
        ...state,
        [id]: {
            ...form,
            title: name,
        },
    }
}

const removeForm = (state, action) => {
    const { id } = action.payload
    const newState = Object.assign({}, state)
    delete newState[id]
    return newState
    // return (({ [index]: deleted, ...newState }) => newState)(state)
}

const formsById = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.STOP_RESPONSE:
            return stopResponse(state, action)
        case actionTypes.SAVE_FORM:
            return saveForm(state, action)
        case actionTypes.RENAME_FORM:
            return renameForm(state, action)
        case actionTypes.REMOVE_FORM:
            return removeForm(state, action)
        default:
            return state
    }
}

// all form ids
const saveFormId = (state, action) => {
    const { formId } = action.payload
    return [...new Set(state.concat(formId))]
}

const removeFormId = (state, action) => {
    const { id } = action.payload
    return state.filter(formId => id !== formId)
}

const allForms = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SAVE_FORM:
            return saveFormId(state, action)
        case actionTypes.REMOVE_FORM:
            return removeFormId(state, action)
        default:
            return state
    }
}

export default combineReducers({
    byId: formsById,
    allIds: allForms,
})
