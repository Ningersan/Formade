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
    // },
}

const saveQuestionnaire = (state, action) => {
    const { editing } = action.payload
    const questionnaire = state(editing.questionnaireId)
    return {
        ...state,
        [editing.questionnaireId]: {
            ...questionnaire,
            ...editing,
        },
    }
}

const renameQuestionnaire = (state, action) => {
    const { index, value } = action
    const questionnaire = state[index]
    return {
        ...state,
        [index]: {
            ...questionnaire,
            title: value,
        },
    }
}

const removeQuestionnaire = (state, action) => {
    const { index } = action.payload
    return (({ [index]: deleted, ...newState }) => newState)(state)
}

const questionnairesById = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_QUESTIONNAIRE:
            return saveQuestionnaire(state, action)
        case actionTypes.RENAME_QUESTIONNAIRE: {
            return renameQuestionnaire(state, action)
        }
        case actionTypes.REMOVE_QUESTIONNAIRE: {
            return removeQuestionnaire(state, action)
        }
        default:
            return state
    }
}

const allQuestionnaires = (state = [], action) => {
    switch (actionTypes.type) {
        default:
            return state
    }
}

export default combineReducers({
    byId: questionnairesById,
    allIds: allQuestionnaires,
})
