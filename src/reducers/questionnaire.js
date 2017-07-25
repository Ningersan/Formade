import { deepCopy } from '../scripts/utils'

let nextQuestionId = 0

const initEditing = {
    questionnaireId: -1,
    title: '未命名的表单',
    deadline: 0,
    questions: [],
    questionId: -1,
    options: ['选项 1', '选项 2'],
    optionId: -1,
    hasOther: false,
}

const initState = {
    editing: deepCopy(initEditing),
}

const questionnaires = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION': {
            const editing = deepCopy(state.editing)
            const { type } = action.payload
            editing.questions.push({
                id: nextQuestionId++,
                type,
                isRequired: false,
                hasOther: false,
                options: ['选项 1', '选项 2'],
            })
            return { ...state, editing }
        }
        case 'COPY_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const questions = editing.questions
            const targetQuestion = deepCopy(questions[index])
            targetQuestion.id++
            questions.splice((index + 1), 0, targetQuestion)
            return { ...state, editing }
        }
        case 'SET_QUESTION_TYPE': {
            const editing = deepCopy(state.editing)
            const { index, type } = action.payload
            editing.questions[index].type = type
            return { ...state, editing }
        }
        case 'TOGGLE_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const targetQuestion = editing.questions[index]
            targetQuestion.isRequired = !targetQuestion.isRequired
            return { ...state, editing }
        }
        case 'REMOVE_QUESTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions.splice(index, 1)
            return { ...state, editing }
        }
        case 'ADD_OPTION': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            const options = editing.questions[index].options
            options.push(`选项 ${options.length + 1}`)
            return { ...state, editing }
        }
        case 'OPTION_CHANGE': {
            const editing = deepCopy(state.editing)
            const { questionIndex, optionIndex, event } = action.payload
            const options = editing.questions[questionIndex].options
            options[optionIndex] = event.target.value
            return { ...state, editing }
        }
        case 'REMOVE_OPTION': {
            const editing = deepCopy(state.editing)
            const { questionIndex, optionIndex } = action.payload
            const options = editing.questions[questionIndex].options
            options.splice(optionIndex, 1)
            return { ...state, editing }
        }
        case 'ADD_OTHER': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions[index].hasOther = true
            return { ...state, editing }
        }
        case 'REMOVE_OTHER': {
            const editing = deepCopy(state.editing)
            const { index } = action.payload
            editing.questions[index].hasOther = false
            return { ...state, editing }
        }
        default: {
            return state
        }
    }
}

export default questionnaires
