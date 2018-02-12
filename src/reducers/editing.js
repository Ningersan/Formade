import * as actionTypes from '../constants/QuestionnaireActionTypes'

const initState = {
    questionnaire: -1,
    title: '未命名的表单',
    description: '',
    status: '发布中',
    stopResponse: false,
    deadline: '2017年7月26日',
}

const addQuestionnaire = (state, action) => {
    // list is questionnaire's length
    const { questionnaires } = action.payload
    let id = questionnaires.length

    if (id !== 0) {
        id++
    }
    return { ...state, questionnaire: id }
}

const editQuestionnaire = (state, action) => {
    const { index, list } = action
    return { ...state, ...list[index] }
}

const saveText = (state, action) => {
    const { text } = action.payload
    return { ...state, description: text }
}

const saveTitle = (state, action) => {
    const { text } = action.payload
    return { ...state, title: text }
}

// reducers
const editing = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTIONNAIRE:
            return addQuestionnaire(state, action)
        case actionTypes.EDIT_QUESTIONNAIRE: {
            return editQuestionnaire(state, action)
        }
        case actionTypes.SAVE_TEXT: {
            return saveText(state, action)
        }
        case actionTypes.SAVE_TITLE: {
            return saveTitle(state, action)
        }
        default:
            return state
    }
}

export default editing
