import * as actionTypes from '../constants/ActionTypes'

const initState = {
    questionnaire: -1,
    title: '未命名的表单',
    description: '',
    status: '发布中',
    stopResponse: false,
    deadline: '2017年7月26日',
    questions: [],
}

const addQuestionnaire = (state, action) => {
    // list is questionnaire's length
    const { questionnaireId: id } = action.payload
    return { ...initState, questionnaire: id }
}

const editQuestionnaire = (state, action) => {
    const { editing } = action.payload
    return { ...state, ...editing }
}

const addQuestionId = (state, action) => {
    const { id } = action.payload
    return { ...state, questions: state.questions.concat(id) }
}

const removeQuestionId = (state, action) => {
    const { id } = action.payload
    const questions = state.questions.filter(questionId => questionId !== id)
    return {
        ...state,
        questions,
    }
}

const saveText = (state, action) => {
    const { text } = action.payload
    return { ...state, description: text }
}

const saveQuestionnaireTitle = (state, action) => {
    const { text } = action.payload
    return { ...state, title: text }
}

// reducers
const editing = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTIONNAIRE:
            return addQuestionnaire(state, action)
        case actionTypes.EDIT_QUESTIONNAIRE:
            return editQuestionnaire(state, action)
        case actionTypes.ADD_QUESTION:
            return addQuestionId(state, action)
        case actionTypes.REMOVE_QUESTION:
            return removeQuestionId(state, action)
        case actionTypes.SAVE_TEXT:
            return saveText(state, action)
        case actionTypes.SAVE_QUESTIONNAIRE_TITLE:
            return saveQuestionnaireTitle(state, action)
        default:
            return state
    }
}

export default editing
