import { combineReducers } from 'redux'
import * as actionTypes from '../constants/QuestionnaireActionTypes'

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
    // const list = deepCopy(state.list)
    // const editing = deepCopy(state.editing)
    // const { index } = action.payload
    // if (index) {
    //     list[index].stopResponse = !list[index].stopResponse
    //     return { ...state, list }
    // }
    // editing.stopResponse = !editing.stopResponse
    // return { ...state, editing }
}

const saveQuestionnaire = (state, action) => {
    const { editing, formId } = action.payload
    const questionnaire = state[formId]
    return {
        ...state,
        [formId]: {
            ...questionnaire,
            ...editing,
        },
    }
}

const renameQuestionnaire = (state, action) => {
    const { id, value } = action.payload
    const questionnaire = state[id]
    return {
        ...state,
        [id]: {
            ...questionnaire,
            title: value,
        },
    }
}

const removeQuestionnaire = (state, action) => {
    const { id } = action.payload
    const newState = Object.assign({}, state)
    delete newState[id]
    return newState
    // return (({ [index]: deleted, ...newState }) => newState)(state)
}

const questionnairesById = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_QUESTIONNAIRE:
            return saveQuestionnaire(state, action)
        case actionTypes.RENAME_QUESTIONNAIRE:
            return renameQuestionnaire(state, action)
        case actionTypes.STOP_RESPONSE:
            return stopResponse(state, action)
        case actionTypes.REMOVE_QUESTIONNAIRE:
            return removeQuestionnaire(state, action)
        default:
            return state
    }
}

// all forms
const saveFormId = (state, action) => {
    const { formId } = action.payload
    return [...new Set(state.concat(formId))]
}

const removeFormId = (state, action) => {
    const { id } = action.payload
    return state.filter(formId => id !== formId)
}

const allQuestionnaires = (state = [], action) => {
    switch (action.type) {
        case actionTypes.SAVE_QUESTIONNAIRE:
            return saveFormId(state, action)
        case actionTypes.REMOVE_QUESTIONNAIRE:
            return removeFormId(state, action)
        default:
            return state
    }
}

export default combineReducers({
    byId: questionnairesById,
    allIds: allQuestionnaires,
})
