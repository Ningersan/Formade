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

const addQuestion = (state, action) => {
    const { id } = action.payload
    return { ...state, questions: state.questions.concat(id) }
}

const removeQuestion = (state, action) => {
    const { id } = action.payload
    const questions = state.questions.filter(questionId => questionId !== id)
    return {
        ...state,
        questions,
    }
}

const copyQuestion = (state, action) => {
    const { questions } = state
    const { id, newId } = action.payload
    const index = questions.findIndex(questionId => questionId === id)
    const newQuestions = [
        ...questions.slice(0, index + 1),
        newId,
        ...questions.slice(index + 1),
    ]
    return {
        ...state,
        questions: newQuestions,
    }
}

// const sortQuestion = (state, action) => {
//     const editing = deepCopy(state.editing)
//     const { from, to } = action.payload
//     const { questions } = editing
//     const target = questions.splice(from, 1)[0]
//     questions.splice(to, 0, target)
//     return { ...state, editing }
// }


const saveDescription = (state, action) => {
    const { description } = action.payload
    return { ...state, description }
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
            return addQuestion(state, action)
        case actionTypes.COPY_QUESTION:
            return copyQuestion(state, action)
        // case actionTypes.SORT_QUESTION:
        //     return sortQuestion(state, action)
        case actionTypes.REMOVE_QUESTION:
            return removeQuestion(state, action)
        case actionTypes.SAVE_DESCRIPTION:
            return saveDescription(state, action)
        case actionTypes.SAVE_FORM_TITLE:
            return saveFormTitle(state, action)
        default:
            return state
    }
}

export default editing
