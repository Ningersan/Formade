import * as actionTypes from '../constants/ActionTypes'

const initState = {
    form: -1,
    title: '未命名的表单',
    description: '',
    status: '发布中',
    stopResponse: false,
    deadline: '2017年7月26日',
    questions: [],
}

const addForm = (state, action) => {
    // list is form's length
    const { id } = action.payload
    return { ...initState, form: id }
}

const editForm = (state, action) => {
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

const saveFormTitle = (state, action) => {
    const { title } = action.payload
    return { ...state, title }
}

// reducers
const editing = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FORM:
            return addForm(state, action)
        case actionTypes.EDIT_FORM:
            return editForm(state, action)
        case actionTypes.ADD_QUESTION:
            return addQuestionId(state, action)
        case actionTypes.REMOVE_QUESTION:
            return removeQuestionId(state, action)
        case actionTypes.SAVE_TEXT:
            return saveText(state, action)
        case actionTypes.SAVE_FORM_TITLE:
            return saveFormTitle(state, action)
        default:
            return state
    }
}

export default editing
